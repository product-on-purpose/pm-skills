---
scenario: ai-meeting-summarizer
skill: foundation-build-risk-review
family: framing
created: 2026-06-23
---

# Scenario: should we build an AI meeting-notes summarizer?

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce a build-decision artifact
for it. Judges never see this header. Note: the input is deliberately RAW (an unframed "should we
build this?" situation with mixed signals), not a pre-written risk review.

## Situation brief

**Product:** a B2B project-management SaaS for agencies (~1,200 paying teams, $40/seat/month).

**The request:** the founder wants to build an "AI meeting-notes summarizer" that joins a team's
video calls, transcribes them, and posts an AI summary with action items into the project. It is the
top item on the founder's personal list for next quarter.

**What we are seeing (raw signals):**
- 8 customers have asked for "better meeting notes" in the last six months (out of ~1,200 teams).
- 2 of those 8 explicitly said "like what Otter / Fireflies does."
- Three competitors shipped a similar feature this year; one markets it heavily.
- The sales team says it "would help close enterprise deals," but cannot point to a lost deal where
  it was the deciding factor.
- A LinkedIn poll the founder ran got 140 likes on "AI should take your meeting notes."
- No customer has asked to pay more for it; none has tried to build a workaround themselves.

**Business context the team mentioned:**
- The company goal next year is net revenue retention; churn is concentrated in teams that never
  adopt the core planning board.
- Engineering is 6 people; a real-time transcription + AI pipeline is a multi-month build with
  ongoing per-minute inference cost.
- The core planning board has known gaps that customers complain about weekly.

**What is NOT yet known:**
- Whether any team would change its behavior (or pay) for the feature, versus liking the idea.
- Whether the 8 requesters represent a pattern or a vocal few.
- Whether the real retention lever is the meeting feature or fixing the core planning board.

**Audience for the artifact:** the founder and the head of engineering, deciding whether to put the
feature on next quarter's roadmap.
