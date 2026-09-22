import { motion } from 'framer-motion'
import { Star } from '../../components/icons'
import { DIST, DUR, EASE, STAGGER, usePrefersReducedMotion } from '../../lib/motion'

const CHIPS = [
  { id: 'clutch', stars: true, label: '5.0 on Clutch' },
  { id: 'partner', stars: false, label: 'Shopify & Google Ads Partner' },
  { id: 'fee', stars: false, label: 'One flat monthly fee' },
]

/**
 * §B1 — frosted-glass proof chips resting on the lightest part of the photo
 * (component C2 / Hero proof chips, 2107:215). Behind SHOW_HERO_CHIPS.
 * They rise in sequence, 80ms apart (§B5).
 */
export function HeroProofChips({
  className = '',
  mobileOnlyFirst = false,
}: {
  className?: string
  /** §5 — show only the Clutch chip on mobile. */
  mobileOnlyFirst?: boolean
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {CHIPS.map((chip, i) => (
        <motion.li
          key={chip.id}
          className={`glass-chip flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-ink ${
            mobileOnlyFirst && i > 0 ? 'hidden md:flex' : ''
          }`}
          initial={reduced ? false : { opacity: 0, y: DIST.sm }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DUR.entrance,
            ease: EASE.entrance,
            delay: reduced ? 0 : 0.5 + i * STAGGER,
          }}
        >
          {chip.stars && (
            <span className="flex gap-0.5 text-[#F5A623]" aria-hidden>
              {Array.from({ length: 5 }, (_, s) => (
                <Star key={s} />
              ))}
            </span>
          )}
          {chip.label}
        </motion.li>
      ))}
    </ul>
  )
}
