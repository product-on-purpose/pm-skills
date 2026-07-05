# pre-tag-validate

Runs every truly-enforcing validator before cutting a release tag.

## Why this script exists

The `feedback_pre-tag-validator-bundle.md` memory rule (codified 2026-05-16) says: "before cutting a release tag, run every truly-enforcing validator including count-consistency + generated-content-untouched + family validators with --strict, not just the 4-validator subset that 'feels green.'" v2.15.0 surfaced two post-tag CI gaps that bundled validation would have caught pre-tag.

Before v2.15.1, this rule existed only as a memory entry and was easy to miss when cutting a tag in a hurry. This script codifies the rule into a single command: `bash scripts/pre-tag-validate.sh` (or `pwsh scripts/pre-tag-validate.ps1`).

## What it runs

Required (must pass; will exit 1 on failure):

1. `lint-skills-frontmatter`
2. `validate-agents-md`
3. `validate-commands`
4. `validate-meeting-skills-family`
5. `validate-foundation-sprint-skills-family --strict`
6. `validate-design-sprint-skills-family --strict`
7. `check-internal-link-validity --strict`
8. `validate-docs-frontmatter --strict`
9. `check-no-body-h1 --strict`
10. `check-count-consistency`
11. `check-skill-cross-references` (v2.19.0)
12. `check-generated-content-untouched`
13. `validate-script-docs` (enforcing as of v2.19.0)
14. `validate-version-consistency` (enforcing version-claim check: README badge + At-a-Glance row vs plugin.json; added to the bundle in v2.19.0)

Optional (preventive validators; run if present):

15. `check-landing-page-counts --strict`
16. `check-workflow-generator-coverage`
17. `check-agents-md-command-sync`

Advisory (non-blocking; informational only):

18. `check-version-references` (advisory by design)

## When to run

Before every release tag, after the final pre-tag commit lands on the release branch (or main). Run on a clean working tree so the validators see the exact state that will be tagged.

Optionally, run nightly on main to catch silent drift between releases.

## What it does NOT do

- Cut the tag itself (that is a manual `git tag` step)
- Push the tag (manual `git push origin <tag>`)
- Update version numbers in plugin.json, marketplace.json, README badges, etc.
- Build or deploy the docs site

This script is intentionally narrow: it answers one question: "is the working tree safe to tag?"

## Usage

```bash
bash scripts/pre-tag-validate.sh                     # run everything
bash scripts/pre-tag-validate.sh --skip check-count-consistency  # skip a specific check (use sparingly)
```

```powershell
pwsh scripts/pre-tag-validate.ps1
pwsh scripts/pre-tag-validate.ps1 -Skip 'check-count-consistency'
```

## Adding new validators to the bundle

When you add a new truly-enforcing validator:

1. Add a `.sh` + `.ps1` + `.md` triplet in `scripts/`.
2. Wire it into `.github/workflows/validation.yml`.
3. Add the entry to BOTH `pre-tag-validate.sh` (`VALIDATORS` array) AND `pre-tag-validate.ps1` (`$Validators` array). Match the CI invocation exactly (same flags).
4. Update this doc's "What it runs" section.

If the validator is preventive / advisory (catches a defect class that has not yet surfaced in release), put it in the OPTIONAL list so older trees without the script gracefully skip it.

## Cross-references

- Memory: `feedback_pre-tag-validator-bundle.md`
- Audit: `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md` (finding A13)
- Runbook: `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md` (references this script as the gating step)
