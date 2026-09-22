import { useEffect } from 'react'

/**
 * Per-route title. The noindex/nofollow meta lives in index.html so it is present
 * in the served HTML for every route; this re-asserts it defensively (§1).
 */
export function Seo({ title }: { title: string }) {
  useEffect(() => {
    document.title = title

    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'robots'
      document.head.appendChild(meta)
    }
    meta.content = 'noindex, nofollow'
  }, [title])

  return null
}
