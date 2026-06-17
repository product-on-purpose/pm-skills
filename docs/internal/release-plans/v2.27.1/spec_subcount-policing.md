# Spec: classification / phase sub-count policing in check-count-consistency (v2.27.1)

## Problem

`check-count-consistency.{ps1,sh}` is the strict total-count guard: it scans every tracked `.md`/`.mdx`/`.json` for stale `{N} skills|commands|workflows` totals. By design it **exempts subset words** (`phase`, `foundation`, `utility`, `tool`, ...) so a legitimate "30 phase skills" is not flagged as a stale total of 66. The side effect: per-classification and per-phase sub-counts were never validated at all. That let a published page (`pm-skill-anatomy.md`) and a reference table drift to a wrong 26/8/6 classification split while CI stayed green; only a manual v2.27.0 doc-currency audit caught it. The validator's own doc flagged "codifying per-phase awareness" as a deferred enhancement.

## Goal

Police the four frontmatter-derived skill sub-counts so a stale sub-count fails CI like a stale total, without weakening the existing total check and without false-positives on per-phase-name prose or historical mentions.

## Source of truth

The four bucket counts are **derived**, never hardcoded:

- `foundation`, `utility`, `tool` = number of `skills/*/SKILL.md` whose frontmatter has `metadata.classification: <bucket>`.
- `phase` = number of `skills/*/SKILL.md` whose frontmatter has a `metadata.phase:` key.

This mirrors how the total skill count is already derived from directory listing (`one source of truth, derived views`). Current values: phase 30 / foundation 9 / utility 12 / tool 15 (sum 66 = total).

## Surface forms checked

For each bucket, two forms (case-insensitive), additive to the existing checks:

1. **Number-before:** `N phase|foundation|utility skills?` and `N tool[ -](classification|skills?|entries)` (the tool surface is phrased "tool skills", "tool-classification entries", and "tool entries" across docs).
2. **Parenthetical:** `<Bucket> Skills? (N)` (e.g. "Phase Skills (30)", "Foundation Skills (9)").

## Rules

- **No threshold.** Unlike the total check (`MIN_THRESHOLD = 10`, which skips per-phase-name prose like "5 discover skills"), the sub-count check has no threshold, because `foundation = 9 < 10` must still be policed. Per-phase-name words (discover, define, ...) are not bucket words, so they are never matched, and the < 10 per-phase counts never collide.
- **Additive.** The total-check bucket exemption is unchanged: "30 phase skills" is still not flagged as a stale total of 66; the new check validates it against the bucket count instead. No double-reporting (the existing parenthetical check already subset-excludes bucket words).
- **Exemptions honored.** The check runs inside the same per-file loop and reuses `$EXCLUDES` and the `count-exempt:start/end` ranges.
- **Historical mentions.** A point-in-time sub-count must be written as a word ("the then-six foundation skills") or wrapped in a `count-exempt` range, exactly like historical totals. A bare digit in current prose fails. (First instance: the v2.11.1 mention on `pm-skill-anatomy.md`.)

## Parity

Both shells must agree (CI runs bash on ubuntu, pwsh on windows). The bash `check_subcounts` awk mirrors the existing `check_count_suffix` structure; the pwsh checks live in the existing per-line loop. Verification: clean pass + a deliberate negative test on each shell; the bash leg is confirmed authoritatively by CI on Linux.

## Out of scope

- Command/workflow sub-counts (the candidate is classification drift).
- The `Phase-30_skills` badge form and non-derivable subset words (`domain`, `shipped`, `sample`, ...) - no single frontmatter-derived count; they remain exempt.
- A separate validator script: this lives inside `check-count-consistency` (the "two checkers, do not add a third" doctrine is about the total-count surface).

## Acceptance

- [x] Derivation yields 30/9/12/15 from frontmatter on both shells.
- [x] A stale bucket count ("25 phase skills", "Foundation Skills (8)", "10 utility skills") fails on both shells.
- [x] The current tree passes after the three gate-surfaced fixes (pwsh confirmed; bash via CI).
- [x] `scripts/check-count-consistency.md` documents the new behavior + the historical-mention convention.
