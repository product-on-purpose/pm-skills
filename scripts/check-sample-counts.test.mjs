// scripts/check-sample-counts.test.mjs - units for the sample-count gate (pure functions).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countSamples, countThreads, checkThreadTrio, checkClaims } from './check-sample-counts.mjs';

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

/** Fake readFileSync keyed by basename, so a fixture can hand each sample its own frontmatter. */
function fakeRead(contents) {
  return (p) => contents[String(p).replace(/\\/g, '/').split('/').pop()] ?? '';
}

const fm = (thread) => `---\nartifact: prd\nthread: ${thread}\n---\n\nbody\n`;

test('countThreads buckets the canonical trio and leaves outside at zero', () => {
  const tree = { 'skill-a': ['sample_a_storevine_1.md', 'sample_b_brainshelf_2.md'], 'skill-b': ['sample_c_workbench_3.md'] };
  const contents = {
    'sample_a_storevine_1.md': fm('storevine'),
    'sample_b_brainshelf_2.md': fm('brainshelf'),
    'sample_c_workbench_3.md': fm('workbench'),
  };
  const got = countThreads('/root', fakeRd(tree), fakeRead(contents));
  assert.deepEqual(got, { storevine: 1, brainshelf: 1, workbench: 1, outside: 0 });
});

test('countThreads counts a misspelled or missing thread as outside', () => {
  const tree = { 'skill-a': ['sample_a_storevine_1.md', 'sample_b_typo_2.md', 'sample_c_none_3.md'] };
  const contents = {
    'sample_a_storevine_1.md': fm('storevine'),
    'sample_b_typo_2.md': fm('storvine'), // one transposed letter
    'sample_c_none_3.md': '---\nartifact: prd\n---\n\nbody\n', // no thread: field at all
  };
  const got = countThreads('/root', fakeRd(tree), fakeRead(contents));
  assert.equal(got.storevine, 1);
  assert.equal(got.outside, 2);
});

test('checkThreadTrio fires on a non-zero outside bucket', () => {
  const f = checkThreadTrio({ storevine: 73, brainshelf: 65, workbench: 64, outside: 2 });
  assert.equal(f.length, 1);
  assert.match(f[0], /2 sample\(s\) carry a missing or unrecognized thread:/);
});

test('checkThreadTrio is silent when every sample is on the trio', () => {
  assert.deepEqual(checkThreadTrio({ storevine: 73, brainshelf: 65, workbench: 64, outside: 0 }), []);
});

test('the spread reconciliation alone cannot catch a stray thread, which is why checkThreadTrio exists', () => {
  // A misspelled thread still balances: outside is one of the addends summed against the total.
  const th = { storevine: 72, brainshelf: 65, workbench: 64, outside: 1 };
  assert.equal(th.storevine + th.brainshelf + th.workbench + th.outside, 202);
  assert.equal(checkThreadTrio(th).length, 1);
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
