#!/usr/bin/env node
// scripts/check-pr-title.mjs - ZD-3 (v2.31.0 plan, DECIDED A, 2026-07-04): a
// conventional-commit lint for squash-merge PR titles, wired by
// .github/workflows/pr-title-lint.yml.
//
// Why this exists. Under release-please (WS-Z1, M-21, issue #136), main stays
// linear history via squash merges, so the PR title becomes the entire commit
// message release-please ever reads: GitHub's squash-merge defaults to the PR
// title as the commit subject, and whatever messy commits existed inside the
// PR disappear at merge time. release-please derives the version bump and the
// generated changelog skeleton from that one line, so a non-conventional title
// silently mis-bumps or drops a release's own history entry - see
// docs/internal/release-plans/v2.31.0/release-please-primer.md, Section 3.
//
// Ships ADVISORY (continue-on-error in pr-title-lint.yml) as of 2026-07-05.
// Real merged history predates this gate and would fail it outright: this
// repo's own "v2.29.0: foundation-build-risk-review (pre-build gate) +
// pm-skill-router (key-free probe) (#212)" - the exact commit that shipped
// that skill - carries no recognized type prefix at all (primer, Section 3,
// "real findings"). Promote to enforcing once a full shadow cycle shows clean
// titles land without a manual nudge; tracked at the ZD-4 cutover checklist
// (docs/internal/release-plans/v2.31.0/implementation-plan_zero-drift-program.md,
// section 1c).
//
// Types allowed: the Conventional Commits set already used in this repo's own
// history (feat, fix, docs, style, refactor, perf, test, build, ci, chore,
// revert) plus one house-invented type, `record`, used for eval-run logging
// (primer Section 3; e.g. `record(M-31): ...`, real shipped commits - see
// scripts/trigger-eval-roster.yaml's consumers). A title with an unrecognized
// type is not an error under release-please itself (Section 3: "silently
// ignored"), but this lint flags it so the choice is deliberate, not missed.

import { pathToFileURL } from 'node:url';

export const TYPES = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert', 'record'];

// type(scope)!: description - scope and the breaking-change `!` are optional.
// Scope allows this repo's real scope vocabulary: letters, digits, dot, dash,
// underscore, slash (e.g. `M-31`, `v2.27.0`, `C-1..C-6`, `deps`, `gen`).
const CC_RE = new RegExp(`^(${TYPES.join('|')})(\\([A-Za-z0-9_./-]+\\))?(!)?: (.+)$`);

// Pure function, unit-tested directly (no env/process coupling) per this
// repo's check-*.mjs convention (see check-emdash-scars.mjs).
export function lintTitle(rawTitle) {
  const title = (rawTitle ?? '').trim();
  if (!title) {
    return { ok: false, reason: 'the PR title is empty.' };
  }
  const m = CC_RE.exec(title);
  if (!m) {
    return {
      ok: false,
      reason:
        `"${title}" does not match "type(scope)!: description". ` +
        `Allowed types: ${TYPES.join(', ')}. Scope and the breaking-change "!" are optional.`,
    };
  }
  const description = m[4].trim();
  if (!description) {
    return { ok: false, reason: `"${title}" has an empty description after the colon.` };
  }
  return { ok: true };
}

function main() {
  const title = process.env.PR_TITLE ?? process.argv[2] ?? '';
  const result = lintTitle(title);
  if (!result.ok) {
    console.error(`check-pr-title (advisory): ${result.reason}`);
    console.error(
      'This becomes load-bearing under release-please: the squash-merge PR title is the entire ' +
        'commit message release-please reads to compute the next version and the generated ' +
        'changelog skeleton (docs/internal/release-plans/v2.31.0/release-please-primer.md, Section 3).'
    );
    process.exit(1);
  }
  console.log(`check-pr-title: "${title}" is a valid conventional-commit title.`);
}

// CLI guard: only run when executed directly, never when imported by the test.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
