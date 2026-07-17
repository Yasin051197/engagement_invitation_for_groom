import type { InvitationData } from '../data/invitationData'
import { SectionTitle } from './SectionTitle'
import { Reveal } from './Reveal'
import { AmpCrescent } from './decorations/Icons'

interface CoupleSectionProps {
  data: InvitationData
}

/** Returns the first letter of a name for the monogram. */
function initialOf(name: string): string {
  return name.trim().charAt(0).toUpperCase()
}

/** First name only — used for the "… ’s Family" blessing labels. */
function firstName(name: string): string {
  return name.trim().split(' ')[0]
}

/**
 * Groom & bride presented respectfully with monograms — the groom first, as the
 * hosting family's own — followed by an elegant
 * "With Blessings From" line naming only the parents of each family — keeping
 * the invitation premium and focused on the couple rather than a family list.
 */
export function CoupleSection({ data }: CoupleSectionProps) {
  return (
    <section className="section" aria-labelledby="couple-section-heading">
      <div className="container">
        <SectionTitle
          kicker="Two Families, One Bond"
          heading="The Blessed Couple"
          headingId="couple-section-heading"
        />

        <div className="couple">
          <Reveal className="couple__person couple__person--groom" delay={1}>
            <div className="couple__monogram" aria-hidden="true">
              {initialOf(data.groomName)}
            </div>
            <p className="couple__name">{data.groomTitle} {data.groomName}</p>
            <p className="couple__role">Groom</p>
          </Reveal>

          <Reveal className="couple__amp" delay={2}>
            <AmpCrescent />
          </Reveal>

          <Reveal className="couple__person couple__person--bride" delay={3}>
            <div className="couple__monogram" aria-hidden="true">
              {initialOf(data.brideName)}
            </div>
            <p className="couple__name">{data.brideTitle} {data.brideName}</p>
            <p className="couple__role">Bride</p>
          </Reveal>
        </div>

        <Reveal className="blessings" delay={2}>
          <p className="blessings__kicker">With Blessings From</p>
          <div className="blessings__grid">
            <div className="blessings__col">
              <p className="blessings__family">{firstName(data.groomName)}’s Family</p>
              <p className="blessings__names">{data.groomParents}</p>
            </div>
            <div className="blessings__col">
              <p className="blessings__family">{firstName(data.brideName)}’s Family</p>
              <p className="blessings__names">{data.brideParents}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CoupleSection
