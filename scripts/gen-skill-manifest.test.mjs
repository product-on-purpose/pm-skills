// scripts/gen-skill-manifest.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseFrontmatter, buildEntry, headingName, renderManifest, renderAgentsBlock,
  spliceAgents, MARKER_START, MARKER_END,
} from './gen-skill-manifest.mjs';

const skillText = (name, metaLines) => `---\nname: ${name}\ndescription: Does the thing. Use when the thing is needed.\nlicense: Apache-2.0\nmetadata:\n${metaLines}\n---\n\n# Body\n`;
const FACTS = { references: ['TEMPLATE.md', 'EXAMPLE.md'], sample: null };

test('parseFrontmatter rejects missing block and bad YAML with path context', () => {
  assert.throws(() => parseFrontmatter('# no frontmatter', 'x/SKILL.md'), /x\/SKILL.md: no frontmatter/);
  assert.throws(() => parseFrontmatter('---\n: : :\n---\n', 'x/SKILL.md'), /x\/SKILL.md: frontmatter does not parse/);
});

test('buildEntry maps a phase skill', () => {
  const e = buildEntry('deliver-prd', skillText('deliver-prd', '  phase: deliver\n  version: "2.1.0"'), FACTS);
  assert.equal(e.group, 'phase');
  assert.equal(e.phase, 'deliver');
  assert.equal(e.version, '2.1.0');
  assert.equal(e.family, null);
  assert.equal(e.path, 'skills/deliver-prd');
});

test('buildEntry maps a tool-family skill with family + move', () => {
  const e = buildEntry('tool-design-sprint-brief', skillText('tool-design-sprint-brief', '  classification: tool\n  version: "0.1.0"\n  tool: design-sprint\n  move: brief'), FACTS);
  assert.equal(e.group, 'tool');
  assert.equal(e.family, 'design-sprint');
  assert.equal(e.move, 'brief');
});

test('buildEntry fails loudly on name mismatch, missing version, unknown group', () => {
  assert.throws(() => buildEntry('a', skillText('b', '  phase: deliver\n  version: "1.0.0"'), FACTS), /does not match directory/);
  assert.throws(() => buildEntry('a', skillText('a', '  phase: deliver'), FACTS), /metadata.version/);
  assert.throws(() => buildEntry('a', skillText('a', '  classification: mystery\n  version: "1.0.0"'), FACTS), /neither metadata.phase nor/);
});

test('headingName strips the group prefix except for tools', () => {
  assert.equal(headingName({ group: 'phase', phase: 'deliver', name: 'deliver-prd' }), 'prd');
  assert.equal(headingName({ group: 'foundation', name: 'foundation-persona' }), 'persona');
  assert.equal(headingName({ group: 'tool', name: 'tool-note-and-vote' }), 'tool-note-and-vote');
});

test('renderManifest is byte-stable across calls', () => {
  const e = buildEntry('deliver-prd', skillText('deliver-prd', '  phase: deliver\n  version: "2.1.0"'), FACTS);
  const m = { schema: 1, generated_by: 'x', catalog: { skills: 1 }, entries: [e] };
  assert.equal(renderManifest(m), renderManifest(m));
  assert.ok(renderManifest(m).endsWith('}\n'));
});

function tinyManifest() {
  return {
    entries: [
      buildEntry('foundation-persona', skillText('foundation-persona', '  classification: foundation\n  version: "2.6.0"'), FACTS),
      buildEntry('deliver-prd', skillText('deliver-prd', '  phase: deliver\n  version: "2.1.0"'), FACTS),
      buildEntry('utility-pm-critic', skillText('utility-pm-critic', '  classification: utility\n  version: "1.0.0"'), FACTS),
      buildEntry('tool-note-and-vote', skillText('tool-note-and-vote', '  classification: tool\n  version: "0.1.0"'), FACTS),
      buildEntry('tool-design-sprint-brief', skillText('tool-design-sprint-brief', '  classification: tool\n  version: "0.1.0"\n  tool: design-sprint\n  move: brief'), FACTS),
      buildEntry('tool-design-sprint-readiness', skillText('tool-design-sprint-readiness', '  classification: tool\n  version: "0.1.0"\n  tool: design-sprint\n  move: readiness'), FACTS),
    ],
  };
}

test('renderAgentsBlock orders families by workshop sequence and groups sections', () => {
  const block = renderAgentsBlock(tinyManifest());
  assert.ok(block.includes('### Foundation Classification'));
  assert.ok(block.includes('#### persona'));
  assert.ok(block.includes('### Deliver Phase'));
  assert.ok(block.includes('#### Design Sprint Family'));
  // readiness precedes brief despite alphabetical order saying otherwise
  assert.ok(block.indexOf('tool-design-sprint-readiness') < block.indexOf('tool-design-sprint-brief'));
  // standalone tool listed under the Tool section before the family
  assert.ok(block.indexOf('tool-note-and-vote') < block.indexOf('Design Sprint Family'));
});

test('renderAgentsBlock fails loudly on an unregistered tool family', () => {
  const m = { entries: [buildEntry('tool-x-y', skillText('tool-x-y', '  classification: tool\n  version: "0.1.0"\n  tool: mystery-sprint\n  move: y'), FACTS)] };
  assert.throws(() => renderAgentsBlock(m), /unknown tool family "mystery-sprint"/);
});

test('spliceAgents replaces only the marker block and is idempotent', () => {
  const doc = `# Title\n\n## Skills\n\n${MARKER_START}\nOLD CONTENT\n${MARKER_END}\n\n## Workflows\nuntouched\n`;
  const once = spliceAgents(doc, 'NEW BLOCK\n');
  assert.ok(once.includes('NEW BLOCK'));
  assert.ok(!once.includes('OLD CONTENT'));
  assert.ok(once.includes('## Workflows\nuntouched'));
  assert.equal(spliceAgents(once, 'NEW BLOCK\n'), once);
});

test('spliceAgents refuses when markers are missing', () => {
  assert.throws(() => spliceAgents('# no markers here', 'X'), /marker pair not found/);
});
