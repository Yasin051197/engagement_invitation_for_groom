import { useEffect, useMemo, useState } from "react";
import type { InvitationData } from "../data/invitationData";
import { RingsIcon, FloralFlourish, PetalShape, BlossomShape } from "./decorations/Icons";
import { FloralCluster } from "./FloralCluster";
import { Butterfly } from "./Butterfly";

interface EnvelopeIntroProps {
  data: InvitationData;
  /** Begin revealing the page underneath (call as the cover starts to fade). */
  onReveal: () => void;
  /** The cover has fully faded out and should now unmount. */
  onDone: () => void;
}

/** One golden sparkle: idle position on a ring, then a burst outward along the
 *  same radial when the heart is tapped. */
interface Sparkle {
  ix: number;
  iy: number;
  bx: number;
  by: number;
  size: number;
  delay: number;
  dur: number;
}

/** One petal in the soft flurry that floats up as the card opens. */
interface Petal {
  isBlossom: boolean;
  left: number;
  size: number;
  delay: number;
  dur: number;
  drift: number;
  rot: number;
  color: string;
}

const SPARKLE_COUNT = 12;
const PETAL_COUNT = 9;

/** Baby-pink / blush / jasmine / gold tones for the opening flurry. */
const PETAL_TONES = ["var(--color-babypink)", "var(--color-rosegold-soft)", "#fff6ef", "var(--color-gold)"];

/**
 * A premium engagement e-card cover. A portrait invitation card — pink ribbon
 * band, an ornate centre label, floral corner posies and a glowing heart tab.
 * On tap, a ripple + golden sparkles burst from the heart, the two cover doors
 * swing open in 3D to reveal an inner card (the couple's names), baby-pink
 * petals float up, and the whole cover fades to reveal the invitation beneath.
 * The cover stays fully opaque throughout, so no page content shows through
 * while it opens. Skipped under prefers-reduced-motion (see InvitationPage).
 */
export function EnvelopeIntro({ data, onReveal, onDone }: EnvelopeIntroProps) {
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);

  // Trigger the entrance transition on the next frame after mount.
  // (The open button is intentionally NOT auto-focused: a programmatic focus
  // paints the round :focus-visible ring on every load. Keyboard users still
  // get the ring when they Tab to the butterfly.)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Golden sparkles evenly around the heart; each bursts along its own radial.
  // Deterministic (index-based, no random) so builds/SSR stay stable.
  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, i) => {
        const a = (i / SPARKLE_COUNT) * Math.PI * 2;
        const idleR = 26 + (i % 3) * 6; // 26–38px resting ring
        const burst = 50 + (i % 4) * 22; // 50–116px outward on tap
        return {
          ix: Math.round(Math.cos(a) * idleR),
          iy: Math.round(Math.sin(a) * idleR),
          bx: Math.round(Math.cos(a) * burst),
          by: Math.round(Math.sin(a) * burst),
          size: 7 + (i % 3) * 3,
          delay: (i % 5) * 0.11,
          dur: 2.4 + (i % 3) * 0.6,
        };
      }),
    [],
  );

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        isBlossom: i % 3 === 0,
        left: ((i * 11.3) % 84) + 8,
        size: 12 + ((i * 5) % 12),
        delay: (i % 6) * 0.12,
        dur: 1.5 + (i % 4) * 0.45,
        drift: (i % 2 === 0 ? 1 : -1) * (18 + ((i * 6) % 30)),
        rot: (i % 2 === 0 ? 1 : -1) * (120 + ((i * 40) % 200)),
        color: PETAL_TONES[i % PETAL_TONES.length],
      })),
    [],
  );

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // Timeline is choreographed in enhancements.css (.intro.is-opening):
    // heart bursts → doors swing open + inner card scales in → cover fades.
    // Start the page reveal as the cover begins to fade so the two cross-fade.
    window.setTimeout(onReveal, 1850);
    window.setTimeout(onDone, 2650);
  };

  const className = ["intro", ready && "is-ready", opening && "is-opening"].filter(Boolean).join(" ");

  return (
    <div className={className} role="dialog" aria-modal="true" aria-label="Open the engagement invitation">
      <div className="intro__backdrop" aria-hidden="true" />

      <div className="intro__content">
        <RingsIcon className="intro__crescent" />
        <p className="intro__eyebrow">{data.eventTitle}</p>
        <p className="intro__hint">You are cordially invited</p>

        <div className="ecard">
          {/* Soft arch halo that blooms behind the card as it opens */}
          <span className="ecard__halo" aria-hidden="true" />

          {/* Inner card revealed behind the cover; rises + scales on open */}
          <div className="ecard__inner" aria-hidden="true">
            <div className="ecard__inner-frame">
              <FloralCluster corner="tl" scale={0.82} />
              <FloralCluster corner="br" scale={0.82} />
              <p className="ecard__inner-kicker">{data.eventTitle}</p>
              <p className="ecard__names">
                {data.groomFirstName} <span>&amp;</span> {data.brideFirstName}
              </p>
              <FloralFlourish className="ecard__flourish" />
              <p className="ecard__date">{data.date}</p>
            </div>
          </div>

          {/* Left & right cover doors (gatefold) that swing open in 3D */}
          <div className="ecard__door ecard__door--left" aria-hidden="true">
            <span className="ecard__emboss" />
            <FloralCluster corner="tl" scale={0.75} />
            <FloralCluster corner="bl" scale={0.9} />
          </div>
          <div className="ecard__door ecard__door--right" aria-hidden="true">
            <span className="ecard__emboss" />
            <FloralCluster corner="tr" scale={0.9} />
            <FloralCluster corner="br" scale={0.75} />
          </div>

          {/* Pink ribbon band across the cover (fades as the cover opens) */}
          <span className="ecard__ribbon" aria-hidden="true" />

          {/* Soft glow + ripple rings around the butterfly */}
          <span className="ecard__glow" aria-hidden="true" />
          <span className="ecard__ripple" aria-hidden="true" />
          <span className="ecard__ripple ecard__ripple--2" aria-hidden="true" />

          {/* Golden sparkles — outside the doors so they radiate in screen space */}
          <div className="ecard__sparkles" aria-hidden="true">
            {sparkles.map((s, i) => (
              <span
                key={i}
                className="sparkle"
                style={{
                  ["--ix" as string]: `${s.ix}px`,
                  ["--iy" as string]: `${s.iy}px`,
                  ["--bx" as string]: `${s.bx}px`,
                  ["--by" as string]: `${s.by}px`,
                  ["--sz" as string]: `${s.size}px`,
                  ["--sd" as string]: `${s.delay}s`,
                  ["--dur" as string]: `${s.dur}s`,
                }}
              />
            ))}
          </div>

          {/* The glowing butterfly on the ribbon — the tap/click target */}
          <button
            type="button"
            className="ecard__butterfly"
            onClick={handleOpen}
            aria-label="Open the invitation"
          >
            <Butterfly className="ecard__butterfly-svg" />
          </button>
        </div>

        <p className="intro__tap" aria-hidden="true">
          Tap on butterfly to Open
        </p>

        {/* Baby-pink petal flurry that floats up as the card opens */}
        <div className="intro__flurry" aria-hidden="true">
          {petals.map((p, i) => {
            const Shape = p.isBlossom ? BlossomShape : PetalShape;
            return (
              <Shape
                key={i}
                className="intro__petal"
                style={{
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  color: p.color,
                  ["--pdrift" as string]: `${p.drift}px`,
                  ["--prot" as string]: `${p.rot}deg`,
                  ["--pd" as string]: `${p.delay}s`,
                  ["--pdur" as string]: `${p.dur}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EnvelopeIntro;
