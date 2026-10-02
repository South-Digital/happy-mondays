import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/** Separate entrance, scroll and ambient layers so their transforms compose.
 * Observe each object, not the entire (much taller on mobile) partnership row. */
export function PartnershipArtwork({ kind, reduced, visible }: {
  kind: "platforms" | "fee"; reduced: boolean; visible: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.2 });
  const inView = useInView(ref, { amount: 0.1 });
  const [ready, setReady] = useState(kind === "fee");
  const [hidden, setHidden] = useState(() => document.hidden);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const position = scrollYProgress;
  const y = useTransform(position, value => reduced ? 0 : 10 - value * 20);
  const rotate = useTransform(position, value => reduced ? 0 : (value - 0.5) * (kind === "platforms" ? 5 : -4));
  const active = ready && inView && visible && !hidden && !reduced;
  useEffect(() => {
    if (image.current?.complete && image.current.naturalWidth) setReady(true);
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <div ref={ref} className={`pc-art pc-art--${kind}`} aria-hidden="true"
      data-active={active} data-reduced={reduced}>
      <motion.div className="pc-art-scroll" style={{ y, rotate }}>
        <motion.div className="pc-art-settle" initial={false}
          animate={{ opacity: ready ? 1 : 0, y: reduced || (ready && seen) ? 0 : 18, scale: reduced || (ready && seen) ? 1 : 0.96 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}>
          {kind === "fee" ? <div className="pc-fee-study">
            <div className="pc-fee-study-heading"><span>One monthly fee</span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="5" y="8" width="10" height="8" rx="2"/><path d="M7 8V6a3 3 0 016 0v2"/></svg></div>
            <div className="pc-fee-plot">
              {[35, 57, 83].map((height, index) => <motion.span key={index} className="pc-fee-spend"
                initial={false} animate={{ scaleY: reduced || seen ? 1 : .1 }}
                transition={{ duration: reduced ? 0 : .9, delay: index * .15, ease: [.22,1,.36,1] }}
                style={{ height: `${height}%`, left: `${14 + index * 31}%` }} />)}
              <svg viewBox="0 0 250 100" preserveAspectRatio="none"><motion.path d="M20 59H230" fill="none" stroke="#56665c" strokeWidth="2" initial={false} animate={{ pathLength: reduced || seen ? 1 : 0 }} transition={{ duration: reduced ? 0 : 1.2, delay: .35 }} />{[38,115,193].map(x => <circle key={x} cx={x} cy="59" r="3" fill="#56665c" stroke="#f6f4ed" strokeWidth="2" />)}</svg>
            </div>
            <div className="pc-fee-key"><span>Ad spend</span><span>Agreed fee</span></div>
            <p>Within your spend band</p>
          </div> : <div className="pc-art-float">

            <span className="pc-platform-bridge" />
            {["shopify", "google"].map((part, index) => (
              <div key={part} className={`pc-art-piece pc-art-piece--${part}`}>
                <img ref={index === 0 ? image : undefined} className="pc-art-object"
                  src={`/images/partnership/glass-disc-v2-400.webp`}
                  srcSet={`/images/partnership/glass-disc-v2-400.webp 400w, /images/partnership/glass-disc-v2-800.webp 800w`}
                  sizes="(max-width: 700px) 60vw, 280px" width="1280" height="1280" alt="" loading="lazy"
                  onLoad={index === 0 ? () => setReady(true) : undefined} />
                {part === "shopify" && <img className="pc-platform" src="/images/partnership/shopify-bag.svg" alt="" width="72" height="72" />}
                {part === "google" && <img className="pc-platform" src="/images/icon-google-ads.svg" alt="" width="72" height="72" />}
                <span className="pc-art-light" />
              </div>
            ))}
          </div>}
        </motion.div>
      </motion.div>
    </div>
  );
}
