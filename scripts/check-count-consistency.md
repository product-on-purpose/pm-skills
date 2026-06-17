# check-count-consistency.sh / check-count-consistency.ps1

## Purpose

Detect stale hardcoded counts in documentation files. When skills, commands,
or workflows are added or removed, references like "31 skills" or "38 commands"
scattered across docs can become outdated. This script finds those mismatches.

## Usage

```bash
./scripts/check-count-consistency.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-count-consistency.ps1
```

## What It Does

1. Counts actual resources on disk:
   - Skills: directories in `skills/`
   - Commands: `.md` files in `commands/`
   - Workflows: `.md` files in `_workflows/` (excluding `README.md`)
   - Per-classification / per-phase sub-counts: derived from each skill's `metadata.classification` (foundation/utility/tool) XOR `metadata.phase` frontmatter - the source of truth for "9 foundation skills", "Phase Skills (30)", etc. (v2.27.1)
2. Scans all tracked `.md`, `.mdx`, and `.json` files (including `plugin.json` and `marketplace.json`) for patterns like `{N} skills`, `{N} commands`, `{N} workflows` with up to 3 alpha-word interstitials (e.g., `{N} AI agent skills`, `{N} best-practice product management skills`)
3. Also scans for **number-after-resource** forms that the prose pattern misses because the digit comes *after* the resource word: the shields.io badge `badge/skills-{N}` (FU-5), facts-table rows (`| Slash commands | 73 |`, `| Skills | 63 |`), and parenthetical labels (`Commands (73)`, `Skills (63)`). Added v2.20.0 after a review found stale number-after counts (`Skills (59)`, `Commands (66)`, `Slash Commands | 62`) slipping past the number-before check. Subset-qualified parentheticals (`domain skills (26)`) are excluded, mirroring the prose subset rule. It also catches **singular-resource + count-noun** forms (`63 skill directories`, `73 command markdown files`, `73 command docs`) that use the resource word as an adjective before a count-noun (directory/file/doc) - which the plural prose pattern misses - anchored to the count-noun so it does not match `command line` or `skill level`. Note: `shipped` remains a skills subset-exemption word because it appears in legitimate ratio prose ("present in 1/27 shipped skills"); the bare "N shipped skills" total form is guarded indirectly via the other surface forms on the same page.
4. Compares found numbers against actual counts
5. Reports mismatches with file path and line number

### Count-surface coverage and the two count checkers (FU-5)

The catalog count appears on many README/docs surfaces (badge, prose, At-a-Glance "facts" table, skills landing page). Two checkers divide responsibility - **do not add a third**:

- **`check-count-consistency`** (this script) is the **strict, broad total-count guard.** It scans every tracked `.md`/`.mdx`/`.json` (outside the excludes/exempt ranges) for any stale `{N} skills`/`commands`/`workflows` claim above the threshold, plus the `badge/skills-{N}` form. It is blocking in the pre-tag bundle and CI. A stale total on any prose surface, the badge, the At-a-Glance row (phrased `63 skills (...)` so it matches), or a landing page (`docs/index.mdx`, `docs/skills/index.md`) fails here.
- **`check-landing-page-counts`** is a **complementary positive-assertion** that the specific landing pages claim the correct total at all, with a historical-context escape hatch (a stale number passes if the correct count also appears, to tolerate legitimate "grew from 59 to 63" mentions). The escape hatch is intentionally NOT tightened: the strict guarantee for landing-page totals already comes from this script (which applies the threshold + subset exclusion the hatch would otherwise have to duplicate, violating the no-duplication rule).

Per-classification / per-phase sub-counts ("30 phase skills", "Utility Skills (12)") are, as of v2.27.1, **validated** against the frontmatter source of truth (see the next section) - no longer hand-maintained. Other subset words (`domain`, `shipped`, `sample`, `embedded`, `test`, `library`) and the `Phase-30_skills` badge form have no single frontmatter-derived count and remain excluded as subset descriptors or sit in exempt ranges.

### Per-classification / per-phase sub-counts (v2.27.1)

The catalog splits into four buckets: phase (skills with `metadata.phase`), foundation, utility, and tool (skills with `metadata.classification`). These appear on docs surfaces as "30 phase skills", "9 foundation skills", "Utility Skills (12)", "15 tool-classification entries", etc. Before v2.27.1 they were hand-maintained and exempt, which let a published page drift (the 26/8/6 split that survived into v2.27.0). They are now policed:

- **Source of truth.** The four counts are derived from each `skills/*/SKILL.md` frontmatter (`metadata.classification` XOR `metadata.phase`), the same way the total skill count is derived from directories. No hardcoded expected values.
- **Surface forms checked.** Number-before ("`N phase|foundation|utility skills`", "`N tool[- ]classification|skills|entries`") and parenthetical ("`<Bucket> Skills (N)`").
- **No threshold.** Unlike the total check (which skips numbers below `MIN_THRESHOLD = 10` to avoid per-phase-name prose like "5 discover skills"), the sub-count check has no threshold, because `foundation = 9 < 10` must still be policed. Per-phase-name words (discover, define, ...) are not bucket words, so they are never matched.
- **Historical mentions.** A point-in-time sub-count ("the then-six foundation skills", a release-note "all 65 skills") must be written as a word ("then-six") or wrapped in a `count-exempt` range, exactly like historical totals. A bare digit "6 foundation skills" in current prose will fail.
- **Additive, not a third checker.** This lives inside `check-count-consistency` (the strict total guard) and does not violate the "two checkers, do not add a third" rule, which is about the TOTAL-count surface. The bucket exemption for the TOTAL check is unchanged, so "30 phase skills" is still not flagged as a stale total of 66.

**Regex behavior (v2.13.0 update):** the historical 3-token interstitial allowance (`[0-9]+ ([a-zA-Z][a-zA-Z-]*[ ]+){0,3}skills`) is retained, but two additional layers of exemption now apply:

1. **Subset-descriptor exclusion.** Phrases that describe a *subset* of the total (e.g., "26 phase skills", "8 foundation skills", "40 skill commands") are no longer flagged. The validator detects subset descriptors when the digit is immediately followed by a known subset word (`phase`, `foundation`, `utility`, `domain`, `shipped`, `embedded`, `test`, `sample`, `library`, `lines?` for skills; `skill`, `workflow` for commands) and excludes that occurrence from the stale-count check. This replaces the prior `v[0-9]+\.` substring exemption, which was too broad (skipped any line with a version mention).

2. **Section-aware exemption via HTML markers.** Files can mark sections as historical or illustrative with paired markers:

   ```html
   <!-- count-exempt:start -->
   ... historical content (e.g., README "What's New" release entries) ...
   <!-- count-exempt:end -->
   ```

   The validator pre-scans every checked file for marker pairs, then skips any line in the resulting ranges. This is the canonical mechanism for explicit exemption (point-in-time release entries, illustrative example output, sample-output catalogs that contain dated counts) and is what every new historical content section should use. It gives auditable, file-scoped exemption rather than the implicit prior workaround.

Per-phase counts (Discover 3, Foundation 8) below the `MinThreshold = 10` filter are still skipped to avoid false-positive on legitimate per-phase prose. Codifying per-phase awareness is a v2.14.0+ enhancement.

Exclusions (not flagged as stale):
- `CHANGELOG.md` . historical entries are correct for their time
- `docs/releases/` . same reason
- `docs/internal/` . planning docs may reference future counts
- `skills/utility-pm-skill-auditor/references/` and the generated `docs/skills/utility/utility-pm-skill-auditor.md` . the pm-skill-auditor worked example contains an illustrative sample audit with point-in-time count tables (preserved as a historical sample); excluded so the number-after scan does not flag the sample's dated counts
- `.github/.created-issues.json` and `.github/scripts/` . tooling state and npm manifests, not docs
- `AGENTS/claude/CONTEXT.md`, `AGENTS/claude/DECISIONS.md`, `AGENTS/SESSION-LOG/` (and legacy `AGENTS/claude/SESSION-LOG/`, `AGENTS/codex/SESSION-LOG/`) . agent-internal context that legitimately references historical states
- Lines inside `<!-- count-exempt:start --> ... <!-- count-exempt:end -->` blocks
- Lines whose digit is followed by a subset descriptor (see above)

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All counts are consistent |
| `1`  | Stale counts detected |

## When to Use

- After adding or removing skills, commands, or workflows
- Before tagging a release
- In CI to catch outdated documentation

## Example Output

```
=== Count Consistency Check ===

Actual counts:
  Skills:    31
  Commands:  38
  Workflows: 9

PASS: No stale counts found in tracked .md files.
```

```
=== Count Consistency Check ===

Actual counts:
  Skills:    32
  Commands:  39
  Workflows: 10

Stale counts found:

  README.md:5: found '31 skills' (actual: 32)
  docs/guides/getting-started.md:12: found '38 commands' (actual: 39)

FAIL: One or more hardcoded counts are stale.
```

## Safety

Read-only. Does not modify any files.
