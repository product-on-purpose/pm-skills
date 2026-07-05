// scripts/gen-derived-surfaces.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync as writeFixture, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join as joinPath } from 'node:path';
import {
  loadCatalog, renderCatalogBadges, renderCatalogTable, splice,
  descriptionHeadline, descriptionTail, renderManifestHeadline, evalManifest,
  MANIFEST_SPECS, BADGES_START, BADGES_END, TABLE_START, normalizeEol,
  QUICKSTART_START, QUICKSTART_END, QUICKSTART_LINKS, QUICKSTART_TARGETS, renderQuickstartBody,
  COMPAT_START, COMPAT_END, currentVersion, discoverAgentIds, crossJoinSubAgents, renderCompatMatrixBlock,
} from './gen-derived-surfaces.mjs';

// A fixture catalog with a distinct value per bucket so a column swap is caught
// (skills is the true total 9 + 8 + 5 + 3 = 25).
const FIX = { skills: 25, phase: 9, foundation: 8, utility: 5, tool: 3, sub_agents: 2 };

const manifestText = (catalog) => JSON.stringify({ catalog });

test('loadCatalog parses a valid manifest and fails loudly otherwise', () => {
  assert.deepEqual(loadCatalog(manifestText(FIX)), FIX);
  assert.throws(() => loadCatalog('{ not json'), /invalid JSON/);
  assert.throws(() => loadCatalog('{}'), /missing catalog object/);
  assert.throws(() => loadCatalog(manifestText({ skills: 1 })), /catalog\.phase missing/);
  assert.throws(() => loadCatalog(manifestText({ ...FIX, tool: '3' })), /catalog\.tool missing or not a number/);
});

// ---- round-trip fidelity: a wrong count in is a wrong count out, never a silent pass -

/** Parse the four counts back out of the rendered badge block. */
function parseBadgeCounts(block) {
  const grab = (label) => Number(new RegExp(`badge/${label}-(\\d+)_skills`).exec(block)[1]);
  const alt = (label) => Number(new RegExp(`${label} Skills?: (\\d+)`).exec(block)[1]);
  return {
    phase: grab('Phase'), foundation: grab('Foundation'), tool: grab('Tool_Families'), utility: grab('Utility'),
    altPhase: alt('Phase'), altFoundation: alt('Foundation'), altTool: alt('Tool Family'), altUtility: alt('Utility'),
  };
}

test('renderCatalogBadges round-trips every count (label + alt text)', () => {
  const b = parseBadgeCounts(renderCatalogBadges(FIX));
  assert.equal(b.phase, FIX.phase);
  assert.equal(b.foundation, FIX.foundation);
  assert.equal(b.tool, FIX.tool);
  assert.equal(b.utility, FIX.utility);
  // the alt text carries the same number as the badge label
  assert.equal(b.altPhase, FIX.phase);
  assert.equal(b.altFoundation, FIX.foundation);
  assert.equal(b.altTool, FIX.tool);
  assert.equal(b.altUtility, FIX.utility);
  assert.ok(renderCatalogBadges(FIX).startsWith('<p>'));
});

/** Parse the Count column back out of the rendered classification table. */
function parseTableCounts(block) {
  const out = {};
  for (const line of block.split('\n')) {
    if (!line.startsWith('| **')) continue;
    const parts = line.split('|');
    out[parts[1].trim()] = Number(parts[2].trim());
  }
  return out;
}

test('renderCatalogTable round-trips the Count column', () => {
  const t = parseTableCounts(renderCatalogTable(FIX));
  assert.equal(t['**Phase** (Triple Diamond)'], FIX.phase);
  assert.equal(t['**Foundation** (cross-cutting)'], FIX.foundation);
  assert.equal(t['**Utility** (meta-tooling)'], FIX.utility);
  assert.equal(t['**Tool Families** (workshop methods)'], FIX.tool);
});

// ---- manifest headline ---------------------------------------------------------------

// Banned house-rule dash characters (em U+2014, en U+2013), by code point so this
// file never contains the literal bytes it guards against.
const BANNED_DASH = new RegExp('[\\u2014\\u2013]');

test('renderManifestHeadline carries the counts, is single-line, and has no banned dashes', () => {
  for (const id of ['plugin', 'marketplace', 'codex']) {
    const h = renderManifestHeadline(id, FIX);
    assert.ok(h.includes(`${FIX.skills} `), `${id} headline states the skill total`);
    assert.ok(!/\n/.test(h), `${id} headline is single-line`);
    assert.ok(!BANNED_DASH.test(h), `${id} headline has no em/en dash`);
    // the count headline must not contain a version token (that is the tail's job,
    // and check-count-phrases splits on it)
    assert.ok(!/\bv\d+\.\d+\.\d+/.test(h), `${id} headline holds no version token`);
  }
  // plugin + marketplace enumerate the sub-agent count and roster
  assert.ok(renderManifestHeadline('plugin', FIX).includes(`${FIX.sub_agents} sub-agents (pm-critic,`));
  assert.ok(renderManifestHeadline('marketplace', FIX).includes(`${FIX.sub_agents} sub-agents (pm-critic,`));
  assert.throws(() => renderManifestHeadline('mystery', FIX), /unknown manifest id/);
});

test('descriptionHeadline / descriptionTail split at the first version token', () => {
  const desc = 'COUNTS SENTENCE. v1.2.3 is a thing. v4.5.6 too.';
  assert.equal(descriptionHeadline(desc), 'COUNTS SENTENCE. ');
  assert.equal(descriptionTail(desc), 'v1.2.3 is a thing. v4.5.6 too.');
  // no version token: the whole string is the headline, the tail is empty
  assert.equal(descriptionHeadline('just counts, no version'), 'just counts, no version');
  assert.equal(descriptionTail('just counts, no version'), '');
});

test('evalManifest is current on a matching headline and stale on a drifted count', () => {
  const tail = 'v2.30.0 is a trust-repair release: authored detail.';
  const good = renderManifestHeadline('plugin', FIX) + tail;
  const okRes = evalManifest('plugin', good, FIX);
  assert.equal(okRes.stale, false);
  assert.equal(okRes.newValue, good); // rewrite is a no-op when current

  const drifted = good.replace(`${FIX.skills} product management skills`, '999 product management skills');
  const badRes = evalManifest('plugin', drifted, FIX);
  assert.equal(badRes.stale, true);
  assert.equal(badRes.newValue, good); // the fix restores the derived headline, keeping the tail
  assert.ok(badRes.newValue.endsWith(tail));
});

test('every MANIFEST_SPEC has a renderer branch (no orphan field locator)', () => {
  for (const spec of MANIFEST_SPECS) {
    assert.doesNotThrow(() => renderManifestHeadline(spec.id, FIX), `${spec.id} must render`);
  }
});

// ---- splice: replacement, idempotence, marker refusal --------------------------------

test('splice replaces only the marker block and is idempotent', () => {
  const doc = `# Title\n\n${BADGES_START}\nOLD\n${BADGES_END}\n\ntrailing untouched\n`;
  const once = splice(doc, BADGES_START, BADGES_END, 'NEW BLOCK\n');
  assert.ok(once.includes('NEW BLOCK'));
  assert.ok(!once.includes('OLD'));
  assert.ok(once.includes('trailing untouched'));
  assert.equal(splice(once, BADGES_START, BADGES_END, 'NEW BLOCK\n'), once);
});

test('splice refuses (loudly) when a marker pair is missing or reversed', () => {
  assert.throws(() => splice('# no markers', BADGES_START, BADGES_END, 'X'), /marker pair not found/);
  const reversed = `${BADGES_END}\nbody\n${BADGES_START}\n`;
  assert.throws(() => splice(reversed, BADGES_START, BADGES_END, 'X'), /marker pair not found/);
});

// ---- --check correctness both ways, including a CRLF checkout -------------------------

test('--check passes on a matching README region and trips on a hand edit', () => {
  const block = renderCatalogBadges(FIX);
  const doc = `intro\n\n${BADGES_START}\n${block}${BADGES_END}\n\noutro\n`;
  // matching: re-splicing the freshly rendered block is a no-op -> "current"
  assert.equal(normalizeEol(doc), normalizeEol(splice(doc, BADGES_START, BADGES_END, block)));
  // a hand edit inside the markers (a bumped count) is caught: the fresh render differs
  const tampered = doc.replace(`Phase-${FIX.phase}_skills`, 'Phase-999_skills');
  assert.notEqual(
    normalizeEol(tampered),
    normalizeEol(splice(tampered, BADGES_START, BADGES_END, block)),
  );
});

test('--check does not read false-stale for a CRLF README (Windows checkout)', () => {
  const block = renderCatalogBadges(FIX);
  const lf = `intro\n\n${BADGES_START}\n${block}${BADGES_END}\n\noutro\n`;
  const crlf = lf.replace(/\n/g, '\r\n');
  const next = splice(crlf, BADGES_START, BADGES_END, block); // re-render is LF
  assert.notEqual(crlf, next);                              // raw compare = the false-STALE bug
  assert.equal(normalizeEol(crlf), normalizeEol(next));     // normalized compare = correctly current
});

test('normalizeEol collapses CRLF to LF', () => {
  assert.equal(normalizeEol('a\r\nb\r\n'), 'a\nb\n');
  assert.equal(normalizeEol('a\nb'), normalizeEol('a\r\nb'));
});

// ---- marker regression guard: the MARK(name, instruction) refactor must not move ------
// ---- an already-committed PR1 marker string -------------------------------------------

test('MARK default instruction is unchanged for the PR1 markers (refactor regression guard)', () => {
  assert.equal(BADGES_START, '<!-- pmskills:catalog-badges:start (generated by scripts/gen-derived-surfaces.mjs; edit skill frontmatter, not this block) -->');
  assert.equal(TABLE_START, '<!-- pmskills:catalog-table:start (generated by scripts/gen-derived-surfaces.mjs; edit skill frontmatter, not this block) -->');
});

test('the new markers carry their own edit-target instruction', () => {
  assert.equal(QUICKSTART_START, '<!-- pmskills:quickstart:start (generated by scripts/gen-derived-surfaces.mjs; edit scripts/data/quickstart-fragment.md, not this block) -->');
  assert.equal(QUICKSTART_END, '<!-- pmskills:quickstart:end -->');
  assert.equal(COMPAT_START, '<!-- pmskills:compat-matrix:start (generated by scripts/gen-derived-surfaces.mjs; edit scripts/data/sub-agent-compat.json, not this block) -->');
  assert.equal(COMPAT_END, '<!-- pmskills:compat-matrix:end -->');
});

// ---- shared quickstart fragment: renderQuickstartBody ----------------------------------

// A distinct value per bucket, mirroring the FIX fixture above, plus commands/workflows
// so WORKFLOW_COMMANDS (commands - 1) and WORKFLOWS_MINUS_3 have non-trivial values.
const QS_FIX = { skills: 25, phase: 9, foundation: 8, utility: 5, tool: 3, sub_agents: 2, commands: 11, workflows: 12 };

const QS_FRAGMENT = [
  'Skills: {{SKILLS}} ({{PHASE}}/{{FOUNDATION}}/{{UTILITY}}/{{TOOL}}).',
  'Commands: {{COMMANDS}} ({{WORKFLOW_COMMANDS}} workflow + chain).',
  'Workflows: {{WORKFLOWS}} (and {{WORKFLOWS_MINUS_3}} more).',
  'Links: {{PLATFORMS_LINK}} | {{WALKTHROUGH_LINK}} | {{LIFECYCLE_GUIDE_LINK}}',
  '{{LEARN_MORE_LINKS}}',
  '',
].join('\n');

test('renderQuickstartBody interpolates every count token from the catalog (never a silent pass)', () => {
  const out = renderQuickstartBody(QS_FRAGMENT, QS_FIX, 'root');
  assert.ok(out.includes(`Skills: ${QS_FIX.skills} (${QS_FIX.phase}/${QS_FIX.foundation}/${QS_FIX.utility}/${QS_FIX.tool}).`));
  assert.ok(out.includes(`Commands: ${QS_FIX.commands} (${QS_FIX.commands - 1} workflow + chain).`));
  assert.ok(out.includes(`Workflows: ${QS_FIX.workflows} (and ${QS_FIX.workflows - 3} more).`));
  assert.ok(!/\{\{\w+\}\}/.test(out), 'no unresolved {{token}} survives into the rendered body');
});

test('renderQuickstartBody resolves per-target links, and both targets render identical counts', () => {
  const root = renderQuickstartBody(QS_FRAGMENT, QS_FIX, 'root');
  const site = renderQuickstartBody(QS_FRAGMENT, QS_FIX, 'site');
  assert.ok(root.includes(QUICKSTART_LINKS.root.PLATFORMS_LINK));
  assert.ok(root.includes(QUICKSTART_LINKS.root.LEARN_MORE_LINKS));
  assert.ok(site.includes(QUICKSTART_LINKS.site.PLATFORMS_LINK));
  assert.ok(site.includes(QUICKSTART_LINKS.site.LEARN_MORE_LINKS));
  assert.notEqual(root, site); // the link substitution genuinely differs...
  // ...but the "67 vs 68" class of divergence (a count, not a link) is impossible:
  const countOf = (s) => s.match(/Skills: (\d+)/)[1];
  assert.equal(countOf(root), countOf(site));
});

test('renderQuickstartBody fails loudly on an unknown target or an unresolved token', () => {
  assert.throws(() => renderQuickstartBody(QS_FRAGMENT, QS_FIX, 'mystery'), /unknown target "mystery"/);
  assert.throws(() => renderQuickstartBody('{{NOT_A_REAL_TOKEN}}', QS_FIX, 'root'), /unresolved token \{\{NOT_A_REAL_TOKEN\}\}/);
});

test('QUICKSTART_TARGETS names exactly the two rendered surfaces, each with a distinct target', () => {
  assert.deepEqual(QUICKSTART_TARGETS.map((t) => t.rel), [
    'QUICKSTART.md',
    'site/src/content/docs/getting-started/quickstart.md',
  ]);
  assert.deepEqual(QUICKSTART_TARGETS.map((t) => t.target), ['root', 'site']);
});

// ---- sub-agent compatibility matrix -----------------------------------------------------

function tempAgentsDir(names) {
  const dir = mkdtempSync(joinPath(tmpdir(), 'gends-agents-'));
  for (const n of names) writeFixture(joinPath(dir, n), '---\nname: x\n---\n');
  return dir;
}

test('discoverAgentIds lists agents/*.md as ids, sorted, excluding a README and non-.md files', () => {
  const dir = tempAgentsDir(['pm-skill-router.md', 'pm-critic.md', 'README.md', '_chain-permitted.yaml']);
  try {
    assert.deepEqual(discoverAgentIds(dir), ['pm-critic', 'pm-skill-router']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

const COMPAT_FIX = {
  clients: ['Claude Code', 'Codex CLI'],
  intro_tail: 'sub-agents (a fixture tail sentence).',
  sub_agents: [
    { id: 'a', label: 'a', dispatch: 'utility-a', cells: ['PRODUCTION', 'EXPERIMENTAL'] },
    { id: 'b', label: 'b (added v1.0.0)', dispatch: 'utility-b', cells: ['EXPERIMENTAL', 'EXPERIMENTAL'] },
  ],
};

test('crossJoinSubAgents returns the data file rows, in their declared order, when everything matches', () => {
  const rows = crossJoinSubAgents(['a', 'b'], COMPAT_FIX, 2);
  assert.equal(rows, COMPAT_FIX.sub_agents);
});

test('crossJoinSubAgents fails loudly on a sub-agent with no status row (added but not documented)', () => {
  assert.throws(() => crossJoinSubAgents(['a', 'b', 'c'], COMPAT_FIX, 3), /no status row for c/);
});

test('crossJoinSubAgents fails loudly on an orphan status row (removed but not cleaned up)', () => {
  assert.throws(() => crossJoinSubAgents(['a'], COMPAT_FIX, 1), /orphan status row for b/);
});

test('crossJoinSubAgents fails loudly when catalog.sub_agents disagrees with the real agents/ count', () => {
  assert.throws(() => crossJoinSubAgents(['a', 'b'], COMPAT_FIX, 6), /catalog\.sub_agents \(6\) does not match the agents\/ file count \(2\)/);
});

test('renderCompatMatrixBlock derives the as-of stamp + intro count, and round-trips every row', () => {
  const block = renderCompatMatrixBlock(COMPAT_FIX, COMPAT_FIX.sub_agents, 2, '9.9.9');
  assert.ok(block.startsWith('## Cross-Client Status (as of v9.9.9)\n'));
  assert.ok(block.includes('This matrix now covers all 2 sub-agents (a fixture tail sentence).'));
  assert.ok(block.includes('| Sub-agent | Dispatch skill | Claude Code | Codex CLI |'));
  assert.ok(block.includes('|---|---|---|---|'));
  assert.ok(block.includes('| a | utility-a | PRODUCTION | EXPERIMENTAL |'));
  assert.ok(block.includes('| b (added v1.0.0) | utility-b | EXPERIMENTAL | EXPERIMENTAL |'));
});

test('currentVersion reads .claude-plugin/plugin.json\'s version and fails loudly when missing or non-string', () => {
  assert.equal(currentVersion(JSON.stringify({ version: '2.31.0' })), '2.31.0');
  assert.throws(() => currentVersion(JSON.stringify({})), /version missing or not a string/);
  assert.throws(() => currentVersion(JSON.stringify({ version: 42 })), /version missing or not a string/);
});
