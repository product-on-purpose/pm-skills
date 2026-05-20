---
name: foundation-stakeholder-update
description: Produces async communication to stakeholders, primarily non-attendees and secondarily some attendees who want a reference. Translates meeting outcomes into what-it-means language for readers, with channel variants (slack, teams, email, notion, exec-memo) and audience variants (engineering, design, leadership, customer-facing, mixed). Surfaces a primary CTA up front, flags technical-to-business translations for user verification, and detects thread continuation from prior updates.
license: Apache-2.0
metadata:
  classification: foundation
  version: "1.0.0"
  updated: 2026-04-17
  category: meeting
  frameworks: [meeting-skills-family]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Stakeholder Update

A stakeholder update is async communication to readers who need to know the outcomes of a meeting. Primary audience is non-attendees; secondary audience is some attendees who want a reference version (came in late, stepped out, need something to forward).

Distinct from `/meeting-recap` in audience, format, and purpose: the recap is a summary of what happened for people who were in the room; the stakeholder-update is a translation of outcomes into what-it-means for readers (tailored to their role, with technical-to-business translation where the audience warrants it).

Distinct from `/discover-stakeholder-summary`: that skill is about understanding stakeholders (input to the user's work). This skill is about communicating to stakeholders (output from the user's work).

This skill belongs to the Meeting Skills Family. It conforms to the [Meeting Skills Family Contract](../../docs/reference/skill-families/meeting-skills-contract.md).

## When to Use

- After a meeting with outcomes affecting teams who were not in the room
- When a decision or commitment needs to propagate to downstream teams async
- When a recap exists and needs to be translated into audience-specific language
- When the user needs something from readers (specific CTA) and cannot afford for it to be buried

## When NOT to Use

- Summarizing what happened for attendees. Use `/meeting-recap`.
- Broadcasting status with no specific audience tailoring. A plain Slack message is sufficient; the skill adds value when translation or CTA framing matters.
- Communicating research findings to stakeholders. Use `/discover-interview-synthesis` plus targeted comms.

## Zero-friction execution

Per the family contract, this skill never blocks on interrogation. Default flow:

1. Load related recap (preferred) or raw meeting notes
2. Detect thread continuation by scanning same directory for prior stakeholder-updates on the same `project`/`topics`
3. Infer channel (if not specified) from audience variant: engineering / design → slack; leadership → email; mixed → notion
4. Present a brief inference summary (detected channel, audience, CTA, thread continuation if any, translation candidates)
5. Accept `go` or corrections
6. Produce the channel-tailored update

If invoked with `--go`, skip the inference summary. The entire output is shareable content (per family contract. no separate summary block needed).

## Instructions

When asked to create a stakeholder update, follow these steps:

1. **Load related recap**
   Parse frontmatter to extract meeting context, decisions, actions, outcomes. If no recap provided, accept raw meeting notes with a lower input-quality flag.

2. **Detect thread continuation**
   Scan same directory for prior `stakeholder-update` artifacts with matching `project` / `topics`. If found, reference the prior update in the frontmatter `thread_continuation_of` field.

3. **Present go-mode inference summary**
   Show inferred channel (if not specified), detected audience, proposed CTA, thread continuation status, translation candidates (flagged jargon or acronyms that may not land).

4. **Distill key outcomes**
   From the recap or notes, select 3-5 outcomes that matter to the target audience. Do not include everything from the recap. filter by audience relevance.

5. **Frame the CTA**
   If action is needed: lead with it, not bury it
   If FYI-only: state explicitly in the TL;DR

6. **Translate technical-to-business**
   Flag jargon and acronyms unlikely to land with the audience. Provide plainer alternatives. Keep a translations-applied log for user verification in the output's Generation context.

7. **Build the channel-tailored variant**

   - **Slack / Teams**: headline (one action-oriented line, optionally one emoji), TL;DR 3 bullets, context sentence, "what this means for [audience]", CTA (bold with marker if action needed; italic "FYI-only" if not), thread-continuation link, more-links footer
   - **Email**: subject line (topic + outcome), greeting ("Hi [audience]"), opening sentence (headline + why they are receiving this), TL;DR, context 2-3 sentences, what was decided / advanced, what this means for your team, what I need from you (with by-when), thread reference, sign-off
   - **Notion**: rich H1/H2/H3 structure, longer context block, collapsible sections for detail, table for decisions and actions
   - **Exec-memo**: TL;DR first (3-4 lines), supporting detail in 3 sections max, asks section upfront, formal tone, no emoji

8. **Render TEMPLATE.md with the selected variant as primary**
   Other variants may be included as collapsible alternates for user flexibility. Remove all guidance blockquotes from the final artifact.

9. **Validate**
   - `channel` is in enum
   - `audience_variant` is in enum
   - `primary_cta` is non-empty (use "FYI-only" if no action needed)
   - `related_recap` is a valid filename reference or flagged as raw-notes input

## Quality checklist

- [ ] Channel variant matches the specified or inferred channel
- [ ] Audience variant's "what this means for you" is specifically tailored (not generic)
- [ ] CTA is surfaced up front, not buried
- [ ] Technical-to-business translations are logged in Generation context for user verification (INTERNAL. outside shareable boundary)
- [ ] Thread continuation referenced if prior updates exist on the same topic
- [ ] `## Shareable update` section present with channel-tailored body (v1.1.0. replaces "entire output is shareable" from v1.0.0)
- [ ] Explicit boundary marker between Shareable update and internal sections (translations, sources)
- [ ] Sources and References section lists the source recap and any prior updates in thread (INTERNAL)
- [ ] Filename uses v1.1.0 variant pattern: `YYYY-MM-DD_HH-MMtimezone_title_stakeholder-update-{channel}-{audience}.md`

## See also

- [Meeting Skills Family Contract](../../docs/reference/skill-families/meeting-skills-contract.md)
- [`/meeting-recap`](../foundation-meeting-recap/SKILL.md). upstream: primary input source
- [`/discover-stakeholder-summary`](../discover-stakeholder-summary/SKILL.md). distinct purpose (understanding stakeholders, not communicating to them)
