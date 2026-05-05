# Thread Profiles

Machine-readable reference for the three canonical narrative threads used across
the PM Skills sample library. Each thread is a fictional company representing a
distinct product archetype, team stage, and prompt style.

This file complements [`README_SAMPLES.md`](README_SAMPLES.md) (human-readable
navigation) and [`SAMPLE_CREATION.md`](SAMPLE_CREATION.md) (authoring standards).
It exists so automated tooling has a single structured source of thread context,
rather than re-extracting it from prose each time.

## Purpose

Sample-generation and sample-validation tools need consistent per-thread
context: company identity, stage, real competitors, character naming
convention, sample-suffix patterns, and representative scenarios per skill
phase. Today that context lives in prose across `README_SAMPLES.md` and in
the heads of sample authors. This file gives tools a structured place to read
it from.

Primary consumers:

- `utility-pm-skill-builder` (when generating thread-appropriate scenarios for
  a new skill's library samples)
- Any future sample-regeneration, cross-thread synthesis, or thread-validation
  tooling

If a tool needs thread context, it should read this file. If a sample author
needs thread context, [`README_SAMPLES.md`](README_SAMPLES.md) is the friendlier
read; this file is the contract.

## Coupling

Three sources need to agree about thread metadata:

| Source | Role |
|--------|------|
| `scripts/generate-showcase.py` (`THREADS` dict) | Canonical Python source of truth for showcase generation |
| `library/skill-output-samples/README_SAMPLES.md` | Human-readable thread overview and per-thread sample index |
| `library/skill-output-samples/THREAD_PROFILES.md` (this file) | Machine-readable structured contract for tooling |

When you change a thread's stage, team size, feature arc, prompt style, or
competitor list, update all three in the same change set. A future CI script
(`scripts/check-thread-profiles-consistency`, deferred until usage signals
demand) is the intended enforcement mechanism.

The repo currently ships three threads. They cover the B2B / consumer /
enterprise spectrum and are not expected to grow. See
[Adding a new thread](#adding-a-new-thread) for the process if a new
archetype gap emerges.

---

## Threads

### Storevine - B2B Ecommerce Platform

```yaml
thread: storevine
display: Storevine
subtitle: B2B Ecommerce Platform
company_type: b2b-ecommerce-platform
stage: series-a
team_size: 70
user_base: 15K merchants
feature_arc: campaigns
feature_arc_display: Campaigns
feature_arc_description: native email and SMS re-engagement
prompt_style: organized
prompt_style_description: structured context, references prior work, clear scope boundaries
sample_suffix: campaigns
real_competitors:
  - shopify
  - squarespace
  - wix
  - klaviyo
  - mailchimp
character_naming_convention: role-prefixed (e.g., Growth PM, Eng Lead) with occasional formal "First L." for executives
```

**Feature arc.** Campaigns: native email and SMS re-engagement built into the
Storevine admin. The feature competes with merchants currently buying Klaviyo
or Mailchimp and stitching them onto Storevine via integrations. The arc
spans merchant interviews, competitive analysis, a guided first-campaign
flow A/B test, GA launch, and a persevere decision.

**Prompt style.** Organized: structured context, references to prior
artifacts, clear scope boundaries. Models a PM who keeps a research
repository, files docs as work proceeds, and prepares structured context
before invoking a skill. If you keep a research notebook, Storevine prompts
will feel familiar.

**Character naming convention.** Role-prefixed labels for first mentions
("Growth PM", "Eng Lead, Platform Squad", "Merchant Success"). Executives
and external partners use formal "First L." style ("Sandra C.", "Mei-Lin T.").
Characters recur across samples within the thread but are not standardized
into a fixed roster: the convention is the contract, not specific names.

**Sample-suffix convention.** Most phase-skill samples use `_campaigns` as
the artifact-context segment:

- `sample_define-hypothesis_storevine_campaigns.md`
- `sample_deliver-prd_storevine_campaigns.md`

Sub-feature samples extend with hyphens:

- `sample_utility-mermaid-diagrams_storevine_campaign-flow.md`
- `sample_utility-slideshow-creator_storevine_campaigns-launch-deck.md`

Persona variants encode mode + depth in the suffix:

- `sample_foundation-persona_storevine_product-brief-campaigns.md`
- `sample_foundation-persona_storevine_marketing-detailed-campaigns.md`

OKR-cycle samples encode the period:

- `sample_foundation-okr-writer_storevine_campaigns-q3.md`
- `sample_measure-okr-grader_storevine_campaigns-q3.md`

**Representative scenarios by phase.**

- **Foundation:** Campaigns marketing and product personas across brief and
  detailed depths; lean-canvas thesis for embedded re-engagement; Q3 Campaigns
  OKR set with weekly active senders, 90-day retention, CTR guardrail.
- **Discover:** Email/SMS competitive landscape (built-in vs. third-party);
  8 merchant interviews on tool-juggling tax and Klaviyo lock-in;
  power-user, integration-partner, and merchant-success stakeholder map.
- **Define:** External-tool dependency problem statement (~68% of merchants
  use external email tools); pre-built-templates first-send hypothesis;
  churn-reduction opportunity tree; tool-stack jobs-to-be-done.
- **Develop:** Email-vendor solution brief; deliverability spike (SendGrid
  vs. SES vs. Postmark vs. Mailgun); SendGrid dedicated-IP ADR;
  template-only vs. drag-and-drop design rationale.
- **Deliver:** Campaigns CAN-SPAM PRD; first-campaign flow user stories;
  unsubscribe and zero-valid-emails edge cases; CAN-SPAM/GDPR launch
  checklist; merchant-facing release notes.
- **Measure:** Templates vs. blank-canvas A/B design; campaign-event
  instrumentation spec; adoption-and-revenue dashboard; treatment-wins
  experiment results; OKR cycle close.
- **Iterate:** Q2 Sprint 12 retrospective; email-list-validation lesson;
  Campaigns v1.1 refinement notes; persevere decision with template-only
  sub-pivot.

See [README_SAMPLES.md "Storevine" section](README_SAMPLES.md#storevine--b2b-ecommerce-platform)
for the full per-skill scenario index.

---

### Brainshelf - Consumer PKM App

```yaml
thread: brainshelf
display: Brainshelf
subtitle: Consumer PKM App
company_type: consumer-pkm-app
stage: post-seed
team_size: 20
user_base: 85K registered, 22K MAU
feature_arc: resurface
feature_arc_display: Resurface
feature_arc_description: contextual morning email digest
prompt_style: casual
prompt_style_description: rough, fast, enough context to work; bullet points and shorthand
sample_suffix: resurface
real_competitors:
  - readwise
  - raindrop-io
  - omnivore
  - instapaper
character_naming_convention: lowercase first names (e.g., marco, alex, chloe), reflecting startup-team informality
```

**Feature arc.** Resurface: a contextual morning email digest that
resurfaces saved content based on recent reading patterns rather than
a fixed schedule. The arc spans competitive analysis, the "guilt pile"
interview synthesis, a topic-matching algorithm spike, an A/B test against
control, and a Sprint 9 refinement that pivots the trigger model.

**Prompt style.** Casual: rough, fast, enough context to produce a good
artifact but minimal polish. Bullet points, shorthand, and incomplete
sentences are common. Models a lean team where the PM wears multiple
hats, ships in two-week sprints, and does not have time for formal briefs.
If you ship features quickly with a small team, Brainshelf prompts will
feel familiar.

**Character naming convention.** Lowercase first names throughout:
"marco" (CEO/cofounder), "alex" (eng lead), "jordan" (growth),
"dan" (designer), "chloe" (data), "priya" (PM/launch owner). The
informality is intentional and reinforces the casual prompt style. Names
recur across samples but are not enumerated as a strict roster.

**Sample-suffix convention.** Most phase-skill samples use `_resurface`
as the artifact-context segment:

- `sample_define-hypothesis_brainshelf_resurface.md`
- `sample_deliver-edge-cases_brainshelf_resurface.md`

Persona variants encode mode + depth:

- `sample_foundation-persona_brainshelf_product-detailed-resurface.md`

Meeting-family samples encode the meeting topic in the suffix:

- `sample_foundation-meeting-agenda_brainshelf_resurface-algo-review.md`
- `sample_foundation-meeting-recap_brainshelf_resurface-scope-cut.md`

OKR-cycle samples encode the period:

- `sample_foundation-okr-writer_brainshelf_resurface-q3.md`

**Representative scenarios by phase.**

- **Foundation:** Resurface marketing (newsletter-creator acquisition,
  freemium-to-paid) and product (activation, power-curator) personas;
  Monday-morning-digest lean canvas; Q3 Resurface OKR set with weekly
  Resurface-active members, 30-day retention, relevance guardrail.
- **Discover:** PKM/read-later competitive landscape; 7 interviews on
  guilt-pile behavior; power-saver, open-source-PKM, newsletter-curator
  stakeholder map.
- **Define:** Save-but-don't-revisit problem statement (47 items/month
  saved, fewer than 9% revisited within 30 days [fictional]); morning-email
  hypothesis; 60-day-retention opportunity tree; rediscover-saved-content
  jobs-to-be-done.
- **Develop:** Resurface solution brief; article-extraction spike (Diffbot
  vs. Mercury vs. Readability.js vs. custom); Mercury Parser ADR; email
  digest + in-app card design rationale.
- **Deliver:** Apple-Mail-Privacy-aware Resurface PRD; reading-PM user
  stories; paywalled-items and quiet-hours edge cases; App Store launch
  checklist; consumer-facing release notes.
- **Measure:** Email vs. in-app A/B design; resurface event
  instrumentation spec; click-through and retention dashboard; email-
  digest-wins experiment results; OKR cycle close with retention-multiplier
  finding.
- **Iterate:** Sprint 8 retrospective with notification-timing bug;
  paywall-detection lesson; Resurface v1.1 refinement notes (quiet hours,
  source filtering); pivot from time-based digest to extension-triggered
  contextual resurface.

See [README_SAMPLES.md "Brainshelf" section](README_SAMPLES.md#brainshelf--consumer-pkm-app)
for the full per-skill scenario index.

---

### Workbench - Enterprise Collaboration

```yaml
thread: workbench
display: Workbench
subtitle: Enterprise Collaboration
company_type: enterprise-collaboration-platform
stage: series-b
team_size: 200
user_base: 500 enterprise customers
feature_arc: blueprints
feature_arc_display: Blueprints
feature_arc_description: document templates with required sections and approval gates
prompt_style: enterprise
prompt_style_description: full stakeholder lists, quantified baselines, explicit metrics
sample_suffix: blueprints
real_competitors:
  - atlassian-confluence
  - notion
  - coda
  - monday-com
  - basecamp
character_naming_convention: formal "First L." style (e.g., Sandra C., Karen L., Tomás G.) with explicit role and team affiliation
```

**Feature arc.** Blueprints: reusable document templates with required
sections and role-based approval gates. The feature targets enterprise
ops and compliance teams. The arc spans team-lead interviews on
Confluence fatigue, a Yjs CRDT spike, a required-vs-optional-sections
A/B test, GA launch with three launch-week incidents, and a
customer-segment pivot to ops/compliance.

**Prompt style.** Enterprise: the most complete and structured prompts
in the library. Full stakeholder lists, quantified baselines, explicit
metric definitions, references to prior research, and named decision
makers. Models an enterprise PM operating in a high-documentation
environment where artifacts must withstand legal, compliance, and
executive review. If you work in enterprise product management, Workbench
prompts will feel familiar.

**Character naming convention.** Formal "First L." style throughout:
"Sandra C." (Head of Product), "Karen L." (Eng Lead, Blueprints squad),
"James W." (VP Engineering), "Derek H." (Head of Marketing),
"Mei-Lin T." (Enterprise Sales Lead), "Rachel V." (PM, Blueprints),
"Tomás G." (Design Lead), "Nate P." (Backend Engineer),
"Aisha K." (Frontend Engineer), "Leo M." (Data Analyst). Roles and team
affiliations are explicit, reflecting enterprise-PM documentation
standards. The cast recurs across samples but is not an enforced
fixed roster.

**Sample-suffix convention.** Most phase-skill samples use `_blueprints`
as the artifact-context segment:

- `sample_define-hypothesis_workbench_blueprints.md`
- `sample_deliver-prd_workbench_blueprints.md`

Persona variants encode mode + depth:

- `sample_foundation-persona_workbench_product-detailed-blueprints.md`

Meeting-family samples encode the meeting topic:

- `sample_foundation-meeting-agenda_workbench_blueprints-approval-design.md`
- `sample_foundation-meeting-brief_workbench_vp-ops-roi-briefing.md`

OKR-cycle samples encode the period:

- `sample_foundation-okr-writer_workbench_blueprints-q3.md`
- `sample_measure-okr-grader_workbench_blueprints-q3.md`

**Representative scenarios by phase.**

- **Foundation:** Document-author and approval-governance product
  personas; internal-champion and economic-buyer marketing personas;
  enforced-section-templates lean canvas; Q3 Blueprints OKR set with
  contracted onboardings, execution-rate aspirational KR, HIPAA
  compliance, SLA guardrail.
- **Discover:** Enterprise documentation competitive landscape;
  6 enterprise-team-lead interviews on Confluence fatigue; IT-security,
  legal/compliance, department-head, Confluence-migrant stakeholder map.
- **Define:** Approved-kickoff-doc gap problem statement (60% of
  enterprise projects lack one at handoff [fictional]); required-sections
  hypothesis (4 days to 1 day [fictional]); enterprise expansion
  opportunity tree; ops-manager docs-police jobs-to-be-done.
- **Develop:** Blueprints solution brief; CRDT library spike (Yjs vs.
  Automerge vs. ShareDB); Yjs ADR; guided-wizard vs. blank-canvas
  design rationale.
- **Deliver:** SSO-and-approval-gates PRD; ops-manager and
  department-head user stories; required-section-deleted and
  approver-role-revoked edge cases; SSO-tenant-testing launch
  checklist; enterprise-facing release notes.
- **Measure:** Required vs. optional sections A/B design; Blueprint
  lifecycle instrumentation spec; adoption-by-department and
  time-to-approved dashboard; required-sections-win experiment
  results; OKR cycle close with mixed-empowerment Disclosure.
- **Iterate:** Post-GA retrospective with approval-UX confusion and
  SSO incident; required-sections-caused-skip-and-submit lesson;
  Blueprints v1.1 refinement notes (version history, approval
  delegation, section commenting); customer-segment pivot to
  ops/compliance.

See [README_SAMPLES.md "Workbench" section](README_SAMPLES.md#workbench--enterprise-collaboration-software)
for the full per-skill scenario index.

---

## Sample Naming Convention

The canonical pattern is documented in [`SAMPLE_CREATION.md`](SAMPLE_CREATION.md)
section 2:

```
sample_<skill>_<thread>_<additional-helpful-context>.md
```

The `<thread>` segment must be one of:

- `storevine` (B2B ecommerce thread)
- `brainshelf` (consumer PKM thread)
- `workbench` (enterprise collaboration thread)
- `orbit` (legacy PRD calibration samples)
- `legacy` (older non-thread baseline examples)

The `<additional-helpful-context>` segment varies by sample type:

| Sample type | Suffix shape | Examples |
|-------------|--------------|----------|
| Phase-skill, single-feature thread | thread feature-arc | `_campaigns`, `_resurface`, `_blueprints` |
| Persona variant | mode-depth-arc | `_product-brief-campaigns`, `_marketing-detailed-blueprints` |
| Meeting-family | arc-meeting-topic | `_campaigns-kickoff`, `_resurface-algo-review`, `_blueprints-approval-design` |
| OKR cycle | arc-period | `_campaigns-q3`, `_blueprints-q3` |
| Sub-feature artifact | feature-or-deck | `_campaign-flow`, `_campaigns-launch-deck` |
| Utility (single-thread) | feature or task | `_campaign-analytics-skill`, `_validate-campaign-analytics`, `_update-report` |
| Legacy | descriptor | `_ideal`, `_ecommerce-platform` |

Lowercase, hyphen-separated, no spaces. Validators pin these rules and
reject filenames that violate them.

## Adding a New Thread

The current three threads cover the B2B / consumer / enterprise archetype
spectrum and are not expected to grow. Adding a fourth thread should be
the rare exception, not the default.

If a new thread is justified:

1. **Confirm a distinct archetype gap.** A new thread must represent a
   product type, team stage, or prompt style that none of the existing
   three covers. "Variation within an existing archetype" is not enough.
2. **Update all three coupled sources in one change set.** Add a
   `THREADS` entry to `scripts/generate-showcase.py`, a section to
   `README_SAMPLES.md`, and a section to this file.
3. **Define the suffix convention.** Pick a feature-arc string and
   document it in this file's threads section.
4. **Seed the sample library.** Provide at least the canonical 25
   phase-skill samples plus persona variants for the new thread before
   merging. Anything less leaves the showcase generator with empty
   sections.
5. **Update the showcase generator.** Verify
   `scripts/generate-showcase.py` regenerates cleanly and that the new
   thread's showcase page renders.
6. **Update consumer tooling.** `utility-pm-skill-builder` and any other
   thread-aware tools must opt in to the new thread.

If any of those steps cannot be done in the same change set, defer the
new thread to a dedicated effort.

## Field Reference

Glossary of YAML fields used in the per-thread metadata blocks:

| Field | Type | Description |
|-------|------|-------------|
| `thread` | string | Lowercase identifier; must match the `<thread>` segment in sample filenames |
| `display` | string | Title-case display name (e.g., "Storevine") |
| `subtitle` | string | Short product-type tagline (e.g., "B2B Ecommerce Platform") |
| `company_type` | string | Hyphenated archetype identifier (e.g., `b2b-ecommerce-platform`) |
| `stage` | string | Funding/maturity stage (e.g., `series-a`, `post-seed`, `series-b`) |
| `team_size` | integer | Approximate employee count |
| `user_base` | string | Approximate customer/user count, with units (e.g., `15K merchants`) |
| `feature_arc` | string | Lowercase feature identifier (e.g., `campaigns`); matches `sample_suffix` for the canonical thread |
| `feature_arc_display` | string | Title-case feature name (e.g., "Campaigns") |
| `feature_arc_description` | string | One-clause description of what the feature does |
| `prompt_style` | string | One-word style identifier (`organized`, `casual`, `enterprise`) |
| `prompt_style_description` | string | One-clause description of how prompts are typically written |
| `sample_suffix` | string | Default `<additional-helpful-context>` segment for canonical phase-skill samples |
| `real_competitors` | list of strings | Lowercase, hyphenated competitor identifiers (real companies); used for cross-thread positioning checks |
| `character_naming_convention` | string | One-clause description of how named characters appear in samples for this thread |

## See Also

- [`README_SAMPLES.md`](README_SAMPLES.md): human-readable library navigation
  with per-skill and per-thread sample tables
- [`SAMPLE_CREATION.md`](SAMPLE_CREATION.md): authoring standards for
  filenames, frontmatter, content structure, and update workflow
- `scripts/generate-showcase.py`: canonical Python `THREADS` dict that
  drives showcase page generation; this file mirrors its content for
  tooling that needs structured access without parsing Python
