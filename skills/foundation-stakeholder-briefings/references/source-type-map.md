<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Source-type to audience proposal

When the skill runs, it classifies the source and proposes the audiences that source type usually needs, rather than generating all nine or asking from a blank slate. The proposal is a starting selection only: the user accepts (`go`), edits (`drop X, add Y`), or takes `all`. **No audience is ever locked out.** `--go` accepts the proposal unattended.

## The map

| Source type | Proposed audiences | Held back (one tap to add) |
|---|---|---|
| **Spec / PRD** | Engineering, UX/Design, Data/BI, Executive | PMM, Sales, CS, Legal, Board |
| **Discovery / research** | UX/Design, PMM, Executive, Engineering | Sales, CS, Data, Legal, Board |
| **GTM / launch** | PMM, Sales, CS/Support, Executive | Engineering, Legal, Data, Board |
| **Strategy / roadmap** | Executive, Board, PMM, Sales | Engineering, UX, CS, Data, Legal |
| **Experiment / metrics** | Data/BI, Executive, PMM, Engineering | UX, Sales, CS, Legal, Board |
| **Incident / retro / risk** | Engineering, CS/Support, Executive, Legal | UX, PMM, Data, Sales, Board |
| **Compliance / privacy / security** | Legal, Engineering, Executive, CS/Support | the rest |
| **Raw notes / ambiguous** | Executive, Engineering, PMM (or ask) | all nine offered |

## Classification cues

- **Spec / PRD** - requirements, user stories, acceptance criteria, scope.
- **Discovery / research** - interviews, synthesis, journey maps, personas, survey findings.
- **GTM / launch** - launch checklist, release plan, positioning, go-to-market.
- **Strategy / roadmap** - lean canvas, opportunity tree, OKRs, vision, pivot decision.
- **Experiment / metrics** - experiment design or results, dashboards, instrumentation, A/B outcomes.
- **Incident / retro / risk** - postmortem, retrospective, incident write-up, risk register.
- **Compliance / privacy / security** - data-handling review, regulatory assessment, security finding, DPA.
- **Raw notes / ambiguous** - a Slack thread, meeting scratch, a brain-dump with no clear structure. Classify the dominant theme if one exists; otherwise propose the safe default (Executive, Engineering, PMM) and say so.

## Override semantics

1. Show the proposed set and the held-back set.
2. Accept `go` (the proposed set), an edit naming lenses to drop/add, or `all` (all nine).
3. For any Custom audience the user names, infer and confirm the lens (see `audience-lenses.md`) before generating.
4. Honor N=1: if the user wants a single audience, generate just that one briefing; never refuse a one-lens request.
