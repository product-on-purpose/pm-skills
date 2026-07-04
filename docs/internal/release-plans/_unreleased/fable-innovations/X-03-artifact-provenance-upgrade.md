# X-03 Artifact provenance and the upgrade loop (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision; not committed scope)
**Owner:** Maintainers
**Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b/6c, bet X-3 (artifact provenance and the upgrade loop)
**Candidate formal ID:** to be assigned at promotion (F-5x/M-3x per the backlog ID rule)
**Audit score (Bar / Moat / Effort-inverse):** 2 / 3 / 2 = 7 of 9. Audit's note: "unique lifecycle story; cheap prototype exists."
**Companion docs:** [`docs/internal/release-plans/v2.31.0/plan_v2.31.0.md`](../../v2.31.0/plan_v2.31.0.md) (WS-Z7, the staged memory workstream this bet is designed to feed) and [`docs/internal/release-plans/_unreleased/project-memory/plan_project-memory.md`](../project-memory/plan_project-memory.md) (F-48, the parked keystone this bet targets as its ledger)

---

## Summary and why it wins

Skills stamp every artifact they produce with a small provenance block: `generated-by: <skill>@<version>` plus a timestamp. Then ship a new utility skill, `utility-pm-artifact-upgrade`: given a workspace, find stamped artifacts, compare their generating skill's CURRENT version against the stamped one using that skill's `HISTORY.md`, and offer regeneration or a targeted delta rather than leaving the user to guess whether their saved PRD reflects what the skill would produce today.

The nearest in-repo precedent is `foundation-stakeholder-briefings`' `Draws on:` mechanism (`skills/foundation-stakeholder-briefings/SKILL.md`), which tags each audience briefing with the master claim IDs it projects, and its structural self-check that every `Draws on:` ID resolves to something real. It is not an identical mechanism, it traces claim provenance within one document, not artifact-level generation provenance across a skill's version history, but it is the closest working proof that a structured, checkable reference-ID convention already ships successfully in this library.

Why it wins: no PM skill library in the field has a lifecycle story for the artifacts it produces once they leave the conversation. This makes pm-skills valuable AFTER the artifact exists, which is where PMs actually live; a stale PRD from three skill versions ago is exactly the kind of drift a busy PM would never notice on their own. The moat is high because it requires per-skill SemVer plus enforced `HISTORY.md`, infrastructure the audit found nowhere else in the competitive landscape, and the effort is comparatively low because both the versioning infrastructure and a working structural precedent already exist; this is assembly, not invention.

### What the user sees

Illustrative only, not a committed UI: a scan of a workspace with three previously stamped artifacts might report:

```
Scanning workspace for stamped artifacts...
Found 3 stamped artifacts: 1 up to date, 2 stale.

1. 2026-04-02_growth-onboarding_prd.md
   Stamped: deliver-prd@2.1.0   Current: deliver-prd@2.3.0
   What changed (from HISTORY.md): 2.2.0 added a Rollout Plan section
   (additive); 2.3.0 was a wording pass on Success Metrics (no
   structural change).
   Options: [1] regenerate fully  [2] apply only the Rollout Plan
   section  [3] skip, acknowledge as-is

2. 2026-05-14_q3-okrs.md
   Stamped: foundation-okr-writer@1.4.0   Current: foundation-okr-writer@1.4.0
   Up to date, no action offered.
```

This is the concrete shape of REQ-4 and REQ-5 below: the report cites the actual `HISTORY.md` rows rather than a generic "there is a new version," and every disposition is explicit and reversible.

## Relationship to existing plans

This bet's central relationship is with F-48 (the project-memory keystone) in `docs/internal/roadmap.md` and its full design at the parked [`project-memory` plan](../project-memory/plan_project-memory.md). The audit's own sharpening note for the declared memory bet says this explicitly: make the memory file double as the artifact ledger, so memory, provenance, and orchestrator threading become one mechanism instead of three. X-03 is therefore not a competing ledger; it is designed from the outset to be a CONSUMER of whatever file B1 (the project-memory keystone) lands as, most likely `.claude/pm-skills.local.md` per the parked plan's spec, rather than inventing a second, parallel state file.

The parallel [`v2.31.0` plan](../../v2.31.0/plan_v2.31.0.md) confirms this is already a pre-integrated design input, not yet committed scope. Its staged workstream WS-Z7 (memory, R-22, F-48, targeted at v2.32.0) states verbatim that "the project-memory file doubles as the orchestrator artifact ledger, and its provenance stamping aligns with the maintainer-local innovation X-3." X-03's job is to hand WS-Z7 a ready stamping design by the time memory promotes, not to wait passively for memory to ship first: the stamping convention itself (REQ-1 through REQ-3 below) does not require a ledger to exist, since a stamp is a property of the artifact, not of any index over it. Only the "scan a workspace for stamped artifacts" step benefits from, without strictly requiring, a memory ledger; absent memory, it can glob the workspace directly. This nuance matters because it means X-03 need not stay blocked if the memory train slips a third time, which the audit's own finding P1-10 already flags as having happened twice.

No item in `docs/internal/roadmap.md`'s F-43 through F-53 or M-25 through M-29, outside F-48, relates to this bet. v2.30.0 (trust repair) has no direct relationship.

## Spec

### Scope in

- A `generated-by` frontmatter or trailing-comment convention any skill can add to its produced artifact, when the skill's output format supports it.
- `utility-pm-artifact-upgrade`: a new skill that scans a directory (default cwd) for stamped artifacts, compares stamped version against the generating skill's current version, summarizes what changed via `HISTORY.md`, and offers full regeneration, a targeted delta, or acknowledge-and-skip.
- A pilot cohort of 3 to 5 high-traffic skills adopting the stamp first, not a catalog-wide rollout.

### Scope out

- A cryptographic attestation or blockchain-style provenance chain; this is a plain, human-readable convention.
- Auto-applying an upgrade without explicit user confirmation.
- Retrofitting all 68 skills with stamping in one pass; pilot first, expand later, mirroring how `HISTORY.md` itself rolled out gradually per skill.

### Requirements

- **REQ-1.** The `generated-by` stamp records skill name, exact semver, and a generation timestamp, in a format parseable without executing the artifact.
- **REQ-2.** Adding the stamp to a skill's output format is an additive section change, a MINOR bump plus a `HISTORY.md` row per `docs/internal/skill-versioning.md`, never required retroactively of artifacts produced before the skill adopted stamping.
- **REQ-3.** `utility-pm-artifact-upgrade` resolves a named skill's current version from the live catalog (`skill-manifest.json`), never from a hand-maintained duplicate inventory, deliberately avoiding the exact hand-inventory failure mode the audit found in `utility-pm-skill-builder` (finding P0-3).
- **REQ-4.** The diff step reads the generating skill's `HISTORY.md` rows strictly between the stamped version, exclusive, and the current version, inclusive, and summarizes each row's stated change type, rather than re-deriving a diff from `SKILL.md` text directly; `HISTORY.md` is already the authored changelog, this does not build a second, competing diff mechanism.
- **REQ-5.** The skill offers exactly three dispositions, full regeneration, a targeted delta, or acknowledge-and-skip, and never overwrites a file without an explicit confirmation step.
- **REQ-6.** If the project-memory keystone has shipped by the time this promotes, `utility-pm-artifact-upgrade` should read the memory ledger as its primary source of which artifacts exist and which skill produced them, falling back to a workspace scan for unstamped-but-discoverable files or when memory is absent or disabled.
- **REQ-7.** The stamping convention is documented in `docs/internal/skill-versioning.md` as a named, opt-in pattern, so future skill authors know it exists and how to adopt it.
- **REQ-8.** A single invocation reports on ALL stamped artifacts found in the scanned directory in one pass, grouped by staleness (up to date, stale), rather than requiring a separate invocation per file; the worked example above is the target shape.

### Interfaces and contracts

Stamp format for frontmatter-bearing artifacts:

```yaml
generated_by:
  skill: deliver-prd
  version: 2.3.0
  generated_at: 2026-07-03T14:00:00Z
```

Stamp format for non-frontmatter artifacts, a plain report: a trailing HTML comment, `<!-- generated-by: deliver-prd@2.3.0 generated-at: 2026-07-03T14:00:00Z -->`, so no skill is forced to adopt frontmatter solely to support stamping. `utility-pm-artifact-upgrade` is invoked as a skill, not a script, on a trigger such as "check my saved PRDs for upgrades," and produces a short per-file report before asking which disposition to apply.

### Durable CI block

The stamp itself is a runtime output of a skill invocation, not a static repo file, so nothing in `skills/` is linted for it directly. What ships in-repo and is CI-checkable: `utility-pm-artifact-upgrade`'s own pure-function logic, stamp parsing, version comparison, `HISTORY.md` row extraction, as a `.test.mjs` fixture suite (a fresh artifact, a one-version-stale artifact, an unstamped artifact, a malformed stamp), deterministic, no model calls, standard `node --test`. A lightweight `check-provenance-stamp-format.mjs` (plus test), advisory, validates that any pilot skill's `EXAMPLE.md` or library sample demonstrating the stamp actually parses per REQ-1's format, catching a skill's own worked example from silently drifting off its documented shape.

Both checks are pure Node with no shell counterpart. Per `scripts/validation-manifest.yaml`'s stated scope (dual-shell pairs only today), they follow the existing Node-only pattern, a step in `.github/workflows/validation.yml`, no manifest entry, unless the manifest's remit has been generalized by the time this promotes; confirm at build time. Both-legs wiring is a step inside the existing `matrix.os: [ubuntu-latest, windows-latest]` job. `utility-pm-artifact-upgrade` itself goes through the standard skill-builder pipeline, the Why Gate, trigger fixtures against its nearest neighbors (`iterate-lessons-log`, `utility-pm-skill-iterate`), and sample coverage, like any new skill; it is not a special case.

### Non-goals

Not a version-control system; git already tracks file history, this is skill-aware semantic diffing on a different axis. Not automatic or silent artifact rewriting. Not a cryptographic provenance chain. Not, at v1, dependent on F-48 shipping; REQ-6 makes memory an enhancement, never a prerequisite.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 1 | Document the stamping convention; pick the pilot cohort | agent:claude | S | none |
| 2 | Add the `generated_by` block to each pilot skill's Output Format section | agent:claude | M | Phase 1 |
| 3 | Build `utility-pm-artifact-upgrade` (instructions, comparison logic, the three-disposition flow); author trigger fixtures | agent:codex | M | Phase 2 |
| 4 | `pm-artifact-upgrade.test.mjs` fixture suite; `check-provenance-stamp-format.mjs`; wire into `validation.yml` | agent:codex | S | Phase 3 |
| 5 | Sample library entries (floor 3, one per thread) showing an upgrade walkthrough | agent:claude | S | Phase 3 |
| 6 (deferred) | Memory-ledger integration (REQ-6), a follow-up once WS-Z7 ships | agent:codex | S | WS-Z7 |

Test and eval strategy: unit tests for the deterministic parsing and comparison logic are blocking, CI-enforced. A trigger-fixture set for the new skill against its nearest neighbors follows the standard M-31 contract. An M-33-style output-eval scenario, once the skill ships, checks whether the upgrade report accurately and calibratedly describes what changed, without fabricating a delta the `HISTORY.md` rows do not support.

Dependency note: the stamping convention and pilot cohort (Phases 1 through 5) have no blocking dependency and can proceed independent of v2.30.0, v2.31.0, or memory. Only Phase 6 depends on WS-Z7 (v2.31.0, staged, targeted v2.32.0) actually shipping; if it slips, the skill still functions via a workspace scan. A loose synergy, not a dependency, exists with X-02 (artifact schemas, the sibling document in this set): pairing the same pilot skills for both schemas and stamping produces the strongest joint story, a typed AND provenance-tracked artifact, but neither bet requires the other to ship first.

## Release surfaces touched (G2 delta)

At PARKED status: none. At promotion, this bet DOES add to the catalog, unlike the other two bets in this set: one new utility skill (utility 12 to 13, catalog 68 to 69), a MINOR bump plus `HISTORY.md` row on each of 3 to 5 pilot skills for the added Output Format section, new samples at the floor of 3, and the standard new-skill release-surface sweep A through J applies in full, following the pattern in [`v2.29.0`'s plan](../../v2.29.0/plan_v2.29.0.md).

## Risks and open questions

| ID | Question | Recommendation | Status |
|---|---|---|---|
| OQ-1 | Pilot cohort selection | A if X-02 has shipped, else B | OPEN |
| OQ-2 | Stamp placement for non-frontmatter skills | B, HTML-comment fallback | DECIDED (reflected above) |
| OQ-3 | Automatic vs on-demand upgrade checks | On-demand only at v1 | OPEN |
| OQ-4 | Stamp visibility to the artifact's end reader | Visible by default, documented strip-before-sharing | OPEN |

**OQ-1 (pilot cohort).** A) the same 3 families X-02 pilots (`deliver-prd`, `foundation-okr-writer`, `measure-experiment-design`), compounding both bets. B) a different high-traffic 3 to 5, independent of X-02. **Recommend A if X-02 has shipped by the time this promotes**, otherwise B; there is no reason to wait on X-02 solely to pick a cohort.

**OQ-3 (automatic vs on-demand).** A) a `SessionStart` nudge surfaces stale artifacts automatically, echoing F-44's phase router. B) purely on-demand invocation. **Recommend B** at v1: F-44's own opt-out was found broken by the audit (finding P1-8, remediated in v2.30.0 workstream WS-T7), and adding a second automatic surface before that class of defect has even fully closed compounds the same risk rather than learning from it.

**OQ-4 (stamp visibility).** A) the stamp is always visible at the bottom of the artifact a human reads, doubling as a quiet advertisement of what produced it. B) hidden or stripped at final render, since some users share a PRD with executives or external partners who should not see plugin-internal metadata. **Recommend visible by default**, with a documented strip-before-sharing step, the same pattern `foundation-build-risk-review`'s own spec already uses for template authoring blockquotes ("stripped from the final output"); this avoids inventing a second stripping convention.

Additional risks: the tool can only detect skill-version drift, not user-content drift; a user's hand-edited artifact may have already diverged from what any version of the skill would produce, and the tool must say so plainly rather than imply it audited the user's edits. Scope creep toward a full "artifact CMS" is mitigated by keeping v1 to the three dispositions only, no bulk-apply, no scheduling.

## What changes if this ships

A saved artifact stops being a snapshot that silently ages; it becomes a versioned claim the library can check itself against. The library's value extends past the moment of generation into however long the artifact lives in a user's workspace, which the audit names as exactly where PMs actually spend their time. Paired with X-02 (artifact schemas, the sibling document in this set), a pilot artifact could eventually be both typed (schema-valid) and lineage-tracked (provenance-stamped) at once, the strongest joint claim either bet can make alone.

## Promotion trigger and path

A GitHub issue can open independent of any other train for the stamping convention and pilot (Phases 1 through 5). The issue becomes an effort brief, a candidate F-5x ID, since this ships an actual new skill plus a roadmap-adjacent memory integration, matching the pattern of F-55 and F-56, both new-skill efforts; as of this writing F-57 reads free, confirm against the GitHub issue list and `backlog-canonical.md` per the ID rule at `docs/internal/roadmap.md` section 7 at filing time. The effort brief slots naturally alongside or just after WS-Z7 (memory) at whatever release carries that theme, so the provenance stamping can ride along with the ledger it targets, exactly as the audit's own suggested sequencing frames it.
