import test from 'node:test';
import assert from 'node:assert/strict';
import { peopleJourney, peopleArrival, peopleRelease } from '../src/concepts/a/people-journey.mjs';

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
      // The expanded scene clears the 80px floating nav plus breathing room.
      assert.ok((viewport - current.frameHeight) / 2 >= 92);
      assert.equal(current.canvasWidth, width);
      assert.equal(current.copyWidth, opening.copyWidth);
      assert.ok(current.invitationX + current.invitationWidth <= current.frameWidth + 0.0001);
      assert.ok(current.invitationY + 54 < current.frameHeight);
      if (current.contactOpacity > 0) {
        assert.ok(current.invitationX + current.contactX + 236 < current.frameWidth);
        assert.ok(current.contactX - current.buttonWidth >= 24 - 0.0001);
      }
      assert.ok(current.invitationX + current.buttonX + current.buttonWidth <= current.frameWidth);
      // A partially visible portrait must never leave the action floating away
      // from its copy or overlap it while the card changes width.
      assert.equal(current.invitationX + current.buttonX, current.copyX);
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
  assert.deepEqual(at(0), at(0.04));
  assert.deepEqual(at(0.94), at(1));
  assert.equal(at(1).sideOpacity, 0);
  assert.equal(at(1).contactOpacity, 1);
  assert.equal(at(1).invitationX, at(1).copyX);
  assert.ok(at(1).invitationY + 54 <= at(1).frameHeight - 80);
  const forward = Array.from({length:101}, (_,i) => at(i/100));
  const reverse = Array.from({length:101}, (_,i) => at((100-i)/100)).reverse();
  assert.deepEqual(forward, reverse);
});

test('pin release joins stationary and normal scrolling without a velocity jump', () => {
  for (const length of [180, 216, 270, 280]) {
    assert.ok(Math.abs(peopleRelease(-10, length)) === 0);
    assert.equal(peopleRelease(length + 10, length), -length / 2);
    const entrySpeed = -(peopleRelease(.01, length) - peopleRelease(0, length)) / .01;
    const exitSpeed = -(peopleRelease(length, length) - peopleRelease(length - .01, length)) / .01;
    assert.ok(entrySpeed < .001);
    assert.ok(Math.abs(exitSpeed - 1) < .001);
  }
});

test('direct sticky release has no residual displacement', () => {
  for (const y of [-100, 0, 10, 300, 1000]) assert.equal(peopleRelease(y, 0), 0);
});


test('arrival meets the centred pin without speed or acceleration discontinuities', () => {
  for (const distance of [112, 128, 144, 160]) {
    const centre = 160;
    const top = scroll => Math.max(centre - distance / 2, centre - distance / 2 - scroll) + peopleArrival(scroll, distance);
    const h = .1;
    const speed = scroll => (top(scroll + h) - top(scroll - h)) / (2 * h);
    const acceleration = scroll => (top(scroll + h) - 2 * top(scroll) + top(scroll - h)) / (h * h);
    assert.equal(top(0), centre);
    assert.equal(top(100), centre);
    assert.ok(Math.abs(speed(-distance) + 1) < .0001);
    assert.ok(Math.abs(speed(0)) < .0001);
    assert.ok(Math.abs(acceleration(-distance)) < .0001);
    assert.ok(Math.abs(acceleration(0)) < .0001);
    for (let scroll = -distance; scroll <= 0; scroll += 1) {
      assert.ok(top(scroll) >= centre);
      assert.ok(speed(scroll) >= -1.00001 && speed(scroll) <= .00001);
    }
  }
});

test('release acceleration also meets stationary and normal page motion', () => {
  const distance = 216;
  const offset = scroll => scroll <= distance ? peopleRelease(scroll, distance) : -distance / 2 - (scroll - distance);
  const h = .1;
  const acceleration = scroll => (offset(scroll + h) - 2 * offset(scroll) + offset(scroll - h)) / (h * h);
  assert.ok(Math.abs(acceleration(0)) < .0001);
  assert.ok(Math.abs(acceleration(distance)) < .0001);
});
