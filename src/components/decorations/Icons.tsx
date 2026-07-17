/**
 * Decorative + functional inline SVG icons.
 * All use `currentColor` so they inherit colour from CSS, are lightweight,
 * and are marked aria-hidden (purely decorative) by default.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

/* ---------- Cultural / decorative ---------- */

/** Two interlocking engagement bands crowned with a solitaire diamond — the
 *  couple's emblem, used everywhere the earlier crescent-and-star motif sat.
 *  Reads cleanly from the tiny footer badge up to the large ambient ornament. */
export function RingsIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      <circle cx="9.2" cy="14.6" r="5.3" />
      <circle cx="14.8" cy="14.6" r="5.3" />
      <path
        d="M14.8 4.9 16.4 6.9 14.8 9.3 13.2 6.9 14.8 4.9Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** A soft hand-drawn heart outline — used to circle the event day on the
 *  "Save the Date" calendar. */
export function HeartIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M12 20.3C12 20.3 3.6 15.1 3.6 9 3.6 6.3 5.7 4.4 8.1 4.4 9.8 4.4 11.3 5.4 12 6.9 12.7 5.4 14.2 4.4 15.9 4.4 18.3 4.4 20.4 6.3 20.4 9 20.4 15.1 12 20.3 12 20.3Z" />
    </svg>
  );
}

export function LanternIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2v2" />
      <path d="M8.5 5.5h7" />
      <path d="M9 5.5c-1 1.6-1.5 3.4-1.5 5.5s.5 4 1.5 5.5h6c1-1.6 1.5-3.4 1.5-5.5s-.5-3.9-1.5-5.5" />
      <path d="M7.5 11h9" />
      <path d="M10 16.5h4l-.5 2.5h-3l-.5-2.5Z" />
      <path d="M12 19v2" />
    </svg>
  );
}

export function MughalArch(props: IconProps) {
  return (
    <svg viewBox="0 0 200 90" fill="none" stroke="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M4 88V46c0-9 4-16 11-22M196 88V46c0-9-4-16-11-22" strokeWidth="1.4" />
      <path d="M15 24c10-12 22-19 35-21M185 24c-10-12-22-19-35-21" strokeWidth="1.4" />
      <path d="M50 3c10-2 24-3 50-3s40 1 50 3" strokeWidth="1.4" />
      <path d="M100 6v8M96 12h8" strokeWidth="1.2" />
      <circle cx="100" cy="2" r="0" />
    </svg>
  );
}

export function DividerOrnament(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M12 3c1.6 2.4 1.6 5.2 0 9-1.6-3.8-1.6-6.6 0-9Z" />
      <path d="M12 21c-1.6-2.4-1.6-5.2 0-9 1.6 3.8 1.6 6.6 0 9Z" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M5 12h3M16 12h3" strokeLinecap="round" />
    </svg>
  );
}

export function PetalShape(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12 2c4 3.5 6 7 6 10.5C18 17 15.3 20 12 22c-3.3-2-6-5-6-9.5C6 9 8 5.5 12 2Z" opacity="0.85" />
      <path d="M12 4.5c-1.4 3-1.4 9.6 0 16" stroke="rgba(183,110,121,0.45)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

/** A soft five-petal blossom with a gold heart — falls alongside the petals.
 *  The petals take `currentColor` (so a white or pink flower is just a colour
 *  swap) and carry a faint rose edge so white flowers still read on the light
 *  background. */
export function BlossomShape(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="12"
          cy="6.6"
          rx="2.7"
          ry="4.4"
          transform={`rotate(${a} 12 12)`}
          stroke="rgba(183,110,121,0.28)"
          strokeWidth="0.5"
        />
      ))}
      <circle cx="12" cy="12" r="2.3" fill="var(--color-gold)" stroke="none" />
    </svg>
  );
}

/** A second, rounder blossom type (six soft round petals) so the falling white
 *  and pink flowers come in more than one shape. Same colour rules as the
 *  five-petal blossom: `currentColor` petals with a faint rose edge + gold heart. */
export function BlossomShapeB(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx="12"
          cy="7"
          r="3"
          transform={`rotate(${a} 12 12)`}
          stroke="rgba(183,110,121,0.28)"
          strokeWidth="0.5"
        />
      ))}
      <circle cx="12" cy="12" r="2" fill="var(--color-gold)" stroke="none" />
    </svg>
  );
}

export function FloralFlourish(props: IconProps) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M10 20h60" strokeLinecap="round" />
      <path d="M130 20h60" strokeLinecap="round" />
      <path d="M100 20c0-6 4-10 10-10-2 4-5 7-10 10Zm0 0c0-6-4-10-10-10 2 4 5 7 10 10Z" />
      <path d="M100 20c0 6 4 10 10 10-2-4-5-7-10-10Zm0 0c0 6-4 10-10 10 2-4 5-7 10-10Z" />
      <circle cx="100" cy="20" r="2.2" fill="currentColor" stroke="none" />
      <path d="M70 20c4-3 8-3 12 0-4 3-8 3-12 0Z" />
      <path d="M118 20c4-3 8-3 12 0-4 3-8 3-12 0Z" />
    </svg>
  );
}

export function JaaliPattern(props: IconProps) {
  return (
    <svg width="100%" height="100%" aria-hidden focusable="false" {...props}>
      <defs>
        <pattern id="jaali" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path
            d="M24 4c6 6 6 14 0 20-6-6-6-14 0-20Zm0 20c6 6 6 14 0 20-6-6-6-14 0-20ZM4 24c6-6 14-6 20 0-6 6-14 6-20 0Zm20 0c6-6 14-6 20 0-6 6-14 6-20 0Z"
            fill="none"
            stroke="var(--color-rosegold)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#jaali)" />
    </svg>
  );
}

export function AmpCrescent(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {/* Left ring */}
      <ellipse cx="18.5" cy="29" rx="11.5" ry="12.5" transform="rotate(18 18.5 29)" />
      <ellipse cx="18.5" cy="29" rx="7" ry="8" transform="rotate(18 18.5 29)" opacity="0.45" />

      {/* Right ring */}
      <ellipse cx="29.5" cy="29" rx="11.5" ry="12.5" transform="rotate(-18 29.5 29)" />
      <ellipse cx="29.5" cy="29" rx="7" ry="8" transform="rotate(-18 29.5 29)" opacity="0.45" />

      {/* Overlap detail */}
      <path d="M23 19.5c3.2 2.1 5.2 5.5 5.2 9.5s-2 7.4-5.2 9.5" opacity="0.55" />

      {/* Diamond base */}
      <path d="M29.5 9.5h9l3.8 5.2L34 24l-8.3-9.3 3.8-5.2Z" />

      {/* Diamond cuts */}
      <path d="M29.5 9.5l4.5 14.5 4.5-14.5" opacity="0.6" />
      <path d="M25.7 14.7h16.6" opacity="0.6" />
      <path d="M34 9.5l-3.2 5.2 3.2 9.3 3.2-9.3L34 9.5Z" opacity="0.6" />

      {/* Small shine */}
      <path
        d="M13 8l.6 1.8 1.8.6-1.8.6L13 12.8l-.6-1.8-1.8-.6 1.8-.6L13 8Z"
        fill="currentColor"
        stroke="none"
        opacity="0.8"
      />
    </svg>
  );
}

/* ---------- Functional detail icons ---------- */

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3" />
      <path d="M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function RingIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 4.5h5l1.5 2.5-4 3-4-3 1.5-2.5Z" />
      <circle cx="12" cy="15" r="5" />
    </svg>
  );
}

export function HostIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 12.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M5 19.5c.7-3.2 3.4-5 7-5s6.3 1.8 7 5" />
    </svg>
  );
}

export function DressIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 3l3 2 3-2" />
      <path d="M9 3l-1.5 4L9 9l-2 8.5c-.2 1 .5 1.5 1.4 1.5h7.2c.9 0 1.6-.5 1.4-1.5L15 9l1.5-2L15 3" />
    </svg>
  );
}

export function DinnerIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12" />
      <path d="M16 3c-1.7 0-3 2-3 5s1 4 3 4v9" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
      <path d="M12 14v2.5" />
    </svg>
  );
}

export function TitleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v3M12 18v3" />
      <path d="M7 7l1.6 3.4L12 12l-3.4 1.6L7 17l-1.6-3.4L2 12l3.4-1.6L7 7Z" opacity="0.7" />
      <circle cx="17" cy="9" r="1.2" />
    </svg>
  );
}

/* ---------- Action icons ---------- */

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5a1.8 1.8 0 0 0 .3-.4.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c.6.3 1.1.5 1.5.6a3.6 3.6 0 0 0 1.6.1c.5-.1 1.4-.6 1.6-1.1a2 2 0 0 0 .1-1.1c0-.2-.2-.2-.4-.3Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h3.2l1.4 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.4V19a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="17" cy="6" r="2.4" />
      <circle cx="17" cy="18" r="2.4" />
      <path d="M8.2 10.9l6.6-3.6M8.2 13.1l6.6 3.6" />
    </svg>
  );
}

export function CalendarPlusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3" />
      <path d="M12 12.5v5M9.5 15h5" />
    </svg>
  );
}

export function MapPinLarge(props: IconProps) {
  return (
    <svg viewBox="0 0 120 75" fill="none" aria-hidden focusable="false" {...props}>
      <rect width="120" height="75" fill="var(--color-cream)" />
      <path d="M0 50h120M0 30h120M40 0v75M82 0v75" stroke="var(--rosegold-18)" strokeWidth="1.5" />
      <path d="M-5 60c30-6 50 8 70-2s40-4 60-12" stroke="var(--gold-40)" strokeWidth="2" fill="none" />
      <path d="M60 24a9 9 0 0 0-9 9c0 6 9 14 9 14s9-8 9-14a9 9 0 0 0-9-9Z" fill="var(--color-rosegold)" />
      <circle cx="60" cy="33" r="3.2" fill="var(--color-offwhite)" />
    </svg>
  );
}

export function QrPlaceholder(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M6 6h12v12H6V6Zm3 3v6h6V9H9Z" />
      <path d="M30 6h12v12H30V6Zm3 3v6h6V9h-6Z" />
      <path d="M6 30h12v12H6V30Zm3 3v6h6v-6H9Z" />
      <path d="M24 6h3v6h-3zM24 15h3v6h-6v-3h3zM30 21h3v3h-3zM39 21h3v3h-3zM24 24h3v3h-3zM33 27h6v3h-3v3h-3zM24 33h3v9h-3zM30 33h3v3h-3zM36 36h6v6h-3v-3h-3z" />
    </svg>
  );
}
