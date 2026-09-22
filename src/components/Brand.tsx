import { useState } from 'react'

/**
 * Happy Mondays wordmark. The SVG export (node 2171:569) is not in the repo yet,
 * so this falls back to a type-only wordmark in the brand face.
 */
export function Wordmark({ className = '', tone = 'ink' }: { className?: string; tone?: 'ink' | 'white' }) {
  return (
    <span
      className={`flex min-h-[44px] select-none items-center text-[17px] font-semibold tracking-[-0.03em] md:min-h-0 ${
        tone === 'white' ? 'text-white' : 'text-ink'
      } ${className}`}
    >
      Happy Mondays
    </span>
  )
}

/**
 * One brand logo from the strip. Renders the SVG export when present, otherwise a
 * type wordmark — either way it is rendered grey by the strip, per §A1.
 */
export function BrandLogo({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.02em] text-ink">
        {name}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      height={28}
      className="h-7 w-auto object-contain"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
