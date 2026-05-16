---
title: Design Sprint Recovery Playbook
description: "Recovery scenarios and playbooks for mid-Design-Sprint failures: Decider leaves Wed AM, Friday customers cancel, Thursday prototype build slips, Wednesday supervote ties, Tuesday group brainstorming, Friday scorecard inconclusive, post-sprint Decider second-guesses."
---

> **Design Sprint is NOT an agile / Scrum sprint.** 5-day workshop methodology (Knapp/Zeratsky/Kowitz). For disambiguation see [Workshop Sprints vs Agile Sprints](../concepts/workshop-sprints-vs-agile-sprints.md).

When a Design Sprint hits a failure mode mid-execution, this playbook provides specific recovery procedures. Each scenario includes the symptom, the most-likely root cause, the recovery procedure, and when to stop recovery and postpone instead.

For pre-sprint failure prevention, see the [`tool-design-sprint-readiness`](../../skills/tool-design-sprint-readiness/SKILL.md) skill and the [FAQ](design-sprint-faq.md). For the operational walkthrough, see [Using the Design Sprint Tools](using-design-sprint.md).

## Pre-sprint scenarios

### Scenario PRE-1: Customer recruiting cannot deliver 6 confirmed slots by deadline

**Symptom:** Recruiter has 3-4 confirmed slots Friday-before-sprint instead of 6.

**Most-likely cause:** Recruiting started too late (less than 7 days before sprint Friday); target profile too narrow; channel saturation.

**Recovery:**
- Activate secondary recruiting channel (UserInterviews panel; LinkedIn; recruiter-network referrals). Aim for 6 total by sprint Monday.
- If you can confirm 5 by Monday, proceed. Buffer slot is missing but cohort is canonical.
- If 4 by Monday, proceed with explicit "no buffer" risk acknowledgement; one Friday cancellation drops to 3 customers and degrades signal.
- If 3 or fewer by Monday, postpone sprint by 1 week and re-recruit.

**Stop recovery / postpone if:** 3 or fewer confirmed by sprint Monday. Running with insufficient cohort produces a Friday scorecard with insufficient signal for the Decider call.

### Scenario PRE-2: Decider has unexpected calendar conflict for Wed AM or Fri PM

**Symptom:** Load-bearing Decider window conflicts emerge between brief sign-off and Monday.

**Most-likely cause:** Calendar wasn't truly cleared at readiness.

**Recovery:**
- Find a substitute Decider with equivalent strategic authority for the affected window. Verify substitute can commit to the supervote (Wed AM) or build/iterate/pivot/stop call (Fri PM).
- If no substitute, postpone the sprint by 1 week to align with Decider's calendar.

**Stop recovery / postpone if:** No substitute has authority AND Decider cannot reschedule. The cost of postponing is small (1 week of recruiting slip); the cost of running without a Decider for the load-bearing moment is wasted sprint.

### Scenario PRE-3: Prototype medium choice (Thursday) proves infeasible during brief preparation

**Symptom:** During brief authoring, team realizes the proposed prototype medium (Figma clickable, slideware, role-play, paper, physical mock) cannot be built in one day with available skills.

**Most-likely cause:** Readiness criterion 7 (prototype medium feasibility) was marked PASS too optimistically.

**Recovery:**
- Downshift the medium. Figma -> simpler Figma (fewer panels; lower fidelity). Physical mock -> paper. Role-play -> wizard-of-oz script. Pick the medium that is genuinely 1-day-buildable with current team skills.
- If no medium fits, the sprint may not be the right tool for this challenge. Consider research or smaller experiment.

**Stop recovery / postpone if:** No 1-day-buildable medium produces a testable artifact. The sprint cannot deliver a Friday test; postpone and reframe the challenge.

## Day 1 (Monday) scenarios

### Scenario MON-1: Customer/system map ends without clear target moment

**Symptom:** Decider cannot pick a target moment by 17:00 Monday. Team disagrees on which point in the map is the most-load-bearing.

**Most-likely cause:** The map is too broad (covering multiple distinct customer journeys); the sprint questions are too broad to point at a single moment.

**Recovery:**
- Force a target by end of day. Decider picks the moment most directly tied to the lead sprint question (Q1 from the brief). Document the decision rationale even if team disagrees.
- Better to test the "wrong" target moment than to lose Tuesday. Tuesday's sketches against ANY target produce signal; no target produces no signal.

**Stop recovery / postpone if:** Decider genuinely cannot commit. Sprint cannot proceed Tuesday without target moment; postpone Tuesday for a 4-hour follow-up Map and Target session with sharper sprint questions.

### Scenario MON-2: Expert interviews don't surface useful HMWs

**Symptom:** 2-4 cameo experts give superficial answers; HMW board has few HMWs from expert sessions.

**Most-likely cause:** Experts weren't briefed on what the team needs; experts are too senior / too generic; experts are biased toward incumbent solutions.

**Recovery:**
- During the afternoon HMW step, supplement expert HMWs with team HMWs from the Map walkthrough. Team typically generates 30-60 HMWs without expert input.
- For future sprints: brief experts ahead of time on the specific sprint question; choose practitioners over executives; mix expert sources (one practitioner, one researcher, one industry observer).

**Stop recovery / postpone if:** Total HMW count is under 20 (typical is 50-70). This signals the team lacks divergent thinking on the challenge; consider postponing Tuesday for a half-day research moment.

## Day 2 (Tuesday) scenarios

### Scenario TUE-1: Team lapses into group brainstorming during sketch steps

**Symptom:** Notes / Ideas / Crazy 8s / Solution Sketch steps include cross-talk between sketchers; sketches start to converge on the loudest voice's framing.

**Most-likely cause:** Facilitator failed to enforce silence; team unfamiliar with sprint discipline; physical workspace doesn't separate sketchers.

**Recovery:**
- Facilitator intervenes immediately at first violation: "Silent independent work; no looking at others' sketches until the end."
- If multiple violations, physically separate sketchers (different rooms; different Zoom breakout rooms).
- If violations persist, the team is not committing to the discipline and the sprint methodology is the wrong fit. Document and discuss after Friday.

**Stop recovery / postpone if:** Sketches end up converged-by-discussion rather than independent. Wednesday's heat map will be a popularity contest not a sketch evaluation; methodology fails.

### Scenario TUE-2: Lightning demos run long; sketches start late

**Symptom:** Each demo runs 5-7 min instead of 3 min; lightning demos consume 90+ min instead of 50-85 min; Notes step starts after 11:00.

**Most-likely cause:** Facilitator wasn't enforcing 3-min cap; team members brought too many slides per demo.

**Recovery:**
- Compress remaining sketch steps proportionally: 15-min Notes + 15-min Ideas + 6-min Crazy 8s + 60-min Solution Sketch instead of canonical 20+20+8+90.
- For future sprints: pre-instruct demo presenters to bring screenshots only (not live tools); use a visible 3-min timer per demo.

**Stop recovery / postpone if:** Solution Sketch step cannot fit in less than 30 min. At that point, you're sketching too rushed for the output to be Wednesday-useful. Extend Tuesday by 60-90 min if team has capacity.

### Scenario TUE-3: One team member cannot produce a Solution Sketch

**Symptom:** End of Tuesday, one teammate has Notes + Ideas + Crazy 8s but no Solution Sketch.

**Most-likely cause:** Sketch-skill comfort gap (often the engineer or non-designer); analysis paralysis; sketcher tried to design the prototype instead of a sketch.

**Recovery:**
- Accept the partial. Wednesday heat-map works fine with 3 sketches instead of 4; the missing teammate participates as a critic not as a sketch source.
- Coach the teammate on sketch-vs-prototype distinction: "Solution Sketch is a 3-panel storyboard. It does not need to be designable. Stick figures, arrows, and words are sufficient."

**Stop recovery / postpone if:** 2+ teammates cannot produce sketches. This signals team-skill mismatch with Tuesday's protocol; consider a different methodology (facilitated brainstorm + storyboard workshop) for this team.

## Day 3 (Wednesday) scenarios

### Scenario WED-1: Decider cannot pick a supervote (genuine tie)

**Symptom:** After heat map + critique + straw poll, Decider sees 2 sketches as approximately equal; cannot pick one supervote.

**Most-likely cause:** The two sketches test different first-30-sec hypotheses; both are valid; Decider doesn't want to lose either signal.

**Recovery:**
- This is the rumble case. Decider supervotes BOTH sketches (3 dots split: 2 + 1, or 2 + 2 with extended team capacity); team builds 2 prototypes Thursday with counterbalanced Friday interviews.
- Rumble doubles Thursday build complexity; only viable if team has 2 capable Makers + 2 Stitchers (5+ person teams).
- If rumble is not viable, Facilitator forces Decider commitment: "Pick the one most directly tied to Q1; the other can be tested in a follow-up sprint."

**Stop recovery / postpone if:** Decider refuses to commit AND rumble is infeasible. Wednesday cannot close without a supervote; Thursday cannot start without a storyboard.

### Scenario WED-2: Critique surfaces a sketch the team didn't realize was problematic

**Symptom:** During critique, one sketch surfaces a fundamental "we never asked..." issue that wasn't visible Tuesday.

**Most-likely cause:** Tuesday sketch produced a creative leap the team hadn't anticipated; the sketch is good but it tests a different question than the brief.

**Recovery:**
- Revisit sprint questions: does this sketch test Q1 (lead) or does it test a different question entirely?
- If it tests a different question, deprioritize for this sprint; capture as "v0.2 candidate"; storyboard a different sketch.
- If it tests Q1 better than other sketches, supervote it AND amend the sprint questions to acknowledge the improved framing.

**Stop recovery / postpone if:** The new question is so different that the brief no longer fits. Consider postponing Thursday for a half-day re-brief; Friday participants may need to be re-recruited.

### Scenario WED-3: Storyboard doesn't reach build-ready specificity by end of Wednesday

**Symptom:** End of Wednesday, the 5-15 panel storyboard is hand-wavy on key panels (e.g., "user does something to confirm").

**Most-likely cause:** Team got stuck on visual style instead of interaction-and-content specificity; or storyboard scope is too broad.

**Recovery:**
- Narrow scope: drop "nice-to-have" panels; keep only the panels Friday's interviews will test directly.
- Force specificity: each panel must answer "What does the customer see? What does the customer do? What is the system response?". If any panel lacks these, the team improvises Thursday morning.

**Stop recovery / postpone if:** More than 50% of panels are hand-wavy. Thursday's builders will spend the morning re-debating design; sprint cannot ship the prototype on time. Better to extend Wednesday by 90 min OR drop scope.

## Day 4 (Thursday) scenarios

### Scenario THU-1: Prototype build slips past 17:00 PT

**Symptom:** Thursday 17:00 hits; prototype is not at trial-run-ready state.

**Most-likely cause:** Asset Collector role unstaffed; inter-frame interactions more complex than estimated; copy not finalized; OCR / API integration faking harder than expected.

**Recovery:**
- 17:00-19:00 is recovery window. Triage:
  - **Missing assets:** pull in any team member to source from public-domain libraries; lower fidelity acceptable for Friday.
  - **Complex interactions:** cut scope to fewer panels with working core flow.
  - **Copy gaps:** ship with "good enough" copy; flag for post-sprint iteration.
  - **Faked integration too hard:** rebuild as paper / wizard-of-oz; lose realism but save Friday.
- Re-run trial run by 19:00 with whoever is available.

**Stop recovery / postpone if:** 19:00 hits and prototype still cannot pass trial run. Postpone Friday by 24 hours OR by 1 week depending on participant rescheduling flexibility. Most customers can absorb 24-hour shifts; longer shifts require re-recruiting.

### Scenario THU-2: Trial run reveals interview script is 75+ minutes

**Symptom:** Mock-run with teammate-as-customer takes longer than 65 min; Friday slots are 60 min.

**Most-likely cause:** Tasks act over-scripted (too many tasks; too many probes); Context act too broad; Debrief act too long.

**Recovery:**
- Cut to 3 Tasks maximum (lead + 1 secondary + 1 probe). Drop the probe task if needed.
- Compress Context to 3 questions (was 4-5).
- Compress Debrief to 3 questions (was 5-6).
- Re-mock; verify under 65 min.

**Stop recovery / postpone if:** Cannot fit under 75 min even with cuts. The challenge may be too complex for a 60-min interview; consider scheduling 90-min Friday slots (would mean 4 customers Friday instead of 5; degrades scorecard).

### Scenario THU-3: Friday participant cancels Thursday evening

**Symptom:** One participant cancels 12-18 hours before their Friday slot.

**Most-likely cause:** Personal emergency; work conflict.

**Recovery:**
- Activate the buffer slot participant (canonically the 17:00 PT buffer slot). Reschedule the buffer to fill the canceled slot's time.
- If no buffer available, contact backup-of-backup list (Riley should have identified 1-2 candidates Thursday morning).
- If no replacements, proceed with 4-customer cohort and degrade scorecard rules accordingly.

**Stop recovery / postpone if:** Multiple cancellations drop cohort below 4. Postpone Friday 24 hours and re-recruit (most teams can recruit 1-2 fresh customers in 24 hours with paid panels).

## Day 5 (Friday) scenarios

### Scenario FRI-1: Customer doesn't show for their interview slot

**Symptom:** 09:00 / 10:30 / etc. interview slot starts; customer is a no-show.

**Most-likely cause:** Calendar miscommunication; participant lost reminder; emergency.

**Recovery:**
- Wait 5-10 minutes; contact participant via SMS / phone.
- If unreachable, activate buffer participant for the slot.
- If buffer used, the day's cohort drops by 1; scorecard rules degrade accordingly.

**Stop recovery / postpone if:** N/A; one no-show is expected and the buffer pattern absorbs it.

### Scenario FRI-2: Prototype fails during a live interview

**Symptom:** Mid-interview, the prototype has a dead link, missing asset, or broken interaction.

**Most-likely cause:** Trial run missed the case; participant clicked something unexpected.

**Recovery:**
- Interviewer acknowledges and adapts: "There's a glitch here; let me describe what should happen". Continues the interview narratively for the broken section.
- After the interview, team huddles for 5-10 min to patch the prototype before next slot.
- Observation note flags the affected customer's data on the broken section as "unclear" rather than Y/N.

**Stop recovery / postpone if:** Multiple prototype failures across 2+ interviews. Pause remaining interviews to rebuild; reschedule the unfinished slots within 24 hours. Better to delay than to test broken artifact.

### Scenario FRI-3: Scorecard is inconclusive across all sprint questions

**Symptom:** End-of-day scorecard shows 3-of-5 partial on every row with 0 N and 0 strong Y.

**Most-likely cause:** Sprint questions were poorly framed (too vague to produce clear Y/N answers); prototype tested the wrong thing.

**Recovery:**
- Decider call is typically "iterate" rather than "build" or "pivot": refine the prototype + re-sprint with sharper sprint questions.
- Capture inconclusive findings as v0.2+ research questions in the lessons log.

**Stop recovery / postpone if:** 2+ sprints in a row produce inconclusive scorecards on similar questions. Signal that the question needs to be reframed at the Foundation Sprint level; pause Design Sprint cycle and re-do strategic alignment.

### Scenario FRI-4: Decider cannot make the build/iterate/pivot/stop call by 17:30

**Symptom:** 17:30 hits; Decider says "I need to think about it overnight."

**Most-likely cause:** Decider isn't confident in the scorecard; team disagreement leaked into Decider's framing.

**Recovery:**
- Facilitator forces commitment: "The sprint's contract was a call by 17:30. Defer is not an answer. The choices are build / iterate / pivot / stop / reframe; which is closest right now?".
- If Decider genuinely cannot pick, the default call is "iterate" (re-sprint with refined inputs). Document the reasoning; commit to iterate.

**Stop recovery / postpone if:** Decider walks out without a call. Sprint failed to produce its primary artifact; re-convene Monday morning for an emergency Decider review.

## Post-sprint scenarios

### Scenario POST-1: Decider second-guesses the Friday call after 24-72 hours

**Symptom:** Within a few days of sprint close, Decider says "actually I want to go a different direction."

**Most-likely cause:** Decider's commitment was performative; team didn't actually believe; new information has surfaced.

**Recovery:**
- Ask: "What new evidence has emerged?" If genuine, re-evaluate with the new evidence (may require a half-day review meeting; may require re-sprint).
- If no new evidence, hold the line. Decider's call at Friday 17:30 was committed; second-guessing without evidence is decision-discipline failure.

**Stop recovery / postpone if:** Repeated second-guessing across multiple sprints signals leadership / decision-discipline issue beyond the Design Sprint methodology's scope.

### Scenario POST-2: PRD authoring (post-Build call) reveals the storyboard had gaps

**Symptom:** During PRD authoring with `deliver-prd`, team realizes the Wednesday storyboard didn't specify a critical interaction or surface.

**Most-likely cause:** Storyboard scope was too narrow; Wednesday rushed.

**Recovery:**
- PRD authors design the gap with the storyboard's design principles as constraint. Capture the gap-design decisions explicitly in the PRD.
- For future sprints: extend Wednesday storyboard scope OR run a quick 1-day follow-up Wednesday session to fill the gap.

**Stop recovery / postpone if:** Gaps are extensive (4+ critical interactions). Pause PRD; convene a 1-day storyboard-extension session before continuing.

## Related resources

- [Using the Design Sprint Tools](using-design-sprint.md) - operational walkthrough
- [Design Sprint FAQ](design-sprint-faq.md) - common questions
- [Design Sprint cheat sheet](design-sprint-cheat-sheet.md) - printable 1-pager
- [Design Sprint case studies](design-sprint-case-studies.md) - 3 end-to-end examples (none required recovery; this playbook is for when things go off-script)
- [Design Sprint concept doc](../concepts/design-sprint.md) - methodology deep-dive
- [Sprint Methodology Glossary](../reference/sprint-methodology-glossary.md) - terminology

---

*Part of [PM-Skills](https://github.com/product-on-purpose/pm-skills) - Open source Product Management skills for AI agents.*
