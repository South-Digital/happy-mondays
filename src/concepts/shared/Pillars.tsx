import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Photo } from '../../components/Photo'
import { IMG } from '../../lib/assets'
import { groupChild, groupParent, sectionReveal, usePrefersReducedMotion, VIEWPORT } from '../../lib/motion'
import {
  AlgorithmCard,
  BiddingOnlyChip,
  ExGoogleChip,
  LeversCard,
  PerStrategistChip,
  VideoCard,
} from './pillar-graphics'

type Pillar = {
  title: string
  description: string
  backdrop: string
  fallback: string
  graphic: ReactNode
  chip: ReactNode
  chipClass: string
}

const PILLARS: Pillar[] = [
  {
    title: 'Ex-Google, not ex-agency',
    description:
      "Four years inside Google, managing the UK's biggest retail accounts. We know what the algorithm actually rewards.",
    backdrop: IMG.pillar1,
    fallback: 'linear-gradient(150deg,#E8EFFB 0%,#F4F1EA 100%)',
    graphic: <AlgorithmCard />,
    chip: <ExGoogleChip />,
    chipClass: 'bottom-5 right-4',
  },
  {
    title: 'Full-funnel, not ad account',
    description:
      '60–70% of wins sit outside the ad account: feed, AOV, checkout, post-click. We work every revenue lever, not just bidding.',
    backdrop: IMG.pillar2,
    fallback: 'linear-gradient(150deg,#F2EEE6 0%,#E6EDF7 100%)',
    graphic: <LeversCard />,
    chip: <BiddingOnlyChip />,
    chipClass: 'bottom-6 right-3',
  },
  {
    title: 'Partner, not vendor',
    description:
      'Fixed retainer, 4–6 accounts per strategist, and weekly Looms from the person actually running your account.',
    backdrop: IMG.pillar3,
    fallback: 'linear-gradient(150deg,#EDEAF6 0%,#F5F1E9 100%)',
    graphic: <VideoCard />,
    chip: <PerStrategistChip />,
    chipClass: 'bottom-5 right-4',
  },
]

/**
 * §A2 / §B4 — three pillar cards, 384 wide with a 384×336 image area and 24px
 * gaps. Backdrops are exported images; the graphics on top are built in HTML.
 */
export function Pillars({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()

  return (
    <section className={className}>
      <div className="content-grid">
        <motion.div {...sectionReveal(reduced)}>
          <p className="tagline">Why Happy Mondays</p>
          <h2 className="mt-4 max-w-[760px] text-section-m md:text-section">
            Three things most Google Ads agencies get wrong. We don't.
          </h2>
        </motion.div>

        <motion.ul
          className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-6 xl:grid-cols-3"
          variants={groupParent}
          initial={reduced ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
        >
          {PILLARS.map((p) => (
            <motion.li key={p.title} className="group w-full xl:w-[384px]" variants={groupChild(reduced)}>
              {/* Hover: the glass rim lifts 4px and the chip drifts 2px (§A4) */}
              <div className="relative h-[300px] overflow-hidden rounded-[20px] transition-transform duration-200 group-hover:-translate-y-1 md:h-[336px]">
                <Photo
                  src={p.backdrop}
                  alt=""
                  width={768}
                  height={672}
                  className="absolute inset-0 h-full w-full object-cover"
                  fallback={p.fallback}
                />
                <div className="relative grid h-full place-items-center p-6">{p.graphic}</div>
                <div
                  className={`absolute transition-transform duration-200 group-hover:-translate-y-0.5 ${p.chipClass}`}
                >
                  {p.chip}
                </div>
              </div>

              <h3 className="mt-6 text-card-title">{p.title}</h3>
              <p className="mt-2 max-w-[384px] text-card-desc text-ink-60">{p.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
