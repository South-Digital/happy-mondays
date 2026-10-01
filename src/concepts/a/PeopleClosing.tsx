import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { MockLink } from "../../components/Toast";
import { usePrefersReducedMotion } from "../../lib/motion";
import { useCardTilt } from "./useCardTilt";
import "./people-closing.css";

const TRAVEL = 1.7;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Pin the real preceding scene and the cards together. The reader controls
 * progress; a damped follower softens wheel steps without a timed takeover. */
export function PeopleClosing({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const context = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [contextHeight, setContextHeight] = useState(0);
  const [pinTop, setPinTop] = useState(0);
  const [roomForMotion, setRoomForMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1080px) and (min-height: 700px)").matches,
  );
  const [contactVisible, setContactVisible] = useState(false);
  const start = useMotionValue(0);
  const distance = useMotionValue(1);
  const { scrollY } = useScroll();
  const raw = useTransform(() => clamp((scrollY.get() - start.get()) / distance.get()));
  const progress = useSpring(raw, { stiffness: 105, damping: 27, mass: 0.55 });
  const animated = roomForMotion && !reduced;

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
    const observer = new ResizeObserver(measure);
    observer.observe(context.current);
    observer.observe(stage.current);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [animated, distance, start]);

  useMotionValueEvent(progress, "change", value => setContactVisible(value > 0.68));
  // First: read. Then: narrow while still legible. Last: finish opening and hold.
  const opening = useTransform(progress, [0, 0.12, 0.9, 1], [0, 0, 1, 1]);
  const sideWidth = useTransform(opening, value => `calc(${(1 - value) * 100 / 3}% - ${(1 - value) * 40 / 3}px)`);
  const centreLeft = useTransform(opening, value => `calc(${(1 - value) * 100 / 3}% + ${(1 - value) * 20 / 3}px)`);
  const centreWidth = useTransform(opening, value => `calc(${100 - (1 - value) * 200 / 3}% - ${(1 - value) * 40 / 3}px)`);
  const sideOpacity = useTransform(progress, [0, 0.27, 0.44, 1], [1, 1, 0, 0]);
  const sidePadding = useTransform(progress, [0.12, 0.4], [36, 24]);
  const sideInset = useTransform(progress, [0.12, 0.57], [0, 14]);
  const padding = useTransform(progress, [0.25, 0.85], [36, 62]);
  const photoScale = useTransform(opening, [0, 1], [1.06, 1]);
  const contactOpacity = useTransform(progress, [0.68, 0.88], [0, 1]);
  const contactY = useTransform(progress, [0.68, 0.88], [8, 0]);

  const businessTilt = useCardTilt(reduced, animated ? sideOpacity : undefined);
  const feeTilt = useCardTilt(reduced, animated ? sideOpacity : undefined);
  const peopleTilt = useCardTilt(reduced);
  const sidePointerEvents = useTransform(sideOpacity, value => value < 0.08 ? "none" : "auto");

  return (
    <motion.section ref={ref} className="pc-sequence" data-animated={animated}
      style={{ "--pc-pin-top": `${pinTop}px`, "--pc-context-height": `${contextHeight}px`, "--pc-progress": progress } as MotionStyle}>
      <div className="pc-pin">
        <div className="pc-context" ref={context}>{children}</div>
        <section className="pc-journey" aria-label="Working with Happy Mondays">
          <div className="pc-stage" ref={stage}>
            <motion.article {...businessTilt} className="pc-reason pc-reason--business"
              style={{ ...businessTilt.style, ...(animated ? { width: sideWidth, opacity: sideOpacity, top: sideInset, bottom: sideInset, padding: sidePadding, pointerEvents: sidePointerEvents } : {}) }}>
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
              style={{ ...feeTilt.style, ...(animated ? { width: sideWidth, opacity: sideOpacity, top: sideInset, bottom: sideInset, padding: sidePadding, pointerEvents: sidePointerEvents } : {}) }}>
              <div className="pc-reason-inner">
                <h2><span>A flat fee.</span><br />A clear plan.</h2>
                <p>Senior expertise. A fixed monthly fee. Know what we’re working on, what it costs and why it matters.</p>
                <div className="pc-signature">
                  <span>Clear scope. Close collaboration.</span>
                  <span>More confidence in what comes next.</span>
                </div>
              </div>
            </motion.article>
            <motion.article {...peopleTilt} className="pc-people" aria-labelledby="cj-people-heading"
              style={{ ...peopleTilt.style, ...(animated ? { left: centreLeft, width: centreWidth } : {}) }}>
              <motion.picture className="pc-photo" aria-hidden="true" style={animated ? { scale: photoScale } : undefined}>
                <img src="/images/page-atmosphere/terrace-coastal-1942.webp"
                  srcSet="/images/page-atmosphere/terrace-coastal-960.webp 960w, /images/page-atmosphere/terrace-coastal-1942.webp 1942w"
                  sizes="(max-width: 980px) 100vw, 1320px" alt="" width="1942" height="809" loading="lazy" />
              </motion.picture>
              <motion.div className="pc-people-content" style={animated ? { padding } : undefined}>
                <h2 id="cj-people-heading">
                  <span>Good people.</span>On your side.
                </h2>
                <p>Work directly with a senior team that gets to know your products, your customers and where you want to go.</p>
                <div className="pc-invitation">
                  <MockLink className="ha-button" message="Design preview — the booking calendar will be connected before launch.">
                    Let’s talk about your store
                  </MockLink>
                  <motion.div className="cj-conversation-person pc-contact"
                    style={animated ? { opacity: contactOpacity, y: contactY } : undefined}
                    aria-hidden={animated && !contactVisible}>
                    <img src="/images/editorial/keanu-480.webp" alt="Keanu Fischell, founder of Happy Mondays" width="48" height="48" loading="lazy" />
                    <div><strong>Your first chat with Keanu</strong><span>Founder, Happy Mondays</span></div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.article>
          </div>
        </section>
      </div>
    </motion.section>
  );
}
