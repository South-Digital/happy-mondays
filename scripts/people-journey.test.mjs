import test from 'node:test';
import assert from 'node:assert/strict';
import { peopleJourney } from '../src/concepts/a/people-journey.mjs';

for (const [width, height, viewport] of [[984,480,700], [1184,480,720], [1320,486,900], [1800,510,1100]]) {
  test(`panorama stays centred and copy keeps its measure at ${width}px`, () => {
    const opening = peopleJourney(0, width, height, viewport);
    let previous = opening;
    for (let i = 0; i <= 1000; i++) {
      const current = peopleJourney(i / 1000, width, height, viewport);
      assert.ok(Object.values(current).every(Number.isFinite));
      assert.ok(Math.abs(current.frameLeft + current.frameWidth / 2 - width / 2) < 0.0001);
      assert.ok(Math.abs(current.frameTop + current.frameHeight / 2 - height / 2) < 0.0001);
      assert.ok(current.frameWidth >= previous.frameWidth - 0.0001);
      assert.ok(current.frameHeight <= viewport - 100);
      assert.equal(current.canvasWidth, width);
      assert.equal(current.copyWidth, opening.copyWidth);
      assert.ok(current.invitationX + current.invitationWidth <= current.frameWidth + 0.0001);
      assert.ok(current.invitationY + 54 < current.frameHeight);
      if (current.contactOpacity > 0) {
        assert.ok(current.invitationX + 236 < current.frameWidth);
      }
      assert.ok(current.invitationX + current.buttonX + current.buttonWidth <= current.frameWidth);
      if (current.sideCopyOpacity > 0) {
        assert.ok(current.frameLeft + current.frameWidth < width - current.sideWidth + 30);
      }
      assert.ok(current.copyY >= current.titleY + 74.8 * current.titleScale + 20);
      previous = current;
    }
  });
}
test('readable holds and reversible geometry without breakpoint switches', () => {
  const at = p => peopleJourney(p, 1184, 480, 720);
  assert.deepEqual(at(0), at(0.14));
  assert.deepEqual(at(0.9), at(1));
  assert.equal(at(1).sideOpacity, 0);
  assert.equal(at(1).contactOpacity, 1);
  assert.equal(at(1).invitationX + at(1).invitationWidth, 1184 - 1184 * .048);
  assert.ok(at(1).invitationY + 54 <= at(1).frameHeight - 100);
  const forward = Array.from({length:101}, (_,i) => at(i/100));
  const reverse = Array.from({length:101}, (_,i) => at((100-i)/100)).reverse();
  assert.deepEqual(forward, reverse);
});
