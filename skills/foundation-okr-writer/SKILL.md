---
name: foundation-okr-writer
description: Drafts, reviews, rewrites, and coaches outcome-based OKR sets across team, department, product, or company scopes. Supports five entry modes (Guided default, One-Shot via --oneshot, Sustained Coach, Audit Only, Rewrite). Diagnoses empowered-team context and adjusts framing; refuses to fabricate baselines or targets; refuses to use OKR scores for compensation; reframes feature-delivery KRs into outcome KRs. Use when planning quarterly OKRs, translating strategy into team outcomes, reviewing draft OKRs for quality, or converting roadmap-as-OKR drafts into proper OKR sets.
classification: foundation
version: "1.0.0"
updated: 2026-04-30
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond, okrs, lean-startup]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# OKR Writer

An OKR (Objectives and Key Results) set is a quarterly artifact that translates strategy into measurable outcomes a team commits to drive. OKRs are a focus and learning system, not a project plan, KPI dashboard, performance review device, or roadmap wrapper. Done well, they make priorities explicit, force tradeoffs, enable cross-team alignment, and create visible evidence of progress. Done poorly, they generate roadmap theater, compensation gaming, and false precision.

This skill is a coach, not a template filler. It drafts, reviews, rewrites, and audits OKR sets against the empirical consensus drawn from Doerr (`Measure What Matters`), Wodtke (`Radical Focus`), Cagan (SVPG team objectives), Castro (outcome-vs-output), Grove (`High Output Management`), Torres (continuous discovery), and Gothelf and Seiden (`Outcomes Over Output`).

## Supported Modes

Five entry modes support different engagement levels. Mode is detected from user phrasing; default to Guided when ambiguous. State the detected mode at the start of the response.

- `Guided` (default, moderate engagement) . brief diagnostic, draft, score against rubric, surface issues, ask user to confirm. Selected by phrasing like "help me write OKRs for X."
- `One-Shot` (low engagement) . produces a complete OKR set in one pass with all assumptions labeled. Selected by `--oneshot` flag or phrasing like "just draft OKRs from this context."
- `Sustained Coach` (high engagement) . iterative loop, one component at a time, re-scored each turn until quality threshold met. Selected by "coach me through OKRs for X."
- `Audit Only` . user pastes existing OKRs, skill scores and critiques, no new drafts unless user asks. Selected by "review these OKRs."
- `Rewrite` . convert flawed OKRs, feature lists, or roadmap items into outcome-shaped OKRs. Selected by "fix these OKRs" or "convert this roadmap to OKRs."

## When to Use

- Planning OKRs at company, department, product, product-area, team, or initiative scope
- Translating parent OKRs or strategy into team OKRs
- Reviewing a draft OKR set for quality (Audit Only mode)
- Reframing feature, roadmap, or initiative lists into outcome-based OKRs (Rewrite mode)
- Preparing OKRs for stakeholder review
- Identifying whether KRs are measurable and evidence-backed

## When NOT to Use

- You only need a dashboard spec . use `/dashboard-requirements`
- You only need event tracking . use `/instrumentation-spec`
- You only need an experiment . use `/experiment-design`
- You only need a hypothesis . use `/hypothesis`
- The cycle has ended and you need formal scoring with evidence and learning synthesis . use `/okr-grader`
- The team is purely business-as-usual and needs steady-state KPIs, not stretch outcomes . OKRs are the wrong artifact

## Instructions

When asked to write or review OKRs, follow these steps:

1. **Detect mode**
   Read the user's phrasing and classify into Guided, One-Shot, Sustained Coach, Audit Only, or Rewrite. Look for explicit signals (`--oneshot`, "review these," "fix these," "coach me"). Default to Guided when ambiguous. State the detected mode at the start of the response.

2. **Run the empowered-team diagnostic** (skip in Audit Only when no new drafting is happening)
   Ask briefly:
   - Are features, projects, or dates already committed for this cycle?
   - Can the team change initiatives mid-cycle if KRs are not moving?
   - Who decides what gets built, this team or someone else?

   Capture the answer as `empowerment_signal: empowered | feature-team | mixed | unknown`. This affects output framing in later steps. Do NOT refuse to proceed when feature-team signals are present; instead, plan to add a Disclosure section to the artifact.

3. **Determine if OKRs are the right artifact**
   If the request is really a project plan, KPI dashboard, launch checklist, hypothesis, experiment, or status update, redirect to the appropriate pm-skill or chain. Do not force OKR shape onto non-OKR work.

4. **Classify operating context**
   Capture scope (company | department | product | product-area | team | initiative), cycle (quarter | half | annual | launch window | custom), level, and OKR type (committed | aspirational | learning | operational_health | compliance_or_safety). Default cycle is quarterly when context is missing.

5. **Extract or infer strategic intent**
   Identify the parent objective, strategy pillar, customer problem, or business pressure that motivates this OKR set. If none is supplied, ask once before drafting.

6. **Separate outcomes from work**
   Move features, tasks, projects, launches, hiring counts, and activity counts into Initiatives. The OKR is what changes in the world; Initiatives are bets on how to make that change happen. Apply Castro's litmus test: "if it can go in your backlog, it is not an outcome."

7. **Draft or improve the Objective**
   The Objective is qualitative, specific, directional, and cycle-appropriate. It describes a desired state change, not a project. It connects to strategy. It avoids embedded metrics (numbers belong in KRs). It avoids empty adjectives unless the artifact defines what they mean.

8. **Draft or improve Key Results**
   For each KR include: metric definition, baseline (or `recommended-to-measure` if missing), target, deadline, evidence source, owner where appropriate, indicator class (`leading | lagging | guardrail | health | evidence_generation`), and confidence (`high | medium | low | unknown`). Include a guardrail KR for any optimization that could harm a paired metric (engagement vs quality, growth vs retention, speed vs reliability).

   Apply the constraint rules in the next section.

9. **Map initiatives as bets**
   Each initiative names which KR(s) it is expected to move and the assumption underlying that expectation. Initiatives are hypotheses, not commitments. Do not list initiatives as KRs.

10. **Run the OKR Quality Audit**
    Score the draft against the rubric below. Surface issues inline rather than burying them in an appendix. For each `risk` or `fail` rating, include a specific recommendation.

11. **Apply the empowered-team Disclosure** (when needed)
    If `empowerment_signal == feature-team` or `mixed`, add a Disclosure section: "This OKR set frames pre-committed work as outcome bets. If the metrics do not move when the work ships, that is a learning, not a delivery failure. The team's lever this cycle is to keep shipping; the OKR's lever is to update next-cycle planning." Omit this section entirely when the signal is `empowered`.

12. **Surface open questions**
    Capture any decisions the user must make that the skill cannot resolve from context. Examples: KR measurement window extending past cycle close, initiative phasing decisions, cohort definition boundaries.

13. **Note the source of truth**
    The artifact is a planning input, not the canonical OKR system. Include a `source_of_truth` field pointing to the user's actual OKR tracker (company OKR doc, Confluence page, dashboard, dedicated platform, spreadsheet, or wherever the live status lives).

14. **Finalize for direct use**
    Remove all skill instruction commentary from the final artifact. The final output should be reader-facing.

## Constraint Rules (MUST / MUST NOT)

These rules are non-negotiable. The skill enforces them in every mode.

- **MUST** measure outcomes (customer behavior change, business KPI delta, operational health change), not features, tasks, milestones, or activity counts.
- **MUST NOT** silently fabricate baselines, targets, current values, or benchmarks. Mark missing values explicitly as `assumption`, `placeholder`, `recommended-to-measure`, or `not-enough-evidence`.
- **MUST NOT** use OKR scores as individual performance ratings or compensation inputs. If the user requests this, refuse and explain.
- **MUST** include at least one guardrail or counter-metric KR for any KR that incentivizes growth, speed, or volume.
- **MUST** treat the 0.6 to 0.7 sweet spot as applying ONLY to aspirational OKRs. Committed, compliance, safety, reliability, and contractual KRs target 1.0.
- **MUST** default to team-level OKRs. Warn when individual OKRs are requested; explain the sandbagging and false-precision risks.
- **MUST NOT** become the canonical source of truth. Always include a `source_of_truth` pointer to the user's actual OKR tracker.
- **MUST** apply the empowered-team Disclosure when feature-team signals are present. Do NOT refuse the user; adjust the framing.

## Quality Audit Rubric

The skill applies this rubric to every OKR set it drafts or reviews. Each criterion gets `pass`, `risk`, or `fail` with a one-line rationale.

- Strategic fit: clear link to strategy, parent OKR, or customer problem
- Objective quality: specific, qualitative, tradeoff-guiding (not a slogan, task, metric bundle, or project name)
- KR outcome quality: measures outcome or behavior change (not tasks, features, or milestones)
- Measurement quality: baseline, target, deadline, evidence source present (or marked placeholder)
- Product influence: team can plausibly influence the outcome
- Focus: 1 to 3 objectives, 2 to 4 KRs each
- Guardrails: quality, reliability, or risk considered for any optimization KR
- Alignment: parent, peer, dependency relationships clear
- Operating rhythm: cycle, check-ins, review points explicit
- Integrity: no compensation coupling, no fabricated data
- Empowered-team Disclosure: included when feature-team signal present, omitted when empowered

## Anti-Patterns the Skill Detects

The skill scans for these and either refuses, reframes, or surfaces them with a `fail` audit rating:

- Feature-delivery KR ("Launch X" instead of "Increase Y from A to B") . reframe into outcome KR; move feature to Initiatives
- Task-count KR ("Complete 10 interviews" without a learning outcome) . reframe or move to evidence-generation type
- Vanity metric KR (metric improves without customer or business value) . flag and propose alternative
- Activity objective (objective describes work, not change) . reframe
- Metric-stuffed objective (objective is just KPIs glued together) . reframe
- Too many OKRs (more than 3 objectives, more than 4 KRs per objective) . force ranking
- Cascading theater (parent KR copied locally without ownership logic) . rewrite as networked alignment
- Roadmap wrapper (OKRs reformat the roadmap) . full Rewrite mode
- Missing baseline (target uninterpretable) . mark `recommended-to-measure`
- Missing evidence source (no one knows where the score will come from) . mark `not-enough-evidence`
- Lag-only product OKR (team owns revenue without product outcome) . add a leading product-outcome KR
- No guardrail (optimization may damage quality, trust, retention) . add guardrail KR
- Compensation coupling (people will sandbag or hide learning) . refuse and explain
- Individual OKR default . default to team OKRs; warn if individual OKRs are requested
- Unsupported benchmark (universal target without evidence) . flag and ask for source
- Pre-PMF over-metricization (false quantitative precision when learning is the real objective) . reframe as learning OKR

## Output Contract (v1.0.0)

- All required sections present in canonical order: Context, Objective, Key Results, Initiatives as Bets, Guardrails and Health Checks, Alignment Notes, Quality Audit, Open Questions, Suggested Next Step
- Disclosure section is present when `empowerment_signal == feature-team | mixed`, omitted when `empowered`
- Every KR includes metric definition, baseline (or marked placeholder), target, deadline, evidence source, indicator class, and confidence
- Initiatives are listed separately from KRs and explicitly tied to which KR(s) they aim to move
- At least one guardrail KR exists for any optimization-style primary KR
- Source-of-truth note is present and points to a non-skill location
- Quality Audit covers all rubric criteria with explicit pass / risk / fail ratings
- Markdown only output. No JSON.
- Foundation classification: no `phase:` field in frontmatter; uses `classification: foundation`

## Quality Checklist

Before finalizing, verify:

- [ ] Mode detected and stated at the start of the response
- [ ] Empowered-team diagnostic run when drafting; signal captured
- [ ] All required sections present in canonical order
- [ ] Disclosure section included when feature-team signal present
- [ ] Every KR has metric, baseline (or placeholder), target, deadline, evidence source, indicator class, confidence
- [ ] At least one guardrail KR for any optimization primary KR
- [ ] Source-of-truth note present
- [ ] No fabricated baselines or targets . missing values explicitly marked
- [ ] No compensation-coupled framing
- [ ] Quality Audit applied with explicit pass / risk / fail ratings
- [ ] Anti-pattern catalog scanned . detected anti-patterns flagged or reframed
- [ ] OKR type classified (committed | aspirational | learning | operational_health | compliance_or_safety)
- [ ] Skill instruction commentary removed from final artifact
- [ ] Markdown only . no JSON output

## Examples

See `references/EXAMPLE.md` for a completed OKR set in the storevine sample thread (Campaigns team, Q3 2026), demonstrating Guided mode on an empowered-team product context with a real cross-team alignment dependency. The companion `measure-okr-grader` skill handles end-of-cycle scoring; together they cover the full quarterly arc.
