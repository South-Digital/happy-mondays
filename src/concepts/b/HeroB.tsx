import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Nav } from '../../components/Nav'
import { Photo } from '../../components/Photo'
import { MockLink } from '../../components/Toast'
import { ArrowUpRight } from '../../components/icons'
import { IMG } from '../../lib/assets'
import { usePrefersReducedMotion } from '../../lib/motion'
import { HeroProofChips } from './HeroProofChips'
import { SHOW_HERO_CHIPS } from './flags'

const EASE = [0.16, 1, 0.3, 1] as const
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
})

/**
 * §B1 — full-bleed Santorini photo, text block left-aligned at the 120px edge,
 * no dashboard above the fold. The photo drifts from 1.06 to 1.0 over ~20s once,
 * plus light parallax (§B5).
 */
export function HeroB() {
  const reduced = usePrefersReducedMotion()
  const sceneRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  const d = (n: number) => (reduced ? 0 : n)

  return (
    <section ref={sceneRef} className="relative min-h-[600px] overflow-hidden bg-offwhite xl:h-[1200px]">
      {/* Photo — parallax on the wrapper, slow drift on the image itself */}
      <motion.div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={reduced ? undefined : { y: bgY }}
      >
        <motion.div
          className="h-[110%] w-full"
          initial={reduced ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'easeOut' }}
        >
          <Photo
            src={IMG.bHero}
            alt="A whitewashed Santorini terrace looking out over the caldera"
            width={2000}
            height={1667}
            priority
            className="h-full w-full object-cover object-center"
            fallback="linear-gradient(180deg,#9FC3DC 0%,#6E97B4 45%,#4E6E86 100%)"
          />
        </motion.div>
      </motion.div>

      {/* Soft dark scrim behind the text block, left side, for legibility (§6) */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-black/55 via-black/20 to-transparent md:w-[62%]"
      />
      {/* A second pool concentrated under the text block itself, so the linear
          scrim can stay light across the rest of the photograph. Radial, so it
          fades out in every direction and leaves no seam. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(70% 55% at 22% 62%, rgba(0,0,0,.42) 0%, rgba(0,0,0,.22) 45%, rgba(0,0,0,0) 78%)',
        }}
      />

      {/* Fade to off-white at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent to-offwhite"
      />

      <div className="relative z-30 flex h-full flex-col px-5 pb-24 pt-7 xl:px-0">
        <motion.div {...rise(d(0))}>
          <Nav variant="b" />
        </motion.div>

        {/* Text block, left-aligned at the 120px content edge */}
        <div className="mx-auto mt-24 flex w-full max-w-content flex-1 flex-col justify-center xl:mt-0">
          <h1 className="text-hero-m md:text-hero">
            <motion.span className="block text-white" {...rise(d(0.08))}>
              Open Shopify.
            </motion.span>
            <motion.span className="block text-white/[0.76]" {...rise(d(0.16))}>
              Smile.
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-[430px] text-subline-m text-white/90 md:text-subline"
            {...rise(d(0.24))}
          >
            Google Ads for Shopify brands.
            <br />
            Senior expertise. A flat monthly fee.
          </motion.p>

          <motion.div className="mt-8" {...rise(d(0.32))}>
            <MockLink className="btn-solid">
              Book a call
              <ArrowUpRight width={15} height={15} />
            </MockLink>
          </motion.div>

          {SHOW_HERO_CHIPS && <HeroProofChips className="mt-10" />}
        </div>
      </div>
    </section>
  )
}
