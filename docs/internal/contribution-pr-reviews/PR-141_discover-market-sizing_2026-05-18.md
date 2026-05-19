# PR-141 Assessment: Add `discover-market-sizing` skill (TAM/SAM/SOM)

**Reviewed:** 2026-05-18
**Reviewer:** jprisant (via Claude review)
**PR URL:** https://github.com/product-on-purpose/pm-skills/pull/141
**Author:** naimkatiman (first-time community contributor)
**Branch:** `skill/discover-market-sizing`
**Branch HEAD:** `1bd348d`
**Rebased against:** `upstream/main` at commit `7efc31f` (2026-05-07; v2.13.1 territory)
**Current main HEAD:** `a05e55e` (v2.16.0 ready-to-tag; 2026-05-18)
**Closes:** #118 (F-07)
**Diff:** +870 / -71 across ~30 files
**CI status at review time:** "no checks reported" (workflow-approval gate not cleared since rebase)

## Verdict

**Request changes.** Skill content is high-quality and convention-compliant; branch is structurally stale due to four intervening releases (v2.14.0 doc stack migration, v2.14.1, v2.14.2, v2.15.0 tool-classification expansion) and a fifth ready-to-tag (v2.16.0). Recommended retarget: **v2.17.0** (stub already exists at `docs/internal/release-plans/v2.17.0/`).

Two upfront decision gates posted to the PR before any rework is asked of the contributor:
1. **Attribution convention.** Repo-wide rule on `metadata.author` for community-contributed skills + external-workflow-source credit.
2. **Release target.** v2.17.0 retarget vs. force-fit into v2.16.0 pre-tag.

## What's good (worth preserving on rebase)

The skill itself is the strongest community-contribution submission to date. Specifics:

- **Frontmatter is correct for a phase-class skill.** `phase: discover`, `metadata.category: research`, `metadata.frameworks: [triple-diamond, lean-startup, design-thinking]` all match the `discover-competitive-analysis` exemplar. Phase-class skills on main do not carry `classification:`; PR correctly omits it.
- **Description is lint-clean.** ~58 words, single-line, no inline `: `, well within the 20-100 word constraint.
- **Apache 2.0 attribution header preserved.**
- **Em-dash sweep is clean.** No U+2014 or U+2013 in any authored content (SKILL.md, TEMPLATE.md, EXAMPLE.md, command). Contributor called out the rule explicitly in the PR body ("House rules acknowledged"), which signals good attention to repo conventions.
- **8-step Instructions** follow the peer-skill pattern. Particularly strong:
  - Two-path triangulation (top-down + bottoms-up) with required independence
  - 3x divergence threshold as a concrete cross-check rule (not vague hand-wave)
  - Assumption ledger with High/Medium/Low confidence ratings
  - Sensitivity analysis on top-two assumptions
  - Explicit translation to decision recommendations ("pursue / defer / narrow / expand / reframe")
- **Quality Checklist** has 8 verifiable items. The "round-number red flags" guard is a nice anti-pattern check.
- **EXAMPLE.md** is a ~200-line worked example (AI coding assistant for US SMB devs) with realistic numbers and named sources rather than placeholder math. This is harder than it looks and the contributor did it well.

If main were still at v2.13.1, this would be an easy approve with cosmetic notes only.

## Critical issue: branch staleness

PR was rebased on 2026-05-07 against v2.13.1 (40 skills, 47 commands, MkDocs Material doc stack). Since then:

| Release | Date | Structural change that breaks this PR |
|---------|------|----------------------------------------|
| **v2.14.0** | 2026-05-10 | **Doc stack migration MkDocs to Astro Starlight.** `mkdocs.yml` removed. `docs/index.md` to `docs/index.mdx`. Astro content collections enforce `title:` frontmatter and forbid body `# H1`. New `validate-docs-frontmatter --strict` + `check-no-body-h1 --strict` validators. |
| v2.14.1, v2.14.2 | 2026-05-10/11 | Validator expansion to 24 scripts; 10 truly enforcing. `check-internal-link-validity --strict` added. |
| **v2.15.0** | 2026-05-16 | **New `classification: tool` taxonomy + 15 new skills** (7 FS + 7 DS + standalone `tool-note-and-vote`). Two family contracts + enforcing family validators. `check-count-consistency` patched to recognize `tool` subset descriptor. |
| **v2.16.0** | ready-to-tag (HEAD `a05e55e`) | Astro doc surface refresh, cross-client compatibility consolidation, generator fixes, two canonical reference docs, three new mermaid diagrams. |

**Current main skill count: 59** (not 41). Breakdown: 26 phase + 8 foundation + 10 utility + 15 tool. PR cascade narrative ("27 phase + 8 foundation + 6 utility") is wrong on two of three buckets.

### Conflict surface enumerated

1. **`mkdocs.yml` is gone.** Entire PR edit on that file drops.
2. **Count cascade is wrong everywhere.** Every "40 to 41" / "26 to 27" / "47 to 48" patch needs re-derivation against current 59. Touchpoints: README badge, README hero, README FAQ, README install copy, README MCP comparison, README structure tree, CLAUDE.md Project Context, QUICKSTART.md, `docs/index.mdx`, `docs/concepts/agent-skill-anatomy.md`, `docs/getting-started/*`, `docs/guides/*`, `docs/reference/commands.md`, `docs/reference/categories.md`, `docs/reference/ecosystem.md`, `docs/reference/project-structure.md`, `docs/reference/pm-skill-versioning.md`, `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json`, `AGENTS.md`, `utility-pm-skill-builder/references/EXAMPLE.md`.
3. **Generated doc page is wrong format.** `docs/skills/discover/discover-market-sizing.md` (MkDocs `.md`) needs to become Astro `.mdx` with `title:` frontmatter, no body `# H1`, and v2.16 `generated:` / `source:` shape. The Astro content-collection schema will reject it on push.
4. **`docs/concepts/agent-skill-anatomy.md`** has been rewritten through v2.14 to v2.16; the simple "40 to 41" patches will conflict.
5. **`.claude-plugin/marketplace.json` and `plugin.json`** descriptions have been rewritten for v2.15 (mention sprint families and tool classification) and possibly again for v2.16. PR's description string is stale prose, not just a count change.
6. **`<!-- count-exempt:start -->` markers** the PR introduces around the README MCP block and the `mcp-integration.md` warning: verify whether main already has these or whether they collide.
7. **`AGENTS.md`** has new sprint commands and updated descriptions since rebase. Alphabetical Discover insertion is still correct in principle but needs to land against current file content.

### CI failures expected on rebased push

If the contributor pushes the current branch as-is after rebase without any further edits, expected validator failures:

- `check-count-consistency --strict`: PR's 41-count will not match main's 59.
- `validate-docs-frontmatter --strict`: PR's `docs/skills/discover/discover-market-sizing.md` lacks Astro-required `title:` frontmatter.
- `check-no-body-h1 --strict`: PR's generated doc has `# Market Sizing` body header.
- `check-internal-link-validity --strict`: any link to a renamed/relocated path will trip.
- `check-generated-content-untouched`: generator script logic has likely changed since 2026-05-07; the PR's generator output will not match current generator's output.
- `validate-foundation-sprint-skills-family`: doesn't apply to this skill, but is now a required validator the contributor hasn't seen.

## Decision gates (posted to PR before any rework)

### Gate 1: Attribution convention

PR proposes `metadata.author: naimkatiman` and PR body credits an external workflow source at `naimkatiman/continuous-improvement`. Every shipped skill currently uses `metadata.author: product-on-purpose`. This is the first deviation.

**My lean (to confirm with contributor on PR):**

- Keep `metadata.author: product-on-purpose` for the skill itself, since the repo curates and maintains it long-term and authorship divergence in frontmatter creates an unbounded enum.
- Add the contributor to a new `## Contributors` section in CONTRIBUTING.md (sets the public-credit pattern for future community contributions).
- The external workflow-source link (`naimkatiman/continuous-improvement`) is fine to keep in the PR body; contributor's choice whether to also reference in a commit trailer or omit. Do not include the link in the merged skill content.

Rationale: keeps the `metadata.author` field as a structured-data signal about maintenance ownership rather than an authorship history, which is what `git log` is for. Public credit is preserved via CONTRIBUTING.md and PR record.

### Gate 2: Release target

PR currently targets the v2.14.x line (closed) and was rebased pre-v2.15.0. Two options:

**Option A: Force-fit into v2.16.0.** Risky: v2.16 is already ready-to-tag (HEAD `a05e55e`, post-tag artifacts staged). Adding a new skill at this point requires count-cascade re-runs, regenerating release notes, bumping `skills-manifest.yaml`, and re-running the pre-tag validator bundle. Probability of a tag delay or a v2.16.1 patch follow-up: high.

**Option B: Retarget to v2.17.0** (my recommendation). Stub exists at `docs/internal/release-plans/v2.17.0/`. v2.17 is the natural slot, allows the contributor to rebase once without v2.16 release pressure, gives room to validate against the full v2.16-shipped validator surface, and avoids needing a same-day patch if anything slips through.

Posted Option B as the preferred path on the PR.

## Path forward (sequencing for contributor)

Once both gates are answered, the rebase sequence:

1. Rebase against `origin/main` (HEAD `a05e55e`).
2. Drop `mkdocs.yml` edits entirely.
3. Recompute count cascade against 59 to 60. Use `check-count-consistency --strict` to find every touchpoint. Note the breakdown shift: "26 phase + 8 foundation + 10 utility + 15 tool" (not the PR's current "27 phase + 8 foundation + 6 utility").
4. Re-author `docs/skills/discover/discover-market-sizing.md` as `.mdx` per current Astro content-collection schema. Use `docs/skills/discover/discover-competitive-analysis.mdx` on main as the live exemplar.
5. Reapply `AGENTS.md` alphabetical Discover insertion against current file content.
6. Reapply `.claude-plugin/marketplace.json` and `plugin.json` description edits against the v2.15/v2.16 strings (not the v2.13.1 strings the PR currently patches).
7. Verify `<!-- count-exempt:start -->` markers are not already present on main before re-adding.
8. Bump `metadata.updated` field in SKILL.md to the new push date.
9. Run full v2.16 validator bundle locally before push.

## Validator bundle (must pass green before push)

```
lint-skills-frontmatter
validate-agents-md
validate-commands
check-count-consistency --strict
check-internal-link-validity --strict
validate-docs-frontmatter --strict
check-no-body-h1 --strict
check-generated-content-untouched
check-generated-freshness
validate-meeting-skills-family
validate-foundation-sprint-skills-family
validate-plugin-install
```

12 validators total. The four new-since-rebase ones are bolded in my mental model: `validate-docs-frontmatter --strict`, `check-no-body-h1 --strict`, `check-internal-link-validity --strict`, `validate-foundation-sprint-skills-family`.

## Offer to contributor

If the contributor doesn't want to do the rebase work themselves (understandable given the structural scope), I'll do it on a fork-of-fork and preserve their commit attribution via `git commit --author=`. Either path lands the skill; either path credits the contributor. Posted that offer on the PR explicitly.

## Risk assessment

| Dimension | Assessment |
|-----------|-----------|
| Correctness (skill content) | High. Two-path triangulation + assumption ledger + sensitivity is textbook PM craft. |
| Correctness (cascade) | Broken-by-time. Needs full re-derivation, not patch-up. |
| Project conventions (skill artifact) | Conformant. |
| Project conventions (doc artifact) | Non-conformant due to v2.14.0 Astro migration. |
| Performance | N/A (markdown only). |
| Test coverage | PR claims 9 validators green at rebase time; current main runs 12+ with 10 truly enforcing. |
| Security | No security surface. |
| Contributor experience | First-time community contributor with strong skill-builder fit. Worth the investment to keep momentum and set good precedent. |

## Followups (separate from this PR)

- **CONTRIBUTING.md update**: add `## Contributors` section + community-contribution attribution policy. Lock the `metadata.author` convention so future PRs inherit it without per-PR negotiation.
- **Stale-rebase contributor onboarding doc**: add a short note to CONTRIBUTING.md that long-running PRs (>2 weeks) should expect significant rebase work because of doc-stack and validator churn. Set expectations upfront.
- **F-08 and F-09 follow-on**: contributor offered to take F-08 (`measure-survey-analysis`) and F-09 (`utility-agent-skill-builder`) next. Worth queuing into v2.17 alongside this skill if both Gate 1 and Gate 2 settle cleanly.

## Memory-worthy outcomes

- Pattern: stale-rebase contributor PRs need a "decision gates first, rework second" comment structure to avoid asking volunteers to rebase twice.
- Pattern: count cascade is the single largest friction surface for catalog PRs and worth a contributor-facing helper script that prints the full touchpoint list.
- Convention candidate: `metadata.author: product-on-purpose` stays as the maintenance signal; public credit lives in CONTRIBUTING.md `## Contributors` and PR record.
- Convention candidate: this directory (`docs/internal/contribution-pr-reviews/`) uses naming `PR-<num>_<slug>_<YYYY-MM-DD>.md` for sortable, self-describing entries.

## Files referenced

- Current main exemplar for Discover/research SKILL: `skills/discover-competitive-analysis/SKILL.md`
- Current main exemplar for Astro generated doc: `docs/skills/discover/discover-competitive-analysis.mdx`
- v2.17 release plan stub: `docs/internal/release-plans/v2.17.0/`
- v2.16 master plan: `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`
- F-07 effort brief: linked from issue #118
- Count-cascade validator: `scripts/check-count-consistency.{sh,ps1,md}`
- Doc-stack migration record: v2.14.0 release notes + spike report at `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-spike-report_2026-05-06.md`
