---
name: foundation-stakeholder-briefings
description: "Turns any source artifact (spec, discovery, research, GTM plan, experiment results, retro, or raw notes) into one canonical master document plus a set of audience-tailored briefings, each re-pitched to a stakeholder lens (executive, board, engineering, UX, PMM, sales, CS, legal, data, or a custom audience). Every briefing is a traceable projection of the master, so the versions never disagree. Use when one piece of work must reach several audiences who each need a different framing, decision, and level of detail."
license: Apache-2.0
metadata:
  classification: foundation
  version: "1.0.0"
  updated: 2026-06-20
  category: communication
  frameworks: [stakeholder-comms]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Stakeholder Briefings

A stakeholder-briefings artifact takes one source (a PRD, a discovery synthesis, a research report, a GTM or launch plan, experiment results, a retro or incident write-up, or raw notes) and produces a single saveable file containing:

1. a **master document**: the canonical, audience-neutral synthesis of the work (what and why, decisions, status, risks and open questions, asks, timeline), with each claim numbered (`M1`, `M2`, ...); and
2. a set of **audience briefings**: the same content re-pitched for each chosen stakeholder, one self-contained, copy-paste-ready block per audience.

The skill runs **master-first, then projects**. The master is the single source of truth; every briefing is a projection of it. A briefing may omit, reorder, and translate master content, but it may never assert a claim that is not in the master. That projection rule is what keeps the executive version and the engineering version from quietly disagreeing, and it is the difference between this skill and asking a model to "rewrite this six ways."

Distinct from `foundation-stakeholder-update` (one async update of meeting outcomes for a single audience, meeting-bound), `discover-stakeholder-summary` (a map of who stakeholders are and their influence/interest), and `foundation-persona` (a customer/buyer viewpoint to design or market against).

## When to Use

- One piece of work must reach several audiences who each need a different framing, decision, and level of detail (a spec going to engineering, design, data, and the funder at once).
- You are about to manually rewrite the same update three to five ways, one per audience.
- A decision or result needs to propagate across functions without the versions drifting apart.
- A single audience needs a tailored briefing from a non-meeting source (N=1 is supported; the fan-out is the signature use, not a floor).

## When NOT to Use

- One async update of **meeting** outcomes for stakeholders. Use `foundation-stakeholder-update` (it is meeting-bound; that is its scope).
- Understanding or mapping stakeholders (influence, interest, comms plan). Use `discover-stakeholder-summary`.
- A persona to design or market against. Use `foundation-persona`.
- There is no source content yet. This skill projects an existing artifact; it does not do the underlying analysis.

## Instructions

When asked to create stakeholder briefings, follow these steps:

1. **Ingest and classify the source.** Read the provided artifact. Classify its type (spec/PRD, discovery/research, GTM/launch, strategy/roadmap, experiment/metrics, incident/retro, compliance/privacy/security, or raw/ambiguous). If the source is thin, continue but set `input_quality: low` and name the gap.

2. **Build the master.** Write the audience-neutral canonical document with these sections: What and Why, Decisions, Status, Risks and Open Questions, Asks, Timeline. **Number every load-bearing claim** with a stable ID (`M1`, `M2`, ...). The master carries no audience-specific spin; it is the shared substrate.

3. **Propose the audiences.** From the source type, propose the relevant subset using `references/source-type-map.md` (for example, a spec proposes Engineering, UX/Design, Data/BI, Executive; a GTM plan proposes PMM, Sales, CS/Support, Executive). Present the proposal and accept `go` (generate the proposed set), an edit (`drop X, add Y`), or `all` (all nine). If invoked with `--go`, skip the prompt and generate the proposal. No audience is ever locked out.

4. **Project each briefing.** For each chosen lens (see `references/audience-lenses.md`), render a self-contained block delimited by `--- BEGIN: <lens> ---` / `--- END ---`, containing:
   - `Draws on:` the master claim IDs this briefing projects (required).
   - `Primary ask:` exactly one decision or action for this audience (required).
   - a one-line headline, a "what this means for you" framing, and the body, at the lens's length, vocabulary, and tone.
   Every load-bearing line must trace to a master claim. Do not introduce a claim that is not in the master.

5. **Flag translations.** Keep a translations-applied log (internal, below the shareable boundary) for every technical-to-business or inferred re-pitch, so the user can verify it lands. This section is never part of a shareable briefing.

6. **Self-check the invariant** before finalizing:
   - **Trace references resolve** (deterministic, checkable): every briefing `Draws on:` ID resolves to a real master claim.
   - **One CTA** (deterministic, checkable): exactly one `Primary ask:` per block.
   - **No untraced claim** (review): re-read each block against its `Draws on:` set and confirm the body introduces nothing absent from those master claims. This is a review step, not automated.
   - **Neutral master** (review): the master has no audience-specific spin. List anything that fails.

7. **Render the artifact.** Master (with claim IDs) -> the delimited briefing blocks -> the boundary marker -> the translations-applied log -> Sources and References. Remove all guidance blockquotes from the final output.

## Audience lenses

Nine first-class lenses, each defined by the decision it owns, plus a Custom slot whose lens is inferred from the audience name and source and shown for confirmation. Full definitions, per-lens "not this lens when" boundaries, and the overlap matrix (Exec vs Board, PMM vs Sales, Engineering vs Data, Legal vs Exec) are in `references/audience-lenses.md`.

## Output

- A single artifact (filename `YYYY-MM-DD_HH-MMtz_<title>_stakeholder-briefings.md`), built from `references/TEMPLATE.md`.
- Each briefing block is self-contained and send-ready (BEGIN/END cut-lines) so it can be copied out without edits.
- A future `--split` mode (write each block to its own file) is deferred; v1 is single-artifact.

## Quality checklist

- [ ] Master present with numbered claim IDs (`M1`, `M2`, ...) and no audience-specific spin.
- [ ] Each briefing block has a `Draws on:` line whose IDs all resolve to master claims.
- [ ] Each briefing block has exactly one `Primary ask:`.
- [ ] No briefing asserts a claim absent from the master (projection rule).
- [ ] Audience set matches the source-type proposal or the user's edit; N=1 honored without refusal.
- [ ] Translations-applied log present (internal) when any translation was made; boundary marker separates shareable blocks from internal sections.
- [ ] Each briefing is at the lens's length and tone (a board block reads nothing like an engineering block).
- [ ] Guidance blockquotes removed from the final artifact.

## See also

- [`references/TEMPLATE.md`](references/TEMPLATE.md) - the master + briefing-block scaffold.
- [`references/audience-lenses.md`](references/audience-lenses.md) - the nine lenses, boundaries, and overlap matrix.
- [`references/source-type-map.md`](references/source-type-map.md) - the source-type to audience proposal.
- [`foundation-stakeholder-update`](../foundation-stakeholder-update/SKILL.md) - one meeting update for one audience (distinct).
- [`discover-stakeholder-summary`](../discover-stakeholder-summary/SKILL.md) - mapping stakeholders (distinct).
