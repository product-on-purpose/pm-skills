# foundation-prioritized-action-plan - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-06-01 | v2.24.0 | plan-orchestrator | changed | Added optional one-confirmation handoff to utility-pm-workflow-orchestrator (--run, forwarded --force-auto) |
| 1.0.0 | 2026-05-31 | v2.23.0 | prioritized-action-plan | added | Initial release |

## 1.1.0 (2026-06-01)

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
