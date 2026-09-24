import { Link } from "react-router-dom";
import { Wordmark } from "../components/Brand";
import { Seo } from "../components/Seo";

const directions = [
  {
    route: "a",
    name: "Landscape with depth.",
    image: "/images/hero-a-v2/coast-1440.webp",
    description: "Your store, in a better place. A recognisable Shopify dashboard sits within the coastal scene, with soft glass and a layered foreground bringing the opening to life.",
    scope: "Explore the opening and brand credentials.",
  },
  {
    route: "b",
    name: "Nature first.",
    image: "/images/hero-b-v2/terrace-1440.webp",
    description: "A little room to breathe. An immersive coastal landscape, a confident headline and soft details give the brand space to make its first impression.",
    scope: "Explore the nature-first hero.",
  },
];

export default function ClientReviewPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-ink md:py-16">
      <Seo title="Happy Mondays — Design directions" />
      <header className="flex items-center justify-between gap-6">
        <Wordmark size="lg" />
        <p className="text-xs text-ink-60">Design directions · September 2026</p>
      </header>
      <section className="pb-10 pt-16 md:pb-12 md:pt-20">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-6xl">
          Two directions.<br />One Happy Mondays.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-72 md:text-lg">
          Two expressions of the direction we discussed: natural warmth, soft materials,
          familiar ecommerce details and a calmer, more confident first impression.
        </p>
      </section>
      <div className="grid gap-7 md:grid-cols-2">
        {directions.map((direction) => (
          <article key={direction.route} className="flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white">
            <Link to={`/concept-${direction.route}`} className="flex flex-1 flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-cobalt">
              <img src={direction.image} width="1440" height="810" alt="" className="aspect-[1.7] w-full object-cover" />
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <p className="text-xs font-medium uppercase tracking-widest text-ink-60">Concept {direction.route.toUpperCase()}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{direction.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-72">{direction.description}</p>
                <p className="mt-4 text-xs leading-relaxed text-ink-60">{direction.scope}</p>
                <span className="mt-7 block pt-2 text-sm font-semibold text-cobalt">Explore Concept {direction.route.toUpperCase()}</span>
              </div>
            </Link>
            <Link to={`/concept-${direction.route}?motion=reduce`} className="block border-t border-black/5 px-8 py-4 text-xs text-ink-60 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cobalt">
              View without motion
            </Link>
          </article>
        ))}
      </div>
      <section className="mt-12 border-t border-black/10 pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Which opening feels most like Happy Mondays?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-72">
          Focus on the feeling, the balance of nature and ecommerce, and the way each direction
          introduces the business. Your preferred opening will guide the next stage of the homepage.
        </p>
      </section>
      <footer className="mt-10 max-w-3xl pb-4 text-xs leading-relaxed text-ink-60">
        Interactive design previews. Booking and navigation are for demonstration;
        Concept A’s store figures are illustrative. These links explore the hero direction,
        rather than a finished website.
      </footer>
    </main>
  );
}
