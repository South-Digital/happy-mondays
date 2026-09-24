import { useEffect, useRef, useState } from 'react'
import type { Transition, Variants } from 'framer-motion'

/**
 * The motion system. Everything that moves on either concept is defined here,
 * so the whole site shares one easing family, one set of durations and one
 * stagger. Premium restraint: calm, precise, no spring, no overshoot, no bounce.
 *
 * Only transform and opacity are animated, with two deliberate exceptions noted
 * at their call sites: button fill brightening (a paint-only background change,
 * which the brief asks for) and the tab crossfade's opacity.
 */

/** One easing family. Entrances decelerate; state changes are symmetric. */
export const EASE = {
  /** cubic-bezier(0.22, 1, 0.36, 1) */
  entrance: [0.22, 1, 0.36, 1],
  /** cubic-bezier(0.4, 0, 0.2, 1) */
  state: [0.4, 0, 0.2, 1],
} as const

/** Durations, in seconds. micro 150–200ms · entrance 600–800ms · ambient 12–20s. */
export const DUR = {
  micro: 0.15,
  /** Pressed state returns faster than it leaves. */
  microOut: 0.1,
  state: 0.2,
  crossfade: 0.25,
  entrance: 0.7,
  entranceSlow: 0.8,
  /** The chart reveal on Concept A. */
  chart: 0.9,
  /** The metric count-up on Concept A. */
  count: 0.9,
  /** Concept B's photo drift. */
  drift: 20,
} as const

/** Travel distances. Small, never more than 24px; scale never below 0.96. */
export const DIST = {
  sm: 12,
  md: 16,
  lg: 24,
  scaleFrom: 0.96,
} as const

export const STAGGER = 0.07

/** §6 — scroll reveals fire once, at 20% visible, and never re-animate. */
export const VIEWPORT = { once: true, amount: 0.2 } as const

const entrance = (duration = DUR.entrance, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE.entrance,
})

/** Hero load sequence: a rise-and-fade at a given step of the stagger. */
export const riseAt = (
  step: number,
  reduced: boolean,
  distance: number = DIST.md,
) => ({
  initial: reduced ? false : { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: entrance(DUR.entrance, reduced ? 0 : step * STAGGER),
})

/** Section reveal on scroll: 16px rise and fade, 700ms. */
export const sectionReveal = (reduced: boolean, delay = 0) => ({
  initial: reduced ? false : { opacity: 0, y: DIST.md },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: entrance(DUR.entrance, reduced ? 0 : delay),
})

/** Card groups stagger their children 70ms apart. */
export const groupParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
}

export const groupChild = (reduced: boolean): Variants => ({
  hidden: reduced ? {} : { opacity: 0, y: DIST.md },
  show: { opacity: 1, y: 0, transition: entrance() },
})

/**
 * §6 — true when the user asked for reduced motion. Callers render the final
 * state: count-ups show their final value, the chart is fully drawn, and the
 * drift and parallax do not run. Tab switches stay instant either way.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return (
      new URLSearchParams(window.location.search).get('motion') === 'reduce' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) =>
      setReduced(
        new URLSearchParams(window.location.search).get('motion') ===
          'reduce' || e.matches,
      )
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Counts from 0 to `value` once, on an ease-out curve, and never re-runs.
 * Under reduced motion it returns the final value immediately.
 */
export function useCountUp(
  value: number,
  {
    delay = 0,
    duration = DUR.count,
    run = true,
  }: { delay?: number; duration?: number; run?: boolean } = {},
) {
  const reduced = usePrefersReducedMotion()
  const [n, setN] = useState(reduced || !run ? value : 0)
  const done = useRef(false)

  useEffect(() => {
    if (reduced || !run || done.current) {
      if (reduced || !run) setN(value)
      return
    }
    done.current = true

    let raf = 0
    let startedAt = 0
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const timer = window.setTimeout(() => {
      const step = (now: number) => {
        if (!startedAt) startedAt = now
        const t = Math.min(1, (now - startedAt) / (duration * 1000))
        setN(value * easeOut(t))
        if (t < 1) raf = requestAnimationFrame(step)
        else setN(value)
      }
      raf = requestAnimationFrame(step)
    }, delay * 1000)

    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [value, delay, duration, run, reduced])

  return n
}
