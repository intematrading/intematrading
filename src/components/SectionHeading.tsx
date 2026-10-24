import { Eyebrow } from "./Eyebrow";

// "Ethiopia" and its forms in English and French (Ethiopian, Éthiopie, éthiopien…).
const ETHIOPIA = /(Ethiopian?|[ÉéE]thiopi(?:e|ens?|ennes?))/gi;

/** Heading text with every mention of Ethiopia in red (the rest keeps the heading's own colour). */
export function highlightEthiopia(text: string): React.ReactNode {
  const parts = text.split(ETHIOPIA);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 ? <span key={i} className="text-red">{part}</span> : part));
}

const sizes = {
  /** Top-level section heading. */
  section: "text-4xl sm:text-6xl",
  /** Heading inside a band, panel or card, and long headline-style sentences. */
  band: "text-4xl sm:text-5xl",
} as const;

/**
 * The one section-heading pattern, styled after the logo: optional eyebrow,
 * then the heading in the logo's steel gradient (plain white on dark bands).
 * The only red accent is "Ethiopia" wherever it appears; *stars* in the copy
 * (a CMS convention for accenting words elsewhere) are dropped here.
 */
export function SectionHeading({
  id,
  eyebrow,
  onDark = false,
  size = "section",
  children,
}: {
  id?: string;
  eyebrow?: string;
  onDark?: boolean;
  size?: keyof typeof sizes;
  /** Plain text (any *stars* are dropped). */
  children: string;
}) {
  const text = children.replace(/\*/g, "");
  return (
    <>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`font-display-heading ${sizes[size]} ${onDark ? "text-paper" : "text-steel-700"} ${eyebrow ? "mt-4" : ""}`}>
        {onDark ? highlightEthiopia(text) : <span className="text-steel-gradient">{highlightEthiopia(text)}</span>}
      </h2>
    </>
  );
}
