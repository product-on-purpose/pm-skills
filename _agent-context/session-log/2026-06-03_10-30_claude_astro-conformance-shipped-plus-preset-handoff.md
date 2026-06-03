---
date: 2026-06-03T10:30:00-07:00
repo: product-on-purpose/pm-skills (work also spans agent-plugins)
branch: "main (NOTE: the pm-skills working tree is currently checked out to release/v2.25.0 by another session; this work did not touch that tree)"
summary: "Astro 14.7-14.9 conformance shipped+deployed (#160); continuation items found done by a follow-on session; Phase 1 plan+campaign handed off to agent-plugins"
files-changed:
  - "agent-plugins/_LOCAL/planning/2026-06-03_astro-shared-infra-phase1-and-campaign_from-pm-skills-session.md (new, gitignored handoff)"
  - "pm-skills/SESSION-LOG/2026-06-03_10-30_claude_astro-conformance-shipped-plus-preset-handoff.md (this log, gitignored)"
  - "memory: project_astro-pattern-s-convergence.md + MEMORY.md index (updated for #160)"
  - "(the conformance code set was merged earlier this session as PR #160 / b6afd03)"
session-type: refactor
model: claude opus 4.8
model-settings: "ultracode (xhigh + dynamic workflow orchestration); explanatory output style"
agent: claude-code
status: completed
decisions-count: 18
---

# Astro 14.7-14.9 conformance shipped + shared-infra handoff

> Supersedes the mid-session checkpoint `2026-06-02_17-30_claude_astro-site-standard-conformance.md` (which wrapped the conformance work through merge). This entry covers the full session including the post-merge continuation: verifying the next-step items, the scoping/sequencing analysis, and the Phase 1 handoff artifact.

## Summary

Executed and shipped the pm-skills Astro site-standard conformance (clauses 14.7-14.9, ROADMAP Phase 0.2): implemented, 6-lens adversarial review, fixed findings, squash-merged PR #160 (`b6afd03`), confirmed the GitHub Pages deploy went green. Then, asked to check the three forward-looking "next" items, discovered a **follow-on session had already completed items 1 and 2** (folded the review learnings into the standard via agent-plugins #7; landed all four sibling rollouts). Analyzed the remaining work (the shared preset / CI infra), correcting three framing errors, and wrote a Phase 1 implementation plan + cross-repo campaign skeleton as a handoff into agent-plugins. No further pm-skills code shipped in the continuation; the pm-skills tree is occupied by the v2.25.0 release and was left untouched.

## Work Completed

**Conformance arc (shipped; detail in the 17-30 checkpoint log + git):**
- Single-sourced the base path (`scripts/site-base.mjs`), parameterized `check-rendered-links.mjs` on `base` behind a guarded CLI entry, added a 5-case wrong-base-fails test wired into `validation.yml`. Added `robots.txt`, the `#5C7CFA` accent, pinned Astro `6.4.2`, switched the create-issues workflow Node pin to `.nvmrc`.
- 6-lens adversarial review (Workflow fan-out): no CRITICAL/HIGH; fixed a new CLI-guard `pathToFileURL(undefined)` crash + a doc count drift; wrote the findings doc to agent-plugins (`b7f621e`).
- Squash-merged PR #160 (`b6afd03`); CI green both OS legs; deploy succeeded. Updated project memory.

**Continuation (this is the new part):**
- Verified the three "next" items against live git state rather than assuming:
  - Item 1 (fold learnings into the standard/preset/packets): **DONE** by a follow-on session - agent-plugins PR #7 (`6075352`, 18:52 same evening) folded all five of the findings-doc learnings into `SITE-STANDARD.md` + `shared-preset-spec.md` + `ci-standard.md`, and went beyond (favicon promoted to a MUST).
  - Item 2 (thinking-framework-skills rollout): **DONE** - shipped v0.2.1 (#30 + #31 + #32); all four sibling sites are now converged.
  - Item 3 (extract the shared preset): **not started, correctly deferred** to ROADMAP Phase 2; its "all four converged" prerequisite is now met.
- Corrected three framing errors (see Decisions) and wrote the handoff plan: `agent-plugins/_LOCAL/planning/2026-06-03_astro-shared-infra-phase1-and-campaign_from-pm-skills-session.md`.

## Decisions Made (continuation)

(The 13 conformance decisions are in the 17-30 checkpoint log. New decisions this continuation:)

14. **Item 3 was mis-sequenced; Phase 1 is next, not "the preset."** The ROADMAP separates Phase 1 (reusable CI workflow + parameterized validators in a preset *skeleton*) from Phase 2 (the `defineDocsConfig` factory + site migration). "Build the preset" is Phase 2/LATER.
15. **This is not a pm-skills v2.26 release.** It is cross-repo infra with its own versioning (preset `v0.1.0`, workflow `@v1`, standard v0.x). pm-skills is a downstream consumer migrated last, by the untagged docs-site-maintenance pattern (#154/#159/#160). The right container is a fleet campaign record, not a SemVer tag on one repo.
16. **Drive the work from an agent-plugins session.** agent-plugins is the family's neutral control point (fleet-orchestration guide), all planning/standard/campaign artifacts are native there, and it avoids the pm-skills tree that the v2.25.0 release session occupies.
17. **Wrote the handoff to `_LOCAL/planning/` (gitignored).** Matches the existing `_from-<x>-session.md` convention; keeps a cross-session planning note private to the agent-plugins working area.
18. **Did not touch the pm-skills working tree.** It is on `release/v2.25.0` with the other session's uncommitted release edits; only gitignored files (this log) and the agent-plugins `_LOCAL` doc were written, and no `git` ran in the pm-skills tree.

## Files Changed (continuation)

- new (gitignored) `agent-plugins/_LOCAL/planning/2026-06-03_astro-shared-infra-phase1-and-campaign_from-pm-skills-session.md` - the Phase 1 plan + campaign skeleton + repo-boundary map + session guidance.
- new (gitignored) this session log.
- memory: `project_astro-pattern-s-convergence.md` body + description, and the `MEMORY.md` index line, updated for #160 (done earlier in the session).
- No pm-skills tracked files changed in the continuation; the conformance set was the earlier #160 merge.

## Verification

Tested / confirmed (evidence-backed):
- [x] Conformance: build 386 routes, route-parity 386=386, rendered-links `STRICT_ANCHORS=1` 0/0, verify-edit-links 358, unit test 5/5 (pre-merge); CI green both OS on #160; deploy run `26857540468` success.
- [x] Continuation items verified against git: agent-plugins log shows `6075352` (#7, learnings) + the five learnings present verbatim in `SITE-STANDARD.md`; tfs `git tag` shows `v0.2.1` with the conformance-arc commits; ROADMAP "all four converged" confirmed.
- [x] `astro-docs-preset` does not exist (no dir under product-on-purpose/ or Github Repos/); `product-on-purpose/.github` exists but has no `workflows/` dir (Phase 1 greenfield).
- [x] `agent-plugins/_LOCAL/` is gitignored (`.gitignore:2`); agent-plugins tree otherwise clean (only `_agent-context/` untracked, not mine).
- [x] pm-skills tree is on `release/v2.25.0` (the other session); left untouched.

Assumed / not done: did not run the v2.25.0 release session's tests; did not build any Phase 1 artifact (handoff only).

## Evidence Index

- pm-skills conformance: PR #160 = `b6afd03` (squash); CI runs 26857459118 (validate) + 26857459197 (CodeQL); deploy run 26857540468 (success). Findings + review: workflow `wf_bc0ec63f-107`.
- agent-plugins: findings doc `b7f621e`; learnings fold-in `6075352` (#7).
- thinking-framework-skills: `056dbc8` (v0.2.1, #32), `53fd49e` (#31), `53992c9` (#30).
- Handoff doc: `agent-plugins/_LOCAL/planning/2026-06-03_astro-shared-infra-phase1-and-campaign_from-pm-skills-session.md`.
- Authoritative design: `agent-plugins/standards/domains/astro-sites/{ROADMAP,ci-standard,shared-preset-spec,SITE-STANDARD}.md`; fleet model: `agent-plugins/docs/internal/orchestration/{guide,backlog}.md`.
- Transcript dir: C:\Users\jpris\.claude\projects\E--Projects-product-on-purpose-pm-skills\a0ff7c19-8352-4a2c-a2f1-827daf595044\

## Outstanding Issues / Risks

- **pm-skills tree occupied:** v2.25.0 activation-layer release in flight (draft PR #161). Any pm-skills astro consumer work (Phase 1.4 / Phase 2.3) must wait until it ships and the tree is free.
- **Two donor versions of `check-rendered-links`** (askit FIXED vs pm-skills #160) must be reconciled before the preset extraction (both have the argv null-check; confirm askit has bare-relative + both-quote handling).
- **Pre-existing high-sev vuln** (`dompurify` 3.4.4 via `astro-mermaid`->`mermaid`) on pm-skills main; dependabot alert #19; not introduced here.
- **Fleet E1 vs E3 ordering:** the backlog marks E1 (orchestration mechanism) NOW, ahead of E3 (this CI work); decide whether to formalize the campaign machinery first or let this campaign be E1's pilot.

## What's Next (ordered)

1. Start an **agent-plugins-rooted session**; read the handoff doc + the authoritative specs; **review** whether the existing specs/sequencing are still sound before executing.
2. Execute **Phase 1** (reusable workflow `@v1` + preset skeleton with parameterized validators + self-test), pilot on tfs, fan out to askit/wsl, pm-skills last (after v2.25.0).
3. Then Phase 2 (preset factory + migration) and Phase 3 (land STANDARD.md Section 14).

## Continuation Prompt

```
You are starting an agent-plugins-rooted session to advance the Product on Purpose
family's Astro documentation-site standard. Work from the agent-plugins repo
(E:\Projects\product-on-purpose\agent-plugins) as the neutral control point.

CONTEXT (what just happened, do not redo):
- pm-skills per-repo Astro conformance (clauses 14.7-14.9) SHIPPED: PR #160 (b6afd03),
  deployed green. ALL FOUR family sites are now converged (pm-skills #160, tfs #30/v0.2.1,
  agent-skills-toolkit #83, writing-style-catalog #11+#12). ROADMAP Phase 0 is DONE.
- The 2026-06-02 review learnings were already folded into the standard by agent-plugins
  PR #7 (6075352). Do NOT re-fold them.
- The immediate next work is ROADMAP **Phase 1**: a reusable CI workflow + the four
  PARAMETERIZED build-aware validators in a preset skeleton. The preset config-factory +
  site migration are Phase 2 (LATER). This is cross-repo infra, NOT a pm-skills release.

CRITICAL CONSTRAINT:
- The pm-skills working tree is checked out to release/v2.25.0 by ANOTHER session
  (activation-layer hooks, draft PR #161) with uncommitted release edits. DO NOT touch the
  pm-skills working tree until v2.25.0 has shipped. pm-skills' consumer adoption is the LAST
  step of Phase 1 and Phase 2 and is small.

START HERE (read in order, then REVIEW critically before executing):
1. The handoff plan:
   agent-plugins/_LOCAL/planning/2026-06-03_astro-shared-infra-phase1-and-campaign_from-pm-skills-session.md
2. agent-plugins/standards/domains/astro-sites/ROADMAP.md (phases, deps, risks)
3. agent-plugins/standards/domains/astro-sites/ci-standard.md (Phase 1 DESIGN: Section 2 is
   the complete reusable-workflow YAML; Section 4 is the validators + the rollout-hardening
   fixes; Section 6 is the rollout order)
4. agent-plugins/standards/domains/astro-sites/shared-preset-spec.md (preset shape; Section 2
   defines the ci-checks export Phase 1 lands)
5. agent-plugins/docs/internal/orchestration/{guide.md,backlog.md} (the fleet model; E1
   capability is marked NOW, E3 = this CI work; the campaign-record format is E1.2)
6. agent-plugins/standards/domains/astro-sites/rollout/2026-06-02_astro-standard_pm-skills_review-findings.md
   (Section 5 = the donor-hardening learnings)

REVIEW PASS (the user asked for this explicitly):
Before building, critically review the agent-plugins astro work that is supposed to happen:
- Is the Phase 1 plan in the handoff doc sound, and does it match ci-standard.md Section 2/4/6?
  Flag any drift between the handoff plan and the authoritative spec.
- Reconcile the TWO donor versions of check-rendered-links (agent-skills-toolkit FIXED vs
  pm-skills #160): confirm the askit version has bare-relative href resolution + both quote
  styles + the decode guard + the argv[1] null-check before choosing it as the seed.
- Decide the E1-vs-E3 ordering: formalize the fleet campaign machinery (E1) first, or let this
  CI rollout be E1's pilot (E1.3 names exactly this kind of change as the pilot candidate).
- Confirm the campaign-record home (docs/internal/orchestration/campaigns/astro-shared-ci.md)
  and open it from the skeleton in the handoff doc.

THEN EXECUTE Phase 1 (pilot-then-fan-out, no flag day):
1.1 Add .github/workflows/astro-site.yml to product-on-purpose/.github (copy the complete YAML
    from ci-standard.md Section 2); tag @v1. The repo exists but has no workflows/ dir yet.
1.2 Create product-on-purpose/astro-docs-preset (plain ESM, no build step). Land
    ./ci/ci-checks.mjs + the four parameterized validators, seeded from the FIXED
    agent-skills-toolkit versions + pm-skills remark-resolve-links, using pm-skills
    scripts/site-base.mjs (#160) as the BASE parameterization reference. Fold in the
    rollout-hardening fixes (ci-standard Section 4). Add a self-test fixture + a wrong-base
    test. Tag v0.1.0.
1.3 Pilot on thinking-framework-skills: add the ~20-line caller alongside its existing
    workflow as a non-required check; run >=3 PRs + 1 main deploy; confirm parity; make
    required; retire the old workflow.
1.4 Fan out to agent-skills-toolkit, then writing-style-catalog (proves the .md/.mdx remark
    passthrough), then pm-skills LAST (only after v2.25.0 ships).

DISCIPLINE: one PR per repo (the fleet model); record each in the campaign record with
stop-and-flag for any intentional deviation (+ a repo ADR); no silent skips. House rules:
no em/en dashes; do not push or merge without the user's confirmation; pm-skills adoptions
are untagged docs-site maintenance. Consider whether to formalize via the brainstorming ->
writing-plans flow, or execute directly from ci-standard.md Section 2 (the workflow is
copy-ready; the preset/validator extraction is where a written plan adds the most value).
```
