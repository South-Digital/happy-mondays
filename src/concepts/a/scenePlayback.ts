export const MIN_SCENE_RATE = 0.9;
export const MAX_SCENE_RATE = 1.9;

/** Pure timing policy: scroll changes pace, never seeks to an authored frame. */
export function stepScenePlayback({
  elapsed, duration, rate, delta, velocity, progress,
}: {
  elapsed: number;
  duration: number;
  rate: number;
  delta: number;
  /** Signed viewport heights per second, measured from actual page movement. */
  velocity: number;
  progress: number;
}) {
  const dt = Math.max(0, Math.min(delta, 64));
  const speed = Math.abs(velocity);
  // Rest = normal playback; deliberate movement is a little more measured.
  let target = speed < 0.08 ? 1 : 0.9 + Math.min(1, speed / 1.6);
  // While leaving downward, use the remaining viewing window to catch up.
  // The same cap applies even after a very large wheel/trackpad movement.
  if (velocity > 0.08) {
    const behind = Math.max(0, (progress - 0.15) / 0.65 - elapsed / duration);
    target += Math.min(0.45, behind * 0.9);
  }
  target = Math.max(MIN_SCENE_RATE, Math.min(MAX_SCENE_RATE, target));
  // Quick enough to respond, slow enough not to jerk on a wheel notch.
  const response = 1 - Math.exp(-dt / (target > rate ? 200 : 380));
  const nextRate = rate + (target - rate) * response;
  return {
    rate: nextRate,
    elapsed: Math.min(duration, elapsed + dt * nextRate),
  };
}
