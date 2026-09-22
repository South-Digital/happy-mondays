/**
 * "Total sales over time" — this week cobalt solid, previous week grey dashed,
 * $0 / $12K / $24K axis, Mon–Sun (§A1). Illustrative data (§7): the this-week
 * series sums to the $128,460 shown in the metrics row.
 */
const THIS_WEEK = [14200, 16800, 15400, 19600, 21300, 18900, 22260]
const PREV_WEEK = [11800, 13600, 12900, 15200, 16400, 15100, 17932]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const W = 720
const H = 190
const PAD = { top: 8, right: 8, bottom: 0, left: 0 }
const MAX = 24000

function path(values: number[]) {
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom
  return values
    .map((v, i) => {
      const x = PAD.left + (i / (values.length - 1)) * innerW
      const y = PAD.top + innerH - (v / MAX) * innerH
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

export function SalesChart({ compact = false }: { compact?: boolean }) {
  return (
    <div className="ui-font">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-[#1A1A1A]">Total sales over time</p>
        <div className="hidden items-center gap-3.5 lg:flex">
          <Legend label="This week" />
          <Legend label="Previous week" dashed />
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        {/* Y axis */}
        <div
          className="flex flex-col justify-between py-1 text-[10px] tabular-nums text-[#6B7177]"
          style={{ height: compact ? 120 : 190 }}
        >
          <span>$24K</span>
          <span>$12K</span>
          <span>$0</span>
        </div>

        <div className="relative flex-1">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: compact ? 120 : 190 }}
            role="img"
            aria-label="Total sales over time. This week trends up against the previous week."
          >
            {[0, 0.5, 1].map((t) => (
              <line
                key={t}
                x1={0}
                x2={W}
                y1={PAD.top + t * (H - PAD.top - PAD.bottom)}
                y2={PAD.top + t * (H - PAD.top - PAD.bottom)}
                stroke="#ECEAE6"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              d={path(PREV_WEEK)}
              fill="none"
              stroke="#B9BDC2"
              strokeWidth={2}
              strokeDasharray="5 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={path(THIS_WEEK)}
              fill="none"
              stroke="#2563EB"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="mt-2 flex justify-between text-[10px] text-[#6B7177]">
            {DAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Legend({ label, dashed = false }: { label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] text-[#6B7177]">
      <svg width="14" height="4" aria-hidden>
        <line
          x1="0"
          y1="2"
          x2="14"
          y2="2"
          stroke={dashed ? '#B9BDC2' : '#2563EB'}
          strokeWidth="2"
          strokeDasharray={dashed ? '4 3' : undefined}
          strokeLinecap="round"
        />
      </svg>
      {label}
    </span>
  )
}
