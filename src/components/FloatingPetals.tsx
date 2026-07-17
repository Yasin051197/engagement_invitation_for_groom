import { useMemo } from 'react'
import { PetalShape, BlossomShape, BlossomShapeB } from './decorations/Icons'

interface FloatingPetalsProps {
  /** Number of falling pieces (kept low for mobile performance). Default 16. */
  count?: number
}

/** Rose, blush and jasmine-white petal tones, cycled for a natural mix. */
const PETAL_COLORS = [
  'var(--color-babypink)',
  'var(--color-rosegold-soft)',
  '#fff6ef', // soft jasmine white
]

/** Whole blossoms fall as white and pink flowers. */
const FLOWER_COLORS = [
  '#ffffff', // white flower
  'var(--color-babypink)', // pink flower
]

/** Two blossom shapes so the flowers (white and pink alike) vary in form. */
const FLOWER_SHAPES = [BlossomShape, BlossomShapeB]

/**
 * A fixed, decorative layer of slowly falling rose petals mixed with whole
 * white & pink flower blossoms. Purely cosmetic and aria-hidden. Hidden entirely
 * under prefers-reduced-motion (see .petals rule in global.css) so it never
 * harms performance/accessibility.
 */
export function FloatingPetals({ count = 16 }: FloatingPetalsProps) {
  // Deterministic, evenly-spread configs (no Math.random — keeps SSR/build safe).
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Roughly every third piece is a whole flower; the rest are single petals.
      const isFlower = i % 3 === 0
      const left = ((i * 8.3) % 96) + 2
      const size = (isFlower ? 15 : 10) + ((i * 5) % 12)
      const duration = 13 + ((i * 3) % 9)
      const delay = -((i * 2.4) % 14)
      const drift = (i % 2 === 0 ? 1 : -1) * (14 + ((i * 7) % 26))
      const opacity = (isFlower ? 0.55 : 0.45) + ((i % 4) * 0.1)
      // Colour and shape advance on different cadences, so white flowers show up
      // in both blossom shapes (not always paired with one form).
      const color = isFlower
        ? FLOWER_COLORS[Math.floor(i / 3) % FLOWER_COLORS.length]
        : PETAL_COLORS[i % PETAL_COLORS.length]
      const Shape = isFlower
        ? FLOWER_SHAPES[Math.floor(i / 6) % FLOWER_SHAPES.length]
        : PetalShape
      return { Shape, left, size, duration, delay, drift, opacity, color }
    })
  }, [count])

  return (
    <div className="petals" aria-hidden="true">
      {pieces.map((p, i) => {
        const Shape = p.Shape
        return (
          <Shape
            key={i}
            className="petal"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              color: p.color,
              opacity: p.opacity,
              filter: i % 4 === 0 ? 'blur(0.4px)' : undefined,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              // Custom property consumed by the petalFall keyframes for horizontal drift.
              ['--drift' as string]: `${p.drift}px`,
            }}
          />
        )
      })}
    </div>
  )
}

export default FloatingPetals
