# v2.28.0 Release Plan: `stakeholder-briefings` (new foundation skill, additive)

**Status:** PROPOSED (2026-06-19). Theme committed (one new skill); scope rows, the sample manifest, and the F-55 ID are proposed, not locked. Effort brief + GitHub issue are the next execution-time step (not filed yet).
**Owner:** Maintainers
**Type:** **MINOR** (additive: one new foundation skill; no behavior change to existing skills, none removed or renamed). Catalog 66 -> 67; foundation 9 -> 10.
**Theme:** Ship one new foundation skill, `foundation-stakeholder-briefings`, that takes any source artifact (spec, discovery, research, GTM, metrics, retro) and fans it out into a canonical **master document plus a set of audience-tailored briefings** (one per stakeholder lens), each a provable projection of the master.
**Created:** 2026-06-19
**Previous:** v2.27.1 SHIPPED 2026-06-16 (maintenance patch; the classification sub-count drift gate).

---

## Where we are

The idea originated from a maintainer request: "a foundation skill that reviews content provided and creates N versions of the output targeted to the needs of different stakeholders (PMM, executives, engineering, UX, CS, ...)." A brainstorming pass mapped it against the catalog and the roadmap and reframed it:

- **The gap is real.** No existing skill does 1-to-N audience fan-out. The catalog is uniformly one-artifact-per-run; the closest neighbor, `foundation-stakeholder-update`, emits a single chosen channel/audience variant and is bound to meeting input. (Survey: catalog gap-map, 2026-06-19.)
- **There is prior intent.** The fan-out was explicitly **deferred** in the `foundation-stakeholder-update` effort brief (F-28, line 89: "generate N versions for N stakeholder groups in one pass? Deferred; not in v1.0.0") and articulated twice in superseded May-8 brainstorms (`utility-artifact-transformer`, "Executive Communication Pack"). This release builds the deferred fan-out.
- **It is distinct from the three stakeholder-adjacent skills:** `foundation-stakeholder-update` (one async meeting update), `discover-stakeholder-summary` (mapping stakeholders), `foundation-persona` (a persona viewpoint).

This release ships that one skill. It deliberately does NOT open a multi-file output mode (single-artifact for v1; see Decision D2) or a broader comms family.

**See companion docs:**

- Spec (full design + the master-projection invariant + lens library): [`spec_stakeholder-briefings.md`](spec_stakeholder-briefings.md)
- Predecessor plan: [`../v2.27.1/plan_v2.27.1.md`](../v2.27.1/plan_v2.27.1.md)
- Successor (renumbered): [`../v2.29.0/plan_v2.29.0.md`](../v2.29.0/plan_v2.29.0.md) (the memory train, formerly v2.28.0)

---

## Version reshuffle (2026-06-19)

v2.28.0 was previously the **"Remember" memory train** (B1/B2). The maintainer reassigned v2.28.0 to this skill (an additive content skill that is ready to plan and ships a self-contained surface), and **moved the memory train to v2.29.0 (tentative)**. The memory plan + spec were relocated to `docs/internal/release-plans/v2.29.0/`. Rationale: an additive new skill is a clean MINOR with its own counts/samples/manifests; the memory work is the more entangled change (hooks + cohort contracts), so de-coupling them keeps a stumble in either from blocking the other.

---

## Scope

### Work items (committed to v2.28.0)

| ID | Item | Type | Classification | Category | Effort | Spec |
|---|---|---|---|---|---|---|
| W1 | `foundation-stakeholder-briefings` (incl. `evals/trigger-fixtures.json`) | NEW SKILL | foundation | communication | 3-4 d | [`spec_stakeholder-briefings.md`](spec_stakeholder-briefings.md) |
| W2 | Sample library (18 samples, 6 per thread) | SAMPLES | - | - | 2-3 d | this plan, "Sample manifest" |
| W3 | Surface + count sweep (66 -> 67, foundation 9 -> 10) | RELEASE HYGIENE | - | - | 0.5 d | this plan, "Release surfaces" |

**Effort ID:** **F-55** (first free on disk; F-45..F-53 roadmap-reserved, F-54 provisional for the v2.29.0 memory cohort). Confirm F-55 is free against the GitHub issue list before filing the effort brief + issue.

### What the skill is (one paragraph)

A foundation skill that accepts any source artifact (a PRD, a discovery/interview synthesis, a research report, a GTM/launch plan, experiment results, a retro/incident write-up, or raw notes) and produces one saveable artifact containing a **master document** (the canonical, audience-neutral synthesis: what/why, decisions, status, risks/open questions, asks, timeline) plus a set of **audience-tailored briefings**, each re-pitched to one stakeholder lens (the decision that audience owns, what they care about, their vocabulary, the right length and tone). The skill proposes a relevant audience subset from the detected source type, generates each briefing as a self-contained, copy-paste-ready block, flags every technical-to-business translation for user verification, and enforces a master-projection invariant: no briefing may assert a claim that is not in the master.

### Design summary (decided in brainstorming 2026-06-19)

- **Name:** `foundation-stakeholder-briefings` (plural encodes the 1-to-N nature; lexically distinct from the singular `*-brief` skills).
- **Classification / category:** foundation, `communication` (an existing category value, used by `utility-slideshow-creator`; NOT new). Standalone - deliberately NOT in the Meeting Skills Family (it is not meeting-bound).
- **The spine:** master-first, then project. Build the audience-neutral master, then derive each briefing as a projection. The invariant ("every briefing claim traces to the master") is the skill's structural, checkable contract - the distilled value per Decision D1 (structure over prose).
- **Audience lens library (9 + Custom):** Executive/Leadership, Board/Investors, Engineering, UX/Design, PMM, Sales, CS/Support, Legal/Compliance/Privacy, Data/Analytics/BI, plus a Custom slot (lens inferred from the audience name + source, shown for confirmation). Each lens = `{decision owned, cares-about, jargon posture, length/format, tone}`. Marketing/Growth held as a documented optional (overlaps PMM).
- **Default behavior:** source-aware proposal - the skill detects the source type and proposes the audiences that artifact usually needs (e.g. a spec -> Eng/UX/Data/Exec; a GTM plan -> PMM/Sales/CS/Exec), which the user accepts or edits. `--go` accepts the proposal unattended. No audience is ever locked out.
- **Output shape:** single artifact with delimited, send-ready briefing blocks (BEGIN/END cut-lines). A `--split` multi-file mode is documented as a deferred future enhancement (the first multi-file skill in the repo; deferred until demand, see Decision D2).

### What the skill ships with

- `skills/foundation-stakeholder-briefings/SKILL.md` (frontmatter + behavioral body + numbered steps + references)
- `skills/foundation-stakeholder-briefings/references/TEMPLATE.md` (the master scaffold + the per-briefing block scaffold + the translations-applied log section). REQUIRED (enforced by `lint-skills-frontmatter`).
- `skills/foundation-stakeholder-briefings/references/EXAMPLE.md` (one fully worked case, all sections). REQUIRED.
- `skills/foundation-stakeholder-briefings/references/audience-lenses.md` (the 9 first-class lens definitions + the Custom-inference rule + the Marketing/Growth optional note).
- `skills/foundation-stakeholder-briefings/references/source-type-map.md` (the source-type -> proposed-audience heuristic table).
- `skills/foundation-stakeholder-briefings/evals/trigger-fixtures.json` (committed, NOT deferred - resolves Codex finding 1 / Decision D8). Positive + near-miss fixtures covering the meeting-vs-non-meeting boundary with `foundation-stakeholder-update` plus `discover-stakeholder-summary` and `foundation-persona`. Authored BEFORE the collision gate.
- `scripts/check-briefings-trace.{mjs}` (advisory; the deterministic half of the invariant): verifies every briefing `Draws on:` ID resolves to a master claim ID and that each block has exactly one `Primary ask:`. Run over the skill's samples.
- No `HISTORY.md` at launch (created on first iteration per `docs/internal/skill-versioning.md`).
- No per-skill `commands/` wrapper (per the v2.22.0 wrapper-deletion decision).
- 18 library samples (W2; see manifest below).

### Explicitly out of scope

- Multi-file output (`--split` mode) - documented as a future enhancement, not built in v1.
- A Marketing/Growth or Data-distinct second-tier lens beyond the 9 first-class lenses (Marketing/Growth stays optional/documented).
- Auto-sending or channel delivery (the skill produces send-ready blocks; the human sends).
- A sub-agent or workflow variant (defer until usage shows value).
- Membership in the Meeting Skills Family (standalone by design).

---

## Sample manifest (W2: 18 samples, 6 per thread)

Per the maintainer request ("given the breadth of this skill, 4-6 sample outputs per thread") and following `SAMPLE_CREATION.md` (samples must follow `references/TEMPLATE.md` section order, so they are authored AFTER W1's TEMPLATE.md). Each sample takes an existing artifact from that thread's feature arc as the source and fans it out; together they exercise all 9 lenses multiple times and the full source-type spread. The `check-skill-sample-coverage` gate requires only 1 per thread (storevine/brainshelf/workbench); this manifest deliberately exceeds it, matching `foundation-persona`'s richer coverage.

### Storevine (B2B ecommerce, Campaigns arc, organized prompt) - 6 samples

| File suffix | Source artifact (from the arc) | Source type | Briefings (lenses) |
|---|---|---|---|
| `campaigns-prd` | Campaigns CAN-SPAM PRD | spec/PRD | Engineering, UX/Design, Data/BI, Executive, Legal |
| `campaigns-launch` | Campaigns GA launch checklist | GTM/launch | PMM, Sales, CS/Support, Executive, **Custom: Agency partners** (demonstrates Custom-lens inference) |
| `campaigns-experiment` | Templates A/B experiment results | metrics/experiment | Data/BI, Executive, PMM, Engineering |
| `campaigns-strategy` | Campaigns lean canvas + Q3 OKR | strategy | Executive, Board/Investors, PMM, Sales |
| `campaigns-retro` | Sprint 12 deliverability retro | incident/retro | Engineering, CS/Support, Executive |
| `campaigns-discovery` | 8 merchant interview synthesis | discovery | UX/Design, PMM, Executive, Engineering |

### Brainshelf (consumer PKM, Resurface arc, casual prompt) - 6 samples

| File suffix | Source artifact | Source type | Briefings (lenses) |
|---|---|---|---|
| `resurface-prd` | Resurface PRD (Apple Mail Privacy) | spec/PRD | Engineering, UX/Design, Data/BI, Legal |
| `resurface-experiment` | Email vs in-app A/B results | metrics/experiment | Data/BI, Executive, PMM |
| `resurface-launch` | App Store launch | GTM/launch | PMM, CS/Support, Executive |
| `resurface-discovery` | Guilt-pile interview synthesis | discovery | UX/Design, PMM, Executive |
| `resurface-pivot` | Pivot decision (time-based -> contextual) | strategy/decision | Executive, Engineering, Board/Investors |
| `resurface-rawnotes` | A messy founder Slack-thread brain-dump (no structure) | **raw notes / ambiguous** | Executive, Engineering, PMM (exercises the ambiguous-source classification + proposal fallback; casual thread fits Brainshelf's prompt style) |

### Workbench (enterprise collaboration, Blueprints arc, enterprise prompt) - 6 samples

| File suffix | Source artifact | Source type | Briefings (lenses) |
|---|---|---|---|
| `blueprints-prd` | SSO + approval-gates PRD | spec/PRD | Engineering, UX/Design, Data/BI, Legal, Executive |
| `blueprints-strategy` | Enterprise-expansion opportunity tree | strategy | Executive, Board/Investors, Sales, PMM |
| `blueprints-experiment` | Required-sections A/B results | metrics/experiment | Data/BI, Executive, Engineering |
| `blueprints-compliance` | HIPAA + data-handling review (standalone) | **compliance/privacy/security** | Legal, Engineering, CS/Support, Executive |
| `blueprints-launch` | Blueprints GA enterprise launch | GTM/launch | PMM, Sales, CS/Support, Executive |
| `blueprints-discovery` | Confluence-fatigue team-lead interviews | discovery | UX/Design, PMM, Executive |

**Filename pattern:** `sample_foundation-stakeholder-briefings_<thread>_<suffix>.md` (per `SAMPLE_CREATION.md` §2). Each sample carries the 10-field modern frontmatter (byte-0 fence), the `Scenario` / `Prompt` / `Output` structure, the master with numbered claim IDs, each briefing block with `Draws on:` + one `Primary ask:`, `[fictional]` markers on every invented metric, and Source Notes for real public claims.

**Coverage guarantees across the 18** (revised per Codex 2026-06-19 finding 5):
- **All 9 first-class lenses** appear in >= 3 samples each; Executive in nearly all.
- **All 8 source types** are exercised: spec/PRD (3), GTM/launch (3), metrics/experiment (3), strategy (3), discovery (3), incident/retro (1, storevine-retro), **compliance/privacy/security standalone (1, blueprints-compliance)**, **raw notes/ambiguous (1, resurface-rawnotes)**.
- **At least one Custom lens** is demonstrated (storevine `campaigns-launch`, Agency partners) to show inference.
- **Close-pair separations** are shown: Exec vs Board (the strategy samples), PMM vs Sales (launch + strategy), Engineering vs Data/BI (prd + experiment).

---

## Count impact (audit before tagging)

This release takes the catalog from **66 to 67 skills**, and specifically **foundation from 9 to 10**:

- Before: 30 phase + 9 foundation + 12 utility + 15 tool = 66
- After: 30 phase + **10 foundation** + 12 utility + 15 tool = **67**
- Derived: "Cross-Cutting Capabilities (foundation + utility)" 21 -> 22 (README At-a-Glance mermaid).
- Samples: library total + 18; sampled-skill count + 1 (the `samples/index.md` description carries explicit sample + sampled-skill numbers that are NOT auto-derived).

`check-count-consistency` derives the total from the `skills/` directory count and the four sub-counts from frontmatter, and it is the backstop for many `66` / `9 foundation` claims - **but it is not a complete backstop** (Codex 2026-06-19 finding 6): it intentionally excludes internal docs, library samples, changelog/release pages, and agent-context, and count claims also live on public pages outside the enumerated manual set (platform, guide, concept, runtime-component, versioning docs). Therefore G2 includes an explicit **grep count-sweep** (see Release surfaces, item I), not just the enumerated list, so no stale count survives on an excluded or unlisted surface.

---

## Release surfaces (G2)

A new skill touches a known surface set. Source: the new-skill ship-surface scan (2026-06-19). Grouped by auto-derived (regenerate / let the gate police) vs manual.

### A. The skill + samples (committed source)
- `skills/foundation-stakeholder-briefings/` (W1 files above).
- `library/skill-output-samples/foundation-stakeholder-briefings/` (W2: 18 sample files).
- `library/skill-output-samples/README_SAMPLES.md` - add the Browse-by-Skill row + Browse-by-Company entries; update the library total + sampled-skill count (and reconcile the existing 186/189 internal mismatch while here).
- `docs/internal/release-plans/v2.6.1/skill-output-samples_manifest.v2.6.1.json` - add the 17 sample entries (the tracked release-coverage manifest, per `SAMPLE_CREATION.md` §6).

### B. Regenerated (run the generator; CI checks with --check)
- `node scripts/gen-skill-manifest.mjs` -> rewrites root `skill-manifest.json`.
- `node scripts/gen-skill-manifest.mjs --agents` -> rewrites the `skills-catalog` block in `AGENTS.md` (do NOT hand-edit).
- Build the site (`cd site && npm run build`) so the gitignored per-skill + per-sample Astro pages generate via `gen-site.mjs`.
- `node scripts/check-route-parity.mjs --update` -> refresh `scripts/route-manifest.txt` (new skill + sample routes).
- `node scripts/gen-resource-index.mjs` -> rewrite `docs/RESOURCES.md` (run AFTER the route manifest refresh; it joins filesystem + route manifest).

### C. Manifests (version + count prose; manual)
- `.claude-plugin/plugin.json` - `version` 2.28.0 + the `description` count prose (66 -> 67, 9 -> 10 foundation) + a new release sentence.
- `.claude-plugin/marketplace.json` - `version` + count prose + release sentence.
- `.codex-plugin/plugin.json` - `version` + `longDescription` count prose.

### D. Root docs (manual)
- `README.md` - hero count, skills badge (`skills-66` -> `67`), foundation badge (`Foundation-9_skills` -> `10`), the features bullet (67 / 10), the At-a-Glance mermaid (`Foundation 9 -> 10`, Cross-Cutting `21 -> 22`), the catalog header `Foundation Skills - Cross-cutting capability (9) -> (10)` + a NEW table row for the skill, the At-a-Glance facts row + tree comments, the version badge + Current-version row, a new "What's New" `<details>` block, and the TOC anchor `...-capability-9 -> -10`.
- `CHANGELOG.md` - new `## [2.28.0]` with `### Added` (the skill + sample library).
- `CLAUDE.md` - the project-context count line (67 / 10 foundation).
- `QUICKSTART.md` - the two count lines (67 / 10 foundation).
- `AGENTS.md` - regenerated (item B), not hand-edited.

### E. Context files (manual; currency-gated)
- `_agent-context/claude/CONTEXT.md` - status line -> v2.28.0 + release summary; the `66 skills total` tree comment -> 67.
- `_agent-context/codex/CONTEXT.md` - currency marker -> v2.28.0.

### F. Astro site (tracked, hand-authored)
- `site/src/content/docs/index.mdx` - `Foundation (9) -> (10)` + add the skill to the inline foundation list.
- `site/src/content/docs/skills/index.md` - classification table Foundation cell -> 10 (and reconcile the stale 8/10 cells to live values while here).
- `site/src/content/docs/samples/index.md` - bump the `66` -> 67, the sampled-skill count (`61` -> 62), and the sample total (+17).
- `site/src/content/docs/getting-started/index.md` + `getting-started/quickstart.md` - count lines (67 / 10).
- `site/src/content/docs/reference/ecosystem.md` - the breakdown line (67 / 10).
- `site/src/content/docs/reference/pm-skill-anatomy.md` + `reference/project-structure.md` - verify/update any current-count claim.
- `site/src/content/docs/changelog.md` - curated one-paragraph `[2.28.0]` mirror.
- `site/src/content/docs/releases/Release_v2.28.0.md` (NEW, with `slug:` frontmatter) + a row in `releases/index.md`.

### G. Doc-currency fix (found 2026-06-19)
- `library/skill-output-samples/THREAD_PROFILES.md` - the "Coupling" section and "Adding a new thread" cite `scripts/generate-showcase.py` as the canonical showcase source, but that script does not exist on disk (verified). Update the references to the live generator (`scripts/gen-site.mjs`) or drop the stale coupling claim. Small; ride-along.

### H. Release-plan housekeeping
- `docs/internal/release-plans/v2.28.0/` (this plan + the spec).
- `docs/internal/release-plans/README.md` - add the v2.28.0 (briefings) and v2.29.0 (memory, renumbered) index rows.

### I. Grep count-sweep (G2; resolves Codex finding 6 - the enumerated list is necessary, not sufficient)
Because `check-count-consistency` excludes several surfaces, run an explicit sweep and update **every non-historical hit**, then re-grep to confirm zero:
- `grep -rn "\b66\b" --include=*.md --include=*.mdx --include=*.json .` and the same for `9 foundation` / `Foundation.*9` / `(9)` foundation forms, across the whole repo.
- Triage each hit: live count -> update to 67 / 10; historical/release-note/changelog mention -> leave (these are point-in-time and `count-exempt` or excluded by design).
- Explicitly check the surfaces the enumerated list and the validator both miss: any `site/.../reference/platform*`, `guide*`, `concept*`, `runtime-component*`, and `skill-versioning` docs; `_agent-context`; library sample headers (`README_SAMPLES.md` totals).
- Excluded-by-design surfaces (internal docs, changelog, release pages, agent-context) get a **manual** pass since the validator will not catch them.

### J. Reshuffle renumber-sweep (G2; resolves Codex finding 7)
The version reshuffle (memory v2.28.0 -> v2.29.0) leaves stale "v2.28.0 = memory" pointers. Sweep and correct live references:
- `grep -rni "v2.28.0" docs/internal _agent-context` and fix any that still call v2.28.0 the memory/"Remember" train or defer the utility-pm-critic fixture relabel "to v2.28.0" (it now rides v2.29.0).
- The SHIPPED `v2.27.1/plan_v2.27.1.md` is historical: add a dated correction note rather than rewriting it.
- Update any roadmap / backlog / CONTEXT line that names v2.28.0 as memory.

---

## Execution phases

| Phase | What | Status |
|---|---|---|
| 0 | Spec design forks locked (brainstorming) + Codex review #1 resolved | DONE 2026-06-19 |
| 1 | `SKILL.md` authoring (incl. the master-claim-ID + Draws on/Primary ask contract) | PENDING |
| 2 | `references/TEMPLATE.md` (master scaffold w/ claim IDs + briefing-block scaffold w/ Draws on/Primary ask + translations log) | PENDING |
| 3 | `references/EXAMPLE.md` (one fully worked case) | PENDING |
| 4 | `references/audience-lenses.md` (defs + "not this lens when" + overlap matrix) + `references/source-type-map.md` | PENDING |
| 5 | `evals/trigger-fixtures.json` (committed; covers the 3 adjacent skills) - BEFORE the collision gate | PENDING |
| 6 | Name-collision check (`check-new-skill-collision.mjs`) - now has the fixtures it needs | PENDING |
| 7 | `scripts/check-briefings-trace.mjs` (advisory trace/CTA validator) | PENDING |
| 8 | Sample library (18 samples, after TEMPLATE.md) + README_SAMPLES + manifest; run check-briefings-trace + sample-invariant checks | PENDING |
| 9 | Regen: skill-manifest, AGENTS block, site build, route-parity --update, resource-index | PENDING |
| 10 | Count + surface sweep incl. the grep count-sweep (item I) + the reshuffle renumber-sweep (item J) | PENDING |
| 11 | G1 adversarial review #2 (Codex) of the skill + samples; resolve | PENDING |
| 12 | Pre-tag validator bundle (`pre-tag-validate` --strict) + site build clean | PENDING |
| 13 | Cross-client smoke (Claude Code + Codex CLI) | PENDING |
| 14 | Tag v2.28.0 + GitHub Release Latest + repin `agent-plugins`; flip plan to SHIPPED | PENDING |

**Regen order matters** (from the surface scan): add skill + samples -> regen skill-manifest + AGENTS -> build site -> `check-route-parity --update` -> `gen-resource-index`.

---

## Decisions

| # | Decision | Status |
|---|---|---|
| D1 | Master-first projection with the 3-rule invariant, **mechanized** via master claim IDs + per-briefing `Draws on:` + a single required `Primary ask:` (rules 1-2 deterministic via `check-briefings-trace`; rule 3 neutral-master is a labeled review check, not automation) | DECIDED (brainstorming + Codex finding 2) |
| D2 | Single-artifact output with send-ready blocks; `--split` multi-file deferred | DECIDED (YAGNI; first multi-file skill is a convention break, defer until demand) |
| D3 | 9 first-class lenses + Custom; Marketing/Growth optional/documented | DECIDED (maintainer chose "broaden" + added Data/Analytics/BI as the 9th) |
| D4 | Source-aware audience proposal as the default (not all-9, not always-ask) | DECIDED |
| D5 | Classification foundation, category `communication`, standalone (not Meeting Skills Family) | DECIDED |
| D6 | Name `foundation-stakeholder-briefings` | DECIDED |
| D7 | Sample coverage: 6 per thread (18 total), authored after TEMPLATE.md; must cover all 8 source types + >=1 Custom lens + the close-pair separations | DECIDED (maintainer request + Codex finding 5) |
| D8 | Trigger-eval fixtures = **committed scope**, authored before the collision gate; cover the 3 adjacent skills | DECIDED (ship; Codex finding 1) |
| D9 | N=1 (single audience) is supported; the update-skill fallback is meeting-outcomes only | DECIDED (Codex finding 3) |

Full design rationale: [`spec_stakeholder-briefings.md`](spec_stakeholder-briefings.md) and the 2026-06-19 brainstorming gap-map.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Overlap confusion with `foundation-stakeholder-update` | Medium | Medium | Sharp 4-way "When NOT to Use" (update = one meeting update; summary = mapping; persona = viewpoint; briefings = 1-to-N from any source); collision check (Phase 5) |
| Briefings drift from the master (the failure this skill exists to prevent) | Medium | High | The master-projection invariant (D1) + a self-check step that lists any briefing claim not traceable to the master |
| Lens definitions blur into each other | Medium | Medium | "one lens = one decision" rule in `audience-lenses.md`; Marketing/Growth kept out of first-class set |
| Sample bloat (17 multi-briefing artifacts inflate library counts + author time) | Medium | Low | Bounded at 17; counts updated in `samples/index.md` + manifest; gate floor is only 3 so no CI pressure to over-produce |
| Count breakdowns left stale at ship | Medium | Low | Count-impact + Release-surfaces sections + `check-count-consistency` backstop |
| Codex flat-namespace collision on the name | Low | Low | Distinctive plural name; Phase 5 collision check |
| First multi-file temptation creeps into v1 | Low | Medium | D2 holds single-artifact; `--split` is documented-but-deferred |

---

## Exit criteria (definition of done)

1. The skill ships with all companion files (SKILL.md, TEMPLATE.md, EXAMPLE.md, audience-lenses.md, source-type-map.md, evals/trigger-fixtures.json) + `scripts/check-briefings-trace.mjs`.
2. The 18 samples exist, follow TEMPLATE.md section order (master claim IDs + per-block `Draws on:`/`Primary ask:`), pass the sample invariant checks (no placeholders, exact-quote sourcing, no fabricated unmarked metrics) + `check-briefings-trace`, cover all 8 source types + >=1 Custom lens + the close-pair separations, and `check-skill-sample-coverage` is green.
3. Trigger fixtures cover the 3 adjacent skills; name-collision check passes vs the existing `*stakeholder*` skills.
4. Pre-tag validator bundle passes `--strict`; site builds clean; route-parity + rendered-links green; counts updated to 67 / foundation 10 across all surfaces.
5. G1 adversarial review applied; no unresolved Blocker/Major.
6. The skill has been run on at least one real input and produced a coherent master + projected briefings with the invariant holding.
7. v2.28.0 tagged, GitHub Release Latest, marketplace install pulls the new version.
8. This plan flipped to SHIPPED; `CONTEXT.md` currency markers updated; the v2.29.0 memory plan's "Previous" link verified.

---

## Gate ledger (placeholder)

- [ ] G0 / G1 / G2 / G2.5 / G3 / G4 - filled at cut time (6-gate runbook embodied inline, same as v2.27.x).

## Notes

- DRAFT for maintainer review. Theme is committed (one new skill); the sample manifest, the F-55 ID, and D8 (trigger-eval fixtures) are open on review.
- Effort brief (`docs/internal/efforts/F-55-stakeholder-briefings.md`) + GitHub issue are the next execution-time step, deferred to keep this a single review surface (per the no-effort-doc-bloat convention).
- The memory train (formerly v2.28.0) now lives at [`../v2.29.0/plan_v2.29.0.md`](../v2.29.0/plan_v2.29.0.md) (tentative number).
