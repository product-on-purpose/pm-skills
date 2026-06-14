// scripts/check-new-skill-collision.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { derivePartners, collisionTasks, collisionVerdict } from './check-new-skill-collision.mjs';

const fixtures = {
  'new-skill': {
    skill: 'new-skill',
    queries: [
      { q: 'trigger me 1', expect: 'trigger', split: 'train' },
      { q: 'trigger me 2', expect: 'trigger', split: 'validation' },
      { q: 'this belongs to neighbor-a', expect: 'no-trigger', split: 'train', near_miss_of: 'neighbor-a' },
      { q: 'unrelated negative', expect: 'no-trigger', split: 'train' },
    ],
  },
  'neighbor-a': {
    skill: 'neighbor-a',
    queries: [
      { q: 'neighbor-a trigger 1', expect: 'trigger', split: 'train' },
      { q: 'neighbor-a trigger 2', expect: 'trigger', split: 'validation' },
      { q: 'this belongs to new-skill', expect: 'no-trigger', split: 'train', near_miss_of: 'new-skill' },
    ],
  },
  'unrelated': {
    skill: 'unrelated',
    queries: [{ q: 'unrelated trigger', expect: 'trigger', split: 'train' }],
  },
};

test('derivePartners finds neighbors in both directions and excludes self/unrelated', () => {
  assert.deepEqual(derivePartners('new-skill', fixtures), ['neighbor-a']);
});

test('derivePartners unions curated extras and stays sorted, deduped', () => {
  assert.deepEqual(derivePartners('new-skill', fixtures, ['zeta', 'neighbor-a']), ['neighbor-a', 'zeta']);
});

test('derivePartners with no neighbors returns empty', () => {
  const lone = { 'lonely': { skill: 'lonely', queries: [{ q: 'x', expect: 'trigger', split: 'train' }] } };
  assert.deepEqual(derivePartners('lonely', lone), []);
});

test('collisionTasks builds recall + precision + no-theft tasks with the right assertions', () => {
  const tasks = collisionTasks('new-skill', fixtures, ['neighbor-a']);
  const recall = tasks.filter((t) => t.kind === 'recall');
  const precision = tasks.filter((t) => t.kind === 'precision');
  const noTheft = tasks.filter((t) => t.kind === 'no-theft');

  assert.equal(recall.length, 2);
  assert.ok(recall.every((t) => t.mustPick === 'new-skill'));

  assert.equal(precision.length, 1);
  assert.equal(precision[0].mustNotPick, 'new-skill');
  assert.equal(precision[0].expectPick, 'neighbor-a');

  // Only the partner's TRIGGER queries become no-theft tasks (its no-trigger query is skipped).
  assert.equal(noTheft.length, 2);
  assert.ok(noTheft.every((t) => t.owner === 'neighbor-a' && t.mustNotPick === 'new-skill'));
});

test('collisionVerdict passes when every query routes correctly', () => {
  const tasks = collisionTasks('new-skill', fixtures, ['neighbor-a']);
  const scored = tasks.map((t) => ({ ...t, pick: t.kind === 'recall' ? 'new-skill' : t.expectPick }));
  const v = collisionVerdict(scored, 'new-skill');
  assert.equal(v.pass, true);
  assert.equal(v.theftFails.length + v.recallFails.length + v.precisionFails.length, 0);
});

test('collisionVerdict flags theft when a neighbor query routes to the new skill', () => {
  const tasks = collisionTasks('new-skill', fixtures, ['neighbor-a']);
  const scored = tasks.map((t) => ({ ...t, pick: t.kind === 'no-theft' ? 'new-skill' : (t.kind === 'recall' ? 'new-skill' : t.expectPick) }));
  const v = collisionVerdict(scored, 'new-skill');
  assert.equal(v.pass, false);
  assert.equal(v.theftFails.length, 2);
});

test('collisionVerdict flags recall and precision failures', () => {
  const tasks = collisionTasks('new-skill', fixtures, ['neighbor-a']);
  const scored = tasks.map((t) => {
    if (t.kind === 'recall') return { ...t, pick: 'someone-else' };   // missed own query
    if (t.kind === 'precision') return { ...t, pick: 'new-skill' };   // fired on a neighbor query
    return { ...t, pick: t.expectPick };
  });
  const v = collisionVerdict(scored, 'new-skill');
  assert.equal(v.recallFails.length, 2);
  assert.equal(v.precisionFails.length, 1);
  assert.equal(v.theftFails.length, 0);
  assert.equal(v.pass, false);
});
