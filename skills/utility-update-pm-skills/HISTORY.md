# utility-update-pm-skills - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.0.1 | 2026-07-04 | v2.30.0 | M-35 | patch | File Scope now documents `agents/` and `hooks/` as delivered in the release zip (WS-T2 packaging integrity). No flow change. |
| 1.0.0 | 2026-04-09 | - | - | baseline | Prior published version: check for a newer release, compare versions, preview the delta, update local files after confirmation, and write a structured update report. |

## 1.0.1 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit found the curated release zip omitted the `agents/` sub-agent docs and the `hooks/` activation hooks that the dispatch skills need at runtime (P0-2). WS-T2 adds both to `build-release.sh`/`.ps1`. This skill's File Scope section documented the zip contents, so it is updated to match: the included-paths table now lists `agents/` and `hooks/`, and the intro notes they ship as of v2.30.0.

### Changes
- Added `agents/` and `hooks/` rows to the "Files included in the release ZIP" table.
- Noted in the File Scope intro that the zip carries the sub-agent definitions and activation hooks as of v2.30.0.

No change to the update flow (pre-flight, preview, confirm, update, report) or the output contract; this is a documentation-currency patch tracking the packaging fix.

## 1.0.0 (2026-04-09)

Baseline row for the prior published version; see git history for its changes.
