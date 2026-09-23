import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MobileNav } from '../../components/MobileNav'
import { Nav } from '../../components/Nav'
import { Photo } from '../../components/Photo'
import { MockLink } from '../../components/Toast'
import { ArrowUpRight } from '../../components/icons'
import { IMG } from '../../lib/assets'
import { DUR, EASE, riseAt, usePrefersReducedMotion } from '../../lib/motion'
import { HeroProofChips } from './HeroProofChips'
import { SHOW_HERO_CHIPS } from './flags'

const SEQ = { nav: 0, line1: 1, smile: 2, subline: 3, cta: 4 } as const

/**
 * §B1 — full-bleed Santorini photo, text block left-aligned at the 120px edge,
 * no dashboard above the fold. The photo drifts from 1.06 to 1.0 over ~20s once,
 * plus light parallax (§B5).
 */
export function HeroB() {
  const reduced = usePrefersReducedMotion()
  const sceneRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  })
  // §B5 — a very slow parallax so the photo and the text separate slightly.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section ref={sceneRef} className="relative aspect-[4/5] overflow-hidden bg-offwhite md:aspect-auto md:min-h-[600px] xl:h-[1200px]">
      {/* Photo — parallax on the wrapper, slow drift on the image itself */}
      <motion.div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={reduced ? undefined : { y: bgY }}
      >
        <motion.div
          className="h-[110%] w-full"
          initial={reduced ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: DUR.drift, ease: EASE.entrance }}
        >
          <Photo
            src={IMG.bHero}
            responsive
            /* Paints at 110vw at 1440 and 100vw at 1920 (object-cover on a 110%
               box); 100vw would under-declare it and pull a file that is too
               small. */
            sizes="110vw"
            alt="A whitewashed Santorini terrace looking out over the caldera"
            width={2000}
            height={1667}
            priority
            className="h-full w-full object-cover object-[32%_72%] md:object-center"
            fallback="linear-gradient(180deg,#9FC3DC 0%,#6E97B4 45%,#4E6E86 100%)"
          />
        </motion.div>
      </motion.div>

      {/* Scrim for legibility (§6).
          Mobile: the 4:5 crop puts the bright white terrace directly behind the
          text, so it needs a strong bottom-up wash rather than the desktop's
          side wash. Measured on glyph pixels; see .dev/contrast-mobile.mjs. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/45 to-black/10 md:hidden"
      />

      {/* Desktop: soft side wash from the left */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 z-10 hidden w-full bg-gradient-to-r from-black/55 via-black/20 to-transparent md:block md:w-[62%]"
      />
      {/* A second pool concentrated under the text block itself, so the linear
          scrim can stay light across the rest of the photograph. Radial, so it
          fades out in every direction and leaves no seam. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 hidden md:block"
        style={{
          background:
            'radial-gradient(70% 55% at 22% 62%, rgba(0,0,0,.42) 0%, rgba(0,0,0,.22) 45%, rgba(0,0,0,0) 78%)',
        }}
      />

      {/* Fade to the off-white page below. Stays at z-20: above the photograph
          and its scrims, below the content at z-30. */}
      <div aria-hidden className="hero-fade hero-fade-offwhite z-20" />

      <div className="relative z-30 flex h-full flex-col px-5 pb-10 pt-7 md:pb-24 xl:px-0">
        <motion.div {...riseAt(SEQ.nav, reduced)}>
          <Nav variant="b" />
          <MobileNav variant="b" />
        </motion.div>

        {/* Text block, left-aligned at the 120px content edge */}
        {/* At xl, where the hero is the frame's fixed 1200px, the block is
            pinned to 46% of its height — the frame places it at 46%-73%, and
            centring it sat about 110px too high. Below xl the hero is a
            min-height, so 46% has nothing fixed to resolve against and the
            block stays centred. */}
        <div className="mx-auto mt-auto flex w-full max-w-content flex-col justify-end pb-2 md:mt-24 md:flex-1 md:justify-center md:pb-0 xl:absolute xl:inset-x-0 xl:top-[46%] xl:mx-auto xl:mt-0 xl:max-w-none xl:flex-none xl:px-0">
          <div className="mx-auto w-full max-w-content">
          <h1 className="text-hero-m md:text-hero-t xl:text-hero">
            <motion.span className="block text-white" {...riseAt(SEQ.line1, reduced)}>
              Open Shopify.
            </motion.span>
            <motion.span className="block text-white/[0.76]" {...riseAt(SEQ.smile, reduced)}>
              Smile.
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-[430px] text-subline-m text-white/90 md:text-subline"
            {...riseAt(SEQ.subline, reduced)}
          >
            Google Ads for Shopify brands.
            <br />
            Senior expertise. A flat monthly fee.
          </motion.p>

          <motion.div className="mt-8" {...riseAt(SEQ.cta, reduced)}>
            <MockLink className="btn-solid">
              Book a call
              <ArrowUpRight width={15} height={15} />
            </MockLink>
          </motion.div>

          {SHOW_HERO_CHIPS && <HeroProofChips className="mt-8 md:mt-10" mobileOnlyFirst />}
          </div>
        </div>
      </div>
    </section>
  )
}
