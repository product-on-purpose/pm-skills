# check-skill-sample-coverage.sh / check-skill-sample-coverage.ps1

## Purpose

Enforce that every in-scope content skill has a library thread sample for each of the three canonical narrative threads (`storevine`, `brainshelf`, `workbench`).

Closes a structural gap found during the v2.23.0 release: a new skill could ship with no `library/skill-output-samples/` entries because nothing coupled "a skill exists in `skills/`" to "its samples exist in the library." Companion files (`references/TEMPLATE.md`, `references/EXAMPLE.md`) are enforced by `lint-skills-frontmatter` because they live inside the skill directory; thread samples live in a separate tree and were unenforced. This check joins the two trees.

## Usage

```bash
./scripts/check-skill-sample-coverage.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-skill-sample-coverage.ps1
```

`--strict` is accepted for calling-convention parity with the rest of the pre-tag bundle; the check is enforcing by default, so the flag is a no-op.

## What It Checks

In scope: skills whose `metadata.phase` is a Triple Diamond phase (`discover`, `define`, `develop`, `deliver`, `measure`, `iterate`) or whose `metadata.classification` is `foundation` or `tool`.

For each in-scope skill (minus the exemption allowlist), the check FAILS if `library/skill-output-samples/<skill>/` lacks a sample for any thread, where a thread sample is a file matching `sample_<skill>_<thread>_*.md` or `sample_<skill>_<thread>.md`.

### Exemptions

- **All `utility-*` skills** are exempt by class. The library convention is single-thread (storevine-only) for some utilities, and the four sub-agent dispatch skills keep their samples in `library/sub-agent-samples/`.
- **`deliver-acceptance-criteria`** is an explicit per-skill exemption (documented storevine-only single-thread sample in `README_SAMPLES.md`).

Exemptions are constants in the script, so adding one is an auditable change rather than a silent omission.

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Every in-scope skill has all three thread samples |
| `1` | One or more in-scope skills are missing a required thread sample |

## When to Use

- After adding a new phase, foundation, or tool skill (it must ship its three thread samples)
- Before tagging a release (wired into `scripts/pre-tag-validate.sh`)
- In CI (`.github/workflows/validation.yml`)

## Example Output

```text
Checked 54 in-scope skills (phase / foundation / tool, minus exemptions).
PASS: all in-scope skills have storevine + brainshelf + workbench thread samples.
```

```text
FAIL: foundation-prioritized-action-plan (foundation) is missing a 'brainshelf' thread sample (expected library/skill-output-samples/foundation-prioritized-action-plan/sample_foundation-prioritized-action-plan_brainshelf_*.md)
FAIL: one or more in-scope skills are missing required thread samples.
```

## Safety

- Read-only. Does not modify any files.
- Inspects only `skills/` and `library/skill-output-samples/`.
