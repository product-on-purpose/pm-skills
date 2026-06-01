# Backlog and Issue Capture Convention

Status: Proposed convention + reconciled snapshot (the snapshot becomes generated in Phase 7)
Date: 2026-05-31
Owner: Maintainers
Supersedes: `backlog-canonical.md` (which violated the repo's own "no second canonical backlog file" rule and had drifted ~26 days)
Companion to: `docs/internal/audit/2026-05-31_audit-internal.md`, `docs/internal/restructure-plan_2026-05-31.md`

> **Decision (D2): GitHub issues are the single system of record for backlog and lifecycle. This file becomes a generated, read-only mirror.** Until the generator ships (Phase 7), the snapshot in Section 5 is hand-reconciled and carries the live state as of 2026-05-31. Do not treat the snapshot as authoritative once the generator exists; treat issues as authoritative always.

---

## 1. Why the old model failed

`backlog-canonical.md` was a tracked file named "canonical" whose first content line said GitHub issues are canonical. Three policy docs forbid exactly that file. It carried its own priority order and release mapping, so a human had to keep it in sync with issues by hand. That sync failed: F-17/F-18 were the top "priority" rows yet had no issue; `#118`/`#119` stayed open after their skills shipped; the table still read "Backlog (v2.11.0)" at tag v2.22.0.

**Root cause:** two systems of record competing, reconciled by discipline. **Fix:** one system of record (issues), one generated view (this file), reconciled by a build step and a tag-time drift check.

> **Insight.** A hand-maintained backlog file is a liability the moment the project moves faster than the maintainer updates it - which is always. The generated-mirror model is not bureaucracy; it is the only version that stays true without willpower. The same instinct underlies making `HISTORY.md` backfillable and the skill catalog buildable: if the data has one source, every view of it should be derived, never re-typed.

---

## 2. The three-layer model (restated, enforced)

| Layer | Owns | Where | Authority |
|-------|------|-------|-----------|
| **GitHub issue** | Lifecycle: open/closed, priority, labels, milestone, discussion | github.com/product-on-purpose/pm-skills/issues | **Canonical** |
| **Effort brief** | Durable scope, key decisions, artifact + PR links | `docs/internal/efforts/{ID}-{slug}.md` | Canonical for *scope*, links to the issue |
| **Release plan** | Gating, specs, implementation plan, closure | `docs/internal/release-plans/vX.Y.Z/` | Canonical for *how it ships* |
| **Generated index** | Human-readable priority + release view | `docs/internal/backlog.md` (this file) | **Mirror only** |
| **Working space** | Discovery, drafts, transcripts | `_NOTES/efforts/` (gitignored) | Scratch |

An issue links *out* to its effort brief, its release-plan folder, and its target skill. The brief and release plan link *back* to the issue. No layer duplicates another; each links.

---

## 3. How to capture an issue (the template)

Add `.github/ISSUE_TEMPLATE/effort.yml`. Required fields make every issue self-describing so no parallel markdown index is needed:

```yaml
name: Effort
description: A feature, skill, or maintenance effort
title: "[<ID>] <short name>"          # e.g. [F-43] before-you-build risk review
labels: []                            # template pre-fills type + agent:* (see Section 4)
body:
  - Effort ID:        F-xx | M-xx | D-xx        (required)
  - Type:            skill | infrastructure | documentation | enhancement | bug   (required)
  - Summary:         one paragraph - what and why                                 (required)
  - Target skill path: skills/<name>/   (if it produces/changes a skill)
  - Effort brief:    docs/internal/efforts/<ID>-<slug>.md   (link, required once created)
  - Release plan:    docs/internal/release-plans/vX.Y.Z/    (link, set when scheduled)
  - Agent:           agent:claude | agent:codex | agent:human   (required)
  - Acceptance:      bullet list of done-conditions
```

A separate lightweight `skill-request.yml` template handles **external intake** (the `#149`/`#127`-style requests) with just a summary + use case; a maintainer triages it into a full effort (assigns an ID, adds labels + milestone) or closes it.

---

## 4. Label and milestone scheme

### Labels (consolidate the current sprawl)

The repo currently carries ~30 labels, several of which are awesome-list submission topics (`claude-skills`, `ai-agents`, `prompting`, `work-methods`, `product-management`, `awesome-list`) rather than backlog taxonomy. Keep those separate. The **backlog taxonomy** is:

| Axis | Labels | Rule |
|------|--------|------|
| Type | `skill`, `infrastructure`, `documentation`, `enhancement`, `bug` | Exactly one, required |
| Agent | `agent:claude`, `agent:codex`, `agent:human` | Exactly one, required |
| Priority | `P0`, `P1`, `P2` | Optional; P0/P1 only for committed work |
| Triage | `good first issue`, `help wanted`, `duplicate`, `wontfix`, `invalid`, `question` | As needed |

Deprecate `phase-1`/`phase-2`/`phase-3` (a pre-2.x scheme superseded by milestones) and the `effort`/`utility-skill` labels (folded into `Type`). Keep topic labels only on issues actually used for the awesome-list/distribution surface.

### Milestones (the key reform)

**One milestone per release, named exactly `vX.Y.Z`, tied 1:1 to `docs/internal/release-plans/vX.Y.Z/`.** Then the "Release" column of any view is *derived from the milestone*, never hand-typed.

- Create milestones `v2.8.0` .. `v2.23.0` (backfill, closed) plus the next planned (open).
- Retire the 3 stale shells: delete `v0.2.0` and `v0.3.0` (pre-2.x); close or re-scope the still-open `v2.7.0` (it holds `#109`/F-03 - decide F-03's real state first).
- Every committed effort issue carries the milestone matching its release-plan folder.

---

## 5. Reconciled snapshot (live state, 2026-05-31)

Verified via authenticated `gh`: 113 issues total, 12 open / 101 closed. **Corrections required** are flagged. This snapshot is what the generator should reproduce once it exists.

### 5a. Lifecycle corrections to apply (Phase 7)

| Action | Issue / Effort | Why |
|--------|----------------|-----|
| **Close** | `#118` [F-07] discover-market-sizing | Skill ships on disk (`skills/discover-market-sizing/`), shipped v2.18.0; issue never closed |
| **Close** | `#119` [F-08] measure-survey-analysis | Skill ships on disk, shipped v2.18.0; issue never closed |
| **File + close** | F-17 foundation-meeting-synthesize | Shipped v2.11.0 with no issue ever filed |
| **File + close** | F-18 foundation-meeting-agenda | Shipped v2.11.0 with no issue ever filed |
| **Resolve** | `#109` [F-03] persona library Tier-0 | On the stale `v2.7.0` milestone; confirm real status, then close or re-milestone |
| **Sweep** | F-13/F-26/F-24/M-19/F-25/F-27/F-28/F-41/F-42 effort briefs | Briefs read Backlog/Active though skills shipped; set Status: Shipped + real issue # |
| **Triage** | `#149`, `#148`, `#127` | Zero-label intake; assign Type + Agent or close |

### 5b. Genuinely open work (after corrections)

| Priority | ID / Issue | Effort | Type | Agent | Notes |
|----------|-----------|--------|------|-------|-------|
| 1 | `#135` / F-12 | Skill quality convergence | enhancement | claude+human | Draft brief exists |
| 2 | `#133` / F-14 | Workflow Builder (`/workflow-builder`) | enhancement | claude | Spec in `_NOTES` after Phase 5 |
| 3 | `#134` / F-15 | Ad-hoc skill chaining (`/chain`) | enhancement | claude | Spec in `_NOTES` after Phase 5 |
| 4 | `#136` / M-21 | Explore release-please integration | infrastructure | claude/codex | |
| 5 | `#87` | Auto-generated AGENTS.md header from skill inventory | infrastructure | codex | Good Codex task |
| 6 | `#97` | CI test for validate-openskills | infrastructure | codex | |
| 7 | `#109` / F-03 | Persona library Tier-0 | enhancement | claude | Resolve milestone first |
| 8 | `#149` | before-you-build product risk review skill | skill | claude | Intake -> needs ID |
| 9 | `#127` | artifact-review skill | skill | claude | Intake -> needs ID; overlaps `pm-critic`? |
| 10 | `#148` | List in awesome-codex-plugins | documentation | human | Distribution |

### 5c. Efforts not yet represented as issues (file in Phase 7)

These `efforts/` briefs are unshipped and have no GitHub issue (confirm each against the issue list first): F-29 (meeting-lifecycle workflow), F-30 (meeting-family adoption guide), F-31..F-36 (sample-awareness / CI family, v2.12.0 candidates), F-37 (html-template-creator, Discovery).

Plus the two GitHub-platform-metadata efforts currently defined **only** in `backlog-canonical.md` (rows M-23 = repo description/topics/About + skills.sh listing checklist; M-24 = `scripts/gh-release-metadata.*` advisory drift script): **migrate M-23 and M-24 into issues + effort briefs before `backlog-canonical.md` is retired, or they vanish with it.**

### 5d. Efforts that ALREADY have issues - reconcile, do not re-file

- **F-09** `utility-agent-skill-builder` - a distinct, unshipped skill that depends on F-05 (`utility-pm-skill-builder`); it is **not** realized by F-05. Already has issue **#120**. Confirm scope still wanted, then milestone or close.
- **M-14** release-automation already has **#116**; **M-15** community-contribution already has **#117** - verify state and add the right milestone; do not open duplicates.
- **M-22** mcp-decoupling - **reconcile**: MCP is in maintenance mode, so this may be superseded. Decide (re-scope or close) before filing.
- **D-05** dedicated workflows guide - **already SHIPPED v2.9.1 (#131)**; not active work. Close `#131` if still open; do not list as backlog.

> 5c items are the "discovered but uncommitted" tier: each gets an issue, stays unmilestoned until scheduled. 5d items are bookkeeping corrections against the live issue list, not new work. Derive both from `gh`, never from the known-stale effort-brief Status fields.

---

## 6. The generator and the drift guard (Phase 7-8)

1. **`scripts/build-backlog-index.py`** - calls `gh issue list --state all --json number,title,state,labels,milestone,body`, groups by state and milestone, derives priority from the `P*` label, and emits this file with a banner:
   ```
   <!-- GENERATED by scripts/build-backlog-index.py from GitHub issues. Do not edit by hand. -->
   ```
2. **Tag-time drift check** - a pre-release step re-runs the generator and fails if the committed `backlog.md` differs from freshly-generated output (mirrors the existing "audit aggregate counters when shipping" discipline used for skill counts).
3. **Label/milestone guard** - a periodic `gh` check flags any open issue with zero labels or no milestone, so bare intake like `#149` cannot persist unclassified.

---

## 7. One-time reconciliation checklist (Phase 7)

- [ ] Close `#118`, `#119`.
- [ ] File + close issues for F-17, F-18 (shipped issue-less).
- [ ] Resolve `#109` / F-03 status; fix or retire the `v2.7.0` milestone.
- [ ] Create milestones `v2.8.0`..`v2.23.0` (closed) + next (open); delete `v0.2.0`/`v0.3.0`.
- [ ] Sweep all `efforts/` briefs: Status + real issue number; resolve the file-vs-folder duplicates (Phase 5).
- [ ] File issues for the 5c uncommitted efforts; **migrate M-23 / M-24 into issues + briefs before deleting `backlog-canonical.md`**.
- [ ] Reconcile the 5d efforts that already have issues (#120 / #116 / #117 / #131) - verify state + milestone, do not duplicate.
- [ ] Add `.github/ISSUE_TEMPLATE/effort.yml` + `skill-request.yml`.
- [ ] Consolidate labels per Section 4.
- [ ] Author `scripts/build-backlog-index.py`; regenerate this file with the banner.
- [ ] Add the tag-time drift check and the label/milestone guard (Phase 8).
- [ ] Audit: every `skills/<name>/` has exactly one issue whose state matches shipped/not-shipped.
