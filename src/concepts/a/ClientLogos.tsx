import type { CSSProperties } from "react";
import { LOGOS } from "../../lib/assets";

// Visible bounds inside the supplied 327 × 144 exports. Keep the originals,
// but size the marks optically instead of sizing their unequal transparent cells.
const marks = [
  { bounds: [40, 54, 247, 35], width: 134, mobile: 70 },
  { bounds: [106, 40, 115, 64], width: 76, mobile: 46 },
  { bounds: [42, 40, 243, 64], width: 134, mobile: 74 },
  { bounds: [126, 37, 74, 71], width: 44, mobile: 32 },
  { bounds: [114, 40, 99, 63], width: 58, mobile: 40 },
  { bounds: [40, 55, 247, 33], width: 134, mobile: 72 },
  { bounds: [111, 40, 105, 64], width: 72, mobile: 44 },
  { bounds: [137, 39, 51, 64], width: 37, mobile: 25 },
];

export function ClientLogos() {
  return (
    <ul className="ha-client-logos" aria-label="Client brands">
      {LOGOS.map((logo, index) => {
        const { bounds: [x, y, width, height], width: opticalWidth, mobile } = marks[index];
        return (
          <li key={logo.name}>
            <span className="ha-client-mark" style={{
              "--mark-width": `${opticalWidth}px`,
              "--mark-mobile-width": `${mobile}px`,
              aspectRatio: `${width} / ${height}`,
            } as CSSProperties}>
              <img src={logo.src} alt={logo.name} width="327" height="144" decoding="async"
                style={{ width: `${327 / width * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
