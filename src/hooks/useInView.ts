import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /** Fraction of the element visible before it counts as "in view". */
  threshold?: number
  /** Margin around the root, e.g. trigger slightly before it enters. */
  rootMargin?: string
  /** Reveal only once (default true) — premium pages don't re-animate. */
  once?: boolean
}

/**
 * Lightweight scroll-reveal hook built on IntersectionObserver.
 * Returns a ref to attach and a boolean that flips true when the element
 * scrolls into view. Used to drive CSS reveal animations without a library.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // If IntersectionObserver is unavailable (very old browsers), show content.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}

export default useInView
