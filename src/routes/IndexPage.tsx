import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import '../refinement/refinement.css'

const concepts = [
  {
    id: 'a',
    title: 'A clearer outlook.',
    label: 'Concept A',
    image: 'coastal-morning',
    description:
      'A confident, centred opening. Clear blue, a sunlit landscape and a precise Shopify interface bring the promise of better Mondays into focus.',
  },
  {
    id: 'b',
    title: 'Room to grow.',
    label: 'Concept B',
    image: 'hillside',
    description:
      'A quieter, editorial opening. Natural greens and an open coastal view lead the story, with the commercial detail unfolding below.',
  },
]

export default function IndexPage() {
  return (
    <div className="hm-refined">
      <Seo title="Happy Mondays — refined concepts" />
      <main className="hm-review hm-container">
        <p className="hm-eyebrow">Happy Mondays · Design review</p>
        <h1>
          Two ways to a<br />
          <em>better Monday.</em>
        </h1>
        <p className="hm-review-intro">
          Two complete homepage directions, built around the same idea: senior
          Google Ads expertise, a wider view of your store and a more direct
          working relationship.
        </p>
        <div className="hm-review-grid">
          {concepts.map((concept) => (
            <article key={concept.id}>
              <Link
                to={`/concept-${concept.id}`}
                className={`hm-review-card hm-review-card-${concept.id}`}
              >
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`/images/refinement/${concept.image}-800.avif`}
                  />
                  <img
                    src={`/images/refinement/${concept.image}-800.webp`}
                    alt=""
                    width="800"
                    height={concept.id === 'a' ? '400' : '1000'}
                  />
                </picture>
                <div>
                  <p className="hm-eyebrow">{concept.label}</p>
                  <h2>{concept.title}</h2>
                  <p>{concept.description}</p>
                  <span className="hm-text-link">
                    Explore this direction <span aria-hidden>↗</span>
                  </span>
                </div>
              </Link>
              <a
                className="hm-review-motion"
                href={`/concept-${concept.id}?motion=reduce`}
              >
                View with reduced motion
              </a>
            </article>
          ))}
        </div>
        <aside className="hm-review-note">
          <strong>About this review</strong>
          <p>
            Section navigation and service tabs are interactive. Booking buttons
            show a preview message; no meeting is booked. Dashboard figures,
            campaign examples and ad copy are illustrative. Final booking
            details, imagery permissions and public proof will be confirmed
            before launch.
          </p>
        </aside>
      </main>
    </div>
  )
}
