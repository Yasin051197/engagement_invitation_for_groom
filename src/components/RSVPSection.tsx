import type { InvitationData, RsvpContact } from "../data/invitationData";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { buildWhatsAppRsvpLink, buildTelLink } from "../utils/links";
import { WhatsAppIcon, PhoneIcon } from "./decorations/Icons";

interface RSVPSectionProps {
  data: InvitationData;
}

/** "Mr. Mosin Jamadar" — prefixes the courtesy title when one is set. */
function contactFullName(contact: RsvpContact): string {
  return contact.title ? `${contact.title} ${contact.name}` : contact.name;
}

/** RSVP panel: one card per contact — WhatsApp with a pre-filled message, plus tap-to-call. */
export function RSVPSection({ data }: RSVPSectionProps) {
  const contacts = data.rsvpContacts;

  return (
    <section className="section" aria-labelledby="rsvp-heading">
      <div className="container">
        <SectionTitle kicker="Kindly Respond" heading="RSVP" headingId="rsvp-heading" />

        <Reveal className="panel">
          <p className="panel__lead">Your confirmation helps us welcome you warmly, In Sha Allah.</p>
          <p className="panel__contact">
            Kindly RSVP to{" "}
            <strong>
              {contacts.length > 1 ? "any one of us" : contacts[0] ? contactFullName(contacts[0]) : ""}
            </strong>
          </p>

          <div className="rsvp-contacts">
            {contacts.map((contact) => {
              const whatsappLink = buildWhatsAppRsvpLink(data, contact.phone);
              const telLink = buildTelLink(contact.phone);
              return (
                <div className="rsvp-contact" key={`${contact.name}-${contact.phone}`}>
                  <p className="rsvp-contact__name">{contactFullName(contact)}</p>
                  <a className="rsvp-contact__phone" href={telLink}>
                    {contact.phone}
                  </a>

                  <div className="btn-row">
                    <a
                      className="btn btn--primary"
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Send an RSVP message to ${contactFullName(contact)} on WhatsApp`}
                    >
                      <WhatsAppIcon className="btn__icon" />
                      WhatsApp
                    </a>
                    <a
                      className="btn btn--ghost"
                      href={telLink}
                      aria-label={`Call ${contactFullName(contact)} at ${contact.phone}`}
                    >
                      <PhoneIcon className="btn__icon" />
                      Call
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default RSVPSection;
