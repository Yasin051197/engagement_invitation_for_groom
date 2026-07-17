import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface DetailCardProps {
  icon: ReactNode
  label: string
  value: string
  /** Optional secondary line shown muted under the value. */
  note?: string
  /** Stagger delay for the scroll reveal. */
  delay?: 1 | 2 | 3 | 4 | 5
}

/** A single event-detail card: icon badge + label + value (+ optional note). */
export function DetailCard({ icon, label, value, note, delay }: DetailCardProps) {
  return (
    <Reveal as="div" delay={delay} className="detail-card">
      <span className="detail-card__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="detail-card__label">{label}</p>
        <p className="detail-card__value">
          {value}
          {note && <span>{note}</span>}
        </p>
      </div>
    </Reveal>
  )
}

export default DetailCard
