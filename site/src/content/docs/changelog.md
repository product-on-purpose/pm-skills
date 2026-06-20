---
title: Changelog
description: Condensed per-release summary of the pm-skills changelog, linking to the full root CHANGELOG.md and the per-release notes pages.
---

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.28.0] - 2026-06-20

**New foundation skill: stakeholder briefings (1-to-N audience fan-out).** `foundation-stakeholder-briefings` takes any source artifact (spec, discovery, research, GTM, experiment, retro, or raw notes) and produces one canonical master document plus a set of audience-tailored briefings, one per stakeholder lens (executive, board, engineering, UX, PMM, sales, CS, legal, data, or a custom audience). Master-first projection: each briefing cites the master claim IDs it draws on and carries exactly one ask, and the advisory `scripts/check-briefings-trace.mjs` validator enforces that structural contract (references resolve; one ask per block). Ships nine first-class lenses (with "not this lens when" boundaries and an overlap matrix), a source-aware audience proposal, trigger fixtures, and 18 library samples. Catalog grows 66 to 67 skills (foundation 9 to 10); 5 sub-agents unchanged. Additive MINOR. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2280---2026-06-20) and [`docs/releases/Release_v2.28.0.md`](releases/Release_v2.28.0.md).

## [2.27.1] - 2026-06-16

**Maintenance patch: classification sub-count drift gate.** `check-count-consistency` now derives the four per-classification / per-phase skill sub-counts (phase, foundation, utility, tool) from frontmatter and validates them on every doc surface, so a stale "10 utility skills" or "Foundation Skills (9)" fails CI like a stale total - closing the gap that let the classification split drift on a published page until a v2.27.0 hand audit caught it. The change is additive (the total-count check is unchanged) and historical mentions are handled with word-form numbers or `count-exempt` ranges. Three stale sub-counts the gate surfaced are fixed. No skill behavior change; catalog stays 66 skills / 5 sub-agents. PATCH. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2271---2026-06-16) and [`docs/releases/Release_v2.27.1.md`](releases/Release_v2.27.1.md).

## [2.27.0] - 2026-06-15

**The provable-quality release.** Makes skill quality verifiable and regression-protected without adding any skills. Trigger-accuracy evals (M-31): every measured skill carries labeled `evals/trigger-fixtures.json`; a controlled router eval scores per-skill recall/precision against a committed baseline; CI gates fail on routing drift or a new-skill collision. Derived surfaces (M-32): `skill-manifest.json` and the `AGENTS.md` catalog are generated from frontmatter behind enforcing staleness gates, retiring the hand-sync drift class (and the disabled `sync-agents-md.yml`). Output-quality evals (M-33): the harness, six family rubrics, the unit-tested aggregation + absolute-failure-first verdict module, a three-arm informed control, and the asset-presence gate ship (per-skill results stay internal evidence). The creator/validator family (`utility-pm-skill-builder` / `utility-pm-skill-validate` 1.1.0) now bakes the eval contract into skill creation, and the reciprocal-boundary-pointer gate is enforcing. Catalog stays 66 skills / 5 sub-agents. Additive MINOR. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2270---2026-06-15) and [`docs/releases/Release_v2.27.0.md`](releases/Release_v2.27.0.md).

## [2.26.0] - 2026-06-10

**The authoring and quality release.** The `/chain` command runs any ad-hoc ordered skill sequence through the existing `pm-workflow-orchestrator` engine (Mode B; checkpointed by default; no new engine, no new skill), and the new `utility-pm-workflow-builder` skill turns a proven chain or a fresh idea into a staged draft workflow packet for human review. The quality-convergence effort completed: all 26 original-generation skills gained "When NOT to Use" boundary pointers and enumerated output contracts with zero instruction rewrites and zero template changes. The orchestrator's native `Skill`-tool delegation path was live smoke-tested on the installed plugin before tagging (recorded PASS; the procedure is now the [Agentic Smoke-Test Runbook](contributing/agentic-smoke-runbook.md)). Catalog grows 65 to 66 skills (utility 11 to 12); command files 10 to 11. MINOR. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2260---2026-06-10) and [`docs/releases/Release_v2.26.0.md`](releases/Release_v2.26.0.md).

## [2.25.2] - 2026-06-10

**Maintenance patch: resolves the remaining 2026-06-06 Codex audit items and hardens the release gate.** Unifies the bash/PowerShell/CI validator inventory behind a single manifest (`scripts/validation-manifest.yaml`) with an enforcing CI parity referee (`scripts/check-validator-parity.mjs`) that compares each OS leg's args and enforcement and caught a live drift it then reconciled; extends the root-document link checker to source files; promotes the em-dash-scar guard to enforcing (now multi-backtick aware); and corrects the `CLAUDE.md` "internal notes are gitignored" claim. A Codex adversarial review of the release ran first and its findings were resolved before tagging. No skill behavior change. Catalog stays 65 skills / 5 sub-agents. PATCH. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2252---2026-06-10) and [`docs/releases/Release_v2.25.2.md`](releases/Release_v2.25.2.md).

## [2.25.1] - 2026-06-06

**Maintenance patch: banks accumulated untagged work since v2.25.0.** Reorganizes the documentation site to the Product on Purpose family layout (Pattern S) with full family-standard conformance, adds a generated CI-gated resource index (`docs/RESOURCES.md`) and a `docs/` front door, repairs root-document links left by the relocation and adds an enforcing CI guard for them, sweeps residual em-dash-sweep ` . ` scars to ` - ` across user-facing and internal prose with new advisory and enforcing guards to keep them out, bumps three site dependencies (`@astrojs/starlight`, `dompurify`, `astro-mermaid`), and fixes the PowerShell pre-tag validator bundle to match the bash and CI inventory. No skill behavior change and no published-URL change (route parity verified). Catalog stays 65 skills / 5 sub-agents. PATCH. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2251---2026-06-06) and [`docs/releases/Release_v2.25.1.md`](releases/Release_v2.25.1.md).

## [2.25.0] - 2026-06-03

**Activation and trust layer: the plugin's first hooks, plus an advisory output-quality CI tier.** Adds opt-in house-rule guardrails (a `PreToolUse` hook that blocks em-dash and en-dash characters when `guardrails: true` is set in `.claude/pm-skills.local.md`; placeholder and metric checks warn) and a confident-only phase router (a `SessionStart` hook that suggests the right Triple Diamond skills only when a repo signal is strong, and stays silent otherwise). Adds M-30, an advisory output-quality CI tier: three deterministic invariant validators over the recorded samples (no placeholders, exact-quote sourcing, no fabricated metrics). The hooks are dependency-free and fail open; hooks are a Claude Code primitive. No new skills (catalog stays 65; sub-agents stay 5). Additive MINOR. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2250---2026-06-03) and [`docs/releases/Release_v2.25.0.md`](releases/Release_v2.25.0.md).

## [2.24.0] - 2026-06-01

**Plan orchestrator: the `pm-workflow-orchestrator` sub-agent + `utility-pm-workflow-orchestrator` dispatch skill, plus a `--run` handoff from `foundation-prioritized-action-plan`.** Ships the orchestrator promised on the public roadmap (originally pencilled for v2.17): a governed runner that takes a saved `foundation-prioritized-action-plan` or a user-named chain and runs an ordered sequence of pm-skills against it, pausing for human go/no-go by default and refusing to advance past a failed or empty step (CHECKPOINTED default, GUARDED AUTO via `--auto`). The engine sub-agent delegates via the `Skill` tool only, adding no chain-permission entry. The plan skill iterates to v1.1.0 with an optional `--run` handoff for its runnable Section 7 prompts. Catalog grows 64 to 65 (utility 10 to 11; foundation unchanged at 9); sub-agents 4 to 5. EXPERIMENTAL on all non-Claude clients, and the native `Skill`-from-sub-agent path is EXPERIMENTAL until a live smoke test. Additive MINOR. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2240---2026-06-01) and [`docs/releases/Release_v2.24.0.md`](releases/Release_v2.24.0.md).

## [2.23.0] - 2026-05-31

**New foundation skill: `foundation-prioritized-action-plan`.** Turns any PM input (notes, transcripts, drafts, executive asks, raw situations) into one evidence-grounded, prioritized action plan: the critical next effort plus follow-ons, each with why, what, how, confidence, and source. Theory of Constraints ranks by the single binding constraint; Cynefin caps plan confidence (probes for Complex, stabilization for Chaotic). A source ledger is built before analysis and every load-bearing claim cites an exact input quote, so the skill refuses High-confidence plans for Complex or Chaotic situations. Catalog grows 63 to 64 (foundation 8 to 9). Additive MINOR. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2230---2026-05-31) and [`docs/releases/Release_v2.23.0.md`](releases/Release_v2.23.0.md).

## [2.22.0] - 2026-05-30

**Wrapper deletion (one menu entry per skill) + native Codex support.** The 63 hand-maintained short command wrappers are removed, so each capability appears once in the `/` menu as the skill; only the 10 `/workflow-*` orchestrator commands remain (commands 73 to 10). A native `.codex-plugin/plugin.json` is added so Codex discovers the skills. All 63 skill names and behavior are unchanged; master-plan D6 (the sub-agent companion-command contract) is retired. MINOR. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2220---2026-05-30) and [`docs/releases/Release_v2.22.0.md`](releases/Release_v2.22.0.md).

## [2.21.0] - 2026-05-26

**Marketplace Launch (additive).** pm-skills is now published through the new `product-on-purpose` marketplace, a single home for multiple Product on Purpose plugins. Distribution change only: catalog (63), commands (73), sub-agents (4), and behavior are unchanged; the existing self-hosted path keeps working, so no user has to act. MINOR (backward-compatible). Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2210---2026-05-26) and [`docs/releases/Release_v2.21.0.md`](releases/Release_v2.21.0.md).

## [2.20.0] - 2026-05-25

**Sprint Workflow Commands + Validation/Doc Hardening.** The three workshop methodologies become single slash commands (`/workflow-foundation-sprint`, `/workflow-design-sprint`, `/workflow-foundation-to-design`; slash commands 70 to 73), and `check-count-consistency` is tightened to catch stale counts in table, parenthetical, and singular-noun phrasings. No new skills (catalog stays 63). Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2200---2026-05-25) and [`docs/releases/Release_v2.20.0.md`](releases/Release_v2.20.0.md).

## [2.19.0] - 2026-05-23

**Pre-Promotion Hardening.** No new skills (catalog stays 63); the release closes the blind spots the v2.18.0 arc exposed: a new `check-skill-cross-references` validator, `.mdx` count scanning, same-page anchor link validation, `validate-script-docs` flipped to enforcing, and `.gitattributes` line-ending pinning. 23 pre-existing broken links/anchors fixed. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2190---2026-05-23) and [`docs/releases/Release_v2.19.0.md`](releases/Release_v2.19.0.md).

## [2.18.0] - 2026-05-21

**Highest-Consensus PM Skill Gaps: 4 New Content Skills.** `discover-market-sizing`, `define-prioritization-framework`, `discover-journey-map`, and `measure-survey-analysis` ship as a slate (catalog 59 to 63; phase skills 26 to 30). Each ships with a TEMPLATE, EXAMPLE, companion command, and 3 thread-aligned samples, and each leads with epistemic discipline (refuses to fabricate data). Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2180---2026-05-21) and [`docs/releases/Release_v2.18.0.md`](releases/Release_v2.18.0.md).

## [2.17.0] - 2026-05-20

**Native Claude Code Sub-Agent Registration + Frontmatter Spec Alignment.** The 4 sub-agents now register natively (definitions moved to the canonical `agents/` directory, auto-discovered via `@`-mention); the coordination directory was renamed `AGENTS/` to `_agent-context/` to free the name. Skill frontmatter migrated to the metadata-nested structure per the agentskills.io specification, and the CI validators were made bash-3.2 portable. Catalog unchanged at 59. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2170---2026-05-20) and [`docs/releases/Release_v2.17.0.md`](releases/Release_v2.17.0.md).

## [2.16.2] - 2026-05-19

**Post-v2.16.1 Audit Hygiene Fast-Patch.** Refreshed the `_agent-context/claude/CONTEXT.md` Status block and wired `check-context-currency` into the pre-tag bundle so future CONTEXT.md drift is caught at pre-tag time. Same 59-skill catalog; no skill content changes. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2162---2026-05-19) and [`docs/releases/Release_v2.16.2.md`](releases/Release_v2.16.2.md).

## [2.16.1] - 2026-05-18

**Plugin Manifest Schema Patch.** Removed an invalid `agents` field from `.claude-plugin/plugin.json` that caused `/plugin update pm-skills` to fail validation. Same 59-skill catalog; dispatch skills unchanged; day-to-day usage identical to v2.16.0. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2161---2026-05-18) and [`docs/releases/Release_v2.16.1.md`](releases/Release_v2.16.1.md).

## [2.16.0] - 2026-05-17

**Active Orchestration + Doc-Stack Modernization.** Four Claude Code plugin sub-agents (`pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`) codify the adversarial-review loop and the 6-gate release runbook (with the G2.5 commit gate that prevents broken tags); cross-client access via dispatch skills brings the catalog to 59. The doc-stack upgrades to Astro 6.3.x + Starlight 0.39.x + Node 22.12+, closing 2 Dependabot alerts. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2160---2026-05-17) and [`docs/releases/Release_v2.16.0.md`](releases/Release_v2.16.0.md).

## [2.15.2] - 2026-05-17

**v2.15.x Cycle Closeout + v2.16.0 Plan Reconciliation.** Same-cycle closeout patch successor to v2.15.1. No source-code, validator behavior, or catalog changes. Pure planning-doc hygiene: v2.15.x audit doc status flipped from DRAFT to REMEDIATION SHIPPED with finding-by-finding closure table; v2.15.0 master plan "What's next" updated with v2.15.1 + v2.15.2 DONE rows; v2.16.0 plan slate reconciled against v2.15.1 shipped reality (repo-hygiene CONTEXT.md prereq marked DONE; ci-plan validator scope reduced from "5 new" to "2 new + 1 extension" with carry-in reconciliation section); AGENTS/claude/CONTEXT.md refreshed to v2.15.2 SHIPPED state; issue #132 [M-20] comment with v2.15.1 partial-close evidence. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2152---2026-05-17) and [`docs/releases/Release_v2.15.2.md`](releases/Release_v2.15.2.md).

## [2.15.1] - 2026-05-16

**v2.15.0 Post-Tag Audit Remediation + Preventive CI.** Same-day patch successor to v2.15.0. The 55-skill catalog is unchanged; day-to-day usage is identical. What changes is documentation accuracy on the docs site (homepage refreshed at 55 skills with Tool card; skills landing page Tool row added; workflow index regenerated with all 12 workflows; AGENTS.md command table extended with 23 missing rows including 5 pre-existing legacy drift items; sample-library README refreshed at 171 samples; Sprint Planning gets `(agile)` naming-discipline qualifier), a real workflow-generator bug fix (hardcoded `workflow_info` dict that silently dropped new workflows from the index; hardened to fail loudly), and 4 new preventive CI validators (landing-page count assertion, workflow-generator coverage, AGENTS.md command-sync, pre-tag validator bundle orchestration). Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2151---2026-05-16) and [`docs/releases/Release_v2.15.1.md`](releases/Release_v2.15.1.md). Audit document at [`docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md).

## [2.15.0] - 2026-05-16

**Sprint Skills Launch.** 15 new skills under the new `classification: tool` taxonomy implementing Knapp/Zeratsky/Kowitz canonical sprint methodologies: 7 Foundation Sprint family + 7 Design Sprint family + 1 tool-note-and-vote standalone. Skill catalog 40 to 55. Two family contracts (FS v0.3.0; DS v0.2.0; both with Naming Discipline section) and enforcing CI validators (with --strict release-mode). End-to-end FS-to-DS workflow with a narrative-only handoff conversation (replaces dropped bridge skill). 45 library samples across 3 narrative threads (Brainshelf, Storevine, Workbench). Two operational user guides + two concept docs + a sprint-family doc set (FAQ + cheat sheet + case studies + recovery playbook per family) + a workshop-sprint vs agile-sprint disambiguation reference + a sprint methodology glossary + a workshop method comparison matrix. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2150---2026-05-16) and [`docs/releases/Release_v2.15.0.md`](releases/Release_v2.15.0.md).

## [2.14.2] - 2026-05-10

Codex Final Review Closure (Cumulative Docs Hygiene Patch). Same-day successor to v2.14.1. The 40-skill catalog is unchanged from v2.14.1; day-to-day usage is identical. What changes is documentation accuracy, validator scope, workflow safety posture, and cross-repo metadata. Addresses every actionable finding from the Codex final review of the v2.14.x release cycle (0 P0, 1 P1, 11 P2, 1 P3). Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2142---2026-05-10).

Highlights:

- **`validate-docs-frontmatter` scope expanded to `.mdx`** (Codex P2). Bash + pwsh now include `docs/index.mdx` and any future MDX surfaces. Mirrors V6's `check-internal-link-validity` pattern.
- **`check-no-body-h1` doc clarified** with "What this rule does NOT catch (by design)" section. Prevents future over-engineering into a no-H1-anywhere rule.
- **`validate-mcp-sync` guide refreshed** for observe-mode default + maintenance-flag awareness (matches v2.14.1 V9 + B changes).
- **`sync-agents-md.yml` workflow_dispatch hardened** with two-layer defense: `apply: true` input gate (default false) plus `permissions: contents: read` token gate. Reviving requires a code-reviewable PR.
- **`pm-skills-mcp/README.md` cross-repo update** (Codex P1). 5 "25 skills" residues to "40 skills" (catalog frozen at v2.9.2 build); v2.9.3 latest pointer; changelog table extended with v2.8.x + v2.9.x rows.
- **`CONTRIBUTING.md` workaround count** corrected "Five" to "Six" (Codex P3).
- **Release plan top status + Release_v2.14.0 deferrals table** reframed: 6 of 9 deferrals closed in v2.14.1 + v2.14.2; 3 remain v2.15+.
- **Version surfaces refreshed**: shields.io badge `2.14.1` to `2.14.2`; Latest stable + Published tag; docs/index.mdx Recent Releases; docs/releases/index.md; .claude/pm-skills-for-claude.md; plugin.json + marketplace.json.

## [2.14.1] - 2026-05-10

Polish + V15 regression fix. Patch release. The 40-skill catalog is unchanged from v2.14.0. Title duplication fixed across all Starlight pages; generator output reframed for users; Mermaid 3-layer beautification; two CI validators promoted to truly enforcing; new check-no-body-h1 validator added; MCP maintenance posture codified. Full details in root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2141---2026-05-10).

Highlights:

- **Mermaid style guide** (FU8): canonical reference at `docs/reference/mermaid-style-guide.md` + self-contained HTML preview at `public/mermaid-style-guide.html`. 5 diagram-type examples + Triple Diamond palette + dark mode notes + machine-readable YAML spec for agents.
- **7 README stubs** added across all docs/ subdirectories (FU7). GitHub directory landing pages distinct from Astro-built index.md.
- **Two validators promoted to truly enforcing** in CI: `check-internal-link-validity` (FU6) and `validate-docs-frontmatter` (V5). Both now run with `--strict` / `-Strict` flag. Cleanup involved adding descriptions to 20 docs and fixing 7 broken doubled-docs-prefix links via generator path-rewrite.
- **MCP maintenance posture documented** (V9): pm-skills-mcp/pm-skills-source.json updated to v2.14.0 metadata + `maintenance: true` flag (cross-repo); pm-skills validate-mcp-sync.yml default flipped from `block` to `observe` so drift no longer fails CI. The drift is the maintenance posture, not a bug.
- **Mermaid 3-layer beautification** (M1+M2+M3): astro.config.mjs themeVariables (indigo lineColor + system-ui font); src/styles/custom.css polish (edge stroke-width + node corner-radius + cluster fill-opacity); Triple Diamond classDef palette applied to home page diagrams.
- **Generator output reframed for users** (V10): removed visible `:::caution[Generated file]` aside from 63 generator-output pages; users no longer see contributor-noise on rendered pages. Pattern 5C frontmatter marker preserved.
- **45 library sample files swept** of 182 en-dashes (V11). Pre-existing latency exposed when V10 regenerated downstream docs.
- **9 GitHub Actions workflow files bumped** to `@v5` for `checkout`, `setup-node`, `upload-pages-artifact`, `deploy-pages` (FU4). Ahead of Node 20 forced cutoff 2026-06-02.
- **sync-agents-md.yml auto-trigger disabled** (V7). Had been failing since 2026-04-23 due to flat skills/ structure mismatch; AGENTS.md is hand-authored canonical content.
- **README + plan + CONTEXT.md drift swept** (FU1 + V12-V14): stale v2.13.1 references in shields.io badge, "Latest stable", Published tag, docs/index.mdx, .claude/pm-skills-for-claude.md all bumped to v2.14.0; AGENTS/claude/CONTEXT.md status block refreshed; both v2.14.0 plans annotated with post-tag follow-up summary; both CHANGELOGs got this Unreleased section.
- **Body H1 stripped across 62 hand-authored docs + 6 generator emission sites** (V15). Starlight auto-renders frontmatter `title:` as the page heading; body also starting with `# Heading` matching the title produced duplication on every Starlight-rendered page (regression from MkDocs Material migration). User-reported on `/showcase/workbench/` + skill pages + phase indexes. Fix: 3 generators no longer emit body H1; workflow generator strips source H1 at copy boundary (`_workflows/*.md` source files stay standalone-readable on GitHub).
- **MCP maintenance flag awareness in `validate-mcp-sync.js`** (post-V15 deferral closure B). Validator reads `pm-skills-mcp/pm-skills-source.json` `maintenance: true` flag and treats drift as expected when set. Makes source.json authoritative for maintenance posture; V9 workflow-default flip becomes redundant safety.
- **New `check-no-body-h1` validator** (post-V15 deferral closure C). 3rd truly-enforcing CI validator added (after FU6 + V5 promotions). Refuses any `docs/**/*.{md,mdx}` file (subject to EXCLUDE_PATHS) where first non-blank line after closing `---` is a `# H1` (when file has frontmatter title). Forward enforcement against V15 regression. Validator inventory: 24 total (was 23 at v2.14.0 tag); truly enforcing: 14 (was 11 at tag, +2 from FU6+V5, +1 from this validator).
- **CONTRIBUTING.md workaround #6** (post-V15 deferral closure A). Documents the Starlight title-vs-body-H1 convention for future contributors.

## [2.14.0] - 2026-05-10

Doc Stack Migration: MkDocs Material to Astro Starlight. Doc-stack migration release. The 40-skill catalog is unchanged from v2.13.x; day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the rest of the catalog is identical. What changed is the documentation site itself: MkDocs Material is retired; Astro Starlight ships in its place. The user-visible site continues to serve the same content under a modern static-site stack. 4 phases / 13 workstreams executed.

### Added

- Astro Starlight stack pinned in `package.json`: `astro ~5.13.0`, `@astrojs/starlight ~0.34.0`, `astro-mermaid ~2.0.1`, `sharp ^0.34.5`.
- `astro.config.mjs` authoring (sidebar IA, redirects, mermaid, custom CSS); `src/content.config.ts` glob loader (in-place docs/ mount + library/skill-output-samples/ remap to /samples/).
- `.github/workflows/deploy-pages.yml` GitHub Actions Pages deploy (composable steps preserve post-build .md link sweep).
- `scripts/verify-edit-links.mjs` post-build edit-link verifier (238/238 unique targets resolve).
- `scripts/post-build-strip-md-links.mjs` post-build .md link sweep (Codex P0 fix from Phase 2; strips 440 links across 59 files).
- `docs/reference/index.md` and `docs/samples/index.md` overview pages (W13 B2.5 routing fixes).
- `public/favicon.svg` (Triple Diamond mark).
- `src/styles/custom.css` minimal port from Material extra.css.
- `docs/internal/dependency-policy.md` "Known accepted CVEs (static-site exemption)" section per DM-4.
- `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-migration.md` master migration plan; spike report.
- `docs/releases/Release_v2.14.0.md` release notes.

### Changed

- Build pipeline: `mkdocs build --strict` (Python pip) to `npm run build` (Node 22.x).
- Deploy pipeline: `mkdocs gh-deploy` to GitHub Actions Pages source (auto-deploys on push to main).
- Generator output reframe (W5.5): pymdownx admonitions to Starlight asides; MDX details for collapsibles. 38 doc pages regenerated.
- Home page rewrite (W11 C3): `docs/index.md` to `docs/index.mdx`; 31 pymdownx shortcodes converted to Starlight `<CardGrid>` + `<Card icon=...>`.
- 4 source validators decoupled from `mkdocs.yml` (W12 C2); hardcoded EXCLUDE_PATHS arrays mirror src/content.config.ts glob excludes.
- Validator inventory net -1 (24 to 23): `check-nav-completeness` retired (Starlight autogenerate solves orphan class structurally).

### Removed

- `mkdocs.yml`, `requirements-docs.txt`, `.github/workflows/deploy-docs.yml`, `.github/workflows/validate-docs.yml`, `scripts/check-nav-completeness.{sh,ps1,md}`, `docs/stylesheets/extra.css`.

### Fixed

- `/reference/` 404 (B2.5 F1): README.md kept as GitHub-directory landing pointer; new index.md is the Astro source-of-truth at `/reference/`.
- `/samples/` 404 (B2.5 F2): authored `docs/samples/index.md`; Samples sidebar switched to hybrid items.
- Redirect destinations landing at "Site not found · GitHub Pages" (B2.5 F3): prepended `/pm-skills/` to all 12 destinations.
- Favicon 404 + Material/Octicon shortcode leakage on home + showcase pages (W11 C3).

### Compatibility

- All 40 skills, 47 slash commands, 9 workflows, 115 mounted samples, and source-side editing flows are unchanged from v2.13.x.
- Codex compatibility unaffected (reads from `skills/` and `AGENTS.md` directly).
- Sync-helper, `npx skills add`, and `/plugin marketplace add` install paths unaffected.
- `pm-skills-mcp` companion server unaffected.
- Inbound-link compatibility for Material-era URLs: all 12 redirect entries preserved with `/pm-skills/` base path.

### Security

- Astro 5.13.x static-site CVE exemption documented in `docs/internal/dependency-policy.md`. 5 advisories on the pinned version are accepted as not-applicable to pm-skills' SSG runtime profile (no SSR, no server islands, no Cloudflare adapter).

> Full release narrative: see [`Release_v2.14.0`](releases/Release_v2.14.0.md).

## [2.13.1] - 2026-05-06

Plugin Install Path Correction. Patch release. The 40-skill catalog is unchanged from v2.13.0; day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, etc. is identical. What changes is the plugin install path: `/plugin marketplace add product-on-purpose/pm-skills` now succeeds, where it had failed silently since v2.7.0 due to two unrelated bugs in `marketplace.json` (wrong location and missing schema fields).

### Fixed

- **`marketplace.json` relocated** from repo root to `.claude-plugin/marketplace.json`, the canonical path Claude Code's plugin system reads from. Move performed via `git mv` so file history is preserved. The repo-root location is no longer present.
- **README count-exempt markers extended** to cover the "Previous Release Details" section. Pre-release CI surfaced 3 pre-existing stale per-version counts in historical release blocks (v2.9.0 "31 skills", v2.8.0 "29 skills", v2.7.0 "27 skills") that fell outside the v2.13.0 count-exempt range. These are correct as historical statements about what shipped at each version; the wrap restores `check-count-consistency` to PASS without rewriting historical text.
- **`marketplace.json` schema corrected** to satisfy Claude Code's marketplace registry:
    - Added top-level `owner` object with `name` and `url` (required field; was absent).
    - Converted plugin entry's `author` from a bare string to an object with `name` and `url` (string form is rejected by the schema).
    - Both changes are non-behavioral; the same plugin metadata is now expressed in the schema-conformant shape.

### Added

- **`scripts/validate-plugin-install.{sh,ps1,md}`** (enforcing). New CI validator that asserts the plugin install path will work end-to-end. Verifies both manifests exist at canonical paths (`.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`), validates required fields against Claude Code's marketplace schema (`name`, `owner.name`, `plugins`, per-plugin `name` + `version` + `source` + `author` as object), and enforces cross-manifest version + name consistency. Catches the exact bug class that shipped silently from v2.7.0 through v2.13.0.
- **`docs/releases/Release_v2.13.1.md`** authored as the release notes artifact.
- **`docs/internal/release-plans/v2.13.1/plan_v2.13.1.md`** authored as the release plan.

### Changed

- **`scripts/validate-version-consistency.{sh,ps1}`** updated to read `marketplace.json` from `.claude-plugin/marketplace.json` instead of the repo root. Continues to enforce that plugin.json and marketplace.json declare the same version.
- **`README.md` "Install as Claude Code Plugin" section** rewritten. Primary path is now the `/plugin marketplace add` + `/plugin install` flow that the marketplace registration enables. Manifest-direct install (the prior text) retained as a fallback for older Claude clients.
- **`.claude/pm-skills-for-claude.md`** updated to acknowledge plugin install as a parallel path alongside the sync-helper. No primary recommendation between the two paths in this release; recommendation positioning deferred to v2.14.0 or later.
- **Validator inventory grows from 22 to 23** (1 new enforcing). Enforcing tier grows from 10 to 11.

### Compatibility

- **No content changes.** All 40 skills, 47 slash commands, 9 workflows, 126 library samples, and 22 CI scripts are unchanged from v2.13.0.
- **Codex compatibility unaffected.** Codex (and any non-Claude-Code agent) reads from `skills/` and `AGENTS.md` directly; `marketplace.json` is Claude-Code-specific. The file move and schema additions have zero impact on Codex usage.
- **Sync-helper install path unaffected.** Users who install via `scripts/sync-claude.sh` see no change.
- **`pm-skills-mcp` companion server unaffected.** v2.9.x maintenance line continues independently.

## [2.13.0] - 2026-05-05

Foundation Hardening + Doc Stack Decision. Maintenance and quality release. The 40-skill catalog is unchanged from v2.12.0, so day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the rest of the catalog is identical. What changed is everything around the catalog: cleaner Diataxis-aligned documentation (duplicate files removed, counts reconciled, generated pages clearly labeled, `pm-skill-*` filename prefix convention), 7 new CI gates that catch doc drift on PRs automatically (validator inventory 15 to 22; enforcing tier 5 to 10), and an out-of-cycle `pm-skills-mcp` v2.9.3 security-patch follow-up to the v2.9.2 maintenance-mode announcement that cleared all 8 open Dependabot moderate advisories.

### Added

- **7 new CI validators** (Bucket C) each with `.sh` + `.ps1` + `.md` triplet completeness:
    - `check-nav-completeness` (enforcing): every `docs/**/*.md` is in nav OR `exclude_docs` OR auto-include patterns
    - `check-generated-content-untouched` (enforcing): snapshots, regenerates, diffs, restores; fails on hand-edits to generated pages. Pairs with Pattern 5C generated-content marker from Bucket A.4.
    - `validate-references-cross-doc` (enforcing): every cross-link in `docs/reference/` resolves
    - `validate-skill-family-registration` (enforcing): registry-driven family validation (`meeting-skills-family` plus future families); F-36
    - `validate-docs-frontmatter` (advisory): every rendered doc has title plus description
    - `check-internal-link-validity` (advisory): zero broken internal links across the doc tree
    - `check-version-references` (advisory): version-reference drift detector
- **Pattern 5C generated-content marker** on all 63 generated pages: `generated: true` and `source: scripts/...` frontmatter fields plus a visible `!!! warning "Generated file"` admonition pointing editors to the source. All 3 generators (`generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) emit the marker.
- **F-34 `library/skill-output-samples/THREAD_PROFILES.md`**: machine-readable per-thread metadata contract for tooling consumers (`utility-pm-skill-builder` primary; future regen tools).
- **Zensical compatibility spike report** at `docs/internal/release-plans/v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md`. Decision artifact for v2.14.0+ stack-decision discussions; outcome NO-GO.

### Changed

- **Doc structure refactor (Bucket A):** `docs/frameworks/` retired (canonical Triple Diamond reference moved to `docs/concepts/triple-diamond-delivery-process.md`); 4 concept files reorganized to `docs/reference/` and `docs/guides/` per Diataxis 4-quadrant taxonomy; 4 legacy duplicate files deleted; `creating-skills.md` renamed to `creating-pm-skills.md` per the locked `pm-skill-*` prefix convention.
- **Count and link cleanup (Bucket B):** skill counts reconciled across 7 public surfaces (concepts, reference, guides, getting-started, mkdocs config, homepage hero) at 40; `utility-pm-skill-builder` catalog table updated; `docs/guides/mcp-setup.md` deleted and redirected to `mcp-integration.md`; `AGENTS/codex/CONTEXT.md` shrunk 74 to 32 lines as a vestigial-redirect; README "What's New" workaround replaced with explicit HTML-comment markers; `docs/guides/index.md` expanded from 7 to 12 listed guides.
- **5 PowerShell parity bugfixes (Bucket C):** `check-stale-bundle-refs.ps1`, `check-workflow-coverage.ps1`, `check-generated-freshness.ps1`, `lint-skills-frontmatter.ps1`. PS1 versions now match bash output.
- **`check-count-consistency` tightened and promoted to enforcing** for current-state files. Original line-level `v[0-9]+\.` exemption replaced with explicit HTML-comment markers plus a subset-descriptor exclusion list.

### Infrastructure

- **Phase 0 Adversarial Review Loop** applied across per-strand (PR.1) and release-state (PR.2) layers. PR.1 closed via 4 Codex tasks. PR.2 closed via 5 Codex review rounds + 3 resolution passes (8 numbered rounds total).
- **Stale-aggregate-counter pattern codified** as durable feedback memory after PR.2 round 2 caught it at meta level.
- **Validator inventory grows from 15 to 22** (7 new). **Enforcing tier grows from 5 to 10** (4 new enforcing + count-consistency promoted).

### Out-of-cycle (pm-skills-mcp companion server)

- **`pm-skills-mcp` v2.9.2** (2026-05-05): formal maintenance-mode announcement (effective 2026-05-04). Re-embeds the full current 40-skill catalog at v2.9.2 build time. Total tools: 59 (40 skill + 11 workflow + 8 utility). Active development paused; security patches and critical bug fixes will continue.
- **`pm-skills-mcp` v2.9.3** (2026-05-05): security-patch follow-up two hours after v2.9.2. Cleared all 8 open Dependabot moderate advisories. Post-ship Dependabot open-alert count: 0. The 2-hour announcement-to-patch turnaround validates the v2.9.2 maintenance-mode commitment in operational practice.

> See the root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md) for the complete v2.13.0 entry with full Bucket / Fixed / Deferred sections.

## [2.12.0] - 2026-05-01

OKR Skills Launch. First release with the OKR Skills set: `foundation-okr-writer` and `measure-okr-grader` covering the full quarterly OKR write-and-score cycle. Adds 2 new skills (40 total) and 6 new thread-aligned library samples (126 total). Both skills shipped together so cross-skill hand-offs and the canonical 5-value OKR type enum (`committed | aspirational | learning | operational_health | compliance_or_safety`) are coherent at first appearance. Internal `utility-pm-skill-builder` packet-format simplification bundled silently. Phase 0 Adversarial Review Loop applied across both skills with 3 review rounds converged before tag.

### Added

- **`foundation-okr-writer`** with command `/okr-writer`. Drafts, reviews, rewrites, and coaches outcome-based OKR sets. Five entry modes (Guided default, One-Shot via `--oneshot`, Sustained Coach, Audit Only, Rewrite). Empowered-team diagnostic with conditional Disclosure section in the artifact when feature-team signals are present. 16-item anti-pattern catalog. Constraint Rules block (MUST / MUST NOT). Quality Audit Rubric. Refuses to fabricate baselines or targets, refuses compensation coupling, reframes feature-delivery KRs into outcome KRs.

- **`measure-okr-grader`** with command `/okr-grader`. Scores completed OKR sets at cycle close per the canonical type enum: `aspirational` numeric, `committed` pass/fail, `compliance_or_safety` binary, `operational_health` pass/fail/drift-within-tolerance, `learning` validated/invalidated. Indicator class `guardrail` is independent of OKR type and adds a never-averaged-into-primary-score rule. Special states: `not-yet-observable` (cycle-window extensions past close) and `not-yet-fully-observable` (committed or compliance_or_safety with partial coverage; never softened to pass-on-in-scope). Refuses retroactive target changes, retroactive scope shrinkage on committed or compliance_or_safety KRs, and use of OKR scores for individual performance ratings. Hands off learnings to `iterate-lessons-log`, team-process work to `iterate-retrospective`, assumption tests to `define-hypothesis`, measurement gaps to `measure-dashboard-requirements` or `measure-instrumentation-spec`, and next-cycle drafting to `foundation-okr-writer`.

- **6 thread-aligned library samples** at `library/skill-output-samples/`. 3 per skill across the storevine, brainshelf, and workbench threads. The storevine Campaigns thread now spans `measure-experiment-results`, `foundation-okr-writer`, and `measure-okr-grader` for a complete write-and-score arc on a single product context. Brainshelf samples demonstrate retention-thesis invalidation via a 1.6x at-scale multiplier vs the 3.4x in beta. Workbench samples demonstrate mixed-empowerment scoring: committed KR fail not softened to aspirational, compliance_or_safety KR marked not-yet-fully-observable on partial audit coverage, and committed KR with `guardrail` indicator class held within threshold band.

- **`docs/skills/foundation/foundation-okr-writer.md`** and **`docs/skills/measure/measure-okr-grader.md`** mirror pages auto-generated by `scripts/generate-skill-pages.py`. Both skills appear in `mkdocs.yml` nav under their phase / classification section.

### Changed

- **`utility-pm-skill-builder`** packet format simplified. The Step 5 Skill Implementation Packet definition was reduced from 13 to 12 items per the prior session's quiet refactor; nothing downstream depends on the removed item, and the packet format change does not affect any shipped skill or sample. Bundled silently with the OKR launch per design.

- **`foundation-okr-writer/SKILL.md`** cross-reference cleanups now that the grader exists. Line 45 redirects scoring users directly to `/okr-grader`. Line 184 drops the "planned for a later release" framing.

- **README.md** skill counts and version badge bumped: 38 → 40 skills (26 phase + 8 foundation + 6 utility), version 2.11.1 → 2.12.0.

- **`.claude-plugin/plugin.json` and `marketplace.json`** version bumps to 2.12.0 with descriptions updated to reflect the 40-skill total and the new OKR Skills set.

- **`library/skill-output-samples/README_SAMPLES.md`** updated for the 6 new OKR samples: total samples 120 → 126, total skills 38 → 40, Browse by Skill table extended, all three thread tables extended with OKR rows, footer version refreshed.

### Infrastructure / process

- **Phase 0 Adversarial Review Loop** applied across both new skills. The grader's 3-round review converged on stable findings: round 1 caught 1 HIGH (workbench compliance KR retroactive scope shrinkage in sample) and 2 MEDIUM (`/define-hypothesis` nonexistent slash command, OKR-type-vs-indicator-class taxonomy drift); round 2 caught 2 MEDIUM (taxonomy drift propagation to TEMPLATE.md and sample KR3 framings); round 3 returned 0 findings. The writer's earlier review caught 1 generator-script bug (HTML attribution comment rendering as page H1) and 1 nonexistent-command directive, both resolved before the writer commit.

- **Em-dash sweep extension** across the auto-generated `docs/skills/` mirror to keep the mirror in sync with the standing no-em-dash rule applied to source SKILL.md files.

- **`docs/internal/audit-ci/` reorganized** into `docs/internal/audit/_archived/` to consolidate audit history under a single tree.

- **`docs/internal/release-plans/v2.12.0/skills-manifest.yaml`** authored to match the v2.11.0 manifest format. Lists the two new skills with `previous_version: null`, `change_type: added`, version 1.0.0.

- **`docs/releases/Release_v2.12.0.md`** authored with the standard release notes structure (TL;DR, mermaid summary, Added / Changed / Infrastructure sections, validation, links).

## [2.11.1] - 2026-04-22

skills.sh CLI compatibility patch. Unblocks `npx skills add product-on-purpose/pm-skills` so the full 38-skill library is discoverable and installable through the open [`skills` CLI](https://github.com/vercel-labs/skills) and the skills.sh directory. No behavioral changes to any skill.

### Fixed

- **6 foundation skills** silently dropped by the skills CLI's strict YAML parser because each SKILL.md opened with an HTML attribution comment before the `---` frontmatter delimiter. Leading comment removed from `foundation-lean-canvas`, `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-recap`, `foundation-meeting-synthesize`, `foundation-stakeholder-update`. Attribution is preserved via the identical comment that already lives immediately after the frontmatter block in each file.
- **`foundation-meeting-synthesize` description** contained an inline `": "` (colon-space) that strict YAML parsers interpret as a nested key-value separator, truncating the description. Reworded to split the sentence. Version bumped 1.0.0 → 1.0.1.
- **25 stale tracked files under `.claude/skills/`** (pre-v1 personal-setup relics) removed via `git rm`. The path was already gitignored; these files predated the rule. Affected directories: `init-project/`, `init-project-jpkb/`, `wrap-session/`.

### Added

- **`skills` CLI install path** in README as the recommended first option, with one-line `npx skills add product-on-purpose/pm-skills` and a new row in the Installation Options table. New skills.sh shield badge in the header badge row.
- **New lint rules** in `scripts/lint-skills-frontmatter.sh/.ps1/.md`:
  - First line of every SKILL.md must be the `---` YAML delimiter (no preamble, comments, or attribution headers above it).
  - Unquoted `description` field must not contain inline `": "` patterns. If a colon is required, wrap the full description value in double quotes.
- **Distribution plan** at `docs/internal/distribution/2026-04-22_skills-sh.md` documenting the six-phase submission approach (Phase 0 through 3 complete as of this release; Phase 4 optional; Phase 5 is a post-release soft-launch workstream).

### Changed

- **Em-dash sweep completion**: 376 tracked files swept, 5,805 em-dash characters replaced with `.` per the 2026-04-13 standing style rule. Zero behavioral change. Brings total em-dashes in tracked files to 0 (previous partial sweep had reduced a subset; this completes it across the full repo).
- **Stale count reconciliation**: 8 current-state skill-count references across 5 files updated from `27 skills` or `31 skills` to `38 skills` (`docs/agent-skill-anatomy.md` had 4 instances; one each in `docs/skills/utility/utility-pm-skill-builder.md`, `scripts/README_SCRIPTS.md`, `skills/utility-pm-skill-builder/SKILL.md`, and `skills/utility-pm-skill-builder/references/EXAMPLE.md`). Historical per-release count snapshots in README "What's New" sections intentionally left untouched as accurate records of past release states.
- **`README.md` version badge** bumped from 2.11.0 to 2.11.1.

### Infrastructure / process

- Dry-run against live skills CLI (`npx skills add <local path> -l`) added as a de facto pre-release validation. Phase 3 of the distribution plan documents the exact commands. Recommended for any future release that touches SKILL.md frontmatter.

## [2.11.0] - 2026-04-18

Foundation-phase expansion release. Ships 6 new foundation skills (lean canvas + 5-skill meeting lifecycle family), a canonical skill-family contract pattern enforced by CI, 15 thread-aligned library samples, and end-user documentation. First pm-skills release with a cross-cutting skill-family contract. Two rounds of Codex adversarial review before tag.

### Added

**6 new foundation skills**:
- **F-26: `foundation-lean-canvas`** (`/lean-canvas`) - one-page business thesis across 9 interlocking blocks with optional HTML visual rendering (content + visual modes; Ash Maurya nine-block layout; 3 thread samples)
- **F-18: `foundation-meeting-agenda`** (`/meeting-agenda`) - attendee-facing agenda with time-boxed topics, type tags, owners, prep; 10 meeting-type variants; anti-meeting check with synchronous-value requirement
- **F-25: `foundation-meeting-brief`** (`/meeting-brief`) - user's private strategic prep with stakeholder reads, ranked outcomes, anticipated Q&A; `visibility: private` default
- **F-27: `foundation-meeting-recap`** (`/meeting-recap`) - topic-segmented post-meeting summary with decisions bold-flagged and actions inline; auto-discovers sibling agenda; ownership reconciliation threshold at 30% unassigned
- **F-17: `foundation-meeting-synthesize`** (`/meeting-synthesize`) - cross-meeting archaeology surfacing patterns, trajectories, contradictions; format hints (board-prep, onboarding, retro-input, exec-brief)
- **F-28: `foundation-stakeholder-update`** (`/stakeholder-update`) - async outward comms with 5 channel × 5 audience variants; explicit Shareable update boundary

**Meeting Skills Family Contract v1.1.0** at `docs/reference/skill-families/meeting-skills-contract.md` - canonical, CI-enforced, shipped after two rounds of adversarial review with errata-within-version.

**New directory pattern** `docs/reference/skill-families/` with landing-page index for future cross-cutting skill-family contracts.

**Enforcing CI validator** `scripts/validate-meeting-skills-family.sh` + `.ps1` + `.md`, wired into `.github/workflows/validation.yml`. Checks contract-reference, zero-friction-execution section, shareable-summary/shareable-update section, sources-and-references structure, artifact_type enum values, and filename convention conformance across EXAMPLE.md + library samples.

**15 new library samples** (3 per meeting skill × storevine/brainshelf/workbench threads) conforming to `SAMPLE_CREATION.md` with 8-key top-level frontmatter + Scenario/Prompt/Output structure + fictional-marker discipline. Total library grew 94 → 120 (legacy/orbit samples accurately accounted for).

**End-user guide** `docs/guides/using-meeting-skills.md` with 3 mermaid diagrams (family skills graph, go-mode decision flow, chain sequence).

**Release-plan companion docs**:
- `plan_v2.11.0.md` - release plan with decisions table and deliverables
- `plan_v2.11_codex-review.md` - Round 1 + Round 2 findings tracker (26 findings total)
- `plan_v2.11_ci-coverage-analysis.md` - CI gaps and follow-up scripts
- `plan_v2.11_pre-release-checklist.md` - pre-release quality checklist (Phase 0 Adversarial Review Loop added from v2.11.0 learnings)
- `plan_v2.11_review-journal.md` - comprehensive narrative of all reviews, findings, resolutions, pattern analysis

**v2.12.0 backlog** - 7 efforts created for sample-automation loop (F-31 to F-35) + meeting-skills ecosystem continuation (F-29, F-30). Stub at `docs/internal/release-plans/v2.12.0/plan_v2.12.0.md`.

### Changed

- **Skill count 32 → 38** (+6: F-26 + 5 meeting skills)
- **Foundation classification 1 → 7** (adds lean-canvas + 5 meeting skills to persona)
- **Slash commands 39 → 45** (+6)
- Current-state count references updated across `README.md`, `CLAUDE.md`, `plugin.json`, `marketplace.json`, `docs/getting-started.md`, `docs/reference/commands.md`, `docs/skills/index.md`, `docs/reference/ecosystem.md`, `docs/reference/project-structure.md`, `docs/guides/mcp-setup.md`, `QUICKSTART.md`, `docs/index.md`, `docs/concepts/agent-skill-anatomy.md`
- `library/skill-output-samples/README_SAMPLES.md` - count 94 → 120 with 6-category breakdown (canonical, legacy/orbit, persona, lean-canvas, utility-single-thread, meeting-family)
- `AGENTS.md` - 5 new foundation-meeting-* entries with family-contract note
- `mkdocs.yml` - Foundation nav expanded to 7 skills + new Reference → Skill Families section + Guides section
- `.github/workflows/validation.yml` - 2 new enforcing steps for `validate-meeting-skills-family` (bash + powershell)
- `docs/internal/efforts/F-17-meeting-synthesis.md` and `F-18-meeting-prep.md` - archived to `_NOTES/archived-efforts/` and rewritten with expanded family-aware scope

### Infrastructure / process

- Two rounds of Codex adversarial review (`codex:codex-rescue` subagent) documented in review journal; 26 findings total, 24 resolved same-session
- Pre-release checklist now starts with Phase 0 Adversarial Review Loop - re-run Codex after each resolution pass until findings stabilize below IMPORTANT severity
- First post-v1.0.0 contract version bump with errata-within-version documented in change log

### Not shipped in v2.11.0 (deferred)

- R1-I8 IMPORTANT: utility-pm-skill-validate per-skill field enforcement - scoped into F-31 for v2.12.0
- Retroactive sample generation for existing skills that lack them - post-v2.12.0 candidate
- MCP server unfreeze criteria (frozen per M-22)

## [2.10.2] - 2026-04-14

Maintenance patch: corrects plugin manifest drift and extends the count-consistency CI to prevent it from recurring. No skill behavior changes.

### Changed
- `.claude-plugin/plugin.json` and `marketplace.json` - skill count in description corrected from 29 to 32 (reconciled with the 32-skill repo state shipped in v2.10.0)
- `scripts/check-count-consistency.sh` / `.ps1` / `.md` - extended to scan tracked `.json` files (previously `.md` only), so drift in `plugin.json` and `marketplace.json` is now caught by the same CI that covers markdown. Threshold comparison changed from `>` to `>=` to catch round-number boundary drift. Added exclusions for `.github/.created-issues.json` (tooling state) and `.github/scripts/` (npm manifests).
- `README.md` - v2.10.x What's New entry corrected from "10 workflows" to "9 workflows" (no new workflow shipped in v2.10.x; the repo has been at 9 workflows since v2.9.0)

## [2.10.1] - 2026-04-13

Documentation and tooling polish following v2.10.0. No skill behavior changes.

### Added
- Specifications for 10 backlog skills (draft effort briefs)
- Generated `docs/skills/` pages for F-16, F-19, F-24

### Changed
- `scripts/generate-skill-pages.py` - skill/command/workflow counts now computed dynamically instead of hardcoded, preventing the stale-count drift that previously required manual sweeps
- Backlog updated to reflect v2.10.0 shipped state

### Removed
- F-25 effort brief (scope moved to a separate agent-config-toolkit initiative)

## [2.10.0] - 2026-04-11

> **Note:** F-16 (mermaid-diagrams) and F-19 (slideshow-creator) content has
> been available since v2.9.1 but is formally released and documented with
> v2.10.0 as the utility skill expansion release.

### Added
- **F-16: `utility-mermaid-diagrams`** - new utility skill teaching PMs to create syntactically valid mermaid diagrams. 15 diagram types with dual-lens navigation (type catalog + PM use-case guide), dedicated syntax validity reference, planning worksheet, and worked examples. 2,656 lines across 7 files.
- **F-19: `utility-slideshow-creator`** - new utility skill for generating professional presentations from JSON deck specifications. 18 slide types with dark/light variants, content-to-layout decision logic, calibrated character limits, Google Slides compatibility. Ships with a generic professional theme. 766 lines across 7 files.
- **F-24: `utility-update-pm-skills`** - new utility skill for checking, previewing, and applying pm-skills updates. Three modes: `--status` (quick version check), `--report-only` (preview without writing files), default (full update with confirmation). Includes validated-before-copy safety, optional backup, value-delta reports, post-update smoke test, 13-item quality checklist, FAQ, and degraded mode for no-network environments.
- `/mermaid-diagrams` slash command
- `/slideshow-creator` slash command
- `/update-pm-skills` slash command with `--status` and `--report-only` flags
- `docs/guides/updating-pm-skills.md` - user-facing guide for the update skill
- `_pm-skills/` local state directory convention (gitignored) for update reports and backups
- 7 new sample outputs in `library/skill-output-samples/` for deliver-acceptance-criteria and all 6 utility skills (storevine thread). Sample library: 84 → 91, now covering all 32 skills.
- Generated `docs/skills/` pages for all 3 new utility skills

### Changed
- Repo now ships 32 skills (25 phase + 1 foundation + 6 utility), 39 command docs, and 10 workflows
- Comprehensive docs count sweep across 20+ files
- MCP server decoupled from pm-skills release cycle (M-22) - frozen, no longer a release prerequisite
- Codex cross-LLM review completed for release plan and F-24 feature design (1 Blocker, 12 Major, 11 Minor resolved)

## [2.9.1] - 2026-04-10

### Added
- **D-05: Workflows guide** - dedicated `docs/guides/using-workflows.md` with decision tree (mermaid), comparison matrix for all 9 workflows, invocation guide, and customization patterns. Replaces the brief workflow section previously in `using-skills.md`.
- **M-20: Documentation count consistency CI** - 3 new validation script pairs:
  - `check-workflow-coverage` - verifies every workflow has matching docs page, AGENTS.md entry, and mkdocs nav entry
  - `check-count-consistency` - detects stale hardcoded skill/command/workflow counts in documentation
  - `check-generated-freshness` - verifies generated workflow pages match sources
- `validate-version-consistency` - hard-fail CI check ensuring `plugin.json` and `marketplace.json` versions match
- `validate-gitignore-pm-skills` - advisory CI check for `_pm-skills/` in `.gitignore`
- `validate-script-docs` - advisory CI check ensuring every script pair has companion `.md` documentation
- Companion `.md` documentation for all new scripts and 2 previously undocumented scripts (`check-context-currency`, `check-stale-bundle-refs`)
- `_pm-skills/` added to `.gitignore` (local state directory for update reports and backups)

### Changed
- `scripts/README_SCRIPTS.md` - expanded from 8 to 16 script entries with updated "When to use what" guide
- `.github/workflows/validation.yml` - added 6 new CI checks (1 hard-fail, 5 advisory)
- `docs/guides/using-skills.md` - trimmed workflow section to overview + link to new dedicated guide
- `docs/workflows/index.md` - added link to workflows guide
- `mkdocs.yml` - added "Using Workflows" nav entry under Guides
- Fixed `marketplace.json` version 2.8.2 → 2.9.0 (was out of sync with `plugin.json`)

## [2.9.0] - 2026-04-06

### Added
- 6 new workflows: Customer Discovery, Sprint Planning, Product Strategy, Post-Launch Learning, Stakeholder Alignment, Technical Discovery
- 7 `/workflow-*` slash commands (1 renamed from M-19 + 6 new)
- `scripts/generate-workflow-pages.py` - generates docs/workflows/ from source _workflows/

### Changed
- **BREAKING:** Renamed `_bundles/` → `_workflows/` and `docs/bundles/` → `docs/workflows/`
- **BREAKING:** Removed `/kickoff` command - replaced by `/workflow-feature-kickoff`
- Renamed "Workflow Bundles" → "Workflows" across all documentation
- Added URL redirects for old `/bundles/*` doc site paths

## [2.8.2] - 2026-04-04

### Added
- **Skill versioning concepts page** - `docs/concepts/versioning.md`: public-facing guide to skill SemVer, HISTORY.md, skills-manifest.yaml, tie-breaker rule, and lifecycle tool integration.
- **git-revision-date-localized plugin** - shows "last updated" and "created" dates on every page (enabled in CI).
- **Custom CSS** - `docs/stylesheets/extra.css` for card grid, tag badge, and admonition styling.
- **Theme overrides directory** - `overrides/` for future MkDocs Material customization.
- **F-12 effort brief** - skill quality convergence draft (first real-world use of lifecycle tools at scale).

### Changed
- `requirements-docs.txt` - added `mkdocs-git-revision-date-localized-plugin`.
- `mkdocs.yml` - added git-revision-date, custom_dir, extra_css, versioning page in nav.
- `docs/reference/categories.md` - fixed stale coordination skill count (5→7) and total (27→29).
- `marketplace.json` - updated to v2.8.1 / 29 skills.

### Release Notes
- Documentation-only release. No skill or command behavior changes.
- No `pm-skills-mcp` code changes required (docs parity update only).

## [2.8.1] - 2026-04-04 ([release notes](releases/Release_v2.8.1.md))

### Added
- **Documentation site** at [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) - MkDocs Material with tab navigation, dark mode, search, and mermaid diagram rendering.
- **"Follow the Product" showcase** - 3 interactive narrative journeys (Storevine B2B, Brainshelf Consumer, Workbench Enterprise) with 84 real sample outputs from the sample library, including prompts and full artifacts.
- **Skill finder** - interactive decision tree and artifact table for choosing the right skill.
- **Recipes** - 7 end-to-end workflows (Pitch a Feature, Run an Experiment, Launch a Feature, Discover and Frame, Define the Opportunity, Sprint Retro, Full Lifecycle) with mermaid flow diagrams.
- **Skill comparisons** - 6 side-by-side comparisons for commonly confused skill pairs (PRD vs Solution Brief, Hypothesis vs Problem Statement, etc.).
- **Prompt gallery** - curated real prompts in 3 styles (organized, casual, enterprise) from the sample library.
- **Per-skill real-world examples** - 3 collapsible sample outputs (one per narrative thread) embedded on 25 skill pages.
- **Quick-try snippets** - copy-pasteable slash command at the top of every skill page.
- **Phase flow diagrams** - mermaid diagrams on all 6 phase index pages showing how skills connect.
- **Tags plugin** - browse skills by phase and category tags.
- **Social cards** - OpenGraph preview cards for link sharing (enabled in CI).
- **Generation scripts** - `scripts/generate-skill-pages.py` (29 skill pages + indexes + commands ref) and `scripts/generate-showcase.py` (3 showcase journeys from sample library).
- **Deploy workflow** - `.github/workflows/deploy-docs.yml` auto-deploys on push to main.
- **MkDocs config guide** - `docs/internal/mkdocs/mkdocs-config.md` for maintainers.
- **MCP setup guide** - `docs/guides/mcp-setup.md` for users: install, configure, and use pm-skills-mcp across Claude Desktop, Cursor, Claude Code, and VS Code.

### Changed
- **MCP integration guide** - updated tool counts (25→29 skill tools, 42 total), added acceptance-criteria and utility skill tools, updated slash command mapping table, removed stale catalog note, updated version references to v2.8.0.

### Release Notes
- Documentation-only release - no PM skill or slash-command behavior changes.
- No `pm-skills-mcp` update required.
- Site is generated from existing content (skills, samples, docs) plus new guide pages.
- 70+ navigable pages, zero build warnings.

## [2.8.0] - 2026-04-03 ([release notes](releases/Release_v2.8.0.md))

### Added
- **F-10: utility-pm-skill-validate skill** (#121) - second utility skill. Audits existing skills against structural conventions (mirroring CI) and LLM-assessed quality criteria. Produces a pipe-delimited validation report (`Report schema: v1`) with severity-graded findings (FAIL/WARN/INFO) and actionable recommendations with target file paths. Two-tier assessment rebaselined against shipped library conventions. Includes SKILL.md, TEMPLATE.md (report format), EXAMPLE.md (validated `deliver-prd`), `/pm-skill-validate` command, and AGENTS.md entry. Skill count: 27 → 28.
- **F-11: utility-pm-skill-iterate skill** (#122) - third utility skill. Applies targeted improvements to existing skills from feedback, validation reports, or convention changes. Unified flow with input normalization, before/after preview, stale-preview guard, version bump class suggestion (don't auto-write), and HISTORY.md creation at second-version trigger point. Includes SKILL.md, TEMPLATE.md (change summary), EXAMPLE.md (iterated `deliver-prd`), `/pm-skill-iterate` command, and AGENTS.md entry. Skill count: 28 → 29.
- **M-18: CI skill versioning validation** - two new advisory scripts following `.sh` + `.ps1` + `.md` convention: `validate-skill-history` (checks HISTORY.md tracks current frontmatter version) and `validate-skills-manifest` (checks release manifest entries match skill directories). Added to `validation.yml` with `continue-on-error: true`.
- **D-03: `docs/pm-skill-lifecycle.md`** - public guide explaining the Create → Validate → Iterate lifecycle with workflow patterns (new skill, improve existing, convention change, feedback loop), CI vs validator comparison, and quality standard model.
- **Governance: `docs/internal/skill-versioning.md`** - SemVer rules for skills, HISTORY.md contract, skills-manifest.yaml format, release checklist, and tie-breaker rule for gray-area version bump classification.
- `docs/internal/release-plans/v2.7.0/skills-manifest.yaml` - retroactive first use of the skills-manifest convention.
- `docs/internal/release-plans/v2.8.0/` - release governance with phased execution plan and Codex design review.

### Changed
- **D-04: public docs refresh for v2.8.0** - updated skill counts (29), command counts (30), utility skill breakdown (3), Skill Lifecycle Tools section in README and QUICKSTART, command table, AGENTS.md entries, AGENTS/claude/CONTEXT.md, `docs/pm-skill-anatomy.md` lifecycle cross-reference, and `scripts/README_SCRIPTS.md` with M-18 script documentation.
- `docs/internal/releases/` renamed to `docs/internal/release-plans/` with all internal references updated (34 files).
- `docs/internal/backlog-canonical.md` updated with v2.8.0 assignments (F-10, F-11, D-03, M-18, D-04).

### Release Notes
- Completes the **PM skill lifecycle**: Create (`/pm-skill-builder`, v2.7.0) → Validate (`/pm-skill-validate`) → Iterate (`/pm-skill-iterate`).
- First release with **skill versioning governance** - skills-manifest.yaml per release, HISTORY.md per skill (opt-in), SemVer tie-breaker rule.
- First release with **advisory CI for skill versioning** - HISTORY.md and skills-manifest.yaml validators.
- Repo now contains 29 skills (25 domain + 1 foundation + 3 utility), 30 command docs, and 3 workflow bundles.
- **MCP note**: `pm-skills-mcp` needs a re-embed to pick up both new skills. `utility-pm-skill-validate` → `pm_pm_skill_validate`. `utility-pm-skill-iterate` → `pm_pm_skill_iterate`.

## [2.7.0] - 2026-03-22 ([release notes](releases/Release_v2.7.0.md))

### Added
- **F-06: deliver-acceptance-criteria skill** (#114) - new Deliver phase skill for Given/When/Then acceptance criteria generation covering happy path, edge cases, error states, and non-functional criteria. Includes SKILL.md, TEMPLATE.md, EXAMPLE.md (e-commerce checkout scenario), `/acceptance-criteria` command, and AGENTS.md entry. Skill count: 25 → 26.
- **F-05: utility-pm-skill-builder skill** (#113) - first utility-classified skill. Interactive builder that guides contributors from a PM skill idea to a complete Skill Implementation Packet with gap analysis, Why Gate, classification, exemplar-driven drafting, and staging-to-promotion workflow. Includes SKILL.md, TEMPLATE.md, EXAMPLE.md (change-communication scenario), `/pm-skill-builder` command, and AGENTS.md Utility Skills section. Skill count: 26 → 27.
- **M-12: CI validation enhancement** (#112) - extended linter with description word count (20-100) and TEMPLATE.md header count (≥3) checks; new `validate-agents-md` script for AGENTS.md ↔ skill directory sync; new `check-mcp-impact` advisory script for MCP impact detection. All scripts follow `.sh + .ps1 + .md` convention.
- **M-16: exclude docs/internal from release ZIP** (#123) - release packagers (`build-release.sh` and `.ps1`) now strip `docs/internal/**` from staged artifacts. Internal governance docs stay tracked in-repo but no longer ship to end users.
- **D-01: `docs/pm-skill-anatomy.md`** - practical guide to pm-skills skill structure covering directory layout, classification types, frontmatter, Triple Diamond phases, wiring layer, and CI validation. Complements the spec-level `docs/agent-skill-anatomy.md`.
- `_staging/` added to `.gitignore` for pm-skill-builder draft artifacts.

### Changed
- **D-02: public docs review for v2.7.0** - updated skill counts (27), command counts (28), M-12 script documentation, domain/foundation/utility classification model, skill template modernization, frontmatter schema with utility example, and `docs/agent-skill-anatomy.md` scope note. Post-F-05 reconciliation patched 3 stale references.
- Fixed duplicate workflow steps in `validation.yml` (validate-agents-md and check-mcp-impact each ran twice).
- AGENTS.md gains a `### Utility Skills` section and `/pm-skill-builder` in the Commands table.
- `docs/internal/backlog-canonical.md` rewritten with Release, Status, and Agent columns.
- Release governance folders created for v2.2.0, v2.3.0, and v2.7.0 (v2.2.0 and v2.3.0 migrated from legacy locations).

### Removed
- `docs/internal/delivery-plan/` - legacy directory removed from tracking.
- `docs/internal/release-planning/` - legacy directory removed from tracking.

### Release Notes
- First release with a **utility** skill classification - `pm-skill-builder` creates new PM skills interactively.
- First release with enhanced CI: frontmatter linting, AGENTS.md sync validation, MCP impact detection.
- Release ZIPs now exclude `docs/internal/**` while preserving all public documentation.
- Repo now contains 27 skills (25 domain + 1 foundation + 1 utility), 28 command docs, and 3 workflow bundles.
- **MCP note**: `pm-skills-mcp` needs a re-embed to pick up both new skills. `deliver-acceptance-criteria` → `pm_acceptance_criteria`. `utility-pm-skill-builder` → `pm_pm_skill_builder` (double `pm_` is intentional - preserves skill name, consistent with future `pm_agent_skill_builder`). Update `embed-skills.js` to strip classification prefixes (`foundation-`, `utility-`) alongside phase prefixes.

## [2.6.1] - 2026-03-04

### Added
- Release note artifact:
  - `docs/releases/Release_v2.6.1.md`

### Changed
- Sample output library moved and normalized to:
  - `library/skill-output-samples/`
- Sample creation standards filename standardized to:
  - `library/skill-output-samples/SAMPLE_CREATION.md`
- Sample coverage manifest moved to release-planning artifacts (internal)
- Release packaging now includes sample-library content:
  - `scripts/build-release.sh`
  - `scripts/build-release.ps1`
- Release workflow-generated notes now list sample-library inclusion:
  - `.github/workflows/release.yml`
- README release metadata rolled forward to `v2.6.1`.

### Release Notes
- Patch release focused on sample-library recovery, naming/path normalization, and release-artifact inclusion.
- No PM skill instruction or slash-command behavior changes.

## [2.6.0] - 2026-03-04

### Added
- Claude plugin manifest: `.claude-plugin/plugin.json`.
- Plugin packaging validation workflow:
  - `.github/workflows/validate-plugin.yml`
- Release note artifact:
  - `docs/releases/Release_v2.6.0.md`

### Changed
- Release packaging now includes `.claude-plugin/` in ZIP staging:
  - `scripts/build-release.sh`
  - `scripts/build-release.ps1`
- Release packaging now enforces staged plugin-manifest version parity with the target release version.
- GitHub release workflow notes now include plugin-manifest install guidance:
  - `.github/workflows/release.yml`
- README release/install guidance updated for plugin install plus explicit Copilot/OpenCode setup notes.

### Release Notes
- Minor release focused on Claude plugin packaging and release automation hardening.
- No PM skill or slash-command behavior changes.
- No `pm-skills-mcp` deploy is included in this release scope.

## [2.5.2] - 2026-03-04

### Changed
- Rewrote public release-facing docs for clearer user-first language and historical readability.
- Removed internal decision-ID style references from release-facing docs where they were not needed for external readers.
- Removed local working-note path references from public release artifacts.
- Added release note artifact:
  - `docs/releases/Release_v2.5.2.md`

### Release Notes
- Patch release focused on public documentation quality and release-communication clarity.
- No PM skill behavior changes and no output/config contract changes from `v2.5.0`.

## [2.5.1] - 2026-03-04

### Changed
- Canonicalized Claude agent continuity workspace to `AGENTS/claude/` and retired active `AGENTS/claude-opus*` paths.
- Updated tracked `.claude` scaffolding templates to emit `AGENTS/claude` for init/wrap workflows.
- Added clean-worktree release runbook for deterministic cut/tag/publish lanes:
  - `docs/internal/release-planning/runbook_clean-worktree-cut-tag-publish.md`

### Release Notes
- Patch release focused on agent-workspace naming consistency and release-lane operational hygiene.
- No PM skill behavior changes and no output/config contract changes from `v2.5.0`.

## [2.5.0] - 2026-03-02

### Added
- Foundation persona capability with:
  - `skills/foundation-persona/` skill + references
  - `/persona` command at `commands/persona.md`
  - AGENTS discovery coverage for foundation classification

### Highlights
- Taxonomy updates shipped with explicit foundation classification handling.
- Sample-library lane closure evidence captured in release planning/checklist artifacts.
- Doc-hygiene closure completed across README/getting-started and release metadata references.
- Persona archetype library shipment and full persona MCP exposure parity remain deferred from `v2.5.0`.

## [2.4.3] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.3.md`.

### Changed
- Rolled forward release metadata references to treat `v2.4.3` as the latest stable patch:
  - `README.md`
  - `CHANGELOG.md`
- Captured explicit published-artifact links in release docs:
  - `docs/releases/Release_v2.4.3.md`

### Release Notes
- Patch release to include post-`v2.4.2` documentation/release-link updates in tagged artifacts.
- No PM skill behavior changes and no output/config contract changes from `v2.4.0`.

## [2.4.2] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.2.md`.
- Canonical delivery-plan policy and migration docs:
  - `docs/internal/delivery-plan/README.md`
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`
  - `docs/internal/delivery-plan/v2.5/` continuity kickoff artifacts

### Changed
- Started v2.5 continuity execution in tracked release-planning artifacts and checklist status.
- Updated release-planning and v2.4 release docs to treat `docs/internal/delivery-plan/` as canonical release-governance truth.
- Archived legacy internal repo-submission planning docs from tracked `docs/internal/`.

### Removed
- Legacy internal docs from tracked `docs/internal/`:
  - `docs/internal/repo-list_claude-code.md`
  - `docs/internal/pr-quick-reference.md`
  - `docs/internal/awesome-product-management-pr.md`
  - `docs/internal/AWESOME-PM-PR.md`
  - `docs/internal/awesome-lists-submission-package.md`
  - `docs/internal/awesome-lists-submission-package_planning.md`
  - `docs/internal/link-notes.md`

### Release Notes
- Patch release focused on governance hygiene and tracked-vs-local artifact clarity.
- No PM skill behavior changes and no output/config contract changes from `v2.4.0`.
- Published GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.4.2`.

## [2.4.1] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.1.md`.
- Long-form internal delivery/engineering explainer:
  - `docs/internal/Releases_2.3-2.4_detailed-breakdown.md`

### Changed
- Finalized `v2.4.x` release-doc consistency:
  - `README.md`
  - `CHANGELOG.md`
  - `docs/releases/Release_v2.4.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`

### Release Notes
- Patch follow-up for release documentation and communication alignment only.
- No new PM skills and no output/config contract behavior changes from `v2.4.0`.

## [2.4.0] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.md`.
- Canonical tracked contract-lock summary:
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`

### Changed
- Release-planning artifacts updated for `v2.4.0` ship state:
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/README.md`
- Canonical backlog release cadence anchors synced for v2.4 closure:
  - `docs/internal/backlog-canonical.md`
- v2.4 contract-lock closure state advanced to `closed-aligned` and is summarized in:
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`
- Expanded `validate-mcp-sync` checks to include `pm-skills-mcp` pin metadata and contract-version parity via `pm-skills-source.json`.
- Corrected MCP integration guide utility-tool inventory to 7 tools (`pm_cache_stats` included).
- Updated MCP compatibility references to direct version tracking (`pm-skills v2.4.x` ↔ `pm-skills-mcp v2.4.x`) in ecosystem/integration docs.

### Release Notes
- This release closes the v2.4.0 contract-lock scope:
  - Output behavior contract locked and recorded as aligned.
  - Configuration contract/schema lock recorded as aligned with validator proof artifacts.

## [2.3.0] - 2026-02-13

### Added
- Release note artifact: `docs/releases/Release_v2.3.md`.

### Changed
- MCP sync workflow default mode switched to `block` in `.github/workflows/validate-mcp-sync.yml` (manual `workflow_dispatch` can still set `observe`).
- Updated MCP sync guide for blocking-default rollout state (`docs/guides/validate-mcp-sync.md`).
- Updated compatibility references for current MCP status:
  - `README.md` note now points to `pm-skills-mcp v2.1+` as aligned baseline.
  - `docs/reference/ecosystem.md` reflects 36 MCP tools (24 skills + 5 workflows + 7 utilities).
- Release-planning artifacts updated for `v2.3.0` closure:
  - `docs/internal/release-planning/checklist_v2.3.0.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`

### Release Notes
- This release closes the v2.3.0 scope:
  - Cross-repo alignment closure recorded on pinned refs.
  - Blocking `validate-mcp-sync` mode enabled by default.

## [2.2.0] - 2026-02-13

### Added
- Validation-only MCP drift checker script: `.github/scripts/validate-mcp-sync.js`
- MCP sync workflow: `.github/workflows/validate-mcp-sync.yml` (observe-only default)
- MCP sync usage guide: `docs/guides/validate-mcp-sync.md`
- Planning persistence governance docs:
  - `docs/internal/planning-persistence-policy.md`
  - `docs/internal/planning-artifact-tier-map.md`
- Canonical backlog governance reference: `docs/internal/backlog-canonical.md`
- Release execution artifacts:
  - `docs/releases/Release_v2.2.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
  - `docs/internal/release-planning/checklist_v2.2.0.md`
  - `docs/internal/release-planning/checklist_v2.3.0.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/checklist_v2.5.0.md`

### Changed
- `CONTRIBUTING.md`: added MCP sync guardrail guidance for contributors.
- `scripts/README_SCRIPTS.md`: clarified `.github/scripts/` usage and drift-check rollout.
- `docs/guides/mcp-integration.md`: linked new MCP sync validation guide.
- `.gitignore`: aligned AGENTS ignore rules with planning persistence policy.

### Release Notes
- This release establishes guardrails and governance:
  - Observe-only sync validation baseline.
  - Planning persistence policy baseline.
  - Canonical backlog governance baseline.

## [2.1.0] - 2026-01-27

### Added
- **MCP Alignment Milestone** - pm-skills-mcp v2.1.0 now fully aligned with flat structure
- Version alignment table in ecosystem documentation

### Changed
- Updated ecosystem documentation noting MCP v2.1 compatibility
- Clarified that pm-skills-mcp v2.1+ is required for full compatibility with pm-skills v2.x flat structure

### Ecosystem
- pm-skills-mcp v2.1.0 released with:
  - Flat resource URIs: `pm-skills://skills/{skill}`
  - Phase read from frontmatter, not path
  - Tool names remain stable (`pm_prd`, `pm_hypothesis`, etc.)

## [2.0.1] - 2026-01-27

### Added
- Validation workflow (`validation.yml`) running command + front-matter checks on Ubuntu and Windows.
- Front-matter lint scripts (`scripts/lint-skills-frontmatter.sh` / `.ps1`) that verify required keys, directory-name alignment, and reference files.
- Noted command validator scripts in project structure/README.
- Scripts guide renamed to `scripts/README_SCRIPTS.md` to avoid name collisions.

### Changed
- Removed nested `metadata.version` fields from all skills; lint now enforces a single root version and required keys.
- Parameterized build scripts (`build-release.sh` / `.ps1`) and release workflows to derive artifact names from the tag/ref (defaulting to v2.0.1); added zip/hash fallbacks for Windows.
- `validate-commands` now reports multi-skill bundles (e.g., `/kickoff`) without misleading first-path-only output.
- README path examples updated to `skills/{phase-skill}/`; AGENTS.md clarifies bundle links are repo-relative; release workflow typo fixed (`openskills`).
- Moved skill templates to `docs/templates/` and updated references (authoring guide, README, project-structure, AGENTS context).
- README refresh: expanded v2.0 highlights, updated project structure tree, roadmap in-progress items, note that pm-skills-mcp v1.x is outdated (v2.1 underway).
- `docs/reference/project-structure.md` now has a table of contents, updated directory tree, full commands list, and template path.

## [2.0.0] - 2026-01-26

### Breaking
- Repository flattened to `skills/{phase-skill}/` (hyphen-only). All prior nested `skills/<phase>/<skill>/` paths removed.
- Slash commands now point to the flat skill paths; update local references/scripts accordingly.

### Added
- Sync helpers `scripts/sync-claude.sh` and `scripts/sync-claude.ps1` to regenerate `.claude/skills` and `.claude/commands` for Claude Code / openskills discovery with validation.
- Build scripts `scripts/build-release.sh` and `scripts/build-release.ps1` to create `pm-skills-v2.0.zip` with manifest/hash (excludes populated `.claude`).
- `.claude/pm-skills-for-claude.md` usage note for discovery.

### Changed
- All 24 skills renamed to flat `{phase-skill}` directories; SKILL front matter updated with `phase`, `version: 2.0.0`, and `updated: 2026-01-26`.
- Docs refreshed to reflect flat structure and two-path install story (flat source vs. optional `.claude/` via sync helper), including README, QUICKSTART, AGENTS, bundles, guides, and references.
- Workflows (`release.yml`, `release-zips.yml`) call the new build-release script.
- `.gitignore` now excludes `.claude/skills`, `.claude/commands`, and `dist/`.

### Validation
- Path scan confirms no residual `skills/<phase>/` references in public docs/commands.
- Front-matter check: all `skills/*/SKILL.md` include required `name`, `phase`, `version`, `updated`.

## [1.2.0] - 2026-01-20

**PM-Skills v1.2.0 - Security & Community Infrastructure**

This release adds essential security policies, automated vulnerability scanning, and improved issue/PR templates for community contributions.

### Added
- **SECURITY.md** - Security policy with vulnerability reporting guidelines
- **CodeQL code scanning** - Automated security analysis via GitHub Actions (`.github/workflows/codeql.yml`)
- **Dependabot configuration** - Automated dependency updates for GitHub Actions and npm (`.github/dependabot.yml`)
- **Issue templates** - Structured forms for bug reports and feature requests
  - `bug_report.yml` - Skill-specific bug reporting with environment details
  - `feature_request.yml` - New skill and enhancement proposals
  - `config.yml` - Directs questions to Discussions, security issues to policy
- **Pull request template** - Standardized PR checklist (`.github/PULL_REQUEST_TEMPLATE.md`)

### Changed
- Issue creation now requires using templates (blank issues disabled)

### Security
- Enabled CodeQL scanning for JavaScript analysis on push, PR, and weekly schedule
- Added security policy with responsible disclosure guidelines

## [1.1.1] - 2026-01-20

### Added
- **CODE_OF_CONDUCT.md** - Contributor Covenant v2.1 for community guidelines
- **Attribution headers** - Added HTML comment attribution to all 24 SKILL.md files
- **Open-skills ecosystem submissions**
  - Submitted PR to [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills/pull/62)
  - Submitted to [n-skills marketplace](https://github.com/numman-ali/n-skills/issues/6)

### Changed
- **CONTRIBUTING.md** - Updated Code of Conduct section to link to dedicated CODE_OF_CONDUCT.md
- **README.md** - Updated openskills CLI installation section with accurate guidance
- **README.md** - Minor formatting cleanup (em dashes, navigation labels, alt text)

### Fixed
- **openskills#48 resolved** - [numman-ali/openskills#48](https://github.com/numman-ali/openskills/issues/48) fixed in openskills v1.3.1
  - Root cause: hardcoded `/` path separator failed on Windows
  - Verified: `anthropics/skills` now installs all 17 skills successfully
  - Note: pm-skills uses deeper nesting than openskills auto-discovers; Git clone recommended

## [1.1.0] - 2026-01-16

**PM-Skills v1.1.0 - Documentation & README Overhaul**

This release brings a comprehensive documentation expansion and a major README redesign following open-source best practices. The README now features better navigation, an FAQ section, and improved discoverability.

### Added
- **Comprehensive Documentation Expansion**
  - `docs/getting-started.md` - Detailed setup guide covering 5 installation methods
  - `docs/guides/using-skills.md` - Beginner to advanced usage guide with SPICE context framework, skill chaining, and 7 power-user patterns
  - `docs/guides/authoring-pm-skills.md` - Complete guide for creating and submitting new skills
  - `docs/frameworks/triple-diamond-delivery-process.md` - Triple Diamond methodology documentation
- **README Major Enhancements**
  - Collapsible Table of Contents for easier navigation
  - FAQ section with 7 expandable Q&A items covering common questions
  - License section with Apache 2.0 permissions explained
  - Acknowledgments section crediting frameworks and resources
  - About the Author section
  - More Suggestions section for community engagement
  - Project Status badge (Active)
  - GitHub stats badges (stars, forks, issues, contributors, last commit)
  - Back-to-top navigation links throughout
  - Change Log Summary table with version highlights
  - Releases section with download badge
  - Expanded Usage intro explaining skills, commands, and bundles
  - Workflow Bundles intro paragraph
  - Updated Built with section with visual badges
- **Open-Skills Ecosystem Integration**
  - Prepared PR content for awesome-claude-skills submission
  - Prepared submission content for n-skills marketplace
  - Documented openskills CLI compatibility testing
  - Filed [openskills#48](https://github.com/numman-ali/openskills/issues/48) for nested path bug
- **GitHub Release Workflow**
  - `.github/workflows/release.yml` - Automated ZIP creation on tag push
  - Creates two artifacts: full package + Claude.ai bundle
- **CLAUDE.md** - Agent instructions with documentation rules

### Changed
- **Documentation Reference Files Significantly Expanded**
  - `docs/reference/categories.md` - Expanded from 54 to 420+ lines with diagrams, workflows, and framework mappings
  - `docs/reference/frontmatter-schema.yaml` - Expanded from 91 to 600 lines with validation rules, examples, and best practices
- **New `/docs` Taxonomy Structure**
  - `docs/reference/` - Technical specifications (categories, schema)
  - `docs/guides/` - How-to guides (using-skills, authoring-pm-skills)
  - `docs/frameworks/` - Methodology documentation (triple-diamond)
- Renamed `_docs/` → `docs/` and `_templates/` → `templates/` for standard conventions
- README.md restructured following best-practices from Best-README-Template and amazing-github-template
- Updated README.md Quick Start with 4 installation options (Git clone recommended)
- Reordered installation methods based on openskills bug discovery
- Version badge updated to 1.1.0

### Fixed
- Discovered and documented [openskills#48](https://github.com/numman-ali/openskills/issues/48) - nested directory structure bug affecting pm-skills and anthropics/skills

## [1.0.1] - 2026-01-15

### Added
- **All 24 Slash Commands Complete** - Every skill now has a corresponding command
  - `/competitive-analysis` - Discover phase
  - `/interview-synthesis` - Discover phase
  - `/stakeholder-summary` - Discover phase
  - `/jtbd-canvas` - Define phase
  - `/opportunity-tree` - Define phase
  - `/adr` - Develop phase
  - `/design-rationale` - Develop phase
  - `/solution-brief` - Develop phase
  - `/spike-summary` - Develop phase
  - `/edge-cases` - Deliver phase
  - `/launch-checklist` - Deliver phase
  - `/release-notes` - Deliver phase
  - `/dashboard-requirements` - Measure phase
  - `/experiment-design` - Measure phase
  - `/experiment-results` - Measure phase
  - `/instrumentation-spec` - Measure phase
  - `/lessons-log` - Iterate phase
  - `/pivot-decision` - Iterate phase
  - `/refinement-notes` - Iterate phase
  - `/retrospective` - Iterate phase
- GitHub issues #43-62 created and closed for slash command tracking

### Changed
- Updated README.md Slash Commands section to list all 24 commands
- Updated AGENTS.md Commands section to list all 24 commands
- Updated plan-open-skills.md compatibility table to reflect slash commands complete

## [1.0.0] - 2026-01-14

**PM-Skills v1.0.0 - Complete Triple Diamond coverage is here!**

This release marks the completion of all 24 PM skills across the entire product development lifecycle. From discovery to iteration, PM-Skills now provides comprehensive coverage for product managers using AI assistants.

### Added
- **Phase 3 Complete: P2 Skills (11 skills) - All 24 skills now implemented!**
  - `competitive-analysis` skill - Discover phase (`skills/discover-competitive-analysis/`)
  - `stakeholder-summary` skill - Discover phase (`skills/discover-stakeholder-summary/`)
  - `opportunity-tree` skill - Define phase (`skills/define-opportunity-tree/`)
  - `jtbd-canvas` skill - Define phase (`skills/define-jtbd-canvas/`)
  - `design-rationale` skill - Develop phase (`skills/develop-design-rationale/`)
  - `dashboard-requirements` skill - Measure phase (`skills/measure-dashboard-requirements/`)
  - `experiment-results` skill - Measure phase (`skills/measure-experiment-results/`)
  - `retrospective` skill - Iterate phase (`skills/iterate-retrospective/`)
  - `lessons-log` skill - Iterate phase (`skills/iterate-lessons-log/`)
  - `refinement-notes` skill - Iterate phase (`skills/iterate-refinement-notes/`)
  - `pivot-decision` skill - Iterate phase (`skills/iterate-pivot-decision/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `phase-3`, `P2`
- GitHub issues #26-36 for skill tracking
- **Phase 3 Infrastructure: Workflow Bundles**
  - `_bundles/triple-diamond.md` - Complete product development cycle guide
  - `_bundles/lean-startup.md` - Build-Measure-Learn rapid iteration guide
  - `_bundles/feature-kickoff.md` - Quick-start workflow for feature development
- **Phase 3 Infrastructure: Slash Commands**
  - `commands/prd.md` - Create Product Requirements Document
  - `commands/problem-statement.md` - Create problem statement
  - `commands/hypothesis.md` - Define testable hypothesis
  - `commands/user-stories.md` - Generate user stories
  - `commands/kickoff.md` - Run Feature Kickoff workflow
- **Phase 3 Infrastructure: Agent Discovery**
  - `AGENTS.md` - Universal agent discovery file listing all 24 skills
- **Phase 3 Infrastructure: GitHub Actions**
  - `.github/workflows/sync-agents-md.yml` - Auto-sync AGENTS.md on skill changes
  - `.github/workflows/release-zips.yml` - Package skills as ZIPs on release

### Changed
- Updated README.md Skills Inventory badge to 24/24 (complete)
- Updated README.md all skill status indicators to ✅
- Updated README.md roadmap to show Phase 3 P2 Skills complete
- Updated CONTEXT.md to reflect Phase 3 completion

## [0.3.0] - 2026-01-14

### Added
- **Phase 2 Complete: P1 Skills (8 skills)**
  - `interview-synthesis` skill - Discover phase (`skills/discover-interview-synthesis/`)
  - `solution-brief` skill - Develop phase (`skills/develop-solution-brief/`)
  - `spike-summary` skill - Develop phase (`skills/develop-spike-summary/`)
  - `adr` skill - Develop phase (`skills/develop-adr/`)
  - `edge-cases` skill - Deliver phase (`skills/deliver-edge-cases/`)
  - `release-notes` skill - Deliver phase (`skills/deliver-release-notes/`)
  - `experiment-design` skill - Measure phase (`skills/measure-experiment-design/`)
  - `instrumentation-spec` skill - Measure phase (`skills/measure-instrumentation-spec/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `phase-2`, `P1`
- GitHub milestone: v0.3.0 - P1 Skills
- GitHub issues #18-25 for skill tracking

### Changed
- Updated README.md Skills Inventory with status indicators (✅ implemented, 🔜 coming soon)
- Updated README.md roadmap to show Phase 2 complete
- Updated plan-v1.md Progress Tracker with GitHub issue links for Phase 2
- Updated CONTEXT.md to reflect Phase 2 completion and add Skills Inventory table

## [0.2.0] - 2026-01-14

### Added
- **Phase 1 Complete: P0 Core Skills**
  - `problem-statement` skill - Define phase (`skills/define-problem-statement/`)
  - `hypothesis` skill - Define phase (`skills/define-hypothesis/`)
  - `prd` skill - Deliver phase (`skills/deliver-prd/`)
  - `user-stories` skill - Deliver phase (`skills/deliver-user-stories/`)
  - `launch-checklist` skill - Deliver phase (`skills/deliver-launch-checklist/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `skill`, `phase-1`, `P0`
- GitHub milestone: v0.2.0 - P0 Core Skills
- GitHub issues #10-14 for skill tracking

### Changed
- Updated plan-v1.md Progress Tracker with GitHub issue links
- Updated CONTEXT.md to reflect Phase 1 completion

## [0.1.0] - 2026-01-14

### Added
- Initial project structure with agentic coding support
- Comprehensive README.md with badges, skills inventory, and platform compatibility matrix
- Apache 2.0 LICENSE
- CHANGELOG.md following Keep a Changelog format
- .gitignore with standard exclusions
- AGENTS/claude-opus-4.5/ folder for AI session continuity
  - CONTEXT.md - Project state tracking
  - TODO.md - Task management
  - DECISIONS.md - Technical decision log
  - SESSION-LOG/ - Session documentation
- PLANNING/ folder convention for collaboration artifacts (reviews, drafts, analysis)
- plan-v1-review.md - Comprehensive review of implementation plan
- v0.1 tag - Plan review milestone
- 9 GitHub issues for plan-v1.md improvement opportunities
- **Phase 0 Foundation Complete:**
  - CONTRIBUTING.md with curated contribution model
  - Full directory structure (`skills/`, `_bundles/`, `docs/`, `templates/`, `commands/`)
  - Schema documentation (`_docs/frontmatter-schema.yaml`)
  - Category reference (`_docs/categories.md`)
- Skill template structure (`docs/templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md)
- wrap-session skill for end-of-session documentation workflow

### Changed
- Updated CONTEXT.md status from "Foundation complete" to "Foundation in progress (~40%)"
- Updated plan-v1.md Progress Tracker with inline status notes
- Fixed README.md roadmap to reflect accurate Phase 0 status
- **Phase 0 → 100% complete** - All foundation infrastructure now in place
- Updated README.md roadmap to show Phase 0 complete
- Expanded P1/P2 skill guidance in plan-v1.md (Issues #11-29)
- Updated example dates in templates to use `<YYYY-MM-DD>` placeholder
- Added PowerShell validation commands for Windows compatibility

### Fixed
- Pre-Flight Checklist path error in planning document
- VISION.md location inconsistency resolved
- Issue #1 conflict with existing files (added "skip if exists" note)

### Closed
- All 9 GitHub issues (#1-9) - plan improvements complete
