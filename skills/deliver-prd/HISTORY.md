# deliver-prd - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.3.0 | 2026-08-16 | v2.33.0 | C-1 | minor | Two conditional sections: `AI Behavior and Evaluation` (behavior requirements linked to the evidence that they hold) and `Agent Execution Contract` (authoritative sources, do-not-touch, an FR-n verification map, stop-and-escalate). |
| 2.2.0 | 2026-08-08 | v2.32.0 | F-54 | minor | Project Memory Contract: reads prior interpretation artifacts, writes the PRD as a decision artifact. |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-1 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 1) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |


## 2.3.0 (2026-08-16)

AI-product family Track 1 (effort C-1), the two `deliver-prd` increments ruled in
[the C-3 spec](../../docs/internal/release-plans/v2.32.0/spec_c3-ai-product-family.md) section 2.2.
Both are **conditional sections**, not new required ones, so a PRD for an ordinary deterministic
feature built by the team that wrote it is unchanged and still complete.

**`AI Behavior and Evaluation`, when the output comes from a model.** A model's output varies run to
run, so "it works" is a claim that needs evidence attached to it. The section pairs each behavior
that is a requirement of the release with how it will be shown to hold and at what threshold.
Refusal and abstention get their own rows because a model has no dependable default for either, so
what the feature does when it should *not* answer is a requirement rather than an implementation
detail. Components of a multi-step feature are scored separately, since an end-to-end pass rate
hides which step failed. Case-set size is stated as a method, never as a borrowed number.

**`Agent Execution Contract`, when an executor implements without the authoring context.** A coding
agent, an outside contractor, or a team picking the work up cold cannot infer what the author
already knows. The section declares four things: which sources are authoritative and which wins when
two disagree, what must not be touched and why, how each existing `FR-n` is verified and by whom,
and the conditions where the executor stops and escalates rather than deciding. It is a
`deliver-prd` increment rather than a new AI skill because agent execution is a handoff mode for
ordinary software work, not a property of AI products: a human contractor benefits from the same
declarations.

Minor rather than major: both sections are additive and skippable, the existing `FR-n` scheme is
reused rather than replaced, and no shipped section changed. A rewrite would have been a skill-major
under the versioning tie-breaker and would have forced regenerating three thread samples.

### Changes
- Added the conditional `AI Behavior and Evaluation` section, with an `AB-n` behavior scheme
  paralleling the existing `FR-n` and `US-n`.
- Added the conditional `Agent Execution Contract` section, keyed off the existing `FR-n` IDs.
- Instructions gained two conditional steps; Output Format names both sections and states that a
  PRD omitting a section its feature does not need is complete, while one including an empty
  section is not; the Quality Checklist gained one conditional item per section.
- `EXAMPLE.md` gained a filled-in Agent Execution Contract, keyed off its existing `FR-1` through
  `FR-11`. The recurring-tasks feature has no AI component, so the AI section stays legitimately
  absent, but the execution contract is not AI-specific and a non-AI example can carry it honestly.
  The map covers **all eleven** requirements rather than a representative few, because a partial map
  would contradict the template's own "one row per FR-n" rule, and an example contradicting its
  template is exactly the defect [#251](https://github.com/product-on-purpose/pm-skills/issues/251)
  reported against `foundation-persona`.

**Version note.** Two increments, one bump. The spec calls these "two additive minors", and both ship
in the same release, so they fold into a single `2.3.0` rather than stepping through `2.4.0`. That
follows this cycle's own precedent: `define-prioritization-framework` took two independently
minor-worthy changes from WS-2 and WS-3 into one `1.3.0`, recorded in its HISTORY as "folded into
this same unreleased version".

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
