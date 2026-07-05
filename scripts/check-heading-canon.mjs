#!/usr/bin/env node
// scripts/check-heading-canon.mjs - WS-T8d (v2.30.0, M-35): a deterministic gate for
// SKILL.md heading SPELLING drift against the canon spellings named in the Skeleton
// Canon (site/src/content/docs/guides/creating-pm-skills.md#skeleton-canon-the-three-sanctioned-dialects).
// Closes the 2026-07-04 deep-audit finding P2-2.
//
// Why this exists. The catalog carries "Quality Checklist" (37 files) vs "Quality
// checklist" (11), a "When NOT to use" (lowercase u) in foundation-build-risk-review that
// evaded case-sensitive tooling, and "Output format" (lowercase f) in the four
// contract-shaped-dialect skills. Nothing checked heading CASE before v2.30.0; this gate
// is the durable backstop so a future skill (or edit) cannot silently reintroduce a
// case-drifted heading the way build-risk-review's did (mirroring an already-drifted
// exemplar, per the Skeleton Canon doc's own account of how that happened).
//
// WHAT THIS CHECKS. A fixed, cross-dialect set of canon heading strings: the headings
// shared across two or more of the three sanctioned dialects (Classic, Contract-shaped,
// Tool-family) or common enough to appear in most of the catalog - "When to Use", "When
// NOT to Use", "Instructions", "Output Format", "Output Contract" (an optional trailing
// version parenthetical like "(v1.2.0)" is stripped before comparing), "Quality
// Checklist", and "Examples". For each `## ` heading found in a skill's SKILL.md, if its
// text case-INsensitively equals one of these canon strings but its actual case differs,
// that is a flagged deviation.
//
// WHAT THIS DELIBERATELY DOES NOT CHECK (v2.30.0 scope). The dialect-EXCLUSIVE headings
// (Identity, Core principle, Inputs, What you produce, Refusal protocols, Cross-skill
// composition, Cross-references from Contract-shaped; What This Skill Produces, Common
// Pitfalls, Decider Role, Canonical Sources, Cross-Skill Usage, Decider Checkpoint from
// Tool-family) are NOT in the checked set. One pre-existing case deviation of that class
// is already on disk (foundation-prioritized-action-plan's "Common pitfalls", a skill
// that pre-dates the canon and does not cleanly match any of the three dialects) and is
// not swept in this release; adding those headings to the checked set now would make this
// gate fail on a skill nobody has touched, which is exactly the false-positive risk the
// scoped design in check-count-phrases.mjs avoids. This does NOT check dialect skeleton
// COMPLETENESS either (a skill missing a required heading, or using an entirely different
// word for its output section, like a bare "Output" or "Output structure") - that is a
// structural retrofit, not a spelling fix, and is explicitly deferred to a named v2.31.0
// full-catalog normalization pass (spec OQ-3). A heading that does not case-insensitively
// match any canon string is left alone: dialects may add their own extra `##` sections
// (a framework breakdown, a domain glossary) without leaving their dialect, and an older
// skill's bespoke vocabulary (`Zero-friction execution`, `See also`, `tool-note-and-vote`'s
// own `Output Structure` / `Canonical Source` / `Cross-Family Usage`, which predate this
// canon and are tracked for reconciliation rather than reproduced) is not this gate's job.
//
// Scope: skills/*/SKILL.md only (one level; not references/*.md, not other tracked docs).
//
// Enforcement ladder (M-30). Ships ADVISORY (continue-on-error in validation.yml).
// Promotion to ENFORCING is a v2.31.0 candidate, once the full-catalog heading-spelling
// sweep (not just this release's touched skills) returns zero, per spec OQ-3 - NOT claimed
// this release, because only the skills WS-T8b actually touched are normalized here.
//
// Usage: node scripts/check-heading-canon.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');

// The cross-dialect canon heading set (exact target case). See the header comment for
// what is deliberately excluded and why.
export const CANON_HEADINGS = [
  'When to Use',
  'When NOT to Use',
  'Instructions',
  'Output Format',
  'Output Contract',
  'Quality Checklist',
  'Examples',
];

// Strips a trailing version parenthetical, e.g. "Output Contract (v1.2.0)" -> "Output
// Contract", so an independently-versioned output contract heading is compared on its
// base text, not penalized for the (correctly-formatted) version suffix.
const VERSION_SUFFIX = /\s*\([^()]*\)\s*$/;

/** The comparable base of a heading's text: trimmed, with a trailing "(...)" parenthetical
 *  (typically a version tag) stripped. Pure. */
export function baseHeadingText(headingText) {
  return headingText.trim().replace(VERSION_SUFFIX, '').trim();
}

/** Every `## ` (h2) heading in a SKILL.md, as 1-based {n, text} records. Anchored to
 *  exactly two `#` followed by whitespace, so a `### ` (h3) subsection is never mistaken
 *  for an h2 (the same unanchored-regex trap check-reciprocal-boundary-pointers.mjs
 *  documents). EOL-agnostic. Pure. */
export function extractHeadings(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##[ \t]+(.+?)\s*$/);
    if (m) out.push({ n: i + 1, text: m[1] });
  }
  return out;
}

/** Findings for one SKILL.md's headings: a heading whose base text case-INsensitively
 *  matches a canon string, but whose actual case differs from it, is a deviation. A
 *  heading that matches no canon string at all (case-insensitively) is not this gate's
 *  concern - see the header comment's "deliberately does not check" list. Pure. */
export function checkHeadings(label, text, canon = CANON_HEADINGS) {
  const findings = [];
  for (const h of extractHeadings(text)) {
    const base = baseHeadingText(h.text);
    for (const c of canon) {
      if (base.toLowerCase() === c.toLowerCase() && base !== c) {
        findings.push(`${label}:${h.n}: "## ${h.text}" should be "## ${c}" (canon spelling)`);
        break;
      }
    }
  }
  return findings;
}

function main() {
  const skillsDir = join(repo, 'skills');
  const findings = [];

  for (const e of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const rel = `skills/${e.name}/SKILL.md`;
    let text;
    try { text = readFileSync(join(skillsDir, e.name, 'SKILL.md'), 'utf8'); }
    catch { continue; } // no SKILL.md in this dir is another gate's concern
    findings.push(...checkHeadings(rel, text));
  }

  if (findings.length) {
    for (const x of findings) console.error(`HEADING-CANON  ${x}`);
    console.error(`\n${findings.length} heading-canon finding(s). Canon spellings: `
      + `${CANON_HEADINGS.map((c) => `"${c}"`).join(', ')}.`);
    console.error('Fix the heading case to match the canon spelling in the Skeleton Canon doc '
      + '(site/src/content/docs/guides/creating-pm-skills.md#skeleton-canon-the-three-sanctioned-dialects).');
    process.exit(1);
  }
  console.log(`check-heading-canon: OK. No case deviations of the ${CANON_HEADINGS.length} `
    + 'canon headings found across the catalog.');
}

// CLI guard: only run when executed directly, never when imported by the test.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
