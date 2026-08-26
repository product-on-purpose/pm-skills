# deliver-prd - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 3.0.0 | 2026-08-21 | v2.33.0 | C-1 | **major** | Two conditional sections: `AI Behavior and Evaluation` (behavior requirements linked to the evidence that they hold) and `Agent Execution Contract` (authoritative sources, do-not-touch, an FR-n verification map, stop-and-escalate). **Also replaces the evaluation-set sizing method**: saturation stopping ("smallest N where adding cases stops changing the verdict") is stopping on the observed outcome, so sizing is now risk-based with named slices, a coverage floor per slice, and held-out cases, and the section explicitly declines to license a failure-rate claim. **Retyped from 2.3.0 minor before release** (G1 adversarial finding 1): when the condition applies, a section plus two checklist items are required for completeness, which is the tie-breaker rule's major case. 2.3.0 never shipped. |
| 2.2.0 | 2026-08-08 | v2.32.0 | F-54 | minor | Project Memory Contract: reads prior interpretation artifacts, writes the PRD as a decision artifact. |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-1 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 1) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |


## 3.0.0 (2026-08-21)

**Why this is a MAJOR, and why it was first typed 2.3.0.** The content below shipped as a drafted
`2.3.0` minor on 2026-08-16, on the reasoning that conditional sections cannot break existing usage.
The v2.33.0 G1 adversarial review overturned that reasoning before the tag, and the ruling was to
retype rather than defend it. `2.3.0` never shipped, so the published line runs 2.2.0 to 3.0.0.

Conditionality narrows *who* is affected; it does not change *what happens to them*. For a PRD whose
feature output comes from a model, `AI Behavior and Evaluation` is now required for completeness, and
a new Quality Checklist item must pass, with a second applying whenever an evaluation set is sized.
(A third new item ships at 3.0.0 but is conditioned on the executor lacking authoring context, which
is an independent trigger and not part of this one.) That is the tie-breaker rule in
[`skill-versioning.md`](../../docs/internal/skill-versioning.md) verbatim: *"If a user must do
something new to stay compliant with the skill's required contract, classify as major"*, plus its
worked cases *"'You must now include section X' -> major"* and *"New required checklist item added ->
major"*. The invalidation is concrete rather than theoretical: the published `orbit_ideal` and
`orbit_reality` samples describe an AI-generated summary feature and carry no such section, so both
were non-compliant with the skill that produced them the moment this content landed.

**Four versions of this block, three reworks, and the fourth is the one that shipped.** The drafted
version used saturation stopping. Round 1 replaced it with a risk-based floor. Round 2 found that
floor had no derivation rule and was hand-waving one level up, and its remedy (D12) added a
rule-of-three derivation with a worked example. **Round 3 found that remedy worse than the problem**:
it computed its bound from the full slice while the same template holds 25 percent back from tuning,
so it claimed roughly 3.5x more protection than the design supported. A number that looks
statistical but is not carries more authority than an obviously rough one.

**D15 ruled the honest-minimal path.** The derivation and every number in it are gone. A floor is
stated as what it is, a coverage commitment that a named failure mode was searched for
deliberately, and the section explicitly declines to license a failure-rate claim, saying that an
honest rate needs a sampling frame, a preregistered threshold, and independence assumptions a
curated slice usually violates. The Quality Checklist item triggered by "an evaluation set is
sized" grades the coverage commitment rather than a derivation. Deriving a defensible sizing method carries to v2.34.0, gated on a
control arm, because three attempts inside one release cycle produced saturation stopping, an
underived floor, and an overstatement.

Note that a skill MAJOR does not imply a repo MAJOR. `skill-versioning.md` states the repo versions
independently, so this ships inside the v2.33.0 minor.

AI-product family Track 1 (effort C-1), the two `deliver-prd` increments ruled in
[the C-3 spec](../../docs/internal/release-plans/v2.32.0/spec_c3-ai-product-family.md) section 2.2.
Both sections are **conditional**: a PRD for an ordinary deterministic feature built by the team that
wrote it is unchanged and still complete. What conditionality does *not* do is keep the change minor
for the population the condition selects.

**`AI Behavior and Evaluation`, when the output comes from a model.** A model's output varies run to
run, so "it works" is a claim that needs evidence attached to it. The section pairs each behavior
that is a requirement of the release with how it will be shown to hold and at what threshold.
Refusal and abstention get their own rows because a model has no dependable default for either, so
what the feature does when it should *not* answer is a requirement rather than an implementation
detail. Components of a multi-step feature are scored separately, since an end-to-end pass rate
hides which step failed. Case-set size is stated as a method, never as a borrowed number.

**Evaluation-set sizing was replaced at 3.0.0 (G1 adversarial finding 3).** The drafted method was
"the smallest N where adding cases stops changing the verdict", which is optional stopping on the
observed outcome: the answer depends on the order cases arrive in, and a verdict typically
stabilises *before* the rare and harmful slices appear, because rare cases are rare. Sizing is now
risk-based: name the slices that must be covered, set a coverage floor per slice and say what that
floor buys, and hold cases back from tuning. **The section does not license a failure-rate claim at
all**, and says so explicitly: report raw counts per slice against the floor each was held to. An
honest rate needs a sampling frame, a threshold fixed before the run, and independence assumptions a
curated slice usually violates. The no-borrowed-number rule is unchanged.

**`Agent Execution Contract`, when an executor implements without the authoring context.** A coding
agent, an outside contractor, or a team picking the work up cold cannot infer what the author
already knows. The section declares four things: which sources are authoritative and which wins when
two disagree, what must not be touched and why, how each existing `FR-n` is verified and by whom,
and the conditions where the executor stops and escalates rather than deciding. It is a
`deliver-prd` increment rather than a new AI skill because agent execution is a handoff mode for
ordinary software work, not a property of AI products: a human contractor benefits from the same
declarations.

~~Minor rather than major: both sections are additive and skippable, the existing `FR-n` scheme is
reused rather than replaced, and no shipped section changed. A rewrite would have been a skill-major
under the versioning tie-breaker and would have forced regenerating three thread samples.~~
**Corrected 2026-08-21 (G1 adversarial finding 1).** "Skippable" was the load-bearing error. The
sections are skippable only for features the condition does not select; for the features it does
select they are required, and the tie-breaker asks whether existing usage breaks, not whether some
users are unaffected. Reusing `FR-n` and leaving shipped sections unchanged are both true and both
irrelevant to the test. The sample-regeneration cost the paragraph treats as an argument against
major was in fact already incurred: `orbit_ideal` is retrofitted at this version and `orbit_reality`
carries a contract-vintage note.

### Changes
- Added the conditional `AI Behavior and Evaluation` section, with an `AB-n` behavior scheme
  paralleling the existing `FR-n` and `US-n`.
- Added the conditional `Agent Execution Contract` section, keyed off the existing `FR-n` IDs.
- Instructions gained two conditional steps; Output Format names both sections and states that a
  PRD omitting a section its feature does not need is complete, while one including an empty
  section is not. The Quality Checklist gained three conditional items: one triggered by model
  output, one by an evaluation set being sized, and one by an executor implementing without the
  authoring context. The first two are AI-related; the third is an independent trigger, so no
  single condition makes all three apply.
- `EXAMPLE.md` gained a filled-in Agent Execution Contract, keyed off its existing `FR-1` through
  `FR-11`. The recurring-tasks feature has no AI component, so the AI section stays legitimately
  absent, but the execution contract is not AI-specific and a non-AI example can carry it honestly.
  The map covers **all eleven** requirements rather than a representative few, because a partial map
  would contradict the template's own "one row per FR-n" rule, and an example contradicting its
  template is exactly the defect [#251](https://github.com/product-on-purpose/pm-skills/issues/251)
  reported against `foundation-persona`.

**Version note.** Two increments, one bump. Both ship in the same release, so they fold into a single
version rather than stepping through two. That follows this cycle's own precedent:
`define-prioritization-framework` took two independently minor-worthy changes from WS-2 and WS-3
into one `1.3.0`, recorded in its HISTORY as "folded into this same unreleased version". The
single version is `3.0.0` rather than the drafted `2.3.0`; the spec's phrase "two additive minors"
described the intent at scoping time and did not survive the G1 review.

## 2.2.0 (2026-08-08)

Released in v2.32.0. Effort: F-54 (memory-aware cohort, B2).

Adds a `## Project Memory Contract` section declaring what this skill reads from and appends to
`.claude/pm-skills.local.md`. Additive and inert: with no memory file the skill behaves exactly as
before. Writes are proposed for confirmation unless `memory_auto_append: true` is set.

### Changes
- Declared the project-memory read/write contract.
## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 1): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
