import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, sectionReveal, usePrefersReducedMotion } from "../../lib/motion";
import { MockLink } from "../../components/Toast";
import "./growth-journey.css";

const chapters = [
  { label: "The opportunity", title: "Great products. Waiting to be found.", body: "Understand how shoppers discover your products—and what happens after the click." },
  { label: "The work", title: "The details make the difference.", body: "Product feeds, considered campaigns and a Shopify store that makes buying easier." },
  { label: "The possibility", title: "More visibility. A clearer path to purchase.", body: "Bring the right shoppers closer to the products they’re looking for." },
];
const products = [
  { id: "studio", name: "Studio grip socks", tone: "#d6d1c7" },
  { id: "ribbed", name: "Ribbed crew socks", tone: "#bdc6b6" },
  { id: "daily", name: "Everyday grip socks", tone: "#d2b6a7" },
  { id: "classic", name: "Classic ankle socks", tone: "#c4c7cb" },
  { id: "juliet", name: "Juliet Grip Sock", tone: "" },
];

function Sock({ tone }: { tone: string }) {
  return <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M35 10h26v41c0 7-4 11-10 15L25 82C13 88 3 75 11 67l24-22Z" fill={tone} /><path d="M36 18h24M36 23h24M36 28h24" stroke="white" strokeOpacity=".55" strokeWidth="2" /><path d="M15 67l14 11M46 48l12 9" fill="none" stroke="white" strokeOpacity=".35" strokeWidth="7" /></svg>;
}

export function GrowthJourney() {
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState(reduced ? 2 : 0);
  const [playing, setPlaying] = useState(!reduced);
  const [pageVisible, setPageVisible] = useState(true);
  const scene = useRef<HTMLDivElement>(null);
  const intervention = useRef<HTMLDivElement>(null);
  const inView = useInView(intervention, { amount: 1 });
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (reduced) { setStage(2); setPlaying(false); }
  }, [reduced]);
  useEffect(() => {
    if (!inView || !playing || reduced || !pageVisible) return;
    const timer = window.setTimeout(() => {
      if (stage < 2) setStage(stage + 1);
      else setPlaying(false);
    }, stage === 1 ? 3600 : 2600);
    return () => window.clearTimeout(timer);
  }, [stage, inView, playing, reduced, pageVisible]);
  const ordered = stage === 2 ? [products[4], ...products.slice(0, 4)] : products;
  const choose = (index: number) => { setStage(index); setPlaying(false); };

  return (
    <section className="hj-section" id="the-approach" aria-labelledby="hj-title" data-motion={reduced ? "reduce" : "full"}>
      <div className="hj-container">
        <motion.div className="hj-heading" {...sectionReveal(reduced)}>
          <div>
            <p className="hj-eyebrow">A joined-up approach</p>
            <h2 id="hj-title"><span>Better ads.</span><br />A better path to purchase.</h2>
          </div>
          <div className="hj-introduction">
            <p>From the first search to your Shopify checkout. We look beyond the ad account, so every part of the journey can work harder for your brand.</p>
            <div className="hj-person">
              <img src="/images/refinement/keanu-480.webp" alt="Keanu Fischell" width="48" height="48" loading="lazy" />
              <div><strong>Senior people. Personally invested.</strong><span>Keanu Fischell · Founder, Happy Mondays</span></div>
            </div>
          </div>
        </motion.div>

        <div className="hj-scene" ref={scene} data-stage={stage}>
          <div className="hj-atmosphere" aria-hidden="true">
            <motion.div className="hj-colour-field" initial={false} animate={{ x: reduced ? 0 : stage * -22, y: reduced ? 0 : stage * 12 }} transition={{ duration: reduced ? 0 : 1.8, ease: EASE.state }} />
          </div>
          <div className="hj-scene-label" aria-hidden="true"><span>Google Ads</span><span>+ your Shopify store</span></div>
          <motion.div className="hj-shopping hj-surface" {...sectionReveal(reduced, 0.08)}>
            <div className="hj-search"><span className="hj-google" aria-hidden="true">G</span><span>pilates grip socks</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg></div>
            <div className="hj-search-nav" aria-hidden="true"><span>All</span><strong>Shopping</strong><span>Images</span><span>Videos</span></div>
            <p className="hj-results-label">Sponsored products <span>Illustrative placements</span></p>
            <ol className="hj-products" aria-label="Illustrative shopping results">
              {ordered.map((product, index) => (
                <motion.li layout={!reduced} key={product.id} transition={{ layout: { duration: 1.05, ease: EASE.entrance } }} className={`hj-product ${product.id === "juliet" ? "hj-your-product" : ""}`}>
                  <span className="hj-position" aria-label={`Position ${index + 1}`}>{index + 1}</span>
                  <div className="hj-product-picture">
                    {product.id === "juliet" ? <img src="/images/refinement/product-juliet.webp" alt="White Juliet grip socks with blue ribbons" width="140" height="160" loading="lazy" /> : <Sock tone={product.tone} />}
                  </div>
                  <div className="hj-product-detail"><strong>{product.name}</strong><span>{product.id === "juliet" ? "Lucky Honey" : "Another store"}</span>{product.id === "juliet" && <small>Your brand</small>}</div>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.div className="hj-store hj-surface" {...sectionReveal(reduced, 0.18)}>
            <div className="hj-store-heading"><span>LUCKY HONEY</span><svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg></div>
            <div className="hj-store-product"><div className="hj-store-picture"><img src="/images/refinement/product-juliet.webp" alt="Juliet Grip Sock product detail" width="300" height="300" loading="lazy" /></div><div className="hj-store-detail"><span className="hj-store-kicker">A little grip. A lot of good.</span><h3>Juliet Grip Sock</h3><p>Made for your next move.</p><div className="hj-swatches" aria-hidden="true"><i /><i /><i /></div><span className="hj-add-to-bag">Add to bag <span aria-hidden="true">+</span></span></div></div>
            <div className="hj-store-foot"><span aria-hidden="true">✓</span> From a good first impression to a confident next step.</div>
          </motion.div>

          <motion.div className="hj-work" ref={intervention} initial={false} animate={{ y: !reduced && stage === 0 ? 12 : 0 }} transition={{ duration: 0.8, ease: EASE.entrance }}>
            <span className="hj-work-mark" aria-hidden="true"><img src="/images/logo-hm.webp" width="313" height="71" alt="" /></span>
            <div><strong>{stage === 0 ? "A joined-up approach" : "Working with Happy Mondays"}</strong><span>Product feeds · Campaigns · Shopify</span><span className="hj-work-state"><i />{stage === 0 ? "The starting point" : stage === 1 ? "Connecting the details" : "Working together"}</span></div>
          {!reduced && <button className="hj-playback" onClick={() => {
            if (stage === 2) { setStage(0); setPlaying(true); }
            else setPlaying(!playing);
          }} aria-label={stage === 2 ? "Replay journey" : playing ? "Pause journey" : "Play journey"}>
            <span aria-hidden="true">{stage === 2 ? "↻" : playing ? "Ⅱ" : "▷"}</span>{stage === 2 ? "Replay" : playing ? "Pause" : "Play"}
          </button>}
          </motion.div>
        </div>

        <div className="hj-controls">
          <p>One illustrative journey. Placements and results vary.</p>

        </div>
        <div className="hj-chapters" role="group" aria-label="Explore the journey">
          {chapters.map((chapter, index) => <button key={chapter.label} className={`hj-chapter ${stage === index ? "is-current" : ""}`} aria-pressed={stage === index} onClick={() => choose(index)}>
            <span className="hj-chapter-label"><span>0{index + 1}</span>{chapter.label}</span><strong>{chapter.title}</strong><span className="hj-chapter-body">{chapter.body}</span>
          </button>)}
        </div>
        <div className="hj-close"><p>Good people.<br /><span>On your side.</span></p><MockLink className="ha-button" message="Design preview — the booking calendar will be connected before launch.">Book a call</MockLink></div>
      </div>
    </section>
  );
}
