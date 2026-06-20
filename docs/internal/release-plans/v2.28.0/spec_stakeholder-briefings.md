# Spec: `foundation-stakeholder-briefings` (v2.28.0) - DRAFT for review

Companion to [`plan_v2.28.0.md`](plan_v2.28.0.md). Defines the skill contract: the master-projection spine, the audience lens library, the source-type proposal, the output contract, and the `references/` files. DRAFT: everything here is proposed, locked where the plan's Decisions table says DECIDED.

## What it produces

One saveable artifact = a **master document** (canonical, audience-neutral synthesis) + a set of **audience-tailored briefings**, each a projection of the master re-pitched to one stakeholder lens. Input is any source artifact (spec/PRD, discovery/interview synthesis, research, GTM/launch, experiment/metrics, retro/incident, or raw notes).

## The spine: master-first, then project

1. **Ingest + classify.** Read the source; classify its type (spec / discovery / research / GTM / metrics / retro / raw). Flag low input quality if the source is thin, but continue.
2. **Build the master.** Produce one audience-neutral canonical document with a fixed structure: What & Why, Decisions, Status, Risks & Open Questions, Asks, Timeline. This is the single source of truth. No audience-specific spin.
3. **Propose audiences.** From the source type, propose the relevant audience subset (see "Source-type proposal"). Show the proposal; accept `go`, an edit (`drop X, add Y`), or `all`. `--go` accepts the proposal unattended.
4. **Project each briefing.** For each selected lens, render a self-contained, send-ready block: a one-line headline, a "what this means for you" framing, the single decision/CTA that audience owns, and only master-traceable claims, at the lens's length and tone.
5. **Flag translations.** Maintain a translations-applied log (internal, below the shareable boundary) recording every technical-to-business or inferred re-pitch, for user verification - inheriting the `foundation-stakeholder-update` discipline.
6. **Self-check the invariant** (below) and list anything that fails before finalizing.

## The invariant (the skill's contract)

Three rules. The trace-reference and CTA structure is deterministically checkable; the "no untraced claim" projection fidelity and the neutral-master rule are the skill's self-check plus human/LLM review, not automation. (Honest scope per Codex review #2, 2026-06-19; an earlier draft overstated deterministic enforcement.)

1. **Projection rule.** A briefing may omit, reorder, and translate master content; it may not introduce a claim absent from the master. This has a **deterministic part** - every briefing's `Draws on:` line must list master claim IDs that all resolve to real master claims (the master numbers its claims `M1`, `M2`, ...) - and a **review part** - the body must actually contain only those claims, re-read per block at self-check time. The deterministic part is enforced by `check-briefings-trace`; the review part is semantic and not automated. Authoring rule: make the master the true superset, so any specific a briefing needs is added as a master claim and cited, never introduced only in the briefing.
2. **One-CTA rule (deterministic).** Each briefing block has exactly one `Primary ask:` field. `check-briefings-trace` checks cardinality = 1 per block.
3. **Neutral-master rule (review).** The master carries no audience-specific spin. Review check, not automation.

`check-briefings-trace` (advisory, per the M-30 ladder) enforces the **structural half**: every `Draws on:` ID resolves to a real master claim and each block has exactly one `Primary ask:`. It does **not** verify the body introduces no untraced claim - that is the self-check step plus review. The structural contract (declared, resolving claim references + one ask) is still what separates the skill from "ask an LLM to rewrite this 6 ways" (per plan Decision D1, structure over prose), while the spec stays honest about what is and is not automated.

## Audience lens library (9 first-class + Custom)

Each lens is defined by the decision it owns (the axis that keeps lenses distinct). Full definitions live in `references/audience-lenses.md`; summary:

| Lens | Decision it owns | Cares about | Jargon posture | Length / tone |
|---|---|---|---|---|
| Executive / Leadership | fund / kill / reprioritize | outcome, cost, risk, timing | translate all tech -> business | short, asks up front, formal |
| Board / Investors | back the strategy / capital | growth, metrics, capital efficiency, thesis fit | zero internal jargon | high-altitude, narrative |
| Engineering | feasibility, sequencing, risk | constraints, dependencies, edge cases | keep precise technical terms | as long as needed, concrete |
| UX / Design | user impact, design direction | flows, research implications, design debt | user-centered language | concrete, user-framed |
| PMM | positioning, messaging, launch | differentiation, competitive framing, narrative | market language | crisp, benefit-led |
| Sales | what is sellable now, talk track | deal/pipeline impact, objections, timing | customer-facing language | punchy, objection-aware |
| CS / Support | customer change, enablement | migration, known issues, account talking points | plain customer language | practical, step-oriented |
| Legal / Compliance / Privacy | obligations, approvals, exposure | data handling, regulatory exposure, terms | precise legal terms | careful, risk-framed |
| Data / Analytics / BI | what to measure, how we know it worked | instrumentation, metric definitions, reporting impact, data quality | precise data terms | specific, metric-framed |
| Custom (the "other" slot) | inferred from the audience name + source | inferred | inferred | inferred; shown for confirmation before generating |

**Distinctness rule (operationalized; Codex 2026-06-19 fix).** Each lens owns one **primary** decision; the lenses are not perfectly orthogonal, so `audience-lenses.md` must carry, in addition to the per-lens definition, (a) a "**not this lens when...**" boundary line per lens and (b) an **overlap matrix** disambiguating the close pairs. The known overlaps and their splits:

| Close pair | The split (who owns what) |
|---|---|
| Executive vs Board/Investors | Exec = internal fund/kill/reprioritize of *this* work; Board = the company-level strategy/capital narrative this work feeds. Not Board when the decision is operational. |
| PMM vs Sales | PMM = positioning/messaging/launch narrative; Sales = what is sellable *now* + the talk track + objection handling. Not Sales when there is no deal/pipeline action. |
| Engineering vs Data/Analytics/BI | Eng = can we build it (feasibility/sequencing/risk); Data = what we will measure + how we know it worked (instrumentation/metric defs/reporting). Not Data when there is no measurement decision. |
| Legal vs Exec | Legal = obligations/approvals/exposure; Exec = the go/no-go that weighs that exposure. Not Legal when there is no regulatory/contractual surface. |

Samples must include cases that separate Exec vs Board, PMM vs Sales, and Engineering vs Data (see the manifest). **Marketing/Growth** (demand gen, channels) stays a documented optional, not first-class, because its primary decision overlaps PMM. Data/Analytics/BI is first-class (the 9th) because measurement is usually a different team and a distinct decision from Engineering and from the `measure-*` skills (which *produce* measurement artifacts; this lens *briefs* the data team).

## Source-type proposal (the default audience subset)

The skill proposes a relevant subset by detected source type; full table in `references/source-type-map.md`. Heuristic, always editable, never locks out a lens:

| Source detected | Proposed | Held back (one tap to add) |
|---|---|---|
| Spec / PRD | Engineering, UX/Design, Data/BI, Exec | PMM, Sales, CS, Legal, Board |
| Discovery / research | UX/Design, PMM, Exec, Engineering | Sales, CS, Data, Legal, Board |
| GTM / launch | PMM, Sales, CS, Exec | Engineering, Legal, Data, Board |
| Strategy / roadmap | Exec, Board, PMM, Sales | Engineering, UX, CS, Data, Legal |
| Experiment / metrics | Data/BI, Exec, PMM, Engineering | UX, Sales, CS, Legal, Board |
| Incident / retro / risk | Engineering, CS, Exec, Legal | UX, PMM, Data, Sales, Board |
| Compliance / privacy / security | Legal, Engineering, Exec, CS | the rest |
| Raw notes / ambiguous | Exec + Engineering + PMM, or ask | all 9 offered |

This is encoded PM judgment and a catalog integration point: the skill is the natural "last mile" after `deliver-prd`, `discover-interview-synthesis`, `measure-experiment-results`, and friends.

## Output contract

- **Single artifact** (Decision D2). Structure: the master section -> the delimited briefing blocks (`--- BEGIN: <lens> ---` ... `--- END ---`, each self-contained and send-ready) -> the internal translations-applied log -> Sources & References. Template authoring blockquotes stripped from the final output.
- **Trace structure (for the invariant).** The master section numbers each claim with a stable ID (`M1`, `M2`, ...). Each briefing block opens with two required fields: `Draws on:` (the master IDs it projects) and `Primary ask:` (exactly one). This is the structural contract `check-briefings-trace` (advisory) enforces: every `Draws on:` ID resolves and each block has exactly one `Primary ask:`. (It does not semantically verify the body; that is the self-check + review.)
- **Filename:** `YYYY-MM-DD_HH-MMtz_<title>_stakeholder-briefings.md` (the artifact); library samples use `sample_foundation-stakeholder-briefings_<thread>_<suffix>.md` per `SAMPLE_CREATION.md`.
- **Boundary marker** between the shareable briefings and the internal sections (translations log, sources), mirroring `foundation-stakeholder-update` v1.1.0.
- **Deferred `--split` mode:** a future enhancement writes each briefing block to its own file (the first multi-file skill in the repo). Out of scope for v1; the block self-containment means `--split` is cheap to add later.

## Classification, naming, boundaries

- `metadata.classification: foundation`, `metadata.category: communication` (existing value), standalone (NOT the Meeting Skills Family).
- Name `foundation-stakeholder-briefings` (plural = the 1-to-N signal).
- **When NOT to Use:**
  - One async update of **meeting** outcomes for stakeholders -> `foundation-stakeholder-update` (it is meeting-bound; that is its only fallback scope).
  - *Mapping* stakeholders (influence/interest, comms plan) -> `discover-stakeholder-summary`.
  - A *persona* viewpoint to design or market against -> `foundation-persona`.
- **N=1 is supported (Codex 2026-06-19 fix).** The skill runs for a single audience from any source; it does NOT refuse one-lens requests. The earlier "use stakeholder-update for one audience" guidance was wrong - that skill is meeting-bound, so a one-audience PRD / research synthesis / GTM plan / experiment result had no valid path. For one non-meeting audience, use briefings with a single lens. The 1-to-N fan-out is the skill's *signature* use, not a floor.

## `references/` files (W1 deliverables)

- **`TEMPLATE.md`** - the master scaffold (What & Why, Decisions, Status, Risks & Open Questions, Asks, Timeline) with **numbered master claim IDs** (`M1`, `M2`, ...); the per-briefing block scaffold with two required fields (`Draws on:` master IDs, `Primary ask:` exactly one) plus headline / what-this-means-for-you / body; the BEGIN/END cut-line convention; the boundary marker; and the translations-applied log + Sources sections. Sample Outputs must follow this section order (`SAMPLE_CREATION.md` §4).
- **`EXAMPLE.md`** - one fully worked case (suggest a Storevine or Workbench source) showing the master with claim IDs + 3-4 briefings (each with `Draws on:`/`Primary ask:`) + the translations log, all sections complete, no placeholders.
- **`audience-lenses.md`** - the 9 first-class lens definitions (primary decision / cares-about / jargon posture / length / tone), a "**not this lens when...**" boundary per lens, the **overlap matrix** for the close pairs (Exec/Board, PMM/Sales, Eng/Data, Legal/Exec), the Custom-inference rule, and the Marketing/Growth optional note.
- **`source-type-map.md`** - the source-type -> proposed-audience heuristic, with the override semantics (accept / edit / all; nothing locked out) and explicit handling of the `raw notes / ambiguous` and `compliance / privacy / security` source types.
- **`evals/trigger-fixtures.json`** - positive + near-miss trigger fixtures (committed, not deferred; see plan Decision D8), explicitly covering the boundaries with `foundation-stakeholder-update` (meeting vs non-meeting), `discover-stakeholder-summary`, and `foundation-persona`. Feeds `check-new-skill-collision.mjs`.

## Open questions / decisions

- **D8 (RESOLVED 2026-06-19 = ship) - trigger-eval fixtures.** Per the v2.27.0 convention and the Codex collision-gate finding, `evals/trigger-fixtures.json` is **committed scope, not deferred**, and is authored BEFORE the `check-new-skill-collision.mjs` gate (which fails closed without it). Fixtures must cover the meeting-vs-non-meeting boundary with `foundation-stakeholder-update` plus near-misses for `discover-stakeholder-summary` and `foundation-persona`.
- **Custom-lens demonstration (RESOLVED = require).** At least one sample must exercise a Custom lens (shows inference), and the manifest must cover the `raw notes / ambiguous` and standalone `compliance / privacy / security` source types, not just lens counts (Codex finding 5).
- **Master persistence.** Whether the master should optionally be saved as its own file even in single-artifact mode (a halfway step toward `--split`). Deferred; revisit with `--split` demand.

## Acceptance (proposed)

- [ ] SKILL.md + the 4 `references/` files + `evals/trigger-fixtures.json` present; `lint-skills-frontmatter` green (TEMPLATE.md + EXAMPLE.md required).
- [ ] The master uses numbered claim IDs; every briefing block carries `Draws on:` + exactly one `Primary ask:`; the invariant is stated in SKILL.md and exercised by a self-check step.
- [ ] `check-briefings-trace` (advisory) green on the skill's samples: every `Draws on:` ID resolves; one `Primary ask:` per block.
- [ ] The 9 lens definitions + per-lens "not this lens when" boundaries + the overlap matrix + Custom-inference rule are in `audience-lenses.md`; the source-type map (incl. raw/ambiguous + compliance) is in `source-type-map.md`.
- [ ] Output is a single artifact with delimited send-ready blocks + the internal boundary; `--split` documented as deferred. N=1 supported (no one-lens refusal).
- [ ] When-NOT-to-Use present; trigger fixtures cover the three adjacent skills; name-collision check green.
- [ ] Samples authored per the (revised) manifest, following TEMPLATE.md order, passing the sample invariant checks; coverage includes raw/ambiguous input, standalone compliance, the Exec/Board + PMM/Sales + Eng/Data separations, and >=1 Custom lens.
