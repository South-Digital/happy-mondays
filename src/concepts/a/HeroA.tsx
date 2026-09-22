import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MobileNav } from '../../components/MobileNav'
import { Nav } from '../../components/Nav'
import { Photo } from '../../components/Photo'
import { MockLink } from '../../components/Toast'
import { ArrowUpRight } from '../../components/icons'
import { IMG } from '../../lib/assets'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Dashboard, DashboardMobile, NewOrderCard } from '../shared/Dashboard'
import { LogoStrip } from '../shared/LogoStrip'
import { ProofRow } from '../shared/ProofRow'

/** §A4 load sequence: nav → line 1 → "Smile." → subline → CTA, 80ms apart. */
const EASE = [0.16, 1, 0.3, 1] as const
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
})

export function HeroA() {
  const reduced = usePrefersReducedMotion()
  const sceneRef = useRef<HTMLDivElement>(null)

  // §A4 — parallax on the photograph only, ~0.15× scroll. The dashboard and the
  // rooftop stay locked together so the overlap never changes.
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const d = (n: number) => (reduced ? 0 : n)

  return (
    <section className="bg-white">
      {/* The scene: photograph, content and rooftop, fading into white */}
      <div ref={sceneRef} className="relative overflow-hidden">
        {/* Background photograph — the only layer that parallaxes */}
        <motion.div
          aria-hidden
          className="absolute inset-0 overflow-hidden"
          style={reduced ? undefined : { y: bgY }}
        >
          <Photo
            src={IMG.aHeroBg}
            alt=""
            width={2000}
            height={1786}
            priority
            className="h-[115%] w-full object-cover object-top"
            fallback="linear-gradient(180deg,#C6DAF0 0%,#DDE6EC 38%,#E9E4D9 72%,#DED4C2 100%)"
          />
        </motion.div>

        <div className="relative z-10 px-5 pb-[70px] pt-7 md:pb-[max(28px,2.8vw)] xl:px-0">
          <motion.div {...rise(d(0))}>
            <Nav variant="a" />
            <MobileNav variant="a" />
          </motion.div>

          {/* Headline block */}
          <div className="mx-auto mt-16 flex w-full max-w-content flex-col items-center text-center xl:mt-24">
            <h1 className="text-hero-m md:text-hero">
              <motion.span className="block" {...rise(d(0.08))}>
                Open Shopify.
              </motion.span>
              <motion.span className="block text-ink-50" {...rise(d(0.16))}>
                Smile.
              </motion.span>
            </h1>

            <motion.p
              className="mt-6 max-w-[430px] text-subline-m text-ink md:text-subline"
              {...rise(d(0.24))}
            >
              Google Ads for Shopify brands.
              <br />
              Senior expertise. A flat monthly fee.
            </motion.p>

            <motion.div className="mt-8" {...rise(d(0.32))}>
              <MockLink className="btn-liquid">
                Book a call
                <ArrowUpRight width={15} height={15} />
              </MockLink>
            </motion.div>
          </div>

          {/* Dashboard settles last — from +32px and 96% scale, over ~900ms (§A4) */}
          <motion.div
            className="relative mx-auto mt-16 hidden w-[78vw] max-w-[1120px] md:block xl:mt-20"
            initial={reduced ? false : { opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: d(0.5) }}
          >
            <Dashboard />

            {/* Breaks the frame on the dashboard's left edge; lands 200ms later */}
            <motion.div
              className="absolute -left-[128px] top-[46%] hidden xl:block"
              initial={reduced ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: d(1.6) }}
            >
              <NewOrderCard />
            </motion.div>
          </motion.div>

          {/* §5 mobile — analytics panel only, clipped to its top third, with the
              New order card overlapping its bottom-left. */}
          <motion.div
            className="relative mx-auto mt-12 w-full max-w-[420px] md:hidden"
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: d(0.5) }}
          >
            <DashboardMobile height={430} />
            <motion.div
              className="absolute bottom-[42px] -left-2 origin-bottom-left scale-[0.82]"
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: d(1.6) }}
            >
              <NewOrderCard />
            </motion.div>
          </motion.div>
        </div>

        {/* Foreground rooftop — full-bleed, above the dashboard and overlapping its
            lower half, so the dashboard reads as inside the scene. Locked to the
            dashboard (no parallax). */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden">
          <Photo
            src={IMG.aHeroFg}
            alt=""
            width={2000}
            height={467}
            priority
            className="ml-auto block h-auto w-[180%] max-w-none md:w-[120%]"
            fallback="linear-gradient(180deg,rgba(206,195,176,0) 0%,rgba(206,195,176,.55) 34%,#C8BCA4 68%,#B6A88C 100%)"
          />
        </div>

        {/* Fade from the scene into white */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-b from-transparent to-white"
        />
      </div>

      {/* Proof + logos, on the white the scene fades into */}
      <div className="bg-white pb-20 pt-16">
        <div className="content-grid">
          <ProofRow />
          <LogoStrip className="mt-16" />
        </div>
      </div>
    </section>
  )
}
