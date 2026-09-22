import { motion } from 'framer-motion'
import { Photo } from '../../components/Photo'
import { DASH, IMG } from '../../lib/assets'
import { DUR, EASE, usePrefersReducedMotion } from '../../lib/motion'

/**
 * The Shopify window exactly as drawn in Figma: sidebar and analytics panel
 * exported as images and composed side by side, top-aligned. The sidebar is the
 * taller of the two (659 vs 615) and so sets the window height, with the card's
 * white showing below the panel — which is how the frame reads.
 *
 * No browser bar, per §A1. The glass rim and the 78vw geometry are unchanged.
 */
export function DashboardImage({
  className = '',
  /** Seconds to wait before drawing the chart in; omit to skip the reveal. */
  chartRevealDelay,
}: {
  className?: string
  chartRevealDelay?: number
}) {
  return (
    <div className={`glass-rim glass-rim-lg ${className}`}>
      <div
        className="rim-card relative grid items-start overflow-hidden"
        style={{ gridTemplateColumns: `${DASH.sidebarW}fr ${DASH.panelW}fr` }}
      >
        <Photo
          src={IMG.dashSidebar}
          alt=""
          width={440}
          height={1318}
          priority
          className="block h-auto w-full"
          fallback="linear-gradient(180deg,#FBFBFA,#F4F4F3)"
        />
        <Photo
          src={IMG.dashPanel}
          alt="Shopify analytics: total sales $128,460, 1,842 orders, 3.4% conversion rate, 5.05 ROAS, and total sales over time for the week."
          width={1816}
          height={1230}
          priority
          className="block h-auto w-full"
          fallback="linear-gradient(180deg,#FFFFFF,#F7F7F6)"
        />

        {chartRevealDelay !== undefined && <ChartReveal delay={chartRevealDelay} />}
      </div>
    </div>
  )
}

/**
 * Draws the chart line in.
 *
 * The panel is a Figma export, so there is no stroke to dash. Instead a panel-
 * coloured cover sits over the plot area and translates off to the right, which
 * reads as the line drawing left to right — and is a transform, so it composites
 * without touching layout. The inset is in percentages of the 908×615 panel, so
 * it tracks the artwork at any width.
 */
function ChartReveal({ delay }: { delay: number }) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute bg-white"
      style={{ left: '25.5%', right: '-1%', top: '43%', height: '46%' }}
      initial={{ x: '0%' }}
      animate={{ x: '101%' }}
      transition={{ duration: DUR.chart, delay, ease: EASE.state }}
    />
  )
}

/**
 * §5 mobile — the panel only, no sidebar, cropped to roughly its top third with
 * a fade out of the bottom edge.
 */
export function DashboardImageMobile({
  className = '',
  /**
   * Fraction of the panel's height to show. The panel is 908×615; keeping the
   * top ~76% leaves the metrics row, the chart header and the top of the chart,
   * which is what §5 asks for, and the crop scales with the container instead of
   * leaving white space under a fixed-height box.
   */
  crop = 0.76,
}: {
  className?: string
  crop?: number
}) {
  return (
    <div className={`glass-rim ${className}`}>
      <div
        className="rim-card relative overflow-hidden"
        style={{ aspectRatio: `908 / ${Math.round(615 * crop)}` }}
      >
        <Photo
          src={IMG.dashPanel}
          alt="Shopify analytics: total sales $128,460, 1,842 orders, 3.4% conversion rate and 5.05 ROAS."
          width={1816}
          height={1230}
          priority
          className="block h-auto w-full"
          fallback="linear-gradient(180deg,#FFFFFF,#F7F7F6)"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white"
        />
      </div>
    </div>
  )
}

/** The "New order" card that breaks the dashboard's left edge (§A1). */
export function NewOrderImage({ className = '' }: { className?: string }) {
  return (
    <Photo
      src={IMG.dashNewOrder}
      alt="New order #1048, $79.00, just now"
      width={836}
      height={228}
      className={`block h-auto ${className}`}
      style={{ width: DASH.newOrderW }}
      fallback="linear-gradient(180deg,#FFFFFF,#F4F4F3)"
    />
  )
}
