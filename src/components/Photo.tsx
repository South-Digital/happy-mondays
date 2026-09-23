import { useState } from 'react'
import type { CSSProperties } from 'react'
import VARIANTS from '../lib/image-variants.json'

type VariantEntry = { w: number; h: number; variants: number[] }
const MANIFEST = VARIANTS as Record<string, VariantEntry>

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
   * Builds a srcset from the variant ladder in src/lib/image-variants.json,
   * which `npm run images` regenerates from whatever is on disk. Drop a
   * higher-resolution export into public/images, re-run it, and the browser
   * starts picking the new rungs with no change here.
   *
   * `sizes` must describe the width the image actually PAINTS at, which for a
   * full-bleed `object-cover` photo is not 100vw - concept A's hero background
   * paints at 119vw. Understating it makes the browser pick a file that is too
   * small, which is indistinguishable from a low-resolution source.
   */
  responsive?: boolean
  /** Overrides the manifest, for a file it does not cover. */
  variants?: number[]
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
  variants,
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

  const entry = MANIFEST[src]
  const rungs = variants ?? entry?.variants ?? []
  // The full-size file carries its real width, so the browser can tell when no
  // rung is big enough rather than being told a variant is larger than it is.
  const fullWidth = entry?.w ?? width
  const srcSet =
    responsive && rungs.length
      ? [...rungs.map((v) => `${src.replace(/\.webp$/, `-${v}.webp`)} ${v}w`), `${src} ${fullWidth}w`].join(', ')
      : undefined

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? '100vw') : sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      draggable={false}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  )
}
