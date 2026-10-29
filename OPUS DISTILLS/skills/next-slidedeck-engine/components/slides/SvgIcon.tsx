import React from 'react';

export type IconName =
  | 'cpu'
  | 'sparkles'
  | 'activity'
  | 'zap'
  | 'shield'
  | 'layers'
  | 'database'
  | 'server'
  | 'terminal'
  | 'bar-chart'
  | 'trending-up'
  | 'target'
  | 'network'
  | 'box'
  | 'git-branch'
  | 'check-circle'
  | 'lock'
  | 'file-text'
  | 'globe'
  | 'compass'
  | 'code'
  | 'gauge'
  | 'workflow';

interface SvgIconProps {
  name?: string;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * Pure Mathematical SVG Vector Icons — Zero Emojis Guaranteed
 * Engineering-grade, razor-sharp icons for slide cards and design elements.
 */
export const SvgIcon: React.FC<SvgIconProps> = ({
  name = 'cpu',
  size = 20,
  className = '',
  color = 'currentColor',
  strokeWidth = 1.75,
}) => {
  const normalized = (name || 'cpu').toLowerCase().trim();

  const renderPath = () => {
    switch (normalized) {
      case 'cpu':
        return (
          <>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
          </>
        );
      case 'sparkles':
        return (
          <>
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
          </>
        );
      case 'activity':
        return <path d="M22 12h-4l-3 9L9 3l-3 9H2" />;
      case 'zap':
        return <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />;
      case 'shield':
        return <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />;
      case 'layers':
        return (
          <>
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
          </>
        );
      case 'database':
        return (
          <>
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          </>
        );
      case 'server':
        return (
          <>
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
            <line x1="6" x2="6.01" y1="6" y2="6" />
            <line x1="6" x2="6.01" y1="18" y2="18" />
          </>
        );
      case 'terminal':
        return (
          <>
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" x2="20" y1="19" y2="19" />
          </>
        );
      case 'bar-chart':
        return (
          <>
            <line x1="12" x2="12" y1="20" y2="10" />
            <line x1="18" x2="18" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="16" />
          </>
        );
      case 'trending-up':
        return (
          <>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </>
        );
      case 'target':
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </>
        );
      case 'network':
        return (
          <>
            <rect x="9" y="2" width="6" height="6" rx="1" />
            <rect x="2" y="16" width="6" height="6" rx="1" />
            <rect x="16" y="16" width="6" height="6" rx="1" />
            <path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
            <line x1="12" x2="12" y1="8" y2="11" />
          </>
        );
      case 'box':
        return (
          <>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </>
        );
      case 'git-branch':
        return (
          <>
            <line x1="6" x2="6" y1="3" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </>
        );
      case 'check-circle':
        return (
          <>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </>
        );
      case 'lock':
        return (
          <>
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </>
        );
      case 'file-text':
        return (
          <>
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8M16 13H8M16 17H8" />
          </>
        );
      case 'globe':
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </>
        );
      case 'compass':
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </>
        );
      case 'code':
        return (
          <>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </>
        );
      case 'gauge':
        return (
          <>
            <path d="m12 14 4-4" />
            <path d="M3.34 19a10 10 0 1 1 17.32 0" />
          </>
        );
      case 'workflow':
        return (
          <>
            <rect x="3" y="3" width="6" height="6" rx="1" />
            <rect x="15" y="3" width="6" height="6" rx="1" />
            <rect x="9" y="15" width="6" height="6" rx="1" />
            <path d="M6 9v3a1 1 0 0 0 1 1h4M18 9v3a1 1 0 0 1-1 1h-4" />
          </>
        );
      default:
        return (
          <>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
          </>
        );
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {renderPath()}
    </svg>
  );
};

/**
 * CAD Telemetry Crosshair Accent for Card Corners
 */
export const TelemetryCrosshair: React.FC<{ color?: string; size?: number; className?: string }> = ({
  color = 'currentColor',
  size = 10,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 10 10"
    fill="none"
    className={`pointer-events-none opacity-40 ${className}`}
  >
    <line x1="5" y1="0" x2="5" y2="10" stroke={color} strokeWidth="1" />
    <line x1="0" y1="5" x2="10" y2="5" stroke={color} strokeWidth="1" />
  </svg>
);

/**
 * Technical Status Pill Badge
 */
export const StatusPill: React.FC<{
  label: string;
  icon?: string;
  color?: string;
  borderColor?: string;
  bg?: string;
}> = ({ label, icon, color = '#FAFAFA', borderColor = '#27272A', bg = 'transparent' }) => (
  <div
    className="inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase font-semibold"
    style={{ borderColor, backgroundColor: bg, color }}
  >
    {icon ? (
      <SvgIcon name={icon} size={10} color={color} strokeWidth={2} />
    ) : (
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
    )}
    <span>{label}</span>
  </div>
);
