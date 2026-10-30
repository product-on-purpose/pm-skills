# utility-pm-release-conductor - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.0.2 | 2026-10-29 | v2.35.0 | A5 | patch | The post-tag P0 template no longer offers the known-regression waiver for a delivery P0, matching `agents/pm-release-conductor.md` and the runbook since v2.34.0 |
| 1.0.1 | 2026-06-10 | v2.26.0 | F-12-batch-0 | patch | Description trimmed to trigger surface; client-routing mechanics remain in the body (2026-06-09 audit, v2.26.0 Batch 0) |
| 1.0.0 | 2026-05-17 | - | - | baseline | Prior published version |

## 1.0.2 (2026-10-29)

Closes v2.35.0 plan item A5, the remainder of v2.34.0 G1 finding R2-F1. The post-tag P0 block in
`references/TEMPLATE.md` listed "logs the P0 as a known regression" as a way to emit "Release
complete" without exception. `agents/pm-release-conductor.md` and the release runbook have excluded
a delivery P0 from that waiver since v2.34.0, because a delivery P0 closes only when
`check-delivery-pin.mjs` exits 0. The template now carries the same exclusion, word for word.

**Why this is a PATCH and not a MAJOR.** The "what done means" row in `docs/internal/skill-versioning.md`
covers a change to when the skill may report done. That rule changed in v2.34.0, in the sub-agent this
skill dispatches to, and the sub-agent has enforced it since. The template was a stale copy of the
older wording, so this edit removes a contradiction and does not change behavior.

## 1.0.1 (2026-06-10)

Description-only patch (F-12 Batch 0, from the 2026-06-09 repo audit): the always-loaded description was trimmed to the trigger surface; the client-routing mechanics it carried remain documented in the SKILL.md body. No body, template, or behavior changes.

## 1.0.0 (2026-05-17)

Baseline row for the prior published version; see git history for its changes.
