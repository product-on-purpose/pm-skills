# v2.11.0 Release Plan: Foundation Canvas + Meeting Skills Family

Status: Planning (scope finalized 2026-04-17)
Owner: Maintainers
Type: Feature release (minor)

## Release Theme

Foundation-phase expansion. Ships F-26 (lean-canvas, in progress) plus the full `foundation-meeting-*` family of 5 skills governed by a new family contract (v1.1.0 after Codex adversarial review resolution), plus M-22 MCP decoupling. Skill count grows from 32 to 38 (+6: F-26 + 5 meeting skills). A new `docs/reference/skill-families/` pattern debuts with the Meeting Skills Family Contract as its first entry, enforced by a new `validate-meeting-skills-family` CI check.

## Context

v2.10.x shipped three utility skills (mermaid-diagrams, slideshow-creator, update-pm-skills) rounding out the lifecycle-tooling surface. v2.11.0 was originally scoped as a meeting-lifecycle pair (F-17 meeting-synthesis + F-18 meeting-prep) with M-22 MCP Decoupling as a companion infrastructure change.

On 2026-04-15, F-26 (foundation-lean-canvas) landed on main via an ad-hoc `/pm-skill-builder` session and was retrofitted into v2.11.0.

On 2026-04-17, the meeting-skills scope expanded from 2 skills to 5 after a family-design session produced two `_NOTES/` documents articulating a complete pre-meeting / in-meeting / post-meeting / cross-meeting / outward-comms skill family with shared behavioral and structural contracts. F-17 and F-18 were archived and rewritten; F-25, F-27, and F-28 were created. All 5 classified as `foundation-*` (cross-cutting tooling), matching `foundation-persona` and `foundation-lean-canvas` precedent.

The 5 meeting skills share cross-skill CI enforcement (new `validate-meeting-skills-family.sh/.ps1`) that checks contract conformance - family-specific requirements like the Zero-friction execution section, Sources & References structure, and universal frontmatter fields. This is the first family-level CI check in the repo; establishes `docs/reference/skill-families/` as a future-extensible pattern for cross-cutting skill contracts.

### Prerequisites

- [x] v2.10.0 tagged and pushed (done 2026-04-11)
- [x] v2.10.1 tagged and pushed (done 2026-04-13)
- [x] v2.10.2 tagged and pushed (done 2026-04-14)

---

## Efforts

| ID | Name | Type | Effort Brief | Status |
|----|------|------|-------------|--------|
| **F-26** | [Lean Canvas Foundation Skill](../../efforts/F-26-lean-canvas.md) | Feature | [brief](../../efforts/F-26-lean-canvas.md), [spec](../../efforts/F-26-lean-canvas/specification.md) | In Progress (shipped to main, uncommitted) |
| **F-18** | [Foundation Meeting Agenda](../../efforts/F-18-meeting-agenda.md) | Feature | [brief](../../efforts/F-18-meeting-agenda.md), [spec](../../efforts/F-18-meeting-agenda/specification.md), [plan](../../efforts/F-18-meeting-agenda/plan_meeting-agenda.md) | Backlog (scaffolding done 2026-04-17) |
| **F-25** | [Foundation Meeting Brief](../../efforts/F-25-meeting-brief.md) | Feature | [brief](../../efforts/F-25-meeting-brief.md), [spec](../../efforts/F-25-meeting-brief/specification.md), [plan](../../efforts/F-25-meeting-brief/plan_meeting-brief.md) | Backlog (scaffolding done 2026-04-17) |
| **F-27** | [Foundation Meeting Recap](../../efforts/F-27-meeting-recap.md) | Feature | [brief](../../efforts/F-27-meeting-recap.md), [spec](../../efforts/F-27-meeting-recap/specification.md), [plan](../../efforts/F-27-meeting-recap/plan_meeting-recap.md) | Backlog (scaffolding done 2026-04-17) |
| **F-17** | [Foundation Meeting Synthesize](../../efforts/F-17-meeting-synthesize.md) | Feature | [brief](../../efforts/F-17-meeting-synthesize.md), [spec](../../efforts/F-17-meeting-synthesize/specification.md), [plan](../../efforts/F-17-meeting-synthesize/plan_meeting-synthesize.md) | Backlog (scaffolding done 2026-04-17; rewrite of archived F-17) |
| **F-28** | [Foundation Stakeholder Update](../../efforts/F-28-stakeholder-update.md) | Feature | [brief](../../efforts/F-28-stakeholder-update.md), [spec](../../efforts/F-28-stakeholder-update/specification.md), [plan](../../efforts/F-28-stakeholder-update/plan_stakeholder-update.md) | Backlog (scaffolding done 2026-04-17) |
| **Meeting-skills-family** | [Meeting Skills Family Contract](../../efforts/meeting-skills-family/plan_family-contract.md) | Cross-cutting | [authoring plan](../../efforts/meeting-skills-family/plan_family-contract.md), [canonical contract](../../../reference/skill-families/meeting-skills-contract.md) | Contract + CI: Done 2026-04-17 |
| **M-22** | [MCP Decoupling](../../efforts/M-22-mcp-decoupling.md) | Infrastructure | [brief](../../efforts/M-22-mcp-decoupling.md), [plan](../../efforts/M-22-mcp-decoupling/plan_mcp-decoupling.md) | Backlog |

---

## Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| **Version** | **v2.11.0** (minor) | New user-facing skills = new capability. |
| **Final slate (resolved 2026-04-17)** | F-26 + 5 foundation-meeting skills + M-22 | Meeting skills designed as a family with shared contracts and cross-chain references. Staging would break coherence. All 5 authored together against the family contract. |
| **All 5 meeting skills classified `foundation-*`** | `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-recap`, `foundation-meeting-synthesize`, `foundation-stakeholder-update` | Meeting skills are cross-cutting infrastructure that applies in any Triple Diamond phase, matching `foundation-persona` and `foundation-lean-canvas` precedent. Previous `discover` / `develop` classifications (original F-17/F-18) were premature. |
| **F-17 and F-18 rewritten** | Archive originals; rewrite F-17 as `foundation-meeting-synthesize` (expanded cross-meeting scope) and F-18 as `foundation-meeting-agenda` (split from original meeting-prep). IDs retained. | Original scoping predated the family design. Salvageable content (meeting type taxonomy, anti-meeting check, simplified RACI, multi-meeting concept) distributed across new efforts. |
| **Shared family contract** | Canonical at `docs/reference/skill-families/meeting-skills-contract.md` | Public, discoverable, CI-enforced. Establishes `skill-families/` as a future-extensible pattern for cross-cutting skill contracts. |
| **Family CI posture** | Enforcing from day one via `validate-meeting-skills-family.sh/.ps1` | All 5 skills authored together against the contract; no retroactive cleanup phase needed. |
| **Go-mode behavioral contract** | Infer → present brief summary → accept `go` or corrections. `--go` flag opts out of the checkpoint. Fully-specified invocations skip the checkpoint. | Zero-friction execution per family contract. Blocking questions permitted only when inference confidence is actively low on load-bearing inputs and no reasonable default exists. |
| **Default meeting duration** | 30 min (not 60) | Matches internal-meeting norms; 60 min is aspirational. |
| **Meeting type and RACI frontmatter** | Optional, inferred when absent. Enums defined in family contract. CI validates schema shape and enum values (when present); does not require population. | Adaptive Executor pattern - skills run on variable-quality input. |
| **Skill count after** | **38 skills** | Baseline pre-v2.11.0: 32 skills at v2.10.2. F-26 shipped mid-plan to main (not yet released) = 33. 5 meeting skills add 5 more = 38. Breakdown: 25 phase + 7 foundation (persona, lean-canvas, 5 meeting) + 6 utility = 38. Verified via check-count-consistency after updates. |
| **MCP decoupling** | **Freeze pm-skills-mcp, remove from release gating** | MCP server has no active users. See M-22. |
| **Additional efforts** | None beyond F-26 + 5 meeting skills + M-22 | Slate finalized; additional backlog items (F-20, F-21, F-14) defer to v2.12.0+. |

---

## Deliverables

### Family contract + CI (shared across all 5 meeting skills)

| File | Description | Status |
|------|------------|--------|
| `docs/reference/skill-families/meeting-skills-contract.md` | Canonical family contract (v1.1.0 after Codex review) | **Done 2026-04-17** |
| `docs/internal/efforts/meeting-skills-family/plan_family-contract.md` | Authoring plan with file inventory and decisions log | **Done 2026-04-17** |
| `docs/internal/release-plans/v2.11.0/plan_v2.11_codex-review.md` | Codex adversarial review findings + resolution plan | **Done 2026-04-17** |
| `scripts/validate-meeting-skills-family.sh` + `.ps1` + `.md` | Cross-skill CI validator (enhanced with filename-convention scanning in v1.1.0 fix pass) | **Done 2026-04-17** |
| `.github/workflows/validation.yml` | +2 steps invoking the validator (enforcing) | **Done 2026-04-17** |
| `docs/internal/_NOTES/archived-efforts/2026-04-17_*.md` | 4 archived files (2 design notes + 2 original efforts) | **Done 2026-04-17** |

### F-26: foundation-lean-canvas

See [F-26 effort brief](../../efforts/F-26-lean-canvas.md). Shipped to main 2026-04-15; deliverables listed there.

### F-18: foundation-meeting-agenda

| File | Description | Status |
|------|------------|--------|
| `skills/foundation-meeting-agenda/SKILL.md` | Pre-meeting attendee-facing agenda skill | Not started |
| `skills/foundation-meeting-agenda/references/TEMPLATE.md` | Agenda template per family contract | Not started |
| `skills/foundation-meeting-agenda/references/EXAMPLE.md` | Worked example (decision meeting) | Not started |
| `commands/meeting-agenda.md` | Slash command | Not started |
| `library/skill-output-samples/foundation-meeting-agenda/sample_*.md` (3) | Samples: decision meeting, team sync, 1-on-1 | Not started |
| `docs/skills/foundation/foundation-meeting-agenda.md` | Public skill doc | Not started |

### F-25: foundation-meeting-brief

| File | Description | Status |
|------|------------|--------|
| `skills/foundation-meeting-brief/SKILL.md` | User's private strategic prep skill | Not started |
| `skills/foundation-meeting-brief/references/TEMPLATE.md` | Brief template (`visibility: private` default) | Not started |
| `skills/foundation-meeting-brief/references/EXAMPLE.md` | Worked example (exec briefing prep) | Not started |
| `commands/meeting-brief.md` | Slash command | Not started |
| `library/skill-output-samples/foundation-meeting-brief/sample_*.md` (3) | Samples: exec briefing, stakeholder review, negotiation-adjacent | Not started |
| `docs/skills/foundation/foundation-meeting-brief.md` | Public skill doc | Not started |

### F-27: foundation-meeting-recap

| File | Description | Status |
|------|------------|--------|
| `skills/foundation-meeting-recap/SKILL.md` | Topic-segmented post-meeting summary skill | Not started |
| `skills/foundation-meeting-recap/references/TEMPLATE.md` | Recap template with agenda-reconciliation fields | Not started |
| `skills/foundation-meeting-recap/references/EXAMPLE.md` | Worked example (search-feature kickoff recap) | Not started |
| `commands/meeting-recap.md` | Slash command | Not started |
| `library/skill-output-samples/foundation-meeting-recap/sample_*.md` (3) | Samples: decision meeting, team sync, stakeholder review | Not started |
| `docs/skills/foundation/foundation-meeting-recap.md` | Public skill doc | Not started |

### F-17: foundation-meeting-synthesize

| File | Description | Status |
|------|------------|--------|
| `skills/foundation-meeting-synthesize/SKILL.md` | Cross-meeting archaeology skill | Not started |
| `skills/foundation-meeting-synthesize/references/TEMPLATE.md` | Synthesis template (omits single-meeting fields) | Not started |
| `skills/foundation-meeting-synthesize/references/EXAMPLE.md` | Worked example (Q1 quarterly synthesis) | Not started |
| `commands/meeting-synthesize.md` | Slash command | Not started |
| `library/skill-output-samples/foundation-meeting-synthesize/sample_*.md` (3) | Samples: quarterly topic, project retro, exec board prep | Not started |
| `docs/skills/foundation/foundation-meeting-synthesize.md` | Public skill doc | Not started |

### F-28: foundation-stakeholder-update

| File | Description | Status |
|------|------------|--------|
| `skills/foundation-stakeholder-update/SKILL.md` | Post-meeting async comms skill (channel + audience variants) | Not started |
| `skills/foundation-stakeholder-update/references/TEMPLATE.md` | Update template (no separate shareable-summary - entire output is shareable) | Not started |
| `skills/foundation-stakeholder-update/references/EXAMPLE.md` | Worked example (engineering update on search-feature) | Not started |
| `commands/stakeholder-update.md` | Slash command | Not started |
| `library/skill-output-samples/foundation-stakeholder-update/sample_*.md` (3) | Samples: slack-to-engineering, email-to-leadership, notion-to-mixed | Not started |
| `docs/skills/foundation/foundation-stakeholder-update.md` | Public skill doc | Not started |

### Cross-cutting updates (done once after all 5 skills authored)

| File | What Changes |
|------|-------------|
| `AGENTS.md` | Add 5 new skill entries (F-17, F-18, F-25, F-27, F-28) |
| `README.md` | Skill count 32→37, foundation-phase count +5, skill table entries |
| `docs/getting-started.md` + `docs/index.md` | Skill/command counts |
| `QUICKSTART.md` + `docs/getting-started/quickstart.md` | Skill/command counts |
| `mkdocs.yml` | Nav entries for 5 new skills + Reference → Skill Families → Meeting Skills Contract |
| `docs/reference/commands.md` | 5 new command rows + count |
| `docs/reference/ecosystem.md` | Command count |
| `docs/reference/project-structure.md` | Command count |
| `docs/guides/mcp-setup.md` + `mcp-integration.md` | Skill tool counts (MCP frozen per M-22) |
| `docs/skills/index.md` | Skill count + 5 foundation-phase additions |
| `library/skill-output-samples/README_SAMPLES.md` | Sample count + 15 new browse-table rows (3 samples × 5 skills) |
| `AGENTS/claude/CONTEXT.md` | Count updates |

### Release artifacts

| File | Description |
|------|------------|
| `CHANGELOG.md` | v2.11.0 entry |
| `docs/releases/Release_v2.11.0.md` | Release notes |
| `docs/releases/index.md` | Add v2.11.0 row |
| `skills-manifest.yaml` | New skills with versions |

---

## CI That Applies

| Workflow | Checks | Notes |
|----------|--------|-------|
| `lint-skills-frontmatter` | Frontmatter for 5 new meeting skills | Must pass |
| `validate-commands` | 5 new command files reference valid skills | Must pass |
| `validate-agents-md` | AGENTS.md includes 5 new entries | Must pass |
| **`validate-meeting-skills-family`** (new) | Family contract conformance: contract reference link, Zero-friction execution section, TEMPLATE.md frontmatter shape, Sources & References structure, artifact_type matches skill | **Must pass - enforcing from day one** |
| `validate-version-consistency` | plugin.json == marketplace.json | Must pass |
| `check-count-consistency` | Skill/command counts updated across docs | Advisory |
| `check-mcp-impact` | Advisory - MCP frozen per M-22, no new MCP tools needed | Advisory |
| `validate-script-docs` | New `validate-meeting-skills-family.md` matches script conventions | Must pass |

---

## MCP Impact

| Question | Answer |
|----------|--------|
| New MCP tools needed? | **No** - MCP is being decoupled from pm-skills release cycle (M-22). |
| Separate MCP release required? | **No** - pm-skills-mcp is frozen until team adoption creates demand. |
| MCP decoupling effort | **M-22** - freeze MCP repo, remove from release gating, archive alignment steps. See [effort brief](../../efforts/M-22-mcp-decoupling.md). |

---

## Open Questions

1. ~~**Final slate scope**~~ **Resolved 2026-04-17**: v2.11.0 ships F-26 + 5 foundation-meeting skills (F-18 agenda, F-25 brief, F-27 recap, F-17 synthesize, F-28 stakeholder-update) + M-22.
2. **Workflow opportunity**: Should the 5 meeting skills ship with a `meeting-lifecycle` workflow (brief + agenda → recap → stakeholder-update)? Deferred to v2.12.0+ - workflows are additive and can land after the skills have real-world usage.
3. **Krisp MCP integration depth**: Skills explicitly mention Krisp MCP as an input source in the contract's Adaptive Executor pattern. Should per-skill SKILL.md files include explicit Krisp MCP invocation examples, or keep it generic across transcript sources?
4. **Sample count per skill**: Current plan is 3 samples per skill (matching F-26 precedent) = 15 new samples. Verify this is appropriate during per-skill authoring - may reduce if authoring overhead outweighs sample value.
5. **MCP revival criteria**: M-22 freezes the MCP server. What conditions would trigger unfreezing (e.g., 3+ team users, non-Claude-Code tool adoption, enterprise demand)?
6. **F-26 + family Codex review**: F-26 and the new family contract + 5 effort packets have not been reviewed by Codex. Consider requesting a Codex review of the family contract + 1-2 representative skills prior to release.
7. **Public skill doc generation**: F-26 brief references `scripts/generate-skill-pages.py`; its availability needs to be verified during per-skill authoring. Hand-authoring is the fallback.
8. **Contract + validator version coupling**: Contract v1.0.0 and validator v1 are both shipping in v2.11.0. On future contract bumps, how are validator and contract versions kept in sync? Consider adding a validator self-check that reads the contract's frontmatter version field.
9. **Attendee-RACI on meeting-synthesize**: Synthesis skill aggregates across meetings and currently omits per-attendee RACI fields. If a future use case requires per-stakeholder summary alignment (e.g., "did X stay aligned with Y across these meetings?"), revisit whether RACI aggregation is needed.
