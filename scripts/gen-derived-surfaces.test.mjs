// scripts/gen-derived-surfaces.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  loadCatalog, renderCatalogBadges, renderCatalogTable, splice,
  descriptionHeadline, descriptionTail, renderManifestHeadline, evalManifest,
  MANIFEST_SPECS, BADGES_START, BADGES_END, normalizeEol,
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
