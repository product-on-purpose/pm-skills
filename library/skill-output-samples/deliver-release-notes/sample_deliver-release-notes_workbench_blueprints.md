---
title: "Deliver Release Notes: Workbench Blueprints"
description: "Workbench enterprise collaboration platform - Workbench 3.5 release notes for Blueprints GA."
artifact: release-notes
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform - Workbench 3.5 release notes for Blueprints GA
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample Output 03 - deliver-release-notes

Skill: deliver-release-notes
Thread: Workbench (enterprise collaboration platform)
Persona: Rachel V., Technical PM, Blueprints

## Scenario

Blueprints v1 has launched. Rachel V. is writing the customer-facing release notes for Workbench 3.5, the platform version that ships Blueprints GA. The release notes need to communicate the new capabilities to a mixed audience: ops managers who will use Blueprints daily, IT admins who need to understand SSO and provisioning, and department heads who will configure approval chains. The tone should be professional but accessible; enterprise customers expect clarity, not hype. Rachel coordinated with Derek H. (Head of Marketing) on the highlights section to ensure it aligns with the launch blog post and email campaign messaging.

The version number (Workbench 3.5) is the platform release; Blueprints v1 is the feature-level version that ships within it.

### Source Notes

- Release notes best practices for enterprise SaaS: Intercom "Writing Release Notes" guide (intercom.com)
- Feature announcement structure and tone guidelines: Slack changelog and release notes format (slack.com/changelog)
- Enterprise communication patterns for platform updates: Atlassian release notes format (atlassian.com/blog/announcements)

## Prompt

```
deliver-release-notes

I need customer-facing release notes for Workbench 3.5, which ships Blueprints GA.

**Highlights (top 2 features to call out):**
1. Blueprints with required-section enforcement -- the headline feature; reduces incomplete document submissions
2. Real-time co-editing -- powered by Yjs CRDTs; multiple authors can work simultaneously, including offline

**New features to cover:**
- Required-section enforcement (submit gated on section completeness)
- Native approval gates (sequential and parallel chains, role-based routing)
- Real-time co-editing (offline-first, presence awareness)
- Hybrid wizard/canvas creation flow
- SAML SSO integration and audit logs

**Improvements:**
- Template gallery redesign (faster browsing, search)
- Notification system updated for approval events
- Document editor performance (15% faster load time [fictional] from bundle optimization)

**Bug fixes:**
- Fixed: document auto-save occasionally failed on slow connections
- Fixed: role assignment changes did not propagate until page refresh
- Fixed: exported PDFs missing footer page numbers

**Known issues:**
- Co-editing cursor labels may overlap when 10+ editors are in the same section
- Wizard auto-disable threshold (12 sections) is not configurable by admins in v1

**Coming soon (v1.1 preview):**
- Version history for Blueprints
- Approval delegation (OOO forwarding)
- Section-level commenting
- Jira two-way sync

Tone: professional, clear, no hype. Enterprise audience.
```


## Output

# Workbench 3.5

## Highlights

### Blueprints: Complete Documents, Every Time

Workbench 3.5 introduces Blueprints, reusable document templates with required-section enforcement. When a template admin marks sections as required, the submit-for-approval button stays disabled until every required section contains content. No more incomplete documents reaching the review queue. This means approvers spend their time evaluating substance rather than sending documents back for missing sections.

Admins configure required and optional sections per template. Authors see clear visual indicators (red badge for required, grey for optional) and a progress summary as they work. Once all required sections are complete, submission is a single click.

During our closed beta with 80 enterprise accounts [fictional], required-section enforcement reduced the median time from document creation to first approval by 40% [fictional], and the empty-section rate dropped from 38% to 7% [fictional].

### Real-Time Co-Editing, Even Offline

Multiple authors can now work on the same Blueprint simultaneously. Cursor positions and selections are visible in real time, so you always know who is editing where. Presence indicators show each collaborator's name and cursor color for easy identification.

Built on conflict-free replicated data types (CRDTs), co-editing works even when you lose your connection. Edits made offline are saved locally and merged automatically when you reconnect, with no manual conflict resolution required. This is especially useful for field teams, remote contributors, and anyone working from locations with unreliable connectivity.

## New Features

**Required-section enforcement.** Template admins can mark any section in a Blueprint template as required. Authors cannot submit a Blueprint for approval until all required sections contain content. If content is removed from a required section, the submit button re-disables automatically. A progress counter near the submit button shows how many required sections remain.

**Native approval gates.** Configure approval chains directly in Workbench, with no external tools needed. Two modes are supported: sequential (approvers review in order, each seeing prior feedback) and parallel (all approvers review simultaneously). Approvers can approve, reject with a required comment, or request changes. Approval status and history are tracked on the document with full audit trail visibility.

**Real-time co-editing.** Collaborate on Blueprints in real time with presence awareness (colored cursors and name labels). Offline-first architecture means your work is always saved locally, even if your connection drops. Changes merge automatically on reconnect. Sub-document sync ensures that edits to one section do not trigger unnecessary updates in other sections.

**Hybrid wizard/canvas creation flow.** First-time Blueprint authors see a guided wizard that walks through each section with helper text and examples. After your second Blueprint, the editor defaults to a blank canvas for faster authoring. You can switch between wizard and canvas at any time.

**SAML SSO and audit logs.** Enterprise customers can now provision Workbench via SAML SSO (tested with Okta, Azure AD, and OneLogin; generic SAML 2.0 supported). A new audit log captures all Blueprint lifecycle events (created, submitted, approved, rejected, published) with actor, timestamp, and IP address. Audit logs can be exported in CSV or JSON format for compliance reporting.

## Improvements

- **Template gallery redesign.** The template gallery now loads faster and includes search and category filtering, making it easier to find the right template in organizations with large template libraries. Templates also display a preview of their section structure before creation.
- **Approval notifications.** The notification system has been updated to support approval-related events. Approvers receive in-app and optional email notifications when a Blueprint is submitted for their review, and authors are notified when their Blueprint is approved or when changes are requested.
- **Editor performance.** Document editor load time improved by approximately 15% [fictional] through bundle optimization and lazy loading of non-critical editor plugins.

## Bug Fixes

- Fixed an issue where document auto-save occasionally failed on slow network connections, causing authors to lose recent edits after a page refresh.
- Fixed a bug where role assignment changes made by an admin did not take effect until the affected user refreshed their browser. Role changes now propagate within 5 minutes.
- Fixed exported PDFs missing footer page numbers when the document exceeded 20 pages.

## Known Issues

- **Co-editing cursor overlap.** When 10 or more editors are working in the same Blueprint section simultaneously, cursor name labels may overlap and become difficult to read. We are working on a stacked-label layout for a future update.
- **Wizard threshold not configurable.** The guided wizard automatically disables for templates with more than 12 sections [fictional], defaulting to canvas mode. This threshold is not yet configurable by template admins. Configurability is planned for v1.1.

## Coming Soon

We are actively working on the following for the next Blueprints update (v1.1):

- **Version history.** View and restore previous versions of any Blueprint, with a side-by-side diff view.
- **Approval delegation.** Designate a backup approver who receives approval requests when you are out of office.
- **Section-level commenting.** Leave comments on individual Blueprint sections during review, in addition to document-level feedback.
- **Jira two-way sync.** Link Blueprints to Jira issues and keep status synchronized across both systems.

## Feedback

We would like to hear how Blueprints is working for your team. Share feedback, report issues, or request features through the in-app feedback widget (Help menu, then Send Feedback) or by contacting your account manager directly.
