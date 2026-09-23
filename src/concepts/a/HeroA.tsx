import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MobileNav } from '../../components/MobileNav'
import { Nav } from '../../components/Nav'
import { Photo } from '../../components/Photo'
import { MockLink } from '../../components/Toast'
import { ArrowUpRight } from '../../components/icons'
import { IMG } from '../../lib/assets'
import { DIST, DUR, EASE, riseAt, usePrefersReducedMotion } from '../../lib/motion'
import { Dashboard, DashboardMobile, NewOrderCard } from '../shared/Dashboard'
import { LogoStrip } from '../shared/LogoStrip'
import { ProofRow } from '../shared/ProofRow'

/**
 * §A4 load sequence, on the shared 70ms stagger: nav → line 1 → "Smile." →
 * subline → CTA. The dashboard settles last, then the chart draws in, then the
 * New order card lands. Nothing else moves.
 */
const SEQ = {
  nav: 0,
  line1: 1,
  smile: 2,
  subline: 3,
  cta: 4,
} as const

/** Absolute timings, in seconds, for the steps that follow the text. */
const DASHBOARD_AT = 0.45
const CHART_AT = DASHBOARD_AT + DUR.entranceSlow // the dashboard has settled
const CARD_AT = CHART_AT + 0.2

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
          {/* Nodes 2171:555/556: the photograph renders 1716x1286 inside the
              1440x1286 hero at x-138 - 119.1667% of the hero's WIDTH, centred,
              top-anchored, with the excess cropping off the bottom.

              Keyed to width, never to height. Sizing it by height (which is what
              `h-[115%] object-cover` did) makes the horizontal crop depend on how
              tall the hero happens to be, and that is what was cutting the village
              out of the right-hand slice. `min-h-full` only takes over below 1440,
              where the hero is proportionally taller than the frame's box; because
              the box is already 19.17% wider than the viewport, the fill stays
              width-driven there too, so the same horizontal content still shows.

              Vertically it anchors at 82%, not the centre and not the top. The
              land - horizon, village, foreshore - runs across roughly 45%-85%
              of the image, and the hero is shorter than the 1286 the frame
              draws, so a centred window pushes that band down past the fold and
              the first screenful is only sky and sea. 82% is the ceiling: past
              it the horizon rises above the CTA and the button sits on the
              sea. */}
          <div className="absolute left-1/2 top-0 aspect-[1716/1286] w-[119.1667%] min-h-full -translate-x-1/2">
            <Photo
              src={IMG.aHeroBg}
              responsive
              alt=""
              width={2000}
              height={1786}
              priority
              sizes="120vw"
              className="h-full w-full object-cover object-[center_82%]"
              fallback="linear-gradient(180deg,#C6DAF0 0%,#DDE6EC 38%,#E9E4D9 72%,#DED4C2 100%)"
            />
          </div>
        </motion.div>

        <div className="relative px-5 pb-[70px] pt-7 md:pb-[max(28px,2.8vw)] xl:px-0 xl:pt-[3px]">
          <motion.div className="relative z-40" {...riseAt(SEQ.nav, reduced)}>
            <Nav variant="a" />
            <MobileNav variant="a" />
          </motion.div>

          {/* Headline block */}
          <div className="relative z-40 mx-auto mt-16 flex w-full max-w-content flex-col items-center text-center xl:mt-[60px]">
            <h1 className="text-hero-m md:text-hero-t xl:text-hero">
              <motion.span className="block" {...riseAt(SEQ.line1, reduced)}>
                Open Shopify.
              </motion.span>
              <motion.span className="block text-ink-50 xl:mt-2" {...riseAt(SEQ.smile, reduced)}>
                Smile.
              </motion.span>
            </h1>

            <motion.p
              className="mt-6 max-w-[430px] text-subline-m text-ink md:text-subline"
              {...riseAt(SEQ.subline, reduced)}
            >
              Google Ads for Shopify brands.
              <br />
              Senior expertise. A flat monthly fee.
            </motion.p>

            <motion.div className="mt-8 xl:mt-6" {...riseAt(SEQ.cta, reduced)}>
              <MockLink className="btn-liquid">
                <span>Book a call</span>
                <ArrowUpRight width={16} height={16} />
              </MockLink>
            </motion.div>
          </div>

          {/* Dashboard settles last — from +32px and 96% scale, over ~900ms (§A4) */}
          <motion.div
            className="relative z-10 mx-auto mt-16 hidden w-[80vw] max-w-[1152px] md:block xl:mt-20"
            initial={reduced ? false : { opacity: 0, y: DIST.lg, scale: DIST.scaleFrom }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: DUR.entranceSlow,
              ease: EASE.entrance,
              delay: reduced ? 0 : DASHBOARD_AT,
            }}
          >
            <Dashboard
              chartRevealDelay={reduced ? undefined : CHART_AT}
              countUpDelay={reduced ? undefined : CHART_AT}
            />

            {/* Breaks the frame on the dashboard's left edge; lands 200ms later */}
            <motion.div
              className="absolute -left-[77px] top-[44%] hidden xl:block"
              initial={reduced ? false : { opacity: 0, y: DIST.sm }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.entrance,
                ease: EASE.entrance,
                delay: reduced ? 0 : CARD_AT,
              }}
            >
              <NewOrderCard />
            </motion.div>
          </motion.div>

          {/* §5 mobile — analytics panel only, clipped to its top third, with the
              New order card overlapping its bottom-left. */}
          <motion.div
            className="relative z-40 mx-auto mt-12 w-full max-w-[420px] md:hidden"
            initial={reduced ? false : { opacity: 0, y: DIST.lg, scale: DIST.scaleFrom }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: DUR.entranceSlow,
              ease: EASE.entrance,
              delay: reduced ? 0 : DASHBOARD_AT,
            }}
          >
            <DashboardMobile />
            <motion.div
              className="absolute -bottom-7 -left-3 origin-bottom-left scale-[0.62]"
              initial={reduced ? false : { opacity: 0, y: DIST.sm }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.entrance,
                ease: EASE.entrance,
                delay: reduced ? 0 : CARD_AT,
              }}
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
            responsive
            /* 117.83% of the viewport, per node 2171:561. */
            sizes="118vw"
            alt=""
            width={2000}
            height={467}
            priority
            className="ml-auto block h-auto w-[180%] max-w-none md:ml-[-8.243%] md:w-[117.83%]"
            fallback="linear-gradient(180deg,rgba(206,195,176,0) 0%,rgba(206,195,176,.55) 34%,#C8BCA4 68%,#B6A88C 100%)"
          />
        </div>

        {/* Fade from the scene into the white page below.

            Above the rooftop, not below it. The rooftop's bottom edge IS the
            hero's bottom edge, so a fade underneath it would leave that edge
            cutting straight into the page. It does not wash the rooftop the way
            the old 160px linear ramp did: the rooftop starts at 68% of the hero
            and the ramp is only ~4% opaque there, so its readable upper two
            thirds are untouched. Everything else - headline, subline, CTA,
            dashboard body - sits above 62% and is outside the fade entirely. */}
        <div aria-hidden className="hero-fade z-[25]" />
      </div>

      {/* Proof + logos, on the white the scene fades into */}
      <div className="bg-white pb-20 pt-16">
        <div className="content-grid">
          <ProofRow />
        </div>
        <LogoStrip className="mt-14" />
      </div>
    </section>
  )
}
