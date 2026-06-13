# Trigger-eval report

| Skill | Train pass | Validation pass | Failing queries |
|---|---|---|---|
| deliver-acceptance-criteria | 92% | 88% | 2 |
| deliver-edge-cases | 67% | 50% | 8 |
| deliver-user-stories | 92% | 75% | 3 |

## Failures

- deliver-acceptance-criteria [train] expected trigger, fired 0x: "Give me Given/When/Then scenarios for the saved-search slice, including error states"
- deliver-acceptance-criteria [validation] expected trigger, fired 1x: "What are the verifiable done conditions for the story where users export their billing history?"
- deliver-edge-cases [train] expected trigger, fired 0x: "List everything that can go wrong in the checkout flow, with a recovery path for each"
- deliver-edge-cases [train] expected trigger, fired 1x: "We keep getting burned by weird inputs in production; map the failure surface of the search feature"
- deliver-edge-cases [train] expected trigger, fired 1x: "Prepare a QA catalog of unusual and failure scenarios for the scheduling feature"
- deliver-edge-cases [train] expected trigger, fired 0x: "What happens at the limits for the cart: zero items, max items, expired sessions, concurrent edits? Enumerate them"
- deliver-edge-cases [validation] expected trigger, fired 0x: "Identify the race conditions and timeout scenarios we need to design for in the sync engine"
- deliver-edge-cases [validation] expected trigger, fired 0x: "Before launch, make sure every error state in onboarding has a designed message and recovery path"
- deliver-edge-cases [validation] expected trigger, fired 0x: "Review this PRD and enumerate the boundary and failure scenarios it does not cover"
- deliver-edge-cases [validation] expected trigger, fired 0x: "After last week's outage, build a systematic catalog of failure modes for the notifications pipeline"
- deliver-user-stories [train] expected trigger, fired 0x: "Help me slice this big checkout redesign into small shippable increments the team can estimate"
- deliver-user-stories [validation] expected trigger, fired 0x: "Sprint planning is tomorrow and the search revamp is still one giant blob; help me break it down into ticket-sized pieces"
- deliver-user-stories [validation] expected trigger, fired 1x: "Our backlog needs the data import capability split into estimable work items with clear user value"
