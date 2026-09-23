import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Wordmark } from "../../components/Brand";
import { MockLink, useToast } from "../../components/Toast";
import { ArrowUpRight } from "../../components/icons";
import { riseAt, usePrefersReducedMotion } from "../../lib/motion";
import { ProofRow } from "../shared/ProofRow";
import { LogoStrip } from "../shared/LogoStrip";
import { StorePreview, OrderPreview } from "./StorePreview";
import { useHeroDepth } from "./useHeroDepth";
import "./hero-a-study.css";

const links = ["Reviews", "Case Studies", "Pricing", "Blog", "Contact"];

function StudyNav() {
  const menu = useRef<HTMLDetailsElement>(null);
  const { show } = useToast();
  return (
    <header className="ha-nav">
      <MockLink label="Happy Mondays — home">
        <Wordmark size="lg" />
      </MockLink>
      <nav aria-label="Main navigation" className="ha-nav-desktop">
        {links.map((link) => (
          <MockLink key={link}>{link}</MockLink>
        ))}
        <MockLink className="ha-button ha-nav-cta">
          Book a call <ArrowUpRight width={13} height={13} />
        </MockLink>
      </nav>
      <details
        className="ha-mobile-menu"
        ref={menu}
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
        <nav aria-label="Mobile navigation">
          {[...links, "Book a call"].map((link) => (
            <button
              key={link}
              onClick={() => {
                if (menu.current) {
                  menu.current.open = false;
                  menu.current.querySelector("summary")?.focus();
                }
                show("Design preview — this destination is not connected yet.");
              }}
            >
              {link}
              <ArrowUpRight width={14} height={14} />
            </button>
          ))}
        </nav>
      </details>
    </header>
  );
}

function Coast({ foreground = false }: { foreground?: boolean }) {
  return (
    <picture
      className={foreground ? "ha-coast ha-coast-foreground" : "ha-coast"}
    >
      <source
        type="image/avif"
        srcSet="/images/hero-a-v2/coast-800.avif 800w, /images/hero-a-v2/coast-1440.avif 1440w, /images/hero-a-v2/coast-2400.avif 2400w, /images/hero-a-v2/coast-3840.avif 3840w"
        sizes="(max-width:700px) 1180px, (max-width:1440px) 1440px, 100vw"
      />
      <img
        src="/images/hero-a-v2/coast-1440.webp"
        srcSet="/images/hero-a-v2/coast-800.webp 800w, /images/hero-a-v2/coast-1440.webp 1440w, /images/hero-a-v2/coast-2400.webp 2400w, /images/hero-a-v2/coast-3840.webp 3840w"
        sizes="(max-width:700px) 1180px, (max-width:1440px) 1440px, 100vw"
        width="7088"
        height="3536"
        alt=""
        decoding="async"
        {...{ fetchpriority: foreground ? "auto" : "high" }}
      />
    </picture>
  );
}

export function HeroAStudy() {
  const reduced = usePrefersReducedMotion();
  const scene = useRef<HTMLDivElement>(null);
  const depth = useHeroDepth(scene);
  const credentials = useRef<HTMLDivElement>(null);
  const { scrollYProgress: proofProgress } = useScroll({
    target: credentials,
    offset: ["start 100%", "start 90%"],
  });
  const proofY = useTransform(proofProgress, [0, 1], [12, 0]);
  const proofOpacity = useTransform(proofProgress, [0, 1], [0.55, 1]);
  return (
    <section
      className="ha-study"
      data-motion={reduced ? "reduce" : "full"}
      aria-labelledby="ha-title"
    >
      <div className="ha-scene" ref={scene}>
        <motion.div
          className="ha-scenery"
          aria-hidden="true"
          style={reduced ? undefined : { y: depth.seaY }}
        >
          <Coast />
        </motion.div>
        <div className="ha-sky-wash" aria-hidden="true" />
        <StudyNav />
        <div className="ha-intro">
          <h1 id="ha-title">
            <motion.span {...riseAt(0, reduced)}>Open Shopify.</motion.span>
            <motion.span {...riseAt(1, reduced)}>Smile.</motion.span>
          </h1>
          <motion.p {...riseAt(2, reduced)}>
            Google Ads for Shopify brands.
            <br />
            Senior expertise. A flat monthly fee.
          </motion.p>
        </div>
        <motion.div className="ha-hero-cta" {...riseAt(3, reduced)}>
          <MockLink className="ha-button">
            Book a call <ArrowUpRight width={15} height={15} />
          </MockLink>
        </motion.div>
        <motion.div
          className="ha-object"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: reduced ? 0 : 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="ha-dashboard-depth"
            style={
              reduced
                ? undefined
                : { y: depth.dashboardY, scale: depth.dashboardScale }
            }
          >
            <StorePreview />
          </motion.div>
        </motion.div>
        <motion.div
          className="ha-foreground"
          aria-hidden="true"
          style={reduced ? undefined : { y: depth.foregroundY }}
        >
          <Coast foreground />
        </motion.div>
        <div className="ha-scene-fade" aria-hidden="true" />
        <motion.div className="ha-order-position" {...riseAt(7, reduced, 8)}>
          <motion.div
            className="ha-order-depth"
            style={
              reduced ? undefined : { y: depth.orderY, scale: depth.orderScale }
            }
          >
            <OrderPreview />
          </motion.div>
        </motion.div>
      </div>
      <div className="ha-credentials" ref={credentials}>
        <motion.div
          className="ha-proof-reveal"
          style={reduced ? undefined : { y: proofY, opacity: proofOpacity }}
        >
          <ProofRow clutchIcon />
          <LogoStrip className="ha-logos" />
        </motion.div>
      </div>
    </section>
  );
}
