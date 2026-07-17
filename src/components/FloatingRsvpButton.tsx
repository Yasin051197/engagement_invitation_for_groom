import { useEffect, useState } from 'react'
import type { InvitationData } from '../data/invitationData'
import { buildWhatsAppRsvpLink } from '../utils/links'
import { WhatsAppIcon } from './decorations/Icons'

interface FloatingRsvpButtonProps {
  data: InvitationData
}

/**
 * A floating WhatsApp RSVP button that gently appears once the guest scrolls
 * past the hero — handy on mobile so RSVP is always one tap away.
 */
export function FloatingRsvpButton({ data }: FloatingRsvpButtonProps) {
  const [visible, setVisible] = useState(false)
  // Floating button reaches the first listed contact; the RSVP section lists all.
  const link = buildWhatsAppRsvpLink(data, data.rsvpContacts[0].phone)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 520)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`fab${visible ? '' : ' fab--hidden'}`}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="RSVP for the engagement ceremony on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <WhatsAppIcon className="fab__icon" />
      RSVP
    </a>
  )
}

export default FloatingRsvpButton
