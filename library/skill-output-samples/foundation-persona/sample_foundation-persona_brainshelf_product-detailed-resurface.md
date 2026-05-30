---
title: "Foundation Persona: Brainshelf Product Detailed Resurface"
description: "Brainshelf Resurface product persona for power-curator workflows and advanced resurfacing customization."
artifact: persona
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.5.0"
created: 2026-03-02
status: sample
thread: brainshelf
context: Brainshelf Resurface product persona for power-curator workflows and advanced resurfacing customization
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf's Resurface digest is driving strong early retention for casual users, but the product team is seeing a different pattern among power curators: users who save more than 80 items per month [fictional] and actively organize content using tags, folders, and search. These users represent 7% [fictional] of MAU but generate 42% [fictional] of sharing activity and are disproportionately likely to refer new users. Their Resurface experience is degraded because the relevance algorithm optimizes for recency and reading patterns, not for their deliberate curation structure. The PM needs a detailed product persona to ground Resurface v1.1 decisions around topic-based filtering, curation-aware relevance, and advanced search within resurfaced items.

**Source Notes:**

- Readwise documentation describes a mature resurfacing model that weights highlights, tags, and user-curated collections, providing a competitive benchmark for curation-aware relevance.
- Nielsen Norman Group information architecture research emphasizes that power users develop strong mental models of their content organization and experience friction when system organization diverges from their personal taxonomy.
- Indi Young's mental-model methodology highlights the gap between what tools assume users want and what users actually do with saved information, particularly for heavy curators.

---

## Prompt

```text
foundation-persona product detailed

detailed persona for Brainshelf Resurface power curator segment.

context: we're scoping resurface v1.1 and the power curators are a
different animal from casual users. they save 80+ items/month [fictional],
use tags and folders, and their mental model of their library is
structured. the current relevance algorithm doesn't respect their
curation choices.

7% of MAU, 42% of shares [fictional]. they're the word-of-mouth engine.

need this for PRD scoping, user stories, and edge cases around topic
filters, curation-aware relevance, and search within resurface.

include full decision model, workflow friction, and evidence trail.
```

---

## Output

# Persona Dossier: Tomás Reyes, The Architect of His Own Library (Product)

## Layer 1: Narrative Persona Dossier

## Executive summary
- Tomás does not save articles to read later; he saves them to build a structured reference system he can query by topic, project, and relevance.
- His curation is deliberate: every item gets tagged, foldered, or both before he considers it "saved."
- The current Resurface algorithm resurfaces items he already triaged because it prioritizes recency over his organizational signals.
- He experiences Resurface as noise when it ignores his tags and surfaces items he deliberately archived or deprioritized.
- He wants topic-filtered digests that respect his curation taxonomy, not a single chronological stream.
- He will tolerate a slightly less polished UI for more control over what surfaces and why.
- His sharing behavior is his most valuable output: when he shares a resurfaced item, it carries his endorsement and drives referrals.
- He evaluates every Resurface feature by asking whether it makes his library smarter or treats it like an undifferentiated pile.
- He is willing to invest setup time if the payoff is persistent: configure once, benefit every morning.
- Losing his organizational structure would be a trust-breaking event, not just a feature regression.

### 1) Opening scene
Tomás opens his Tuesday morning Resurface digest and sees five items. Two are from a project he finished three weeks ago and deliberately archived. One is an article he tagged "low priority" during initial triage. The remaining two are genuinely useful connections to his current research thread on API design patterns.

He taps through the two useful items, ignores the rest, and opens the app to manually search for the article he actually wanted to revisit. He finds it in twelve seconds using his own folder structure.

The digest took longer to evaluate than his manual search took to execute.

### 2) Who this person is when work gets real
Tomás is a senior software architect who reads broadly across engineering, product management, and organizational design. He saves articles, conference talks, podcast transcripts, and thread excerpts into Brainshelf because it is the only tool that lets him save from any source with a consistent capture flow. He maintains roughly 2,800 items [fictional] in a taxonomy of 34 tags and 12 folders [fictional] that mirror his professional knowledge domains.

He is not a casual reader who needs motivation to revisit. He is a systematic curator who needs his tools to respect the structure he already built.

### 3) Core tension and decision model
Tomás needs algorithmic assistance that augments his curation, not one that overrides it. The tension is between relevance determined by the system and relevance determined by his organizational choices. His decision model is explicit: if the tool ignores his signals, he routes around it. If it amplifies them, he invests more in maintaining them.

Every Resurface interaction is evaluated against a simple test: did this surface something I would not have found on my own, in a way that respects what I already know about my library?

### 4) Decision moments that define behavior
- Decision moment A: if a resurfaced item was deliberately archived or tagged low priority, dismiss it and lose confidence in the algorithm.
- Decision moment B: if a resurfaced item connects to a current project through his tag structure, engage immediately and consider sharing.
- Decision moment C: if topic filters are available, configure them once and expect them to persist across sessions.
- Decision moment D: if the algorithm surfaces items that contradict his organizational signals more than twice in a week, revert to manual search.

### 5) What they say vs what they mean
| What they say | What they mean | Product implication |
|---|---|---|
| "I already dealt with this." | The algorithm resurfaced an item he explicitly archived or deprioritized. | Respect archive and low-priority signals as negative relevance inputs. |
| "Why can't I filter by topic?" | His mental model is topic-first and the digest is format-first. | Add topic-based digest filtering tied to his existing tag taxonomy. |
| "I could find this faster myself." | Resurface is slower than his manual search for items he already organized. | Ensure the digest surfaces connections he would not have found manually. |
| "I would share this if it had context." | The sharing flow strips his organizational metadata. | Preserve tag context and personal notes in the sharing experience. |
| "Don't mess with my folders." | Organizational integrity is non-negotiable. | Never modify, merge, or reorder user-created folders without explicit consent. |

### 6) Operating modes
- Curation mode: saving and organizing new items with tags and folders; expects capture flow to surface existing tags for reuse.
- Digest mode: evaluating resurfaced items against current projects and interests; expects topic relevance, not recency.
- Search mode: manually querying his library when the digest fails to surface what he needs; uses tag and folder navigation.
- Sharing mode: forwarding resurfaced items to colleagues with context; expects his annotations and tags to travel with the share.

### 7) Product strategy implications
Priority stack:
- Topic-filtered digests that map to user tag taxonomy
- Negative relevance signals (archive status, low-priority tags, dismissed items)
- Curation-aware relevance model that weights organizational signals alongside reading patterns
- Search within resurfaced items (not just full-library search)
- Shareable items that preserve user annotations and tag context

Anti-patterns to avoid:
- Treating all saved items as equal candidates for resurfacing regardless of organization status
- Merging or auto-suggesting tag consolidation without user initiation
- Prioritizing recency as the dominant relevance signal for users with mature taxonomies
- Stripping organizational metadata from shared or exported items

### 8) Design principles this persona forces
- Never resurface what the user deliberately deprioritized without explaining why.
- Treat user-created tags and folders as first-class relevance inputs, not metadata decoration.
- Make topic filtering configurable once and persistent by default.
- Ensure sharing preserves the context the curator invested in creating.
- Measure Resurface quality by discovery value, not engagement volume.

### 9) If this persona wins, what changes?
Brainshelf Resurface becomes the tool that makes deliberate curation pay off every morning. Power curators stop routing around the digest and start relying on it as the first step in their daily knowledge workflow. Their increased sharing activity amplifies word-of-mouth referrals.

---

## Layer 2: Operational Appendix

### A) Request Context
- **Mode:** product
- **Mode alias used:** none
- **Detail profile:** detailed
- **Artifact or task context:** Resurface v1.1 scoping for power-curator segment
- **Domain context:** consumer PKM product with structured-curation user segment

### B) Depth Guidance
- **Product detailed:** ~350-900 lines (soft target)
- **Marketing detailed:** ~340-850 lines (soft target)
- **Brief profile (either mode):** ~170-360 lines (soft target)
- **Brief profile:** prioritize decision snapshot and immediate actions
- **Detailed profile:** include richer tradeoffs, constraints, and edge conditions
- **If user asks comprehensive/best-in-class:** target upper half of selected range

### C) Completeness Floors (Soft)
- **Product detailed:** 8+ substantive sections, 2+ tables/matrices, 5+ scenario-tailoring entries
- **Marketing detailed:** 8+ substantive sections, 2+ tables/matrices, 4+ scenario-tailoring entries
- **Brief profile:** 6-10 executive-summary bullets and 3+ scenario-tailoring entries
- **All outputs:** sections must be decision-usable; do not ship placeholder-level bullets

### D) Includes / Excludes
- **Includes:** curation workflow, tag and folder structure, relevance algorithm expectations, topic-filtered digest behavior, sharing with context, search within resurfaced items
- **Excludes:** new-user onboarding and activation, freemium-to-paid conversion strategy, B2B team licensing decisions

### E) Scenario tailoring
- For `prd`: require topic-filtered digests, negative relevance signals, curation-aware ranking, search within resurfaced items, and annotation-preserving shares as v1.1 scope items.
- For `user-stories`: encode digest filtering by tag, dismissal as negative signal, configure-once persistence, and share-with-context behavior.
- For `edge-cases`: cover user with 50+ tags and conflicting topic filters, archived item resurfaced after tag change, folder deletion with active topic filter, and empty digest when all candidates are deprioritized.
- For `instrumentation-spec`: instrument tag-based filter configuration events, digest-item dismissals with reason, manual-search fallback frequency, and share completion with metadata retention.
- For `dashboard-requirements`: track digest relevance score by user segment, filter usage rates, dismiss-to-engage ratio, and sharing volume with metadata retention.

### F) When not to use this persona
- First-week activation and onboarding for new users with empty libraries
- Marketing acquisition and conversion funnel design
- Enterprise procurement and team-licensing decisions

### G) Assumptions and Confidence
- **Key assumptions:**
  - Power curators have stable, mature organizational taxonomies that should inform relevance.
  - Current recency-weighted algorithm degrades experience for users with deliberate curation structures.
  - Topic-filtered digests are a configure-once, benefit-daily feature for this segment.
  - Sharing activity from power curators is a material referral driver.
- **Confidence:** Medium
- **Confidence rationale:** Segment sizing and sharing contribution data support strategic importance, but curation-aware relevance impact has not been A/B tested against the current algorithm.

## Evidence Trail

### User-provided inputs
| ID | Resource | Type | Used for | Notes |
|---|---|---|---|---|
| U1 | Power-curator segment data and sharing contribution | user prompt | segment sizing and strategic framing | metrics marked `[fictional]` |
| U2 | Current relevance algorithm limitations for organized libraries | user prompt | core tension and algorithm friction | recency bias noted |
| U3 | Request for detailed persona with curation workflow focus | user prompt | depth profile and scenario tailoring | explicit emphasis on topic filters and edge cases |

### LLM-discovered references
| ID | Resource | Type | Access method | Used for | Reliability notes |
|---|---|---|---|---|---|
| L1 | Readwise resurfacing and highlight model documentation | product docs | browse/search | curation-aware relevance benchmark | direct competitor reference |
| L2 | NN/g information architecture research | article | browse/search | power-user mental model framing | high-signal UX source |
| L3 | Indi Young mental model methodology | book/article | browse/search | gap between system assumptions and user behavior | foundational research reference |

### Evidence gaps and follow-up questions
| Gap ID | Missing support | Impacted claims/sections | Confidence impact | Follow-up question |
|---|---|---|---|---|
| G1 | Curation-aware relevance A/B test results | algorithm design prioritization | Medium | Does weighting user tags in the relevance model measurably improve digest engagement for curators? |
| G2 | Tag taxonomy complexity distribution across power curators | topic-filter design constraints | Medium | What is the median number of tags and folders maintained by power curators? |
| G3 | Sharing attribution data linking curator shares to new user registration | referral value quantification | Medium | What share of new user signups originate from a power-curator share event? |

### Claim mapping
| Claim ID | Claim summary | Evidence IDs | Confidence | Assumptions |
|---|---|---|---|---|
| C1 | Power curators have mature taxonomies that the algorithm should respect | U1, U2, L2, L3 | Medium | curation structure is stable and intentional, not incidental |
| C2 | Recency-weighted relevance degrades digest quality for organized libraries | U2, L1, L2 | Medium | recency bias produces false positives for users who actively triage |
| C3 | Topic-filtered digests are a configure-once feature for this segment | U2, U3, L2 | Medium | power curators will invest setup time for persistent filtering |
| C4 | Sharing with context drives referral value from this segment | U1, L3 | Medium | metadata-rich shares carry higher conversion signal than bare links |
