import { useId, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { EASE, sectionReveal, usePrefersReducedMotion } from "../../lib/motion";
import { SCENE_DURATION, segment, settle, useSceneTimeline } from "./useSceneTimeline";
import { SignatureGraphics } from "./SignatureGraphics";
import { MockLink } from "../../components/Toast";
import "./growth-journey.css";

function SearchIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>;
}
function GoogleMark() {
  return <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z" /><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.41l-3.24-2.51c-.89.6-2.03.96-3.37.96-2.61 0-4.83-1.76-5.62-4.12H3.04v2.59A10 10 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.38 13.92a6 6 0 0 1 0-3.84V7.49H3.04a10 10 0 0 0 0 9.02l3.34-2.59Z" /><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.49l3.34 2.59C7.17 7.72 9.39 5.96 12 5.96Z" /></svg>;
}
function Plus({ open = false }: { open?: boolean }) {
  return <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M4 10h12" />{!open && <path d="M10 4v12" />}</svg>;
}
function Bag() {
  return <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
}
function ProductPhoto({ name, alt, onReady }: { name: "jewellery" | "ritual"; alt: string; onReady: () => void }) {
  // The beauty image reserves resolution for its detail view before interaction.
  const sizes = name === "ritual" ? "(max-width: 760px) 150vw, (max-width: 1100px) 75vw, 980px" : "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 50vw, 660px";
  const sources = (extension: string) => [640, 1122, 1600, 2240].map(width => `/images/product-studies/${name}-${width}.${extension} ${width}w`).join(", ");
  return <picture><source type="image/avif" srcSet={sources("avif")} sizes={sizes} /><img src={`/images/product-studies/${name}-1122.webp`} srcSet={sources("webp")} sizes={sizes} width="2244" height="2804" alt={alt} loading="lazy" decoding="async" onLoad={event => { event.currentTarget.decode().catch(() => {}).then(onReady); }} onError={onReady} /></picture>;
}

/** A native-scroll composition: photograph and glass have independent, bounded travel. */
function ProductScene({ type }: { type: "discovery" | "conversion" }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const ready = useInView(ref, { once: true, amount: 0.25 });
  const visible = useInView(ref, { amount: 0.2 });
  const activityRef = useRef<HTMLDivElement>(null);
  const activitySeen = useInView(activityRef, { once: true, amount: 0.5 });
  const [loaded, setLoaded] = useState(false);
  const scene = useSceneTimeline(visible, loaded && activitySeen, reduced);
  const time = scene.time;
  const graphId = useId().replace(/:/g, "");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 38, mass: 0.3 });
  const photoY = useTransform(progress, [0, 1], [18, -18]);
  const cardY = useTransform(progress, [0, 1], [-10, 10]);
  const [detail, setDetail] = useState(false);
  const discovery = type === "discovery";
  const name = discovery ? "jewellery" : "ritual";
  const entrance = { opacity: 1, y: 0 };
  return <div className={`ps-visual ps-visual--${type}`} ref={ref} data-detail={detail} data-scene-time={Math.round(time)} data-scene-paused={scene.paused}>
    <div className="ps-image-frame">
      <motion.div className="ps-photograph" style={reduced ? undefined : { y: photoY }}>
        <motion.div className="ps-photo-zoom" initial={false} animate={{ scale: detail ? 1.55 : 1 }} transition={{ duration: reduced ? 0 : 0.9, ease: EASE.entrance }}>
          <ProductPhoto onReady={() => setLoaded(true)} name={name} alt={discovery ? "Sculptural gold hoop earrings resting on softly folded ivory fabric" : "Amber glass face-oil bottle in warm natural light on pale limestone"} />
        </motion.div>
      </motion.div>
      <div className="ps-image-shade" aria-hidden="true" />
      <div className="ps-scene-light" aria-hidden="true" style={{ opacity: .35 * Math.sin(segment(time, 300, 8000) * Math.PI), transform: `translateX(${segment(time, 300, 8000) * 20 - 10}%)` }} />
      {discovery ? <motion.div className="ps-search ps-glass" initial={reduced ? false : { opacity: 0, y: 14 }} animate={ready || reduced ? entrance : undefined} transition={{ duration: reduced ? 0 : 0.85, delay: 0.15, ease: EASE.entrance }}>
        <GoogleMark /><span aria-label="sculptural gold earrings"><span aria-hidden="true">{"sculptural gold earrings".slice(0, Math.round(segment(time, 450, 1350) * "sculptural gold earrings".length))}</span></span><SearchIcon />
      </motion.div> : <span className="ps-store-wordmark" aria-hidden="true">RITUAL</span>}
      <div className="ps-scene-signal ps-glass" aria-hidden="true" style={{ opacity: settle(segment(time, discovery ? 2200 : 6250, 700)) * (1 - settle(segment(time, discovery ? 5000 : 7700, 600))), transform: `translateY(${12 * (1 - settle(segment(time, discovery ? 2200 : 6250, 700)))}px)` }}>
        <span className="ps-signal-check">✓</span><span>{discovery ? "Product feed ready" : "New order received"}<small>{discovery ? "The everyday hoops · Shopping" : "The daily ritual · $48.00"}</small></span>
      </div>
      {!discovery && <div className="ps-gallery" role="group" aria-label="Product photograph view">
        <button type="button" aria-pressed={!detail} onClick={() => setDetail(false)}>Product</button>
        <button type="button" aria-pressed={detail} onClick={() => setDetail(true)}>Detail <Plus /></button>
      </div>}
    </div>
    <motion.div className="ps-floating" ref={activityRef} style={reduced ? undefined : { y: cardY }}>
      <motion.div className="ps-product-card ps-glass" initial={reduced ? false : { opacity: 0, y: 24 }} animate={ready || reduced ? entrance : undefined} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.35, ease: EASE.entrance }}>
        <div className="ps-activity-heading"><span className="ps-product-icon" aria-hidden="true">{discovery ? <SearchIcon /> : <Bag />}</span><div><p className="ps-card-eyebrow">{discovery ? "Google Shopping" : "Your Shopify store"}</p><p className="ps-card-title">{discovery ? "The everyday hoops" : "The daily ritual"}</p></div><span className="ps-example-label">Illustrative</span></div>
        <div className="ps-activity-body" role="img" aria-label={discovery ? "Illustrative product activity: 2,480 product views and 186 store visits. Not client results." : "Illustrative store activity: $1,888 in sales and 39 orders. Not client results."}>
          <div className="ps-metric" aria-hidden="true"><span>{discovery ? "Product views" : "Total sales"}</span><strong>{discovery ? Math.round(2480 * settle(segment(time, 2700, 4600))).toLocaleString("en-US") : "$" + Math.round(1840 * settle(segment(time, 1600, 4400)) + 48 * settle(segment(time, 6600, 1100))).toLocaleString("en-US")}</strong><small>{discovery ? Math.round(186 * settle(segment(time, 3200, 4300))) + " store visits" : Math.round(38 * settle(segment(time, 1600, 4400)) + settle(segment(time, 6600, 1100))) + " orders"}</small></div>
          <svg className="ps-activity-chart" viewBox="0 0 240 90" aria-hidden="true">
            <defs><linearGradient id={`${graphId}-fill`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".2" /><stop offset="100%" stopColor="currentColor" stopOpacity="0" /></linearGradient><clipPath id={`${graphId}-clip`}><rect width={240 * settle(segment(time, discovery ? 2700 : 1600, discovery ? 4600 : 6100))} height="90" /></clipPath></defs>
            <path d="M0 25H240M0 55H240M0 85H240" stroke="currentColor" strokeOpacity=".12" strokeDasharray="2 5" fill="none" />
            <g clipPath={`url(#${graphId}-clip)`}><path d="M0 78C16 78 18 68 34 70S55 73 70 59S91 64 106 47S126 52 142 35S165 43 184 23S204 28 220 14S231 13 240 5V90H0Z" fill={`url(#${graphId}-fill)`} /><path d="M0 78C16 78 18 68 34 70S55 73 70 59S91 64 106 47S126 52 142 35S165 43 184 23S204 28 220 14S231 13 240 5" fill="none" stroke="currentColor" strokeWidth="2" /></g>
          </svg>
        </div>
        <div className="ps-scene-footer"><span><i style={{ opacity: time > 2000 ? 1 : .4 }} />{discovery ? time < 2200 ? "Connecting your products" : time < 7500 ? "Reaching more shoppers" : "From discovery to your store" : time < 6200 ? "From browsing to buying" : "One more happy customer"}</span>{!reduced && <button type="button" onClick={time >= SCENE_DURATION ? scene.replay : scene.toggle} aria-label={`${time >= SCENE_DURATION ? "Replay" : scene.paused ? "Resume" : "Pause"} ${discovery ? "product discovery" : "store sales"} animation`}>{time >= SCENE_DURATION ? "Replay ↻" : scene.paused ? "Play ▷" : "Pause Ⅱ"}</button>}</div>
      </motion.div>
    </motion.div>
  </div>;
}

const serviceDetails = {
  discovery: [
    ["Product feeds", "The titles, imagery and product details that help the right searches find you."],
    ["Campaign structure", "Shopping and Search built around your catalogue, margins and goals."],
    ["Ongoing refinement", "A senior team reading the signals and improving what happens next."],
  ],
  conversion: [
    ["The landing experience", "A clear connection between the ad they clicked and the page they arrive on."],
    ["Product-page clarity", "The information, reassurance and details shoppers need to choose."],
    ["The path to purchase", "Finding friction across your Shopify store, from browsing to checkout."],
  ],
};
function ServiceDetail({ type }: { type: keyof typeof serviceDetails }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduced = usePrefersReducedMotion();
  return <div className="ps-service-details">
    <button className="ps-disclosure" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      <span>What we look at</span><span className="ps-disclosure-icon"><Plus open={open} /></span>
    </button>
    <motion.div id={id} aria-hidden={!open} className="ps-disclosure-content" initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.4, ease: EASE.entrance }}>
      <dl className="ps-detail-list">
        {serviceDetails[type].map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}
      </dl>
    </motion.div>
  </div>;
}

export function GrowthJourney() {
  const reduced = usePrefersReducedMotion();
  return <section className="ps-story" id="the-approach" aria-label="Google Ads and your Shopify store" data-motion={reduced ? "reduce" : "full"}>
    <div className="ps-container">
      <div className="ps-row ps-row--discovery">
        <ProductScene type="discovery" />
        <motion.div className="ps-copy" {...sectionReveal(reduced)}>
          <p className="ps-eyebrow"><span>01</span> Google Ads & product feeds</p>
          <h2><span>Great products.</span><br />Worth discovering.</h2>
          <p className="ps-description">You’ve put care into every detail. We help the right people find it—with considered campaigns and product feeds that do your products justice.</p>
          <ServiceDetail type="discovery" />
          <div className="ps-person"><img src="/images/refinement/keanu-480.webp" alt="Keanu Fischell" width="44" height="44" loading="lazy" /><div><strong>Senior people. Personally invested.</strong><span>Keanu Fischell · Founder, Happy Mondays</span></div></div>
        </motion.div>
      </div>
      <div className="ps-row ps-row--conversion">
        <ProductScene type="conversion" />
        <motion.div className="ps-copy" {...sectionReveal(reduced)}>
          <p className="ps-eyebrow"><span>02</span> Your Shopify experience</p>
          <h2><span>A better journey.</span><br />From click<br className="ps-desktop-break" /> to customer.</h2>
          <p className="ps-description">The click is only the beginning. We look beyond the ad account to make your store easier to explore, your products easier to choose, and the next step easier to take.</p>
          <ServiceDetail type="conversion" />
        </motion.div>
      </div>
      <SignatureGraphics />
      <div className="ps-close">
        <div><p className="ps-eyebrow">Good people. On your side.</p><h2>Your next chapter.<br /><span>Let’s make it a good one.</span></h2></div>
        <MockLink className="ha-button" message="Design preview — the booking calendar will be connected before launch.">Book a call</MockLink>
      </div>
      <p className="ps-concept-note">Product imagery and store examples are concepts for illustration.</p>
    </div>
  </section>;
}
