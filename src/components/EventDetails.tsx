import type { InvitationData } from '../data/invitationData'
import { SectionTitle } from './SectionTitle'
import { DetailCard } from './DetailCard'
import {
  DressIcon,
  DinnerIcon,
  InfoIcon,
  LockIcon,
} from './decorations/Icons'

interface EventDetailsProps {
  data: InvitationData
}

/**
 * Grid of practical detail cards. Occasion, host and venue are intentionally
 * left out here — they each have a dedicated, prominent home (the hero, the
 * hero host line, and the Venue section) — so nothing is repeated.
 */
export function EventDetails({ data }: EventDetailsProps) {
  const cards = [
    { icon: <DressIcon />, label: 'Dress Code', value: data.dressCode },
    { icon: <DinnerIcon />, label: 'Dinner', value: data.dinnerText },
    { icon: <InfoIcon />, label: 'Please Note', value: data.specialInstruction },
    { icon: <LockIcon />, label: 'Entry', value: data.privacyNote },
  ]

  return (
    <section className="section" aria-labelledby="details-heading">
      <div className="container">
        <SectionTitle
          kicker="Everything You Need"
          heading="Event Details"
          headingId="details-heading"
        />
        <div className="detail-grid">
          {cards.map((card, i) => (
            <DetailCard
              key={card.label}
              icon={card.icon}
              label={card.label}
              value={card.value}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetails
