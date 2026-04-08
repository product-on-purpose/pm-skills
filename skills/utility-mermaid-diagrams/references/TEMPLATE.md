# Mermaid Diagram Planning Worksheet

<!-- Fill out this worksheet before writing mermaid code. It prevents wasted effort by ensuring you've chosen the right diagram type and inventoried your content. -->

## 1. Diagram Purpose

<!-- What relationship, flow, hierarchy, or proportion are you communicating? Who is the audience? -->

**What I'm showing:**
**Audience:**
**Where this will appear:** <!-- e.g., PRD, roadmap deck, technical spec, wiki page -->

## 2. Cardinal Rule Check

<!-- Does this need a diagram, or would a list/table communicate it better? -->

- [ ] This shows branching, relationships, or flow that a list would flatten
- [ ] A numbered list or table would NOT communicate this more clearly

If both boxes are not checked, use a list or table instead.

## 3. Diagram Type Selection

<!-- Use the selection guide in SKILL.md or browse diagram-catalog.md to pick the right type. -->

**Selected type:**
**Why this type:** <!-- What does this type show that others don't? -->
**Considered alternatives:** <!-- Which other types did you evaluate? -->

## 4. Node Inventory

<!-- List every entity, participant, state, or data point before writing code. This prevents mid-diagram discovery of missing nodes. -->

| Node/Entity | Role/Label | Notes |
|-------------|-----------|-------|
| | | |

**Total node count:** ___ (check against type limit in diagram-catalog.md)

## 5. Draft Mermaid Code

```mermaid
%% MEANING: [Why this diagram exists]
%% Type: [selected type]
%% Direction: [TD/LR/BT/RL if applicable]
```

## 6. Validation Checklist

- [ ] Renders without error (tested in mermaid.live or target environment)
- [ ] Cardinal rule satisfied -- a list or table would not communicate this more clearly
- [ ] Not a linear sequence -- has branching, relationships, or hierarchy
- [ ] Labels with spaces/special characters are quoted
- [ ] Special characters escaped where needed
- [ ] Node count within type limit
- [ ] Colors are accessible (WCAG AA 3:1 contrast, black text on light backgrounds)
- [ ] Color is never the sole differentiator -- shapes and labels also distinguish elements
- [ ] Has descriptive title or surrounding context
- [ ] `%%` comments document any non-obvious layout or grouping choices
