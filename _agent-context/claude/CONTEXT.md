# Project Context

## Current State

**Status:** **v2.22.0 RELEASE-PREP (branch release/v2.22.0, untagged)** - Wrapper deletion: deleted the 63 command wrappers (the 10 workflow-* commands remain), kept all 63 skill names, retired master-plan D6 (deleted agents/_pairing.yaml), added the Codex .codex-plugin/plugin.json manifest. Full pre-tag validator bundle + Astro build GREEN; awaiting tag. Previous: **v2.21.0 SHIPPED 2026-05-26** - Marketplace Launch (additive): pm-skills is published through the new `product-on-purpose` marketplace (hosted at the now-public `product-on-purpose/agent-plugins`, a thin registry; recommended home for multiple Product on Purpose plugins) while the self-hosted `pm-skills-marketplace` path is kept alive and working (dual-home). Distribution change only: no skill/command/behavior changes (catalog 63; 73 commands; 4 sub-agents; 12 workflows). MINOR (backward-compatible; nothing removed); the old-path retirement is the breaking step, reserved for a future major. Delivered: tag `v2.21.0` -> commit `1065c3e`, GitHub Release Latest with the rich `Release_v2.21.0.md` body; agent-plugins registry public + branch-protected (requires `validate`, admin bypass), `validate-registry` CI + weekly drift cron, pinned to v2.21.0 via an **https `url` source** (metadata 1.0.0); install instructions repointed to the new marketplace (M1, `ba172a5`). **Two install-path bugs caught + fixed by smoke:** the registry `github` shorthand source cloned the plugin over SSH (broke HTTPS-only users) -> switched to https `url`; the self-hosted marketplace's `source:"./"` was rejected as invalid -> switched to https `url` on main. Smoke S1-S8 cleared on real machines (S1-S5 verified; S6/S7 accepted on reasoned confidence; S8 public-anonymous install PASS). Codex-reviewed clean through 6 passes pre-execution. Plan + companions: `docs/internal/release-plans/v2.21.0/`. Optional remaining: post the staged announcement Discussion (`launch-announcement-draft.md`). Next planned: **v2.22.0** (command/skill naming standardization, additive minor). Previous: **v2.20.0 SHIPPED 2026-05-25** - Sprint Workflow Commands + Validation/Doc Hardening: 3 new sprint `/workflow-` commands (foundation-sprint, design-sprint, foundation-to-design; slash commands 70 -> 73, no new skills); `check-agents-md-command-sync` now requires a command file per `/workflow-` row; `check-count-consistency` gained number-after + singular-noun coverage (caught + fixed stale counts across ecosystem/runtime-components/quickstart docs); vestigial `check-stale-bundle-refs` removed. Shipped via the 6-gate runbook: annotated tag `v2.20.0` -> commit `e1db5ec`, GitHub Release Latest with the rich `Release_v2.20.0.md` body, tag CI green (Validation + Validate Plugin Packaging + Release); Codex G1 review HELD on a P0 (stale ecosystem.md counts), cleared after the fix. Previous: **v2.19.0 SHIPPED 2026-05-23** - pre-promotion hardening: 14 work items (FU-1..FU-9 validator/CI/script hardening + PR-1..PR-5 promotion-readiness) plus a release-prep parity fold-in (wired `validate-version-consistency` into the local pre-tag bundle; the bundle now runs 18 enforcing validators with bash + pwsh parity). Shipped via `/pm-release v2.19.0` 6-gate conductor: annotated tag `v2.19.0` -> commit `a18e4d5` (tag object `fe36694`), GitHub Release published (Latest) with the rich `Release_v2.19.0.md` body, tag CI green (Validation + Validate Plugin Packaging + Release). No new skills (catalog stays 63). Previous: **v2.18.0 SHIPPED 2026-05-22** - four highest-consensus content skills (`discover-market-sizing`, `define-prioritization-framework`, `discover-journey-map`, `measure-survey-analysis`) shipped: annotated tag `v2.18.0` -> `daf720e`, GitHub Release published (Latest), tag CI green (Release + Validate Plugin Packaging). Catalog 59 to 63 (phase 26 to 30); slash commands 66 to 70; 12 new library samples. Aggregates refreshed (AGENTS.md, generated skill pages, README, plugin manifests, docs site); count-consistency + validate-agents-md PASS. Release-prep done (version bump to 2.18.0, CHANGELOG [2.18.0], Release_v2.18.0.md, currency markers, README What's New row, and a correction to a false v2.10.0 What's New entry that mis-attributed these four skills). Validated by the full pre-tag bundle (15 enforcing) PASS, Astro build (363 pages, 0 errors), G1 pm-critic, four Codex adversarial passes, and deep internal verification (~26 findings resolved across commits c763ba3..daf720e). Previous: **v2.17.0 SHIPPED 2026-05-20** via `/pm-release v2.17.0` (6-gate conductor run). Annotated tag `v2.17.0` at commit `b6ff373`; GitHub Release published with the rich Release_v2.17.0.md body; tag CI green (Validate Plugin Packaging + Release workflow). Delivered: native Claude Code sub-agent registration LIVE (`agents/` auto-discovery; `AGENTS/` to `_agent-context/` rename), frontmatter metadata-nested migration across 59 skills, bash-3.2 validator portability, check-version-references advisory wiring. All four work items (W1-W4) + F-P2-01 shipped. Post-tag follow-ups: merge pm-skills-mcp embed-skills.js branch; v2.18.0 (4 content skills) is the next cycle. Previous tagged release: **v2.16.2** (2026-05-19).

**v2.17.0 (in progress, untagged on main):** W1 frontmatter metadata migration across 59 skills (`be1352b`, CI-green). W2 `AGENTS/` to `_agent-context/` + `subagents/` to `agents/` rename (`3691b77`); native Claude Code sub-agent registration is LIVE - all 4 sub-agents auto-discover via `@`-mention (attested 2026-05-20 after `/plugin update` + `/reload-plugins`); phantom `agents/README.md` removed (`e162ae0`). W3 bash-3.2 validator portability across 8 validators + check-count-consistency non-git fallback (`6b097b9`). F-P2-01 wired `check-version-references` into the pre-tag bundle as a non-blocking advisory step (`6b097b9`). W4 = this CONTEXT refresh. Full pre-tag bundle 15/15 enforcing PASS; Astro build 345 pages, 0 errors. Release-prep DONE (version bump + CHANGELOG + Release_v2.17.0.md + currency markers); remaining: `git tag v2.17.0` + push + GitHub Release via `/pm-release v2.17.0`.

**v2.16.2 SHIPPED 2026-05-19** (post-v2.16.1 audit-hygiene fast-patch closing F-P1-02 CONTEXT.md Status refresh + F-P2-01-half check-context-currency.sh wire into pre-tag-validate bundle; scope reduced mid-session to defer F-P1-01 README badge update because of active maintainer README-refactor WIP; F-P0-01 validator-portability finding scoped to v2.17.0 W3, now SHIPPED). Predecessor: v2.16.1 SHIPPED 2026-05-19 (annotated tag `v2.16.1` points at `15ab561`; plugin manifest schema patch removing invalid `agents` field from `.claude-plugin/plugin.json` that blocked `/plugin update pm-skills` since v2.16.0; same 59-skill catalog; G4 P0 FULL PASS attested 2026-05-19 via 3-scenario cross-platform Claude Code verification: (1) existing-install update on Windows + (2) fresh-install via remote marketplace `product-on-purpose/pm-skills` on macOS + (3) dispatch skill execution `/pm-skills:pm-audit-repo` running 11-minute repo-wide audit; cross-client dispatch pattern validated in production across Windows + macOS). Native sub-agent registration on Claude Code remains DEFERRED to v2.17.0 pending `AGENTS/` to `_AGENTS/` rename + `subagents/` to `agents/` rename (scoped in v2.17.0 plan; Path B1 chosen). Earlier predecessor: v2.16.0 SHIPPED 2026-05-18 (annotated tag `v2.16.0` points at `b4d5172`; pushed at 2026-05-18T15:05:08Z; GitHub Release published at https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.0 with 195-line canonical body; pm-skills-v2.16.0.zip artifact uploaded). All 5 CI workflows GREEN on tag SHA: Validation, Validate Plugin Packaging, Validate MCP Sync, CodeQL, Deploy to GitHub Pages (doc site live at https://product-on-purpose.github.io/pm-skills/). Spike branch `feat/v2.16-astro-6-spike` merged via rebase + auto-deleted. Earlier still: v2.15.2 SHIPPED 2026-05-17 + v2.15.x CYCLE CLOSED (v2.15.0 `a108301` -> v2.15.1 `6f89439` -> v2.15.2 closeout).

**v2.15.0 (2026-05-16, tag `a108301`):** Sprint Skills Launch: 15 new skills under the new `classification: tool` taxonomy (7 Foundation Sprint family + 7 Design Sprint family + 1 tool-note-and-vote standalone) implementing Knapp / Zeratsky / Kowitz canonical sprint methodologies. Skill catalog 40 to 55. Two family contracts (FS v0.3.0; DS v0.2.0; both with Naming Discipline section) with enforcing CI validators (each with --strict release mode). 3 new workflows including end-to-end FS+DS arc with narrative handoff conversation replacing the dropped bridge skill (12-row slot-mapping table + 3-question go/no-go checkpoint). 45 library samples (171 total) across 3 narrative threads (Brainshelf, Storevine, Workbench). Two operational user guides + two concept docs + 3 disambiguation/reference docs + 8 sprint-family user guides (FAQ + cheat sheet + case studies + recovery playbook per family). Two adversarial-review cycles documented (FS-track 35 findings; DS-track 13 Codex + 20 self-audit; all P1 closed pre-tag).

**Post-tag closures on main HEAD (not in v2.15.0 tag):** `f03d94d` regenerated 16 tool skill pages + 3 workflow pages + refreshed commands.md, patched check-count-consistency to exempt `tool` subset-descriptor. `c8ea6d9` post-tag artifact sweep.

**v2.15.1 (2026-05-17, tag `6f89439`):** Post-Tag Audit Remediation + Preventive CI. Closed all 18 audit findings (3 P0 + 3 P1 + 4 P2 + 5 P3 + 3 INFO) from the v2.15.x self-review at `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`. Docs-site homepage refresh (40 to 55 with Tool card); skills landing page Tool row; workflow-generator hardcoded-dict bug fix (generator now raises SystemExit on missing workflow_info entries; docs/workflows/index.md regenerated with all 12 workflows); AGENTS.md command table extended with 23 missing rows (15 tool + 3 workflow + 5 pre-v2.15 legacy drift surfaced by new validator); library samples README refreshed to 171 samples across 55 PM skills with v2.15.0 breakdown section; Sprint Planning gets (agile) naming-discipline qualifier; new docs/concepts/sprint-skills-overview.md cross-family entry point; CONTEXT.md refreshed (closes v2.14.x cleanup Task 2 via audit A12). 4 new preventive CI validators wired enforcing: check-landing-page-counts (--strict), check-workflow-generator-coverage, check-agents-md-command-sync, plus pre-tag-validate orchestration script codifying the feedback_pre-tag-validator-bundle memory rule.

**v2.15.2 (2026-05-17, closeout):** v2.15.x cycle closeout + v2.16.0 plan reconciliation. No functional changes. Audit doc status flipped from DRAFT to REMEDIATION SHIPPED with finding-by-finding closure table; v2.15.0 master plan "What's next" updated with DONE rows; v2.16.0 plan slate (authored 2026-05-16 before v2.15.1 shipped) reconciled against v2.15.1 shipped state: repo-hygiene-plan CONTEXT.md prereq marked DONE; ci-plan gains a "v2.15.1 carry-in reconciliation" section reducing net-new validator scope from "5 new" to "2 new + 1 extension" (recommends extending check-landing-page-counts rather than shipping parallel check-aggregate-counters); master plan_v2.16.0.md "Where We Are" refreshed. Issue #132 [M-20] commented with v2.15.1 partial-close evidence.

**v2.16.0 (content-complete 2026-05-17 late evening; READY TO PUSH/TAG on spike `feat/v2.16-astro-6-spike`):** Active Orchestration + Doc-Stack Modernization. Two complementary tracks shipped on the spike branch (33+ commits since v2.15.2). 4 Claude Code plugin sub-agents (`pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`) codify the Phase 0 Adversarial Review Loop + 6-gate release runbook including new G2.5 commit gate. 4 dispatch skills at `skills/utility-pm-{role}/` deliver cross-client compatibility (PRODUCTION on Codex CLI for 3 dispatch skills; DRY-RUN VALIDATED for conductor; EXPERIMENTAL on Cursor / Windsurf / Copilot CLI / Gemini CLI per Codex P0 challenge review). Astro 5.13.x -> 6.3.x + Starlight 0.34.x -> 0.39.x + Node 22 -> 22.12+ across 5 CI workflows; closes 2 deferred Dependabot alerts. 10 new public docs (concepts/sub-agents + active-orchestration; guides/using-sub-agents + adversarial-review with mermaid revise-recheck loop; contributing/release-runbook with mermaid 6-gate flowchart + authoring-sub-agents + sub-agent-design-patterns + ci-overview with mermaid workflow-flow; reference/runtime-components + sub-agent-compatibility canonical cross-client matrix). 12 sub-agent library samples across brainshelf/storevine/workbench narrative threads. New `subagents/` directory (Windows NTFS case-collision resolution per D31 via `.claude-plugin/plugin.json` custom `"agents": ["./subagents/"]` path field; documented as CONTRIBUTING.md workaround #7). `/pm-*` command namespace (renamed from generic `/release`, `/critic`, etc. to avoid plugin namespace collisions). Comprehensive 13-layer testing summary at `docs/internal/release-plans/v2.16.0/testing-summary_v2.16.0.md` captures all 49 findings + closure trail from 4 Codex adversarial review cycles. Cross-client framing consolidation: 7 inline-table surfaces replaced with links to canonical compatibility matrix (v2.17 client-status promotion now a 1-file edit instead of 7-file). Generator bug fix: orphan sub-agent companion command rows now render in `docs/reference/commands.md` (commands.md count claim was correct at 66; table previously dropped 3 of the 4 /pm-* rows because `derive_command_name + find_command_file` assumed 1:1 skill-stem-to-command-name mapping). 3 stale-framing audit fixes (triple-diamond description; FS/DS contract version status; AGENTS.md "conditional on Phase 2 spike outcomes" framing). All 27 enforcing validators PASS locally. PR [#147](https://github.com/product-on-purpose/pm-skills/pull/147) is DRAFT pending maintainer push approval -> PR ready conversion -> CI green confirmation -> merge -> conductor live tag via `/pm-release v2.16.0`.

**Skill count:** 59 in v2.16.0 (26 phase + 8 foundation + 10 utility + 15 tool). +4 from v2.15.2's 55: 4 new utility dispatch skills (utility-pm-critic, utility-pm-skill-auditor, utility-pm-changelog-curator, utility-pm-release-conductor). Foundation Sprint family is 7 of 7 LIVE; Design Sprint family is 7 of 7 LIVE; tool-note-and-vote standalone LIVE. Plus 4 sub-agents under the `agents/` directory (renamed from `subagents/` in v2.17.0 W2; Claude Code plugin runtime components, natively auto-discovered, not counted in skills total).

**Validators:** the `scripts/pre-tag-validate.sh` bundle runs 18 enforcing validators (14 required + 4 preventive) plus 1 non-blocking advisory (`check-version-references`, wired in v2.17.0 F-P2-01). v2.17.0 W3 made 8 of the bundle validators bash-3.2 compatible (macOS default bash) and added a non-git-work-tree fallback to check-count-consistency. Full inventory + workflow mapping in `docs/contributing/ci-overview.md`. (Note: the broader tracked validator-script count, including .ps1 mirrors and CI-only validators outside the bundle, is larger; the bundle is the canonical enforcing surface.)

**Older context (v2.14.x release archive):** v2.14.0 SHIPPED 2026-05-10 at HEAD `5718440` (annotated tag; GitHub Release published from `docs/releases/Release_v2.14.0.md`). Doc Stack Migration: MkDocs Material to Astro Starlight. Production at https://product-on-purpose.github.io/pm-skills/ verified end-to-end (home, /reference/, /samples/, /releases/Release_v2.14.0/, redirect base-path all 200). All 4 phases complete (Phase 0 spike GO-WITH-CAVEATS 2026-05-06; Phase 1 Foundation; Phase 2 Parity; Phase 3 Cutover; Phase 4 Material retirement + W13 final validation). W13 ran in 4 planned sub-batches (B1 perf + auto-gates, B2 visual smoke, B3 Codex PR.2 via codex:rescue, B4 release artifacts + tag) + 2 mid-cycle insertions (B2.5 routing fixes for /reference/ + /samples/ + redirect base-path; B3.5 Codex PR.2 P1+P3 fixes including bash/pwsh parity gap discovery and locale fallback).

**Post-tag cleanup (shipped to main but not tagged; awaiting v2.14.1 or accumulating toward v2.15):** ~20 commits across 3 batches.

1. FU1-FU8 (post-tag follow-ups): version sweep across 5 stale v2.13.1 surfaces; gitignore session artifacts; docs/changelog.md v2.13.x backfill; Node 20 actions bump (forced cutoff 2026-06-02); jp-wrap-session log; check-internal-link-validity bash/pwsh parity fix (Windows Git Bash LC_ALL=C.UTF-8 locale issue) + 7 broken links fixed via generator rewrite_internal_paths() + EXAMPLE.md backtick-form fix + promotion to truly enforcing via --strict; 7 README stubs across docs/{skills,guides,concepts,contributing,getting-started,showcase,releases}/ + glob exclusion in src/content.config.ts + EXCLUDE_PATHS extensions in 4 validators; Mermaid style guide (MD + HTML) at docs/reference/mermaid-style-guide.md + public/mermaid-style-guide.html.

2. M1-M3 (Mermaid beautification): astro.config.mjs themeVariables (lineColor #5C7CFA + system-ui font + fontSize 14px); src/styles/custom.css polish (edge stroke-width 1.75px + node rect rx/ry 6 + cluster fill-opacity 0.4); per-diagram classDef + style directive Triple Diamond palette applied to docs/index.mdx graph LR and block-beta diagrams (6 phases color-coded).

3. V1-V11 (v2.14.x backlog closure): V1 dark mode contrast audit (Playwright DOM eval; solid-pastel palette = accepted posture documented in style guide); V2 CONTRIBUTING.md "Maintainer notes: architectural workarounds" section documenting 5 inline-commented workarounds; V3 verify-edit-links.mjs MIN_EDIT_LINKS threshold; V4 bash grep -P audit (confirmed FU6 scope correct); V5 validate-docs-frontmatter cleanup across 20 docs + YAML quote-wrapping for colons + promotion to --strict; V6 link validator .mdx scope expansion; V7 sync-agents-md.yml auto-trigger disabled (workflow_dispatch kept); V8 path-filtered workflow audit (only V7 + V9 had stale-failure); V9 pm-skills-mcp/pm-skills-source.json metadata v2.14.0 + maintenance: true flag (cross-repo commit 7e9cac5) + validate-mcp-sync.yml default mode block to observe (matches MCP maintenance posture per M-22 freeze); V10 user-facing "Generated file" asides removed from 63 generator-output pages + "Hand-edited curated" note removed from docs/skills/index.md; V11 en-dash sweep across 45 library sample files (182 en-dash occurrences swept to space-hyphen-space) + regenerate downstream docs.

4. V12-V14 (release-artifact accuracy sweep; commit `aefc1e7`): V12 this CONTEXT.md status block refresh from pre-v2.14.0-ship state; V13 Release_v2.14.0.md Counts clarified as tag-time snapshot with pointer to CHANGELOG `[Unreleased]` + plan + cycle plan annotated with post-tag work; V14 CHANGELOG.md + docs/changelog.md `[Unreleased]` sections populated.

5. V15 title-duplication fix (commit `2211a57`): user spotted on mobile screenshots of `/showcase/workbench/` + skill pages + phase indexes. Cause: Starlight auto-renders frontmatter `title:` as page heading; body also starting with `# Heading` matching title produces duplication. Migration regression from MkDocs Material. Fix: 6 generator H1 emission sites removed across 3 generators; workflow generator strips source `# Workflow Name` H1 from `_workflows/*.md` at copy boundary via regex (source files keep H1 for standalone-on-GitHub readability); 62 hand-authored docs body-stripped via Python script. 9 README.md files excluded (not in Astro build).

6. Post-V15 deferral closure (commit `eaa02cf`): A CONTRIBUTING.md "Maintainer notes" gets workaround #6 documenting Starlight title-vs-body-H1 convention; B validate-mcp-sync.js reads `pmSkillsSourceData.maintenance` flag and treats drift as expected when true (makes pm-skills-mcp/pm-skills-source.json authoritative for maintenance posture; V9 workflow-default flip becomes redundant safety); C new `scripts/check-no-body-h1.{sh,ps1,md}` triplet (3rd truly-enforcing CI validator; refuses any docs/**/*.{md,mdx} where first non-blank line after closing `---` is `# H1` matching frontmatter title; forward enforcement against V15 regression).

**Last Updated:** 2026-05-25 (v2.20.0 SHIPPED; G4 post-tag refresh: Status + both currency markers flipped to SHIPPED; 3 sprint workflow commands + count-validator hardening). Previously updated 2026-05-23 (v2.19.0 SHIPPED; G4 post-tag refresh: Status flipped to SHIPPED, validator count to 18, currency markers bumped). Previously updated 2026-05-19 (v2.16.2 SHIPPED; G4 post-tag refresh closing F-P1-02 from v2.16.1 G4 P0 audit. Status block now reflects v2.16.0 to v2.16.1 to v2.16.2 chain). Previously updated 2026-05-18 (v2.16.0 SHIPPED; G4 post-tag CONTEXT.md refresh per master plan + Codex R13 sequencing rule). Previously updated 2026-05-17 late evening (v2.16.0 ready-to-push state on spike branch). Previously updated 2026-05-10 (V12-V15 + A+B+C post-tag work; release docs hygiene sweep at end of v2.14.x cycle).

**Release:** v2.14.0 SHIPPED 2026-05-10 (Doc Stack Migration). GitHub Release: https://github.com/product-on-purpose/pm-skills/releases/tag/v2.14.0. Previous: v2.13.1 (2026-05-06 plugin install path correction); v2.13.0 (2026-05-05 Foundation Hardening + Doc Stack Decision); v2.12.0 (2026-05-03 OKR Skills Launch); v2.11.1 (2026-04-22); v2.11.0 (2026-04-18 Meeting Skills Family + lean-canvas).

**Skill count:** 40 (26 phase + 8 foundation + 6 utility). Unchanged from v2.12.0 through v2.14.0; v2.14.0 was a doc-stack migration release with zero catalog changes.

**MCP:** pm-skills-mcp in maintenance mode (effective 2026-05-04). Latest tagged: **v2.9.3** (security-patch follow-up; 0 Dependabot alerts post-ship). Catalog frozen at v2.9.2 build (40 skill tools + 11 workflow tools + 8 utility tools = 59 tools). v2.14.x V9 updated pm-skills-mcp/pm-skills-source.json metadata to v2.14.0 + added `maintenance: true` flag; pm-skills validate-mcp-sync.yml default mode flipped from block to observe so drift no longer fails CI (drift is the maintenance posture).

**Three CI validators truly enforcing post-tag (was 11 at v2.14.0 tag, now 14):** check-internal-link-validity --strict (FU6 promotion); validate-docs-frontmatter --strict (V5 promotion); new check-no-body-h1 --strict (added in post-V15 deferral closure C). Total validator inventory: 24 (was 23 at tag; +1 for check-no-body-h1). Truly enforcing: 14; advisory: 10. Previously FU6+V5 validators were "enforcing in name only" (CI step ran without --strict so scripts exited 0 with findings); now genuinely enforcing on Ubuntu + Windows.

**Two long-standing failing workflows closed:** sync-agents-md.yml disabled (V7; was failing on every skills/** push since 2026-04-23 due to flat skills/ structure mismatch); validate-mcp-sync.yml flipped to observe (V9; failure was the M-22 maintenance posture, not a bug).

**Architectural workarounds documented:** CONTRIBUTING.md "Maintainer notes" section now documents 6 workarounds future-maintainers should NOT "fix": autogenerate `docs/` prefix in astro.config.mjs; scripts/post-build-strip-md-links.mjs running after astro build; EXCLUDE_PATHS hardcoded arrays mirroring src/content.config.ts glob excludes; scripts/generate-skill-pages.py rewrite_internal_paths() helper; scripts/check-internal-link-validity.sh LC_ALL=C.UTF-8 fallback; Starlight title-vs-body-H1 convention (generators do not emit body H1; workflow generator strips source H1 at copy boundary; authors of new hand-authored docs use frontmatter title as page heading without a duplicate body H1).

**Mermaid style guide shipped:** docs/reference/mermaid-style-guide.md (canonical reference; user-facing) + public/mermaid-style-guide.html (self-contained live preview; opens locally or served at /pm-skills/mermaid-style-guide.html). Documents 3-layer styling model (M1 themeVariables + M2 CSS polish + M3 per-diagram classDef), Triple Diamond palette, 5 diagram-type examples, dark mode audit notes, machine-readable YAML spec for agents.

**Next Step:** v2.15+ cycle planning (fresh session). Deferred items: JS theme-listener for true dark-mode-adaptive Mermaid (V1 deferred); library samples scope expansion in link validator (V6 partial); slug normalization for release URLs; Astro 6 + Node 22.12+ upgrade (Decision 11 in v2.14 cycle plan); sync-agents-md.yml rewrite to walk flat skills/{phase-name}/ structure (V7 disable was tactical); validate-mcp-sync.js maintenance: true flag awareness (V9 used workflow-default flip; cleaner solution is validator reads the flag from source.json).

## Project Overview

PM-Skills is an open source collection of Product Management skills for AI agents. Skills are reusable instruction sets that help AI assistants produce high-quality PM artifacts.PRDs, problem statements, user stories, experiment designs, and more.

**V1 Scope:** Complete Triple Diamond framework coverage (24 skills across 6 phases) ✅

## Key Files

- `README.md` . Comprehensive project overview with badges, skills inventory, quick start guides
- `CHANGELOG.md` . Version history (Keep a Changelog format)
- `LICENSE` . Apache 2.0 license
- `CONTRIBUTING.md` . Contribution guidelines with curated model
- `(internal-notes)/VISION.md` . Detailed vision document with full roadmap
- `(internal-notes)/v1-plan/plan-v1.md` . Implementation plan with 35 issues

## Architecture (v2.0+ Flat Structure)

```
pm-skills/
├── skills/               # PM skills . FLAT structure (v2.0+)
│   ├── define-hypothesis/
│   ├── define-problem-statement/
│   ├── deliver-prd/
│   ├── deliver-user-stories/
│   └── ...               # 40 skills total: {phase/classification}-{skill}/
├── _workflows/           # 9 Workflows (triple-diamond, lean-startup, feature-kickoff, and 6 more)
├── commands/             # Claude Code slash commands (10 total, all workflow orchestrators)
├── docs/                 # Documentation (Diataxis: concepts, guides, reference, plus generated skills/workflows/showcase)
│   ├── concepts/         # Conceptual orientation (triple-diamond-delivery-process, ...)
│   ├── guides/           # How-to guides
│   ├── reference/        # Lookup material
│   ├── skills/           # Generated per-skill pages (one per skill + category indices)
│   ├── workflows/        # Generated workflow pages
│   ├── showcase/         # Generated thread-aligned showcase
│   └── templates/        # Skill creation templates
├── library/              # Curated output libraries
│   └── skill-output-samples/  # 126 sample outputs across the catalog
├── .claude-plugin/       # Claude plugin manifest (plugin.json)
├── scripts/              # Build and validation scripts
│   ├── build-release.sh  # Create versioned ZIP
│   ├── sync-claude.sh    # Sync to .claude/ for discovery
│   ├── validate-commands.sh
│   ├── validate-agents-md.sh  # AGENTS.md ↔ skill directory sync (M-12)
│   ├── check-mcp-impact.sh   # Advisory MCP impact detection (M-12)
│   └── lint-skills-frontmatter.sh
├── .github/workflows/    # CI/CD
│   ├── validation.yml    # Runs on Ubuntu + Windows
│   ├── release.yml       # Create releases on tag
│   └── release-zips.yml  # Package ZIP artifacts
├── _agent-context/       # AI agent session continuity
│   ├── SESSION-LOG/      # Shared session logs (model encoded in filename: <date>_<model>_<scope>.md)
│   └── claude/
│       ├── CONTEXT.md    # Project state (this file)
│       ├── DECISIONS.md  # Technical decisions
│       └── PLANNING/     # Working artifacts
├── AGENTS.md             # Universal agent discovery
└── README.md, CHANGELOG.md, CONTRIBUTING.md
```

## Recent Work

- **Post-v2.10.1 maintenance** (2026-04-14, uncommitted on main)
  - **Plugin manifest drift fixed**: `.claude-plugin/plugin.json` and `marketplace.json` descriptions corrected from "29 skills" to "32 skills" (both had lagged since v2.10.0 utility expansion).
  - **CI extended**: `check-count-consistency.sh` / `.ps1` / `.md` now scans `.json` files too (previously `.md` only). `plugin.json` and `marketplace.json` are now covered. Added narrow exclusions for `.github/.created-issues.json` and `.github/scripts/` (npm lock + manifest).
  - **Off-by-one fix**: threshold comparison in the CI changed from `>` to `>=`. Caught a live mismatch immediately: README.md:132 claimed "10 workflows" when actual is 9. Fixed in the same session.
  - **Memory refresh**: MEMORY.md updated . current version v2.9.0→v2.10.1, skills 31→32, utility 5→6, workflows count reconciled to 9.
  - **Known gap left open**: historical "N skills" references in README "What's New" blocks (27/29/31) and CLAUDE.md:31 (24 skills) still trip the CI because the `v[0-9]+\.` line-level heuristic doesn't see the `<summary>v2.X.Y</summary>` on the enclosing `<details>` element. Tracked as a future CI hardening task.

- **v2.10.0 In Progress** (2026-04-07 to 2026-04-09)
  - **F-16 shipped**: `utility-mermaid-diagrams` . 15 diagram types, dual-lens navigation (catalog + PM use-cases), syntax validity reference, 2,656 lines
  - **F-19 shipped**: `utility-slideshow-creator` . 18 slide types, JSON deck specs, zero design decisions at generation time, generic professional theme, 766 lines
  - **Effort briefs created**: F-17 (meeting-synthesis), F-18 (meeting-prep), F-20 (slideshow-themer), F-21 (content-voice), F-22 (prototype-creator), F-23 (prototype-styler)
  - **Comprehensive docs hygiene sweep**: 20+ files updated across two count sweeps (30→31 skills)
  - **Max-effort audit**: 9 review agents + 4 audit agents caught 24+ stale count references, mermaid syntax issues, anchor mismatches
  - **MCP alignment documented**: 3-skill gap, embed + build steps in release plan
  - **Release plan**: `docs/internal/release-plans/v2.10.0/plan_v2.10.0.md`
  - Repo at v2.10.0-dev: 32 skills, 39 commands, 9 workflows

- **v2.9.0 Planning Complete** (2026-04-06)
  - **Theme**: Rename "bundles" to "workflows" + expand from 3 to 9 guided multi-skill workflows
  - **M-19**: Rename `_bundles/` → `_workflows/`, ~400 references across ~100 files, delete `/kickoff`, add `/workflow-feature-kickoff`, URL redirects, terminology guard
  - **F-13**: 6 new workflows (Customer Discovery, Sprint Planning, Product Strategy, Post-Launch Learning, Stakeholder Alignment, Technical Discovery) with `/workflow-` prefixed commands
  - **Two-commit strategy**: Commit 1 = M-19 rename (single atomic commit), Commit 2 = F-13 expansion
  - **MCP**: Source-level API refactor deferred to companion release (non-breaking, `pm_workflow_*` tool names unchanged)
  - **Codex reviews**: M-19 plan reviewed (13 findings, all addressed), v2.9.0 release plan reviewed (8 findings, all addressed)
  - **Plans**: `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md` (master), `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows.md` (detailed rename)
  - **Key decisions**: delete `/kickoff` (no alias), terminology guard advisory→FAIL post-v2.9.0, release notes draft in Commit 1
  - Repo at v2.9.0: 31 skills, 38 commands, 9 workflows

- **v2.8.2 Released** (2026-04-04)
  - Versioning concepts page, git-revision-date plugin, custom CSS, F-12 effort brief
  - Documentation-only release

- **v2.8.1 Released** (2026-04-04)
  - MkDocs Material documentation site launch with showcase, skill pages, prompt gallery
  - Documentation-only release

- **v2.8.0 Released** (2026-04-03)
  - **Theme**: Complete the PM skill lifecycle . Create → Validate → Iterate
  - **F-10**: `utility-pm-skill-validate` . audits skills against structural conventions and quality criteria, pipe-delimited report format (`Report schema: v1`), two-tier assessment rebaselined against shipped library (`1398835`)
  - **F-11**: `utility-pm-skill-iterate` . applies targeted improvements from feedback or validation reports, before/after preview with stale-preview guard, version bump suggestion, HISTORY.md creation at trigger point (`2f6577e`)
  - **M-18**: CI validation scripts . `validate-skill-history` + `validate-skills-manifest` (advisory, Codex implementation) (`c099efa`)
  - **D-03**: `docs/pm-skill-lifecycle.md` . public lifecycle guide with 4 workflow patterns (`f678344`)
  - **D-04**: Public docs refresh . counts (29 skills, 30 commands), Skill Lifecycle Tools sections in README/QUICKSTART, mermaid diagrams across 7 files, command files, AGENTS.md entries
  - **Governance**: `docs/internal/skill-versioning.md` . SemVer rules, HISTORY.md contract, skills-manifest.yaml format, tie-breaker rule
  - **Infrastructure**: `docs/internal/releases/` renamed to `docs/internal/release-plans/`
  - **Codex review**: Full design review with 20 findings (3 blockers resolved), pre-release consistency review with 8 findings (all fixed)
  - **MCP synced**: pm-skills-mcp v2.8.0 . `pm_pm_skill_validate` + `pm_pm_skill_iterate`, 42 tools (29 skills + 5 workflows + 8 utilities)
  - Repo: 31 skills (25 domain + 1 foundation + 5 utility), 38 commands, 9 workflows

- **v2.7.0 Released** (2026-03-22)
  - **M-12**: CI validation enhancement . extended linter, validate-agents-md, check-mcp-impact (`8d2a418`)
  - **F-06**: deliver-acceptance-criteria skill . Given/When/Then, e-commerce checkout example (`8d2a418`)
  - **M-16**: exclude `docs/internal/**` from release ZIP (`0c2e637`)
  - **F-05**: utility-pm-skill-builder . first utility skill, interactive builder with gap analysis, Why Gate, staging workflow (`3c50108`..`a67f144`). Codex design + implementation reviews both approved.
  - **D-01**: `docs/pm-skill-anatomy.md` . practical guide to skill structure (`b478276`)
  - **D-02**: 14 public docs updated for v2.7.0 accuracy, post-F-05 reconciliation (`12a30a9`)
  - **MCP synced**: pm-skills-mcp v2.7.0 . `pm_acceptance_criteria` + `pm_pm_skill_builder`
  - **MCP sync docs**: maintainer workflow added to `docs/guides/mcp-integration.md`
  - **Release governance**: v2.2.0-v2.7.0 folders, decisions log, detailed release notes
  - **Issues closed**: #112, #113, #114, #123
  - Repo: 27 skills (25 domain + 1 foundation + 1 utility), 28 commands, 3 workflows

- **v2.6.1 Shipped . Sample Library Recovery** (2026-03-04)
  - Sample output library moved and normalized to `library/skill-output-samples/`
  - 95 sample outputs across 25 skills, with `SAMPLE_CREATION.md` standards
  - Release packaging (`build-release.sh`/`.ps1`) now includes sample-library content
  - Release note: `docs/releases/Release_v2.6.1.md`

- **v2.6.0 Shipped . Claude Plugin Manifest** (2026-03-04)
  - Added `.claude-plugin/plugin.json` for Claude plugin packaging
  - Plugin packaging validation workflow: `.github/workflows/validate-plugin.yml`
  - Release packaging enforces plugin-manifest version parity
  - Release note: `docs/releases/Release_v2.6.0.md`

- **v2.5.2 Shipped . Public Doc Hygiene** (2026-03-04)
  - Rewrote release-facing docs for clearer user-first language
  - Removed internal decision-ID references from public release artifacts

- **v2.5.1 Shipped . Agent Workspace Canonicalization** (2026-03-04)
  - Canonicalized Claude agent workspace to `AGENTS/claude/` (retired `AGENTS/claude-opus*` paths)
  - Added clean-worktree release runbook: `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`

- **v2.5.0 Shipped . Foundation Persona Skill** (2026-03-02)
  - New `skills/foundation-persona/` skill + references
  - New `/persona` command at `commands/persona.md`
  - AGENTS discovery updated for foundation classification
  - Persona archetype library and MCP exposure deferred to v2.7.0

- **v2.4.x Series . Contract Lock & Governance** (2026-02-16)
  - v2.4.0: Output behavior contract and config/schema lock closed as aligned
  - v2.4.1: Release-doc consistency finalization
  - v2.4.2: Canonical delivery-plan policy and v2.5 continuity kickoff; legacy internal docs archived
  - v2.4.3: Release metadata rolled forward; published-artifact links captured
  - Expanded `validate-mcp-sync` with pin metadata and contract-version parity checks
  - Canonical backlog and delivery-plan governance established at `docs/internal/`

- **v2.3.0 Shipped . MCP Sync Blocking Mode** (2026-02-14)
  - Switched `.github/workflows/validate-mcp-sync.yml` to blocking-default mode
  - Release note: `docs/releases/Release_v2.3.md`

- **v2.2.0 Shipped . Guardrails & Governance** (2026-02-13)
  - MCP drift checker script and observe-only workflow
  - Planning persistence policy and canonical backlog governance
  - Release execution artifacts and checklists for v2.2 to v2.5

- **v2.1.0 Released . MCP Alignment Complete** (2026-01-28)
  - Executed full v2.1 plan for both pm-skills and pm-skills-mcp
  - **pm-skills-mcp v2.1.0:**
    - Updated `embed-skills.js` for flat source layout
    - Updated `loader.ts` to read phase from frontmatter
    - Flattened resource URIs: `pm-skills://skills/{skill}`
    - Added `deriveToolName()` in `server.ts` for stable tool names
    - Updated workflow skill lookups for new naming
    - All 66 tests passing
    - Published to npm: `pm-skills-mcp@2.1.0`
    - Created GitHub release with v2.1.0 tag
    - Fixed: Removed personal `.claude/` directory from tracking (40 files)
  - **pm-skills v2.1.0:**
    - Updated `docs/reference/ecosystem.md` with version alignment table
    - Updated `docs/guides/mcp-integration.md` with v2.1 notes
    - Updated CHANGELOG with MCP alignment milestone
    - Created GitHub release with v2.1.0 tag

- **v2.1 Execution Plan Created** (2026-01-27)
  - Created comprehensive v2.1 execution plan
  - Key decisions: flat URIs, stable tool names, frontmatter-based phase

- **v2.0.2 Released** (2026-01-27)
  - Validation workflow added (`validation.yml`) . runs on Ubuntu and Windows
  - Front-matter lint scripts created (`lint-skills-frontmatter.sh/ps1`)
  - Metadata cleanup: removed nested `metadata.version` from all 24 skills
  - Build scripts parameterized for versioned artifacts
  - Scripts guide renamed to `scripts/README_SCRIPTS.md`
  - Release typo fixed (`opensills` → `openskills`)

- **v2.0.0 Released** (2026-01-26)
  - Repository flattened to `skills/{phase-skill}/` structure
  - All 24 skills renamed with phase prefix (e.g., `deliver-prd`)
  - Sync helpers and build scripts added
  - Documentation updated for flat structure

- **v2.0 Execution Plans Complete** (2026-01-26)
  - Created detailed Claude execution plan with 8 phases, migration mapping for all 24 skills
  - Applied Codex's 5 feedback items: packaging, doc frontmatter, timeline dates, fail-fast sync helpers, validation
  - Created tool analysis comparing Claude Code vs Codex for execution
  - Recommendation: Codex 5.1/Max for execution (score 4.05/5), Claude for review/refinement (2.85/5)
  - Key decisions locked:
    - Flat structure: `skills/{phase}-{skill}/` replacing `skills/{phase}/{skill}/`
    - ZIP includes prebuilt `.claude/skills/` and `.claude/commands/`
    - Sync helpers validate SKILL.md, TEMPLATE.md, EXAMPLE.md with fail-fast
    - Two-path install guidance for Claude Code vs other tools
  - Packaging discrepancy noted between Claude and Codex plans (to reconcile before M4)
  - Plans located at `(internal-notes)/plans/v2.0-flat-extensions/`

- **v2.0 Planning: Structure, Output, MCP Impact** (2026-01-21)
  - Analyzed Claude Code skill discovery requirements (flat `.claude/skills/` vs hierarchical `skills/{phase}/`)
  - Created comprehensive planning documents in `AGENTS/claude/PLANNING/`:
    - `plan_skill-structure-revamp.md` . 6 options for restructuring (keep current, flatten, phase prefix, numeric prefix, dual structure, flat+metadata)
    - `plan_skill-output.md` . Configurable file output (always file, always prompt, configurable default)
    - `plan_revamp-mcp.md` . Impact analysis for pm-skills-mcp (tool names, resource URIs, workflows, embed script)
  - Key findings:
    - Current hierarchical structure is agentskills.io compliant but NOT Claude Code auto-discoverable
    - Current `commands/` workaround enables slash commands but not skill discovery
    - Recommended: Option 3 (phase prefix) or Option 5 (dual structure) for Claude Code compatibility
    - MCP can remain backwards-compatible if tool names aren't changed
  - Awaiting stakeholder review before implementation

- **README Cross-Linking with pm-skills-mcp** (2026-01-21)
  - Added MCP badge and callout in README header linking to pm-skills-mcp
  - Updated Platform Compatibility table with MCP links for Claude Desktop, Cursor
  - Added "Any MCP Client" row with protocol-level access
  - Added new MCP Server quick start section (collapsible)
  - Added Related Projects section explaining pm-skills vs pm-skills-mcp
  - Added FAQ entry: "What's the difference between pm-skills and pm-skills-mcp?"
  - Part of cross-linking initiative to clarify ecosystem relationship

- **Ecosystem & MCP Integration Documentation** (2026-01-21)
  - Created `docs/reference/ecosystem.md` . comprehensive ecosystem overview ([#94](https://github.com/product-on-purpose/pm-skills/issues/94))
    - Explains pm-skills vs pm-skills-mcp relationship
    - Decision matrix for choosing between approaches
    - Feature comparison table
    - Integration patterns (file-based, MCP-based, hybrid)
    - Customization workflow and version compatibility
  - Created `docs/guides/mcp-integration.md` . MCP integration guide ([#95](https://github.com/product-on-purpose/pm-skills/issues/95))
    - Quick start for Claude Desktop, Claude Code, Cursor, VS Code
    - Complete tool inventory (24 skill + 5 workflow + 6 utility tools)
    - Slash command to MCP tool mapping table
    - Customization and troubleshooting sections
  - Updated README.md with links to new documentation
  - Updated project structure documentation references

- **README Platform Compatibility & Getting Started Enhancements** (2026-01-20)
  - Expanded "Works for..." section with comprehensive platform compatibility table
  - Added status indicators (✅ Native, 🔶 Manual) for 10+ platforms
  - Added collapsible "Quick Start by Platform" sections for each platform
  - Cross-referenced PM-Skills MCP for programmatic access
  - Streamlined "Getting Started" section with Installation Options table
  - Aligned documentation style with pm-skills-mcp README

- **README Restructure & Project Structure Documentation** (2026-01-20)
  - Restructured README.md headings for better scannability:
    - "Forward March!" → "Project Status"
    - Contributing elevated to H2 with subsections
    - Created "About" section wrapping Author and License
    - "More Suggestions" → "Community"
  - Added Project Structure tree diagram to README.md
  - Created `docs/reference/project-structure.md` with comprehensive file/folder hierarchy
  - Updated FAQ: clarified openskills CLI question (bug resolved, structural limitation remains)
  - Updated pm-skills-mcp README.md to mirror same structure

- **v1.2.0 Released . Security & Community Infrastructure** (2026-01-20)
  - Added SECURITY.md with vulnerability reporting guidelines
  - Added CodeQL code scanning workflow (`.github/workflows/codeql.yml`)
  - Added Dependabot configuration for GitHub Actions and npm updates
  - Added issue templates: bug_report.yml, feature_request.yml, config.yml
  - Added pull request template with contribution checklist
  - Blank issues now disabled (must use templates)
  - Created open-source repo config guide at jpkb
  - Audited pm-skills against GitHub best practices (57% → targeting 85%+)
  - Remaining manual tasks: enable secret scanning, create tag ruleset

- **openskills #48 Resolved** (2026-01-20)
  - Bug fix released in openskills v1.3.1 (now at v1.5.0)
  - Root cause: hardcoded '/' path separator failed on Windows
  - Verified: `anthropics/skills` now installs all 17 skills successfully
  - Note: pm-skills 24 skills not auto-discovered (openskills looks in `.claude/skills/`, not `skills/phase/`)
  - Git clone remains the recommended installation method for pm-skills

- **Open-Skills Submissions Complete** (2026-01-17)
  - Submitted PR to awesome-claude-skills: [PR #62](https://github.com/ComposioHQ/awesome-claude-skills/pull/62)
  - Submitted to n-skills marketplace: [Issue #6](https://github.com/numman-ali/n-skills/issues/6)
  - Both submissions awaiting review (24-48 hours typical)

- **Open-Skills Preparation** (2026-01-16)
  - Added attribution headers to all 24 SKILL.md files (HTML comments)
  - Created dedicated PR guide: `(internal-notes)/efforts/open-skills/plan-pr--awesome-claude-skills.md`
  - Added CODE_OF_CONDUCT.md (Contributor Covenant v2.1)
  - Updated CONTRIBUTING.md to link to Code of Conduct
  - GitHub Discussions enabled, repository topics added
  - Ready for awesome-claude-skills PR submission

- **Documentation Expansion** (2026-01-16)
  - Verified accuracy of `docs/reference/categories.md` and `frontmatter-schema.yaml` . all 24 skills validated
  - Reorganized `/docs` with new taxonomy: `reference/`, `guides/`, `frameworks/`
  - Expanded `categories.md` from 54 → 420+ lines with diagrams, workflows, framework mappings
  - Expanded `frontmatter-schema.yaml` from 91 → 600 lines with validation rules, examples, best practices
  - Created `docs/reference/getting-started.md` . comprehensive setup guide for 5 methods (~600 lines)
  - Created `docs/guides/using-skills.md` . beginner to advanced usage guide (~750 lines)
  - Created `docs/guides/authoring-pm-skills.md` . skill creation and submission guide (~850 lines)
  - Verified all framework claims in README are accurate (Teresa Torres, Christensen, Nygard)

- **v1.0.2 Release & Cleanup** (2026-01-15)
  - Created v1.0.2 tag . release workflow ran successfully
  - Both ZIP artifacts created: pm-skills-v1.0.2.zip, pm-skills-claude-v1.0.2.zip
  - Renamed `_docs/` → `docs/` and `_templates/` → `templates/` for standard conventions
  - Created CLAUDE.md with documentation rules (never reference `(internal-notes)/` in public docs)
  - Cleaned `(internal-notes)/` references from CHANGELOG.md and CONTRIBUTING.md
  - Updated manual submission guide with copy-paste ready content
  - Ready for manual PR to awesome-claude-skills

- **Open-Skills Ecosystem Integration** (2026-01-15)
  - Created detailed execution plan for publishing to open-skills ecosystem
  - Tested openskills CLI . discovered bug with nested directories ([#48](https://github.com/numman-ali/openskills/issues/48))
  - Verified bug affects Anthropic's official `anthropics/skills` repo too
  - Updated README.md with accurate installation instructions (Git clone recommended)
  - Added "See It In Action" section to README.md
  - Created GitHub release workflow (`.github/workflows/release.yml`)
  - Prepared PR content for awesome-claude-skills submission
  - Prepared submission content for n-skills marketplace
  - Documentation at `(internal-notes)/efforts/open-skills/`

- **All 24 Slash Commands COMPLETE** (2026-01-15)
  - Created 20 missing slash commands in `commands/` directory:
    - Discover: `/competitive-analysis`, `/interview-synthesis`, `/stakeholder-summary`
    - Define: `/jtbd-canvas`, `/opportunity-tree`
    - Develop: `/adr`, `/design-rationale`, `/solution-brief`, `/spike-summary`
    - Deliver: `/edge-cases`, `/launch-checklist`, `/release-notes`
    - Measure: `/dashboard-requirements`, `/experiment-design`, `/experiment-results`, `/instrumentation-spec`
    - Iterate: `/lessons-log`, `/pivot-decision`, `/refinement-notes`, `/retrospective`
  - GitHub issues #43-62 created and closed
  - Updated README.md, AGENTS.md, CHANGELOG.md with complete command list
  - Version bumped to v1.0.1

- **Phase 3 P2 Skills COMPLETE** (2026-01-14)
  - Created 11 P2 Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/-/` . [GitHub #26](https://github.com/product-on-purpose/pm-skills/issues/26)
    - `skills/-/` . [GitHub #27](https://github.com/product-on-purpose/pm-skills/issues/27)
    - `skills/-/` . [GitHub #28](https://github.com/product-on-purpose/pm-skills/issues/28)
    - `skills/-/` . [GitHub #29](https://github.com/product-on-purpose/pm-skills/issues/29)
    - `skills/-/` . [GitHub #30](https://github.com/product-on-purpose/pm-skills/issues/30)
    - `skills/-/` . [GitHub #31](https://github.com/product-on-purpose/pm-skills/issues/31)
    - `skills/-/` . [GitHub #32](https://github.com/product-on-purpose/pm-skills/issues/32)
    - `skills/-/` . [GitHub #33](https://github.com/product-on-purpose/pm-skills/issues/33)
    - `skills/-/` . [GitHub #34](https://github.com/product-on-purpose/pm-skills/issues/34)
    - `skills/-/` . [GitHub #35](https://github.com/product-on-purpose/pm-skills/issues/35)
    - `skills/-/` . [GitHub #36](https://github.com/product-on-purpose/pm-skills/issues/36)
  - Created GitHub labels: `phase-3`, `P2`
  - All 11 issues closed

- **Phase 2 COMPLETE** (2026-01-14)
  - Created 8 P1 Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/-/` . [GitHub #18](https://github.com/product-on-purpose/pm-skills/issues/18)
    - `skills/-/` . [GitHub #19](https://github.com/product-on-purpose/pm-skills/issues/19)
    - `skills/-/` . [GitHub #20](https://github.com/product-on-purpose/pm-skills/issues/20)
    - `skills/-/` . [GitHub #21](https://github.com/product-on-purpose/pm-skills/issues/21)
    - `skills/-/` . [GitHub #22](https://github.com/product-on-purpose/pm-skills/issues/22)
    - `skills/-/` . [GitHub #23](https://github.com/product-on-purpose/pm-skills/issues/23)
    - `skills/-/` . [GitHub #24](https://github.com/product-on-purpose/pm-skills/issues/24)
    - `skills/-/` . [GitHub #25](https://github.com/product-on-purpose/pm-skills/issues/25)
  - Created GitHub labels: `phase-2`, `P1`
  - Created GitHub milestone: v0.3.0 - P1 Skills
  - All 8 issues closed

- **Phase 1 COMPLETE** (2026-01-14)
  - Created 5 P0 Core Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/-/` . [GitHub #10](https://github.com/product-on-purpose/pm-skills/issues/10)
    - `skills/-/` . [GitHub #11](https://github.com/product-on-purpose/pm-skills/issues/11)
    - `skills/-/` . [GitHub #12](https://github.com/product-on-purpose/pm-skills/issues/12)
    - `skills/-/` . [GitHub #13](https://github.com/product-on-purpose/pm-skills/issues/13)
    - `skills/-/` . [GitHub #14](https://github.com/product-on-purpose/pm-skills/issues/14)
  - Created GitHub labels: `skill`, `phase-1`, `P0`
  - Created GitHub milestone: v0.2.0 - P0 Core Skills

- **Phase 0 COMPLETE** (2026-01-14)
  - Created CONTRIBUTING.md with curated contribution model
  - Built full directory structure with .gitkeep files
  - Created `docs/frontmatter-schema.yaml`
  - Created `docs/categories.md`
  - Created `docs/templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md
  - Verified VISION.md at `(internal-notes)/VISION.md`
  - GitHub issues #1-9 closed (plan review fixes)

## Recent Infrastructure (2026-03-18)

- **Context Currency Scripts (added 2026-03-18):**
  - `scripts/check-context-currency.sh` . detects stale `AGENTS/*/CONTEXT.md` vs CHANGELOG; exit 1 on mismatch
  - `scripts/check-context-currency.ps1` . PowerShell equivalent for Windows local use
  - CI step pending (A-9): `validation.yml` will run `.sh` with `continue-on-error: true`

- **Slash Commands (39 total):**
  - 32 skill commands (24 original + `/persona` + `/acceptance-criteria` + `/pm-skill-builder` + `/pm-skill-validate` + `/pm-skill-iterate` + `/mermaid-diagrams` + `/slideshow-creator` + `/update-pm-skills`)
  - 7 workflow commands: `/workflow-feature-kickoff`, `/workflow-customer-discovery`, `/workflow-sprint-planning`, `/workflow-product-strategy`, `/workflow-post-launch-learning`, `/workflow-stakeholder-alignment`, `/workflow-technical-discovery`
- **Skills (32 total):**
  - 25 domain skills (24 original + deliver-acceptance-criteria)
  - 1 foundation skill: foundation-persona (`classification: foundation`)
  - 6 utility skills: utility-pm-skill-builder, utility-pm-skill-validate, utility-pm-skill-iterate, utility-mermaid-diagrams, utility-slideshow-creator, utility-update-pm-skills (`classification: utility`)
- **Sample Output Library:**
  - `library/skill-output-samples/` . 95 sample outputs across 25 skills
  - `SAMPLE_CREATION.md` . standards for sample creation
- **Plugin Manifest:**
  - `.claude-plugin/plugin.json` . Claude plugin packaging (added v2.6.0)
  - `.github/workflows/validate-plugin.yml` . plugin validation CI
- **Workflows (9 total):**
  - `_workflows/triple-diamond.md` . Complete product development cycle
  - `_workflows/lean-startup.md` . Build-Measure-Learn rapid iteration
  - `_workflows/feature-kickoff.md` . Quick-start workflow for features
  - `_workflows/customer-discovery.md` . Transform raw research into a validated problem
  - `_workflows/sprint-planning.md` . Prepare sprint-ready stories from a backlog
  - `_workflows/product-strategy.md` . Frame a major strategic initiative
  - `_workflows/post-launch-learning.md` . Measure results and capture learnings after launch
  - `_workflows/stakeholder-alignment.md` . Build a case for leadership buy-in
  - `_workflows/technical-discovery.md` . Evaluate technical feasibility and architecture
- **Agent Discovery:**
  - `AGENTS.md` . Universal agent discovery file with all commands listed
- **GitHub Actions:**
  - `.github/workflows/validation.yml` . Runs on Ubuntu + Windows
  - `.github/workflows/validate-mcp-sync.yml` . MCP drift check (blocking mode)
  - `.github/workflows/validate-plugin.yml` . Plugin manifest validation
  - `.github/workflows/release.yml` . Create releases on tag
  - `.github/workflows/release-zips.yml` . Package ZIP artifacts

## Next Steps

### Active (post-v2.14.0; v2.15+ planning)

v2.14.0 SHIPPED 2026-05-10. Post-tag cleanup (FU1-FU8 + M1-M3 + V1-V11) also shipped to main but not tagged (awaiting v2.14.1 or accumulating toward v2.15). The next active cycle is v2.15+ scoping; recommend fresh session for cycle planning.

Authoritative documents (closed; reference only):
- Cycle plan (closed 2026-05-10): `docs/internal/release-plans/v2.14.0/plan_v2.14.0.md`
- Migration execution plan (closed 2026-05-10; all 13 workstreams + W13 sub-batches): `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-migration.md`
- Spike plan + report (Phase 0 artifacts): `plan_v2.14_starlight-spike.md` + `plan_v2.14_starlight-spike-report_2026-05-06.md`
- Release notes: `docs/releases/Release_v2.14.0.md`
- Session log (deep mode): `AGENTS/SESSION-LOG/2026-05-10_07-00_claude_v2.14.0-tag-ship-and-post-tag-followups.md` (gitignored; covers W13 + tag + FU1-FU8 + M1-M3)

| Gate | Item | Status |
|------|------|--------|
| Phase 0 spike | Astro Starlight compatibility decision | Executed 2026-05-06; GO-WITH-CAVEATS |
| Phase 1 Foundation (W1-W3.5) | Pre-flight + in-place mount + frontmatter compliance | CLOSED 2026-05-08 |
| Phase 2 Parity (W4-W9 + W5.5) | Sidebar IA + CSS port + Starlight asides + Mermaid + samples + generators + redirects | CLOSED 2026-05-09 |
| Phase 3 Cutover (W10-W11) | CI migration + GitHub Pages deploy + post-cutover icon-leakage fix | CLOSED 2026-05-10 |
| Phase 4 Deprecate + Ship (W12-W13) | Material removal + final validation + tag | CLOSED 2026-05-10; v2.14.0 tagged at `5718440` |
| Pre-ship validation gates (G1-G7) | All 7 PASS at tag | DONE |
| Decision Briefs (D1-D4 + DM-1 to DM-4 + Q1-Q5) | All resolved with maintainer Accept signoff | DONE |
| Codex PR.2 (release-state) | 0 P0 + 3 P1 + 4 P2 + 2 P3; all P1 resolved before tag; P2 + P3 deferred or closed in post-tag V batches | DONE |
| Post-tag FU1-FU8 + M1-M3 + V1-V11 | All shipped to main 2026-05-10; CI green | DONE |

v2.14.x has no remaining work. v2.15+ scoping items deferred to fresh session.

### Backlog

See `docs/internal/backlog-canonical.md` for the priority-ordered backlog.

| ID | Effort | Issue |
|----|--------|-------|
| M-13 | Convention alignment pass | #115 |
| M-14 | Release automation enhancement | #116 |
| M-15 | Community contribution setup | #117 |
| F-07 | `discover-market-sizing` | #118 |
| F-08 | `measure-survey-analysis` | #119 |
| F-09 | Agent Skill Builder (`/agent-skill-builder`) | #120 |
| F-12 | Skill quality convergence | (draft) |

**Key scope change (2026-03-21):** M-01 through M-04 moved to Knowledge OS (separate initiative). pm-skills focuses on being an excellent, community-ready skill library.

## Notes

- Follows [Agent Skills Specification](https://agentskills.io/specification)
- Primary Audience: Individual Product Managers using AI assistants
- Cross-platform: Claude Code, Claude.ai, GitHub Copilot, Cursor, Windsurf, OpenCode
- 40 skills total: 26 phase (domain) + 8 foundation + 6 utility (v2.13.0)
- 9 workflows (expanded from 3 in v2.9.0)
- 47 slash commands (40 skill + 7 workflow)
- 126 library samples in `library/skill-output-samples/`

## Skills Inventory

> **Note (refresh deferred to v2.14.0+):** the per-phase tables below are at the v2.10.x-era 32-skill catalog and have not been refreshed for the current 40-skill catalog (26 phase + 8 foundation + 6 utility) shipped in v2.11.0/v2.12.0. The authoritative current catalog lives in `docs/reference/categories.md` (taxonomy + counts) and `docs/skills/index.md` (curated index). This table will be regenerated as part of the v2.14.0 cycle's CONTEXT.md refresh.

### Foundation (1 skill, stale - actual is 8)

| Skill | Category | Classification | Status |
|-------|----------|----------------|--------|
| persona | research | foundation | ✅ Complete (v2.5.0) |

### Utility (6 skills)

| Skill | Category | Classification | Status |
|-------|----------|----------------|--------|
| pm-skill-builder | coordination | utility | ✅ Complete (v2.7.0) |
| pm-skill-validate | coordination | utility | ✅ Complete (v2.8.0) |
| pm-skill-iterate | coordination | utility | ✅ Complete (v2.8.0) |
| mermaid-diagrams | documentation | utility | ✅ Complete (v2.10.0) |
| slideshow-creator | documentation | utility | ✅ Complete (v2.10.0) |
| update-pm-skills | coordination | utility | ✅ Complete (v2.10.0) |

### Discover Phase (3 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| interview-synthesis | research | P1 | ✅ Complete |
| competitive-analysis | research | P2 | ✅ Complete |
| stakeholder-summary | research | P2 | ✅ Complete |

### Define Phase (4 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| problem-statement | problem-framing | P0 | ✅ Complete |
| hypothesis | ideation | P0 | ✅ Complete |
| opportunity-tree | problem-framing | P2 | ✅ Complete |
| jtbd-canvas | problem-framing | P2 | ✅ Complete |

### Develop Phase (4 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| solution-brief | ideation | P1 | ✅ Complete |
| spike-summary | coordination | P1 | ✅ Complete |
| adr | specification | P1 | ✅ Complete |
| design-rationale | specification | P2 | ✅ Complete |

### Deliver Phase (6 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| prd | specification | P0 | ✅ Complete |
| user-stories | specification | P0 | ✅ Complete |
| acceptance-criteria | specification | v2.7.0 | ✅ Complete |
| edge-cases | specification | P1 | ✅ Complete |
| launch-checklist | coordination | P0 | ✅ Complete |
| release-notes | coordination | P1 | ✅ Complete |

### Measure Phase (4 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| experiment-design | validation | P1 | ✅ Complete |
| instrumentation-spec | validation | P1 | ✅ Complete |
| dashboard-requirements | validation | P2 | ✅ Complete |
| experiment-results | reflection | P2 | ✅ Complete |

### Iterate Phase (4 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| retrospective | reflection | P2 | ✅ Complete |
| lessons-log | reflection | P2 | ✅ Complete |
| refinement-notes | coordination | P2 | ✅ Complete |
| pivot-decision | reflection | P2 | ✅ Complete |

