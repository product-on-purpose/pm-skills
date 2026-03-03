# Persona Output Templates (v2.5.0)

Use exactly one template per output:
- `Product Persona Template` for `/persona product`
- `Marketing Persona Template` for `/persona marketing` (and `/persona buyer` alias)

Do not mix sections from both templates in one output.

---

## Product Persona Template

# [Persona Name] - [Archetype Label]

**[One sentence that captures the persona's core reality: what they do, what's at stake, and what makes their situation distinct.]**

| Field | Value |
| --- | --- |
| Persona ID | [ PU-### ] |
| Type | [ Primary / Secondary / Supplemental / Negative ] |
| Product scope | [ What areas of the product this persona covers ] |
| Valid for | [ User type, company size, context where this persona applies ] |
| Not valid for | [ Adjacent user types this persona explicitly does not represent ] |
| Confidence | [ Validated / Directional / Proto - with brief evidence basis ] |
| Last validated | [ YYYY-MM-DD ] |
| Owner | [ Team or individual responsible for maintenance ] |

**Quick orientation.** The Persona Card is the daily-use reference - extract it as a standalone one-pager. Sections 1-4 provide context and motivation. Sections 5-8 describe behavior and workflow. Sections 9-11 translate insight into product decisions. Evidence & Confidence calibrates trust.

> **Template note:** Blockquote notes (`>`) are authoring guidance - remove them from the completed persona. Each bolded entry should be 2-4 sentences unless noted otherwise. Tables are reserved for reference data only.

---

## Persona Card

> The daily-use artifact for design reviews, sprint planning, and onboarding. Must fit on one page. Every element must pass the test: would removing this change a product decision? If not, cut it.

**[Persona Name] - [Archetype Label]**
[2-3 sentences describing what this person does, who they serve, and why their relationship with the product domain matters.]

**Key quote:** "[De-identified verbatim quote from research that captures this persona's worldview or core frustration.]"

**Goals.** [3-4 goals as a flowing sentence or short list. Outcomes, not features.]

**Frustrations.** [3-4 behavioral-level frustrations. Problems, not feature requests.]

**Design rules - always.** [3 rules the product must follow for this persona.]

**Design rules - never.** [3 things the product must avoid for this persona.]

---

## 1. Demographics & Identity

| Attribute | Detail |
| --- | --- |
| Age | [ ] |
| Location | [ ] |
| Education | [ ] |
| Role | [ ] |
| Company size | [ ] |
| Team | [ Size and composition ] |
| Reports to | [ Direct manager -> skip level ] |
| Stakeholders | [ Who they deliver to or serve ] |
| Purchasing role | [ Decision-maker / Influencer / End user only ] |
| Accessibility | [ Assistive tech, vision/motor/cognitive considerations, situational constraints ] |

**[Career stage and trajectory.]** [Where they are in their career, what they're building toward, and how that shapes their relationship with tools in this domain.]

**[Organizational leverage.]** [Their influence relative to their seniority - who depends on their work, what breaks when they fail, what improves when they succeed.]

---

## 2. Technology & Environment Context

| Tool | Role |
| --- | --- |
| [ Tool name ] | [ What it does in their workflow ] |
| [ Tool name ] | [ What it does in their workflow ] |
| [ Tool name ] | [ What it does in their workflow ] |
| [ Tool name ] | [ What it does in their workflow ] |

**[Digital fluency level.]** [Their comfort with technology - not just "tech-savvy" or "non-technical" but what they can and can't do, what concepts they understand, and where they hit walls.]

**[Adoption and abandonment patterns.]** [How they evaluate new tools, what makes them stay, and what makes them leave. Include specific thresholds if known from research.]

**[Work environment.]** [Physical setup, device usage, interruption patterns, and how their environment shapes their relationship with the product.]

---

## 3. Jobs to Be Done

**Functional.** [When (situation), they need to (action) so that (outcome). Focus on the progress they're trying to make, not features they want.]

**Emotional.** [When (situation), they want to feel (emotional state) so that (consequence of that feeling). What does the experience need to deliver emotionally?]

**Social.** [How they want to be perceived by others as a result of doing this work well. What's the social reward for success or the social cost of failure?]

**Underlying.** [The deeper job they don't articulate - the structural tension or aspiration that shapes their relationship with every tool in this space. This is often the most strategically valuable insight in the persona.]

---

## 4. Goals & Motivations

> Life goal provides aspirational context. End goals define what they want to accomplish through the product domain - name each descriptively. Experience goals define how the product should feel during use.

**Life goal.** [The aspiration that gives context to everything else. What are they building toward that the product either supports or ignores?]

**[Descriptive end goal.]** [What they want to accomplish. Include the product implication - what this goal demands of the product.]

**[Descriptive end goal.]** [Same structure.]

**[Descriptive end goal.]** [Same structure.]

**[Descriptive experience goal.]** [How they want to feel during use. 1-2 sentences.]

**[Descriptive experience goal.]** [Same structure.]

**[Descriptive experience goal.]** [Same structure.]

---

## 5. Behavioral Patterns & Mental Models

**[Core mental model.]** [How they conceptualize their work in this domain. What metaphors do they use? What does their internal framing reveal about how the product should feel? 3-5 sentences - this is one of the most important entries in the persona.]

**[Primary work pattern.]** [The shape of their typical work - ratio of reactive to proactive, creating to modifying, solo to collaborative. What do they want that ratio to be vs. what it is?]

**[Accuracy and quality approach.]** [How they verify their work, what "good enough" means to them, and how that standard shifts by context.]

**[Tolerance thresholds.]** [Where they lose patience - with complexity, with configuration, with waiting, with ambiguity. Specific thresholds if known. 1-2 sentences.]

---

## 6. Decision-Making & Trust Patterns

**[How trust is built and broken.]** [The asymmetry of trust - how many positive experiences it takes to build vs. how quickly a single negative experience destroys it. Include specifics from research.]

**[Adoption filter.]** [The implicit questions they ask when evaluating a new tool or approach. Frame as a mental checklist they apply without articulating it.]

**[Risk profile.]** [Where they're risk-averse and where they're risk-tolerant. The boundary between exploration and commitment.]

**[Feature discovery behavior.]** [How they learn about new capabilities. Proactive? Accidental? Never? What this means for product investment in discoverability. 1-2 sentences.]

---

## 7. Workflow & Collaboration Context

**[Work rhythm.]** [The cadence of their work - anchored deadlines, fragmented time, deep focus blocks. How much uninterrupted time they typically have.]

**[Collaboration model.]** [Their role in the creator/consumer spectrum. Do they build, co-edit, review, consume? Who are their counterparts and what do those people do with their outputs?]

**[Key collaboration friction.]** [The specific way their collaboration model breaks down. What do their stakeholders or counterparts do that undermines the work?]

**[Dependencies.]** [What they depend on that they can't control - upstream data, other teams' processes, stakeholder availability. Where things break and who they blame.]

---

## 8. Current Alternatives & Workarounds

**[Primary alternative.]** [What they do today, with or without the product. The workflow they fall back to when the product fails them. Why that alternative persists despite its limitations.]

**[Where the product enters.]** [The specific role the product plays in their workflow today - and how fragile that position is.]

**[The firing trigger.]** [What specifically causes them to abandon the product and fall back to alternatives. The pattern, not just one anecdote.]

---

## 9. Pain Points & Unmet Needs

> Frame each as a behavioral problem, not a feature request. Include why it persists and what it costs in time, credibility, or confidence. Include as many as research supports - typically 3-6.

**[Pain point - descriptive label.]** [What the pain is, why it persists, and what it costs.]

**[Pain point - descriptive label.]** [Same structure.]

**[Pain point - descriptive label.]** [Same structure.]

**[Pain point - descriptive label.]** [Same structure.]

**[Pain point - descriptive label.]** [Same structure.]

---

## 10. Success Definition & Quality Bar

**[Accuracy standard.]** [What "correct" means to this persona. Zero tolerance? Directionally correct? Context-dependent?]

**[Timeliness standard.]** [What "on time" means. Their relationship with deadlines and the margin they expect.]

**[Self-sufficiency standard.]** [What a successful output looks like - does it need to stand alone, invite further exploration, generate action?]

**[Quality bar by context.]** [How the quality standard changes by situation. Describe 2-3 distinct contexts and what "good enough" means in each.]

---

## 11. Design Principles & Tradeoff Heuristics

> When two good ideas compete, these rules - derived from the persona's behavioral reality - resolve the tie. Include as many as the behavioral model supports - typically 4-7.

**[X over Y.]** [What to choose and what to deprioritize when they conflict. Why this persona's reality demands this tradeoff.]

**[X over Y.]** [Same structure.]

**[X over Y.]** [Same structure.]

**[X over Y.]** [Same structure.]

**[X over Y.]** [Same structure.]

**[X over Y.]** [Same structure.]

---

## Evidence & Confidence

| Source | Type | Detail |
| --- | --- | --- |
| [ ID ] | [ Interview / Survey / Analytics / Support / Session recording ] | [ Brief description, date, sample size ] |
| [ ID ] | [ ] | [ ] |
| [ ID ] | [ ] | [ ] |

**Validated.** [Which sections are supported by converging evidence from multiple sources.]

**Assumed.** [Which sections rely on limited evidence or self-reported data. What would it take to validate them.]

**Open questions.** [The 2-3 most important things you still don't know about this persona. Frame as specific, answerable research questions.]

**Governance.** [Review cadence, retirement criteria, and the next planned research action with a target date.]

---

## Marketing Persona Template

# [Persona Name] - [Archetype Label]

**[One sentence that captures this buyer's core decision reality: what triggers them to evaluate, what they're trying to achieve, and what risk they're managing.]**

| Field | Value |
| --- | --- |
| Persona ID | [ BM-### ] |
| Committee role | [ Champion / Economic Buyer / Technical Validator / End User / Influencer / Blocker ] |
| Decision context | [ What purchase decision this persona models ] |
| Valid for | [ Segment, company size, buying context where this persona applies ] |
| Not valid for | [ Adjacent buyer types this persona does not represent ] |
| Confidence | [ Validated / Working / Assumption - with brief evidence basis ] |
| Last validated | [ YYYY-MM-DD ] |
| Owner | [ Team or individual responsible for maintenance ] |

**Quick orientation.** The Persona Card is the daily-use reference - extract it as a standalone one-pager. Sections 1-3 provide context and buying triggers. Sections 4-6 describe how they decide. Sections 7-8 map objections and alternatives. Sections 9-11 translate insight into GTM actions. Evidence & Confidence calibrates trust.

> **Template note:** Blockquote notes (`>`) are authoring guidance - remove them from the completed persona. Each bolded entry should be 2-4 sentences unless noted otherwise. Tables are reserved for reference data only.

---

## Persona Card

> The daily-use artifact for campaign briefs, sales plays, pitch preparation, and messaging reviews. Must fit on one page. Every element must pass the test: would removing this change a messaging or sales decision? If not, cut it.

**[Persona Name] - [Archetype Label]**
[2-3 sentences describing who this buyer is, what triggers their evaluation, and what's at stake in their decision.]

**Key quote:** "[De-identified verbatim quote from a win/loss interview or sales call that captures how this buyer thinks about the purchase.]"

**Buying trigger.** [What event or pressure causes them to start evaluating solutions.]

**Decision criteria.** [The 3-4 things they evaluate most heavily, in priority order.]

**Primary objection.** [The most common reason they stall, defer, or say no.]

**Messaging hook.** [The single framing that most reliably moves this buyer forward.]

**Competitive alternative.** [What they'll do instead if they don't buy - including doing nothing.]

---

## 1. Demographics & Professional Context

| Attribute | Detail |
| --- | --- |
| Title range | [ Typical titles this persona holds ] |
| Seniority | [ IC / Manager / Director / VP / C-suite ] |
| Department | [ ] |
| Company size | [ Revenue range and/or headcount ] |
| Industry | [ Specific verticals or horizontal ] |
| Reports to | [ ] |
| Budget authority | [ Owns budget / Influences budget / Requests budget ] |
| Purchasing role | [ Signs contracts / Recommends / Evaluates / Blocks ] |

**[Professional identity.]** [How they see their role, what they're measured on, and what professional pressure shapes their buying behavior.]

**[Career context.]** [Their career stage and how it affects risk tolerance in purchasing decisions. A first-time director buys differently than a tenured VP - that difference matters for sales positioning.]

---

## 2. Technology & Buying Environment

| Attribute | Detail |
| --- | --- |
| Current solution | [ What they use today ] |
| Stack context | [ Key tools this purchase must integrate with ] |
| Technical fluency | [ How deeply they evaluate technical claims ] |
| Procurement process | [ Self-serve / Team evaluation / Formal RFP / Board approval ] |
| Typical deal cycle | [ Weeks / Months / Quarters ] |

**[Relationship with technology decisions.]** [Whether they lead tech evaluations, defer to others, or play a specific role. How hands-on they are in evaluation vs. delegating.]

**[Organizational buying culture.]** [How their company makes purchasing decisions. Consensus-driven? Top-down? Committee? What the approval chain looks like.]

---

## 3. Buying Triggers & Catalyst Events

**[Primary trigger.]** [The specific event, pressure, or realization that moves this buyer from passive awareness to active evaluation. What changes in their world that makes the status quo unacceptable?]

**[Secondary triggers.]** [Other events that can initiate a buying cycle - leadership mandate, competitive pressure, team growth, failed tool, compliance deadline.]

**[The "almost triggered" state.]** [What keeps them aware of the problem but not yet actively evaluating. The gap between knowing and acting. This shapes nurture strategy.]

---

## 4. Jobs to Be Done (Buying Context)

**Functional.** [When (trigger event), they need to (find/evaluate/implement a solution) so that (business outcome). The progress they're trying to make through the purchase itself, not just the product.]

**Emotional.** [How they want to feel about the decision - confident, safe, forward-thinking. What does a "good buying decision" feel like to them six months later?]

**Social.** [How they want to be perceived for making this decision. What does a successful purchase do for their internal reputation? What does a failed one cost?]

**Underlying.** [The deeper tension driving the purchase - often about professional identity, organizational politics, or career trajectory. The thing they won't say in a sales call but that shapes everything.]

---

## 5. Decision Criteria & Evaluation Process

**[How they evaluate - process.]** [The steps they take from trigger to decision. Do they research independently first? Ask peers? Bring in a team? How do demos, trials, and references fit? 3-5 sentences describing the typical evaluation arc.]

**[What they evaluate - criteria.]** [The specific criteria they weigh, in rough priority order. Not a generic list - the actual factors this persona cares about and how they rank them.]

**[How they compare - competitive frame.]** [What they put side by side and how they structure the comparison. Spreadsheet? Gut feel? Delegate to a team member? What dimensions dominate?]

**[What "good enough" looks like.]** [Their threshold for making a decision vs. continuing to evaluate. What tips them from "still looking" to "let's move forward"?]

---

## 6. Buying Committee & Influence Dynamics

**[Their role on the committee.]** [What they contribute to the buying process - discovery, evaluation, recommendation, approval, veto. How much weight their opinion carries.]

**[Who they need to convince.]** [The other stakeholders involved in the decision, what those people care about, and what this persona needs to provide to get buy-in.]

**[Who can block them.]** [The stakeholder most likely to slow down or kill the deal, what that person's concerns are, and how this persona typically navigates the objection.]

**[Internal champion behavior.]** [If champion: how they sell internally, what materials they need, what arguments they make. If not champion: what role they play in supporting or undermining the champion.]

---

## 7. Objections, Risks & Barriers

> Include as many named objections as research supports - typically 3-5.

**[Objection - descriptive label.]** [The objection, why it comes up, and what it reveals about the buyer's underlying concern. What resolves it - not just the rebuttal, but what evidence or framing makes the concern go away.]

**[Objection - descriptive label.]** [Same structure.]

**[Objection - descriptive label.]** [Same structure.]

**[The "do nothing" risk.]** [Why this buyer might choose the status quo even after evaluating. What makes inaction feel safer than action? This is often the real competitor.]

**[The "bad experience" ghost.]** [Past purchasing experiences that shape their skepticism. What burned them before and what signals trigger that memory?]

---

## 8. Current Alternatives & Competitive Landscape

**[Status quo.]** [What they're doing today and why it persists. What's good enough about it and what's starting to break.]

**[Direct alternatives.]** [The specific competitors they're likely to evaluate. Not your full competitive set - the 2-3 options this persona actually puts on a shortlist and why.]

**[Indirect alternatives.]** [The non-obvious alternatives: internal tools, manual processes, hiring instead of buying, doing nothing. What makes these viable in the buyer's mind?]

**[Switching costs and lock-in.]** [What makes leaving their current solution hard - data migration, retraining, integrations, political cost of admitting the last purchase was wrong.]

---

## 9. Messaging Architecture

**[Primary message - the one that opens the door.]** [The core framing that connects their trigger to your value in their language. Not a tagline - the message and why it works.]

**[Supporting proof points.]** [The 3-4 pieces of evidence that make the primary message credible - customer stories, data points, analyst validation, peer references - ranked by what this persona trusts most.]

**[Language they use vs. language they distrust.]** [The vocabulary this buyer uses to describe their problem and desired outcome. Equally important: words and phrases that trigger skepticism or feel like marketing speak. Include specific examples.]

**[Content that moves them forward.]** [The content types and formats this buyer consumes during evaluation - case studies, ROI calculators, peer conversations, technical docs. Where they look and what convinces.]

**[Content that stalls them.]** [What turns them off or slows the process - generic demos, gated content, aggressive follow-up, vague pricing. 1-2 sentences.]

---

## 10. Success Definition & Relationship Expectations

**[What a successful purchase looks like.]** [How this buyer defines a good decision - not just at purchase, but 3, 6, and 12 months later. What outcome makes them say "that was the right call"?]

**[What a failed purchase looks like.]** [The scenario they're trying to avoid. What would make them regret the decision and what would the professional consequence be?]

**[Relationship expectations.]** [What they expect from the vendor relationship post-sale. High-touch? Self-serve? Strategic partnership? How much ongoing engagement they want and in what form.]

**[Expansion and advocacy triggers.]** [What would cause them to expand usage, renew enthusiastically, or refer peers. The path from buyer to champion to advocate.]

---

## 11. Sales & GTM Principles

> These rules guide messaging, sales behavior, and campaign strategy for this persona. When two good approaches compete, these resolve the tie. Include as many as the buying model supports - typically 4-6.

**[X over Y.]** [What to prioritize in sales and messaging approach. Why this buyer's reality demands this.]

**[X over Y.]** [Same structure.]

**[X over Y.]** [Same structure.]

**[X over Y.]** [Same structure.]

**[X over Y.]** [Same structure.]

---

## Evidence & Confidence

| Source | Type | Detail |
| --- | --- | --- |
| [ ID ] | [ Win interview / Loss interview / No-decision / CRM data / Call recording ] | [ Brief description, date, sample size ] |
| [ ID ] | [ ] | [ ] |
| [ ID ] | [ ] | [ ] |

**Validated.** [Which sections are supported by converging evidence from multiple sources - ideally across won, lost, and no-decision outcomes.]

**Assumed.** [Which sections rely on limited evidence, internal assumptions, or sales intuition. What would it take to validate them.]

**Open questions.** [The 2-3 most important things you still don't know about this buyer. Frame as specific, answerable research questions.]

**Governance.** [Review cadence, retirement criteria, and the next planned research action with a target date.]
