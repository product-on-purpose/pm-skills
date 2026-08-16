# foundation-persona - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.6.1 | 2026-08-16 | v2.33.0 | C-14 | patch | EXAMPLE.md regenerated against the shipped TEMPLATE; the two had demonstrated different formats (#251) |
| 2.6.0 | 2026-06-10 | v2.26.0 | F-12-batch-4 | minor | Quality convergence: When NOT to Use section (F-12 Batch 4) |
| 2.5.0 | 2026-03-02 | - | - | baseline | Prior published version |

## 2.6.1 (2026-08-16)

Field-reported fix ([#251](https://github.com/product-on-purpose/pm-skills/issues/251), found during an end-to-end run on a real product).

`references/EXAMPLE.md` demonstrated a "Layer 1: Narrative Persona Dossier / Layer 2: Operational Appendix" structure whose sections (`Opening scene`, `What they say vs what they mean`, `Completeness Floors`) appear nowhere in `references/TEMPLATE.md`. An agent loading both references got two canonical formats with no signal which one wins. The reporter's own run resolved it correctly by following SKILL.md's pointer to the Output Contract, but that resolution costs tokens and a weaker model could plausibly ship the non-conforming format and silently violate the contract that downstream skills consume.

EXAMPLE.md is now a filled-in instance of the Product Persona Template, verified section-for-section against it: all 13 template sections present, none added, no authoring blockquotes leaked, no unfilled placeholders. It also gains the YAML frontmatter every other skill's example carries and previously lacked.

The persona itself is preserved rather than replaced. Rhea Patel, the regulated approval-chain owner, was re-rendered into the mandated structure, so the authored substance survives the format correction. Patch rather than minor: the required contract is unchanged and only the example was brought into line with it, per the `examples improved` row of the versioning table.

## 2.6.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 4): added a "When NOT to Use" section with boundary pointers to neighboring skills. No template or example changes.

## 2.5.0 (2026-03-02)

Baseline row for the prior published version; see git history for its changes.
