# v2.19.0 Release Plan (STUB)

**Status:** STUB - next-cycle capture
**Created:** 2026-05-22 (during v2.18.0 G4 post-tag hygiene)
**Predecessor:** [v2.18.0](../v2.18.0/plan_v2.18.0.md) SHIPPED 2026-05-22 (tag daf720e; 63 skills)

---

## Carry-in: validator + hygiene gaps surfaced by the v2.18.0 deep verification

The v2.18.0 release went through G1 pm-critic + four Codex adversarial passes + deep internal verification (~26 findings). Several findings exposed gaps in the automated gates that let issues reach review instead of being caught by CI. These are the highest-value carry-ins:

| # | Follow-up | Why (what it would have caught in v2.18.0) | Effort |
|---|---|---|---|
| FU-1 | Add `*.mdx` to `check-count-consistency.sh` / `.ps1` glob | `docs/index.mdx` (the docs homepage) escaped the `*.md`/`*.json`-only scan and shipped stale "59 skills" until Codex caught it | Small (1-line glob + .ps1 parity) |
| FU-2 | New `check-skill-cross-references` validator | Backtick skill references that point at non-existent skills (`define-edge-cases`, `develop-product-vision`, `discover-research-plan`) passed every gate; only a name-vs-`skills/`-dir diff caught them | Medium |
| FU-3 | Extend `check-internal-link-validity` to in-page `#anchors` | Renumbering README headings orphaned the Table-of-Contents anchors; the validator only checks file links | Medium |
| FU-4 | Remove vestigial `validate-mcp-sync.yml` + `.github/scripts/validate-mcp-sync.js` | MCP is in maintenance mode (M-22); the workflow is observe-only (continue-on-error) and cannot block, but still clones pm-skills-mcp on every skills/commands push | Small |
| FU-5 | Consider a single generated README stats block | The catalog count lives in ~9 README surfaces (two badges, two mermaid diagrams, cards, per-phase tables, At-a-Glance table, facts table); each release risks missing one | Medium |

## Carry-in: pre-existing hygiene (not a v2.18.0 regression)

- CHANGELOG historical entries (v2.16.x and earlier) reference `docs/internal/...` planning paths, against the "public paths only" CLAUDE.md guideline. Decide whether to sweep historical entries or accept as frozen history.
- README "Quick Release History" and the prominent "Recent Updates / What's New" section are two separate release-summary surfaces that must both be updated each release; consider consolidating.

## Roadmap candidates (deferred from v2.18.0)

Per the 2026-05-14 strategic roadmap + the v2.18.0 lock (4 skills only):

- R-12 `develop-pre-mortem`, R-13 `develop-product-vision` (multi-source consensus, not three-source)
- R-01 AI-Native Pack (`measure-eval-suite-spec`, `develop-prompt-spec`, `develop-model-card`) - pending competitive-risk reassessment (roadmap delta Section 4.10)
- R-19 paired-reviewer pattern; R-24/R-65 hook infrastructure; R-42/R-43 workflow orchestration

## Notes

- pm-skills-mcp `embed-skills.js` branch `fix/embed-add-tool-classification-soften-unknown` still unmerged to MCP main (maintenance-mode cadence).
- v2.17.1 fast-follow candidate (carried from v2.17.0): `check-version-references` strict heuristic + `.ps1` parity; macOS bash-3.2 attestation of the W3 validators.
