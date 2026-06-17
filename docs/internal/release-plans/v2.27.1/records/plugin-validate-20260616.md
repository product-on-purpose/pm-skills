# `claude plugin validate` record - v2.27.1 tree (2026-06-16)

M-25 (community-marketplace submission) resubmission-readiness evidence. The submission itself is a human external-account action (the `clau.de/plugin-directory-submission` form) and the plugin is not currently listed (prior submission rejected with no feedback; see `docs/internal/efforts/M-25-community-marketplace-submission.md`). This record refreshes the validate-clean evidence at the v2.27.1 tree so a future resubmission is unblocked on the manifest side.

## Command + result

```
$ claude plugin validate .
Validating marketplace manifest: .claude-plugin/marketplace.json

✔ Validation passed
(exit 0)
```

Run 2026-06-16 against the v2.27.1 working tree (post sub-count-gate change; version manifests at 2.27.1). Supersedes the v2.26.0-era validate record (2026-06-12, "Validation passed" at the post-v2.26.0 tree).

## Status

- M-25 stays **BEST-EFFORT / pending-human**: validate is clean; the resubmission and Discover-tab listing verification remain human actions, not gated by this tag.
- No install-docs Discover path is added in v2.27.1 (the listing does not exist yet; documenting it would be premature).
