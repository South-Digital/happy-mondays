import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { MockLink } from "../../components/Toast";
import { usePrefersReducedMotion } from "../../lib/motion";
import { useCardTilt } from "./useCardTilt";
import { PartnershipArtwork } from "./PartnershipArtwork";
import "./people-closing.css";
import { FounderPortrait } from "./FounderPortrait";

const terraceSizes = "(max-width: 700px) 1297px, (max-width: 980px) 1393px, 1730px";

/** Natural document flow keeps the store scene moving and both reasons visible.
 * Artwork entrances and gentle card hover remain independent of the layout. */
export function PeopleClosing({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const businessTilt = useCardTilt(reduced);
  const feeTilt = useCardTilt(reduced);
  const peopleTilt = useCardTilt(reduced);
  return (
    <section className="pc-sequence" data-animated="false">
      <div className="pc-pin">
        <div className="pc-context">{children}</div>
        <section className="pc-journey" aria-label="Working with Happy Mondays">
          <div className="pc-stage">
            <motion.article {...businessTilt} className="pc-reason pc-reason--business"
              style={businessTilt.style}>
              <div className="pc-reason-inner">
                <h2><span>Your business.</span><br />Our starting point.</h2>
                <PartnershipArtwork kind="platforms" reduced={reduced} visible={true} />
                <p>Your products, your margins, your ambitions. We get to know your business, then join the dots.</p>
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
                <h2 id="cj-people-heading">
                  <span>Good people.</span>On your side.
                </h2>
                <p>Work directly with a senior team that gets to know your products, your customers and where you want to go.</p>
                <div className="pc-invitation">
                  <MockLink className="ha-button" message="Design preview — the booking calendar will be connected before launch.">
                    Let’s talk about your store
                  </MockLink>
                  <div className="cj-conversation-person pc-contact">
                    <FounderPortrait />
                    <div><strong>Your first chat with Keanu</strong><span>Founder, ex-Google</span></div>
                  </div>
                </div>
              </div>
            </motion.article>
            <motion.article {...feeTilt} className="pc-reason pc-reason--fee"
              style={feeTilt.style}>
              <div className="pc-reason-inner">
                <h2><span>A flat fee.</span><br />A clear plan.</h2>
                <PartnershipArtwork kind="calendar" reduced={reduced} visible={true} />
                <p>One clear monthly fee, agreed around your spend band. Never a percentage of your ad spend.</p>
              </div>
            </motion.article>
          </div>
        </section>
      </div>
    </section>
  );
}
