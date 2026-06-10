# Review Record: Codex Adversarial Review of the v2.26.0 Planning Docs (2026-06-10)

**Reviewed:** the five v2.26.0 planning documents (`plan_v2.26.0.md`, `spec_workflow-builder-and-chaining.md`, `implementation-plan_workflow-builder-and-chaining.md`, `spec_skill-quality-convergence.md`, `implementation-plan_skill-quality-convergence.md`) plus the three effort-brief banner edits, all uncommitted in the working tree at review time.
**Reviewer:** Codex (companion runtime, adversarial-review mechanism), thread `019eb30c-c7c7-7420-a523-7cbd1201a56b`. **Verdict as returned:** needs-attention ("No-ship" until plan corrections).
**Verifier + scribe:** Claude (this record; every finding independently verified against the repo before any edit, per the receiving-code-review discipline).
**Outcome:** 7 findings, 7 CONFIRMED, 7 fixed in revision R1 of the planning docs (same day). One fix deliberately deviates from both of Codex's offered remedies (CR-4, rationale below). A re-review (thread `019eb333-80dc-...`) verified the seven R1 fixes as applied and surfaced ONE new P1 (CR-8, validator-blind release-note template), fixed in revision R2; see the Re-review section.

---

## How the review ran (mechanism trace)

1. The maintainer requested `codex:review` of each planning doc. The native `/codex:review` path was attempted twice and stalled both times with the same root cause: the Codex sandbox cannot spawn PowerShell (every attempt against the Store-installed `pwsh.exe` exits -1, the WindowsApps/MSIX alias problem), so the native reviewer cannot run `git diff` and improvises with MCP tools, some of which hang without timeouts.
   - Run 1, thread `019eb289-38a5-...`: progressed via filesystem MCP reads, then hung 74+ minutes inside a `playwright/browser_run_code_unsafe` call. Killed.
   - Run 2, thread `019eb2d6-8f6d-...`: same shell failures, progressed via filesystem reads, then hung 42+ minutes inside a `github/get_file_contents` call (the same hang class as the documented 2026-06-09 rescue incident). Killed.
2. With maintainer approval (explicit option choice, not a silent substitution), the review switched to the **adversarial-review mechanism**, which accepts focus text. The focus framed a per-document review of the planning docs and added an explicit environment constraint: no shell commands, no GitHub fetches, local filesystem reads only. That run completed in minutes.
3. Codex returned findings only (no patches). Claude verified each against the repo and applied the dispositions below. Codex's prose was not altered; the verbatim output is in the appendix.

## Findings, verification, dispositions

IDs CR-1..CR-7 are used in the revised docs' R1 banners. Severity is Codex's grading.

| ID | Sev | Codex claim (condensed) | Verification (evidence) | Verdict | Disposition |
|----|-----|--------------------------|--------------------------|---------|-------------|
| CR-1 | P1 | `git commit -am` in the F-14/F-15 plan drops NEW files (chain.md, builder dir, samples, HISTORY.md) | Confirmed by grep: 8 `commit -am` steps in the joint plan; Tasks 3/4/5/6 create new files; `-a` stages tracked modifications only (git semantics) | CONFIRMED | All commit steps in `implementation-plan_workflow-builder-and-chaining.md` now use explicit `git add <paths> && git commit -m`, with inline notes on the steps where new files made `-am` dangerous |
| CR-2 | P1 | Same staging defect in the F-12 plan: Batch 0a creates 14 new HISTORY.md files, then commits with `-am`, breaking AC-Q4 | Confirmed by grep: 3 `commit -am` steps; Step 1.4 creates HISTORY.md files | CONFIRMED | All three commit steps in `implementation-plan_skill-quality-convergence.md` now stage explicitly (`git add skills`, `git add scripts/...`) |
| CR-3 | P1 | The planned `commands/chain.md` body fails `validate-commands` because it contains no literal `skills/<name>/SKILL.md` path | Confirmed by reading `scripts/validate-commands.sh:11-15`: zero matches of `skills/[a-z0-9-]+/SKILL.md` means "no skill path found" and FAIL. The draft's only skill path was `references/PARSE-CONTRACT.md`, which does not match the regex | CONFIRMED | chain.md dispatch step now reads "Invoke the `utility-pm-workflow-orchestrator` skill from `skills/utility-pm-workflow-orchestrator/SKILL.md`"; spec 1.3 documents the validator requirement with the line citation |
| CR-4 | P1 | The shape-based chain boundary ("first token that is not skill-name-shaped") consumes lowercase context words as fake steps; the command also ends up owning parse authority | Confirmed by desk-check: "mobile checkout drop-off" tokens are name-shaped under the drafted rule, so the engine would refuse the run (fail-safe but wrong UX). Codex offered (a) raw pass-through to the engine or (b) an explicit `--` delimiter | CONFIRMED, fixed with a third option | **Separator-driven boundary** in the contract (and mirrored in chain.md + spec 1.2): the chain is exactly the separator-joined list; it ends after the first step token not followed by a separator; a trailing separator with nothing resolvable after it refuses. Rationale for deviating from both offered remedies: raw pass-through would move even SHAPE parsing into prose ambiguity, and a `--` delimiter adds syntax users will forget; the separator rule is deterministic, needs no new syntax, keeps the rule single-sourced in PARSE-CONTRACT.md, and preserves the authority split (command parses shape, engine validates names). Typo'd separator-joined names still reach the engine and refuse with suggestions, which is the desired behavior |
| CR-5 | P2 | `site/src/content/docs/reference/runtime-components.md` carries "65 skills, 10 slash commands" claims; the count sweeps in Tasks 4/7 omit it, so `check-count-consistency` fails before Task 8 touches the file | Confirmed by grep: runtime-components.md line 20 states "65 skills, 10 slash commands, 12 workflows, 27 enforcing CI validators"; the file is tracked, so the count validator's `git grep` scans it | CONFIRMED | Command count (10 -> 11) folded into Task 4.3/4.5; skill count (65 -> 66) folded into Task 7 files + 7.3; Task 8 keeps the structural rows only. Follow-on caught during the fix: the BUILDER's emitted cross-cutting checklist (spec 2.4) also needed a runtime-components row, since adding a workflow changes that page's "12 workflows" claim; row added |
| CR-6 | P2 | The plan calls the smoke test a "release acceptance gate" while the implementation plan ships on a recorded FAIL; contradiction | Confirmed by comparing my own texts (plan P-G vs joint impl Task 9.3 / spec section 4) | CONFIRMED | Resolved by adopting Codex's second option: the language is downgraded everywhere to a release EVIDENCE gate: the test must RUN and be RECORDED before the tag; a recorded FAIL keeps the EXPERIMENTAL label and is disclosed in release notes; only an UNRUN test blocks. Edited: plan P-G + sequencing item 3, spec D-D + section 4. Hard-blocking was rejected because it would couple the release to environment flakiness the EXPERIMENTAL label already governs |
| CR-7 | P2 | Batch 0a says "15 skills" but enumerates 14 | Confirmed by extraction: 14 unique `skills/<name>/SKILL.md` paths in the Task 1 list (9 collision/boundary + slideshow + 4 dispatch trims; the orchestrator is deliberately excluded and owned by F-15) | CONFIRMED | Heading and spec D-1 corrected to 14, with the composition spelled out in D-1 so the accounting is self-evident |

## Re-review (R2, same day)

A second adversarial pass over the corrected working tree (same mechanism and environment constraints) confirmed "the seven R1 fixes appear applied" and returned one new finding:

| ID | Sev | Codex claim (condensed) | Verification (evidence) | Verdict | Disposition |
|----|-----|--------------------------|--------------------------|---------|-------------|
| CR-8 | P1 | `.github/workflows/release.yml:38` hard-codes the old command count in the generated public release notes; `check-count-consistency` scans `.md`/`.mdx`/`.json` only, so the stale text ships past every planned validator | Confirmed by reading the file: line 38 reads "**Slash commands** (10 `/workflow-*` orchestrators; every skill invocable by name)". Nuance recorded: that literal phrase stays TRUE after `/chain` (chain is not a `workflow-*` orchestrator), so this is stale-by-omission messaging rather than a false count; the substantive point (validator-blind public surface omitting the new command) stands | CONFIRMED (with nuance) | Joint implementation plan Task 4 now includes `.github/workflows/release.yml` in its files, sweep instructions (update the bullet to name `/chain`, fix the adjacent " . " scar opportunistically), and the Step 4.5 staging list (revision R2 banner added) |

The R2 pass also generalizes CR-5: count or capability claims living OUTSIDE the validators' file-type scope (`.yml` templates, generated-at-tag surfaces) are a standing blind-spot class. Candidate structural fix noted for v2.27.0 planning alongside the derived-surfaces theme.

## Third pass (R3, same day)

A convergence pass confirmed CR-8 resolved for the `/chain` task itself and returned one finding completing that class:

| ID | Sev | Codex claim (condensed) | Verification (evidence) | Verdict | Disposition |
|----|-----|--------------------------|--------------------------|---------|-------------|
| CR-9 | P1 | The builder's emitted cross-cutting checklist (spec 2.4) omits `.github/workflows/release.yml`, so FUTURE workflow-command promotions reintroduce the CR-8 blind spot through the new tool's own output | Confirmed by construction (the R1/R2 edits added runtime-components but not release.yml to the 2.4 table). Sharper than CR-8 for this case: a new `workflow-*` command makes the template's "10 `/workflow-*` orchestrators" wording genuinely FALSE, not merely stale-by-omission | CONFIRMED | Spec 2.4 gains a release.yml row (marked validator-blind: the checklist IS the control); implementation plan Task 5.3 explicitly requires the row in the builder's TEMPLATE; R3 banners added |

CR-8 + CR-9 together close the class at both levels: the instance (this release's `/chain` sweep) and the template (every future promotion via the builder).

## Convergence

Pass 1: 7 findings (CR-1..CR-7). Pass 2: R1 fixes verified, 1 new (CR-8). Pass 3: CR-8 verified, 1 new (CR-9, the class-completion of CR-8). Pass 4 (thread `019eb33f-2e6f-...`): verdict **approve**, verbatim: "CR-9 is resolved. I found no defensible P1-severity issue remaining in the five v2.26.0 planning docs or the review record. No material findings." Loop closed per the repo's re-run-until-below-IMPORTANT protocol.

## What did not change

- The smoke test still must run before the tag (CR-6 changed the consequence of a FAIL, not the obligation to run).
- No scope, sequencing, or decision other than the P-G/D-D wording changed; the seven dispositions are corrections inside the already-approved-for-review shape.

## Residuals

- Codex recommended a re-review after corrections. Pending maintainer call; if run, prefer the adversarial mechanism with the same environment constraint until the sandbox shell issue (pwsh exit -1) is fixed, and consider `/codex:setup` to diagnose that issue separately.
- The native `/codex:review` stall pattern (2 for 2 in this environment) is worth a memory/tooling note independent of this release.

---

## Appendix: verbatim Codex findings

> # Codex Adversarial Review
>
> Target: working tree diff
> Verdict: needs-attention
>
> No-ship: the plans contain build-breaking command validation and git staging assumptions, plus a non-blocking smoke gate that contradicts the release plan.
>
> Findings:
> - [high] P1: New files will be omitted from the workflow-builder PR commits (docs/internal/release-plans/v2.26.0/implementation-plan_workflow-builder-and-chaining.md:103-176). Tasks create new files such as commands/chain.md, the utility-pm-workflow-builder skill files, samples, and HISTORY.md, but the commit steps use git commit -am. That stages modifications to tracked files only, so the core new command/skill/sample files can be left out of the commit while later docs and counts refer to them. Recommendation: Use git add -A before every commit that creates files, or replace those commit commands with explicit git add paths followed by git commit -m.
> - [high] P1: F-12 HISTORY files will not be committed (docs/internal/release-plans/v2.26.0/implementation-plan_skill-quality-convergence.md:23-61). Task 1 explicitly creates HISTORY.md in each bumped skill directory, but the commit command is git commit -am. That directly violates AC-Q4 and can make validate-skill-history fail in CI. Recommendation: Change the Batch 0a commit step to git add -A && git commit -m, or explicitly git add every modified SKILL.md and new HISTORY.md before committing.
> - [high] P1: /chain as specified fails validate-commands (docs/internal/release-plans/v2.26.0/implementation-plan_workflow-builder-and-chaining.md:107-139). The planned commands/chain.md body never includes a literal skills/<name>/SKILL.md reference. The repo's validate-commands.sh requires every command file to contain at least one skills/.../SKILL.md path and fails otherwise. Recommendation: Add an explicit line such as "Use the utility-pm-workflow-orchestrator skill from skills/utility-pm-workflow-orchestrator/SKILL.md" to commands/chain.md.
> - [high] P1: /chain parsing will consume common lowercase context as fake skill steps (docs/internal/release-plans/v2.26.0/spec_workflow-builder-and-chaining.md:101-103). After flags are stripped, a normal lowercase context like "mobile checkout drop-off" is skill-name-shaped, so the parser can treat context words as additional steps and the engine will refuse the whole run. This also means the command is owning part of the parse contract instead of letting the orchestrator be the single parse authority. Recommendation: Either pass raw arguments to the orchestrator and let it parse against installed skill names, or require an explicit context delimiter such as -- before free-form context.
> - [medium] P2: Count sweep omits runtime-components before running count validation (docs/internal/release-plans/v2.26.0/implementation-plan_workflow-builder-and-chaining.md:137-183). That existing page currently has total claims for 65 skills and 10 slash commands, so the validator can fail before Task 8 later touches the file. Recommendation: Include site/src/content/docs/reference/runtime-components.md in the same count-sweep task that first changes command and skill counts.
> - [medium] P2: Smoke gate is called release acceptance but allowed to fail and ship (docs/internal/release-plans/v2.26.0/plan_v2.26.0.md:45-66). Recommendation: Make a failed live smoke test block the /chain release or explicitly downgrade the plan language from acceptance gate to non-blocking evidence record.
> - [medium] P2: Batch 0 says 15 description rewrites but enumerates 14 skills (docs/internal/release-plans/v2.26.0/implementation-plan_skill-quality-convergence.md:21-27). Recommendation: Correct the task heading and any downstream wording to 14 skills, or add the missing fifteenth skill path if the intent really is 15.
>
> Next steps:
> - Fix the build-blocking plan commands before implementation starts.
> - Re-run review after the planning docs are corrected.

## Appendix B: verbatim re-review finding (R2)

> # Codex Adversarial Review
>
> Target: working tree diff
> Verdict: needs-attention
>
> No-ship: the seven R1 fixes appear applied, but a validator-blind public release-note count surface will still ship stale `/chain` messaging.
>
> Findings:
> - [high] P1: Release notes still hard-code the old command count outside the planned sweep (.github/workflows/release.yml:38). The R1 count sweeps cover README/QUICKSTART/AGENTS/runtime-components, but the tag workflow generates public GitHub release notes from this YAML template and still says there are 10 slash commands. After `/chain` lands there will be 11 command files, and `check-count-consistency` scans tracked `.md`, `.mdx`, and `.json` files, so this YAML count can pass the planned validators while publishing stale release notes that omit the new command surface. Recommendation: Add `.github/workflows/release.yml` to the Task 4 command-count sweep, or derive the generated release notes from a checked source, and update the generated text to mention 11 slash commands including `/chain`.
>
> Next steps:
> - Update the workflow-builder/chaining implementation plan so the `/chain` command-count sweep includes the release-note template before tagging.
