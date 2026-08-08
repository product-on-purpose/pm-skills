# Spec delta: the memory file as orchestrator artifact ledger

**Status:** RATIFIED 2026-08-07 (WS-1 of the v2.32.0 cycle). Write posture, cohort, and resume posture
were ruled by the maintainer; the four residual questions in section 9 are adopted as
**defaults of record**, overridable by the maintainer at any point before B1 lands. Nothing here is
open in a way that blocks WS-2.
**Revised 2026-08-07 after adversarial review** (Codex companion plus a 3-lens internal panel, which
independently agreed on the largest finding). Three high findings were fixed before commit: the run
schema conflated two orthogonal orchestrator enums and invented a value; the hash was timed after the
confirmation pause and could certify edited content as generated; and monotonic IDs were unsafe under
the write model the parked spec already documents. See sections 4, 5, and 7.
**Extends:** [`spec_project-memory.md`](spec_project-memory.md). That document remains authoritative for
everything it already covers. This file states ONLY what issue [#223](https://github.com/product-on-purpose/pm-skills/issues/223)
(memory artifact ledger) adds on top of it, per the standing staging rule: extend, never re-author.
**Source of the additions:** issue #223 asks the memory file to "double as the orchestrator artifact
ledger," recording "execution state, artifact hashes, and provenance chains across skill invocations."
**Created:** 2026-08-07

---

## 1. What does NOT change

Stated first so the delta cannot be read as a rewrite.

- The file, its location, and its gitignored status: `.claude/pm-skills.local.md`.
- **The opt-in posture, which stays load-bearing.** No file means today's behavior, exactly. The ledger
  additions are inert alongside everything else when the file is absent.
- The agent-does-the-IO contract. Skills carry a `## Project Memory Contract` section; there is no
  runtime. The ledger is recorded by the same mechanism, not by new code.
- The four provenance tags (observation, interpretation, hypothesis, decision) and their meanings.
- `phase`, `active_initiative`, `updated`, the `## Notes` section, and the `## Decisions` section.
- The no-MCP, no-database decision.

## 2. Write posture: parked D2 is now RULED, and the ruling overrides the parked recommendation

The parked spec leaves this open and recommends auto-append:

> **D2 - write directly vs propose-then-confirm.** [...] Recommendation: auto-append when memory is on,
> but echo what was written. Open.

**That recommendation is superseded.** The maintainer ruled D3 = C on 2026-08-02 in the v2.32.0 plan:
**propose-then-confirm by default, with an opt-in auto mode enabled through `.claude/pm-skills.local.md`**,
matching the hook opt-in shape already used by the shipped guardrails.

This is called out at the top of the delta because it is the one place where building to the parked
document would produce the wrong behavior. Concretely:

- Default: the agent shows the proposed ledger entry and waits for confirmation before writing.
- Opt-in: a flag in the state file, `memory_auto_append: true`, switches to auto-append with an echo
  of what was written. **Flat key, corrected during the WS-2 build.** This spec first proposed the
  nested `memory.auto_append`, which the shipped reader cannot parse: `hooks/lib/frontmatter.mjs`
  states in its own header that it is "NOT a YAML parser" because an installed plugin's hooks have no
  `node_modules` and therefore cannot import js-yaml. It reads flat scalars and inline arrays only.
  The flat form is also consistent with the keys already in that file (`phase_router`, `guardrails`,
  `guardrail_checks`) and still avoids collision by prefix.
- The posture applies to every write in this delta, including ledger run records.

## 3. Schema version: stays `schema: 1`

The parked spec proposes `schema: 1` and B1 has not shipped, so there is no installed base to migrate.
Fold these additions into `schema: 1` as first shipped rather than shipping 1 and immediately
superseding it. Every field below is optional except `artifacts[].id`, so a hand-written minimal file
stays valid.

## 4. Addition one: stable artifact IDs

**Why this comes first:** provenance chains need something to point at, and the parked `artifacts[]`
entry has no identifier. Nothing else in this delta works without it.

Add one required field to each `artifacts[]` entry:

```yaml
artifacts:
  - id: a-20260807-3f9a           # NEW, required. Stable, never reused, collision-resistant.
    skill: discover-interview-synthesis
    title: "Onboarding interviews synthesis"
    path: docs/research/onboarding-synthesis.md
    produced: 2026-08-07
    provenance: interpretation
    summary: "5 interviews; 3 personas emerged"
```

**IDs must be collision-resistant, not monotonic.** A plain `a-NNNN` counter is unsafe under the write
model the parked spec already documents: it acknowledges that "parallel sessions could stale-overwrite"
a read-modify-write on one local file. Two sessions reading the same file both pick the same next
number, and after the stale write one entry is lost while any `derived_from` edge pointing at that ID
silently resolves to the wrong artifact. A lost entry is recoverable noise; a chain edge that resolves
to the wrong thing is corrupted provenance, which is worse than no provenance.

The parked spec accepted the stale-overwrite risk when entries were independent. This delta makes
entries referential, so the risk changes character and the mitigation has to change with it.

**Required form:** a date prefix plus a random suffix, `a-YYYYMMDD-xxxx`, which stays readable in a
file a human will open while making same-instant collisions improbable. A ULID or UUID is acceptable
if a builder prefers it; a bare sequential counter is not.

**Required write discipline (optimistic concurrency).** Re-read the file immediately before writing,
detect whether it changed since the read that produced the proposal, and merge the new entry against
current state. **Never write back a whole-file snapshot captured before the proposal was shown.** Under
the ruled propose-then-confirm posture there is an arbitrarily long human pause between read and write,
which makes this the normal case rather than an edge case.

## 5. Addition two: artifact hashes

Add one optional field:

```yaml
    hash: sha256:3f9a1c…          # NEW, optional. Digest AT PRODUCTION. Present only when `path` is.
    hash_at_confirm: sha256:88de2b…   # NEW, optional. Recorded ONLY when it differs from `hash`.
```

**Semantics.** `hash` is the digest of the artifact file **at the moment the skill produced it**, taken
before the confirmation prompt is shown. It answers exactly one question: has this artifact been edited
since the skill produced it?

**Timing is load-bearing, and the naive version is wrong.** Under the ruled propose-then-confirm
posture there is an arbitrarily long human pause between production and the write. Hashing at confirm
time would digest whatever the file contains *after* that pause, so a user who edits the artifact while
reviewing the proposal gets their edited content recorded as the generated version. Every later reader
would then see a matching hash and conclude the artifact is untouched, which is precisely backwards,
and could drive an unsafe regeneration or overwrite offer.

**Therefore:** compute at production, recompute at confirmation, and on mismatch record BOTH digests
plus surface the drift in the confirmation prompt rather than writing silently. When the two match,
omit `hash_at_confirm` entirely; its presence is itself the drift signal.

**Why it is optional and conditional.** The parked schema already makes `path` optional, because many
artifacts never land in a file. An entry with no path has nothing to hash. Do not invent a hash over
the summary text; an absent hash is honest and a synthetic one is not.

**What it deliberately does not do.** It is not integrity protection and not a tamper check. The file
is local, gitignored, and user-owned. The hash exists so a later reader can distinguish "as generated"
from "since edited," which changes whether regeneration is a safe offer.

**Known staleness, stated so no reader over-trusts it.** Both digests are point-in-time. If the user
edits the artifact after the entry is written, every recorded hash is stale until something rescans. A
matching hash means "unchanged as of the last recorded check," never "unchanged now." Say this in the
contract text.

**Alignment, not dependency.** This is the field the parked innovation brief
[`X-03 (artifact provenance and the upgrade loop)`](../fable-innovations/X-03-artifact-provenance-upgrade.md)
would consume: its `generated-by: <skill>@<version>` stamp says what made an artifact, and this hash
says whether it still is what was made. X-03's own REQ-6 makes memory an enhancement rather than a
prerequisite, so the dependency runs one way only and neither blocks the other.

## 6. Addition three: provenance chains

The parked spec gives each artifact a provenance **tag**. Issue #223 asks for provenance **chains**:
the record that artifact B was derived from artifact A.

Add one optional field:

```yaml
    derived_from: [a-20260807-3f9a, a-20260805-c210]   # NEW, optional. IDs of entries consumed.
```

**What it buys.** It makes the cohort's demonstration claim auditable. The parked spec's stated proof
of "real coupling" is that `discover-interview-synthesis` writes the personas and `deliver-prd` later
reads them without asking the user to paste them. Today that read leaves no trace. With
`derived_from`, the PRD entry records which synthesis entry it consumed, so the loop is visible in the
file rather than asserted in a plan.

**Second-order value, and the reason the tags become more useful.** A future critic can now walk the
chain and flag a `decision` artifact whose ancestry contains only `hypothesis` entries. The parked
spec anticipates exactly this ("lets a future critic flag when a decision rests only on hypotheses")
but the flat tag cannot support it, because there is no ancestry to walk. The chain is what makes that
promise executable.

**Constraints.** Edges point backward only, to entries that already exist in the file. Cycles are
invalid. A missing target is a dangling edge and should be reported, not silently dropped.

## 7. Addition four: orchestrator execution state

The `utility-pm-workflow-orchestrator` sub-agent currently carries, per its own contract, "the ordered
step list plus, per completed step, an artifact reference and a one-line summary," and that state is
in-memory only.

Add a top-level optional `runs[]` block:

```yaml
runs:
  - id: r-0003
    chain: [discover-interview-synthesis, deliver-prd]
    mode: B                        # A (independent prompts) or B (user-ordered chain)
    threaded: true                 # whether --thread was requested
    started: 2026-08-07
    steps:
      - n: 1
        skill: discover-interview-synthesis
        result: PRODUCED           # PRODUCED | EMPTY | FAILED | SKIPPED-MANUAL
        step_status: OK            # OK | STOP | WAITING-FOR-CONFIRMATION
        artifact: a-20260807-3f9a  # id into artifacts[], or null
      - n: 2
        skill: deliver-prd
        result: PRODUCED
        step_status: OK
        artifact: a-20260807-b17c
```

**Two fields, not one, because the orchestrator has two.** `agents/pm-workflow-orchestrator.md:76`
emits `**Result:** PRODUCED / EMPTY / FAILED / SKIPPED-MANUAL` and line 79 separately emits
`**Step status:** OK / STOP / WAITING-FOR-CONFIRMATION`. They are orthogonal: an `EMPTY` result can
carry a `WAITING-FOR-CONFIRMATION` step status (a forced checkpoint pause in GUARDED AUTO) or an `OK`
step status (a normal checkpoint prompt in CHECKPOINTED), and the rubric at lines 86-94 is normative.
Collapsing them into one field has no lossless mapping and would lose exactly the states that matter
for diagnosing a halted run.

**There is no `REFUSED` value.** A refusal is classified `FAILED` by the orchestrator's own rubric
(line 90: "the delegated call errored or refused at the tool/runtime layer"), and the refusal narrative
lives in the free-text summary line, not in an enum. The ledger follows that mapping rather than
inventing a value.

**Acceptance obligation.** Fixtures must cover every value of both enums, including the
`EMPTY` + `WAITING-FOR-CONFIRMATION` combination, so the validator cannot pass while silently
rejecting a real orchestrator outcome.

### 7a. The resume question, flagged deliberately rather than answered

The orchestrator ships an explicit YAGNI cut: re-invoking **restarts the run from step 1**, and its
halt output says so plainly, with a standing instruction not to advertise an auto-resume the loop
cannot perform.

Recording execution state is precisely the substrate a resume would need. That makes it a foreseeable
next step, and it also makes it a way to accidentally break a shipped honesty commitment.

**This delta therefore records execution state and promises nothing about resume.** The orchestrator's
halt text must not change in this cycle.

**RULED 2026-08-07 (WS-1):** record execution state, stay silent on resume. The unchanged halt text is
an acceptance item below, so the commitment is checked rather than assumed. Whether `runs[]` is later
used to offer resume is a separate decision needing its own trigger.

## 8. Acceptance additions

Extending, not replacing, the parked spec's acceptance list:

- [ ] Every `artifacts[]` entry carries a unique, stable, collision-resistant `id`; no bare counters.
- [ ] Writes re-read and merge against current state; no stale whole-file snapshot is ever written back.
- [ ] `hash` is present whenever `path` is, and absent whenever `path` is not.
- [ ] `hash` is taken at production; `hash_at_confirm` appears if and only if the two differ, and drift
      is surfaced in the confirmation prompt rather than written silently.
- [ ] `derived_from` edges resolve to existing entries; dangling edges are reported.
- [ ] `runs[]` steps carry BOTH `result` and `step_status`, each drawn only from its own orchestrator
      enum, with fixtures covering every value of both, including `EMPTY` + `WAITING-FOR-CONFIRMATION`.
- [ ] Every write follows propose-then-confirm unless auto mode is explicitly enabled.
- [ ] The orchestrator's no-resume halt text is unchanged by this cycle.
- [ ] The advisory declaration validator checks the extended entry shape structurally, not behaviorally.

## 9. Residual questions: defaults of record

All four are settled for build purposes. None blocks WS-2. Each is overridable by the maintainer at any
point before B1 lands; none would cause rework beyond a find-and-replace if overridden.

1. **Resume posture. RULED 2026-08-07:** record execution state, stay silent on resume. See 7a.
2. **Hash algorithm and prefix. DEFAULT: `sha256:`,** algorithm named inline for legibility. Naming it
   is safe here because the digest is a drift signal, not a security control, and an explicit prefix
   makes a future algorithm change a readable migration rather than a silent reinterpretation.
3. **Run retention. DEFAULT: keep the last 10 runs, documented rather than enforced.** The file is
   hand-editable and human-read; an unbounded run log would swamp the sections a human actually opens
   it for. Documented-not-enforced matches the parked spec's posture on `artifacts[]` ordering.
4. **Auto-mode key name. DEFAULT: `memory.auto_append: true`.** Namespaced under `memory.` so it cannot
   collide with the guardrail and router keys sharing this file. Confirm against the live key set when
   B1 is built, since that is the first moment all three consumers exist together.
