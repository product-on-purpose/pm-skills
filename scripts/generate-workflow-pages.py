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

    return content


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
        "---",
        "",
        "# Workflows",
        "",
        "Workflows chain multiple skills into end-to-end sequences. Each workflow defines a sequence of skills to run in order.",
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
    }

    # Ordered list: existing 3 first, then new 6
    order = [
        "feature-kickoff", "lean-startup", "triple-diamond",
        "customer-discovery", "sprint-planning", "product-strategy",
        "post-launch-learning", "stakeholder-alignment", "technical-discovery",
    ]

    for name in order:
        info = workflow_info.get(name, {})
        display_name = name.replace("-", " ").title()
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

        out_path = WORKFLOWS_OUT / src.name
        out_path.write_text(rewritten, encoding="utf-8")
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
