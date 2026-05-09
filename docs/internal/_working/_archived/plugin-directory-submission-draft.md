# Plugin Directory Submission . Copy/Paste Draft

> **Form URL:** https://claude.ai/settings/plugins/submit
> **Alt:** https://clau.de/plugin-directory-submission
> **Note:** Multi-page form. Fields below match the actual form as of 2026-03-22.

---

## Page 1: Plugin Information

### Plugin Links

**Link to plugin** * (required):
```
https://github.com/product-on-purpose/pm-skills
```

**Plugin homepage** (optional . public documentation site):
```
https://github.com/product-on-purpose/pm-skills
```
> If a GitHub Pages site is created, use that URL instead (e.g., `https://product-on-purpose.github.io/pm-skills`). See [GitHub Pages Decision](#github-pages-decision) below.

### Plugin Details

**Plugin name** *:
```
pm-skills
```
> Note: Check that the name isn't taken. `phuryn/pm-skills` exists (7.9K stars) but is a different project. The form checks the Claude plugin namespace, not GitHub . the name should be available.

**Plugin description** *:
```
PM-Skills is an open-source collection of 27 professional product management skills organized by the Triple Diamond framework. Each skill includes structured AI instructions (SKILL.md), an output template (TEMPLATE.md), and a real-world example (EXAMPLE.md).

Covers the full PM lifecycle across 6 phases: Discover (interviews, competitive analysis, stakeholders), Define (problem statements, hypotheses, opportunity trees, JTBD), Develop (solution briefs, ADRs, design rationale), Deliver (PRDs, user stories, acceptance criteria, edge cases, launch checklists, release notes), Measure (experiments, instrumentation, dashboards), and Iterate (retrospectives, lessons, refinement, pivot decisions).

Also includes a foundation persona skill, an interactive skill builder (/pm-skill-builder), 3 workflows, and a companion MCP server (pm-skills-mcp on npm). 28 slash commands. Apache 2.0 licensed.
```

**Example use cases** *:
```
Example 1: Product manager needs to write a PRD for a new feature. Uses /prd "Add real-time collaboration to document editor" and gets a structured PRD with goals, requirements, scope boundaries, dependencies, and success metrics . ready for engineering handoff.

Example 2: Team starting a new initiative needs to frame the problem clearly. Uses /problem-statement "Customer churn in enterprise segment" to produce a problem framing document with user impact, business context, and measurable success criteria that aligns stakeholders before solutioning begins.

Example 3: PM preparing for sprint planning needs acceptance criteria for a user story. Uses /acceptance-criteria "As a user, I can reset my password via email" to generate Given/When/Then scenarios covering the happy path, edge cases (expired links, multiple requests), and error states.

Example 4: After a product launch, the team wants to capture learnings. Uses /retrospective "Q1 mobile app redesign" to facilitate a structured retrospective with what went well, what to improve, and concrete action items with owners.

Example 5: A contributor wants to create a new PM skill for the library. Uses /pm-skill-builder "A skill for creating stakeholder update emails" and the builder runs gap analysis, classifies the skill, selects exemplars, and generates draft files ready for PR.
```

---

## Remaining Pages

The form may have additional pages. Possible fields based on other plugin submissions:

**Category** (if asked):
```
productivity
```

**Author / Organization** (if asked):
```
product-on-purpose
```

**License** (if asked):
```
Apache-2.0
```

**Tags / Keywords** (if asked):
```
product-management, pm, prd, user-stories, acceptance-criteria, triple-diamond, lean-startup, design-thinking, agent-skills
```

**Screenshots** (if asked):
> Consider taking a screenshot of a /prd or /hypothesis output in Claude Code. Shows the skill in action.

**Contact email** (if asked):
> Use your Anthropic account email or the org contact.

---

## GitHub Pages Decision

The "Plugin homepage" field accepts a documentation site URL. Options:

### Option A: Use GitHub repo URL (current)
- `https://github.com/product-on-purpose/pm-skills`
- Pros: Already exists, README is polished, zero effort
- Cons: Less professional than a dedicated docs site

### Option B: Create a GitHub Pages site
- `https://product-on-purpose.github.io/pm-skills`
- Pros: Professional landing page, better discoverability, dedicated docs experience
- Cons: Needs creation and maintenance
- Implementation: Could use Jekyll/Hugo with the existing docs/ content, or a simple single-page landing page
- Effort estimate: 2-4 hours for a polished site using existing content

### Recommendation
**Start with Option A** (GitHub repo URL) to submit now. Create the GitHub Pages site later as a separate effort . it's not blocking for the submission. The README is already comprehensive enough for reviewers. Add the Pages URL to the submission later if needed.

---

## After Submission

1. Monitor for acceptance notification (no published SLA . could be days or weeks)
2. If accepted: update README with plugin directory install badge
3. If questions from reviewer: respond promptly . all artifacts are in place
4. If name conflict: may need to use `pm-skills-toolkit` or `pm-skills-library` as alternatives
5. Update `docs/internal/backlog-canonical.md` . mark Effort 0 as submitted/complete
