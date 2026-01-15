# PM-Skills Repo Review

## Findings (ordered by severity)

### High

- AGENTS auto-sync overwrites manual content: `AGENTS.md` includes Workflow Bundles, Commands, Skill Structure, and Usage sections, but `.github/workflows/sync-agents-md.yml` regenerates `AGENTS.md` with only skills/bundles/commands and will drop the extra sections on any skill or bundle change. This creates documentation loss and user-facing drift. References: `AGENTS.md:153-215`, `.github/workflows/sync-agents-md.yml:24-101`.

### Medium

- Broken VISION reference in README: the repository tree lists `VISION.md` at the repo root, but the actual file lives in `_NOTES/VISION.md` (and other docs already reference `_NOTES/VISION.md`). New contributors will follow a dead path. References: `README.md:199-213`, `CONTRIBUTING.md:98`, `CHANGELOG.md:126`.
- Roadmap status is stale: `README.md` shows Phase 3 infrastructure tasks as incomplete even though `_bundles/`, `commands/`, `AGENTS.md`, and GitHub Actions exist. This undermines roadmap accuracy. References: `README.md:262-267`, `_bundles/triple-diamond.md`, `commands/prd.md`, `.github/workflows/sync-agents-md.yml`.
- Unicode diagrams/trees render as mojibake in non-Unicode terminals: box drawing and arrow glyphs in diagrams and directory trees show up as corrupted characters in CLI contexts, which directly affects agent usage in terminal-based tools. References: `README.md:64-70`, `README.md:199-213`, `AGENTS.md:188-193`, `CONTRIBUTING.md:42-45`, `_bundles/feature-kickoff.md:12-16`, `_bundles/lean-startup.md:14-34`, `_bundles/triple-diamond.md:15-36`.

### Low

- CHANGELOG references a `wrap-session` skill that does not exist in `skills/`, which makes release notes misleading for users. Reference: `CHANGELOG.md:112`.
- Skill inventory status markers are ambiguous: the Status column uses `?` with no legend, and roadmap headers include `?` placeholders. This is confusing given the 24/24 completion claim. References: `README.md:83-131`, `README.md:220-248`.

## Recommendations

- Decide whether `AGENTS.md` is authoritative and manual or auto-generated; then align the workflow to preserve required sections or move those sections into README and keep AGENTS minimal.
- Update README to reference `_NOTES/VISION.md` or move `VISION.md` to repo root and adjust all references consistently.
- Mark Phase 3 infrastructure items as complete (or explicitly list remaining work) to keep the roadmap accurate.
- Replace box drawing and arrow diagrams with ASCII-only or Markdown list equivalents; consider Mermaid diagrams if rich visuals are needed without encoding issues.
- Remove or clarify `wrap-session` in CHANGELOG, or add the missing skill if it is intended to be part of the repository.
- Add a lightweight validation script (and CI job) to check frontmatter schema, skill directory naming, reference file presence, and link consistency between README and AGENTS.

## Open Questions

- Should `AGENTS.md` be the minimal auto-generated skill index, or the full user-facing doc (with usage, structure, and commands)?
- Are Unicode diagrams acceptable as a project standard, or should ASCII be enforced for maximum terminal compatibility?
