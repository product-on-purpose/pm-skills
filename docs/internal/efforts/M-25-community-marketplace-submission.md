# [M-25] Community-marketplace submission (Anthropic claude-plugins-community)

Status: Planned (v2.27.0)
Milestone: v2.27.0
Issue: #202 (filed 2026-06-12; milestone v2.27.0. ID reserved by `docs/internal/roadmap.md` since 2026-05-31; verified NOT done as of 2026-06-09: no Discover-tab listing recorded anywhere)
Agent: human (submission is an external account action) + claude (validation prep, docs, verification)

## Scope

Submit the pm-skills plugin to Anthropic's community plugin marketplace (`anthropics/claude-plugins-community`) so it appears in the Discover tab of every Claude Code install; verify the listing and run an install smoke from it; keep the existing self-hosted `product-on-purpose/agent-plugins` path unchanged (dual rail). No code changes beyond anything `claude plugin validate` flags.

## Problem

pm-skills is currently discoverable only via its self-hosted marketplace (requires knowing the owner/repo), skills.sh, and the repo itself. The Discover tab is the single largest zero-cost distribution surface available, and the community marketplace's mechanics are themselves trust signals aligned with the repo's positioning: each listed plugin passes Anthropic's automated validation and safety screening and is pinned to a specific commit SHA. The competitive analysis (2026-06-12) classifies absence from it as a distribution defect, not a marketing gap: the product claims broad availability, and this path is missing.

Do not conflate with closed efforts #117 (M-15 community contribution setup) or #15 (awesome-claude-skills submission); this is the in-app marketplace, distinct from both.

## How It Works

1. **Prep:** run `claude plugin validate` against the marketplace manifest; fix anything flagged. Consider landing M-26 (`displayName`) first for listing polish (nice-to-have, not a blocker).
2. **Submit:** the in-app submission flow routes third-party plugins to the community marketplace (`anthropics/claude-plugins-community`); inclusion in Anthropic's OFFICIAL marketplace is editorial and out of scope.
3. **Verify (evidence gate):** the listing appearing in the Discover tab is the confirmation; record it (screenshot/date) plus an install smoke from the community listing. Anthropic review latency is outside our control: if the tag date arrives first, record the submission and disclose the pending state in release notes (v2.27.0 plan decision; the recording rule is the gate).
4. **Document:** install docs gain the Discover-tab path alongside the existing rails; note the SHA-pinning behavior and how updates propagate (per platform docs, community listings pin to a commit SHA, so establish the re-pin step in the release runbook's post-tag hygiene if updates require re-submission).

## Classification

- Type: distribution / documentation (no skills, no catalog change)
- New: submission record, listing verification record, install-docs update, possible G4 runbook sub-step for listing re-pin

## Exemplars

- https://code.claude.com/docs/en/discover-plugins - marketplace mechanics: community vs official, SHA pinning, validation/safety screening (accessed 2026-06-12)
- `site/src/content/docs/contributing/agentic-smoke-runbook.md` - the recording-rule pattern for evidence that lives outside CI
- The v2.26.0 install smoke record - the smoke procedure to reuse against the community listing
- `reference_marketplace-install-transport` lesson (memory) + v2.21.0 release plan - the self-hosted marketplace rail this complements

## Deliverables

- `claude plugin validate` clean run (record): **DONE 2026-06-12, "Validation passed" against `.claude-plugin/marketplace.json` at the post-v2.26.0 tree (local main `bcbf0478` era)**
- Submission completed (record with date)
- Discover-tab listing verified + install smoke from the community listing (record; may trail the tag, disclosed if so)
- Install docs updated (README + site install page) with the Discover path
- Runbook note: post-tag re-pin/update step for the community listing if required by its update model

## Validation

- Validate run recorded clean
- Submission record exists
- Listing + smoke verified (or pending state disclosed in release notes per the plan decision)
- Self-hosted install path still passes its existing smoke (unchanged)

## Open Questions

- Update model: does a new pm-skills release require re-submission, or does the community marketplace re-sync/re-pin automatically? (Platform docs describe SHA pinning with nightly sync; confirm the maintainer-side action and encode it in the runbook.)
- Whether to submit the plugin alone or the `agent-plugins` marketplace context affects the listing form; resolve during submission prep.

## Dependencies

- None hard. M-26 (displayName) is a polish nice-to-have first; the v3.0.0 old-path retirement decision is untouched (dual rail by design, plan decision Q-D).

## Status Transitions

- Planned (current, v2.27.0)
- In Progress - when `claude plugin validate` prep starts
- Shipped - submission recorded + docs updated; listing verification recorded (possibly post-tag, disclosed)
