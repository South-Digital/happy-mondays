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
  /**
   * When true, a `-1000.webp` variant of the same file is offered alongside the
   * full-width one, so a phone does not download a 2000px photo. Generate the
   * variant with the same basename — see public/images/README.md.
   */
  responsive?: boolean
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
  responsive = false,
}: PhotoProps) {
  const [failed, setFailed] = useState(false)

  // An empty src means the export does not exist; go straight to the fallback.
  if (failed || !src) {
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

  const narrow = responsive ? src.replace(/\.webp$/, '-1000.webp') : null

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      srcSet={narrow ? `${narrow} 1000w, ${src} ${width}w` : undefined}
      sizes={narrow ? (sizes ?? '100vw') : sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      draggable={false}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  )
}
