// scripts/check-skill-page-sections.test.mjs - units for the skill-page completeness guard.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderedHeadings, missingSections } from './check-skill-page-sections.mjs';

test('renderedHeadings extracts H2 headings only, lowercased', () => {
  const md = '# Title\n## When to Use\nbody\n### sub\nmore\n## Hard gate\nx';
  const h = renderedHeadings(md);
  assert.ok(h.has('when to use'));
  assert.ok(h.has('hard gate'));
  assert.ok(!h.has('sub'), 'H3 headings are not H2 sections');
  assert.ok(!h.has('title'), 'H1 title is not an H2 section');
});

test('missingSections is empty when every section renders (case-insensitive match)', () => {
  const md = '## When to Use\nx\n## Hard gate\ny';
  // SKILL.md used lowercase "When to use"; the page renders canonical "When to Use" - still a match.
  assert.deepEqual(missingSections(['When to use', 'Hard gate'], md), []);
});

test('missingSections flags a section the page does not render', () => {
  const md = '## When to Use\nx';
  assert.deepEqual(missingSections(['When to Use', 'Modes'], md), ['Modes']);
});

test('extra page headings (from templates/examples) do not cause false negatives', () => {
  const md = '## Instructions\nx\n## Output Template\n## Verdict\n## Biggest risk';
  assert.deepEqual(missingSections(['Instructions'], md), []);
});
