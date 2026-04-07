#!/usr/bin/env python3
"""
Generate MkDocs skill pages from source SKILL.md + TEMPLATE.md + EXAMPLE.md.

Reads skills/ directory, generates docs/skills/{phase}/{name}.md pages,
phase index pages, a main skills index, and a commands reference page.
Also prints a nav YAML snippet for mkdocs.yml.

Usage:
    python scripts/generate-skill-pages.py

No external dependencies — uses only the Python standard library.
"""

import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = ROOT / "skills"
COMMANDS_DIR = ROOT / "commands"
SAMPLES_DIR = ROOT / "library" / "skill-output-samples"
OUTPUT_DIR = ROOT / "docs" / "skills"

# Phase/classification ordering
PHASE_ORDER = [
    "discover", "define", "develop", "deliver",
    "measure", "iterate", "foundation", "utility",
]
PHASE_DISPLAY = {
    "discover": "Discover",
    "define": "Define",
    "develop": "Develop",
    "deliver": "Deliver",
    "measure": "Measure",
    "iterate": "Iterate",
    "foundation": "Foundation",
    "utility": "Utility",
}

# Known phase and classification prefixes
NAMESPACE_PREFIXES = [
    "discover", "define", "develop", "deliver",
    "measure", "iterate", "foundation", "utility",
]


def parse_frontmatter(content: str) -> tuple:
    """Parse YAML frontmatter from markdown content.
    Returns (metadata_dict, body_without_frontmatter).
    """
    # Handle HTML comment before frontmatter
    text = content.lstrip()
    if text.startswith("<!--"):
        end = text.find("-->")
        if end != -1:
            text = text[end + 3:].lstrip()

    match = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)", text, re.DOTALL)
    if not match:
        return {}, content

    fm_text = match.group(1)
    body = match.group(2)

    metadata = {}
    current_key = None
    in_metadata_block = False
    metadata_block_key = None

    for line in fm_text.split("\n"):
        stripped = line.rstrip()

        # Nested block (like metadata:)
        if re.match(r"^\w[\w-]*:\s*$", stripped):
            metadata_block_key = stripped.rstrip(":").strip()
            metadata[metadata_block_key] = {}
            in_metadata_block = True
            continue

        if in_metadata_block and stripped.startswith("  "):
            nested_match = re.match(r"^\s+([\w-]+):\s*(.+)", stripped)
            if nested_match:
                key = nested_match.group(1)
                val = nested_match.group(2).strip()
                val = val.strip("\"'")
                # Handle lists
                if val.startswith("[") and val.endswith("]"):
                    val = [v.strip().strip("\"'") for v in val[1:-1].split(",")]
                metadata[metadata_block_key][key] = val
            continue
        else:
            in_metadata_block = False

        # Top-level key: value
        kv_match = re.match(r"^([\w-]+):\s*(.+)", stripped)
        if kv_match:
            key = kv_match.group(1)
            val = kv_match.group(2).strip()
            val = val.strip("\"'")
            if val.startswith("[") and val.endswith("]"):
                val = [v.strip().strip("\"'") for v in val[1:-1].split(",")]
            metadata[key] = val

    return metadata, body


def extract_sections(body: str) -> dict:
    """Split markdown body by ## headings.
    Returns {heading_text: content_below_heading}.
    """
    sections = {}
    current_heading = None
    current_lines = []

    for line in body.split("\n"):
        heading_match = re.match(r"^##\s+(.+)", line)
        if heading_match:
            if current_heading is not None:
                sections[current_heading] = "\n".join(current_lines).strip()
            current_heading = heading_match.group(1).strip()
            current_lines = []
        else:
            current_lines.append(line)

    if current_heading is not None:
        sections[current_heading] = "\n".join(current_lines).strip()

    # Capture intro (content before first ##)
    intro_lines = []
    for line in body.split("\n"):
        if re.match(r"^##\s+", line):
            break
        intro_lines.append(line)
    sections["_intro"] = "\n".join(intro_lines).strip()

    return sections


def classify_skill(metadata: dict, dirname: str) -> tuple:
    """Determine phase/group and display name.
    Returns (group_key, display_name).
    """
    if "phase" in metadata:
        return metadata["phase"], PHASE_DISPLAY.get(metadata["phase"], metadata["phase"])
    if "classification" in metadata:
        return metadata["classification"], PHASE_DISPLAY.get(
            metadata["classification"], metadata["classification"]
        )
    # Fallback: derive from directory name prefix
    for prefix in NAMESPACE_PREFIXES:
        if dirname.startswith(f"{prefix}-"):
            return prefix, PHASE_DISPLAY.get(prefix, prefix)
    return "other", "Other"


def derive_command_name(dirname: str) -> str:
    """Strip the phase/classification prefix to get the command name."""
    for prefix in NAMESPACE_PREFIXES:
        if dirname.startswith(f"{prefix}-"):
            return dirname[len(prefix) + 1:]
    return dirname


def find_command_file(command_name: str) -> str | None:
    """Find the command file for a skill."""
    cmd_file = COMMANDS_DIR / f"{command_name}.md"
    if cmd_file.exists():
        return command_name
    return None


def read_file_content(filepath: Path) -> str:
    """Read file, strip frontmatter for template/example files."""
    if not filepath.exists():
        return ""
    content = filepath.read_text(encoding="utf-8")
    return content


def strip_frontmatter(content: str) -> str:
    """Remove YAML frontmatter from content for embedding."""
    text = content.lstrip()
    if text.startswith("<!--"):
        end = text.find("-->")
        if end != -1:
            text = text[end + 3:].lstrip()
    match = re.match(r"^---\s*\n.*?\n---\s*\n?(.*)", text, re.DOTALL)
    if match:
        return match.group(1)
    return content


def indent_content(content: str, spaces: int = 4) -> str:
    """Indent every line of content by N spaces."""
    prefix = " " * spaces
    return "\n".join(prefix + line if line.strip() else "" for line in content.split("\n"))


def parse_sample_sections(filepath: Path) -> dict:
    """Parse a sample file into scenario, prompt, and output sections."""
    content = filepath.read_text(encoding="utf-8")
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

    context = ""
    thread = ""
    for line in fm_text.split("\n"):
        if line.startswith("context:"):
            context = line[len("context:"):].strip()
        if line.startswith("thread:"):
            thread = line[len("thread:"):].strip()

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
        "thread": thread,
        "scenario": sections.get("Scenario", ""),
        "prompt": sections.get("Prompt", ""),
        "output": sections.get("Output", ""),
    }


THREAD_DISPLAY = {
    "storevine": "Storevine (B2B)",
    "brainshelf": "Brainshelf (Consumer)",
    "workbench": "Workbench (Enterprise)",
}


def load_skill_samples(skill_name: str) -> list:
    """Load all samples for a skill from the sample library."""
    sample_dir = SAMPLES_DIR / skill_name
    if not sample_dir.exists():
        return []

    results = []
    for thread in ["storevine", "brainshelf", "workbench"]:
        files = sorted(sample_dir.glob(f"sample_{skill_name}_{thread}_*.md"))
        if files:
            # Use first match per thread (skip persona variants for simplicity)
            parsed = parse_sample_sections(files[0])
            parsed["thread_display"] = THREAD_DISPLAY.get(thread, thread)
            if parsed["output"]:
                results.append(parsed)

    return results


def generate_skill_page(skill_dir: Path) -> dict | None:
    """Generate a merged skill page. Returns skill info dict or None."""
    dirname = skill_dir.name
    skill_file = skill_dir / "SKILL.md"
    template_file = skill_dir / "references" / "TEMPLATE.md"
    example_file = skill_dir / "references" / "EXAMPLE.md"

    if not skill_file.exists():
        return None

    content = skill_file.read_text(encoding="utf-8")
    metadata, body = parse_frontmatter(content)
    sections = extract_sections(body)

    group, group_display = classify_skill(metadata, dirname)
    command_name = derive_command_name(dirname)
    cmd = find_command_file(command_name)
    name = metadata.get("name", dirname)
    description = metadata.get("description", "")
    version = metadata.get("version", "1.0.0")
    category = ""
    if isinstance(metadata.get("metadata"), dict):
        category = metadata["metadata"].get("category", "")

    # Build the page
    lines = []

    # Frontmatter
    lines.append("---")
    lines.append(f'title: "{name}"')
    lines.append(f'description: "{description}"')
    lines.append("tags:")
    lines.append(f"  - {group_display}")
    if category:
        lines.append(f"  - {category}")
    lines.append("---")
    lines.append("")

    # Title
    title = sections.get("_intro", "").split("\n")[0].lstrip("# ").strip()
    if not title:
        title = name
    lines.append(f"# {title}")
    lines.append("")

    # Quick facts admonition
    lines.append('!!! info "Quick facts"')
    phase_label = f"**Phase:** {group_display}" if group in PHASE_ORDER[:6] else f"**Classification:** {group_display}"
    lines.append(f"    {phase_label} | **Version:** {version} | **Category:** {category} | **License:** Apache-2.0")
    lines.append("")

    # Quick-try snippet (E-03)
    if cmd:
        lines.append(f"**Try it:** `/{cmd} \"Your context here\"`")
        lines.append("{ .md-button }")
        lines.append("")

    # Intro paragraph (skip the title line)
    intro_lines = sections.get("_intro", "").split("\n")
    intro_text = "\n".join(intro_lines[1:]).strip()
    if intro_text:
        lines.append(intro_text)
        lines.append("")

    # When to Use
    if "When to Use" in sections:
        lines.append("## When to Use")
        lines.append("")
        lines.append(sections["When to Use"])
        lines.append("")

    # When NOT to Use (utility skills)
    if "When NOT to Use" in sections:
        lines.append("## When NOT to Use")
        lines.append("")
        lines.append(sections["When NOT to Use"])
        lines.append("")

    # How to Use
    if cmd:
        lines.append("## How to Use")
        lines.append("")
        lines.append(f"Use the `/{cmd}` slash command:")
        lines.append("")
        lines.append("```")
        lines.append(f'/{cmd} "Your context here"')
        lines.append("```")
        lines.append("")
        lines.append(f"Or reference the skill file directly: `skills/{dirname}/SKILL.md`")
        lines.append("")

    # Instructions
    if "Instructions" in sections:
        lines.append("## Instructions")
        lines.append("")
        lines.append(sections["Instructions"])
        lines.append("")

    # Output Template
    template_content = read_file_content(template_file)
    if template_content:
        lines.append("## Output Template")
        lines.append("")
        template_body = strip_frontmatter(template_content)
        lines.append(template_body.strip())
        lines.append("")

    # Example Output
    example_content = read_file_content(example_file)
    if example_content:
        example_body = strip_frontmatter(example_content)
        example_title = example_body.split("\n")[0].lstrip("# ").strip()
        if not example_title:
            example_title = "Complete example"
        lines.append("## Example Output")
        lines.append("")
        lines.append(f'??? example "{example_title}"')
        lines.append(indent_content(example_body.strip()))
        lines.append("")

    # Real-world samples from sample library (E-10)
    samples = load_skill_samples(dirname)
    if samples:
        lines.append("## Real-World Examples")
        lines.append("")
        lines.append("See this skill applied to three different product contexts:")
        lines.append("")
        for sample in samples:
            context_label = sample["context"] if sample["context"] else sample["thread_display"]
            lines.append(f'??? example "{sample["thread_display"]}: {context_label}"')
            if sample["prompt"]:
                lines.append(indent_content(f"**Prompt:**\n\n{sample['prompt']}"))
                lines.append("")
            lines.append(indent_content(f"**Output:**\n\n{sample['output']}"))
            lines.append("")

    # Quality Checklist
    for key in ["Quality Checklist", "Quality checklist"]:
        if key in sections:
            lines.append("## Quality Checklist")
            lines.append("")
            lines.append(sections[key])
            lines.append("")
            break

    # Output Format (if separate from template)
    for key in ["Output Format", "Output Contract"]:
        if key in sections:
            lines.append(f"## {key}")
            lines.append("")
            lines.append(sections[key])
            lines.append("")
            break

    # Write the file
    output_path = OUTPUT_DIR / group / f"{name}.md"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(lines), encoding="utf-8")

    return {
        "name": name,
        "dirname": dirname,
        "group": group,
        "group_display": group_display,
        "description": description,
        "version": version,
        "category": category,
        "command": cmd,
        "output_path": output_path.relative_to(ROOT / "docs"),
    }


# Phase flow diagrams (E-08)
PHASE_FLOWS = {
    "discover": """```mermaid
flowchart LR
    A["/competitive-analysis"] --> D["/problem-statement"]
    B["/interview-synthesis"] --> D
    C["/stakeholder-summary"] --> D
```""",
    "define": """```mermaid
flowchart LR
    A["/problem-statement"] --> B["/hypothesis"]
    A --> C["/jtbd-canvas"]
    C --> D["/opportunity-tree"]
    D --> B
```""",
    "develop": """```mermaid
flowchart LR
    A["/solution-brief"] --> B["/spike-summary"]
    B --> C["/adr"]
    A --> D["/design-rationale"]
    C --> E["/prd"]
    D --> E
```""",
    "deliver": """```mermaid
flowchart LR
    A["/prd"] --> B["/user-stories"]
    B --> C["/acceptance-criteria"]
    A --> D["/edge-cases"]
    C --> E["/launch-checklist"]
    E --> F["/release-notes"]
```""",
    "measure": """```mermaid
flowchart LR
    A["/experiment-design"] --> B["/instrumentation-spec"]
    B --> C["/dashboard-requirements"]
    B --> D["/experiment-results"]
```""",
    "iterate": """```mermaid
flowchart LR
    A["/retrospective"] --> B["/lessons-log"]
    B --> C["/refinement-notes"]
    A --> D["/pivot-decision"]
```""",
}


def generate_phase_index(group: str, skills: list) -> None:
    """Generate a phase/classification index page."""
    display = PHASE_DISPLAY.get(group, group.title())
    output_path = OUTPUT_DIR / group / "index.md"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    lines = []
    lines.append("---")
    lines.append(f'title: "{display} Skills"')
    lines.append(f'description: "PM skills in the {display} phase."')
    lines.append("tags:")
    lines.append(f"  - {display}")
    lines.append("---")
    lines.append("")
    lines.append(f"# {display} Skills")
    lines.append("")

    # Phase flow diagram (E-08)
    if group in PHASE_FLOWS:
        lines.append("## How these skills connect")
        lines.append("")
        lines.append(PHASE_FLOWS[group])
        lines.append("")

    lines.append("## Skills in this phase")
    lines.append("")
    lines.append(f"| Skill | Description | Command |")
    lines.append(f"|-------|-------------|---------|")

    for s in sorted(skills, key=lambda x: x["name"]):
        cmd_str = f"`/{s['command']}`" if s["command"] else "—"
        desc = s["description"][:80] + "..." if len(s["description"]) > 80 else s["description"]
        lines.append(f"| [{s['name']}]({s['name']}.md) | {desc} | {cmd_str} |")

    lines.append("")

    output_path.write_text("\n".join(lines), encoding="utf-8")


def generate_commands_reference(all_skills: list) -> None:
    """Generate a commands reference page."""
    output_path = ROOT / "docs" / "reference" / "commands.md"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    lines = []
    lines.append("---")
    lines.append('title: "Commands Reference"')
    lines.append('description: "All slash commands available in PM Skills."')
    lines.append("---")
    lines.append("")
    lines.append("# Commands Reference")
    lines.append("")
    lines.append("PM Skills ships 36 slash commands: 29 skill commands plus 7 workflow commands.")
    lines.append("")
    lines.append("| Command | Skill | Phase | Description |")
    lines.append("|---------|-------|-------|-------------|")

    for s in sorted(all_skills, key=lambda x: x.get("command", "") or ""):
        if s["command"]:
            desc = s["description"][:60] + "..." if len(s["description"]) > 60 else s["description"]
            lines.append(
                f"| `/{s['command']}` | [{s['name']}](../skills/{s['group']}/{s['name']}.md) "
                f"| {s['group_display']} | {desc} |"
            )

    # Add workflow commands
    lines.append("| `/workflow-customer-discovery` | [Customer Discovery](../workflows/customer-discovery.md) | Workflow | Run the Customer Discovery workflow |")
    lines.append("| `/workflow-feature-kickoff` | [Feature Kickoff](../workflows/feature-kickoff.md) | Workflow | Run the Feature Kickoff workflow |")
    lines.append("| `/workflow-post-launch-learning` | [Post-Launch Learning](../workflows/post-launch-learning.md) | Workflow | Run the Post-Launch Learning workflow |")
    lines.append("| `/workflow-product-strategy` | [Product Strategy](../workflows/product-strategy.md) | Workflow | Run the Product Strategy workflow |")
    lines.append("| `/workflow-sprint-planning` | [Sprint Planning](../workflows/sprint-planning.md) | Workflow | Run the Sprint Planning workflow |")
    lines.append("| `/workflow-stakeholder-alignment` | [Stakeholder Alignment](../workflows/stakeholder-alignment.md) | Workflow | Run the Stakeholder Alignment workflow |")
    lines.append("| `/workflow-technical-discovery` | [Technical Discovery](../workflows/technical-discovery.md) | Workflow | Run the Technical Discovery workflow |")
    lines.append("")

    output_path.write_text("\n".join(lines), encoding="utf-8")


def print_nav_snippet(groups: dict) -> None:
    """Print the nav YAML snippet for mkdocs.yml."""
    print("\n# === NAV SNIPPET FOR mkdocs.yml ===")
    print("  - Skills:")
    print("    - skills/index.md")

    for group in PHASE_ORDER:
        if group not in groups:
            continue
        display = PHASE_DISPLAY[group]
        print(f"    - {display}:")
        print(f"      - skills/{group}/index.md")
        for s in sorted(groups[group], key=lambda x: x["name"]):
            print(f"      - skills/{group}/{s['name']}.md")

    print("# === END NAV SNIPPET ===")


def main():
    if not SKILLS_DIR.exists():
        print(f"Error: skills directory not found at {SKILLS_DIR}", file=sys.stderr)
        sys.exit(1)

    all_skills = []
    groups = {}

    # Generate individual skill pages
    for skill_dir in sorted(SKILLS_DIR.iterdir()):
        if not skill_dir.is_dir():
            continue
        info = generate_skill_page(skill_dir)
        if info:
            all_skills.append(info)
            groups.setdefault(info["group"], []).append(info)

    print(f"Generated {len(all_skills)} skill pages")

    # Generate phase index pages
    for group, skills in groups.items():
        generate_phase_index(group, skills)
        print(f"  {PHASE_DISPLAY.get(group, group)}: {len(skills)} skills")

    # Generate commands reference
    generate_commands_reference(all_skills)
    print(f"Generated commands reference page")

    # Print nav snippet
    print_nav_snippet(groups)


if __name__ == "__main__":
    main()
