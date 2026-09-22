import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Photo } from '../../components/Photo'
import { IMG } from '../../lib/assets'
import { usePrefersReducedMotion } from '../../lib/motion'
import { ShoppingChip, ShoppingGraphic } from '../shared/graphics/ShoppingGraphic'
import {
  PmaxGraphic,
  ReportingGraphic,
  SearchGraphic,
  YouTubeGraphic,
} from '../shared/graphics/TabGraphics'

type Tab = { id: string; label: string; description: string; graphic: ReactNode }

/**
 * §A3. Only the Shopping description comes from Figma; the other four are draft
 * copy — TODO: confirm copy.
 */
const TABS: Tab[] = [
  {
    id: 'search',
    label: 'Search',
    // TODO: confirm copy
    description:
      'Tight keyword structure and ad copy that matches how your customers actually search.',
    graphic: <SearchGraphic />,
  },
  {
    id: 'shopping',
    label: 'Shopping',
    description:
      'We sort out your product data, structure your campaigns and manage bids around your margins.',
    graphic: (
      <div className="relative w-full">
        <ShoppingGraphic />
        <div className="absolute -bottom-6 -right-3">
          <ShoppingChip />
        </div>
      </div>
    ),
  },
  {
    id: 'pmax',
    label: 'Performance Max',
    // TODO: confirm copy
    description:
      'Asset groups built around your best sellers, with feed and audience signals doing the heavy lifting.',
    graphic: <PmaxGraphic />,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    // TODO: confirm copy
    description:
      'Shoppable video that puts your products in front of new customers, not just retargeting.',
    graphic: <YouTubeGraphic />,
  },
  {
    id: 'reporting',
    label: 'Reporting',
    // TODO: confirm copy
    description:
      "A Monday report you'll actually read: spend, revenue and ROAS, in plain English.",
    graphic: <ReportingGraphic />,
  },
]

const DEFAULT_TAB = 1 // Shopping is expanded by default (§A3)
const AUTO_ADVANCE_MS = 6000

function ProgressBar({ active, autoAdvancing }: { active: number; autoAdvancing: boolean }) {
  return (
    <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-line">
      <motion.div
        key={autoAdvancing ? `auto-${active}` : `static-${active}`}
        className="h-full rounded-full bg-cobalt"
        initial={{ width: autoAdvancing ? '0%' : '100%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: autoAdvancing ? AUTO_ADVANCE_MS / 1000 : 0.35,
          ease: autoAdvancing ? 'linear' : 'easeOut',
        }}
      />
    </div>
  )
}

export function SearchShopping({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(DEFAULT_TAB)
  const [interacted, setInteracted] = useState(false)
  const [paused, setPaused] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Auto-advance every ~6s until the user interacts; pauses on hover/focus.
  const autoAdvancing = !reduced && !interacted && !paused
  useEffect(() => {
    if (!autoAdvancing) return
    const t = window.setTimeout(() => setActive((i) => (i + 1) % TABS.length), AUTO_ADVANCE_MS)
    return () => window.clearTimeout(t)
  }, [autoAdvancing, active])

  const select = useCallback((index: number) => {
    setInteracted(true)
    setActive(index)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = TABS.length - 1
    let next: number | null = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    select(next)
    tabRefs.current[next]?.focus()
  }

  const current = TABS[active]

  return (
    <section className={className}>
      <div className="content-grid">
        <h2 className="max-w-[640px] text-section-m md:text-section">
          Search and shopping, managed properly.
        </h2>

        <div className="mt-14 grid items-start gap-12 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Tab list — a vertical list on desktop; §5 turns it into a
              horizontally scrollable row of pills above the panel on mobile,
              with the active description underneath. */}
          <div
            className="min-w-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div
              role="tablist"
              aria-label="Google Ads services"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:mx-0 xl:flex-col xl:gap-0 xl:overflow-visible xl:px-0"
            >
              {TABS.map((tab, i) => {
                const selected = i === active
                return (
                  <div
                    key={tab.id}
                    className="shrink-0 snap-start xl:w-full xl:border-b xl:border-line xl:last:border-b-0"
                  >
                    <button
                      ref={(el) => {
                        tabRefs.current[i] = el
                      }}
                      role="tab"
                      id={`ss-tab-${tab.id}`}
                      aria-selected={selected}
                      aria-controls={`ss-panel-${tab.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(i)}
                      className={`min-h-[44px] whitespace-nowrap rounded-pill border px-4 text-[15px] font-medium transition-colors xl:w-full xl:rounded-none xl:border-0 xl:px-0 xl:py-4 xl:text-left xl:text-[20px] xl:tracking-[-0.02em] ${
                        selected
                          ? 'border-ink bg-ink text-white xl:bg-transparent xl:text-ink'
                          : 'border-line bg-white text-ink-60 xl:bg-transparent xl:hover:text-ink'
                      }`}
                    >
                      {tab.label}
                    </button>

                    {/* Desktop keeps the description and progress bar inside the
                        list, under the active tab. */}
                    {selected && (
                      <div className="hidden pb-4 xl:block">
                        <p className="max-w-[300px] text-card-desc text-ink-60">{tab.description}</p>
                        <ProgressBar active={active} autoAdvancing={autoAdvancing} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Mobile: the active description sits under the pill row. */}
            <div className="mt-5 xl:hidden">
              <p className="text-card-desc text-ink-60">{current.description}</p>
              <ProgressBar active={active} autoAdvancing={autoAdvancing} />
            </div>
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`ss-panel-${current.id}`}
            aria-labelledby={`ss-tab-${current.id}`}
            tabIndex={0}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] md:aspect-[880/648]"
          >
            <Photo
              src={IMG.panelBackdrop}
              alt=""
              width={1760}
              height={1296}
              className="absolute inset-0 h-full w-full object-cover"
              fallback="linear-gradient(145deg,#E9F0FB 0%,#F5F2EC 55%,#E6E9F2 100%)"
            />

            <div className="relative grid h-full place-items-center p-5 sm:p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="w-full max-w-[560px]"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
                >
                  {current.graphic}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
