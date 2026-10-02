import { useEffect, useRef, useState } from "react";

const DURATION = 4400;

/** One finite opening. Scrolling away or focusing the action resolves it;
 * visibility and motion preference changes never rewind an already-seen hero. */
export function useHeroEntrance(reduced: boolean) {
  const elapsed = useRef(reduced ? DURATION : 0);
  const [time, setTime] = useState(elapsed.current);
  useEffect(() => {
    let frame = 0;
    let previous = performance.now();
    const finish = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      elapsed.current = DURATION;
      setTime(DURATION);
    };
    if (reduced || window.scrollY > 180 || elapsed.current >= DURATION) {
      finish();
      return;
    }
    const tick = (now: number) => {
      frame = 0;
      if (document.hidden) return;
      if (window.scrollY > 180) { finish(); return; }
      elapsed.current = Math.min(DURATION, elapsed.current + Math.min(now - previous, 80));
      previous = now;
      setTime(elapsed.current);
      if (elapsed.current < DURATION) frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = performance.now();
      if (!document.hidden && elapsed.current < DURATION) frame = requestAnimationFrame(tick);
    };
    const focus = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.closest(".ha-hero-cta")) finish();
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("focusin", focus);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("focusin", focus);
    };
  }, [reduced]);
  return reduced ? DURATION : time;
}
