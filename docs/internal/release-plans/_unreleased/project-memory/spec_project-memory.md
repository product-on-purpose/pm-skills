# Spec: project memory + memory-aware cohort (B1/B2, v2.29.0) - DRAFT for review

Companion to [`plan_v2.29.0.md`](plan_v2.29.0.md). Defines the `.claude/pm-skills.local.md` state file (B1), the read/write contract mechanism and provenance model, the first cohort (B2), and the open design questions. DRAFT: everything here is proposed, not locked. (Renumbered from v2.28.0 on 2026-06-19; see the plan's renumber note.)

## B1 - the state file

**Location:** `.claude/pm-skills.local.md`, gitignored. Reuses the documented `.claude/<plugin>.local.md` pattern already used for the F-43 guardrails and F-44 router config, so there is one local-config surface, not three.

**Opt-in posture (load-bearing).** The memory layer is inert unless the file exists (or a `memory: true` flag is set), exactly like F-43/F-44. No file -> skills behave exactly as today, the router stays silent. This preserves the "confident-only / opt-in" trust posture and means this release changes nothing for users who do not opt in.

**Proposed schema (`schema: 1`):**

```yaml
---
# pm-skills project memory (gitignored). Read by the SessionStart router (F-44)
# and by memory-aware skills (B2). Append-only in spirit; newest artifacts first.
schema: 1
phase: discover            # discover|define|develop|deliver|measure|iterate, or null
active_initiative: "Self-serve onboarding"   # one line; null if unset
updated: 2026-06-17
artifacts:
  - skill: discover-interview-synthesis
    title: "Onboarding interviews synthesis"
    path: docs/research/onboarding-synthesis.md   # optional, if it landed in a file
    produced: 2026-06-17
    provenance: interpretation                    # see provenance model
    summary: "5 interviews; 3 personas emerged (new-admin, power-user, evaluator)"
---

## Notes
Freeform context the agent may append (constraints, open threads).

## Decisions
Durable choices, each tagged with date + the skill/owner that recorded it.
```

`phase` + `active_initiative` are what the SessionStart router reads to route confidently (today it must infer phase from branch/artifact heuristics; with B1 it can read it). `artifacts[]` is the compounding substrate B2 reads.

## The contract mechanism (how a markdown skill "reads/writes" state)

Skills are `SKILL.md` instructions the agent follows; they execute no code. So a "read/write contract" is a documented convention the agent carries out via Read/Edit:

1. **A `## Project Memory Contract` section** in each cohort SKILL.md states, explicitly: *if `.claude/pm-skills.local.md` exists*, read `phase`, `active_initiative`, and the `artifacts[]` this skill consumes, and use them instead of asking the user to re-supply context; after producing the artifact, append a new `artifacts[]` entry (and any `## Decisions`) with a provenance tag.
2. **The agent does the file I/O**, not the skill. The instruction is the contract; there is no runtime to enforce it beyond the agent following SKILL.md (the same trust model as every other skill instruction).
3. **A lightweight validator** (advisory first, per the M-30 ladder) can check the *declaration* is present and well-formed in each cohort skill (a `## Project Memory Contract` section naming what it reads/writes) - structural, not behavioral. This is the enforceable half.

This is deliberately not an MCP server or a database: the roadmap's pm-skills-mcp maintenance-mode decision stands, and the file-based approach is the cheap, portable, cross-client form.

## Provenance model

Every recorded artifact/decision carries one tag (PM Brain's tagging idea, executed inside the contract):

| Tag | Meaning | Example |
|---|---|---|
| observation | Raw, sourced data | an interview quote, a measured metric |
| interpretation | A pattern read from observations | "3 personas emerged" |
| hypothesis | A testable claim | "new-admins churn at setup step 3" |
| decision | A committed choice | "ship guided onboarding for new-admins first" |

The tag lets a downstream skill weight what it reads (a decision is firmer than a hypothesis) and lets a future critic (F-46) flag when a decision rests only on hypotheses.

## B2 - the first cohort and its read/write map (proposed)

| Skill | Reads | Writes |
|---|---|---|
| `discover-interview-synthesis` | phase, active_initiative | personas/findings as observation + interpretation artifacts |
| `deliver-prd` | active_initiative, personas/findings artifacts | the PRD as a decision artifact |
| `foundation-okr-writer` | active_initiative, phase | the OKR set as a decision artifact |
| `iterate-retrospective` | recent artifacts[] (what was produced this cycle) | lessons as interpretation artifacts |
| `foundation-meeting-*` family | prior artifacts for context | recap + decisions |

The loop that demonstrates "real coupling": `discover-interview-synthesis` writes the personas; later `deliver-prd` reads them and does not ask you to paste them. Cohort membership is **Decision D3** (open): `discover-interview-synthesis` is included here as the canonical writer feeding the PRD reader, beyond the roadmap's literal four; trim or extend on review.

**Possible ride-along:** the v2.28.0 `foundation-stakeholder-briefings` skill is a natural future cohort member (it reads the master/artifacts and writes nothing durable, or writes the briefing set as a `decision`-adjacent artifact). Not in the B2 first cohort; noted so the schema does not preclude it.

## Open questions

- **D2 - write directly vs propose-then-confirm.** Auto-append (smoother; the file is local + gitignored + low-stakes) vs surface the proposed write for confirmation (safer, more friction). Recommendation: auto-append when memory is on, but echo what was written. Open.
- **Clobber / concurrency.** Read-modify-write on one local file; parallel sessions could stale-overwrite. Low risk for single-user; document "newest-first append, do not rewrite history" and revisit if it bites.
- **Schema stability + validator scope.** Ship `schema: 1` + an advisory declaration check now; a full state-file schema validator is a later enhancement, not this release.
- **Interaction with future items.** F-46 auto-critic could read provenance to flag thin decisions; F-49 dynamic context could inject state. Out of scope here; the schema should not preclude them.

## Acceptance (proposed)

- [ ] `.claude/pm-skills.local.md` `schema: 1` documented; opt-in (absent file = today's behavior).
- [ ] SessionStart router (F-44) reads `phase`/`active_initiative` when present.
- [ ] The cohort skills each carry a `## Project Memory Contract` section + the read/write behavior; HISTORY rows added; edits are structural (per Decision D1), no prose bloat.
- [ ] Advisory declaration validator green; provenance tags used in every written entry.
- [ ] utility-pm-critic fixtures + relabel + live B-3 re-run done (rides this cycle; see plan).
