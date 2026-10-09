import { RoleVideo } from "./RoleVideo";

// Small looping scenes for the team cards: what each role does, at a glance.
// Drawn in currentColor (dark grey on the card) with red accents on a 200x125 canvas, sized
// for the card's 16:10 panel. Keyframes live in globals.css; all motion
// stops under prefers-reduced-motion (the still frame still reads).

const still = "motion-reduce:animate-none";
const line = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const box = "[transform-box:fill-box] [transform-origin:center]";

/** CEO / leadership: an arrow flying into the bullseye (vision and direction). */
function Leader() {
  return (
    <g>
      {[30, 21, 12].map((r) => (
        <circle key={r} cx="130" cy="62" r={r} {...line} />
      ))}
      <circle cx="130" cy="62" r="4" className="fill-red" />
      <g className={`animate-arrow-hit ${still}`}>
        <path d="M60 62 H126" {...line} />
        <path d="M60 62 l-8 -7 M60 62 l-8 7 M66 62 l-8 -7 M66 62 l-8 7" {...line} strokeWidth={2.5} />
      </g>
    </g>
  );
}

/** Sales: bars growing into a rising trend. */
function Sales() {
  const bars = [22, 34, 30, 48, 62];
  return (
    <g>
      <path d="M48 100 H152" {...line} strokeWidth={2} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={56 + i * 19}
          y={98 - h}
          width="11"
          height={h}
          rx="2"
          className={`animate-grow [transform-box:fill-box] [transform-origin:bottom] ${i === bars.length - 1 ? "fill-red" : "fill-current opacity-80"} ${still}`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      <path d="M58 64 L82 52 L100 58 L124 36 L150 24" {...line} strokeDasharray="6 5" className={`animate-dash-flow ${still}`} />
      <path d="M140 22 L152 23 L150 35" {...line} />
    </g>
  );
}

/** Marketing: a megaphone sending out waves. */
function Marketing() {
  return (
    <g>
      <path d="M62 52 H76 L108 34 V90 L76 72 H62 Z" {...line} />
      <rect x="54" y="52" width="8" height="20" rx="3" className="fill-red" />
      <path d="M70 72 L74 92 H84 L80 72" {...line} strokeWidth={2.5} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${118 + i * 12} ${44 - i * 7} Q${130 + i * 16} 62 ${118 + i * 12} ${80 + i * 7}`}
          {...line}
          className={`animate-wave ${i === 0 ? "stroke-red" : ""} [transform-box:view-box] [transform-origin:108px_62px] ${still}`}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </g>
  );
}

/** Media & communications: a clapperboard snapping, with a blinking REC light. */
function Media() {
  return (
    <g>
      <rect x="62" y="52" width="76" height="46" rx="5" {...line} />
      <path d="M62 66 H138" {...line} strokeWidth={2} />
      <g className={`animate-clap [transform-box:fill-box] [transform-origin:0%_100%] ${still}`}>
        <path d="M62 50 L136 38 L138 50 Z" {...line} />
        <path d="M80 47 L88 39 M100 44 L108 36 M120 41 L128 33" {...line} strokeWidth={2.5} />
      </g>
      <circle cx="150" cy="30" r="5" className={`animate-pulse fill-red ${still}`} />
      <text x="158" y="34" className="fill-current text-[11px] font-bold tracking-wider">REC</text>
    </g>
  );
}

/** HR: three people, with a heart floating up between them. */
function People() {
  const person = (x: number, s = 1) => (
    <g transform={`translate(${x} 0) scale(${s})`} key={x}>
      <circle cx="0" cy="58" r="10" {...line} />
      <path d="M-17 96 C-17 80 17 80 17 96" {...line} />
    </g>
  );
  return (
    <g>
      <g transform="translate(0 4)">
        {person(66)}
        {person(134)}
      </g>
      <g transform="translate(100 -4)">{person(0)}</g>
      <path
        d="M100 40 C94 34 86 38 90 45 L100 54 L110 45 C114 38 106 34 100 40 Z"
        className={`animate-float-up fill-red ${box} ${still}`}
      />
    </g>
  );
}

/** Finance: coins stacking up. */
function Finance() {
  return (
    <g>
      <path d="M50 100 H150" {...line} strokeWidth={2} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} className={`animate-stack ${still}`} style={{ animationDelay: `${i * 0.3}s` }}>
          <ellipse cx="100" cy={92 - i * 10} rx="24" ry="7" className={i === 4 ? "fill-red" : "fill-current opacity-90"} />
          <ellipse cx="100" cy={92 - i * 10} rx="24" ry="7" fill="none" stroke="#ededee" strokeWidth="1.5" />
        </g>
      ))}
      <text x="128" y="44" className="fill-current text-[22px] font-bold">$</text>
    </g>
  );
}

/** General services: an office building with its windows lighting up. */
function Facilities() {
  return (
    <g>
      <rect x="70" y="26" width="60" height="74" rx="3" {...line} />
      <path d="M50 100 H150" {...line} strokeWidth={2} />
      <rect x="93" y="84" width="14" height="16" rx="1.5" {...line} strokeWidth={2.5} />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={78 + col * 16}
            y={34 + row * 15}
            width="12"
            height="9"
            rx="1.5"
            className={`animate-blink ${row === 1 && col === 1 ? "fill-red" : "fill-current"} ${still}`}
            style={{ animationDelay: `${(row * 3 + col) * 0.18}s` }}
          />
        )),
      )}
    </g>
  );
}

/** Store & warehouse: boxes dropping onto a shelf. */
function Warehouse() {
  const boxes = [
    { x: 58, y: 70 },
    { x: 92, y: 70 },
    { x: 126, y: 70 },
    { x: 75, y: 42 },
    { x: 109, y: 42 },
  ];
  return (
    <g>
      <path d="M48 100 H152" {...line} />
      {boxes.map((b, i) => (
        <g key={i} className={`animate-stack ${still}`} style={{ animationDelay: `${i * 0.28}s` }}>
          <rect x={b.x} y={b.y} width="30" height="26" rx="2" {...line} className={i === 4 ? "fill-red stroke-red" : ""} />
          <path d={`M${b.x + 15} ${b.y} V${b.y + 8}`} {...line} strokeWidth={2.5} className={i === 4 ? "stroke-paper" : ""} />
        </g>
      ))}
    </g>
  );
}

/** Technical: two gears turning together. */
function Gears() {
  const gear = (cx: number, cy: number, r: number, teeth: number) => {
    const d = Array.from({ length: teeth }, (_, i) => {
      const a = (i / teeth) * Math.PI * 2;
      const x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r;
      const x2 = cx + Math.cos(a) * (r + 7), y2 = cy + Math.sin(a) * (r + 7);
      return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }).join(" ");
    return (
      <>
        <circle cx={cx} cy={cy} r={r} {...line} />
        <path d={d} {...line} strokeWidth={5} />
      </>
    );
  };
  return (
    <g>
      <g className={`animate-[spin_6s_linear_infinite] ${box} ${still}`}>
        {gear(84, 62, 22, 10)}
        <circle cx="84" cy="62" r="6" className="fill-red" />
      </g>
      <g className={`animate-[spin_4s_linear_infinite_reverse] ${box} ${still}`}>{gear(128, 48, 14, 8)}</g>
    </g>
  );
}

/** Anyone else: a person, gently pulsing. */
function Person() {
  return (
    <g className={`animate-pulse ${still}`}>
      <circle cx="100" cy="50" r="14" {...line} />
      <path d="M76 100 C76 76 124 76 124 100" {...line} />
    </g>
  );
}

// Roles by keywords in the English job title (first match wins).
const roles: [RegExp, string][] = [
  [/\bceo\b|owner|director|managing/i, "leader"],
  [/media|communication/i, "media"],
  [/marketing/i, "marketing"],
  [/sales/i, "sales"],
  [/\bhr\b|human resources|people/i, "hr"],
  [/finance|account/i, "finance"],
  [/general services|facilities|admin/i, "facilities"],
  [/store|warehouse|logistics/i, "warehouse"],
  [/technical|\bit\b|tech/i, "technical"],
];
/** A short key for a role (English job title), e.g. "marketing". */
export const roleKey = (role: string) => roles.find(([re]) => re.test(role))?.[1] ?? "person";

const scenes: Record<string, () => React.JSX.Element> = {
  leader: Leader,
  media: Media,
  marketing: Marketing,
  sales: Sales,
  hr: People,
  finance: Finance,
  facilities: Facilities,
  warehouse: Warehouse,
  technical: Gears,
};

// Animated SVG illustrations in public/role-animations/<key>.svg, used in
// place of the built-in scene for these roles. Add a key here when adding a file.
const svgFiles = new Set(["marketing", "sales"]);
// Looping clips in public/role-animations/<key>.webm (take priority over the SVGs).
const videoFiles = new Set<string>([]);

/** The animation for a role (English job title): its clip or illustration file if there is one, else the built-in scene. */
export function RoleAnimation({ role, className = "" }: { role: string; className?: string }) {
  const key = roleKey(role);
  if (videoFiles.has(key)) return <RoleVideo src={`/role-animations/${key}.webm`} className={className} />;
  if (svgFiles.has(key)) {
    // Plain <img>: the file's own animation (SMIL) plays; next/image would rasterise it.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/role-animations/${key}.svg`} alt="" aria-hidden="true" loading="lazy" className={`block h-full w-full scale-[1.35] object-contain ${className}`} />;
  }
  const Scene = scenes[key] ?? Person;
  return (
    <svg viewBox="0 0 200 125" aria-hidden="true" className={`block h-full w-full ${className}`}>
      <Scene />
    </svg>
  );
}
