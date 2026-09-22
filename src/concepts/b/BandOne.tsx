import { motion } from 'framer-motion'
import { DIST, DUR, EASE, STAGGER, sectionReveal, usePrefersReducedMotion, VIEWPORT } from '../../lib/motion'
import { Dashboard, DashboardMobile } from '../shared/Dashboard'
import { ShoppingGraphic } from '../shared/graphics/ShoppingGraphic'

/**
 * §B2 — "Every sale, traced back to the search."
 *
 * The same Shopify window as Concept A with the same Shopping component layered
 * over its lower-right corner, on a soft blue blurred wash for the glass to catch.
 *
 * On scroll the dashboard rises in, then the Shopping widget slides in 150ms
 * later from +24px right (§B5).
 */
export function BandOne({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()

  return (
    <section className={`overflow-x-clip ${className}`}>
      <div className="content-grid">
        <motion.div {...sectionReveal(reduced)}>
          <h2 className="max-w-[760px] text-section-m md:text-section">
            Every sale, traced back to the search.
          </h2>
          {/* TODO: confirm copy — drafted in design, not from Notion. */}
          <p className="mt-5 max-w-[560px] text-card-desc text-ink-60">
            Your Shopify numbers and your Google Shopping results, managed as one.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Soft blue blurred wash behind the glass */}
          <div
            aria-hidden
            className="absolute inset-x-0 -inset-y-20 -z-10 rounded-[120px] blur-3xl"
            style={{
              background:
                'radial-gradient(60% 60% at 30% 35%, rgba(37,99,235,.20) 0%, rgba(37,99,235,0) 70%),' +
                'radial-gradient(55% 55% at 80% 70%, rgba(37,99,235,.14) 0%, rgba(37,99,235,0) 70%)',
            }}
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: DIST.lg }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.entrance, ease: EASE.entrance }}
            className="relative"
          >
            <Dashboard className="hidden w-full md:block" />
            {/* §5 — analytics panel only on mobile */}
            <DashboardMobile className="md:hidden" height={380} />

            {/* Shopping widget over the lower-right corner */}
            <motion.div
              className="absolute -bottom-12 right-4 hidden w-[380px] lg:block xl:-bottom-16 xl:-right-6 xl:w-[440px]"
              initial={reduced ? false : { opacity: 0, x: DIST.lg }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: DUR.entrance,
                ease: EASE.entrance,
                delay: reduced ? 0 : STAGGER * 2,
              }}
            >
              <ShoppingGraphic compact />
            </motion.div>
          </motion.div>

          {/* §5 — below lg the widget sits under the dashboard, overlapping its
              bottom edge by about 40px on mobile. */}
          <motion.div
            className="relative z-10 -mt-10 px-2 md:mt-8 md:px-0 lg:hidden"
            initial={reduced ? false : { opacity: 0, y: DIST.md }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{
              duration: DUR.entrance,
              ease: EASE.entrance,
              delay: reduced ? 0 : STAGGER * 2,
            }}
          >
            <ShoppingGraphic compact />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
