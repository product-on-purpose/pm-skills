# Multi-Model Review Cycle — Skill Overview

> **Date**: 2026-03-22
> **Purpose**: Capture the review cycle pattern discovered during pm-skills distilled document work, as the basis for a future personal-library skill
> **Target**: Personal Claude Code skill (not pm-skills repo)

---

## The Problem This Skill Solves

When AI agents produce planning documents, strategic briefs, or any multi-file document set, three problems reliably occur:

1. **Temporal drift** — Documents written at different points in a conversation reflect different states of understanding. Later decisions invalidate earlier documents, but the earlier documents aren't updated. A reader encounters contradictory guidance depending on which file they read first.

2. **Self-review blindness** — The agent that wrote the documents can check them for internal consistency but struggles to verify claims against external reality (the actual codebase, existing CI, real file paths). Writing and verification are different cognitive modes; doing both in a single pass produces confident-sounding documents with factual errors.

3. **Round-trip friction** — Getting a second opinion (from a different model, a human reviewer, or the same model in a fresh session) requires manually extracting context, explaining what to review, collecting the response, and deciding what to act on. Each handoff loses information.

### How This Played Out in Practice

During the pm-skills strategic planning work (March 2026):

- Claude Opus wrote 4 distilled planning documents in a single session
- A scope-altering decision happened mid-session (Knowledge OS separation)
- Documents 01-03 were written before the decision; document 04 was written after
- Result: the folder contained both the old thesis and the new thesis without declaring which was canonical

**First review (Codex)**: Correctly identified the supersession problem and naming instability. Missed: no audit of 04 itself, no evaluation of strategic substance, no ground-truth verification against the codebase.

**Self-review (Claude Opus, higher reasoning)**: Caught 4 internal contradictions (confirmed/confirmed?, removed-but-present, duplicate items, bad arithmetic) AND the biggest factual error — the CI pipeline was described as greenfield when `lint-skills-frontmatter.sh` already covered ~70% of the proposed work. This was only found by reading the actual `scripts/` directory, not by cross-referencing documents.

**Key insight**: The self-review succeeded specifically because it switched from *editing mode* (are the documents consistent with each other?) to *verification mode* (are the claims in these documents true?). The first-pass writing never did that switch.

---

## The Value of a Multi-Model Review Cycle

### Why multiple models?

Different models catch different things:

| Reviewer | Strengths | Blind spots |
|----------|-----------|-------------|
| Author (same model, same session) | Knows intent, can fix immediately | Can't see own assumptions; writing momentum discourages stopping to verify |
| Author (same model, higher reasoning) | Can switch to verification mode, check claims against codebase | Still shares the same knowledge and framing biases |
| Different model (Codex, GPT, etc.) | Fresh perspective, no shared assumptions, different analytical style | Lacks conversation context, may not know the codebase |
| Human reviewer | Domain expertise, strategic judgment, "does this actually matter?" | Time-constrained, may not read every line |

The pattern that emerged: **Author writes → Author self-reviews with ground-truthing → Different model reviews for consistency and structure → Author responds to review → Human makes final calls.**

### What the cycle produces

Beyond catching errors, the cycle produces:
- **A decision audit trail** — each round's findings are documented, not just the final state
- **Explicit disagreements** — when reviewers disagree, the disagreement itself is informative
- **Confidence calibration** — if all three reviewers agree, confidence is high; if they diverge, the point needs human judgment

---

## The Review Cycle Structure

### Three-part round-trip document

The core artifact is a single file with three clearly marked zones:

```markdown
# Review Cycle: [Document Set Name]

## Part 1: Review Request (Author → Reviewer)
- Background context (what the reviewer needs to know)
- Files to review (with roles and change summaries)
- Guided review goals (specific things to check)
- Open-ended prompt ("what did we miss?")
- Ground truth references (verifiable facts)

## Part 2: Reviewer Response
- Structured findings per review goal
- Anything the prompt didn't anticipate
- Overall verdict

## Part 3: Author Response to Review
- Agreements and actions taken
- Disagreements with reasoning
- Remaining open items
```

### Why one file, not three?

- **Context preservation** — the reviewer sees exactly what the author asked, and the author sees exactly what the reviewer found, without cross-referencing separate files
- **Handoff clarity** — it's obvious what state the cycle is in (which part is filled in)
- **Archivability** — the complete cycle is one artifact, not a scattered thread

### Review goals: guided + open-ended

The review request should include both:
- **Guided checks**: specific things to verify (contradictions, consistency, factual claims)
- **Open-ended prompt**: "After the guided checks, what problems exist that this prompt didn't anticipate?"

The guided checks prevent the reviewer from missing known issues. The open-ended prompt prevents anchoring bias — the reviewer shouldn't only confirm what the author already suspects.

### Ground truth references

Include a table of verifiable facts. This is the single most important addition to a review prompt. Without it, the review is document-to-document (are the files consistent with each other?). With it, the review is document-to-reality (are the claims true?).

```markdown
| Claim in docs | Actual state (verified [date]) |
|---------------|-------------------------------|
| "25 skills"   | 25 directories in `skills/`   |
| "No CI exists" | Wrong — validation.yml runs on every PR |
```

---

## Skill Design Notes

### When to trigger

The skill should trigger when:
- A document set (2+ files) has been created or substantially revised
- The user says "review", "check these", "get a second opinion", or "review cycle"
- A planning or strategy document has been written and needs validation before execution

### Inputs

- The document set to review (file paths or glob pattern)
- Who the reviewer will be (Codex, different Claude session, human, self)
- Optional: ground truth sources to check against (codebase paths, URLs, prior documents)

### Outputs

A review cycle file with Part 1 pre-filled:
- Background context extracted from the documents
- File inventory with roles
- Auto-generated review goals based on document type:
  - Planning docs → check feasibility, dependencies, effort estimates, existing work overlap
  - Strategic docs → check internal consistency, scope alignment, decision completeness
  - Reference docs → check prioritization, staleness, audience fit
- Ground truth table populated by scanning the codebase for claims made in the documents
- Open-ended prompt included by default

### Key behaviors

1. **Ground-truth scanning** — Before generating the review request, the skill should read the actual codebase/repo to identify claims that can be verified. This is the step that human-written review requests almost always skip.

2. **Self-review mode** — If the reviewer is "self" (same session), the skill should explicitly prompt for verification mode: "Now re-read each document and check every factual claim against the codebase. Do not assume the documents are correct."

3. **Anchoring mitigation** — The skill should always include the open-ended "what did we miss?" goal, and should warn the reviewer about anchoring: "The guided checks identify known concerns. Your most valuable contribution is finding problems the author didn't anticipate."

4. **Round-trip management** — After the reviewer completes Part 2, the skill should prompt the author to write Part 3, specifically asking: "For each finding, state: agree (and what action you'll take), disagree (and why), or defer (needs human decision)."

### What the skill is NOT

- Not a code review tool (use existing code review skills/agents for that)
- Not a copy editor (it reviews documents for structural and factual integrity, not prose quality)
- Not a replacement for human judgment on strategic decisions (it surfaces issues; humans decide)

---

## Lessons from the pm-skills Experience

### What worked
- The three-part round-trip structure kept everything in one place
- Ground truth references caught the biggest error (CI already exists)
- The open-ended "what did we miss?" prompt is worth including even when you think the guided checks are exhaustive
- Archiving superseded files immediately prevents confusion

### What didn't work
- The first prompt flagged issues that were already known but unfixed — it's better to fix first, then ask the reviewer to verify the fix
- The self-review section was appended to the review prompt, making the prompt very long — it should be a separate document or a clearly skippable section
- Multiple review rounds without fixing the underlying documents creates diminishing returns — each round should produce changes, not just more commentary

### Rules of thumb
- **Fix before you ask** — don't send known errors to a reviewer; fix them and ask the reviewer to verify the fix
- **One cycle, then act** — two review rounds maximum before making changes; after that you're polishing documents instead of shipping
- **Ground truth beats cross-referencing** — checking documents against each other finds consistency issues; checking documents against reality finds factual errors; the latter is more valuable
- **The open-ended question is the most important question** — guided checks confirm what you suspect; the open-ended question finds what you don't
