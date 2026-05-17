#!/usr/bin/env python3
"""
Generate MkDocs workflow pages from source _workflows/*.md.

Reads _workflows/ directory, rewrites skill links from repo-relative
to docs-relative format, and writes to docs/workflows/. Also regenerates
docs/workflows/index.md with a table of all workflows.

Link rewriting rules:
  ../skills/{phase}-{name}/SKILL.md  ->  ../skills/{phase}/{phase}-{name}.md
  ../README.md                       ->  absolute GitHub URL

Usage:
    python scripts/generate-workflow-pages.py

No external dependencies -- uses only the Python standard library.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORKFLOWS_SRC = ROOT / "_workflows"
WORKFLOWS_OUT = ROOT / "docs" / "workflows"
GITHUB_BASE = "https://github.com/product-on-purpose/pm-skills/blob/main"

# Known phase prefixes for skill link rewriting
PHASE_PREFIXES = [
    "discover", "define", "develop", "deliver",
    "measure", "iterate", "foundation", "utility",
]


def extract_phase(skill_dir_name: str) -> str:
    """Extract phase from a skill directory name like 'define-problem-statement'."""
    for prefix in PHASE_PREFIXES:
        if skill_dir_name.startswith(prefix + "-") or skill_dir_name == prefix:
            return prefix
    # Fallback: first segment before the first hyphen
    return skill_dir_name.split("-")[0]


def rewrite_skill_link(match: re.Match) -> str:
    """Rewrite a repo-relative skill link to docs-relative format."""
    prefix = match.group(1)  # everything before the path
    skill_dir = match.group(2)  # e.g., 'define-problem-statement'
    suffix = match.group(3)  # everything after (closing paren etc.)
    phase = extract_phase(skill_dir)
    return f"{prefix}../skills/{phase}/{skill_dir}.md{suffix}"


def rewrite_links(content: str) -> str:
    """Rewrite all links in workflow content for docs site."""
    # Rewrite skill links: ../skills/{skill-dir}/SKILL.md -> ../skills/{phase}/{skill-dir}.md
    # Pattern matches markdown links like [...](../skills/define-problem-statement/SKILL.md)
    content = re.sub(
        r'(\]\()\.\.\/skills\/([a-z][a-z0-9-]+)\/SKILL\.md(\))',
        rewrite_skill_link,
        content,
    )

    # Rewrite README link: ../README.md -> absolute GitHub URL
    content = content.replace(
        "](../README.md)",
        f"]({GITHUB_BASE}/README.md)",
    )

    # Rewrite docs/ links: ../docs/X.md -> ../X.md
    # Source _workflows/*.md uses ../docs/X.md for repo-relative reference
    # (correct from _workflows/ location); when copied to docs/workflows/,
    # the path needs to drop the docs/ segment so it resolves correctly
    # from inside the docs tree. Closes a generator gap surfaced when
    # v2.15.0 workflows introduced cross-references from _workflows/ into
    # docs/concepts/ and docs/guides/.
    content = re.sub(
        r'(\]\()\.\.\/docs\/',
        r'\1../',
        content,
    )

    return content


def inject_generated_marker(content: str, source_file: str) -> str:
    """Inject Pattern 5C generated-content marker into frontmatter + Starlight aside after H1.

    Adds 'generated: true' and 'source: scripts/generate-workflow-pages.py' to the
    frontmatter block, plus a `:::caution[Generated file]` Starlight aside pointing
    editors to the source workflow file. Idempotent: if the marker already exists,
    returns content unchanged.
    """
    if "generated: true" in content:
        return content

    generator = "scripts/generate-workflow-pages.py"

    # Inject into frontmatter (append before closing ---)
    fm_match = re.match(r"^(---\s*\n)(.*?)(\n---\s*\n)", content, re.DOTALL)
    if fm_match:
        prefix = fm_match.group(1)
        fm_body = fm_match.group(2)
        suffix = fm_match.group(3)
        injected = f"\ngenerated: true\nsource: {generator}"
        new_fm = prefix + fm_body + injected + suffix
        rest = content[fm_match.end():]
    else:
        new_fm = f"---\ngenerated: true\nsource: {generator}\n---\n\n"
        rest = content

    # Generated-content marker is the `generated: true` + `source:` frontmatter set
    # above. The user-facing visible admonition that used to be injected after the H1
    # was removed in v2.14.x V10 (2026-05-10) because the warning was contributor-noise
    # on the rendered docs site. Contributors viewing raw markdown still see the
    # frontmatter; the check-generated-content-untouched.sh validator still uses the
    # frontmatter marker.

    # Strip the body H1 (v2.14.x V15 fix): source `_workflows/*.md` files start with
    # `# {Workflow Name} Workflow` for standalone-on-GitHub readability. Starlight
    # renders the frontmatter title as the page heading; keeping the body H1 produces
    # title duplication on the docs site. Source files stay untouched; the generator
    # strips at copy boundary.
    rest = re.sub(r'^#\s+.+?\n+', '', rest, count=1, flags=re.MULTILINE)

    return new_fm + rest


def extract_metadata(content: str) -> dict:
    """Extract basic metadata from a workflow file for the index table."""
    meta = {"title": "", "description": "", "skills": "", "use_when": ""}

    # Title from first H1
    title_match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    if title_match:
        meta["title"] = title_match.group(1).replace(" Workflow", "").strip()

    # Description from blockquote after title
    desc_match = re.search(r"^>\s*\*?\*?(.+?)\*?\*?\s*$", content, re.MULTILINE)
    if desc_match:
        meta["description"] = desc_match.group(1).strip()

    # Skills from metadata table or first skill chain mention
    skills_match = re.search(
        r"\|\s*\*?\*?Skills\*?\*?\s*\|\s*(.+?)\s*\|", content
    )
    if skills_match:
        meta["skills"] = skills_match.group(1).strip().replace("`", "")

    return meta


def generate_index(workflow_files: list[tuple[str, dict]]) -> str:
    """Generate the docs/workflows/index.md content."""
    lines = [
        "---",
        "title: Workflows",
        "description: Multi-skill workflows that chain PM skills together for common product management processes.",
        "generated: true",
        "source: scripts/generate-workflow-pages.py",
        "---",
        "",
        # No body H1: Starlight renders frontmatter title (v2.14.x V15 fix).
        "Workflows chain multiple skills into end-to-end sequences. Each workflow defines a sequence of skills to run in order.",
        "",
        '> **Need help choosing?** See the [Using Workflows Guide](../guides/using-workflows.md) for a decision tree, comparison matrix, and customization patterns.',
        "",
        "| Workflow | Skills chained | Use when |",
        "|----------|---------------|----------|",
    ]

    # Define the workflow display order and use-when descriptions
    workflow_info = {
        "feature-kickoff": {
            "skills": "Problem Statement -> Hypothesis -> PRD -> User Stories",
            "use_when": "Starting a new feature from scratch",
        },
        "lean-startup": {
            "skills": "Hypothesis -> Experiment Design -> Experiment Results -> Pivot Decision",
            "use_when": "Running a build-measure-learn cycle",
        },
        "triple-diamond": {
            "skills": "Full Discover -> Define -> Develop -> Deliver -> Measure -> Iterate flow",
            "use_when": "End-to-end product development",
        },
        "customer-discovery": {
            "skills": "Interview Synthesis -> JTBD Canvas -> Opportunity Tree -> Problem Statement",
            "use_when": "Transforming raw research into a validated problem",
        },
        "sprint-planning": {
            "skills": "Refinement Notes -> User Stories -> Edge Cases",
            "use_when": "Preparing sprint-ready stories from a backlog",
        },
        "product-strategy": {
            "skills": "Competitive Analysis -> Stakeholder Summary -> Opportunity Tree -> Solution Brief -> ADR",
            "use_when": "Framing a major strategic initiative",
        },
        "post-launch-learning": {
            "skills": "Instrumentation Spec -> Dashboard Requirements -> Experiment Results -> Retrospective -> Lessons Log",
            "use_when": "Setting up measurement and capturing learnings after launch",
        },
        "stakeholder-alignment": {
            "skills": "Stakeholder Summary -> Problem Statement -> Solution Brief -> Launch Checklist",
            "use_when": "Getting leadership buy-in before committing resources",
        },
        "technical-discovery": {
            "skills": "Spike Summary -> ADR -> Design Rationale",
            "use_when": "Evaluating technical feasibility and architecture decisions",
        },
        "foundation-sprint": {
            "display": "Foundation Sprint",
            "skills": "7 `tool-foundation-sprint-*` skills (readiness -> brief -> basics -> differentiation -> approach-options -> magic-lenses -> founding-hypothesis)",
            "use_when": "2-day strategic-alignment workshop producing a testable Founding Hypothesis",
        },
        "design-sprint": {
            "display": "Design Sprint",
            "skills": "7 `tool-design-sprint-*` skills (readiness -> brief -> map-and-target -> sketch -> decide-and-storyboard -> prototype-plan -> test-and-score)",
            "use_when": "5-day prototype-and-test workshop producing a Decider's build / iterate / pivot / stop call",
        },
        "foundation-to-design": {
            "display": "Foundation to Design",
            "skills": "Foundation Sprint family (7) -> narrative handoff conversation -> Design Sprint family (7)",
            "use_when": "End-to-end FS + DS arc (7-8 working days across 2-3 calendar weeks)",
        },
        "sprint-planning": {
            # Override: apply v2.15.0 naming-discipline rule on the workshop-sprint vs agile-sprint collision
            "display": "Sprint Planning (agile)",
            "skills": "Refinement Notes -> User Stories -> Edge Cases",
            "use_when": "Preparing agile sprint-ready stories from a backlog (distinct from Foundation Sprint and Design Sprint)",
        },
    }

    # Ordered list: canonical PM workflows first, then v2.15.0 sprint additions
    order = [
        "feature-kickoff", "lean-startup", "triple-diamond",
        "customer-discovery", "sprint-planning", "product-strategy",
        "post-launch-learning", "stakeholder-alignment", "technical-discovery",
        "foundation-sprint", "design-sprint", "foundation-to-design",
    ]

    # Safety net: every workflow in source must have a workflow_info entry.
    # Surfaced after the v2.15.0 release where the generator silently dropped
    # foundation-sprint, design-sprint, and foundation-to-design from the index
    # because they lacked dict entries despite their pages being generated.
    source_stems = {stem for stem, _ in workflow_files}
    curated_stems = set(workflow_info.keys())
    missing_from_curated = source_stems - curated_stems
    if missing_from_curated:
        raise SystemExit(
            f"ERROR: workflow source files exist but lack workflow_info entries: "
            f"{sorted(missing_from_curated)}. Add explicit entries (display, skills, use_when) "
            f"to generate-workflow-pages.py:workflow_info and to the order list."
        )
    missing_from_order = curated_stems - set(order)
    if missing_from_order:
        raise SystemExit(
            f"ERROR: workflow_info entries exist but are not in the order list: "
            f"{sorted(missing_from_order)}. Add to the order list at "
            f"generate-workflow-pages.py:order."
        )

    for name in order:
        info = workflow_info.get(name, {})
        # Prefer explicit display override (e.g., "Sprint Planning (agile)"), else title-case fallback
        display_name = info.get("display", name.replace("-", " ").title())
        skills = info.get("skills", "")
        use_when = info.get("use_when", "")
        lines.append(
            f"| [{display_name}]({name}.md) "
            f"| {skills} "
            f"| {use_when} |"
        )

    lines.extend([
        "",
        "## How to use a workflow",
        "",
        "```",
        '/workflow-feature-kickoff "Feature name or description"',
        "```",
        "",
        "Each workflow has a corresponding `/workflow-{name}` slash command. "
        "You can also reference the workflow file directly.",
        "",
    ])

    return "\n".join(lines) + "\n"


def main():
    if not WORKFLOWS_SRC.is_dir():
        print(f"ERROR: Source directory not found: {WORKFLOWS_SRC}", file=sys.stderr)
        sys.exit(1)

    WORKFLOWS_OUT.mkdir(parents=True, exist_ok=True)

    # Find all workflow .md files (excluding README)
    src_files = sorted(
        f for f in WORKFLOWS_SRC.glob("*.md")
        if f.name not in ("README.md", ".gitkeep")
    )

    if not src_files:
        print("WARNING: No workflow files found in _workflows/", file=sys.stderr)
        sys.exit(0)

    print(f"Found {len(src_files)} workflow(s) in {WORKFLOWS_SRC}")

    generated = []
    for src in src_files:
        content = src.read_text(encoding="utf-8")
        rewritten = rewrite_links(content)
        marked = inject_generated_marker(rewritten, source_file=f"_workflows/{src.name}")

        out_path = WORKFLOWS_OUT / src.name
        out_path.write_text(marked, encoding="utf-8")
        print(f"  {src.name} -> {out_path.relative_to(ROOT)}")

        meta = extract_metadata(content)
        generated.append((src.stem, meta))

    # Generate index
    index_content = generate_index(generated)
    index_path = WORKFLOWS_OUT / "index.md"
    index_path.write_text(index_content, encoding="utf-8")
    print(f"  index.md -> {index_path.relative_to(ROOT)} ({len(generated)} workflows)")

    print(f"\nDone. Generated {len(generated)} workflow pages + index.")


if __name__ == "__main__":
    main()
