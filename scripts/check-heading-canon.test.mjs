// scripts/check-heading-canon.test.mjs - units for the heading-canon gate (pure functions).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CANON_HEADINGS,
  baseHeadingText,
  extractHeadings,
  checkHeadings,
} from './check-heading-canon.mjs';

test('baseHeadingText trims and strips a trailing version parenthetical', () => {
  assert.equal(baseHeadingText('Output Contract (v1.2.0)'), 'Output Contract');
  assert.equal(baseHeadingText('  Quality Checklist  '), 'Quality Checklist');
  assert.equal(baseHeadingText('Output Contract'), 'Output Contract');
});

test('extractHeadings finds h2 headings only, 1-based line numbers, EOL-agnostic', () => {
  const text = [
    '# Skill Title',                 // 1 (h1, not extracted)
    '',                              // 2
    '## When to Use',                // 3
    '',                              // 4
    '### A subsection',              // 5 (h3, not extracted)
    '## Instructions',               // 6
  ].join('\r\n');
  const got = extractHeadings(text);
  assert.deepEqual(got, [
    { n: 3, text: 'When to Use' },
    { n: 6, text: 'Instructions' },
  ]);
});

test('extractHeadings does not mistake an h3 tail for an h2 (anchored match)', () => {
  // "### Foo" must not be read as "## " + "# Foo" by an unanchored regex.
  const got = extractHeadings('### Foo\n## Bar');
  assert.deepEqual(got, [{ n: 2, text: 'Bar' }]);
});

test('checkHeadings passes a fully canon-conformant fixture', () => {
  const text = [
    '## When to Use',
    '## When NOT to Use',
    '## Instructions',
    '## Output Format',
    '## Quality Checklist',
    '## Examples',
  ].join('\n');
  assert.deepEqual(checkHeadings('good/SKILL.md', text), []);
});

test('checkHeadings passes "Output Contract (vX.Y.Z)" - the version suffix is not a deviation', () => {
  const text = '## Output Contract (v1.0.0)\n## Quality Checklist';
  assert.deepEqual(checkHeadings('versioned/SKILL.md', text), []);
});

test('checkHeadings flags "Quality checklist" (lowercase c)', () => {
  const f = checkHeadings('x/SKILL.md', '## Quality checklist');
  assert.equal(f.length, 1);
  assert.match(f[0], /x\/SKILL\.md:1: "## Quality checklist" should be "## Quality Checklist"/);
});

test('checkHeadings flags "When NOT to use" (lowercase u) - the build-risk-review regression', () => {
  const f = checkHeadings('foundation-build-risk-review/SKILL.md', '## When NOT to use');
  assert.equal(f.length, 1);
  assert.match(f[0], /should be "## When NOT to Use"/);
});

test('checkHeadings flags "Output format" (lowercase f)', () => {
  const f = checkHeadings('x/SKILL.md', '## Output format');
  assert.equal(f.length, 1);
  assert.match(f[0], /should be "## Output Format"/);
});

test('checkHeadings reports the correct 1-based line number for a mid-file deviation', () => {
  const text = '## When to Use\n\n## Quality checklist\n\n## Examples';
  const f = checkHeadings('x/SKILL.md', text);
  assert.equal(f.length, 1);
  assert.match(f[0], /^x\/SKILL\.md:3:/);
});

test('checkHeadings ignores a bespoke heading that matches no canon string at all', () => {
  // "Zero-friction execution", a bare "Output", and "See also" are out of this gate's
  // scope (v2.30.0 does not require dialect-skeleton completeness, only spelling of the
  // headings a skill already has). None case-insensitively equals a canon string.
  const text = [
    '## When to Use',
    '## Zero-friction execution',
    '## Output',
    '## See also',
  ].join('\n');
  assert.deepEqual(checkHeadings('x/SKILL.md', text), []);
});

test('checkHeadings ignores a dialect-exclusive heading outside the checked canon set', () => {
  // Identity / Core principle / Common Pitfalls etc. are deliberately not in
  // CANON_HEADINGS for v2.30.0 (see the script header comment); a lowercase variant of
  // one of those is not flagged by this gate this release.
  const text = '## Identity\n## Common pitfalls';
  assert.deepEqual(checkHeadings('x/SKILL.md', text, CANON_HEADINGS), []);
});

test('checkHeadings flags multiple deviations in the same file, each with its own line', () => {
  const text = '## When NOT to use\n\n## Output format\n\n## Quality checklist';
  const f = checkHeadings('foundation-build-risk-review/SKILL.md', text);
  assert.equal(f.length, 3);
  assert.match(f[0], /:1: .* should be "## When NOT to Use"/);
  assert.match(f[1], /:3: .* should be "## Output Format"/);
  assert.match(f[2], /:5: .* should be "## Quality Checklist"/);
});
