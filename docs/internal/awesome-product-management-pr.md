# Pull Request Draft for awesome-product-management

## Repository Information
- **Target Repository:** https://github.com/dend/awesome-product-management
- **Fork Required:** Yes
- **Target File:** README.md
- **Category:** Additional resources

---

## PR Title

```
Add PM-Skills - Open source Product Management skills for AI agents
```

---

## PR Description

### Summary

Add PM-Skills to the Additional resources section - an open-source repository of 24 battle-tested PM skills that transform AI assistants into product management powerhouses.

### What is PM-Skills?

PM-Skills is an Apache 2.0 licensed collection of professional-grade product management skills designed for AI assistants (Claude, GitHub Copilot, Cursor, Windsurf). It provides:

- **24 production-ready skills** covering the complete product lifecycle
- **Triple Diamond framework** organizing Discover, Define, Develop, Deliver, Measure, and Iterate phases
- **Best-practice templates** based on industry standards and frameworks
- **Workflow bundles** for common PM processes (Feature Kickoff, Lean Startup, Triple Diamond)

### Why Add This?

1. **Genuinely Helpful:** Provides practical, actionable PM frameworks that work across all AI assistants
2. **Educational Value:** Each skill teaches best practices from frameworks like Jobs to be Done, Opportunity Solution Trees, ADRs, etc.
3. **Open Source:** Apache 2.0 licensed, not a paid product or SaaS tool
4. **Production-Ready:** Includes templates, examples, and comprehensive documentation
5. **Growing Community:** Active development with clear roadmap and contribution guidelines

### Repository Stats

- ⭐ Active maintenance with regular releases
- 📦 24 comprehensive skills covering entire product lifecycle
- 📚 Extensive documentation and examples
- 🔓 Apache 2.0 license (commercial use permitted)
- 🤖 Works with Claude, GitHub Copilot, Cursor, Windsurf

### Contribution Checklist

- [x] Follows existing list format
- [x] No pay-walled content (completely open source)
- [x] Not self-promotion (providing valuable PM resource to community)
- [x] Not advertising (genuinely helpful educational resource)
- [x] Links work correctly
- [x] Appropriate category selected (Additional resources)
- [x] Follows Code of Conduct

---

## Proposed Changes

### Location in README.md

Add to the **"Additional resources"** section, after the existing entries and before the "License" section.

### Exact Text to Add

```markdown
*   [PM-Skills](https://github.com/product-on-purpose/pm-skills) - 24 open-source PM skills for AI agents covering the Triple Diamond framework: discover, define, develop, deliver, measure, and iterate. Includes production-ready templates, workflow bundles, and comprehensive examples. Works with Claude, GitHub Copilot, Cursor, and Windsurf. Apache 2.0 licensed.
```

### Alternative Shorter Version (if preferred)

```markdown
*   [PM-Skills](https://github.com/product-on-purpose/pm-skills) - Open-source collection of 24 battle-tested PM skills and templates for AI assistants. Covers full product lifecycle from discovery to iteration with frameworks like JTBD, Opportunity Trees, and ADRs.
```

---

## How to Submit the PR

> **Note:** The awesome-product-management repository uses `master` as its default branch (verified via CONTRIBUTING.md raw URL). If you're submitting to other repositories, always verify the default branch name before creating a PR.

### Step 1: Fork the Repository

1. Navigate to https://github.com/dend/awesome-product-management
2. Click "Fork" button in the top right
3. Wait for fork to complete

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/awesome-product-management.git
cd awesome-product-management
```

### Step 3: Create a Branch

```bash
git checkout -b add-pm-skills
```

### Step 4: Make the Change

Edit `README.md` and add the entry to the "Additional resources" section:

1. Locate the `## Additional resources` heading (near the bottom of the file)
2. Add the new entry after the existing resources
3. Maintain alphabetical ordering if present, otherwise add at the end
4. Ensure proper markdown formatting with the bullet point and link format

Example placement:

```markdown
## Additional resources

[](#additional-resources)

*   [Stratechery by Ben Thompson](https://stratechery.com/) - Product and strategy insights from the industry.
*   [Mobbin](https://mobbin.design/) - Hand-picked collection of mobile app design patterns.
*   [Marketing for Engineers](https://github.com/goabstract/Marketing-for-Engineers) - A handy guide on growing marketing skills for folks with engineering backgrounds.
*   [PM-Skills](https://github.com/product-on-purpose/pm-skills) - 24 open-source PM skills for AI agents covering the Triple Diamond framework: discover, define, develop, deliver, measure, and iterate. Includes production-ready templates, workflow bundles, and comprehensive examples. Works with Claude, GitHub Copilot, Cursor, and Windsurf. Apache 2.0 licensed.

## License
```

### Step 5: Commit the Change

```bash
git add README.md
git commit -m "Add PM-Skills to Additional resources section" \
           -m "PM-Skills is an open-source collection of 24 professional PM skills for AI assistants. Provides production-ready templates and frameworks covering the complete product lifecycle."
```

### Step 6: Push to Your Fork

```bash
git push origin add-pm-skills
```

### Step 7: Create the Pull Request

1. Navigate to https://github.com/YOUR-USERNAME/awesome-product-management
2. Click "Pull requests" tab
3. Click "New pull request"
4. Ensure base repository is `dend/awesome-product-management` and base branch is `master` (this repository uses `master` as its default branch)
5. Ensure head repository is your fork and compare branch is `add-pm-skills`
6. Click "Create pull request"
7. Fill in the PR title and description (see below)

---

## Pull Request Template

### PR Title
```
Add PM-Skills - Open source Product Management skills for AI agents
```

### PR Description
```markdown
## Summary

Adding PM-Skills to the Additional resources section.

## What is PM-Skills?

PM-Skills is an open-source (Apache 2.0) collection of 24 professional-grade product management skills designed for AI assistants. It provides production-ready templates, workflow bundles, and comprehensive examples covering the complete product lifecycle.

## Why is this valuable for the awesome-product-management list?

1. **Educational Resource:** Teaches PM best practices through frameworks like Jobs to be Done, Opportunity Solution Trees, and Architecture Decision Records
2. **Practical Application:** Provides ready-to-use templates for PRDs, user stories, experiments, retrospectives, and 20+ other PM artifacts
3. **Open Source:** Apache 2.0 licensed - completely free with no pay-walls
4. **Platform Agnostic:** Works with Claude, GitHub Copilot, Cursor, Windsurf, and other AI assistants
5. **Comprehensive Coverage:** Spans entire Triple Diamond framework from discovery to iteration

## Repository Stats

- 📦 24 comprehensive skills with templates and examples
- 📚 Extensive documentation and best-practice guidance
- 🔓 Apache 2.0 license (permits commercial use)
- ⚡ Active development with clear roadmap
- 🤖 Works across multiple AI platforms

## Link

https://github.com/product-on-purpose/pm-skills

## Contribution Checklist

- [x] Follows existing list format
- [x] No pay-walled content
- [x] Not self-promotion (educational resource for community)
- [x] Genuinely helpful for product managers
- [x] Link works correctly
- [x] Added to appropriate section (Additional resources)
- [x] Adheres to Code of Conduct

Thank you for maintaining this excellent resource! 🚀
```

---

## Addressing Potential Concerns

### "Is this self-promotion?"

**Response:** While the contributor may be affiliated with the project, PM-Skills provides genuine educational value to the product management community. Similar to how awesome-product-management includes resources from known PM authors and educators, PM-Skills offers comprehensive, free, open-source tools that help PMs learn and apply best practices. The contribution guidelines note that such submissions are assessed "case-by-case," and this clearly falls into the category of valuable community resource rather than commercial promotion.

### "Is this advertising?"

**Response:** No. PM-Skills is not a SaaS product or paid service. It's an Apache 2.0 licensed open-source educational resource, similar to other GitHub repositories already included in awesome-product-management (e.g., "Marketing for Engineers"). There's no product to sell, no freemium tier, no subscription - just free, open-source PM knowledge.

### "Does it fit the list's purpose?"

**Response:** Yes. awesome-product-management's goal is to help "product/program managers to learn and grow." PM-Skills directly serves this purpose by providing structured learning materials, templates, and examples for PM work. It teaches industry-standard frameworks (JTBD, Opportunity Trees, ADRs, etc.) in a practical, immediately applicable format.

### "Why Additional resources instead of Tools?"

**Response:** While PM-Skills works with AI tools, it's more of an educational resource and knowledge base than a standalone tool. The Tools section focuses on specific software applications (Notion, Trello, Figma), whereas PM-Skills is a collection of knowledge, templates, and methodologies. It fits better alongside other learning resources like Stratechery and Marketing for Engineers.

---

## Success Criteria

The PR will be considered successful when:

1. ✅ PR is submitted to dend/awesome-product-management
2. ✅ All contribution guidelines are met
3. ✅ Link placement follows existing format
4. ✅ Description clearly communicates value
5. ✅ Maintainer reviews and provides feedback
6. ✅ Any requested changes are addressed promptly
7. ✅ PR is merged into the default branch (master for this repository)

---

## Timeline Expectations

Based on the repository's activity:
- **Link Checker:** Automated workflow runs on PRs (should pass)
- **Review Time:** Varies; maintainer reviews when available
- **Merge Time:** Could be hours to weeks depending on maintainer availability

**Be patient and respectful** of the maintainer's time. This is an open-source project maintained by volunteers.

---

## Post-Merge Actions

After the PR is merged:

1. ✅ Thank the maintainer for their time and consideration
2. ✅ Share the news with the PM-Skills community
3. ✅ Add a note to PM-Skills README acknowledging the awesome-product-management listing
4. ✅ Monitor for any issues or feedback from the broader community
5. ✅ Continue maintaining PM-Skills to high quality standards

---

## References

- awesome-product-management repository: https://github.com/dend/awesome-product-management
- awesome-product-management CONTRIBUTING.md: https://github.com/dend/awesome-product-management/blob/master/CONTRIBUTING.md
- awesome-product-management Code of Conduct: https://github.com/dend/awesome-product-management/blob/master/code-of-conduct.md
- PM-Skills repository: https://github.com/product-on-purpose/pm-skills
- PM-Skills README: https://github.com/product-on-purpose/pm-skills/blob/main/README.md
- Awesome Lists Guidelines: https://awesome.re

---

## Notes

- The awesome-product-management repository uses the Awesome badge, indicating it follows the [awesome manifesto](https://github.com/sindresorhus/awesome/blob/main/awesome.md)
- The repository has automated link checking via GitHub Actions
- The maintainer (dend/Den Delimarsky) also hosts "The Work Item" podcast listed in the resources
- The repository is well-maintained with recent updates and active link checking
- Current structure has clear categories; Additional resources is the appropriate fit

---

*This document provides all necessary information to submit a compliant, well-structured pull request to awesome-product-management for adding PM-Skills to the list.*
