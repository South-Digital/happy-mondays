import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useInView,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { EASE, usePrefersReducedMotion } from "../../lib/motion";
import { useToast } from "../../components/Toast";
import { segment, settle, useSceneTimeline } from "./useSceneTimeline";
import { useSceneReadiness } from "./useSceneReadiness";
import courtyardPreview from "./assets/courtyard-preview.webp";
import atelierPreview from "./assets/atelier-preview.webp";
import "./growth-journey.css";
import { PeopleClosing } from "./PeopleClosing";
import { sceneImage } from "./sceneImages";
import { ClientStory } from "./AgencyStory";

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
const sereinEditorial = {
  src: `${FRAGRANCE}fig-cedar-editorial-v1-960.webp`,
  srcSet: `${FRAGRANCE}fig-cedar-editorial-v1-480.webp 480w, ${FRAGRANCE}fig-cedar-editorial-v1-960.webp 960w`,
  sizes: "(max-width: 980px) 36vw, 19vw",
  width: 960,
  height: 1200,
};
const sceneDuration = 4200;

/** One coordinated entrance; scroll subsequently moves the optical planes at
 * different depths. The photographed product and its supporting stone stay together. */
function useComposition(plate: string, base = IMG) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.12 });
  const storyReady = useSceneReadiness(ref);
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
            "product-4",
          ];
    const assets = names.map((name) => {
      const image = new Image();
      const source = sceneImage(base, name);
      image.sizes = source.sizes;
      image.srcset = source.srcSet;
      image.src = source.src;
      return image.decode().catch(() => undefined);
    });
    if (base === FRAGRANCE) {
      const editorial = new Image();
      editorial.sizes = sereinEditorial.sizes;
      editorial.srcset = sereinEditorial.srcSet;
      editorial.src = sereinEditorial.src;
      assets.push(editorial.decode().catch(() => undefined));
    }
    // A slow decorative asset must not hold the readable interface indefinitely.
    const deadline = window.setTimeout(() => { if (!cancelled) setLoaded(true); }, 1600);
    Promise.all(assets).then(() => {
      window.clearTimeout(deadline);
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(deadline);
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
  const depth = scrollYProgress;
  const backY = useTransform(depth, [0, 1], [8, -8]);
  const frontY = useTransform(depth, [0, 1], [18, -18]);
  return { ref, reduced, scene, backY, frontY, loaded, scrollYProgress };
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
      {...sceneImage(base, `product-${variant}`)}
      alt=""
      loading="lazy"
    />
  );
}
function ScenePhoto({ name, base = IMG }: { name: string; base?: string }) {
  const [ready, setReady] = useState(false);
  return (
    <img
      className="cj-photo"
      data-ready={ready}
      onLoad={event => { event.currentTarget.decode().catch(() => {}).then(() => setReady(true)); }}
      onError={() => setReady(false)}
      {...sceneImage(base, name)}
      alt=""
      loading="lazy"
    />
  );
}
function Discovery() {
  const { ref, reduced, scene, backY, frontY, loaded, scrollYProgress } =
    useComposition("courtyard");
  const [scrollTime, setScrollTime] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", value => setScrollTime(segment(value, .2, .35) * 4400));
  const t = Math.max(scene.time * 5800 / sceneDuration, scrollTime);
  const enter = settle(segment(t, 60, 950));
  // Establish the original catalogue, refine its data, then show discovery.
  // The movement follows the intervention rather than implying a random rank jump.
  const detail = settle(segment(t, 700, 800));
  const refine = settle(segment(t, 1650, 800));
  const attributes = settle(segment(t, 2050, 650));
  const ready = settle(segment(t, 2650, 450));
  const position = settle(segment(t, 2850, 1300));
  const focus = settle(segment(t, 3100, 1050));
  return (
    <div
      className="cj-art"
      ref={ref}
      data-scene="discovery"
      data-scene-phase={
        t < 1650
          ? "catalogue"
          : t < 2850
            ? "refining"
            : t < 4150
              ? "matching"
              : "settled"
      }
      data-scene-time={Math.round(t)}
      data-scene-rate={scene.rate.toFixed(2)}
    >
      <div
        className="cj-stage cj-stage--discovery"
        style={{ backgroundImage: `url(${courtyardPreview})` }}
        role="img"
        aria-label="An illustrative product-feed journey: Happy Mondays adds clearer Pilates product titles, material and colour details, then the concept Morrow Studio product comes into focus in Google Shopping. No ranking guarantee or client result is depicted."
      >
        <div className="cj-backdrop" style={{ transform: `scale(${1.035 - 0.035 * settle(segment(t, 0, 4400))})` }}>
          <ScenePhoto name="courtyard" />
        </div>
        <div
          className="cj-camera"
          style={{
            opacity: loaded ? 1 : 0,
            transform: `scale(${1.035 - 0.035 * settle(segment(t, 0, 4400))})`,
          }}
        >
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
                  {[2, 3, 1, 4, 0, 2, 3, 1, 4].map((variant, index) => {
                    const [brand, name, price] = [
                      ["Morrow Studio", "Everyday Grip Sock", "$28.00"],
                      ["Form Studio", "Soft Rib Grip Sock", "$28.00"],
                      ["Sunday Movement", "Studio Grip Sock", "$26.00"],
                      ["Aster Studio", "Classic Grip Sock", "$24.00"],
                      ["Tempo Studio", "Checker Grip Sock", "$27.00"],
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
                        <span className="cj-result-position">{Math.max(1, index + 1 - Math.round(position * 4))}</span>
                        <div className="cj-search-product">
                          <Product variant={variant} />
                        </div>
                        <div className="cj-search-caption">
                          <b>{brand}</b>
                          <span>{variant === 0 && t >= 2650 ? "Pilates Grip Socks" : name}</span>
                          <strong>{price}</strong>

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
            {...sceneImage(IMG, "grip-sock")}
            alt=""
            loading="lazy"
            aria-hidden="true"
          />
          <motion.div
            className="cj-detail-depth"
            style={{ y: reduced ? 0 : frontY }}
            aria-hidden="true"
          >
            <div
              className="cj-detail cj-feed cj-glass"
              style={{
                opacity: detail,
                transform: `translateY(${3.5 * (1 - detail)}cqw) scale(${0.96 + 0.04 * detail})`,
              }}
            >
              <div className="cj-detail-brand">
                <span className="cj-monogram">m.</span>
                <div>
                  <b>Morrow Studio</b>
                  <span>Product feed</span>
                </div>
                <span className="cj-more">⋮</span>
              </div>
              <div className="cj-detail-body">
                <div className="cj-detail-product">
                  <Product />
                </div>
                <div className="cj-detail-copy">
                  <div className="cj-feed-title">
                    <b style={{ opacity: 1 - segment(refine, 0, .42), transform: `translateY(${-6 * refine}px)` }}>Everyday Grip Sock</b>
                    <b style={{ opacity: segment(refine, .58, .42), transform: `translateY(${6 * (1 - refine)}px)` }}>Pilates Grip Socks</b>
                  </div>
                  <strong>$28.00</strong>
                  <div className="cj-feed-attributes" style={{ opacity: attributes, transform: `translateY(${5 * (1 - attributes)}px)` }}>
                    <span><small>Material</small>Cotton</span>
                    <span><small>Colour</small>Oat / Burgundy</span>
                  </div>
                </div>
              </div>
              <div className="cj-feed-status" data-ready={t >= 2850}>
                <span className="cj-feed-status-mark" style={{ "--ready": ready } as CSSProperties}><Check /></span>
                <span>{t < 2850 ? "Refining product details" : "Feed refined"}</span><span className="cj-position-note">Position {Math.max(1, 5 - Math.round(position * 4))}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <p className="cj-scene-caption">Illustration · Position 5 to 1 · Morrow is a concept brand</p>
    </div>
  );
}
function Storefront() {
  const { ref, reduced, scene, backY, frontY, loaded } = useComposition(
    "atelier",
    FRAGRANCE,
  );
  const t = scene.time * 5800 / sceneDuration;
  const enter = settle(segment(t, 60, 950));
  const recommendation = settle(segment(t, 1350, 1150));
  const added = settle(segment(t, 2950, 950));
  const confirmation = settle(segment(t, 4050, 1150));
  const total = (68 + 42 * added).toFixed(2);
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
        style={{ backgroundImage: `url(${atelierPreview})` }}
        role="img"
        aria-label="Serein's concept Shopify store, with amber-glass Fig & Cedar candle photography, a complementary reed diffuser, and a $110 order confirmation. An illustrative shopping journey."
      >
        <div className="cj-backdrop" style={{ transform: `scale(${1.035 - 0.035 * settle(segment(t, 0, 4400))})` }}>
          <ScenePhoto name="atelier" base={FRAGRANCE} />
        </div>
        <div
          className="cj-camera"
          style={{
            opacity: loaded ? 1 : 0,
            transform: `scale(${1.035 - 0.035 * settle(segment(t, 0, 4400))})`,
          }}
        >
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
                <span className="cj-store-collection">Home fragrance</span>
                <span className="cj-store-wordmark">SEREIN</span>
                <span className="cj-store-bag"><Bag /><span>{added > 0.5 ? "02" : recommendation > 0 ? "01" : "00"}</span></span>
              </div>
              <div className="cj-store-body">
                <div className="cj-store-photo">
                  <img {...sereinEditorial} alt="" loading="lazy" />
                  <div className="cj-store-image-caption"><span>The everyday ritual</span><span>01 — 03</span></div>
                </div>
                <div className="cj-store-copy">
                  <span className="cj-store-eyebrow">The signature candle</span>
                  <h3>Fig <em>&amp;</em><br />Cedar</h3>
                  <p>Green fig. Warm cedar.<br />A little stillness.</p>
                  <div className="cj-store-purchase">
                    <div className="cj-store-price"><span>Amber glass · 280 g</span><strong>$68</strong></div>
                    <div className="cj-add-to-bag">
                      {recommendation > 0 ? "Added to bag" : "Add to bag"}
                      {recommendation > 0 ? <Check /> : <span>↗</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="cj-contact-shadow" aria-hidden="true" />
          <img
            className="cj-physical-product"
            {...sceneImage(FRAGRANCE, "collection")}
            alt=""
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
      <p className="cj-scene-caption">Concept store · An illustrative shopping journey</p>
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
      initial={reduced ? false : { y: 6 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE.entrance }}
    >
      {kind === "discovery" ? (
        <h2 id={id} aria-label="Your products. Their next find.">
          <span className="cj-heading-soft cj-icon-line">
            <span>Your </span>
            <span>products.</span>
          </span>
          <span className="cj-heading-emphasis">Their next find.</span>
        </h2>
      ) : (
        <h2 id={id} aria-label="From looking to buying.">
          <span className="cj-heading-soft">From looking. </span>
          <span className="cj-heading-emphasis cj-icon-line">
            <span>To </span>
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
      tabIndex={-1}
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
        <ClientStory portraitSrc="/images/client-stories/gary-ingram.webp" />
        <PeopleClosing>
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
        </PeopleClosing>
      </div>
    </section>
  );
}
