import test from 'node:test';
import assert from 'node:assert/strict';
import { stepScenePlayback, MIN_SCENE_RATE, MAX_SCENE_RATE } from '../src/concepts/a/scenePlayback.ts';

const frame = (overrides = {}) => stepScenePlayback({
  elapsed: 0, duration: 5800, rate: 1, delta: 16, velocity: 0, progress: 0.3,
  ...overrides,
});

test('resting playback advances at the authored pace', () => {
  assert.deepEqual(frame(), { elapsed: 16, rate: 1 });
});

test('large scroll impulses accelerate gradually and stay bounded', () => {
  let state = { elapsed: 0, rate: 1 };
  const first = frame({ velocity: 100, progress: 0.8 });
  assert.ok(first.rate > 1 && first.rate < 1.1);
  for (let i = 0; i < 240; i++) {
    const next = frame({ ...state, velocity: 100, progress: 0.8 });
    assert.ok(next.rate >= MIN_SCENE_RATE && next.rate <= MAX_SCENE_RATE);
    assert.ok(next.elapsed >= state.elapsed);
    assert.ok(next.elapsed - state.elapsed <= 16 * MAX_SCENE_RATE);
    state = next;
  }
  assert.equal(state.elapsed, 5800);
});

test('stopping eases back to reading speed instead of snapping', () => {
  let state = { elapsed: 0, rate: 1.9 };
  const first = frame(state);
  assert.ok(first.rate < 1.9 && first.rate > 1.8);
  for (let i = 0; i < 180; i++) state = frame(state);
  assert.ok(Math.abs(state.rate - 1) < 0.001);
});

test('reverse and slow scroll cannot rewind or stall the scene', () => {
  let state = { elapsed: 300, rate: 1 };
  for (const velocity of [-4, -0.2, 0.1, 0, 0.05, 4]) {
    const next = frame({ ...state, velocity });
    assert.ok(next.elapsed > state.elapsed);
    assert.ok(next.rate >= MIN_SCENE_RATE && next.rate <= MAX_SCENE_RATE);
    state = next;
  }
});

test('a delayed frame cannot jump straight through the story', () => {
  const next = frame({ delta: 10000, velocity: 50, progress: 0.95 });
  assert.ok(next.elapsed <= 64 * MAX_SCENE_RATE);
});

test('completed playback stays on its final frame', () => {
  assert.equal(frame({ elapsed: 5800, velocity: -100 }).elapsed, 5800);
});
