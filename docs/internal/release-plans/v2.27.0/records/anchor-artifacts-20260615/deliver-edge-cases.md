<!-- Anchor artifact: deliver-edge-cases (specification) | scenario file-upload | 2026-06-15 anchor run wf_c1261234-93a, G=1.
     This is the EXACT single draft all three blind judges scored. Do not edit (it is scored evidence). -->

---
artifact: edge-cases
version: "1.0"
created: 2026-06-15
status: draft
---

# Edge Cases: Profile Photo and Portfolio Document Upload

## Feature Overview

Freelancers build their profile on a consumer mobile and web marketplace by uploading a profile photo (square crop, max 10 MB, JPG/PNG) and up to 5 portfolio documents (PDF/PNG/JPG, each up to 25 MB). Users pick files from a device camera, photo library, or file picker; see a thumbnail preview before confirming; watch a progress bar during upload; and can cancel mid-upload. A server-side virus/malware scan runs before any file is accepted.

**Related Documents:**
- Profile Builder PRD (see product backlog)
- Upload UI design specs (see Figma)

## Edge Case Categories

### Input Validation

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Profile photo: no file selected, user taps Confirm | Button stays disabled or shows inline error; upload not triggered | P1 | File picker must enforce selection before proceeding |
| Profile photo: file is wrong format (GIF, HEIC, WebP, BMP) | Rejected at client before upload; clear format error shown | P1 | HEIC common on iOS; consider auto-conversion or explicit rejection message |
| Profile photo: file size exceeds 10 MB | Rejected at client before upload; error shows actual size and the 10 MB limit | P1 | Check before initiating multipart upload |
| Profile photo: file size is 0 bytes (empty file) | Rejected at client; "File appears to be empty" error | P1 | Zero-byte check must precede upload |
| Profile photo: file extension claims JPG but actual MIME type differs (e.g., a renamed GIF) | Server rejects after magic-byte inspection; user sees format error | P1 | Client check is insufficient; server must validate content type |
| Profile photo: corrupt file (header invalid, truncated) | Server rejects; user sees "Could not read this file. Try a different photo." | P1 | Occurs when file was partially transferred from another source |
| Portfolio document: file is an unsupported type (DOCX, XLSX, MP4) | Rejected at client; error lists accepted types (PDF, PNG, JPG) | P1 | File picker should filter by extension; server is the enforcement layer |
| Portfolio document: file exceeds 25 MB | Rejected at client before upload begins; error shows actual vs. allowed size | P1 | Apply per-file, not aggregate |
| Portfolio document: file is 0 bytes | Rejected at client; "File appears to be empty" error | P1 | Same zero-byte guard as photo |
| Portfolio document: filename contains special or non-ASCII characters | Sanitize filename server-side; preserve display name for UI | P2 | e.g., spaces, emoji, accented characters, path traversal sequences like `../` |
| Portfolio document: filename exceeds storage-system path limit | Truncate or hash filename server-side; return a safe stored name | P2 | S3 and most object stores have a 1024-byte key limit |
| Portfolio document: corrupt PDF (page count 0 or header invalid) | Server rejects after content inspection; "This file could not be opened. Try re-saving and uploading again." | P1 | |

### Boundary Conditions

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Portfolio: exactly 5 files already uploaded, user tries to add a 6th | Add button is disabled and shows "Portfolio limit reached (5/5)" | P1 | Enforce in UI before picker opens; also enforce server-side |
| Portfolio: user uploads exactly 5 files in one batch (at the limit) | All 5 accepted; Add button becomes disabled after success | P1 | |
| Portfolio: user has 4 files and tries to upload 2 at once (would total 6) | Reject the batch or accept only 1; inform user how many slots remain | P1 | Define which files are accepted if partial: first selected vs. user chooses |
| Profile photo: file is exactly 10 MB | Accepted | P2 | Confirm ≤ not < boundary in code |
| Profile photo: file is 10 MB + 1 byte | Rejected | P1 | Off-by-one guard |
| Portfolio document: file is exactly 25 MB | Accepted | P2 | Confirm ≤ not < boundary |
| Portfolio document: file is 25 MB + 1 byte | Rejected | P1 | Off-by-one guard |
| Per-account storage quota reached; new upload would exceed it | Upload rejected before or after transfer; clear quota error with current usage shown | P1 | Prefer pre-flight quota check to avoid wasted transfer |
| Per-account quota: upload exactly fills the remaining quota | Accepted | P2 | Edge of the quota range |
| Image dimensions: profile photo is 1 x 1 pixel | Accepted technically; UX team to decide if a minimum dimension floor is needed | P3 | Flag for design review |
| Image dimensions: profile photo is extremely large (e.g., 20000 x 20000 px) | Accept if under 10 MB, resize/crop for display; or add a pixel-count limit | P2 | Raw pixel count can cause memory issues server-side even under the byte limit |

### Error States

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Network drops mid-upload | Upload pauses; retry automatically using resumable/chunked upload; show "Upload paused - reconnecting" | P1 | Core concern on mobile cellular; partial upload must not be accepted server-side |
| Network drop then reconnect fails after N retries | Stop retrying; show error with "Try again" button; preserve the selected file so the user does not have to re-pick | P1 | N = 3 retries with exponential backoff recommended |
| Upload stalls (no bytes transferred for > 30 s) | Treat as network drop; surface the same retry flow | P1 | |
| Malware scan flags file | Reject file; show "This file was flagged and could not be uploaded. Remove it and try a different file." | P1 | Do not expose scan vendor details; log internally |
| Malware scan times out | Fail safe: reject the file; show "Upload could not be verified. Please try again." | P1 | Timeout threshold should be defined (suggested: 60 s) |
| Malware scan service unavailable | Fail safe: queue rejection or hold file in unverified state with no public access; do not expose unscanned files | P1 | Define degraded-mode policy: block all new uploads or hold for later scan |
| Server returns 5xx during upload | Retry up to N times; if all fail, show error with "Try again" and preserve selected file | P1 | |
| Server returns 413 (payload too large) | Show size error even if client-side check was bypassed | P1 | Defense-in-depth |
| Server returns 403 (permission denied / account suspended) | Show "Your account does not have permission to upload files." Do not retry. | P1 | |
| Session expires during a long upload | Prompt re-authentication; preserve selected files and resume or restart upload after login | P1 | Common on slow connections where upload spans token TTL |
| Server storage backend (e.g., object store) unavailable | User sees generic "Upload failed, please try again later"; engineers alerted via monitoring | P1 | |
| Upload completes but thumbnail generation fails | Show placeholder thumbnail; do not block profile save; retry thumbnail generation async | P2 | |
| EXIF data contains GPS coordinates | Strip GPS metadata server-side before storing the file and before generating the public URL | P1 | Privacy requirement; also strip other PII-adjacent EXIF fields |
| EXIF orientation tag causes rotated display | Apply EXIF rotation during thumbnail generation so displayed image is upright | P1 | Common on photos shot in portrait on Android/iOS |

### Concurrency

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| User taps the upload button twice quickly (double-tap) | Debounce or disable the button on first tap; only one upload attempt starts | P1 | |
| User is uploading from mobile and web simultaneously (same account) | Server enforces portfolio slot count and quota with optimistic-lock or atomic counter; last accepted upload wins; other device sees conflict error | P1 | Two devices could each start a 5th file, resulting in 6 if not locked server-side |
| Two devices upload the same filename simultaneously | Server disambiguates with UUID-keyed storage; both can succeed or one is deduplicated per product decision | P2 | Define de-dupe policy |
| User replaces profile photo while a previous photo is still being scanned | Cancel or supersede the in-flight scan; only the latest selection should be active | P1 | Prevent ghost-accepted older file from surfacing after the new one is chosen |
| User deletes a portfolio file while it is uploading | Cancel the in-flight upload cleanly; remove partial object from storage; update slot count | P1 | |
| User navigates away from the upload page mid-upload | Warn "Upload in progress - leaving will cancel it"; if user confirms, cancel cleanly | P2 | |

### Integration Failures

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Virus scan API unavailable at upload time | Block new uploads or queue for deferred scan per degraded-mode policy; do not expose unscanned files publicly | P1 | |
| Virus scan API returns unexpected response format | Log parsing error; treat as scan failure; reject file | P1 | |
| Object storage (e.g., S3) returns an error after receiving all bytes | Surface upload failure; clean up any partial multipart upload parts | P1 | Orphaned multipart parts incur storage cost |
| CDN/image-processing pipeline unavailable | Accept the raw file; serve a placeholder; retry thumbnail generation async | P2 | |
| Presigned URL for upload expires before the user starts the upload | Refresh the presigned URL silently; if refresh fails, show an error | P1 | Relevant if URL is generated when the user opens the picker, not when they confirm |
| Presigned URL expires mid-upload (very large file on slow connection) | Detect 403 mid-stream; refresh URL and resume from the last committed chunk | P1 | Requires chunked/resumable upload protocol |

## Error Messages

| Error State | User Message | Additional Action |
|-------------|--------------|-------------------|
| Wrong file format (photo) | "Please upload a JPG or PNG photo." | None; user re-picks |
| Wrong file format (document) | "Only PDF, PNG, and JPG files are accepted." | None; user re-picks |
| File too large (photo) | "Your photo is [X MB]. Photos must be under 10 MB." | None; user re-picks |
| File too large (document) | "This file is [X MB]. Each document must be under 25 MB." | None; user re-picks |
| Zero-byte / empty file | "This file appears to be empty. Please try a different file." | None |
| Corrupt or unreadable file | "We could not open this file. Try re-saving it and uploading again." | None |
| Portfolio slot limit reached | "You've reached the 5-file limit. Remove a file before adding another." | "Manage files" link |
| Account storage quota exceeded | "You've used your storage allowance. Remove files to free up space." | "Manage files" link |
| Network failure / upload stalled | "Upload paused. We'll keep trying when your connection is restored." | "Cancel" button |
| Max retries exhausted | "Upload failed. Check your connection and try again." | "Try again" button |
| File flagged by malware scan | "This file was flagged and could not be uploaded. Please remove it and choose a different file." | "Remove file" button |
| Scan service unavailable | "We could not verify this file right now. Please try again in a few minutes." | "Try again" button |
| Session expired mid-upload | "Your session expired. Please sign in again to finish your upload." | "Sign in" button |
| Server error (5xx) | "Something went wrong on our end. Please try again." | "Try again" button |
| Permission denied (403) | "Your account doesn't have permission to upload files. Contact support if this seems wrong." | "Contact support" link |

## Recovery Paths

### Network Failure Mid-Upload

**User sees:** "Upload paused. We'll keep trying when your connection is restored." Progress bar halts and shows a pause icon.

**Recovery options:**
1. Automatic: the client retries with exponential backoff when connectivity returns (no user action needed).
2. Manual: user taps "Cancel" and re-initiates the upload when on a stronger connection.

**Data preservation:** The selected file remains queued in the upload session; the user does not need to re-pick. Any bytes already acknowledged by the server (chunked upload) are preserved so transfer resumes from the last checkpoint, not from zero.

### Malware Scan Rejection

**User sees:** "This file was flagged and could not be uploaded. Please remove it and choose a different file." The file thumbnail shows an error state with a Remove button.

**Recovery options:**
1. Tap "Remove file" to clear the flagged item, then pick a different file.
2. Contact support if the user believes the flag is a false positive (link available in the error state).

**Data preservation:** No data from the flagged file is stored or publicly accessible. Other files in the same upload batch are unaffected.

### Portfolio Slot Limit (6th File Attempt)

**User sees:** "You've reached the 5-file limit. Remove a file before adding another." The Add button is disabled.

**Recovery options:**
1. Tap "Manage files" to navigate to the portfolio section and delete an existing document.
2. Cancel the new file selection and keep the current 5.

**Data preservation:** Existing 5 files are not affected.

### Session Expired Mid-Upload

**User sees:** "Your session expired. Please sign in again to finish your upload." A Sign In prompt appears over the current screen.

**Recovery options:**
1. Tap "Sign in" to re-authenticate; the upload resumes or restarts automatically after the new token is issued.
2. Dismiss and sign in later; the selected file is held in local state if the app remains open.

**Data preservation:** Bytes already committed server-side via chunked upload are retained for a grace period (suggested: 1 hour) pending re-authentication. If the session is not renewed within the grace period, the partial upload is discarded.

### Storage Quota Exceeded

**User sees:** "You've used your storage allowance. Remove files to free up space." The upload is stopped before or immediately after the server rejects it.

**Recovery options:**
1. Tap "Manage files" to review and delete existing portfolio documents.
2. Contact support to inquire about quota increases (for future paid tiers).

**Data preservation:** No new file is written. Existing files are untouched.

### Corrupt or Unreadable File

**User sees:** "We could not open this file. Try re-saving it and uploading again." The file shows an error thumbnail with a Remove option.

**Recovery options:**
1. Remove the file and export a fresh copy from the source application, then re-upload.
2. Try a different file format (e.g., re-save the PDF as a PNG screenshot).

**Data preservation:** No partial file is stored. Other files in the batch continue normally.

## Test Scenarios

### Must Test (P1)

- [ ] Upload a profile photo larger than 10 MB - verify client-side rejection before any network request
- [ ] Upload a profile photo of an unsupported type (GIF, HEIC) - verify rejection with correct error message
- [ ] Upload a zero-byte JPG as a profile photo - verify rejection with "empty file" message
- [ ] Upload a file whose extension is JPG but whose content is a GIF (magic-byte mismatch) - verify server-side rejection
- [ ] Upload a portfolio document larger than 25 MB - verify client-side rejection
- [ ] Attempt to add a 6th portfolio document - verify the Add button is disabled and error copy appears
- [ ] Upload 4 files and then attempt to upload 2 more simultaneously - verify only 1 is accepted and user is informed
- [ ] Simulate network drop at 50% upload progress - verify upload pauses, retries automatically, and resumes from checkpoint
- [ ] Simulate network drop with all retries exhausted - verify "Upload failed" error appears and the selected file is still queued
- [ ] Upload a file that triggers a malware scan flag - verify rejection with the flagged-file message and no public file exposure
- [ ] Simulate malware scan service timeout - verify file is rejected safely, not silently accepted
- [ ] Upload a photo with GPS EXIF data - verify GPS coordinates are stripped from the stored file and its public URL
- [ ] Upload a photo with an EXIF rotation tag - verify the displayed thumbnail is correctly oriented
- [ ] Expire the session token mid-upload - verify a re-authentication prompt appears and upload can resume
- [ ] Upload from two devices on the same account simultaneously, both trying to claim the 5th slot - verify only one succeeds and the other receives a conflict error
- [ ] Tap the upload confirm button twice rapidly - verify only one upload request is sent
- [ ] Cancel an in-progress upload - verify the partial object is removed from storage and the slot count is not decremented
- [ ] Upload while at the storage quota limit - verify rejection with quota message and no data written
- [ ] Server returns 5xx mid-upload - verify retry behavior and user-facing error after max retries

### Should Test (P2)

- [ ] Upload a portfolio document with a filename containing emoji and special characters - verify it is sanitized and stored safely
- [ ] Upload a profile photo of exactly 10 MB (boundary) - verify it is accepted
- [ ] Upload a portfolio document of exactly 25 MB (boundary) - verify it is accepted
- [ ] Upload a profile photo of 10 MB + 1 byte - verify it is rejected
- [ ] Upload a very high-resolution image (20000 x 20000 px) under the byte limit - verify server does not crash during thumbnail generation
- [ ] Upload from two devices simultaneously with the same filename - verify storage does not collide and both outcomes are handled per de-dupe policy
- [ ] Navigate away from the upload screen mid-upload - verify the user is warned and upload is cleanly canceled on confirmation
- [ ] Upload completes but thumbnail generation fails - verify a placeholder is shown and the profile save is not blocked
- [ ] Presigned upload URL expires before the user taps Confirm - verify the URL is silently refreshed

### Nice to Test (P3)

- [ ] Upload a 1 x 1 pixel image as a profile photo - verify acceptance (or rejection if a dimension floor is added)
- [ ] Upload a portfolio document with a filename at the maximum storage-key length - verify truncation or hashing occurs without error
- [ ] Use a screen reader and complete the full upload flow - verify all upload states (progress, error, success) have accessible labels and no color-only signaling
- [ ] Upload while the device is in offline mode, then bring the network online - verify the queued upload starts automatically
- [ ] Background the app mid-upload on mobile then foreground it - verify the upload state is accurately restored
