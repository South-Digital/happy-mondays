import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

const CONCEPTS = [
  {
    to: '/concept-a',
    label: 'Concept A — Landscape with depth',
    preferred: true,
    blurb:
      'White ground, full-bleed rooftop scene, the Shopify dashboard sitting inside the photograph. Interactive Search & Shopping tabs.',
  },
  {
    to: '/concept-b',
    label: 'Concept B — Nature first',
    preferred: false,
    blurb:
      'Warm off-white ground, full-bleed Santorini hero with no dashboard above the fold, dashboard and Shopping widget in the first band.',
  },
]

export default function IndexPage() {
  return (
    <>
      <Seo title="Happy Mondays — prototypes" />
      <main className="min-h-dvh bg-offwhite px-5 py-20 md:py-28">
        <div className="mx-auto w-full max-w-content">
          <p className="tagline">Happy Mondays · Homepage prototypes</p>
          <h1 className="mt-4 text-section-m md:text-section">Two directions to review.</h1>
          <p className="mt-4 max-w-[560px] text-card-desc text-ink-60">
            Client-review prototypes. Not a production build — links are disabled, and all
            dashboard and campaign numbers are illustrative.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {CONCEPTS.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group rounded-rim-lg border border-line bg-white p-8 transition-transform duration-200 hover:-translate-y-1 hover:shadow-rim"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-card-title">{c.label}</h2>
                  {c.preferred && (
                    <span className="rounded-pill bg-soft-blue px-2.5 py-1 text-[11px] font-semibold text-cobalt">
                      Preferred
                    </span>
                  )}
                </div>
                <p className="mt-3 text-card-desc text-ink-60">{c.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cobalt">
                  View prototype
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
