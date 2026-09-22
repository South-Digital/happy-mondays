import { useState } from 'react'
import type { CSSProperties } from 'react'

type PhotoProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  style?: CSSProperties
  /** Above-the-fold images load eagerly; everything else is lazy (§1). */
  priority?: boolean
  /** CSS shown when the export is missing, so layout and tone survive. */
  fallback?: string
  sizes?: string
}

/**
 * Photo with an explicit intrinsic size (no CLS) that degrades to a CSS
 * fallback when the export is absent from `public/images`. See src/lib/assets.ts.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  priority = false,
  fallback,
  sizes,
}: PhotoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role={alt ? 'img' : 'presentation'}
        aria-label={alt || undefined}
        data-missing-asset={src}
        className={className}
        style={{ ...style, background: fallback ?? 'linear-gradient(160deg,#EFEDE8,#DCD8D0)' }}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      draggable={false}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  )
}
