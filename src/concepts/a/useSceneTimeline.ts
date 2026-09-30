import { useEffect, useRef, useState } from "react";

export const SCENE_DURATION = 8600;
export const segment = (time: number, start: number, duration: number) => Math.max(0, Math.min(1, (time - start) / duration));
export const settle = (value: number) => 1 - Math.pow(1 - value, 3);

/** One clock owns the whole scene. Offscreen/hidden time never advances it. */
export function useSceneTimeline(visible: boolean, loaded: boolean, reduced: boolean) {
  const elapsed = useRef(0);
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revision, setRevision] = useState(0);
  const [hidden, setHidden] = useState(() => document.hidden);
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (!visible || !loaded || paused || hidden || reduced || elapsed.current >= SCENE_DURATION) return;
    let frame = 0;
    let previous = performance.now();
    let painted = previous;
    const tick = (now: number) => {
      elapsed.current = Math.min(SCENE_DURATION, elapsed.current + Math.min(now - previous, 64));
      previous = now;
      // Text is updated at 30fps; transforms still share exactly the same clock.
      if (now - painted >= 32 || elapsed.current === SCENE_DURATION) {
        setTime(elapsed.current);
        painted = now;
      }
      if (elapsed.current < SCENE_DURATION) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, loaded, paused, hidden, reduced, revision]);
  const replay = () => {
    elapsed.current = 0;
    setTime(0);
    setPaused(false);
    setRevision(value => value + 1);
  };
  return { time: reduced ? SCENE_DURATION : time, paused, toggle: () => setPaused(value => !value), replay };
}
