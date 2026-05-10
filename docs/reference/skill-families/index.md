---
title: "Skill Families"
description: "Cross-cutting contracts that govern coordinated groups of PM skills. Each family defines a shared behavioral pattern, frontmatter schema, and enforcement mechanism so related skills compose cleanly."
tags:
  - Reference
  - Skill Families
---

A skill family is a coordinated group of PM skills that share a common behavioral pattern, frontmatter schema, file naming convention, and cross-skill integration points. Families make the shared surface explicit and enforceable so related skills compose cleanly without drift across future iterations.

Each family has:

- **A canonical contract** describing the shared behavior, schema, and enforcement expectations
- **A CI enforcement mechanism** that blocks family-violating changes at merge time
- **A set of member skills** that conform to the contract

## Active families

### Meeting Skills Family

Five `foundation-meeting-*` skills that together support the full meeting lifecycle: pre-meeting (agenda + brief), post-meeting (recap), cross-meeting (synthesize), and outward comms (stakeholder-update).

**Contract**: [Meeting Skills Contract](meeting-skills-contract.md) (v1.1.0)

**Member skills**:
- [`foundation-meeting-agenda`](../../skills/foundation/foundation-meeting-agenda.md). attendee-facing structure
- [`foundation-meeting-brief`](../../skills/foundation/foundation-meeting-brief.md). user's private strategic prep
- [`foundation-meeting-recap`](../../skills/foundation/foundation-meeting-recap.md). post-meeting topic-segmented summary
- [`foundation-meeting-synthesize`](../../skills/foundation/foundation-meeting-synthesize.md). cross-meeting archaeology
- [`foundation-stakeholder-update`](../../skills/foundation/foundation-stakeholder-update.md). async outward comms

**Shared characteristics**:
- Zero-friction execution (`go` mode) with load-bearing inference gates
- Universal shareable summary + sources & references structure
- Filename-based chaining (`YYYY-MM-DD_HH-MMtimezone_title_artifact-type.md`)
- Anti-meeting check for pre-meeting skills (requires positive synchronous-value statement)
- Enforced by `scripts/validate-meeting-skills-family.sh` (runs on every PR touching family files)

See the [family contract](meeting-skills-contract.md) for full details.

## Why the skill-families pattern exists

Individual skill authoring tends to drift: the same concept gets rendered differently across skills that should share behavior. Two recaps from different authors shouldn't disagree about where the shareable summary lives, what filename convention to follow, or whether to require an input-quality marker. A family contract pins these down and CI enforces them.

The pattern also helps downstream consumers: tools that chain skills (e.g., auto-discovering a sibling agenda from a recap filename) can rely on the contract as a stable interface.

## When to create a new family

Create a family contract when:
- 2+ related skills need to share a behavioral pattern
- Drift between them would cause downstream composition failures
- Contract enforcement is cheaper than per-skill reviews

Skip a family contract when:
- Skills are independently useful and share only incidental similarities
- The shared surface is small enough to review per skill
- CI enforcement would add more friction than it prevents

## Future families (candidates)

Not yet formalized, but potential future families include:

- **Research family**. interview-synthesis, competitive-analysis, jtbd-canvas, stakeholder-summary sharing a research-evidence contract
- **Delivery family**. prd, user-stories, acceptance-criteria, edge-cases sharing a traceability contract

These would get their own `docs/reference/skill-families/{family}-contract.md` file following the same pattern.
