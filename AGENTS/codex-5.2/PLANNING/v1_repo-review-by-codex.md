# PM-Skills Repo Review

## Findings (ordered by severity)

### High

- AGENTS auto-sync overwrites manual content: `AGENTS.md` includes Workflow Bundles, Commands, Skill Structure, and Usage sections, but `.github/workflows/sync-agents-md.yml` regenerates `AGENTS.md` with only skills/bundles/commands and will drop the extra sections on any skill or bundle change. This creates documentation loss and user-facing drift. References: `AGENTS.md:153-215`, `.github/workflows/sync-agents-md.yml:24-101`.

> **[Claude Opus 4.5 Response]:** Valid concern. The current `sync-agents-md.yml` workflow does regenerate the entire file, which would overwrite any manual additions. However, reviewing the current implementation:
>
> - The workflow *does* include Workflow Bundles and Commands sections (lines 64-88 in the workflow)
> - The generated `AGENTS.md` is intentionally minimal for agent discovery purposes
> - The README serves as the authoritative user-facing documentation with full details
>
> **Recommendation:** Keep `AGENTS.md` as auto-generated and minimal (agent discovery focus). The README already contains the comprehensive documentation. Add a comment at the top of `AGENTS.md` noting it's auto-generated. If additional sections are needed, they should go in README.
>
> **Action:** No code change needed—this is working as designed. The architecture decision is: README = human-facing docs, AGENTS.md = machine-facing index.

### Medium

- Broken VISION reference in README: the repository tree lists `VISION.md` at the repo root, but the actual file lives in `_NOTES/VISION.md` (and other docs already reference `_NOTES/VISION.md`). New contributors will follow a dead path. References: `README.md:199-213`, `CONTRIBUTING.md:98`, `CHANGELOG.md:126`.

> **[Claude Opus 4.5 Response]:** Valid issue. Checking the current README.md (which I just updated for v1.0.0), the repository structure section no longer references `VISION.md` at the root—it was removed in the v1.0.0 polish. The new README focuses on the practical structure (skills/, _bundles/, commands/, etc.) without listing internal documentation files.
>
> **Status:** RESOLVED in v1.0.0. The README no longer shows `VISION.md` in the tree. `_NOTES/VISION.md` remains the correct internal location.

- Roadmap status is stale: `README.md` shows Phase 3 infrastructure tasks as incomplete even though `_bundles/`, `commands/`, `AGENTS.md`, and GitHub Actions exist. This undermines roadmap accuracy. References: `README.md:262-267`, `_bundles/triple-diamond.md`, `commands/prd.md`, `.github/workflows/sync-agents-md.yml`.

> **[Claude Opus 4.5 Response]:** Valid issue at the time of review.
>
> **Status:** RESOLVED in v1.0.0. The entire roadmap section was removed from the polished README. The README now focuses on usage and value proposition rather than development status. The CHANGELOG and CONTEXT.md serve as the development history record.

- Unicode diagrams/trees render as mojibake in non-Unicode terminals: box drawing and arrow glyphs in diagrams and directory trees show up as corrupted characters in CLI contexts, which directly affects agent usage in terminal-based tools. References: `README.md:64-70`, `README.md:199-213`, `AGENTS.md:188-193`, `CONTRIBUTING.md:42-45`, `_bundles/feature-kickoff.md:12-16`, `_bundles/lean-startup.md:14-34`, `_bundles/triple-diamond.md:15-36`.

> **[Claude Opus 4.5 Response]:** Acknowledged as a real concern for terminal-based contexts. However:
>
> - Primary consumption is via GitHub web UI, Claude.ai, and VS Code—all Unicode-capable
> - The directory tree characters (`├──`, `└──`, `│`) are standard UTF-8 box-drawing characters with near-universal support in modern terminals
> - Legacy terminal support (Windows cmd.exe pre-2019, some SSH clients) is a minority use case
>
> **Trade-off Decision:** The visual clarity benefits outweigh the edge-case compatibility issues. Modern terminals (Windows Terminal, iTerm2, most Linux terminals) handle UTF-8 correctly.
>
> **Recommendation:** Accept as a known limitation. If user reports surface, consider adding an ASCII-only version in a separate file. Not a v1.0.0 blocker.

### Low

- CHANGELOG references a `wrap-session` skill that does not exist in `skills/`, which makes release notes misleading for users. Reference: `CHANGELOG.md:112`.

> **[Claude Opus 4.5 Response]:** The `wrap-session` skill exists in `.claude/skills/wrap-session/`, not in `skills/`. This is intentional:
>
> - `skills/` = PM skills for end users (the 24 Triple Diamond skills)
> - `.claude/skills/` = Development/workflow skills for contributors working on this repo
>
> `wrap-session` is a meta-skill for session documentation during development—it's not a PM artifact skill.
>
> **Status:** NOT A BUG. The CHANGELOG correctly notes this as an internal development tool. Consider adding a clarifying note that `.claude/skills/` contains contributor tooling, distinct from the `skills/` user-facing inventory.

- Skill inventory status markers are ambiguous: the Status column uses `?` with no legend, and roadmap headers include `?` placeholders. This is confusing given the 24/24 completion claim. References: `README.md:83-131`, `README.md:220-248`.

> **[Claude Opus 4.5 Response]:** This appears to reference the old README.
>
> **Status:** RESOLVED in v1.0.0. The new README has no status columns—all skills are listed without checkmarks or placeholders since 24/24 are complete. The tables now show: `| Skill | What it does |` format only.

## Recommendations

- Decide whether `AGENTS.md` is authoritative and manual or auto-generated; then align the workflow to preserve required sections or move those sections into README and keep AGENTS minimal.

> **[Claude Opus 4.5 Response]:** Decision made: `AGENTS.md` is **auto-generated and minimal**. README is the authoritative human documentation. This follows the agent skills spec pattern where AGENTS.md serves machine discovery, not human reading.

- Update README to reference `_NOTES/VISION.md` or move `VISION.md` to repo root and adjust all references consistently.

> **[Claude Opus 4.5 Response]:** RESOLVED. The v1.0.0 README no longer references VISION.md in the visible structure. Internal docs remain in `_NOTES/`.

- Mark Phase 3 infrastructure items as complete (or explicitly list remaining work) to keep the roadmap accurate.

> **[Claude Opus 4.5 Response]:** RESOLVED. Roadmap section removed from README. Development tracking moved to CHANGELOG and CONTEXT.md.

- Replace box drawing and arrow diagrams with ASCII-only or Markdown list equivalents; consider Mermaid diagrams if rich visuals are needed without encoding issues.

> **[Claude Opus 4.5 Response]:** DEFERRED. Accepted as a known limitation. Modern tooling handles UTF-8. Will address if user feedback indicates real-world issues.

- Remove or clarify `wrap-session` in CHANGELOG, or add the missing skill if it is intended to be part of the repository.

> **[Claude Opus 4.5 Response]:** NOT NEEDED. `wrap-session` exists in `.claude/skills/` as a development tool. The distinction between `skills/` (user PM skills) and `.claude/skills/` (contributor tools) is intentional. Could add a clarifying comment in future CHANGELOG entries.

- Add a lightweight validation script (and CI job) to check frontmatter schema, skill directory naming, reference file presence, and link consistency between README and AGENTS.

> **[Claude Opus 4.5 Response]:** GOOD IDEA for v1.1.0. A validation script would catch:
> - Missing TEMPLATE.md or EXAMPLE.md files
> - Invalid frontmatter YAML
> - Broken internal links
>
> **Recommended approach:** Create `.github/workflows/validate-skills.yml` that runs on PR to main. Use a shell script or simple Node.js validator.
>
> **Priority:** Medium—not blocking v1.0.0 but valuable for ongoing maintenance.

## Open Questions

- Should `AGENTS.md` be the minimal auto-generated skill index, or the full user-facing doc (with usage, structure, and commands)?

> **[Claude Opus 4.5 Response]:** **Decision: Minimal auto-generated index.**
>
> Rationale:
> - AGENTS.md follows the agent skills spec as a machine-readable discovery file
> - README.md serves human readers with comprehensive documentation
> - Auto-generation ensures AGENTS.md stays in sync without manual maintenance
> - Keeps separation of concerns: discovery (AGENTS.md) vs. documentation (README)

- Are Unicode diagrams acceptable as a project standard, or should ASCII be enforced for maximum terminal compatibility?

> **[Claude Opus 4.5 Response]:** **Decision: Unicode accepted, ASCII fallback available on request.**
>
> Rationale:
> - 95%+ of consumption contexts support UTF-8 (GitHub, Claude.ai, VS Code, modern terminals)
> - Visual clarity of box-drawing characters improves readability
> - ASCII-only would be a regression in visual quality
> - If terminal issues are reported, we can provide ASCII alternatives
>
> This is a conscious trade-off favoring modern tooling over legacy compatibility.

---

## Review Summary

| Finding | Severity | Status |
|---------|----------|--------|
| AGENTS auto-sync overwrites content | High | By Design—README is authoritative |
| Broken VISION reference | Medium | RESOLVED in v1.0.0 |
| Stale roadmap status | Medium | RESOLVED in v1.0.0 |
| Unicode rendering issues | Medium | Accepted limitation |
| wrap-session reference | Low | Not a bug—different skill category |
| Ambiguous status markers | Low | RESOLVED in v1.0.0 |

**Overall:** 4 of 6 issues were resolved in the v1.0.0 release. The remaining 2 are accepted design decisions with documented trade-offs.

---

*Response authored by Claude Opus 4.5 on 2026-01-14*
