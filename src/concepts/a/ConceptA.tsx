import { Seo } from "../../components/Seo";
import { GrowthJourney } from "./GrowthJourney";
import { HeroAStudy } from "./HeroAStudy";
export default function ConceptA() {
  return (
    <>
      <Seo title="Concept A — Landscape with depth · Happy Mondays" />
      <main>
        <HeroAStudy />
        <GrowthJourney />
      </main>
    </>
  );
}
