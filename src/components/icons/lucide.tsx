import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

function baseProps(props: IconProps) {
  const {className, ...rest} = props;
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    ...rest,
  } as const;
}

export function ArrowRight(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Download(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FileText(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Radio(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M4.9 19.1a10 10 0 0 1 0-14.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.8 16.2a6 6 0 0 1 0-8.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.2 7.8a6 6 0 0 1 0 8.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19.1 4.9a10 10 0 0 1 0 14.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function X(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 2a15.3 15.3 0 0 0 0 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SmartphoneIcon(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <rect x="7" y="2" width="10" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
      <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function UsersIcon(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M17 21a7 7 0 0 0-14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M22 21a6 6 0 0 0-9-5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 5a3 3 0 0 1 0 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Globe(props: IconProps): React.JSX.Element {
  return <GlobeIcon {...props} />;
}

export function Smartphone(props: IconProps): React.JSX.Element {
  return <SmartphoneIcon {...props} />;
}

export function Terminal(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 17l6-5-6-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 19h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BatteryFull(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <rect x="2" y="7" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
      <path d="M22 11v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 11h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MessageSquare(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Reply(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M9 17l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4 12h10a6 6 0 0 1 6 6v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Send(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M22 2l-7 20-4-9-9-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Signal(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M2 20h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 20h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 20h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 20h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 20h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Smile(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 9h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 9h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Wifi(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12.5a10 10 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 16a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 19h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Youtube(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="7" width="18" height="10" rx="2.75" ry="2.75" fill="currentColor" />
      <path d="M11 10l4 2-4 2z" fill="#ffffff" />
    </svg>
  );
}

export function Check(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Languages(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 8l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 14l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 4h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LayoutGrid(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function List(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpDown(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M7 15l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Bluetooth(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPin(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Cpu(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 1l0 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 1l0 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 20l0 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 20l0 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 9l3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 14l3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 9l3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 14l3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Compass(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sun(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 21v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.22 4.22l1.42 1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.36 18.36l1.42 1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.22 19.78l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Puzzle(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M19.439 12.5a2.5 2.5 0 0 0-2.439-2.5h-1a2.5 2.5 0 0 1-2.5-2.5V6.5a2.5 2.5 0 0 0-2.5-2.5H7.5a2.5 2.5 0 0 0-2.5 2.5V7.5a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 0-2.5 2.5v3.5a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 1 2.5 2.5V21.5a2.5 2.5 0 0 0 2.5-2.5H11a2.5 2.5 0 0 1 2.5-2.5V17.5a2.5 2.5 0 0 0 2.5-2.5h1a2.5 2.5 0 0 0 2.5-2.5v-3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Battery(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 13v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Zap(props: IconProps): React.JSX.Element {
  return (
    <svg {...baseProps(props)}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
