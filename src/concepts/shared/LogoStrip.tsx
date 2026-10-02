import { BrandLogo } from "../../components/Brand";
import { LOGOS } from "../../lib/assets";
import { usePrefersReducedMotion } from "../../lib/motion";

/**
 * §A1 / §B3 — the eight client logos as one flat grey.
 *
 * Each export is a whole list cell from Figma (163.25 × 72 at 1x, 327 × 144 at
 * 2x), with the mark already positioned and sized inside it — so the marks come
 * out at their drawn sizes (~32px tall, ~16px for the wider At Present and Go
 * Flower marks) simply by rendering each cell at its full width. The row is the
 * 1376px Figma strip: eight equal cells with a 10px gutter.
 *
 * §5 mobile — a single-row auto-scrolling marquee. Under reduced motion the
 * marquee is replaced by a static 2 × 4 wrap, so nothing moves.
 */
export function LogoStrip({
  label,
  className = "",
  staticMobile = false,
}: {
  label?: string;
  className?: string;
  staticMobile?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const staticLayout = reduced || staticMobile;

  return (
    <div className={className}>
      {label && (
        <p className="mb-8 text-center text-[14px] text-ink-60">{label}</p>
      )}

      {/* Desktop, and the reduced-motion mobile fallback */}
      <div
        className={`mx-auto w-full max-w-[1376px] px-5 xl:px-0 ${staticLayout ? "" : "hidden md:block"}`}
      >
        <ul
          className={`${
            staticLayout
              ? "grid grid-cols-4 gap-x-[10px] gap-y-6 md:flex"
              : "flex"
          } items-center gap-x-[10px]`}
        >
          {LOGOS.map((logo) => (
            <li
              key={logo.name}
              className="flex min-w-0 flex-1 justify-center [filter:grayscale(1)_brightness(0)]"
            >
              <BrandLogo name={logo.name} src={logo.src} />
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile marquee */}
      {!staticLayout && (
        <div
          className="relative overflow-hidden md:hidden"
          style={{
            maskImage:
              "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
          }}
        >
          <ul className="flex w-max animate-marquee items-center">
            {/* Duplicated so the loop is seamless; the copy is hidden from AT. */}
            {[0, 1].map((copy) => (
              <li
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1}
              >
                {LOGOS.map((logo) => (
                  <span
                    key={logo.name}
                    className="block w-[150px] shrink-0 [filter:grayscale(1)_brightness(0)]"
                  >
                    <BrandLogo name={logo.name} src={logo.src} />
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
