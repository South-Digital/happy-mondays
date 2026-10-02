import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { stepScenePlayback } from "./scenePlayback";

export const SCENE_DURATION = 8600;
export const segment = (time: number, start: number, duration: number) =>
  Math.max(0, Math.min(1, (time - start) / duration));
export const settle = (value: number) => 1 - Math.pow(1 - value, 3);

/** One forward-only clock, with bounded scroll-responsive playback. */
export function useSceneTimeline(
  visible: boolean,
  loaded: boolean,
  reduced: boolean,
  duration = SCENE_DURATION,
  fps = 30,
  progress?: MotionValue<number>,
  storyReady = true,
) {
  const elapsed = useRef(reduced ? duration : 0);
  const rate = useRef(1);
  const [frameState, setFrameState] = useState({ time: reduced ? duration : 0, rate: 1 });
  const [paused, setPaused] = useState(false);
  const [revision, setRevision] = useState(0);
  const [hidden, setHidden] = useState(() => document.hidden);
  useEffect(() => {
    if (!reduced) return;
    // Reduced motion displays the completed composition. Commit that position
    // to the clock too, so restoring motion never rewinds an already-seen scene.
    elapsed.current = duration;
    rate.current = 1;
    setFrameState({ time: duration, rate: 1 });
  }, [reduced, duration]);
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (!progress || reduced || paused) return;
    const finishPassedScene = (value: number) => {
      // Only resolve once the entire scene has passed above the viewport.
      // Returning to a skipped scene shows its completed composition, not a
      // half-built interface. Never seek while any of the scene is on screen.
      if (value >= 0.999 && !document.hidden && elapsed.current < duration) {
        elapsed.current = duration;
        setFrameState({ time: duration, rate: 1 });
      }
    };
    finishPassedScene(progress.get());
    return progress.on("change", finishPassedScene);
  }, [progress, reduced, paused, duration]);
  useEffect(() => {
    if (
      !visible ||
      !loaded ||
      paused ||
      hidden ||
      reduced ||
      elapsed.current >= duration ||
      (!storyReady && elapsed.current >= 1000)
    )
      return;
    let frame = 0;
    let previous = performance.now();
    let painted = previous;
    let previousScroll = window.scrollY;
    let velocity = 0;
    rate.current = 1;
    const tick = (now: number) => {
      if (elapsed.current >= duration) return;
      const delta = Math.min(now - previous, 64);
      const position = window.scrollY;
      const rawVelocity = (position - previousScroll) / Math.max(1, window.innerHeight) / Math.max(0.001, (now - previous) / 1000);
      previousScroll = position;
      velocity += (rawVelocity - velocity) * (1 - Math.exp(-delta / 100));
      const next = stepScenePlayback({
        elapsed: elapsed.current, duration, rate: rate.current, delta,
        velocity: progress ? velocity : 0,
        progress: progress?.get() ?? 0,
      });
      // Establish the interface as it enters, but wait until enough of the
      // composition has been seen before spending its meaningful story beats.
      elapsed.current = storyReady ? next.elapsed : Math.min(1000, next.elapsed);
      rate.current = next.rate;
      previous = now;
      // Count-up scenes default to 30fps; the hero entrance uses 60fps.
      if (now - painted >= 1000 / fps - 1 || elapsed.current === duration || (!storyReady && elapsed.current === 1000)) {
        setFrameState({ time: elapsed.current, rate: rate.current });
        painted = now;
      }
      if (elapsed.current < duration && (storyReady || elapsed.current < 1000)) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, loaded, paused, hidden, reduced, revision, duration, fps, progress, storyReady]);
  const replay = () => {
    elapsed.current = 0;
    rate.current = 1;
    setFrameState({ time: 0, rate: 1 });
    setPaused(false);
    setRevision((value) => value + 1);
  };
  return {
    time: reduced ? duration : frameState.time,
    rate: reduced ? 1 : frameState.rate,
    paused,
    toggle: () => setPaused((value) => !value),
    replay,
  };
}
