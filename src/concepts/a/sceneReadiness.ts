const DEFAULT_REVEAL_AMOUNT = 0.42;

/** Keep the authored entrance, but never require more area than the viewport
 * can show. A large scene is ready once it occupies most of the available view. */
export function sceneRevealAmount(
  scene: { width: number; height: number },
  viewport: { width: number; height: number },
) {
  if (scene.width <= 0 || scene.height <= 0 || viewport.width <= 0 || viewport.height <= 0) {
    return DEFAULT_REVEAL_AMOUNT;
  }
  const availableArea = Math.min(scene.width, viewport.width) * Math.min(scene.height, viewport.height);
  return Math.min(DEFAULT_REVEAL_AMOUNT, 0.75 * availableArea / (scene.width * scene.height));
}
