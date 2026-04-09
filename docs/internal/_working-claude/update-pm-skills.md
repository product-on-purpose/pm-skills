---
description: Update local pm-skills installation to the latest public release with conflict-aware overwrite-or-skip options and a detailed change report
---

Use the `utility-update-pm-skills` skill to update the local pm-skills installation.

Read the skill instructions from `skills/utility-update-pm-skills/SKILL.md` and follow them to perform the update.

Use `skills/utility-update-pm-skills/references/TEMPLATE.md` as the report output format.

Begin with Step 1 (Validate Internet Access) and proceed through all steps sequentially. If the user provides `--force`, skip the version comparison check and proceed with the update even if the local version appears current. If the user provides `--report-only`, perform Steps 1-4 and Step 8 (generate report) without applying any changes.

Context from user: $ARGUMENTS
