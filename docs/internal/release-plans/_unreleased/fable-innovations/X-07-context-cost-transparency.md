# X-07 Context-cost transparency (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision) | **Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b (bet X-07) and section 6c (prioritization)
**Candidate formal ID at promotion:** M-37 (provisional; extends M-26, see below; confirm the next-free M-ID against the GitHub issue list at filing)
**Audit score (6c):** Bar 1 / Moat 1 / Effort(inv) 3 = 5/9

---

## Summary

Every skill in the catalog already pays a token cost each time it is listed or invoked, but nobody, not the maintainer, not a prospective adopter, not an agent harness deciding whether to keep the plugin enabled, can currently see the number. The 2026-07-04 deep audit records the corpus is healthy today (median SKILL.md around 105 lines / about 1.8k tokens; corpus total around 130k tokens across 68 skills; all skills already lazy-load `references/` on demand) but flags that nothing guards this tomorrow: P2-7 (no SKILL.md token-budget lint) notes the only length check anywhere is the description word count in `scripts/lint-skills-frontmatter.sh`.

X-07 turns that healthy-but-unguarded state into a published, CI-derived, and eventually enforced property: a per-skill breakdown of frontmatter (metadata) cost, SKILL.md body cost, and lazy-loaded `references/`/`evals/` cost, counted separately because only the first two load unconditionally, published in the machine-readable catalog and on the site, and held to the original vision's approximate 5,000-token instruction budget via an advisory-then-enforcing lint. As agent harnesses increasingly meter and display context spend to their own users, "this library tells you what it costs before you install it" is a cheap, honest differentiator that compounds the library's existing provable-quality identity.

## Relationship to existing plans

- **Extends, does not duplicate, M-26** (`displayName` + plugin-level token-cost transparency, `docs/internal/roadmap.md` section 3.2, candidate). M-26 measures the whole plugin's always-on listing cost via `claude plugin details` and reports one aggregate number. X-07 is the per-skill breakdown M-26 does not attempt: a distinct, larger-scoped effort that should carry its own tracking ID rather than fold silently into M-26's smaller scope. The two should cite each other once both exist.
- **Is the deferred execution vehicle for P2-7.** The "Trust repair" plan ([`docs/internal/release-plans/v2.30.0/plan_v2.30.0.md`](../../v2.30.0/plan_v2.30.0.md)) explicitly routes P2-7 (no token-budget lint) out of its own scope with the line "deferred to the X-7 context-cost work"; this document is that work, not a new finding.
- **Independent of v2.31.0.** The "Zero-drift releases" plan ([`docs/internal/release-plans/v2.31.0/plan_v2.31.0.md`](../../v2.31.0/plan_v2.31.0.md)) does not mention per-skill token cost. X-07's generator can ride the same `--check`-gated, marker-fenced pattern `scripts/gen-derived-surfaces.mjs` establishes there (workstream WS-Z2, generated surfaces), but it is a new, separate generator output, not a change to that workstream's scope.
- **Unrelated to the parked memory plan.** [`docs/internal/release-plans/_unreleased/project-memory/plan_project-memory.md`](../project-memory/plan_project-memory.md) (F-48, project state) is a different axis (session-to-session state, not per-skill catalog metadata); no overlap.

## Spec

### Scope

**In scope:**
- A generator that derives three token-cost numbers per skill (metadata, body, lazy references) and writes them into the existing machine-readable catalog.
- Publication on the two existing catalog surfaces: `skill-manifest.json` (consumed by tooling) and the site's catalog and per-skill pages (consumed by humans).
- An advisory-then-enforcing budget lint against the always-loaded cost (metadata plus body), not the lazy-loaded references.
- A stated, honest token-approximation method (no new runtime dependency).

**Out of scope:**
- Rewriting any skill's content to fit a budget. If the lint later flags a skill, the content fix is separate follow-up work, not part of this build.
- Integrating a real tokenizer library. The method is an approximation, stated plainly, matching how the audit itself derived its own "about 1.8k tokens" estimate.
- Changing M-26's plugin-level scope or its `claude plugin details` mechanism.

### Requirements

| ID | Requirement |
|---|---|
| REQ-1 | A documented, stated token-approximation method (characters divided by four, a common rough heuristic) applied uniformly, named inline wherever a cost number is shown so nobody mistakes it for an exact tokenizer count. |
| REQ-2 | `scripts/gen-skill-cost-manifest.mjs` (+ `.test.mjs`) computes, per skill: `metadataCost` (the YAML frontmatter block), `bodyCost` (SKILL.md minus frontmatter), `referencesCost` (the sum of every file under `references/` and `evals/`, reported separately because it only loads if the skill body chooses to read it), and `alwaysLoadedCost` (`metadataCost + bodyCost`, the number the budget lint checks). |
| REQ-3 | `skill-manifest.json` gains an additive `tokenCost` object per skill entry (the four fields above); a generated field, never hand-edited, consistent with the rest of that file. |
| REQ-4 | The site's per-skill page renders a small "Context cost" line (always-loaded cost, plus references cost labeled as lazy); the catalog and classification pages show a per-classification corpus subtotal (phase / foundation / utility / tool) so the audit's "about 130k tokens total" figure becomes a live, generated number instead of a one-time audit estimate. |
| REQ-5 | `scripts/check-token-budget.mjs` (+ `.test.mjs`): an advisory gate that warns, but does not fail, any skill whose `alwaysLoadedCost` exceeds the vision's approximate 5,000-token instruction budget; the corpus is run once to confirm today's actual distribution before any promotion decision. |
| REQ-6 | The budget figure and its source (the project's original vision document) is confirmed, not assumed, before REQ-5 ships; if the figure cannot be located verbatim, the lint ships with a maintainer-ratified number instead and says so. |

### Interfaces

`skill-manifest.json` entry addition (illustrative, generated, not hand-authored):

```
"tokenCost": {
  "metadata": 140,
  "body": 1720,
  "references": 2100,
  "alwaysLoaded": 1860,
  "method": "chars/4 approximation"
}
```

Per-skill site rendering (illustrative):

```
Context cost: ~1.9k tokens always-loaded (metadata + body), plus ~2.1k lazy (references, loaded on demand)
Method: characters divided by four, an approximation; see the corpus-total reference page for the method note
```

### Durable CI block

Both new scripts are pure Node `.mjs` checks with no shell twin. Per `scripts/validation-manifest.yaml`'s own scope note, that manifest governs dual-shell `.sh`/`.ps1` pairs only; a pure-`.mjs` gate is wired directly into `.github/workflows/validation.yml` as one step (covering both OS legs through the existing job matrix) plus its `.test.mjs` added to the root unit-test run, rather than added to that manifest. `check-token-budget.mjs` ships advisory (continue-on-error, a dated rationale in the step comment) until the corpus is confirmed clean; promotion to enforcing is a separate, later decision, not part of this build.

### Non-goals

Not a context-window reduction project. Not a claim of exact token counts. Not a retroactive content edit to any skill. Not a change to how skills actually load their references at runtime, progressive disclosure is unchanged; this only measures and publishes it.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 0 | Confirm the approximate 5,000-token figure against the original vision document; ratify REQ-6 | agent:human | S | none |
| 1 | Build `gen-skill-cost-manifest.mjs` + `.test.mjs` (REQ-1, REQ-2) | agent:codex | S | Phase 0 |
| 2 | Extend `skill-manifest.json` schema additively (REQ-3); regenerate; confirm no consumer (AGENTS.md generation, site build) breaks on the new field | agent:codex | S | Phase 1 |
| 3 | Site: per-skill cost line + catalog corpus subtotals (REQ-4) | agent:codex | S-M | Phase 2 |
| 4 | `check-token-budget.mjs` + `.test.mjs`, advisory (REQ-5); run once, record the actual distribution | agent:codex | S | Phase 2 |
| 5 | Publish a short corpus-total note (a site reference page or an existing at-a-glance surface) replacing the audit's one-time estimate with the generated number | agent:claude | S | Phase 3 |
| 6 | Decide promotion of the budget lint to enforcing once the corpus is confirmed clean | agent:human | S | Phase 4 |

### Test strategy

`gen-skill-cost-manifest.test.mjs` follows the house generator pattern (the `gen-skill-manifest.test.mjs` precedent): round-trip fidelity against a fixture skill directory with known character counts, `--check` correctness both ways (a matching blob exits 0, a mutated one exits non-zero), and an EOL-agnostic comparison so a Windows checkout does not read false-stale. `check-token-budget.test.mjs` asserts the lint fires on a deliberately oversized fixture skill and stays silent on a normal one.

## Release surfaces touched

`skill-manifest.json` (additive schema field, generated), `scripts/gen-skill-cost-manifest.mjs` + test (new), `scripts/check-token-budget.mjs` + test (new), `.github/workflows/validation.yml` (one new step), site per-skill pages plus catalog and classification pages (new rendered field), one reference or at-a-glance page carrying the corpus subtotal. No change to any manifest version-bump surface (this is a tooling addition, not a skill content change), no catalog count change.

## Risks and open questions

| # | Risk / question | Disposition |
|---|---|---|
| 1 | The chars/4 approximation understates or overstates real tokenization for some skills (heavy tables, code blocks) | Accept and state the method plainly (REQ-1); precision is not the point, comparability and trend are |
| 2 | A budget lint that ships enforcing before the corpus is checked could break CI for skills that are fine in practice | REQ-5 ships advisory first; Phase 6 is a separate, later human decision |
| 3 | The approximate 5,000-token figure may not exist verbatim in a locatable source document | REQ-6: confirm first; fall back to a maintainer-ratified number, stated as such |
| 4 | Where should the corpus subtotal live: A) a new dedicated site page, B) an addition to the existing ecosystem/reference page, C) the site homepage at-a-glance block | **Recommend B**: lowest-friction, already a living reference surface; A is justified only if X-07 later grows a full "context economics" narrative |
| 5 | Should the cost computation live in a new standalone script or as a flag on the existing `gen-skill-manifest.mjs`: A) a new sibling script (`gen-skill-cost-manifest.mjs`, this document's default), B) a `--cost` flag folded into `gen-skill-manifest.mjs` itself | **Recommend A** for the first cut: keeps the existing generator's tested surface untouched while this is new and unproven; reconsider a merge (B) once REQ-4/REQ-5 are stable, since both scripts read the same skill tree |

## Promotion trigger and path

No external trigger gate; this is buildable directly once prioritized. The natural home is alongside a hygiene-adjacent release; the v2.31.0 companion-item pattern (its C-14 through C-20 block) is the closest precedent for a small, self-contained addition of this shape. Promote by filing the confirmed M-ID, drafting a one-page spec seeded from this document's Requirements section, and slotting Phase 0's human confirmation before any build phase starts.

## Notes

- DRAFT for maintainer review; nothing here executes before Phase 0 is confirmed.
- Companion documents in this same batch: `X-08-zero-drift-releases.md`, `X-09-validator-toolchain-product.md`, `X-10-contribution-fast-lane.md`.
- Source is the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b (bet X-07) and section 6c (score).
