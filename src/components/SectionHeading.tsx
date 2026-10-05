import { Accent } from "./Accent";
import { Eyebrow } from "./Eyebrow";

const sizes = {
  /** Top-level section heading. */
  section: "text-4xl sm:text-6xl",
  /** Heading inside a band, panel or card, and long headline-style sentences. */
  band: "text-4xl sm:text-5xl",
} as const;

/**
 * The one section-heading pattern, styled after the logo: optional eyebrow,
 * then the heading with *starred* words in red and the rest in the logo's
 * steel gradient (plain white on dark bands).
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
  /** Plain text; wrap words in *stars* to accent them. */
  children: string;
}) {
  return (
    <>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`font-display-heading ${sizes[size]} ${onDark ? "text-paper" : "text-steel-700"} ${eyebrow ? "mt-4" : ""}`}>
        <Accent text={children} base={onDark ? undefined : "text-steel-gradient"} />
      </h2>
    </>
  );
}
