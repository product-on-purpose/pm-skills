#!/usr/bin/env node
// Guard against the " . " (space-period-space) em-dash-sweep scar in
// USER-FACING hand-authored prose. ENFORCING in CI since v2.25.2 (PR #182).
//
// Origin: commit 8ab0f81 (2026-04-22, "em-dash sweep completion") replaced
// em-dash characters with a spaced period instead of a hyphen, leaving a lone
// spaced period used as a separator. The no-em-dashes PreToolUse hook blocks the
// root cause (U+2014 / U+2013 characters) but NOT this swept-to-period residue,
// so this check catches a regression at CI time.
//
// Scope: tracked hand-authored prose only, including skills/** (SKILL.md and
// references/, added v2.26.0 F-12 Batch 0c after the corpus sweep). Generated
// site content is gitignored, so `git ls-files` excludes it automatically.
// docs/internal is intentionally out of scope (it retains some legitimate
// in-code-fence periods and heading scars).
// Fence-aware: lines inside ``` code blocks are skipped, because legitimate code
// can contain a spaced period (for example `cp -r x . `). Inline-code spans
// (single backticks) are also stripped before the check, so prose that quotes the
// scar itself as an example (the ` . ` token, as the release notes do) is not
// flagged. This makes the check clean enough to run enforcing.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const ROOTS = ['CHANGELOG.md', 'README.md', 'CONTRIBUTING.md', 'site/src/content/docs', 'skills'];

export function trackedProse() {
  let out;
  try {
    out = execSync(`git ls-files ${ROOTS.join(' ')}`, { encoding: 'utf8' });
  } catch {
    return [];
  }
  return out.split('\n').filter((f) => /\.(md|mdx)$/i.test(f));
}

// Return the 1-based line numbers (with text) that contain a spaced-period scar,
// skipping fenced code blocks. The scar signature is " . " (space, period,
// space): a lone period used as a separator. Consecutive dots (ellipsis " ... ")
// do not match, and a normal terminal period ("word. Next") has no leading space
// so it does not match either.
export function findScars(text) {
  const hits = [];
  let inFence = false;
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    // Replace inline-code spans with a single non-space placeholder before
    // testing: release notes legitimately quote the scar itself (the ` . ` token)
    // and code spans can hold a real spaced period. `(`+)(.*?)\1` matches a
    // CommonMark backtick run of any length N closed by the same run, so multi-
    // backtick spans (`` . ``) are handled too. The placeholder (not empty string)
    // preserves boundaries, so a normal `code`. sentence period does NOT collapse
    // into a phantom " . "; a real scar OUTSIDE the span still survives.
    const stripped = line.replace(/(`+)(.*?)\1/g, 'x');
    if (/ \. /.test(stripped)) hits.push({ line: i + 1, text: line.trim() });
  }
  return hits;
}

function main() {
  const findings = [];
  for (const f of trackedProse()) {
    let text;
    try { text = readFileSync(f, 'utf8'); } catch { continue; }
    for (const h of findScars(text)) findings.push(`${f}:${h.line}: ${h.text}`);
  }
  if (findings.length) {
    console.error(`check-emdash-scars: ${findings.length} possible spaced-period scar(s) in user-facing prose:`);
    for (const x of findings) console.error('  ' + x);
    console.error('Fix: replace the lone spaced period with " - " (or restructure). Origin: commit 8ab0f81.');
    process.exit(1);
  }
  console.log('check-emdash-scars: no spaced-period scars in user-facing prose.');
}

// CLI guard: only run when executed directly, never when imported by the test.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
