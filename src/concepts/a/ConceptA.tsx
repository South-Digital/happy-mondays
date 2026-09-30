import { Seo } from "../../components/Seo";
import { SmoothScroll } from "../../components/SmoothScroll";
import { GrowthJourney } from "./GrowthJourney";
import { HeroAStudy } from "./HeroAStudy";
import "./concept-a.css";

export default function ConceptA() {
  return (
    <>
      <SmoothScroll />
      <Seo title="Concept A — Landscape with depth · Happy Mondays" />
      <main className="ca-direction">
        <HeroAStudy />
        <GrowthJourney />
      </main>
    </>
  );
}
