import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

const directions = [
  {
    route: "a",
    title: "Landscape with depth.",
    image: "/images/hero-a-v2/coast-1440.webp",
    label: "Concept A · Hero study",
    description:
      "A familiar Shopify dashboard belongs in the landscape. Soft glass, a white foreground plane and a focused, product-led opening.",
  },
  {
    route: "b",
    title: "Nature first.",
    image: "/images/hero-b-v2/terrace-1440.webp",
    label: "Concept B · Opening sequence",
    description:
      "Space to breathe, then a clearer path to growth. An immersive coastal opening, store-and-search demonstration and a personal close.",
  },
];
export default function IndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 text-ink md:py-24">
      <Seo title="Happy Mondays — Two design directions" />
      <p className="text-sm text-ink-72">
        Happy Mondays · Internal design review
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
        Two directions. One Happy Mondays.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-72">
        Following the 18 September call and client moodboard: shared warmth,
        soft materials and blue-and-white photography, with two different ways
        into the story.
      </p>
      <div className="mt-10 grid gap-7 md:grid-cols-2">
        {directions.map((d) => (
          <article
            key={d.route}
            className="overflow-hidden rounded-2xl border border-black/10 bg-white"
          >
            <Link
              to={`/concept-${d.route}`}
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <img
                src={d.image}
                alt="White coastal architecture overlooking the blue sea"
                width="1440"
                height="810"
                className="aspect-[1.8] w-full object-cover"
              />
              <div className="p-7">
                <p className="text-xs uppercase tracking-widest text-ink-72">
                  {d.label}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  {d.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-72">
                  {d.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-cobalt">
                  Open Concept {d.route.toUpperCase()}
                </p>
              </div>
            </Link>
            <div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-black/5 px-7 py-5 text-xs">
              <Link
                className="underline underline-offset-4"
                to={`/concept-${d.route}?motion=reduce`}
              >
                Without motion
              </Link>
              <Link
                className="underline underline-offset-4"
                to={`/baseline/concept-${d.route}?motion=reduce`}
              >
                Emmanuel’s original
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section className="mt-12 border-t border-black/10 pt-7">
        <h2 className="text-xl font-semibold">What to judge</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-ink-72">
          Does each opening feel premium, warm and unmistakably for Shopify
          brands? Does B make the step from nature to the commercial work feel
          natural? These are reviewable design directions, not client-approved
          finished homepages.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-72">
          Booking and unbuilt navigation destinations show a preview message.
          All store figures and Shopping placements are illustrative. B’s
          example plays once when visible and can be replayed; reduced motion
          presents a complete static explanation. Partner claims, final copy and
          booking destination remain launch checks.
        </p>
      </section>
      <details className="mt-9 border-t border-black/10 pt-6 text-sm">
        <summary className="cursor-pointer font-semibold">
          Rejected earlier pass — retained for comparison
        </summary>
        <div className="mt-4 flex gap-6">
          <Link className="underline" to="/rejected/concept-a?motion=reduce">
            Rejected A
          </Link>
          <Link className="underline" to="/rejected/concept-b?motion=reduce">
            Rejected B
          </Link>
        </div>
      </details>
    </main>
  );
}
