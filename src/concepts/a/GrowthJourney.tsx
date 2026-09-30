import { useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
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
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </svg>
  );
}
function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}
function Bag() {
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
const IMG = "/images/commerce-scenes/";
const sceneDuration = 6200;

/** A single finite clock coordinates the work, response and outcome. Scroll gives
 * the light and foreground separate depth; it never traps or advances the page. */
function useComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.32 });
  const reduced = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [scrollFloor, setScrollFloor] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!reduced) setScrollFloor(sceneDuration * segment(value, 0.36, 0.46));
  });
  const scene = useSceneTimeline(
    visible,
    loaded,
    reduced,
    sceneDuration,
    60,
    scrollFloor,
  );
  const depth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.3,
  });
  const lightY = useTransform(depth, [0, 1], [-28, 28]);
  const planeY = useTransform(depth, [0, 1], [20, -20]);
  return {
    ref,
    reduced,
    visible,
    scene,
    lightY,
    planeY,
    onReady: () => setLoaded(true),
  };
}
function SceneControls({
  scene,
  reduced,
  label,
}: {
  scene: ReturnType<typeof useSceneTimeline>;
  reduced: boolean;
  label: string;
}) {
  return (
    <div className="cj-scene-controls">
      <span>{label}</span>
      {!reduced && (
        <button
          type="button"
          onClick={scene.time >= sceneDuration ? scene.replay : scene.toggle}
          aria-label={`${scene.time >= sceneDuration ? "Replay" : scene.paused ? "Play" : "Pause"} ${label.toLowerCase()}`}
        >
          {scene.time >= sceneDuration
            ? "Replay"
            : scene.paused
              ? "Play"
              : "Pause"}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            {scene.time >= sceneDuration ? (
              <>
                <path d="M3 5a5 5 0 1 1-.3 5" />
                <path d="M3 1v4h4" />
              </>
            ) : scene.paused ? (
              <path d="m5 3 7 5-7 5Z" />
            ) : (
              <>
                <path d="M5 3v10M11 3v10" />
              </>
            )}
          </svg>
        </button>
      )}
    </div>
  );
}
function WorkSignature({ complete }: { complete: boolean }) {
  return (
    <div className="cj-work-signature">
      <img src="/images/logo-hm.webp" alt="" />
      <span>
        {complete ? (
          <>
            Feed + campaigns aligned <Check />
          </>
        ) : (
          "Working on your growth"
        )}
      </span>
    </div>
  );
}
function Discovery() {
  const { ref, reduced, scene, lightY, planeY, onReady } = useComposition();
  const t = scene.time;
  const enter = settle(segment(t, 0, 1100));
  const work = settle(segment(t, 1000, 900));
  const reorder = settle(segment(t, 3500, 1250));
  const emphasis = settle(segment(t, 4500, 1100));
  const collapse = settle(segment(t, 4100, 1200));
  const items = [
    {
      image: "pointe",
      name: "Bullseye Crew Grip Sock",
      brand: "Pointe Studio",
      price: "$20.00",
      from: 0,
      to: 1,
    },
    {
      image: "move",
      name: "Crew Grip Socks",
      brand: "MoveActive",
      price: "A$22.95",
      from: 1,
      to: 2,
    },
    {
      image: "juliet",
      name: "The Juliet Grip Sock",
      brand: "Lucky Honey",
      price: "$18.00",
      from: 2,
      to: 0,
    },
  ];
  return (
    <div
      className="cj-art"
      ref={ref}
      data-scene="discovery"
      data-scene-time={Math.round(t)}
    >
      <div className="cj-stage cj-stage--sage">
        <div className="cj-light-mask">
          <motion.img
            className="cj-light"
            src={`${IMG}light-field.webp`}
            alt=""
            width="1254"
            height="1254"
            loading="lazy"
            style={reduced ? undefined : { y: lightY }}
          />
        </div>
        <motion.div
          className="cj-google-plane"
          style={reduced ? undefined : { y: planeY }}
        >
          <div
            className="cj-google"
            role="img"
            aria-label="Illustrative Google Shopping scene. Lucky Honey appears alongside other brands. Happy Mondays improves the product feed and campaigns, then Lucky Honey moves into focus. Placements are illustrative."
            style={{
              opacity: enter,
              transform: `translateY(${26 * (1 - enter)}px) scale(${0.98 + 0.02 * enter})`,
            }}
          >
            <div aria-hidden="true">
              <div className="cj-google-search">
                <GoogleMark />
                <span>pilates grip socks</span>
                <SearchIcon />
              </div>
              <div className="cj-google-tabs">
                <span>All</span>
                <span className="is-selected">Shopping</span>
                <span>Images</span>
                <span>Videos</span>
              </div>
              <div className="cj-google-label">Sponsored products</div>
              <div className="cj-results">
                {items.map((item) => (
                  <div
                    key={item.image}
                    className={`cj-result ${item.image === "juliet" ? "cj-result--brand" : ""}`}
                    style={
                      {
                        left: `${(item.from + (item.to - item.from) * reorder) * 34}%`,
                        "--mobile-position":
                          item.image === "juliet" ? 1 - reorder : reorder,
                        opacity:
                          item.image === "juliet" ? 1 : 1 - 0.25 * emphasis,
                        transform: `translateY(${item.image === "juliet" ? -5 * emphasis - 20 * Math.sin(Math.PI * reorder) : 0}px)`,
                        zIndex: item.image === "juliet" ? 2 : 1,
                        boxShadow:
                          item.image === "juliet"
                            ? `0 12px 22px -10px rgba(35, 45, 32, ${0.24 * Math.sin(Math.PI * reorder)})`
                            : undefined,
                      } as CSSProperties
                    }
                  >
                    <div className="cj-result-image">
                      <img
                        src={`${IMG}${item.image}.webp`}
                        alt=""
                        width="1000"
                        height="1250"
                        loading="lazy"
                        onLoad={item.image === "juliet" ? onReady : undefined}
                        onError={item.image === "juliet" ? onReady : undefined}
                      />
                    </div>
                    <span className="cj-result-name">{item.name}</span>
                    <span className="cj-result-price">{item.price}</span>
                    <span className="cj-result-brand">{item.brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <div
          className="cj-work cj-glass"
          aria-hidden="true"
          style={{
            opacity: settle(segment(t, 1000, 360)),
            transform: `translateY(${30 * (1 - work)}px)`,
          }}
        >
          <WorkSignature complete={t > 4600} />
          <div
            className="cj-work-body"
            style={{
              maxHeight: `${32 * (1 - collapse)}cqw`,
              opacity: 1 - collapse,
            }}
          >
            <div className="cj-work-line">
              <span>Product feed</span>
              <span className="cj-work-status">
                {t > 2300 ? (
                  <>
                    <Check /> Refined
                  </>
                ) : (
                  "Refining…"
                )}
              </span>
            </div>
            <div className="cj-feed-title">
              The Juliet Grip Sock
              <span>Ribbed grip socks for Pilates & barre</span>
            </div>
            <div className="cj-work-line cj-work-line--last">
              <span>Shopping campaigns</span>
              <span className="cj-work-status">
                {t > 3300 ? (
                  <>
                    <Check /> Aligned
                  </>
                ) : (
                  "Aligning…"
                )}
              </span>
            </div>
            <div className="cj-work-track">
              <span
                style={{
                  transform: `scaleX(${settle(segment(t, 1500, 1900))})`,
                }}
              />
            </div>
          </div>
        </div>
        <span className="cj-scene-footnote">Illustrative placements</span>
      </div>
      <SceneControls
        scene={scene}
        reduced={reduced}
        label="From search to discovery"
      />
    </div>
  );
}
function Storefront() {
  const { ref, reduced, scene, lightY, planeY, onReady } = useComposition();
  const t = scene.time;
  const enter = settle(segment(t, 0, 1000));
  const detail = settle(segment(t, 1100, 900));
  const bundle = settle(segment(t, 2500, 800));
  const order = settle(segment(t, 4400, 1000));
  const total = 18 + Math.round(18 * settle(segment(t, 3400, 900)));
  return (
    <div
      className="cj-art"
      ref={ref}
      data-scene="purchase"
      data-scene-time={Math.round(t)}
    >
      <div className="cj-stage cj-stage--sand">
        <div className="cj-light-mask">
          <motion.img
            className="cj-light"
            src={`${IMG}light-field.webp`}
            alt=""
            width="1254"
            height="1254"
            loading="lazy"
            style={reduced ? undefined : { y: lightY }}
          />
        </div>
        <motion.div
          className="cj-store-plane"
          style={reduced ? undefined : { y: planeY }}
        >
          <div
            className="cj-store"
            role="img"
            aria-label="Illustrative Lucky Honey product page. Clear product details, a complementary colour and an easier buying journey lead to an example two-item order of 36 dollars. This is not an actual order or campaign result."
            style={{
              opacity: enter,
              transform: `translateY(${26 * (1 - enter)}px)`,
            }}
          >
            <div aria-hidden="true">
              <div className="cj-store-nav">
                <SearchIcon />
                <img src="/images/refinement/logo-luckyhoney.webp" alt="" />
                <Bag />
              </div>
              <div className="cj-store-body">
                <div className="cj-product-photo">
                  <img
                    src={`${IMG}juliet.webp`}
                    alt=""
                    width="1000"
                    height="1295"
                    loading="lazy"
                    onLoad={onReady}
                    onError={onReady}
                  />
                </div>
                <div className="cj-product-detail">
                  <span className="cj-store-crumb">Grip socks / Juliet</span>
                  <h3>
                    The Juliet
                    <br />
                    Grip Sock
                  </h3>
                  <span className="cj-price">$18.00</span>
                  <div className="cj-colours">
                    <i />
                    <i />
                    <i />
                    <span>Mahogany</span>
                  </div>
                  <p
                    className="cj-product-description"
                    style={{
                      opacity: detail,
                      transform: `translateY(${10 * (1 - detail)}px)`,
                    }}
                  >
                    Soft ribbed texture.
                    <br />
                    Signature honeycomb grip.
                    <br />
                    Made for your next class.
                  </p>
                  <div
                    className="cj-pair"
                    style={{
                      opacity: bundle,
                      transform: `translateY(${14 * (1 - bundle)}px)`,
                    }}
                  >
                    <img
                      src="/images/refinement/product-juliet.webp"
                      alt=""
                      width="1000"
                      height="1294"
                    />
                    <div>
                      <b>A second colour?</b>
                      <span>Juliet · Baby Blue</span>
                      <span>$18.00</span>
                    </div>
                    <span className="cj-pair-check">
                      <Check />
                    </span>
                  </div>
                  <div className="cj-store-add">
                    {t > 4400 ? (
                      <>
                        <Check /> Added to bag
                      </>
                    ) : (
                      "Add to bag"
                    )}
                    <span>${total}.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div
          className="cj-order cj-glass"
          aria-hidden="true"
          style={{
            opacity: order,
            transform: `translateY(${32 * (1 - order)}px) scale(${0.97 + 0.03 * order})`,
          }}
        >
          <div className="cj-order-icon">
            <img src="/images/icon-shopify.png" alt="" />
          </div>
          <div>
            <span className="cj-order-title">A little more in the bag.</span>
            <span className="cj-order-meta">2 items · $36.00</span>
          </div>
          <span className="cj-order-tick">
            <Check />
          </span>
        </div>
        <span className="cj-scene-footnote">Illustrative shopping journey</span>
      </div>
      <SceneControls
        scene={scene}
        reduced={reduced}
        label="From interest to purchase"
      />
    </div>
  );
}
function Copy({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id: string;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className="cj-copy"
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: EASE.entrance }}
    >
      <h2 id={id}>{title}</h2>
      {children}
    </motion.div>
  );
}
export function GrowthJourney() {
  const reduced = usePrefersReducedMotion();
  return (
    <section
      className="cj-story"
      id="the-approach"
      data-motion={reduced ? "reduce" : "full"}
      aria-label="From product discovery to your Shopify store"
    >
      <div className="cj-wrap">
        <section className="cj-row" aria-labelledby="cj-discovery-heading">
          <Discovery />
          <Copy
            id="cj-discovery-heading"
            title={"Good products.\nIn the right places."}
          >
            <p>Your next customer is already looking. We help them find you.</p>
            <p>
              Thoughtful product feeds and margin-aware Google Ads put your
              range in front of the people most likely to buy.
            </p>
          </Copy>
        </section>
        <section
          className="cj-row cj-row--reverse"
          aria-labelledby="cj-purchase-heading"
        >
          <Copy id="cj-purchase-heading" title={"Make more of\nevery visit."}>
            <p>A click is only the beginning.</p>
            <p>
              We look beyond the ad account. Clearer product pages, relevant
              recommendations and a simpler path to checkout help turn interest
              into sales.
            </p>
          </Copy>
          <Storefront />
        </section>
        <p className="cj-illustration-note">
          Real products. Illustrative journeys, not campaign results.
        </p>
        <section className="cj-people" aria-labelledby="cj-people-heading">
          <div className="cj-person">
            <img
              src="/images/refinement/keanu-960.webp"
              srcSet="/images/refinement/keanu-480.webp 480w, /images/refinement/keanu-960.webp 960w"
              sizes="(max-width: 760px) 90vw, 380px"
              alt="Keanu Fischell, founder of Happy Mondays"
              loading="lazy"
              width="960"
              height="960"
            />
            <div>
              <strong>Keanu Fischell</strong>
              <span>Founder, Happy Mondays</span>
            </div>
          </div>
          <Copy id="cj-people-heading" title={"Good people.\nOn your side."}>
            <p>Four years inside Google. Now, on your side of the table.</p>
            <p>
              Keanu and the team get to know your products, your customers and
              where you want to go. Senior expertise, with a personal stake in
              getting it right.
            </p>
            <MockLink
              className="ha-button"
              message="Design preview — the booking calendar will be connected before launch."
            >
              Book a call
            </MockLink>
          </Copy>
        </section>
        <footer className="cj-footer">
          <span>Better Mondays start here.</span>
          <a href="#ha-top">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
