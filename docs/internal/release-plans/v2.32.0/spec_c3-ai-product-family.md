# Spec: the AI-product skill family (C-3 coverage offense), Phase-0 scope

**Status:** SCOPE RULED 2026-08-13. This is a Phase-0 scope document, not a build plan. It fixes
names, classifications, what is in and what is out, and the gates a build must pass. No skill is
authorized to be built by this document.
**Workstream:** WS-5 of [the v2.32.0 release plan](./plan_v2.32.0.md) (the full-slate cycle).
**Tracking:** [#225](https://github.com/product-on-purpose/pm-skills/issues/225) (AI-product family
coverage offense).
**Owner:** Maintainers.
**Supersedes:** the five-name sketch in the maintainer-local comparison roadmap's C-3 row. That
source is gitignored and therefore unreadable to anyone outside the maintainer's machine, which is
the reason this document exists.

---

## 1. Why this document exists

The v2.32.0 scope ruling (decision D1 = C, the full slate) put C-3 (the AI-product family) in scope
at Phase-0 only: promote the scope into a tracked spec and rule the promotion trigger. The build is
explicitly out of this release.

Between the original sketch and this spec, two independent research passes ran with different source
bases and no coordination, and were reconciled into a single aggregated roadmap (maintainer-local,
`_LOCAL/audit/2026-08-05_ai-skills_roadmap-aggregated.md`). Decision D-C (roster amendment) ruled
**A: adopt the amendments** on 2026-08-13. Sections 2 through 4 record the amended roster; section 8
records what the amendment changed relative to the sketch, so the reasoning survives the decision.

## 2. The roster

### 2.1 New skills (four)

All four are phase skills. None is a utility or tool skill.

| Skill | Phase | Output the user walks away with | Reachable trigger |
|---|---|---|---|
| `deliver-ai-behavior-spec` | deliver | Intended behavior and tone, refusal policy, abstention behavior, instruction priority, disclosure and uncertainty UX, failure modes and fallbacks | "We are shipping an LLM feature and have not defined what it refuses or what it does when it cannot ground an answer" |
| `measure-ai-eval-spec` | measure | Golden-set design and sizing rationale, judge rubrics, pass thresholds, slice coverage, per-component scoring for composed features | "How do we know the AI feature works, before and after ship" |
| `iterate-ai-incident-review` | iterate | A two-mode review (incident postmortem or pre-change migration review) ending in corrective eval cases fed back to the eval spec | "The assistant told a customer something wrong" or "we are swapping models next sprint" |
| `develop-agent-authority-plan` | develop | Action classes from read-only to irreversible, approval and interruption semantics per class, cost-per-request and p95 latency as acceptance requirements | "What may this agent do unattended, and what needs a human" |

**Why these four cohere as a family.** The authority plan says what an agent may do; the behavior
spec says how the feature must act; the eval spec proves it does; the incident review catches it
when it does not and feeds new cases back to the eval spec. Every artifact is upstream or downstream
of the behavior spec. That loop, not shared subject matter, is the argument for treating them as a
family.

### 2.2 Increments to shipped skills (four)

Recorded as increments, never as new skills. See section 6 for the catalog-count consequence.

| Target skill | Increment | Size |
|---|---|---|
| [`deliver-prd`](../../../../skills/deliver-prd/SKILL.md) | Optional `## Agent Execution Contract` block: authoritative sources, files-not-to-touch, a requirement-to-verification map keyed off the existing FR-n IDs, stop-and-escalate conditions | MINOR |
| [`deliver-prd`](../../../../skills/deliver-prd/SKILL.md) | Behavior-and-eval linkage section for AI features | MINOR |
| [`develop-adr`](../../../../skills/develop-adr/SKILL.md) | Model-choice subsection under Consequences (model choice, build vs buy vs prompt), inside the shipped Nygard skeleton without touching the six headings | MINOR |
| [`measure-instrumentation-spec`](../../../../skills/measure-instrumentation-spec/SKILL.md) | Privacy-section extension covering trace capture, prompt and completion redaction, retention, sampling | MINOR |

Two additive minors on `deliver-prd`, never a rewrite. A rewrite is a skill-major under the repo's
own tie-breaker rule and would force regenerating three thread samples.

**The universal-vs-AI split.** The agent execution contract is a `deliver-prd` increment rather than
a new AI skill because agent execution is now a handoff mode for ordinary software work, not a
property of AI products. A human contractor benefits from the same declarations. This split is also
the eventual plugin boundary if the family is ever separated, which stays deferred until the
always-on token delta is measured.

### 2.3 Eval-review capability (not a skill, not a sub-agent, not a new rubric)

"Review my eval plan with teeth" is delivered by pointing the shipped
[`utility-pm-critic`](../../../../skills/utility-pm-critic/SKILL.md) at
`measure-ai-eval-spec/SKILL.md`. pm-critic's declared architecture reads the canonical standards doc
for the artifact type at invocation time; the standards doc for an eval spec is the eval-spec skill
itself.

Requirement this places on `measure-ai-eval-spec`: its content must cover leakage, contamination,
judge calibration, reward hacking, slice coverage, repeated-run variance, and threshold validity, so
that pm-critic has something to review against. No seventh sub-agent, no standalone standards
document.

## 3. Explicitly out of scope, and why

| Excluded | Reason |
|---|---|
| Standalone prompt-spec skill | Both research passes declined it independently. The parts a PM owns (intent, tone, refusal policy, instruction priority) are behavior-spec content, so a separate skill creates two homes for one decision. The remainder (prompt text, few-shot construction, formatting) churns on vendor release cadence, and this repo's per-skill SemVer, HISTORY, and three-sample requirements make churn-prone content expensive |
| Standalone AI-UX skill | Proposed by neither pass. Its content becomes the behavior spec's disclosure and uncertainty section. As a standalone it would land on `develop-design-rationale`'s trigger surface |
| Governance evidence map | Fails both passes' own rejection criteria: no qualified legal contributor, ISO licensing exposure. A NIST-only variant is the disciplined fallback if the calculus changes |
| Risk-tier classification | The classification IS the legal determination. Employer neutrality forbids a skill making it |
| Context-curator sub-agent | Re-proposes the shipped project-memory work (v2.32.0 WS-2 and WS-3) |
| Separate handoff-manifest file format | Unsettled schema and an ungated governance surface. The intent is absorbed into the PRD agent execution contract |
| `measure-agent-observability-spec` | Deferred until the eval spec has a consumer. Anchor to OpenTelemetry GenAI conventions if ever built. Traces are a nested run topology the instrumentation template's flat Event Inventory cannot serve, which is why 2.2 extends privacy only |
| Upstream AI opportunity-shaping skill | Tested against a no-framework control arm on 2026-08-07 and KILLED: 0 of 3 judges found discrimination. Closed rather than parked, because a parked idea invites re-proposal and this one carries a measured negative result. Its two surviving rules ride in this family at no cost: per-component scoring in the eval spec, abstention behavior in the behavior spec |

## 4. Naming

**Prefix.** All four take a phase prefix, so all four are phase skills and none carries a
classification prefix. This is the XOR rule the catalog already enforces.

**The `ai` infix is load-bearing collision headroom**, not decoration.
`measure-ai-eval-spec` sits beside `measure-experiment-design` and
`measure-instrumentation-spec`; the infix is what keeps the trigger surfaces apart.

**`develop-agent-authority-plan` deliberately carries `agent`, not `ai`.** The skill is about
agent autonomy specifically, and `agent` is the more precise search term a user would type. The
inconsistency with its three siblings is intentional and recorded here so it does not read as an
oversight later.

**`iterate-ai-incident-review` was shortened from a proposed
`iterate-ai-change-and-incident-review`.** Two reasons, both from the shipped catalog rather than
from taste:

1. Every skill name in the catalog containing `-and-` is a sprint step
   (`tool-design-sprint-decide-and-storyboard`, `tool-design-sprint-map-and-target`,
   `tool-design-sprint-test-and-score`, `tool-note-and-vote`). Those are precisely the fifteen skills
   decision D6 = C ruled OUT of the trigger roster on the grounds that nobody free-texts into them.
   A skill that must fire on typed text should not be named like one that never does.
2. The `iterate-` family's longest existing name is 24 characters
   (`iterate-refinement-notes`). The proposed name was 37, which would have been the longest
   non-sprint name in the catalog.

The pre-change migration mode stays inside the skill and is carried by the description and the
When-to-Use section, not the name. **Verification obligation at build:** the trigger fixture pack
must include migration-phrased queries ("we are switching models next sprint", "what regresses if we
upgrade"), not only incident-phrased ones. If those queries miss, the description is wrong, and the
fixture failure is the signal.

## 5. Eval-asset plan (corrected from the research briefs)

The briefs asserted that this family opens a new `validation` rubric family, and that
CONTRIBUTING.md therefore requires authoring that rubric before any skill.
**Verified against `docs/internal/eval-rubrics/`: this is not the case. No new family is needed.**

A family rubric has eight sections, six of which are shared verbatim across families (the anchor
scale, the two universal criteria, the freehand negative control, the judge protocol, the
aggregation and validity gates, the human anchor). Only the family-trait paragraph and section 4's
per-skill criteria table vary. Adding a skill to an existing family means writing one section-4
table, which is the documented append-on-first-eval mechanism already queued in
[`measurement.md`](../../eval-rubrics/measurement.md) for four shipped skills.

All four new skills map to an existing family:

| Skill | Family | Family's stated subject |
|---|---|---|
| `measure-ai-eval-spec` | [measurement](../../eval-rubrics/measurement.md) | measure-phase rigor artifacts: falsifiable claims, one decision metric, pre-registered success criteria, guardrails, evidence honesty |
| `deliver-ai-behavior-spec` | [specification](../../eval-rubrics/specification.md) | the specification skills: something an engineer or QA can act on and check |
| `iterate-ai-incident-review` | [learning](../../eval-rubrics/learning.md) | the iterate-phase reflection artifacts |
| `develop-agent-authority-plan` | [technical](../../eval-rubrics/technical.md) | the develop-phase decision and exploration artifacts |

Consequence for sizing: the rubric-first cost the briefs priced into `measure-ai-eval-spec` is
close to zero. Four section-4 tables in four existing files.

## 6. Constraints any build must respect

1. **The L floor.** Per [CONTRIBUTING.md](../../../../CONTRIBUTING.md), each new skill needs a
   TEMPLATE and an EXAMPLE (enforcing), three sample-library thread samples covering all three
   canonical threads (enforcing), a trigger fixture pack of at least 16 queries, an output scenario
   mapped to a rubric family, reciprocal When-NOT-to-Use pointers on every declared collision edge,
   and three regenerated derived surfaces. L is the floor before a word of skill content is written.
2. **Core-first is forced, not preferred.** The collision, reciprocity, and cross-reference gates
   resolve skills by reading `skills/<name>/` in this repo. A sibling-plugin skill is invisible to
   all three. Build in core, prove against the gates, measure the always-on token delta, and only
   then consider a split.
3. **Catalog count moves.** The catalog has been 68 skills since v2.29.0 (30 phase, 11 foundation,
   12 utility, 15 tool), and the count is asserted in generator-checked count phrases across README,
   AGENTS.md, the manifest, and the site. Four new phase skills take it to 72 (34 phase). The four
   increments in 2.2 change no count. This is a build-time obligation, recorded now so it is not a
   surprise: the release that ships the first new skill must re-derive every count surface.
4. **Known collision surfaces, to be fenced at build.** `measure-ai-eval-spec` against
   `measure-experiment-design` and `measure-instrumentation-spec`; distributional acceptance routes
   OUT of `deliver-acceptance-criteria` via one When-NOT-to-Use bullet;
   `deliver-ai-behavior-spec` against `develop-design-rationale` on the UX-disclosure edge;
   `iterate-ai-incident-review` against `iterate-retrospective` and `iterate-lessons-log`.
5. **No hardcoded vendor figures.** The shipped fabricated-metric guardrail fires on exactly the
   vendor numbers both research passes tried to import. Golden-set sizing is stated as a method
   ("the smallest N where adding cases stops changing the verdict; state N and how you chose it"),
   never as a number.

## 7. Build gate: the control arm comes first

**Every new skill in section 2.1 must beat a no-skill control before it is built, not after.**

**Why this is a new gate and not existing practice.** Two mechanisms exist today and neither does
this. [`utility-pm-skill-builder`](../../../../skills/utility-pm-skill-builder/SKILL.md) runs a Why
Gate and a Kill Gate, which ask the proposer to name scenarios where existing skills fail; that is an
assertion, and nothing checks it. The output-eval harness does run a real freehand control ("a
competent but thin freehand artifact, NOT a strawman"), but it runs after the skill is built and
rostered. The 2026-08-07 falsification of the opportunity-shaping skill worked by taking the
harness's control design and running it before the build. This section makes that sequencing a
standing requirement for this family.

**The method, as run:** a treatment arm with the proposed skill's instructions and a control arm of
equal capability with no framework, both working the same realistic scenarios drawn from the three
canonical sample threads, then independent judges with distinct lenses, each instructed to default
to "the skill added nothing." Cost when last run: one afternoon, six agents.

**Pass condition:** a majority of judges find the skill arm discriminates. **On failure:** close the
skill with the negative result attached, and salvage whatever survived into a skill that already
exists, exactly as the opportunity-shaping closure did. Failure is a legitimate outcome of this spec,
not a defect in it.

**Why this gate matters most here.** Demand evidence for AI-PM artifacts is LOW and the aggregated
research says so about its own recommendations. Job postings and vendor toolchains prove the practice
exists in named teams, not that it is prevalent. The case for this family is a craft-gap argument
(verified: the eight nearest shipped skills contain zero mentions of eval, refusal, abstention,
model, hallucination, or prompt injection) backed by two independent passes converging. That is the
strongest signal the exercise produced and it is not adoption data. The control arm is what keeps
this spec from grading its own homework.

## 8. Promotion trigger ruling (decision D5 = A)

The C-3 promotion trigger is "eval-complete-from-day-one gate live."

**Resolved state of the gate.** `trigger-evals.yml` is dispatch-only, advisory and cost-gated, with
the collision probe key-gated and dry-run defaulting true. What IS enforcing in CI is the
fixture-structure check over rostered skills. So "eval-complete" is satisfied by roster membership,
not by a probe run.

**Ruling:** the eval-complete mechanism is **roster-add-at-merge** over the closed roster. Any new
skill is added to `scripts/trigger-eval-roster.yaml` in the same merge that adds the skill, which
puts it under the enforcing fixture-structure check immediately.

**Evidence that the roster is closed and therefore addable-to without ambiguity:** WS-4 of this
release established 53 rostered plus 15 excluded by design equals 68, with nothing unaccounted for,
and asserted that accounting in test so it cannot drift. A new skill either joins the 53 or is
recorded in `excluded:` with a rationale. There is no third state.

**Trigger status: MET.**

## 9. Build tracks (indicative, not committed)

Sequencing only. Each track's contents are re-ruled at that release's scope decision, and every
section 2.1 item passes section 7's gate first.

| Track | Target | Contents | Rationale |
|---|---|---|---|
| 1 | v2.33.0 | The four increments in 2.2 | No new trigger surface, no count change, no L floor. Highest value per unit of risk |
| 2 | v2.34.0 | `measure-ai-eval-spec`, then `deliver-ai-behavior-spec` | The two keystones. Eval spec first: it is the measurement twin the behavior spec is checked against, and it carries the pm-critic capability in 2.3 |
| 3 | unscheduled | `iterate-ai-incident-review`, `develop-agent-authority-plan` | The incident review needs the eval spec to exist to receive its output. The authority plan is independent but lower-frequency |
| 4 | deferred | Plugin split, observability fork | Both wait on measurement: the token delta for the split, a consumer for the fork |

## 10. Open decisions this spec does not settle

Recorded in section 6 of the aggregated roadmap and carried as v2.33.0 planning inputs: D-A
(distributional acceptance routes out of `deliver-acceptance-criteria`, recommendation B), D-B
(instrumentation privacy extension now rather than an observability fork, recommendation C), D-D
(PRD as two additive minors, recommendation A), D-E (plugin identity, defer until the token delta is
measured), D-F (governance evidence map, defer). D-C (roster amendment) is ruled A by this document.
