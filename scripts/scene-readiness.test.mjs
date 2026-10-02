import test from 'node:test';
import assert from 'node:assert/strict';
import { sceneRevealAmount } from '../src/concepts/a/sceneReadiness.ts';

test('desktop and portrait scenes retain their authored visibility threshold', () => {
  assert.equal(sceneRevealAmount({ width: 655, height: 655 }, { width: 1440, height: 900 }), 0.42);
  assert.equal(sceneRevealAmount({ width: 350, height: 350 }, { width: 390, height: 844 }), 0.42);
});

test('a scene taller than the viewport can progress before its far edge arrives', () => {
  const scene = { width: 715, height: 715 };
  const amount = sceneRevealAmount(scene, { width: 1920, height: 300 });
  assert.ok(amount * scene.height <= 225);
  assert.ok(amount * scene.height > 200);
  assert.ok(amount < 300 / scene.height);
});

test('oversized scenes account for both dimensions of the visible area', () => {
  const amount = sceneRevealAmount({ width: 1000, height: 800 }, { width: 500, height: 300 });
  assert.ok(amount * 1000 * 800 < 500 * 300);
  assert.ok(amount > 0);
});

test('resizing restores the ordinary threshold; unmeasured boxes remain safe', () => {
  const scene = { width: 715, height: 715 };
  assert.ok(sceneRevealAmount(scene, { width: 1920, height: 300 }) < 0.42);
  assert.equal(sceneRevealAmount(scene, { width: 1920, height: 900 }), 0.42);
  assert.equal(sceneRevealAmount({ width: 0, height: 0 }, { width: 1920, height: 900 }), 0.42);
});
