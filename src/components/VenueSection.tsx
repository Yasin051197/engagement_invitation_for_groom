import { QRCodeSVG } from 'qrcode.react'
import type { InvitationData } from '../data/invitationData'
import { SectionTitle } from './SectionTitle'
import { Reveal } from './Reveal'
import { LocationIcon, MapPinLarge } from './decorations/Icons'

interface VenueSectionProps {
  data: InvitationData
}

/**
 * Venue card with a lightweight illustrated "map" (no heavy embed), a Google
 * Maps button, and a QR-style placeholder guests can later swap for a real QR.
 */
export function VenueSection({ data }: VenueSectionProps) {
  return (
    <section className="section" aria-labelledby="venue-heading">
      <div className="container">
        <SectionTitle
          kicker="Find Your Way"
          heading="The Venue"
          headingId="venue-heading"
        />

        <div className="venue">
          <Reveal className="venue__card" delay={1}>
            <p className="venue__name">{data.venueName}</p>
            <p className="venue__address">{data.address}</p>

            <div className="venue__map-illustration" aria-hidden="true">
              <MapPinLarge style={{ width: '100%', height: '100%' }} />
            </div>

            <div className="btn-row" style={{ marginTop: '1.4rem' }}>
              <a
                className="btn btn--primary"
                href={data.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${data.venueName} in Google Maps`}
              >
                <LocationIcon className="btn__icon" />
                Open in Google Maps
              </a>
            </div>
          </Reveal>

          <Reveal className="venue__card" delay={2}>
            <p className="venue__name" style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.5rem)' }}>
              Scan for Location
            </p>
            <p className="venue__address">
              Point your camera here to open the map quickly.
            </p>
            <div className="venue__qr">
              <QRCodeSVG
                value={data.mapLink}
                level="Q"
                marginSize={2}
                bgColor="#ffffff"
                fgColor="#2a1a1f"
                title={`Scan to open ${data.venueName} in Google Maps`}
              />
              <span className="venue__qr-label">Scan with camera</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default VenueSection
