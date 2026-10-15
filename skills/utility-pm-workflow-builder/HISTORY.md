# utility-pm-workflow-builder - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.0.0 | 2026-06-10 | v2.26.0 | F-14 | baseline | Initial release: guides a contributor from a workflow idea to a complete Workflow Implementation Packet in a staging area, after an overlap analysis and Why Gate against the existing workflows. |

## 1.0.0 (2026-06-10)

Released in [v2.26.0](../../site/src/content/docs/releases/Release_v2.26.0.md). Effort: F-14 (#133).

Initial release, shipped beside the `/chain` command for ad-hoc skill sequences. It takes a workflow idea, a named skill list, or a promoted `/chain` expression, and produces a draft workflow file, a draft workflow command and a cross-cutting update checklist, all in a staging area for review.

This file was added on 2026-10-15, when the per-release `skills-manifest.yaml` was retired, so that every skill carries a version history.

### Contract established
- Inputs: a workflow idea, a named skill list, or a promoted `/chain` expression
- Overlap analysis against the existing workflows, with a Why Gate before anything is drafted
- Output: a Workflow Implementation Packet written to a staging area for review
