---
slug: releases/Release_v2.27.1
title: Release v2.27.1
description: A maintenance patch that closes the classification sub-count drift class. The count-consistency gate now polices the four per-classification / per-phase skill sub-counts against frontmatter, so a stale "10 utility skills" fails CI like a stale total. No skill behavior change.
---

**Released 2026-06-16.** Maintenance PATCH. No new skills (catalog stays 66; 5 sub-agents, 11 commands, 12 workflows). No skill behavior change.

## The short version

v2.27.0 was the provable-quality release. Its doc-currency audit had to fix a stale classification split (the per-classification skill counts had drifted on a published page) **by hand**, because the count-consistency gate policed only top-line totals - the per-classification and per-phase sub-counts were exempt. v2.27.1 closes that gap at the source: those sub-counts are now derived from frontmatter and checked, so the same drift fails CI instead of waiting for a human audit.

The new check earned its keep immediately - run against the repo it surfaced three stale sub-counts, two of which a manual inventory had missed.

## What changed

**`check-count-consistency` now polices classification / phase sub-counts.** Both the bash and PowerShell versions derive the four buckets - phase (skills with `metadata.phase`), foundation, utility, and tool (skills with `metadata.classification`) - directly from skill frontmatter, the same way the total skill count is derived from directories. Every tracked doc surface is then checked for stale bucket counts in both forms: number-before ("30 phase skills") and parenthetical ("Foundation Skills (9)"). The change is additive - the existing total-count check is unchanged, and a legitimate "30 phase skills" is still not mistaken for a stale total of 66.

**Three stale sub-counts fixed.** The new gate caught and we corrected: the Triple Diamond workflow reference (25 to 30 phase skills), the getting-started quickstart page (65 to 66 skills, 10 to 12 utility skills, 10 to 11 command docs), and a point-in-time historical mention on the skill-anatomy page (reworded to "the then-six foundation skills", since it correctly describes the catalog at v2.11.1).

**Historical-mention convention documented.** A point-in-time sub-count is written as a word ("then-six") or wrapped in a `count-exempt` range, so genuine history is preserved without tripping the gate. This is recorded in `scripts/check-count-consistency.md`.

## Install or upgrade

```bash
# Claude Code (marketplace)
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose

# any agent, via the open skills CLI
npx skills add product-on-purpose/pm-skills
```

Existing installs: update the marketplace and reinstall to pick up v2.27.1. Nothing was removed or renamed; this is a maintenance patch.
