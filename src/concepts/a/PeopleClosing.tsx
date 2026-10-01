import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { MockLink } from "../../components/Toast";
import { usePrefersReducedMotion } from "../../lib/motion";
import { useCardTilt } from "./useCardTilt";
import { StoryLink } from "./AgencyStory";
import "./people-closing.css";

const TRAVEL = 1.7;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
// object-fit: cover scales the panorama by card height, not its narrow width.
// 540/580/720px card heights × the original 1942:809 image ratio.
const terraceSizes = "(max-width: 700px) 1297px, (max-width: 980px) 1393px, 1730px";

/** Pin the real preceding scene and the cards together. The reader controls
 * progress; a damped follower softens wheel steps without a timed takeover. */
export function PeopleClosing({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const context = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [wideContent, setWideContent] = useState(false);
  const [contextHeight, setContextHeight] = useState(0);
  const [pinTop, setPinTop] = useState(0);
  const [roomForMotion, setRoomForMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1080px) and (min-height: 700px)").matches,
  );
  const [contactVisible, setContactVisible] = useState(false);
  const [sideVisible, setSideVisible] = useState(true);
  const [layoutReady, setLayoutReady] = useState(false);
  const start = useMotionValue(0);
  const distance = useMotionValue(1);
  const { scrollY } = useScroll();
  const raw = useTransform(() => clamp((scrollY.get() - start.get()) / distance.get()));
  const progress = useSpring(raw, { stiffness: 105, damping: 27, mass: 0.55 });
  const animated = roomForMotion && !reduced;

  // Measure both layouts before moving the copy and CTA between them.
  // A CSS container breakpoint alone makes the bottom row snap.
  useLayoutEffect(() => {
    const card = content.current?.parentElement;
    if (!card) return;
    const measure = () => setWideContent(wide => card.clientWidth >= (wide ? 1080 : 1100));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Let the restored width and its container measurement settle before FLIP
  // starts tracking changes. Otherwise the CTA can enter from below the card.
  useLayoutEffect(() => {
    let nextFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(() => setLayoutReady(true));
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(nextFrame); };
  }, []);

  const rowTransition = { layout: { duration: reduced || !layoutReady ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] as const } };

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1080px) and (min-height: 700px)");
    const update = () => setRoomForMotion(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (!ref.current || !context.current || !stage.current) return;
    const measure = () => {
      const height = context.current!.offsetHeight;
      const gap = parseFloat(getComputedStyle(stage.current!.parentElement!).marginTop);
      const centredTop = (window.innerHeight - stage.current!.offsetHeight) / 2;
      // Pin and progress share the same measured centre, including the section gap.
      const top = centredTop - height - gap;
      setContextHeight(height);
      setPinTop(top);
      start.set(ref.current!.getBoundingClientRect().top + window.scrollY - top);
      distance.set(window.innerHeight * TRAVEL);
    };
    measure();
    // History restoration can mount us halfway through the pinned sequence.
    // Start there immediately; only subsequent scrolling should be spring-led.
    progress.jump(clamp((window.scrollY - start.get()) / distance.get()));
    const observer = new ResizeObserver(measure);
    observer.observe(context.current);
    observer.observe(stage.current);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [animated, distance, start, progress]);

  useMotionValueEvent(progress, "change", value => setContactVisible(value > 0.68));
  // First: read. Then: narrow while still legible. Last: finish opening and hold.
  const opening = useTransform(progress, [0, 0.12, 0.9, 1], [0, 0, 1, 1]);
  const sideWidth = useTransform(opening, value => `calc(${(1 - value) * 100 / 3}% - ${(1 - value) * 40 / 3}px)`);
  const centreLeft = useTransform(opening, value => `calc(${(1 - value) * 100 / 3}% + ${(1 - value) * 20 / 3}px)`);
  const centreWidth = useTransform(opening, value => `calc(${100 - (1 - value) * 200 / 3}% - ${(1 - value) * 40 / 3}px)`);
  const sideOpacity = useTransform(progress, [0, 0.27, 0.44, 1], [1, 1, 0, 0]);
  useMotionValueEvent(sideOpacity, "change", value => setSideVisible(value >= 0.08));
  const sidePadding = useTransform(progress, [0.12, 0.4], [36, 24]);
  const sideInset = useTransform(progress, [0.12, 0.57], [0, 14]);
  const padding = useTransform(progress, [0.25, 0.85], [36, 62]);
  const photoScale = useTransform(opening, [0, 1], [1.06, 1]);
  const contactOpacity = useTransform(progress, [0.68, 0.88], [0, 1]);
  const contactY = useTransform(progress, [0.68, 0.88], [8, 0]);

  const businessTilt = useCardTilt(reduced, animated ? sideOpacity : undefined);
  const feeTilt = useCardTilt(reduced, animated ? sideOpacity : undefined);
  const peopleTilt = useCardTilt(reduced);
  useLayoutEffect(() => {
    if (!animated || sideVisible) return;
    const focused = document.activeElement;
    if (businessTilt.ref.current?.contains(focused) || feeTilt.ref.current?.contains(focused)) {
      // A scroll-driven fade must not strand focus in an invisible card.
      // Land on the surviving scene without activating a different action or
      // asking the browser to scroll an already-centred composition again.
      heading.current?.focus({ preventScroll: true });
    }
  }, [animated, sideVisible, businessTilt.ref, feeTilt.ref]);
  // Keep animated geometry in custom properties. Static layouts do not read
  // them, so Framer cannot retain a shrinking width after a breakpoint change.
  const sideLayout = {
    "--pc-side-width": sideWidth, "--pc-side-opacity": sideOpacity,
    "--pc-side-inset": sideInset, "--pc-side-padding": sidePadding,
  } as MotionStyle;

  return (
    <motion.section ref={ref} className="pc-sequence" data-animated={animated}
      style={{ "--pc-pin-top": `${pinTop}px`, "--pc-context-height": `${contextHeight}px`, "--pc-progress": progress } as MotionStyle}>
      <div className="pc-pin">
        <div className="pc-context" ref={context}>{children}</div>
        <section className="pc-journey" aria-label="Working with Happy Mondays">
          <div className="pc-stage" ref={stage}>
            <motion.article {...businessTilt} className="pc-reason pc-reason--business"
              aria-hidden={animated && !sideVisible}
              style={{ ...businessTilt.style, ...sideLayout }}>
              <div className="pc-reason-inner">
                <h2><span>Your business.</span><br />Our starting point.</h2>
                <p>Your products, your margins, your ambitions. We get to know what matters before deciding what comes next.</p>
                <div className="pc-signature" aria-label="Google Ads and Shopify, one team">
                  <span>Google Ads <span className="pc-plus">+</span> Shopify</span>
                  <span>One team. The whole picture.</span>
                </div>
              </div>
            </motion.article>
            <motion.article {...feeTilt} className="pc-reason pc-reason--fee"
              aria-hidden={animated && !sideVisible}
              style={{ ...feeTilt.style, ...sideLayout }}>
              <div className="pc-reason-inner">
                <h2><span>A flat fee.</span><br />A clear plan.</h2>
                <p>A fixed monthly fee within your spend band. You know what to budget, without paying a percentage of your ad spend.</p>
                <div className="pc-signature">
                  <span>Clear scope. Close collaboration.</span>
                  <StoryLink href="/pricing" tabIndex={animated && !sideVisible ? -1 : undefined}>Explore pricing <span aria-hidden="true">↗</span></StoryLink>
                </div>
              </div>
            </motion.article>
            <motion.article {...peopleTilt} className="pc-people" aria-labelledby="cj-people-heading"
              style={{ ...peopleTilt.style, "--pc-centre-left": centreLeft, "--pc-centre-width": centreWidth } as MotionStyle}>
              <motion.picture className="pc-photo" aria-hidden="true" style={{ "--pc-photo-scale": photoScale } as MotionStyle}>
                <source type="image/avif"
                  srcSet="/images/page-atmosphere/terrace-coastal-960.avif 960w, /images/page-atmosphere/terrace-coastal-1942.avif 1942w"
                  sizes={terraceSizes} />
                <img src="/images/page-atmosphere/terrace-coastal-1942.webp"
                  srcSet="/images/page-atmosphere/terrace-coastal-960.webp 960w, /images/page-atmosphere/terrace-coastal-1942.webp 1942w"
                  sizes={terraceSizes}
                  alt="" width="1942" height="809" loading="lazy" decoding="async" />
              </motion.picture>
              <motion.div ref={content} className="pc-people-content" data-wide={wideContent} style={{ "--pc-inner-padding": padding } as MotionStyle}>
                <h2 id="cj-people-heading" ref={heading} tabIndex={-1}>
                  <span>Good people.</span>On your side.
                </h2>
                <motion.p layout={layoutReady ? "position" : false} transition={rowTransition}>Work directly with a senior team that gets to know your products, your customers and where you want to go.</motion.p>
                <motion.div className="pc-invitation" layout={layoutReady ? "position" : false} transition={rowTransition}>
                  <MockLink className="ha-button" message="Design preview — the booking calendar will be connected before launch.">
                    Let’s talk about your store
                  </MockLink>
                  <motion.div className="cj-conversation-person pc-contact"
                    style={{ "--pc-contact-opacity": contactOpacity, "--pc-contact-y": contactY } as MotionStyle}
                    aria-hidden={animated && !contactVisible}>
                    <img src="/images/editorial/keanu-480.webp"
                      srcSet="/images/editorial/keanu-480-96.webp 96w, /images/editorial/keanu-480-192.webp 192w, /images/editorial/keanu-480.webp 480w"
                      sizes="48px" alt="Keanu Fischell, founder of Happy Mondays" width="48" height="48" loading="lazy" />
                    <div><strong>Your first chat with Keanu</strong><span>Founder, Happy Mondays</span></div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.article>
          </div>
        </section>
      </div>
    </motion.section>
  );
}
