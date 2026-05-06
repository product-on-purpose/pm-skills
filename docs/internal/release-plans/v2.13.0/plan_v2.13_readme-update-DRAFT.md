# v2.13.0 README updates (DRAFT)

> **Draft status:** this file collects the README updates needed at PR.5 / Phase 5 tag-time. Each block below is a search-and-replace pair against the canonical `README.md`. Do not promote to `README.md` until the v2.13.0 tag is being cut.

---

## Update 1: README "What's New (Recent Releases)" section

### Replace

The current `README.md` "What's New" section starts with the v2.12.0 entry as the topmost open `<details>` block. Add a new v2.13.0 entry above it as the new topmost open block; collapse the v2.12.0 entry by changing `<details open>` to `<details>`.

### Old (current state, v2.12.0 is the topmost open block)

```markdown
<!-- count-exempt:start -->
<details open>
<summary>v2.12.0 - OKR Skills Launch</summary>

- **OKR Skills set**: first release with the OKR write-and-score pair...
```

### New (v2.13.0 topmost open; v2.12.0 collapsed)

```markdown
<!-- count-exempt:start -->
<details open>
<summary>v2.13.0 - Foundation Hardening + Doc Stack Decision</summary>

- **Refactor + decision release; zero new skills.** v2.13.0 ships three coherent strands of foundation hardening plus one deciding artifact. The skill catalog stays at 40 (26 phase + 8 foundation + 6 utility); workflows stay at 9; commands stay at 47; library samples stay at 126.
- **Doc consistency overhaul** (Buckets A and B): docs now Diataxis-aligned (concepts = generic; reference = lookup; guides = how-to). `pm-skill-*` filename prefix convention locked for PM-Skills-specific content. 4 legacy duplicate files deleted; `docs/frameworks/` retired with redirect; `creating-skills.md` consolidated to `creating-pm-skills.md`. All 63 generated pages now carry a `generated: true` frontmatter flag and a "do not edit" admonition.
- **CI hardening** (Bucket C): 12 items including 5 PowerShell parity bugfixes, `check-count-consistency` tightened and promoted to enforcing, and 7 new validators (`check-nav-completeness`, `check-generated-content-untouched`, `validate-references-cross-doc`, `validate-docs-frontmatter`, `check-internal-link-validity`, `check-version-references`, `validate-skill-family-registration`). Validator inventory grows from 15 to 22; enforcing tier doubles from 5 to 10.
- **Material to Zensical compatibility spike** (Bucket D): time-boxed deciding artifact for v2.14.0+. **Outcome: NO-GO.** Two BLOCKERs in Zensical 0.0.40 (`mkdocs-redirects` plugin not honored; `exclude_docs:` not honored) make migration unsafe at this maturity level. Stay on MkDocs Material through v2.14.0+. Re-spike when both blockers resolve upstream.
- **Out-of-cycle: pm-skills-mcp maintenance mode.** v2.9.2 announced the pivot; v2.9.3 followed two hours later as a security-patch that cleared all 8 open Dependabot moderate advisories. 2-hour announcement-to-patch turnaround validated the maintenance-mode commitment in operational practice. Catalog frozen at v2.9.2 build (40 skills, 11 workflow tools, 8 utility tools = 59 tools).
- **Phase 0 Adversarial Review Loop** applied across per-strand and release-state layers. PR.1 (per-strand) closed via 4 Codex tasks. PR.2 (release-state) converged across 5 Codex review rounds + 3 resolution passes (8 numbered rounds total). Each Codex round caught a deeper layer of stale-summary text introduced by the previous round's resolution: round 1 found 6 IMPORTANT + 3 MEDIUM + 1 MINOR; round 2 caught 4 of 6 round-1 IMPORTANTs persisting as stale-status-block-text + 2 new MEDIUM + 1 new MINOR; round 4 caught next-layer drift (gate-table row + sibling index file); round 5 caught draft-file audit-trail misrepresentation + further status-block drift (4 new IMPORTANT + 1 new MEDIUM); round 6 was a comprehensive resolution sweep across the full release stack rather than another incremental fix; round 7 caught 2 remaining audit-trail correctness defects in the sweep itself. Round 8 resolved them. Same defect class as the codified `feedback_stale-aggregate-counter` memory, applied at meta level. The 8-round depth itself catalogued the pattern: every gate closure must sweep ALL release-stack docs simultaneously, and mid-loop summary text freezes in-progress claims that need a final correctness pass before promotion.

</details>

<details>
<summary>v2.12.0 - OKR Skills Launch</summary>

- **OKR Skills set**: first release with the OKR write-and-score pair...
```

(Collapse the v2.12.0 details block by changing `<details open>` to `<details>` and leave its content unchanged.)

---

## Update 2: README "Latest stable" / "Latest release notes" / "Published tag" pointers

### Find this block

```markdown
- **`pm-skills-vX.X.X.zip`** . Complete package with all skills, commands, workflows, and documentation
- **Latest stable:** `v2.12.0` (OKR Skills Launch: foundation-okr-writer + measure-okr-grader)
- **Latest release notes:** [CHANGELOG.md](CHANGELOG.md#2120---2026-05-03)
- **Published tag:** [`v2.12.0`](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.12.0)
- **Documentation site:** [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/)
```

### Replace with

```markdown
- **`pm-skills-vX.X.X.zip`** . Complete package with all skills, commands, workflows, and documentation
- **Latest stable:** `v2.13.0` (Foundation Hardening + Doc Stack Decision)
- **Latest release notes:** [CHANGELOG.md](CHANGELOG.md#2130---2026-05-XX)
- **Published tag:** [`v2.13.0`](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.13.0)
- **Documentation site:** [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/)
```

(Replace `2026-05-XX` with the actual tag date when the tag is cut.)

---

## Update 3: Download badge (auto-updates)

The "Download Latest" badge at the end of the Releases section auto-updates from GitHub Releases:

```markdown
[![Download Latest](https://img.shields.io/github/v/release/product-on-purpose/pm-skills?style=for-the-badge&label=Download&color=brightgreen)](https://github.com/product-on-purpose/pm-skills/releases/latest)
```

No edit needed; once the v2.13.0 tag and GitHub Release are published, the shield reflects v2.13.0 automatically.

---

## Update 4: docs/releases/index.md

Add a new top row for v2.13.0 above the v2.12.0 row in the releases table.

### Find

```markdown
| Version | Date | Highlights |
|---------|------|-----------|
| [v2.12.0](Release_v2.12.0.md) | 2026-05-01 | OKR Skills Launch: foundation-okr-writer + measure-okr-grader pair covering the full quarterly write-and-score cycle; 38 to 40 skills; 6 new thread-aligned samples; Phase 0 Adversarial Review Loop applied |
```

### Replace with

```markdown
| Version | Date | Highlights |
|---------|------|-----------|
| [v2.13.0](Release_v2.13.0.md) | 2026-05-XX | Foundation Hardening + Doc Stack Decision: refactor + decision release with zero new skills (40 unchanged); 7 new CI validators (15 to 22 inventory; enforcing tier 5 to 10); doc consistency overhaul (Diataxis-aligned + pm-skill-* prefix); Pattern 5C generated-content marker on 63 pages; Material to Zensical compatibility spike returned NO-GO; Phase 0 Adversarial Review Loop applied across per-strand and release-state layers (5 review rounds converged) |
| [v2.12.0](Release_v2.12.0.md) | 2026-05-01 | OKR Skills Launch: foundation-okr-writer + measure-okr-grader pair covering the full quarterly write-and-score cycle; 38 to 40 skills; 6 new thread-aligned samples; Phase 0 Adversarial Review Loop applied |
```

(Replace `2026-05-XX` with actual tag date at tag time.)

---

## Update 5: Em-dash audit pre-promotion

Before promoting any of these blocks to `README.md` / `CHANGELOG.md` / `docs/releases/Release_v2.13.0.md` / `docs/releases/index.md`, run a final em/en-dash audit on the destination files:

```bash
python -c "
import sys; sys.stdout.reconfigure(encoding='utf-8')
files = ['README.md', 'CHANGELOG.md', 'docs/releases/Release_v2.13.0.md', 'docs/releases/index.md']
for f in files:
    with open(f, encoding='utf-8') as fh:
        c = fh.read()
    em = c.count(chr(0x2014))
    en = c.count(chr(0x2013))
    if em or en: print(f'{f}: em={em} en={en}')
print('All clean' if all(open(f, encoding='utf-8').read().count(chr(0x2014))+open(f, encoding='utf-8').read().count(chr(0x2013))==0 for f in files) else 'STALE FOUND')
"
```

---

## Promotion checklist (Phase 5)

When promoting these drafts at tag-prep time:

- [ ] Replace `2026-05-XX` placeholders with the actual tag date in all four updates
- [ ] Apply Update 1 to `README.md` (new v2.13.0 What's New block; collapse v2.12.0)
- [ ] Apply Update 2 to `README.md` (Latest stable / release notes / published tag pointers)
- [ ] Verify Update 3 (no action; download badge auto-updates after release publish)
- [ ] Apply Update 4 to `docs/releases/index.md` (new top row)
- [ ] Promote `plan_v2.13_release-notes-DRAFT.md` to `docs/releases/Release_v2.13.0.md` (rename or copy plus title-frontmatter cleanup)
- [ ] Promote `plan_v2.13_changelog-DRAFT.md` content to `CHANGELOG.md` (paste the v2.13.0 entry above the v2.12.0 entry)
- [ ] Run Update 5 em-dash audit; fix any findings
- [ ] Run `bash scripts/validate-references-cross-doc.sh` and `bash scripts/check-internal-link-validity.sh` to verify the new release-notes cross-references resolve
