# v2.25.0 Documentation and Artifact Manifest

**Purpose:** the single, reconciled list of every artifact this release created or changed, plus the deviations from the original plan. Answers "what supporting documentation exists for this work, and does it match the plan?"

**Branch:** `release/v2.25.0` -> SHIPPED to main (squash-merged PR #161, `23e65da`; tag `v2.25.0`; GitHub Release Latest; site deployed). **Status as of 2026-06-03:** all artifacts committed; full pre-tag bundle + site build pass; two Codex reviews applied and findings fixed. Post-tag verification: the live integration smoke.

---

## 1. Source code (F-43, F-44)

| File | Role |
|---|---|
| `hooks/hooks.json` | Registers the PreToolUse + SessionStart hooks (plugin's first) |
| `hooks/guardrails.mjs` | F-43 PreToolUse guardrail (pure `evaluateGuardrail` + thin `main`) |
| `hooks/phase-router.mjs` | F-44 SessionStart router (pure `route` + thin `main`) |
| `hooks/lib/frontmatter.mjs` | Dependency-free frontmatter field reader (shared) |
| `hooks/lib/local-config.mjs` | `.claude/pm-skills.local.md` reader (fail-open) |
| `hooks/lib/phase-map.mjs` | phase -> skills map from SKILL.md frontmatter |
| `hooks/lib/signals.mjs` | branch + artifact phase-signal detection |

## 2. Tooling (M-30)

| File | Role |
|---|---|
| `scripts/check-sample-no-placeholders.mjs` | Invariant: bracket/angle placeholder markers (corpus clean) |
| `scripts/check-sample-exact-quote-sourcing.mjs` | Invariant: `Source:` quotes are exact input substrings (scoped; clean) |
| `scripts/check-sample-no-fabricated-metrics.mjs` | Invariant: percentages not traceable to input (heuristic, advisory) |

## 3. Tests (10 files; 34 tests)

`hooks/lib/{frontmatter,local-config,phase-map,signals}.test.mjs`, `hooks/{guardrails,phase-router}.test.mjs`, `scripts/check-sample-{no-placeholders,exact-quote-sourcing,no-fabricated-metrics}.test.mjs`, plus the two fixture skills under `hooks/fixtures/skills/`.

## 4. CI wiring

| File | Change |
|---|---|
| `.github/workflows/validation.yml` | One enforcing unit-test step (hooks + validators) + three advisory eval steps (`continue-on-error`) |

## 5. Planning docs (internal; no frontmatter, `docs/internal/` is excluded from frontmatter validation)

| File | Role |
|---|---|
| `docs/internal/release-plans/v2.25.0/plan_v2.25.0.md` | Release plan (scope, hygiene surface, exit criteria, risks) |
| `docs/internal/release-plans/v2.25.0/spec_v2.25.0.md` | Combined spec, 4 mermaid diagrams, `.local.md` schema, ACs |
| `docs/internal/release-plans/v2.25.0/implementation-plan.md` | Code-complete TDD build plan |
| `docs/internal/release-plans/v2.25.0/docs-manifest.md` | This file |
| `docs/internal/efforts/F-43-house-rule-guardrails.md` | Effort brief |
| `docs/internal/efforts/F-44-phase-router.md` | Effort brief |
| `docs/internal/efforts/M-30-eval-harness-phase1.md` | Effort brief |

## 6. User-facing / published docs

| File | Role |
|---|---|
| `site/src/content/docs/releases/Release_v2.25.0.md` | Release note with 3 rendered mermaid diagrams (guardrails, router, eval tiers) + the `.local.md` schema. **Verified: builds and renders (route present, 0 broken links).** |
| `site/src/content/docs/releases/index.md` | New v2.25.0 row |
| `site/src/content/docs/changelog.md` | `## [2.25.0]` mirror entry |
| `CHANGELOG.md` | Root `## [2.25.0]` entry |
| `README.md` | Version badge, At-a-Glance current-version row, "What's New" v2.25.0 block |
| `site/src/content/docs/concepts/hooks.md` | NEW durable concept page (user-facing): both hooks + eval + the `.local.md` schema, 3 mermaid diagrams; auto-listed in the Concepts nav |
| `hooks/README.md` | NEW code-adjacent contributor doc (architecture, design rules, how to add a check); matches the `README_SCRIPTS.md` / `README_SAMPLES.md` convention |

## 7. Version + currency surfaces

`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json` (version 2.24.0 -> 2.25.0; the two Claude manifests also gained a v2.25.0 lead sentence; counts unchanged at 65). `_agent-context/{claude,codex}/CONTEXT.md` (currency marker -> v2.25.0; required by the `check-context-currency` enforcing gate, which this release initially missed by deferring it - caught by the pre-tag bundle).

## 8. External-to-repo (not in git)

`~/.claude/projects/.../memory/project_v2.25.0-activation-layer.md` + a `MEMORY.md` index line - the auto-memory record so a future session can resume. Lives in the user profile, outside the repo and outside git.

---

## Deviations from the plan (recorded honestly)

1. **Reference pages: folded, then broken out (RESOLVED).** The plan (`plan_v2.25.0.md` line 125, `implementation-plan.md` Task D2) called for three separate reference pages. They were initially folded into the release note + spec (a budget shortcut), then **broken out per review** into a single combined durable concept page `site/src/content/docs/concepts/hooks.md` (option A: guardrails + router + eval + the `.local.md` schema, all three mermaid diagrams; auto-listed in the Concepts nav) plus a code-adjacent `hooks/README.md` (contributor architecture). Deviation closed; the release note keeps the same diagrams as an announcement.

2. **CONTEXT.md timing.** The plan listed the `_agent-context/*/CONTEXT.md` bump as post-tag; the `check-context-currency` gate enforces it pre-tag. Corrected: bumped during release-prep.

3. **`no-fabricated-metrics` scope narrowed.** The spec described "a number/percentage not traceable to input." The corpus run forced a calibration: bare integers (dates, counts) produced ~4030 false positives, so Phase 1 flags **percentages only** (~320 advisory). Recorded in the validator's own comments and the release note.

4. **exact-quote-sourcing was a false pass (Codex P2), now fixed.** The first cut matched `Source: "..."`, but the real samples use an `S1: "quote" (origin:)` ledger and `**Source:** S2, S3` references S-ids. Rewrote to the ledger pattern; it now checks 21 real quotes (0 unsourced = genuinely clean), so the "enforcing candidate" claim is now true rather than hollow.

## Review status (what has and has NOT been done)

- DONE: 43 unit tests; full pre-tag enforcing-validator bundle (caught + fixed a `check-context-currency` failure I had deferred); site build (388 routes, 0 broken links/anchors, route parity); version/count/frontmatter gates; **two Codex reviews** - (1) `codex:rescue`: P1 MultiEdit bypass, P2 quoted-array / false-pass validator / inputRegion self-validation / git-worktree signal, P3 link + keyword breadth; (2) `/codex:adversarial-review` (challenge): the `ExitPlanMode` plan-mode write bypass and the file-order artifact-ambiguity in the default-on router - all fixed (+9 regression tests total); content-accuracy pass over README/CHANGELOG/release note; broke the reference docs out into `concepts/hooks.md` + `hooks/README.md`.
- PENDING before merge: the manual integration smoke (hooks firing in a live Claude Code session) - the one gate that requires a human.
