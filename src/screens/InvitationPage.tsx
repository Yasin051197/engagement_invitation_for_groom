import { useEffect, useState } from "react";
import { invitationData } from "../data/invitationData";
import { AddToCalendar } from "../components/AddToCalendar";
import { CoupleSection } from "../components/CoupleSection";
import { DateCalendar } from "../components/DateCalendar";
import { EnvelopeIntro } from "../components/EnvelopeIntro";
import { EventDetails } from "../components/EventDetails";
import { FloatingPetals } from "../components/FloatingPetals";
import { FloatingRsvpButton } from "../components/FloatingRsvpButton";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { InvitationMessage } from "../components/InvitationMessage";
import { RSVPSection } from "../components/RSVPSection";
import { ScheduleSection } from "../components/ScheduleSection";
import { SectionTitle } from "../components/SectionTitle";
import { VenueSection } from "../components/VenueSection";

/** True when the visitor prefers reduced motion (skip the opening reveal). */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Top-level invitation page. Composes every section in reading order, layers
 * the ambient + petal decorations behind, shows a graceful opening reveal,
 * and pins a floating RSVP button once the guest starts scrolling.
 * All content flows from the single `invitationData` object.
 */
export function InvitationPage() {
  const data = invitationData;

  // Show the opening reveal unless the guest prefers reduced motion.
  const [introOpen, setIntroOpen] = useState(() => !prefersReducedMotion());
  // Page content stays hidden behind the cover until the reveal begins, so the
  // invitation text never shows through while the envelope is opening.
  const [revealed, setRevealed] = useState(() => prefersReducedMotion());

  // Always begin at the very top: stop the browser from restoring an old
  // scroll position on reload, and snap to the top on first mount.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Lock background scrolling while the opening reveal is on screen.
  useEffect(() => {
    document.body.classList.toggle("is-locked", introOpen);
    return () => document.body.classList.remove("is-locked");
  }, [introOpen]);

  // When the invitation is revealed, make sure it opens from the top.
  useEffect(() => {
    if (revealed) window.scrollTo(0, 0);
  }, [revealed]);

  return (
    <div className="page">
      {introOpen && <EnvelopeIntro data={data} onReveal={() => setRevealed(true)} onDone={() => setIntroOpen(false)} />}

      {/* Decorative background layers (aria-hidden, behind content) */}
      <FloatingPetals />

      <main className={`reveal-stage${revealed ? " is-revealed" : ""}`}>
        {/* What & who */}
        <HeroSection data={data} />
        <InvitationMessage data={data} />
        <CoupleSection data={data} />

        {/* When — save the date */}
        <section className="section" aria-labelledby="save-date-heading">
          <div className="container">
            <SectionTitle kicker="Don’t Miss It" heading="Save the Date" headingId="save-date-heading" />
            <div className="save-date">
              <DateCalendar data={data} />
              <AddToCalendar data={data} compact />
            </div>
          </div>
        </section>

        {/* Programme → where → good to know → respond */}
        <ScheduleSection data={data} />
        <VenueSection data={data} />
        <EventDetails data={data} />
        <RSVPSection data={data} />
      </main>

      <Footer data={data} />

      <FloatingRsvpButton data={data} />
    </div>
  );
}

export default InvitationPage;
