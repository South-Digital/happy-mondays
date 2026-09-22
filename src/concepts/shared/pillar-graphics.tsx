import { Check, Cross, Play } from '../../components/icons'
import { Photo } from '../../components/Photo'
import { IMG } from '../../lib/assets'

/** Pillar 1 — "What the algorithm rewards" card + Ex-Google chip (§A2). */
export function AlgorithmCard() {
  const rows = [
    { label: 'Clean product feed data', ok: true },
    { label: 'Conversion value, not clicks', ok: true },
    { label: 'Margin-aware bidding', ok: true },
    { label: 'Long keyword lists', ok: false },
  ]
  return (
    <div className="glass-rim w-[290px]">
      <div className="rim-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted">
          What the algorithm rewards
        </p>
        <ul className="mt-3 space-y-2">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center gap-2.5 rounded-lg bg-tile px-2.5 py-2">
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                  r.ok ? 'bg-pos-bg text-pos' : 'bg-[#F3E3E3] text-[#B4453C]'
                }`}
              >
                {r.ok ? <Check width={10} height={10} /> : <Cross width={10} height={10} />}
              </span>
              <span
                className={`text-[12.5px] font-medium ${
                  r.ok ? 'text-ink' : 'text-muted line-through'
                }`}
              >
                {r.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ExGoogleChip() {
  return (
    <div className="glass-chip flex items-center gap-2.5 px-3 py-2.5">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[13px] font-bold text-[#4285F4] shadow-sm">
        G
      </span>
      <span className="leading-tight">
        <span className="block text-[12px] font-semibold text-ink">Ex-Google</span>
        <span className="block text-[10.5px] text-muted">4 years inside retail</span>
      </span>
    </div>
  )
}

/** Pillar 2 — 60–70% split bar + revenue levers (§A2). */
export function LeversCard() {
  const levers = ['Product feed', 'AOV strategy', 'Checkout', 'Post-click', 'Bidding']
  return (
    <div className="glass-rim w-[290px]">
      <div className="rim-card p-4">
        <p className="text-[28px] font-medium leading-none tracking-[-0.03em] text-ink">60–70%</p>
        <p className="mt-1 text-[11.5px] leading-[15px] text-ink-60">
          of wins come from outside the ad account
        </p>

        <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full bg-tile" aria-hidden>
          <span className="h-full w-2/3 rounded-l-full bg-cobalt" />
          <span className="h-full w-1/3 rounded-r-full bg-[#D8D5CF]" />
        </div>

        <ul className="mt-2.5 space-y-1">
          {levers.map((l) => (
            <li key={l} className="flex items-center gap-2 text-[12px] font-medium text-ink">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-pos-bg text-pos">
                <Check width={10} height={10} />
              </span>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function BiddingOnlyChip() {
  return (
    <div className="glass-chip px-3 py-2 text-[11px] font-semibold text-ink">
      Most agencies: bidding only
    </div>
  )
}

/** Pillar 3 — weekly Loom video card (§A2). */
export function VideoCard() {
  return (
    <div className="glass-rim w-[290px]">
      <div className="rim-card">
        <div className="relative">
          <Photo
            src={IMG.videoThumb}
            alt=""
            width={580}
            height={330}
            className="h-[150px] w-full object-cover"
            fallback="linear-gradient(135deg,#2E3440,#525C6B)"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-chip">
              <Play width={20} height={20} />
            </span>
          </span>
          <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white">
            4:12
          </span>
        </div>

        <div className="flex items-center gap-2.5 p-3.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft-blue text-[11px] font-bold text-cobalt">
            HM
          </span>
          <span className="leading-tight">
            <span className="block text-[12.5px] font-semibold text-ink">
              Weekly update from your strategist
            </span>
            <span className="block text-[11px] text-muted">The person running your account</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export function PerStrategistChip() {
  return (
    <div className="glass-chip px-3 py-2.5 leading-tight">
      <span className="block text-[13px] font-semibold text-ink">4–6 accounts</span>
      <span className="block text-[10.5px] text-muted">per strategist</span>
    </div>
  )
}
