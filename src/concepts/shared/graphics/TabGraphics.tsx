import { Photo } from '../../../components/Photo'
import { Play, SearchIcon, TrendUp } from '../../../components/icons'
import { IMG } from '../../../lib/assets'

/** Small stat chip used across the tab graphics. */
function StatChip({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="glass-chip glass-chip-lg px-4 py-3 leading-tight">
      <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-muted">{label}</p>
      <p className="mt-1 flex items-center gap-2 text-[16px] font-semibold tabular-nums text-ink">
        {value}
        <span className="inline-flex items-center gap-1 rounded-md border border-pos-border bg-pos-bg px-1.5 py-0.5 text-[10px] font-semibold text-pos">
          <TrendUp />
          {delta}
        </span>
      </p>
    </div>
  )
}

/** Search — sponsored text ad + CTR chip (node 2087:209). */
export function SearchGraphic() {
  return (
    <div className="relative w-full">
      <div className="glass-rim w-full">
        <div className="rim-card ui-font p-5">
          <div className="flex items-center gap-2.5 rounded-pill bg-tile px-4 py-2.5">
            <SearchIcon width={14} height={14} className="text-muted" />
            <span className="text-[13px] text-ink">pilates grip socks</span>
          </div>

          <div className="mt-4 rounded-xl border border-line p-4">
            <div className="flex items-center gap-2">
              <span className="rounded border border-line px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.04em] text-ink">
                Ad
              </span>
              <span className="text-[11.5px] text-muted">luckyhoney.nyc</span>
            </div>
            <p className="mt-2 text-[16px] font-medium leading-snug text-[#1A0DAB]">
              Pilates Grip Socks | Honeycomb Grip Sole
            </p>
            <p className="mt-1.5 text-[12px] leading-[18px] text-ink-60">
              Studio-grade grip, washed-cotton comfort. Free UK delivery over £40.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-[#1A0DAB]">
              <span>Shop Grip Socks</span>
              <span>New Arrivals</span>
              <span>Size Guide</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-3">
        <StatChip label="Click-through rate" value="8.4%" delta="2.1 pts" />
      </div>
    </div>
  )
}

/** Performance Max — channel-mix bar + asset group card (node 2087:213). */
const MIX = [
  { name: 'Shopping', pct: 48, color: '#2563EB' },
  { name: 'Search', pct: 22, color: '#5B8DEF' },
  { name: 'YouTube', pct: 14, color: '#9CBBF5' },
  { name: 'Display', pct: 9, color: '#C7D8FA' },
  { name: 'Gmail & Discover', pct: 7, color: '#E1E9F9' },
]

export function PmaxGraphic() {
  return (
    <div className="relative w-full">
      <div className="glass-rim w-full">
        <div className="rim-card ui-font p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-muted">
            Conversion value
          </p>
          <p className="mt-1 text-[32px] font-medium leading-none tracking-[-0.03em] tabular-nums text-ink">
            $21,614
          </p>

          <div className="mt-4 flex h-2.5 overflow-hidden rounded-full" aria-hidden>
            {MIX.map((m) => (
              <span key={m.name} style={{ width: `${m.pct}%`, background: m.color }} />
            ))}
          </div>

          <ul className="mt-3.5 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {MIX.map((m) => (
              <li key={m.name} className="flex items-center gap-2 text-[11.5px] text-ink">
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: m.color }}
                />
                <span className="flex-1 truncate">{m.name}</span>
                <span className="font-semibold tabular-nums text-ink-60">{m.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-chip absolute -bottom-6 -right-3 flex items-center gap-3 px-4 py-3">
        <Photo
          src={IMG.productJuliet}
          alt=""
          width={358}
          height={247}
          className="h-10 w-10 rounded-lg object-cover"
          fallback="linear-gradient(150deg,#F6E9D8,#E3CDB0)"
        />
        <span className="leading-tight">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.05em] text-muted">
            Asset group
          </span>
          <span className="block text-[13px] font-semibold text-ink">Grip socks</span>
        </span>
      </div>
    </div>
  )
}

/** YouTube — shoppable video frame + view-rate chip (node 2087:215). */
export function YouTubeGraphic() {
  return (
    <div className="relative w-full">
      <div className="glass-rim w-full">
        <div className="rim-card ui-font overflow-hidden">
          <div className="relative">
            <Photo
              src={IMG.videoThumb}
              alt=""
              width={900}
              height={506}
              className="aspect-video w-full object-cover"
              fallback="linear-gradient(135deg,#2C3440,#4C5765)"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-ink shadow-chip">
                <Play width={24} height={24} />
              </span>
            </span>
            <span className="absolute left-3 top-3 rounded-md bg-black/65 px-2 py-1 text-[10px] font-semibold text-white">
              Sponsored · luckyhoney.nyc
            </span>
          </div>

          {/* Shoppable strip */}
          <div className="flex items-center gap-3 p-3.5">
            <Photo
              src={IMG.productJuliet}
              alt=""
              width={358}
              height={247}
              className="h-11 w-11 rounded-lg object-cover"
              fallback="linear-gradient(150deg,#F6E9D8,#E3CDB0)"
            />
            <span className="flex-1 leading-tight">
              <span className="block text-[12.5px] font-semibold text-ink">Juliet Grip Sock</span>
              <span className="block text-[12px] font-semibold tabular-nums text-ink-60">$18.00</span>
            </span>
            <span className="rounded-pill bg-cobalt px-3.5 py-2 text-[11.5px] font-semibold text-white">
              Shop now
            </span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-3">
        <StatChip label="View rate" value="31%" delta="6 pts" />
      </div>
    </div>
  )
}

/** Reporting — Monday report KPIs + trend line + delivery chip (node 2087:217). */
const TREND = [8, 22, 17, 34, 41, 36, 52, 47, 63, 58, 74, 86]

export function ReportingGraphic() {
  const w = 300
  const h = 64
  const max = Math.max(...TREND)
  const d = TREND.map((v, i) => {
    const x = (i / (TREND.length - 1)) * w
    const y = h - (v / max) * h
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')

  const kpis = [
    { label: 'Ad spend', value: '$4,280' },
    { label: 'Conversion value', value: '$21,614' },
    { label: 'ROAS', value: '5.05' },
  ]

  return (
    <div className="relative w-full">
      <div className="glass-rim w-full">
        <div className="rim-card ui-font p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-[14px] font-semibold text-ink">Monday report</p>
            <p className="text-[11.5px] text-muted">Week 38</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl bg-tile px-3 py-2.5">
                <p className="text-[9.5px] font-medium uppercase tracking-[0.04em] text-muted">
                  {k.label}
                </p>
                <p className="mt-1 text-[16px] font-semibold tabular-nums leading-none text-ink">
                  {k.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-line p-3.5">
            <svg
              viewBox={`0 0 ${w} ${h}`}
              preserveAspectRatio="none"
              className="h-16 w-full"
              role="img"
              aria-label="Conversion value trending up over the week."
            >
              <path
                d={`${d} L${w} ${h} L0 ${h} Z`}
                fill="url(#reportFade)"
                stroke="none"
                opacity={0.5}
              />
              <path
                d={d}
                fill="none"
                stroke="#2563EB"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="reportFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity=".28" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="glass-chip absolute -bottom-6 -right-3 px-4 py-3 leading-tight">
        <p className="text-[12.5px] font-semibold text-ink">Your weekly report is in</p>
        <p className="mt-0.5 text-[11px] text-muted">Monday, 8:00 am</p>
      </div>
    </div>
  )
}
