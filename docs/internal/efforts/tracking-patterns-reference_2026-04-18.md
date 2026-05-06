---
title: Effort-Tracking Patterns. Industry Reference for pm-skills
description: Reference analysis of how adjacent open-source and commercial systems (Python PEPs, Kubernetes KEPs, Rust RFCs, Architecture Decision Records, Linear, Jira, Shortcut) handle numbered proposals, status tracking, component grouping, and issue-tracker integration. Distills convergent best-practice principles and maps them to pm-skills. Companion to organization-design_2026-04-18.md.
date: 2026-04-18
status: reference
audience: pm-skills maintainers, contributors
---

# Effort-Tracking Patterns. Industry Reference for pm-skills

**Date**: 2026-04-18
**Author**: Claude Opus 4.7 (research synthesis)
**Status**: Reference (companion to `organization-design_2026-04-18.md`)

## Table of Contents

1. [Purpose and scope](#1-purpose-and-scope)
2. [The five reference patterns](#2-the-five-reference-patterns)
   - 2.1 [Python PEPs](#21-python-peps-python-enhancement-proposals)
   - 2.2 [Kubernetes Enhancement Proposals (KEPs)](#22-kubernetes-enhancement-proposals-keps)
   - 2.3 [Rust RFCs](#23-rust-rfcs)
   - 2.4 [Architecture Decision Records (ADRs, Nygard)](#24-architecture-decision-records-adrs-nygard)
   - 2.5 [Issue-tracker-centric systems (Linear, Jira, Shortcut)](#25-issue-tracker-centric-systems-linear-jira-shortcut)
3. [Side-by-side comparison](#3-side-by-side-comparison)
4. [Convergent principles](#4-convergent-principles)
5. [Divergent choices and when each is right](#5-divergent-choices-and-when-each-is-right)
6. [Best-practice synthesis](#6-best-practice-synthesis)
7. [How pm-skills compares today](#7-how-pm-skills-compares-today)
8. [How the design doc aligns](#8-how-the-design-doc-aligns-with-best-practice)
9. [When to reach outside these five](#9-when-to-reach-outside-these-five)
10. [Reading list](#10-reading-list)
11. [Appendix. Scale and team-shape considerations](#11-appendix-scale-and-team-shape-considerations)

---

## 1. Purpose and scope

### 1.1 Why this doc exists

The companion design doc (`organization-design_2026-04-18.md`) presents 17 options for organizing `docs/internal/efforts/`. Before committing to any of them, it is worth asking: **has this problem already been solved elsewhere?** The answer is mostly yes. Five adjacent systems have spent years evolving patterns for numbered proposals, status tracking, component grouping, and issue-tracker integration. This doc distills their experience into a reference that can inform pm-skills decisions.

### 1.2 What counts as "best practice" here

There is no single canonical answer. "Best practice" for effort tracking is shaped more by **team scale, work type, and tolerance for process** than by a universal playbook. What a 3-person OSS repo, a 30-engineer platform team, and a 300-person product org each need looks different even when underlying principles agree.

That said, across the five systems surveyed here, **six principles recur** with enough frequency that calling them best-practice is defensible. Section 4 enumerates them. Section 5 covers the divergences.

### 1.3 What this doc is not

- Not a prescription. pm-skills does not have to adopt any particular system wholesale.
- Not exhaustive. Other patterns exist (IETF RFCs, Apache governance, TC39 proposals, W3C specs). The five chosen here are the closest in scale and style to pm-skills.
- Not a decision doc. Decisions belong in `organization-design_2026-04-18.md`.

---

## 2. The five reference patterns

### 2.1 Python PEPs (Python Enhancement Proposals)

**Canonical doc**: [PEP-0001](https://peps.python.org/pep-0001/) (the meta-PEP defining the PEP process itself).

**What it is**: Python's long-running design-proposal process. A PEP is a durable document proposing a feature, a policy, or a process change. 700+ PEPs since 1999.

**Folder model**: flat. Every PEP lives at `peps/pep-NNNN.rst` in a single directory. Numbers are monotonically assigned.

**Lifecycle state**:
- `Status:` frontmatter field with a closed enum: `Draft | Active | Accepted | Provisional | Deferred | Rejected | Withdrawn | Final | Superseded`
- Lifecycle transitions are narrated in the PEP's own "Resolution" section with a link to the python-dev or discussion thread that settled it.
- `Post-History:` field lists the discussion threads chronologically.
- `Superseded-By:` and `Replaces:` fields provide supersession links.

**Component grouping**: informal. PEPs are tagged by topic via a `Type:` field (`Standards Track | Informational | Process`) and a broader index page categorizes by topic. No Jira-style component tag.

**Issue-tracker integration**: decoupled. PEPs reference GitHub issues and python-dev threads in prose; they are not tied 1:1.

**Index**: generated. `pep-0000.rst` is built from frontmatter scans; sorted and grouped views are produced automatically.

**CI validation**: yes. PEP-0001 defines the schema; CI checks frontmatter conformance on every PR.

**When it fits**: small-to-medium teams with a strong design-by-document culture, long-lived proposals, public RFC-style discussion.

**Key lessons for pm-skills**:
- Closed-enum status field works at scale for 20+ years.
- `Superseded-By` pattern matters. F-17-meeting-synthesis being replaced by F-17-meeting-synthesize is exactly this case.
- Generated index beats hand-maintained every time.
- Flat folder with monotonic numbering scales further than intuition suggests.

### 2.2 Kubernetes Enhancement Proposals (KEPs)

**Canonical doc**: [kubernetes/enhancements repo, KEP-0001](https://github.com/kubernetes/enhancements/blob/master/keps/NNNN-kep-template/README.md).

**What it is**: Kubernetes' proposal system for feature work across SIGs (Special Interest Groups). Richer and more structured than PEPs; used by many contributors across a large ecosystem.

**Folder model**: stage-based subfolders within SIG-scoped hierarchies. Example: `keps/sig-node/NNNN-kep-name/README.md`. Each KEP lives in its own folder (not a single file) to allow ancillary artifacts (PRR, test-grid links, diagrams).

**Lifecycle state**:
- `status:` frontmatter field enum: `provisional | implementable | implemented | deferred | rejected | withdrawn | replaced`
- Also carries per-release tracking: `latest-milestone:`, `stage:` with values `alpha | beta | stable`, and separate fields for `feature-gate-name:` and `disable-supported:`.
- Rich metadata for production-readiness reviews (PRR).

**Component grouping**: by SIG subfolder. A KEP belongs to exactly one SIG (its "owner"), though it can reference cross-SIG dependencies in prose.

**Issue-tracker integration**: loose. KEPs reference tracking issues in kubernetes/kubernetes; not 1:1 enforced.

**Index**: generated. `keps.yaml` and the markdown index are both produced by the CI tooling.

**CI validation**: heavy. `kep-metadata-validator` enforces frontmatter schema, required fields per stage, and cross-reference validity.

**When it fits**: large distributed projects with multiple sub-teams (SIGs), complex feature-gating, per-release graduation process.

**Key lessons for pm-skills**:
- Per-KEP subfolder is useful when a single effort has multiple artifacts (spec + plan + diagrams + test evidence). This mirrors the existing `F-13-workflow-expansion/` pattern that already emerged in pm-skills.
- SIG-scoped subfolders map conceptually to the "component" grouping the design doc proposes, but KEPs enforce exactly-one-component membership via folder placement. pm-skills's `components:` tag approach is more flexible.
- Richer frontmatter (stage, feature-gate, etc.) is overkill for pm-skills today but points at a direction if multi-release maturity tracking ever matters.

### 2.3 Rust RFCs

**Canonical doc**: [rust-lang/rfcs](https://github.com/rust-lang/rfcs), [RFC-0002 (the process itself)](https://rust-lang.github.io/rfcs/0002-rfc-process.html).

**What it is**: Rust's design-proposal process. Heavy reliance on GitHub PRs as the workflow mechanism.

**Folder model**: flat. `text/NNNN-slug.md`. Each RFC is a single file.

**Lifecycle state**: **PR-native**. An RFC's lifecycle is the lifecycle of its PR:
- RFC submitted = PR opened
- RFC accepted = PR merged into the `text/` folder
- RFC rejected = PR closed without merge
- RFC superseded = follow-up PR opened with reference to the original

There is no `Status:` frontmatter. The state of the RFC is whether its file is in the `text/` folder.

**Component grouping**: informal. Tag in PR (`T-lang`, `T-libs`, `T-compiler`). No in-file component field.

**Issue-tracker integration**: tight. Every merged RFC gets a tracking issue in `rust-lang/rust`. The RFC links to it in its own "Tracking Issue" section. PR-to-issue link is manually maintained.

**Index**: generated. `SUMMARY.md` for the mdBook-rendered "RFC Book" is produced from file scans.

**CI validation**: light. Mostly about PR template compliance and mdBook buildability.

**When it fits**: projects where GitHub is the undisputed primary interface and contributors are comfortable with PR-as-workflow. Works well when the proposal volume is moderate.

**Key lessons for pm-skills**:
- Using PR merge as "status = accepted" eliminates drift entirely. No frontmatter update needed.
- The tradeoff: lifecycle state is only visible in GH, not in the file itself. Offline/local readers lose context.
- pm-skills already uses PRs for most effort briefs; formalizing "brief merged = effort accepted" would be a small step.
- Does not address in-progress or shipped status. Only accepted/rejected.

### 2.4 Architecture Decision Records (ADRs, Nygard)

**Canonical doc**: [Michael Nygard's 2011 blog post](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) defining the ADR pattern.

**What it is**: lightweight pattern for capturing architectural decisions as short durable documents. Adopted widely across software teams from startups to enterprises.

**Folder model**: flat. `docs/adr/NNNN-slug.md`. Sometimes `doc/arch/adr/`. Monotonic numbering.

**Lifecycle state**:
- `Status:` field with minimal enum: `Proposed | Accepted | Deprecated | Superseded`
- Status changes are done **by amending the ADR itself**. Supersession is captured via a new ADR that references the old one, and the old one's status is updated to `Superseded by ADR-NNN`.

**Component grouping**: none in the base pattern. Extensions (MADR, Log4brains) add `tags:` frontmatter for component-like grouping.

**Issue-tracker integration**: none canonically. Teams who use both tend to link ADRs to issues in prose.

**Index**: often hand-maintained `README.md` in the ADR folder. Tools like `adr-tools` or `log4brains` generate indexes automatically.

**CI validation**: rare in the base pattern; available via tools like `log4brains` or project-specific linters.

**When it fits**: teams that want to capture architectural reasoning without adopting a heavyweight process. Works at any scale.

**Key lessons for pm-skills**:
- The minimal status enum (4 values) is proof that closed-enum status fields work even without CI enforcement, provided the team is small and disciplined.
- "Amend the ADR itself" is how pm-skills already treats effort briefs. No separate lifecycle doc; the brief IS the durable artifact.
- ADRs deliberately do not track in-progress state. They are about decisions, not projects. pm-skills effort briefs are a hybrid. they track both decisions and projects. This hybrid nature is why pm-skills needs a richer status enum than ADR's 4 values.

### 2.5 Issue-tracker-centric systems (Linear, Jira, Shortcut)

**Canonical docs**: vendor documentation.

**What they are**: commercial or SaaS issue trackers used as the primary system of record for work. Docs are secondary; issues are canonical.

**Folder model**: no docs folder at all in many cases. Design docs live in Notion, Confluence, or a `docs/` folder that links to tickets but does not attempt to mirror state.

**Lifecycle state**: fully in the tracker. Rich workflows, custom statuses, automations, dependency graphs. `Status:`, `Assignee:`, `Priority:`, `Component:`, `Labels:`, `Milestone/Cycle:` are all native.

**Component grouping**: first-class. Jira has `Components` (exactly the concept this design doc references). Linear has `Labels` and `Projects`. Shortcut has `Labels` and `Epics`.

**Issue-tracker integration**: tracker IS the integration.

**Index**: dashboards, saved queries, Gantt views. Always generated, always live.

**CI validation**: usually via bot/automation (e.g., requiring a linked issue on every PR).

**When it fits**: product teams where work is ticketed first, discussed in tool, and documented after. Also: teams where many contributors are not engineers (PMs, designers, support) and need a shared workspace that is not git-native.

**Key lessons for pm-skills**:
- GitHub Issues is the closest native tracker for an OSS repo. Most of Linear/Jira's value is replicable via GH Issues + labels + milestones + GitHub Projects, and pm-skills already uses these partially.
- If pm-skills went tracker-centric, `docs/internal/efforts/` would be reduced to durable design narratives, and state questions ("what's active?", "what shipped in v2.11.0?") would be answered by GH queries.
- Component concept from Jira is structurally simple. it is just a tag + a registry. The design doc's `components:` field is a direct import.

---

## 3. Side-by-side comparison

| Dimension | Python PEPs | K8s KEPs | Rust RFCs | ADRs | Linear/Jira |
|-----------|-------------|----------|-----------|------|-------------|
| **Folder model** | Flat, numbered | Stage + SIG subfolders | Flat, numbered | Flat, numbered | No docs folder |
| **File vs folder per item** | File | Folder | File | File | N/A |
| **Numbering** | Monotonic global | Monotonic global | Monotonic global | Monotonic global | Tracker-assigned |
| **Status location** | Frontmatter enum | Frontmatter enum + stage | PR state | Frontmatter enum | Tracker |
| **Status enum size** | 9 values | 7 + 3 stages | N/A (PR state) | 4 values | 3-10 typical |
| **Supersession** | `Superseded-By:` | `replaced-by:` | New RFC references | `Superseded by ADR-N` | Duplicate/link |
| **Components** | Informal (Type field) | SIG subfolder | PR tags | None (MADR adds) | First-class |
| **Multi-component** | Discouraged | No (one SIG) | Via tags | N/A | Yes |
| **Index** | Generated | Generated | Generated | Hand or tool | Live dashboard |
| **Issue-tracker link** | Prose reference | Tracking issue | Tracking issue | Optional | N/A (is tracker) |
| **CI validation** | Heavy | Heavy | Light | Light | Automation |
| **Workflow** | Discussion thread | PRR review | PR review | Amend in place | Ticket workflow |
| **Scale proven at** | 700+ PEPs, 25 years | 1000s of KEPs, 10 years | 3000+ RFCs, 10 years | Varies | Millions of tickets |

---

## 4. Convergent principles

These recur across all or most of the five patterns. They are the closest thing to universal best practice.

### 4.1 Issue tracker is the source of truth for lifecycle state

- Linear/Jira: explicitly.
- Rust RFCs: implicitly via PR state.
- PEPs: via the PEP's own Resolution section and linked discussion thread.
- KEPs: via the per-milestone tracking issues in the main kubernetes/kubernetes repo.
- ADRs: via whatever the team uses (often the ADR itself, but large teams link to Jira).

**For pm-skills**: GH issues should be the canonical lifecycle-state source. Briefs are durable narrative, not lifecycle mirrors. This is Option C3 in the design doc.

### 4.2 Closed-enum status field in structured metadata

- All five use a small, enumerated vocabulary for status.
- Free-text status is universally avoided or lint-enforced away.
- Enum sizes range from 4 (ADR) to 9 (PEP). 6-8 is the sweet spot.

**For pm-skills**: the proposed 8-value enum (`draft | backlog | planned | active | blocked | shipped | cancelled | superseded`) is in the normal range. Validator-enforced closure prevents drift.

### 4.3 Monotonic numbering is durable

- All four document-based patterns (PEP, KEP, RFC, ADR) use monotonically assigned integers.
- Numbers never get reused even for withdrawn or superseded items.
- Slugs can change; numbers cannot.

**For pm-skills**: F-XX and M-XX numbering already follows this. Legacy filename drift (F-17-meeting-synthesis then F-17-meeting-synthesize) is a place where the slug changed while the number stayed. That is correct by this principle. The remaining question is whether both files should exist or only the latest.

### 4.4 Supersession is explicit, not destructive

- PEP: `Superseded-By:`, `Replaces:`.
- KEP: `replaced-by:`.
- Rust RFC: successor RFC references predecessor.
- ADR: "Superseded by ADR-NNN".
- Linear/Jira: duplicate-of and blocked-by links.

Nobody deletes superseded items. The old item is kept with a pointer to the new. History is preserved in place, not in an archive folder.

**For pm-skills**: the proposed `supersedes:` / `superseded_by:` frontmatter fields map directly. F-17-meeting-synthesis should remain in the folder tree (or be replaced by a tombstone file) with a pointer to F-17-meeting-synthesize, not only archived to `_NOTES/`.

### 4.5 Indexes are generated, not hand-maintained

- PEP: `pep-0000.rst` generated.
- KEP: `keps.yaml` and markdown index generated.
- Rust RFC: `SUMMARY.md` generated.
- ADR: `adr-tools` generates; otherwise hand-maintained which is a known pain point.
- Linear/Jira: all views are live queries.

Hand-maintained indexes drift. Generated indexes scale.

**For pm-skills**: a generated `INDEX.md` (design doc Option C1) matches this principle. Keeping `backlog-canonical.md` hand-curated for priority order while INDEX.md handles state is a reasonable split.

### 4.6 Components are tags, not folders (with narrow exceptions)

- PEPs: tags via informal categorization (no folders).
- Rust RFCs: tags via PR labels.
- ADRs: tags via MADR extension.
- Linear/Jira: tags first-class.
- **Exception**: KEPs use SIG folders for mandatory single-owner grouping. But this works because SIGs are formal governance units, not ad-hoc initiatives.

**For pm-skills**: `components:` frontmatter tag (Option B1) is aligned with 4 of 5 patterns. Opportunistic subfolders (Option B3) for multi-effort initiatives with shared artifacts is KEP-like and justified only when the initiative has enough mass to warrant its own plan doc (as `meeting-skills-family/` already demonstrates).

---

## 5. Divergent choices and when each is right

Where the five patterns disagree, there is usually a team-scale or work-type reason. Understanding the divergence helps pm-skills pick deliberately rather than by default.

### 5.1 File-per-item vs folder-per-item

- **File**: PEP, RFC, ADR. Right when each item is self-contained.
- **Folder**: KEP. Right when each item has multiple artifacts (spec, plan, PRR, diagrams, test-grid links).

**pm-skills today**: hybrid. Most briefs are files; some (F-05, F-13, meeting-skills-family/) have grown into folders with specs and plans. This hybrid is fine if the rule is "promote to folder when it needs a second artifact".

### 5.2 In-line status vs PR-state status

- **In-line frontmatter status**: PEP, KEP, ADR, Linear/Jira. Right when offline readers need to know state without git or tracker access.
- **PR-state status**: Rust RFC. Right when contributors are already in GH and the latency of "merge = accepted" is tolerable.

**pm-skills today**: in-line frontmatter. Recommended to keep it this way; the repo is consumed offline (via git clone) as often as through GH.

### 5.3 Single component vs multi-component

- **Single**: KEP (one SIG per KEP). Right when components map to formal teams/governance.
- **Multi (tags)**: Jira, design doc's Option B1. Right when components are cross-cuts without clean ownership.

**pm-skills today**: cross-cuts are common (F-33 touches both sample-automation and ci-validation). Multi-component via tags is the right choice.

### 5.4 Rich process vs lightweight

- **Rich**: KEP, Jira, Linear. Right at scale and with dedicated process owners.
- **Lightweight**: ADR, RFC-ish. Right when process cost must be minimal and one person cares about process.

**pm-skills today**: lightweight-to-medium. Bundle 1 of the design doc stays in this zone.

### 5.5 Centralized index vs live queries

- **Centralized generated index**: PEP, KEP, RFC. Right when the canonical view is a rendered page (mdBook, website nav).
- **Live queries**: Jira/Linear. Right when users have access to the tool and queries are cheap.

**pm-skills today**: no live-query infrastructure; generated INDEX.md in the repo is the right analog.

---

## 6. Best-practice synthesis

Combining the six convergent principles (§4) with team-scale considerations (§5), the defensible best practice for a small-team OSS repo tracking both decisions and projects is approximately:

1. **Numbered, durable documents** in a flat folder with monotonic IDs. Promote to per-item subfolder only when multi-artifact.
2. **Closed-enum status** in frontmatter with 6-8 values including `superseded`.
3. **Supersession by reference**, never by deletion. `supersedes:` / `superseded_by:` fields.
4. **Components as tags**, with a registry file. Subfolder only for multi-effort initiatives with their own plan doc.
5. **Generated index** covering status, component, milestone pivots.
6. **Issue tracker as lifecycle source of truth**, with briefs as durable narrative. Validator enforces parity.
7. **CI-validated frontmatter schema** with closed enums.
8. **PR-based workflow**. brief created via PR, accepted via merge, changes amended via follow-up PR.

This composite is essentially the **PEP/ADR hybrid** with Jira-style component tags and a light KEP-style concession for multi-effort initiative subfolders. It is the shape of Bundle 1 in the design doc.

---

## 7. How pm-skills compares today

| Principle | pm-skills current state | Gap |
|-----------|------------------------|-----|
| 1. Numbered flat folder | Yes (F-XX, M-XX, D-XX) | Folder promotion is ad-hoc but correct |
| 2. Closed-enum status | Partial (enum values used but inconsistent: Draft, Backlog, Planned, Active, In Progress, Shipped, Cancelled, Complete) | Validator missing; enum not closed |
| 3. Supersession by reference | Partial (archive note in \_NOTES/) | Not in-tree; no frontmatter field |
| 4. Components as tags | No | Gap |
| 5. Generated index | No (hand-maintained `backlog-canonical.md`) | Gap |
| 6. Issue tracker as source of truth | Partial (uses GH issues but many are `TBD`) | Validator missing |
| 7. CI-validated frontmatter | Partial (`lint-skills-frontmatter` for skills, not briefs) | Gap for briefs |
| 8. PR-based workflow | Yes (mostly) | Formalization candidate |

Net: **4 of 8 principles partially adopted, 3 missing, 1 ad-hoc-correct**. The design doc's Bundle 1 addresses gaps in principles 2, 4, 5, 7. Principles 3 and 6 get partial fixes in Phase 1 and full fixes in Phase 2.

---

## 8. How the design doc aligns with best practice

The design doc's Bundle 1 recommendation was written before this reference was drafted. It nonetheless lines up cleanly:

| Best-practice principle | Design doc option | Phase |
|-------------------------|-------------------|-------|
| Closed-enum status | A4 | v2.12.0 |
| Components as tags | B1 | v2.12.0 |
| Subfolder for multi-effort | B3 | Opportunistic |
| Generated index | C1 | v2.12.0 |
| Issue-tracker parity | C3 + D2 | C3 in v2.12.0, D2 in v2.13.0 |
| Supersession frontmatter | Proposed in §10.3 | v2.12.0 |
| CI-validated schema | Part of A4 | v2.12.0 |

**Deviations from pure best practice**: none of substance. The design doc does not propose full per-item subfolders (KEP-style) because pm-skills is smaller than Kubernetes. It does not propose PR-state-as-status (Rust-RFC-style) because offline context matters. Both are deliberate and justified.

**Confidence**: medium-high that Bundle 1 is within the zone of defensible best practice for pm-skills's scale. Medium because "best practice" in this space is team-shape-dependent; there is no single right answer to verify against.

---

## 9. When to reach outside these five

The five patterns cover most pm-skills-adjacent cases. If an unfamiliar need surfaces, these others may be worth a look:

- **IETF RFCs**. very formal, multi-organization standards bodies. Not pm-skills-scale.
- **Apache governance**. voting, committer promotion, project IP. pm-skills does not have this governance need.
- **TC39 proposals (JavaScript)**. staged advancement (stage 0-4) similar to KEP. Revisit if pm-skills skills start needing per-stage maturity tracking.
- **W3C specs**. candidate-recommendation workflow. Overkill for a skills library.
- **diátaxis**. documentation taxonomy (tutorial / how-to / reference / explanation). Orthogonal to this question; useful for `docs/guides/` vs `docs/reference/` organization, not efforts tracking.
- **DACI / RAPID / RACI**. decision-making frameworks. Useful for capturing who-decides on individual briefs, not folder-structure.

---

## 10. Reading list

**Primary sources** (read these before adopting any pattern):
- [PEP-0001](https://peps.python.org/pep-0001/). the PEP process itself
- [PEP-0012](https://peps.python.org/pep-0012/). sample PEP template
- [Kubernetes KEP-0001](https://github.com/kubernetes/enhancements/blob/master/keps/NNNN-kep-template/README.md). KEP template
- [Rust RFC template](https://github.com/rust-lang/rfcs/blob/master/0000-template.md)
- [Michael Nygard, "Documenting Architecture Decisions"](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [MADR template](https://adr.github.io/madr/). Markdown ADRs, modern extension of Nygard
- [Atlassian on Jira Components](https://confluence.atlassian.com/adminjiraserver/managing-components-938847301.html)

**Secondary** (context and comparison):
- [Joel Parker Henderson's ADR repo](https://github.com/joelparkerhenderson/architecture-decision-record). collection of ADR examples across projects
- [log4brains](https://github.com/thomvaill/log4brains). ADR tooling with web rendering
- [adr-tools](https://github.com/npryce/adr-tools). Nygard's original CLI
- [AsyncAPI RFCs](https://github.com/asyncapi/spec/tree/master/specification). another RFC-style example at smaller scale

**Meta** (about process itself):
- [Will Larson on "Writing an Engineering Strategy"](https://lethain.com/strategies-and-visions/)
- [Camille Fournier on "The Manager's Path" chapters on planning and process](https://www.oreilly.com/library/view/the-managers-path/9781491973882/)

---

## 11. Appendix. Scale and team-shape considerations

### 11.1 Small team (1-5 people, pm-skills scale)

- Bundle 1 territory: PEP/ADR hybrid with components as tags.
- Minimize process overhead; maximize machine-verifiability.
- Ship indexes via generation, not manual update.
- Status enum 6-8 values.

### 11.2 Medium team (10-50 people)

- KEP territory: per-item subfolders start making sense because multi-artifact items are common.
- Component ownership matches team structure.
- CI validation becomes mandatory.
- Status enum may grow (adding `beta`, `rc`, per-stage markers).

### 11.3 Large organization (50+ people)

- Jira/Linear territory: docs become secondary to tickets.
- Components become formal governance units.
- Process owners and tooling dedicated staff.
- Custom workflows per component.

### 11.4 pm-skills-specific notes

- pm-skills is firmly in 11.1 scale today.
- Meeting-skills-family pattern shows 11.2-like behavior emerging organically when an initiative spans 5 efforts.
- The design doc's Bundle 1 is appropriately scaled for 11.1 with headroom into 11.2 if initiatives continue to grow.
- Do not adopt 11.3 patterns. process cost exceeds team capacity.

---

## 12. Related documents

- `docs/internal/efforts/organization-design_2026-04-18.md`. decision-layer proposal
- `docs/internal/efforts/README.md`. current canonical effort-brief model
- `docs/internal/backlog-canonical.md`. priority-ordered backlog
- `docs/internal/planning-persistence-policy.md`. what-lives-where policy
- `docs/internal/agent-component-usage_2026-04-18.md`. sibling design doc for v2.12.0+ runtime leverage
