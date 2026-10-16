# Clean Worktree Cut/Tag/Publish Runbook (retired)

Status: **Retired 2026-10-16.** Do not follow this document, and do not edit it.

The release runbook is [`site/src/content/docs/contributing/release-runbook.md`](../../../site/src/content/docs/contributing/release-runbook.md): the six gates G0 to G4, the no-bypass policy and the rollback paths. External surfaces, such as the GitHub About description, topics and the skills.sh listing, are rows in [`checklist_doc-update-and-hygiene.md`](checklist_doc-update-and-hygiene.md), which G4 sub-check 9 points at.

This file was the manual flow from v2.15.1. It had drifted from every decision made after it: its baseline section was pinned at v2.5.0, it carried a full parallel `pm-skills-mcp` release track although that package has been frozen at v2.9.3 since 2026-05-05, and it referenced a doc-stack file that no longer exists. Its two still-valid v2.32.0 sections, the phantom-minor window and the generator-owned About string, now live in the canonical runbook and the checklist. See [#269](https://github.com/product-on-purpose/pm-skills/issues/269).

The path is kept so that older links from the CHANGELOG, release notes and audit documents still resolve. The full former text is in git history, for example `git show v2.33.0:docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`.
