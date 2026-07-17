import { JaaliPattern, RingsIcon } from './decorations/Icons'

/** Deterministic sparkle positions (no Math.random — keeps builds reproducible). */
const SPARKLES = [
  { left: '12%', top: '14%', size: 14, delay: 0 },
  { left: '82%', top: '10%', size: 10, delay: 1.2 },
  { left: '24%', top: '32%', size: 8, delay: 2.1 },
  { left: '70%', top: '26%', size: 12, delay: 0.6 },
  { left: '46%', top: '8%', size: 9, delay: 1.8 },
  { left: '90%', top: '40%', size: 8, delay: 2.6 },
]

/**
 * Ambient background layer: a faint jaali (lattice) pattern, small twinkling
 * ring sparkles and a softly glowing rings emblem. Fixed behind all content,
 * fully decorative.
 */
export function FloralDecorations() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__jaali">
        <JaaliPattern />
      </div>

      <div className="ambient__stars">
        {SPARKLES.map((s, i) => (
          <RingsIcon
            key={i}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <RingsIcon className="ambient__crescent" />
    </div>
  )
}

export default FloralDecorations
