import { useEffect, useRef } from 'react'

// Returns a ref to attach to an element; translates it vertically as the
// page scrolls, at `speed` of scroll velocity. Disabled entirely for users
// who prefer reduced motion.
export default function useParallax(speed = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY * speed
        el.style.transform = `translate3d(0, ${y}px, 0)`
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
