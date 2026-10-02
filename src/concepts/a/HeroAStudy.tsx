import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../../components/Brand";
import { MockLink } from "../../components/Toast";
import { usePrefersReducedMotion } from "../../lib/motion";

import { MobileNavigation } from "./MobileNavigation";
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
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  // Keep one persistent navigation tree: links and keyboard focus travel with
  // the header as its transparent, full-width layout becomes a compact lens.
  const compact = useTransform(scrollY, value => {
    if (reduced) return value > 24 ? 1 : 0;
    const p = Math.max(0, Math.min(1, (value - 8) / 192));
    return p * p * p * (p * (p * 6 - 15) + 10);
  });
  const glass = useTransform(scrollY, value => {
    if (reduced) return value > 24 ? 1 : 0;
    const p = Math.max(0, Math.min(1, value / 40));
    return p * p * (3 - 2 * p);
  });
  return (
    <motion.header className="ha-nav" style={{ "--ha-nav-progress": compact, "--ha-nav-glass": glass } as MotionStyle}>
      <a href="#ha-top" aria-label="Happy Mondays — home">
        <Wordmark size="lg" />
      </a>
      <nav aria-label="Main navigation" className="ha-nav-desktop">
        {links.map(link => link.href.startsWith("#")
          ? <a key={link.label} href={link.href}>{link.label}</a>
          : <StoryLink key={link.label} href={link.href} className="">{link.label}</StoryLink>)}
        <MockLink className="ha-button ha-nav-action" message="Design preview — the booking calendar will be connected before launch.">Book a call</MockLink>
      </nav>
      <MobileNavigation links={links} reduced={reduced} />
    </motion.header>
  );
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
