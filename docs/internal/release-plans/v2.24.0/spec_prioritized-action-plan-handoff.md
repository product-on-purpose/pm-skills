# Spec: `foundation-prioritized-action-plan` v1.1.0 - plan-to-orchestrator handoff (THIRD component)

**Status:** spec / build-ready. Derived from the approved design.
**Date:** 2026-06-01
**Parent design:** [`design_plan-orchestrator.md`](design_plan-orchestrator.md) (section 11 is the authority for this component)
**Sibling specs:** engine spec (`agents/pm-workflow-orchestrator.md`) + dispatch-skill spec (`skills/utility-pm-workflow-orchestrator/`); this is the third of the three specs the one design yields.
**Master plan:** [`plan_v2.24.0.md`](plan_v2.24.0.md)
**Target release:** v2.24.0 (additive MINOR)
**Component scope:** edits to the existing, shipped plan skill ONLY. It does not author the engine or the dispatch skill (those are the sibling specs); it consumes the orchestrator as a fixed dependency.

This spec covers exactly one component of v2.24.0: the producer-side handoff added to `skills/foundation-prioritized-action-plan/SKILL.md`, taking that skill from v1.0.0 (shipped v2.23.0) to v1.1.0. The plan skill is the natural producer of a runnable Section 7; v2.24.0 lets it offer to run its own output through the governed orchestrator instead of requiring the user to discover and invoke a separate skill.

---

## 1. Purpose

The plan skill produces a Section 7 of copy/paste prompts, most of which are RUNNABLE (they carry a `**Skill:** \`name\`` line). Today the user must manually find `utility-pm-workflow-orchestrator` (the new dispatch skill shipping in the same release), invoke it, and point it at the plan. That is friction at exactly the moment intent is highest: just after the plan is produced.

v1.1.0 closes that gap with a HANDOFF mode. After producing a plan, the skill:

1. Tells the user, in one short closing line, that it can run the plan's runnable Section 7 prompts through `utility-pm-workflow-orchestrator`.
2. On ONE explicit confirmation, hands the plan to `utility-pm-workflow-orchestrator` in CHECKPOINTED mode (the safe posture; the user still confirms each step inside the orchestrator).
3. Supports a `--run` flag for produce-and-hand-off in one shot (still CHECKPOINTED by default), and forwards a `--force-auto` flag to the orchestrator without ever relaxing the orchestrator's own guardrails.

The handoff is a one-confirmation gate (or one flag) into the dedicated, governed orchestrator. The plan skill itself still does NO inline execution of work-skills - it never runs `deliver-prd`, `discover-competitive-analysis`, or any Section 7 target. Execution happens entirely inside the orchestrator, behind that skill's per-step checkpoints, refusals, and Cynefin floor (design sections 5, 7, 8).

This is the THIRD component of v2.24.0 and the cleanest of the three: it adds an optional offer plus two flags to an existing skill, reuses an orchestrator authored elsewhere in the same release, and changes no required behavior. A user who ignores the offer gets the exact v1.0.0 experience.

---

## 2. Design for this component

### 2.1 The end-of-plan offer

After Section 8 (the evidence and source map) - that is, after the full plan document is emitted - the skill appends a single short closing line. It is an OFFER, never an auto-run (design section 10: "the handoff offers, it never auto-runs"). Exact behavior:

- Phrasing names the consumer skill plainly: it can run the plan's runnable Section 7 prompts through `utility-pm-workflow-orchestrator` in CHECKPOINTED mode (one go/no-go per step).
- The offer fires ONLY when Section 7 produced at least one RUNNABLE block (a prompt carrying a resolvable `**Skill:** \`name\`` line). If Section 7 is all-manual or empty, the skill does NOT dangle an offer it cannot fulfill; it says nothing or notes that there is nothing runnable to hand off. (This mirrors the orchestrator's own pre-flight refusal of a Section 7 with zero RUNNABLE blocks, design section 8.1.)
- The offer states the safe default plainly: hand-off is CHECKPOINTED; the orchestrator pauses for the user at each step.
- The offer is a closing line, not a new mandatory section. It is appended after the document, so it does not change the nine-section output contract and does not count against the per-tier word backstop in the same way a section would. (Hygiene: the v2.23.0 nine-section output contract, Sections 0 to 8, still holds; verified at `docs/internal/release-plans/v2.23.0/spec_prioritized-action-plan.md` acceptance criterion #2 "Section presence", line 361, which checks for exactly the 9 mandatory section headers 0 to 8 in order. The offer is prose after Section 8, not a Section 9.)

### 2.2 The one-confirmation handoff (CHECKPOINTED)

On ONE explicit user confirmation of the offer, the skill hands the just-produced plan to `utility-pm-workflow-orchestrator` in CHECKPOINTED mode. Mechanics:

- The thing handed off is the plan document the skill just produced (Mode A input to the orchestrator, design section 3.1). The orchestrator parses Section 7 into an ordered list of runnable prompt blocks and runs them in document order, pausing for go/no-go after each `OK` step (design sections 3.1, 4, 5.1).
- "One confirmation" means a single yes-equivalent reply. The plan skill does NOT re-prompt, re-classify, or add its own gate on top of the orchestrator's. The handoff is the boundary; once crossed, the orchestrator owns the run and all subsequent pauses are the orchestrator's per-step checkpoints.
- CHECKPOINTED is the default and is the safe posture: the user confirms each step inside the orchestrator regardless of how the orchestrator was reached. The plan skill chooses CHECKPOINTED so the producer handoff never introduces an unsupervised fan-out (design section 11.1 step 2, section 11.2).
- Cross-client: on Claude Code the handoff invokes `@agent-pm-skills:pm-workflow-orchestrator` via the dispatch skill; on non-Claude clients the dispatch skill reads `agents/pm-workflow-orchestrator.md` and runs the loop inline (design section 6, and section 5 below). The plan skill is mechanism-agnostic: it hands off to `utility-pm-workflow-orchestrator` and lets that skill resolve the runtime.

### 2.3 The `--run` flag

`--run` collapses the two turns (produce, then confirm) into one:

- Behavior: produce the plan AND hand it to the orchestrator in the same invocation, still CHECKPOINTED by default. The user opted in by passing the flag, so no separate offer-confirmation turn is needed; the orchestrator's per-step checkpoints still apply.
- `--run` does NOT change the plan content. The skill produces the identical nine-section document, then hands off. If the produced Section 7 has zero RUNNABLE blocks, `--run` degrades to the no-op offer state (nothing to run) and the skill says so rather than invoking an empty orchestrator run - again mirroring the orchestrator's zero-runnable refusal so the two sides agree.
- `--run` without `--force-auto` is CHECKPOINTED: the orchestrator pauses at every step.

### 2.4 The `--force-auto` flag (forwarded, never relaxed)

`--force-auto` is an orchestrator flag that the plan skill FORWARDS; the plan skill never interprets or relaxes it:

- Passed through to `utility-pm-workflow-orchestrator`, where it flips Complex/Chaotic (and Mode-B-no-domain) plans from forced-checkpointed to auto, suppressing per-step pauses for unambiguously-PRODUCED steps only (design sections 5.2, 5.3).
- The plan skill NEVER relaxes the orchestrator's guardrails. `--force-auto` does NOT bypass stop-on-failed/empty, which is unconditional and outranks `--force-auto` in all domains (design section 5.3). The Cynefin floor still applies: the domain comes from the plan's own Section 2, which the orchestrator extracts (design sections 3.1, 5.2). On a Complex plan under `--force-auto`, an EMPTY or ambiguous step still surfaces for confirmation.
- Typical form: `--run --force-auto` means "produce the plan, hand it off, and let unambiguously-clean steps auto-advance, subject to the orchestrator's Cynefin floor and stop-on-failed/empty." `--force-auto` alone (without `--run`) is forwarded through the interactive one-confirmation handoff just the same.
- Because the plan it produces carries its own Cynefin classification, a Complex/Chaotic plan handed off under `--force-auto` is still held at CHECKPOINTED by the orchestrator's floor unless that floor's own override conditions are met. The plan skill does not need to know this; it only forwards the flag. This keeps the autonomy decision inside the one governed component that owns it.

### 2.5 Self-reference safety

The producer-to-consumer pointer ALWAYS targets `utility-pm-workflow-orchestrator` and never names the plan skill or itself as a runnable step (design section 11.4):

- The plan skill cannot enqueue itself. Section 7's existing name-safety and Tier-3 rules already forbid recommending `foundation-prioritized-action-plan` itself (`skills/foundation-prioritized-action-plan/SKILL.md` Tier-3 list and guardrail 7), so no RUNNABLE block can target the producer.
- The consumer would refuse it anyway. The orchestrator's pre-flight refuses a Mode A plan whose Section 7 names `foundation-prioritized-action-plan` or `utility-pm-workflow-orchestrator` (design sections 8.1, 8.2). The loop is closed on both sides: the producer cannot enqueue itself, and the consumer would refuse it if it appeared.
- `utility-pm-workflow-orchestrator` is itself Tier-3 library machinery from the plan skill's recommendation perspective (it is a `utility` dispatch skill in the maintenance family), so the handoff pointer is a deliberate, named exception to the recommendation tiers, not a Section 7 recommendation. The handoff line lives OUTSIDE Section 7 (it is the closing offer of 2.1), so it does not violate the Section 7 Tier-3 exclusion.

### 2.6 What does NOT change (v1.0.0 behavior preserved)

This is an additive minor. A user who never passes a flag and ignores the closing offer gets the exact v1.0.0 experience:

- The nine-section output contract (Sections 0 to 8) is unchanged.
- The Step 0 source ledger, the Cynefin classification, the binding-constraint logic, the evidence map, the recommendable-skill tiers, the name-safety rule, and the per-tier word backstop are all unchanged.
- The skill STILL never invokes any work-skill inline (guardrail 7 holds). The only new behavior is the offer/flags that route to the separate orchestrator.

---

## 3. SKILL.md edits (frontmatter + body)

The shipped file is `skills/foundation-prioritized-action-plan/SKILL.md`. The edits are surgical: a frontmatter version/date bump and three body additions.

### 3.1 Frontmatter edit

Two field changes only, no structural change to the frontmatter schema:

```yaml
metadata:
  classification: foundation
  version: "1.1.0"        # was "1.0.0"
  updated: <ship-date>    # was 2026-05-31; set to the v2.24.0 ship date
  category: planning
  frameworks: [triple-diamond, theory-of-constraints, cynefin]
  author: product-on-purpose
```

`name`, `description`, `license`, `classification`, `category`, `frameworks`, and `author` are UNCHANGED. The description is not edited: the handoff is an optional mode, the description already fits the validator's 20 to 100 word window, and adding handoff prose risks pushing it over while teaching nothing a user must know to invoke the base skill. (This matches the design's discipline of keeping run modes out of the dispatch skill's description, section 2.2 of the design.)

### 3.2 Body edit A - new "Handoff to the orchestrator (optional)" section

Add a new `##` section AFTER `## Output destination` and BEFORE `## Quality Checklist`. This is a behavioral section, not one of the nine OUTPUT sections, so it does not change the output contract. Draft body:

```markdown
## Handoff to the orchestrator (optional)

After you produce the plan, you may offer to run its runnable Section 7 prompts
through `utility-pm-workflow-orchestrator`, the governed plan orchestrator. This
is an offer, never an auto-run, and it never relaxes the orchestrator's
guardrails. You still do no inline execution of work-skills yourself.

**When to offer.** Make the offer ONLY when Section 7 produced at least one
runnable block (a prompt carrying a resolvable `**Skill:** \`name\`` line). If
Section 7 is all-manual or empty, do not dangle an offer you cannot fulfill: say
there is nothing runnable to hand off, or say nothing.

**The closing offer.** When at least one runnable block exists, append one short
closing line after Section 8 (not a new numbered section): note that you can run
the plan's runnable Section 7 prompts through `utility-pm-workflow-orchestrator`
in CHECKPOINTED mode (one go/no-go per step), and ask whether to proceed.

**On one confirmation.** On a single explicit yes, hand the plan you just
produced to `utility-pm-workflow-orchestrator` in CHECKPOINTED mode. Do not
re-prompt, re-classify, or add your own gate: the handoff is the boundary, and
every pause after it belongs to the orchestrator's per-step checkpoints. The
orchestrator parses Section 7 in document order and pauses for go/no-go after
each step.

**`--run`.** Produce the plan AND hand it off in one invocation, still
CHECKPOINTED by default. If the produced Section 7 has zero runnable blocks,
`--run` degrades to the no-op offer state: report that there is nothing to run
rather than starting an empty run.

**`--force-auto`.** Forward this flag to `utility-pm-workflow-orchestrator`
unchanged. You never interpret or relax it. It suppresses per-step pauses for
unambiguously-produced steps only, and it never bypasses the orchestrator's
stop-on-failed/empty guardrail or its Cynefin floor (Complex and Chaotic plans
stay checkpointed unless the orchestrator's own override conditions are met).
The domain comes from the plan's own Section 2.

**You never run work-skills inline.** The offer and flags only route to the
separate, governed orchestrator. Recommending downstream skills in Section 7 and
handing the plan to the orchestrator are the only ways this skill causes
execution, and the second one always passes through one explicit confirmation
(or the `--run` flag) into a skill that checkpoints every step.

**Self-reference safety.** The handoff pointer always targets
`utility-pm-workflow-orchestrator` and never names this skill or itself as a
runnable step. Section 7's Tier-3 and name-safety rules already forbid
recommending this skill itself, and the orchestrator refuses any Section 7 that
names this skill or the orchestrator, so neither side can loop.
```

### 3.3 Body edit B - Identity bullet refinement

The `## Identity` section currently reads: "Recommends a bounded, tiered set of downstream pm-skills (see "Recommendable skill tiers"); never invokes them inline". Refine this one bullet to record the narrowed boundary without contradicting "never invokes them inline":

```markdown
- Recommends a bounded, tiered set of downstream pm-skills (see "Recommendable
  skill tiers") and never invokes them inline; on explicit confirmation it can
  hand the plan to `utility-pm-workflow-orchestrator`, which runs them behind its
  own per-step checkpoints (see "Handoff to the orchestrator")
```

This is the single line that records the D9 reframing in the body: the skill still never runs work-skills inline, and it now additionally has a governed handoff.

### 3.4 Body edit C - Behavioral guardrail 7 refinement

Guardrail 7 currently reads: "**One skill, one document.** Recommend downstream skills; never invoke them inline. The plan is the artifact." Refine to make the handoff exception explicit so the guardrail and the new section do not appear to contradict:

```markdown
7. **One skill, one document.** Recommend downstream skills; never invoke them
   inline. The plan is the artifact. The only execution path is an explicit
   one-confirmation handoff (or `--run`) to `utility-pm-workflow-orchestrator`,
   which runs the steps behind its own checkpoints; you never execute a
   work-skill yourself.
```

No other body section changes. The `Common pitfalls`, `Examples`, `Inputs`, `Refusal and honesty protocols`, the nine-section `Output structure`, the `Recommendable skill tiers`, and the `Quality Checklist` are untouched.

---

## 4. The deliberate D9-reopening decision record

This is the load-bearing rationale of the component and must be recorded in the open, in TWO places, so the change to a locked decision is ratified and traceable, not silently overwritten (design section 11.2).

### 4.1 What D9 said

D9 is a locked v2.23.0 decision, recorded in `docs/internal/release-plans/v2.23.0/plan_v2.23.0.md` as:

> `D9 | Cross-skill invocation | deferred (out of scope)`

It established the plan skill as recommend-only. The shipped SKILL.md encodes it: the skill "Recommends a bounded, tiered set of downstream pm-skills ... never invokes them inline" (Identity bullet and guardrail 7).

### 4.2 Why reopening is clean now (and was not at v2.23.0)

The reframing is narrow and principled, NOT a reversal. The distinction the design draws (section 11.2):

- The plan skill STILL never runs work-skills inline. It does not execute `deliver-prd`, `discover-competitive-analysis`, or any Section 7 target itself.
- What changes: it OFFERS to delegate, and on explicit confirmation HANDS the plan to a dedicated, governed orchestrator. Execution happens entirely inside `utility-pm-workflow-orchestrator`, behind that skill's per-step checkpoints, refusals, and Cynefin floor.
- The recommend/execute boundary therefore moves from "the plan skill never causes execution" to "the plan skill never executes inline, and only ever causes execution through one explicit confirmation into the governed orchestrator." This is the original safety intent of D9 (no surprise, no unsupervised fan-out from the producer) honored by a different mechanism, not abandoned.

The reason it is clean at v2.24.0 but was correctly deferred at v2.23.0: at v2.23.0 there was no governed consumer to hand off to. The only way to satisfy "run the plan" would have been inline fan-out from the producer - exactly the unsupervised execution D9 was deferred to avoid. v2.24.0 introduces `utility-pm-workflow-orchestrator` with its own per-step checkpoints, stop-on-failed/empty guardrail, Cynefin floor, pre-flight refusals, and depth-2 governance (design sections 5, 7, 8). The handoff therefore delegates to a component that owns all the safety D9 wanted to protect, so the producer can offer to run its output without ever doing unsupervised execution itself. The safety property is preserved by composition, not by prohibition.

### 4.3 Where it is recorded

The reopening is recorded as a deliberate decision note in BOTH:

1. The v2.24.0 plan (`docs/internal/release-plans/v2.24.0/plan_v2.24.0.md`) - as a D-row or decision note stating D9 is deliberately reopened with the narrowed framing above. (Authored with the plan, not by this spec; this spec supplies the exact framing.)
2. The new `skills/foundation-prioritized-action-plan/HISTORY.md` 1.1.0 entry (section 6 below), so the per-skill changelog carries the same note.

The orchestrator-side narrowing (the engine's "and/or sub-agents" clause narrowed to Skill-tool-only via leaf-inlining, design section 7.1) is a SEPARATE decision note that belongs to the engine spec, not this one. This spec records only the D9-reopening that belongs to the plan skill.

---

## 5. Cross-client behavior of the handoff

The handoff is mechanism-agnostic on the plan-skill side. The plan skill hands off to the dispatch skill `utility-pm-workflow-orchestrator`, which resolves the runtime exactly as `utility-pm-release-conductor` does (design section 6; sibling dispatch-skill spec):

- **Claude Code (native).** The handoff invokes `@agent-pm-skills:pm-workflow-orchestrator` (via the dispatch skill). The engine sub-agent runs in its own context and delegates each step via the `Skill` tool; per-step blocks surface to the main chat. This native sub-agent-to-skill path ships EXPERIMENTAL until the live smoke test in design residual question 1 confirms it (design section 6.1). The plan skill does not assert PRODUCTION for the handoff target; it points at the dispatch skill, which carries the correct status label.
- **Non-Claude clients (reference + execute inline).** The dispatch skill reads `agents/pm-workflow-orchestrator.md` and walks the loop inline, reading each downstream skill's SKILL.md and executing its method in the same window. The orchestrator ships EXPERIMENTAL on ALL non-Claude clients including Codex (design section 6.2), and its inline branch runs a tool-capability pre-flight before step 1. The plan skill's handoff inherits that status: the offer line should not over-promise. On a non-Claude client, the handoff lands the user in the orchestrator's EXPERIMENTAL inline path with its `--dry-run` readiness guidance (design section 6.2).
- **The flags are portable surface.** `--run` and `--force-auto` are interpreted by the plan skill (`--run`) and the orchestrator (`--force-auto`), not by any client-specific machinery, so they behave identically across clients. What differs by client is only the orchestrator's execution mechanism (native vs inline), which is orthogonal to the run mode (design section 6 opening: "Run mode ... is orthogonal to mechanism").
- **Honesty rule.** The closing offer must not claim the orchestrator is production-ready on the current client. It should state CHECKPOINTED-by-default and let the orchestrator surface its own EXPERIMENTAL status and `--dry-run` guidance once entered. The plan skill does not duplicate the compatibility matrix; the authoritative per-client status lives in `docs/reference/sub-agent-compatibility.md` (the 5th row added per the engine/dispatch specs).

---

## 6. New `skills/foundation-prioritized-action-plan/HISTORY.md` (first history file)

This is the skill's FIRST HISTORY.md. Per `docs/internal/skill-versioning.md`, HISTORY.md is created when a skill ships its second version (1.0.0 to 1.1.0), with entries for all versions, newest first. Full draft (em-dash-free, repo style; replace `<ship-date>` with the v2.24.0 ship date):

```markdown
# foundation-prioritized-action-plan - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | <ship-date> | v2.24.0 | plan-orchestrator | changed | Added optional one-confirmation handoff to utility-pm-workflow-orchestrator (--run, forwarded --force-auto) |
| 1.0.0 | 2026-05-31 | v2.23.0 | prioritized-action-plan | added | Initial release |

## 1.1.0 (<ship-date>)

Released in [v2.24.0](../../docs/releases/Release_v2.24.0.md).

Added an optional HANDOFF mode. After producing a plan, the skill can offer to
run the plan's runnable Section 7 prompts through `utility-pm-workflow-orchestrator`,
the governed plan orchestrator that shipped in the same release. On one explicit
confirmation (or the new `--run` flag) it hands the plan to the orchestrator in
CHECKPOINTED mode. A forwarded `--force-auto` flag is passed through unchanged
and never relaxes the orchestrator's stop-on-failed/empty guardrail or Cynefin
floor. This is additive: a user who ignores the offer and passes no flag gets the
exact v1.0.0 experience. The skill still does no inline execution of work-skills.

### Changes
- New "Handoff to the orchestrator (optional)" section in SKILL.md.
- New `--run` flag: produce-and-hand-off in one invocation, CHECKPOINTED by default.
- Forwarded `--force-auto` flag: passed through to the orchestrator, never relaxing its guardrails.
- Closing offer fires only when Section 7 has at least one runnable block; no offer when nothing is runnable.
- Identity bullet and guardrail 7 refined to record the handoff exception.

### Decision note: D9 deliberately reopened
v2.23.0 locked D9 ("Cross-skill invocation: deferred / out of scope"), making the
skill recommend-only. v2.24.0 deliberately and cleanly reopens D9 with a narrowed
reframing, not a reversal. The skill STILL never runs work-skills inline. What
changed: it offers to delegate, and on explicit confirmation hands the plan to a
dedicated, governed orchestrator that owns the per-step checkpoints, refusals, and
Cynefin floor. The recommend/execute boundary moves from "the plan skill never
causes execution" to "the plan skill never executes inline, and only ever causes
execution through one explicit confirmation into the governed orchestrator." The
original D9 safety intent (no surprise, no unsupervised fan-out from the producer)
is honored by composition with a governed consumer, not abandoned. Reopening was
correctly deferred at v2.23.0 because no governed consumer existed yet; it is clean
at v2.24.0 because `utility-pm-workflow-orchestrator` now exists. Recorded also in
`docs/internal/release-plans/v2.24.0/plan_v2.24.0.md`.

## 1.0.0 (2026-05-31)

Released in [v2.23.0](../../docs/releases/Release_v2.23.0.md).

Initial release. An evidence-grounded prioritized action plan skill built on
Theory of Constraints (binding-constraint prioritization) and Cynefin (confidence
calibration). Produces one saveable nine-section document from any PM input, builds
a source ledger of exact quotes before analysis, and refuses High-confidence plans
for Complex or Chaotic situations.

### Contract established
- Invocation: `/pm-skills:foundation-prioritized-action-plan` or `$foundation-prioritized-action-plan` (no command wrapper, per v2.22.0 wrapper deletion).
- Output: nine numbered sections (0 executive summary through 8 evidence and source map), opened by the Step 0 source ledger.
- Evidence is structural: every load-bearing claim cites a source-ledger entry; the binding constraint and P1 may not be Inferred.
- Section 7 recommends only from the Tier 1 / Tier 2 recommendable set and never names an unconfirmed skill; recommend-only, no inline invocation (D9 deferred).
- Per-tier hard word backstop (1,500 / 2,200 / 3,000).
```

HISTORY.md rules honored: newest version first in the summary table; each version section brief; "Contract established" for 1.0.0 and "Changes" for 1.1.0; links to public release notes (`docs/releases/Release_v2.23.0.md` and `Release_v2.24.0.md`), not internal docs. The `effort` column uses the canonical v2.24.0 effort id `plan-orchestrator` (pinned in `plan_v2.24.0.md` Scope table and the `skills-manifest.yaml` `effort` field), so a reader cross-referencing HISTORY's `Effort: plan-orchestrator` lands on a real plan effort. v2.24.0 work is tracked as plan rows, not F-XX docs (per the no-effort-doc-bloat rule).

Note: `docs/releases/Release_v2.24.0.md` is created in the v2.24.0 hygiene surface (design section 9.2). The HISTORY.md 1.1.0 link resolves once that file exists; both files ship in the same release.

---

## 7. Mechanical acceptance criteria

Each is an objective check, not a reader impression.

1. **Frontmatter version + date bumped.** `metadata.version` is `"1.1.0"` (quoted) and `metadata.updated` is the v2.24.0 ship date. No other frontmatter field changed from the shipped v1.0.0 file. Diff check against `git show v2.23.0:skills/foundation-prioritized-action-plan/SKILL.md` frontmatter.
2. **Validator passes.** `utility-pm-skill-validate --strict` passes on the modified SKILL.md (also required by design section 9.2, which runs the validator against the modified plan skill). `scripts/lint-skills-frontmatter.{sh,ps1}` confirms the description still falls in the 20 to 100 word window (it is unedited, so this is a regression guard).
3. **Output contract unchanged.** The skill still emits exactly the nine section headers (0 to 8) in order; the handoff offer is prose appended after Section 8, NOT a tenth numbered section. Header-count check matches the v2.23.0 nine-section output contract (Sections 0 to 8), verified at `docs/internal/release-plans/v2.23.0/spec_prioritized-action-plan.md` acceptance criterion #2 "Section presence" (line 361).
4. **Handoff section present.** SKILL.md contains a `## Handoff to the orchestrator (optional)` section, placed after `## Output destination` and before `## Quality Checklist`. Header-presence + ordering check.
5. **Flags documented.** The handoff section documents `--run` (produce-and-hand-off, CHECKPOINTED default) and `--force-auto` (forwarded to the orchestrator, never relaxing its guardrails). Substring check for both flag tokens and the "never relax" semantics.
6. **CHECKPOINTED default asserted.** The handoff section states the default hand-off mode is CHECKPOINTED. Substring check.
7. **No inline execution claim preserved.** Guardrail 7 still contains "never invoke them inline" (or equivalent) AND now names the one-confirmation handoff exception; the Identity bullet still says the skill does not invoke downstream skills inline. The two edits do not delete the inline-prohibition language; they qualify it. Substring check for both the prohibition and the handoff exception.
8. **Offer-gating rule present.** The handoff section states the offer fires only when Section 7 has at least one runnable block, and that an all-manual/empty Section 7 produces no run. Substring check.
9. **Self-reference safety stated.** The handoff section states the pointer targets `utility-pm-workflow-orchestrator` only and never the plan skill itself, and notes the orchestrator refuses a self-referencing Section 7. Substring check.
10. **HISTORY.md created and well-formed.** `skills/foundation-prioritized-action-plan/HISTORY.md` exists, has a summary table newest-first with both 1.1.0 and 1.0.0 rows, a "Contract established" subsection under 1.0.0, a "Changes" subsection under 1.1.0, and a "Decision note: D9 deliberately reopened" subsection under 1.1.0. Links resolve to `docs/releases/Release_v2.23.0.md` and `docs/releases/Release_v2.24.0.md`. Structural + link check.
11. **D9 note in both places.** The D9-reopening note appears in BOTH `skills/foundation-prioritized-action-plan/HISTORY.md` (1.1.0 entry) AND `docs/internal/release-plans/v2.24.0/plan_v2.24.0.md`. Cross-file presence check.
12. **No em-dash / en-dash.** No U+2014 or U+2013 anywhere in the edited SKILL.md or the new HISTORY.md (repo hard rule). Codepoint scan.
13. **Cross-client honesty.** The handoff offer does not assert the orchestrator is production-ready on the current client; it states CHECKPOINTED-by-default and defers status to the orchestrator. Manual review against the EXPERIMENTAL status the engine/dispatch specs ship (design section 6).
14. **Skills manifest row.** `docs/internal/release-plans/v2.24.0/skills-manifest.yaml` (if authored, optional per versioning doc) lists `foundation-prioritized-action-plan` with `version: 1.1.0`, `previous_version: 1.0.0`, `change_type: changed`.

---

## 8. Dependencies

- **Hard dependency on the orchestrator existing.** `utility-pm-workflow-orchestrator` (dispatch skill) and `agents/pm-workflow-orchestrator.md` (engine) MUST be authored and present in the same v2.24.0 ship before the handoff can resolve. The handoff names that skill as its target; it is dead-on-arrival without it. The two sibling specs (engine, dispatch skill) are the producing efforts; this component consumes them. Build order: engine + dispatch skill before (or with) the plan-skill edit; the AC #2 validator pass on the modified plan skill does not require the orchestrator to run, but a real handoff smoke test does.
- **Shared parse contract.** The orchestrator parses the plan's Section 7 using the contract in `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` (design section 2.1). This component does NOT change Section 7's shape, so it imposes no new constraint on that contract; it only relies on the existing Section 7 format the orchestrator already parses (the `#### To execute ` prefix, the `**Skill:** \`name\`` line, the `**Prompt:**` blockquote - design section 3.1). If Section 7's format ever changes, the orchestrator's parse contract is the coupling point, not the handoff.
- **No new chain-permission surface.** This component adds nothing to `agents/_chain-permitted.yaml`; the orchestrator's depth-2 governance (design section 7.1) is unchanged by a producer that merely points at the dispatch skill. The plan skill spawns no sub-agent; it invokes the dispatch skill, which is the chain root.
- **Release-notes dependency.** `docs/releases/Release_v2.24.0.md` must exist for the HISTORY.md 1.1.0 link to resolve; it is created in the v2.24.0 hygiene surface in the same release.
- **No MCP / code dependency.** Pure markdown edits to a skill plus one new markdown file. No `pm-skills-mcp` change.

---

## 9. This component's slice of the v2.24.0 hygiene surface

From design section 9.2 and 11.5, the plan-handoff component owns exactly this slice of the release hygiene surface (the engine and dispatch-skill specs own the rest):

| Item | Action | Enforced by |
|---|---|---|
| `skills/foundation-prioritized-action-plan/SKILL.md` | Edit: bump `metadata.version` `"1.0.0"` to `"1.1.0"`, bump `metadata.updated`; add the "Handoff to the orchestrator (optional)" section; refine Identity bullet and guardrail 7 | `utility-pm-skill-validate --strict`; `lint-skills-frontmatter` |
| `skills/foundation-prioritized-action-plan/HISTORY.md` | NEW file (the skill's first), 1.0.0 + 1.1.0 entries, D9-reopening note | manual structural check (AC #10); no dedicated CI gate |
| Per-skill version bump | `1.0.0` to `1.1.0`, independent of the catalog `2.23.0` to `2.24.0` bump | versioning doc; manifest |
| `docs/internal/release-plans/v2.24.0/skills-manifest.yaml` | Add a `changed` row for this skill at 1.1.0 (optional file per versioning doc, but recommended since a skill changed) | manual |
| Root `CHANGELOG.md` `## [2.24.0]` | Contribute the THIRD of three change lines: the plan skill's HANDOFF mode (the other two lines are the new sub-agent and the new dispatch skill, owned by the sibling specs) | manual; `docs/changelog.md` mirror |
| `docs/internal/release-plans/v2.24.0/plan_v2.24.0.md` | Record the D9-reopening decision note (this spec supplies the exact framing) | manual (AC #11) |

NOT in this component's slice (owned by the engine/dispatch-skill specs, listed here only to draw the boundary): the catalog count sweep (64 to 65, utility 10 to 11, sub-agents 4 to 5), the catalog version bump (2.23.0 to 2.24.0), AGENTS.md edits, the library sub-agent-sample, generated-page regeneration, the roadmap reconciliation (`active-orchestration.md` + critic line 63), `sub-agent-compatibility.md`, and `_chain-permitted.yaml` (no edit). The plan skill is a UTILITY-adjacent FOUNDATION skill but its version bump is per-skill and does NOT move the foundation count (foundation stays 9; design section 9.2 corrected baseline). This component changes NO catalog count: it edits an existing skill, it does not add one.

Pre-tag gate touching this component: `utility-pm-skill-validate --strict` runs against the modified plan skill (alongside the new orchestrator skill), per design sections 9.2 and 11.5.

---

## 10. Out of scope for this component (YAGNI)

Tracking the design's section 10 cuts as they bear on the handoff:

- **No inline execution by the plan skill.** Reaffirmed. The handoff routes to the orchestrator; the plan skill never executes a work-skill. (Guardrail 7, AC #7.)
- **No proactive handoff.** The offer never auto-runs; `--run` is user-supplied opt-in (design section 10: "the handoff offers, it never auto-runs").
- **No new run modes in the plan skill.** The plan skill knows only CHECKPOINTED (default) and forwarding `--force-auto`. It does not implement GUARDED AUTO, dry-run, or Mode B; those belong to the orchestrator.
- **No threading logic.** Mode A Section 7 prompts are ordered-independent and self-contained (design section 4.4). The handoff hands off the document as-is; it does not extract or thread artifacts. The plan skill imposes no handoff schema.
- **No description rewrite.** The description is unchanged (3.1); the handoff is a body-documented optional mode, not a discovery-surface change.
- **No Section 7 format change.** The orchestrator parses the existing format; this component does not alter Section 7's shape, headings, or fields.
