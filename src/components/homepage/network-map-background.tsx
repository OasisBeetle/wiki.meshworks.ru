import React, { useEffect, useMemo, useRef, useState } from "react";

type ThemeMode = "light" | "dark";

type Palette = {
  primaryRgb: { r: number; g: number; b: number };
  bgRgb: { r: number; g: number; b: number };
  surfaceRgb: { r: number; g: number; b: number };
  borderRgb: { r: number; g: number; b: number };
  textRgb: { r: number; g: number; b: number };
  isDark: boolean;
};

type NetNode = {
  id: number;
  x: number; // 0..1
  y: number; // 0..1
};

type Edge = {
  a: number;
  b: number;
};

function useDocusaurusTheme(): ThemeMode {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const getTheme = () => {
      if (typeof document !== "undefined") {
        return document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";
      }
      return "dark";
    };

    setTheme(getTheme());

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          setTheme(getTheme());
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const s01 = s / 100;
  const l01 = l / 100;
  const c = (1 - Math.abs(2 * l01 - 1)) * s01;
  const hh = ((h % 360) + 360) % 360;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = l01 - c / 2;

  let rr = 0;
  let gg = 0;
  let bb = 0;

  if (hh < 60) {
    rr = c;
    gg = x;
  } else if (hh < 120) {
    rr = x;
    gg = c;
  } else if (hh < 180) {
    gg = c;
    bb = x;
  } else if (hh < 240) {
    gg = x;
    bb = c;
  } else if (hh < 300) {
    rr = x;
    bb = c;
  } else {
    rr = c;
    bb = x;
  }

  return {
    r: Math.round((rr + m) * 255),
    g: Math.round((gg + m) * 255),
    b: Math.round((bb + m) * 255),
  };
}

function parseHslTriplet(raw: string | null): { h: number; s: number; l: number } | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/\s+/g, " ");
  const parts = cleaned.split(" ");
  if (parts.length < 3) return null;
  const h = Number(parts[0]);
  const s = Number(parts[1].replace("%", ""));
  const l = Number(parts[2].replace("%", ""));
  if (!Number.isFinite(h) || !Number.isFinite(s) || !Number.isFinite(l)) return null;
  return { h, s, l };
}

function readTriplet(el: HTMLElement, name: string, fallback: { h: number; s: number; l: number }) {
  const value = getComputedStyle(el).getPropertyValue(name);
  return parseHslTriplet(value) ?? fallback;
}

function rgba(rgb: { r: number; g: number; b: number }, a: number): string {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp01(a)})`;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateNetwork(seed: number, nodeCount: number): { nodes: NetNode[]; edges: Edge[] } {
  const rand = mulberry32(seed);

  const centers = Array.from({ length: 5 }, () => ({
    x: 0.12 + rand() * 0.76,
    y: 0.14 + rand() * 0.72,
  }));

  const nodes: NetNode[] = Array.from({ length: nodeCount }, (_, id) => {
    const c = centers[Math.floor(rand() * centers.length)];
    const spread = 0.08 + rand() * 0.08;
    const x = clamp01(c.x + (rand() - 0.5) * spread * 2);
    const y = clamp01(c.y + (rand() - 0.5) * spread * 2);
    return { id, x: Math.min(0.95, Math.max(0.05, x)), y: Math.min(0.95, Math.max(0.05, y)) };
  });

  const edgeKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
  const edgesMap = new Map<string, Edge>();

  const k = 3;
  for (const n of nodes) {
    const distances = nodes
      .filter((m) => m.id !== n.id)
      .map((m) => {
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        return { id: m.id, d2: dx * dx + dy * dy };
      })
      .sort((a, b) => a.d2 - b.d2)
      .slice(0, k);

    for (const m of distances) {
      const key = edgeKey(n.id, m.id);
      if (!edgesMap.has(key)) {
        const a = Math.min(n.id, m.id);
        const b = Math.max(n.id, m.id);
        edgesMap.set(key, { a, b });
      }
    }
  }

  const edges = Array.from(edgesMap.values());
  return { nodes, edges };
}

export function NetworkMapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedTheme = useDocusaurusTheme();
  const [enabled, setEnabled] = useState(false);

  const themeRef = useRef<ThemeMode>("dark");
  const tokenElRef = useRef<HTMLElement | null>(null);
  const paletteRef = useRef<Palette | null>(null);

  const { nodes, edges } = useMemo(() => {
    if (!enabled) return { nodes: [], edges: [] };
    return generateNetwork(1337, 34);
  }, [enabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const saveData = connection?.saveData ?? false;
    const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    const hardwareConcurrency = (navigator as unknown as { hardwareConcurrency?: number }).hardwareConcurrency;
    const isMobileWidth = window.innerWidth < 768;

    const isWeakDevice =
      reducedMotion ||
      saveData ||
      (typeof deviceMemory === "number" && deviceMemory <= 4) ||
      (typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4) ||
      isMobileWidth;

    setEnabled(!isWeakDevice);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    themeRef.current = resolvedTheme === "light" ? "light" : "dark";
  }, [resolvedTheme]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    tokenElRef.current =
      (canvas.closest(".meshtastic-home") as HTMLElement | null) ??
      document.documentElement;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = tokenElRef.current;
    if (!el) return;

    const isDark = themeRef.current === "dark";

    const primary = readTriplet(el, "--btn-primary", { h: 82, s: 74, l: 41 });
    const bg = readTriplet(el, "--background", { h: 217, s: 50, l: 97 });
    const surface = readTriplet(el, "--surface", { h: 216, s: 100, l: 99 });
    const border = readTriplet(el, "--border", { h: 221, s: 54, l: 90 });
    const text = readTriplet(el, "--foreground", { h: 222, s: 19, l: 13 });

    paletteRef.current = {
      primaryRgb: hslToRgb(primary.h, primary.s, primary.l),
      bgRgb: hslToRgb(bg.h, bg.s, bg.l),
      surfaceRgb: hslToRgb(surface.h, surface.s, surface.l),
      borderRgb: hslToRgb(border.h, border.s, border.l),
      textRgb: hslToRgb(text.h, text.s, text.l),
      isDark,
    };
  }, [resolvedTheme]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const width = Math.floor(window.innerWidth);
      const height = Math.floor(window.innerHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getNodePx = (nodeId: number) => {
      const node = nodes[nodeId];
      const w = window.innerWidth;
      const h = window.innerHeight;
      return { x: node.x * w, y: node.y * h };
    };

    const drawBackground = (palette: Palette) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const intensity = w < 768 ? 0.6 : 1;
      const g = ctx.createRadialGradient(w * 0.5, h * 0.25, 0, w * 0.5, h * 0.35, Math.max(w, h) * 0.95);
      g.addColorStop(0, rgba(palette.primaryRgb, (palette.isDark ? 0.09 : 0.06) * intensity));
      g.addColorStop(1, rgba(palette.bgRgb, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawEdges = (palette: Palette) => {
      const intensity = window.innerWidth < 768 ? 0.55 : 1;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.strokeStyle = rgba(palette.primaryRgb, (palette.isDark ? 0.045 : 0.08) * intensity);
      for (const edge of edges) {
        const a = getNodePx(edge.a);
        const b = getNodePx(edge.b);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      ctx.strokeStyle = rgba(palette.borderRgb, (palette.isDark ? 0.05 : 0.12) * intensity);
      ctx.setLineDash([2, 10]);
      for (let i = 0; i < edges.length; i += 4) {
        const edge = edges[i];
        const a = getNodePx(edge.a);
        const b = getNodePx(edge.b);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    };

    const drawNodes = (palette: Palette) => {
      const intensity = window.innerWidth < 768 ? 0.55 : 1;
      for (const node of nodes) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const x = node.x * w;
        const y = node.y * h;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(palette.primaryRgb, (palette.isDark ? 0.26 : 0.22) * intensity);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 4.8, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(palette.primaryRgb, (palette.isDark ? 0.05 : 0.08) * intensity);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const renderStatic = () => {
      const palette =
        paletteRef.current ??
        ({
          primaryRgb: { r: 126, g: 184, b: 27 },
          bgRgb: { r: 243, g: 246, b: 251 },
          surfaceRgb: { r: 250, g: 252, b: 255 },
          borderRgb: { r: 215, g: 224, b: 243 },
          textRgb: { r: 27, g: 31, b: 40 },
          isDark: themeRef.current === "dark",
        } satisfies Palette);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(palette);
      drawEdges(palette);
      drawNodes(palette);
    };

    const onResize = () => {
      setCanvasSize();
      renderStatic();
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [edges, enabled, nodes, resolvedTheme]);

  if (!enabled) return null;

  return <canvas ref={canvasRef} />;
}
