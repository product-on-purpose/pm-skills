# v2.24.0 Release Plan: plan orchestrator (engine + dispatch skill + plan handoff)

**Status:** PLANNED (build-ready). Not started; specs approved, design locked.
**Owner:** Maintainers
**Type:** **MINOR** (additive: one new sub-agent, one new dispatch skill, one additive-minor edit to an existing skill; no behavior removed from any existing skill).
**Theme:** Ship the plan orchestrator promised on the public roadmap (`pm-workflow-orchestrator`, originally pencilled for v2.17): a governed runner that takes a single input - a saved `foundation-prioritized-action-plan` (Mode A) or a user-named chain (Mode B) - and runs an ordered sequence of pm-skills against it, pausing for human go/no-go by default and refusing to advance past a failed or empty step. One design yields THREE components, each with its own spec.
**Created:** 2026-06-01
**Updated:** 2026-06-01

---

## Where we are

The v2.17 public roadmap promised a sub-agent named `pm-workflow-orchestrator` that "coordinates multi-skill workflows with quality gates" (`docs/concepts/active-orchestration.md` lines 56, 69; `skills/utility-pm-critic/SKILL.md` line 63). v2.23.0 shipped `foundation-prioritized-action-plan`, which produces a runnable Section 7 of copy/paste prompts but, by its locked decision D9, never runs them (recommend-only). v2.24.0 closes that loop: it ships the promised orchestrator as the established two-component dispatch pattern (engine sub-agent + cross-client control-panel skill, mirroring the conductor and critic), plus a producer-side handoff so the plan skill can offer to run its own output through the governed orchestrator.

The orchestrator borrows the conductor's SHAPE (numbered sequence, fixed per-step output block, confirmation pause, refusal-to-advance, minimal carried state, two terminal outputs) but NOT its MECHANISM: the conductor delegates to sub-agents via the `Agent` tool and sits on the chain-permission allowlist; this orchestrator delegates to skills via the `Skill` tool and adds no allowlist entry. The execution model is DELEGATE: each step invokes a real downstream pm-skill, never a re-implementation.

**Companion docs (this release directory):**

- Design (one design, three specs): [`design_plan-orchestrator.md`](design_plan-orchestrator.md)
- Spec W1 - engine sub-agent: [`spec_pm-workflow-orchestrator-engine.md`](spec_pm-workflow-orchestrator-engine.md)
- Spec W2 - dispatch skill: [`spec_utility-pm-workflow-orchestrator-skill.md`](spec_utility-pm-workflow-orchestrator-skill.md)
- Spec W3 - plan handoff: [`spec_prioritized-action-plan-handoff.md`](spec_prioritized-action-plan-handoff.md)
- Predecessor plan: [`../v2.23.0/plan_v2.23.0.md`](../v2.23.0/plan_v2.23.0.md)

---

## Entrance criteria (HARD gate)

1. **v2.23.0 is SHIPPED and tagged.** SATISFIED: v2.23.0 shipped 2026-05-31 (tag `v2.23.0` at `b54cef0`). The orchestrator's Mode A consumes `foundation-prioritized-action-plan` output and the W3 handoff edits that skill, so the producer must exist on main first. It does.
2. **All three specs approved.** SATISFIED: engine, dispatch-skill, and plan-handoff specs are present and build-ready in this directory.
3. **The three bundled plan examples are present in their verified hazard shapes** (they are the parse fixtures): `skills/foundation-prioritized-action-plan/examples/02-interview-transcript.md` (compound `P1 and P2` heading), `examples/03-executive-ask.md` (two `P1` sibling prompts, Complex domain), `references/EXAMPLE.md` (Complicated, Medium-High, `P1` then `P3` with no `P2`). SATISFIED: all present on main.

---

## Scope - the three work items

**Effort id (canonical): `plan-orchestrator`.** All three work items below belong to one effort whose identifier is `plan-orchestrator` (the design title). This is the string used in the `foundation-prioritized-action-plan` HISTORY.md "Effort" column and in `skills-manifest.yaml`, so a reader cross-referencing HISTORY's `Effort: plan-orchestrator` against this plan lands on this Scope table.

| ID | Item | Type | Classification | Spec |
|---|---|---|---|---|
| W1 | `agents/pm-workflow-orchestrator.md` (engine sub-agent) | NEW SUB-AGENT | n/a (agent) | [`spec_pm-workflow-orchestrator-engine.md`](spec_pm-workflow-orchestrator-engine.md) |
| W2 | `skills/utility-pm-workflow-orchestrator/` (dispatch skill + references + library sample) | NEW SKILL | utility | [`spec_utility-pm-workflow-orchestrator-skill.md`](spec_utility-pm-workflow-orchestrator-skill.md) |
| W3 | `skills/foundation-prioritized-action-plan/` v1.0.0 -> v1.1.0 (HANDOFF mode) | SKILL EDIT (additive minor) | foundation (unchanged) | [`spec_prioritized-action-plan-handoff.md`](spec_prioritized-action-plan-handoff.md) |

Build order: W1 and W2 are co-authored (the dispatch skill's inline branch reads the engine body verbatim and both read the shared `references/PARSE-CONTRACT.md`); W3 depends on both existing (its handoff target is dead-on-arrival without them). W3's validator pass does not require the orchestrator to run, but a real handoff smoke test does.

### W1 - engine sub-agent (`agents/pm-workflow-orchestrator.md`)

The Claude Code-only execution system prompt that walks the step list. First repo agent to declare the `Skill` tool. Locked decisions:

- **Name LOCKED:** `pm-workflow-orchestrator`, honoring the published v2.17 roadmap promise rather than shipping a second name. The dispatch skill is `utility-pm-workflow-orchestrator`. No residual naming question.
- **Frontmatter (verbatim, build-ready):** `name: pm-workflow-orchestrator`; folded `description: >-` carrying NO "use proactively" phrasing and DOES contain "Explicit invocation only; never fires proactively"; `tools: Skill, Read, Grep, Glob, Bash, Edit` and explicitly NOT `Agent`; `model: inherit`; `memory: none`.
- **`Skill`** lets the engine invoke downstream skills (first repo agent to do so). **`Bash`/`Edit`** because delegated steps write artifacts and the engine writes run files under `_pm-skills/`. **`Agent` deliberately ABSENT:** the engine spawns zero sub-agents, needs no `_chain-permitted.yaml` entry, adds zero chain depth.
- **Copy-paste hazard flagged:** the frontmatter model is the CONDUCTOR ("explicit invocation only"), NOT pm-critic (whose `agents/pm-critic.md` line 4 says "Use proactively"). A reviewer must not lift critic's frontmatter onto a multi-step delegating chain.
- **Parse contract (Mode A):** anchor on the prefix `#### To execute ` (not `#### To execute P<n>:`); parse the P-token as a SET (regex `P\d+(?:\s+and\s+P\d+)*`); treat Section 7 as an ORDERED LIST of prompt blocks, never a P-keyed map; sibling blocks (shared or compound P-level) are NOT threaded; classify each block RUNNABLE / MANUAL / PARSE ERROR; top-3 cap counts RUNNABLE blocks only (upper bound, not a target). Cynefin domain: match `**Domain:**`, first-whole-word enum token (Clear / Complicated / Complex / Chaotic), Section 0 fallback, ambiguous -> CHECKPOINTED. Overall plan confidence parsed tolerantly (hyphenated compounds), surfaced not gating.
- **Step-status rubric (the engine is the status AUTHORITY):** content skills emit no `## Status` block, so the engine self-classifies each return PRODUCED / EMPTY / FAILED. EMPTY is never read as PASS. No downstream status-envelope retrofit.
- **Run modes:** CHECKPOINTED (default) and GUARDED AUTO (entered by the `--auto` flag, opt-in; the engine owns the run-mode behavior and the dispatch skill forwards `--auto` verbatim in `$ARGUMENTS`). A FAILED step is a hard stop; an EMPTY step surfaces for confirmation (a forced checkpoint pause); both are unconditional and outrank `--force-auto` in all domains. `--force-auto` flips Complex/Chaotic (and Mode-B-no-domain) plans to auto for unambiguously-PRODUCED steps only; it is NOT a step-skip and never bypasses stop-on-failed/empty (deliberately narrower than the conductor's removed `--skip-gates`, D24).
- **Leaf-inlining rule (load-bearing governance):** Category 1 content skills are invoked via `Skill`; Category 2 dispatch-fan-out skills (only `utility-pm-critic`) are NOT invoked as a native skill - the engine INLINES the leaf agent (`agents/pm-critic.md`) in its own context; Category 3 workflow/composite skills are surfaced as MANUAL, never nested. Named YAGNI rule written verbatim into the body: "the orchestrator never delegates to a dispatch skill that spawns a sub-agent, nor nests a workflow; depth-2 is preserved because the engine spawns zero sub-agents, directly or transitively-through-a-skill."
- **State passing:** Mode A prompts are ordered-independent and self-contained, NO automatic threading; Mode B threading only when the user declares a dependency. Disk-write auto-enables for 2+ step runs to the gitignored `_pm-skills/plan-orchestrator/<run>/`; single-step runs stay chat-only. User edit at a checkpoint replaces both in-context and on-disk copies atomically.
- **Resume:** restart-only (the honest YAGNI cut); persisted artifacts are for manual reference; the halt output does not advertise auto-resume.

### W2 - dispatch skill (`skills/utility-pm-workflow-orchestrator/`)

The cross-client control panel, classification `utility`, the FIFTH dispatch skill of the `utility-pm-{role}` family (critic, auditor, curator, conductor, orchestrator), structurally mirroring `utility-pm-release-conductor`. Locked decisions:

- **Three body pieces:** a prose runtime-detection line (no programmatic probe); a Claude Code native-dispatch H3 branch (`@agent-pm-skills:pm-workflow-orchestrator` + `$ARGUMENTS` flags, relay engine output); a non-Claude inline-execution H3 branch (read the engine body + `references/PARSE-CONTRACT.md`, run the tool-capability pre-flight, walk the loop inline).
- **Frontmatter:** `name: utility-pm-workflow-orchestrator`; single-line `description` (~90 words, carries only dual-dispatch + 5-client framing + non-proactive note + EXPERIMENTAL/`--dry-run`); `license: Apache-2.0`; `metadata` with `classification: utility`, quoted `version: "1.0.0"`, `updated`, `category: workflow` (fall back to `release` if the validator constrains the enum), `frameworks: [triple-diamond]`, `author: product-on-purpose`; `phase` omitted; PM-Skills HTML comment after the frontmatter. Run `scripts/lint-skills-frontmatter.{sh,ps1}` and confirm the description lands in the 20-100 word window before tagging.
- **Reference files:** `references/TEMPLATE.md` (>= 3 `##` headers: run header, per-step block, two terminal outputs, dry-run output), `references/EXAMPLE.md` (the worked single-thread CHECKPOINTED Storevine run, same narrative as the library sample), and `references/PARSE-CONTRACT.md` (the shared parse + step-status contract that BOTH the engine and this skill's inline branch read at runtime, so the rules live in exactly one place - D12 referential discipline).
- **Tool-capability pre-flight (inline branch's FIRST action):** verify the client can write under `_pm-skills/plan-orchestrator/<run>/` and run any Bash a step needs; if write is unavailable, degrade explicitly to CHAT-ONLY or refuse a long run; never fail mid-chain.
- **`--dry-run`** walks the step list (parse, checkpoint, stop-on-fail, tool-capability pre-flight) without invoking consequential skills, emitting "NOT EXECUTED - dry run." Instructed to run FIRST on any EXPERIMENTAL client (all of them at ship).
- **Library sample placement LOCKED:** `library/sub-agent-samples/pm-workflow-orchestrator/sample_pm-workflow-orchestrator_storevine_checkpointed-run.md`, alongside the four sibling dispatch-skill samples (critic / auditor / curator / conductor), because the orchestrator is the FIFTH of that exact family. One single-thread sample, not the three-thread set; the `utility` classification is exempt from `check-skill-sample-coverage` via `in_scope_class()` (returns false for `utility`), so NO script edit is needed.

### W3 - plan handoff (`skills/foundation-prioritized-action-plan/` v1.0.0 -> v1.1.0)

An additive-minor edit to the shipped plan skill so it can offer to run its own output. Locked decisions:

- **The offer:** after Section 8, append ONE short closing line (not a tenth numbered section) that it can run the plan's runnable Section 7 prompts through `utility-pm-workflow-orchestrator` in CHECKPOINTED mode. The offer fires ONLY when Section 7 produced at least one RUNNABLE block; all-manual/empty Section 7 dangles no offer (mirroring the orchestrator's zero-runnable refusal).
- **One-confirmation handoff:** a single yes hands the just-produced plan to the orchestrator in CHECKPOINTED mode (the safe posture); the plan skill does not re-prompt or add its own gate. The handoff is the boundary; every subsequent pause is the orchestrator's.
- **`--run`:** produce-and-hand-off in one invocation, still CHECKPOINTED by default; degrades to the no-op offer state if Section 7 has zero runnable blocks.
- **`--force-auto`:** FORWARDED unchanged to the orchestrator, never interpreted or relaxed by the plan skill; it never bypasses stop-on-failed/empty or the Cynefin floor.
- **The plan skill STILL does no inline execution of work-skills** (guardrail 7 preserved and qualified). The Identity bullet and guardrail 7 are refined to record the handoff exception without deleting the inline-prohibition language.
- **Frontmatter:** `metadata.version` `"1.0.0"` -> `"1.1.0"`, `metadata.updated` -> ship date; description UNCHANGED (the handoff is an optional body-documented mode, not a discovery-surface change). Per-skill bump, independent of the catalog version.
- **New `HISTORY.md`** (the skill's FIRST), with 1.0.0 + 1.1.0 entries newest-first and the D9-reopening decision note.

---

## Complete hygiene and registration surface (every file v2.24.0 touches)

The catalog-wide counts and version surfaces are shared across all three components and re-derived ONCE at ship from the corrected baseline below (audit-aggregate-counters rule).

### Corrected count baseline (foundation does NOT move)

The orchestrator is a UTILITY skill, so foundation stays 9 UNCHANGED.

- Before (current main): `30 phase + 9 foundation + 10 utility + 15 tool` = **64** skills; **4** sub-agents; catalog version **2.23.0**.
- After v2.24.0: `30 phase + 9 foundation + 11 utility + 15 tool` = **65** skills; **5** sub-agents; catalog version **2.24.0**.

Deltas to sweep everywhere a total or breakdown appears: total skills **64 -> 65**; utility **10 -> 11**; foundation **9 (unchanged)**; sub-agents **4 -> 5**.

### New source files

- `agents/pm-workflow-orchestrator.md` (W1 engine). NEW.
- `skills/utility-pm-workflow-orchestrator/SKILL.md` (W2). NEW.
- `skills/utility-pm-workflow-orchestrator/references/TEMPLATE.md` (>= 3 `##` headers). NEW.
- `skills/utility-pm-workflow-orchestrator/references/EXAMPLE.md`. NEW.
- `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` (shared contract, read by both the engine and the inline branch). NEW.
- `library/sub-agent-samples/pm-workflow-orchestrator/sample_pm-workflow-orchestrator_storevine_checkpointed-run.md` (W2 library sample). NEW.
- `skills/foundation-prioritized-action-plan/HISTORY.md` (W3, the skill's first HISTORY.md). NEW.

### Producer-skill edits (W3)

- `skills/foundation-prioritized-action-plan/SKILL.md` - add the "Handoff to the orchestrator (optional)" section (after `## Output destination`, before `## Quality Checklist`); refine the Identity bullet and guardrail 7; bump `metadata.version` `"1.0.0"` -> `"1.1.0"` and `metadata.updated` to the ship date.

### Library sample registration (W2)

- `library/sub-agent-samples/README.md` - add the `pm-workflow-orchestrator` Catalog row and bump the family count **4 -> 5** in the header line. Sample frontmatter must satisfy the README "Sample Conventions" contract. `README_SAMPLES.md` sample tallies do NOT change (the sample is not in `skill-output-samples/`); only the catalog skill-count where it appears moves 64 -> 65.

### AGENTS.md (two edits, `validate-agents-md` partially enforced)

- Add the utility skill under `### Utility Skills` as `#### pm-workflow-orchestrator` with `**Path:** skills/utility-pm-workflow-orchestrator/SKILL.md`. This path line auto-satisfies the basename substring check.
- Add the engine under `## Sub-Agents`. NOTE: the Sub-Agents prose entry is NOT CI-protected (the substring check is satisfied by the skill path line above), so it must be added by HAND and verified in the pre-tag manual pass. Fix line 450 ("Four sub-agents ship in v2.16.0:") by adding the 5th agent while PRESERVING the historical v2.16.0 framing - do NOT blindly rewrite to "Five sub-agents ship in v2.16.0." (for example, keep the v2.16.0 line and add: "v2.24.0 adds a fifth sub-agent: `pm-workflow-orchestrator` ...").

### Governance file - NO edit, manual gate

- `agents/_chain-permitted.yaml` - UNCHANGED (stays at its single `pm-release-conductor` entry; the engine delegates by `Skill`, not `Agent`). Add a pre-tag MANUAL grep confirming `Agent` is absent from the engine's `tools:` line. This is manual because no `scripts/*chain*` enforcement exists.
- `_pm-skills/` stays gitignored; `validate-gitignore-pm-skills.{sh,ps1}` asserts it - no action beyond not un-ignoring it.

### Count sweep (64 -> 65; utility 10 -> 11; foundation 9 unchanged; sub-agents 4 -> 5)

**What the gates actually enforce vs. what is a MANUAL sweep.** Be precise about the gate boundary, because the per-classification breakdown is NOT gate-enforced and several breakdown surfaces are ALREADY stale at v2.23.0:

- `check-count-consistency` and `check-landing-page-counts --strict` validate the TOTAL skill count (65) and the badge only. Verified: `check-count-consistency.sh` (lines 144-158, 263-266) DELIBERATELY excludes subset descriptors (it matches `foundation|utility|tool|phase` before `skills` and sets `is_subset=1`, then skips), and `check-landing-page-counts.sh` only greps `N ... skills` against the total and excuses any other number as "historical context" when the correct total is present. Neither gate validates "9 foundation" / "11 utility" / "30 phase" / "15 tool".
- The sub-agent count (4 -> 5) is enforced by NO validator (`sub-agent` is not a checked resource in either count script). Every sub-agent-count surface is a MANUAL sweep (see the Sub-agent count sweep below).
- Therefore the per-classification breakdown AND the sub-agent count are a MANUAL pre-tag breakdown check. Do NOT list the breakdown as gate-enforced. v2.23.0 shipped with stale breakdowns green (README mermaid "8 skills", `docs/index.mdx` "Foundation (8)", `docs/skills/index.md` "Foundation | 8" are all live and stale NOW at foundation=9); the gates did not catch them.

**Gate-enforced TOTAL + badge (64 -> 65), enforced by `check-count-consistency` + `check-landing-page-counts --strict`:**

- `README.md` total-skills prose + the At-a-Glance total row.
- `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` + `.codex-plugin/plugin.json` (the "64 ... skills" total in each description).
- `docs/index.mdx` (lines 3 and 10 total "64" -> 65).
- `docs/reference/project-structure.md` (the total "63 total" on line 25 and the "64 PM Skills" header on line 41).
- `CLAUDE.md`.
- `QUICKSTART.md` (the "63 ... skills" total on lines 5 and 74).
- `docs/guides/creating-pm-skills.md` if it carries a total count.

**MANUAL breakdown sweep (NOT gate-enforced) - set foundation = 9, utility = 11, phase = 30, tool = 15.** Hand-grep every `N foundation` / `N utility` / `N phase` / `N tool` breakdown surface. Several are already wrong at foundation=8 (the orchestrator does NOT move foundation; it moves utility 10 -> 11). The known surfaces and their exact targets:

- `README.md` FIVE foundation surfaces, all currently stale at 8: line 88 TOC anchor `#foundation-skills---cross-cutting-capability-8` -> `...capability-9`; line 545 badge image `Foundation-8_skills` -> `Foundation-9_skills` and its alt text `Foundation Skills: 8` -> `Foundation Skills: 9`; line 588 mermaid subgraph aggregate `Cross-Cutting Capabilities (18 skills)` -> `(20 skills)` (9 foundation + 11 utility); line 590 mermaid node `Foundation<br/>8 skills` -> `9 skills`; line 591 mermaid node `Utility<br/>10 skills` -> `11 skills`; line 609 section header `### Foundation Skills - Cross-cutting capability (8)` -> `(9)` (keep the header text and the line 88 anchor in sync). None of these is caught by either validator.
- `docs/skills/index.md` - HAND-EDITED, NOT generated. Verified: `scripts/generate-skill-pages.py` writes per-classification pages via `OUTPUT_DIR / group / "index.md"` (line 549) but NEVER writes `OUTPUT_DIR / "index.md"` (the top-level file), and the top-level `docs/skills/index.md` carries NO `generated: true` marker (the real generated pages all do), so `check-generated-content-untouched` does not police it and regenerating produces nothing for it. It is ALREADY stale: hand-edit line 2 description headline and line 6 prose headline `64 PM skills` -> 65; line 16 `Foundation | 8` -> `Foundation | 9`; line 17 `Utility | 10` -> `Utility | 11` and add the orchestrator to the utility classification description.
- `docs/index.mdx` line 178 `**Foundation (8)**` -> `**Foundation (9)**` (add `foundation-prioritized-action-plan` to the foundation list); line 180 `**Utility (10)**` -> `**Utility (11)**` (add the orchestrator to the utility list). These parentheticals carry no adjacent `skills` token, so `check-landing-page-counts` does not match them; manual edit.
- `docs/reference/project-structure.md` line 25 is internally inconsistent NOW (`63 total: 30 phase + 9 foundation + 10 utility + 15 tool` sums to 64 but states 63) -> set to `65 total: 30 phase + 9 foundation + 11 utility + 15 tool`; line 121 sub-head `#### Utility Skills (10 utility)` -> `(11 utility)` and add the `utility-pm-workflow-orchestrator` row to the utility table. The `(10 utility)` sub-head is a subset descriptor excluded by `check-count-consistency`; manual edit.
- `QUICKSTART.md` line 5 `8 foundation skills, 10 utility skills` -> `9 foundation skills, 11 utility skills` and line 74 `30 phase + 8 foundation + 10 utility + 15 tool` -> `30 phase + 9 foundation + 11 utility + 15 tool`. Both are stale on two axes (total 63 and foundation 8); the total is gate-caught, the breakdown is manual. Re-grep that no `63` or `8 foundation` remains.
- Any other surface carrying a `foundation` / `utility` / `phase` / `tool` count.

### Version manifests (2.23.0 -> 2.24.0)

Enforced by `validate-version-consistency` (the `version` FIELD only; the description prose below is MANUAL):

- `.claude-plugin/plugin.json` (source of truth) - bump the `version` field; AND manually edit the embedded description prose: total `64` -> 65, breakdown `(30 phase + 9 foundation + 10 utility + 15 tool)` -> `(30 phase + 9 foundation + 11 utility + 15 tool)`, and the embedded `4 sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor)` -> `5 sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor, pm-workflow-orchestrator)`. Add the v2.24.0 lead sentence naming the new sub-agent + dispatch skill. `validate-version-consistency` checks ONLY the `version` field, NOT the prose count or the name list, so the breakdown and the sub-agent name list are MANUAL.
- `.claude-plugin/marketplace.json` (NOT repo-root; the file lives at `.claude-plugin/marketplace.json`) - bump the `version` field on line 12 (2.23.0 -> 2.24.0); AND manually edit the description prose on line 11 the same way: `64 PM skills` -> 65, utility `10` -> 11, `4 sub-agents (...)` -> `5 sub-agents (... pm-workflow-orchestrator)`, plus the v2.24.0 lead sentence. Manual for the prose.
- `.codex-plugin/plugin.json` (description + version, same treatment).
- `README.md` badge + At-a-Glance row.
- NOT `package.json` (docs-site, stays 0.1.0).
- The plan skill's own `metadata.version` 1.0.0 -> 1.1.0 is a per-skill bump, independent of the catalog version.

### CHANGELOG + release docs (three change lines)

- Root `CHANGELOG.md` `## [2.24.0]` - the entry lists THREE changes: the new sub-agent (W1), the new dispatch skill (W2), and the plan skill's HANDOFF mode (W3).
- `docs/changelog.md` mirror.
- `docs/releases/Release_v2.24.0.md` (NEW; the W3 HISTORY.md 1.1.0 link resolves once this exists, and both ship in the same release).
- `docs/releases/index.md` - new TOP row.
- `README.md` "What's New" `<details>` block (inside the count-exempt guard) + release-history table row.

**Exact count phrasing for the per-release one-line summary** (`docs/changelog.md` and `docs/releases/index.md` carry a one-line catalog-delta summary per release, matching the prior-release form "Catalog grows 63 to 64 (foundation 8 to 9)"). The v2.24.0 row must read: "catalog grows 64 to 65 (utility 10 to 11); fifth sub-agent `pm-workflow-orchestrator`; `foundation-prioritized-action-plan` to v1.1.0." Confirm `docs/releases/index.md` gets the new TOP row and `docs/changelog.md` gets the mirror block with the SAME counts (64 to 65, utility 10 to 11, foundation unchanged at 9).

### Roadmap reconciliation (three references)

The orchestrator IS the promised v2.17 component, so the forward-references flip to "shipped v2.24.0":

- `docs/concepts/active-orchestration.md` lines 56 and 69 ("v2.17" -> "shipped v2.24.0").
- `skills/utility-pm-critic/SKILL.md` line 63 (the `pm-workflow-orchestrator (v2.17)` forward-reference).
- `agents/pm-critic.md` line 137 (also carries a "future state when `pm-workflow-orchestrator` ships in v2.17" forward-reference - sweep the agent file too).

### Sub-agent catalog docs (hand-maintained, add 5th row)

- `docs/reference/runtime-components.md` - add the engine row to the table, update the present-tense "4 sub-agents ship" prose to 5, add invocation examples. Leave any v2.16.0-historical framing (for example line 37 "ship in this release" attached to the v2.16.0 slate) as historical.
- `docs/reference/sub-agent-compatibility.md` - this file needs MORE than one new row; it carries two tables and several count phrasings that go inconsistent if only the matrix row is added:
  - Add the 5th row to the Cross-Client status matrix (the matrix today carries 4 rows ending at `pm-release-conductor`, verified line 32), with the orchestrator EXPERIMENTAL on ALL non-Claude clients AND the native Claude Code cell EXPERIMENTAL until the smoke test closes.
  - Add a 5th row to the "Capability by Task" table (verified lines 63-66, four `Production/Production/Experimental` rows) for the orchestrator as `Experimental / Experimental / Experimental` (it is EXPERIMENTAL on every client at ship).
  - The `## Cross-Client Status (as of v2.16.0)` header (line 25) and the GATE-test prose attested at v2.16.0 - "3 of 4 sub-agents" (line 44), "The 4th sub-agent" (line 46), "All 4 sub-agents are EXPERIMENTAL" (line 52), "Run all 4 tests" (line 104) - are HISTORICAL v2.16.0-attested statements; leave them as-is so the file does not falsely claim a v2.16.0 test exercised 5 sub-agents. Update only present-tense totals. State this present-tense-vs-historical split explicitly so the file is left internally consistent (5-row matrix + 5 capability rows + v2.16.0-attested prose preserved).

### Sub-agent count sweep (4 -> 5) - NO CI gate, fully MANUAL

The sub-agent count is enforced by NO validator (`sub-agent` is not a checked resource in either count script), so every surface is a manual sweep. Update the present-tense live (non-internal) surfaces; leave v2.16.0-historical framings.

- Present-tense, update to 5: `docs/guides/using-sub-agents.md` line 43 "Pattern 2: Explicit slash command (all 4 sub-agents)" and line 58 "Pattern 3: @-mention (all 4 sub-agents)" section headers, line 69 "All four sub-agents are @-mentionable" plus the 4-name @-mention block (add the 5th `@agent-pm-skills:pm-workflow-orchestrator` example); `docs/getting-started/platforms.md` line 8 "All 4 sub-agents ship with dispatch skills" plus its 4-name list; `docs/concepts/sub-agents.md` line 56 "introduces four sub-agents" where present-tense (and the slate count); `README.md` line 858 "invocation examples for all four sub-agents"; `docs/reference/runtime-components.md` and `docs/reference/sub-agent-compatibility.md` present-tense totals (above); the `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` + `.codex-plugin/plugin.json` embedded "4 sub-agents (...)" name lists (Version manifests section above).
- Leave HISTORICAL (do NOT change): `docs/reference/runtime-components.md` line 37 "ship in this release" v2.16.0 framing; `docs/concepts/active-orchestration.md` line 39 and `docs/index.mdx` line 293 v2.16.0-framed release-row prose; the v2.16.0 CHANGELOG / `docs/changelog.md` release-row entries; `sub-agent-compatibility.md`'s v2.16.0-attested GATE prose.

### Generated pages (regenerate, do NOT hand-edit; `check-generated-content-untouched` diff-enforced)

- `scripts/generate-skill-pages.py` - creates `docs/skills/utility/utility-pm-workflow-orchestrator.md`, updates the skill indexes + `docs/reference/commands.md`.
- `generate-showcase.py` - NO change (the sample is not in `skill-output-samples/`; verified the showcase generator does not consume `sub-agent-samples`).
- `generate-workflow-pages.py` - NO change.

### New sub-agent doc note

- Add the sub-agent-to-skill composition path (this is the FIRST repo agent to invoke skills) to `docs/concepts/sub-agents.md` or `docs/contributing/sub-agent-design-patterns.md`.

### Internal release-plan artifacts (tracked, this directory)

- `plan_v2.24.0.md` (this file), the THREE specs (engine + dispatch skill + plan handoff), and optional `skills-manifest.yaml` (a `changed` row for `foundation-prioritized-action-plan` at 1.1.0 / `previous_version: 1.0.0` / `change_type: changed` / `effort: plan-orchestrator`; recommended since a skill changed). The `effort: plan-orchestrator` value matches the HISTORY.md "Effort" column and the Scope-table effort id above.

### CONTEXT currency markers (post-tag)

- `_agent-context/claude/CONTEXT.md` and `_agent-context/codex/CONTEXT.md` bumped to v2.24.0.

### W3 plan-skill HISTORY.md + 1.1.0 bump (recorded here for completeness)

- `skills/foundation-prioritized-action-plan/HISTORY.md` (NEW) - 1.1.0 + 1.0.0 entries newest-first; "Changes" subsection under 1.1.0; "Contract established" subsection under 1.0.0; "Decision note: D9 deliberately reopened" subsection under 1.1.0; links resolve to `docs/releases/Release_v2.23.0.md` and `Release_v2.24.0.md`.
- `skills/foundation-prioritized-action-plan/SKILL.md` frontmatter `metadata.version` `"1.0.0"` -> `"1.1.0"`.

---

## The build-time GATE: native sub-agent-to-skill delegation ships EXPERIMENTAL until live smoke-tested

This is the single most important pre-tag verification, and the release ships EXPERIMENTAL until it closes.

> **RECORDED 2026-06-01 (gate RUN, result logged): see [`smoke-test-record.md`](./smoke-test-record.md).** Verdict PASS (mechanism), runs INLINE. A dispatched sub-agent's toolset DOES include `Skill`, and invoking a real downstream skill through it SUCCEEDED. Question (2) below is resolved to **INLINE** (skill instructions are prompt-injected into the same sub-agent context and executed in-process, not in an isolated executor), so the disk-write + summarize-forward context-budget mitigation applies to the native Claude Code path too, exactly as designed. The test used a general-purpose proxy sub-agent against the working tree (the `pm-workflow-orchestrator` type is not an invocable `subagent_type` from the working tree), so it confirms the MECHANISM, not a full end-to-end run of the registered agent on an installed plugin. Per AC #14 the native EXPERIMENTAL label therefore STAYS until a recorded PASS of the real agent on an installed plugin; this satisfies only the run-and-record-before-tag requirement.

The conductor is cited ONLY for the run-loop / checkpoint / refusal SHAPE, NEVER as proof the `Skill`-from-sub-agent MECHANISM works. The conductor uses the `Agent` tool; **no repo agent has ever declared `Skill`.** The orchestrator is the first. Therefore, before the spec depends on native sub-agent-to-skill delegation, a live smoke test MUST confirm both:

1. The engine can invoke a downstream skill via the `Skill` tool in the installed plugin.
2. Whether that skill runs INLINE in the engine's context window or ISOLATED. Context7 describes skills as "adding to your context window," which suggests inline; if inline, the disk-write + summarize-forward context-budget mitigation (W1 state-passing) applies to the Claude Code path TOO, not only non-Claude.

**Until verified, the dispatch skill's "Status summary" callout labels the native Claude Code path EXPERIMENTAL, exactly as the conductor labels its non-Claude path.** The engine body cites the gate so a maintainer running the smoke test knows what to confirm. This is a hard build-time gate: the release may SHIP with the native path EXPERIMENTAL, but it may NOT claim PRODUCTION/validated for that path until the smoke test passes.

Separately, all NON-Claude clients (Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI) ship EXPERIMENTAL too - not "DRY-RUN VALIDATED by inheritance." The orchestrator writes up to three full PM artifacts and may thread state, which is strictly harder than the conductor's inline path and has never been live-validated off Claude Code. Moving any non-Claude client from EXPERIMENTAL to PRODUCTION requires a dedicated maintainer-gate test exercising a real multi-artifact inline WRITE run (see Risks and Residual open items).

`--dry-run` is the deterministic CI surface and the cross-client readiness probe; on any EXPERIMENTAL client (all of them at ship, native included) the skill instructs running `--dry-run` FIRST.

---

## The deliberate D9-reopening decision record

| ID | Decision | v2.23.0 value | v2.24.0 reframing |
|---|---|---|---|
| D9 | Cross-skill invocation (plan skill) | deferred (out of scope); recommend-only | DELIBERATELY REOPENED, narrowed, not reversed |

**What D9 said:** v2.23.0 locked D9 as "Cross-skill invocation: deferred / out of scope," making `foundation-prioritized-action-plan` recommend-only: it "Recommends a bounded, tiered set of downstream pm-skills ... never invokes them inline."

**What v2.24.0 changes (cleanly):**

- The plan skill STILL never runs work-skills inline. It does not execute `deliver-prd`, `discover-competitive-analysis`, or any Section 7 target itself.
- What changes: it OFFERS to delegate, and on explicit confirmation HANDS the plan to the dedicated, governed orchestrator. Execution happens entirely inside `utility-pm-workflow-orchestrator`, behind that skill's per-step checkpoints, refusals, and Cynefin floor.
- The recommend/execute boundary moves from "the plan skill never causes execution" to "the plan skill never executes inline, and only ever causes execution through one explicit confirmation into the governed orchestrator." This is the original D9 safety intent (no surprise, no unsupervised fan-out from the producer) honored by a different mechanism, not abandoned.

**Why it is clean at v2.24.0 but was correctly deferred at v2.23.0:** at v2.23.0 there was no governed consumer to hand off to; the only way to "run the plan" would have been inline fan-out from the producer - exactly the unsupervised execution D9 was deferred to avoid. v2.24.0 introduces the orchestrator with its own per-step checkpoints, stop-on-failed/empty guardrail, Cynefin floor, pre-flight refusals, and depth-2 governance. The handoff delegates to a component that OWNS all the safety D9 wanted to protect. The safety property is preserved by composition, not by prohibition.

**Recorded in BOTH places** (so the change to a locked decision is ratified in the open, not silently overwritten): this plan (the row + note above) AND the new `skills/foundation-prioritized-action-plan/HISTORY.md` 1.1.0 entry. The authoritative framing source for both records is [`spec_prioritized-action-plan-handoff.md`](spec_prioritized-action-plan-handoff.md) section 4; a future editor revising one of the two D9 records should sync the other against that section.

### Related engine-side narrowing (separate decision note, recorded here)

The locked design text said the engine "invokes the REAL downstream pm-skills/sub-agents ... via the Skill tool AND/OR chain-permitted sub-agents." v2.24.0 narrows this to **Skill-tool-only** and satisfies the "and/or sub-agents" clause for sub-agent-backed steps by INLINING the leaf agent (W1 leaf-inlining rule), NEVER by the `Agent` tool, because (i) Context7 documents that the `Agent` tool is stripped from nested sub-agent contexts to prevent recursion, and (ii) adding the engine to `_chain-permitted.yaml` is a security-relevant change we are explicitly avoiding. This narrowing is ratified here so the maintainer signs off in the open.

---

## Exit criteria (definition of done)

1. All mechanical acceptance criteria in the three specs pass (engine: 14 ACs, incl. AC #14 the smoke-test run-and-record gate; dispatch skill: 17 ACs, incl. AC #17 cross-linking the smoke-test result to the EXPERIMENTAL label; plan handoff: 14 ACs).
2. `agents/pm-workflow-orchestrator.md` exists, parses, and its `tools:` line is exactly `Skill, Read, Grep, Glob, Bash, Edit` with `Agent` ABSENT (manual grep, since no CI enforces it). `agents/_chain-permitted.yaml` UNCHANGED (diff check).
3. `skills/utility-pm-workflow-orchestrator/` ships with `SKILL.md` + the three reference files + the library sample; `utility-pm-skill-validate --strict` passes; `lint-skills-frontmatter` confirms the 20-100 word description; `check-skill-sample-coverage` passes UNMODIFIED.
4. `skills/foundation-prioritized-action-plan/` bumped to v1.1.0 with the HANDOFF section, refined Identity bullet + guardrail 7, and a new `HISTORY.md`; `utility-pm-skill-validate --strict` passes on the modified skill; the nine-section output contract is unchanged (header-count check).
5. The D9-reopening note appears in BOTH this plan and the plan skill's `HISTORY.md`.
6. Counts re-derived to 65 / utility 11 / foundation 9 / sub-agents 5 across every surface; `check-count-consistency` + `check-landing-page-counts --strict` green. Version surfaces at 2.24.0; `validate-version-consistency` green.
7. The three roadmap forward-references (active-orchestration.md x2, critic SKILL.md line 63, pm-critic.md line 137) flipped to "shipped v2.24.0."
8. Generated pages regenerated (not hand-edited); `check-generated-content-untouched` green. `validate-agents-md` green after the AGENTS.md edits; the Sub-Agents prose entry verified by hand.
9. Pre-tag validator bundle: `scripts/pre-tag-validate.{sh,ps1} --strict` on a clean tree, plus `utility-pm-skill-validate --strict` on the new skill AND the modified plan skill, plus the manual `Agent`-absent grep and the manual AGENTS.md Sub-Agents-prose check. Em-dash / en-dash sweep over all new files (repo hard rule; `no-em-dashes` hook).
10. The native `Skill`-from-sub-agent smoke test is RUN; its result is recorded; the native path is labeled EXPERIMENTAL in `sub-agent-compatibility.md` until it passes, and never claimed PRODUCTION before then. All non-Claude clients labeled EXPERIMENTAL.
11. `--dry-run` exercised on Claude Code and at least one non-Claude client as the readiness probe.
12. v2.24.0 tagged (linear history - reconcile origin/main by rebase, never merge, per the repo ruleset), GitHub Release published and marked Latest with the `Release_v2.24.0.md` body, marketplace registry re-pinned to v2.24.0.
13. This plan flipped to SHIPPED with the release date; `_agent-context/{claude,codex}/CONTEXT.md` currency markers updated.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Native `Skill`-from-sub-agent delegation does not work as assumed (first repo agent to declare `Skill`; unexercised path) | Medium | High | Ships EXPERIMENTAL behind the build-time smoke-test gate; conductor cited for SHAPE only; `--dry-run` is the deterministic surface; native path never claimed PRODUCTION until smoke-tested |
| Skills run inline in the engine context (not isolated), blowing context budget on multi-step runs | Medium | Medium | Disk-write auto-enables for 2+ step runs to `_pm-skills/plan-orchestrator/<run>/`; only a one-line summary per step kept in context; smoke test (b) confirms inline-vs-isolated |
| A reviewer copies pm-critic's "use proactively" frontmatter onto a delegating chain | Low | High | Copy-paste hazard flagged in spec + body; AC asserts description contains "Explicit invocation only; never fires proactively" and zero "proactiv" auto-trigger phrasing |
| Section 7 parser mis-handles compound `P1 and P2` or duplicate `P1` blocks (treats as a chain / a P-map) | Medium | High | MANDATORY parse fixtures built from the three real bundled examples + two synthetic cases; assert ordered tuple list, siblings NOT threaded, cap counts runnable blocks only |
| Cynefin domain extracted as `Complex.` (trailing period) or guessed when ambiguous | Medium | Medium | First-whole-word enum extraction; tolerate trailing period + inline `**Source:**`; ambiguous -> CHECKPOINTED, never guess; fixtures cover all four enum branches |
| Hidden sub-agent chain through a recommendable dispatch skill (`utility-pm-critic`) breaks depth-2 | Low | High | Mandatory Category 1/2/3 step classification; Category 2 inlines the leaf agent, never invokes it as a native skill or via `Agent`; no `_chain-permitted.yaml` entry |
| Future drift adds `Agent` to the engine (allowlist unenforced by CI) | Low | Medium | Positive spec statement "explicitly NOT Agent"; manual pre-tag grep; the engine spawns zero sub-agents by design |
| Count breakdowns left stale at ship (foundation wrongly bumped) | Medium | Low | Corrected baseline section (foundation STAYS 9; utility is the increment); `check-count-consistency` + `check-landing-page-counts --strict` |
| Non-Claude write-heavy inline run fails mid-chain (no client validated) | Medium | Medium | Tool-capability pre-flight as the inline branch's FIRST action; CHAT-ONLY degrade or clean refuse; EXPERIMENTAL on all non-Claude clients; maintainer-gate WRITE harness required before PRODUCTION |
| AGENTS.md Sub-Agents prose entry silently omitted (not CI-protected) | Low | Low | Flagged: substring check is auto-satisfied by the skill path line; the prose entry is hand-added and verified in the pre-tag manual pass |

---

## Scope / YAGNI cuts

- **No autonomous goal-seeking.** Runs a given step list; never invents goals.
- **No dynamic re-planning.** The step list is fixed at run start; on failure it stops, it does not route around.
- **No output-to-input threading in Mode A.** Section 7 prompts are ordered-independent and self-contained; no handoff extraction, no per-skill handoff schema. (This dissolves the "handoff schema" question entirely.)
- **No inferred dependencies in Mode B.** Cross-step consumption is user-declared only; the orchestrator never infers a PRD-to-user-stories dependency from skill identity.
- **No nested orchestration.** Workflow/composite/dispatch-fan-out steps are surfaced as MANUAL or inlined-at-leaf, never nested. A Mode B user naming a curated workflow is routed to the existing `workflow-*` command.
- **No proactive firing.** Explicit invocation only - the engine AND the plan skill's handoff (the handoff OFFERS, it never auto-runs).
- **Top-3 cap on Mode A only** (inherited from Section 7); Mode B runs the full named chain with a context-budget warning past 3.
- **`--force-auto` is a narrow autonomy escape hatch, never a gate-skip;** stop-on-failed/empty outranks it in all domains.
- **No new chain-permission surface.** Skill-tool delegation only; no `Agent` tool, no `_chain-permitted.yaml` entry; sub-agent-backed steps handled by leaf-inlining.
- **No auto-resume in v1.** Re-invoke restarts; persisted artifacts are for manual reference only. (Auto-resume-by-detecting-existing-files is a future enhancement, residual question 3.)
- **No downstream status-envelope retrofit.** The orchestrator self-classifies step status; adding Status YAML to the content skills is a separate, out-of-scope effort.
- **No non-Claude PRODUCTION claim.** All non-Claude clients ship EXPERIMENTAL until a dedicated maintainer-gate WRITE harness exercises a real multi-artifact inline run.
- **No three-thread sample set.** One single-thread checkpointed sample; the `utility` classification is exempt by `in_scope_class`.
- **No description rewrite for the plan skill.** The handoff is a body-documented optional mode; the description is unchanged.
- **No own quality validator.** The orchestrator's gates stay STRUCTURAL; it inherits Tier 1 invariants over its committed sample and does NOT block on the UNRELEASED output-eval-harness.

---

## Residual open items (tracked, not blockers for shipping EXPERIMENTAL)

1. **Native `Skill`-from-sub-agent smoke test** must be run on the current Claude Code runtime: confirm (a) the engine can invoke a downstream skill via `Skill` in the installed plugin, and (b) inline-vs-isolated context. Until verified, the native path ships EXPERIMENTAL. (Build-time gate above.)
2. **Whether low Overall plan confidence** (Section 0, compound values like `Medium-High`) should ALSO force checkpointed behavior independent of the Cynefin domain. Out of v2.24.0; the parser already tolerates compounds if later adopted.
3. **Auto-resume after halt:** v2.24.0 ships restart-only. A future enhancement could detect existing `NN-<skill>.md` files in the `<run>` directory and skip completed steps. Maintainer decision on whether it is worth a follow-up.
4. **Maintainer-gate WRITE harness** for the orchestrator's inline multi-artifact, state-threading path on each non-Claude client - required before any non-Claude client moves from EXPERIMENTAL to PRODUCTION in `docs/reference/sub-agent-compatibility.md`.

(The component-naming question is RESOLVED and removed: engine = `pm-workflow-orchestrator`, dispatch skill = `utility-pm-workflow-orchestrator`, honoring the published v2.17 roadmap promise; the three roadmap references are updated as in-scope work.)
