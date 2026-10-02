import { useEffect, useState } from "react";

/** One finite opening, independent of image decoding and scroll position.
 * Scrolling away resolves it immediately; returning never restarts the story. */
export function useHeroEntrance(reduced: boolean) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (reduced || window.scrollY > 180) { setTime(4400); return; }
    let frame = 0;
    let elapsed = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      if (!document.hidden) elapsed += Math.min(now - previous, 80);
      previous = now;
      if (window.scrollY > 180) elapsed = 4400;
      setTime(Math.min(4400, elapsed));
      if (elapsed < 4400) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);
  return reduced ? 4400 : time;
}
