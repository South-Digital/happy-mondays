import { BrandLogo } from '../../components/Brand'
import { LOGOS } from '../../lib/assets'

/**
 * §A1 / §B3 — eight brand logos, all one grey at ~50% opacity, no per-logo boxes.
 * The mobile marquee lands in the mobile pass.
 */
export function LogoStrip({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <div className={className}>
      {label && <p className="mb-8 text-center text-[14px] text-ink-60">{label}</p>}
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {LOGOS.map((logo) => (
          <li key={logo.name} className="opacity-50 grayscale [&_*]:text-ink">
            <BrandLogo name={logo.name} src={logo.src} />
          </li>
        ))}
      </ul>
    </div>
  )
}
