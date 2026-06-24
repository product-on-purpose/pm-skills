// scripts/check-sample-counts.test.mjs - units for the sample-count gate (pure functions).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countSamples, checkClaims } from './check-sample-counts.mjs';

/** Fake readdirSync: top-level call (withFileTypes) lists the skill dirs; per-dir call lists files. */
function fakeRd(tree) {
  return (p, opts) => {
    if (opts && opts.withFileTypes) {
      return Object.keys(tree).map((name) => ({ name, isDirectory: () => true }));
    }
    const base = String(p).replace(/\\/g, '/').split('/').pop();
    return tree[base] || [];
  };
}

test('countSamples counts sample_*.md files and the dirs holding at least one', () => {
  const tree = {
    'skill-a': ['sample_x_storevine_1.md', 'sample_y_brainshelf_2.md', 'README.md'],
    'skill-b': ['sample_z_workbench_3.md'],
    'skill-empty': ['README.md', 'notes.txt'],
  };
  const got = countSamples('/root', fakeRd(tree));
  assert.equal(got.total, 3);
  assert.equal(got.sampledSkills, 2);
});

test('checkClaims passes when the captured number matches', () => {
  const f = checkClaims('x', '210 sample outputs across 63 PM skills', [
    { re: /(\d+) sample outputs across \d+ PM skills/, name: 'total', expect: 210 },
  ]);
  assert.deepEqual(f, []);
});

test('checkClaims flags a stale number with both values', () => {
  const f = checkClaims('README_SAMPLES.md', '207 sample outputs across 62 PM skills', [
    { re: /(\d+) sample outputs across \d+ PM skills/, name: 'total samples', expect: 210 },
  ]);
  assert.equal(f.length, 1);
  assert.match(f[0], /says 207, actual 210/);
});

test('checkClaims flags a missing pattern (reworded surface)', () => {
  const f = checkClaims('samples/index.md', 'no count table here', [
    { re: /Total samples \| (\d+)/, name: 'total samples', expect: 210 },
  ]);
  assert.equal(f.length, 1);
  assert.match(f[0], /not found/);
});
