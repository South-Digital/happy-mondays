import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE, usePrefersReducedMotion } from "../../lib/motion";
import { useToast } from "../../components/Toast";
import { segment, settle, useSceneTimeline } from "./useSceneTimeline";
import "./growth-journey.css";
import { PeopleClosing } from "./PeopleClosing";

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
const IMG = "/images/morrow/";
const FRAGRANCE = "/images/serein/";
const sceneDuration = 5800;

/** One coordinated entrance; scroll subsequently moves the optical planes at
 * different depths. The photographed product and its supporting stone stay together. */
function useComposition(plate: string, base = IMG) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.12 });
  const storyReady = useInView(ref, { amount: 0.42, once: true });
  const nearby = useInView(ref, { margin: "400px 0px 400px 0px", once: true });
  const reduced = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!nearby || loaded) return;
    let cancelled = false;
    // Decode the entire composition before its entrance, including the individual catalogue cutouts.
    const names =
      base === FRAGRANCE
        ? [plate, "collection", "product-0", "product-1"]
        : [
            plate,
            "grip-sock",
            "product-0",
            "product-1",
            "product-2",
            "product-3",
          ];
    const assets = names.map((name) => {
      const image = new Image();
      image.src = `${base}${name}.webp`;
      return image.decode().catch(() => undefined);
    });
    Promise.all(assets).then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [nearby, loaded, plate, base]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scene = useSceneTimeline(
    visible,
    loaded,
    reduced,
    sceneDuration,
    60,
    scrollYProgress,
    storyReady,
  );
  const depth = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 30,
    mass: 0.35,
  });
  const backY = useTransform(depth, [0, 1], [8, -8]);
  const frontY = useTransform(depth, [0, 1], [18, -18]);
  return { ref, reduced, scene, backY, frontY, loaded };
}
/** Original concept products; all platform lettering and surfaces are live HTML. */
function Product({
  variant = 0,
  className = "",
  base = IMG,
}: {
  base?: string;
  variant?: number;
  className?: string;
}) {
  return (
    <img
      className={`cj-product ${className}`}
      src={`${base}product-${variant}.webp`}
      alt=""
      width="660"
      height="900"
      loading="lazy"
    />
  );
}
function ScenePhoto({ name, base = IMG }: { name: string; base?: string }) {
  return (
    <img
      className="cj-photo"
      src={`${base}${name}.webp`}
      alt=""
      width="1254"
      height="1254"
      loading="lazy"
    />
  );
}
function Discovery() {
  const { ref, reduced, scene, backY, frontY, loaded } =
    useComposition("courtyard");
  const t = scene.time;
  const enter = settle(segment(t, 60, 950));
  const focus = settle(segment(t, 1400, 1200));
  const position = settle(segment(t, 1200, 1400));
  const detail = settle(segment(t, 2600, 1300));
  return (
    <div
      className="cj-art"
      ref={ref}
      data-scene="discovery"
      data-scene-phase={
        t < 1200
          ? "arriving"
          : t < 1800
            ? "sorting"
            : t < 2600
              ? "focusing"
              : t < 3900
                ? "revealing"
                : "settled"
      }
      data-scene-time={Math.round(t)}
      data-scene-rate={scene.rate.toFixed(2)}
    >
      <div
        className="cj-stage cj-stage--discovery"
        role="img"
        aria-label="A concept Pilates brand comes into view in Google Shopping, with tactile cream and burgundy knitwear layered in front of a sunlit olive courtyard."
      >
        <div
          className="cj-camera"
          style={{
            opacity: loaded ? 1 : 0,
            transform: `scale(${1.035 - 0.035 * settle(segment(t, 0, 4400))})`,
          }}
        >
          <ScenePhoto name="courtyard" />
          <motion.div
            className="cj-search-depth"
            style={{ y: reduced ? 0 : backY }}
            aria-hidden="true"
          >
            <div
              className="cj-search cj-glass"
              style={{
                opacity: enter,
                transform: `translateY(${3 * (1 - enter)}cqw) scale(${0.975 + 0.025 * enter})`,
              }}
            >
              <div className="cj-search-header">
                <GoogleMark />
                <div className="cj-search-field">
                  <span>pilates grip socks</span>
                  <span className="cj-search-clear">×</span>
                  <svg viewBox="0 0 18 24" aria-hidden="true">
                    <rect
                      x="6"
                      y="1"
                      width="6"
                      height="13"
                      rx="3"
                      fill="#4285f4"
                    />
                    <path
                      d="M3 10v2a6 6 0 0 0 12 0v-2"
                      fill="none"
                      stroke="#ea4335"
                      strokeWidth="2.5"
                    />
                    <path d="M9 18v5" stroke="#34a853" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
              <div className="cj-search-tabs">
                <span>All</span>
                <b>Shopping</b>
                <span>Images</span>
                <span>Videos</span>
                <span>More</span>
              </div>
              <div className="cj-search-results">
                <div
                  className="cj-results-track"
                  style={{ "--advance": position } as CSSProperties}
                >
                  {[2, 3, 0, 1, 2, 3, 0, 1].map((variant, index) => {
                    const [brand, name, price] = [
                      ["Morrow Studio", "Everyday Grip Sock", "$28.00"],
                      ["Form Studio", "Soft Rib Grip Sock", "$28.00"],
                      ["Sunday Movement", "Studio Grip Sock", "$26.00"],
                      ["Aster Studio", "Classic Grip Sock", "$24.00"],
                    ][variant];
                    return (
                      <div
                        className={`cj-search-result ${variant === 0 ? "is-featured" : ""}`}
                        data-variant={variant}
                        key={index}
                        style={{
                          opacity: variant === 0 ? 1 : 1 - 0.24 * focus,
                        }}
                      >
                        <div className="cj-search-product">
                          <Product variant={variant} />
                        </div>
                        <div className="cj-search-caption">
                          <b>{brand}</b>
                          <span>{name}</span>
                          <strong>{price}</strong>
                          {variant === 0 && (
                            <span className="cj-stars">
                              ★★★★★ <small>(127)</small>
                            </span>
                          )}
                        </div>
                        {variant === 0 && (
                          <span
                            className="cj-feature-outline"
                            style={{ opacity: focus }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
          <div className="cj-contact-shadow" aria-hidden="true" />
          <img
            className="cj-physical-product"
            src={`${IMG}grip-sock.webp`}
            alt=""
            width="1254"
            height="1254"
            loading="lazy"
            aria-hidden="true"
          />
          <motion.div
            className="cj-detail-depth"
            style={{ y: reduced ? 0 : frontY }}
            aria-hidden="true"
          >
            <div
              className="cj-detail cj-glass"
              style={{
                opacity: detail,
                transform: `translateY(${3.5 * (1 - detail)}cqw) scale(${0.96 + 0.04 * detail})`,
              }}
            >
              <div className="cj-detail-brand">
                <span className="cj-monogram">m.</span>
                <div>
                  <b>Morrow Studio</b>
                  <span>morrow.studio</span>
                </div>
                <span className="cj-more">⋮</span>
              </div>
              <div className="cj-detail-body">
                <div className="cj-detail-product">
                  <Product />
                </div>
                <div className="cj-detail-copy">
                  <b>Everyday Grip Sock</b>
                  <strong>$28.00</strong>
                  <span className="cj-stars">★★★★★</span>
                  <p>
                    A little support.
                    <br />
                    For every move.
                  </p>
                  <span className="cj-detail-colour">Oat / Burgundy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
function Storefront() {
  const { ref, reduced, scene, backY, frontY, loaded } = useComposition(
    "atelier",
    FRAGRANCE,
  );
  const t = scene.time;
  const enter = settle(segment(t, 60, 950));
  const recommendation = settle(segment(t, 1350, 1150));
  const added = settle(segment(t, 2950, 950));
  const confirmation = settle(segment(t, 4050, 1150));
  const total = added > 0.5 ? "110.00" : "68.00";
  return (
    <div
      className="cj-art"
      ref={ref}
      data-scene="purchase"
      data-scene-phase={
        t < 1350
          ? "arriving"
          : t < 2950
            ? "recommending"
            : t < 4050
              ? "adding"
              : t < 5200
                ? "confirming"
                : "settled"
      }
      data-scene-time={Math.round(t)}
      data-scene-rate={scene.rate.toFixed(2)}
    >
      <div
        className="cj-stage cj-stage--purchase cj-stage--fragrance"
        role="img"
        aria-label="Serein's concept Shopify store, with amber-glass Fig & Cedar candle photography, a complementary reed diffuser, and a $110 order confirmation. An illustrative shopping journey."
      >
        <div
          className="cj-camera"
          style={{
            opacity: loaded ? 1 : 0,
            transform: `scale(${1.035 - 0.035 * settle(segment(t, 0, 4400))})`,
          }}
        >
          <ScenePhoto name="atelier" base={FRAGRANCE} />
          <motion.div
            className="cj-store-depth"
            style={{ y: reduced ? 0 : backY }}
            aria-hidden="true"
          >
            <div
              className="cj-store cj-glass"
              style={{
                opacity: enter,
                transform: `translateY(${3 * (1 - enter)}cqw) scale(${0.975 + 0.025 * enter})`,
              }}
            >
              <div className="cj-store-nav">
                <span className="cj-store-wordmark">SEREIN</span>
                <span>Objects for slower living.</span>
                <Bag />
              </div>
              <div className="cj-store-body">
                <div className="cj-store-photo">
                  <Product base={FRAGRANCE} />
                  <span>01 / 03</span>
                </div>
                <div className="cj-store-copy">
                  <h3>Fig &amp; Cedar</h3>
                  <strong>$68.00</strong>
                  <p>
                    A quieter kind of luxury.
                    <br />
                    Fig leaf. Cedar. A little stillness.
                  </p>
                  <div className="cj-fragrance-notes">
                    <span>Fig leaf</span>
                    <span>Cedarwood</span>
                  </div>
                  <span className="cj-store-size">Scented candle · 280 g</span>
                  <div className="cj-add-to-bag">
                    {added > 0.95 ? "Added to bag" : "Add to bag"}
                    {added > 0.95 ? <Check /> : <span>+</span>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="cj-contact-shadow" aria-hidden="true" />
          <img
            className="cj-physical-product"
            src={`${FRAGRANCE}collection.webp`}
            alt=""
            width="1254"
            height="1254"
            loading="lazy"
            aria-hidden="true"
          />
          <motion.div
            className="cj-cart-depth"
            style={{ y: reduced ? 0 : frontY }}
            aria-hidden="true"
          >
            <div
              className="cj-cart cj-glass"
              style={{
                opacity: recommendation,
                transform: `translateY(${3 * (1 - recommendation)}cqw) scale(${0.97 + 0.03 * recommendation})`,
              }}
            >
              <div className="cj-cart-heading">
                <b>Your bag</b>
                <span>{added > 0.5 ? "2 items" : "1 item"}</span>
              </div>
              <div className="cj-cart-line">
                <div className="cj-cart-product">
                  <Product base={FRAGRANCE} />
                </div>
                <div>
                  <b>Fig & Cedar candle</b>
                  <span>Amber glass · 280 g</span>
                </div>
                <strong>$68.00</strong>
              </div>
              <div
                className="cj-cart-line cj-cart-line--extra"
                style={{ opacity: 0.45 + 0.55 * added }}
              >
                <div className="cj-cart-product">
                  <Product variant={1} base={FRAGRANCE} />
                </div>
                <div>
                  <b>Layer the fragrance.</b>
                  <span>Fig & Cedar diffuser · $42</span>
                </div>
                <span
                  className={`cj-recommend-check ${added > 0.5 ? "is-added" : ""}`}
                >
                  {added > 0.5 ? <Check /> : "+"}
                </span>
              </div>
              <div className="cj-cart-total">
                <span>Subtotal</span>
                <strong>${total}</strong>
              </div>
              <div className="cj-cart-status">
                <span style={{ opacity: 1 - confirmation }}>
                  A little stillness, delivered.
                </span>
                <span
                  className="cj-cart-success"
                  style={{ opacity: confirmation }}
                >
                  <img src="/images/icon-shopify.png" alt="" />
                  Order received
                  <Check />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
/** Future sitemap destinations are visible to reviewers; keep this concept in place on click. */
function JourneyLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  const { show } = useToast();
  const destinations: Record<string, string> = {
    "/google-ads-for-shopify-brands": "Google Ads for Shopify brands",
    "/revenue-leak-audit": "Revenue Leak Audit",
    "/pricing": "Pricing",
  };
  return (
    <a
      href={href}
      className={secondary ? "cj-text-link" : "cj-service-link"}
      onClick={(event) => {
        event.preventDefault();
        show(
          `${destinations[href]} — this page is part of the full site build.`,
        );
      }}
    >
      {children}
    </a>
  );
}

/** Small physical objects sit inside live type; no bitmap lettering. */
function EditorialIcon({ kind }: { kind: "cart" | "card" }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(progress, [0, 1], [4, -4]);
  const rotate = useTransform(progress, [0, 1], [-2, 2]);
  return (
    <motion.span
      ref={ref}
      className={`cj-editorial-icon cj-editorial-icon--${kind}`}
      style={reduced ? undefined : { y, rotate }}
      aria-hidden="true"
    >
      <motion.img
        src={`/images/editorial/${kind}.webp`}
        width="600"
        height={kind === "cart" ? 494 : 353}
        alt=""
        loading="lazy"
        initial={reduced ? false : { opacity: 0, y: 10, rotate: -5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, delay: 0.18, ease: EASE.entrance }}
      />
    </motion.span>
  );
}

function Copy({
  kind,
  children,
  id,
}: {
  kind: "discovery" | "purchase";
  children: React.ReactNode;
  id: string;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={`cj-copy cj-copy--${kind}`}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE.entrance }}
    >
      {kind === "discovery" ? (
        <h2 id={id} aria-label="Your products. Their next find.">
          <span className="cj-heading-soft cj-icon-line">
            <span>Your </span>
            <EditorialIcon kind="cart" />
            <span>products.</span>
          </span>
          <span className="cj-heading-emphasis">Their next find.</span>
        </h2>
      ) : (
        <h2 id={id} aria-label="From looking to buying.">
          <span className="cj-heading-soft">From looking. </span>
          <span className="cj-heading-emphasis cj-icon-line">
            <span>To </span>
            <EditorialIcon kind="card" />
            <span>buying.</span>
          </span>
        </h2>
      )}
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
          <Copy id="cj-discovery-heading" kind="discovery">
            <p>
              Put your products in front of people already looking. Google Ads
              built around your range, your margins and your next customer.
            </p>
            <div className="cj-copy-actions">
              <JourneyLink href="/google-ads-for-shopify-brands">
                Explore Google Ads
              </JourneyLink>
              <JourneyLink href="/pricing" secondary>
                See pricing
              </JourneyLink>
            </div>
          </Copy>
        </section>
        <section
          className="cj-row cj-row--reverse"
          aria-labelledby="cj-purchase-heading"
        >
          <Copy id="cj-purchase-heading" kind="purchase">
            <p>
              A clearer product page. A better basket. An easier checkout. We find
              what stands between interest and an order.
            </p>
            <div className="cj-copy-actions">
              <JourneyLink href="/revenue-leak-audit">
                Explore the Revenue Leak Audit
              </JourneyLink>
            </div>
          </Copy>
          <Storefront />
        </section>
        <PeopleClosing />
        <footer className="cj-footer">
          <div className="cj-footer-brand">
            <img
              src="/images/logo-hm.webp"
              alt="Happy Mondays"
              width="170"
              height="44"
            />
            <span>Better Mondays start here.</span>
          </div>
          <a href="#ha-top">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
