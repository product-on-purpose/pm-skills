// hooks/lib/phase-map.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { buildPhaseMap, skillsForPhase } from './phase-map.mjs';

const FIX = join(import.meta.dirname, '..', 'fixtures', 'skills');

test('buildPhaseMap groups skills by phase', () => {
  const map = buildPhaseMap(FIX);
  assert.deepEqual(map.define, ['define-x']);
  assert.deepEqual(map.deliver, ['deliver-y']);
});

test('skillsForPhase returns [] for an unknown phase', () => {
  assert.deepEqual(skillsForPhase(buildPhaseMap(FIX), 'measure'), []);
});

test('buildPhaseMap returns {} for a missing dir (fail safe)', () => {
  assert.deepEqual(buildPhaseMap('/no/such/dir'), {});
});
