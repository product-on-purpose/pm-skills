> WARNING (2026-06-13): PARTIAL / CONTAMINATED. The API key ran out of credit partway through this
> run ("Credit balance is too low"). Skills scoring exactly 50% with 10 failures (develop-spike-summary
> and everything alphabetically after it: discover-*, foundation-*, iterate-*, measure-*) are NOT real
> results - every call errored and was wrongly scored as a trigger-miss. ONLY the non-50% rows
> (define-*, deliver-*, develop-adr/design-rationale/solution-brief) are valid Sonnet data. See the
> baseline record Run 5 for the salvaged valid results and conclusions. The harness now aborts on API
> errors so this cannot recur.

# Trigger-eval report

| Skill | Train pass | Validation pass | Failing queries |
|---|---|---|---|
| define-hypothesis | 100% | 100% | 0 |
| define-jtbd-canvas | 100% | 100% | 0 |
| define-opportunity-tree | 92% | 100% | 1 |
| define-problem-statement | 100% | 100% | 0 |
| deliver-acceptance-criteria | 100% | 88% | 1 |
| deliver-edge-cases | 92% | 63% | 4 |
| deliver-launch-checklist | 100% | 100% | 0 |
| deliver-prd | 75% | 88% | 4 |
| deliver-release-notes | 92% | 88% | 2 |
| deliver-user-stories | 92% | 88% | 2 |
| develop-adr | 100% | 100% | 0 |
| develop-design-rationale | 83% | 100% | 2 |
| develop-solution-brief | 83% | 100% | 2 |
| develop-spike-summary | 50% | 50% | 10 |
| discover-competitive-analysis | 50% | 50% | 10 |
| discover-interview-synthesis | 50% | 50% | 10 |
| discover-stakeholder-summary | 50% | 50% | 10 |
| foundation-meeting-recap | 50% | 50% | 10 |
| foundation-okr-writer | 50% | 50% | 10 |
| foundation-persona | 50% | 50% | 10 |
| iterate-lessons-log | 50% | 50% | 10 |
| iterate-pivot-decision | 50% | 50% | 10 |
| iterate-refinement-notes | 50% | 50% | 10 |
| iterate-retrospective | 50% | 50% | 10 |
| measure-dashboard-requirements | 50% | 50% | 10 |
| measure-experiment-design | 50% | 50% | 10 |
| measure-experiment-results | 50% | 50% | 10 |
| measure-instrumentation-spec | 50% | 50% | 10 |
| measure-okr-grader | 50% | 50% | 10 |

## Failures

- define-opportunity-tree [train] expected trigger, fired 1x: "Map our activation outcome down to the opportunities from last month's research and candidate solutions for each"
- deliver-acceptance-criteria [validation] expected trigger, fired 0x: "What are the verifiable done conditions for the story where users export their billing history?"
- deliver-edge-cases [train] expected trigger, fired 0x: "What happens at the limits for the cart: zero items, max items, expired sessions, concurrent edits? Enumerate them"
- deliver-edge-cases [validation] expected trigger, fired 0x: "Identify the race conditions and timeout scenarios we need to design for in the sync engine"
- deliver-edge-cases [validation] expected trigger, fired 0x: "Before launch, make sure every error state in onboarding has a designed message and recovery path"
- deliver-edge-cases [validation] expected trigger, fired 0x: "After last week's outage, build a systematic catalog of failure modes for the notifications pipeline"
- deliver-prd [train] expected trigger, fired 0x: "We agreed on the problem and the approach for payment retries; now I need the full requirements doc for engineering handoff"
- deliver-prd [train] expected trigger, fired 0x: "Help me spec out the requirements for our Q3 epic so design, backend, and mobile are all working from the same source"
- deliver-prd [train] expected trigger, fired 0x: "Stakeholders want to approve scope before we invest two quarters in this initiative; draft the spec doc they can sign off on"
- deliver-prd [validation] expected trigger, fired 0x: "We're kicking off the offline mode initiative; create the spec that covers requirements, out-of-scope items, dependencies, and risks"
- deliver-release-notes [train] expected trigger, fired 1x: "We're shipping the spring update on Friday; draft the what's-new announcement for the in-app banner and email"
- deliver-release-notes [validation] expected trigger, fired 0x: "Write the customer email announcing the new integrations we shipped this sprint"
- deliver-user-stories [train] expected trigger, fired 1x: "Help me slice this big checkout redesign into small shippable increments the team can estimate"
- deliver-user-stories [validation] expected trigger, fired 0x: "Sprint planning is tomorrow and the search revamp is still one giant blob; help me break it down into ticket-sized pieces"
- develop-design-rationale [train] expected trigger, fired 0x: "We debated three onboarding flows and landed on progressive profiling. Write down why before the context evaporates."
- develop-design-rationale [train] expected trigger, fired 0x: "Capture which alternatives we considered for the mobile navigation and why bottom tabs won"
- develop-solution-brief [train] expected trigger, fired 0x: "I need something short that gets leadership aligned on our approach to self-serve onboarding before we write the full spec"
- develop-solution-brief [train] expected trigger, fired 0x: "Pitch the proposed fix for cart abandonment to stakeholders: the approach, key features, and what we are explicitly not doing"
- develop-spike-summary [train] expected trigger, fired 0x: "Write up the results of our three-day spike on integrating with the Stripe Billing API"
- develop-spike-summary [train] expected trigger, fired 0x: "We time-boxed two days to see if WebSockets can handle 50k concurrent connections on our stack. Document what we found and whether to proceed."
- develop-spike-summary [train] expected trigger, fired 0x: "Summarize the proof-of-concept we ran on the vector database options before the team meeting"
- develop-spike-summary [train] expected trigger, fired 0x: "The feasibility investigation into server-side PDF generation is done. Capture the approach, findings, and recommendation."
- develop-spike-summary [train] expected trigger, fired 0x: "Document the outcome of our exploration into replacing the legacy search with Typesense, including the benchmarks we collected"
- develop-spike-summary [train] expected trigger, fired 0x: "I spent a week prototyping the offline sync engine. Turn my scratch notes into a structured summary the team can act on."
- develop-spike-summary [validation] expected trigger, fired 0x: "Write a spike summary for the LLM summarization experiment: what we tried, the evidence, and the open questions"
- develop-spike-summary [validation] expected trigger, fired 0x: "Our designer time-boxed an exploration of canvas-based editing versus DOM-based. Capture the findings and a clear go or no-go."
- develop-spike-summary [validation] expected trigger, fired 0x: "Before we commit engineers to the migration, document what the proof of concept on zero-downtime schema changes actually showed"
- develop-spike-summary [validation] expected trigger, fired 0x: "The team finished investigating whether the vendor SDK supports our SSO requirements. Get the learnings on paper so nobody has to repeat the explanation."
- discover-competitive-analysis [train] expected trigger, fired 0x: "Do a competitive analysis of the top five project-management tools before we enter that market"
- discover-competitive-analysis [train] expected trigger, fired 0x: "We keep losing enterprise deals to two rivals; break down their features, pricing, and positioning against ours"
- discover-competitive-analysis [train] expected trigger, fired 0x: "Map the competitive landscape for AI meeting assistants: direct, indirect, and potential disruptors"
- discover-competitive-analysis [train] expected trigger, fired 0x: "Leadership wants to know where we can differentiate; compare our product against the main alternatives on features and strategy"
- discover-competitive-analysis [train] expected trigger, fired 0x: "We're weighing build versus buy for analytics; analyze the vendor landscape so we understand the alternatives"
- discover-competitive-analysis [train] expected trigger, fired 0x: "Put together the market-landscape section for our annual planning review, comparing positioning across our top competitors"
- discover-competitive-analysis [validation] expected trigger, fired 0x: "Create a competitive analysis of Figma, Sketch, and Penpot for our design-tool strategy"
- discover-competitive-analysis [validation] expected trigger, fired 0x: "A well-funded startup just entered our space; assess how their offering stacks up and where we're exposed"
- discover-competitive-analysis [validation] expected trigger, fired 0x: "Onboard our new PM with a structured overview of who we compete with and how we win"
- discover-competitive-analysis [validation] expected trigger, fired 0x: "What are the feature gaps between us and the category leader, and where should we differentiate?"
- discover-interview-synthesis [train] expected trigger, fired 0x: "Synthesize these 8 user interviews into themes and recommendations"
- discover-interview-synthesis [train] expected trigger, fired 0x: "We finished a round of customer discovery calls; pull out the patterns across participants"
- discover-interview-synthesis [train] expected trigger, fired 0x: "Turn these usability session notes into evidence-backed insights for the team"
- discover-interview-synthesis [train] expected trigger, fired 0x: "I have transcripts from 6 churned-customer interviews; what are users actually telling us?"
- discover-interview-synthesis [train] expected trigger, fired 0x: "Aggregate the findings from this week's research sprint into something stakeholders can act on"
- discover-interview-synthesis [train] expected trigger, fired 0x: "Identify recurring themes and pull supporting quotes from these interview notes"
- discover-interview-synthesis [validation] expected trigger, fired 0x: "Before our ideation workshop, consolidate what we heard across the 10 discovery interviews"
- discover-interview-synthesis [validation] expected trigger, fired 0x: "Sales logged feedback calls with 12 prospects; extract the cross-cutting insights with confidence levels"
- discover-interview-synthesis [validation] expected trigger, fired 0x: "Summarize what we learned from the usability tests, with participant-attributed quotes and limitations"
- discover-interview-synthesis [validation] expected trigger, fired 0x: "Help me get from a pile of raw research notes to prioritized recommendations grounded in evidence"
- discover-stakeholder-summary [train] expected trigger, fired 0x: "Create a stakeholder summary for the data-platform migration project"
- discover-stakeholder-summary [train] expected trigger, fired 0x: "I'm taking over this initiative from another PM and don't know who actually has influence; map the people and the politics for me"
- discover-stakeholder-summary [train] expected trigger, fired 0x: "Document who cares about the billing rewrite, what each group needs, and where their interests conflict"
- discover-stakeholder-summary [train] expected trigger, fired 0x: "We're hitting resistance from ops mid-project; map stakeholder concerns and influence so I can navigate it"
- discover-stakeholder-summary [train] expected trigger, fired 0x: "Before the big architecture decision I need cross-functional buy-in; lay out every stakeholder, their stake, and their stance"
- discover-stakeholder-summary [train] expected trigger, fired 0x: "The reorg shuffled who owns what; redo the stakeholder map for the personalization program"
- discover-stakeholder-summary [validation] expected trigger, fired 0x: "Map the stakeholders for our compliance initiative, including needs, concerns, and influence levels"
- discover-stakeholder-summary [validation] expected trigger, fired 0x: "Three departments touch this launch and they're not aligned; document who they are and what each one needs from us"
- discover-stakeholder-summary [validation] expected trigger, fired 0x: "New project kickoff next week: who has a stake, who can block us, and what does each of them care about?"
- discover-stakeholder-summary [validation] expected trigger, fired 0x: "Build the influence-and-interest summary for the API deprecation so our comms can be targeted properly"
- foundation-meeting-recap [train] expected trigger, fired 0x: "Write a recap of today's product sync with decisions highlighted and actions grouped by owner"
- foundation-meeting-recap [train] expected trigger, fired 0x: "Here is the Otter transcript from our quarterly planning meeting; turn it into a topic-segmented summary for attendees"
- foundation-meeting-recap [train] expected trigger, fired 0x: "Summarize this morning's standup-turned-debate so the team has the outcomes in writing"
- foundation-meeting-recap [train] expected trigger, fired 0x: "We had the API deprecation meeting an hour ago; capture what was decided and who owes what by when"
- foundation-meeting-recap [train] expected trigger, fired 0x: "Reconcile the agenda we planned against what we actually covered in the roadmap review, and list the actions"
- foundation-meeting-recap [train] expected trigger, fired 0x: "Turn these messy notes from the pricing discussion into a clean summary the attendees can reference"
- foundation-meeting-recap [validation] expected trigger, fired 0x: "Generate the post-meeting summary from this Google Meet transcript, flagging actions that have no owner"
- foundation-meeting-recap [validation] expected trigger, fired 0x: "After that two hour architecture meeting nobody remembers what we agreed; write it up"
- foundation-meeting-recap [validation] expected trigger, fired 0x: "Produce a recap of the launch go/no-go meeting with the decision bolded and follow-ups consolidated"
- foundation-meeting-recap [validation] expected trigger, fired 0x: "Take the Fireflies transcript from the vendor evaluation call and give the team a topic-organized writeup"
- foundation-okr-writer [train] expected trigger, fired 0x: "Help me write Q3 OKRs for the growth team"
- foundation-okr-writer [train] expected trigger, fired 0x: "Review these draft OKRs and tell me where the key results are really just features"
- foundation-okr-writer [train] expected trigger, fired 0x: "Translate the company strategy pillar on retention into measurable team outcomes for next quarter"
- foundation-okr-writer [train] expected trigger, fired 0x: "Convert this roadmap list into proper outcome-based OKRs"
- foundation-okr-writer [train] expected trigger, fired 0x: "Coach me through drafting an objective and key results for the platform team, one piece at a time"
- foundation-okr-writer [train] expected trigger, fired 0x: "Our KRs all say launch X by some date; rewrite them so they measure behavior change instead"
- foundation-okr-writer [validation] expected trigger, fired 0x: "Just draft a complete OKR set from this product context in one pass and label your assumptions"
- foundation-okr-writer [validation] expected trigger, fired 0x: "Leadership handed us a parent objective; turn it into department OKRs we can actually commit to"
- foundation-okr-writer [validation] expected trigger, fired 0x: "I need quarterly objectives with baselines, targets, and guardrail metrics before the planning offsite"
- foundation-okr-writer [validation] expected trigger, fired 0x: "Critique this OKR draft: are the objectives inspiring and the key results measurable?"
- foundation-persona [train] expected trigger, fired 0x: "Create a product persona for our power users in the analytics module"
- foundation-persona [train] expected trigger, fired 0x: "Design and engineering keep arguing about who we're building for; produce a behavior-grounded profile we can put in front of every tradeoff discussion"
- foundation-persona [train] expected trigger, fired 0x: "Generate a marketing persona for the mid-market buyer of our security platform"
- foundation-persona [train] expected trigger, fired 0x: "Build a buyer persona for the GTM team, with assumptions and confidence levels labeled so we can review them"
- foundation-persona [train] expected trigger, fired 0x: "Before I draft the PRD I want the user profile nailed down: goals, behaviors, frustrations, and real quotes"
- foundation-persona [train] expected trigger, fired 0x: "Turn last quarter's research into an evidence-calibrated persona for the onboarding squad"
- foundation-persona [validation] expected trigger, fired 0x: "Make a persona for first-time admins setting up our workspace product"
- foundation-persona [validation] expected trigger, fired 0x: "Marketing needs a persona to aim the launch messaging at; ground it in the survey data we already have"
- foundation-persona [validation] expected trigger, fired 0x: "Stress-test our pricing decision against a realistic profile of our typical small-team customer"
- foundation-persona [validation] expected trigger, fired 0x: "I need a persona artifact for the design sprint next week, product mode, with explicit assumptions"
- iterate-lessons-log [train] expected trigger, fired 0x: "Write a lessons learned entry from the payment outage so future teams can find it"
- iterate-lessons-log [train] expected trigger, fired 0x: "The migration project just wrapped; bank what we learned for organizational memory"
- iterate-lessons-log [train] expected trigger, fired 0x: "Document the lesson from our failed marketplace launch in a searchable format"
- iterate-lessons-log [train] expected trigger, fired 0x: "Our staff engineer leaves next month; capture her hard-won knowledge about the billing system before she goes"
- iterate-lessons-log [train] expected trigger, fired 0x: "This is the third vendor integration that slipped for the same reason; record the pattern so other teams stop hitting it"
- iterate-lessons-log [train] expected trigger, fired 0x: "Turn the post-mortem findings from the data loss incident into a durable knowledge entry with applicability guidance"
- iterate-lessons-log [validation] expected trigger, fired 0x: "Capture what we learned about feature flags during the rollout so the platform team can reuse it"
- iterate-lessons-log [validation] expected trigger, fired 0x: "We keep relearning the same lesson about scope creep on agency projects; write it down once, properly"
- iterate-lessons-log [validation] expected trigger, fired 0x: "Create an organizational memory entry for the lesson on launching in regulated markets"
- iterate-lessons-log [validation] expected trigger, fired 0x: "After the retro, I want the one big learning preserved somewhere future teams will actually find it"
- iterate-pivot-decision [train] expected trigger, fired 0x: "Document whether we should pivot or persevere on the SMB self-serve motion after the MVP numbers"
- iterate-pivot-decision [train] expected trigger, fired 0x: "Three of our core hypotheses got invalidated by the beta. Put together the direction decision with the evidence and options."
- iterate-pivot-decision [train] expected trigger, fired 0x: "We're at the planned post-launch checkpoint. Write the pivot-or-persevere analysis for the marketplace bet."
- iterate-pivot-decision [train] expected trigger, fired 0x: "Stakeholders are split on abandoning the consumer app to chase enterprise. Build the decision document with the data on both sides."
- iterate-pivot-decision [train] expected trigger, fired 0x: "Six months in, traction is flat. Lay out persevere plus at least two pivot options and recommend one."
- iterate-pivot-decision [train] expected trigger, fired 0x: "Market feedback says our wedge feature isn't a wedge. Document the strategic direction change with rationale and an implementation plan."
- iterate-pivot-decision [validation] expected trigger, fired 0x: "Make the case, with evidence, for whether to change course on the freemium pricing strategy or stay put"
- iterate-pivot-decision [validation] expected trigger, fired 0x: "After the failed launch, the founders want a structured pivot analysis: what we invested, what we learned, what the options are"
- iterate-pivot-decision [validation] expected trigger, fired 0x: "We're debating shifting from a horizontal platform to a vertical healthcare focus. Capture the decision and the dissenting views."
- iterate-pivot-decision [validation] expected trigger, fired 0x: "Write up yesterday's strategy review outcome: we are staying the course, and I want the persevere rationale preserved"
- iterate-refinement-notes [train] expected trigger, fired 0x: "Write up the notes from today's backlog refinement: stories estimated, questions raised, decisions made"
- iterate-refinement-notes [train] expected trigger, fired 0x: "Half the team missed grooming. Capture what we estimated and decided so they can catch up."
- iterate-refinement-notes [train] expected trigger, fired 0x: "Document the outcomes of the refinement session: the payments epic got split and two stories are blocked on legal"
- iterate-refinement-notes [train] expected trigger, fired 0x: "Turn my scratchpad from this afternoon's grooming session into structured notes with open questions and owners"
- iterate-refinement-notes [train] expected trigger, fired 0x: "Before sprint planning, summarize what got refined this week and which stories are actually ready"
- iterate-refinement-notes [train] expected trigger, fired 0x: "Capture the estimates and scope changes we agreed in refinement, plus the spike we decided to run first"
- iterate-refinement-notes [validation] expected trigger, fired 0x: "Record the backlog grooming outcomes: points per story, parking lot items, and what we refine next session"
- iterate-refinement-notes [validation] expected trigger, fired 0x: "A new engineer joined mid-quarter. Put together refinement notes that explain how these backlog stories evolved and where they stand."
- iterate-refinement-notes [validation] expected trigger, fired 0x: "These five stories went stale and we re-refined them today. Document what changed and the new estimates."
- iterate-refinement-notes [validation] expected trigger, fired 0x: "Summarize today's refinement so absent folks know which stories moved to ready and what's still blocked"
- iterate-retrospective [train] expected trigger, fired 0x: "Run a retrospective for sprint 42"
- iterate-retrospective [train] expected trigger, fired 0x: "Facilitate a Mad/Sad/Glad retro after the rough release week and document the action items"
- iterate-retrospective [train] expected trigger, fired 0x: "The project just shipped; help the team reflect on what went well and what to change next time"
- iterate-retrospective [train] expected trigger, fired 0x: "Team morale feels off; structure a session where we examine how we are working together"
- iterate-retrospective [train] expected trigger, fired 0x: "Prepare a 4Ls retrospective for the platform migration milestone, including a review of last retro's actions"
- iterate-retrospective [train] expected trigger, fired 0x: "Document our end-of-sprint reflection: wins, pain points, and the top three improvements with owners"
- iterate-retrospective [validation] expected trigger, fired 0x: "Run the post-incident team retro for last Tuesday's outage and capture the follow-ups"
- iterate-retrospective [validation] expected trigger, fired 0x: "We finished the quarter; lead the team through a structured look back with prioritized action items"
- iterate-retrospective [validation] expected trigger, fired 0x: "Set up a sailboat-format retro for the design system squad and write up the outcomes"
- iterate-retrospective [validation] expected trigger, fired 0x: "Our retros keep producing vague actions; facilitate this one so every item has an owner and a due date"
- measure-dashboard-requirements [train] expected trigger, fired 0x: "Write dashboard requirements for tracking activation funnel health for the growth team"
- measure-dashboard-requirements [train] expected trigger, fired 0x: "The data team asked what we actually need on the new retention dashboard. Spec the metrics, charts, and filters."
- measure-dashboard-requirements [train] expected trigger, fired 0x: "I keep pulling the same ad-hoc numbers every Monday. Turn this into requirements for a persistent self-serve dashboard."
- measure-dashboard-requirements [train] expected trigger, fired 0x: "Define the KPI tracking view for the checkout redesign: which metrics, definitions, breakdowns, and refresh cadence"
- measure-dashboard-requirements [train] expected trigger, fired 0x: "Spec out an executive dashboard that answers whether the marketplace is healthy, before quarterly planning"
- measure-dashboard-requirements [train] expected trigger, fired 0x: "Document the reporting needs for support leadership: ticket volume trends, segment drill-downs, and who gets access"
- measure-dashboard-requirements [validation] expected trigger, fired 0x: "Our analytics team needs a requirements doc for the subscription revenue dashboard, including data sources and known quality issues"
- measure-dashboard-requirements [validation] expected trigger, fired 0x: "Put together what the mobile team's daily standup board should show: crash rate, DAU, release adoption, with drill-downs"
- measure-dashboard-requirements [validation] expected trigger, fired 0x: "I want stakeholders to self-serve product usage numbers instead of pinging me. Specify the dashboard they need."
- measure-dashboard-requirements [validation] expected trigger, fired 0x: "Define requirements for a North Star metric dashboard with supporting input metrics and segment filters"
- measure-experiment-design [train] expected trigger, fired 0x: "Design an A/B test for the new checkout button placement"
- measure-experiment-design [train] expected trigger, fired 0x: "We have a hypothesis about onboarding emails; spec the experiment with variants, sample size, and duration"
- measure-experiment-design [train] expected trigger, fired 0x: "How many users per variant do we need to detect a 2 percent lift in conversion, and how long should we run it?"
- measure-experiment-design [train] expected trigger, fired 0x: "Stakeholders want data before we roll out the redesign; set up a controlled test plan"
- measure-experiment-design [train] expected trigger, fired 0x: "Write the experiment plan for testing free shipping thresholds, including guardrail metrics and success criteria"
- measure-experiment-design [train] expected trigger, fired 0x: "Define control and treatment, traffic allocation, and exclusions for the search ranking test"
- measure-experiment-design [validation] expected trigger, fired 0x: "Help me design a rigorous experiment to validate the assumption we already framed about trial-to-paid conversion"
- measure-experiment-design [validation] expected trigger, fired 0x: "Plan the A/B test so we do not call it early on noise: significance level, power, and stopping rules"
- measure-experiment-design [validation] expected trigger, fired 0x: "Our hypothesis doc is approved; turn it into a runnable test design before engineering builds the variants"
- measure-experiment-design [validation] expected trigger, fired 0x: "Set up an experiment comparing two paywall designs with a single primary metric"
- measure-experiment-results [train] expected trigger, fired 0x: "Write up the results of the checkout button A/B test that hit significance yesterday"
- measure-experiment-results [train] expected trigger, fired 0x: "Our onboarding experiment ended early because of a guardrail breach. Document what happened and what we learned."
- measure-experiment-results [train] expected trigger, fired 0x: "The paywall test finished: treatment up 4.2% on conversion, p=0.03. Turn this into a readout for stakeholders who weren't involved."
- measure-experiment-results [train] expected trigger, fired 0x: "Summarize the pricing page experiment outcome with confidence intervals and a ship, iterate, or kill recommendation"
- measure-experiment-results [train] expected trigger, fired 0x: "We ran the email cadence test for six weeks. Analyze the primary and guardrail metrics and tell the org what we found."
- measure-experiment-results [train] expected trigger, fired 0x: "Document the experiment readout for the recommendation widget, including segment breakdowns by platform and tenure"
- measure-experiment-results [validation] expected trigger, fired 0x: "The dark mode test came back flat. Write an honest results doc so we stop relitigating it."
- measure-experiment-results [validation] expected trigger, fired 0x: "Turn the raw numbers from the search ranking test into a findings document with learnings that go beyond the stats"
- measure-experiment-results [validation] expected trigger, fired 0x: "Leadership wants to know if the free trial extension experiment worked. Put together the results with the statistics and a clear recommendation."
- measure-experiment-results [validation] expected trigger, fired 0x: "Our growth experiment on referral incentives just concluded. Capture the outcome so future teams can learn from it."
- measure-instrumentation-spec [train] expected trigger, fired 0x: "Write an instrumentation spec for the new onboarding checklist before engineering starts building"
- measure-instrumentation-spec [train] expected trigger, fired 0x: "Define the analytics events, triggers, and properties for the checkout redesign"
- measure-instrumentation-spec [train] expected trigger, fired 0x: "We keep finding questions we can't answer because nothing was tracked. Audit the signup flow tracking and spec what's missing."
- measure-instrumentation-spec [train] expected trigger, fired 0x: "Engineering needs a tracking contract for the referral feature: event names, when they fire, what properties, and PII handling"
- measure-instrumentation-spec [train] expected trigger, fired 0x: "We are migrating to Amplitude. Document the event taxonomy and user properties the new tool should receive."
- measure-instrumentation-spec [train] expected trigger, fired 0x: "Before launch, make sure measurement is in place: spec the events for the collaboration feature with a QA checklist"
- measure-instrumentation-spec [validation] expected trigger, fired 0x: "Draft the event tracking requirements for the mobile app's push notification opt-in flow"
- measure-instrumentation-spec [validation] expected trigger, fired 0x: "Spell out exactly which user actions in the editor we should log, with property types and example values"
- measure-instrumentation-spec [validation] expected trigger, fired 0x: "Product analytics for the trial flow are inconsistent across platforms. Write the spec that makes web and mobile fire the same events."
- measure-instrumentation-spec [validation] expected trigger, fired 0x: "I need a data collection plan engineering can implement for the new search experience, including which properties count as PII"
- measure-okr-grader [train] expected trigger, fired 0x: "Score our Q2 OKRs now that the cycle has closed"
- measure-okr-grader [train] expected trigger, fired 0x: "Here are the final KR values, baselines, and targets; produce the cycle review with learning synthesis"
- measure-okr-grader [train] expected trigger, fired 0x: "The quarter ended and leadership wants to know which key results we actually hit and what the evidence says"
- measure-okr-grader [train] expected trigger, fired 0x: "Grade this completed OKR set, treating committed and aspirational KRs differently"
- measure-okr-grader [train] expected trigger, fired 0x: "We disagree about whether 0.7 on that KR is good or bad; do an honest scoring pass"
- measure-okr-grader [train] expected trigger, fired 0x: "Close out the half-year OKR cycle: scorecard, evidence quality, and next-cycle recommendations"
- measure-okr-grader [validation] expected trigger, fired 0x: "The cycle ended early because of the reorg; do a partial-close scoring of our OKRs with interim values"
- measure-okr-grader [validation] expected trigger, fired 0x: "Assess our finished OKRs: did the guardrail hold, and what should we carry into next quarter?"
- measure-okr-grader [validation] expected trigger, fired 0x: "Turn these end-of-quarter KR actuals into a review the team can learn from, with no sugarcoating of misses"
- measure-okr-grader [validation] expected trigger, fired 0x: "Evaluate the completed OKR set and flag any KRs whose measurement window has not closed yet"
