---
scenario: bulk-invite
skill: deliver-acceptance-criteria
family: specification
created: 2026-06-14
---

# Scenario: bulk-invite teammates to a workspace

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce an acceptance-criteria
artifact for it. Judges never see this header.

## Feature brief

**Product:** a B2B SaaS team workspace (project-management tool). Workspace admins manage membership.

**User story:** As a workspace admin, I want to invite several teammates at once by entering or
pasting their email addresses, so that I can onboard my team without sending invites one at a time.

**How it should work (intended behavior):**
- The invite box accepts multiple email addresses separated by commas, spaces, or newlines, or pasted
  as a single CSV column.
- Each successfully invited person receives an email with a join link valid for 7 days.
- Invites default to the "Member" role; the admin can set the whole batch to "Admin", "Member", or
  "Viewer" before sending.
- After sending, the admin sees a per-address result summary (sent / skipped / failed and why).

**Known constraints and concerns the team has raised:**
- The workspace has a **seat limit** tied to its plan; a batch can exceed remaining seats.
- A pasted batch can contain **duplicates**, addresses that are **already members**, addresses with a
  **pending invite**, **malformed** addresses, or addresses on a **corporate blocklist**.
- An admin may paste up to **~500 addresses** at once; the email provider throttles large sends.
- Admins later need an **audit trail** of who invited whom and when.
- The feature is web-based and must be **accessible** and responsive for large batches.

**Explicitly out of scope:** SSO/SCIM auto-provisioning, customizing the invite email, and changing
roles after the invite is sent.
