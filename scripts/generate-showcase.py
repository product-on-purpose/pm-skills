#!/usr/bin/env python3
"""
Generate MkDocs showcase pages from the sample library.

Reads library/skill-output-samples/ and generates:
- docs/showcase/index.md (overview + choose your journey)
- docs/showcase/storevine.md (Storevine Campaigns arc)
- docs/showcase/brainshelf.md (Brainshelf Resurface arc)
- docs/showcase/workbench.md (Workbench Blueprints arc)

Also updates the skill page generation to include real-world samples.

Usage:
    python scripts/generate-showcase.py
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SAMPLES_DIR = ROOT / "library" / "skill-output-samples"
OUTPUT_DIR = ROOT / "docs" / "showcase"

# Thread definitions
THREADS = {
    "storevine": {
        "display": "Storevine",
        "subtitle": "B2B Ecommerce Platform",
        "icon": ":material-store:",
        "description": "Series A, ~70 employees, ~15,000 merchants. Building **Campaigns** . native email marketing.",
        "prompt_style": "Organized . structured context, references prior work, clear scope boundaries.",
        "suffix": "campaigns",
    },
    "brainshelf": {
        "display": "Brainshelf",
        "subtitle": "Consumer PKM App",
        "icon": ":material-bookshelf:",
        "description": "Post-seed, ~20 employees, ~22,000 MAU. Building **Resurface** . contextual morning email digest.",
        "prompt_style": "Casual . rough, fast, enough context to work. Bullet points and shorthand.",
        "suffix": "resurface",
    },
    "workbench": {
        "display": "Workbench",
        "subtitle": "Enterprise Collaboration",
        "icon": ":material-office-building:",
        "description": "Series B, ~200 employees, ~500 enterprise customers. Building **Blueprints** . document templates with approval gates.",
        "prompt_style": "Enterprise . full stakeholder lists, quantified baselines, explicit metrics.",
        "suffix": "blueprints",
    },
}

# Phase ordering with display names
PHASES = [
    ("foundation", "Foundation"),
    ("discover", "Discover"),
    ("define", "Define"),
    ("develop", "Develop"),
    ("deliver", "Deliver"),
    ("measure", "Measure"),
    ("iterate", "Iterate"),
]

# Skills in each phase (ordered)
PHASE_SKILLS = {
    "foundation": ["foundation-persona"],
    "discover": ["discover-competitive-analysis", "discover-interview-synthesis", "discover-stakeholder-summary"],
    "define": ["define-problem-statement", "define-hypothesis", "define-opportunity-tree", "define-jtbd-canvas"],
    "develop": ["develop-solution-brief", "develop-spike-summary", "develop-adr", "develop-design-rationale"],
    "deliver": ["deliver-prd", "deliver-user-stories", "deliver-edge-cases", "deliver-launch-checklist", "deliver-release-notes"],
    "measure": ["measure-experiment-design", "measure-instrumentation-spec", "measure-dashboard-requirements", "measure-experiment-results"],
    "iterate": ["iterate-retrospective", "iterate-lessons-log", "iterate-refinement-notes", "iterate-pivot-decision"],
}

# Display names for skills
SKILL_DISPLAY = {
    "foundation-persona": "Persona",
    "discover-competitive-analysis": "Competitive Analysis",
    "discover-interview-synthesis": "Interview Synthesis",
    "discover-stakeholder-summary": "Stakeholder Summary",
    "define-problem-statement": "Problem Statement",
    "define-hypothesis": "Hypothesis",
    "define-opportunity-tree": "Opportunity Tree",
    "define-jtbd-canvas": "JTBD Canvas",
    "develop-solution-brief": "Solution Brief",
    "develop-spike-summary": "Spike Summary",
    "develop-adr": "Architecture Decision Record",
    "develop-design-rationale": "Design Rationale",
    "deliver-prd": "PRD",
    "deliver-user-stories": "User Stories",
    "deliver-edge-cases": "Edge Cases",
    "deliver-launch-checklist": "Launch Checklist",
    "deliver-release-notes": "Release Notes",
    "measure-experiment-design": "Experiment Design",
    "measure-instrumentation-spec": "Instrumentation Spec",
    "measure-dashboard-requirements": "Dashboard Requirements",
    "measure-experiment-results": "Experiment Results",
    "iterate-retrospective": "Retrospective",
    "iterate-lessons-log": "Lessons Log",
    "iterate-refinement-notes": "Refinement Notes",
    "iterate-pivot-decision": "Pivot Decision",
}


def find_sample_file(skill: str, thread: str, suffix: str) -> Path | None:
    """Find a sample file for a skill/thread combination."""
    skill_dir = SAMPLES_DIR / skill
    if not skill_dir.exists():
        return None

    # Try exact suffix match first
    for f in skill_dir.glob(f"sample_{skill}_{thread}_*.md"):
        return f

    return None


def find_all_samples_for_skill(skill: str, thread: str) -> list:
    """Find all sample files for a skill/thread (persona has multiple)."""
    skill_dir = SAMPLES_DIR / skill
    if not skill_dir.exists():
        return []

    files = sorted(skill_dir.glob(f"sample_{skill}_{thread}_*.md"))
    return files


def parse_sample(filepath: Path) -> dict:
    """Parse a sample file into scenario, prompt, and output sections."""
    content = filepath.read_text(encoding="utf-8")

    # Strip HTML comment + frontmatter
    text = content.lstrip()
    if text.startswith("<!--"):
        end = text.find("-->")
        if end != -1:
            text = text[end + 3:].lstrip()

    match = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)", text, re.DOTALL)
    if match:
        fm_text = match.group(1)
        body = match.group(2)
    else:
        fm_text = ""
        body = text

    # Parse frontmatter for context
    context = ""
    for line in fm_text.split("\n"):
        if line.startswith("context:"):
            context = line[len("context:"):].strip()

    # Extract sections
    sections = {}
    current = None
    lines = []
    for line in body.split("\n"):
        m = re.match(r"^##\s+(.+)", line)
        if m:
            if current:
                sections[current] = "\n".join(lines).strip()
            current = m.group(1).strip()
            lines = []
        else:
            lines.append(line)
    if current:
        sections[current] = "\n".join(lines).strip()

    return {
        "context": context,
        "scenario": sections.get("Scenario", ""),
        "prompt": sections.get("Prompt", ""),
        "output": sections.get("Output", ""),
        "filename": filepath.name,
    }


def indent(text: str, spaces: int = 4) -> str:
    """Indent text for admonition embedding."""
    prefix = " " * spaces
    return "\n".join(prefix + line if line.strip() else "" for line in text.split("\n"))


def generate_thread_page(thread_key: str) -> None:
    """Generate a showcase journey page for one thread."""
    thread = THREADS[thread_key]
    output_path = OUTPUT_DIR / f"{thread_key}.md"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    lines = []
    lines.append("---")
    lines.append(f"title: \"{thread['display']}: Follow the Product\"")
    lines.append(f"description: \"Follow {thread['display']} through the complete PM lifecycle . from discovery to pivot decision.\"")
    lines.append("generated: true")
    lines.append("source: scripts/generate-showcase.py")
    lines.append("tags:")
    lines.append("  - Showcase")
    lines.append(f"  - {thread['display']}")
    lines.append("---")
    lines.append("")
    lines.append(f"# {thread['display']}: Follow the Product")
    lines.append("")
    lines.append('!!! warning "Generated file"')
    lines.append('    This page is regenerated by `scripts/generate-showcase.py` from `library/skill-output-samples/`. Re-run the generator after updating samples or thread definitions.')
    lines.append("")
    lines.append(f"> {thread['description']}")
    lines.append(f">")
    lines.append(f"> **Prompt style:** {thread['prompt_style']}")
    lines.append("")

    sample_count = 0

    for phase_key, phase_display in PHASES:
        skills = PHASE_SKILLS.get(phase_key, [])
        if not skills:
            continue

        phase_has_content = False
        phase_lines = []
        phase_lines.append(f"## Phase: {phase_display}")
        phase_lines.append("")

        for skill in skills:
            sample_files = find_all_samples_for_skill(skill, thread_key)
            if not sample_files:
                continue

            for sample_file in sample_files:
                parsed = parse_sample(sample_file)
                if not parsed["output"]:
                    continue

                phase_has_content = True
                sample_count += 1
                skill_display = SKILL_DISPLAY.get(skill, skill)

                # For persona, include the variant info from filename
                variant_info = ""
                fname = sample_file.stem
                if "product-brief" in fname:
                    variant_info = " (Product Brief)"
                elif "product-detailed" in fname:
                    variant_info = " (Product Detailed)"
                elif "marketing-brief" in fname:
                    variant_info = " (Marketing Brief)"
                elif "marketing-detailed" in fname:
                    variant_info = " (Marketing Detailed)"

                phase_lines.append(f"### {skill_display}{variant_info}")
                phase_lines.append("")

                if parsed["scenario"]:
                    phase_lines.append(f"*{parsed['context']}*" if parsed["context"] else "")
                    phase_lines.append("")

                if parsed["prompt"]:
                    phase_lines.append('!!! quote "Prompt"')
                    phase_lines.append(indent(parsed["prompt"]))
                    phase_lines.append("")

                # Output in collapsible admonition
                phase_lines.append(f'??? example "Full output: {skill_display}{variant_info}"')
                phase_lines.append(indent(parsed["output"]))
                phase_lines.append("")
                phase_lines.append("---")
                phase_lines.append("")

        if phase_has_content:
            lines.extend(phase_lines)

    # Footer
    lines.append(f"*{sample_count} artifacts generated across the full PM lifecycle.*")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("**Explore other journeys:**")
    lines.append("")
    for other_key, other_thread in THREADS.items():
        if other_key != thread_key:
            lines.append(f"- [{other_thread['display']} ({other_thread['subtitle']})]({other_key}.md)")
    lines.append("")

    output_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"  {thread['display']}: {sample_count} samples")


def generate_index_page() -> None:
    """Generate the showcase index page."""
    output_path = OUTPUT_DIR / "index.md"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    lines = []
    lines.append("---")
    lines.append('title: "Showcase: Follow the Product"')
    lines.append('description: "See PM Skills in action . follow three fictional companies through the complete product lifecycle."')
    lines.append("generated: true")
    lines.append("source: scripts/generate-showcase.py")
    lines.append("tags:")
    lines.append("  - Showcase")
    lines.append("---")
    lines.append("")
    lines.append("# Showcase: Follow the Product")
    lines.append("")
    lines.append('!!! warning "Generated file"')
    lines.append('    This page is regenerated by `scripts/generate-showcase.py`. Re-run the generator after updating thread definitions or sample library entries.')
    lines.append("")
    lines.append("See every PM skill in action. Three fictional companies, three different prompt styles,")
    lines.append("one complete lifecycle each . from discovery research through pivot decisions.")
    lines.append("")
    lines.append("Each journey demonstrates **25+ real artifacts** produced by pm-skills slash commands,")
    lines.append("including the full prompt that generated each one.")
    lines.append("")

    lines.append('<div class="grid cards" markdown>')
    lines.append("")
    for key, thread in THREADS.items():
        lines.append(f"- {thread['icon']} **{thread['display']}** . {thread['subtitle']}")
        lines.append("  ---")
        lines.append(f"  {thread['description']}")
        lines.append(f"  ")
        lines.append(f"  **Prompt style:** {thread['prompt_style']}")
        lines.append(f"  [:octicons-arrow-right-24: Follow the journey]({key}.md)")
        lines.append("")
    lines.append("</div>")
    lines.append("")

    lines.append("## How the samples work")
    lines.append("")
    lines.append("Every sample follows a consistent three-part structure:")
    lines.append("")
    lines.append("1. **Scenario** . the company, team, and specific PM problem")
    lines.append("2. **Prompt** . the exact slash command the PM typed")
    lines.append("3. **Output** . the complete artifact, following every template section")
    lines.append("")
    lines.append("Fictional metrics are marked with `[fictional]`. Competitor names are real.")
    lines.append("Only the three companies (Storevine, Brainshelf, Workbench) are fictional.")
    lines.append("")
    lines.append("## Three prompt styles, same quality output")
    lines.append("")
    lines.append("| Style | Company | Description |")
    lines.append("|-------|---------|-------------|")
    lines.append("| **Organized** | Storevine | Structured notes, references prior artifacts, clear scope |")
    lines.append("| **Casual** | Brainshelf | Bullet points, shorthand, enough context to work |")
    lines.append("| **Enterprise** | Workbench | Full stakeholder lists, quantified baselines, explicit metrics |")
    lines.append("")
    lines.append("See the [Prompt Gallery](../guides/prompt-gallery.md) for a deeper comparison.")

    output_path.write_text("\n".join(lines), encoding="utf-8")
    print("  Index page generated")


def main():
    if not SAMPLES_DIR.exists():
        print(f"Error: sample library not found at {SAMPLES_DIR}")
        return

    print("Generating showcase pages...")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    generate_index_page()
    for thread_key in THREADS:
        generate_thread_page(thread_key)

    print("Done!")


if __name__ == "__main__":
    main()
