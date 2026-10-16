import { MapPin } from "lucide-react";
import { useId } from "react";

// Ethiopia's outline (Natural Earth 1:50m, public domain), projected to a
// 1000-unit-wide viewBox; the marker is Addis Ababa.
export const OUTLINE = "M151.5 632.7 L150.4 631.4 L144.6 626.6 L139.1 620.4 L135.7 613.5 L132.5 607.9 L130.9 595.3 L126.8 587.5 L122.8 578.0 L116.8 560.0 L114.3 553.7 L109.5 549.5 L104.4 545.6 L99.2 537.6 L85.5 530.6 L80.2 525.0 L71.1 515.5 L68.8 510.7 L68.2 505.9 L65.4 501.4 L60.3 496.3 L44.5 485.4 L40.2 484.1 L34.5 482.9 L26.3 481.8 L15.2 479.3 L5.5 475.1 L1.0 472.0 L0.0 469.9 L0.9 466.4 L4.4 460.4 L11.1 446.2 L15.7 436.4 L18.8 433.6 L27.4 432.9 L36.5 433.2 L43.1 433.9 L52.5 434.0 L63.7 433.2 L68.1 429.9 L71.7 426.3 L73.1 423.8 L73.6 417.4 L73.6 412.3 L72.9 392.8 L72.5 380.8 L72.0 367.1 L72.0 364.4 L72.1 360.9 L74.9 346.2 L77.5 337.9 L79.2 333.5 L86.3 319.5 L87.6 315.1 L87.8 311.0 L85.2 292.3 L89.8 283.5 L95.6 274.7 L100.7 271.0 L105.0 268.5 L107.0 269.5 L111.9 273.6 L118.3 277.5 L121.3 276.7 L125.7 273.2 L129.0 269.5 L128.6 262.9 L131.5 249.4 L131.0 241.7 L134.1 232.0 L137.6 218.4 L139.1 209.8 L141.1 205.2 L150.4 195.7 L158.5 182.3 L163.6 172.5 L173.4 156.5 L178.3 150.6 L182.4 148.1 L188.4 146.5 L199.5 145.0 L207.5 143.7 L208.7 141.6 L209.4 138.4 L209.5 131.2 L211.0 118.9 L214.5 106.9 L218.6 97.8 L220.8 93.6 L223.5 89.6 L226.4 82.9 L230.2 68.3 L230.0 58.4 L235.4 40.2 L236.6 40.2 L245.7 36.8 L254.6 36.3 L263.1 38.6 L268.7 39.2 L271.3 38.1 L273.7 35.0 L276.0 30.2 L279.5 27.5 L284.3 26.9 L290.7 32.4 L301.0 47.0 L303.6 47.9 L305.2 47.5 L310.4 35.8 L314.4 26.7 L321.9 9.7 L326.1 0.0 L330.1 2.8 L334.0 7.8 L338.5 10.1 L343.3 11.5 L345.7 11.7 L348.7 13.7 L359.0 25.8 L362.7 28.6 L367.5 28.9 L388.1 25.0 L400.3 17.9 L402.2 15.1 L405.6 15.1 L409.7 18.3 L411.2 21.3 L413.8 25.2 L418.7 25.8 L430.4 23.0 L436.1 21.3 L441.0 22.7 L447.2 23.9 L451.1 23.9 L460.4 27.8 L471.5 26.6 L476.8 26.8 L482.2 28.5 L491.0 34.8 L502.4 42.4 L518.8 47.8 L522.1 50.1 L530.0 58.7 L542.3 75.4 L558.4 91.4 L575.9 104.0 L585.2 112.8 L591.5 123.4 L597.7 133.2 L604.0 137.3 L609.9 140.6 L615.9 148.0 L620.3 154.2 L626.2 161.3 L619.6 170.9 L610.9 183.7 L600.6 198.7 L597.5 202.4 L588.6 211.5 L587.1 214.0 L585.3 220.6 L585.2 232.5 L586.3 247.7 L587.4 261.7 L592.4 263.4 L598.1 264.4 L604.4 262.5 L612.0 260.9 L621.5 260.0 L632.0 257.2 L638.1 254.9 L644.6 255.1 L650.4 257.5 L653.2 259.8 L657.3 260.5 L662.5 260.4 L661.4 263.1 L658.5 266.9 L655.0 270.8 L651.8 274.8 L644.9 286.0 L644.7 287.4 L645.6 289.6 L649.3 294.7 L653.2 303.0 L655.4 310.6 L657.1 314.2 L661.8 318.5 L668.6 327.1 L672.3 333.0 L679.8 336.1 L682.2 343.5 L687.9 354.4 L694.0 363.1 L699.9 369.9 L706.5 372.5 L709.1 372.8 L722.9 385.4 L733.3 395.0 L735.9 396.5 L754.9 402.8 L776.6 410.0 L794.1 415.8 L816.3 423.2 L838.3 430.5 L858.8 437.5 L887.7 447.3 L911.0 455.2 L929.3 461.4 L933.2 463.4 L955.1 463.4 L977.3 463.4 L1000.0 463.4 L983.5 479.4 L964.9 497.6 L945.4 516.7 L932.8 529.0 L912.8 548.5 L896.2 564.7 L879.1 582.5 L863.6 598.5 L843.5 620.8 L830.4 635.1 L810.0 657.7 L797.2 671.9 L795.3 672.7 L776.9 671.6 L759.1 670.6 L736.3 669.2 L733.7 669.3 L727.0 670.6 L723.0 671.9 L706.6 675.7 L703.6 676.7 L690.0 682.8 L676.1 690.0 L668.7 695.4 L663.1 703.4 L660.6 709.1 L658.1 711.6 L653.7 713.8 L624.6 719.2 L616.1 719.9 L602.5 724.2 L595.2 731.4 L593.2 735.0 L583.4 734.9 L566.3 736.0 L559.0 737.2 L555.4 737.4 L548.9 737.3 L543.5 736.0 L540.0 734.1 L535.5 729.6 L525.6 720.7 L518.5 715.1 L502.7 721.5 L488.5 727.9 L468.3 737.0 L456.8 743.6 L453.4 750.1 L444.5 762.1 L436.6 769.4 L433.6 770.3 L415.7 768.7 L409.2 767.3 L398.5 765.9 L384.1 763.3 L374.5 760.5 L364.0 760.2 L348.9 759.3 L339.6 757.3 L330.2 750.6 L318.0 742.7 L305.5 734.5 L292.6 726.0 L277.4 716.3 L260.8 705.7 L257.0 704.6 L255.3 704.4 L237.3 704.0 L218.5 703.5 L205.8 703.1 L201.8 701.9 L198.9 699.5 L195.0 691.6 L190.0 686.0 L184.5 678.9 L184.1 669.3 L185.6 658.8 L187.0 655.3 L186.2 651.9 L186.4 647.1 L183.3 642.7 L164.9 637.6 L161.9 638.0 L158.8 639.9 L155.3 641.3 L152.8 640.0 L151.3 638.1 L151.2 635.0 L151.5 632.7Z";

/**
 * Where a latitude/longitude falls on the outline: its linear projection,
 * calibrated on Ethiopia's west edge (32.99°E at x 0, about 66.7 px per
 * degree) and the Addis Ababa marker (9.03°N, 38.74°E at 384.5, 396.9).
 */
export function project(lat: number, lng: number): [number, number] {
  return [(lng - 32.99) * 66.67, 396.9 + (9.03 - lat) * 66.3];
}

/** A smaller marker on the map (e.g. a warehouse or depot), red or grey. */
export type MapPoint = { key: string; lat: number; lng: number; tone?: "red" | "grey" };

/**
 * Decorative vector map of Ethiopia: a dot-pattern fill inside a soft
 * outline that a red segment traces continuously, with a pulsing red marker
 * on Addis Ababa under a pin callout bubble. Purely visual
 * (aria-hidden); size and place it with className.
 */
export function EthiopiaMap({
  className = "",
  label,
  points = [],
}: {
  className?: string;
  /** Marker caption, e.g. "Addis Ababa". */
  label?: string;
  /** Extra markers, placed by latitude/longitude. */
  points?: MapPoint[];
}) {
  const id = useId();
  return (
    // Padded past the outline so its border (and the red trace) isn't clipped at the edges.
    <svg viewBox="-20 -20 1040 810.3" aria-hidden="true" className={`pointer-events-none overflow-visible ${className}`}>
      <defs>
        <pattern id={`${id}-dots`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="1.8" className="fill-steel-200" />
        </pattern>
      </defs>
      <path d={OUTLINE} fill={`url(#${id}-dots)`} />
      <path d={OUTLINE} fill="none" strokeWidth="2.5" strokeLinejoin="round" className="stroke-steel-300" />
      {/* A red segment travelling round the border, looping */}
      <path
        d={OUTLINE}
        fill="none"
        pathLength={1}
        strokeDasharray="0.16 0.84"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-map-trace stroke-red motion-reduce:hidden"
      />
      {points.map((point) => {
        const [x, y] = project(point.lat, point.lng);
        return (
          <g key={point.key}>
            <circle cx={x} cy={y} r="11" className={point.tone === "grey" ? "fill-steel-500" : "fill-red"} />
            <circle cx={x} cy={y} r="4" className="fill-paper" />
          </g>
        );
      })}
      <g>
        <circle cx="384.5" cy="396.9" r="12" className="animate-dot-pulse fill-red [transform-box:fill-box] [transform-origin:center] motion-reduce:hidden" />
        <circle cx="384.5" cy="396.9" r="12" className="fill-red" />
        <circle cx="384.5" cy="396.9" r="4.5" className="fill-paper" />
        {/* Callout bubble above the marker: pin icon and the city name */}
        {label && (
          <foreignObject x="164.5" y="306.9" width="440" height="72">
            <div className="flex h-full items-start justify-center">
              <div className="relative flex items-center gap-2.5 rounded-full bg-paper px-6 py-3 text-[26px] leading-none font-bold tracking-wide whitespace-nowrap text-ink uppercase shadow-[0_8px_24px_-8px_rgb(0_0_0/0.3)] ring-1 ring-black/5">
                <MapPin className="size-7 text-red" strokeWidth={2.5} />
                {label}
                {/* Tail pointing down at the marker */}
                <span className="absolute -bottom-2 left-1/2 size-4 -translate-x-1/2 rotate-45 bg-paper" />
              </div>
            </div>
          </foreignObject>
        )}
      </g>
    </svg>
  );
}
