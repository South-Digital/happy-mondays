import { useState } from 'react'
import { IMG } from '../lib/assets'

/**
 * Happy Mondays wordmark. The SVG export (node 2171:569) is not in the repo yet,
 * so this falls back to a type-only wordmark in the brand face.
 */
export function Wordmark({ className = '', tone = 'ink' }: { className?: string; tone?: 'ink' | 'white' }) {
  const [failed, setFailed] = useState(false)

  return (
    <span className={`flex min-h-[44px] select-none items-center md:min-h-0 ${className}`}>
      {failed ? (
        <span
          className={`text-[17px] font-semibold tracking-[-0.03em] ${
            tone === 'white' ? 'text-white' : 'text-ink'
          }`}
        >
          Happy Mondays
        </span>
      ) : (
        <img
          src={IMG.wordmark}
          alt="Happy Mondays"
          width={313}
          height={71}
          className={`h-[26px] w-auto ${tone === 'white' ? 'brightness-0 invert' : ''}`}
          onError={() => setFailed(true)}
        />
      )}
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
      width={327}
      height={144}
      className="block h-auto w-full"
      /* Not lazy: in the mobile marquee these move by CSS transform rather than
         by scrolling, so the lazy trigger never fires for the ones that start
         off-screen and three of the eight stayed blank as they came round. They
         are 2–6KB each. */
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
