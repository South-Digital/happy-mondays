import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../../components/Brand";
import { MockLink, useToast } from "../../components/Toast";
import { usePrefersReducedMotion } from "../../lib/motion";

import { ClientLogos } from "./ClientLogos";
import { StorePreview, OrderPreview } from "./StorePreview";
import { segment, settle } from "./useSceneTimeline";
import { useHeroEntrance } from "./useHeroEntrance";
import { useHeroDepth } from "./useHeroDepth";
import { StoryLink } from "./AgencyStory";
import terracePreview from "./assets/terrace-natural-preview.webp";
import "./hero-a-study.css";
import "./shopify-preview.css";

const links = [
  { label: "Client stories", href: "#client-stories" },
  { label: "Our approach", href: "#the-approach" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/articles" },
];

export function StudyNav() {
  const menu = useRef<HTMLDetailsElement>(null);
  const { show } = useToast();
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(event.target as Node)) {
        menu.current.open = false;
      }
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches && menu.current) menu.current.open = false;
    };
    document.addEventListener("pointerdown", dismiss);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);
  return (
    <header className="ha-nav">
      <a href="#ha-top" aria-label="Happy Mondays — home">
        <Wordmark size="lg" />
      </a>
      <nav aria-label="Main navigation" className="ha-nav-desktop">
        {links.map(link => link.href.startsWith("#")
          ? <a key={link.label} href={link.href}>{link.label}</a>
          : <StoryLink key={link.label} href={link.href} className="">{link.label}</StoryLink>)}
        <MockLink className="ha-button ha-nav-cta" message="Design preview — the booking calendar will be connected before launch.">Book a call</MockLink>
      </nav>
      <details
        className="ha-mobile-menu"
        ref={menu}
        onToggle={(event) => {
          if (event.currentTarget.open) {
            event.currentTarget.querySelector("nav")?.scrollTo({ top: 0, behavior: "instant" });
          }
        }}
        onBlur={(event) => {
          // A disclosure should release keyboard focus naturally, then close
          // before the next page control is obscured by its panel.
          if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
            event.currentTarget.open = false;
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && menu.current) {
            menu.current.open = false;
            menu.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary>
          Menu <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="Mobile navigation" data-lenis-prevent>
          {[...links, { label: "Book a call", href: "/book-a-call" }].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={event => {
                if (menu.current) {
                  menu.current.open = false;
                  menu.current.querySelector("summary")?.focus();
                }
                if (link.href.startsWith("#")) return;
                event.preventDefault();
                show(link.label === "Book a call"
                  ? "Design preview — the booking calendar will be connected before launch."
                  : "Design preview — this page is not connected yet.");
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </details>
    </header>
  );
}

export function ContinuingNav() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(() => window.scrollY > 660);
  const reduced = usePrefersReducedMotion();
  // Separate thresholds prevent a trackpad hovering at the boundary from
  // repeatedly mounting and dismissing the navigation.
  useMotionValueEvent(scrollY, "change", value => setVisible(current => value > (current ? 540 : 660)));
  return <AnimatePresence>{visible && <motion.nav key="continuing-nav" className="ha-continuing-nav" aria-label="Quick navigation"
    initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8, pointerEvents: "none" }}
    transition={{ duration: reduced ? 0 : .25, ease: [0.22, 1, 0.36, 1] }}>
    <a href="#ha-top" aria-label="Happy Mondays — back to top"><Wordmark size="lg" /></a>
    <a className="ha-continuing-story" href="#client-stories">Client stories</a>
    <MockLink className="ha-button" message="Design preview — the booking calendar will be connected before launch.">Book a call</MockLink>
  </motion.nav>}</AnimatePresence>;
}

function Coast({ foreground = false, ready, reduced, onReady }: { foreground?: boolean; ready: boolean; reduced: boolean; onReady: () => void }) {
  const [failed, setFailed] = useState(false);
  return (
    <picture
      className={foreground ? "ha-coast ha-coast-foreground" : "ha-coast"}
      style={{ backgroundImage: `url(${terracePreview})` }}
    >
      <source
        type="image/avif"
        srcSet="/images/hero-a-terrace-natural/coast-800.avif 800w, /images/hero-a-terrace-natural/coast-1440.avif 1440w, /images/hero-a-terrace-natural/coast-1586.avif 1586w"
        sizes="(max-width:700px) 1180px, (max-width:1440px) 1440px, 100vw"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: ready && !failed ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        src="/images/hero-a-terrace-natural/coast-1440.webp"
        srcSet="/images/hero-a-terrace-natural/coast-800.webp 800w, /images/hero-a-terrace-natural/coast-1440.webp 1440w, /images/hero-a-terrace-natural/coast-1586.webp 1586w"
        sizes="(max-width:700px) 1180px, (max-width:1440px) 1440px, 100vw"
        width={1586}
        height={992}
        alt=""
        decoding="async"
        onLoad={event => { setFailed(false); event.currentTarget.decode().catch(() => {}).then(onReady); }}
        onError={() => { setFailed(true); onReady(); }}
        {...{ fetchpriority: foreground ? "auto" : "high" }}
      />
    </picture>
  );
}

export function HeroAStudy() {
  const reduced = usePrefersReducedMotion();
  const scene = useRef<HTMLDivElement>(null);
  const depth = useHeroDepth(scene);
  const dashboard = useRef<HTMLDivElement>(null);

  const [coastReady, setCoastReady] = useState(false);
  const [wallReady, setWallReady] = useState(false);
  const [decodeDeadline, setDecodeDeadline] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setDecodeDeadline(true), 700);
    return () => clearTimeout(timer);
  }, []);
  const sceneReady = (coastReady && wallReady) || decodeDeadline;
  const time = useHeroEntrance(reduced);
  const reveal = (start: number, duration: number) => settle(segment(time, start, duration));
  const lineStyle = (start: number) => {
    const value = reveal(start, 1000);
    return { opacity: value, transform: `translateY(${18 * (1 - value)}px)`, filter: `blur(${12 * (1 - value)}px)` };
  };

  const credentials = useRef<HTMLDivElement>(null);
  const { scrollYProgress: proofProgress } = useScroll({
    target: credentials,
    offset: ["start 100%", "start 90%"],
  });
  const proofY = useTransform(proofProgress, [0, 1], [12, 0]);
  const proofOpacity = useTransform(proofProgress, [0, 1], [0.55, 1]);
  return (
    <section
      id="ha-top"
      tabIndex={-1}
      className="ha-study"
      data-motion={reduced ? "reduce" : "full"}
      data-hero-time={Math.round(time)}
      data-hero-rate="1"
      aria-labelledby="ha-title"
    >
      <div className="ha-scene" ref={scene}>
        <motion.div
          className="ha-scenery"
          aria-hidden="true"
          style={reduced ? undefined : { y: depth.seaY }}
        >
          <Coast ready={sceneReady} reduced={reduced} onReady={() => setCoastReady(true)} />
        </motion.div>
        <div className="ha-sky-wash" aria-hidden="true" />
        <div className="ha-ambient-light" aria-hidden="true" />
        <div className="ha-nav-space" aria-hidden="true" />
        <div className="ha-intro">
          <h1 id="ha-title" tabIndex={-1}>
            <span style={lineStyle(100)}>Open Shopify.</span>{" "}<span style={lineStyle(290)}>Smile.</span>
          </h1>
          <p style={{ opacity: reveal(650, 650), transform: `translateY(${6 * (1 - reveal(650, 650))}px)` }}>
            <span>Google Ads for Shopify brands.</span>
            <span>Better ads. A better store. One flat monthly fee.</span>
          </p>
        </div>
        <div className="ha-hero-cta" style={{ opacity: reveal(850, 650) }}>
          <StoryLink href="/book-a-call?type=audit" className="ha-button">Start with an audit</StoryLink>
        </div>
        <div className="ha-arrival-mist" aria-hidden="true" style={{ opacity: 1 - reveal(0, 2200) }} />
        <motion.div
          className="ha-object"
          ref={dashboard}
        >
          <motion.div
            className="ha-dashboard-depth"
            style={
              reduced
                ? undefined
                : { y: depth.dashboardY, scale: depth.dashboardScale }
            }
          >
            <StorePreview time={Math.max(0, time - 650)} />
          </motion.div>
        </motion.div>
        <motion.div
          className="ha-foreground"
          aria-hidden="true"
          style={reduced ? undefined : { y: depth.foregroundY }}
        >
          <Coast foreground ready={sceneReady} reduced={reduced} onReady={() => setWallReady(true)} />
        </motion.div>
        <div className="ha-scene-fade" aria-hidden="true" />
        <motion.div
          className="ha-order-position"

        >
          <motion.div
            className="ha-order-depth"
            style={
              reduced ? undefined : { y: depth.orderY, scale: depth.orderScale }
            }
          >
            <OrderPreview reveal={settle(segment(time, 3500, 700))} />
          </motion.div>
        </motion.div>
      </div>
      <div className="ha-credentials" ref={credentials}>
        <motion.div
          className="ha-proof-reveal"
          style={reduced ? undefined : { y: proofY, opacity: proofOpacity }}
        >
          <div className="ha-verified-proof"><span><img src="/images/icon-clutch.svg" width="16" height="18" alt="" />5.0 on Clutch</span><span aria-hidden="true">·</span><span>Led by an ex-Google founder</span></div>
          <ClientLogos />
        </motion.div>
      </div>
    </section>
  );
}
