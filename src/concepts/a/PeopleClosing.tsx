import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MockLink } from "../../components/Toast";
import { usePrefersReducedMotion } from "../../lib/motion";
import "./people-closing.css";

/** A threshold opens the scene; scroll velocity never controls its playback. */
export function PeopleClosing() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [roomForMotion, setRoomForMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1080px) and (min-height: 700px)").matches,
  );
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1080px) and (min-height: 700px)");
    const update = () => setRoomForMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const animated = roomForMotion && !reduced;
  useEffect(() => {
    if (animated) setExpanded(scrollYProgress.get() > 0.24);
  }, [animated, scrollYProgress]);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    // Separate thresholds prevent twitching when the reader pauses at the edge.
    if (value > 0.24) setExpanded(true);
    else if (value < 0.04) setExpanded(false);
  });

  const open = !animated || expanded;
  const spring = { type: "spring" as const, stiffness: 100, damping: 19, mass: 1 };
  const sideTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      ref={ref}
      className="pc-journey"
      data-animated={animated}
      data-expanded={open}
      aria-label="Working with Happy Mondays"
    >
      <div className="pc-stage">
        <motion.article
          className="pc-reason pc-reason--business"
          animate={{ opacity: animated && open ? 0 : 1, x: animated && open ? -18 : 0, scale: animated && open ? 0.97 : 1 }}
          transition={sideTransition}
        >
          <h2><span>Your business.</span><br />Our starting point.</h2>
          <div className="pc-reason-bottom">
            <p>Your products, your margins, your ambitions. We get to know what matters before deciding what comes next.</p>
            <div className="pc-signature" aria-label="Google Ads and Shopify, one team">
              <span>Google Ads <span className="pc-plus">+</span> Shopify</span>
              <span>One team. The whole picture.</span>
            </div>
          </div>
        </motion.article>

        <motion.article
          className="pc-reason pc-reason--fee"
          animate={{ opacity: animated && open ? 0 : 1, x: animated && open ? 18 : 0, scale: animated && open ? 0.97 : 1 }}
          transition={sideTransition}
        >
          <h2><span>A flat fee.</span><br />A clear plan.</h2>
          <div className="pc-reason-bottom">
            <p>Senior expertise. A fixed monthly fee. Know what we’re working on, what it costs and why it matters.</p>
            <div className="pc-signature">
              <span>Clear scope. Close collaboration.</span>
              <span>More confidence in what comes next.</span>
            </div>
          </div>
        </motion.article>

        <motion.article
          className="pc-people"
          aria-labelledby="cj-people-heading"
          initial={false}
          animate={animated ? {
            left: open ? "calc(0% + 0px)" : "calc(33.333333% + 6.666667px)",
            width: open ? "calc(100% - 0px)" : "calc(33.333333% - 13.333333px)",
          } : { left: "calc(0% + 0px)", width: "calc(100% - 0px)" }}
          transition={animated ? spring : { duration: 0 }}
        >
          <motion.picture className="pc-photo" aria-hidden="true"
            animate={{ scale: animated && !open ? 1.08 : 1 }}
            transition={animated ? { duration: 1.4, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
          >
            <img
              src="/images/page-atmosphere/terrace-coastal-1942.webp"
              srcSet="/images/page-atmosphere/terrace-coastal-960.webp 960w, /images/page-atmosphere/terrace-coastal-1942.webp 1942w"
              sizes="(max-width: 980px) 100vw, 1320px"
              alt="" width="1942" height="809" loading="lazy"
            />
          </motion.picture>
          <div className="pc-people-content">
            <h2 id="cj-people-heading"><span>Good people.</span>On your side.</h2>
            <p>Work directly with a senior team that gets to know your products, your customers and where you want to go.</p>
            <div className="cj-conversation">
              <MockLink className="ha-button" message="Design preview — the booking calendar will be connected before launch.">
                Let’s talk about your store
              </MockLink>
              <motion.div className="cj-conversation-person"
                animate={{ opacity: open ? 1 : 0, y: open ? 0 : 8 }}
                transition={animated ? { duration: 0.55, delay: open ? 0.3 : 0 } : { duration: 0 }}
                aria-hidden={!open}
              >
                <img src="/images/editorial/keanu-480.webp" alt="Keanu Fischell, founder of Happy Mondays" width="48" height="48" loading="lazy" />
                <div><strong>Your first chat with Keanu</strong><span>Founder, Happy Mondays</span></div>
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
