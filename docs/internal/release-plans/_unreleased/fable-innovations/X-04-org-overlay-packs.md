# X-04 Org overlay packs: extend without forking (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision; not committed scope)
**Owner:** Maintainers
**Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b/6c, bet X-4 (org overlay packs, extend without forking)
**Candidate formal ID:** to be assigned at promotion (F-5x/M-3x per the backlog ID rule)
**Audit score (Bar / Moat / Effort-inverse):** 2 / 3 / 1 = 6 of 9. Audit's note: "the enterprise wedge; design doc first."
**Companion docs:** [`docs/internal/release-plans/v2.31.0/plan_v2.31.0.md`](../../v2.31.0/plan_v2.31.0.md) (the Non-goals boundary that parks this bet, and WS-Z2's generator precedent this bet reuses) and [`docs/internal/release-plans/_unreleased/project-memory/plan_project-memory.md`](../project-memory/plan_project-memory.md) (F-48, confirmed no overlap)

---

## Summary and why it wins

A documented `extends:` mechanism: a private company pack declares `extends: deliver-prd` (or any other base skill) and contributes only deltas, extra sections, house terminology, extra checklist items, layered onto the base `SKILL.md` without forking it. A validator checks the overlay's integrity against the base skill's version and `HISTORY.md` before the merged view is trusted.

Why it wins: this is the enterprise adoption wedge. A company that wants house standards, a required "Legal Review" section on every PRD, a renamed "MRD" instead of "PRD", an extra security checklist item, has exactly two options today: fork the skill (and silently diverge from upstream forever) or ask the maintainer to build it in (which does not scale and breaks the project's employer-neutrality rule). An `extends:` contract creates a third option that keeps every overlay pack dependent on the base library staying canonical, which is structurally hard for template-prose competitors to copy: their "skills" are prose files with no version contract to extend against. Effort is scored low-favorable (Effort-inverse 1, meaning genuinely large) precisely because the version-compatibility contract has to be right the first time: get it wrong and overlays either break silently on every base release or over-block legitimate ones.

## Relationship to existing plans

No item in `docs/internal/roadmap.md` (F-43 through F-53, M-25 through M-29) proposes an extension mechanism. The nearest adjacent roadmap item is F-47 (`userConfig` house template, unshipped), and the distinction must be drawn sharply every time the two are discussed together: F-47 personalizes VALUES, a default PRD template path, an OKR cadence, a preferred prioritization framework, a tone, substituted as `${user_config.KEY}` at invocation time. Nothing about a skill's structure changes; the same sections are required, just with different defaults for value-shaped fields. X-04 personalizes STRUCTURE: an overlay adds sections, terminology, and checklist items that do not exist in the base skill's contract at all. F-47 changes an argument; X-04 changes the contract. The two are compatible and could compose later, an overlay pack could itself declare `userConfig` for its own delta fields, but conflating them would misscope both.

The load-bearing relationship is with the parallel [`v2.31.0` plan](../../v2.31.0/plan_v2.31.0.md). Its own Non-goals section states this bet is explicitly out of scope there: "no overlay packs" is named as one of several innovation bets that "follow the staged eval and handoff work; this release only lays the generator and automation foundation they will reuse." X-04 depends on that foundation directly: WS-Z2's generator (`gen-derived-surfaces.mjs`, marking generated regions with `pmskills:*:start`/`:end` comments) is the natural mechanical precedent for how an overlay's merged view would mark its own base-versus-delta regions.

X-02 (artifact schemas) and X-03 (artifact provenance and the upgrade loop), the sibling documents in this same set, both touch this bet without duplicating it. X-02, if built, would let an overlay's extra checklist items be schema-validated instead of merely prose-checked, a later hardening, not required to ship v1 here. X-03's `generated-by: <skill>@<version>` artifact stamp is the natural home for recording which overlay pack, and version, contributed to a given artifact; X-04 extends that stamp format (REQ-9 below) rather than inventing a second provenance mechanism.

The parked `docs/internal/release-plans/_unreleased/project-memory/` plan (F-48, project state) has no direct relationship: memory is per-project runtime state, overlays are per-organization authoring-time structure. v2.30.0 (trust repair) has no direct relationship either. M-28 (plugin number 2, the marketplace split) is worth naming explicitly because it is easy to conflate: M-28 splits capability at the PLUGIN level, a whole second installable plugin; X-04 extends INDIVIDUAL SKILLS at the content level inside a consumer's own private pack. Both could coexist.

## Spec

### Scope in

- An overlay pack file format: one file per extended skill.
- A deterministic resolution order: base `SKILL.md` first, then deltas, applied in file order.
- A version-compatibility contract keyed off the base skill's `metadata.version` and `HISTORY.md`.
- An integrity validator runnable against a pack directory.
- One fully worked reference example overlay, proving the format is instantiable, not only described.

### Scope out

- A templating engine or code generator; overlays declare deltas, they do not execute logic.
- A runtime plugin loader; a pack is a directory an agent session reads, not an installable component.
- Any change to `userConfig` (F-47), a separate personalization axis (see Relationship above).
- Validating delta CONTENT quality; the validator checks structural and version integrity only.
- A public gallery of overlay packs; a later idea, not committed here.

### Requirements

- **REQ-1.** An overlay pack declares one file per extended skill, `overlays/<base-skill-name>.overlay.yaml`, with required keys `pack_name`, `pack_version`, `extends`, `extends_version`, and a `deltas` block.
- **REQ-2.** Deltas are restricted to three additive kinds: `extra_sections` (new sections appended after a named anchor), `terminology` (a find-replace table for house vocabulary), and `checklist_items` (extra Quality Checklist bullets). No delta may remove or reorder a base section; overlays are additive-only by construction, mirroring the MINOR-only shape of `docs/internal/skill-versioning.md`'s own bump rules.
- **REQ-3.** Resolution at invocation reads the base `SKILL.md` first, then applies deltas in file order, producing one deterministic, re-derivable merged instruction set with no hidden state.
- **REQ-4.** `extends_version` pins the base version the overlay was authored against. A PATCH or MINOR difference between the pinned and installed base version resolves cleanly, since additive changes cannot break an additive overlay; a MAJOR difference fails closed by default, per `skill-versioning.md`'s own test, "does existing usage break," requiring the pack maintainer to review the base's intervening `HISTORY.md` entries and bump `extends_version` explicitly.
- **REQ-5.** `check-overlay-integrity.mjs` reads a pack directory, resolves each `overlay.yaml` against the installed base skill's `metadata.version`, and reports OK, STALE-MINOR (compatible, but a newer compatible base version exists, advisory), or BROKEN-MAJOR (fails closed).
- **REQ-6.** No base-repo write path. Overlays live entirely in the consuming organization's own pack directory or repository; nothing in pm-skills is modified by an overlay's existence, and the base library stays canonical.
- **REQ-7.** One complete reference example overlay ships for `deliver-prd`, the most commonly adapted artifact type in practice, exercising all three delta kinds.
- **REQ-8.** Document how a session loads a pack: a project-local pointer file, for example `.claude/pm-skills-overlays.local.md`, naming the pack directory, reusing the existing `.local.md` config pattern already proven by the hooks system rather than inventing a new loading mechanism.
- **REQ-9.** When X-03 (artifact provenance) ships its `generated-by: <skill>@<version>` stamp, an overlay-produced artifact extends it to `generated-by: <skill>@<version>+<pack_name>@<pack_version>`. Dormant, documented but not built, until X-03 ships.

### Interfaces and contracts

Overlay file sketch (`overlays/deliver-prd.overlay.yaml`):

```yaml
pack_name: acme-house-standards
pack_version: "1.0.0"
extends: deliver-prd
extends_version: "2.1.0"
deltas:
  terminology:
    - from: "PRD"
      to: "MRD"
  extra_sections:
    - after: "Success Metrics"
      heading: "Legal Review"
      body: "State whether Legal sign-off is required and who owns it."
  checklist_items:
    - "Legal Review section is present when the feature touches regulated data."
```

Version-compatibility outcomes: same or PATCH ahead resolves OK; MINOR ahead resolves OK, since additive changes cannot narrow an overlay's contract; MINOR behind (the pack was authored against a newer base than is installed) resolves STALE-MINOR, advisory; MAJOR different in either direction resolves BROKEN-MAJOR, fails closed.

### Durable CI block

New validator `scripts/check-overlay-integrity.mjs` plus `scripts/check-overlay-integrity.test.mjs`, single-source Node, unit-tested against a committed fixture pack (`scripts/fixtures/overlay-packs/sample-pack/`) simulated across PATCH, MINOR, and MAJOR base-version bumps, never against a real organization's private pack.

Registration note: `scripts/validation-manifest.yaml`'s current scope, by its own header comment, is the dual-shell (`.sh` plus `.ps1`) validator pairs; Node-only checks such as `check-trigger-fixtures.mjs` already live in `.github/workflows/validation.yml` directly, with no manifest entry, by design. Register `check-overlay-integrity.mjs` in the manifest only if the v2.31.0 zero-drift generator work has by then extended the manifest's remit to Node validators generally; otherwise follow today's Node-only pattern and add a plain step to `validation.yml`. Confirm at build time. Both-legs wiring is simpler than it sounds either way: `validation.yml` already runs one job across a `matrix.os: [ubuntu-latest, windows-latest]` strategy (verified in the workflow file), so a Node step added inside that job runs on both legs automatically, no OS-specific variant required. Start `ci: advisory`; promote to enforcing once the fixture pack and the reference example both pass cleanly for one full release cycle, per the repo's advisory-then-enforcing ladder.

### Non-goals

Not a templating engine or code generator. Not a runtime plugin loader. Does not touch `userConfig` (F-47). Does not fork or duplicate base `SKILL.md` content. Does not validate delta content quality, matching the repo's existing structure-not-content validator philosophy. No public gallery of overlay packs in this bet.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 1 | Design doc; ratify REQ-2's delta-type list; ratify REQ-8's loading mechanism | agent:claude draft, agent:human decides | S | none |
| 2 | Finalize `overlay.yaml` schema and resolution order; author the `deliver-prd` reference example (REQ-7) | agent:claude | M | Phase 1 |
| 3 | `check-overlay-integrity.mjs` plus test plus the committed fixture pack | agent:codex | M | Phase 2 |
| 4 | Manifest registration or `validation.yml` step (per the hedge above), advisory | agent:codex | S | Phase 3 |
| 5 | `.local.md` loading doc (REQ-8) published to the site's skill-authoring guide | agent:claude | S | Phase 2 |
| 6 | Dogfood a second example overlay (a different skill family, for example `foundation-okr-writer`) to prove the format generalizes | agent:claude | S | Phase 3 |
| 7 | Promote the validator to enforcing after one clean release cycle; publish the format publicly | agent:claude + agent:human review | S | Phase 6 |

Test and eval strategy: unit tests for the validator's three verdict classes, OK, STALE-MINOR, BROKEN-MAJOR, run against the fixture pack and are CI-blocking; an integration test resolves the reference example against the real installed `deliver-prd` version at test time. Delta CONTENT quality is never eval-scored, per the Non-goals boundary.

## Release surfaces touched (G2 delta)

At PARKED status: none. At promotion, the delta is additive only: no change to any existing skill's `SKILL.md` (overlays are additive from the consumer's side, not an edit to the base); a new site doc, the format spec, in the skill-authoring guide; `scripts/check-overlay-integrity.mjs` plus test plus fixture pack; a manifest entry or a `validation.yml` step per the Durable CI block's hedge. No catalog count change: overlays are not skills, so `check-count-consistency` and the sub-agent and skill totals are untouched.

## Risks and open questions

| ID | Question | Recommendation | Status |
|---|---|---|---|
| OQ-1 | Pack versioning convention | A, mirror SemVer | OPEN |
| OQ-2 | Where the reference example lives | A, in this public repo | OPEN |

**OQ-1 (pack versioning).** A) `pack_version` mirrors SemVer, matching the base library's own governance. B) `pack_version` stays free-form text. **Recommend A**: consistency lets a future gallery sort packs meaningfully, and the compatibility contract in REQ-4 already reasons in SemVer terms for the base side; decide at Phase 1.

**OQ-2 (reference example location).** A) the reference example lives in this public repo. B) only in a separate private example. **Recommend A**: it teaches the mechanism at zero data-exposure cost, since the example uses fictional house terminology and nothing proprietary; decide at Phase 1.

Additional risks: a private overlay can rot silently against upstream if the consuming organization never re-runs the validator in their own CI; pm-skills cannot enforce a private repository's pipeline, so this limitation is documented plainly rather than solved. REQ-4's fail-closed MAJOR behavior may feel heavy-handed mid-release for a pack maintainer; mitigate with an explicit override flag, documented as "read the `HISTORY.md` entries first, then acknowledge," rather than a silent bypass. Whether an org ever needs to extend more than one base skill with shared terminology, a whole-catalog vocabulary swap rather than a per-skill one, is out of scope for v1; note it as a candidate fourth delta kind if real demand appears.

## Promotion trigger and path

The trigger is two-part: `docs/internal/release-plans/v2.31.0/plan_v2.31.0.md`'s WS-Z2 (generated-surfaces foundation) has shipped, and a real pull exists, a contributor or a prospective enterprise adopter actually asks for this, or the maintainer chooses to dogfood it as a public demonstration. Given a bus factor of one and zero external contributors today, this should not be built speculatively ahead of demand.

Once triggered, a GitHub issue opens and becomes an effort brief; given the skill-adjacent, content-authoring shape of this bet, an F-series ID is the better fit by precedent (alongside F-47 and F-48), though an M-series ID is defensible if the maintainer weighs the validator tooling more heavily. Confirm the free number and the right series against the GitHub issue list and `backlog-canonical.md` at filing time, per the backlog's ID rule. Promote this file into a full release-plan bundle, `plan_` plus `spec_` plus `implementation-plan.md`, under its own version directory at that point, with one tracking issue rather than a set of per-phase issues.
