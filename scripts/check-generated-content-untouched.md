# check-generated-content-untouched.sh / check-generated-content-untouched.ps1

## Purpose

Catch hand-edits to generated docs at PR time, not at next-deploy time. Pages
under `docs/skills/`, `docs/workflows/`, `docs/showcase/`, and the file
`docs/reference/commands.md` are produced by the 3 generator scripts
(`generate-skill-pages.py`, `generate-workflow-pages.py`,
`generate-showcase.py`). Editing those output files directly is a silent-rot
class: the edit lands, the next generator run silently overwrites it, and the
"fix" is gone with no audit trail.

This validator re-runs all 3 generators into a temp workspace and diffs the
fresh output against the committed files. Any drift fails CI with the diff
shown so the contributor can either re-run generators (the right answer) or
edit the source (the deeper right answer).

## Pairs with

Bucket A.4 Pattern 5C (frontmatter `generated: true` flag). Every generated
page now declares itself as generated in frontmatter. A diff-based check is
strictly stronger than a flag-presence check (a hand-edit could keep the flag
intact), so this validator subsumes flag enforcement.

## Usage

```bash
./scripts/check-generated-content-untouched.sh
```

```powershell
pwsh -File ./scripts/check-generated-content-untouched.ps1
```

## What It Does

1. Snapshots the watched output paths (current committed state) into a temp
   workspace.
2. Runs all 3 generators in place. They overwrite the working-tree files.
3. Stashes the regenerated outputs into a parallel temp location.
4. Restores the snapshot back into the working tree (the validator must not
   mutate the working tree).
5. Diffs snapshot vs regen with line-ending normalization (`--strip-trailing-cr`
   on bash, `\r\n -> \n` replace on PowerShell). This avoids flagging
   pure CRLF/LF noise as drift on Windows checkouts.
6. Fails with a diff or a per-file drift list if any committed file differs
   from generator output.
7. Cleans up the temp workspace.

## Watched paths

| Path | Coverage |
|------|----------|
| `docs/skills/` | 38 individual skill pages + 8 phase index pages |
| `docs/workflows/` | 9 workflow pages + 1 index |
| `docs/showcase/` | 3 thread pages + 1 index |
| `docs/reference/commands.md` | 1 commands reference page |

**Total: 63 generated pages** as of v2.13.0.

## Failure mode

When this validator fails, the fix is almost always one of:

1. **Drift from a hand-edit**: someone edited a generated file directly.
   Fix: edit the source instead, then run the generator. For skill pages,
   the source is `skills/{name}/SKILL.md`. For workflow pages,
   `_workflows/{name}.md`. For showcase pages, `library/skill-output-samples/`.

2. **Generator change without regen**: someone modified a generator script
   but did not re-run it. Fix:
   ```bash
   python3 scripts/generate-skill-pages.py
   python3 scripts/generate-workflow-pages.py
   python3 scripts/generate-showcase.py
   ```
   Commit the regenerated output along with the generator change.

3. **Source change without regen**: someone edited a `skills/*/SKILL.md`,
   `_workflows/*.md`, or sample file but did not re-run the corresponding
   generator. Same fix as #2.

## Posture

**Enforcing.** Generated-content drift is silent rot; advisory mode would
let it slip through. Bucket A.4 (Pattern 5C frontmatter flag) plus this
diff check is the full silent-rot defense.

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All committed generated content matches generator output |
| `1`  | Drift detected, or generator script failed to run |

## Implementation notes

- Generators write into the working tree. The validator snapshots first so
  it can restore after, leaving the working tree exactly as it found it.
- Generators are deterministic: they sort iteration order
  (`sorted(SKILLS_DIR.iterdir())`, `sorted(skills, key=...)`) and Python's
  insertion-ordered dicts (3.7+) preserve THREADS / PHASE_SKILLS order. So
  re-running the same generator on the same source produces byte-identical
  output.
- Line-ending normalization is required because Windows worktrees with
  `core.autocrlf=true` write CRLF on checkout while the snapshot/regen
  writes platform-native. Without normalization, every file would diff.
