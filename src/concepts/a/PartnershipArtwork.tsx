import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";

/** Separate entrance, scroll and ambient layers so their transforms compose.
 * Observe each object, not the entire (much taller on mobile) partnership row. */
export function PartnershipArtwork({ kind, reduced, visible }: {
  kind: "platforms" | "calendar"; reduced: boolean; visible: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.2 });
  const inView = useInView(ref, { amount: 0.1 });
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const position = useSpring(scrollYProgress, { stiffness: 95, damping: 24, mass: 0.6 });
  const y = useTransform(position, value => reduced ? 0 : 10 - value * 20);
  const rotate = useTransform(position, value => reduced ? 0 : (value - 0.5) * (kind === "platforms" ? 5 : -4));
  const name = kind === "platforms" ? "glass-disc-v2" : "calendar-single-v2";
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
          <div className="pc-art-float">
            {kind === "platforms" && <span className="pc-platform-bridge" />}
            {(kind === "platforms" ? ["shopify", "google"] : ["back", "middle", "front"]).map((part, index) => (
              <div key={part} className={`pc-art-piece pc-art-piece--${part}`}>
                <img ref={index === 0 ? image : undefined} className="pc-art-object"
                  src={`/images/partnership/${name}-400.webp`}
                  srcSet={`/images/partnership/${name}-400.webp 400w, /images/partnership/${name}-800.webp 800w`}
                  sizes="(max-width: 700px) 60vw, 280px" width="1280" height="1280" alt="" loading="lazy"
                  onLoad={index === 0 ? () => setReady(true) : undefined} />
                {part === "shopify" && <img className="pc-platform" src="/images/partnership/shopify-bag.svg" alt="" width="72" height="72" />}
                {part === "google" && <img className="pc-platform" src="/images/icon-google-ads.svg" alt="" width="72" height="72" />}
                {kind === "platforms" && <span className="pc-art-light" />}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
