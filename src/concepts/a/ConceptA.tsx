import { Seo } from '../../components/Seo'

/** Concept A — "Landscape with depth" (§3). Built in phase 2. */
export default function ConceptA() {
  return (
    <>
      <Seo title="Concept A — Landscape with depth · Happy Mondays" />
      <main className="min-h-dvh bg-white">
        <div className="content-grid py-24">
          <p className="tagline">Concept A</p>
          <h1 className="mt-4 text-section-m md:text-section">Landscape with depth</h1>
          <p className="mt-4 text-card-desc text-ink-60">Scaffold in place — sections land in phase 2.</p>
        </div>
      </main>
    </>
  )
}
