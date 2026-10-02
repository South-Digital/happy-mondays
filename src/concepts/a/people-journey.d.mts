export function peopleJourney(progress: number, width: number, height: number, viewportHeight: number): {
  opening: number; frameLeft: number; frameWidth: number; frameHeight: number; frameTop: number; radius: number;
  canvasWidth: number; canvasHeight: number; photoScale: number;
  sideWidth: number; sideOpacity: number; sideCopyOpacity: number; sideScale: number; sideY: number; sideX: number; artworkProgress: number;
  titleX: number; titleY: number; titleScale: number; copyWidth: number; copyScale: number; copyX: number; copyY: number;
  invitationX: number; invitationY: number; invitationWidth: number; buttonWidth: number; buttonX: number; contactX: number; contactOpacity: number; contactY: number;
};

export function peopleRelease(scrollAfterStory: number, releaseDistance: number): number;

export function peopleArrival(scrollBeforeStory: number, arrivalDistance: number): number;
