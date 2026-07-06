// scripts/gen-derived-surfaces.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync as writeFixture, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join as joinPath } from 'node:path';
import {
  loadCatalog, renderCatalogBadges, renderCatalogTable, splice,
  descriptionHeadline, descriptionTail, renderManifestHeadline, evalManifest,
  MANIFEST_SPECS, BADGES_START, BADGES_END, TABLE_START, normalizeEol,
  QUICKSTART_START, QUICKSTART_END, QUICKSTART_LINKS, QUICKSTART_TARGETS, renderQuickstartBody,
  COMPAT_START, COMPAT_END, currentVersion, discoverAgentIds, crossJoinSubAgents, renderCompatMatrixBlock,
  LATEST_RELEASE_START, LATEST_RELEASE_END, CHANGELOG_MIRROR_START, CHANGELOG_MIRROR_END,
  RELEASES_INDEX_START, RELEASES_INDEX_END, RECENT_RELEASES_COUNT,
  parseChangelogSections, topChangelogSections, extractTheme, changelogLeadParagraph, changelogAnchor,
  renderLatestReleaseMirror, renderSiteChangelogMirror, siteMirrorVersion, renderSiteChangelogSurface,
  parseReleaseIndexRows, readReleasePageDescription, renderReleasesIndexTable,
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

// ---- release-notes mirrors (PR4, WS-Z3): CHANGELOG.md parsing --------------------------

// A fixture CHANGELOG with an empty [Unreleased] section and four dated sections, mirroring
// the real file's shape closely enough to exercise every parser branch (a multi-sentence
// lead paragraph, a "### " subsection, and a final section with nothing after it).
const CHANGELOG_FIX = [
  '# Changelog',
  '',
  'Intro prose that must never be captured as a section.',
  '',
  '## [Unreleased]',
  '',
  '## [9.3.0] - 2027-01-02',
  '',
  "**Fixture theme one.** A longer elaboration sentence with a count claim like 99 skills that must never leak into the theme.",
  '',
  '### Added',
  '',
  '- one thing',
  '',
  '## [9.2.1] - 2027-01-01',
  '',
  '**Fixture theme two.** Shorter elaboration.',
  '',
  '### Fixed',
  '',
  '- a fix',
  '',
  '## [9.2.0] - 2026-12-31',
  '',
  '**Fixture theme three.** Elaboration three.',
  '',
  '## [9.1.0] - 2026-12-30',
  '',
  '**Fixture theme four.** Elaboration four (the oldest captured section, nothing follows it).',
  '',
].join('\n');

test('parseChangelogSections captures every dated section, newest first, and skips [Unreleased]', () => {
  const sections = parseChangelogSections(CHANGELOG_FIX);
  assert.deepEqual(sections.map((s) => s.version), ['9.3.0', '9.2.1', '9.2.0', '9.1.0']);
  assert.deepEqual(sections.map((s) => s.date), ['2027-01-02', '2027-01-01', '2026-12-31', '2026-12-30']);
  assert.ok(sections[0].body.includes('### Added'));
  assert.ok(!sections[0].body.includes('9.2.1')); // does not bleed into the next section
});

test('parseChangelogSections is EOL-agnostic (a CRLF CHANGELOG parses identically to LF)', () => {
  const crlf = CHANGELOG_FIX.replace(/\n/g, '\r\n');
  assert.deepEqual(parseChangelogSections(crlf), parseChangelogSections(CHANGELOG_FIX));
});

test('topChangelogSections slices the newest N and fails loudly when fewer exist', () => {
  const top2 = topChangelogSections(CHANGELOG_FIX, 2);
  assert.deepEqual(top2.map((s) => s.version), ['9.3.0', '9.2.1']);
  assert.throws(() => topChangelogSections(CHANGELOG_FIX, 99), /only 4 dated section\(s\) found, need at least 99/);
});

test('extractTheme takes only the leading bold sentence, never the elaboration that follows it', () => {
  const [top] = topChangelogSections(CHANGELOG_FIX, 1);
  assert.equal(extractTheme(top.body), 'Fixture theme one.');
  assert.ok(!extractTheme(top.body).includes('99 skills'), 'the count-bearing elaboration must not leak into the theme');
});

test('extractTheme fails loudly when a section does not open with a bold run', () => {
  assert.throws(() => extractTheme('No bold lead sentence here.'), /expected a bold lead theme sentence/);
});

test('changelogLeadParagraph stops at the first ### subsection, or returns the whole body when there is none', () => {
  const [withSub] = topChangelogSections(CHANGELOG_FIX, 1);
  const para = changelogLeadParagraph(withSub.body);
  assert.ok(para.startsWith('**Fixture theme one.**'));
  assert.ok(!para.includes('### Added'));

  const sections = parseChangelogSections(CHANGELOG_FIX);
  const noSub = sections[sections.length - 1]; // 9.1.0: no ### subsection follows it
  assert.equal(changelogLeadParagraph(noSub.body), noSub.body);
});

test('changelogLeadParagraph fails loudly on an empty paragraph', () => {
  assert.throws(() => changelogLeadParagraph('### Added\n\n- x'), /no lead paragraph/);
});

test('changelogAnchor matches the real GitHub heading-anchor algorithm (verified against hand-written anchors already in the repo)', () => {
  assert.equal(changelogAnchor('2.30.0', '2026-07-04'), '#2300---2026-07-04');
  assert.equal(changelogAnchor('2.29.1', '2026-06-24'), '#2291---2026-06-24');
  assert.equal(changelogAnchor('2.29.0', '2026-06-23'), '#2290---2026-06-23');
});

// ---- README recent-releases mirror -------------------------------------------------------

test('the latest-release marker constants are distinct from the PR1-PR3 markers and self-describe their edit target', () => {
  assert.equal(LATEST_RELEASE_START, '<!-- pmskills:latest-release:start (generated by scripts/gen-derived-surfaces.mjs; edit CHANGELOG.md, not this block) -->');
  assert.equal(LATEST_RELEASE_END, '<!-- pmskills:latest-release:end -->');
  assert.equal(CHANGELOG_MIRROR_START, '<!-- pmskills:changelog-mirror:start (generated by scripts/gen-derived-surfaces.mjs; edit CHANGELOG.md, not this block) -->');
  assert.equal(CHANGELOG_MIRROR_END, '<!-- pmskills:changelog-mirror:end -->');
  assert.equal(RELEASES_INDEX_START, '<!-- pmskills:releases-index:start (generated by scripts/gen-derived-surfaces.mjs; edit CHANGELOG.md + the release page frontmatter, not this block) -->');
  assert.equal(RELEASES_INDEX_END, '<!-- pmskills:releases-index:end -->');
});

test('renderLatestReleaseMirror round-trips version/date/theme for every section and links the release tag + CHANGELOG anchor', () => {
  const top = topChangelogSections(CHANGELOG_FIX, RECENT_RELEASES_COUNT);
  const block = renderLatestReleaseMirror(top);
  assert.ok(block.startsWith('<!-- count-exempt:start -->\n'), 'wrapped in count-exempt as a defense-in-depth layer');
  assert.ok(block.trim().endsWith('<!-- count-exempt:end -->'));
  for (const s of top) {
    assert.ok(block.includes(`[v${s.version}](https://github.com/product-on-purpose/pm-skills/releases/tag/v${s.version})`), `${s.version} links its release tag`);
    assert.ok(block.includes(s.date), `${s.version} carries its date`);
    assert.ok(block.includes(extractTheme(s.body)), `${s.version} carries its theme`);
    assert.ok(block.includes(`CHANGELOG.md${changelogAnchor(s.version, s.date)}`), `${s.version} links its CHANGELOG anchor`);
  }
  assert.ok(!block.includes('99 skills'), 'the elaboration sentence (with its count claim) never appears, only the theme');
});

test('renderLatestReleaseMirror uses exactly RECENT_RELEASES_COUNT rows (the "top ~3" contract)', () => {
  const top = topChangelogSections(CHANGELOG_FIX, RECENT_RELEASES_COUNT);
  assert.equal(top.length, 3);
  const rowCount = renderLatestReleaseMirror(top).split('\n').filter((l) => /^\|\s*\[v/.test(l)).length;
  assert.equal(rowCount, RECENT_RELEASES_COUNT);
});

// ---- site changelog.md top mirror --------------------------------------------------------

test('renderSiteChangelogMirror reproduces the heading and lead paragraph verbatim, plus a trailer linking CHANGELOG + the release page', () => {
  const [newest] = topChangelogSections(CHANGELOG_FIX, 1);
  const block = renderSiteChangelogMirror(newest);
  assert.ok(block.startsWith(`## [${newest.version}] - ${newest.date}\n`));
  assert.ok(block.includes(changelogLeadParagraph(newest.body)), 'the lead paragraph is copied verbatim, not condensed');
  assert.ok(block.includes('99 skills'), 'unlike the README mirror, the site mirror carries the full paragraph verbatim');
  assert.ok(block.includes(`CHANGELOG.md${changelogAnchor(newest.version, newest.date)}`));
  assert.ok(block.includes(`releases/Release_v${newest.version}.md`));
});

test('siteMirrorVersion reads the version from a mirror block heading, or null when absent', () => {
  assert.equal(siteMirrorVersion(renderSiteChangelogMirror(topChangelogSections(CHANGELOG_FIX, 1)[0])), '9.3.0');
  assert.equal(siteMirrorVersion('no heading here'), null);
});

test('renderSiteChangelogSurface migrates the outgoing (superseded) section below the marker, never dropping it', () => {
  const [newest, second] = topChangelogSections(CHANGELOG_FIX, 2); // 9.3.0 (new newest), 9.2.1 (outgoing)
  // A "before" file whose marker currently holds the OLD newest section (9.2.1), with a
  // pre-existing authored 9.2.0 entry already sitting below the marker. Built with the same
  // splice shape the generator emits (START + "\n" + mirror-block + END + authored tail).
  const before =
    '## [Unreleased]\n\n' +
    CHANGELOG_MIRROR_START + '\n' +
    renderSiteChangelogMirror(second) +
    CHANGELOG_MIRROR_END + '\n\n' +
    '## [9.2.0] - 2026-12-31\n\n**Older authored entry.** Body.\n';
  const after = renderSiteChangelogSurface(before, newest);

  // The marker now holds ONLY the new newest section; the superseded one has left it.
  const marker = after.slice(
    after.indexOf(CHANGELOG_MIRROR_START) + CHANGELOG_MIRROR_START.length,
    after.indexOf(CHANGELOG_MIRROR_END),
  );
  assert.ok(marker.includes('## [9.3.0] - 2027-01-02'), 'new newest section is in the marker');
  assert.ok(!marker.includes('## [9.2.1]'), 'the outgoing section no longer sits inside the marker');

  // The outgoing 9.2.1 section is migrated just below the marker, ahead of the pre-existing
  // 9.2.0 authored history, which is itself untouched. Nothing is dropped.
  const below = after.slice(after.indexOf(CHANGELOG_MIRROR_END) + CHANGELOG_MIRROR_END.length);
  assert.ok(below.includes('## [9.2.1] - 2027-01-01'), 'the outgoing section is preserved below the marker');
  assert.ok(below.indexOf('## [9.2.1]') < below.indexOf('## [9.2.0]'), 'migrated section sits above the older authored history');
  assert.ok(below.includes('**Older authored entry.**'), 'pre-existing authored history is untouched');

  // Idempotent: once the marker already holds the newest section, regenerating is a no-op.
  assert.equal(renderSiteChangelogSurface(after, newest), after);
});

// ---- releases/index.md top rows ----------------------------------------------------------

const EXISTING_TABLE_FIX = [
  '| Version | Date | Highlights |',
  '|---------|------|-----------|',
  '| [v9.3.0](Release_v9.3.0.md) | 2027-01-02 | STALE hand-typed highlight that must be replaced |',
  '| [v9.2.1](Release_v9.2.1.md) | 2027-01-01 | STALE hand-typed highlight that must be replaced |',
  '| [v9.2.0](Release_v9.2.0.md) | 2026-12-31 | Historical highlight, preserved verbatim |',
  '| [v9.1.0](Release_v9.1.0.md) | 2026-12-30 | Another historical highlight, preserved verbatim |',
  '',
].join('\n');

test('parseReleaseIndexRows extracts only data rows (header/separator excluded)', () => {
  const rows = parseReleaseIndexRows(EXISTING_TABLE_FIX);
  assert.equal(rows.length, 4);
  assert.ok(rows.every((r) => /^\|\s*\[v/.test(r)));
});

test('renderReleasesIndexTable replaces only the fresh versions\' rows, preserving every other row verbatim and in place', () => {
  const top2 = topChangelogSections(CHANGELOG_FIX, 2); // 9.3.0, 9.2.1
  const pageDescriptions = new Map([
    ['9.3.0', 'Fresh description for 9.3.0.'],
    ['9.2.1', 'Fresh description for 9.2.1.'],
  ]);
  const table = renderReleasesIndexTable(top2, pageDescriptions, EXISTING_TABLE_FIX);
  const rows = parseReleaseIndexRows(table);
  assert.equal(rows.length, 4, 'row count is unchanged: 2 fresh + 2 preserved');
  assert.ok(rows[0].includes('Fresh description for 9.3.0.'));
  assert.ok(rows[1].includes('Fresh description for 9.2.1.'));
  assert.ok(!rows[0].includes('STALE'));
  assert.ok(!rows[1].includes('STALE'));
  assert.ok(rows[2].includes('Historical highlight, preserved verbatim'), 'v9.2.0 row untouched');
  assert.ok(rows[3].includes('Another historical highlight, preserved verbatim'), 'v9.1.0 row untouched');
});

test('renderReleasesIndexTable fails loudly when a fresh version has no supplied page description', () => {
  const top1 = topChangelogSections(CHANGELOG_FIX, 1);
  assert.throws(() => renderReleasesIndexTable(top1, new Map(), EXISTING_TABLE_FIX), /no page description supplied for v9\.3\.0/);
});

// readReleasePageDescription touches real files (existsSync is not injected, matching the
// discoverAgentIds precedent above), so it is exercised against a real temp repo layout
// rather than a mock.
function tempReleasesRepo() {
  const repoRoot = mkdtempSync(joinPath(tmpdir(), 'gends-releases-'));
  const releasesDir = joinPath(repoRoot, 'site', 'src', 'content', 'docs', 'releases');
  mkdirSync(releasesDir, { recursive: true });
  return { repoRoot, releasesDir };
}

test('readReleasePageDescription reads the frontmatter description of a real release page', () => {
  const { repoRoot, releasesDir } = tempReleasesRepo();
  try {
    writeFixture(
      joinPath(releasesDir, 'Release_v9.9.9.md'),
      '---\nslug: releases/Release_v9.9.9\ntitle: Release v9.9.9\ndescription: A fixture description.\n---\n\nBody.\n',
    );
    assert.equal(readReleasePageDescription(repoRoot, '9.9.9'), 'A fixture description.');
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test('readReleasePageDescription fails loudly when the release page does not exist', () => {
  const { repoRoot } = tempReleasesRepo();
  try {
    assert.throws(() => readReleasePageDescription(repoRoot, '9.9.9'), /Release_v9\.9\.9\.md not found/);
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test('readReleasePageDescription fails loudly when the page has no frontmatter block', () => {
  const { repoRoot, releasesDir } = tempReleasesRepo();
  try {
    writeFixture(joinPath(releasesDir, 'Release_v9.9.9.md'), '# No frontmatter here\n');
    assert.throws(() => readReleasePageDescription(repoRoot, '9.9.9'), /no frontmatter block found/);
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test('readReleasePageDescription fails loudly when frontmatter has no description field', () => {
  const { repoRoot, releasesDir } = tempReleasesRepo();
  try {
    writeFixture(joinPath(releasesDir, 'Release_v9.9.9.md'), '---\ntitle: Release v9.9.9\n---\n\nBody.\n');
    assert.throws(() => readReleasePageDescription(repoRoot, '9.9.9'), /no description \(needed as the releases\/index\.md highlight\)/);
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});
