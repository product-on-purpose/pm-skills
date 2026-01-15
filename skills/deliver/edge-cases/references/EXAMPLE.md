---
artifact: edge-cases
version: "1.0"
created: 2026-01-14
status: complete
context: File upload feature for document management system
---

# Edge Cases: File Upload

## Feature Overview

Users can upload documents (PDF, Word, images) to their workspace. Files are stored in cloud storage with metadata in our database. Maximum file size is 100MB, with a limit of 50 files per upload batch.

**Related Documents:**
- PRD: Document Upload Feature (PRD-2026-012)
- Design: Upload Flow Mockups (Figma/uploads-v2)

## Edge Case Categories

### Input Validation

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| No file selected | Submit button disabled, tooltip: "Select files to upload" | P1 | Prevent empty submissions |
| File has no extension | Reject with error: "File type could not be determined" | P2 | Security: don't guess types |
| File extension doesn't match content | Reject with error: "File appears corrupted or mislabeled" | P1 | MIME type validation |
| Filename contains special characters | Accept but sanitize: replace with underscores | P2 | Allow unicode, strip \/:<>*? |
| Filename exceeds 255 characters | Truncate to 255, preserve extension | P3 | Show truncation warning |
| Filename is empty (just extension) | Reject with error: "Please provide a filename" | P2 | e.g., ".pdf" alone |
| Duplicate filename in same folder | Append "(1)", "(2)" etc. automatically | P2 | Show rename notification |

### Boundary Conditions

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| File exactly 100MB | Accept | P1 | Boundary acceptance |
| File 100MB + 1 byte | Reject: "File exceeds 100MB limit" | P1 | Clear limit enforcement |
| File is 0 bytes | Reject: "File appears to be empty" | P2 | Prevent empty file uploads |
| 50 files in batch (max) | Accept all | P1 | Batch limit boundary |
| 51 files in batch | Reject batch: "Maximum 50 files per upload" | P1 | Pre-upload validation |
| Single file with 50 already in folder | Accept (folder limits are separate) | P3 | Clarify vs batch limit |

### Error States

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Network failure during upload | Pause upload, show "Connection lost. Retry?" | P1 | Auto-retry 3x before asking |
| Network failure mid-file | Resume from last chunk when reconnected | P1 | Chunked upload recovery |
| Storage quota exceeded | Reject: "Storage full. Free up space or upgrade." | P1 | Check before upload starts |
| File locked/in use (Windows) | Reject: "File is in use. Close it and try again." | P2 | Clear guidance |
| Upload session expires (>1 hour) | Restart upload with warning | P2 | Token refresh failed |
| File deleted locally during upload | Skip file, continue others: "1 file no longer available" | P2 | Non-blocking failure |
| Server error (5xx) | Show "Upload failed. Please try again." + retry button | P1 | Generic fallback |
| Malware detected by scanner | Reject file, quarantine, notify admin | P1 | Security critical |

### Concurrency

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| User double-clicks upload | Ignore second click (button disabled during upload) | P1 | Prevent duplicate uploads |
| User navigates away during upload | Warning: "Upload in progress. Leave anyway?" | P1 | Confirmation dialog |
| User starts second upload batch | Queue second batch, show queue UI | P2 | Or reject with "upload in progress" |
| Same file uploaded simultaneously by 2 users | Both succeed with unique versions | P3 | Conflict resolution via versioning |
| User refreshes page during upload | Upload cancelled, show restart option on return | P2 | Cannot persist upload state |

### Integration Failures

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Cloud storage unavailable | Retry 3x, then "Upload temporarily unavailable" | P1 | 30-second timeout |
| Virus scanner timeout | Proceed with upload, flag for async scan | P2 | Don't block on slow scans |
| Virus scanner unavailable | Proceed with upload, flag for later scan | P2 | Queue for retry |
| Metadata service failure | Upload to storage, queue metadata write | P2 | Eventually consistent |
| Thumbnail generation failure | Upload succeeds, show generic icon | P3 | Non-critical failure |

## Error Messages

| Error State | User Message | Additional Action |
|-------------|--------------|-------------------|
| File too large | "This file is too large. Maximum size is 100MB." | "Compress file" link to help |
| Unsupported type | "This file type isn't supported. Try PDF, Word, or images." | List of supported types |
| Network failure | "Connection lost. Check your internet and try again." | [Retry] button |
| Storage full | "You've run out of storage space." | [Upgrade] or [Manage storage] |
| Permission denied | "You don't have permission to upload here." | [Request access] |
| Upload failed (generic) | "Something went wrong. Please try again." | [Retry] + [Contact support] |
| Malware detected | "This file was blocked for security reasons." | [Learn more] |

## Recovery Paths

### Network Failure During Upload

**User sees:** Progress bar pauses, toast notification: "Connection lost. Retrying..."

**Recovery options:**
1. Automatic retry (3 attempts, 5-second intervals)
2. Manual retry button after auto-retry exhausted
3. Cancel upload and start over

**Data preservation:** Completed file chunks preserved. Upload resumes from last successful chunk.

### Storage Quota Exceeded

**User sees:** Modal: "You've run out of storage space. You're using 10GB of 10GB."

**Recovery options:**
1. Click "Manage storage" to delete files
2. Click "Upgrade plan" for more space
3. Cancel upload, files not uploaded

**Data preservation:** No partial upload — check happens before transfer starts.

### Session Expired During Long Upload

**User sees:** Toast: "Your session expired. Please sign in to continue."

**Recovery options:**
1. Sign in via modal (doesn't lose page state)
2. If sign-in succeeds, upload auto-resumes
3. If sign-in fails, upload cancelled

**Data preservation:** Upload progress preserved during re-auth attempt.

## Test Scenarios

### Must Test (P1)

- [ ] Upload file exactly 100MB — should succeed
- [ ] Upload file 100MB + 1KB — should fail with size error
- [ ] Upload 50 files at once — should succeed
- [ ] Upload 51 files at once — should fail with batch limit error
- [ ] Disconnect network mid-upload — should pause and recover
- [ ] Upload .exe disguised as .pdf — should be rejected (MIME check)
- [ ] Double-click upload button — should only upload once

### Should Test (P2)

- [ ] Upload file with unicode filename — should sanitize
- [ ] Upload file with 300-character name — should truncate
- [ ] Upload 0-byte file — should fail
- [ ] Upload duplicate filename — should auto-rename
- [ ] Navigate away during upload — should show warning
- [ ] Storage 99% full, upload 2% of quota — should fail

### Nice to Test (P3)

- [ ] Upload when thumbnail service down — should succeed with generic icon
- [ ] Two users upload same file simultaneously — both should succeed
- [ ] Upload file with only extension (.pdf) — should fail
