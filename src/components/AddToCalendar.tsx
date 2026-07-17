import type { InvitationData } from "../data/invitationData";
import { Reveal } from "./Reveal";
import { buildGoogleCalendarLink } from "../utils/links";
import { CalendarPlusIcon } from "./decorations/Icons";

interface AddToCalendarProps {
  data: InvitationData;
  /**
   * Show only the "Add to Calendar" button (no date/time card). Used beneath the
   * DateCalendar, which already presents the date, time and venue.
   */
  compact?: boolean;
}

/** Card (or bare button, when `compact`) with a Google Calendar "add event" link. */
export function AddToCalendar({ data, compact = false }: AddToCalendarProps) {
  const calendarLink = buildGoogleCalendarLink(data);

  const button = (
    <a
      className="btn btn--gold"
      href={calendarLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Add the engagement ceremony to your Google Calendar"
    >
      <CalendarPlusIcon className="btn__icon" />
      Add to Calendar
    </a>
  );

  if (compact) {
    return (
      <Reveal className="btn-row" delay={2}>
        {button}
      </Reveal>
    );
  }

  return (
    <Reveal className="panel" delay={2}>
      <p className="panel__lead">{data.date}</p>
      <p className="panel__contact">{data.time}</p>
      <div className="btn-row">{button}</div>
    </Reveal>
  );
}

export default AddToCalendar;
