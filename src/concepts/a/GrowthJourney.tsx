import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE, usePrefersReducedMotion } from "../../lib/motion";
import { MockLink } from "../../components/Toast";
import { segment, settle, useSceneTimeline } from "./useSceneTimeline";
import "./growth-journey.css";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.61-2.41l-3.24-2.51c-.89.6-2.03.96-3.37.96-2.61 0-4.83-1.76-5.62-4.12H3.04v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.38 13.92a6 6 0 0 1 0-3.84V7.49H3.04a10 10 0 0 0 0 9.02l3.34-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.49l3.34 2.59C7.17 7.72 9.39 5.96 12 5.96Z"
      />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
const products = [
  { name: "Splendore Drop Earrings", image: "splendore", price: "$390.00" },
  { name: "Cosimo Pinky Ring", image: "cosimo", price: "$210.00" },
  { name: "Luna Nera Lariat Necklace", image: "luna", price: "$520.00" },
];
function EditorialPhoto({ onReady }: { onReady?: () => void }) {
  return (
    <img
      src="/images/at-present/editorial-800.webp"
      srcSet="/images/at-present/editorial-800.webp 800w, /images/at-present/editorial-1600.webp 1600w"
      sizes="(max-width: 760px) 90vw, 560px"
      width="1789"
      height="1792"
      alt="At Present’s Splendore earrings, photographed on a model in natural light"
      loading="lazy"
      onLoad={onReady}
      onError={onReady}
    />
  );
}
function Heading({
  first,
  second,
  id,
}: {
  first: string;
  second: string;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const ready = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  return (
    <h2 ref={ref} id={id}>
      {[first, second].map((line, i) => (
        <span className={`pj-line pj-line--${i}`} key={line}>
          <motion.span
            initial={reduced ? false : { y: "105%" }}
            animate={ready || reduced ? { y: 0 } : undefined}
            transition={{
              duration: reduced ? 0 : 0.95,
              delay: i * 0.1,
              ease: EASE.entrance,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
function useComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const visible = useInView(ref, { amount: 0.25 });
  const [loaded, setLoaded] = useState(false);
  const scene = useSceneTimeline(visible, loaded, reduced, 4200, 60);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 35,
    mass: 0.25,
  });
  const photoY = useTransform(progress, [0, 1], [24, -24]);
  const panelY = useTransform(progress, [0, 1], [42, -20]);
  return {
    ref,
    reduced,
    scene,
    photoY,
    panelY,
    onReady: () => setLoaded(true),
  };
}
function Discovery() {
  const { ref, reduced, scene, photoY, panelY, onReady } = useComposition();
  const t = scene.time;
  const surface = settle(segment(t, 0, 1000));
  const results = settle(segment(t, 1150, 1050));
  const query = "statement jewellery";
  return (
    <div
      className="pj-art pj-discovery"
      ref={ref}
      data-scene-time={Math.round(t)}
    >
      <div className="pj-photo-halo" aria-hidden="true" />
      <motion.div
        className="pj-editorial"
        style={reduced ? undefined : { y: photoY }}
      >
        <motion.div
          className="pj-editorial-inner"
          style={{
            opacity: 0.3 + 0.7 * surface,
            scale: 1.075 - 0.075 * surface,
          }}
        >
          <EditorialPhoto onReady={onReady} />
        </motion.div>
      </motion.div>
      <motion.div
        className="pj-search-plane"
        style={reduced ? undefined : { y: panelY }}
      >
        <div
          className="pj-google"
          role="img"
          aria-label="Illustrative Google Shopping results for statement jewellery, featuring actual At Present products. Not a live search or a ranking claim."
          style={{
            opacity: surface,
            transform: `translateY(${36 * (1 - surface)}px)`,
          }}
        >
          <div className="pj-google-search">
            <GoogleMark />
            <span aria-hidden="true">
              {query.slice(0, Math.round(segment(t, 300, 950) * query.length))}
              <i
                className="pj-type-caret"
                style={{ opacity: t < 1300 ? 1 : 0 }}
              />
            </span>
            <SearchIcon />
          </div>
          <div className="pj-google-tabs" aria-hidden="true">
            <span>All</span>
            <span className="pj-tab-selected">Shopping</span>
            <span>Images</span>
            <span>Videos</span>
          </div>
          <div
            className="pj-shopping-results"
            aria-hidden="true"
            style={{ opacity: results }}
          >
            <p className="pj-sponsored">Sponsored products</p>
            <div className="pj-product-grid">
              {products.map((product, i) => {
                const show = settle(segment(t, 1400 + i * 180, 1000));
                return (
                  <div
                    className="pj-shopping-product"
                    key={product.name}
                    style={{
                      opacity: show,
                      transform: `translateY(${24 * (1 - show)}px)`,
                    }}
                  >
                    <div className="pj-catalogue-image">
                      <img
                        src={`/images/at-present/${product.image}-480.webp`}
                        alt=""
                        width="480"
                        height="618"
                        loading="lazy"
                      />
                    </div>
                    <span className="pj-shopping-name">{product.name}</span>
                    <strong>{product.price}</strong>
                    <span className="pj-merchant">At Present</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
function Storefront() {
  const { ref, reduced, scene, photoY, panelY, onReady } = useComposition();
  const t = scene.time;
  const surface = settle(segment(t, 0, 1100));
  const content = settle(segment(t, 450, 1250));
  const bag = settle(segment(t, 2200, 1050));
  return (
    <div
      className="pj-art pj-conversion"
      ref={ref}
      data-scene-time={Math.round(t)}
    >
      <div className="pj-store-halo" aria-hidden="true" />
      <motion.div
        className="pj-store-plane"
        style={reduced ? undefined : { y: photoY }}
      >
        <div
          className="pj-store"
          role="img"
          aria-label="Illustrative At Present storefront: Splendore Drop Earrings, $390, followed by the same product in a shopping bag. Not an actual order."
          style={{
            opacity: surface,
            transform: `translateY(${35 * (1 - surface)}px)`,
          }}
        >
          <div className="pj-store-browser" aria-hidden="true">
            <span>atpresent.com</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor">
              <rect x="4" y="7" width="8" height="7" rx="2" />
              <path d="M6 7V4a2 2 0 0 1 4 0v3" />
            </svg>
          </div>
          <div className="pj-store-nav" aria-hidden="true">
            <SearchIcon />
            <img
              src="/images/refinement/logo-atpresent.webp"
              alt=""
              width="150"
              height="40"
            />
            <BagIcon />
          </div>
          <div className="pj-store-content" aria-hidden="true">
            <div className="pj-store-product">
              <img
                src="/images/at-present/splendore-1200.webp"
                srcSet="/images/at-present/splendore-480.webp 480w, /images/at-present/splendore-1200.webp 1200w"
                sizes="(max-width:760px) 50vw, 340px"
                alt=""
                width="1200"
                height="1545"
                loading="lazy"
                onLoad={onReady}
                onError={onReady}
                style={{ transform: `scale(${1.06 - 0.06 * content})` }}
              />
            </div>
            <div
              className="pj-store-detail"
              style={{
                opacity: content,
                transform: `translateY(${18 * (1 - content)}px)`,
              }}
            >
              <span className="pj-product-designer">MOMA’S EYE</span>
              <h3>
                Splendore
                <br />
                Drop Earrings
              </h3>
              <p className="pj-store-price">$390</p>
              <p className="pj-store-description">
                A little colour.
                <br />A lot of character.
              </p>
              <span className="pj-product-finish">
                <i />
                Burgundy / Lemon
              </span>
              <span
                className="pj-store-add"
                style={{ backgroundColor: t > 2200 ? "#496047" : "#252a25" }}
              >
                {t > 2200 ? "Added to bag ✓" : "Add to bag"}
              </span>
              <span className="pj-shop-pay">
                Buy with{" "}
                <b>
                  shop<span>Pay</span>
                </b>
              </span>
              <span className="pj-store-help">
                Product details <span>+</span>
              </span>
              <span className="pj-store-help">
                Delivery & returns <span>+</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="pj-bag-plane"
        style={reduced ? undefined : { y: panelY }}
      >
        <div
          className="pj-bag"
          aria-hidden="true"
          style={{
            opacity: bag,
            transform: `translateY(${30 * (1 - bag)}px) scale(${0.97 + 0.03 * bag})`,
          }}
        >
          <div className="pj-bag-heading">
            <span>
              <span className="pj-tick">✓</span> Added to your bag
            </span>
            <span>1 item</span>
          </div>
          <div className="pj-bag-product">
            <img
              src="/images/at-present/splendore-480.webp"
              alt=""
              width="70"
              height="90"
            />
            <div>
              <strong>Splendore Drop Earrings</strong>
              <span>Burgundy / Lemon</span>
              <span>$390.00</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="pj-services">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function GrowthJourney() {
  const reduced = usePrefersReducedMotion();
  return (
    <section
      className="pj-story"
      id="the-approach"
      data-motion={reduced ? "reduce" : "full"}
      aria-label="From product discovery to your Shopify store"
    >
      <div className="pj-wrap">
        <section
          className="pj-row pj-row--discovery"
          aria-labelledby="pj-discovery-copy"
        >
          <Discovery />
          <div className="pj-copy">
            <Heading
              id="pj-discovery-copy"
              first="You’ve made"
              second="something good."
            />
            <p className="pj-lead">Let’s make sure the right people find it.</p>
            <p>
              Google Ads that put your products in front of people looking for
              them. Built around your catalogue, your margins and what makes
              your brand worth choosing.
            </p>
            <DetailList
              items={[
                "Product feeds that do your range justice",
                "Shopping and Search, working together",
                "A focus on profit, beyond the click",
              ]}
            />
          </div>
        </section>
        <section
          className="pj-row pj-row--conversion"
          aria-labelledby="pj-conversion-copy"
        >
          <div className="pj-copy">
            <Heading
              id="pj-conversion-copy"
              first="The click is"
              second="just the start."
            />
            <p className="pj-lead">A better ad deserves a better landing.</p>
            <p>
              We look at the whole journey. From the product they first notice
              to the page they land on—and the little things that make buying
              feel effortless.
            </p>
            <DetailList
              items={[
                "A clear connection from ad to store",
                "Product pages that answer the right questions",
                "Less friction on the way to checkout",
              ]}
            />
          </div>
          <Storefront />
        </section>
        <p className="pj-asset-note">
          Photography and products: At Present. Shopping and store scenes are
          illustrative, not campaign results.
        </p>
        <section
          className="pj-people"
          aria-label="The people behind Happy Mondays"
        >
          <div className="pj-people-photo">
            <img
              src="/images/refinement/keanu-960.webp"
              srcSet="/images/refinement/keanu-480.webp 480w, /images/refinement/keanu-960.webp 960w, /images/refinement/keanu-1600.webp 1600w"
              sizes="(max-width:760px) 80vw, 450px"
              alt="Keanu Fischell, founder of Happy Mondays"
              width="960"
              height="960"
              loading="lazy"
            />
            <div className="pj-person-credit">
              <strong>Keanu Fischell</strong>
              <span>Founder, Happy Mondays</span>
            </div>
          </div>
          <div className="pj-people-copy">
            <Heading first="Good people." second="On your side." />
            <p>
              Led by Keanu, with four years inside Google. A senior team that
              gets to know your business, looks beyond the ad account and cares
              about what happens next.
            </p>
            <MockLink
              className="ha-button"
              message="Design preview — the booking calendar will be connected before launch."
            >
              Book a call
            </MockLink>
            <span className="pj-call-note">
              Let’s talk about your next chapter.
            </span>
          </div>
        </section>
        <footer className="pj-footer">
          <span>Better Mondays start here.</span>
          <a href="#ha-top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
