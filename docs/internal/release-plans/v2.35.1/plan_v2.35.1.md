# v2.35.1 Release Plan: Documentation patch (honest value claim)

**Status:** **READY TO TAG** (release-prep on `release/v2.35.1`; G1 pending the maintainer's attestation).
**Owner:** Maintainers
**Type:** **PATCH** (documentation only; no skill, template, command or count change; catalog stays 30 phase + 11 foundation + 12 utility + 15 tool = 68 skills, 6 sub-agents).
**Theme:** Make the public claims match what the tests found.
**Created:** 2026-11-13
**Previous:** v2.35.0 SHIPPED 2026-10-30 (tag `v2.35.0` at `9236f262`; plan at [`../v2.35.0/plan_v2.35.0.md`](../v2.35.0/plan_v2.35.0.md)).
**Next:** v2.36.0 (stub at [`../v2.36.0/plan_v2.36.0.md`](../v2.36.0/plan_v2.36.0.md)); this patch carries nothing out of it.

---

## Scope - what v2.35.1 ships

Both items are already merged to main; this plan documents the release cut.

| Item | PR | Disposition |
|---|---|---|
| **Honest public value claim** | [#343](https://github.com/product-on-purpose/pm-skills/pull/343) | **SHIPPED here.** The README and the docs homepage drop three claims the tests do not support. The evals reference page gains "What the tests have found", which summarizes every no-skill comparison to date, including the losses. |
| **`deliver-prd` counted-test record** | [#340](https://github.com/product-on-purpose/pm-skills/pull/340) | **SHIPPED here.** `skills/deliver-prd/HISTORY.md` records that the counted designed-mode test could not measure a difference, because the counting model disagreed with itself on up to 39 percent of the same specs. No version bump to the skill: the entry is a history note, not a skill change. |

## Decisions

| # | Decision | Status |
|---|---|---|
| D1 (version) | **v2.35.1 (PATCH)**, not v2.36.0 | DECIDED. Documentation only; existing use is unaffected. SemVer tracks compatibility, not significance (v2.27.1 D1 and v2.31.1 D1 precedent). |
| D2 (G1 review) | Codex adversarial review against the release-prep state | See the gate evidence below. The maintainer attests at the G1 prompt. |

## Gate evidence

Recorded at G4.
