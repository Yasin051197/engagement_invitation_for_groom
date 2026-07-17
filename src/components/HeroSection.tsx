import type { InvitationData } from "../data/invitationData";
import { BismillahHeader } from "./BismillahHeader";
import { RingsIcon } from "./decorations/Icons";

interface HeroProps {
  data: InvitationData;
}

/**
 * Hero: the announcement only — an ornamental top border, the Bismillah,
 * greeting, occasion, couple portrait and a shayari line. The date lives in
 * "Save the Date", the location in "The Venue", and RSVP in its own section,
 * so nothing is repeated here. Entrance animations run on load via CSS.
 */
export function HeroSection({ data }: HeroProps) {
  return (
    <header className="hero" aria-labelledby="couple-heading">
      <div className="hero__card">
        {/* Ornamental arch band with the Bismillah nested in its open panel. */}
        <div className="hero__arch">
          <div className="hero__topband" aria-hidden="true" />
          <BismillahHeader arabic={data.bismillahArabic} english={data.bismillahEnglish} />
        </div>

        <p className="hero__dua">“{data.duas[0]}”</p>

        <p className="hero__greeting">{data.greeting}</p>

        <RingsIcon className="hero__crest" aria-hidden="true" />
        <p className="hero__title">{data.eventTitle}</p>
        <p className="hero__subtitle">{data.eventSubtitle}</p>

        <h1 id="couple-heading" className="sr-only">
          {data.groomName} &amp; {data.brideName}
        </h1>
        <figure className="hero__portrait">
          <img className="hero__portrait-img" src={data.coupleImage} alt={`${data.groomName} and ${data.brideName}`} />
        </figure>

        <p className="hero__shayari">“{data.shayariLines[0]}”</p>
      </div>
    </header>
  );
}

export default HeroSection;
