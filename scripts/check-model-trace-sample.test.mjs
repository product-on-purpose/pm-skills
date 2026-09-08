import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { findPlaceholders } from './check-sample-no-placeholders.mjs';
import { fabricatedMetrics } from './check-sample-no-fabricated-metrics.mjs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const dir = 'library/skill-output-samples/measure-instrumentation-spec';
const sample = read(`${dir}/sample_measure-instrumentation-spec_brainshelf_resurface-model-traces.md`);
const template = read('skills/measure-instrumentation-spec/references/TEMPLATE.md');
const headings = (text) => [...text.matchAll(/^#{2,3} (.+)$/gm)].map((m) => m[1]);

test('model trace sample follows template section order, including conditional privacy and QA sections', () => {
  const expected = headings(template).filter((h) => !h.startsWith('['));
  const actual = headings(sample.split('## Output\n')[1]).filter((h) => !h.startsWith('resurface_'));
  assert.deepEqual(actual, expected);
  const questions = (text) => [...text.matchAll(/^\| \*\*(.+?)\*\* \|/gm)].map((m) => m[1]);
  const traceTable = (text) => text.split('### Model Trace Capture\n')[1].split('## Implementation Notes')[0];
  assert.deepEqual(questions(traceTable(sample)), questions(traceTable(template)));
});

test('model trace sample has no placeholder or unmarked percentage, even without prompt attribution', () => {
  assert.deepEqual(findPlaceholders(sample), []);
  assert.deepEqual(fabricatedMetrics(sample, ''), []);
  // Ensure the advisory would catch an accidental loss of the fictional marker.
  assert.ok(fabricatedMetrics(sample.replaceAll('[fictional]', ''), '').includes('5%'));
});

test('ordinary instrumentation samples keep trace capture conditional', () => {
  for (const [thread, context] of [['brainshelf', 'resurface'], ['storevine', 'campaigns'], ['workbench', 'blueprints']]) {
    const ordinary = read(`${dir}/sample_measure-instrumentation-spec_${thread}_${context}.md`);
    assert.ok(!headings(ordinary).includes('Model Trace Capture'));
    assert.ok(!headings(ordinary).includes('Trace Capture Validation'));
  }
});
