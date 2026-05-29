---
title: Release v2.22.0
description: One menu entry per skill, and native Codex support
---

# v2.22.0 - One entry per skill, plus Codex support

> Draft. Finalized at tag time (Phase 5). The complete short-command -> skill mapping table is generated during finalization.

## The short version

Two improvements, both about tidiness and reach, neither changing what the skills do:

- **No more double entries.** Each skill used to show up twice in the `/` menu: once under its full name and once as a short command wrapper. The short wrappers are removed, so each capability now appears **once**, as the skill.
- **Codex now sees the skills.** pm-skills shipped only a Claude manifest, so Codex listed the plugin but reported "No plugin skills." This release adds a Codex-native manifest, so Codex discovers the skills the same way Claude Code does.

## What changed

- **Removed:** the 63 hand-maintained short command wrappers (for example `/pm-skills:okr-writer`). They duplicated skills that already exist under their full names.
- **Added:** `.codex-plugin/plugin.json` so Codex packages and surfaces the skills.
- **Kept:** the 10 `workflow-*` orchestrator commands.

## What did NOT change

- **Every skill keeps its name.** `foundation-okr-writer`, `deliver-prd`, `discover-journey-map` - all unchanged. Nothing was renamed.
- **What the skills produce, and how you use them, is identical.** This release is about removing a redundant layer and adding packaging, not about behavior.
- Skill pages, templates, examples, and the sample library are unchanged.

## Do I need to do anything?

Almost certainly not. The skills are all still in the `/pm-skills:` menu under their names. The one case that needs a small update: **if you saved a short command** (like `/pm-skills:okr-writer`) in a script or prompt, switch it to the skill's full name (`/pm-skills:foundation-okr-writer`). The skill is the same; only the short wrapper is gone.

The rule: the skill's full name is the short command name with its category prefix restored (`define-`, `deliver-`, `develop-`, `discover-`, `foundation-`, `iterate-`, `measure-`, `tool-`, `utility-`). A few examples:

| Removed short command | Use the skill |
|---|---|
| `/pm-skills:okr-writer` | `/pm-skills:foundation-okr-writer` |
| `/pm-skills:prd` | `/pm-skills:deliver-prd` |
| `/pm-skills:journey-map` | `/pm-skills:discover-journey-map` |
| `/pm-skills:note-and-vote` | `/pm-skills:tool-note-and-vote` |

The full table for all 63 is generated at release. Either way, every skill is right there in the `/pm-skills:` menu.

## FAQ

**Why remove the short names instead of making them the real names?** That heavier change (renaming all 63 skills to short names) was fully planned and reviewed, but it touches roughly ten times as much of the repo - every doc, the sample library, the page generators - almost all of it to serve a naming preference rather than to fix the duplication. We chose the smaller, safer change that fixes the actual problem now. The short-name idea is parked and may return as its own future release.

**Did anything about the skills get worse?** No. The skills are byte-for-byte the same; you just invoke them by their (slightly longer) full name, which is also what every other client already used.

**Versioning:** this is a minor release. It removes a redundant convenience layer and adds a manifest; no skill capability changed.
