import { MockLink } from './Toast'
import { Wordmark } from './Brand'

const LINKS = ['Reviews', 'Case Studies', 'Pricing', 'Blog', 'Contact']

/**
 * Site nav. Concept A (§A1) is transparent with a liquid-glass "Book a call"
 * pill; Concept B (§B1) sits in a white pill container with a solid cobalt CTA.
 * Mobile (the "Menu" pill + full-screen sheet) lands in the mobile pass.
 */
export function Nav({ variant }: { variant: 'a' | 'b' }) {
  if (variant === 'b') {
    return (
      <nav className="relative z-30 hidden md:block">
        <div className="mx-auto flex w-full max-w-content items-center justify-between rounded-[20px] bg-white px-5 py-3 shadow-[0_8px_24px_rgba(28,33,48,.08)]">
          <MockLink label="Happy Mondays — home">
            <Wordmark />
          </MockLink>
          <div className="flex items-center gap-7">
            <ul className="flex items-center gap-7">
              {LINKS.map((l) => (
                <li key={l}>
                  <MockLink className="text-nav text-ink-72 transition-colors hover:text-ink">{l}</MockLink>
                </li>
              ))}
            </ul>
            <MockLink className="btn-solid btn-solid-sm">Book a call</MockLink>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="relative z-30 hidden md:block">
      <div className="mx-auto flex w-full max-w-content items-center justify-between">
        <MockLink label="Happy Mondays — home">
          <Wordmark />
        </MockLink>
        <div className="flex items-center gap-7">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l}>
                <MockLink className="text-nav text-ink-72 drop-shadow-[0_1px_2px_rgba(255,255,255,.5)] transition-colors hover:text-ink">
                  {l}
                </MockLink>
              </li>
            ))}
          </ul>
          <MockLink className="btn-liquid btn-liquid-sm">Book a call</MockLink>
        </div>
      </div>
    </nav>
  )
}
