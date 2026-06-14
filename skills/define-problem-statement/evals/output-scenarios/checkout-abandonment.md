---
scenario: checkout-abandonment
skill: define-problem-statement
family: framing
created: 2026-06-14
---

# Scenario: mobile checkout abandonment

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce a problem-statement artifact
for it. Judges never see this header. Note: the input is deliberately RAW (an unframed situation with
data), not a pre-written problem statement.

## Situation brief

**Product:** a direct-to-consumer e-commerce app (skincare). Most traffic is mobile.

**What we are seeing (raw signals):**
- Mobile checkout completion rate is **48%** (desktop is **71%**). The gap has held for two quarters.
- Of mobile users who abandon, **62%** drop on the **payment-and-shipping** step specifically.
- Support gets recurring complaints: "it made me re-enter my card," "the address form kept resetting,"
  "I couldn't tell if my discount code worked."
- Session replays show mobile users pinch-zooming the form fields and toggling between the app and
  their banking app to copy a one-time code.
- Average mobile order value is **$54**; roughly **9,000** mobile checkout attempts per week.
- A competitor recently launched one-tap wallet pay and is advertising "checkout in 10 seconds."

**Business context the team mentioned:**
- Next quarter's company goal is to grow repeat-purchase revenue without increasing paid acquisition.
- Engineering capacity is tight; a payments-platform migration is already half-planned for the year.
- Finance is sensitive to anything touching PCI scope.

**What is NOT yet known:**
- Whether the drop is driven by the form UX, the payment method options, perceived security, or
  unexpected shipping cost shown late.
- Whether logged-in returning customers abandon at the same rate as guests.

**Audience for the artifact:** the product leadership team, who will decide whether to fund a checkout
workstream this quarter.
