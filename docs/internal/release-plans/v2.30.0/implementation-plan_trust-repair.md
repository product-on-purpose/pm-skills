# Implementation Plan: Trust repair + hygiene (v2.30.0, M-35) - DRAFT for review

Companion to [`plan_v2.30.0.md`](plan_v2.30.0.md) (workstreams, decisions, release surfaces A-J, exit criteria) and [`spec_trust-repair.md`](spec_trust-repair.md) (REQ-IDs, file:line evidence, acceptance criteria, Durable CI blocks). Workstream IDs (WS-T1 count-truth sweep + phrase gate, WS-T2 packaging integrity, WS-T3 builder inventory, WS-T4 cross-client truth, WS-T5 marketplace pinning, WS-T6 governance guardrails, WS-T7 hook correctness, WS-T8 content mesh + skeleton canon, WS-T9 dual-shell containment, WS-T10 eval roster externalization, WS-T11 hygiene batch, WS-T12 internal-docs visibility) are defined there; this doc sequences the build, does not restate requirements, and does not re-derive the underlying 2026-07-04 deep audit (maintainer-local, gitignored) findings.

Effort: M-35 (trust repair sweep). Built on a feature branch off `main`, squash-merged PR by PR per the linear-history convention. Nothing stages in `_staging/`; edits land at their real repo locations on each branch.

---

## 1. Task order (phased build sequence)

Phase 0 is the only hard serial gate. Three plan decisions must be ruled because they fix a downstream workstream's shape: TD-3 (marketplace ref pinning) fixes WS-T5's timing, TD-4 (heading-normalization bump policy) fixes WS-T8's bump policy, and TD-5 (tool-family versioning) fixes WS-T11's tool-family bump. One audit decision blocked a whole workstream: D-3 (internal-docs visibility), ruled option B on 2026-07-04, so WS-T12 runs as PR-15. TD-1 (release version bump), TD-2 (Gemini CLI claim), D-5 (the MCP wording), and D-6 (the roadmap re-commit session) are also settled in Phase 0 per the plan, but they only confirm wording or schedule a follow-up, they do not block any other workstream's start. After Phase 0's gating decisions land, most workstreams are file-disjoint and parallel-safe; two internal serial chains exist because they share files.

| Phase | Workstreams | Parallel? | Why |
|---|---|---|---|
| 0 | Decisions + tracking issue | Serial, blocks all | Gates WS-T5 (TD-3), WS-T8 (TD-4), WS-T11 (TD-5), WS-T12 (D-3) |
| 1 | WS-T1 instances then WS-T1 gate; WS-T3 | WS-T3 parallel to WS-T1; WS-T1's own two halves are serial | The gate proves the fix, so instances land before the gate script's advisory step is added |
| 2 | WS-T2; WS-T4 | Fully parallel | Disjoint files (packaging scripts vs. site/agents docs), different agents |
| 3 | WS-T7; WS-T8a+c then WS-T8b+d then WS-T8e+f | WS-T7 parallel to WS-T8; WS-T8's three PRs are serial | `discover-journey-map` and `define-opportunity-tree` are edited by both WS-T8a (WNTU) and WS-T8e (description rewrite) for ONE combined bump (see Section 4); WS-T8a must merge first |
| 4 | WS-T9; WS-T10; WS-T11 (bump half); WS-T11 (hygiene half) | Fully parallel | All codex-owned, no shared files even between WS-T11's own two halves |
| 5 | WS-T6; WS-T12 (D-3 ruled B, executes) | Parallel to phases 1-4 | Off-repo admin actions plus the internal-docs move; no file coupling with phases 1-4 |
| 6 | Regen | Serial, after every content PR merges | Derived surfaces must read the final frontmatter/file state |
| 7 | Surface sweep (A-J) + WS-T5 pin + version bump + promote `check-count-phrases` to enforcing | Serial, one release-prep PR | Needs the complete, regenerated tree to sweep correctly |
| 8 | G1 Codex adversarial review (`--base v2.29.1`) | Serial, after Phase 7 | Reviews the complete diff, workstreams plus sweep, in one pass |
| 9 | Pre-tag bundle both shells + equivalence smoke | Serial | Final gate before commit/tag |
| 10 | Tag, release, repin, flip SHIPPED | Serial | G3 + G4 |

Parallel workstreams may run as separate agent sessions or branches and merge in any order within their phase; only the two chains above (WS-T1 instances before gate; WS-T8a before WS-T8b before WS-T8e) are hard blockers.

**Branch strategy.** Each PR gets its own short-lived branch off `main` (`trust-repair/ws-t2-packaging`, `trust-repair/ws-t8b-heading-canon`, and so on); an agent working a parallel-safe PR does not need to wait for a sibling branch to merge first, only for its own `depends-on` PR (Section 2). Rebase onto `main` immediately before opening the PR so the diff is reviewed against current `main`, not a stale fork point, this matters most for PR-8 and PR-9, which both touch files PR-7 also edits (`discover-journey-map/SKILL.md`, `define-opportunity-tree/SKILL.md`).

## 2. PR breakdown (14 squash PRs)

One theme per PR; the mechanical sweeps (heading normalization, tool-family bump) each get their own PR rather than riding inside a design PR.

| PR | Title | WS | Agent | Must be green | Depends on |
|---|---|---|---|---|---|
| 1 | `chore(v2.30.0): open M-35 tracking issue and ratify Phase 0 decisions` | Phase 0 | agent:human | none (decision record only) | none |
| 2 | `fix(counts): sweep count and phrase drift, derive utility-pm-skill-builder inventory` | WS-T1 (instances), WS-T3 | agent:claude | `lint-skills-frontmatter`, `check-count-consistency`, `gen-skill-manifest --check` | PR-1 |
| 3 | `feat(ci): add check-count-phrases.mjs advisory gate` | WS-T1 (gate) | agent:codex | `node --test scripts/check-count-phrases.test.mjs`, both OS legs | PR-2 |
| 4 | `fix(packaging): stage agents/ and hooks/ in the release zip, exclude docs/internal` | WS-T2 | agent:codex | new zip-stage assertions in `validate-plugin.yml`; existing 50 MB size check | PR-1 |
| 5 | `docs(cross-client): fix sub-agent, platform, and ecosystem count and path drift` | WS-T4 | agent:claude | `check-root-doc-links`, `check-rendered-links`, `check-route-parity` | PR-1 |
| 6 | `fix(hooks): honor the phase_router opt-out and tighten the fabricated-metric regex` | WS-T7 | agent:codex | `node --test hooks/phase-router.test.mjs hooks/guardrails.test.mjs hooks/lib/local-config.test.mjs`, both legs | PR-1 |
| 7 | `feat(skills): add When NOT to Use backfill and the skill-authoring skeleton canon` | WS-T8a, WS-T8c | agent:claude | `check-reciprocal-boundary-pointers`, `lint-skills-frontmatter` | PR-1 |
| 8 | `fix(skills): normalize headings to canon spelling, add check-heading-canon.mjs` | WS-T8b, WS-T8d | agent:claude | `node --test scripts/check-heading-canon.test.mjs`; `lint-skills-frontmatter` | PR-7 |
| 9 | `feat(skills): rewrite Batch 5 descriptions, dedupe okr-grader and prioritization-framework` | WS-T8e, WS-T8f | agent:claude | `check-new-skill-collision` re-run per rewritten skill; `lint-skills-frontmatter` | PR-7 |
| 10 | `chore(ci): freeze new dual-shell validator pairs, externalize the trigger-eval roster` | WS-T9, WS-T10 | agent:codex | `node --test check-trigger-fixtures.test.mjs check-new-skill-collision.test.mjs`; new equivalence smoke (advisory) | PR-1 |
| 11 | `chore(tool-family): bump the 15 tool skills to 1.0.0 with first HISTORY rows` | WS-T11 (bump half) | agent:codex | `check-frontmatter-yaml`, `lint-skills-frontmatter`, `gen-skill-manifest --check` | PR-1 |
| 12 | `chore(hygiene): cache npm, add root npm test, add opt-in pre-commit, remove orphans` | WS-T11 (remainder) | agent:codex | full `node --test` suite via the new `npm test`; `check-rendered-links`, `check-route-parity` | PR-1 |
| 13 | `chore(governance): enable branch protection, triage Dependabot, seed good-first-issues` | WS-T6 | agent:human | `gh api` branch-protection verification; Dependabot PR list check | PR-1 |
| 14 | `chore(release): v2.30.0 surface sweep, marketplace pin, version bump` | WS-T5, surfaces A-J | agent:claude (T5 confirm: agent:human) | full pre-tag bundle `--strict` both shells; site build; `check-count-phrases` now enforcing | PR-2 through PR-13 |

PR-13 has no file diff of its own beyond, optionally, a one-line dated note recording the WS-T6 D-6 session outcome; branch protection and Dependabot triage are GitHub-side state, not commits. WS-T12 joins the count: audit D-3 ruled option B on 2026-07-04, so it ships as PR-15 (`docs(internal): relocate strategy/backlog/next tiers per D-3 option B`), agent:claude for the move (the ruling is recorded), sequenced after PR-1 and before PR-14 (the surface sweep should reflect the final internal-docs layout).

**Exact target lists, verified against the repo so PR-4 and PR-11 do not have to re-derive them:**

- PR-4's zip-stage assertion checks these six files exist under `agents/` in the built stage: `pm-changelog-curator.md`, `pm-critic.md`, `pm-release-conductor.md`, `pm-skill-auditor.md`, `pm-skill-router.md`, `pm-workflow-orchestrator.md`. (`agents/_chain-permitted.yaml` is chain-routing config, not a sub-agent doc, and is not part of the "6 sub-agents" count.)
- PR-11's tool-family sweep touches exactly these 15 skills: `tool-design-sprint-brief`, `tool-design-sprint-decide-and-storyboard`, `tool-design-sprint-map-and-target`, `tool-design-sprint-prototype-plan`, `tool-design-sprint-readiness`, `tool-design-sprint-sketch`, `tool-design-sprint-test-and-score`, `tool-foundation-sprint-approach-options`, `tool-foundation-sprint-basics`, `tool-foundation-sprint-brief`, `tool-foundation-sprint-differentiation`, `tool-foundation-sprint-founding-hypothesis`, `tool-foundation-sprint-magic-lenses`, `tool-foundation-sprint-readiness`, `tool-note-and-vote`. None currently has a `HISTORY.md` (verified).

## 3. Agentic execution protocol

**Prompt seeds** (one line each, cite the spec's REQ-IDs so the executing agent has a traceable contract):

- PR-2: "Fix every count-bearing phrase instance in spec REQ-T1.1-T1.3's file list and rewrite `utility-pm-skill-builder`'s family inventory per REQ-T3.1-T3.3. Do not touch the gate script or any skill's version field beyond the builder itself."
- PR-3: "Add `scripts/check-count-phrases.mjs` + `.test.mjs` per spec REQ-T1.4 and the Durable CI block. Wire it into `validation.yml` as advisory (`continue-on-error: true`), both OS legs. Do not flip it enforcing yet."
- PR-4: "Implement REQ-T2.1-T2.4: stage `agents/` and `hooks/` in `build-release.sh`/`.ps1`, confirm the existing `docs/internal` exclusion has parity across both scripts, add `.gitattributes` export-ignore entries, extend the `validate-plugin.yml` zip job with the stage assertions."
- PR-5: "Fix REQ-T4.1-T4.4: the sub-agent count and path drift in `sub-agent-compatibility.md`, `platforms.md`, `ecosystem.md`, and every `agents/*.md` `docs/reference/*` dead path. Add the REQ-T4.5 verify-it-worked step to both quickstarts."
- PR-6: "Wire REQ-T7.1 (the `phase_router` opt-out) and REQ-T7.2 (the metric-context regex) with unit tests for both the true-positive and new true-negative cases. Update `hooks/README.md`."
- PR-7: "Add the four WNTU backfills (REQ-T8.1) and the skeleton canon doc (REQ-T8.3) naming the three dialects and their exact heading spellings; reference it from the builder and validator skills."
- PR-8: "Using the canon doc from PR-7, normalize headings across the touched skills to REQ-T8.2's exact spelling, then add `check-heading-canon.mjs` (REQ-T8.4) as an advisory gate."
- PR-9: "Rewrite the Batch 5 descriptions (REQ-T8.5) and resolve the two dedup items (REQ-T8.6). Re-run `check-new-skill-collision` per rewritten skill."
- PR-10: "Add the CONTRIBUTING freeze note and awk hazard comments (REQ-T9.1-T9.2), the fixture tree and equivalence smoke (REQ-T9.3), and extract the eval roster to `trigger-eval-roster.yaml` (REQ-T10.1-T10.3), rewiring all three consumers."
- PR-11: "Bump all 15 `tool-*` skills 0.1.0 to 1.0.0 per REQ-T11.1 and TD-5; create each `HISTORY.md` fresh (see Section 4); document the HISTORY-start rule in `skill-versioning.md`."
- PR-12: "Implement the remaining REQ-T11.2-T11.6 items: npm cache, root `npm test`, the opt-in pre-commit hook, untracking `.created-issues.json`, orphan-script deletion, effort-dir dedup, the two quickstart link fixes."
- PR-14: "Run the full Release surfaces A-J sweep from `plan_v2.30.0.md`, land the TD-3 marketplace pin, bump the version everywhere, promote `check-count-phrases.mjs` to enforcing with a dated rationale."

**Standing validation commands** (run relevant subsets locally before every PR; the full set before PR-14):

```bash
node --test scripts/*.test.mjs hooks/**/*.test.mjs  # PR-1..PR-11 (npm test does not exist until PR-12 lands)
npm test                                            # PR-12 onward, once the script exists
bash scripts/pre-tag-validate.sh                    # PR-14 only, --strict full bundle
pwsh scripts/pre-tag-validate.ps1                   # PR-14 only, --strict full bundle, mirror OS
cd site && npm run build                            # any PR touching site/, skills content, or samples
node scripts/check-route-parity.mjs                 # any PR that could add/move a route
node scripts/gen-resource-index.mjs --check          # any PR touching docs/ or skills/
```

**Regen order** (unchanged from the plan; run after content edits, before opening a PR that touches skill frontmatter, descriptions, or site pages):

1. `node scripts/gen-skill-manifest.mjs`
2. `node scripts/gen-skill-manifest.mjs --agents`
3. `cd site && npm run build`
4. `node scripts/check-route-parity.mjs --update`
5. `node scripts/gen-resource-index.mjs`

**PR discipline:** squash merge only; conventional-commit title (`type(scope): summary`, no em-dashes anywhere in the title or body); PR description states its agent label and the WS-IDs it covers; link the M-35 tracking issue; no PR touches files outside its stated workstream(s) except the shared-file exception in Section 4. Every authored line (commit messages, code comments, doc prose) follows the no-em-dash rule; a PreToolUse hook enforces this on Write/Edit for the maintainer's own sessions, but executing agents must not rely on the hook catching commit messages.

**Definition of done, per PR, before requesting review:**

1. The PR's "Must be green" validators from Section 2 pass locally on the author's OS.
2. If the PR touches any `SKILL.md` frontmatter or description: `metadata.version` and `metadata.updated` are bumped per Section 4, and `HISTORY.md` is created or appended, not both skipped.
3. If the PR touches skill content, frontmatter, or samples: the regen order (above) has been run and the regenerated files are included in the diff, not left stale.
4. The PR description names its agent label, its WS-ID(s), and links the M-35 tracking issue.
5. A fresh `git diff` scan for U+2014/U+2013 returns nothing (the hook covers Write/Edit; it does not scan an already-written file an agent edited by other means, so this is a manual backstop).

## 4. Skill-bump mechanics

The tie-breaker rule in `docs/internal/skill-versioning.md` governs: one bump per skill per release, HISTORY.md created on a skill's second-ever version with a backfilled entry for the first.

**Verified HISTORY.md state for every multi-workstream skill** (checked against the repo, not assumed): `discover-journey-map`, `discover-market-sizing`, `measure-survey-analysis`, `define-prioritization-framework`, `measure-okr-grader`, and `utility-update-pm-skills` have **no** existing `HISTORY.md`, meaning this release is their first-ever bump past initial ship and each needs a fresh `HISTORY.md` with a backfilled entry for the version they shipped at plus the new row. `define-opportunity-tree` and `utility-pm-skill-builder` already have `HISTORY.md`; those just get a new row prepended.

**The two-PR combined bump.** `discover-journey-map` and `define-opportunity-tree` each take ONE combined MINOR bump spanning two PRs per the plan's Count impact table (WS-T8a's WNTU edit and WS-T8e's description rewrite land in separate PRs, PR-7 and PR-9). To avoid a double bump:
- PR-7 edits the WNTU section body only; it does **not** touch `metadata.version`, `metadata.updated`, or `HISTORY.md` for these two files.
- PR-9 (landing after PR-7 per the Section 1 dependency) makes the description edit AND applies the single version bump, writing one `HISTORY.md` entry (or creating the file, per the state above) that enumerates both changes: the WNTU addition and the description rewrite.
- Every other WS-T8a skill (`discover-market-sizing`, `measure-survey-analysis`) and every other WS-T8e skill takes its bump in its own PR (7 or 9 respectively) with no cross-PR coordination needed.

**Tool-family sweep (WS-T11, PR-11).** 0.1.0 to 1.0.0 is a first-ever bump for all 15; there is no synthetic `0.1.0` HISTORY row (0.x is pre-contract by SemVer convention and by TD-5's own rationale). Steps, identical for each of the 15 `tool-*` skills:
1. Set `metadata.version: "1.0.0"` (was `"0.1.0"`) and `metadata.updated` to the PR's cut date.
2. Create `skills/<name>/HISTORY.md` with exactly one row: `1.0.0 | <date> | v2.30.0 | M-35 | added | Declares the <family> skill stable after seven releases at 0.1.0; see TD-5.` and a matching `## 1.0.0` section with a "Contract established" subsection (the `skill-versioning.md` template for a first entry).
3. Add the HISTORY-start rule (a skill's second version, or a first-ever bump off an unbumped 0.x baseline, is when HISTORY.md is created) to `docs/internal/skill-versioning.md`.

**Heading-normalization sweep (WS-T8b, PR-8).** PATCH bump per touched skill (TD-4 option A), one-line HISTORY row: `<patch> | <date> | v2.30.0 | M-35 | changed | Heading normalized to the skeleton-canon spelling.` For a skill with an existing `HISTORY.md`, prepend the row. For a skill with none (most of the touched set, per the verified state above), create it fresh with a backfilled entry for its current version plus the new PATCH row.

**Scriptable procedure** (usable as a checklist or a small script for both mass sweeps): for each skill in the target set, (a) read `metadata.version`, (b) compute the new version per the bump class above, (c) write the new `version` and `updated` fields, (d) check for `HISTORY.md`; if absent, write the file with a backfilled first entry plus the new entry, if present, prepend the new entry and update its summary table row, (e) run `lint-skills-frontmatter` and `check-frontmatter-yaml` on the touched file before moving to the next skill, so a YAML slip in skill 3 of 15 is caught before it is buried under 12 more edits.

**Worked example, `tool-note-and-vote` (PR-11).** Current frontmatter reads `version: "0.1.0"`, `updated: 2026-05-14`, no `HISTORY.md` on disk (verified). The bump:

```yaml
# skills/tool-note-and-vote/SKILL.md frontmatter, before -> after
metadata:
  version: "0.1.0"          ->  version: "1.0.0"
  updated: 2026-05-14       ->  updated: <PR-11 cut date>
```

```markdown
# skills/tool-note-and-vote/HISTORY.md (new file)

# tool-note-and-vote . Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.0.0 | <PR-11 cut date> | v2.30.0 | M-35 | added | Declares the tool family stable after seven releases at 0.1.0; see TD-5. |

## 1.0.0 (<PR-11 cut date>)

Released in [v2.30.0](../../docs/releases/Release_v2.30.0.md). Effort: M-35.

Tool-family skills shipped at 0.1.0 in v2.15.0 and held there across seven releases with no stated versioning intent. This release declares the family's contract stable and starts its HISTORY.

### Contract established
- Facilitation format: character-note-and-vote (see `metadata.frameworks`)
- Timebox: 25 minutes; roles: facilitator, decider
```

The other 14 tool skills follow the identical pattern with their own family name and framework line.

## 5. File inventory

Grouped by workstream. Counts, not exhaustive listings, for sweeps; the spec carries the exhaustive file:line list.

| WS | New files | Modified files (representative) |
|---|---|---|
| WS-T1 | `scripts/check-count-phrases.mjs`, `.test.mjs` | `QUICKSTART.md`, `README.md`, `site/.../quickstart.md`, `site/.../index.md`, 3 plugin manifests, `_agent-context/claude/CONTEXT.md` |
| WS-T2 | none | `scripts/build-release.sh`, `scripts/build-release.ps1`, `.gitattributes`, `.github/workflows/validate-plugin.yml`, `skills/utility-update-pm-skills/SKILL.md`, `site/.../platforms.md` |
| WS-T3 | none | `skills/utility-pm-skill-builder/SKILL.md` |
| WS-T4 | none | `site/.../sub-agent-compatibility.md`, `site/.../platforms.md`, `site/.../ecosystem.md`, `README.md`, `AGENTS.md` generator input, up to 6 `agents/*.md` (dead-path fix), `QUICKSTART.md`, `site/.../quickstart.md` |
| WS-T5 | none | `.claude-plugin/marketplace.json` (line 13 `ref`) |
| WS-T6 | none (optionally one dated note) | none (GitHub-side config) |
| WS-T7 | none | `hooks/phase-router.mjs`, `hooks/guardrails.mjs`, `hooks/README.md`, plus their `.test.mjs` files |
| WS-T8 | `site/.../skeleton canon doc` (new page in the skill-authoring guide), `scripts/check-heading-canon.mjs`, `.test.mjs` | ~4 WNTU skills, ~15-20 heading-normalized skills, ~8 Batch 5 description skills, `measure-okr-grader/SKILL.md`, `define-prioritization-framework/SKILL.md`, plus one `HISTORY.md` per touched skill (new or appended per Section 4) |
| WS-T9 | `scripts/fixtures/shell-parity/` (fixture tree), a committed golden-verdict file per shell | `CONTRIBUTING.md`, `scripts/validation-manifest.yaml` (header note), `scripts/check-count-consistency.sh`, `scripts/validate-skill-family-registration.sh` (hazard comments) |
| WS-T10 | `scripts/trigger-eval-roster.yaml` | `scripts/check-trigger-fixtures.mjs`, `scripts/run-router-evals.mjs`, `scripts/check-new-skill-collision.mjs`, their `.test.mjs` files |
| WS-T11 | `skills/tool-*/HISTORY.md` (15 new files) | 15 `tool-*/SKILL.md`, `docs/internal/skill-versioning.md`, `.github/workflows/validation.yml`, `package.json` (root), a `.pre-commit` opt-in hook file, `.gitignore`, `docs/internal/roadmap.md`, `site/.../quickstart.md` |
| WS-T12 (conditional) | none | move-only: `docs/internal/strategy/`, `backlog/`, `next/`, `session-primers/`, `_agent-context/` relocated, not newly authored |
| Regen + surface sweep | `site/.../releases/Release_v2.30.0.md` | `skill-manifest.json`, `AGENTS.md`, `scripts/route-manifest.txt`, `docs/RESOURCES.md`, `CHANGELOG.md`, `site/.../changelog.md`, `docs/internal/release-plans/README.md`, both `CONTEXT.md` files, `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json` |

## 6. Pre-tag: the 6-gate runbook embodiment

Per `../runbook_clean-worktree-cut-tag-publish.md` and the gate definitions in `agents/pm-release-conductor.md`. Named in the conductor's G0-G4 order below; chronologically this release follows the plan's own Phase 6-10 sequence, which runs G2 (the surface sweep) before G1 (the review), so the adversarial pass covers the complete diff, workstreams plus sweep, in one shot instead of two. G0 therefore runs twice: once informally (every PR's own validators, Section 2) as PR-2 through PR-13 land, and once formally as the final pre-tag pass after G1 clears.

- **G0 (pre-tag readiness).** The full validator bundle (`pre-tag-validate.sh` / `.ps1`, `--strict`), the em-dash sweep, the aggregate-counter audit, and a `pm-skill-auditor` cross-cutting pass. The pass that actually gates G3 is the one run after PR-14 and G1 both clear (Section 1 Phase 9); it must be clean on both OS legs.
- **G1 (adversarial review).** Once PR-14 (the surface sweep) has merged, dispatch a Codex adversarial review with `--base v2.29.1 --scope branch` against everything merged since the last tag, PR-2 through PR-14, so it reviews the complete diff in one pass. Resolve every Blocker/Major finding with a small fixup commit directly on `main` (or a short-lived follow-up PR if the fix is non-trivial); PLAUSIBLE findings get a recorded disposition (fixed or explicitly accepted). Re-run G0 after any fixup lands, this is what "G0 runs twice" means in practice.
- **G2 (release surfaces).** PR-14 itself: Release surfaces A-J from `plan_v2.30.0.md`, version bump across the three manifests, `CHANGELOG.md`, `QUICKSTART.md`, both `CONTEXT.md` files, the Astro site pages, the new `Release_v2.30.0.md`, the marketplace `ref` pin (TD-3), and the grep count-sweep (surface I). Promote `check-count-phrases.mjs` from advisory to enforcing here, with a dated rationale in the step comment, once the sweep returns zero live stale hits.
- **G2.5 (commit + re-verify + SHA capture).** Once G1's findings (if any) are resolved and the second G0 pass is clean, capture the exact `main` HEAD SHA. This is the only SHA G3 may tag; the conductor refuses to tag any other (its D22 SHA-pin invariant, the rule that prevents the broken-tag class of bug).
- **G3 (tag + push).** Annotated tag `v2.30.0` on the G2.5-captured SHA; push the tag immediately after (the runbook's stated minutes-wide window, see Rollback notes below for the marketplace-pin risk this creates); create the GitHub Release.
- **G4 (post-tag hygiene).** Flip `plan_v2.30.0.md` and this implementation plan to SHIPPED; flip both `CONTEXT.md` markers to SHIPPED; re-pin `agent-plugins` to v2.30.0 (registry metadata bump, a post-tag PR in that sibling repo, mirroring the v2.28.0 re-pin); verify the plugin install path (P0), marketplace registration (P1), and Pages rebuild (P1); author the GitHub Release UI body (P2 reminder); confirm the v2.31.0 "Zero-drift surfaces" stub already exists (it is being drafted alongside this plan, so this is a confirm, not a create).

## 7. Rollback notes (risky changes)

Every PR here is a single squash commit on `main`, so `git revert <sha>` is always mechanically available; the table below calls out only the changes where a plain revert is insufficient or needs an accompanying action (an off-repo config change, a timing constraint, or a regenerated artifact).

| Change | Risk | Rollback |
|---|---|---|
| Packaging (WS-T2, PR-4) | `agents/`+`hooks/` inclusion pushes the zip toward the 50 MB Cowork limit, or a dispatch skill's path does not resolve in the stage | The new zip-stage assertions are enforcing from day one and run pre-merge, so this should never reach a tag; if it does, revert the single `build-release.{sh,ps1}` commit, no downstream coupling |
| Marketplace pin (WS-T5, PR-14) | The pin is briefly unresolvable between PR-14's merge and the G3 tag push (OQ-1 in the spec); a delayed tag push extends the window beyond the expected minutes, breaking installs from `main` (not just this release's installs) for longer than intended | If the tag push is delayed, hotfix `marketplace.json`'s `ref` back to `main` immediately, then re-apply the pin in a follow-up commit once the tag exists; G3 should push the tag within the same session as G2.5, not a later one |
| Hook behavior (WS-T7, PR-6) | The opt-out wiring inverts (router goes silent always, or never), or the tightened regex now misses true fabricated metrics | Unit tests cover both the true-positive and new true-negative cases pre-merge; if a regression ships, `hooks/phase-router.mjs` and `hooks/guardrails.mjs` are dependency-free with no other consumers, so a single-file revert is safe |
| Heading and description sweep (WS-T8b/e, PR-8/PR-9) | A rewrite collapses a trigger boundary, causing over-triggering or under-triggering against a neighbor skill | `check-new-skill-collision` re-runs per rewritten skill before merge; if a collision surfaces post-merge, revert that one skill's `SKILL.md` and `HISTORY.md` row in isolation, each skill is an independent file |
| Tool-family sweep (WS-T11, PR-11) | No behavioral risk (version and HISTORY only), but a 15-file mechanical edit risks a YAML frontmatter slip | `check-frontmatter-yaml` and `lint-skills-frontmatter` catch a broken frontmatter pre-merge per the Section 4 procedure; PR-11 touches only these 15 files plus `skill-versioning.md`, so a full-PR revert is clean |
| Branch protection (WS-T6, PR-13) | An over-strict required-checks list locks the maintainer out of their own squash-merge flow | GitHub-side config, not a commit; relax or remove via a follow-up `gh api` call with no code revert needed |
| Dual-shell equivalence smoke (WS-T9, PR-10) | The committed golden-verdict file goes stale after an unrelated validator change, false-failing the advisory step on unrelated PRs | The step is advisory (`continue-on-error: true`) and cannot block merges; regenerate the golden file in whichever PR changes `check-count-consistency`'s real output |

## Gate ledger (placeholder)

- [ ] G0 / G1 / G2 / G2.5 / G3 / G4, filled at cut time per [`../runbook_clean-worktree-cut-tag-publish.md`](../runbook_clean-worktree-cut-tag-publish.md). This ledger mirrors the one in `plan_v2.30.0.md`; do not track gate status in two places once execution starts, update the plan's copy as authoritative.

## Notes

- **Spec detail followed over the plan's shorthand:** the plan describes WS-T9's CI step as one that "diffs verdicts" between the two shells; the spec's Durable CI block is more specific, each leg compares its own verdict to a committed golden file (no live cross-job artifact passing), which is what PR-10 should actually build. This is not a contradiction, the spec is the load-bearing detail per its own OQ-5.
- **Path correction, verified against the repo:** the spec cites `hooks/lib/guardrails.mjs:53` for the fabricated-metric regex; the file is at `hooks/guardrails.mjs:53` (not under `lib/`), confirmed by reading the file. PR-6 should edit the real path.
- **WS-T8's plan-level `agent:claude` label is kept wholesale at the PR level**, including PR-8's `check-heading-canon.mjs` gate script, matching the plan's Agent assignment table rather than splitting a content/gate half the way WS-T1 does. Flagged for awareness, not a correction: a maintainer who wants codex rigor on that one gate script can re-assign PR-8 without changing anything else in this plan.
- **WS-T11's plan-level table says "(code half)" with no named claude counterpart**; this plan assigns WS-T11 wholesale to agent:codex (PR-11, PR-12), treating the tool-family version bump as mechanical and scriptable rather than editorial content work.
- No `skills-manifest.yaml` is created for this release. The convention in `skill-versioning.md` predates v2.16.0 and was not produced for v2.28.0 or v2.29.0 either (verified against both release folders); this plan follows that recent precedent rather than reviving a lapsed artifact.
- DRAFT for maintainer review. Phase 0's decisions were ruled 2026-07-04: TD-1..TD-5 all option A; audit D-3 = B (WS-T12/PR-15 executes); D-5 = A; D-6 = A. Remaining Phase 0 work: confirm the M-35 ID is free and open the tracking issue.
