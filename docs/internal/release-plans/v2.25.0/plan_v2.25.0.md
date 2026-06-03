# v2.25.0 Release Plan: Activation and Trust Layer (guardrails + phase router + eval harness)

**Status:** SHIPPED 2026-06-03 (tag `v2.25.0` at `23e65da`; GitHub Release Latest; squash-merged PR #161; site deployed). Two Codex reviews (rescue + adversarial challenge) applied and findings fixed; 43 unit tests + full pre-tag bundle + site build green. Post-tag verification: the live integration smoke.
**Owner:** Maintainers
**Type:** **MINOR** (additive: the plugin's first hooks, a new advisory CI tier, new docs; nothing removed; the skill and sub-agent catalog counts do NOT change).
**Theme:** Wire the existing 65 skills into the Claude Code platform's activation and trust primitives instead of adding more content. Three efforts: a write-time house-rule guardrail (F-43), a session-time phase router (F-44), and a CI-time output-quality eval harness (M-30). The roadmap's thesis in practice: a library this size compounds when the platform routes, guards, and verifies it, rather than relying on the user to remember the catalog.
**Created:** 2026-06-03
**Updated:** 2026-06-03

---

## Where we are

The `docs/internal/roadmap.md` strategic frame argues pm-skills has "won the content race" (65 skills across the Triple Diamond) and that the next frontier is the activation and trust layer, whose center of gravity is hooks. This release builds the three highest-leverage, lowest-risk items from that roadmap's "Now" tier plus the unreleased eval-harness idea:

- **F-43** ships the maintainer's editorial discipline (the `~/.claude/hooks/no-em-dashes.py` logic) as a *distributable, opt-in* `PreToolUse` guardrail. The roadmap rated it "the editorial moat at S effort - prioritize."
- **F-44** ships the flagship SessionStart phase router: it inspects cheap repo signals and, *only when confident*, nudges Claude toward the right phase's skills. The roadmap called this "the single highest-leverage item."
- **M-30** ships Phase 1 of the output-eval harness (`docs/internal/release-plans/_unreleased/output-eval-harness.md`): deterministic quality invariants over the existing recorded samples, wired advisory. It closes the gap the v2.23.0 retro surfaced - CI verifies structure exhaustively but output quality not at all.

All three are authored on ONE runtime (Node `.mjs`) so the two hooks and the validators share idioms. The hooks are dependency-free at runtime (an installed plugin's hooks have no `node_modules`, so they parse the few flat frontmatter keys they need with a minimal field reader, not `js-yaml`); `js-yaml` stays available to the eval validators, which run in the repo / CI context.

**Companion docs (this release directory):**

- Combined spec (three components + diagrams + `.local.md` schema): [`spec_v2.25.0.md`](spec_v2.25.0.md)
- Implementation plan: `implementation-plan.md` (produced by the writing-plans skill after spec review)
- Effort briefs: [`../../efforts/F-43-house-rule-guardrails.md`](../../efforts/F-43-house-rule-guardrails.md), [`../../efforts/F-44-phase-router.md`](../../efforts/F-44-phase-router.md), [`../../efforts/M-30-eval-harness-phase1.md`](../../efforts/M-30-eval-harness-phase1.md)
- Predecessor plan: [`../v2.24.0/plan_v2.24.0.md`](../v2.24.0/plan_v2.24.0.md)
- Strategy source: [`../../roadmap.md`](../../roadmap.md) sections 3.4, 3.6; the eval idea doc [`../_unreleased/output-eval-harness.md`](../_unreleased/output-eval-harness.md)

---

## Entrance criteria (HARD gate)

1. **v2.24.0 is SHIPPED and tagged.** SATISFIED: tag `v2.24.0` at `d3f1549`.
2. **The Astro Pattern S site work is on main.** SATISFIED: `12f23f8` (#154), `1eea16f` (#159), `b6afd03` (#160). This matters because F-44's nudge and the eval reports may surface in the rendered site, and the release notes ship through the converged generator.
3. **The two platform primitives are confirmed against `code.claude.com/docs` before building** (the roadmap verified the *events* exist; this gate confirms the exact wiring): (a) how a plugin registers `PreToolUse` + `SessionStart` hooks (`hooks/hooks.json` auto-discovery) and the deny / additionalContext output shapes; (b) the `.claude/<plugin>.local.md` read path. These are listed as build-time confirmations in the spec, not assumptions.

---

## Scope - the three efforts

| ID | Item | Type | Classification | Default posture | Spec section |
|---|---|---|---|---|---|
| F-43 | `hooks/` + guardrail `PreToolUse` hook (Node) + `.local.md` reader | NEW HOOK | n/a (hook) | OFF (opt-in via `.local.md`) | spec section 2 |
| F-44 | SessionStart phase-router hook (Node) | NEW HOOK | n/a (hook) | ON, silent unless confident | spec section 3 |
| M-30 | 3 deterministic eval invariant validators (Node) + advisory CI wiring | NEW CI TIER | n/a (tooling) | Advisory (`continue-on-error`) | spec section 4 |

**Build order:** F-43 first - it stands up the new `hooks/` directory, the shared Node hook harness, and the `.local.md` reader. F-44 reuses that harness plus the `.local.md` reader (as a later tuning override) and adds the catalog lookup. M-30 is independent of both and can proceed in parallel; it touches only `scripts/` and `validation.yml`.

**What this release does NOT change:** no new skills, no new sub-agents. The catalog stays at 30 phase + 9 foundation + 11 utility + 15 tool = 65 skills and 5 sub-agents. The version bump (2.24.0 -> 2.25.0) is for the new plugin *capability* (hooks + eval tier), not a catalog delta. Asserting "counts unchanged" is itself a hygiene step (the audit-aggregate-counters rule applies in the negative: confirm nothing inadvertently moved a count).

### F-43 - house-rule guardrails (opt-in `PreToolUse`)

A `PreToolUse(Write|Edit|NotebookEdit)` hook, authored in Node for portability (Python is not guaranteed on an installer's machine; Node is). Locked decisions:

- **Posture LOCKED: opt-in via `.local.md`.** The hook ships registered but inert. Its first action is to read `.claude/pm-skills.local.md`; if absent or `guardrails` is not `true`, it exits 0 and allows the write. Installing pm-skills changes nothing about Claude's writing until a maintainer opts in per project. This is the consent gate the personal hook never needed, and it is most of the new engineering.
- **em-dash / en-dash is the ONLY blocking check.** Deterministic character match (U+2014 / U+2013), ported from `no-em-dashes.py` including its hard-won UTF-8-decode correctness note (cp1252 phantom-em-dash bug). On a hit it returns `permissionDecision: deny` with the substitution reminder.
- **Fabricated-metrics and placeholder checks ship ADVISORY** (emit a non-blocking note Claude reads; never deny), because they are heuristic and a high-false-positive *blocker* is worse than no hook. Employer-specific-context detection is DEFERRED to `pm-critic` (it already does adversarial review) rather than shipped as a brittle hook check.
- **Fail-open is sacred.** Any parse error, missing file, or hook exception allows the write. A distributed hook must never block a stranger's unrelated work on a bug. (The personal hook already does this; the distributed one must too.)
- **`.local.md` schema** is documented in the spec and in a user-facing reference page. MVP keys: `guardrails: true|false`, `guardrail_checks: [em-dash, placeholder, fabricated-metric]` (em-dash blocks, the rest warn).

### F-44 - phase router (on, confident-only `SessionStart`)

A `SessionStart` hook (rule-based for the MVP), authored in Node. Locked decisions:

- **Posture LOCKED: ON by default, silent unless confident.** Default-on because a *discovery* feature gated behind opt-in helps no one (the newcomers who most need routing will not have found the switch). Confident-only because every wrong nudge erodes trust in the right ones (calibrated silence). The asymmetry with F-43 is deliberate: a *block* needs consent; a *nudge* only needs to be right.
- **Confidence signals (MVP):** (1) git branch name matching a phase prefix; (2) a recognized PM artifact present (a PRD / OKR / persona file by filename or output-dir pattern). A strong signal maps to one Triple Diamond phase; absence of any strong signal emits NOTHING.
- **Output:** when confident, inject `additionalContext` (the same channel `start-stamp.py` uses) naming the detected phase and a short curated skill shortlist for that phase. The shortlist is built by reading `name:` and `phase:` from `${CLAUDE_PLUGIN_ROOT}/skills/*/SKILL.md` frontmatter directly (a minimal dependency-free field reader, NOT `js-yaml`, since the installed-plugin hook has no `node_modules`), NOT from `build-skill-catalog.py` output (a Node hook cannot run Python at runtime; the frontmatter is the authoritative classification). Claude weaves it into the conversation; it is not a user-facing banner in the MVP (a visible variant is a deferred toggle).
- **`.local.md` override (additive, optional):** the F-43 reader can later force-on/off or tune verbosity per project. Not required for the MVP behavior.
- **Cost discipline:** the nudge is paid only when it fires (confident), so the unconditional session-start token cost is a single cheap signal check, not an injected block every session.

### M-30 - eval harness Phase 1 (deterministic invariants, advisory)

Tier 1 ONLY of the three-tier design in the idea doc (no LLM, no token cost). Locked decisions:

- **Three invariant validators, Node `.mjs`, advisory-wired** into `.github/workflows/validation.yml` with `continue-on-error: true`, mirroring `check-version-references`. Ordered by ascending false-positive risk:
  1. **no-placeholders** - fully deterministic scan for `[Placeholder]`, `[Feature Name]`, `TODO`, `<...>`, unfilled bracket tokens in shipped samples. Cleanest; the first enforcing candidate.
  2. **exact-quote-sourcing** - every `Source:` quote is an exact substring of the sample's own Prompt/input block; scoped to evidence-citing skills starting with `foundation-prioritized-action-plan` (corpus known-clean as of v2.23.0). This is the check hand-written in the v2.23.0 review that caught real bugs, promoted to a validator.
  3. **no-fabricated-metrics** - heuristic: a number or percentage in a sample not marked `[fictional]` and not present in the sample's Prompt block is flagged. Highest false-positive; advisory only, with a triage pass planned before any enforcing move.
- **Advisory-first, always.** No invariant blocks a PR at ship. Promotion to enforcing is per-invariant, only after the corpus is confirmed clean for that invariant. I am explicitly NOT assuming the full 63-dir corpus is clean (only `foundation-prioritized-action-plan` is known-clean); expect to surface and triage pre-existing violations.
- **Invariants, not golden diffs.** Assert properties of output; never byte-compare a full sample (brittle).
- **Tiers 2 and 3 (LLM-judged, live-run) are OUT of scope** for v2.25.0. They never block a PR and belong to a later scheduled harness.
- **Convention:** each validator is a standalone `.mjs` with a companion `.test.mjs` (the modern validator pattern: `check-rendered-links.mjs` + `.test.mjs`), not the older `.sh`/`.ps1`/`.md` trio, since Node is single-source cross-platform and aligns with the two hooks. Confirm `validate-script-docs` scope does not require a `.md` companion for `.mjs` validators (it governs the shell trio); if it does, add the companion docs.

---

## Hygiene and registration surface (every file v2.25.0 touches)

### New source files

- `hooks/hooks.json` - registers the two hooks (PreToolUse + SessionStart). NEW (the plugin's first hooks file).
- `hooks/guardrails.mjs` (F-43) + `hooks/guardrails.test.mjs`. NEW.
- `hooks/phase-router.mjs` (F-44) + `hooks/phase-router.test.mjs`. NEW.
- `hooks/lib/local-config.mjs` (the shared `.local.md` reader, used by F-43 and later F-44) + test. NEW.
- `scripts/check-sample-no-placeholders.mjs` + `.test.mjs` (M-30). NEW.
- `scripts/check-sample-exact-quote-sourcing.mjs` + `.test.mjs` (M-30). NEW.
- `scripts/check-sample-no-fabricated-metrics.mjs` + `.test.mjs` (M-30). NEW.

### CI wiring

- `.github/workflows/validation.yml` - add THREE advisory steps (`continue-on-error: true`) running the M-30 validators. Do NOT add them to the enforcing pre-tag bundle yet.
- `scripts/pre-tag-validate.{sh,ps1}` - unchanged (the eval validators are advisory, not pre-tag gates, until promoted).
- Confirm the hook unit tests (`*.test.mjs`) run in CI (extend the existing Node test step that runs `check-rendered-links.test.mjs`).

### Plugin manifests + version (2.24.0 -> 2.25.0)

Enforced by `validate-version-consistency` (the `version` FIELD only; description prose is MANUAL):

- `.claude-plugin/plugin.json` - bump `version`; confirm whether hooks need declaration here or are auto-discovered from `hooks/hooks.json` (build-time confirmation). Optionally add a short "ships opt-in editorial guardrails + phase routing" clause to the description (no count change).
- `.claude-plugin/marketplace.json` - bump `version`; mirror any description clause.
- `.codex-plugin/plugin.json` - bump `version`. NOTE: hooks are a Claude Code primitive; Codex ignores them. The phase router and guardrails are Claude-only capabilities; the Codex manifest gains the version bump only, and the release notes must state hooks are Claude Code-only (the portable surface remains skills).
- `README.md` badge + At-a-Glance version row.
- NOT `package.json` / `site/package.json` (docs-site version, stays as-is).

### CHANGELOG + release docs

- Root `CHANGELOG.md` `## [2.25.0]` under "Added": the two hooks (opt-in guardrails, phase router) and the advisory eval tier. No "Removed" / "Changed (breaking)" entries.
- `docs/changelog.md` mirror.
- `docs/releases/Release_v2.25.0.md` (NEW; carries the `slug:` frontmatter convention the converged generator expects for release files).
- `docs/releases/index.md` - new TOP row; one-line summary: "adds the plugin's first hooks - opt-in editorial guardrails and a confident-only phase router - plus an advisory output-quality CI tier; catalog unchanged at 65."
- `README.md` "What's New" `<details>` block (inside the count-exempt guard) + release-history table row.

### User-facing reference docs (with mermaid - explicit requirement)

- A new concepts/reference page per feature under the rendered docs tree (frontmatter `title` + `description` required; `validate-docs-frontmatter` governs `docs/**` outside `docs/internal/`). Each carries its mermaid flow diagram (the site renders mermaid via the converged Astro generator):
  - guardrails page: the PreToolUse decision flow + the `.local.md` schema.
  - phase-router page: the SessionStart confidence flow + the signal-to-phase mapping.
  - eval-harness page: the three-tier model + the Phase-1 advisory-to-enforcing path.
- Regenerate any generated indexes via the site generators; `check-generated-content-untouched` must stay green (do not hand-edit generated pages).

### CONTEXT currency markers (post-tag)

- `_agent-context/claude/CONTEXT.md` and `_agent-context/codex/CONTEXT.md` bumped to v2.25.0.

---

## Exit criteria (definition of done)

1. All acceptance criteria in `spec_v2.25.0.md` (F-43, F-44, M-30 sections) pass.
2. `hooks/hooks.json` registers both hooks; the plugin still installs cleanly (`validate-plugin-install` green); hooks auto-discover (confirmed against docs).
3. F-43: with no `.local.md`, the hook is inert (a Write with an em-dash is ALLOWED). With `guardrails: true`, an em-dash Write is DENIED with the substitution reason; a malformed `.local.md` FAILS OPEN (allowed). Unit tests cover all three paths.
4. F-44: each signal fixture maps to the expected phase and injects a shortlist; a no-signal fixture injects NOTHING. Unit tests cover both confident and silent paths. The shortlist names real catalog skills for the detected phase.
5. M-30: the three validators run advisory in `validation.yml` (`continue-on-error`); each has a passing and a failing fixture in its `.test.mjs`; none is in the enforcing pre-tag bundle. Any pre-existing corpus violations are triaged (fixed or exempt-marked), not silently green.
6. Counts UNCHANGED and re-confirmed: 65 skills / 5 sub-agents across every surface; `check-count-consistency` + `check-landing-page-counts --strict` green. Version surfaces at 2.25.0; `validate-version-consistency` green.
7. The three reference docs exist with valid frontmatter and render their mermaid diagrams; `validate-docs-frontmatter` + the Astro build green. Generated pages regenerated, not hand-edited; `check-generated-content-untouched` green.
8. Pre-tag validator bundle: `scripts/pre-tag-validate.{sh,ps1} --strict` on a clean tree. Em-dash / en-dash sweep over all new files (repo hard rule; the `no-em-dashes` hook is the safety net). The new Node tests pass in CI.
9. v2.25.0 tagged (linear history - reconcile origin/main by rebase, never a merge commit, per the repo ruleset), GitHub Release published and marked Latest with the `Release_v2.25.0.md` body, marketplace registry re-pinned to v2.25.0.
10. This plan flipped to SHIPPED with the release date; `_agent-context/{claude,codex}/CONTEXT.md` currency markers updated; the eval idea doc and the roadmap entries (3.4, 3.6) flipped to "shipped v2.25.0."

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A plugin-shipped hook fires globally and surprises installers | Low (mitigated by design) | High | F-43 ships OFF (opt-in `.local.md`); F-44 only injects context (never blocks) and stays silent unless confident; fail-open on every error path |
| `PreToolUse` / `SessionStart` plugin wiring differs from assumption (auto-discovery, output shape) | Medium | Medium | Build-time confirmation gate (entrance criterion 3) against `code.claude.com/docs` BEFORE coding the hooks; thin spike first |
| F-44 phase detection is wrong and nudges the wrong skills | Medium | Low | Confident-only gate: weak signal emits nothing; a wrong confident nudge is a soft, ignorable suggestion, never a block; heuristic kept narrow (branch + artifact presence) |
| Eval invariants surface pre-existing corpus violations and turn CI red | Medium | Low | Advisory-only (`continue-on-error`) at ship; triage-then-promote per invariant; never enforcing on day one |
| no-fabricated-metrics heuristic false-positives | Medium | Low | Advisory only; `[fictional]` allowlist + a per-sample exempt marker mirroring `count-exempt`; never blocks |
| Node hook absent-runtime or path edge cases on Windows | Medium | Medium | Author cross-platform; reuse the repo's existing `.mjs` + js-yaml patterns; unit tests run on Linux + Windows in CI |
| Hooks add always-on token cost (SessionStart context) | Low | Low | Nudge injected only when confident; the unconditional cost is one cheap signal check; documented in the reference page |
| `validate-script-docs` rejects `.mjs` validators lacking a `.md` companion | Low | Low | Confirm its scope (governs the shell trio); add companion docs if required |

---

## Scope / YAGNI cuts

- **No fuzzy BLOCKING checks in F-43.** em-dash blocks; fabricated-metric and placeholder warn; employer-context is `pm-critic`'s job. No high-false-positive deny.
- **No global default-on for F-43.** Opt-in only; no attempt to auto-detect "is this a PM artifact" to gate a block (that heuristic was rejected as strictly worse than explicit consent).
- **No LLM in this release.** M-30 is Tier 1 only; no rubric scoring, no live-run regression, no golden fixtures. Those are a later scheduled harness.
- **No user-facing banner for F-44.** Silent `additionalContext` only; a visible suggestion line is a deferred toggle.
- **No prompt-hook (LLM-evaluated) phase routing.** MVP is rule-based; promotion to an LLM-judged hook is future work.
- **No enforcing eval gates at ship.** All three invariants advisory; promotion is a deliberate later step per invariant.
- **No catalog or sub-agent additions.** This release adds capability, not content; counts do not move.
- **No `${CLAUDE_PLUGIN_DATA}` cache in the MVP.** F-44 reads the committed catalog directly; a persistent cache is a later optimization (roadmap 3.5).

---

## Residual open items (tracked, not blockers for shipping)

1. **Exact plugin-hook wiring** (auto-discovery vs explicit declaration in `plugin.json`; the precise `additionalContext` field for SessionStart and the deny shape for PreToolUse) - confirmed in the build-time spike before coding.
2. **Which eval invariant goes enforcing first** (candidate: no-placeholders or exact-quote-sourcing for `foundation-prioritized-action-plan`) and whether the wider corpus needs a triage pass before any enforcing promotion - decided after the advisory run reports.
3. **`.local.md` global vs per-project enable** for F-43 (MVP is per-project) and whether F-44 should honor a `.local.md` force-on/off - additive, post-MVP.
4. **A visible (banner) F-44 mode** and the prompt-hook (LLM-judged) promotion - future toggles, out of v2.25.0.
