import { useId } from "react";
import { OUTLINE } from "./EthiopiaMap";

// Animated vector scenes for the Services route steps, keyed by step key.
// All share a 400x250 canvas in the site's greys with red accents; the
// motion (keyframes in globals.css) stops under prefers-reduced-motion.

const box = "fill-steel-200 stroke-steel-400";
const still = "motion-reduce:animate-none";

/** Distribution: Ethiopia with routes flowing out of Addis Ababa and pins dropping on the main cities. */
function Distribution() {
  const addis = [385, 397];
  const cities = [
    [592, 355],
    [293, 221],
    [432, 91],
    [366, 527],
    [298, 152],
    [256, 485],
    [443, 252],
  ];
  return (
    <svg x="70" y="12" width="260" height="226" viewBox="-20 -20 1040 810" overflow="visible">
      <path d={OUTLINE} className="fill-steel-100 stroke-steel-300" strokeWidth="4" strokeLinejoin="round" />
      {cities.map(([x, y]) => (
        <path
          key={`r${x}`}
          d={`M${addis[0]} ${addis[1]} L${x} ${y}`}
          className={`animate-dash-flow stroke-red/60 ${still}`}
          strokeWidth="5"
          strokeDasharray="14 10"
          strokeLinecap="round"
        />
      ))}
      {[addis, ...cities].map(([x, y], i) => (
        <g key={`p${x}`} transform={`translate(${x} ${y})`}>
          <g className={`animate-pin-drop ${still}`} style={{ animationDelay: `${i * 0.3}s` }}>
            <path d="M0 0 C-14 -26 -30 -38 -30 -58 A30 30 0 1 1 30 -58 C30 -38 14 -26 0 0Z" className={i === 0 ? "fill-red" : "fill-steel-600"} />
            <circle cy="-58" r="11" className="fill-paper" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/** Wholesale: cartons dropping into stacks on pallets. */
function Wholesale() {
  const stacks = [
    { x: 70, n: 3 },
    { x: 160, n: 4 },
    { x: 250, n: 2 },
  ];
  let k = 0;
  return (
    <g>
      <line x1="30" y1="214" x2="370" y2="214" className="stroke-steel-300" strokeWidth="2" />
      {stacks.map(({ x, n }) => (
        <g key={x}>
          <rect x={x - 6} y="200" width="92" height="12" rx="2" className="fill-steel-400" />
          {Array.from({ length: n }, (_, j) => {
            const delay = k++ * 0.35;
            const red = x === 160 && j === n - 1;
            return (
              <g key={j} className={`animate-stack ${still}`} style={{ animationDelay: `${delay}s` }}>
                <rect x={x} y={160 - j * 42} width="80" height="40" rx="3" strokeWidth="2" className={red ? "fill-red stroke-red-ink" : box} />
                <line x1={x + 40} y1={160 - j * 42} x2={x + 40} y2={174 - j * 42} strokeWidth="6" className={red ? "stroke-paper/70" : "stroke-steel-300"} />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
}

/** Warehousing: a stocked rack with a red scanner beam sweeping the shelves. */
function Warehousing() {
  const shelves = [58, 112, 166];
  return (
    <g>
      {[60, 340].map((x) => (
        <rect key={x} x={x} y="30" width="8" height="190" rx="2" className="fill-steel-500" />
      ))}
      {shelves.map((y, row) => (
        <g key={y}>
          <rect x="60" y={y + 40} width="288" height="6" rx="2" className="fill-steel-400" />
          {[0, 1, 2, 3, 4].map((c) => {
            const w = c % 2 ? 44 : 50;
            const x = 82 + c * 52;
            const red = row === 1 && c === 2;
            return <rect key={c} x={x} y={y + 40 - (c % 2 ? 30 : 36)} width={w} height={c % 2 ? 30 : 36} rx="2" strokeWidth="1.5" className={red ? "fill-red stroke-red-ink" : box} />;
          })}
        </g>
      ))}
      <g className={`animate-scan ${still}`}>
        <rect x="52" y="34" width="304" height="3" rx="1.5" className="fill-red" />
        <rect x="52" y="37" width="304" height="16" className="fill-red/10" />
      </g>
    </g>
  );
}

/** Transportation: a delivery truck driving along a road with flowing lane marks. */
function Transportation() {
  return (
    <g>
      <rect x="0" y="176" width="400" height="44" className="fill-steel-600" />
      <line x1="0" y1="198" x2="400" y2="198" className={`animate-dash-flow stroke-paper/70 ${still}`} strokeWidth="3" strokeDasharray="16 8" />
      {/* Distant hills */}
      <path d="M0 176 Q60 130 120 162 T240 150 T400 158 V176 H0Z" className="fill-steel-100" />
      <svg x="0" y="0" width="400" height="250" overflow="hidden">
        <g className={`animate-drive ${still}`}>
          <rect x="20" y="118" width="96" height="52" rx="4" className="fill-steel-200 stroke-steel-400" strokeWidth="2" />
          <path d="M118 132 H142 L156 150 V170 H118Z" className="fill-red" />
          <rect x="128" y="137" width="14" height="12" rx="2" className="fill-paper/80" />
          {[42, 96, 140].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="172" r="10" className="fill-steel-700" />
              <circle cx={cx} cy="172" r="4" className="fill-steel-300" />
            </g>
          ))}
        </g>
      </svg>
    </g>
  );
}

/** Sales: bars growing into a rising trend, with a red arrow. */
function Sales() {
  const bars = [60, 88, 76, 120, 150];
  return (
    <g>
      <line x1="70" y1="210" x2="340" y2="210" className="stroke-steel-300" strokeWidth="2" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={86 + i * 50}
          y={210 - h}
          width="30"
          height={h}
          rx="4"
          className={`animate-grow [transform-box:fill-box] [transform-origin:bottom] ${i === bars.length - 1 ? "fill-red" : "fill-steel-300"} ${still}`}
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      <path d="M90 150 L150 122 L200 132 L250 88 L320 50" fill="none" className={`animate-dash-flow stroke-steel-600 ${still}`} strokeWidth="3" strokeDasharray="10 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M306 44 L326 46 L322 66" fill="none" className="stroke-steel-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Market development: a megaphone sending out pulsing waves. */
function MarketDevelopment() {
  return (
    <g>
      <g transform="translate(110 125)">
        <path d="M-40 -18 H-12 L40 -54 V54 L-12 18 H-40Z" className="fill-steel-300 stroke-steel-500" strokeWidth="2" strokeLinejoin="round" />
        <rect x="-52" y="-18" width="14" height="36" rx="4" className="fill-red" />
        <path d="M-30 18 L-22 52 H-8 L-14 18Z" className="fill-steel-400" />
      </g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${170 + i * 34} ${70 - i * 18} Q${200 + i * 44} 125 ${170 + i * 34} ${180 + i * 18}`}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className={`animate-wave stroke-red [transform-box:view-box] [transform-origin:150px_125px] ${still}`}
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
    </g>
  );
}

const scenes: Record<string, () => React.JSX.Element> = {
  distribution: Distribution,
  wholesale: Wholesale,
  warehousing: Warehousing,
  transportation: Transportation,
  sales: Sales,
  marketDevelopment: MarketDevelopment,
};

/** The step's scene on a soft dotted panel; nothing for an unknown key. */
export function RouteIllustration({ step, className = "" }: { step: string; className?: string }) {
  const id = useId();
  const Scene = scenes[step];
  if (!Scene) return null;
  return (
    <svg viewBox="0 0 400 250" aria-hidden="true" className={`block h-auto w-full ${className}`}>
      <defs>
        <pattern id={`${id}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.1" className="fill-steel-200" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-dots)`} />
      <Scene />
    </svg>
  );
}
