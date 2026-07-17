import type { InvitationData } from '../data/invitationData'
import { SectionTitle } from './SectionTitle'
import { Reveal } from './Reveal'

interface ScheduleSectionProps {
  data: InvitationData
}

/** Vertical, mobile-friendly programme timeline with rose-gold nodes. */
export function ScheduleSection({ data }: ScheduleSectionProps) {
  return (
    <section className="section" aria-labelledby="schedule-heading">
      <div className="container">
        <SectionTitle
          kicker="The Programme"
          heading="Order of the Evening"
          headingId="schedule-heading"
        />
        <ol className="timeline">
          {data.schedule.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="timeline__item"
            >
              <span className="timeline__dot" aria-hidden="true" />
              <p className="timeline__time">{item.time}</p>
              <p className="timeline__title">{item.title}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ScheduleSection
