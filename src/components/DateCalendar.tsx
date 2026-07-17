import type { InvitationData } from '../data/invitationData'
import { Reveal } from './Reveal'
import { RingsIcon, HeartIcon } from './decorations/Icons'

interface DateCalendarProps {
  data: InvitationData
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS_LONG = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
]
const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Ordinal suffix for a day-of-month (1 → "st", 24 → "th"). */
function ordinal(n: number): string {
  const rem100 = n % 100
  if (rem100 >= 11 && rem100 <= 13) return 'th'
  switch (n % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

/**
 * "Save the Date" month calendar. Renders the event month with the ceremony day
 * circled by a heart, then the full date, time and venue — all derived from
 * `isoStart` (parsed as plain Y-M-D so the grid never drifts across timezones).
 */
export function DateCalendar({ data }: DateCalendarProps) {
  const [year, month, day] = data.isoStart.slice(0, 10).split('-').map(Number)
  const monthIndex = month - 1
  // Use UTC so the calendar layout is identical in every timezone.
  const firstWeekday = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay()
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()
  const eventWeekday = WEEKDAYS_LONG[new Date(Date.UTC(year, monthIndex, day)).getUTCDay()]

  // Leading blanks to align the 1st under its weekday, then the day numbers.
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <Reveal className="datecal" delay={1}>
      <RingsIcon className="datecal__rings" aria-hidden="true" />
      <p className="datecal__month">{MONTHS[monthIndex]} {year}</p>

      {/* Visual month grid — the real date is announced by .datecal__on below. */}
      <div className="datecal__grid" aria-hidden="true">
        {WEEKDAY_LABELS.map((w) => (
          <span key={w} className="datecal__wd">{w}</span>
        ))}
        {cells.map((n, i) =>
          n === null ? (
            <span key={`b${i}`} className="datecal__cell datecal__cell--empty" />
          ) : (
            <span
              key={n}
              className={`datecal__cell${n === day ? ' datecal__cell--event' : ''}`}
            >
              {n === day && <HeartIcon className="datecal__heart" />}
              <span className="datecal__num">{n}</span>
            </span>
          )
        )}
      </div>

      <p className="datecal__on">
       Inshallah On {eventWeekday}, {MONTHS[monthIndex]} {day}
        <sup>{ordinal(day)}</sup>, {year}
      </p>
      <p className="datecal__time">from {data.time}</p>
    </Reveal>
  )
}

export default DateCalendar
