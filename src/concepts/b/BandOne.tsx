import { motion } from 'framer-motion'
import { DIST, DUR, EASE, STAGGER, sectionReveal, usePrefersReducedMotion, VIEWPORT } from '../../lib/motion'
import { Dashboard, DashboardMobile } from '../shared/Dashboard'
import { ShoppingGraphic } from '../shared/graphics/ShoppingGraphic'

/**
 * §B2 — "Every sale, traced back to the search."
 *
 * Frame 2166:4571, laid out on the 1200px content column so every figure below
 * is a ratio of it rather than a pixel. At 1440 the column is exactly 1200, so
 * these land on the frame's own numbers; percentage margins and paddings
 * resolve against that same width, so the whole band scales as one object.
 *
 *   heading    x0    y120   w797
 *   subline    x0    y188   w600
 *   dashboard  x0.4  y300   784 x 459.4   (concept A's window at 0.68)
 *   widget     x647.6 y535.9 552.4 x 338.3, over the dashboard's lower right
 *   wash       x100  y340   1100 x 520,   behind both
 *   band height 1007
 *
 * The window is the same component as concept A's, only scaled: sidebar 220,
 * panel 908, 8px apart, 18px radii, 8px rim padding, panel 44px shorter than
 * the sidebar, no browser bar — every one of those multiplied by 0.68.
 */

/** The block holding the window, the widget and the wash: y300 to y874.2. */
const STAGE_W = 1200
const STAGE_H = 574.2
const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(4)}%`

export function BandOne({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()

  return (
    <section className={`overflow-x-clip ${className}`}>
      <div className="content-grid">
        <div className="xl:pb-[11.0667%] xl:pt-[10%]">
        <motion.div {...sectionReveal(reduced)}>
          <h2 className="max-w-[760px] text-section-m md:text-section xl:max-w-none xl:whitespace-nowrap xl:text-[48px] xl:leading-[1.12] xl:tracking-[-0.96px]">
            Every sale, traced back to the search.
          </h2>
          {/* TODO: confirm copy — drafted in design, not from Notion. */}
          <p className="mt-5 max-w-[560px] text-card-desc text-ink-60 xl:mt-[1.1867%] xl:max-w-[600px] xl:text-[18px] xl:tracking-[-0.18px]">
            Your Shopify numbers and your Google Shopping results, managed as one.
          </p>
        </motion.div>

        <div className="relative mt-16 xl:mt-[7.25%]">
          <div className="relative xl:aspect-[1200/574.2]">
            {/* Soft blue wash, behind both objects (node 2166:4574) */}
            <div
              aria-hidden
              className="absolute inset-x-0 -inset-y-20 z-0 rounded-[120px] blur-3xl xl:hidden"
              style={{
                background:
                  'radial-gradient(60% 60% at 30% 35%, rgba(37,99,235,.20) 0%, rgba(37,99,235,0) 70%),' +
                  'radial-gradient(55% 55% at 80% 70%, rgba(37,99,235,.14) 0%, rgba(37,99,235,0) 70%)',
              }}
            />
            {/* The frame's wash (node 2166:4574, x220 y340 1100x520) extended
                left and up so it passes under the window rather than starting
                100px inside it. Concept A's rim frosts a photograph; with the
                frame's rect the blur here had a near-flat page to sample and
                the glass read as a plain white panel. Carried at a heavier
                opacity and a tighter blur so there is real variance under it. */}
            <div
              aria-hidden
              className="absolute z-0 hidden rounded-[120px] blur-[36px] xl:block"
              style={{
                left: pct(-60, STAGE_W),
                top: pct(-52, STAGE_H),
                width: pct(1320, STAGE_W),
                height: pct(640, STAGE_H),
                background:
                  'radial-gradient(52% 58% at 20% 26%, rgba(37,99,235,.42) 0%, rgba(37,99,235,0) 72%),' +
                  'radial-gradient(46% 52% at 68% 64%, rgba(14,165,233,.34) 0%, rgba(14,165,233,0) 74%),' +
                  'radial-gradient(38% 44% at 52% 88%, rgba(99,102,241,.26) 0%, rgba(99,102,241,0) 70%)',
              }}
            />

            <motion.div
              initial={reduced ? false : { opacity: 0, y: DIST.lg }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.entrance, ease: EASE.entrance }}
              className="relative xl:absolute xl:left-0 xl:top-0 xl:w-[65.3333%]"
            >
              {/* Concept A's window, scaled uniformly to the frame's 784/1152 at
                  xl. Below xl it fills the column and is left at A's own scale,
                  so the two are the identical construction there. */}
              <Dashboard className="hidden w-full md:block xl:[--dash-scale:0.68]" />
              {/* §5 — analytics panel only on mobile */}
              <DashboardMobile className="md:hidden" height={380} />
            </motion.div>

            {/* Shopping widget over the window's lower-right corner (node 2166:4610) */}
            <motion.div
              className="absolute -bottom-12 right-4 hidden w-[380px] lg:block xl:bottom-auto xl:right-0 xl:top-[41.0833%] xl:w-[46.0333%] xl:[&_.glass-rim]:rounded-[24px]"
              initial={reduced ? false : { opacity: 0, x: DIST.lg }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.entrance, ease: EASE.entrance, delay: reduced ? 0 : STAGGER * 2 }}
            >
              <ShoppingGraphic compact />
            </motion.div>
          </div>

          {/* §5 — below lg the widget sits under the window, overlapping its
              bottom edge by about 40px on mobile. */}
          <motion.div
            className="relative z-10 -mt-10 px-2 md:mt-8 md:px-0 lg:hidden"
            initial={reduced ? false : { opacity: 0, y: DIST.md }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.entrance, ease: EASE.entrance, delay: reduced ? 0 : STAGGER * 2 }}
          >
            <ShoppingGraphic compact />
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
