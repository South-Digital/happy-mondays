const clamp = value => Math.max(0, Math.min(1, value));
const blend = (progress, from, to) => {
  const x = clamp((progress - from) / (to - from));
  return x * x * x * (x * (x * 6 - 15) + 10);
};
const mix = (a, b, t) => a + (b - a) * t;

// One reversible spatial timeline. The scene is a fixed panorama behind an
// opening aperture; copy keeps its measure instead of reflowing every frame.
export function peopleJourney(progress, width, height, viewportHeight) {
  const opening = blend(progress, 0.14, 0.86);
  const composition = blend(progress, 0.2, 0.84);
  const retreat = blend(progress, 0.16, 0.52);
  const initialWidth = width * 0.4 - 16;
  const endHeight = Math.max(height, Math.min(620, viewportHeight - 144));
  const frameWidth = mix(initialWidth, width, opening);
  const frameHeight = mix(height, endHeight, opening);
  const endPadding = Math.min(64, width * 0.048);
  const titleY = mix(34, endHeight * 0.16, composition);
  const titleScale = mix(1, Math.min(1.88, width / 660), composition);
  const invitationWidth = mix(232, 512, composition);
  return {
    opening,
    frameLeft: (width - frameWidth) / 2,
    frameWidth, frameHeight, frameTop: (height - frameHeight) / 2,
    radius: mix(28, 36, opening),
    canvasWidth: width, canvasHeight: endHeight,
    photoScale: mix(1.08, 1, opening),
    sideWidth: width * 0.3 - 12,
    sideOpacity: 1 - blend(progress, 0.26, 0.57),
    // Fade readable content before the aperture crosses its left inset.
    // Artwork and atmosphere can remain underneath the expanding scene.
    sideCopyOpacity: 1 - blend((width + frameWidth) / 2 - (width * .7 + 12), -8, 16),
    artworkProgress: blend(progress, 0.14, 0.55),
    sideScale: mix(1, 0.94, retreat),
    sideY: mix(0, 18, retreat),
    sideX: mix(0, 22, retreat),
    titleX: mix(34, endPadding, composition), titleY, titleScale,
    copyWidth: Math.min(360, initialWidth - 68),
    copyX: mix(34, endPadding, composition),
    copyY: mix(height - 206, endHeight * 0.16 + 74.8 * Math.min(1.88, width / 660) + 28, composition),
    // Resolve beside the portrait below the left-hand copy, leaving the sea open.
    invitationX: mix(34, endPadding, composition),
    invitationY: mix(height - 88, endHeight - endPadding - 86, composition),
    invitationWidth,
    buttonWidth: mix(232, 252, composition),
    buttonX: mix(0, 260, composition),
    contactOpacity: blend(progress, 0.68, 0.88),
    contactY: mix(8, 0, blend(progress, 0.68, 0.88)),
  };
}

// Begin leaving the pin with zero velocity, meet normal page speed at its end.
// The fixed final offset is paired with an equal negative section margin.
export function peopleRelease(scrollAfterStory, releaseDistance) {
  const t = clamp(scrollAfterStory / releaseDistance);
  return -releaseDistance * t * t / 2;
}
