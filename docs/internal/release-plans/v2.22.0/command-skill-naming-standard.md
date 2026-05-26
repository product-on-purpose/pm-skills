# Command/Skill Naming Standard

> Durable normative artifact. Drafted 2026-05-25 for v2.22.0 (naming standardization).
> This document is the authority on how pm-skills names and exposes capabilities across runtimes.
> It supersedes the gitignored 2026-05-25 working note that first surfaced the `/`-menu duplication.
> **Standard LOCKED 2026-05-25: Rule-set A (short flat names, drop the command wrapper layer).**

## 1. Problem this standard resolves

In Claude Code's `/` menu, every pm-skills capability appears twice: a short command wrapper (`/okr-writer`) and the skill it wraps (`/foundation-okr-writer`). There are **no duplicate skills**. Each of 63 skills is fronted by a thin command wrapper, and the library uses two inconsistent naming schemes for those wrappers. The inconsistency, not the doubling, is the defect.

### Verified facts (live repo, 2026-05-25)

- **73 commands, 63 skills, 10 workflows** (`ls commands/*.md`, `ls -d skills/*/`, `ls commands/workflow-*.md`).
- Skills are **always** phase/category-prefixed: `define-`, `deliver-`, `develop-`, `discover-`, `foundation-`, `iterate-`, `measure-`, `utility-`, `tool-`.
- Commands fall into three buckets:

| Bucket | Count | Command name | Skill name | Menu appearance |
|---|---|---|---|---|
| A. `tool-*` family | 15 | `tool-note-and-vote` | `tool-note-and-vote` | Two entries, **same name** |
| B. everything else | 48 | `okr-writer` (short) | `foundation-okr-writer` (prefixed) | Two entries, **different names** |
| C. workflows | 10 | `workflow-feature-kickoff` | *(none)* | One entry, orchestrates several skills |

Arithmetic: `48 + 15 + 10 = 73` commands; `48 + 15 = 63` skills (workflows have no skill twin).

- Command wrappers are thin: the body is "use the `<skill>` skill / read `skills/<skill>/SKILL.md` / use its TEMPLATE.md / `$ARGUMENTS`." Confirmed for `okr-writer -> foundation-okr-writer`, `adr -> develop-adr`, `prd -> deliver-prd`, `tool-note-and-vote -> tool-note-and-vote`.
- The split is a deliberate convention applied inconsistently, not rename drift: `commands/okr-writer.md` (short) and `skills/foundation-okr-writer/SKILL.md` (prefixed) were born in the **same commit** (`6bcfba1`). The intent was short commands for muscle memory + phase-prefixed skills for taxonomy. It was never written down, and the `tool-*` family did not follow it.

### Root cause

73 command wrappers are **hand-maintained**, and there is no documented rule for short-vs-prefixed. Hand fan-out drifts. The fix must make the inconsistency structurally impossible (generate or eliminate the wrapper layer) and/or detectable (a validator), and it must be written down.

## 2. The cross-client reality (why the skill name and description matter most)

The decisive design input is how each runtime actually lets a user reach a capability.

### Claude Code

- **Commands have been merged into skills.** In current Claude Code, "command" is the legacy term: a `commands/<name>.md` and a `skills/<name>/SKILL.md` work identically, and skills support the same `$ARGUMENTS` / `$1` / named-argument substitution that commands do. The hand-maintained command wrapper layer is therefore legacy scaffolding, not a distinct capability (verified against code.claude.com/docs, 2026-05-25).
- Surfaces **both** component types in the `/` palette: every `commands/*.md` and every `skills/*/SKILL.md` with a `description`. That doubling is why ~136 palette rows exist for 63 capabilities today.
- Skill visibility **is** controllable via frontmatter: `user-invocable: false` hides a skill from the `/` menu (model-invocable only); `disable-model-invocation: true` blocks model auto-invocation. There is no documented "user-invocable but hidden from the menu" state, the menu entry is automatic for any user-invocable skill with a description.
- The palette filters as you type, so substring entry surfaces matches regardless of prefix.
- Plugin skills are **always namespaced** in the menu (`/pm-skills:<name>`); there is no un-namespaced short form for a plugin skill, so the short-name win must live in the skill `name` itself.

### Codex CLI

- **Explicit invocation:** type `$skill-name` (for example `$prd`), or run `/skills` to browse the installed list. The `$` prefix uses the **skill name**. The `/` prefix is reserved for built-in Codex commands and does **not** invoke custom skills (`/prd` is unrecognized; `$prd` works).
- **Implicit invocation:** Codex auto-loads a skill when a plain-language prompt matches the skill's **description** (for example "apply the latest schema changes" loads a `database-migration` skill) with no special syntax.
- **There is no command-wrapper layer.** The Claude `commands/*.md` short alias has no Codex equivalent today (an open Codex issue requests generating slash commands from `SKILL.md`).

### The three conclusions that drive the standard

1. **Command wrappers are Claude-Code-only.** Effort spent perfecting the command layer is a single-runtime investment. It cannot deliver cross-runtime ergonomics.
2. **The skill name is the cross-runtime typed identifier.** On Codex the user types `$skill-name`. A long phase-prefixed name (`$foundation-okr-writer`) is the thing a user must remember and type on every runtime except Claude Code. So short-name ergonomics belong on the **skill name**, not on a wrapper.
3. **The description is the portable invocation interface.** Both runtimes select skills from natural language via `description`. A user who forgets the name reaches the capability through its description. This is the load-bearing cross-runtime surface and matters more than any naming choice.

## 3. Best-practice principles (anchored)

1. **Single source of truth.** The skill (`SKILL.md` per the agentskills.io spec) is canonical and portable. Any per-runtime invocation surface (a Claude command, a future Codex/Gemini wrapper) is a **projection** of the skill, generated from it, never hand-maintained in parallel. Hand-maintained fan-out is exactly what produced the current inconsistency.
2. **The canonical name is a stable identifier; ergonomics ride the name itself.** A canonical identifier does not need to be short to be good, but because the *same* identifier is what users type on non-Claude runtimes, short and memorable is the ergonomic win. Taxonomy (the Triple Diamond phase) is metadata, not part of the typed identifier; it already lives in `metadata.classification`.
3. **The description is the real interface; hold it to a bar.** Every skill must be selectable from natural language without relying on its name. This is enforced as a quality bar, not left to chance.
4. **Graceful, signposted deprecation, never a silent break.** A rename is a breaking change to the invocation contract. Handle it with an alias/deprecation window and a version signal, the same philosophy the v2.21.0 marketplace launch uses for the install contract.
5. **Make the failure structurally impossible, then also detectable.** Prefer generation (the wrapper cannot be misnamed because no human names it) backed by a CI freshness gate; fall back to a validator when no wrapper layer survives.

### Supporting precedent

- **Anthropic's own bundled skills** use short flat names with no phase prefix and rich descriptions: `pdf`, `docx`, `xlsx`, `frontend-design`, `brand-guidelines`. Discovery is carried by the description, the name is a short handle. This is the agentskills.io house style.
- **Claude Code's own slash commands** are short verbs: `/init`, `/review`, `/loop`. Short, typed, memorable.

## 4. The standard (normative)

**DECIDED 2026-05-25 (D-V31-1=A): Rule-set A is the standard.** Rule-set B is retained below as the rejected alternative, for rationale only.

### Rule-set A (ADOPTED: short flat names)

- **R-A1.** Each skill's `name` is a short, verb/noun handle, unique across the catalog, no phase prefix (`okr-writer`, `prd`, `note-and-vote`).
- **R-A2.** The Triple Diamond phase is recorded in `metadata.classification` and preserved in directory grouping and docs, not in the `name`.
- **R-A3.** The Claude Code command wrapper is **dropped**. Skills accept the same `$ARGUMENTS` / `$1` / named-argument substitution as commands (verified 2026-05-25), and commands are merged into skills in current Claude Code, so the short skill `name` plus `$ARGUMENTS` in the `SKILL.md` fully replaces the wrapper. No generator is needed for the Claude Code surface.
- **R-A4.** `workflow-*` commands keep their `workflow-` prefix as a deliberate, documented exception: they orchestrate multiple skills, have no skill twin, and the prefix is a meaningful kind-namespace.
- **R-A5.** Every skill `description` meets the rubric in section 5.

### Rule-set B (REJECTED alternative, retained for rationale: keep prefixed names)

- **R-B1.** Each skill keeps its phase-prefixed `name`.
- **R-B2.** A short command **alias** is defined per skill, recorded in skill frontmatter (for example `metadata.command_alias`) so it is machine-derivable, and the Claude command wrapper is **generated** from that field, never hand-authored. Default alias = the skill name with its phase prefix stripped.
- **R-B3.** No command may restate its skill's full prefix when a short alias is intended (this is the rule the `tool-*` family currently violates).
- **R-B4.** `workflow-*` exception as in R-A4.
- **R-B5.** Description rubric as in section 5.
- Note: Rule-set B accepts that non-Claude runtimes get the long prefixed name (the alias is Claude-only), and leans entirely on the description (section 5) for forgetful cross-runtime users.

> `metadata.command_alias` (or any extra metadata key) is spec-safe: agentskills.io treats `metadata` as an open map, and a runtime that does not understand the key ignores it.

## 5. Description quality rubric (normative under D-V31-5)

Every skill `description` MUST:

- State the **artifact or outcome** produced (what the user gets).
- Name the **trigger situations** in plain language a user would actually type ("when planning quarterly OKRs", "when sizing a market").
- Include **distinguishing keywords** so the runtime can disambiguate from neighboring skills.
- Be selectable **without relying on the skill's name** (a user who never learns the name still reaches it).

A heuristic CI lint MAY check: minimum length, presence of trigger phrasing, and absence of name-dependence. Prose quality beyond heuristics is enforced in human review.

## 6. Scope boundaries

- This standard governs **naming and invocation surfaces**. It does not change skill behavior or the catalog count.
- Per-runtime emission for runtimes beyond Claude Code and Codex (Gemini, Copilot CLI) is allowed for by the single-source/generation principle but is a separate future effort.
- The pm-skills-mcp tool naming is out of scope (separate maintenance-mode repo).

## 7. Reference sources

Cross-client invocation behavior verified 2026-05-25:

- Agent Skills - Codex (OpenAI Developers): https://developers.openai.com/codex/skills
- Slash commands in Codex CLI (OpenAI Developers): https://developers.openai.com/codex/cli/slash-commands
- Codex CLI issue 11817 - `/<skill>` unrecognized while `$<skill>` works: https://github.com/openai/codex/issues/11817
- Codex CLI issue 13893 - add custom slash commands from SKILL.md: https://github.com/openai/codex/issues/13893
- agentskills.io specification (skill frontmatter, `name`, `description`, open `metadata` map): https://agentskills.io/specification
- Claude Code Skills reference (argument substitution `$ARGUMENTS`/`$1`/named, `user-invocable`, commands merged into skills): https://code.claude.com/docs/en/skills.md
- Claude Code Plugins reference (plugin skill namespacing `/plugin:skill`): https://code.claude.com/docs/en/plugins.md

Internal references:

- `plan_v2.22.0.md` (this release's decision briefs, phases, open questions).
- `naming-map.md` (the 63-skill old-name -> short-name map with collision check).
- `docs/internal/release-plans/v2.21.0/decision-worksheet.md` (verified Claude Code facts: no marketplace redirect, graceful-deprecation toolbox, per-marketplace identity).
- `docs/reference/runtime-components.md` (the doc to correct: misstates the command model and the workflow count).

## 8. Naming validator specification (D-V31-3 = validator only)

Because the wrapper layer is dropped (D-V31-2=A), there is nothing to generate; conformance is enforced by a deterministic validator folded into the pre-tag bundle. Mirror the existing pm-skills validator style (a `.sh` + `.ps1` pair, enforcing).

### Checks

| # | Check | Fails when | Tier |
|---|---|---|---|
| 1 | **Short canonical name** | a skill `name` begins with a phase/classification token (`define-`, `deliver-`, `develop-`, `discover-`, `foundation-`, `iterate-`, `measure-`, `tool-`, `utility-`) | Enforcing |
| 2 | **Name uniqueness** | two skills share a `name` (or a skill `name` collides with a retained `workflow-*` command) | Enforcing |
| 3 | **Classification present** | a skill lacks `metadata.classification` (phase must live here, not in the name) | Enforcing |
| 4 | **No stray command wrappers** | a `commands/*.md` exists that is not a `workflow-*` orchestrator | Enforcing |
| 5 | **Deprecated-alias integrity** (v2.22.0 only) | a deprecated alias skill lacks `metadata.deprecated: true` or does not point to a real canonical skill | Enforcing |
| 6 | **Description floor** (D-V31-5) | a `description` is below the length floor, lacks trigger phrasing, or is name-dependent | Enforcing (heuristic) |

### Notes
- Check 1's token list is the authoritative phase set; keep it in sync with `metadata.classification` values.
- Check 4 encodes R-A4: the only legitimate `commands/*.md` are the 10 `workflow-*` orchestrators.
- Check 5 is dropped at the [v3.0.0](../v3.0.0/plan_v3.0.0.md) convergence when the aliases are removed.
- Check 6 is a floor, not a full quality judgment; human review (per Section 5) carries the rest.
