---
date: 2026-06-02T18:10:00-07:00
repo: product-on-purpose/pm-skills
branch: main (merged from chore/astro-site-14-conformance, squash, branch deleted)
summary: "Astro site standard conformance (14.7-14.9): base single-source+test, robots.txt, accent, Astro 6.4.2; reviewed, merged, deployed"
files-changed:
  - scripts/site-base.mjs
  - scripts/check-rendered-links.mjs
  - scripts/check-rendered-links.test.mjs
  - site/astro.config.mjs
  - site/public/robots.txt
  - site/src/styles/custom.css
  - site/package.json
  - site/package-lock.json
  - .github/workflows/create-issues-from-drafts.yml
  - .github/workflows/validation.yml
  - CHANGELOG.md
  - docs/internal/release-plans/astro-starlight-conformance/spec.md
  - docs/internal/release-plans/astro-starlight-conformance/release-plan.md
  - docs/internal/release-plans/_unreleased/astro-site-p1-conformance/plan_astro-site-p1-conformance.md
session-type: refactor
model: claude opus 4.8
model-settings: "ultracode (xhigh + dynamic workflow orchestration); explanatory output style"
agent: claude-code
status: completed
decisions-count: 13
---

# Astro site standard conformance (14.7-14.9) - pm-skills

## Summary

Executed the family Astro site-standard conformance packet for pm-skills (the family
reference implementation): one P1 plus three P2 corrections to reach full compliance
with clauses 14.7-14.9. Shipped end to end in one session - implemented, ran a 6-lens
adversarial review (Workflow fan-out), fixed the findings, squash-merged PR #160 to
`main`, and confirmed the GitHub Pages deploy went green. No skill behavior change and
no published URL change (386-route parity held throughout).

## Work Completed

- **14.7 (P1) base single-source.** Re-landed `scripts/site-base.mjs` as the one
  declaration of base `/pm-skills`. It had regressed: the interim module was deleted
  in the Pattern S convergence, re-duplicating the literal into
  `check-rendered-links.mjs`. Refactored the checker so its core takes `base` as a
  parameter (default from the single source) behind a guarded CLI entry, and added
  `check-rendered-links.test.mjs` (5 cases) proving a wrong base FAILS rather than
  passing while the live site 404s. Wired the test into `validation.yml`.
- **14.9 (P2) SEO.** Added `site/public/robots.txt` pointing at `sitemap-index.xml`.
- **A-2 (P2) branding.** Set the `#5C7CFA` accent triplet (per-mode low/high) in
  `custom.css` (was the Starlight default; grounded against Starlight docs via Context7).
- **14.8 (P2) versions/Node.** Pinned Astro to the family-shared `6.4.2` (lockfile),
  and switched `create-issues-from-drafts.yml` to `node-version-file: .nvmrc`.
- Authored `spec.md` + `release-plan.md`, reconciled the absorbed `_unreleased` plan,
  and reconciled the CHANGELOG `[Unreleased]` to net state.
- Ran a 6-lens adversarial review; wrote the findings + learnings doc into the
  `agent-plugins` standards repo and committed it there (`b7f621e`).
- Merged PR #160 (squash, `b6afd03`); deploy succeeded; site live.

## Decisions Made

1. **Packet is re-fixing a regression, not new work.** The `_unreleased` P1 plan was
   marked ABSORBED and claimed the base was single-sourced - but only in
   `astro.config.mjs`; deleting the interim module re-duplicated it into the checker.
   Trusting the "absorbed" label would have missed a live regression.
2. **Parameterize `base`, do not just re-import a constant** (significant). If both
   build and checker imported one constant, changing it would move them in lockstep and
   the wrong-base test would be tautological. The standard's preset-migration step 2
   ("lift BASE into parameters with a test") endorses the parameter shape. So
   single-sourcing and the test are one design, not two.
3. **Test imports BASE + value-pin assertion.** Fixture and PASS/default cases derive
   from the imported BASE (so `site-base.mjs` stays the sole literal); one explicit
   `assert.equal(BASE, '/pm-skills')` pins the value. Tests 2-4 prove consumption; test
   1 proves value. Adversary confirmed this split is sound and documented.
4. **Wire the test into CI.** A test that never runs is theater; added a
   `node --test` step to `validation.yml` (runs on both OS legs, doubles as Windows
   temp-path coverage).
5. **Pin Astro 6.4.2 exactly, not latest 6.4.3** (significant). 14.8 conformance is
   family convergence on one resolved set; chasing latest per-repo recreates drift.
   Matched the documented family value; flagged a re-pin-in-lockstep follow-up.
6. **`create-issues` Node via `.nvmrc`** rather than its own pin, to track the family
   single source (moves it 22.12 -> 24; benign, manual workflow_dispatch only).
7. **Accent via non-Tailwind `--sl-color-accent-*` triplet** (this site uses
   `customCss`, not Tailwind); per-mode low/high companions, mid = normative #5C7CFA.
8. **Branch in place, not a worktree.** Reused the installed `site/node_modules`
   (~371 deps) for build-heavy gates; main stayed clean.
9. **CHANGELOG reconciled to net state.** Dropped the now-false "removed the interim
   base module" claim and added `site-base.mjs` under Added, so `[Unreleased]` reads
   coherently (an unreleased section describes net change, not intra-branch churn).
10. **Adversarial review as a 6-lens Workflow fan-out** (diverse lenses, each told to
    refute) - the right shape because the failure modes are heterogeneous and the gates
    are presence-only.
11. **Finding dispositions:** fixed the CLI-guard crash (14.11 guard-robustness),
    the doc count drift (4->5), the git-status overclaim, plus 4 doc/precision nits;
    accepted (with documented rationale) the robots.txt base literal, markdown-remark
    dedup, light-mode contrast, caret-vs-pin, CRLF, setup-node@v6.
12. **Dropped the brittle file-count from the verification log.** "9 files" was a
    bullet-count, not a file-count (10 impl files); replaced with the invariant
    ("no build output tracked"). Counts drift; invariants do not.
13. **Session log -> `SESSION-LOG/`** (repo's gitignored convention), not the skill's
    `AGENTS/session-log/` default, which collides with `agents/` on case-insensitive
    Windows (every `.md` there becomes a sub-agent).

## Files Changed

Code/config (10):
- new `scripts/site-base.mjs` - single base source.
- `scripts/check-rendered-links.mjs` - core parameterized on `base`, guarded CLI entry.
- new `scripts/check-rendered-links.test.mjs` - 5-case wrong-base-fails test.
- `site/astro.config.mjs` - imports BASE.
- new `site/public/robots.txt`.
- `site/src/styles/custom.css` - `#5C7CFA` triplet.
- `site/package.json` + `site/package-lock.json` - Astro 6.4.2.
- `.github/workflows/create-issues-from-drafts.yml` - Node via `.nvmrc`.
- `.github/workflows/validation.yml` - runs the unit test.

Docs (4): `CHANGELOG.md`; `docs/internal/release-plans/astro-starlight-conformance/{spec,release-plan}.md`; supersession note in `_unreleased/astro-site-p1-conformance/plan_*.md`.

Cross-repo: `agent-plugins` findings doc (`standards/domains/astro-sites/rollout/2026-06-02_astro-standard_pm-skills_review-findings.md`, commit `b7f621e`).

## Verification

Tested (evidence-backed):
- [x] `cd site && npm run build` green; 386 HTML files; `sitemap-index.xml` emitted.
- [x] `check-route-parity.mjs` -> 386 baseline = 386 current (PASS).
- [x] `check-rendered-links.mjs` `STRICT_ANCHORS=1` -> 0 broken / 0 anchors (PASS).
- [x] `verify-edit-links.mjs` -> 358 targets resolve (PASS).
- [x] `node --test check-rendered-links.test.mjs` -> 5 pass / 0 fail.
- [x] Guard hardening: `node -e "import(...)"` imports clean (no crash); direct CLI still PASS.
- [x] Base literal: ripgrep confirms `site-base.mjs` is the sole executable declaration.
- [x] `git status`: only intended files; no `dist`/`.astro`/generated content tracked.
- [x] CI on PR #160: `validate` PASS on ubuntu (1m14s) + windows (1m59s); CodeQL PASS.
- [x] Deploy to GitHub Pages run 26857540468 -> success.

Assumed / not independently re-derived:
- The dompurify high-sev vuln is pre-existing (review reasoned it via the dep tree;
  not separately audited this session).
- Visual rendering of the accent (contrast computed, not eyeballed in a browser).

Skipped (out of scope): `npm audit fix` (could churn unrelated deps); browser smoke of the live deploy.

## Evidence Index

- Merge commit: `b6afd03` (PR #160, squash). Pre-change base: `1eea16f`.
- PR: https://github.com/product-on-purpose/pm-skills/pull/160 (MERGED).
- CI (PR): runs 26857459118 (validate) + 26857459197 (CodeQL), all pass.
- Deploy (main): run 26857540468 (Deploy to GitHub Pages) success.
- agent-plugins findings commit: `b7f621e` on main.
- Adversarial review workflow: run `wf_bc0ec63f-107` (6 agents, 164 tool uses, ~288s);
  full result at the task output under this session's tasks dir.
- Transcript dir: C:\Users\jpris\.claude\projects\E--Projects-product-on-purpose-pm-skills\a0ff7c19-8352-4a2c-a2f1-827daf595044\

## Outstanding Issues / Risks

- **Pre-existing high-sev vuln** (`dompurify` 3.4.4 via `astro-mermaid` -> `mermaid`)
  remains on `main`; dependabot alert #19. Not introduced here; triage separately.
- **Family version drift:** pinned 6.4.2 to the documented set; if the family later
  converges on a newer 6.4.x, re-pin in lockstep (not per-repo).
- **`site/package-lock.json` carries two `@astrojs/markdown-remark` copies** (7.1.2
  hoisted, 7.2.0 nested) by design - do NOT `npm dedupe` without re-verifying
  `STRICT_ANCHORS=1`.
- **robots.txt** embeds the base literally (Astro cannot template `public/`); manual
  touchpoint on any base-path change until the shared preset generates it.

## What's Next

1. **Fold the 5 feedback learnings into the standard + sibling packets** (see the
   findings doc, section 5): sharpen the "single-source base" acceptance wording to
   sanction the test value-pin; note CLI-seam guard robustness in the preset's
   "lift BASE into parameters" step; bless/spec robots.txt under Pattern S; state that
   conformance is a lockfile property; flag the light-mode #5C7CFA contrast for the
   shared `accent.css`.
2. **Execute the next sibling rollout** - thinking-framework-skills is "close"
   (P1: delete 7 `.md` sidecars per 14.10; P2: align the `check` job to `.nvmrc`,
   verify the editLink `/site/` segment).
3. **Extract the shared `@product-on-purpose/astro-docs-preset`** (decision A-2), which
   will absorb pm-skills' interim accent + `site-base.mjs` (sequenced "pm-skills last").

## Continuation Prompt

```
Continue the Product on Purpose family Astro site-standard rollout. The pm-skills
conformance (clauses 14.7-14.9) is DONE: merged to main (commit b6afd03, PR #160),
deployed green, and reviewed. The adversarial-review findings + 5 feedback learnings
are at:
  E:\Projects\product-on-purpose\agent-plugins\standards\domains\astro-sites\rollout\2026-06-02_astro-standard_pm-skills_review-findings.md (section 5)

Do these in order:
1. Apply the 5 section-5 learnings to the standard and the sibling packets in
   agent-plugins: SITE-STANDARD.md (clauses 14.7/14.8/14.9 wording), shared-preset-spec.md
   (the "lift BASE into parameters" step should require a process.argv[1] null-guard on
   the CLI seam and own robots.txt generation + the light-mode --sl-color-text-accent),
   and the per-repo packets under .../rollout/. Make these as a normal agent-plugins
   commit (that repo's main allows admin-bypass; docs-only).
2. Then execute the thinking-framework-skills rollout packet
   (.../astro-sites/rollout/thinking-framework-skills.md if present; else derive from
   SITE-STANDARD section 5): P1 delete the 7 .md sidecars (14.10), P2 align the check
   job to node-version-file:.nvmrc and verify the editLink /site/ segment. Same workflow
   pm-skills used: branch in place, run the four build-aware gates + a wrong-base test,
   keep route parity, open a PR, let CI go green on both OS legs, squash-merge.

Reference pm-skills as the worked example: scripts/site-base.mjs (single base source),
scripts/check-rendered-links.{mjs,test.mjs} (parameterized validator + 5-case test),
and docs/internal/release-plans/astro-starlight-conformance/ (spec + release-plan).
House rules: no em/en dashes; do not push/merge without confirmation.
```
