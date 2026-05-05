# validate-references-cross-doc.sh / validate-references-cross-doc.ps1

## Purpose

Catch cross-doc reference rot in `docs/reference/` at PR time. Reference docs
are lookup material that other docs link to. When a reference doc breaks an
internal link or names a skill that no longer exists, downstream readers hit
404s on the rendered site or land on misleading information.

This validator runs two checks scoped specifically to the reference subset
(scoped narrower than `check-internal-link-validity`, which scans the entire
docs tree as advisory):

1. **Link resolution**: Every markdown link `[text](path)` in
   `docs/reference/**/*.md` must resolve to an existing target.
2. **Skill-name cross-check**: Every skill name listed in the Category
   Distribution table of `docs/reference/categories.md` must correspond to
   an actual skill in `skills/` (matched by stripping the phase prefix from
   the directory name).

## Pairs with

Bucket A (doc structure refactor) for the stable file set this validator
relies on. The post-A reorg moved several PM-Skills-specific files into
`reference/` and `guides/`; this validator establishes a hard floor against
those moves drifting back into broken state.

## Usage

```bash
./scripts/validate-references-cross-doc.sh
```

```powershell
pwsh -File ./scripts/validate-references-cross-doc.ps1
```

## What It Does

### Check 1: Link resolution

1. Walks `docs/reference/**/*.md` (includes `skill-families/` subdirectory).
2. For each file, extracts every markdown link target via the regex
   `\]\(([^)]+)\)`.
3. Filters out non-file targets:
   - URLs (`http://`, `https://`, `ftp://`, `mailto:`, `tel:`)
   - Anchor-only links (`#section`)
   - Template placeholders (`{{x}}`, `<x>`, `>x>`) - these appear in contract
     and spec docs as syntax examples, not real links
4. Strips trailing `#anchor` fragments from each path.
5. Resolves the path relative to the source file's directory (or to repo root
   if the path is absolute, starting with `/`).
6. Normalizes via `realpath -m` (bash) or `Path.GetFullPath` (PowerShell) to
   collapse `..` and `.` segments.
7. Fails if the normalized path does not exist on the filesystem.

### Check 2: Skill-name cross-check

1. Builds a canonical command-name set by walking `skills/*/`. For each
   directory, strips any of the 8 known phase prefixes (`discover-`,
   `define-`, `develop-`, `deliver-`, `measure-`, `iterate-`, `foundation-`,
   `utility-`) to get the bare command name. Both forms (prefixed and
   stripped) are accepted as valid mentions.
2. Extracts the Category Distribution table block from `categories.md`
   (everything between `## Category Distribution` and the next `##`).
3. For each table row with at least 3 pipes, extracts the third column
   (the comma-separated list of skill names).
4. Splits on comma, trims whitespace and backticks.
5. Skips totals rows (`**Total**`, `Total`) and pure-formatting cells.
6. Fails for any name not in the canonical set.

## Posture

**Enforcing.** The post-Bucket-A `docs/reference/` set is small (8 files
including `skill-families/meeting-skills-contract.md`) and clean. New
broken refs introduced by future PRs should fail CI immediately rather
than accumulate.

The broader `check-internal-link-validity` validator (Wave 3 item 10)
remains advisory across all of `docs/`. The two are complementary: this
narrow + enforcing check protects the reference subset; the wide +
advisory check surfaces drift everywhere else without blocking PRs.

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All cross-doc references resolve and all skill mentions are valid |
| `1`  | One or more findings (broken links or unknown skill names) |

## False-positive notes

The validator deliberately skips:

- **URL schemes**: external links are out of scope (covered by network-
  dependent tooling like `lychee` if/when added).
- **Anchor-only links** (`#section`): these target sections within the
  same document and are validated by mkdocs at build time.
- **Template placeholders**: `{{path}}`, `<variable>`, etc. These appear
  in contract docs (e.g., `meeting-skills-contract.md` shows
  `[{{filename}}]({{path}})` as a literal syntax example). Treating these
  as real link targets would cause persistent false positives.

## Failure modes

When this validator fails, the fix is one of:

1. **Renamed target without updating reference**: a file was moved or
   deleted and a reference doc still links to the old path. Fix: update
   the link, or restore the target if the rename was unintended.
2. **New skill mention without matching skill**: a skill name was added to
   `categories.md` Distribution table but the skill itself is not in
   `skills/`. Fix: add the skill, or remove the orphan name.
3. **Renamed skill without updating categories**: a skill directory was
   renamed but `categories.md` still lists the old name. Fix: update
   `categories.md` to reference the new name.
