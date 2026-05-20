---
title: "pm-critic Dispatch Output Template"
description: Output structure for utility-pm-critic dispatch skill, including the layered Status envelope per master plan D26 (full findings + Status Summary prose + Status YAML block). Used when the dispatch skill executes inline on non-Claude clients; the native pm-critic sub-agent on Claude Code returns findings in the same structure.
---

# Output Template

When `utility-pm-critic` produces output (either via native sub-agent dispatch on Claude Code or via inline execution on non-Claude clients), the output follows this three-section layered structure per master plan D26.

## Section 1: Full Findings Report

```markdown
# pm-critic findings: {artifact name}

**Artifact reviewed:** {file path or session-context reference}
**Standards consulted:** {comma-separated list of contract docs read at invocation}
**Findings:** N (P0: X, P1: Y, P2: Z, P3: W)

## P0 findings

### F-01: {short finding title (one line)}

**Location:** {line range or section heading in the artifact}
**Issue:** {what is wrong, written precisely}
**Why it matters:** {consequence if shipped as-is}
**Fix:** {concrete change to make, including specific text or restructuring}

### F-02: {next finding}
...

## P1 findings

(same per-finding structure as P0)

## P2 findings

(same per-finding structure as P0; can be more abbreviated)

## P3 findings

(same per-finding structure as P0; one-line findings acceptable)
```

If no findings at a severity, omit that section heading. If zero findings total, output the canonical "passes adversarial review" line per `agents/pm-critic.md`.

## Section 2: Status Summary (Prose, for Human Readers)

```markdown
## Status Summary

The {artifact type} review returned N findings: {P0: X, P1: Y, P2: Z, P3: W}.

{One paragraph summarizing the top 1-3 issues by severity. Plain English. No bullets.}

**Recommended next action:** {explicit recommendation - revise with producing skill, defer to maintainer judgment, accept all P2/P3 and ship, etc.}

**Refusal triggered:** {yes/no. If yes, explain why. Refusal protocols are in agents/pm-critic.md.}
```

This section is for the human reader (PM or maintainer). It captures the "what does this mean" in prose so the reader does not have to interpret the findings table to make a decision.

## Section 3: Status YAML (Machine-Parseable, for Parent Sub-Agent or Tooling)

````markdown
## Status

```yaml
artifact:
  path: {file path of reviewed artifact}
  type: {prd | okr-set | persona | lean-canvas | meeting-recap | etc.}
  thread: {brainshelf | storevine | workbench | other | none}

findings:
  total: {integer}
  p0: {integer}
  p1: {integer}
  p2: {integer}
  p3: {integer}

refusal:
  triggered: {true | false}
  reason: {null OR one-line explanation if triggered}

standards_consulted:
  - {path to first standards doc read}
  - {path to second}
  - ...

recommended_action: {revise | accept-and-ship | escalate | refused}

dispatch:
  mode: {native-subagent | inline-execution}
  client: {claude-code | codex-cli | cursor | windsurf | copilot | gemini-cli | other}
```
````

The YAML block enables programmatic consumption: a parent sub-agent (e.g., `pm-release-conductor` at gate G0) can parse the YAML to decide whether to advance the release flow. A CI workflow or automation can parse it to integrate findings into a tracking system.

## Format Notes

- All three sections are present in every output, even if Section 1 is the "zero findings" line or Section 2 reports a clean review
- The Status YAML uses the four-space indentation pattern shown above; YAML parsers tolerate it but the indentation MUST be consistent within a single output
- The `dispatch.mode` field distinguishes native sub-agent runs (sub-agent context isolation, no inline execution) from inline execution runs (sub-agent system prompt executed in the dispatch skill's context). Useful for telemetry and debugging.
- If the dispatch skill is invoked on Claude Code and the native sub-agent succeeds, the sub-agent itself produces all three sections; the dispatch skill simply relays them. If the dispatch skill is invoked on a non-Claude client, the dispatch skill produces all three sections itself by executing the pm-critic system prompt inline.

## Related Files

- Canonical sub-agent: [`agents/pm-critic.md`](../../../agents/pm-critic.md)
- Worked example: `EXAMPLE.md`
- User guide: [`docs/guides/adversarial-review.md`](../../../docs/guides/adversarial-review.md)
