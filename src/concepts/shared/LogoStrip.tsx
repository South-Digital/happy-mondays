import { BrandLogo } from '../../components/Brand'
import { LOGOS } from '../../lib/assets'
import { usePrefersReducedMotion } from '../../lib/motion'

/**
 * §A1 / §B3 — eight brand logos, all one grey at ~50% opacity, no per-logo boxes.
 *
 * §5 mobile — a single-row auto-scrolling marquee. Under reduced motion the
 * marquee is replaced by a static 2 × 4 wrap, so nothing moves and every logo
 * is still readable.
 */
export function LogoStrip({ label, className = '' }: { label?: string; className?: string }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className={className}>
      {label && <p className="mb-8 text-center text-[14px] text-ink-60">{label}</p>}

      {/* Desktop, and the reduced-motion mobile fallback: static wrap */}
      <ul
        className={`${
          reduced ? 'grid grid-cols-4 gap-x-6 gap-y-8 md:flex' : 'hidden md:flex'
        } flex-wrap items-center justify-center gap-x-12 gap-y-8`}
      >
        {LOGOS.map((logo) => (
          <li key={logo.name} className="flex justify-center opacity-50 grayscale [&_*]:text-ink">
            <BrandLogo name={logo.name} src={logo.src} />
          </li>
        ))}
      </ul>

      {/* Mobile marquee */}
      {!reduced && (
        <div
          className="relative overflow-hidden md:hidden"
          style={{
            maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
            WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
          }}
        >
          <ul className="flex w-max animate-marquee items-center gap-10">
            {/* Duplicated so the loop is seamless; the copy is hidden from AT. */}
            {[0, 1].map((copy) => (
              <li key={copy} className="flex shrink-0 items-center gap-10" aria-hidden={copy === 1}>
                {LOGOS.map((logo) => (
                  <span key={logo.name} className="opacity-50 grayscale [&_*]:text-ink">
                    <BrandLogo name={logo.name} src={logo.src} />
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
