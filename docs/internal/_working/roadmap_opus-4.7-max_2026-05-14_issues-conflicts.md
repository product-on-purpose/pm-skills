---
title: 'Roadmap (2026-05-14) - Issues, Conflicts, and Considerations Log'
description: 'Companion to roadmap_opus-4.7-max_2026-05-14.md. Captures the delta between roadmap proposals and shipped reality (v2.15.0 through v2.16.1), new considerations surfaced post-roadmap (marketplace migration, sub-agent native registration, doc-stack modernization), conflicts between roadmap recommendations and maintainer execution choices, and recommendations for v2.17+ planning.'
date: 2026-05-19
status: active
audience: pm-skills maintainers, v2.17 + v2.18 planners
related:
  - roadmap_opus-4.7-max_2026-05-14.md
  - ../release-plans/v2.17.0/plan_v2.17.0.md
  - ../release-plans/v2.18.0/plan_v2.18.0.md
  - ../release-scoping-v2.17-and-v3.0_2026-05-18.md
  - ../marketplace-multi-plugin-migration_2026-05-18.md
---

# Roadmap (2026-05-14) - Issues, Conflicts, and Considerations Log

**Purpose.** This document tracks delta between the 2026-05-14 strategic roadmap and shipped reality. Use it when planning v2.17.0+ to avoid re-litigating closed decisions, surface emerging concerns the roadmap did not anticipate, and reconcile conflicts between roadmap recommendations and maintainer execution choices.

**Scope.** The roadmap was authored 2026-05-14 against v2.14.2 + locked v2.15.0 plan state. Between then and 2026-05-19, the repo shipped v2.15.0, v2.15.1, v2.15.2, v2.16.0, and v2.16.1. This doc reconciles the roadmap with that shipped state and informs v2.17.0 + v2.18.0 planning.

---

## 1. The shipped vs. proposed delta (high-level)

### 1.1 What the roadmap proposed for v2.16.0

Per roadmap Section 9, v2.16.0 was proposed as **"AI-Native + Orchestration + Hygiene"** with 9 items totaling 15-25 effort-days:

| ID | Item | Type | Effort |
|---|---|---|---|
| R-01 | `measure-eval-suite-spec` | NEW SKILL | 3-4 d |
| R-02 | `develop-prompt-spec` | NEW SKILL | 2-3 d |
| R-03 | `develop-model-card` | NEW SKILL | 2-3 d |
| R-04 | `pm-critic` sub-agent | SUB-AGENT | 2-4 d |
| R-05 | Frontmatter metadata sweep | INFRA | 1-2 d |
| R-06 | `discover-market-sizing` | NEW SKILL | 2-3 d |
| R-07 | `define-prioritization-framework` | NEW SKILL | 2-3 d |
| R-08 | Skill proposal funnel | INFRA | 1-2 d |
| R-09 | Marketplace follow-through | INFRA | 0.5 d |

### 1.2 What v2.16.0 actually shipped (2026-05-18)

| Category | Shipped | Roadmap proposed | Outcome |
|---|---|---|---|
| Sub-agents | 4 (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor) | 1 (pm-critic) | **ACCELERATED 3x.** R-16, R-17, R-18 (originally v2.17.0) pulled forward. |
| Dispatch skills | 4 utility-pm-* skills extending cross-client compatibility | 0 (not in roadmap) | **NEW SCOPE.** Cross-client dispatch pattern emerged from v2.16.0 work; not anticipated in roadmap. |
| Doc-stack modernization | Astro 5.13.x to 6.3.x + Starlight 0.34.x to 0.39.x + Node 22.12+ across 5 workflows | 0 (deferred in roadmap to v2.17+) | **NEW SCOPE.** Doc-stack work was originally deferred; re-promoted into v2.16.0 mid-cycle ("v2.16 round 2"). |
| AI-Native Pack (R-01, R-02, R-03) | 0 skills shipped | 3 skills | **DEFERRED.** Did not ship in v2.16.0. |
| Frontmatter metadata sweep (R-05) | NOT done | 1-2 day sweep | **DEFERRED.** Maintainer chose to defer to v2.17.0. |
| Content gap skills (R-06, R-07) | 0 skills shipped | 2 skills | **DEFERRED.** Did not ship in v2.16.0. |
| Skill proposal funnel (R-08) | NOT done | 1-2 days | **DEFERRED.** |
| Marketplace follow-through (R-09) | NOT done | 0.5 day | **DEFERRED.** |
| Active Orchestration runbook (6-gate release runbook + adversarial review loop + sub-agent compatibility matrix + dispatch pattern) | NEW | 0 | **NEW SCOPE.** Major work the roadmap did not anticipate. |

**Net delta:** v2.16.0 shipped a **DIFFERENT** release than the roadmap proposed. The sub-agent track accelerated; the AI-Native + content + spec-compliance tracks deferred. v2.16.0 added a significant new track (cross-client dispatch + doc-stack) that was not in the roadmap.

### 1.3 What v2.16.1 shipped (2026-05-19)

v2.16.1 was a 3-file patch correcting a v2.16.0 plugin manifest defect:
- Removed invalid `"agents": ["./subagents/"]` field from `.claude-plugin/plugin.json`
- Bumped versions in plugin.json + marketplace.json
- New release notes + master plan + this doc + the marketplace migration doc + the v2.17/v3.0 scoping doc

v2.16.1 was not in the roadmap because the v2.16.0 manifest defect was discovered post-tag. Counts as a **new emergent item**.

---

## 2. Strategic concerns surfaced post-roadmap

### 2.1 Sub-agent native registration is not yet working

**Concern.** v2.16.0 shipped 4 sub-agents in `subagents/`, intending Claude Code to register them via `"agents": ["./subagents/"]` in plugin.json. Claude Code's plugin schema does not include an `agents` field, so v2.16.0's manifest failed validation. v2.16.1 removed the field, leaving the 4 sub-agents in `subagents/` where Claude Code does NOT auto-discover them. Dispatch skills at `skills/utility-pm-*/` work around this via inline execution on every client (validated on Codex CLI 2026-05-17).

**Roadmap context.** The roadmap proposed sub-agents at `agents/` (per Claude Code convention) but did not flag the case-insensitive filesystem collision with the existing tracked `AGENTS/` coordination directory. Roadmap Section 10.1 Open Question 3 mentions sub-agent directory location (top-level `agents/` vs namespaced `agents/pm-skills/`) but does not address the AGENTS collision.

**v2.17.0 resolution path.** Rename `AGENTS/` to `_AGENTS/` (underscore prefix breaks the case-insensitive collision), then rename `subagents/` to `agents/`. Internal reference sweep on ~30-40 files. Verify Claude Code auto-discovers all 4 sub-agents on fresh install. Captured in v2.17.0 release plan as co-primary work alongside the frontmatter metadata sweep.

### 2.2 Marketplace identity rename is a v3.0.0 concern

**Concern.** Post-v2.16.1, the maintainer surfaced a strategic question about marketplace identity: the current marketplace is named `pm-skills-marketplace` and contains one plugin called `pm-skills`. The intended mental model is `product-on-purpose` as the marketplace identity with `pm-skills` and future thematic plugins (e.g., `thinking-framework-skills`) underneath. Two scoping docs were authored 2026-05-18:

- `docs/internal/marketplace-multi-plugin-migration_2026-05-18.md`: target architecture (multi-plugin marketplace under product-on-purpose)
- `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md`: recommends splitting v2.17.0 (sub-agent native registration; additive; low risk) from v3.0.0 (marketplace identity rename; breaking; blocked on verification)

**Roadmap context.** The roadmap does not address marketplace identity. It assumes the current `pm-skills-marketplace` single-plugin model continues indefinitely. The multi-plugin marketplace concept emerged as a separate strategic conversation in mid-May.

**v3.0.0 deferral.** The roadmap implicitly slots all proposed work into v2.16.0 through v2.18.0+ as minor releases. The v3.0.0 marketplace rename is a major-version concern that displaces some roadmap items (specifically: skills + sub-agents continue to ship under pm-skills regardless of marketplace renaming; only the marketplace-level identity changes). v3.0.0 has its own verification work (V1 marketplace-rename behavior test, V2 host-repo strategy decision, V3 cross-repo coordination plan).

### 2.3 Doc-stack modernization was larger than expected

**Concern.** The roadmap (Section 2.3) explicitly named "Astro 6 + Node 22.12+" as a v2.16.0 deferral. Mid-cycle in v2.16.0, the maintainer re-promoted the doc-stack work back into the release ("v2.16 round 2") because Dependabot alerts depended on Astro 6 patches. The doc-stack work consumed multiple days of v2.16.0 effort and absorbed several drift fixes (AO docs count drift, broken links in generated dispatch pages, YAML parse defects in EXAMPLE.md descriptions).

**Roadmap context.** The roadmap classified doc-stack work as Tier 2 deferral (Section 2.3). The mid-cycle re-promotion contradicted the roadmap's scoping but was justified by external pressure (Dependabot, Node version EOL alignment).

**Lesson.** Roadmap Section 2.3 deferrals can be re-promoted by external triggers (security alerts, dependency EOL, platform changes). The roadmap should treat deferrals as "currently deferred unless promoted by external trigger" rather than absolute. This pattern is likely to recur.

### 2.4 Cross-client dispatch is a major new pattern

**Concern.** v2.16.0 introduced the "dispatch skill" pattern: 4 utility-pm-* skills at `skills/utility-pm-{role}/` that detect runtime, attempt native Claude Code sub-agent dispatch, and fall back to inline execution on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI). This pattern is the bridge between Claude Code's native sub-agent runtime and the cross-client ecosystem. The May 7-10 sub-agent strategy docs (referenced by the roadmap) did NOT propose dispatch skills - the pattern emerged from v2.16.0 prep when the maintainer asked "how do non-Claude clients use these sub-agents?"

**Roadmap context.** The roadmap proposes sub-agents (Section 5, R-04 etc.) but treats them as Claude Code-native. Cross-client compatibility is not explicitly addressed for sub-agents.

**Forward implication.** The dispatch pattern adds 4 utility skills to the catalog without adding 4 new content concepts (each dispatch skill mirrors a sub-agent's behavior). Future sub-agents will need a paired dispatch skill OR a documented "Claude Code only" caveat. The runbook for adding a new sub-agent needs to address this dual-shipping question. Captured in v2.17.0 as a Note item; not blocking.

### 2.5 Frontmatter metadata sweep timing pressure increased

**Concern.** The roadmap proposed R-05 (frontmatter metadata sweep) as a 1-2 day v2.16.0 hygiene item. v2.16.0 deferred it. As of 2026-05-19, the catalog has 59 skills (vs. 40-55 at roadmap authoring). Each shipped skill that uses old-style top-level proprietary fields is technical debt that the sweep eventually pays back. Each new skill shipped between now and the sweep adds to that debt.

**Roadmap context.** The roadmap recognized the agentskills.io spec adoption pressure (12+ tools) but did not foresee that the sweep would be deferred across two releases. Now there's also a question of whether new v2.18.0 skills should be authored in the NEW (post-R-05) structure to avoid contributing to the debt.

**v2.17.0 resolution.** R-05 is PRIMARY in v2.17.0. v2.18.0 skills will be authored in the new structure (after R-05 ships) to avoid contributing to migration debt.

### 2.6 Active Orchestration runbook is a new shipping unit

**Concern.** v2.16.0 introduced a non-trivial new conceptual layer: the 6-gate release runbook + Phase 0 Adversarial Review Loop + sub-agent compatibility matrix + dispatch skill pattern + utility-pm-* skill class + dispatch chain composition pattern. These are not "more skills" but a new dimension of the plugin. The roadmap recognized "active orchestration" as Theme B but did not anticipate that the v2.16.0 ship would include a release runbook codifying a specific 6-gate protocol.

**Roadmap context.** The roadmap proposes a `pm-release-conductor` sub-agent (R-16, v2.17.0) but does not describe a 6-gate runbook codification. The actual v2.16.0 ship includes both the sub-agent AND the canonical runbook document (`docs/contributing/release-runbook.md`).

**Forward implication.** The runbook is now a load-bearing artifact. Changes to it require maintainer approval. v2.17.0 + v2.18.0 should not modify the runbook except via explicit Decision Brief items. Captured in v2.17.0 as a guardrail.

---

## 3. Roadmap recommendations vs. shipped reality (item-level)

### 3.1 ACCELERATED (shipped earlier than roadmap proposed)

| ID | Roadmap proposed | Shipped in |
|---|---|---|
| R-04: `pm-critic` sub-agent | v2.16.0 | v2.16.0 (ON TIME) |
| R-16: `pm-release-conductor` sub-agent | v2.17.0 | v2.16.0 (1 release early) |
| R-17: `pm-changelog-curator` sub-agent | v2.17.0 | v2.16.0 (1 release early) |
| R-18: `pm-skill-auditor` sub-agent | v2.17.0 | v2.16.0 (1 release early) |

**Why.** The May 10 sub-agent implementation plan had detailed specs ready for all 4. The maintainer chose to ship them together as a coherent "Active Orchestration" theme rather than staggering across two releases. Reasonable execution choice; not a roadmap failure.

### 3.2 DEFERRED (slipped from roadmap-proposed release to later)

| ID | Roadmap proposed for | Now expected in | Why deferred |
|---|---|---|---|
| R-01: `measure-eval-suite-spec` | v2.16.0 | v2.19.0+ (uncommitted) | v2.16.0 capacity consumed by sub-agents + doc-stack |
| R-02: `develop-prompt-spec` | v2.16.0 | v2.19.0+ (uncommitted) | Same |
| R-03: `develop-model-card` | v2.16.0 | v2.19.0+ (uncommitted) | Same |
| R-05: Frontmatter metadata sweep | v2.16.0 | **v2.17.0** (committed) | v2.16.0 scope cap |
| R-06: `discover-market-sizing` | v2.16.0 | **v2.18.0** (committed) | v2.16.0 scope cap; promoted to v2.18 highest-consensus set |
| R-07: `define-prioritization-framework` | v2.16.0 | **v2.18.0** (committed) | Same |
| R-08: Skill proposal funnel | v2.16.0 | v2.19.0+ (uncommitted) | v2.16.0 scope cap |
| R-09: Marketplace follow-through | v2.16.0 | v2.19.0+ (uncommitted) | v2.16.0 scope cap; also intersects with v3.0.0 marketplace rename |
| R-10: `discover-journey-map` | v2.17.0 | **v2.18.0** (committed) | Promoted to v2.18 highest-consensus set per maintainer scoping |
| R-11: `measure-survey-analysis` | v2.17.0 | **v2.18.0** (committed) | Same |
| R-12: `develop-pre-mortem` | v2.17.0 | v2.19.0+ (uncommitted) | Not in v2.18 highest-consensus four |
| R-13: `develop-product-vision` | v2.17.0 | v2.19.0+ (uncommitted) | Same |
| R-14: `develop-ai-failure-mode-catalog` | v2.16.1 | v2.19.0+ (uncommitted) | AI-Native pack collectively deferred |
| R-15: `develop-rollout-plan` | v2.16.1 | v2.19.0+ (uncommitted) | v2.16.1 was a manifest patch only |
| R-19: Reviewer pairing for top 5 artifacts | v2.16.1 + v2.17.0 | v2.19.0+ (uncommitted) | Deferred until pm-critic adoption signal accumulates |
| R-21: `deliver-roadmap` | v2.17.0 | v2.19.0+ (uncommitted) | Not in v2.18 highest-consensus four |
| R-24: PostToolUse hook | v2.16.1 | v2.19.0+ (uncommitted) | First hook still not shipped |

**Net.** Of 17 roadmap items proposed for v2.16.0 through v2.17.0, **9 deferred** to v2.19.0+ (uncommitted), **5 committed** to v2.17.0 or v2.18.0, **3 shipped on time** (sub-agents in v2.16.0).

### 3.3 NEW (not in roadmap; shipped in v2.16.x)

| Item | Shipped in | Rationale |
|---|---|---|
| 4 dispatch skills at `skills/utility-pm-*/` | v2.16.0 | Cross-client compatibility pattern; emerged from v2.16.0 prep |
| 6-gate release runbook + Phase 0 adversarial review loop | v2.16.0 | Codified maintainer's manual release discipline |
| Sub-agent compatibility matrix doc | v2.16.0 | Cross-client status tracking |
| Doc-stack modernization (Astro 6.3.x + Starlight 0.39.x + Node 22.12+) | v2.16.0 | Re-promoted from Tier 2 deferral due to Dependabot pressure |
| `_pairing.yaml`, `_chain-permitted.yaml` manifests | v2.16.0 | Sub-agent governance |
| v2.16.1 plugin manifest schema patch | v2.16.1 | Emergent (post-v2.16.0 defect discovery) |
| Marketplace migration architecture doc | v2.16.1 | Strategic conversation surfaced post-v2.16.0 |
| v2.17/v3.0 release scoping doc | v2.16.1 | Companion to marketplace migration doc |

### 3.4 REJECTED or RECLASSIFIED

Roadmap proposed; the maintainer rejected or scoped-out:

| Item | Maintainer choice | Reason |
|---|---|---|
| R-04 sub-agent at `agents/pm-skills/` namespace (Section 10.1 OQ3) | Single `subagents/` (not namespaced) | Simpler; namespace question deferred until 3rd skill family ships |
| R-19 paired-reviewer naming as `prd-review` (Section 10.1 OQ5) | TBD; not yet committed | Hold for adoption signal first |
| R-09 marketplace name change (Section 10.1 OQ7) | Deferred to v3.0.0 | Bundled with marketplace identity rename |
| X-08 specialized Mermaid generators | Confirmed reject | Generic `utility-mermaid-diagrams` is sufficient |

---

## 4. New ideas, considerations, and recommendations

### 4.1 v2.17.0 should ship the metadata sweep AND the AGENTS rename together

**Why.** Both are cross-cutting structural changes. Bundling them in one release minimizes the surface-area churn for downstream consumers (`pm-skills-mcp`, doc-stack templates, external validators). Two cross-cutting changes shipped together is 1.5x the work of one but 2x the audit value (consumers update once, not twice).

**Recommendation.** v2.17.0 PRIMARY = frontmatter metadata sweep + AGENTS rename. CO-SHIP, not sequential.

### 4.2 v2.18.0 should hold the line on "4 new skills + nothing else"

**Why.** The roadmap's Risk 1 warns about AI-Native Pack scope creep. The same risk applies to v2.18.0 if "content additions" gets expanded mid-cycle to include AI-Native items (R-01 through R-03) or other deferred work. Holding v2.18.0 to exactly 4 skills creates a clean release narrative and prevents the v2.16.0 pattern (scope creep mid-cycle) from recurring.

**Recommendation.** v2.18.0 = R-06, R-07, R-10, R-11 + their commands + samples + nothing else. AI-Native Pack waits for v2.19.0+. Roadmap deferrals 3.2 above remain deferred.

### 4.3 Reviewer-pairing pattern (R-19) needs adoption signal before committing

**Roadmap context.** R-19 (paired reviewers for top 5 artifacts) was proposed for v2.16.1 + v2.17.0. Did not ship.

**Concern.** pm-critic shipped in v2.16.0 as the cross-cutting fallback. Paired reviewers are the "durable specialization" per the roadmap. But there's no signal yet on whether maintainers find pm-critic sufficient or want artifact-specific reviewers. Shipping 5 paired reviewers without that signal is a bet, not a response.

**Recommendation.** Hold R-19 for v2.19.0+ pending: (a) at least 30 days post-v2.16.1 of pm-critic usage, (b) a documented case where pm-critic was insufficient for a specific artifact type. If neither materializes by 2026-07, reconsider whether R-19 is still the right pattern.

### 4.4 Hook infrastructure (R-24) is the smallest first step that has slipped twice

**Roadmap context.** R-24 (PostToolUse hook for skill frontmatter validation) was proposed for v2.16.1 (or v2.16.0 follow-on). Did not ship in either.

**Concern.** Hooks are the missing nervous system per roadmap Theme B. v2.16.0 shipped 4 sub-agents and the dispatch pattern, but zero hooks. The "ship one hook, iterate" principle in roadmap Section 10.2 has now been deferred twice.

**Recommendation.** Consider R-24 for v2.17.1 as a low-risk fast-follow. The frontmatter validation hook pairs naturally with the R-05 metadata sweep (validates the new structure on every Edit/Write to skills/). v2.17.0 ships the sweep + AGENTS rename; v2.17.1 ships the hook that protects the new structure. Effort: 1 day.

### 4.5 The 5 v2.16.0 carried-over CI validators need a triage

**Concern.** The current v2.17.0 stub lists 5 CI validators carried from v2.16.0 (check-em-dashes, check-runtime-components-sync, check-sub-agent-command-pair, check-aggregate-counters, chain-permitted enforcement). The TIGHT v2.17.0 scope defers them. They're independently valuable but uncommitted.

**Recommendation.** Re-triage at end of v2.17.0 cycle. Roll any that pair naturally with the AGENTS rename (e.g., `check-sub-agent-command-pair` since the rename moves where sub-agents live) into v2.17.1. Defer the rest to v2.19.0. Don't let them quietly slip across 3+ releases.

### 4.6 Marketplace migration (v3.0.0) verification work should start in parallel with v2.17.0

**Concern.** Per `release-scoping-v2.17-and-v3.0_2026-05-18.md` V1, the marketplace-rename behavior test on Claude Code is unestimated and gates v3.0.0 scheduling. If we wait until v2.17 + v2.18 ship before starting V1, v3.0.0 cannot ship until 3+ cycles out.

**Recommendation.** Run V1 (sacrificial test marketplace + name-field change + observe behavior) in parallel with v2.17.0 prep. Outcome feeds the v3.0.0 plan stub. Effort: 2-4 hours including teardown. Doesn't block v2.17.0; surfaces information that informs v2.18.0 scheduling.

### 4.7 Memory snapshot needs refresh

**Concern.** `C:\Users\jpris\.claude\projects\E--Projects-product-on-purpose-pm-skills\memory\MEMORY.md` still says "Latest tagged version: v2.15.0" with rich v2.15.0 state details. Reality is v2.16.1 (with v2.15.1, v2.15.2, v2.16.0 in between). Memory drift is now 4 releases stale.

**Recommendation.** Refresh memory at end of this session (or next) with current v2.16.1 state. Capture: 59 skills, 4 sub-agents, 4 dispatch skills, doc-stack on Astro 6.3.x, deferred work backlog. The `feedback_pre-tag-validator-bundle` memory rule remains current and valuable; the project state block is what needs updating.

### 4.8 Marketplace-rename behavior unknown is also a sub-agent-registration concern

**Concern.** The marketplace migration concerns Claude Code's behavior when a marketplace's `name` field changes. The AGENTS rename concerns Claude Code's behavior when a sub-agent directory is renamed. Both are "Claude Code behavior on rename" concerns. We should test BOTH in the same sacrificial-marketplace session if practical.

**Recommendation.** When running v3.0.0 V1 (marketplace name change), also test "what happens when a plugin's `subagents/` becomes `agents/` between updates?" Specifically: do users on v2.16.1 (with `subagents/`) cleanly transition to v2.17.0 (with `agents/`) on `/plugin update`, or does the cache hold the old directory layout? Useful to know before shipping v2.17.0.

### 4.9 The v2.16.1 G4 P0 attestation is still pending

**Concern.** v2.16.1 G4 P0 smoke test (3-scenario Claude Code install path verification) was deferred to a follow-up session. Until attested, v2.16.1 is in "Release IN PROGRESS - awaiting maintainer P0 runtime attestation" state per conductor D23. v2.17.0 work technically should not start path-rewriting until v2.16.1 G4 P0 is confirmed passing.

**Recommendation.** Maintainer should run the 3 P0 scenarios on Claude Code before significant v2.17.0 implementation work begins. v2.17.0 PLANNING (this session) is fine; v2.17.0 EXECUTION should wait on G4 P0 attestation. If G4 P0 fails, v2.16.2 ships before v2.17.0; if it passes, v2.17.0 proceeds.

### 4.10 The "AI-Native PM Pack" deferral is competitive risk

**Concern.** Roadmap Risk 8 warned: "If Phuryn or Dean Peters ships an AI Evals skill in the next 3 months, the differentiation argument weakens." Roadmap was authored 2026-05-14. As of 2026-05-19 (5 days later) the AI-Native Pack is still deferred. Total window from roadmap to first AI-Native skill (if v2.19.0) could be 4-6 weeks. Competitor catch-up risk is real.

**Recommendation.** Consider promoting `measure-eval-suite-spec` (R-01) into v2.18.0 alongside the 4 highest-consensus skills - it has 1-source signal (web research only) but is the highest-leverage single content gap. Alternative: explicitly accept the competitive risk and commit AI-Native Pack to v2.19.0 with a release-narrative claim that we are the first PM-skills repo to ship eval-suite. Maintainer judgment call.

---

## 5. Conflicts to resolve (decision items)

### 5.1 CONFLICT: existing v2.17.0 stub PRIMARY theme vs. user-directed PRIMARY theme

**Conflict.** The v2.17.0 stub at `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` (updated 2026-05-19 during v2.16.1 G4) framed sub-agent native registration as the PRIMARY theme. The maintainer's 2026-05-19 directive (after v2.16.1 ship) reframes v2.17.0 PRIMARY as the frontmatter metadata sweep, with AGENTS rename as co-primary.

**Resolution.** The replacement plan (this v2.17.0 plan rewrite) lists BOTH as co-primary themes. Order in the plan: frontmatter metadata sweep first (because it's the new directive), AGENTS rename second (because it was already scoped). No information lost; both ship in v2.17.0.

### 5.2 CONFLICT: roadmap proposes v2.17.0 has 3 sub-agents + 5 content skills (17-25 days); current plan has 2 items (3-5 days)

**Conflict.** Roadmap Section 9 lists v2.17.0 as 9 items totaling 17-25 effort-days (3 sub-agents + 5 content skills + 1 sub-agent for reviewer pairing). User-directed v2.17.0 has 2 items at 3-5 days (frontmatter sweep + AGENTS rename).

**Resolution.** The roadmap's v2.17.0 shaping assumed v2.16.0 shipped exactly the 9 items proposed (which it didn't). With v2.16.0 having shipped 4 sub-agents instead of 1, the v2.17.0 sub-agent slate (R-16 + R-17 + R-18) is no longer needed. The 5 content skills get re-distributed: 4 to v2.18.0 (highest-consensus), 1 (`deliver-roadmap`) defers to v2.19+. R-19 (reviewer pairing) defers per recommendation 4.3. Net: roadmap's v2.17.0 dissolves; user-directed v2.17.0 is a hygiene-focused release.

### 5.3 CONFLICT: 6-gate release runbook codified in v2.16.0 vs. roadmap's "ship pm-release-conductor" framing

**Conflict.** The roadmap (R-16) frames the release conductor as a sub-agent that walks an implicit runbook. v2.16.0 codified the runbook as an explicit canonical document (`docs/contributing/release-runbook.md`) that the conductor reads at invocation time. The roadmap did not anticipate this referential-prompt pattern.

**Resolution.** Honor the v2.16.0 codification. The runbook is now load-bearing; changes require Decision Brief. Roadmap should be updated (Section 9 v2.17.0 entry + Section 6 R-16 detail) to acknowledge the runbook artifact. Captured below in roadmap update recommendations.

### 5.4 CONFLICT: dispatch skill pattern adds 4 utility skills not in roadmap counts

**Conflict.** Roadmap Section 12.1 projects 78 total skills across all P0-P3 work. v2.16.0 added 4 dispatch skills that count toward the 78 (or extend it). Roadmap classification table doesn't include "dispatch skill" as a category.

**Resolution.** Roadmap update recommendation: add a footnote to Section 12.1 acknowledging that the catalog now includes 4 dispatch skills (utility-pm-*) that mirror sub-agents on non-Claude clients. Each new sub-agent in future cycles likely ships with a paired dispatch skill (or explicit "Claude Code only" exemption). Count to 80+ skills by end of all P0-P3 work, not 78.

### 5.5 CONFLICT: Section 10.1 OQ3 (sub-agent directory namespacing) was decided differently than roadmap recommended

**Conflict.** Roadmap Section 10.1 OQ3 recommended `agents/pm-skills/` namespacing. v2.16.0 shipped sub-agents at top-level `subagents/` (which becomes `agents/` in v2.17.0). No namespacing.

**Resolution.** Honor the v2.16.0 + v2.17.0 maintainer choice (no namespacing). If a future cross-cutting sub-agent (e.g., `cross-llm-review`) needs separate handling, namespacing can be added then. Roadmap update: revise OQ3 recommendation to "no namespacing in v2.17.0; revisit when 3rd skill family or cross-cutting sub-agent surfaces."

### 5.6 CONFLICT: v2.16.0 v2.16.1 deferral list vs. existing v2.17.0 stub

**Conflict.** The current v2.17.0 stub (169 lines) accumulated deferral items from v2.15.x, v2.16.0, AND v2.16.1. With TIGHT v2.17.0 scope (2 items), many of those deferrals fall further to v2.19+ or get folded into v2.17.1 fast-follow.

**Resolution.** New v2.17.0 plan explicitly enumerates deferrals (recommendations 4.4 + 4.5 above). Items that pair naturally with v2.17.0 work (R-24 hook, check-sub-agent-command-pair) become v2.17.1 candidates. Others defer to v2.19+ with explicit rationale.

---

## 6. Roadmap updates required

The following changes should be reflected in `roadmap_opus-4.7-max_2026-05-14.md` Section 14 (Change Log) and inline:

### 6.1 Section 9 (Per-Release Shaping) updates

- **v2.16.0**: Rewrite to reflect actual shipped scope (4 sub-agents + dispatch pattern + doc-stack modernization; AI-Native + R-05 + content skills DEFERRED)
- **v2.16.1**: NEW SECTION (manifest patch + scoping docs)
- **v2.17.0**: Replace proposed slate with actual TIGHT scope (R-05 + AGENTS rename)
- **v2.18.0+**: Update to reflect 4 highest-consensus skills as v2.18.0 lock

### 6.2 Section 10.1 (Open Decisions) resolutions

- **OQ3**: Sub-agent directory location RESOLVED as top-level `subagents/` then `agents/` (no namespacing)
- **OQ5**: Reviewer-pairing naming - DEFER pending R-19 adoption signal

### 6.3 New Section 9.5 (Multi-cycle deferrals)

Add a section enumerating items deferred across 3+ releases (R-08, R-09, R-24, AI-Native Pack) with rationale and re-promotion criteria.

### 6.4 Section 12.1 (skill count projection) footnote

Add footnote about 4 dispatch skills and future paired-dispatch pattern affecting skill counts.

### 6.5 Change log entry

Add 2026-05-19 entry to Section 14 documenting reconciliation with shipped state.

---

## 7. Next steps (ordered with dependencies)

Each step has: **Action** / **Owner** / **Timing** / **Output** / **Blocking status**.

### STEP 1: v2.16.1 G4 P0 runtime attestation (BLOCKING for v2.17 execution)

- **Action**: On a Claude Code session, run the 3-scenario P0 smoke test per `release-plans/v2.16.1/plan_v2.16.1.md` G4 section: (a) `/plugin marketplace update` + `/plugin update pm-skills` on existing v2.15.x install; (b) `/plugin marketplace add product-on-purpose/pm-skills` + `/plugin install pm-skills@pm-skills-marketplace` on fresh install; (c) `/pm-audit-repo` to verify dispatch skill resolves on Claude Code
- **Owner**: Maintainer
- **Timing**: ASAP. Blocks v2.17.0 execution per v2.17 D6 entrance criteria.
- **Output**: Edit `release-plans/v2.16.1/plan_v2.16.1.md` status block: flip "PARTIAL PASS - DEFERRED" to either "FULL PASS - SHIPPED" or "G4 P0 FAIL - v2.16.2 fast-patch required"
- **If FAIL**: Ship v2.16.2 fast-patch BEFORE v2.17.0 starts. Likely fix: re-investigate plugin manifest (file-level verification PASS means schema is correct, so any failure means a different root cause).

### STEP 2: v3.0 V1 marketplace-rename behavior test (PARALLEL with Step 1; informs v2.17 + v3.0)

- **Action**: Stand up sacrificial test marketplace per `release-scoping-v2.17-and-v3.0_2026-05-18.md` Section V1. Push a `name`-field change. Observe Claude Code's behavior on `/plugin marketplace update` from (a) a fresh install and (b) an existing install. Document the behavior across the 3 sub-cases (silent auto-update / documented migration / silent stale).
- **Owner**: Maintainer (cannot be automated from this session)
- **Timing**: Can run in parallel with Step 1. Should complete BEFORE v2.17.0 G2.5 push because V1 also probes "what happens when `subagents/` becomes `agents/` between updates" which is critical for v2.17's rename verification.
- **Output**: Update `release-scoping-v2.17-and-v3.0_2026-05-18.md` V1 section with observed behavior + documented migration path; informs v3.0.0 scheduling
- **Effort**: 2-4 hours including teardown
- **Not blocking v2.17.0 alone** but blocking confidence-in-v2.17 since the rename behavior question applies to both

### STEP 3: Commit + push planning docs (THIS SESSION)

- **Action**: Commit the 9 files authored in this session (issues-conflicts doc + roadmap change log + v2.17 plan rewrite + 2 v2.17 specs + v2.18 plan + 4 v2.18 SKILL.md drafts)
- **Owner**: claude-opus-4.7 (this session)
- **Timing**: NOW
- **Output**: Single commit on main: `docs(planning): v2.17/v2.18 plans + roadmap reconciliation`
- **Not blocking**: planning docs are notes-on-the-future, not load-bearing release artifacts

### STEP 4: Execute v2.17.0 (AFTER Step 1 PASS + Step 2 informs)

- **Action**: Walk the 6-gate runbook for v2.17.0 per `release-plans/v2.17.0/plan_v2.17.0.md`. W1 = frontmatter sweep; W2 = `_AGENTS/` + `agents/` renames. Use `/pm-release v2.17.0` once the runtime is registered (which it will be only after v2.17.0 G3 push; so the FIRST release using native conductor invocation is v2.18.0).
- **Owner**: Maintainer + claude-opus-4.7 walking the runbook
- **Timing**: After Step 1 (v2.16.1 G4 P0 PASS) and Step 2 informs (V1 outcome known)
- **Output**: v2.17.0 tagged + shipped + GitHub Release published
- **Effort**: 3-5 effort-days for content; 1 day for release-prep + runbook walk

### STEP 5: Decide v2.17.1 fast-follow scope (1 week after v2.17.0 G3 tag)

- **Action**: Decide whether v2.17.1 includes (a) R-24 PostToolUse hook for skill frontmatter validation (pairs with W1 metadata structure as a protector); (b) check-sub-agent-command-pair validator (pairs with W2 agents/ rename since pairing manifest moved); OR push both to v2.19.0
- **Owner**: Maintainer
- **Inputs**: v2.17.0 post-tag observation period (1 week recommended) - did any drift surface? did anyone report defects?
- **Output**: Create `release-plans/v2.17.1/plan_v2.17.1.md` stub if committing, OR add items to v2.19.0 deferral list
- **Timing**: ~1 week after v2.17.0 G3 tag
- **Not blocking** v2.18.0 work

### STEP 6: Decide AI-Native Pack timing (BEFORE v2.18.0 G0)

- **Action**: Decide whether to promote R-01 (`measure-eval-suite-spec`) into v2.18.0, making it a 5-skill release instead of 4. Per roadmap Section 10.3 Risk 8 (competitive catch-up risk).
- **Owner**: Maintainer
- **Inputs**: Has Phuryn / Dean Peters / Anthropic shipped an AI Evals skill? (web check). Team capacity for 5 skills vs 4. Strategic positioning urgency.
- **Output**: Update `release-plans/v2.18.0/plan_v2.18.0.md` if promoted (D12 decision flips). Otherwise reaffirm v2.20+ commitment with a 2026-08 reality check trigger ("if no competitor has shipped by then, hold; if competitor has shipped, promote to v2.20 immediately").
- **Timing**: Before v2.18.0 G0 starts

### STEP 7: Decide v2.18.0 5th-skill promotion (`develop-pre-mortem` R-12 or `develop-product-vision` R-13)

- **Action**: Decide whether to add R-12 or R-13 as a 5th v2.18.0 skill (alternative to STEP 6's AI-Native promotion)
- **Owner**: Maintainer
- **Inputs**: Effort cap (current 8-12 days; +1 skill = 10-15 days). Multi-source consensus (both R-12 and R-13 have 2-source signal; the 4 locked have 3-source).
- **Output**: Update v2.18.0 plan if either promoted
- **Timing**: Before v2.18.0 G0 starts. Can be revisited during v2.18.0 G1 review.

### STEP 8: Execute v2.18.0 (AFTER Steps 6-7 decisions; AFTER v2.17.0 SHIPPED)

- **Action**: Walk the 6-gate runbook for v2.18.0 per `release-plans/v2.18.0/plan_v2.18.0.md`. Author 4 SKILL.md files from drafts; create 4 TEMPLATE.md + 4 EXAMPLE.md + 12 thread-aligned samples + 4 companion commands.
- **Owner**: Maintainer + claude-opus-4.7
- **Timing**: AFTER v2.17.0 ships (entrance criteria D11)
- **Output**: v2.18.0 tagged + shipped + GitHub Release published; skill count 59 to 63 (or 64-65 if Steps 6/7 promoted)
- **Effort**: 8-12 effort-days for content (or 10-15 if 5 skills)

### STEP 9: 30-day pm-critic adoption signal review (~30 days after v2.17.0 ships)

- **Action**: Track usage of the 4 sub-agents over 30 days post-v2.17.0. Specifically: maintainer's own usage frequency; any specific defects reported; any cases where pm-critic was insufficient and a more-specialized reviewer would have helped.
- **Owner**: Maintainer
- **Inputs**: Maintainer's session logs; any community feedback; any GitHub issues referencing pm-critic / pm-skill-auditor / etc.
- **Output**: Decide v2.20+ inclusion of R-19 (paired-reviewer pattern for top 5 artifacts) per the 30-day adoption signal criterion in issues-conflicts Section 4.3.
- **Timing**: Continuous; first formal review ~30 days after v2.17.0 ships

### STEP 10: Memory snapshot maintenance (ONGOING)

- **Action**: Update `MEMORY.md` project-state block at each release ship (G4 P2 reminder in every release plan).
- **Owner**: Maintainer (or claude-opus-4.7 if asked to refresh at end of a session)
- **Current state**: Memory is 4 releases stale (says "Latest tagged version: v2.15.0"; reality is v2.16.1)
- **Output**: Future Claude sessions load fresh repo-state context
- **Timing**: G4 P2 reminder per release; ad-hoc refresh whenever drift exceeds 1 release

---

### Quick sequence diagram

```
NOW: Step 3 (this session: commit + push planning docs)
  |
  +-- Step 1 (maintainer: v2.16.1 G4 P0 attestation) ----+
  |                                                       |
  +-- Step 2 (maintainer: v3.0 V1 marketplace test)    --+
                                                          |
                                                          v
                                            Step 4 (v2.17.0 execution)
                                                          |
                                                          v
                                            Step 5 (v2.17.1 scope decision; +1 week)
                                                          |
                                                          v
                                            Steps 6-7 (v2.18.0 scope decisions)
                                                          |
                                                          v
                                            Step 8 (v2.18.0 execution)
                                                          |
                                                          v
                                            Step 9 (30-day pm-critic signal review)

Ongoing: Step 10 (memory snapshot maintenance)
```

---

## 8. Change log

| Date | Author | Change |
|---|---|---|
| 2026-05-19 (mid-session) | claude-opus-4.7 (in v2.16.1 G4 follow-up session) | Initial issues-conflicts capture. Reconciled roadmap with v2.15.0 through v2.16.1 shipped state. Identified 9 NEW concerns post-roadmap, 8 conflicts requiring resolution, 8 open maintainer questions, 17 recommendations. Drove TIGHT v2.17.0 scope decision (R-05 + AGENTS rename) and v2.18.0 lock to 4 highest-consensus skills (R-06, R-07, R-10, R-11). |
| 2026-05-19 (late-session) | claude-opus-4.7 (continued v2.17/v2.18 scoping) | Added two sub-decisions to Section 5 conflicts: (a) Section 5.1 CONFLICT resolved with TIGHT v2.17.0 scope - frontmatter metadata sweep (R-05) is PRIMARY co-equal with the AGENTS/subagents rename (which now has its own resolution below); (b) sub-agent directory naming question resolved as Path B1 (rename `subagents/` to `agents/` with `AGENTS/` to `_AGENTS/` prerequisite). Path B1 chosen over Path A2 (retracting dispatch skill description promises) after concrete-behavior comparison showed: (i) dispatch skill descriptions already PROMISE native @-mention dispatch on Claude Code; (ii) without the rename, the descriptions are aspirational rather than accurate; (iii) Path A2 would require sweeping 10-15 docs to retract; (iv) Path B1 = ~30-40 file references swept + 2 directory renames, comparable effort; (v) Path B1 buys proactive pm-critic invocation + parallel sub-agent invocation + context-isolation; Path A2 buys back the semantically clearer `subagents/` name. Rename target locked as `_AGENTS/` (underscore prefix) because: (i) smallest diff (1-char prepend on all path refs); (ii) fits repo's underscore-prefix convention (`_workflows/`, `_NOTES/`, `_LOCAL/`, `_staging/`); (iii) resolves case-insensitive collision unambiguously; (iv) preserves uppercase semantics. v2.17.0 plan + 2 specs + v2.18.0 plan + 4 SKILL.md drafts authored 2026-05-19 capturing the resolution. |

---

## 9. Cross-references

- Original roadmap: `roadmap_opus-4.7-max_2026-05-14.md`
- v2.16.1 release plan: `../release-plans/v2.16.1/plan_v2.16.1.md`
- v2.16.1 G1 review artifact: `../release-plans/v2.16.1/plan_v2.16.1_reviewed-by-claude.md`
- v2.17.0 release plan (this drives): `../release-plans/v2.17.0/plan_v2.17.0.md`
- v2.18.0 release plan (this drives): `../release-plans/v2.18.0/plan_v2.18.0.md`
- Marketplace migration architecture (v3.0.0 target): `../marketplace-multi-plugin-migration_2026-05-18.md`
- v2.17/v3.0 release scoping: `../release-scoping-v2.17-and-v3.0_2026-05-18.md`
- Canonical release runbook (v2.16.0+ shipped artifact): `../../contributing/release-runbook.md`
