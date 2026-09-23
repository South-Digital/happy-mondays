import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export default function IndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-ink md:py-24">
      <Seo title="Happy Mondays — Concept A hero study" />
      <p className="text-sm text-ink-72">
        Happy Mondays · Internal design review
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
        Landscape with depth.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-72">
        A focused revision of Concept A’s hero, following the 18 September call
        and client moodboard. The lower page and Concept B await this design
        review.
      </p>
      <Link
        to="/concept-a"
        className="mt-9 block overflow-hidden rounded-2xl border border-black/10 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <img
          src="/images/hero-a-v2/coast-1440.webp"
          alt="A white coastal parapet overlooking the blue sea"
          width={1440}
          height={720}
          className="aspect-[2.5/1] w-full object-cover"
        />
        <div className="p-7">
          <p className="text-xs uppercase tracking-widest text-ink-72">
            Current hero study
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Open Shopify. Smile.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-72">
            A quieter two-tone headline, softened Shopify interface and a white
            foreground plane that overlaps the dashboard. Composed separately
            for phone and desktop.
          </p>
          <p className="mt-5 text-sm font-semibold text-cobalt">
            Open the hero ↗
          </p>
        </div>
      </Link>
      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm">
        <Link
          className="underline underline-offset-4"
          to="/concept-a?motion=reduce"
        >
          View without motion
        </Link>
        <Link
          className="underline underline-offset-4"
          to="/baseline/concept-a?motion=reduce"
        >
          Compare original A
        </Link>
        <Link
          className="underline underline-offset-4"
          to="/concept-b?motion=reduce"
        >
          Original B
        </Link>
      </div>
      <section className="mt-12 border-t border-black/10 pt-7">
        <h2 className="text-xl font-semibold">What to judge</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-72">
          Does the scene feel integrated? Do the soft surfaces and restrained
          blue match the references? Is the first impression stronger than the
          original on both desktop and phone? This is a design study, not a
          client-approved homepage.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-72">
          Booking and navigation destinations remain mocked. The date selector
          demonstrates editable UI; all store figures are illustrative. Original
          baseline copy still needs verification.
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
