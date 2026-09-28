type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const HouseIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M3.5 11 12 4l8.5 7" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M10 20v-5.5h4V20" />
  </svg>
);

export const KeyIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden="true">
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 8-8M16 7l2.5 2.5M14 9l2 2" />
  </svg>
);

export const ShieldIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M12 3.5 19 6v5.5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const TreeIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M12 3 6.5 11h3L6 16h12l-3.5-5h3z" />
    <path d="M12 16v5" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg {...base} strokeWidth={2} className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg {...base} strokeWidth={2} className={className} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Cross = ({ className }: P) => (
  <svg {...base} strokeWidth={2} className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const PhoneIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden="true">
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z" />
  </svg>
);

export function Logo({ className = "" }: P) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-clay text-white">
        <HouseIcon className="h-[18px] w-[18px]" />
      </span>
      <span className="display text-[22px] leading-none text-ink">Family Homes</span>
    </span>
  );
}
