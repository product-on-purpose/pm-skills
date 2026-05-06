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

- **Maintenance and quality release; same 40-skill catalog as v2.12.0.** Day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the rest of the catalog is unchanged. What changed is everything around the catalog.
- **Cleaner, more navigable documentation.** Duplicate files removed; skill counts reconciled across README, getting-started, reference docs, mkdocs config, and the homepage hero (all now consistent at 40); a new Diataxis-aligned folder structure (concepts = generic; reference = lookup; guides = how-to); a `pm-skill-*` filename prefix convention that signals at a glance which docs are PM-Skills-specific vs generic agent material; every generated page clearly labeled with a `generated: true` frontmatter flag and a "do not edit" admonition pointing editors to the source.
- **For contributors and forkers, 7 new CI gates** catch documentation drift on pull requests automatically: nav completeness, generated-content untouched, cross-doc reference integrity, docs frontmatter coverage, internal link validity, version-reference consistency, and skill-family registration. The validator inventory grew from 15 to 22; the enforcing tier doubled (5 to 10). A typo in a skill cross-reference, a count that fell out of sync, a hand-edit to a generated page - all caught at PR time now.
- **For `pm-skills-mcp` users, a same-week security patch.** v2.9.3 cleared all 8 open Dependabot moderate advisories two hours after the v2.9.2 maintenance-mode announcement. The frozen catalog (40 skills + 11 workflow tools + 8 utility tools = 59 tools) is unchanged; v2.9.x is the maintenance line going forward.
- **Phase 0 Adversarial Review Loop applied** across per-strand (4 Codex tasks closed) and release-state (5 Codex review rounds + 3 resolution passes converged) layers per the v2.11.0 + v2.12.0 codification. Caught and codified a meta-level case of the stale-aggregate-counter pattern (durable feedback memory): mid-loop summary text freezes in-progress claims and needs a final correctness pass before any promotion.

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
