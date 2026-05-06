# Backlog And Effort Entry Points

Status: Active
Owner: Maintainers
Last updated: 2026-05-05

GitHub issues are the canonical system for backlog and lifecycle state.

## Tracked Entry Points

1. `docs/internal/efforts/README.md` for the durable effort-brief model
2. `docs/internal/release-plans/README.md` for tracked release-governance artifacts

## Current Backlog (priority order)

Marketplace submission (Effort 0) is a human-only action, not an effort ID.

### Shipped

| ID | Effort | Type | Release | Status | Issue |
|----|--------|------|---------|--------|-------|
| . | Anthropic marketplace submission | Quick win | . | Submitted (2026-03-22), awaiting review | . |
| M-12 | CI validation enhancement | Infrastructure | **v2.7.0** | Shipped | [#112](https://github.com/product-on-purpose/pm-skills/issues/112) |
| F-06 | `deliver-acceptance-criteria` | New skill | **v2.7.0** | Shipped | [#114](https://github.com/product-on-purpose/pm-skills/issues/114) |
| M-16 | Exclude `docs/internal/**` from release ZIP | Infrastructure | **v2.7.0** | Shipped | [#123](https://github.com/product-on-purpose/pm-skills/issues/123) |
| F-05 | PM Skill Builder (`/pm-skill-builder`) | New skill | **v2.7.0** | Shipped | [#113](https://github.com/product-on-purpose/pm-skills/issues/113) |
| F-10 | PM Skill Validate (`/pm-skill-validate`) | New skill | **v2.8.0** | Shipped | [#121](https://github.com/product-on-purpose/pm-skills/issues/121) |
| F-11 | PM Skill Iterate (`/pm-skill-iterate`) | New skill | **v2.8.0** | Shipped | [#122](https://github.com/product-on-purpose/pm-skills/issues/122) |
| D-03 | PM Skill Lifecycle Guide | Documentation | **v2.8.0** | Shipped | . |
| M-18 | CI: HISTORY.md + skills-manifest validation | Infrastructure | **v2.8.0** | Shipped | . |
| D-04 | Public docs refresh for v2.8.0 | Documentation | **v2.8.0** | Shipped | . |
| M-13 | Convention alignment pass | Quality | . | Complete (all skills pass CI, 2026-04-04) | [#115](https://github.com/product-on-purpose/pm-skills/issues/115) |
| M-17 | GitHub Pages documentation site | Ecosystem | **v2.8.1** | Shipped | . |
| M-19 | Rename bundles → workflows | Infrastructure | **v2.9.0** | Shipped | . |
| F-13 | Workflow expansion (3 → 9) | Feature | **v2.9.0** | Shipped | . |
| F-16 | `utility-mermaid-diagrams` | New skill | **v2.10.0** | Shipped | . |
| D-05 | Dedicated workflows guide | Documentation | **v2.9.1** | Shipped | [#131](https://github.com/product-on-purpose/pm-skills/issues/131) |
| M-20 | Docs count consistency CI | Infrastructure | **v2.9.1** | Shipped | [#132](https://github.com/product-on-purpose/pm-skills/issues/132) |
| F-19 | `utility-slideshow-creator` | New skill | **v2.10.0** | Shipped | . |
| F-24 | `utility-update-pm-skills` | New skill | **v2.10.0** | Shipped | . |

### Active Backlog (priority order)

| Priority | ID | Effort | Type | Agent | Status | Issue |
|----------|----|--------|------|-------|--------|-------|
| 1 | F-17 | Meeting Synthesis (`/meeting-synthesis`) | New skill | Claude | Backlog (v2.11.0) | TBD |
| 2 | F-18 | Meeting Prep (`/meeting-prep`) | New skill | Claude | Backlog (v2.11.0) | TBD |
| 3 | M-22 | MCP Decoupling | Infrastructure | Claude | Backlog (v2.11.0) | TBD |
| 4 | F-20 | Slideshow Themer (`/slideshow-themer`) | New skill | Claude | Backlog | TBD |
| 5 | F-21 | Content Voice (`/content-voice`) | New skill | Claude | Backlog | TBD |
| 6 | F-14 | Workflow Builder (`/workflow-builder`) | New skill | Claude | Backlog | [#133](https://github.com/product-on-purpose/pm-skills/issues/133) |
| 7 | F-15 | Ad-hoc Skill Chaining (`/chain`) | New feature | Claude | Backlog | [#134](https://github.com/product-on-purpose/pm-skills/issues/134) |
| 8 | F-07 | `discover-market-sizing` | New skill | Claude | Backlog | [#118](https://github.com/product-on-purpose/pm-skills/issues/118) |
| 9 | F-08 | `measure-survey-analysis` | New skill | Claude | Backlog | [#119](https://github.com/product-on-purpose/pm-skills/issues/119) |
| 10 | F-22 | Prototype Creator (`/prototype-creator`) | New skill | Claude | Backlog | TBD |
| 11 | F-23 | Prototype Styler (`/prototype-styler`) | New skill | Claude | Backlog | TBD |
| 12 | F-12 | Skill quality convergence | Quality | Claude + Human | Draft | [#135](https://github.com/product-on-purpose/pm-skills/issues/135) |
| 13 | F-09 | Agent Skill Builder (`/agent-skill-builder`) | New skill | Claude | Backlog | [#120](https://github.com/product-on-purpose/pm-skills/issues/120) |
| 14 | M-21 | Explore release-please integration | Infrastructure | Claude or Codex | Backlog | [#136](https://github.com/product-on-purpose/pm-skills/issues/136) |
| 15 | M-14 | Release automation enhancement | Infrastructure | Codex | Backlog | [#116](https://github.com/product-on-purpose/pm-skills/issues/116) |
| 16 | M-15 | Community contribution setup | Ecosystem | Claude | Backlog | [#117](https://github.com/product-on-purpose/pm-skills/issues/117) |
| 17 | M-23 | Pre-release checklist Phase 5 sub-section for GitHub-platform metadata refresh (repo description, topics, About website link, pinned content, skills.sh listing). 3-5 checkbox items added to `plan_v2.13_pre-release-checklist.md` template (or its v2.14 successor) at tag-prep time. Quick-win complement to in-repo file checks. | Documentation | Claude | Backlog (v2.14.0+) | TBD |
| 18 | M-24 | `scripts/gh-release-metadata.{sh,ps1,md}` advisory script. Uses `gh repo view --json description,repositoryTopics,homepageUrl` to dump current GitHub-platform metadata; compares against a manifest at `.github/repo-metadata.yaml`; surfaces drift. Stays advisory because some platforms-side updates are intentionally ahead-of-release. Pairs with M-23 checklist update. | Infrastructure | Claude | Backlog (v2.14.0+) | TBD |

See individual effort briefs at `docs/internal/efforts/{ID}-{slug}.md` for scope, decisions, and artifacts.

## Moved to Knowledge OS (2026-03-21)

| ID | Effort | Previous status |
|----|--------|----------------|
| M-01 | `/common` shared workspace | Deferred |
| M-02 | `/update-doc` command and skill | Deferred |
| M-03 | `/link-docs` command and skill | Deferred |
| M-04 | `/project` context workflow | Deferred |

These are now part of a separate Product on Purpose initiative (Knowledge OS). See `docs/internal/_working/knowledge/` for exploration docs.

## Operating Rules

1. Open, close, prioritize, and milestone work in GitHub issues.
2. Capture durable scope and canonical links in `docs/internal/efforts/<effort-id>-<slug>.md`.
3. Capture release-specific gating and closure artifacts in `docs/internal/release-plans/vX.Y.Z/**`.
4. Keep `_NOTES/**` as local working material, not canonical backlog state.
