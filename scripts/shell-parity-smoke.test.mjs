// scripts/shell-parity-smoke.test.mjs - unit tests for the WS-T9 dual-shell smoke's
// pure verdict normalizer. The live smoke (spawning bash + pwsh) is exercised by the
// advisory validation.yml step; here we lock the normalization contract that makes the
// two shells' differently-serialized output comparable.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeVerdict } from './shell-parity-smoke.mjs';

// pwsh prints one finding per line; bash concatenates them on a single line because
// command substitution strips the inter-group newline. Both must normalize equal.
const PWSH_STYLE = [
  '=== Count Consistency Check ===',
  '',
  'Actual counts:',
  '  Skills:    3',
  'Stale counts found:',
  '',
  "  counts.md:8: found '12 skills' (actual: 3)",
  "  counts.md:9: found '20 commands' (actual: 1)",
  "  counts.md:10: found '15 workflows' (actual: 1)",
  '',
  'FAIL: One or more hardcoded counts are stale.',
].join('\n');

const BASH_STYLE = [
  'Stale counts found:',
  '',
  "  counts.md:8: found '12 skills' (actual: 3)  counts.md:9: found '20 commands' (actual: 1)  counts.md:10: found '15 workflows' (actual: 1)",
  '',
  'FAIL: One or more hardcoded counts are stale.',
].join('\n');

const EXPECTED = [
  "counts.md:10: found '15 workflows' (actual: 1)",
  "counts.md:8: found '12 skills' (actual: 3)",
  "counts.md:9: found '20 commands' (actual: 1)",
  'EXIT 1',
  '',
].join('\n');

test('newline-serialized (pwsh) and concatenated (bash) output normalize identically', () => {
  assert.equal(normalizeVerdict(PWSH_STYLE, 1), EXPECTED);
  assert.equal(normalizeVerdict(BASH_STYLE, 1), EXPECTED);
  assert.equal(normalizeVerdict(PWSH_STYLE, 1), normalizeVerdict(BASH_STYLE, 1));
});

test('normalization is order-independent (sorted finding set)', () => {
  const reordered = [
    "  counts.md:9: found '20 commands' (actual: 1)",
    "  counts.md:10: found '15 workflows' (actual: 1)",
    "  counts.md:8: found '12 skills' (actual: 3)",
  ].join('\n');
  assert.equal(normalizeVerdict(reordered, 1), EXPECTED);
});

test('CRLF and LF produce the same verdict', () => {
  assert.equal(normalizeVerdict(PWSH_STYLE.replace(/\n/g, '\r\n'), 1), EXPECTED);
});

test('a clean run (no findings) is just the exit code', () => {
  assert.equal(normalizeVerdict('PASS: No stale counts found in tracked .md or .json files.\n', 0), 'EXIT 0\n');
  assert.equal(normalizeVerdict('', 0), 'EXIT 0\n');
});

test('a different finding SET is a real divergence (not normalized away)', () => {
  const other = "  counts.md:8: found '13 skills' (actual: 3)\n"; // 13, not 12
  assert.notEqual(normalizeVerdict(other, 1), EXPECTED);
});

test('parenthetical descriptions (inner parens) are captured, non-greedy on "(actual:")', () => {
  // The "<bucket> skills (N)" finding form embeds parens in the description; the
  // non-greedy match must stop at " (actual:" and keep the whole description.
  const v = normalizeVerdict("  ecosystem.md:30: found 'skills (40)' (actual: 68)\n", 1);
  assert.equal(v, "ecosystem.md:30: found 'skills (40)' (actual: 68)\nEXIT 1\n");
});
