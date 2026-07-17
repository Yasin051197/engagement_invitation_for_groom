import { DividerOrnament } from './decorations/Icons'
import { Reveal } from './Reveal'

interface SectionTitleProps {
  /** Small uppercase eyebrow above the heading (optional). */
  kicker?: string
  heading: string
  /** id for the <h2>, so a parent <section> can aria-labelledby it. */
  headingId?: string
}

/** Centered section heading with an eyebrow and a shimmering rose-gold divider. */
export function SectionTitle({ kicker, heading, headingId }: SectionTitleProps) {
  return (
    <Reveal className="section-title">
      {kicker && <span className="section-title__kicker">{kicker}</span>}
      <h2 id={headingId} className="section-title__heading">
        {heading}
      </h2>
      <OrnamentalDivider />
    </Reveal>
  )
}

/** Reusable rose-gold ornamental divider (shimmer lines + center motif). */
export function OrnamentalDivider() {
  return (
    <div className="divider" aria-hidden="true">
      <span className="divider__line" />
      <DividerOrnament className="divider__ornament" />
      <span className="divider__line" />
    </div>
  )
}

export default SectionTitle
