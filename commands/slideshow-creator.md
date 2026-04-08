---
description: Generate a professional presentation from a content brief using 18 slide types
---

Use the `utility-slideshow-creator` skill to help the user create a presentation.

Read the skill instructions from `skills/utility-slideshow-creator/SKILL.md` and follow them to guide the user through deck creation — from content brief to JSON deck specification.

Use `skills/utility-slideshow-creator/references/slide-types.md` for character limits and slot definitions.

Use `skills/utility-slideshow-creator/references/decision-logic.md` to select slide types for the user's content.

If the user provides a content brief, begin by planning the deck: select slide types, assign dark/light variants, then write the JSON specification.

If the user has an existing JSON spec to modify, read it and suggest improvements based on the decision logic and quality checklist.

Context from user: $ARGUMENTS
