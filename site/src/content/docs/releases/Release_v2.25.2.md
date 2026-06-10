---
slug: releases/Release_v2.25.2
title: Release v2.25.2
description: pm-skills v2.25.2 is a maintenance patch that unifies the release-gate validator inventory behind a single manifest with an enforcing CI parity referee, hardens the release gate, and closes the remaining 2026-06-06 Codex audit items. No new skills.
---

**Released 2026-06-10.** Maintenance PATCH. No new skills; the catalog stays 65 skills / 5 sub-agents.

## Summary

v2.25.2 resolves the remaining items from the 2026-06-06 Codex audit and hardens the release gate itself. Its centerpiece is a single source of truth for the release-gate validator inventory plus an enforcing CI referee that prevents the bash, PowerShell, and CI inventories from drifting, the class of defect behind two prior P0 incidents.

## What changed

### Added

- **Validator-inventory manifest** (`scripts/validation-manifest.yaml`): one declared source of truth for every release-gate shell validator, with its local pre-tag tier, CI level, and per-shell flags.
- **Parity referee** (`scripts/check-validator-parity.mjs`, enforcing in CI on both OS legs): fails the build if the bash bundle, the PowerShell bundle, or the CI workflow drifts from the manifest. It compares each OS leg's args and enforcement, so CI can no longer drop a flag from one leg or make a single OS leg advisory without being caught. Reconciling it to green surfaced a live drift: `validate-skill-family-registration` and `validate-plugin-install` were enforcing in CI but absent from both local bundles.

### Changed

- **`check-root-doc-links`** now also scans the source surfaces (`skills/`, `agents/`, `_workflows/`, `commands/`) in addition to repo-root markdown, with a Pattern S relocation alias. This closes the class where source links to the retired `docs/reference/...` paths rotted invisibly to GitHub readers.
- **`check-emdash-scars`** is now enforcing (previously advisory) and skips inline-code spans, including multi-backtick spans.

### Fixed

- Corrected the `CLAUDE.md` claim that internal notes are gitignored (`docs/internal/` is tracked and visible to anyone browsing the repo).
- `validate-skill-history` now reads the nested `metadata.version`; the release conductor and auditor agents and the runbook were repointed to their live `site/src/content/docs/...` paths.

## Pre-release verification

A `codex:adversarial-review` of the `v2.25.1..HEAD` diff ran before the tag. It surfaced 1 P1 (the referee ignored CI args and per-OS enforcement) and 2 P2 (a multi-backtick scar false positive; a plan-wording overstatement), all resolved before tagging. The referee and scar guard carry 25 unit tests, and the pre-tag bundle passes on both shells.

## Upgrade

No action required. No skill behavior change and no published-URL change.

Full detail: root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2252---2026-06-10).
