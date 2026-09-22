import {
  AnalyticsIcon,
  ChevronDown,
  CustomersIcon,
  DiscountsIcon,
  HomeIcon,
  MarketingIcon,
  OrdersIcon,
  ProductsIcon,
  ShopBag,
  TrendUp,
} from '../../components/icons'
import { SalesChart } from './SalesChart'

/**
 * The Shopify admin window (§A1) — built in HTML/CSS, not images, and
 * deliberately with **no browser bar** (no traffic lights, no URL).
 * Inter throughout, to stay faithful to Shopify. All figures illustrative (§7).
 */

const NAV = [
  { label: 'Home', Icon: HomeIcon },
  { label: 'Orders', Icon: OrdersIcon },
  { label: 'Products', Icon: ProductsIcon },
  { label: 'Customers', Icon: CustomersIcon },
  { label: 'Marketing', Icon: MarketingIcon },
  { label: 'Analytics', Icon: AnalyticsIcon, active: true },
  { label: 'Discounts', Icon: DiscountsIcon },
]

const METRICS = [
  { label: 'Total sales', value: '$128,460', delta: '24.8%' },
  { label: 'Orders', value: '1,842', delta: '18.6%' },
  { label: 'Conversion rate', value: '3.4%', delta: '0.6pt' },
  { label: 'ROAS', value: '5.05', delta: null },
]

export function DeltaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-pos-border bg-pos-bg px-1.5 py-0.5 text-[10px] font-semibold text-pos">
      <TrendUp />
      {children}
    </span>
  )
}

export function AnalyticsPanel({ compactChart = false }: { compactChart?: boolean }) {
  return (
    <div className="ui-font flex-1 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Analytics</h3>
        <span
          aria-hidden
          className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#4A4A4A]"
        >
          Last 7 days
          <ChevronDown width={12} height={12} />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 [grid-template-rows:auto_auto_auto] md:gap-3 lg:grid-cols-4">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="grid rounded-xl bg-tile px-3 py-2.5 [grid-row:span_3] [grid-template-rows:subgrid] md:px-3.5 md:py-3"
          >
            <p className="text-[9.5px] font-medium uppercase tracking-[0.04em] text-muted">{m.label}</p>
            <p className="mt-1.5 text-[19px] font-semibold tabular-nums leading-none text-[#1A1A1A]">
              {m.value}
            </p>
            {m.delta && (
              <div className="mt-2">
                <DeltaPill>{m.delta}</DeltaPill>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-line p-4">
        <SalesChart compact={compactChart} />
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="ui-font w-[220px] shrink-0 border-r border-line bg-[#FBFBFA] p-4">
      <div className="flex items-center gap-2.5 px-1.5 py-1">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#5E8E3E] text-white">
          <ShopBag width={15} height={15} />
        </span>
        <span className="text-[13px] font-semibold text-[#1A1A1A]">Your store</span>
      </div>

      <nav className="mt-4 space-y-0.5">
        {NAV.map(({ label, Icon, active }) => (
          <span
            key={label}
            className={[
              'flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px]',
              active ? 'bg-[#EBEBEA] font-semibold text-[#1A1A1A]' : 'font-medium text-[#4A4A4A]',
            ].join(' ')}
          >
            <Icon width={15} height={15} className={active ? 'text-[#1A1A1A]' : 'text-[#6B7177]'} />
            {label}
          </span>
        ))}
      </nav>
    </aside>
  )
}

/** Full admin window (desktop). */
export function Dashboard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-rim glass-rim-lg ${className}`}>
      <div className="rim-card flex">
        <Sidebar />
        <AnalyticsPanel />
      </div>
    </div>
  )
}

/**
 * §5 mobile — the analytics panel only, no sidebar, clipped to roughly its top
 * third (metrics row + chart header + the top of the chart) with a fade out of
 * the bottom edge.
 */
export function DashboardMobile({
  className = '',
  height = 300,
}: {
  className?: string
  height?: number
}) {
  return (
    <div className={`glass-rim ${className}`}>
      <div className="rim-card relative overflow-hidden" style={{ height }}>
        <AnalyticsPanel compactChart />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white"
        />
      </div>
    </div>
  )
}

/** "New order" card that breaks the frame on the dashboard's left edge (§A1). */
export function NewOrderCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-chip ui-font w-[212px] px-3.5 py-3 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-pos" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-muted">New order</p>
      </div>
      <p className="mt-1.5 text-[14px] font-semibold text-[#1A1A1A]">
        #1048 · <span className="tabular-nums">$79.00</span>
      </p>
      <p className="mt-0.5 text-[11px] text-muted">Just now</p>
    </div>
  )
}
