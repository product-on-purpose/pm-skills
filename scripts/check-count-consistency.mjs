#!/usr/bin/env node
// check-count-consistency.mjs - Detect stale hardcoded counts in docs.
//
// Single-source Node port of the retired check-count-consistency.sh + .ps1 pair
// (v2.31.0 WS-Z4, the R-18 dual-shell port wave 1). The two shells were one of the
// frozen awk RSTART/RLENGTH hazard pairs - the class that hung v2.27.1 ubuntu CI in
// one shell only (see reference_awk-match-rstart-clobber). This port removes the
// second maintained implementation AND the hazard: it walks each tracked line with a
// global JS regex (matchAll, which advances its own lastIndex on a cloned regex), so
// there is no manual match()-driven loop to clobber.
//
// Behavior is preserved verbatim from the shells (proven by the fixture-parity run in
// scripts/fixtures/shell-parity/repo before the shells were retired): count the actual
// skills/commands/workflows plus the four frontmatter-derived sub-counts, then scan
// tracked .md/.mdx/.json for hardcoded numbers that no longer match, honoring the
// count-exempt markers and the same exclude set. The scan uses `git ls-files`
// (tracked files only), mirroring the pwsh implementation, so gitignored generated
// content is never scanned.
//
// Exit codes:
//   0 - All counts are consistent (or not a git work tree; the scan is git-based)
//   1 - Stale counts detected
//
// Usage:
//   node scripts/check-count-consistency.mjs
//   node scripts/check-count-consistency.mjs --root <dir>   # scan a different tree
//                                                           # (used by the unit test)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));

// Counts below this are likely per-phase/per-category, not totals. Comparison uses
// >= so values equal to the threshold are still checked (round-number boundaries).
const MIN_THRESHOLD = 10;

// Exclusion patterns (regex on the tracked-file path) - verbatim from the pwsh
// $excludePatterns: files where counts are historical or structural.
const EXCLUDE_PATTERNS = [
  /^CHANGELOG\.md$/,
  /^site\/src\/content\/docs\/releases\//,
  /^docs\/internal\//,
  /^site\/src\/content\/docs\/changelog\.md$/,
  /^\.github\/issues-archive\//,
  /^\.github\/issues-drafts\//,
  /^\.github\/\.created-issues\.json$/,
  /^\.github\/scripts\//,
  /^_agent-context\/claude\/CONTEXT\.md$/,
  /^_agent-context\/claude\/DECISIONS\.md$/,
  /^_agent-context\/SESSION-LOG\//,
  /^_agent-context\/claude\/SESSION-LOG\//,
  /^_agent-context\/codex\/SESSION-LOG\//,
  /^library\//,
  /^skills\/utility-pm-skill-auditor\/references\//,
  /^site\/src\/content\/docs\/skills\/utility\/utility-pm-skill-auditor\.md$/,
  /^scripts\/check-count-consistency\./,
  // WS-T9 dual-shell equivalence fixture: scripts/fixtures/shell-parity/ holds a
  // mini-repo with DELIBERATELY stale counts. Exclude it from the REAL repo scan.
  // When --root points at the fixture, these paths are relative to the fixture, so
  // this pattern matches nothing there and the fixture's counts.md is still scanned.
  /^scripts\/fixtures\//,
];

// Prose "N <resource>" checks (number-before). `main` matches the resource phrase anchored
// at the text immediately AFTER a number (the shell's `^[ ]+([a-zA-Z][a-zA-Z-]*[ ]+){0,3}<resource>`);
// `subset` matches a subset descriptor in that same position, using the shell's PREFIX-match
// set (e.g. "phase", or "test" which prefix-matches "testing"), so a number describing a
// SUBSET ("26 phase skills") is skipped for the total check. Both are NON-global and anchored,
// so lineFindings can re-test them per occurrence without any lastIndex state; the line is
// lowercased before matching, exactly as the shell did (`tolower`).
function proseChecks(counts) {
  return [
    {
      name: 'skills',
      count: counts.skills,
      main: /^ +([a-z][a-z-]*[ ]+){0,3}skills/,
      subset: /^ +(phase|foundation|utility|tool|domain|shipped|embedded|test|sample|library|lines? )/,
    },
    {
      name: 'commands',
      count: counts.commands,
      main: /^ +([a-z][a-z-]*[ ]+){0,3}commands/,
      subset: /^ +(skill|workflow)[ -]/,
    },
    {
      name: 'workflows',
      count: counts.workflows,
      main: /^ +([a-z][a-z-]*[ ]+){0,3}workflows/,
      subset: null,
    },
  ];
}

/** Count actual resources + the four frontmatter-derived sub-counts from ROOT. */
export function countResources(root) {
  const dirCount = (rel) => {
    const p = join(root, rel);
    if (!existsSync(p)) return [];
    return readdirSync(p, { withFileTypes: true });
  };

  const skills = dirCount('skills').filter((d) => d.isDirectory());
  const commands = dirCount('commands').filter((d) => d.isFile() && d.name.endsWith('.md'));
  const workflows = dirCount('_workflows').filter(
    (d) => d.isFile() && d.name.endsWith('.md') && d.name !== 'README.md'
  );

  // Sub-counts: metadata.classification XOR metadata.phase from the first 25
  // frontmatter lines. Mirrors the pwsh line-by-line scan (classification first,
  // then phase, break on first hit).
  const sub = { phase: 0, foundation: 0, utility: 0, tool: 0 };
  for (const d of skills) {
    const skillMd = join(root, 'skills', d.name, 'SKILL.md');
    if (!existsSync(skillMd)) continue;
    const head = readFileSync(skillMd, 'utf8').split(/\r?\n/).slice(0, 25);
    for (const l of head) {
      const cm = l.match(/^\s*classification:\s*(foundation|utility|tool)\b/);
      if (cm) { sub[cm[1]]++; break; }
      if (/^\s*phase:\s*[a-z]/.test(l)) { sub.phase++; break; }
    }
  }

  return { skills: skills.length, commands: commands.length, workflows: workflows.length, sub };
}

/** Pre-compute count-exempt line ranges for a file's lines (1-based, inclusive). */
export function exemptRanges(lines) {
  const ranges = [];
  let start = 0;
  for (let i = 0; i < lines.length; i++) {
    const ln = i + 1;
    if (/count-exempt:start/.test(lines[i])) { start = ln; continue; }
    if (/count-exempt:end/.test(lines[i])) {
      if (start > 0) { ranges.push([start, ln]); start = 0; }
    }
  }
  return ranges;
}

const inExempt = (ranges, ln) => ranges.some(([s, e]) => ln >= s && ln <= e);

/** All findings for a single line. Pure; no shared regex state (fresh matchAll). */
export function lineFindings(file, lineNum, line, counts) {
  const out = [];
  const { skills: SkillCount, commands: CommandCount, workflows: WorkflowCount, sub } = counts;
  const actualFor = (r) => (r === 'commands' ? CommandCount : r === 'workflows' ? WorkflowCount : SkillCount);

  // Prose "N <resource>" (number-before). Per-occurrence, prefix-match subset exclusion,
  // faithful to the retired shell's awk `while (match(line, /[0-9]+/))` loop: for EACH number
  // on the (lowercased) line, look at the text immediately after THAT number; if it opens with
  // a subset descriptor (prefix match, so "testing" counts as "test") skip it; otherwise, if it
  // opens with the resource phrase, check the number. A per-line number-VALUE set would wrongly
  // suppress a second bare "N skills" that merely shares a value with an earlier subset phrase
  // ("26 phase skills; the old 26 skills page"), and a \b on the descriptor would wrongly flag
  // "12 testing skills"; the shell did neither.
  const lower = line.toLowerCase();
  for (const check of proseChecks(counts)) {
    const numRe = /\d+/g;
    let nm;
    while ((nm = numRe.exec(lower)) !== null) {
      const rest = lower.slice(nm.index + nm[0].length);
      if (check.subset && check.subset.test(rest)) continue; // subset descriptor after this number -> skip
      if (!check.main.test(rest)) continue;                  // not this resource phrase here -> skip
      const num = parseInt(nm[0], 10);
      if (num !== check.count && num >= MIN_THRESHOLD) {
        out.push(`  ${file}:${lineNum}: found '${num} ${check.name}' (actual: ${check.count})`);
      }
    }
  }

  // Badge counts: shields.io 'badge/skills-<N>' (number AFTER the word). No threshold.
  for (const bm of line.matchAll(/badge\/skills-(\d+)/g)) {
    const bnum = parseInt(bm[1], 10);
    if (bnum !== SkillCount) {
      out.push(`  ${file}:${lineNum}: found badge 'skills-${bnum}' (actual: ${SkillCount})`);
    }
  }

  // Number-AFTER-resource, form 1: facts-table row "| <resource> | N |" (first only).
  const tbl = line.match(/\|\s*\*{0,2}(?:slash )?(skill|command|workflow)s?\*{0,2}\s*\|\s*(\d+)/i);
  if (tbl) {
    const rWord = tbl[1].toLowerCase();
    const r = rWord === 'command' ? 'commands' : rWord === 'workflow' ? 'workflows' : 'skills';
    const tnum = parseInt(tbl[2], 10);
    const tactual = actualFor(r);
    if (tnum !== tactual && tnum >= MIN_THRESHOLD) {
      out.push(`  ${file}:${lineNum}: found table '${r} = ${tnum}' (actual: ${tactual})`);
    }
  }

  // Number-AFTER-resource, form 2: parenthetical "<resource> (N)". Subset-qualified
  // parentheticals ("domain skills (26)") are excluded, matching the total check.
  for (const pm of line.matchAll(/(?:[a-z][a-z-]*\s)?(skill|command|workflow)s?\s\((\d+)\)/gi)) {
    const seg = pm[0].toLowerCase();
    const rWord = pm[1].toLowerCase();
    const r = rWord === 'command' ? 'commands' : rWord === 'workflow' ? 'workflows' : 'skills';
    let isSubset = false;
    if (r === 'skills' && /^(phase|foundation|utility|tool|domain|shipped|embedded|test|sample|library)\s/.test(seg)) isSubset = true;
    if (r === 'commands' && /^(skill|workflow)\s/.test(seg)) isSubset = true;
    if (!isSubset) {
      const pnum = parseInt(pm[2], 10);
      const pactual = actualFor(r);
      if (pnum !== pactual && pnum >= MIN_THRESHOLD) {
        out.push(`  ${file}:${lineNum}: found '${r} (${pnum})' (actual: ${pactual})`);
      }
    }
  }

  // Singular-resource + count-noun: "N skill directories", "N command docs".
  for (const sn of line.matchAll(/(\d+)\s+(skill|command)s?\s+(?:markdown\s+)?(?:director(?:y|ies)|files?|docs?)/gi)) {
    const rWord = sn[2].toLowerCase();
    const r = rWord === 'command' ? 'commands' : 'skills';
    const snum = parseInt(sn[1], 10);
    const sactual = actualFor(r);
    if (snum !== sactual && snum >= MIN_THRESHOLD) {
      out.push(`  ${file}:${lineNum}: found '${sn[0]}' (actual: ${sactual})`);
    }
  }

  // Per-classification / per-phase sub-counts. No threshold (foundation < 10 is
  // still policed). Three surface forms.
  for (const cm of line.matchAll(/(\d+)\s+(phase|foundation|utility)[ -]skills?/gi)) {
    const bucket = cm[2].toLowerCase();
    const cnum = parseInt(cm[1], 10);
    if (cnum !== sub[bucket]) {
      out.push(`  ${file}:${lineNum}: found '${cnum} ${bucket} skills' (actual: ${sub[bucket]})`);
    }
  }
  for (const cm of line.matchAll(/(\d+)\s+tool[ -](?:classification|skills?|entries)/gi)) {
    const cnum = parseInt(cm[1], 10);
    if (cnum !== sub.tool) {
      out.push(`  ${file}:${lineNum}: found '${cnum} tool (classification)' (actual: ${sub.tool})`);
    }
  }
  for (const cm of line.matchAll(/(phase|foundation|utility|tool)\s+skills?\s*\((\d+)\)/gi)) {
    const bucket = cm[1].toLowerCase();
    const cnum = parseInt(cm[2], 10);
    if (cnum !== sub[bucket]) {
      out.push(`  ${file}:${lineNum}: found '${bucket} skills (${cnum})' (actual: ${sub[bucket]})`);
    }
  }

  return out;
}

function isInsideWorkTree(root) {
  try {
    const r = execFileSync('git', ['-C', root, 'rev-parse', '--is-inside-work-tree'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return r.trim() === 'true';
  } catch {
    return false;
  }
}

function trackedDocs(root) {
  const out = execFileSync('git', ['-C', root, 'ls-files', '*.md', '*.mdx', '*.json'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  return out.split(/\r?\n/).filter((f) => f !== '');
}

/** Run the full check against ROOT. Returns { code, counts, findings }. Pure w.r.t.
 *  process state (no exit); the CLI wrapper handles printing + exit. */
export function runCheck(root) {
  // Non-git fallback: the stale-count scan relies on `git ls-files` over tracked
  // files. Outside a git work tree (e.g. an unpacked plugin install cache) skip with
  // a NOTICE rather than failing; count drift only matters in the authoring/release
  // (CI + pre-tag) context, which is always a git work tree.
  if (!isInsideWorkTree(root)) {
    return { code: 0, counts: null, findings: [], notice: true };
  }

  const counts = countResources(root);
  const files = trackedDocs(root).filter((f) => !EXCLUDE_PATTERNS.some((re) => re.test(f)));

  const findings = [];
  for (const file of files) {
    const full = join(root, file);
    if (!existsSync(full)) continue;
    let text;
    try {
      text = readFileSync(full, 'utf8');
    } catch {
      continue;
    }
    const lines = text.split(/\r?\n/);
    const ranges = exemptRanges(lines);
    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      if (inExempt(ranges, lineNum)) continue;
      const f = lineFindings(file, lineNum, lines[i], counts);
      if (f.length) findings.push(...f);
    }
  }

  return { code: findings.length ? 1 : 0, counts, findings, notice: false };
}

function parseRoot(argv) {
  const i = argv.indexOf('--root');
  if (i >= 0 && argv[i + 1]) return argv[i + 1];
  return join(SCRIPTS, '..');
}

function main() {
  const root = parseRoot(process.argv.slice(2));
  console.log('=== Count Consistency Check ===');
  console.log('');

  const result = runCheck(root);
  if (result.notice) {
    console.log('[NOTICE] not a git work tree; the stale-count scan requires git and is skipped here.');
    console.log('[NOTICE] count-consistency is enforced in the git-based CI + pre-tag context.');
    return 0;
  }

  const { counts, findings } = result;
  console.log('Actual counts:');
  console.log(`  Skills:    ${counts.skills}`);
  console.log(`  Commands:  ${counts.commands}`);
  console.log(`  Workflows: ${counts.workflows}`);
  console.log(`  (sub: phase ${counts.sub.phase} / foundation ${counts.sub.foundation} / utility ${counts.sub.utility} / tool ${counts.sub.tool})`);
  console.log('');

  if (findings.length === 0) {
    console.log('PASS: No stale counts found in tracked .md or .json files.');
    return 0;
  }
  console.log('Stale counts found:');
  console.log('');
  for (const f of findings) console.log(f);
  console.log('');
  console.log('FAIL: One or more hardcoded counts are stale.');
  return 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(main());
}
