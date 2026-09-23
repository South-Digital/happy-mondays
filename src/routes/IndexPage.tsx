import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export default function IndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink md:py-24">
      <Seo title="Happy Mondays — working baseline" />
      <p className="text-sm text-ink-72">Happy Mondays · Internal design review</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Back to the agreed direction.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-72">
        The latest refinement was rejected. Emmanuel’s original concepts are
        restored here as the working baseline. Neither is ready for the client.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {[
          { id: 'a', title: 'Landscape with depth', image: '/images/a-hero-bg.webp', description: 'A recognisable Shopify dashboard integrated into a coastal scene.' },
          { id: 'b', title: 'Nature first', image: '/images/b-hero.webp', description: 'An immersive photograph, followed immediately by the store and Shopping demonstration.' },
        ].map((route) => (
          <Link key={route.id} to={`/concept-${route.id}`} className="group overflow-hidden rounded-2xl border border-black/10 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            <img src={route.image} alt="" width={800} height={450} className="aspect-video w-full object-cover" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-ink-72">Original concept {route.id.toUpperCase()}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{route.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-72">{route.description}</p>
              <p className="mt-5 text-sm font-semibold group-hover:underline">Open baseline ↗</p>
            </div>
          </Link>
        ))}
      </div>
      <section className="mt-12 border-t border-black/10 pt-7">
        <h2 className="text-xl font-semibold">The next design review</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-72">
          Resolve the hero first: soft white and grey surfaces, restrained blue,
          blurred gradients, convincing photographic depth and recognisable
          Shopify UI. Compare it directly with the client’s Miro references on
          desktop and mobile before extending the page.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-72">
          These historical prototypes include mock booking actions, illustrative
          dashboard data and copy that still needs verification. This reset
          does not approve those claims for publication.
        </p>
      </section>
      <details className="mt-9 border-t border-black/10 pt-6 text-sm">
        <summary className="cursor-pointer font-semibold">Rejected pass — retained for comparison</summary>
        <p className="mt-3 text-ink-72">Archived as a record of the direction that did not meet the brief.</p>
        <div className="mt-4 flex gap-6">
          <Link className="underline" to="/rejected/concept-a?motion=reduce">Rejected A</Link>
          <Link className="underline" to="/rejected/concept-b?motion=reduce">Rejected B</Link>
        </div>
      </details>
    </main>
  )
}
