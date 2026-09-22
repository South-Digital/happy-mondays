import { Photo } from '../../../components/Photo'
import { SearchIcon } from '../../../components/icons'
import { IMG } from '../../../lib/assets'

const PRODUCTS = [
  { name: 'Juliet Grip Sock', src: IMG.productJuliet, fallback: 'linear-gradient(150deg,#F6E9D8,#E3CDB0)' },
  {
    name: 'Checkered Crew Grip Sock',
    src: IMG.productCheckered,
    fallback: 'linear-gradient(150deg,#E7EAF2,#C9CFDD)',
  },
  {
    name: 'Crew Stripe Grip Sock',
    src: IMG.productStripe,
    fallback: 'linear-gradient(150deg,#F2ECE2,#D9CFBE)',
  },
]

/**
 * Google Shopping results for "grip socks" (§A3, node 2087:211). Reused as the
 * widget layered over the dashboard in Concept B's first band (§B2).
 */
export function ShoppingGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <div className="glass-rim w-full">
      <div className="rim-card ui-font p-5">
        {/* Search bar */}
        <div className="flex items-center gap-2.5 rounded-pill bg-tile px-4 py-2.5">
          <SearchIcon width={14} height={14} className="text-muted" />
          <span className="text-[13px] text-ink">grip socks</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-muted">
            Sponsored
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <ul className={`mt-3 grid grid-cols-3 ${compact ? 'gap-2' : 'gap-3'}`}>
          {PRODUCTS.map((p) => (
            <li key={p.name} className="flex flex-col overflow-hidden rounded-xl bg-tile">
              <Photo
                src={p.src}
                alt={p.name}
                width={320}
                height={320}
                className="aspect-square w-full object-cover"
                fallback={p.fallback}
              />
              <div className="p-2.5">
                <p className="min-h-[2.2em] text-[11.5px] font-medium leading-tight text-ink">{p.name}</p>
                <p className="mt-1 text-[12px] font-semibold tabular-nums text-ink">$18.00</p>
                <p className="text-[10px] text-muted">Lucky Honey</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Floating chip that overlaps the Shopping card's edge. */
export function ShoppingChip() {
  return (
    <div className="glass-chip glass-chip-lg px-4 py-3 leading-tight">
      <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-muted">
        Conversion value
      </p>
      <p className="mt-1 text-[16px] font-semibold tabular-nums text-ink">
        $21,614 <span className="text-ink-60">· 5.05 ROAS</span>
      </p>
    </div>
  )
}
