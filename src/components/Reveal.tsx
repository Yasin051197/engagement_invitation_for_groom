import type { ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  /** Render as a different element (e.g. 'li', 'section'). Default 'div'. */
  as?: ElementType
  /** Stagger delay step 1–5 maps to the .reveal--dN CSS classes. */
  delay?: 1 | 2 | 3 | 4 | 5
  className?: string
}

/**
 * Small wrapper that fades + slides its children in when scrolled into view.
 * Uses the IntersectionObserver hook and CSS classes (no animation library).
 * Honours prefers-reduced-motion via CSS (.reveal is forced visible there).
 */
export function Reveal({ children, as, delay, className = '' }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const [ref, inView] = useInView<HTMLElement>()
  const delayClass = delay ? ` reveal--d${delay}` : ''

  return (
    <Tag
      ref={ref}
      className={`reveal${delayClass} ${className}`.trim() + (inView ? ' is-visible' : '')}
    >
      {children}
    </Tag>
  )
}

export default Reveal
