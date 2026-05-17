---
title: Releases
description: Release notes for every PM Skills version, with one-line highlights per release and links to detailed per-version pages. Chronological release index for the pm-skills repo.
---

All PM Skills releases with detailed notes on what changed and why.

| Version | Date | Highlights |
|---------|------|-----------|
| [v2.15.1](Release_v2.15.1.md) | 2026-05-16 | Post-Tag Audit Remediation + Preventive CI. Same-day patch successor to v2.15.0. 55-skill catalog unchanged. Closes 18 audit findings: docs-site homepage refreshed (Tool card added; "40 skills" claims swept to 55); skills landing page Tool row added; workflow-generator silent-drop bug fixed (hardcoded `workflow_info` dict missing entries for 3 new sprint workflows); AGENTS.md command table extended with 23 missing rows (15 tool + 3 workflow + 5 pre-v2.15 legacy drift); sample-library README refreshed to 171 samples across 55 skills; Sprint Planning gets `(agile)` qualifier per new naming-discipline rule; new `docs/concepts/sprint-skills-overview.md` cross-family entry point; `AGENTS/claude/CONTEXT.md` refreshed (closes v2.14.x cleanup Task 2). 4 new preventive CI validators wired enforcing: `check-landing-page-counts --strict`, `check-workflow-generator-coverage`, `check-agents-md-command-sync`, plus `pre-tag-validate` orchestration script codifying the `feedback_pre-tag-validator-bundle` memory rule |
| [v2.15.0](Release_v2.15.0.md) | 2026-05-16 | Sprint Skills Launch: 15 new skills under the new `classification: tool` taxonomy implementing Knapp/Zeratsky/Kowitz canonical sprint methodologies (7 Foundation Sprint family + 7 Design Sprint family + 1 tool-note-and-vote standalone). Skill catalog 40 to 55. Two family contracts with enforcing CI validators (each with --strict release mode); previously-undetected CI gap closed where neither family-specific validator was wired in. 3 new workflows including end-to-end FS-to-DS arc with 12-row slot-mapping table + 3-question go/no-go checkpoint (load-bearing replacement for dropped bridge skill). 45 library samples across 3 narrative threads (Brainshelf, Storevine, Workbench). Two user guides + two concept docs. Two adversarial-review cycles documented (FS-track 35 findings; DS-track 13 Codex + 20 self-audit findings; all P1 closed pre-tag) |
| [v2.14.2](Release_v2.14.2.md) | 2026-05-10 | Codex final review closure (cumulative docs hygiene patch). 0 P0, 1 P1, 11 P2, 1 P3 findings addressed. `validate-docs-frontmatter` scope expanded to .mdx (parity with V6); `check-no-body-h1` doc clarified with "what is NOT caught" framing; `validate-mcp-sync` guide refreshed for observe-mode default; `sync-agents-md.yml` workflow_dispatch hardened with two-layer defense (input gate + token gate); pm-skills-mcp README cross-repo update (5 "25 skills" residues to "40 skills"; v2.9.3 latest pointer; changelog table extended); CONTRIBUTING.md workaround count corrected; release plan + Release_v2.14.0 deferral table reframed. 40-skill catalog unchanged |
| [v2.14.1](Release_v2.14.1.md) | 2026-05-10 | Polish + V15 regression fix: same-day patch for v2.14.0. Title duplication fixed across 62 hand-authored docs + 6 generator emission sites (Starlight title-vs-body-H1 migration regression); generator output reframed (63 caution-aside pages cleaned of contributor-noise); 182 en-dashes swept across 45 library samples; Mermaid 3-layer beautification + canonical style guide; two validators promoted to truly enforcing (check-internal-link-validity + validate-docs-frontmatter); new check-no-body-h1 validator added; MCP maintenance posture codified cross-repo |
| [v2.14.0](Release_v2.14.0.md) | 2026-05-10 | Doc Stack Migration: MkDocs Material to Astro Starlight: doc-stack migration release with zero new skills (40 unchanged); 4 phases / 13 workstreams; production cutover via GitHub Pages source flip to Actions; Starlight-native asides + MDX details replace pymdownx admonitions; client-side Mermaid via astro-mermaid 2.0.1 with autoTheme; 115 library samples mounted under /samples/; 12 redirect entries preserved with /pm-skills/ base path; W13 B2.5 routing fixes (/reference/, /samples/, redirect base-path); Phase 0 Adversarial Review Loop via codex:rescue against trunk |
| [v2.13.0](Release_v2.13.0.md) | 2026-05-05 | Foundation Hardening + Doc Stack Decision: maintenance and quality release with zero new skills (40 unchanged); 7 new CI gates that catch doc drift on PRs (validator inventory 15 to 22; enforcing tier 5 to 10); Diataxis-aligned doc structure with `pm-skill-*` filename prefix; Pattern 5C generated-content marker on 63 pages; out-of-cycle pm-skills-mcp v2.9.3 security patch (8 to 0 Dependabot alerts); Phase 0 Adversarial Review Loop applied (5 Codex review rounds + 3 resolution passes converged) |
| [v2.12.0](Release_v2.12.0.md) | 2026-05-01 | OKR Skills Launch: foundation-okr-writer + measure-okr-grader pair covering the full quarterly write-and-score cycle; 38 to 40 skills; 6 new thread-aligned samples; Phase 0 Adversarial Review Loop applied |
| [v2.11.1](Release_v2.11.1.md) | 2026-04-22 | skills.sh CLI compatibility patch; unblocks `npx skills add product-on-purpose/pm-skills`; lint hardening; em-dash sweep |
| [v2.11.0](Release_v2.11.0.md) | 2026-04-18 | Meeting Skills Family (5 foundation skills + contract + enforcing CI) + lean-canvas; first cross-cutting skill-family pattern; 32→38 skills |
| [v2.10.0](Release_v2.10.0.md) | 2026-04-11 | 3 utility skills: mermaid diagrams, slideshow creator, self-updater |
| [v2.9.1](Release_v2.9.1.md) | 2026-04-10 | Workflows guide, count consistency CI, script docs enforcement |
| [v2.9.0](Release_v2.9.0.md) | 2026-04-06 | Workflows: rename bundles → workflows + expand 3 → 9 |
| [v2.8.2](Release_v2.8.2.md) | 2026-04-04 | Docs site polish + versioning concepts |
| [v2.8.1](Release_v2.8.1.md) | 2026-04-04 | MkDocs Material documentation site launch |
| [v2.8.0](Release_v2.8.0.md) | 2026-04-03 | PM skill lifecycle: Create, Validate, Iterate |
| [v2.7.0](Release_v2.7.0.md) | 2026-03-22 | PM Skill Builder, enhanced CI, acceptance criteria |
| [v2.6.1](Release_v2.6.1.md) | 2026-03-04 | Sample library recovery |
| [v2.6.0](Release_v2.6.0.md) | 2026-03-04 | Claude plugin packaging |
| [v2.5.2](Release_v2.5.2.md) | 2026-03-04 | Public doc hygiene |
| [v2.5.1](Release_v2.5.1.md) | 2026-03-04 | Agent workspace canonicalization |
| [v2.5.0](Release_v2.5.0.md) | 2026-03-02 | Foundation persona skill |
| [v2.4.3](Release_v2.4.3.md) | 2026-02-16 | Release metadata |
| [v2.4.2](Release_v2.4.2.md) | 2026-02-16 | Delivery plan policy |
| [v2.4.1](Release_v2.4.1.md) | 2026-02-16 | Release doc consistency |
| [v2.4.0](Release_v2.4.md) | 2026-02-16 | Contract lock and governance |
| [v2.3.0](Release_v2.3.md) | 2026-02-14 | MCP sync blocking mode |
| [v2.2.0](Release_v2.2.md) | 2026-02-13 | Guardrails and governance |
| [v2.0.0](Release_v2.0.md) | 2026-01-26 | Flat structure restructure |

See the full [Changelog](../changelog.md) for a condensed view.
