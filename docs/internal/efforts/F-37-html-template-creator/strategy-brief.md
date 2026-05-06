# Strategy Brief: Utility Skill for Self-Contained HTML Template Creator

**Effort:** F-37
**Date:** 2026-04-20
**Status:** Discovery (pre-specification)
**Author:** Claude Opus 4.7 (1M context) with user input
**Scope:** A new utility skill that creates reusable, attractive, scalable HTML templates to serve as standard output for other pm-skills.

---

## 1. What I Understand (Input Mirror)

You want a new utility skill whose job is to produce a canonical, shareable HTML template. The template itself should be:

- **Attractive**: visual design quality that holds up next to contemporary SaaS artifacts (Notion, Linear, Gamma).
- **Thoughtful**: considered typography, hierarchy, spacing, semantic structure.
- **Scalable**: works across short and long outputs, simple and complex structures, across all 38 pm-skills.
- **Useful**: actually gets adopted by other skills as their standard HTML output.
- **Self-contained**: single HTML file with inline CSS, no external dependencies, matching the foundation-lean-canvas precedent.

Sub-threads I hear inside the request:

- **Tool shape**: what does invoking the skill produce? (A committed HTML template in another skill's `references/` folder? A live artifact? Both?)
- **Design-system scope**: does this ship one shared aesthetic, or does it generate bespoke templates per skill that share meta-conventions?
- **Adoption model**: how do the other 37 skills onboard? (Opt-in, forced migration, family-by-family, never?)
- **Scope boundary vs F-22 (prototype-creator) and F-23 (prototype-styler)**: those target feature UIs (dashboards, forms). This targets skill artifacts (PRDs, canvases, briefs, recaps). Same HTML medium, different purpose. Need a clean line.

Confirm the framing before the brief goes deeper: **this is a creator skill for artifact templates, not for feature prototypes, and the templates become the standard HTML output for other pm-skills**.

---

## 2. Problem Space

### Why now

v2.11.0 shipped the first HTML artifact companion: `foundation-lean-canvas` with `references/html-template.html` and 3 thread-aligned `.html` samples. It was well-received (it's a reason the release landed clean) and made visible how much better a rendered HTML canvas is for sharing, printing, and exec review than plain markdown.

At the same time, 37 of 38 skills still ship markdown-only. Each of those outputs has a weaker "show the deliverable" moment than foundation-lean-canvas. Without a shared approach, any attempt to add HTML output per skill will fragment: every skill reinvents tokens, every template has a different header, every sample looks like a snowflake. This is exactly the failure F-23 diagnosed at the prototype-UI layer, now recurring at the artifact-output layer.

### What "solved" looks like

- A skill author running `/utility-html-template` (or equivalent) gets a good HTML template file dropped into their skill's `references/` folder, aligned with pm-skills visual conventions, ready to ship.
- A PM running any skill on a real deliverable can emit an HTML artifact that looks consistent across the library, renders cleanly in a browser, prints to PDF sensibly, and holds up next to a stakeholder's polished Notion page.
- Library samples across skills feel like a family, not a pile of one-offs.
- Accessibility baseline (WCAG AA contrast, semantic markup, focus rings) is a contract, not a nice-to-have.

### Who is affected

- **Skill authors** (you, plus future contributors): repeatable recipe instead of hand-rolling CSS every time.
- **Skill consumers** (PMs using skills in live work): shareable artifacts without conversion steps.
- **Sample generators**: 120 library samples today. If HTML becomes standard, sample generation needs an HTML variant per thread. This is real work and needs to be costed.
- **CI/validation**: likely a new family-contract-style enforcement layer (template present, uses shared tokens, passes accessibility baseline).
- **MCP consumers**: pm-skills-mcp has 28 embedded skills (frozen per M-22). HTML templates may or may not port; worth naming the gap early.

### Adjacent problems surfaced

- **Shared palette vs per-skill semantic colors**: lean-canvas uses 6 accent colors mapped to canvas blocks. A retrospective's semantic colors (start, stop, continue) are different. One shared palette is probably wrong; a token-naming convention that lets each skill declare its semantics is probably right.
- **Print vs display**: HTML that prints cleanly differs from HTML that displays cleanly. Decide whether both are in scope.
- **Dark mode**: easy to defer, hard to retrofit. Decide early even if the decision is "light only for v1".
- **Theming**: does a user get to pick a theme, or is the aesthetic opinionated? Opinionated is faster and the pm-skills precedent.
- **Internationalization, right-to-left**: likely out of scope; worth naming so it's not assumed in.

---

## 3. Analysis

### Core lenses

**Strengths.**
- Precedent exists. foundation-lean-canvas proved single-file HTML with CSS custom properties works at pm-skills scale.
- Compounding leverage. One utility skill generates or underpins templates for up to 37 other skills.
- Aligns with the skill-families pattern. Cross-cutting contracts with enforcing CI already work in v2.11.0.
- Low user-facing risk. Utility skills don't ship user artifacts directly; mistakes are contained to the template, not to PM deliverables.

**Weaknesses.**
- Design is judgment, not validation. Unlike CI checks, "attractive" cannot be red/green tested; eval loops are harder.
- Maintenance tax. A shared design system across many skills becomes a coordination point; changing a token ripples.
- Over-standardization risk. Some skills benefit from visual distinctiveness (a lean canvas legitimately looks nothing like a meeting recap, and that's correct).
- Duplication with F-22/F-23. Unless scope is sharp, this overlaps the prototype-styler work and confuses contributors on which to use.

**Risks.**
- **Scope creep**: from "artifact template" to "full design system" to "brand kit". The lean canvas took real work. Multiplying that by 38 is a quarter-plus of work if done poorly.
- **Premature consolidation**: forcing all skills to adopt before the template is battle-tested. n=1 is not enough; canonizing at n=1 bakes in lean-canvas-specific quirks.
- **Agent output cost**: HTML generation inflates tokens 3-5x over markdown. For high-frequency skills (meeting-brief, meeting-recap, running several times per week), this is a real operational cost.
- **Divergence from MCP-embedded skills**: HTML templates require file-based resources; the MCP embedding story may differ.

**Open questions.**
- Is the output one template or one template plus variants (compact, full, print)?
- Does the skill take an existing `TEMPLATE.md` and infer HTML structure, or ask shape questions?
- Where does "attractive" come from: defaults only, or themable?
- How does this relate to the `brand-guidelines` and `theme-factory` skills already available in the harness? (Those appear Anthropic-internal; pm-skills needs its own, Apache 2.0.)

**Concerns.**
- Starting with abstract design-system thinking will stall. Starting by converting 2-3 existing skills to HTML and extracting commonalities will ship faster and be more trustworthy.
- Naming: "template creator" sounds like it makes `TEMPLATE.md` files, which already exist by convention. Risk of confusion with the existing `references/TEMPLATE.md` pattern.

### Situational lenses

**Scalability.** The 38-skill scale means the template must be parametric (title, sections, content blocks) rather than hard-coded. It has to handle short outputs (a hypothesis, ~500 words) and long ones (a full PRD, 2,500+ words) without layout breakage, content overflow, or print-pagination disasters.

**Build-vs-borrow.** theme-factory and brand-guidelines exist in the harness. Can pm-skills borrow token systems from them as a starting point, or does the Apache 2.0 open-source posture require an independent token set? This is a real licensing and attribution question to resolve early.

**Dogfooding.** If the utility skill is itself a pm-skills skill, its `SKILL.md` and `references/` should demonstrate the pattern. The skill's own reference HTML is the best exemplar. Self-demonstration is a credibility multiplier.

---

## 4. Approaches

### Approach A. Single canonical template plus extraction-driven evolution

Ship one shared HTML template (e.g., `pm-artifact.html`) with CSS custom-property tokens. Every skill copies and fills in content slots. When a skill has distinct visual needs (canvas grid, card deck, kanban), it extends the base with additional CSS scoped to the skill. The utility skill bootstraps the extension and ensures the base copy is current.

- **Pros**: tight design consistency; low per-skill effort once the base is stable; one file to maintain; a family-contract-style validator is straightforward.
- **Cons**: extensions creep and fragment; "shared" vs "skill-specific" boundary is hard to police; base updates can silently break dependents.
- **Key risk**: the base either becomes too opinionated (fights every skill) or too generic (forces every skill to extend, defeating the point).
- **Effort**: Medium. Roughly 2-3 weeks to ship the base plus convert 3 skills.
- **Honest take**: the safest starting point but the hardest to scale gracefully past 10-ish skills.

### Approach B. Template factory that generates bespoke self-contained HTML per skill

The utility skill is a generator. Given a skill's output shape (sections, block types, emphasis rules, sample data), it produces a standalone HTML file committed to that skill's `references/`. Each skill ends up with its own HTML template, but all templates follow the same meta-pattern (token naming, layout primitives, accessibility baseline). No runtime-shared CSS.

- **Pros**: each skill stays self-contained (matches the single-file constraint exactly); visual distinctiveness possible without breaking others; the generator's rules are the real design system, not the output files.
- **Cons**: up to 38 templates to maintain over time; token drift if the generator isn't strict; regenerating requires re-running the utility, so hand edits create a drift-vs-regenerate sync problem.
- **Key risk**: generated templates drift from the generator's intent over time as skills evolve.
- **Effort**: Medium-High. Roughly 3-4 weeks to ship the generator plus convert 3 skills; ongoing cost to keep generator and templates in lockstep.
- **Honest take**: this is the most faithful interpretation of the user's literal request ("a skill that creates templates"). Highest upside, highest authorship cost.

### Approach C. HTML-templating convention plus linter, no creator skill

Document the HTML template convention (token names, structure, accessibility baseline) as a skill-family-style contract document. Ship a validator that enforces conformance. Authors hand-write HTML templates following the contract. No creator skill at all. This becomes F-23-adjacent tooling, not a utility skill.

- **Pros**: lowest coordination cost; matches how `docs/reference/skill-families/meeting-skills-contract.md` works; contributors learn by reading the contract, not running a tool.
- **Cons**: high per-skill-author burden; design quality highly variable; no "I invoked the skill and got a good result" moment; the experience lacks a hook.
- **Key risk**: adoption stalls because writing attractive HTML from scratch is intimidating for most contributors.
- **Effort**: Low. Roughly 1 week for the contract plus validator.
- **Honest take**: how v2.11.0 solved meeting-skills consistency. Viable as a fallback, but the user specifically asked for a creator skill, so this is Plan Z.

### Approach D. Hybrid. Shared base plus skill-specific generator

Combine A and B. Ship a base template with tokens plus layout primitives (header, section, callout, table, footer, meta block). The utility skill generates a skill-specific HTML file that inlines the base (still self-contained per file) and adds skill-specific overrides. Generator output is small; base updates propagate via regeneration.

- **Pros**: best of A's consistency and B's bespokeness; inline-copy preserves self-containment; generator stays simple because the base does the heavy lifting.
- **Cons**: the most moving parts; two artifacts to maintain in lockstep; regeneration becomes a workflow the team has to run.
- **Key risk**: regeneration pipeline becomes the bottleneck; skills drift when authors hand-edit rather than regenerating.
- **Effort**: High. Roughly 4-5 weeks to ship base plus generator plus 3 converted skills plus the regeneration tooling.
- **Honest take**: probably the right long-term answer, but premature until the base is proven at n >= 3.

---

## 5. The 80/20 Recommendation

**Start with Approach B (bespoke generator skill), constrained to 3 pilot skills, with an explicit documented path to Approach D later once real commonalities are known.**

Reasoning:

- The user's request reads most naturally as "a creator skill" (B), not a contract doc (C) or a shared include (A).
- foundation-lean-canvas is the proof of concept for self-contained HTML; extend that pattern, don't replace it.
- Converting just 3 skills will surface ~80% of the design-system concerns without committing to all 37 templates up front. The cost of being wrong at n=3 is a few weeks; the cost of being wrong at n=38 is a quarter.
- After the 3 pilots, extracting shared tokens and primitives into a base is a natural evolution toward D. At that point you'll know what actually needs to be shared versus what should stay bespoke.

### Concrete next steps

1. **Pick 3 pilot skills** to maximize coverage variance. Proposed:
   - `deliver-prd` (long form, structured, high-stakes; stress-tests layout at length)
   - `define-problem-statement` (short form, narrative; stress-tests typography and density)
   - `iterate-retrospective` (structured sections with semantic colors; stress-tests token vocabulary for non-canvas semantics)
   Rationale: range of output length, range of structure complexity, none already have HTML templates, none blocked by meeting-skills-family contract work.
2. **Hand-craft the HTML template for `deliver-prd` first.** The longest output stress-tests layout, pagination, and print earliest. Iterate on tokens and primitives while working.
3. **Extract the generation recipe into a draft `SKILL.md` for `utility-html-template`.** Dogfood the draft skill on the second pilot (`define-problem-statement`).
4. **Refine the skill on the third pilot** (`iterate-retrospective`). Then write the specification in `docs/internal/efforts/F-37-html-template-creator/specification.md`.

### Explicitly defer

- Full design-system extraction. Wait for n=3 pilots before generalizing.
- Mandatory adoption across 38 skills. Opt-in for the first milestone after ship; reassess.
- Dark mode. Light only for v1; add as a variant when the token system is stable.
- Print-specific CSS. `@media print` works for most cases; specialized print styling comes later.
- Theming and customization. Opinionated defaults first; customization is a v2 feature.
- MCP embedding of HTML templates. Keep pm-skills-mcp frozen scope per M-22; revisit later.

### Confidence

Medium-High. High on the approach (bespoke generator, extract later); medium on the exact 3-pilot choice (there's a defensible case for swapping `iterate-retrospective` with `develop-adr` or `deliver-release-notes`). The phased plan limits blast radius: if it doesn't work at n=3, you've spent 2-3 weeks, not a quarter.

---

## 6. Evidence and Source Map

- **foundation-lean-canvas artifacts**
  - `skills/foundation-lean-canvas/references/html-template.html` (the n=1 template)
  - `library/skill-output-samples/foundation-lean-canvas/*.html` (3 thread-aligned samples)
  These are the only pm-skills HTML artifacts today. They're the source of truth for what "good" looks like in v2.11.0.
- **Cross-skill contract precedent**
  - `docs/reference/skill-families/meeting-skills-contract.md` (how cross-cutting contracts work in practice)
  - `scripts/validate-meeting-skills-family.sh` (enforcing CI pattern that could adapt to HTML-template conformance)
- **Conventions framing placement**
  - `AGENTS.md`, `CLAUDE.md` (project rules)
  - Existing `.sh + .ps1 + .md` script pattern; `SKILL.md + references/TEMPLATE.md + references/EXAMPLE.md` skill pattern; `commands/{name}.md` slash-command pattern.
- **Evidence gaps**
  - No user research on whether PMs consuming pm-skills actually want HTML output versus markdown-to-PDF conversion.
  - No cost data on token inflation for HTML generation at scale.
  - No prior cross-skill HTML adoption in pm-skills beyond lean-canvas; all extrapolation is from n=1.
- **External (reasoning support only, not evidence)**
  - Notion AI, Gamma, Copilot Pages default to rich-output artifacts, which supports the direction but isn't decisive evidence. Analysis is primarily reasoning over repo state, not market data.

---

## 7. Uncertainties and Open Items

### Uncertainties with confidence labels

- **High confidence.** Utility classification is correct. This supports other skills; it's not a user-facing phase output.
- **High confidence.** The self-contained single-file HTML constraint is correct and inherits cleanly from foundation-lean-canvas.
- **Medium-High confidence.** Approach B is the right starting point. A or D are defensible alternatives; B best fits the literal ask.
- **Medium confidence.** `utility-html-template` is a good skill name. Alternatives worth weighing: `utility-html-artifact`, `utility-output-template`, `utility-html-creator`, `utility-artifact-html`. Worth a short naming ADR.
- **Medium confidence.** 3 pilots is the right sample size. 2 might ship faster; 5 might extract more confidently. 3 is a judgment call balancing signal against cost.
- **Low confidence.** Milestone target. v2.12.0 backlog already has 8 efforts; v2.13.0 or later is likely, but depends on release cadence and user priority.

### Requires human judgment

- **Which 3 pilot skills.** I proposed by output-length range; you might weight by skill-usage frequency (prefer skills you actually run) or by family membership (prefer meeting-skills-family to stack value on the newest family) or by visibility (prefer deliver-prd because it's the highest-stakes output).
- **Whether HTML eventually supplants markdown or coexists.** Coexistence is the default assumption here. Pure-HTML-output would be a much bigger shift with a separate scoping discussion.
- **Scope boundary vs F-22 and F-23.** The spec should draw an explicit line so contributors don't pick the wrong tool for the job.
- **Whether pm-skills can borrow from harness-level brand-guidelines/theme-factory skills or must build independently.** Licensing and attribution implications.

### Would benefit from additional research

- **User demand signal.** A lightweight poll or GitHub Discussion: do PMs running pm-skills actually want HTML output, or is markdown-to-PDF adequate?
- **Cost model.** Token-delta measurement between markdown and HTML generation across 3-5 representative skills.
- **Prior art scan.** Notion, Gamma, Linear templates for patterns that hold up at scale (specifically: how they handle long-form vs short-form artifacts in the same system).
- **Accessibility baseline sources.** WCAG AA as a starting point; decide whether to go further (AAA, cognitive-accessibility patterns) or keep the baseline pragmatic.

### Offered follow-up generation

- `/jp-create-spec` on F-37 once you've confirmed the approach. I can draft `specification.md` in this effort folder with acceptance criteria, artifact list, and pilot-skill commitments.
- `/jp-ai-review --review` on this strategy brief for a Codex or second-LLM adversarial pass before the spec is written.
- A naming micro-ADR on `utility-html-template` vs alternatives.
- A pilot-selection micro-ADR on the 3-skill choice.
- A proof-of-concept HTML template hand-crafted for `deliver-prd` to stress-test the pattern before the generator skill is authored.

Tell me which of these to generate next, or flag anything in the brief that needs rethinking before we move toward specification.
