import type { FeatureIcon } from "@/lib/schema";

// Minimal stroke icon set (lucide-style, 24x24, stroke-based).
const PATHS: Record<FeatureIcon, React.ReactNode> = {
  zap: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />,
  shield: <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />,
  chart: (
    <>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M17.5 14.7c2.4.6 4 2.3 4 5.3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7.5 12 13l10-5.5L12 2z" />
      <path d="M2 12.5 12 18l10-5.5" />
      <path d="M2 17.5 12 23l10-5.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 15c5-4 6.5-8.5 6.5-12.5C14.5 2.5 10 4 6 9l-1.5 4.5L9 18l3-3z" />
      <path d="M6 9l-3.5 1 2 2.5M15 12l1 3.5-2.5 2M4.5 19.5c1-1 1.5-2.5 1.5-2.5s-1.5.5-2.5 1.5S2 21.5 2 21.5s1.5-1 2.5-2z" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  wrench: (
    <path d="M14.5 6.5a4.5 4.5 0 0 0 6 6L13 20a2.1 2.1 0 0 1-3-3l7.5-7.5a4.5 4.5 0 0 0-6-6l3 3-3 3-3-3z" />
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 2.5V7M16 2.5V7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13.7 13.7 8.5 15.5l1.8-5.2 5.2-1.8z" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  inbox: (
    <>
      <path d="M22 13h-5.5l-1.5 3h-6l-1.5-3H2" />
      <path d="M5 4.5h14L22 13v5.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V13l3-8.5z" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 8a9 9 0 0 0-15.5-2.5L3 8" />
      <path d="M3 3v5h5M3 16a9 9 0 0 0 15.5 2.5L21 16" />
      <path d="M21 21v-5h-5" />
    </>
  ),
  "trending-up": (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: FeatureIcon;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
