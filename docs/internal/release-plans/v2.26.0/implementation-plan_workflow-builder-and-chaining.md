# Workflow Builder + Ad-Hoc Chaining (F-14 + F-15) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Spec: [`spec_workflow-builder-and-chaining.md`](spec_workflow-builder-and-chaining.md) - read it first; section references below are normative.

**Goal:** Ship `/chain` (productized Mode B) and `utility-pm-workflow-builder` as one squash-merged PR, catalog 65 -> 66, with the orchestrator native-path smoke gate recorded.

**Architecture:** No new runtime. F-15 adds a thin command front door plus a chain-expression contract section consumed by the existing `pm-workflow-orchestrator`; F-14 adds an authoring skill that applies the same contract at authoring time and writes packets to `_staging/`. One branch, one PR, because the two features cross-reference each other by name (atomic landing avoids shipping a phantom reference in either direction).

**Tech stack:** Markdown skill/command/contract files only; the repo's enforcing validators are the test suite. No new executable code.

**Repo hard rules:** no em-dash or en-dash characters anywhere; main is linear history (squash-merge the PR); a local ALL CHECKS PASSED is necessary but not sufficient (CI builds the Astro site and checks rendered links; let CI run).

**Revision R1 (2026-06-10):** Codex adversarial review findings applied; per-finding trace in [`review_2026-06-10_codex-adversarial.md`](review_2026-06-10_codex-adversarial.md). In this file: every commit step now stages explicitly (CR-1), `commands/chain.md` carries a literal `skills/<name>/SKILL.md` reference (CR-3), the chain boundary is separator-driven (CR-4), and `runtime-components.md` count claims joined the Task 4 + Task 7 sweeps (CR-5).
**Revision R2 (2026-06-10):** re-review finding applied: the release-note template `.github/workflows/release.yml` (a validator-blind YAML surface) joins the Task 4 command sweep so the public release notes mention `/chain` (CR-8).
**Revision R3 (2026-06-10):** third-pass finding applied: the builder's TEMPLATE checklist requirement now explicitly carries the release.yml row so future workflow promotions cannot reintroduce the CR-8 class (CR-9; spec 2.4 row added).

---

### Task 0: Branch

- [x] **Step 0.1:** `git -C E:\Projects\product-on-purpose\pm-skills status` - expect clean on main. `git pull --ff-only`, confirm `v2.25.2` is the latest tag (`git describe --tags --abbrev=0`).
- [x] **Step 0.2:** `git switch -c feat/v2.26.0-workflow-builder-and-chain`

### Task 1: Chain-expression contract (PARSE-CONTRACT.md)

**Files:** Modify: `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` (insert a new H2 after "## Mode A Section 7 Parse Contract" block ends, before "## Top-3 Runnable Cap" is acceptable; preferred placement: after the "## Overall Plan Confidence Extraction (Mode A)" section so Mode A material stays contiguous).

- [x] **Step 1.1: Add the section.** Insert exactly this content (it cross-references rather than restates existing rules, per AC-C7's single-source requirement):

```markdown
## Mode B Chain Expression Contract

A Mode B chain may arrive as prose ("run deliver-prd then deliver-user-stories") or as a chain
expression (the `/chain` command's input form). The expression grammar:

- **Steps:** an ordered list of skill names separated by `,` or `->`. The two separators are
  equivalent and may be mixed. Order on the line is execution order.
- **Boundary (separator-driven):** the chain expression is exactly the separator-joined list:
  it ends after the first step token that is NOT followed by a separator. Everything after that
  is the shared context, even when the context words look like skill names (the boundary comes
  from separators, never from token shape). A separator PROMISES another step: a trailing
  separator with nothing resolvable after it is a parse refusal, surfaced plainly, never
  guessed around.
- **Flags:** `--auto`, `--force-auto`, `--dry-run`, and `--thread` may appear anywhere in the
  input; extract them before parsing steps and apply them per the engine's run-mode rules.
- **Context:** everything after the chain expression (per the boundary rule above) is the shared context handed to every step.
- **Name resolution:** each step must exactly match an installed skill
  (`skills/<name>/SKILL.md`). Name-safety applies: never approximate or auto-correct. On any
  miss, refuse the WHOLE run pre-flight and OFFER the closest real names (for example `prd` ->
  "did you mean `deliver-prd`?"). A suggestion is an offer, never a substitution.
- **`--thread` (user-declared linear dependency):** opt-in. With `--thread`, step N+1 receives a
  reference to step N's confirmed artifact, per the engine's user-declared dependency rule.
  Without it, every step is self-sufficient given the shared context. `--thread` covers the
  whole chain; per-step threading granularity does not exist in v1.
- **Unchanged rules (cross-references, not duplicates):** the Tier-3 maintenance refusal and
  self-reference refusal above; Mode B skill resolution and the Category 1/2/3 routing rule in
  `agents/pm-workflow-orchestrator.md`; no top-3 cap in Mode B, with the context-budget warning
  past 3 steps; GUARDED AUTO degrades to CHECKPOINTED for Mode B unless `--force-auto`.
```

- [x] **Step 1.2: Verify.** Run: `node scripts/check-frontmatter-yaml.mjs --site-docs` and `node scripts/check-emdash-scars.mjs`. Expected: both pass (the new text contains no scar patterns, no dash characters).
- [x] **Step 1.3: Commit.** `git add -A && git commit -m "feat(orchestrator): add Mode B chain expression contract (F-15)"`

### Task 2: Engine edits (`agents/pm-workflow-orchestrator.md`)

**Files:** Modify: `agents/pm-workflow-orchestrator.md` (two precise edits; nothing else changes).

- [x] **Step 2.1: Name the threading flag.** In the "State passing and disk-write" section, replace the sentence fragment `they request it explicitly (a flag or chain syntax); you then pass the prior artifact as a reference.` with `they request it explicitly with the --thread flag (see the Mode B Chain Expression Contract in PARSE-CONTRACT.md); you then pass the prior artifact as a reference.`
- [x] **Step 2.2: Promotion suggestion.** In the "Terminal outputs" full-completion block, inside `**Next steps:**`, add this bullet after the `utility-pm-critic` line:

```markdown
- Mode B chains of 2+ steps: reusable? Promote it to a durable workflow with `utility-pm-workflow-builder` (hand it this exact chain: {the chain expression})
```

- [x] **Step 2.3: Verify + commit.** Run `node scripts/check-emdash-scars.mjs` (pass) and `bash scripts/check-skill-cross-references.sh` (pass; `utility-pm-workflow-builder` is backticked in an agents/ file, which the validator does not scan, and the skill lands in Task 5 within the same PR regardless). Commit: `git add agents/pm-workflow-orchestrator.md && git commit -m "feat(orchestrator): name --thread and add chain promotion suggestion (F-15)"`

### Task 3: Dispatch skill bump (`utility-pm-workflow-orchestrator` 1.0.0 -> 1.1.0)

**Files:** Modify: `skills/utility-pm-workflow-orchestrator/SKILL.md`. Create: `skills/utility-pm-workflow-orchestrator/HISTORY.md`.

- [x] **Step 3.1: Frontmatter.** Set `metadata.version: "1.1.0"` and `metadata.updated: 2026-06-<merge-date>`. Replace the description with this exact text (owned here, NOT by F-12 Batch 0, to avoid a double bump; spec 1.4):

```text
Run an ordered sequence of pm-skills against one input, pausing for go/no-go and stopping on a failed or empty step. Accepts a saved prioritized action plan (Mode A) or an ad-hoc named chain (Mode B; the chain command routes here). Explicit invocation only; run --dry-run first while the native path is EXPERIMENTAL. To author a durable workflow instead, use utility-pm-workflow-builder.
```

- [x] **Step 3.2: Body.** In "When to Use," extend the Mode B bullet with: `On Claude Code, the /chain command is the terse front door for this mode.` In the run-modes prose, add one sentence after the GUARDED AUTO paragraph: `--thread declares a linear dependency so each step receives the prior step's confirmed artifact; see the Mode B Chain Expression Contract in references/PARSE-CONTRACT.md.` Keep the client-routing mechanics in the body (they move OUT of the description only).
- [x] **Step 3.3: HISTORY.md.** Create with a summary table and two version sections:

```markdown
# utility-pm-workflow-orchestrator - History

| Version | Date | Type | Summary |
|---------|------|------|---------|
| 1.1.0 | 2026-06-<merge-date> | minor | Mode B chain expression contract, /chain front door, --thread flag, promotion suggestion |
| 1.0.0 | 2026-06-01 | initial | Dispatch skill for the pm-workflow-orchestrator sub-agent (v2.24.0) |

## 1.1.0

- Documented the Mode B chain expression grammar (references/PARSE-CONTRACT.md) and the /chain command front door.
- Named the user-declared dependency flag --thread.
- Completion output now suggests promoting a reusable 2+ step chain to utility-pm-workflow-builder.
- Description rewritten to lead with triggers and boundaries; client-routing mechanics stay in the body.

## 1.0.0

- Initial release with v2.24.0: cross-client dispatch for Mode A (saved prioritized action plan) and Mode B (user-named chain) runs.
```

- [x] **Step 3.4: Verify.** Run: `bash scripts/lint-skills-frontmatter.sh` (expect `✓ skills/utility-pm-workflow-orchestrator/SKILL.md`; description is 20-100 words with no unquoted ": ") and `bash scripts/validate-skill-history.sh` (expect `✓ ... current version 1.1.0 found in the summary table`).
- [x] **Step 3.5: Commit.** `git add skills/utility-pm-workflow-orchestrator && git commit -m "feat(orchestrator): bump dispatch skill to 1.1.0 with chain front door + HISTORY"` (explicit add: HISTORY.md is a NEW file; `commit -am` would silently drop it)

### Task 4: `/chain` command

**Files:** Create: `commands/chain.md`. Modify: `AGENTS.md` (command list), `QUICKSTART.md` (command count), `README.md` (one introduction sentence), `site/src/content/docs/reference/runtime-components.md` (command count), `.github/workflows/release.yml` (release-note template).

- [x] **Step 4.1: Create `commands/chain.md`** with exactly:

```markdown
---
description: Run an ad-hoc ordered chain of pm-skills with shared context (ephemeral; routes to the pm-workflow-orchestrator)
---

Run an ad-hoc chain of pm-skills in the order given, passing the shared context to every step.

## Parse the input

`$ARGUMENTS` carries a chain expression followed by free-form context.

1. Extract flags first, wherever they appear: `--auto`, `--force-auto`, `--dry-run`, `--thread`.
2. The chain expression is exactly the leading separator-joined list of skill names (`,` and `->` equivalent; mixing allowed). It ends after the first name that is NOT followed by a separator; everything after that is the context, even when the context words look like skill names. A trailing separator with nothing after it is an error to surface, not to guess around.
3. Everything after the chain expression is the context. This command parses the BOUNDARY only; all skill-name validation belongs to the engine.

Examples: `/chain define-problem-statement -> define-hypothesis --thread Mobile checkout drop-off` runs two steps with `--thread`, context "Mobile checkout drop-off". Lowercase context is fine: `/chain deliver-prd, deliver-user-stories mobile checkout redesign` is two steps with context "mobile checkout redesign" (the boundary is the missing separator after `deliver-user-stories`, not the letter case).

## Confirm and dispatch

1. Restate in one line: the parsed steps in order, the flags, and the context.
2. Invoke the `utility-pm-workflow-orchestrator` skill from `skills/utility-pm-workflow-orchestrator/SKILL.md` with that chain, context, and flags (a Mode B run). The engine validates every name pre-flight and owns all run rules; this command adds none. The grammar lives in `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` (Mode B Chain Expression Contract).
3. Relay the engine's per-step blocks and terminal output, including the promotion suggestion for reusable chains.

Nothing is persisted beyond the engine's own gitignored run artifacts. To make a chain durable, follow the completion suggestion to `utility-pm-workflow-builder`. While the native engine path is EXPERIMENTAL, recommend `--dry-run` first.

Context from user: $ARGUMENTS
```

- [x] **Step 4.2: AGENTS.md.** Add `/chain` to the commands list with one line ("ad-hoc ordered chain of skills; routes to the orchestrator's Mode B"), keeping the existing list format.
- [x] **Step 4.3: Count-claim sweep (commands 10 -> 11 files).** `QUICKSTART.md` line "10 slash-command docs in `commands/` (the 10 `/workflow-*` orchestrator commands)" becomes "11 slash-command docs in `commands/` (the 10 `/workflow-*` orchestrator commands plus `/chain`)". `site/src/content/docs/reference/runtime-components.md` line ~20 ("65 skills, 10 slash commands, ...") gets its command count updated to 11 HERE, in the same commit that adds the command, so `check-count-consistency` is green at this gate rather than waiting for Task 8 (CR-5). README phrasings that say "10 `/workflow-*` orchestrator commands" remain TRUE and stay; append "and the `/chain` ad-hoc runner" where the Quick Start enumerates what an install provides (README line ~115). Add one short README paragraph in the Workflows section introducing `/chain` + the builder (spec section 3). VALIDATOR-BLIND SURFACE (review CR-8): `.github/workflows/release.yml` line ~38 generates the public GitHub release notes and its "Slash commands (10 `/workflow-*` orchestrators; every skill invocable by name)" bullet would silently omit `/chain`; `check-count-consistency` scans `.md`/`.mdx`/`.json` only, so no validator catches YAML. Update that bullet to "(10 `/workflow-*` orchestrators plus the `/chain` ad-hoc runner; every skill invocable by name)" in this same commit, and fix the " . " scar on its ZIP line while in the file.
- [x] **Step 4.4: Verify.** Run, expecting pass on each: `bash scripts/validate-commands.sh`; `bash scripts/check-agents-md-command-sync.sh`; `bash scripts/check-count-consistency.sh` (command count now 11; any stale "10 command" claim it flags gets fixed before proceeding); `node scripts/check-root-doc-links.mjs`.
- [x] **Step 4.5: Commit.** `git add commands/chain.md AGENTS.md QUICKSTART.md README.md site/src/content/docs/reference/runtime-components.md .github/workflows/release.yml && git commit -m "feat(chain): add /chain command routing to orchestrator Mode B (F-15, #134)"` (explicit add: chain.md is NEW)

### Task 5: Builder skill (`utility-pm-workflow-builder`)

**Files:** Create: `skills/utility-pm-workflow-builder/SKILL.md`, `skills/utility-pm-workflow-builder/references/TEMPLATE.md`, `skills/utility-pm-workflow-builder/references/EXAMPLE.md`.

- [x] **Step 5.1: SKILL.md frontmatter** exactly:

```yaml
---
name: utility-pm-workflow-builder
description: Guides a contributor from a workflow idea to a complete Workflow Implementation Packet (draft workflow file, draft workflow command, cross-cutting update checklist) in a staging area for review. Runs overlap analysis against the existing workflows with a Why Gate, then helps select and sequence skills with authored handoffs. Use when creating a new multi-skill workflow or promoting a repeated ad-hoc chain into a durable one. To build a single skill instead, use utility-pm-skill-builder; to run a sequence without authoring anything, use the chain command or utility-pm-workflow-orchestrator.
license: Apache-2.0
metadata:
  classification: utility
  version: "1.0.0"
  updated: 2026-06-<merge-date>
  category: workflow
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

- [x] **Step 5.2: SKILL.md body.** Author to spec sections 2.2 (five-step flow with the Why Gate and >70% kill gate verbatim), 2.3 (generated-file contract), 2.4 (cross-cutting checklist table, reproduced as the packet's checklist source). Required H2 inventory: `When to Use`, `When NOT to Use`, `Instructions` (Steps 1-5 as H3s), `Output Format` (points to references/TEMPLATE.md), `Quality Checklist`, `Reference Files`. Binding behaviors that must appear verbatim or equivalent: staging-only writes (`_staging/workflows/<name>/`, never canonical paths); overlap scan reads the `_workflows/` directory at run time (never a hardcoded count or list); step validation refuses Tier-3 maintenance skills, dispatch skills, and workflows as steps (Category 1 content skills only) and applies exact-match name-safety with suggestions; chain-promotion entry accepts a literal chain expression; mermaid context-flow auto-derived from the final sequence; the builder never edits cross-cutting files itself (checklist only). Body line target under 300 (lint has no cap, but spec guidance applies).
- [x] **Step 5.3: references/TEMPLATE.md** = the Workflow Implementation Packet template. Required H2s (lint needs 3+): `## Decision` (recommendation + Why Gate evidence), `## Overlap Analysis`, `## Workflow Draft` (embedding the full `_workflows/<name>.md` skeleton from spec 2.3: title frontmatter, H1, tagline blockquote, Workflow Metadata table with the seven fields, When to Use / Do NOT use, per-step Skill link + What you do + Input requirements + Output, mermaid context flow, Tips, Quality Checklist, See Also), `## Command Draft` (the `commands/workflow-<name>.md` skeleton mirroring `commands/workflow-sprint-planning.md`), `## Cross-Cutting Checklist` (the spec 2.4 table IN FULL, explicitly including the `.github/workflows/release.yml` release-note row: that surface is validator-blind, so the emitted checklist is the only control that keeps generated release notes truthful when a workflow command is promoted; review CR-9), `## Promotion Steps`.
- [x] **Step 5.4: references/EXAMPLE.md** = one complete worked packet for the scenario in spec 2.3 (a `quarterly-business-review` workflow). Completeness bar: every TEMPLATE section filled with realistic content, zero bracketed scaffolding (the engine's EMPTY rubric is the inspiration: an example with unfilled `[ guidance ]` would be a defect), the workflow draft showing a real 4-step sequence with authored handoffs and a real mermaid block.
- [x] **Step 5.5: Verify.** Run: `bash scripts/lint-skills-frontmatter.sh` (expect `✓ skills/utility-pm-workflow-builder/SKILL.md`; confirms description word count, license, metadata nesting, TEMPLATE 3+ H2s, EXAMPLE present, byte-0); `bash scripts/check-skill-cross-references.sh` (all backticked skill names in the new files resolve); `node scripts/check-root-doc-links.mjs` (relative links from the new SKILL.md resolve); `node scripts/check-emdash-scars.mjs`.
- [x] **Step 5.6: Commit.** `git add skills/utility-pm-workflow-builder && git commit -m "feat(builder): add utility-pm-workflow-builder skill (F-14, #133)"` (explicit add: the whole directory is NEW)

### Task 6: Builder library samples (3 threads)

**Files:** Create three samples under `library/skill-output-samples/utility-pm-workflow-builder/` following the existing per-skill directory pattern (check `library/skill-output-samples/utility-pm-skill-builder/` first and mirror its file naming exactly; the three threads are storevine, brainshelf, workbench per `library/skill-output-samples/THREAD_PROFILES.md`).

- [x] **Step 6.1:** Author one Workflow Implementation Packet per thread (Storevine: an email-campaign-launch workflow; Brainshelf: a digest-experiment-loop workflow; Workbench: an enterprise-rollout-review workflow), each consistent with its thread profile and complete per the EXAMPLE bar.
- [x] **Step 6.2: Verify.** Run: `bash scripts/check-skill-sample-coverage.sh` (pass; utility class is exempt so this cannot fail, but the samples must not break the sample-side byte-0 lint in `lint-skills-frontmatter.sh` W3.5) and `node scripts/check-sample-no-placeholders.mjs` (advisory; expect zero findings for the new files).
- [x] **Step 6.3: Commit.** `git add library/skill-output-samples/utility-pm-workflow-builder && git commit -m "docs(samples): 3-thread samples for utility-pm-workflow-builder"` (explicit add: new directory)

### Task 7: Catalog count sweep (65 -> 66, utility 11 -> 12)

**Files:** Modify: `README.md` (headline line 7, badge line 26, Quick Start line 115, library section line ~361, install lines ~463/471, project-status lines ~1058/1070), `QUICKSTART.md` (lines 5 and 74), `CLAUDE.md` (Project Context), `.claude-plugin/plugin.json` (description lead), `.claude-plugin/marketplace.json` (plugin description lead), `.codex-plugin/plugin.json` (`interface.longDescription`), `site/src/content/docs/index.mdx` (headline, description frontmatter, Utility card, "Utility (10)" prose line - which workstream WS-A has already corrected to 11 before this branch; this task takes it to 12 and appends `utility-pm-workflow-builder` to the utility blurb), `AGENTS.md` (utility section entry + any utility-count phrasing), `site/src/content/docs/reference/runtime-components.md` (the "65 skills" claim on its content-library line goes to 66; its command count was already updated in Task 4).

- [x] **Step 7.1:** Apply the sweep. Every "65" catalog claim becomes 66; every "11 utility" becomes 12; breakdowns read "30 phase + 9 foundation + 12 utility + 15 tool".
- [x] **Step 7.2: Verify.** Run, expecting pass: `bash scripts/check-count-consistency.sh`; `bash scripts/check-landing-page-counts.sh --strict`; `bash scripts/validate-agents-md.sh`; `bash scripts/validate-codex-manifest.sh`.
- [x] **Step 7.3: Commit.** `git add README.md QUICKSTART.md CLAUDE.md AGENTS.md .claude-plugin .codex-plugin site/src/content/docs/index.mdx site/src/content/docs/reference/runtime-components.md && git commit -m "docs(catalog): count sweep 65 -> 66 for utility-pm-workflow-builder"`

### Task 8: Runtime-component + reference docs

**Files:** Modify: `site/src/content/docs/reference/runtime-components.md` (add `/chain` and builder rows + the spec 0.3 boundary table), `site/src/content/docs/reference/sub-agent-compatibility.md` (placeholder row note pending Task 9's result).

- [x] **Step 8.1:** Apply the spec section 3 doc updates.
- [x] **Step 8.2: Verify.** `node scripts/check-frontmatter-yaml.mjs --site-docs` (pass); `npm --prefix site run build` locally if feasible (CI builds it regardless; remember the lesson that only CI fully proves rendered links).
- [x] **Step 8.3: Commit.** `git add site/src/content/docs/reference && git commit -m "docs(reference): runtime components + compatibility rows for chain and builder"`

### Task 9: Smoke gate (D-D; human + Claude)

> **Status (2026-06-10, later same day): RUN AND RECORDED, PASS.** Executed headlessly against the installed plugin (pm-skills@pm-skills-marketplace tracking main) from a scratch directory: dry-run PASS, live 2-step run PASS with both artifacts PRODUCED, Skill-tool delegation confirmed, downstream skills execute INLINE in the engine context. Full record + caveats in the compatibility matrix. Steps 10.4-10.5 of this plan completed at PR #191; the smoke record landed in its own follow-up PR.

**Files:** Modify (with results): `site/src/content/docs/reference/sub-agent-compatibility.md`, `skills/utility-pm-workflow-orchestrator/SKILL.md` (status block).

- [x] **Step 9.1:** In a Claude Code session with the pm-skills plugin installed from this branch (local marketplace add pointing at the working tree, or `/plugin install` after pushing the branch), run: `/chain define-problem-statement -> define-hypothesis --dry-run <toy context>`. Expected: two "NOT EXECUTED - dry run" step blocks via the native sub-agent.
- [x] **Step 9.2:** Run the same chain live (no `--dry-run`). Record: did the engine invoke downstream skills via the `Skill` tool; did steps run inline or isolated; artifacts produced.
- [x] **Step 9.3:** Record the outcome in the compatibility matrix row and the dispatch skill's status block. On PASS: remove the native-path EXPERIMENTAL caveat for Mode B chains (keep non-Claude EXPERIMENTAL). On FAIL: keep EXPERIMENTAL, record the failure mode verbatim, and ship anyway (spec section 4 risk posture).
- [x] **Step 9.4: Commit.** `git add site/src/content/docs/reference/sub-agent-compatibility.md skills/utility-pm-workflow-orchestrator/SKILL.md && git commit -m "docs(compat): record orchestrator native-path smoke result"`

### Task 10: Full gauntlet, PR, merge

- [ ] **Step 10.1:** Run the full local pre-tag bundle on BOTH shells: `bash scripts/pre-tag-validate.sh` and `pwsh -File scripts/pre-tag-validate.ps1`. Expected: ALL CHECKS PASSED twice.
- [ ] **Step 10.2:** Update `CHANGELOG.md` `[Unreleased]`: Added - `/chain` command + Mode B chain expression contract (F-15, #134); Added - `utility-pm-workflow-builder` skill with 3-thread samples (F-14, #133); Changed - `utility-pm-workflow-orchestrator` 1.1.0 (`--thread`, promotion suggestion, description rewrite). Public paths only.
- [ ] **Step 10.3:** Push and open the PR: `git push -u origin feat/v2.26.0-workflow-builder-and-chain && gh pr create --title "feat: workflow builder + /chain ad-hoc chaining (F-14 + F-15)" --body "<summary + spec link + closes #133, closes #134>"`. Body references `docs/internal/release-plans/v2.26.0/spec_workflow-builder-and-chaining.md` (tracked path, fine for a PR body).
- [ ] **Step 10.4:** Wait for CI; verify ACTUAL check conclusions via `gh pr checks` (never trust the watcher exit code). All four legs green (validate ubuntu + windows, CodeQL, Analyze).
- [ ] **Step 10.5:** Squash-merge (`gh pr merge --squash --delete-branch`), sync local main. The v2.26.0 release tag itself comes later via the 6-gate runbook once F-12 Batch 0 + Batch 1 land (see `plan_v2.26.0.md` sequencing).

---

## Self-review notes (writing-plans checklist applied)

- Spec coverage: AC-C1..C9 map to Tasks 1-4 + 9; AC-B1..B9 map to Tasks 5-8; spec section 3 docs map to Tasks 4/7/8. The smoke gate (D-D) is Task 9. No spec requirement lacks a task.
- Placeholder scan: authoring tasks (5.2-5.4, 6.1) intentionally carry content REQUIREMENTS plus completeness gates instead of inlined hundred-line prose drafts; the binding text for every small artifact (contract section, command file, description, HISTORY, frontmatter) is inlined verbatim above.
- Name consistency: `utility-pm-workflow-builder`, `--thread`, "Mode B Chain Expression Contract" are used identically in spec and plan.
- R1 review pass: all `git commit -am` steps replaced with explicit staging (new files were droppable); chain.md now satisfies `validate-commands.sh:12` (literal SKILL.md path present); the boundary grammar is separator-driven end to end (contract, command body, spec); runtime-components.md count claims are updated at the same commits that change the counts.
