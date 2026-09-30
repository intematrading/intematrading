import { Accent } from "./Accent";
import { Eyebrow } from "./Eyebrow";

const sizes = {
  /** Top-level section heading. */
  section: "text-4xl sm:text-6xl",
  /** Heading inside a band, panel or card, and long headline-style sentences. */
  band: "text-4xl sm:text-5xl",
} as const;

/**
 * The one section-heading pattern: optional eyebrow, the heading (with
 * *starred* words in red), and a short red rule when there's no eyebrow,
 * so every heading carries exactly one red marker.
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
      <h2 id={id} className={`font-display-heading ${sizes[size]} ${onDark ? "text-paper" : "text-black"} ${eyebrow ? "mt-4" : ""}`}>
        <Accent text={children} />
      </h2>
      {!eyebrow && <span aria-hidden="true" className="mt-4 block h-1 w-14 bg-red in-[.on-red]:bg-black" />}
    </>
  );
}
