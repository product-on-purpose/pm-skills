# v2.13.0 CHANGELOG entry (DRAFT)

> **Draft status:** this file is the v2.13.0 CHANGELOG entry authored during PR.5 of tag prep. At Phase 5 tag-time, it gets pasted into `CHANGELOG.md` directly above the v2.12.0 entry. The release date placeholder (2026-05-XX) is filled in at tag time.

---

## [2.13.0] - 2026-05-XX

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
- **F-34 `library/skill-output-samples/THREAD_PROFILES.md`**: machine-readable per-thread metadata contract for tooling consumers (`utility-pm-skill-builder` primary; future regen tools). Documents thread identity, feature arc, prompt style, character naming convention, real competitors, sample-suffix patterns, and scenario archetypes per phase across all three threads (storevine, brainshelf, workbench).
- **Zensical compatibility spike report** at `docs/internal/release-plans/v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md`. Decision artifact for v2.14.0+ stack-decision discussions; outcome NO-GO.

### Changed

- **Doc structure refactor (Bucket A)**: 
    - `docs/frameworks/` retired. Canonical Triple Diamond reference moved to `docs/concepts/triple-diamond-delivery-process.md` with a `mkdocs.yml` redirect from the old path. Reduces `mkdocs.yml exclude_docs:` from 8 entries to 2.
    - 4 concept files reorganized out of `docs/concepts/` to `docs/reference/` and `docs/guides/` per the Diataxis 4-quadrant taxonomy.
    - 4 legacy duplicate files deleted after CR-strip drift analysis (real divergence was minor; canonical was strictly newer).
    - `creating-skills.md` renamed to `creating-pm-skills.md` per the locked `pm-skill-*` prefix convention. `authoring-pm-skills.md` deleted. Both old paths redirect to the new canonical.
- **Count and link cleanup (Bucket B)**: skill counts reconciled across 7 public surfaces (concepts, reference, guides, getting-started, mkdocs config, homepage hero) at 40 (26 phase + 8 foundation + 6 utility); `utility-pm-skill-builder` catalog table updated to current per-classification counts; `docs/guides/mcp-setup.md` deleted and redirected to `mcp-integration.md`; `AGENTS/codex/CONTEXT.md` shrunk 74 to 32 lines as a vestigial-redirect to `AGENTS/claude/CONTEXT.md`; README "What's New" workaround replaced (Option a section-aware CI) with explicit HTML-comment markers plus subset-descriptor exclusion; project-structure.md fully reconciled; `docs/guides/index.md` expanded from 7 to 12 listed guides.
- **5 PowerShell parity bugfixes (Bucket C)**: `check-stale-bundle-refs.ps1` reserved-word collision; `check-workflow-coverage.ps1` and `check-generated-freshness.ps1` Join-Path named-parameter usage; `lint-skills-frontmatter.ps1` path-detection. PS1 versions now match bash output on current main.
- **`check-count-consistency` tightened and promoted to enforcing** for current-state files. Original line-level `v[0-9]+\.` exemption replaced with explicit HTML-comment markers (`<!-- count-exempt:start -->` / `<!-- count-exempt:end -->`) plus a subset-descriptor exclusion list. Surfaced and resolved 18 hidden findings the prior workaround had silenced.
- **CI workflow `validation.yml`** updated: `if: always() && matrix.os == ...` added to all 14 new-validator step conditions so an enforcing-step failure does not cascade-skip later validators in the same job.

### Infrastructure

- **Phase 0 Adversarial Review Loop** applied across per-strand (PR.1) and release-state (PR.2) layers per the v2.11.0 + v2.12.0 codification. PR.1 closed via 4 Codex tasks. PR.2 closed via 5 Codex review rounds + 1 final comprehensive resolution sweep: round 1 found 6 IMPORTANT plus 3 MEDIUM plus 1 MINOR; round 2 caught 4 of 6 IMPORTANTs persisting as stale-status-block-text plus 2 new MEDIUM plus 1 new MINOR; round 4 caught next-layer stale-summary text (gate-table row + index file); round 5 caught draft-file audit-trail misrepresentation + further status-block drift; round 6 comprehensive sweep across the full release stack converged the loop. Six-layer convergence depth itself catalogued the stale-aggregate-counter pattern at meta level (status text drifts as state advances unless every closure sweeps all release-stack docs simultaneously).
- **Stale-aggregate-counter pattern codified** as durable feedback memory after PR.2 round 2 caught it at meta level. Status-block text drifts as state advances unless every gate closure sweeps all release-stack docs; pattern is now a standing rule for future cycles.
- **Validator inventory grows from 15 to 22** (7 new). **Enforcing tier grows from 5 to 10** (4 new enforcing + count-consistency promoted).

### Fixed

- **Bash + PS1 parity** on `check-stale-bundle-refs`, `check-workflow-coverage`, `check-generated-freshness`, `lint-skills-frontmatter`. PS1 false-positive class on certain skill paths resolved.
- **Stale doc references** across 7 public surfaces and the master plan / ci-refactor doc / CONTEXT.md / DECISIONS.md (caught and resolved across PR.2 4 review rounds).
- **`docs/reference/categories.md`** stale category math: total now 40 (was 29, missing 3 categories `meeting`, `communication`, `documentation`); per-category counts and skill listings now match SKILL frontmatter `metadata.category`.
- **`mkdocs.yml`** duplicate top-level `Guides:` nav section consolidated into a single section (the `using-meeting-skills.md` guide was previously stranded in a second `Guides:` block).
- **`scripts/check-generated-content-untouched.md`** watched-paths table count corrected from 38 to 40 individual skill pages.

### Out-of-cycle (pm-skills-mcp companion server)

These shipped on the same calendar day as v2.13 cycle work but are tracked separately because they are out-of-cycle by explicit user-initiated decision:

- **`pm-skills-mcp` v2.9.2** (2026-05-05): formal maintenance-mode announcement (effective 2026-05-04). Re-embeds the full current 40-skill catalog at v2.9.2 build time, superseding the prior v2.11.0 M-22 28-skill freeze. Total tools: 59 (40 skill + 11 workflow + 8 utility). Active development paused; security patches and critical bug fixes will continue.
- **`pm-skills-mcp` v2.9.3** (2026-05-05): security-patch follow-up two hours after v2.9.2. Cleared all 8 open Dependabot moderate advisories via transitive `npm audit fix` (`hono`, `@hono/node-server`, `vite`, `postcss`). Post-ship Dependabot open-alert count: 0. Bundled three latent v2.9.x maintenance debts in the same patch (loader test catalog assertions, lockfile metadata sync, retroactive em-dash sweep on 28 occurrences in pre-2026-04-13 CHANGELOG entries).
- The 2-hour announcement-to-patch turnaround validates the v2.9.2 maintenance-mode "security patches will continue" commitment in operational practice. Catalog frozen at v2.9.2 build; subsequent v2.9.x patches do not change the catalog.

### Deferred

| Item | Reason |
|---|---|
| Zensical migration | Spike NO-GO; re-spike when upstream blockers resolve |
| Plan B Astro Starlight | Per spike plan Section 5: only triggers if Material maintenance posture deteriorates |
| F-37 HTML Template Creator | Conflicts with v2.13 "no new skills" guard |
| F-29 Meeting Lifecycle Workflow | Time-gated on real-world meeting-skills feedback |
| F-30 Family Adoption Guide | Time-gated on at least one team's adoption experience |
| F-31 / F-32 / F-33 / F-35 Sample-automation slate | May be obsolete after v2.12 builder cleanup; re-evaluate before v2.14 |
| Pattern 2 mkdocs-macros frontmatter-driven counts | Adds dependency; deferred pending Zensical decision |
| Bash + PS1 dual-stack consolidation | Strategic question; deferred to v2.14.0+ |
| AGENTS/claude/CONTEXT.md per-phase Skills Inventory tables | At v2.10.x-era 32-skill state per intentional deferral. Authoritative catalog lives in `docs/reference/categories.md` and `docs/skills/index.md`. Full refresh slated for v2.14.0. |
