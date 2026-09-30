import { useEffect, useRef, useState } from "react";

export const SCENE_DURATION = 8600;
export const segment = (time: number, start: number, duration: number) =>
  Math.max(0, Math.min(1, (time - start) / duration));
export const settle = (value: number) => 1 - Math.pow(1 - value, 3);

/** One clock owns the whole scene. Offscreen/hidden time never advances it. */
export function useSceneTimeline(
  visible: boolean,
  loaded: boolean,
  reduced: boolean,
  duration = SCENE_DURATION,
  fps = 30,
) {
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
    if (
      !visible ||
      !loaded ||
      paused ||
      hidden ||
      reduced ||
      elapsed.current >= duration
    )
      return;
    let frame = 0;
    let previous = performance.now();
    let painted = previous;
    const tick = (now: number) => {
      const delta = Math.min(now - previous, 64);
      // Scene playback has its own clock: scroll only controls spatial depth.
      elapsed.current = Math.min(duration, elapsed.current + delta);
      previous = now;
      // Count-up scenes default to 30fps; the hero entrance uses 60fps.
      if (now - painted >= 1000 / fps - 1 || elapsed.current === duration) {
        setTime(elapsed.current);
        painted = now;
      }
      if (elapsed.current < duration) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, loaded, paused, hidden, reduced, revision, duration, fps]);
  const replay = () => {
    elapsed.current = 0;
    setTime(0);
    setPaused(false);
    setRevision((value) => value + 1);
  };
  return {
    time: reduced ? duration : time,
    paused,
    toggle: () => setPaused((value) => !value),
    replay,
  };
}
