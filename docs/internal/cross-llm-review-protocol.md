# Cross-LLM Review Protocol — Current State & Design Notes

**Status:** Reference document (informing future `cross-llm-review` skill)
**Created:** 2026-04-06
**Context:** Observations from M-19 implementation review comparing the manual review protocol against automated `/codex:rescue` dispatch

---

## The Manual Protocol (current best practice)

The repo has a proven cross-LLM review process used for plan reviews. Examples:

- `docs/internal/release-plans/v2.9.0/plan_v2.9.0_reviewed-by-codex.md`
- `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows_reviewed-by-codex.md`

### Three-Party Structure

```
Claude (Requestor)  → writes structured prompt with adversarial mandate
                    → provides source document inventory with file paths and roles
                    → sends to Codex for independent review

Codex (Reviewer)    → reviews with explicit "find problems" orientation
                    → outputs findings in Blocker/Major/Minor/Note format
                    → cites specific evidence (section numbers, quotes, file paths)

Claude (Requestor)  → analyzes Codex findings, proposes actions
                    → classifies: agree / reclassify / disagree (with reasoning)
                    → escalates unresolved decisions to human

jprisant (Human)    → makes judgment calls on escalated items
                    → approves or modifies proposed actions
```

### Key Prompt Elements

The manual process includes structured reviewer instructions that produce significantly better output:

1. **Adversarial mandate**: "Your job is to find problems, inconsistencies, gaps, and risks. You are not here to validate — you are here to pressure-test."
2. **Anti-validation heuristic**: "If you find nothing wrong in a section, say so explicitly and explain WHY. If you find nothing wrong anywhere, that's suspicious — look harder."
3. **Confidence calibration**: "Rate your confidence — low-confidence concerns are still worth noting."
4. **Evidence requirement**: "Cite specific evidence for every finding (section numbers, quotes, file paths)."
5. **Source document inventory**: Table of all relevant documents with paths and roles.
6. **Severity definitions**: Blocker / Major / Minor / Note with clear criteria.
7. **Finding format template**: `[Severity | Confidence] Description with evidence. Source says "X" (Section N) but also says "Y" (Section M). → Recommendation.`

### Requestor Analysis Layer

After receiving Codex findings, Claude performs a synthesis step:

- Agrees or disagrees with each finding (with reasoning)
- Proposes concrete actions for each
- Identifies items requiring human judgment
- Produces a "Decisions for jprisant" table with context

This layer is critical — it prevents raw reviewer output from being acted on without triage.

---

## The Automated `/codex:rescue` Approach (what was tried)

During M-19 implementation review, the `codex:rescue` skill was used to dispatch a code review to Codex via the `codex-companion.mjs` bridge.

### What Worked

- Codex got **direct filesystem access** to the repo (read files, search, list directories)
- No need to paste document content — Codex navigated the repo itself
- Ran in the background while other work continued
- Codex was thorough: 80+ tool calls, read dozens of files, searched for stale references

### What Didn't Work Well

- **No structured prompt framework** — the review checklist was ad-hoc, not adversarial
- **No analysis layer** — output would have been passed through verbatim without triage
- **No severity framework** — findings would be unstructured
- **Shell sandbox issues on Windows** — Codex couldn't run `git diff`, `grep`, `mkdocs build`, etc., and fell back to pure file-reading (slower, less comprehensive)
- **No durable artifact** — review output goes to a temp file, not a structured document
- **Slow** — the file-by-file approach took much longer than a focused plan review

### Comparison Table

| Dimension | Manual Protocol | `/codex:rescue` |
|-----------|----------------|-----------------|
| **Prompt quality** | Structured adversarial mandate, severity defs, source inventory | Ad-hoc checklist |
| **Review target** | Plans (pre-implementation) | Implementation (post-implementation) |
| **Analysis layer** | Claude triages, recommends, escalates | Raw passthrough |
| **Human escalation** | Explicit decision table | None |
| **Artifact quality** | Structured 3-section document | Unstructured output |
| **Evidence standard** | Cited sections, quotes, file paths | Varies |
| **Repo access** | Full doc content provided inline | Direct filesystem (but no shell) |
| **Speed** | Fast (focused on provided content) | Slow (navigates entire repo) |
| **Reproducibility** | High (structured prompt = consistent output) | Low (ad-hoc prompt) |

---

## Design Implications for `cross-llm-review` Skill

A future skill should combine the best of both approaches:

### Must-Have (from manual protocol)

1. **Structured adversarial prompt** — the reviewer instructions from the manual protocol are battle-tested and produce better output than generic "review this" prompts
2. **Three-party flow** — Requestor (Claude) → Reviewer (Codex) → Requestor Analysis → Human decisions
3. **Severity framework** — Blocker / Major / Minor / Note with clear definitions baked into the skill
4. **Evidence requirement** — every finding must cite specific file paths, line numbers, or quotes
5. **Finding format template** — standardized format so findings are scannable and actionable
6. **Requestor analysis step** — Claude must triage before presenting to user; no raw passthrough
7. **Durable artifact** — save review document to repo (convention: `{plan}_reviewed-by-codex.md`)

### Should-Have (from automated approach)

1. **Direct repo access** — reviewer should be able to read files, not just receive pasted content
2. **Background execution** — review runs while other work continues
3. **Scope flexibility** — support both plan reviews (pre-implementation) and code reviews (post-implementation)
4. **Diff-aware** — for implementation reviews, provide `git diff` output or changed file list

### Could-Have (stretch goals)

1. **Model-agnostic** — support different reviewer models (Codex, Gemini, etc.)
2. **Review chaining** — multiple reviewers in sequence, each seeing prior findings
3. **Historical context** — link to prior reviews of the same plan/effort
4. **Automated verification** — reviewer can request specific checks (run tests, build, grep)

### What to Avoid

1. **Raw passthrough** — never show reviewer output without requestor analysis
2. **Unstructured prompts** — always use the adversarial framework, even for "quick" reviews
3. **Skipping the human layer** — always escalate ambiguous findings for human judgment
4. **Over-scoping** — the reviewer should review a specific artifact, not "the whole repo"

---

## References

- Manual review examples:
  - `docs/internal/release-plans/v2.9.0/plan_v2.9.0_reviewed-by-codex.md`
  - `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows_reviewed-by-codex.md`
- Codex plugin: `openai-codex` marketplace plugin with `codex-companion.mjs` bridge
- Related skill (in progress): `cross-llm-review` — will formalize this protocol as a reusable skill
