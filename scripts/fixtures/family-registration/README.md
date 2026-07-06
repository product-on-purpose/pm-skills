# Family-registration fixture (WS-Z4)

A committed mini-repo used by [`scripts/validate-skill-family-registration.test.mjs`](../../validate-skill-family-registration.test.mjs)
to lock the end-to-end verdict of the single-source `validate-skill-family-registration.mjs`
validator, which was ported from the retired bash + PowerShell pair in v2.31.0 (WS-Z4).

## What it exercises

`repo/` holds one family (`demo-family`) whose contract exists and whose three declared
members deliberately hit every branch:

- `demo-present` - directory + SKILL.md present, references the contract path -> PASS
- `demo-noref`   - directory + SKILL.md present, does NOT reference the contract -> FAIL
- `demo-missing` - no directory at all -> FAIL

A correct run reports the contract present, one passing member, two failing members, and
exits 1. The validator reads the tree through the filesystem (no `git`), so the fixture
does not need to be a nested git repo; the checker is pointed at it with `--root repo`.

Before the shells were deleted, the port was proven to produce the identical verdict to
both `validate-skill-family-registration.sh` and `.ps1` against this fixture (exit 1, same
FAIL set) and against the real repo (exit 0, all real families intact).
