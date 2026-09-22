import { Seo } from '../../components/Seo'
import { LogoStrip } from '../shared/LogoStrip'
import { Pillars } from '../shared/Pillars'
import { BandOne } from './BandOne'
import { HeroB } from './HeroB'

/** Concept B — "Nature first" (§4). Warm off-white ground. */
export default function ConceptB() {
  return (
    <>
      <Seo title="Concept B — Nature first · Happy Mondays" />
      <main className="bg-offwhite">
        <HeroB />
        {/* §B2 */}
        <BandOne className="pt-24 xl:pt-32" />
        {/* §B3 */}
        <LogoStrip
          label="Growing Shopify brands we work with"
          className="pt-36 xl:pt-44"
        />
        {/* §B4 */}
        <Pillars className="py-24 xl:py-32" />
      </main>
    </>
  )
}
