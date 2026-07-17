import type { InvitationData } from '../data/invitationData'
import { SectionTitle } from './SectionTitle'
import { Reveal } from './Reveal'

interface InvitationMessageProps {
  data: InvitationData
}

/** Warm, respectful invitation message with one quote and a Hindi line. */
export function InvitationMessage({ data }: InvitationMessageProps) {
  return (
    <section className="section" aria-labelledby="invite-heading">
      <div className="container">
        <SectionTitle
          kicker="With Love & Duas"
          heading="You Are Invited"
          headingId="invite-heading"
        />
        <Reveal className="message__card">
          <p className="message__body">{data.invitationMessage}</p>
          <p className="message__quote">“{data.quotes[0]}”</p>
        </Reveal>
      </div>
    </section>
  )
}

export default InvitationMessage
