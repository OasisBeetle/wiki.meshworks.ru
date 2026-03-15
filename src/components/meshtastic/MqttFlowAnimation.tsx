import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './MqttFlowAnimation.module.css';

type NodeId =
  | 'cityA1'
  | 'cityA2'
  | 'cityA3'
  | 'cityA4'
  | 'cityA5'
  | 'cityB1'
  | 'cityB2'
  | 'cityB3'
  | 'cityB4'
  | 'cityB5'
  | 'mqttA'
  | 'mqttB'
  | 'broker';

type Node = {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  kind: 'mesh' | 'gateway' | 'broker';
};

type Step = {
  title: string;
  subtitle: string;
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

export default function MqttFlowAnimation(props: { className?: string }): React.ReactNode {
  const reducedMotion = usePrefersReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [distance, setDistance] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const nodes: Record<NodeId, Node> = useMemo(
    () => ({
      cityA1: { id: 'cityA1', label: 'Нода', x: 116, y: 122, kind: 'mesh' },
      cityA2: { id: 'cityA2', label: 'Нода', x: 198, y: 94, kind: 'mesh' },
      cityA3: { id: 'cityA3', label: 'Нода', x: 154, y: 222, kind: 'mesh' },
      cityA4: { id: 'cityA4', label: 'Нода', x: 252, y: 242, kind: 'mesh' },
      cityA5: { id: 'cityA5', label: 'Нода', x: 282, y: 146, kind: 'mesh' },
      mqttA: { id: 'mqttA', label: 'MQTT-нода', x: 322, y: 186, kind: 'gateway' },
      broker: { id: 'broker', label: 'MQTT', x: 430, y: 106, kind: 'broker' },
      mqttB: { id: 'mqttB', label: 'MQTT-нода', x: 538, y: 186, kind: 'gateway' },
      cityB1: { id: 'cityB1', label: 'Нода', x: 578, y: 124, kind: 'mesh' },
      cityB2: { id: 'cityB2', label: 'Нода', x: 662, y: 92, kind: 'mesh' },
      cityB3: { id: 'cityB3', label: 'Нода', x: 624, y: 228, kind: 'mesh' },
      cityB4: { id: 'cityB4', label: 'Нода', x: 722, y: 248, kind: 'mesh' },
      cityB5: { id: 'cityB5', label: 'Нода', x: 752, y: 144, kind: 'mesh' },
    }),
    [],
  );

  const steps: Step[] = useMemo(
    () => [
      {
        title: 'Два города, две отдельные сети',
        subtitle: 'Каждый город общается внутри себя, но между городами mesh-связи нет.',
        visibleEdges: [
          ['cityA1', 'cityA2'],
          ['cityA1', 'cityA3'],
          ['cityA2', 'cityA5'],
          ['cityA3', 'cityA4'],
          ['cityA4', 'mqttA'],
          ['cityA5', 'mqttA'],
          ['cityB1', 'cityB2'],
          ['cityB1', 'cityB3'],
          ['cityB2', 'cityB5'],
          ['cityB3', 'cityB4'],
          ['cityB3', 'mqttB'],
          ['cityB5', 'mqttB'],
        ],
        dimmedEdges: [
          ['mqttA', 'broker'],
          ['broker', 'mqttB'],
        ],
        path: ['cityA1', 'cityA2', 'cityA5', 'mqttA', 'cityA4', 'cityA3'],
      },
      {
        title: 'MQTT объединяет сети',
        subtitle: 'С MQTT тунелем сообщение может пройти из одной сети в другую.',
        visibleEdges: [
          ['cityA1', 'cityA2'],
          ['cityA1', 'cityA3'],
          ['cityA2', 'cityA5'],
          ['cityA3', 'cityA4'],
          ['cityA4', 'mqttA'],
          ['cityA5', 'mqttA'],
          ['mqttA', 'broker'],
          ['broker', 'mqttB'],
          ['cityB1', 'cityB2'],
          ['cityB1', 'cityB3'],
          ['cityB2', 'cityB5'],
          ['cityB3', 'cityB4'],
          ['cityB3', 'mqttB'],
          ['cityB5', 'mqttB'],
        ],
        path: ['cityA3', 'cityA4', 'mqttA', 'broker', 'mqttB', 'cityB5', 'cityB2'],
      },
    ],
    [],
  );

  const step = steps[stepIndex] ?? steps[0];
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

  const renderNode = (node: Node) => {
    if (node.kind === 'broker') {
      return (
        <g key={node.id}>
          <path
            d={`
              M ${node.x - 8.5} ${node.y - 40}
              a 4.4 4.4 0 0 1 4.8 -4.4
              a 5.4 5.4 0 0 1 9.6 2.1
              a 4 4 0 0 1 2 7.4
              h -14.6
              a 4.1 4.1 0 0 1 -4.8 -4.1
              a 4.1 4.1 0 0 1 3 -1
            `}
            fill="none"
            stroke="color-mix(in srgb, var(--ifm-font-color-base) 74%, transparent)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={node.x - 5.5} cy={node.y - 42} r={1.1} fill="color-mix(in srgb, var(--ifm-font-color-base) 74%, transparent)" />
          <circle cx={node.x} cy={node.y - 42} r={1.1} fill="color-mix(in srgb, var(--ifm-font-color-base) 74%, transparent)" />
          <circle cx={node.x + 5.5} cy={node.y - 42} r={1.1} fill="color-mix(in srgb, var(--ifm-font-color-base) 74%, transparent)" />
          <rect
            x={node.x - 58}
            y={node.y - 22}
            width={116}
            height={44}
            rx={12}
            fill="var(--ifm-background-color)"
            stroke="var(--mesh-accent)"
            strokeWidth={2.5}
          />
          <rect
            x={node.x - 48}
            y={node.y - 14}
            width={96}
            height={28}
            rx={8}
            fill="color-mix(in srgb, var(--mesh-accent) 10%, var(--ifm-background-color))"
            opacity={0.9}
          />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="13" fill="var(--ifm-font-color-base)" opacity={0.92}>
            {node.label}
          </text>
        </g>
      );
    }

    const isPrimary = node.kind === 'gateway';
    const iconWidth = isPrimary ? 28 : 24;
    const iconHeight = isPrimary ? 20 : 18;
    const iconX = node.x - iconWidth / 2;
    const iconY = node.y - iconHeight / 2 + 2;

    return (
      <g key={node.id}>
        <line
          x1={node.x}
          y1={iconY - 6}
          x2={node.x}
          y2={iconY - 1}
          stroke={isPrimary ? 'var(--mesh-accent)' : 'color-mix(in srgb, var(--ifm-font-color-base) 30%, transparent)'}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <circle
          cx={node.x}
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
        {isPrimary ? (
          <text x={node.x} y={node.y + 40} textAnchor="middle" fontSize="12" fill="var(--ifm-font-color-base)" opacity={0.92}>
            {node.label}
          </text>
        ) : null}
      </g>
    );
  };

  const renderDiagram = (packetProgress: number, staticMode = false) => {
    const packet = polylinePoint(points, packetProgress);

    return (
      <svg className={styles.svg} viewBox="0 0 860 390" aria-hidden="true">
        <defs>
          <linearGradient id="mqttEdge" x1="0" x2="1">
            <stop offset="0" stopColor="var(--mesh-accent)" stopOpacity="0.65" />
            <stop offset="1" stopColor="var(--mesh-accent)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="mqttGlow" x="-30%" y="-30%" width="160%" height="160%">
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
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="url(#mqttEdge)"
              strokeWidth={3}
              strokeLinecap="round"
              opacity={0.9}
            />
          );
        })}

        {(step.dimmedEdges ?? []).map(([a, b]) => {
          const na = nodes[a];
          const nb = nodes[b];
          return (
            <line
              key={`dim-${a}-${b}`}
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

        {stepIndex === 1 ? (
          <line
            x1={nodes.mqttA.x}
            y1={nodes.mqttA.y}
            x2={nodes.mqttB.x}
            y2={nodes.mqttB.y}
            stroke="url(#mqttEdge)"
            strokeWidth={3.5}
            strokeLinecap="round"
            opacity={1}
          />
        ) : null}

        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="var(--mesh-accent)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.65}
        />

        {(Object.keys(nodes) as NodeId[]).map((id) => renderNode(nodes[id]))}

        <circle
          cx={packet.x}
          cy={packet.y}
          r={7}
          fill="var(--mesh-accent)"
          filter={staticMode ? undefined : 'url(#mqttGlow)'}
          opacity={staticMode ? 0.9 : 1}
        />
      </svg>
    );
  };

  if (reducedMotion) {
    return (
      <div
        className={clsx(styles.container, 'docImage', props.className)}
        role="img"
        aria-label="Схема MQTT: две локальные mesh-сети в разных городах объединяются через MQTT-туннель."
      >
        <div className={styles.inner}>{renderDiagram(0.72, true)}</div>
        <div className={styles.controls}>
          <div className={styles.label}>
            <strong>Статичная схема</strong> - две mesh-сети в разных городах связаны центральным MQTT-мостом.
          </div>
          <div className={styles.legend}>
            <span><i className={styles.legendRoute} /> локальная mesh-связь</span>
            <span><i className={styles.legendPacket} /> пакет</span>
            <span><i className={styles.legendBlock} /> MQTT-мост</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container, 'docImage', props.className)} role="group" aria-label="Анимация: MQTT объединяет mesh-сети в разных городах">
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
          <span><i className={styles.legendRoute} /> локальная mesh-связь</span>
          <span><i className={styles.legendPacket} /> пакет</span>
          <span><i className={styles.legendBlock} /> MQTT-мост</span>
        </div>
      </div>
    </div>
  );
}
