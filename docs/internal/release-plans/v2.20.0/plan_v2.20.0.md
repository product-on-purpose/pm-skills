# v2.20.0 Release Plan (stub)

**Status:** PLANNING. **Item 1 (workflow-command coverage) + validator hardening (1c) EXECUTED on main 2026-05-24** (pre-tag, untagged): created 3 sprint `/workflow-` commands (foundation-sprint, design-sprint, foundation-to-design); confirmed triple-diamond + lean-startup are intentionally reference-only; hardened `check-agents-md-command-sync` to require a command file per `/workflow-` row; command count 70 -> 73. Remaining items below are open. (Stub created 2026-05-23 during v2.19.0 G4; backlog corrected + detailed 2026-05-24.)
**Type:** TBD
**Predecessor:** v2.19.0 SHIPPED 2026-05-23 (tag `a18e4d5`; pre-promotion hardening; catalog 63; pre-tag bundle now 18 enforcing validators).

## Purpose

Placeholder for the next release cycle. v2.19.0 was the pre-promotion hardening pass (validator blind spots closed, CI/script hygiene, public-surface polish). v2.20.0 scope is not yet locked. The two lead candidate items below were re-derived from the current tree on 2026-05-24 (the earlier stub inherited stale counts from the v2.19.0 G0 auditor).

---

## Item 1: Workflow `/workflow-` command coverage

**Ground truth (verified against the tree 2026-05-24):** 12 workflow files in `_workflows/` (excluding README); only **7** have a working `commands/workflow-*.md` file. The gap breaks into three groups:

| Workflow (`_workflows/<stem>.md`) | `commands/workflow-<stem>.md`? | AGENTS.md row? | State |
|---|---|---|---|
| customer-discovery, feature-kickoff, post-launch-learning, product-strategy, sprint-planning, stakeholder-alignment, technical-discovery | yes (7) | yes | OK - functional slash commands |
| foundation-sprint, design-sprint, foundation-to-design | **no** | yes (AGENTS.md lines ~477-479) | **Advertised but non-functional** - `/workflow-design-sprint` will not resolve in Claude Code because no command file exists |
| triple-diamond, lean-startup | no | no | Reference-only (README "12 Workflows" + the workflow table list them, but they are not slash commands) |

**Why CI did not catch the 3 advertised-but-broken commands:** `check-agents-md-command-sync` validates `/workflow-*` AGENTS rows against the `_workflows/` directory, not against `commands/` (see `scripts/check-agents-md-command-sync.md` line 12: "Workflow-prefixed slash commands are recognized as aliases into `_workflows/` and validated against that directory"). So a row whose `_workflows/<stem>.md` exists passes even with no command file. The slash command still will not work, because Claude Code resolves slash commands from `commands/*.md`.

**Decisions to make (per group):**

- **(1a) foundation-sprint / design-sprint / foundation-to-design** - either:
  - **Create** the 3 command files (slash commands 70 -> 73), making the AGENTS.md advertisement real; OR
  - **Remove** the 3 AGENTS.md rows and document these as reference workflows invoked via the per-day `tool-foundation-sprint-*` / `tool-design-sprint-*` commands (AGENTS.md then has 7 `/workflow-` rows matching the 7 command files).
  - Recommendation: decide based on whether a single chained command per sprint adds value over the existing per-day `tool-*` commands. If not, remove the rows (cheaper, removes the broken advertisement).
- **(1b) triple-diamond / lean-startup** - either:
  - **Create** the 2 command files (they are linear skill-chains like the working 7; slash commands +2); OR
  - **Keep** them reference-only and annotate the README so "12 Workflows" does not imply 12 slash commands.
- **(1c) Validator hardening (v2.19.0-style "defect becomes a validator")** - extend `check-agents-md-command-sync` (or add a sibling check) so a `/workflow-*` AGENTS row that advertises a slash command also requires a `commands/workflow-<stem>.md` file, closing the "advertised but non-functional" gap that let 1a through.
  - **CI impact:** confirmed-uncovered gap. Neither `check-workflow-coverage` (checks each `_workflows/` file has a docs page + AGENTS row + nav entry) nor `check-workflow-generator-coverage` (checks `_workflows/` -> generated pages) nor `check-agents-md-command-sync` (validates `/workflow-*` rows against `_workflows/`, NOT `commands/`) verifies a command file exists. **Extending** the already-wired `check-agents-md-command-sync` needs NO new CI wiring and leaves the bundle at 18 validators. **Adding a brand-new validator** instead means the full new-validator process (`.sh`+`.ps1`+`.md` triplet, wire into `validation.yml` both-OS matrix entries, add to both `pre-tag-validate.{sh,ps1}` arrays + the `.md`, cascade bundle count 18 -> 19) - the same process v2.19.0 used for `validate-version-consistency`.

**How to complete (if creating any `/workflow-` command):** author `commands/workflow-<name>.md` modeled on `commands/workflow-feature-kickoff.md` (YAML frontmatter with a single `description:` line, then `## Workflow Steps` referencing each `skills/<skill>/SKILL.md` in sequence, ending with `Context from user: $ARGUMENTS`), then run the **Documentation checklist** below. The `_workflows/<stem>.md` source files already exist for all 5, so the "12 Workflows" count does not change - only the slash-command count does.

---

## Item 2: pm-skills-mcp skill-count drift

**Ground truth (verified 2026-05-24):** the separate `pm-skills-mcp` repo currently references **24 skills**, not 40 and not 63 (its `AGENTS/claude/CONTEXT.md`: "36 MCP Tools = 24 skills + 5 workflows + 7 utilities"; its README drafts say "all 24 PM skills"). The source catalog is **63**. The "40 skills" figure used in earlier notes is itself stale.

**This is not a this-repo fix.** It lives in `pm-skills-mcp`, which is in maintenance mode (file-based install is the recommended path). "Completing" it is the v3.0.0 **retire-vs-rearchitect decision**, one of:
- (a) Retire `pm-skills-mcp` (archive; point users to file-based install);
- (b) Re-sync it to the full 63 skills (and decide whether the MCP exposes all 63 or an intentional curated subset);
- (c) Accept the lag and explicitly document the MCP as a frozen subset.

Tracked under `docs/internal/release-plans/v3.0.0/`. **Out of scope for v2.20.0** except to record that the decision is pending. Note: the `validate-mcp-sync` *validator* (this repo) was already removed in v2.19.0; that is separate from the MCP repo's own skill-count sync.

---

## Other carried-forward residuals (non-blocking)

- **validate-mcp-sync sample row - RESOLVED (no further action).** Per decision (memory 5561, 2026-05-23): "preserve historical audit samples, clean only the forward-looking template." `3c68f82` cleaned `references/TEMPLATE.md`; `references/EXAMPLE.md` (and the page generated from it) intentionally KEEP the `validate-mcp-sync` row as a point-in-time v2.16-era audit snapshot. Do not scrub it - a worked example is dated evidence, not a current claim.
- **CONTEXT.md stale command count - FIXED 2026-05-24.** `_agent-context/claude/CONTEXT.md` line ~85 (the repo-structure tree comment) now reads "(73 total, including 10 workflow commands)"; it previously carried the v2.14-era "(47 total: 40 skill + 7 workflow)".
- **`check-stale-bundle-refs` is near-vestigial.** The "validator bundle" terminology collision means it cannot be enforced without false-failing several hundred legitimate references. Decide: rework the heuristic or remove the validator. **CI impact:** it is wired in `validation.yml` as an advisory (`continue-on-error`) step on both shells (bash + pwsh); removing it means deleting those steps, reworking means editing the script (it stays wired).
- **`check-count-consistency` "shipped" subset-exclusion can mask a stale total.** The subset-descriptor exemption could let a stale aggregate total slip through. Tighten if a real case appears.

---

## Documentation checklist: adding a `/workflow-` command

Run this every time a new `/workflow-<name>` command is added (each new command raises the slash-command count by 1). Counts below assume the current baseline of **70**.

- [ ] **Command file:** create `commands/workflow-<name>.md` (model on `commands/workflow-feature-kickoff.md`).
- [ ] **AGENTS.md table:** add a `| `/workflow-<name>` | <one-line description> |` row to the command summary table (the lower table near line ~442). Keep the description in sync with the command file's frontmatter `description:`.
- [ ] **Bump the slash-command count on every surface that states it:**
  - [ ] `README.md` ~line 115 ("70 slash commands available")
  - [ ] `README.md` ~line 301 ("70 Slash Commands")
  - [ ] `README.md` ~line 377 (platform table, "70 slash commands")
  - [ ] `README.md` ~line 991 (At-a-Glance, "Slash commands | 70")
  - [ ] `_agent-context/claude/CONTEXT.md` (and fix the stale line ~85 "47 total" while here)
  - [ ] `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` descriptions IF they cite a command count (grep to confirm; v2.19.0 they did not)
- [ ] **Regenerate the commands reference:** run `python scripts/generate-skill-pages.py` so `docs/reference/commands.md` picks up the new row (keeps `check-generated-content-untouched` green).
- [ ] **Validators:** run `validate-commands` (command resolves + skill paths valid), `check-agents-md-command-sync` (AGENTS table covers `commands/`), `check-count-consistency` + `check-landing-page-counts --strict` (count claims), then the full bundle `ALLOW_BASH3=1 bash scripts/pre-tag-validate.sh` and `pwsh scripts/pre-tag-validate.ps1`.
- [ ] **Docs site:** `npm run build` (Astro) to confirm the site builds with the new command and counts.
- [ ] **If the workflow itself is NEW** (not the case for the 5 existing `_workflows/` files): also add `_workflows/<name>.md`, add the entry to the `workflow_info` dict in `scripts/generate-workflow-pages.py`, regenerate `docs/workflows/`, and bump the "12 Workflows" count on README ~line 300 + the At-a-Glance "Workflows" row.

---

## Out of scope (tracked elsewhere)

- **pm-skills-mcp posture** - see Item 2; v3 / promotion-prep decision.
- **Marketplace switchover + install-path migration** - the v3.0.0 breaking rename to `product-on-purpose`, tracked under `docs/internal/release-plans/v3.0.0/`.

## Candidate scope (not committed)

- New content skills under consideration: develop-pre-mortem, develop-product-vision (roadmap candidates).
