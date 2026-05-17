# Spec: pm-release-conductor

**Sub-agent type:** Utility (maintainer-facing)
**Audience:** Maintainer
**Status:** Spec ratified for v2.16.0 implementation
**Owner:** Maintainers
**Spec version:** 1.0.1 (incorporates Codex review R01, R05, R07, R08; adds G2.5 commit gate)
**Last updated:** 2026-05-16

---

## Identity

```yaml
name: pm-release-conductor
classification: sub-agent
tier: utility
audience: maintainer
version: 1.0.0
license: Apache-2.0
```

---

## Mission

Walk the maintainer through the full release runbook for a new version tag with **6 explicit gates** (G0, G1, G2, G2.5, G3, G4) that pause for confirmation. Re-derive aggregate counters at G0 to catch drift. Chain to pm-skill-auditor at G0 (and again at G2.5 verification) and pm-changelog-curator at G2. Refuse to advance past a failed gate. **The 6th gate G2.5 is added per Codex review finding R01** to close the gap where G3 could tag a HEAD that did not include the G2 release-prep edits.

The release runbook lives in the maintainer's head plus partial release-plan checklists today. Drift between releases (the v2.13.1 plugin install path correction was post-tag detection) is the cost. The conductor formalizes the gates and makes drift structurally impossible.

This is the most complex sub-agent in the v2.16.0 slate. It has the largest tool surface (Bash + Read + Edit + Grep + Glob + Agent), the longest lifetime (full release flow, often 30+ minutes elapsed), and the most chain composition (2 children at 2 separate gates).

---

## Behavior Contract

### What pm-release-conductor does

- Accepts a target version (`/release v2.16.0`)
- Validates the version shape (semver vN.M.P)
- Walks 5 gates in order, pausing at each for explicit maintainer confirmation:
  - **G0** Pre-tag readiness (chains to pm-skill-auditor)
  - **G1** Adversarial review status (maintainer confirms Phase 0 done)
  - **G2** Version bump + CHANGELOG prep (chains to pm-changelog-curator)
  - **G3** Tag annotated message + push
  - **G4** Post-tag hygiene
- Surfaces all gate outputs (validator reports, audit findings, draft CHANGELOG, em-dash sweep results) to the maintainer
- Refuses to advance past a gate where blocking conditions are unmet
- Rolls back conservatively on gate failure (does NOT auto-revert; surfaces the failure and pauses)

### What pm-release-conductor does NOT do

- Does NOT auto-fix anything (detects + surfaces; maintainer fixes)
- Does NOT skip gates - NO BYPASS POSSIBLE. The conductor refuses any prompt to skip a gate. `--skip-gates` was deliberately removed from v2.16 (Codex R05).
- Does NOT make ship-or-not strategic calls (mechanical runbook only)
- Does NOT modify the working tree without explicit maintainer confirmation per edit
- Does NOT push to remote without G3 "ship it" confirmation
- Does NOT tag any SHA other than the one G2.5 captured (prevents broken tag from G2 uncommitted state)
- Does NOT emit "Release complete" until G4 P0 sub-checks pass OR maintainer explicitly logs them as known regressions
- Does NOT chain past 2 levels (auditor and curator do not chain further; verified by their system prompts not having the Agent tool)

### The 6 gates (G0, G1, G2, G2.5, G3, G4)

#### G0: Pre-tag readiness

**Implementation note (v2.15.1 carry-in):** the canonical implementation of sub-checks 2 + 4 + 5 is `scripts/pre-tag-validate.{sh,ps1}` (shipped v2.15.1; required Section 0 of `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`). The conductor SHOULD invoke that orchestration script rather than re-implement the 14-validator inventory inline. The script returns exit 0 only when every enforcing validator (including count-consistency, generated-content-untouched, all family validators with --strict, and the 3 v2.15.1 preventive validators) passes.

**Sub-checks** (all must pass):

1. **Working tree clean** - no uncommitted changes (`git status --porcelain` empty)
2. **Pre-tag validator bundle green** - run `bash scripts/pre-tag-validate.sh` (or pwsh equivalent); exit 0 required; combines CI-green-equivalent + landing-page count assertion + workflow-generator coverage + AGENTS.md command-sync into one signal
3. **em-dash sweep clean** - run `scripts/check-em-dashes` (the canonical implementation per master plan D27); scope and allowlist owned by that script; zero non-allowlisted hits required
4. **Aggregate counters match declared** - re-derive skill count, command count, sub-agent count, validator count, family count; compare to CONTEXT.md, AGENTS.md, README.md declared values; zero drift. (Per v2.15.x carry-in reconciliation in ci-plan.md, this check should EXTEND `check-landing-page-counts` to cover the 3 internal-context surfaces, not ship a parallel `check-aggregate-counters` validator.)
5. **Cross-cutting audit via pm-skill-auditor** - chain invocation; auditor returns its findings; zero P0 findings required to advance; P1+P2+P3 are surfaced for maintainer judgment
6. **Required files exist** - `docs/internal/release-plans/v{target}/plan_v{target}.md` exists and is marked READY TO TAG (or equivalent status); release notes draft exists or is scheduled

**Blocker:** any sub-check failure pauses G0. Maintainer fixes and re-runs G0.

#### G1: Adversarial review status

**Sub-checks:**

1. **Phase 0 review complete** - maintainer confirms the Codex (or alternate cross-LLM) adversarial review has been run against the release-prep state
2. **Findings dispositioned** - all P0 findings closed; P1 findings either closed or explicitly deferred to next release with rationale; P2+P3 acknowledged
3. **Review artifact exists** - if `_NOTES/` or `docs/internal/release-plans/v{target}/review/` contains the review record, conductor reads it for context (informational only; not blocking)

**Blocker:** maintainer confirmation required. Conductor cannot auto-detect Phase 0 review status; this is a maintainer attestation gate.

#### G2: Version bump + CHANGELOG prep

**Sub-checks** (conductor proposes edits; maintainer confirms each):

1. **plugin.json version field** - edit `.claude-plugin/plugin.json` `version` to target version
2. **Marketplace manifest version** - edit `.claude-plugin/marketplace.json` (or equivalent) to match
3. **CHANGELOG.md header** - chain to pm-changelog-curator for draft; maintainer applies + reviews; new `## [vX.Y.Z] - YYYY-MM-DD` header at top
4. **docs/changelog mirror** - update Astro-rendered `docs/changelog.md` (or whatever the public mirror is) to match
5. **README badges** - version badges in README.md updated to target version
6. **Release plan status** - `plan_v{target}.md` status block updated to `SHIPPED YYYY-MM-DD`
7. **Release notes** - `docs/releases/Release_v{target}.md` exists; conductor reads it; maintainer confirms quality
8. **Hidden-comment leak check** - grep CHANGELOG.md for `<!-- justification:` (pm-changelog-curator's debug comments); fail if any remain

**Blocker:** any sub-check failure pauses G2.

#### G2.5: Commit release-prep edits + re-verify

**Critical gate added per Codex review finding R01.** G2 edits files (plugin.json, marketplace.json, CHANGELOG.md, docs/changelog mirror, README.md, release plan status, release notes) without committing. If G3 tagged the un-committed HEAD, the tag would point at a commit that does NOT contain the release metadata. G2.5 closes that gap.

**Sub-checks:**

1. **Working tree contains G2 edits** - verify `git status --porcelain` shows only the expected G2-edited files; no surprise changes
2. **Stage G2 edits** - `git add` the specific files G2 edited; verify staged contents match expected
3. **Commit with release-prep message** - conventional commit message: `chore(v{target}): release-prep edits for v{target}` or maintainer-preferred form
4. **Working tree clean post-commit** - `git status --porcelain` empty
5. **Re-run G0 sub-checks against new HEAD** - validators, em-dash sweep, aggregate counter audit re-run against the commit that includes the release-prep edits; zero P0 findings required
6. **CI green on new HEAD** - push the new commit to the release branch on origin; verify CI runs and passes (block on this; the tag must point at a CI-passing commit)
7. **Cross-reference commit SHA captured** - record the SHA that G3 will tag

**Blocker:** any sub-check failure pauses G2.5. The conductor refuses to advance to G3 if the working tree is not clean OR if CI is not green on the new commit. This is what prevents the broken-tag class of bug.

#### G3: Tag annotated message + push

**Sub-checks:**

1. **Tag target SHA confirmed** - G3 tags the SHA captured at G2.5 sub-check 7 (the commit containing release-prep edits and verified by CI). The conductor refuses to tag any other SHA.
2. **Tag message authored** - conductor presents a draft annotated-tag message (multi-paragraph: title + summary + headline changes)
3. **Maintainer approves message** - explicit confirmation required
4. **Tag created** - `git tag -a v{target} -m '<message>' {G2.5-captured-sha}`
5. **Push tag** - `git push origin v{target}` (requires explicit maintainer "ship it" confirmation)
6. **CI re-runs on tag** - tag push triggers a fresh CI run; conductor monitors the run start (does NOT wait for completion at this gate; G4 handles post-tag verification)

**Blocker:** maintainer must confirm "ship it" before push. Conductor never pushes without this confirmation. Conductor also refuses to tag any SHA other than the one G2.5 captured.

#### G4: Post-tag hygiene

**Sub-checks** (each produces a P0/P1/P2 incident on failure per Codex finding R07):

1. **Plugin install path check** (P0 on fail) - smoke-test plugin install from the new tag; failure = release artifact is broken
2. **Marketplace registration** (P1 on fail) - confirm marketplace listing still resolves; failure = discoverability incident
3. **GitHub Pages rebuild** (P1 on fail) - confirm doc-stack rebuild was triggered; failure = documentation incident
4. **GitHub Release UI body** (P2 reminder) - conductor reminds maintainer to author the GitHub Release UI body; does NOT auto-create
5. **Next-cycle stub** (P2 reminder) - create `docs/internal/release-plans/v{next-minor}/plan_v{next-minor}.md` stub if not present
6. **Post-tag follow-up tasks logged** (P2 reminder) - any deferred items captured in the next-cycle stub

**Blocker (revised per R07):** P0 sub-check failures block the "Release complete" output. The conductor surfaces the failure as a post-tag incident and instructs the maintainer to either resolve OR explicitly log the issue as a known regression carried to v{next-patch}. The conductor refuses to emit "Release complete: v{target}" until either resolution or explicit logging happens. P1 and P2 sub-checks are surfaced but do not block the final output.

**Rollback note:** if a G4 P0 (plugin install path broken) cannot be resolved post-tag, the maintainer typically ships a fast v{patch} (e.g., v2.16.1) rather than reverting the tag. Tag reversion is destructive and not in v2.16 scope. The conductor surfaces the v{patch} path as a recommendation but does not initiate it.

### Severity grammar in gate outputs

Each gate reports findings using P0/P1/P2/P3 (D15). P0 within a gate blocks the gate. P1+ is informational unless the gate's specific blocker rule says otherwise.

### Refusal protocols

The conductor refuses to start when:

1. **Invalid version argument.** "`/release foobar` is not a valid semver. Use `/release v2.16.0` format."
2. **Target version already tagged.** "`v2.16.0` already exists as a tag. To re-release, choose a new version or delete the existing tag (destructive)."
3. **Branch is not main (or release branch).** "Current branch is `feature/X`. Releases run from main (or a designated release branch). Switch branches or use `--branch` override (advanced)."
4. **Master plan missing.** "`docs/internal/release-plans/v{target}/plan_v{target}.md` does not exist. Releases require a master plan. Create the plan and re-invoke."

---

## Inputs and Outputs

### Inputs

- **Required:** target version (`v2.16.0` shape; semver)
- **Optional:** `--dry-run` (walk all gates but skip the actual tag + push at G3; useful for rehearsals; emits explicit "NOT RELEASABLE - dry run" output)
- **Optional:** `--branch <name>` (override default `main` branch check)

**Removed per Codex review finding R05:** the original spec proposed `--skip-gates <list>` for advanced gate skipping. This contradicted the conductor's no-bypass safety contract. Skip-gates is OUT OF SCOPE for v2.16. Maintainers who need to release without a specific gate (e.g., G1 adversarial review for a hotfix patch) must explicitly run that gate's verification by hand and confirm to the conductor at the gate prompt. v2.17+ may reintroduce skip-gates restricted to non-release dry-run mode only.

### Outputs

Streaming output throughout the release flow. Each gate produces:

```markdown
## Gate G{N}: {Gate name}

**Sub-checks:**

1. {sub-check name}: PASS / FAIL / N/A
   {detail}
2. ...

**Gate status:** PASS / FAIL / WAITING-FOR-CONFIRMATION

{If PASS:} Proceed to G{N+1}? Confirm with "yes" or address findings.

{If FAIL:} Cannot advance. Resolve the following before re-invoking:
- {blocker 1}
- {blocker 2}
```

Final output on G4 completion:

```markdown
## Release complete: v{target}

**Tag:** v{target} (annotated, pushed to origin)
**HEAD:** {sha}
**Release notes:** docs/releases/Release_v{target}.md
**CHANGELOG entry:** lines {start}-{end} of CHANGELOG.md

**Post-tag follow-ups:**

- [ ] Author GitHub Release UI body at https://github.com/{org}/{repo}/releases/new?tag=v{target}
- [ ] Verify GitHub Pages rebuild at https://{org}.github.io/{repo}/
- [ ] Smoke-test plugin install from the new tag
- [ ] {any deferred items}

Next cycle stub: docs/internal/release-plans/v{next-minor}/plan_v{next-minor}.md
```

---

## Invocation Patterns

### Pattern 1: Explicit slash command (default)

`/release v2.16.0` - invokes pm-release-conductor with the target version.

### Pattern 2: @-mention

`@agent-pm-release-conductor v2.16.0`

**No proactive trigger.** Per D7 + Insight 10. Releases are user-initiated, period.

---

## Tool Surface

```yaml
tools: Bash, Read, Edit, Grep, Glob, Agent
```

- **Bash:** for `git tag`, `git push`, `git status`, `git log`, CI status checks via `gh`, em-dash sweep grep.
- **Read:** for reading release plans, runbook docs, CLAUDE.md, CHANGELOG.md, release notes.
- **Edit:** for version-bump edits to plugin.json, marketplace.json, CHANGELOG.md, README.md badges, release plan status block.
- **Grep, Glob:** for cross-reference checks (em-dash sweep, aggregate counter re-derivation).
- **Agent:** **REQUIRED** for chaining to pm-skill-auditor (G0) and pm-changelog-curator (G2). This is the only sub-agent in v2.16 with the Agent tool. Per D14, the auditor and curator do NOT have the Agent tool, capping chain depth at 2 levels.

---

## Memory and Lifetime

```yaml
memory: none
```

- **Lifetime:** Full release flow. Often 30+ minutes elapsed across many turns. Holds gate state across turns within the session.
- **Memory:** None across sessions. Each release is a one-shot. If a release is interrupted, the conductor can be re-invoked and the maintainer manually identifies which gates have passed (the working tree state often indicates).

---

## Frontmatter

```yaml
---
name: pm-release-conductor
description: |
  Guided release runbook for pm-skills. Walks the maintainer through 5 explicit
  gates (G0 pre-tag readiness, G1 adversarial review status, G2 version bump +
  CHANGELOG, G3 tag + push, G4 post-tag hygiene). Pauses at every gate for
  confirmation. Chains to pm-skill-auditor at G0 and pm-changelog-curator at G2.
  Re-derives aggregate counters and sweeps for em-dashes at G0. Refuses to
  advance past a failed gate. Explicit invocation only - never proactive.
  Usage: /release v2.16.0
tools: Bash, Read, Edit, Grep, Glob, Agent
model: sonnet
memory: none
---
```

---

## System Prompt Structure

Referential (D12). The runbook detail lives in `docs/contributing/release-runbook.md` and the conductor reads it at invocation time.

Outline for `subagents/pm-release-conductor.md`:

```
You are pm-release-conductor. You escort a pm-skills release from "work is
done" to "tag is pushed and post-tag hygiene is clean." You walk 5 gates
in order, pausing at each for explicit maintainer confirmation. You refuse
to advance past a failed gate. You roll back conservatively on failure
(surface + pause; never auto-revert).

Step 0: Validate input.
- Version argument is semver vN.M.P
- Target version is not already tagged
- Current branch is main (or --branch override)
- docs/internal/release-plans/v{target}/plan_v{target}.md exists

Step 1: Read the runbook.
Read docs/contributing/release-runbook.md at invocation time. The runbook
is the canonical source for gate sub-checks. This spec doc summarizes;
the runbook governs.

Step 2: Execute gates G0 through G4.
Per the runbook, in order. Each gate:
- Run sub-checks
- Surface PASS/FAIL/WAITING per sub-check
- If gate PASS: ask maintainer to confirm "yes" before advancing
- If gate FAIL: surface blockers; do NOT advance; instruct maintainer how to resolve

Gate-specific notes:
- G0: chain to pm-skill-auditor via the Agent tool. Pass --since-tag {previous}
  for incremental scope. Block on P0 findings; surface P1+P2+P3 for judgment.
- G2: chain to pm-changelog-curator via the Agent tool. Pass --target-version
  {target} --since-tag {previous}. Surface draft to maintainer; await applied
  CHANGELOG.md before advancing.
- G3: NEVER push without explicit "ship it" confirmation.

Step 3: Final output on G4 completion.
Emit the post-tag checklist documented in spec_pm-release-conductor.md.

Refusal protocols: see spec doc section "Refusal protocols."

Chain depth: per D14, max 2 levels. You chain to auditor (G0) and curator
(G2). Neither child chains further (verified by their system prompts not
having the Agent tool).

em-dash discipline: at G0, run a repo-wide grep for U+2014 and U+2013
across all tracked text files. Zero hits required to advance. This is the
em-dash-sweep gate from D9.
```

---

## Composition with Other Components

### Composition with pm-skill-auditor

```
G0 sub-check 5:
  conductor.Agent(pm-skill-auditor, scope='since-tag v{previous}')
  -> auditor runs validators + cross-cutting checks
  -> auditor returns: report ending with machine-readable Status block (per R08)
  -> conductor parses Status block:
       - If status == 'refused': conductor surfaces refusal_reason; G0 blocks
       - If p0_count > 0: G0 blocks; surface findings
       - If counters_match == false: G0 blocks; surface mismatch
       - Else: G0 PASS with maintainer-visible P1+P2+P3 surfacing
```

Chain depth: 2 levels (conductor invokes auditor). Auditor cannot chain further (no Agent tool; verified at Phase 8 integration check).

### Composition with pm-changelog-curator

```
G2 sub-check 3:
  conductor.Agent(pm-changelog-curator, target-version=v{target}, since-tag=v{previous})
  -> curator drafts entries respecting CLAUDE.md hygiene
  -> curator returns: draft CHANGELOG.md additions + Status block (per R08)
  -> conductor parses Status block:
       - If status == 'refused': conductor surfaces refusal_reason to maintainer; G2 blocks
       - If dirty_tree_warning == true: conductor surfaces warning (should not happen unless --committed-only)
       - Else: surface draft to maintainer for review + apply
  -> maintainer applies + reviews + edits
  -> conductor confirms G2 sub-check 3 PASS once CHANGELOG.md is updated
  -> conductor verifies CHANGELOG.md does NOT contain leaked <!-- justification: --> comments (G2 sub-check 8)
```

Chain depth: 2 levels (conductor invokes curator). Curator cannot chain further (no Agent tool; verified at Phase 8 integration check).

### Composition with release-runbook.md

D12 referential discipline. The runbook is canonical; the conductor reads it at invocation time. If the runbook adds sub-checks (e.g., a new G0 verification), the conductor adopts them on next invocation without code change. The conductor's system prompt explicitly says "the runbook governs."

### Composition with the existing release process

The conductor does NOT replace the maintainer; it accompanies them. Every gate pauses for confirmation. The conductor's value is in catching things the maintainer would forget (aggregate counter drift, em-dash drift, pre-CI failure) and in standardizing the runbook so cross-session drift can't happen.

### Composition with future v2.17 components

- **PostToolUse hooks (v2.17):** a hook on `git tag` could auto-invoke the conductor's G4 post-tag checks. Defer.
- **pm-workflow-orchestrator (v2.17):** the orchestrator pattern is similar (gated multi-step flow); the conductor is a precursor experiment. Lessons from conductor inform orchestrator design.

---

## Library Sample Coverage

Three samples ship in v2.16.0:

| Sample | Thread | Scenario | Demonstrates |
|---|---|---|---|
| sample_pm-release-conductor_brainshelf_clean-run.md | brainshelf | Happy-path v2.X.Y release; all 5 gates pass first try | Gate progression; chain output from auditor + curator; final post-tag checklist |
| sample_pm-release-conductor_storevine_gate-failure.md | storevine | G0 fails with synthetic aggregate-counter drift; conductor halts; maintainer fixes; conductor resumes | Refusal semantics; resume-from-failure pattern |
| sample_pm-release-conductor_workbench_chained-run.md | workbench | Full chained run showing both auditor (G0) and curator (G2) invocations with their outputs surfaced inline | 2-level chain depth verification; total token budget acceptable |

---

## Acceptance Criteria

pm-release-conductor is ready to ship when:

- [ ] `subagents/pm-release-conductor.md` exists with frontmatter per this spec
- [ ] System prompt is referential (reads release-runbook.md at invocation time)
- [ ] `commands/release.md` resolves to pm-release-conductor with version argument validation
- [ ] `docs/contributing/release-runbook.md` exists and documents all 5 gates with sub-checks
- [ ] Dry-run mode walks all 5 gates without actual tag/push
- [ ] G0 chain to pm-skill-auditor verified end-to-end
- [ ] G2 chain to pm-changelog-curator verified end-to-end
- [ ] em-dash sweep at G0 catches synthetic em-dash insertions (test by inserting a `—` in a tracked file and confirming G0 fails)
- [ ] Aggregate counter audit at G0 catches synthetic drift (test by modifying CONTEXT.md skill count and confirming G0 fails)
- [ ] All gate refusal semantics verified (failed sub-checks pause; do not advance)
- [ ] 3 library samples shipped
- [ ] Chain depth limit verified: auditor and curator system prompts do not include Agent tool
- [ ] Codex parity path documented (runbook is usable as a manual reference)
- [ ] Phase 0 review run against this spec doc + the runbook

---

## Cross-Client Compatibility (replaces former "Codex Parity" section; per master plan D11 amended + D30)

**The conductor is the most complex sub-agent to deliver cross-client** because its core value (chain composition to pm-skill-auditor at G0 and pm-changelog-curator at G2) uses the Claude Code Agent tool. Non-Claude clients don't have that mechanism.

**Dispatch skill mechanism (Option D-full chosen per Q7).** Non-Claude clients access the conductor's intent via `skills/utility-pm-release-conductor/SKILL.md` which uses a **"reference + execute inline" pattern** at the chain points:

```markdown
---
name: utility-pm-release-conductor
description: Guided release runbook with 6 gates (G0, G1, G2, G2.5, G3, G4)
---

## Instructions

If you are running in Claude Code with the pm-skills plugin:
  Invoke @agent-pm-release-conductor with target version argument.
  Native chain composition handles auditor (G0) and curator (G2) invocations.

If you are running in any other client:
  Walk through 6 release gates manually. The chain composition mechanism
  is replaced with "read and execute inline":

  Gate G0: Pre-tag readiness
    Step 1: Read subagents/pm-skill-auditor.md and execute its instructions
            as your operating system prompt for this step. Run validators,
            cross-cutting checks, counter audit. Capture the layered Status
            output.
    Step 2: Return to this conductor flow. Use the auditor's Status block
            to decide G0 PASS / FAIL.

  Gate G1: Adversarial review status (manual maintainer confirmation)

  Gate G2: Version bump + CHANGELOG prep
    Step 1: Read subagents/pm-changelog-curator.md and execute its instructions
            inline. Capture layered Status output.
    Step 2: Apply CHANGELOG draft + version bumps to relevant files.

  Gate G2.5: Commit + re-verify (git operations + re-run G0 inline)

  Gate G3: Tag + push the captured SHA from G2.5

  Gate G4: Post-tag hygiene (incident-producing checks per D23)
```

**Shipping status:** CONDITIONAL on TWO spike gates:
- **Phase 2 GATE B** (general dispatch reliability): if pm-critic dispatch fails on non-Claude, NO dispatch skills ship at all (fallback to Option F).
- **Phase 2 GATE C** (conductor sub-spike): if pm-critic "reference + execute inline" delegation to itself works reliably, conductor dispatch ships. If not, ship Option D-revised: 3 dispatch skills (pm-critic, pm-skill-auditor, pm-changelog-curator); conductor stays Claude-Code-only.

**Single-tool user assumption (D30).** codex-rescue is NOT baseline. A Codex CLI maintainer (hypothetical; pm-skills currently has Claude Code maintainer) would use the dispatch skill if shipped, or invoke the runbook in `docs/contributing/release-runbook.md` manually if not.

**The Status YAML envelope still applies cross-client.** The conductor's inline reads of auditor + curator agent files include the instruction to emit layered Status output. The conductor (running inline in dispatch mode) parses the YAML block the same way as the native version. D26 layered structure is honored.

---

## Risks Specific to pm-release-conductor

| ID | Risk | Mitigation |
|---|---|---|
| **RC1** | **Maintainer fatigue at 5 gates.** Long sessions; 30+ min; risk maintainer rubber-stamps confirmations. | Per-gate sub-check output is structured + scannable. Conductor explicitly states "Confirm with 'yes' or address findings" so the confirmation is intentional. |
| **RC2** | **Chain depth violation.** Auditor or curator accidentally gain Agent tool and start chaining. | Per spec docs: auditor + curator frontmatter forbids Agent tool. Phase 8 integration check verifies. |
| **RC3** | **Token budget on full release run.** Conductor + auditor + curator + main session compound context cost across 30+ min. | Insight 9: chains run in fresh contexts; total budget is the sum. Audit incremental scope (--since-tag) keeps auditor's context small. Curator's range is also incremental. Real-world: estimated ~50-80K tokens across the slate, well within budget. |
| **RC4** | **Gate skip via maintainer prompt manipulation.** Maintainer says "skip G0 and go to G1" mid-flow. | System prompt explicitly states: "You refuse to advance past a failed gate" + "Each gate must pass; maintainer cannot bypass via prompt." The --skip-gates argument exists with explicit warning logging for legitimate advanced cases. |
| **RC5** | **Stale runbook causes drift between conductor and reality.** Runbook says G0 verifies X but conductor implementation forgets X. | D12 referential discipline: runbook governs. Conductor reads it at invocation time. If runbook gets a new sub-check, conductor picks it up automatically. |
| **RC6** | **G0 em-dash sweep false positives.** Em-dash appears in a deliberately-quoted-source file (e.g., a verbatim user quote in a sample). | Sweep allowlist: `library/skill-output-samples/**` excluded from em-dash check, OR specific file allowlist documented in runbook. v2.16 default: full sweep across tracked text files; if false positives surface, refine the allowlist. |
| **RC7** | **G3 destructive operation risk.** `git tag` + `git push` are non-trivial reversibility. Maintainer needs to be deliberate. | "Ship it" confirmation is the canonical phrasing; conductor refuses anything less explicit. --dry-run mode rehearses without tagging. |
| **RC8** | **CI status check fragility.** G0 sub-check 2 (CI green) depends on `gh` CLI + GitHub API. Network failures, auth issues, etc. | Conductor surfaces the failure mode (e.g., "gh API returned 401; authenticate and re-run G0"). Does not assume CI status if it cannot verify. |

---

## Out of Scope for v2.16.0

- Auto-creation of GitHub Release UI body. Defer to v2.17; maintainer authors manually per G4 reminder.
- Multi-tag release support (e.g., tag v2.16.0 + v2.16.0-rc1 in one flow). Defer.
- Cross-repo release coordination (e.g., bump pm-skills-mcp tag in lockstep). M-22 blocked.
- Rollback assistance (e.g., delete the just-pushed tag if G4 surfaces a problem). Defer; rollback is destructive and benefits from explicit human direction.
- Release-notes drafting (separate from CHANGELOG drafting). Defer; conductor reads existing release notes at G2 sub-check 7 but does not author them.
- Slack / Discord / email notification on G3 success. Defer.

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Integration plan: [`subagents-integration-plan.md`](./subagents-integration-plan.md)
- Strategy doc (U1 candidate): [`../../_working/subagents/subagent-strategy_2026-05-07.md`](../../_working/subagents/subagent-strategy_2026-05-07.md)
- Implementation plan: [`../../_working/subagents/subagent-implementation-plan_2026-05-10.md`](../../_working/subagents/subagent-implementation-plan_2026-05-10.md)
- Companion spec docs (chained children): [`spec_pm-skill-auditor.md`](./spec_pm-skill-auditor.md), [`spec_pm-changelog-curator.md`](./spec_pm-changelog-curator.md)
- Release runbook (canonical, ships in Phase 5 Task 20): `docs/contributing/release-runbook.md`
- Phase 0 Adversarial Review pattern: [`../v2.11.0/plan_v2.11_pre-release-checklist.md`](../v2.11.0/plan_v2.11_pre-release-checklist.md)
- Aggregate-counter-drift bug class: `feedback_stale-aggregate-counter.md` (in memory)
- em-dash rule: `CLAUDE.md` + `feedback_no-em-dashes.md`
- Claude attribution rule: `feedback_no-claude-attribution-trailers.md`
- Update-plans discipline: `feedback_update-plans-as-you-ship.md`
