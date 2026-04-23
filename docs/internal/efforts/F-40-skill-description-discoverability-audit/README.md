# F-40 Skill Description Discoverability Audit Working Folder

In-progress specs, audit methodology, per-skill reviews, and before-and-after diffs for the description-discoverability audit.

See the effort brief at [`../F-40-skill-description-discoverability-audit.md`](../F-40-skill-description-discoverability-audit.md).

Blocked by [F-39 find-skills empirical test](../F-39-find-skills-empirical-test.md). Run F-39 first to produce gap data.

## Expected files (populated during authoring)

- `audit-methodology.md`. Detailed per-skill audit protocol
- `audit-report.md`. Per-skill findings with current description, expected-match query, gap analysis, and proposed rewrite
- `before-after-diff.md`. Side-by-side description changes for review
- `rewrite-principles.md`. Codified rules for how to improve a description while preserving accuracy and lint compliance

After landing, results feed into a v2.12.x release with patch bumps on affected skills.
