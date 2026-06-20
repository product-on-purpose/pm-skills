<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Example: stakeholder briefings from a PRD

A worked case showing the master-first projection: one PRD fanned out into four audience briefings. Source: a fictional B2B ecommerce platform shipping a built-in Campaigns (email/SMS) feature. All metrics are `[fictional]`.

## Prompt

```
/foundation-stakeholder-briefings @campaigns-prd.md
(skill proposes Engineering, UX/Design, Data/BI, Executive for a spec; user adds Legal for CAN-SPAM)
```

## Output

```markdown
# Stakeholder briefings: Campaigns (built-in email/SMS)

## Master document

**What and why**

- M1: Campaigns adds native email/SMS re-engagement to the platform so merchants stop stitching on third-party tools (Klaviyo, Mailchimp).
- M2: Target is the ~68% of merchants [fictional] who currently pay for an external email tool.

**Decisions**

- M3: v1 ships template-only sending (no drag-and-drop builder); CAN-SPAM one-click unsubscribe is in scope.
- M4: Deliverability runs on a dedicated-IP provider with domain warm-up.

**Status**

- M5: Engineering build is ~60% complete [fictional]; the sending pipeline and template gallery are done, analytics is not.

**Risks and open questions**

- M6: Deliverability reputation on cold domains is the top risk; warm-up adds ~2 weeks to the timeline.
- M7: CAN-SPAM and GDPR consent handling needs legal sign-off before GA.

**Asks**

- M8: GA go/no-go decision at the 2026-07-15 review.

**Timeline**

- M9: Beta 2026-06-30; GA target 2026-07-20.

## Briefings

--- BEGIN: Executive ---

**Draws on:** M1, M2, M6, M8, M9
**Primary ask:** Approve GA go/no-go at the 2026-07-15 review.

**Campaigns is on track for a 2026-07-20 GA; one risk to watch**

**What this means for the Executive sponsor**

Campaigns lets merchants run email/SMS in-platform instead of paying for Klaviyo or Mailchimp, aimed at the ~68% [fictional] who use an external tool today. Build is on track for a 2026-07-20 GA. The one material risk is email deliverability on cold domains, which the warm-up plan addresses but which adds about two weeks. Decision needed from you: GA go/no-go at the 2026-07-15 review.

--- END ---

--- BEGIN: Engineering ---

**Draws on:** M3, M4, M5, M6
**Primary ask:** Confirm the dedicated-IP warm-up schedule lands before the 2026-06-30 beta.

**Template-only v1; deliverability warm-up is the critical path**

**What this means for Engineering**

v1 is template-only sending (no drag-and-drop) with CAN-SPAM one-click unsubscribe. Sending runs on a dedicated-IP provider with domain warm-up; the pipeline and template gallery are done (~60% overall [fictional]), analytics is not. The critical path is deliverability warm-up on cold domains. Confirm the warm-up schedule completes before the 2026-06-30 beta so reputation is established at launch.

--- END ---

--- BEGIN: Data/BI ---

**Draws on:** M2, M5
**Primary ask:** Stand up the adoption + deliverability dashboard before beta so v1 is measurable.

**Analytics is the open build item; we need adoption + deliverability instrumented**

**What this means for the Data team**

The success measure for Campaigns is adoption among the ~68% [fictional] of merchants on external tools, plus deliverability health. Analytics is the one build item not yet done. We need event instrumentation (campaign_created, send_completed, delivered, opened, clicked, unsubscribed) and a dashboard covering adoption and deliverability before the 2026-06-30 beta, or v1 ships blind.

--- END ---

--- BEGIN: Legal ---

**Draws on:** M3, M7
**Primary ask:** Sign off on CAN-SPAM + GDPR consent handling before the 2026-07-15 GA review.

**Consent and unsubscribe handling needs legal sign-off before GA**

**What this means for Legal**

Campaigns sends commercial email/SMS, so it carries CAN-SPAM and GDPR obligations: one-click unsubscribe (in scope for v1) and lawful consent capture. We need your sign-off on the consent flow and unsubscribe handling before the 2026-07-15 GA review, since GA cannot proceed without it.

--- END ---

---

## Translations applied (internal)

- "dedicated-IP warm-up" kept as-is for Engineering; rendered as "deliverability reputation risk" for the Executive block (audience: Executive).
- "CAN-SPAM / GDPR" kept precise for Legal; rendered as "consent handling needs legal sign-off" for Executive.

## Sources and References

- Source artifact: campaigns-prd.md [fictional]
- **Generated:** 2026-06-20T17:00:00Z | **Skill version:** 1.0.0 | **Audiences:** Executive, Engineering, Data/BI, Legal | **Input quality:** high
- **Invariant self-check:** 4 briefings; all Draws-on IDs resolve to M1-M9; one Primary ask each; master reviewed as audience-neutral.
```
