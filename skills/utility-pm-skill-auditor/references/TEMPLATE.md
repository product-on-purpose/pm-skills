---
title: "pm-skill-auditor Dispatch Output Template"
description: Output structure for utility-pm-skill-auditor dispatch skill, including the layered Status envelope per master plan D26 (full audit report + Status Summary prose + Status YAML block). Used when the dispatch skill executes inline on non-Claude clients; the native pm-skill-auditor sub-agent on Claude Code returns audit output in the same structure.
---

# Output Template

`utility-pm-skill-auditor` produces a three-section layered output per master plan D26.

## Section 1: Full Audit Report

````markdown
# pm-skill-auditor report

**Scope:** {full repo at HEAD `{sha}` | changed since HEAD | since-tag {tag}}
**Validators invoked:** {N}
**Cross-cutting checks run:** {N}
**Findings:** N (P0: X, P1: Y, P2: Z, P3: W)

## Validator results

| Validator | Status | Issues |
|---|---|---|
| lint-skills-frontmatter | PASS / FAIL | {count} |
| validate-commands | PASS / FAIL | {count} |
| validate-agents-md | PASS / FAIL | {count} |
| validate-meeting-skills-family | PASS / FAIL | {count} |
| validate-foundation-sprint-skills-family | PASS / FAIL | {count} |
| validate-design-sprint-skills-family | PASS / FAIL | {count} |
| check-internal-link-validity --strict | PASS / FAIL | {count} |
| validate-docs-frontmatter --strict | PASS / FAIL | {count} |
| check-no-body-h1 --strict | PASS / FAIL | {count} |
| check-count-consistency --strict | PASS / FAIL | {count} |
| check-landing-page-counts --strict | PASS / FAIL | {count} |
| check-workflow-generator-coverage | PASS / FAIL | {count} |
| check-agents-md-command-sync | PASS / FAIL | {count} |
| check-generated-content-untouched | PASS / FAIL | {count} |
| check-mcp-impact | PASS / FAIL | {count} |
| (additional validators in pre-tag-validate.sh) | | |

## Cross-cutting findings

### P0 findings

(Per-finding detail using the standard severity grammar from spec_pm-skill-auditor.md. Each finding includes Location / Issue / Why it matters / Fix.)

### P1 findings
### P2 findings
### P3 findings

## Aggregate counter audit

| Surface | Declared | Re-derived | Match |
|---|---|---|---|
| Total skills | {X} | {Y} | YES / NO |
| Phase skills | {X} | {Y} | YES / NO |
| Foundation skills | {X} | {Y} | YES / NO |
| Utility skills | {X} | {Y} | YES / NO |
| Tool skills | {X} | {Y} | YES / NO |
| Sub-agents | {X} | {Y} | YES / NO |
| Commands | {X} | {Y} | YES / NO |
| Workflows | {X} | {Y} | YES / NO |
| Enforcing validators | {X} | {Y} | YES / NO |
| Family contracts | {X} | {Y} | YES / NO |

## Disposition recommendations

- {N} P0 findings: must close before release tag
- {N} P1 findings: close before next major release
- {N} P2 findings: consider in scoping
- {N} P3 findings: skip if time-constrained
````

## Section 2: Status Summary (Prose, for Human Readers)

```markdown
## Status Summary

The audit at {scope} returned {N} findings: {P0: X, P1: Y, P2: Z, P3: W}.

{One paragraph capturing top findings by severity. Counters match? Validators all pass? Cross-cutting issues clustered in a particular area? Explicit recommendation for next action.}

**Refusal triggered:** {yes / no. If yes, explain why per refusal protocols 1-3 in spec_pm-skill-auditor.md.}
```

## Section 3: Status YAML (Machine-Parseable, for Parent Sub-Agent or Tooling)

````markdown
## Status

```yaml
status: pass | fail | refused
p0_count: {integer}
p1_count: {integer}
p2_count: {integer}
p3_count: {integer}
counters_match: true | false
validators_pass: true | false
scope: full | changed | since-tag {tag}
refusal_reason: null | "validators not invocable" | "repo state ambiguous" | "scope unclear"

# Detailed counter breakdown for downstream consumption:
counters:
  declared:
    total_skills: {integer}
    sub_agents: {integer}
    commands: {integer}
    workflows: {integer}
    enforcing_validators: {integer}
  derived:
    total_skills: {integer}
    sub_agents: {integer}
    commands: {integer}
    workflows: {integer}
    enforcing_validators: {integer}

dispatch:
  mode: native-subagent | inline-execution
  client: claude-code | codex-cli | cursor | windsurf | copilot | gemini-cli | other
```
````

## Chained Handoff Notes

When invoked from `pm-release-conductor` at gate G0:

- All three sections MUST be present
- The conductor parses Section 3 YAML for advancement decisions
- The maintainer reads Sections 1 + 2 for human context
- If `status: refused` in Section 3, conductor surfaces Section 2 refusal narrative to maintainer
- If `p0_count > 0`, conductor blocks advancement past G0 per master plan D23

## Related Files

- Canonical sub-agent: [`agents/pm-skill-auditor.md`](../../../agents/pm-skill-auditor.md)
- Worked example: `EXAMPLE.md`
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md`](../../../docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md)
