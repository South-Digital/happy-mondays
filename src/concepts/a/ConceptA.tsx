import { Seo } from "../../components/Seo";
import { SmoothScroll } from "../../components/SmoothScroll";
import { GrowthJourney } from "./GrowthJourney";
import { HeroAStudy, StudyNav, ContinuingNav } from "./HeroAStudy";
import { AgencyFooter } from "./AgencyStory";
import { usePrefersReducedMotion } from "../../lib/motion";
import "./concept-a.css";
import "./optical-edges.css";

export default function ConceptA() {
  const reduced = usePrefersReducedMotion();
  return (
    <>
      <SmoothScroll />
      <Seo title="Concept A — Landscape with depth · Happy Mondays" />
      <div className="ca-direction" data-motion={reduced ? "reduce" : "full"}>
        <a className="ca-skip-link" href="#ha-title">Skip to content</a>
        <div className="ca-nav-position"><StudyNav /></div>
        <ContinuingNav />
        <main>
          <HeroAStudy />
          <GrowthJourney />
        </main>
        <div className="cj-wrap"><AgencyFooter /></div>
      </div>
    </>
  );
}
