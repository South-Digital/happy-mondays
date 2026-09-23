import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Wordmark } from "../../components/Brand";
import { Seo } from "../../components/Seo";
import { useToast } from "../../components/Toast";
import { riseAt, usePrefersReducedMotion } from "../../lib/motion";
import { ProofRow } from "../shared/ProofRow";
import { LogoStrip } from "../shared/LogoStrip";
import "./nature-b.css";

const ease = [0.22, 1, 0.36, 1] as const;
const links = ["Reviews", "Case Studies", "Pricing", "Blog", "Contact"];
function Book({
  small = false,
  onActivate,
}: {
  small?: boolean;
  onActivate?: () => void;
}) {
  const { show } = useToast();
  return (
    <button
      className={`nb-button${small ? " nb-button-small" : ""}`}
      onClick={() => {
        onActivate?.();
        show(
          "Design preview — the booking calendar will be connected before launch.",
        );
      }}
    >
      Book a call
    </button>
  );
}
function Navigation() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  const { show } = useToast();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menu.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const destination = () => {
    setOpen(false);
    menu.current?.focus();
    show("Design preview — this page is not connected yet.");
  };
  return (
    <header className="nb-nav">
      <a href="#top" aria-label="Happy Mondays home">
        <Wordmark size="lg" />
      </a>
      <nav className="nb-desktop-links" aria-label="Main navigation">
        {links.map((link) => (
          <button key={link} onClick={destination}>
            {link}
          </button>
        ))}
        <Book small />
      </nav>
      <button
        ref={menu}
        className="nb-menu-toggle"
        aria-expanded={open}
        aria-controls="nb-menu"
        onClick={() => setOpen(!open)}
      >
        Menu <span aria-hidden>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <nav id="nb-menu" className="nb-menu" aria-label="Mobile navigation">
          {links.map((link) => (
            <button key={link} onClick={destination}>
              {link}
            </button>
          ))}
          <Book
            small
            onActivate={() => {
              setOpen(false);
              menu.current?.focus();
            }}
          />
        </nav>
      )}
    </header>
  );
}
function Scene() {
  return (
    <picture className="nb-photo">
      <source
        media="(max-width:767px)"
        type="image/avif"
        srcSet="/images/hero-b-v2/terrace-mobile-800.avif 800w, /images/hero-b-v2/terrace-mobile-1200.avif 1200w, /images/hero-b-v2/terrace-mobile-1600.avif 1600w"
        sizes="(max-width:600px) 700px, (max-width:767px) 800px, (max-width:1050px) 2000px, (max-width:1920px) 2100px, 100vw"
      />
      <source
        media="(max-width:767px)"
        srcSet="/images/hero-b-v2/terrace-mobile-800.webp 800w, /images/hero-b-v2/terrace-mobile-1200.webp 1200w, /images/hero-b-v2/terrace-mobile-1600.webp 1600w"
        sizes="(max-width:600px) 700px, (max-width:767px) 800px, (max-width:1050px) 2000px, (max-width:1920px) 2100px, 100vw"
      />
      <source
        type="image/avif"
        srcSet="/images/hero-b-v2/terrace-1440.avif 1440w, /images/hero-b-v2/terrace-2400.avif 2400w, /images/hero-b-v2/terrace-3840.avif 3840w"
        sizes="(max-width:600px) 700px, (max-width:767px) 800px, (max-width:1050px) 2000px, (max-width:1920px) 2100px, 100vw"
      />
      <img
        src="/images/hero-b-v2/terrace-1440.webp"
        srcSet="/images/hero-b-v2/terrace-1440.webp 1440w, /images/hero-b-v2/terrace-2400.webp 2400w, /images/hero-b-v2/terrace-3840.webp 3840w"
        sizes="(max-width:600px) 700px, (max-width:767px) 800px, (max-width:1050px) 2000px, (max-width:1920px) 2100px, 100vw"
        width="6688"
        height="3760"
        alt=""
        {...{ fetchpriority: "high" }}
      />
    </picture>
  );
}
function Hero() {
  const reduced = usePrefersReducedMotion();
  const scene = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 64]);
  return (
    <section className="nb-hero" ref={scene} aria-labelledby="nb-title">
      <motion.div
        className="nb-scenery"
        style={reduced ? undefined : { y }}
        aria-hidden
      >
        <Scene />
      </motion.div>
      <div className="nb-photo-shade" aria-hidden />
      <Navigation />
      <div className="nb-hero-copy nb-container">
        <h1 id="nb-title">
          <motion.span {...riseAt(0, reduced)}>Open Shopify.</motion.span>
          <motion.span {...riseAt(1, reduced)}>Smile.</motion.span>
        </h1>
        <motion.p {...riseAt(2, reduced)}>
          Google Ads for Shopify brands.
          <br />
          Senior expertise. A flat monthly fee.
        </motion.p>
        <motion.div {...riseAt(3, reduced)}>
          <Book />
        </motion.div>
        <div className="nb-hero-proof">
          {[
            ["/images/icon-clutch.svg", "5.0 on Clutch"],
            ["/images/icon-shopify.png", "Shopify Partner"],
            ["/images/icon-google-ads.svg", "Google Ads Partner"],
          ].map(([src, label], i) => (
            <motion.span
              key={label}
              className="nb-proof-chip"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: reduced ? 0 : 0.35 + i * 0.08,
                ease,
              }}
            >
              <img src={src} alt="" width="18" height="20" />
              <span>{label}</span>
            </motion.span>
          ))}
        </div>
      </div>
      <a className="nb-discover" href="#approach">
        Explore the approach<span aria-hidden>↓</span>
      </a>
      <div className="nb-hero-fade" aria-hidden />
    </section>
  );
}
function Analytics() {
  return (
    <div
      className="nb-analytics"
      role="img"
      aria-label="Illustrative Shopify analytics, not a client result. Total sales 128,460 dollars, 1,842 orders, conversion rate 3.4 percent."
    >
      <div className="nb-store-bar">
        <span>
          <img src="/images/icon-shopify.png" alt="" width="18" height="22" />
          Your store
        </span>
        <span>Overview</span>
      </div>
      <div className="nb-store-body">
        <div className="nb-store-title">
          <h3>Analytics</h3>
          <span>Last 7 days</span>
        </div>
        <div className="nb-metrics">
          <div>
            <span>Total sales</span>
            <strong>$128,460</strong>
            <small>↗ 24.8%</small>
          </div>
          <div>
            <span>Orders</span>
            <strong>1,842</strong>
            <small>↗ 18.6%</small>
          </div>
          <div>
            <span>Conversion rate</span>
            <strong>3.4%</strong>
            <small>↗ 0.6pt</small>
          </div>
        </div>
        <div className="nb-chart">
          <p>Total sales over time</p>
          <div>
            <span>
              $24K
              <br />
              <br />
              <br />
              $12K
            </span>
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="nb-fill" x2="0" y2="1">
                  <stop stopColor="#739bdc" stopOpacity=".22" />
                  <stop offset="1" stopColor="#739bdc" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 15H500M0 78H500M0 140H500"
                fill="none"
                stroke="#dce2e9"
                strokeDasharray="2 5"
              />
              <path
                d="M0 132C35 130 39 114 70 118S111 93 146 99S188 70 218 80S270 53 307 60S350 34 380 42S432 10 458 18S480 12 500 6V150H0Z"
                fill="url(#nb-fill)"
              />
              <path
                d="M0 132C35 130 39 114 70 118S111 93 146 99S188 70 218 80S270 53 307 60S350 34 380 42S432 10 458 18S480 12 500 6"
                fill="none"
                stroke="#5d87cf"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <footer>
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
const stages = [
  {
    label: "01 · The opportunity",
    title: "Great products. Waiting to be found.",
    text: "Understand what’s holding your store back—from how shoppers find you to what happens after the click.",
    status: "Before Happy Mondays",
  },
  {
    label: "02 · The work",
    title: "Better ads. A better path to purchase.",
    text: "Product feeds, margin-aware campaigns and a Shopify experience that makes buying easier.",
    status: "Campaigns + product feeds + conversion",
  },
  {
    label: "03 · The possibility",
    title: "More visibility. More room to grow.",
    text: "Reach the right shoppers, remove friction and turn more of that interest into sales.",
    status: "Campaigns + feeds + conversion",
  },
];
const otherProducts: Record<string, string> = {
  a: "Studio grip socks",
  b: "Ribbed crew socks",
  c: "Everyday grip socks",
  d: "Classic ankle socks",
};
function Shopping({ phase }: { phase: number }) {
  const reduced = usePrefersReducedMotion();
  const order =
    phase === 2 ? ["honey", "a", "b", "c", "d"] : ["a", "b", "c", "d", "honey"];
  return (
    <div className="nb-shopping">
      <div className="nb-search">
        <span className="nb-google" aria-hidden>
          G
        </span>
        <span>pilates grip socks</span>
        <svg viewBox="0 0 20 20" width="17" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="m12 12 5 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="nb-search-tabs">
        <span>All</span>
        <strong>Shopping</strong>
        <span>Images</span>
        <span>Videos</span>
      </div>
      <div
        className="nb-results"
        role="img"
        aria-label={`Illustrative Shopping placement: Lucky Honey in position ${phase === 2 ? "one after campaign and store improvements" : "five before improvements"}. This is a concept, not an actual result or ranking guarantee.`}
      >
        {order.map((id, index) => (
          <motion.div
            key={id}
            layout={!reduced ? "position" : false}
            transition={{ duration: 0.85, ease }}
            className={`nb-result ${id === "honey" ? "nb-result-featured" : ""}`}
          >
            <span className="nb-rank">{index + 1}</span>
            {id === "honey" ? (
              <>
                <img
                  className="nb-product"
                  src="/images/refinement/product-juliet.webp"
                  alt=""
                  width="52"
                  height="48"
                />
                <div>
                  <strong>Juliet Grip Sock</strong>
                  <span>Lucky Honey</span>
                </div>
                <span className="nb-your-brand">Your brand</span>
              </>
            ) : (
              <>
                <span
                  className={`nb-other-product nb-other-product-${id}`}
                  aria-hidden
                >
                  <svg viewBox="0 0 40 40" fill="none">
                    <path
                      d="M15 5h12v16l7 5c3 3-1 9-5 8L10 24c-3-2-3-5-1-7l6-4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15 9h12M15 12h12"
                      stroke="#fff"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <div>
                  <strong>{otherProducts[id]}</strong>
                  <span>Another store</span>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
function GrowthStory() {
  const reduced = usePrefersReducedMotion();
  const intervention = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const seen = useInView(intervention, { amount: 0.95 });
  // Each step gets reading time while the intervention is visible. Leaving the
  // viewport cancels the pending step; returning resumes from the current one.
  useEffect(() => {
    if (!seen || reduced || phase === 2) return;
    const next = window.setTimeout(
      () => setPhase((value) => Math.min(value + 1, 2)),
      phase === 0 ? 1800 : 3200,
    );
    return () => window.clearTimeout(next);
  }, [seen, reduced, phase]);
  const current = reduced ? 2 : phase;
  return (
    <section
      id="approach"
      className="nb-story nb-container"
      aria-labelledby="nb-approach-title"
    >
      <div className="nb-story-content">
        <div className="nb-section-intro">
          <div>
            <p className="nb-eyebrow">A clearer path to growth</p>
            <h2 id="nb-approach-title">
              From the first search.
              <br />
              <span>To the next sale.</span>
            </h2>
          </div>
          <a href="#people" className="nb-person-note">
            <img
              src="/images/refinement/keanu-480.webp"
              alt="Keanu Fischell"
              width="48"
              height="48"
            />
            <span>
              Senior people.
              <br />
              <strong>Personally invested.</strong>
            </span>
          </a>
        </div>
        <div className="nb-demo-grid">
          <div className="nb-dashboard-scene">
            <div className="nb-scene-soft" aria-hidden />
            <Analytics />
            <div className="nb-store-caption">
              <span className="nb-caption-dot" />
              Google Ads + your Shopify store.
              <br />
              <strong>One joined-up approach.</strong>
            </div>
          </div>
          <div className="nb-shopping-scene">
            <Shopping phase={current} />
            <div
              ref={intervention}
              className={`nb-intervention nb-intervention-${current}`}
            >
              <span className="nb-work-mark" aria-hidden>
                ✳
              </span>
              <div>
                <strong>
                  {current === 0
                    ? "Before Happy Mondays"
                    : current === 1
                      ? "Working with Happy Mondays"
                      : "With Happy Mondays"}
                </strong>
                <span>
                  {current === 0
                    ? "A great product. Further down the page."
                    : stages[current].status}
                </span>
              </div>
              <span className="nb-position">
                {current === 2
                  ? "5 → 1"
                  : current === 1
                    ? "In motion"
                    : "Position 5"}
              </span>
            </div>
          </div>
        </div>
        <div className="nb-example-controls">
          <p>An illustrative journey. Placements and results vary.</p>
          {!reduced && (
            <button className="nb-replay" onClick={() => setPhase(0)}>
              Replay example
            </button>
          )}
        </div>
        <ol className="nb-story-steps" aria-label="How the approach works">
          {stages.map((stage, index) => (
            <li key={stage.label} className={index === current ? "is-current" : ""}>
              <span className="nb-eyebrow">{stage.label}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </li>
          ))}
        </ol>
        {reduced && (
          <p className="nb-reduced-story">
            Position 5 → campaign, feed and store improvements → position 1. An
            example of the opportunity, not a ranking promise.
          </p>
        )}
      </div>
    </section>
  );
}
function People() {
  return (
    <section
      id="people"
      className="nb-people nb-container"
      aria-labelledby="nb-people-title"
    >
      <div className="nb-founder-photo">
        <img
          src="/images/refinement/keanu-960.webp"
          srcSet="/images/refinement/keanu-480.webp 480w, /images/refinement/keanu-960.webp 960w, /images/refinement/keanu-1600.webp 1600w"
          sizes="(max-width:700px) 90vw, 38vw"
          width="1600"
          height="1066"
          loading="lazy"
          alt="Keanu Fischell, founder of Happy Mondays"
        />
        <div>
          <strong>Keanu Fischell</strong>
          <span>Founder, Happy Mondays</span>
        </div>
      </div>
      <div className="nb-people-copy">
        <p className="nb-eyebrow">Good people. On your side.</p>
        <h2 id="nb-people-title">
          Your next chapter.
          <br />
          <span>With the right people.</span>
        </h2>
        <p>
          Led by Keanu Fischell, with four years’ experience inside Google. A
          senior team that gets to know your brand and looks beyond the ad
          account.
        </p>
        <p>Let’s talk about where you are—and where you’d like to go.</p>
        <Book />
      </div>
    </section>
  );
}
export default function ConceptB() {
  const reduced = usePrefersReducedMotion();
  return (
    <>
      <Seo title="Concept B — Nature first · Happy Mondays" />
      <main
        className="nb-page"
        id="top"
        data-motion={reduced ? "reduce" : "full"}
      >
        <Hero />
        <GrowthStory />
        <section
          className="nb-client-proof nb-container"
          aria-label="Our clients and partners"
        >
          <p className="nb-eyebrow">In good company</p>
          <LogoStrip staticMobile />
          <ProofRow clutchIcon />
        </section>
        <People />
        <footer className="nb-footer nb-container">
          <Wordmark />
          <span>Better Mondays start here.</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
    </>
  );
}
