import { seeded } from "../lib/site";

/**
 * Hand-built painterly landscape: a bright Panhandle day over green rolling fields,
 * pine treelines and a manufactured home on the hill.
 * Generated deterministically so server and client markup match.
 */

const rand = seeded(42);

function pines(baseY: (x: number) => number, from: number, to: number, count: number, h: [number, number]) {
  const out: { x: number; y: number; h: number }[] = [];
  for (let i = 0; i < count; i++) {
    const x = from + ((to - from) * i) / count + rand() * 18;
    out.push({ x, y: baseY(x), h: h[0] + rand() * (h[1] - h[0]) });
  }
  return out;
}

const ridgeFar = (x: number) => 520 - 38 * Math.sin(x / 210) - 22 * Math.sin(x / 90 + 1);
const ridgeNear = (x: number) => 575 - 30 * Math.sin(x / 260 + 2) - 14 * Math.sin(x / 70);

const farPines = pines(ridgeFar, -20, 1620, 70, [26, 54]);
const nearPines = [
  ...pines(ridgeNear, -20, 520, 26, [40, 80]),
  ...pines(ridgeNear, 1080, 1620, 26, [40, 80]),
];

const flowerColors = ["#ffffff", "#f7e27a", "#fff4e6", "#f3c6b3", "#c9a2cf", "#f6d9a6"];
const flowers = Array.from({ length: 520 }, () => {
  const y = 700 + Math.pow(rand(), 0.7) * 220;
  const depth = (y - 700) / 220;
  return {
    x: rand() * 1600,
    y,
    r: 1.5 + depth * 5.5 * (0.6 + rand() * 0.6),
    c: flowerColors[Math.floor(rand() * flowerColors.length)],
    o: 0.55 + rand() * 0.45,
  };
});

const grass = Array.from({ length: 260 }, () => {
  const x = rand() * 1600;
  const y = 690 + rand() * 230;
  const len = 18 + ((y - 690) / 230) * 70 * (0.5 + rand());
  const bend = (rand() - 0.5) * 30;
  return { x, y, len, bend, c: rand() > 0.5 ? "#7fae4c" : "#6a9a3e" };
});

const birds = [
  [1060, 190, 1],
  [1105, 170, 0.8],
  [1150, 200, 0.9],
  [1190, 176, 0.7],
  [1270, 214, 0.6],
] as const;

export default function Scene({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1600 920"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9d3e0" />
          <stop offset="0.35" stopColor="#c8e3e0" />
          <stop offset="0.62" stopColor="#e6f0d6" />
          <stop offset="1" stopColor="#f3f1d2" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffbe6" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#fbf3c4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f3efc0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9dbfb0" />
          <stop offset="1" stopColor="#b2d0bb" />
        </linearGradient>
        <linearGradient id="near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f9e7e" />
          <stop offset="1" stopColor="#84b08f" />
        </linearGradient>
        <linearGradient id="hillA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9dc86" />
          <stop offset="1" stopColor="#98c466" />
        </linearGradient>
        <linearGradient id="hillB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9d275" />
          <stop offset="1" stopColor="#88b858" />
        </linearGradient>
        <linearGradient id="meadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fcb68" />
          <stop offset="1" stopColor="#d2e6ae" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="haze">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.35  0 0 0 0 0.2  0 0 0 0.08 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1600" height="920" fill="url(#sky)" />

      {/* Clouds */}
      <g filter="url(#soft)" className="drift">
        <ellipse cx="260" cy="120" rx="260" ry="34" fill="#ffffff" opacity="0.7" />
        <ellipse cx="620" cy="70" rx="300" ry="26" fill="#f4fbfb" opacity="0.6" />
        <ellipse cx="1180" cy="110" rx="340" ry="32" fill="#ffffff" opacity="0.65" />
        <ellipse cx="1480" cy="260" rx="200" ry="22" fill="#f8fcf4" opacity="0.6" />
        <ellipse cx="420" cy="300" rx="260" ry="18" fill="#fbfdf2" opacity="0.7" />
        <ellipse cx="1000" cy="340" rx="320" ry="16" fill="#fdfdf0" opacity="0.6" />
      </g>

      {/* Sun */}
      <circle cx="800" cy="468" r="200" fill="url(#sunGlow)" />
      <circle cx="800" cy="478" r="46" fill="#fffbe0" />

      {/* Birds */}
      <g fill="none" stroke="#4b5d52" strokeWidth="2.4" strokeLinecap="round">
        {birds.map(([x, y, s], i) => (
          <path
            key={i}
            d={`M${x - 12 * s} ${y - 4 * s} q${6 * s} ${-6 * s} ${12 * s} ${4 * s} q${6 * s} ${-10 * s} ${12 * s} ${-4 * s}`}
          />
        ))}
      </g>

      {/* Far pine ridge */}
      <g filter="url(#haze)">
        <path
          d={`M0 920 L0 ${ridgeFar(0)} ${Array.from({ length: 81 }, (_, i) => `L${i * 20} ${ridgeFar(i * 20)}`).join(" ")} L1600 920 Z`}
          fill="url(#far)"
        />
        {farPines.map((p, i) => (
          <path
            key={i}
            d={`M${p.x} ${p.y - p.h} L${p.x + p.h * 0.22} ${p.y + 4} L${p.x - p.h * 0.22} ${p.y + 4} Z`}
            fill="#8db3a0"
          />
        ))}
      </g>

      {/* Near pine ridge */}
      <path
        d={`M0 920 L0 ${ridgeNear(0)} ${Array.from({ length: 81 }, (_, i) => `L${i * 20} ${ridgeNear(i * 20)}`).join(" ")} L1600 920 Z`}
        fill="url(#near)"
      />
      {nearPines.map((p, i) => (
        <g key={i} fill="#5d8c6c">
          <rect x={p.x - 1.5} y={p.y - p.h * 0.35} width="3" height={p.h * 0.4} />
          <path
            d={`M${p.x} ${p.y - p.h} L${p.x + p.h * 0.2} ${p.y - p.h * 0.3} L${p.x - p.h * 0.2} ${p.y - p.h * 0.3} Z`}
          />
        </g>
      ))}

      {/* Rolling green hills */}
      <path d="M-40 920 L-40 610 C 220 560 480 590 760 650 C 980 700 1100 720 1300 720 L1300 920 Z" fill="url(#hillA)" />
      <path d="M500 920 L500 700 C 780 660 1040 600 1300 590 C 1440 585 1560 600 1640 620 L1640 920 Z" fill="url(#hillB)" />

      {/* The home on the hill */}
      <g transform="translate(1130 552)">
        <ellipse cx="95" cy="46" rx="130" ry="10" fill="#5f8a3c" opacity="0.35" />
        <rect x="0" y="6" width="190" height="38" rx="2" fill="#f4e7d4" />
        <path d="M-6 8 L95 -14 L196 8 Z" fill="#8c5c47" />
        <rect x="-6" y="6" width="202" height="4" fill="#7a4d3b" />
        {[16, 46, 132, 162].map((x) => (
          <rect key={x} x={x} y="16" width="16" height="12" rx="1" fill="#f7cf87" />
        ))}
        <rect x="86" y="14" width="18" height="30" rx="1" fill="#a86a50" />
        <rect x="74" y="40" width="42" height="5" fill="#b98a66" />
        <rect x="0" y="42" width="190" height="4" fill="#d9c2a5" />
        <path d="M210 44 q10 -30 22 -36 q12 6 18 36 Z" fill="#4f7f3a" opacity="0.9" />
        <path d="M-40 44 q8 -22 18 -26 q10 4 14 26 Z" fill="#5d8f45" opacity="0.9" />
      </g>

      {/* Meadow */}
      <path d="M-40 920 L-40 720 C 300 690 700 700 1000 710 C 1260 720 1460 700 1640 690 L1640 920 Z" fill="url(#meadow)" />

      <g strokeLinecap="round" fill="none">
        {grass.map((g, i) => (
          <path
            key={i}
            d={`M${g.x} ${g.y} q${g.bend * 0.3} ${-g.len * 0.6} ${g.bend} ${-g.len}`}
            stroke={g.c}
            strokeWidth={1 + (g.y - 690) / 120}
            opacity="0.7"
          />
        ))}
      </g>
      <g>
        {flowers.map((f, i) => (
          <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={f.c} opacity={f.o} />
        ))}
      </g>

      {/* Painterly grain */}
      <rect width="1600" height="920" filter="url(#grain)" />
    </svg>
  );
}
