// scripts/check-count-phrases.test.mjs - units for the count-phrase gate (pure functions).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  deriveCatalog,
  deriveAgents,
  deriveSampleFloor,
  scannableLines,
  manifestHeadline,
  manifestDescriptions,
  scanUnit,
} from './check-count-phrases.mjs';

/** Fake fs for deriveCatalog: top-level withFileTypes call lists skill dirs; readFile returns
 *  the frontmatter for skills/<name>/SKILL.md, or throws for a dir without one. */
function fakeCatalogFs(skills) {
  const rd = (p, opts) => (opts && opts.withFileTypes
    ? Object.keys(skills).map((name) => ({ name, isDirectory: () => true }))
    : []);
  const rf = (p) => {
    const parts = String(p).replace(/\\/g, '/').split('/');
    const name = parts[parts.length - 2];
    if (name in skills && skills[name] !== null) return skills[name];
    throw new Error('no SKILL.md');
  };
  return { rd, rf };
}

/** Fake readdir for the sample tree (mirrors check-sample-counts.test.mjs). */
function fakeSampleRd(tree) {
  return (p, opts) => {
    if (opts && opts.withFileTypes) return Object.keys(tree).map((name) => ({ name, isDirectory: () => true }));
    const base = String(p).replace(/\\/g, '/').split('/').pop();
    return tree[base] || [];
  };
}

const fm = (line) => `---\nname: x\nlicense: Apache-2.0\nmetadata:\n  ${line}\n  version: "1.0.0"\n---\n`;

test('deriveCatalog derives total + the four family sub-counts from frontmatter', () => {
  const { rd, rf } = fakeCatalogFs({
    'define-x': fm('phase: define'),
    'deliver-y': fm('phase: deliver'),
    'foundation-a': fm('classification: foundation'),
    'foundation-b': fm('classification: foundation'),
    'utility-c': fm('classification: utility'),
    'tool-d': fm('classification: tool'),
  });
  const got = deriveCatalog('/skills', rd, rf);
  assert.equal(got.total, 6);
  assert.equal(got.phase, 2);
  assert.equal(got.foundation, 2);
  assert.equal(got.utility, 1);
  assert.equal(got.tool, 1);
});

test('deriveCatalog counts total from dirs and skips a dir with no SKILL.md', () => {
  const { rd, rf } = fakeCatalogFs({ 'define-x': fm('phase: define'), 'broken-dir': null });
  const got = deriveCatalog('/skills', rd, rf);
  assert.equal(got.total, 1);
  assert.equal(got.phase, 1);
});

test('deriveAgents counts *.md and excludes the chain config and README', () => {
  const rd = () => ['pm-critic.md', 'pm-skill-router.md', 'pm-workflow-orchestrator.md', '_chain-permitted.yaml', 'README.md'];
  assert.equal(deriveAgents('/agents', rd), 3);
});

test('deriveSampleFloor counts sample_*.md across dirs', () => {
  const tree = {
    'skill-a': ['sample_x_storevine_1.md', 'sample_y_brainshelf_2.md', 'README.md'],
    'skill-b': ['sample_z_workbench_3.md'],
    'skill-empty': ['README.md'],
  };
  assert.equal(deriveSampleFloor('/root', fakeSampleRd(tree)), 3);
});

test('scannableLines keeps fenced content and drops only count-exempt ranges', () => {
  const text = [
    'line 1 keep',                     // 1 keep
    '```',                             // 2 keep (fence marker; harmless, no phrase)
    '68 skill definitions in a tree',  // 3 keep (fenced File Structure claim IS scanned)
    '```',                             // 4 keep
    '<!-- count-exempt:start -->',      // 5 marker
    '24 PM skills historical',          // 6 dropped (exempt)
    '<!-- count-exempt:end -->',        // 7 marker
    'line 8 keep',                     // 8 keep
  ].join('\n');
  const kept = scannableLines(text).map((l) => l.n);
  assert.deepEqual(kept, [1, 2, 3, 4, 8]);
});

test('manifestHeadline truncates at the first version token', () => {
  const desc = '68 PM skills plus 6 sub-agents covering the lifecycle. v2.29.1 is a patch. '
    + 'v2.17.0 registration: all 4 sub-agents auto-discover.';
  const head = manifestHeadline(desc);
  assert.match(head, /68 PM skills plus 6 sub-agents/);
  assert.doesNotMatch(head, /4 sub-agents/); // the frozen narration is not in the headline
});

test('manifestHeadline returns the whole string when there is no version token', () => {
  const desc = '68 product management skills across the full product lifecycle.';
  assert.equal(manifestHeadline(desc), desc);
});

test('manifestDescriptions collects nested description strings', () => {
  const marketplaceLike = {
    description: 'top-level blurb',
    plugins: [{ name: 'pm-skills', description: '68 PM skills plus 6 sub-agents' }],
    interface: { shortDescription: 'short', longDescription: 'long form' },
  };
  const got = manifestDescriptions(marketplaceLike);
  assert.ok(got.includes('68 PM skills plus 6 sub-agents'));
  assert.ok(got.includes('top-level blurb'));
  assert.ok(got.includes('long form'));
  assert.ok(got.includes('short'));
});

const TRUTH = { skills: 68, sample: 210, subagents: 6 };
const asLine = (text) => [{ n: 1, text }];

test('scanUnit passes a good fixture (all variants correct)', () => {
  const lines = [
    { n: 1, text: '68 shipped PM skills in skills/' },
    { n: 2, text: 'All 68 skill definitions (30 phase + 11 foundation + 12 utility + 15 tool)' },
    { n: 3, text: 'all 68 PM skills as markdown files' },
    { n: 4, text: 'templates, sub-agents, and 200+ sample outputs' },
    { n: 5, text: 'plus 6 sub-agents covering the lifecycle' },
  ];
  assert.deepEqual(scanUnit('good', lines, TRUTH), []);
});

test('scanUnit flags a hand-broken "shipped PM skills" count', () => {
  const f = scanUnit('QUICKSTART.md', asLine('67 shipped PM skills in skills/'), TRUTH);
  assert.equal(f.length, 1);
  assert.match(f[0], /QUICKSTART\.md:1: "67 shipped PM skills" says 67, actual skills count 68/);
});

test('scanUnit flags a hand-broken "skill definitions" count', () => {
  const f = scanUnit('x', asLine('All 67 skill definitions'), TRUTH);
  assert.equal(f.length, 1);
  assert.match(f[0], /says 67, actual skills count 68/);
});

test('scanUnit "N+" sample floor passes when N <= actual and fails when N > actual', () => {
  assert.deepEqual(scanUnit('x', asLine('200+ sample outputs'), TRUTH), []);
  const f = scanUnit('x', asLine('300+ sample outputs'), TRUTH);
  assert.equal(f.length, 1);
  assert.match(f[0], /floor 300 exceeds actual sample count 210/);
});

test('scanUnit a bare per-skill "3 samples" mention is not treated as a corpus total', () => {
  // The sample form requires a "+"; a bare count is out of scope (check-sample-counts owns it).
  assert.deepEqual(scanUnit('x', asLine('each sampled skill has 2-3 samples'), TRUTH), []);
});

test('scanUnit checks the sub-agent axis (exact) for both "All N" and "N" forms', () => {
  assert.deepEqual(scanUnit('x', asLine('All 6 sub-agents ship'), TRUTH), []);
  const f = scanUnit('platforms.md', asLine('All 4 sub-agents ship with dispatch skills'), TRUTH);
  assert.equal(f.length, 1);
  assert.match(f[0], /"4 sub-agents" says 4, actual subagents count 6/);
});

test('scanUnit ignores a historical count wrapped in count-exempt (end to end)', () => {
  const text = [
    '<!-- count-exempt:start -->',
    '| v1.0.0 | First baseline: 24 PM skills across 6 phases |',
    '<!-- count-exempt:end -->',
  ].join('\n');
  assert.deepEqual(scanUnit('README.md', scannableLines(text), TRUTH), []);
});

test('scanUnit ignores a phrase inside an inline-code span', () => {
  // Illustrative code sample, not a live claim: stripped before matching.
  assert.deepEqual(scanUnit('x', asLine('example: `67 PM skills`'), TRUTH), []);
});
