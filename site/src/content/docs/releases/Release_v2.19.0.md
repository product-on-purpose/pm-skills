---
slug: releases/Release_v2.19.0
title: v2.19.0 Release Notes - Pre-Promotion Hardening
description: 'v2.19.0 ships no new skills and hardens the release-validation gate so it catches the v2.18.0 defect classes automatically: stale counts, broken skill references, and dead internal links. The local bundle is honestly scoped, line endings are pinned, and public surfaces are polished for promotion.'
date: 2026-05-23
status: SHIPPED
type: minor
---

**Released:** 2026-05-23
**Type:** Minor (governance tooling and public-surface polish; no skill changes; catalog stays 63)
**Day-to-day usage:** no change. Every skill, command, and workflow is identical to v2.18.0. This release hardens the CI gate and cleans up public-facing surfaces.

## TL;DR

v2.18.0 passed every automated gate and still needed four Codex passes plus manual cross-checking to catch roughly 26 findings, about half of which sat in validator blind spots. The lesson was direct: any defect class a human or an LLM had to catch by hand should become a script. v2.19.0 turns three recurring blind spots into enforced checks, fixes the gate's own honesty and portability, and polishes the public surfaces before the next release becomes the first one that is actively promoted.

The headline: **the library now polices itself.** No new skills, no behavior changes, catalog stays at 63.

## The big idea: defects become validators

Three classes of defect slipped through v2.18.0's gate and were caught only by manual review. Each is now an automated check:

- **Stale counts.** The docs homepage shipped a "59 skills" headline after the catalog had grown to 63, because the count checker scanned `.md` and `.json` but never `.mdx`. The checker now scans `.mdx` too, and the README version-and-count badges are asserted directly.
- **Broken skill references.** Backtick references to skills that do not exist (for example a renamed or never-created skill) passed every gate. A new validator now resolves every referenced skill name to a real `skills/<name>/` directory.
- **Dead internal links.** Renumbered headings orphaned table-of-contents anchors with nothing to catch them. The link checker now resolves same-page `#anchor` targets using GitHub-style heading slugs and covers the repo-root `README.md` and `AGENTS.md`. Switching it on surfaced and fixed 23 pre-existing broken links.

## What's new

### Validator hardening: the gate catches what slipped through

- **`check-skill-cross-references` (new, enforcing on Ubuntu + Windows).** Asserts every backtick-wrapped skill reference resolves to an actual skill directory, with an allowlist for intentional forward-references. The v2.18.0 defect class is now structurally impossible to merge.
- **`check-count-consistency` now scans `.mdx`.** Closes the homepage-count blind spot; recognizes both HTML-comment and MDX-comment exempt markers; also asserts the README count badge.
- **`check-internal-link-validity` now resolves same-page anchors and covers `README.md` + `AGENTS.md`.** Code-fence-aware slug resolution with duplicate-heading suffixes; HTML `<a id>` / `<a name>` anchors are recognized too.
- **`validate-version-consistency` now enforces the current-version claim.** Beyond matching the two plugin manifests, it asserts the README version badge and the At-a-Glance "Current version" row match `plugin.json`, so a partial version bump fails CI. (This release is itself the first to be gated by that check.) It is now also wired into the local pre-tag bundle, which runs 18 enforcing validators on both shells.

### CI and script hygiene: the gate is honest, portable, and complete

- **Honest.** Contributor docs previously implied the local validator bundle equals the full CI gate. Corrected: the bundle runs the validator scripts only; the full gate additionally enforces `npm run build`, plugin-install checks, edit-link checks, and cross-doc checks.
- **Portable.** A new `.gitattributes` pins line endings (`.sh` to LF, `.ps1` to CRLF, the rest to LF), eliminating Windows "LF will be replaced by CRLF" noise and a latent CRLF-shebang risk on Ubuntu CI. The PowerShell pre-tag bundle was also brought to full parity with the bash bundle after it was found false-greening on Windows.
- **Complete.** `validate-script-docs` is now enforcing (it was advisory), gated on authoring the two missing sprint-family validator docs. The vestigial `validate-mcp-sync` workflow, which could never block a merge yet cloned a second repo on every push, was removed; MCP remains in maintenance mode.

### Promotion-readiness: a clean front door

- Community-health files (LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, issue templates) verified present and resolving.
- External and internal links verified; stale quickstart counts corrected from v2.14-era values (40 skills) to current (63 skills, 70 commands, 12 workflows).
- The docs site ships a branded custom 404 page with section-root navigation instead of the bare default.

## What this means for you

- **If you use the skills:** nothing changes. Update when convenient; every command behaves exactly as in v2.18.0.
- **If you contribute:** the gate is stricter and more honest. A broken skill reference, a stale count in `.mdx`, a dead anchor, or a partial version bump now fails CI locally and in the cloud, on both Ubuntu and Windows. Run the bundle with `bash scripts/pre-tag-validate.sh` or `pwsh scripts/pre-tag-validate.ps1`.

## Migration guide

```
# Update path
/plugin marketplace update
/plugin update pm-skills

# After update, pm-skills reports v2.19.0. No new commands; existing ones are unchanged.
```

Nothing existing changes. If you reference the catalog count in your own tooling, it remains 63 skills (70 slash commands).

## What does NOT change in v2.19.0

- All skills, templates, examples, and commands are unchanged; no behavior changes.
- Skill catalog (63), slash commands (70), sub-agent definitions (4), and workflows (12) are unchanged.
- Frontmatter structure (metadata-nested per v2.17.0), cross-client dispatch behavior, and the doc-stack (Astro 6.3.x + Starlight 0.39.x) are unchanged.

## Affected areas

| Area | Change |
|---|---|
| `scripts/` | New `check-skill-cross-references` validator; `check-count-consistency` extended to `.mdx`; `check-internal-link-validity` extended with same-page anchor resolution and README/AGENTS coverage; `validate-version-consistency` extended to the README current-version claim; `validate-script-docs` flipped enforcing; `validate-mcp-sync` removed; two new sprint-family validator docs; `.ps1` bundle parity. |
| `.github/workflows/` | `validate-mcp-sync.yml` removed; `validation.yml` updated for the new and newly-enforcing validators. |
| `.gitattributes` | New file pinning line endings. |
| `docs/` | Branded custom `404.md`; 23 broken links/anchors fixed; corrected the "bundle equals full gate" overclaim in contributor docs; corrected stale quickstart counts. |
| `README.md` / `AGENTS.md` | Now covered by the link checker; version surfaces bumped to v2.19.0; What's New and release-history entries added. |
| `.claude-plugin/plugin.json` + `marketplace.json` | Version 2.18.0 to 2.19.0; descriptions refreshed. |
| `skills/` | No skill changes (one en-dash typo corrected in a description line). Catalog stays 63. |
