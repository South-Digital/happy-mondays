import { motion } from 'framer-motion'
import { Photo } from '../../components/Photo'
import { DASH, IMG } from '../../lib/assets'
import { DUR, EASE, usePrefersReducedMotion } from '../../lib/motion'

/**
 * The Shopify window exactly as drawn in Figma (frame 2171:557): the sidebar and
 * the analytics panel are two separate cards, 8px apart, each with an 18px
 * radius, inside one glass rim with 8px padding and an 18px radius. The panel is
 * 43.9px shorter than the sidebar, so the rim's white shows below it — that gap
 * is part of the design, not a bug.
 *
 * No browser bar, per §A1.
 */

/** Percentages of the 1136px row, so the split holds at any rendered width. */
const SIDEBAR_PCT = (DASH.sidebarW / DASH.rowW) * 100
const PANEL_PCT = (DASH.panelW / DASH.rowW) * 100

export function DashboardImage({
  className = '',
  /** Seconds to wait before drawing the chart in; omit to skip the reveal. */
  chartRevealDelay,
}: {
  className?: string
  chartRevealDelay?: number
}) {
  return (
    <div className={`dash-rim ${className}`}>
      <div className="flex items-start justify-between">
        <Photo
          src={IMG.dashSidebar}
          alt=""
          width={440}
          height={1318}
          priority
          className="block h-auto overflow-hidden rounded-[18px]"
          style={{ width: `${SIDEBAR_PCT}%` }}
          fallback="linear-gradient(180deg,#FBFBFA,#F4F4F3)"
        />

        <div className="relative overflow-hidden rounded-[18px]" style={{ width: `${PANEL_PCT}%` }}>
          <Photo
            src={IMG.dashPanel}
            alt="Shopify analytics: total sales $128,460, 1,842 orders, 3.4% conversion rate, 5.05 ROAS, and total sales over time for the week."
            width={1816}
            height={1230}
            priority
            responsive
            sizes="(max-width: 767px) 92vw, 62vw"
            className="block h-auto w-full"
            fallback="linear-gradient(180deg,#FFFFFF,#F7F7F6)"
          />
          {chartRevealDelay !== undefined && <ChartReveal delay={chartRevealDelay} />}
        </div>
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
      style={{ left: '6%', right: '-1%', top: '43%', height: '46%' }}
      initial={{ x: '0%' }}
      animate={{ x: '101%' }}
      transition={{ duration: DUR.chart, delay, ease: EASE.state }}
    />
  )
}

/**
 * §5 mobile — the analytics panel only, cropped to roughly its top three
 * quarters with a fade out of the bottom edge.
 */
export function DashboardImageMobile({
  className = '',
  crop = 0.76,
}: {
  className?: string
  crop?: number
}) {
  return (
    <div className={`dash-rim ${className}`}>
      <div
        className="relative overflow-hidden rounded-[18px]"
        style={{ aspectRatio: `908 / ${Math.round(615 * crop)}` }}
      >
        <Photo
          src={IMG.dashPanel}
          alt="Shopify analytics: total sales $128,460, 1,842 orders, 3.4% conversion rate and 5.05 ROAS."
          width={1816}
          height={1230}
          priority
          responsive
          sizes="92vw"
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
