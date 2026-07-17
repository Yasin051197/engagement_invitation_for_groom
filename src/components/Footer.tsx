import type { InvitationData } from '../data/invitationData'
import { Reveal } from './Reveal'
import { OrnamentalDivider } from './SectionTitle'
import { FloralFlourish, RingsIcon } from './decorations/Icons'

interface FooterProps {
  data: InvitationData
}

/** Closing dua, family names, footer quote, "Duas Requested" badge, flourish. */
export function Footer({ data }: FooterProps) {
  return (
    <footer className="footer" aria-label="Closing message">
      <div className="container">
        <Reveal>
          <span className="badge">
            <RingsIcon style={{ width: 16, height: 16 }} />
            Duas Requested
          </span>

          <p className="footer__dua">{data.duas[2]}</p>

          <OrnamentalDivider />

          <p className="footer__families">{data.hostedBy}</p>
          <p className="footer__quote">{data.footerQuote}</p>

          <FloralFlourish className="footer__flourish" />

          <p className="footer__signature">With heartfelt duas &amp; love</p>
        </Reveal>
      </div>
    </footer>
  )
}

export default Footer
