# v2.22.0 Live-Install Spot-Check (maintainer-run)

> **Purpose:** confirm, BEFORE deleting the 63 command wrappers, that the skills are self-sufficient - they resolve by name and receive arguments on a real Claude Code install.
> **Status: confirmatory, not discovery.** The invocation contract is source-doc-validated (see `deletion-sweep-findings.md` "Invocation standard") and the 63 skill names are statically verified to resolve. This check only watches it work end-to-end on a real install (catches a packaging/version surprise the docs can't promise). ~3 minutes. Reasonable to treat as optional belt-and-suspenders if the static check + API validation are clean.

## Setup
From the repo root, in a terminal:
- **If pm-skills is NOT installed:** `claude --plugin-dir .` then `/reload-plugins` (loads the local working tree as the plugin).
- **If it IS installed** (v2.21.0 via the `product-on-purpose` marketplace): your normal session works - both wrappers and skills exist now (pre-deletion).

## Checks
1. **Resolution + arguments** (the load-bearing one)
   - Type: `/pm-skills:deliver-prd a notes-app search feature`
   - PASS if: the skill runs AND visibly uses "a notes-app search feature" as its input.
2. **Duplication** (what the release removes - visible now)
   - Type: `/okr`
   - PASS if: the picker shows BOTH `/pm-skills:okr-writer` (wrapper) and `/pm-skills:foundation-okr-writer` (skill).
3. **Dispatch skills take args**
   - Type: `/pm-skills:utility-pm-critic` then paste any short artifact.
   - PASS if: the critic runs on the input.
4. **Conductor** (both surfaces)
   - a. Type `@agent-pm-skills:pm-release-conductor` - PASS if it resolves in the @-mention picker.
   - b. Type `/pm-skills:utility-pm-release-conductor v2.22.0 --dry-run` - PASS if it walks the release gates WITHOUT tagging or pushing.

## Verdict
- **If 1, 3, 4 PASS** -> skills are self-sufficient; the wrappers are safe to delete. Proceed to execution.
- **If any FAIL** -> STOP and report which. The conductor fallback (if 4 fails) is to keep `/pm-release` as the lone surviving command.

## Report-back template (paste back)
```
Spot-check (Claude Code version: ___)
1 resolution + args:   PASS / FAIL   notes: ___
2 duplication visible: YES / NO
3 dispatch args:       PASS / FAIL   notes: ___
4a @agent resolves:    PASS / FAIL
4b conductor dry-run:  PASS / FAIL   notes: ___
Anything surprising:   ___
```

## Not covered here (already validated, do NOT re-check manually)
- Skills resolve as `/pm-skills:<name>` and receive `$ARGUMENTS`: source-doc-confirmed (code.claude.com/docs) + the 63 names statically verified (see `deletion-sweep-findings.md`).
- **Codex:** skills are `$<name>`, no command wrappers - the deletion is a no-op there (validated).
- **Gemini CLI:** validated separately against Gemini docs - see `deletion-sweep-findings.md` "New scope from the invocation validation".
