---
scenario: file-upload
skill: deliver-edge-cases
family: specification
created: 2026-06-14
---

# Scenario: profile-photo and document upload

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce an edge-case catalog for it.
Judges never see this header.

## Feature brief

**Product:** a consumer mobile + web app (a freelancer marketplace). Users upload a profile photo and
up to 5 portfolio documents (PDF/PNG/JPG) when building their profile.

**How it should work (intended behavior):**
- Users pick files from the device (camera, photo library, or file picker) and see a thumbnail
  preview before confirming.
- Profile photo: square crop, max 10 MB, JPG/PNG only.
- Portfolio documents: max 5 files, each up to 25 MB, PDF/PNG/JPG.
- Uploads show a progress bar and can be canceled mid-upload.
- A virus/malware scan runs server-side before a file is accepted.

**Known constraints and concerns the team has raised:**
- Mobile users are often on **flaky cellular connections**; an upload can stall or drop partway.
- Files can be **corrupt**, **zero-byte**, **wrong type despite the extension**, or **far over the
  size limit**.
- A user can **background the app** or **lock the phone** mid-upload.
- The malware scan can **fail, time out, or flag a file**.
- Two devices logged into the same account can **upload at the same time**.
- Storage has a per-account **quota**; a 6th portfolio file or an over-quota upload must be handled.
- Image files can carry **EXIF orientation** and location metadata.
- The feature must be **accessible** (screen-reader labels for upload state, no color-only error
  signaling) and work offline-to-online (queue then sync).

**Explicitly out of scope:** video upload, bulk/folder upload, and third-party cloud imports (Google
Drive, Dropbox).
