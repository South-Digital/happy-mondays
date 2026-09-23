import { Seo } from '../../components/Seo'
import { Pillars } from '../shared/Pillars'
import { HeroA } from './HeroA'
import { SearchShopping } from './SearchShopping'

/** Concept A — "Landscape with depth" (§3). Historical baseline; not client-approved. */
export default function ConceptA() {
  return (
    <>
      <Seo title="Concept A — Landscape with depth · Happy Mondays" />
      <main className="bg-white">
        <HeroA />
        <Pillars className="py-24 xl:py-32" />
        <SearchShopping className="pb-28 xl:pb-36" />
      </main>
    </>
  )
}
