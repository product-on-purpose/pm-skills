#!/usr/bin/env node
// scripts/check-count-phrases.mjs - WS-T1 (v2.30.0, M-35): a deterministic gate for the
// count-bearing PHRASE VARIANTS on the highest-trust front-door surfaces that the canonical
// check-count-consistency cannot see. Closes the 2026-07-04 deep-audit finding P0-1.
//
// Why this exists. check-count-consistency.sh polices the canonical "N skills / commands /
// workflows" forms, but three drift classes evade it and one axis is missing entirely:
//   1. "N shipped PM skills" - "shipped" is a subset descriptor there, so the whole line is
//      skipped. That is exactly how QUICKSTART:5 shipped "67 shipped PM skills" green.
//   2. "N skill definitions" - the phrase ends in "definitions", not "skills", so the regex
//      never matches it (QUICKSTART:85).
//   3. "N+ sample outputs" - the sample corpus is out of that check's scope, so a stale floor
//      like "95+ sample outputs" (7x in README) never failed.
//   4. Sub-agent axis: nothing reconciles "N sub-agents" against the real agent-doc count,
//      which is how the off-repo GitHub About text drifted to "4 sub-agents".
//
// This gate derives the truth from disk - skills/*/SKILL.md frontmatter for the catalog total
// plus the four family sub-counts, agents/*.md for the sub-agent count, and the sample file
// count for the sample floor - then scans a scoped set of authored FRONT-DOOR count-claim
// surfaces for the variant phrasings, failing on a stale number.
//
// SCOPE (a role-based allow-list, following the check-sample-counts precedent). The corpus is
// the audit's P0-1 evidence set - the first surfaces a new user or an installer reads:
// README.md, QUICKSTART.md, the two getting-started site pages, and the three plugin manifest
// description HEADLINES. Deliberately NOT scanned here: the release-note history (CHANGELOG,
// site/.../releases/**, site/.../changelog.md) and the sub-agent STATUS prose on the
// platform / reference / guide pages (platforms.md, sub-agent-compatibility.md, ...). Those
// carry legitimate point-in-time counts; the per-release grep count-sweep (plan surface I)
// backstops them and the WS-T4 cross-client sweep owns the sub-agent-status pages. Keeping
// them out of this gate is what lets it stay green independent of the later WS-T4 / sweep work.
//
// FALSE-POSITIVE CONTROL. Historical prose inside a scanned file is wrapped in the existing
// count-exempt:start/end ranges (the same mechanism check-count-consistency honors); this gate
// honors them too and strips inline-code spans (an illustrative `95+ sample outputs` token in
// prose is not a live claim). Fenced code blocks are deliberately NOT skipped - a "File
// Structure" diagram carries real count claims like QUICKSTART's "All 68 skill definitions",
// which is exactly one of the variants the audit flagged, and check-count-consistency does not
// skip fences either. A manifest description cannot carry a marker (it is a single JSON
// string), so only the HEADLINE - the text before the first vN.N.N version-narration token -
// is scanned; the frozen version-by-version narration after it (which legitimately says
// "all 4 sub-agents" or "grows from 67 to 68") is ignored.
//
// The "+" suffix means a FLOOR: "N+ sample outputs" passes when N <= actual (a future-proof
// phrasing) and fails only when N exceeds what exists. A bare number is checked for equality.
//
// Enforcement ladder (M-30). Ships ADVISORY (continue-on-error in validation.yml). Promoted to
// ENFORCING in the v2.30.0 surface-sweep PR (Phase 7), once the repo-wide grep count-sweep
// returns zero and the corpus is verified clean, with a dated rationale in the step comment.
//
// Usage: node scripts/check-count-phrases.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');

// Count-bearing phrase variants. Each spec carries the truth axis its number must match.
// (\d+) is the claimed number; (\+)? / (\+) is a floor marker. The sample form REQUIRES the
// "+" so a bare per-skill mention like "2-3 samples" is never mistaken for a corpus total
// (the exact sample corpus count is check-sample-counts' remit). Case-insensitive, global.
export const PHRASE_SPECS = [
  { re: /(\d+)(\+)?\s+shipped\s+PM\s+skills/gi, axis: 'skills' },
  { re: /(\d+)(\+)?\s+skill\s+definitions/gi, axis: 'skills' },
  { re: /(\d+)(\+)?\s+PM\s+skills/gi, axis: 'skills' },
  { re: /(\d+)(\+)\s+samples?\b/gi, axis: 'sample' },
  { re: /(\d+)(\+)?\s+sub-?agents/gi, axis: 'subagents' },
];

/** Catalog total + the four frontmatter-derived family sub-counts. The bucket logic mirrors
 *  check-count-consistency.sh (classification foundation|utility|tool XOR a phase key, read
 *  from the first 25 frontmatter lines). `total` comes from the directory count so it is right
 *  even if a bucket regex ever misses. Pure: readdir + readfile are injected. */
export function deriveCatalog(skillsDir, rd = readdirSync, rf = readFileSync) {
  const buckets = { phase: 0, foundation: 0, utility: 0, tool: 0 };
  let total = 0;
  for (const e of rd(skillsDir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    let fm;
    try { fm = rf(join(skillsDir, e.name, 'SKILL.md'), 'utf8'); } catch { continue; }
    total += 1;
    const head = fm.split(/\r?\n/).slice(0, 25).join('\n');
    if (/^\s*classification:\s*foundation(\s|$)/m.test(head)) buckets.foundation += 1;
    else if (/^\s*classification:\s*utility(\s|$)/m.test(head)) buckets.utility += 1;
    else if (/^\s*classification:\s*tool(\s|$)/m.test(head)) buckets.tool += 1;
    else if (/^\s*phase:\s*[a-z]/m.test(head)) buckets.phase += 1;
  }
  return { total, ...buckets };
}

/** Sub-agent count: the agent docs in agents/, excluding the chain-routing config
 *  (_chain-permitted.yaml is not .md) and any README. Pure. */
export function deriveAgents(agentsDir, rd = readdirSync) {
  return rd(agentsDir).filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md').length;
}

/** Sample floor: total sample_*.md files under the library (mirrors check-sample-counts). Pure. */
export function deriveSampleFloor(samplesDir, rd = readdirSync) {
  let total = 0;
  for (const e of rd(samplesDir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    total += rd(join(samplesDir, e.name)).filter((f) => f.startsWith('sample_') && f.endsWith('.md')).length;
  }
  return total;
}

/** 1-based line records worth scanning: drops only the count-exempt:start/end ranges (both
 *  the .md HTML-comment and .mdx JSX-comment wrappers, detected on the bare token). Fenced
 *  code blocks are NOT skipped, matching check-count-consistency: a fenced "File Structure"
 *  diagram carries real count claims (for example QUICKSTART's "All 68 skill definitions"),
 *  and the specific phrase patterns here do not match incidental code. EOL-agnostic. Pure. */
export function scannableLines(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let inExempt = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/count-exempt:start/.test(line)) { inExempt = true; continue; }
    if (/count-exempt:end/.test(line)) { inExempt = false; continue; }
    if (inExempt) continue;
    out.push({ n: i + 1, text: line });
  }
  return out;
}

/** The count-claim HEADLINE of a manifest description: the text before the first vN.N.N
 *  version-narration token. Everything after it is frozen per-version history that
 *  legitimately cites past counts and must not be scanned. Pure. */
export function manifestHeadline(desc) {
  const m = desc.match(/\bv\d+\.\d+\.\d+/);
  return m ? desc.slice(0, m.index) : desc;
}

/** Collect the count-claim strings from a parsed manifest: every string value under a key
 *  named description / longDescription / shortDescription, recursively (so the nested
 *  marketplace plugins[].description is included). Pure. */
export function manifestDescriptions(obj, out = []) {
  if (Array.isArray(obj)) { for (const v of obj) manifestDescriptions(v, out); return out; }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'string' && /^(description|longDescription|shortDescription)$/.test(k)) out.push(v);
      else manifestDescriptions(v, out);
    }
  }
  return out;
}

/** Findings for one text unit. `lines` is [{n, text}]; each line is scanned for every phrase
 *  spec after inline-code spans are stripped. `truth` maps each axis (skills/sample/subagents)
 *  to its derived number. A "+" hit is a floor (num <= actual passes); a bare hit is exact. Pure. */
export function scanUnit(label, lines, truth) {
  const findings = [];
  for (const { n, text } of lines) {
    const stripped = text.replace(/(`+)([\s\S]*?)\1/g, ' ');
    for (const spec of PHRASE_SPECS) {
      for (const m of stripped.matchAll(spec.re)) {
        const num = Number(m[1]);
        const isFloor = m[2] === '+';
        const expected = truth[spec.axis];
        const ok = isFloor ? num <= expected : num === expected;
        if (!ok) {
          const hit = m[0].trim();
          findings.push(isFloor
            ? `${label}:${n}: "${hit}" floor ${num} exceeds actual ${spec.axis} count ${expected}`
            : `${label}:${n}: "${hit}" says ${num}, actual ${spec.axis} count ${expected}`);
        }
      }
    }
  }
  return findings;
}

// Markdown front-door surfaces (fence- + count-exempt-aware). See SCOPE note above.
export const MD_SURFACES = [
  'README.md',
  'QUICKSTART.md',
  'site/src/content/docs/getting-started/quickstart.md',
  'site/src/content/docs/getting-started/index.md',
];

// Plugin manifests: only the description HEADLINE (pre-version-narration) is scanned.
export const MANIFESTS = [
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
  '.codex-plugin/plugin.json',
];

function main() {
  const catalog = deriveCatalog(join(repo, 'skills'));
  const truth = {
    skills: catalog.total,
    sample: deriveSampleFloor(join(repo, 'library/skill-output-samples')),
    subagents: deriveAgents(join(repo, 'agents')),
  };

  const findings = [];

  for (const rel of MD_SURFACES) {
    let text;
    try { text = readFileSync(join(repo, rel), 'utf8'); }
    catch { findings.push(`${rel}: MISSING (count-phrase surface expected on disk)`); continue; }
    findings.push(...scanUnit(rel, scannableLines(text), truth));
  }

  for (const rel of MANIFESTS) {
    let obj;
    try { obj = JSON.parse(readFileSync(join(repo, rel), 'utf8')); }
    catch { findings.push(`${rel}: unreadable or invalid JSON`); continue; }
    for (const desc of manifestDescriptions(obj)) {
      findings.push(...scanUnit(rel, [{ n: 'description', text: manifestHeadline(desc) }], truth));
    }
  }

  if (findings.length) {
    for (const x of findings) console.error(`COUNT-PHRASE  ${x}`);
    console.error(`\n${findings.length} count-phrase finding(s). Derived truth: ${truth.skills} skills `
      + `(phase ${catalog.phase} / foundation ${catalog.foundation} / utility ${catalog.utility} / tool ${catalog.tool}), `
      + `${truth.subagents} sub-agents, ${truth.sample} sample files.`);
    console.error('Fix the stale number, or - if the mention is historical - wrap it in count-exempt:start/end.');
    process.exit(1);
  }
  console.log(`check-count-phrases: OK. ${truth.skills} skills / ${truth.subagents} sub-agents / `
    + `${truth.sample}+ sample files; all front-door count phrases match.`);
}

// CLI guard: only run when executed directly, never when imported by the test.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
