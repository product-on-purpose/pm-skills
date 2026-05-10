---
title: Meeting Skills Contract
description: Canonical v1.1.0 contract for the 5 foundation-meeting-* skills plus foundation-stakeholder-update. Shared frontmatter, file naming, behavioral patterns, and enforcement rules validated by CI.
---

# Meeting Skills Family Contract

**Status**: Canonical (enforced by CI)
**Version**: 1.1.0
**Applies to**: `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-recap`, `foundation-meeting-synthesize`, `foundation-stakeholder-update`
**Last updated**: 2026-04-17

---

## What this document is

This is the shared behavioral and structural contract that governs all skills in the pm-skills meeting family. It defines what the skills have in common: the frontmatter they emit, the file naming they use, the behavioral pattern they follow, the shared taxonomies they reference, and the non-goals they respect.

Individual skill `SKILL.md` files implement the family-specific behavior (what they produce, how their process differs); this document defines what they share. A skill in this family is not conforming to the family unless it conforms to this contract.

**Enforcement**: the `scripts/validate-meeting-skills-family.sh` validator runs against every PR touching `skills/foundation-meeting-*/` or `skills/foundation-stakeholder-update/` and fails the build if the contract is violated.

## Why a family contract exists

Meeting skills share enough cross-cutting structure. shareable summaries for chat clients, sources traceability, file-based chaining between artifacts, quality signals, input flexibility. that implementing each skill independently would produce drift. The family contract makes the shared surface explicit and enforceable so the skills compose cleanly: a recap can auto-populate from an agenda, a synthesis can consume recaps, a stakeholder update can reference a recap, and the interfaces between them stay stable across future iterations.

---

## The 5 skills at a glance

| Skill | Phase in meeting lifecycle | Primary audience | Command |
|-------|---------------------------|------------------|---------|
| `foundation-meeting-agenda` | Pre-meeting | Attendees | `/meeting-agenda` |
| `foundation-meeting-brief` | Pre-meeting | User (private prep) | `/meeting-brief` |
| `foundation-meeting-recap` | Post-meeting | Attendees (actions inline) | `/meeting-recap` |
| `foundation-meeting-synthesize` | Cross-meeting | User / leadership | `/meeting-synthesize` |
| `foundation-stakeholder-update` | Post-meeting | Primarily non-attendees; secondarily some attendees | `/stakeholder-update` |

All 5 are classified under the `foundation` phase (cross-cutting lifecycle tooling), consistent with `foundation-persona` and `foundation-lean-canvas`.

### How they chain

**Single-meeting lifecycle**:

```
meeting-brief (user prep) + meeting-agenda (attendee prep)
                        ↓
                [meeting happens]
                        ↓
            meeting-recap (attendees, actions inline)
                        ↓
            stakeholder-update (non-attendees, audience-tailored)
```

**Cross-meeting**:

```
[recaps from many meetings]  →  meeting-synthesize  →  synthesis artifact
```

Chaining is **filename-based**: there is no separate meeting_id. The filename pattern encodes identity (see File Naming Convention below), and artifacts reference each other by full filename in their `related_*` frontmatter fields.

---

## Universal principles

Every skill in this family follows these principles. Individual `SKILL.md` files must explicitly acknowledge them.

### 1. Zero-friction execution (go mode)

The skill never blocks on interrogation. When invoked, it reads whatever input is provided, infers whatever it can, and either (a) presents a brief inference summary and accepts a one-word `go` to proceed, (b) runs silently if the user invoked with `--go`, or (c) runs through immediately if the user provided all inputs upfront.

**Default flow**:

1. User invokes: `/meeting-agenda @topic-doc.md @attendee-list.md`
2. Skill reads inputs, runs inference pass
3. Skill presents a brief inference summary:
   > Inferred:
   > - Meeting type: `decision-making` (confidence: medium. from "need to decide whether to ship v2")
   > - Duration: `45 min` (type-specific default for decision-making. not specified)
   > - Attendees: 6 people, RACI inferred from attendee-list context
   > - Objective: "Decide v2 ship timing for Q2"
   >
   > Say **go** to proceed, or tell me what to adjust.
4. User says `go` → skill produces output; or user corrects any subset → skill re-infers and re-summarizes
5. Output's `Generation context` section notes every inference that made it into the final artifact

**Explicit go-mode**: `/meeting-agenda --go @topic-doc.md`. skips the checkpoint, uses defaults, produces output in one shot. User reviews `Generation context` to see what was defaulted.

**Fully-specified**: `/meeting-agenda --type=decision-making --duration=60 --topic="..." @attendees.md`. skill uses provided values as authoritative; no checkpoint because nothing is ambiguous.

**Blocking questions** are permitted only when inference confidence is actively low on a load-bearing input AND no reasonable default exists. This should be rare. When asking, the skill must state the default it will apply if the user does not answer.

**Load-bearing inference gates** (v1.1.0):

Some inferences are load-bearing. downstream output depends on them. When confidence is below `high` on any of the following fields, the skill must flag the risk in the inference summary with a `⚠` marker and surface the dependency explicitly. The user can still say `go`, but the flag ensures they see the risk:

| Field | Why load-bearing | Required flag when <high confidence |
|-------|------------------|-------------------------------------|
| Stakeholder positions | Tactical-notes guidance builds on these | "⚠ stakeholder-position inference is low-confidence; recommend confirming before using tactical-notes guidance" |
| Primary ask / primary CTA | Skill structures output around this | "⚠ primary ask inferred; confirm before acting" |
| Decision-maker attribution | Downstream escalation depends on correct attribution | "⚠ decision-maker inferred; verify before escalating" |
| Anticipated questions (soft) | Weaker dependency; soft flag only | No blocking flag |

Implementation: each skill's process step that computes inferences must check confidence and emit the flag into the go-mode inference summary when below-high.

**Anti-patterns** (prohibited):

- Asking "is this attendee list correct?" mid-flow
- Asking the user to confirm inferred values before producing anything
- Rejecting low-quality input. `input_quality: low` exists precisely for this
- Requiring more than what the user provided before producing any output
- Passing load-bearing low-confidence inferences silently (v1.1.0. must flag with `⚠`)

### 2. Adaptive Executor pattern

Every skill gracefully accepts variable-quality input:

- Clean structured notes with headers and sections
- Raw transcripts from Zoom, Google Meet, Otter, Fireflies, Krisp MCP, or manual paste
- Bullet-point scraps or shorthand notes
- Slack thread exports
- Hybrid inputs (partial transcript + user annotations)
- User-provided ancillary context (prior recaps, related docs, stakeholder briefs)

Skills ask only for critically missing context; they do not require structured input. When content is fragmentary, skills flag it via `input_quality: low` and produce a best-effort output with explicit `Known gaps` rather than refusing.

### 3. Evidence and confidence discipline

Skills never fabricate attendees, decisions, actions, or claims unsupported by input. Uncertainty is surfaced, not hidden. Every output carries:

- An overall `input_quality` marker (`high | medium | low`) in frontmatter
- An overall `confidence` marker in frontmatter
- Inline per-section confidence markers where warranted (`[confidence: high]`, `[confidence: medium]`, `[confidence: low]`)
- A `Known gaps` list in the `Sources & References` section

When the skill infers a value (meeting type, attendee role, decision classification), it flags the inference inline with its confidence and the evidence basis.

### 4. Filename-based chaining

No separate `meeting_id` field. The filename itself is the identifier; artifacts reference each other by full filename.

Chaining fields in frontmatter:

- `project` + `topics`. enables cross-meeting grouping for synthesis
- `related_brief`, `related_agenda`, `related_recap`, `related_synthesis`. explicit filename references
- `source_meetings` (synthesis only). list of recap filenames feeding the synthesis

This keeps coordination costs low: no lookup tables, no ID assignment ceremony, no collisions across overlapping topics and teams.

---

## Shared taxonomies

These enums are canonical across all 5 skills. When a skill uses any of these concepts, it draws values from these lists.

### Meeting type enum

```
standup
planning
review
decision-making
brainstorm
1-on-1
stakeholder-review
project-kickoff
working-session
exec-briefing
incident-postmortem
customer-call
training-workshop
business-review
other
```

(v1.1.0 added `incident-postmortem`, `customer-call`, `training-workshop`, `business-review`. common archetypes that were previously forced into `other`.)

**Frontmatter field**: `meeting_type` (optional. skill infers when absent).

**Applies to**: `meeting-agenda`, `meeting-brief`, `meeting-recap`, `stakeholder-update` (single-meeting skills). `meeting-synthesize` omits this field (aggregates across meeting types) but may filter by it via `scope_filter`.

### Attendee role enum (simplified RACI-4)

```
decision-maker
contributor
informed
optional
```

**Frontmatter field**: `attendees` is an optional list of objects with optional `role` values. The skill infers roles from context when not provided.

Example:

```yaml
attendees:
  - name: jonathan
    role: decision-maker
  - name: maria
    role: contributor
  - name: alex  # no role provided; skill infers
```

**Applies to**: `meeting-agenda`, `meeting-brief`, `meeting-recap`, `stakeholder-update`. `meeting-synthesize` omits (aggregates across meetings).

### Input quality levels

```
high     . structured notes with clear topics, complete attendee list, explicit decisions and actions captured
medium   . partial notes, some gaps, requires moderate inference
low      . fragmentary input, significant inference required, multiple gaps
```

**Frontmatter field**: `input_quality` (required).

### Confidence levels

Same enum used for overall confidence (frontmatter `confidence`) and inline per-section markers:

```
high   . directly supported by input
medium . inferred from multiple contextual cues
low    . tentative, verify before sharing
```

### Artifact types

```
meeting-agenda
meeting-brief
meeting-recap
meeting-synthesis
stakeholder-update
```

**Frontmatter field**: `artifact_type` (required). Exactly one per artifact.

> **v1.1.0 note**: The v1.0.0 contract listed bare names (`agenda`, `brief`, `recap`, `synthesis`, `stakeholder-update`) but its example YAML and all 5 implementations used the prefixed form. v1.1.0 corrects the enum to match implementation. The `meeting-*` prefix is semantically valuable when this repo later adds other cross-cutting skill families (e.g., `research-*` artifact types would not collide).

### Channel enum (stakeholder-update only)

```
slack | teams | email | notion | exec-memo
```

### Audience variant enum (stakeholder-update only)

```
engineering | design | leadership | customer-facing | mixed
```

### Visibility enum

```
private | team | leadership | public
```

**Frontmatter field**: `visibility` (required). Defaults:

- `meeting-agenda`: `team`
- `meeting-brief`: `private`
- `meeting-recap`: `team`
- `meeting-synthesize`: `team`
- `stakeholder-update`: set by user intent (typically `team` or `leadership`)

### Status enum

```
draft | final | archived
```

**Frontmatter field**: `status` (required). New artifacts default to `draft`.

---

## Universal output requirements

Every artifact produced by any meeting skill must include these structural elements.

### 1. Shareable summary at the top

Every output document leads with a `## Shareable summary` block designed to be copied and pasted into Slack, Microsoft Teams, or email with no further editing.

**Right-sized** means:

- 3 to 6 short lines for most outputs; a short paragraph plus bullets for synthesis
- Leads with the most important information (outcome, ask, or headline)
- Skimmable in under 10 seconds
- Self-contained. a reader who does not open the full doc still gets the essentials
- Plain prose and simple bullets. no nested headers, no tables, no markdown that breaks in chat clients

The `stakeholder-update` skill is a special case (clarified in v1.1.0):

- It does NOT use a `## Shareable summary` section (the channel-tailored body already is the shareable content)
- Instead, it MUST use a `## Shareable update` section that contains ONLY the channel-tailored message body (what a user would copy and paste into Slack, email, Notion, etc.)
- The `## Shareable update` section is the explicit shareable boundary. audit notes (`## Technical-to-business translation notes`) and `## Sources & References` sit OUTSIDE that boundary and must NOT be copied into the outgoing message
- The validator enforces presence of `## Shareable update` for stakeholder-update (not `## Shareable summary`, which would be wrong for this skill)

v1.0.0 claimed "the entire output is shareable content" which was misleading. the template included audit sections that should not go to stakeholders. v1.1.0 adds an explicit shareable boundary.

**End-marker convention** (v1.1.0): to make the boundary visually unambiguous, templates mark the END of the Shareable update section with a blockquote like:

```markdown
> [End of Shareable update section. Everything below is INTERNAL. do not copy into the outgoing message.]
```

The end-marker is a hard convention for this family's templates and samples. A reader scanning for "what do I paste" can scroll until they see the end marker and know to stop copying. The validator does not currently enforce the end-marker (it only enforces the `## Shareable update` section heading), but the convention is strongly recommended and documented in the end-user guide at `docs/guides/using-meeting-skills.md`.

### 2. Sources & References section at the bottom

Every output document ends with a `## Sources & References` section with this structure:

```markdown
## Sources & References

### Primary inputs
[what the skill drew from to produce this artifact]
- {{Source type}}: {{Source name/identifier}}

### Referenced artifacts
[related meeting-family or project documents, using full filenames]
- Brief: [{{filename}}]({{path}})
- Agenda: [{{filename}}]({{path}})
- Prior recap: [{{filename}}]({{path}})

### External references
[docs, links, data cited in the meeting content]
- {{Title}}: {{Link}}

### Generation context
- **Generated**: {{Timestamp}}
- **Skill version**: {{Version}}
- **Input quality**: {{high | medium | low}}. {{Brief rationale}}
- **Overall confidence**: {{high | medium | low}}. {{Brief rationale}}
- **Known gaps**: {{List of topics the input did not cover sufficiently, or "None identified"}}
- **Inferences applied**: {{List of values inferred by the skill, each with confidence marker}}
```

Purpose: auditability (can a reader verify claims?), chaining (downstream skills know what to trust), synthesis enablement (cross-meeting synthesis depends on traceable lineage).

### 3. YAML frontmatter

Every output document begins with YAML frontmatter. Universal base fields appear in all artifacts; per-skill additions are layered on top.

#### Universal base fields

```yaml
---
# Document identity
artifact_type: meeting-recap            # meeting-agenda | meeting-brief | meeting-recap | meeting-synthesis | stakeholder-update
version: 1.0
generated_at: 2026-04-18T09:15:00Z
generated_by_skill: meeting-recap

# Meeting identity (omitted by synthesis)
meeting_title: "Search Feature Kickoff"
meeting_date: 2026-04-17
meeting_start_time: "14:00 EST"
meeting_type: project-kickoff           # optional. skill infers when absent; values from Meeting type enum
meeting_duration_minutes: 30            # default 30 when not specified

# Project / topic (enables cross-meeting grouping for synthesis)
project: search-feature
topics:
  - search-scope
  - engineering-capacity

# Attendees (optional; roles inferred when absent)
attendees:
  - name: jonathan
    role: decision-maker
  - name: maria
    role: contributor
attendees_absent:
  - sarah

# Chaining references (full filenames, relative to same directory)
related_brief: 2026-04-17_14-00EST_search-feature-kickoff_brief.md
related_agenda: 2026-04-17_14-00EST_search-feature-kickoff_agenda.md
related_recap: 2026-04-17_14-00EST_search-feature-kickoff_recap.md
related_synthesis: 2026-Q1_search-feature_synthesis.md

# Quality signals (required)
input_quality: high                     # high | medium | low
confidence: high                        # overall artifact confidence
input_sources:
  - type: transcript
    name: "zoom-recording-2026-04-17"

# Sharing / lifecycle
visibility: team                        # private | team | leadership | public
status: draft                           # draft | final | archived
---
```

#### Per-skill additional fields

- **`meeting-agenda`**: `meeting_duration_minutes` (integer, default varies by meeting type. see table below), `desired_outcomes` (list)

**Type-specific duration defaults** (v1.1.0):

| Meeting type | Default duration (minutes) |
|--------------|---------------------------|
| `standup` | 15 |
| `1-on-1` | 30 |
| `exec-briefing` | 30 |
| `other` | 30 |
| `decision-making` | 45 |
| `brainstorm` | 45 |
| `stakeholder-review` | 45 |
| `planning` | 60 |
| `review` | 60 |
| `project-kickoff` | 60 |
| `working-session` | 60 |
| `incident-postmortem` | 60 |
| `customer-call` | 30 |
| `training-workshop` | 60 |
| `business-review` | 60 |

The universal 30-minute default from v1.0.0 is now type-specific. When a skill cannot infer meeting type (or infers `other` at low confidence), the 30-minute fallback applies but is flagged in the inference summary. This prevents kickoffs and working sessions from being silently under-sized.
- **`meeting-brief`**: `stakeholders` (list of objects with name, position), `primary_ask` (string)
- **`meeting-recap`**: `agenda_reconciliation` (object: `topics_planned`, `topics_hit`, `topics_skipped`, `topics_emerged`), `meeting_quality` (object: `outcomes_achieved`, `started_on_time`, `ended_on_time`, `key_attendees_present`), `meeting_type_source` (enum: `explicit | inferred | null`), `unassigned_action_ratio` (float 0.0 to 1.0, v1.1.0)
- **`meeting-synthesize`**: `source_meetings` (list of recap filenames), `time_range` (object: `start`, `end`), `scope_filter` (string); omits single-meeting fields (`meeting_title`, `meeting_date`, `meeting_start_time`, `attendees`, etc.)
- **`stakeholder-update`**: `channel` (enum), `audience_variant` (enum), `thread_continuation_of` (filename or null), `primary_cta` (string)

### 4. File naming convention

**Single-meeting artifacts** (agenda, brief, recap):

```
YYYY-MM-DD_HH-MMtimezone_title_artifact-type[_prepared-YYYY-MM-DD].md
```

**Stakeholder-update artifacts** (variant-aware, per v1.1.0):

```
YYYY-MM-DD_HH-MMtimezone_title_stakeholder-update-{channel}-{audience}[_prepared-YYYY-MM-DD].md
```

The variant suffix (`-{channel}-{audience}`) prevents filename collisions when one meeting produces multiple stakeholder-update artifacts tailored to different channels or audiences (e.g., a leadership email and an engineering slack update from the same meeting).

Where:

- `YYYY-MM-DD`. meeting date (not prep date)
- `HH-MMtimezone`. meeting start time with concatenated timezone abbreviation (e.g., `14-00EST`, `09-30PST`, `16-00UTC`). See DST note below.
- `title`. short slug of the meeting title (see slug normalization rules below)
- `artifact-type`. one of `agenda`, `brief`, `recap`, `stakeholder-update`
- `{channel}` (stakeholder-update only). `slack`, `teams`, `email`, `notion`, or `exec-memo`
- `{audience}` (stakeholder-update only). `engineering`, `design`, `leadership`, `customer-facing`, or `mixed`
- `_prepared-YYYY-MM-DD`. optional, only when prep date differs from meeting date

Examples:

```
2026-04-17_14-00EST_search-feature-kickoff_agenda.md
2026-04-17_14-00EST_search-feature-kickoff_brief.md
2026-04-17_14-00EST_search-feature-kickoff_recap_prepared-2026-04-18.md
2026-04-17_14-00EST_search-feature-kickoff_stakeholder-update-slack-engineering.md
2026-04-17_14-00EST_search-feature-kickoff_stakeholder-update-email-leadership.md
2026-04-17_14-00EST_search-feature-kickoff_stakeholder-update-notion-mixed.md
```

**Slug normalization rules** (v1.1.0):

- ASCII lowercase only; transliterate Unicode characters via the Python `unicodedata.normalize('NFKD', ...)` convention or equivalent
- Hyphen separators; strip all other punctuation
- Maximum length: 60 characters
- Collision handling: if two artifacts of the same type for the same meeting-date/time/title collide (e.g., two agendas for a same-titled meeting with the same start time in the same timezone), append `-2`, `-3`, etc. to disambiguate

**Timezone note (DST)** (v1.1.0):

Timezone abbreviations (`EST`, `PST`, `CST`, etc.) are DST-ambiguous: `EST` is actually `EDT` during US daylight saving time. The filename convention accepts abbreviations for user-friendliness (users know `EST` better than `-0400`), but:

- Within a single user's workflow, DST drift is low-risk (abbreviations are a reasonable approximation)
- For cross-region collaboration or precise cross-system identity, complement with an `IANA_timezone` frontmatter field (e.g., `IANA_timezone: America/New_York`) or use UTC offsets in filenames (`14-00-0400`)
- This contract does not enforce a specific timezone format; teams may adopt their own convention as long as it is consistent within their workflow

**Synthesis artifacts** (inherently multi-meeting):

```
YYYY-Qn_topic_synthesis[_prepared-YYYY-MM-DD].md          (quarter-based)
YYYY-MM-DD-to-YYYY-MM-DD_topic_synthesis[_prepared-YYYY-MM-DD].md   (explicit range)
```

Examples:

```
2026-Q1_search-feature_synthesis.md
2026-01-01-to-2026-03-31_search-feature_synthesis.md
```

**Why this format**:

- Meeting date + time creates a natural-sort key that groups a meeting's artifact family together. all four single-meeting types sort adjacently
- Time + timezone makes same-day meetings distinguishable without needing a separate ID
- Optional `_prepared-YYYY-MM-DD` suffix captures post-meeting artifacts written later without cluttering names that do not need it
- No separate `meeting_id` required; the filename is the identifier

### 5. Input quality flagging and confidence markers

Every skill must:

- **Assess input quality** at start and flag it in frontmatter: `high`, `medium`, or `low`
- **Surface confidence per section** where appropriate (e.g., a claim backed by 5 meetings is higher-confidence than one backed by a single offhand comment)
- **Explicitly note gaps** in the `Sources & References` section: "The following topics lacked sufficient detail to summarize: {X, Y}"
- **Never fabricate** attendees, decisions, or actions not supported by input

### 6. Anti-meeting check (pre-meeting skills only)

`meeting-agenda` and `meeting-brief` must begin with an anti-meeting check. an upfront prompt asking "does this need to be a meeting at all?" If the stated objective can be met async (written update, document review, decision via Slack poll, etc.), the skill recommends that instead and produces a brief async-alternative suggestion rather than a full meeting artifact.

This check runs before the go-mode inference summary. If the user overrides ("yes, it needs to be a meeting"), the skill proceeds.

`meeting-recap`, `meeting-synthesize`, and `stakeholder-update` do not run this check. they operate on meetings that have already happened or on meeting-series analysis, where the question is moot.

**Synchronous-value statement requirement** (v1.1.0):

The anti-meeting check passes only when the meeting has at least one named source of synchronous value:

- **Tradeoff to discuss**. multiple options exist with uncertain preference; real-time back-and-forth produces better decisions than async
- **Conflict to resolve**. visible disagreement between named stakeholders; sync resolution is faster than async ping-pong
- **Co-creation**. shared document-writing, whiteboarding, design critique; the artifact is produced in the meeting, not before or after
- **Relationship-building**. first-time stakeholder meetings; mutual calibration on working styles
- **Blocker escalation**. time-sensitive unblocking; async would miss the window

If none of these apply, the skill recommends the async alternative. Common anti-patterns (bypassed by earlier versions of this check):

- Status-only syncs where everyone reads the same update to each other. default to async document + threaded Q&A
- Round-robin check-ins with >5 attendees and no decision need. default to async survey or threaded Slack
- "Just an FYI" meetings. default to recorded Loom or async doc
- Agenda padding ("there might be discussion") without a specific tradeoff named

The check is intentionally stricter in v1.1.0 because it was bypassed in v1.0.0 by simply staying at five attendees or adding the word "decision" to the topic. The stricter check biases toward async; users can still override.

---

## Explicit non-goals

Things this family of skills will not do. Listed here to prevent scope creep in future iterations.

1. **Calendar integration**. skills produce documents, not calendar events. Users copy output into their calendar tool. If calendar MCP integration is desired later, it is a separate workflow, not skill scope.
2. **Live transcription**. skills consume transcripts, they do not produce them. Upstream tools (Krisp, Otter, Fireflies, Zoom) handle transcription.
3. **Meeting recording**. not a skill responsibility.
4. **Attendee authentication or identity resolution**. skills accept names as provided. Disambiguation of "Alex" vs. "Alex R." vs. "Alexandra" is the user's responsibility; skills flag ambiguity but do not resolve it.
5. **Synchronous collaboration**. these are async prep and post-processing skills. Real-time collaboration during meetings is out of scope.
6. **Slide generation**. if a stakeholder-update needs slides, the user chains to a separate slideshow skill. Meeting family skills produce markdown artifacts.

---

## Enforcement (CI)

The `scripts/validate-meeting-skills-family.sh` / `.ps1` validator runs against every PR touching files matching:

```
skills/foundation-meeting-*
skills/foundation-stakeholder-update/**
docs/reference/skill-families/meeting-skills-contract.md
```

### What the validator checks

1. **Skill directory structure**. each of the 5 skills has a `SKILL.md`, `references/TEMPLATE.md`, `references/EXAMPLE.md`
2. **Contract reference**. each `SKILL.md` contains a link to `docs/reference/skill-families/meeting-skills-contract.md`
3. **Zero-friction execution section**. each `SKILL.md` contains a section titled `Zero-friction execution` (or equivalent `Go mode`) that reaffirms the behavioral contract
4. **Template shareable summary / shareable update**. each `TEMPLATE.md` contains a `## Shareable summary` section, EXCEPT `stakeholder-update` which must contain a `## Shareable update` section instead (v1.1.0 explicit copy boundary; audit notes and sources sit outside the section and must not be shareable). Treating the entire stakeholder-update output as shareable. the v1.0.0 claim. is explicitly rejected.
5. **Template sources section**. each `TEMPLATE.md` contains a `## Sources & References` section with the four required subsections (Primary inputs, Referenced artifacts, External references, Generation context)
6. **Frontmatter schema shape**. each `TEMPLATE.md` frontmatter block includes the universal base fields (`artifact_type`, `version`, `generated_at`, `generated_by_skill`, `input_quality`, `confidence`, `visibility`, `status`)
7. **Enum values**. when frontmatter uses `meeting_type`, `attendee role`, `input_quality`, `confidence`, `artifact_type`, `channel`, `audience_variant`, `visibility`, or `status`, the value (if populated) is from the enum defined in this contract
8. **File naming in examples**. filenames referenced in `EXAMPLE.md` and sample output match the naming convention above

### What the validator does NOT check

- Field population (values may be null/absent. skills infer)
- Inference confidence thresholds
- Coverage of every enum value in examples
- Semantic correctness of content

Schema shape and contract conformance only. Content quality is reviewed manually.

### CI posture

**Enforcing from day one**. Violations fail the CI job and block merges. Rationale: all 5 skills are authored together against this contract; no retroactive cleanup phase. Advisory-first would only make sense if pre-existing violations needed gradual remediation.

---

## Versioning

This contract is versioned independently from the skills it governs.

- **Contract version** appears in the frontmatter of this document (currently `1.0.0`)
- **Individual skill versions** start at `1.0.0` on first ship and follow pm-skills' SemVer governance (see `docs/internal/skill-versioning.md`)
- **Contract bumps** follow SemVer:
  - PATCH: clarifications, typo fixes, non-breaking enum additions
  - MINOR: new optional fields, new enum members, new universal principles that are additive
  - MAJOR: breaking changes to frontmatter schema, enum removals, naming convention changes, removal of universal principles
- Contract MAJOR bumps require updating all 5 skills and a CHANGELOG entry in the repo-level changelog

When the contract version changes, the validator script must be updated to match, and a note added to the release plan that ships the change.

---

## See also

- Per-skill details in each `skills/foundation-meeting-*/SKILL.md`
- Release coordination: `docs/internal/release-plans/v2.11.0/plan_v2.11.0.md`
- Family authoring plan (internal): `docs/internal/efforts/meeting-skills-family/plan_family-contract.md`
- Skill versioning governance: `docs/internal/skill-versioning.md`

---

## Change log

| Date | Version | Change |
|------|---------|--------|
| 2026-04-17 | 1.0.0 | Initial contract. Absorbs content from archived `_NOTES/foundation-meeting-skills-descriptions.md` and `..._templates.md` (2026-04-17). Codifies 18 decisions from the authoring plan. |
| 2026-04-17 | 1.1.0 | Resolution pass from Codex adversarial review (see `docs/internal/release-plans/v2.11.0/plan_v2.11_codex-review.md`). Changes: (1) `artifact_type` enum corrected from bare names to prefixed names (matches implementation); (2) stakeholder-update filename pattern adds `-{channel}-{audience}` variant suffix to prevent collisions; (3) slug normalization rules added (ASCII, 60-char max, collision suffixes); (4) timezone DST note added; (5) load-bearing inference gates added (stakeholder positions, primary CTA, decision-maker attribution require `⚠` flag when confidence <high); (6) meeting-duration default is now type-specific (30 min is fallback, not universal); (7) anti-meeting check now requires a positive synchronous-value statement (prevents bypass by staying at 5 attendees); (8) recap adds `meeting_type_source` and `unassigned_action_ratio` frontmatter fields; (9) meeting-type enum expanded with `incident-postmortem`, `customer-call`, `training-workshop`, `business-review`; (10) stakeholder-update shareable boundary made explicit via `## Shareable update` section. No breaking changes. all v1.0.0 valid artifacts remain valid; new behavior is additive. |
| 2026-04-18 | 1.1.0 (errata) | Second Codex adversarial review resolution. Non-breaking clarifications: (a) corrected go-mode default-flow example duration to reflect type-specific table (was 30 min, now 45 min for decision-making); (b) corrected fully-specified example `--type=decision` to `--type=decision-making` matching the enum; (c) corrected `artifact_type` inline comment in universal base-fields example from old bare enum names to prefixed names; (d) corrected validator-what-it-checks section to require `## Shareable update` for stakeholder-update instead of treating whole output as shareable; (e) added explicit end-marker convention for stakeholder-update shareable boundary. No version bump. these are errata within v1.1.0, caught by adversarial review before v2.11.0 release tag. |
