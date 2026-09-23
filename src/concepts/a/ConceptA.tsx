import { Link } from "react-router-dom";
import { Seo } from "../../components/Seo";
import { HeroAStudy } from "./HeroAStudy";
export default function ConceptA() {
  return (
    <>
      <Seo title="Concept A — landscape hero study · Happy Mondays" />
      <main>
        <HeroAStudy />
      </main>
      <aside
        className="ha-review-boundary"
        aria-label="Internal review controls"
      >
        Hero study · 23 September · Not client-approved
        <br />
        <Link to="/baseline/concept-a?motion=reduce">
          Compare Emmanuel’s original
        </Link>
        <Link to="/">Review notes</Link>
      </aside>
    </>
  );
}
