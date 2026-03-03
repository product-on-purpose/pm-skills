---
description: Generate a product or marketing persona using the v2.5 canonical template contract
---

Use the `foundation-persona` skill to generate a decision-usable persona.

Read `skills/foundation-persona/SKILL.md` and follow it exactly.

Use `skills/foundation-persona/references/TEMPLATE.md` and select exactly one template:
- `Product Persona Template` for `product`
- `Marketing Persona Template` for `marketing` (`buyer` alias allowed)

Mode behavior:
- If mode is omitted, ask for `product` or `marketing`.
- If execution must continue without a reply, default to `product` and state that assumption.
- If `agent` is requested, state that generated `/persona` modes are `product` and `marketing` only in `v2.5.0`, then ask the user to choose one.

Quality requirements:
- Complete all required sections from the selected template.
- Keep evidence, assumptions, open questions, governance, and explicit confidence (`High|Medium|Low`).
- Remove template blockquote guidance notes from the final artifact.

Context from user: $ARGUMENTS
