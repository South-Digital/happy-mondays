import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wordmark } from "../../components/Brand";
import { Seo } from "../../components/Seo";
import { useToast } from "../../components/Toast";
import { riseAt, usePrefersReducedMotion } from "../../lib/motion";
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
  return (
    <section className="nb-hero" aria-labelledby="nb-title">
      <div className="nb-scenery" aria-hidden>
        <Scene />
      </div>
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
      </main>
    </>
  );
}
