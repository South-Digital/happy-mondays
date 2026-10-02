import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { MockLink } from "../../components/Toast";
import { usePrefersReducedMotion } from "../../lib/motion";
import { useCardTilt } from "./useCardTilt";
import { peopleJourney, peopleRelease } from "./people-journey.mjs";
import { PartnershipArtwork } from "./PartnershipArtwork";
import "./people-closing.css";
import { FounderPortrait } from "./FounderPortrait";

const TRAVEL = 1.1;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
// Select enough source detail for both the fixed panorama and static terrace.
const terraceSizes = "(max-width: 700px) 1297px, (max-width: 980px) 1393px, 1730px";

/** Pin the real preceding scene and the cards together. The reader controls
 * progress through the page’s single scroll interpolator, without a timed takeover. */
export function PeopleClosing({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const context = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [contextHeight, setContextHeight] = useState(0);
  const [pinTop, setPinTop] = useState(0);
  const [roomForMotion, setRoomForMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1080px) and (min-height: 700px)").matches,
  );
  const [contactVisible, setContactVisible] = useState(false);
  const [sideVisible, setSideVisible] = useState(true);
  const [inJourney, setInJourney] = useState(false);
  const geometry = useMotionValue({ width: 1184, height: 480, viewportHeight: 720 });
  const start = useMotionValue(0);
  const distance = useMotionValue(1);
  const exitDistance = useMotionValue(240);
  const [travelSpace, setTravelSpace] = useState({ travel: 1296, exit: 240 });
  const { scrollY } = useScroll();
  const raw = useTransform(() => clamp((scrollY.get() - start.get()) / distance.get()));
  const progress = raw;
  const animated = roomForMotion && !reduced;
  const releaseY = useTransform(() => peopleRelease(scrollY.get() - start.get() - distance.get(), exitDistance.get()));

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
      geometry.set({ width: stage.current!.clientWidth, height: stage.current!.offsetHeight, viewportHeight: window.innerHeight });
      const centredTop = (window.innerHeight - stage.current!.offsetHeight) / 2;
      // Pin and progress share the same measured centre, including the section gap.
      const top = centredTop - height - gap;
      setContextHeight(height);
      setPinTop(top);
      start.set(ref.current!.getBoundingClientRect().top + window.scrollY - top);
      distance.set(window.innerHeight * TRAVEL);
      const exit = 0;
      exitDistance.set(exit);
      setTravelSpace({ travel: window.innerHeight * TRAVEL, exit });
    };
    measure();
    // History restoration can mount us halfway through the pinned sequence.
    // The scene follows the same scroll position immediately, without another spring.

    const observer = new ResizeObserver(measure);
    observer.observe(context.current);
    observer.observe(stage.current);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [animated, distance, exitDistance, start, progress, geometry]);

  const scene = useTransform(() => {
    const { width, height, viewportHeight } = geometry.get();
    return peopleJourney(progress.get(), width, height, viewportHeight);
  });
  useMotionValueEvent(progress, "change", value => setInJourney(value > 0.02));
  const sideOpacity = useTransform(scene, value => value.sideOpacity);
  const contactOpacity = useTransform(scene, value => value.contactOpacity);
  useMotionValueEvent(sideOpacity, "change", value => setSideVisible(value >= 0.08));
  useMotionValueEvent(contactOpacity, "change", value => setContactVisible(value > 0.08));
  const sceneStyle = useTransform(scene, value => ({
    "--pc-frame-left": `${value.frameLeft}px`, "--pc-frame-width": `${value.frameWidth}px`,
    "--pc-frame-top": `${value.frameTop}px`, "--pc-frame-height": `${value.frameHeight}px`,
    "--pc-radius": `${value.radius}px`, "--pc-canvas-width": `${value.canvasWidth}px`,
    "--pc-canvas-height": `${value.canvasHeight}px`, "--pc-photo-scale": value.photoScale,
    "--pc-side-width": `${value.sideWidth}px`, "--pc-side-opacity": value.sideOpacity,
    "--pc-side-copy-opacity": value.sideCopyOpacity,
    "--pc-side-scale": value.sideScale, "--pc-side-y": `${value.sideY}px`, "--pc-side-x": `${value.sideX}px`,
    "--pc-art-progress": value.artworkProgress,
    "--pc-title-x": `${value.titleX}px`, "--pc-title-y": `${value.titleY}px`, "--pc-title-scale": value.titleScale,
    "--pc-copy-width": `${value.copyWidth}px`, "--pc-copy-x": `${value.copyX}px`, "--pc-copy-y": `${value.copyY}px`,
    "--pc-invite-x": `${value.invitationX}px`, "--pc-invite-y": `${value.invitationY}px`,
    "--pc-invite-width": `${value.invitationWidth}px`, "--pc-contact-opacity": value.contactOpacity,
    "--pc-button-width": `${value.buttonWidth}px`,
    "--pc-button-x": `${value.buttonX}px`,
    "--pc-contact-y": `${value.contactY}px`,
    "--pc-contact-x": `${value.contactX}px`,
  }));
  // Bind the single geometry snapshot to CSS without a React render each frame.
  useLayoutEffect(() => {
    const element = stage.current;
    if (!element) return;
    const apply = (values: ReturnType<typeof sceneStyle.get>) => {
      for (const [key, value] of Object.entries(values)) element.style.setProperty(key, String(value));
    };
    apply(sceneStyle.get());
    return sceneStyle.on("change", apply);
  }, [sceneStyle]);
  const businessTilt = useCardTilt(reduced, animated ? sideOpacity : undefined);
  const feeTilt = useCardTilt(reduced, animated ? sideOpacity : undefined);
  const peopleTilt = useCardTilt(reduced || (animated && inJourney));
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
  return (
    <motion.section ref={ref} className="pc-sequence" data-animated={animated}
      style={{ "--pc-pin-top": `${pinTop}px`, "--pc-context-height": `${contextHeight}px`, "--pc-travel": `${travelSpace.travel}px`, "--pc-exit": `${travelSpace.exit}px` } as MotionStyle}>
      <motion.div className="pc-pin" style={animated ? { y: releaseY } : undefined}>
        <div className="pc-context" ref={context}>{children}</div>
        <section className="pc-journey" aria-label="Working with Happy Mondays">
          <div className="pc-stage" ref={stage}>
            <motion.article {...businessTilt} className="pc-reason pc-reason--business"
              aria-hidden={animated && !sideVisible}
              style={businessTilt.style}>
              <div className="pc-reason-inner">
                <h2><span>Your business.</span><br />Our starting point.</h2>
                <PartnershipArtwork kind="platforms" reduced={reduced} visible={!animated || sideVisible} />
                <p>Your products, your margins, your ambitions. We get to know your business, then join the dots.</p>
              </div>
            </motion.article>
            <motion.article {...feeTilt} className="pc-reason pc-reason--fee"
              aria-hidden={animated && !sideVisible}
              style={feeTilt.style}>
              <div className="pc-reason-inner">
                <h2><span>A flat fee.</span><br />A clear plan.</h2>
                <PartnershipArtwork kind="fee" reduced={reduced} visible={!animated || sideVisible} />
                <p>One clear monthly fee, agreed around your spend band. Never a percentage of your ad spend.</p>
              </div>
            </motion.article>
            <motion.article {...peopleTilt} className="pc-people" aria-labelledby="cj-people-heading"
              style={peopleTilt.style}>
              <motion.picture className="pc-photo" aria-hidden="true">
                <source type="image/avif"
                  srcSet="/images/page-atmosphere/terrace-coastal-960.avif 960w, /images/page-atmosphere/terrace-coastal-1942.avif 1942w"
                  sizes={terraceSizes} />
                <motion.img src="/images/page-atmosphere/terrace-coastal-1942.webp"
                  srcSet="/images/page-atmosphere/terrace-coastal-960.webp 960w, /images/page-atmosphere/terrace-coastal-1942.webp 1942w"
                  sizes={terraceSizes}
                  alt="" width="1942" height="809" loading="lazy" decoding="async" />
              </motion.picture>
              <div className="pc-people-content">
                <h2 id="cj-people-heading" ref={heading} tabIndex={-1}>
                  <span>Good people.</span>On your side.
                </h2>
                <p>Work directly with a senior team that gets to know your products, your customers and where you want to go.</p>
                <div className="pc-invitation">
                  <MockLink className="ha-button" message="Design preview — the booking calendar will be connected before launch.">
                    Let’s talk about your store
                  </MockLink>
                  <div className="cj-conversation-person pc-contact"
                    aria-hidden={animated && !contactVisible}>
                    <FounderPortrait />
                    <div><strong>Your first chat with Keanu</strong><span>Founder, ex-Google</span></div>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      </motion.div>
    </motion.section>
  );
}
