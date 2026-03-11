import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './MeshNetworkAnimation.module.css';

type NodeId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

type Node = {
  id: NodeId;
  label: string;
  x: number;
  y: number;
};

type Step = {
  title: string;
  subtitle: string;
  offline?: NodeId[];
  visibleNodes: NodeId[];
  visibleEdges: Array<[NodeId, NodeId]>;
  dimmedEdges?: Array<[NodeId, NodeId]>;
  path: NodeId[];
};

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function polylinePoint(points: Array<{ x: number; y: number }>, t: number): { x: number; y: number } {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0];

  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const len = Math.hypot(dx, dy);
    segLens.push(len);
    total += len;
  }

  if (total === 0) return points[0];
  let dist = clamp01(t) * total;

  for (let i = 0; i < segLens.length; i++) {
    const segLen = segLens[i];
    if (dist <= segLen) {
      const localT = segLen === 0 ? 0 : dist / segLen;
      return {
        x: lerp(points[i].x, points[i + 1].x, localT),
        y: lerp(points[i].y, points[i + 1].y, localT),
      };
    }
    dist -= segLen;
  }

  return points[points.length - 1];
}

function polylineLength(points: Array<{ x: number; y: number }>): number {
  if (points.length < 2) return 0;

  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    total += Math.hypot(dx, dy);
  }
  return total;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;

    const onChange = () => setReduced(media.matches);
    onChange();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  return reduced;
}

export default function MeshNetworkAnimation(props: { className?: string }): React.ReactNode {
  const reducedMotion = usePrefersReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [distance, setDistance] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const nodes: Record<NodeId, Node> = useMemo(
    () => ({
      A: { id: 'A', label: 'Отправитель', x: 110, y: 210 },
      B: { id: 'B', label: 'Получатель', x: 690, y: 130 },
      C: { id: 'C', label: 'Нода', x: 300, y: 110 },
      D: { id: 'D', label: 'Нода', x: 330, y: 275 },
      E: { id: 'E', label: 'Нода', x: 510, y: 190 },
      F: { id: 'F', label: 'Новая нода', x: 610, y: 285 },
    }),
    [],
  );

  const steps: Step[] = useMemo(
    () => [
      {
        title: 'Прямая связь',
        subtitle: 'Если ноды находятся рядом, сообщение идёт напрямую.',
        visibleNodes: ['A', 'B'],
        visibleEdges: [['A', 'B']],
        path: ['A', 'B'],
      },
      {
        title: 'Мультихоп',
        subtitle: 'Сообщение идёт через соседние ноды, если прямой связи нет.',
        visibleNodes: ['A', 'B', 'C', 'E'],
        visibleEdges: [
          ['A', 'C'],
          ['C', 'E'],
          ['E', 'B'],
        ],
        path: ['A', 'C', 'E', 'B'],
      },
      {
        title: 'Самоорганизация',
        subtitle: 'Если одна нода “пропала”, маршрут перестраивается.',
        offline: ['C'],
        visibleNodes: ['A', 'B', 'C', 'D', 'E'],
        visibleEdges: [
          ['A', 'C'],
          ['C', 'E'],
          ['A', 'D'],
          ['D', 'E'],
          ['E', 'B'],
        ],
        path: ['A', 'D', 'E', 'B'],
      },
      {
        title: 'Новая нода',
        subtitle: 'Новая нода расширяет покрытие и помогает дотянуться до новой точки сети.',
        visibleNodes: ['A', 'B', 'D', 'F'],
        visibleEdges: [
          ['A', 'D'],
          ['D', 'F'],
          ['F', 'B'],
        ],
        dimmedEdges: [['D', 'B']],
        path: ['A', 'D', 'F', 'B'],
      },
    ],
    [],
  );

  const step = steps[stepIndex] ?? steps[0];
  const offline = new Set<NodeId>(step.offline ?? []);
  const visibleNodes = new Set<NodeId>(step.visibleNodes);

  const points = useMemo(() => step.path.map((id) => ({ x: nodes[id].x, y: nodes[id].y })), [nodes, step.path]);
  const pathLength = useMemo(() => polylineLength(points), [points]);
  const progress = pathLength === 0 ? 0 : distance / pathLength;

  useEffect(() => {
    if (reducedMotion) return;

    const speedPxPerMs = 0.22;

    const tick = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = now - lastRef.current;
      lastRef.current = now;

      setDistance((currentDistance) => {
        const nextDistance = currentDistance + dt * speedPxPerMs * direction;

        if (pathLength <= 0) return 0;

        if (nextDistance >= pathLength) {
          setDirection(-1);
          return pathLength;
        }

        if (nextDistance <= 0) {
          setDirection(1);
          return 0;
        }

        return nextDistance;
      });

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [direction, pathLength, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setDistance(0);
      setDirection(1);
    }
  }, [reducedMotion]);

  useEffect(() => {
    setDistance(0);
    setDirection(1);
    lastRef.current = null;
  }, [stepIndex]);

  const goNextStep = () => {
    setStepIndex((i) => (i + 1) % steps.length);
  };

  const goPrevStep = () => {
    setStepIndex((i) => (i - 1 + steps.length) % steps.length);
  };

  const renderDiagram = (packetProgress: number, staticMode = false) => {
    const packet = polylinePoint(points, packetProgress);

    return (
      <svg className={styles.svg} viewBox="0 0 800 360" aria-hidden="true">
        <defs>
          <linearGradient id="mwEdge" x1="0" x2="1">
            <stop offset="0" stopColor="var(--mesh-accent)" stopOpacity="0.65" />
            <stop offset="1" stopColor="var(--mesh-accent)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="mwGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.7 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {step.visibleEdges.map(([a, b]) => {
          const na = nodes[a];
          const nb = nodes[b];
          const dim = offline.has(a) || offline.has(b);
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={dim ? 'color-mix(in srgb, var(--ifm-font-color-base) 14%, transparent)' : 'url(#mwEdge)'}
              strokeWidth={3}
              strokeLinecap="round"
              opacity={dim ? 0.35 : 0.9}
            />
          );
        })}

        {(step.dimmedEdges ?? []).map(([a, b]) => {
          const na = nodes[a];
          const nb = nodes[b];
          return (
            <line
              key={`dimmed-${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="color-mix(in srgb, var(--ifm-font-color-base) 20%, transparent)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="7 7"
              opacity={0.55}
            />
          );
        })}

        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="var(--mesh-accent)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.65}
        />

        {(Object.keys(nodes) as NodeId[]).map((id) => {
          if (!visibleNodes.has(id)) return null;
          const n = nodes[id];
          const dim = offline.has(id);
          const isPrimary = id === 'A' || id === 'B';
          const iconWidth = isPrimary ? 28 : 24;
          const iconHeight = isPrimary ? 20 : 18;
          const iconX = n.x - iconWidth / 2;
          const iconY = n.y - iconHeight / 2 + 2;
          return (
            <g key={id} opacity={dim ? 0.35 : 1}>
              <line
                x1={n.x}
                y1={iconY - 6}
                x2={n.x}
                y2={iconY - 1}
                stroke={isPrimary ? 'var(--mesh-accent)' : 'color-mix(in srgb, var(--ifm-font-color-base) 30%, transparent)'}
                strokeWidth={2}
                strokeLinecap="round"
              />
              <circle
                cx={n.x}
                cy={iconY - 8}
                r={2.5}
                fill={isPrimary ? 'var(--mesh-accent)' : 'color-mix(in srgb, var(--ifm-font-color-base) 34%, transparent)'}
              />
              <rect
                x={iconX}
                y={iconY}
                width={iconWidth}
                height={iconHeight}
                rx={6}
                fill="var(--ifm-background-color)"
                stroke={isPrimary ? 'var(--mesh-accent)' : 'color-mix(in srgb, var(--ifm-font-color-base) 22%, transparent)'}
                strokeWidth={isPrimary ? 2.5 : 2}
              />
              <rect
                x={iconX + 5}
                y={iconY + 4}
                width={iconWidth - 10}
                height={iconHeight - 8}
                rx={3}
                fill="color-mix(in srgb, var(--mesh-accent) 12%, var(--ifm-background-color))"
                opacity={0.9}
              />
              <line
                x1={iconX + 6}
                y1={iconY + iconHeight + 2}
                x2={iconX + 10}
                y2={iconY + iconHeight + 6}
                stroke="color-mix(in srgb, var(--ifm-font-color-base) 26%, transparent)"
                strokeWidth={1.75}
                strokeLinecap="round"
              />
              <line
                x1={iconX + iconWidth - 6}
                y1={iconY + iconHeight + 2}
                x2={iconX + iconWidth - 10}
                y2={iconY + iconHeight + 6}
                stroke="color-mix(in srgb, var(--ifm-font-color-base) 26%, transparent)"
                strokeWidth={1.75}
                strokeLinecap="round"
              />
              <text
                x={n.x}
                y={n.y + (isPrimary ? 42 : 38)}
                textAnchor="middle"
                fontSize="13"
                fill="var(--ifm-font-color-base)"
                opacity={0.92}
              >
                {id} - {n.label}
              </text>
            </g>
          );
        })}

        <circle
          cx={packet.x}
          cy={packet.y}
          r={7}
          fill="var(--mesh-accent)"
          filter={staticMode ? undefined : 'url(#mwGlow)'}
          opacity={staticMode ? 0.9 : 1}
        />
      </svg>
    );
  };

  if (reducedMotion) {
    const staticStep = steps[1] ?? steps[0];
    const staticNodes = new Set<NodeId>(staticStep.visibleNodes);
    const staticOffline = new Set<NodeId>(staticStep.offline ?? []);
    const staticPoints = staticStep.path.map((id) => ({ x: nodes[id].x, y: nodes[id].y }));
    const staticPacket = polylinePoint(staticPoints, 0.58);

    return (
      <div
        className={clsx(styles.container, 'docImage', props.className)}
        role="img"
        aria-label="Схема mesh-сети: сообщение идёт через соседние ноды, а при пропаже ноды маршрут может перестроиться."
      >
        <div className={styles.inner}>
          <svg className={styles.svg} viewBox="0 0 800 360" aria-hidden="true">
            <defs>
              <linearGradient id="mwEdgeStatic" x1="0" x2="1">
                <stop offset="0" stopColor="var(--mesh-accent)" stopOpacity="0.65" />
                <stop offset="1" stopColor="var(--mesh-accent)" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {staticStep.visibleEdges.map(([a, b]) => {
              const na = nodes[a];
              const nb = nodes[b];
              const dim = staticOffline.has(a) || staticOffline.has(b);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke={dim ? 'color-mix(in srgb, var(--ifm-font-color-base) 14%, transparent)' : 'url(#mwEdgeStatic)'}
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={dim ? 0.35 : 0.9}
                />
              );
            })}

            <polyline
              points={staticPoints.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="var(--mesh-accent)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.65}
            />

            {(Object.keys(nodes) as NodeId[]).map((id) => {
              if (!staticNodes.has(id)) return null;
              const n = nodes[id];
              const isPrimary = id === 'A' || id === 'B';
              const iconWidth = isPrimary ? 28 : 24;
              const iconHeight = isPrimary ? 20 : 18;
              const iconX = n.x - iconWidth / 2;
              const iconY = n.y - iconHeight / 2 + 2;
              return (
                <g key={id}>
                  <line
                    x1={n.x}
                    y1={iconY - 6}
                    x2={n.x}
                    y2={iconY - 1}
                    stroke={isPrimary ? 'var(--mesh-accent)' : 'color-mix(in srgb, var(--ifm-font-color-base) 30%, transparent)'}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={n.x}
                    cy={iconY - 8}
                    r={2.5}
                    fill={isPrimary ? 'var(--mesh-accent)' : 'color-mix(in srgb, var(--ifm-font-color-base) 34%, transparent)'}
                  />
                  <rect
                    x={iconX}
                    y={iconY}
                    width={iconWidth}
                    height={iconHeight}
                    rx={6}
                    fill="var(--ifm-background-color)"
                    stroke={isPrimary ? 'var(--mesh-accent)' : 'color-mix(in srgb, var(--ifm-font-color-base) 22%, transparent)'}
                    strokeWidth={isPrimary ? 2.5 : 2}
                  />
                  <rect
                    x={iconX + 5}
                    y={iconY + 4}
                    width={iconWidth - 10}
                    height={iconHeight - 8}
                    rx={3}
                    fill="color-mix(in srgb, var(--mesh-accent) 12%, var(--ifm-background-color))"
                    opacity={0.9}
                  />
                  <line
                    x1={iconX + 6}
                    y1={iconY + iconHeight + 2}
                    x2={iconX + 10}
                    y2={iconY + iconHeight + 6}
                    stroke="color-mix(in srgb, var(--ifm-font-color-base) 26%, transparent)"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                  />
                  <line
                    x1={iconX + iconWidth - 6}
                    y1={iconY + iconHeight + 2}
                    x2={iconX + iconWidth - 10}
                    y2={iconY + iconHeight + 6}
                    stroke="color-mix(in srgb, var(--ifm-font-color-base) 26%, transparent)"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                  />
                  <text
                    x={n.x}
                    y={n.y + (isPrimary ? 42 : 38)}
                    textAnchor="middle"
                    fontSize="13"
                    fill="var(--ifm-font-color-base)"
                    opacity={0.92}
                  >
                    {id} - {n.label}
                  </text>
                </g>
              );
            })}

            <circle cx={staticPacket.x} cy={staticPacket.y} r={7} fill="var(--mesh-accent)" opacity={0.9} />
          </svg>
        </div>
        <div className={styles.controls}>
          <div className={styles.label}>
            <strong>Статичная схема</strong> - пакет идёт через соседние ноды, если прямой связи нет.
          </div>
          <div className={styles.legend}>
            <span><i className={styles.legendPath} /> активный маршрут</span>
            <span><i className={styles.legendNode} /> пакет</span>
            <span><i className={styles.legendOffline} /> недоступная нода</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container, 'docImage', props.className)} role="group" aria-label="Анимация: принципы mesh-сети">
      <div className={styles.inner}>
        <span className={styles.srOnly} aria-live="polite">
          {step.title}. {step.subtitle}
        </span>
        {renderDiagram(progress)}
      </div>

      <div className={styles.controls}>
        <button className={styles.btn} type="button" onClick={goPrevStep}>
          Назад
        </button>
        <button className={clsx(styles.btn, styles.btnPrimary)} type="button" onClick={goNextStep}>
          Вперёд
        </button>
        <div className={styles.label}>
          <strong>{step.title}</strong> - {step.subtitle}
        </div>
        <div className={styles.legend}>
          <span><i className={styles.legendPath} /> активный маршрут</span>
          <span><i className={styles.legendNode} /> пакет</span>
          <span><i className={styles.legendOffline} /> недоступная нода</span>
        </div>
      </div>
    </div>
  );
}
