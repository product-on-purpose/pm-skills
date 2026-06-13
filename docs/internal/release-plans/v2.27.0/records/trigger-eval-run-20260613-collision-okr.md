# Trigger-eval report

| Skill | Train pass | Validation pass | Failing queries |
|---|---|---|---|
| foundation-okr-writer | 92% | 75% | 3 |
| measure-okr-grader | 83% | 63% | 5 |

## Failures

- foundation-okr-writer [train] expected trigger, fired 0x: "Review these draft OKRs and tell me where the key results are really just features"
- foundation-okr-writer [validation] expected trigger, fired 1x: "Just draft a complete OKR set from this product context in one pass and label your assumptions"
- foundation-okr-writer [validation] expected trigger, fired 0x: "Critique this OKR draft: are the objectives inspiring and the key results measurable?"
- measure-okr-grader [train] expected trigger, fired 0x: "Here are the final KR values, baselines, and targets; produce the cycle review with learning synthesis"
- measure-okr-grader [train] expected trigger, fired 0x: "We disagree about whether 0.7 on that KR is good or bad; do an honest scoring pass"
- measure-okr-grader [validation] expected trigger, fired 1x: "Assess our finished OKRs: did the guardrail hold, and what should we carry into next quarter?"
- measure-okr-grader [validation] expected trigger, fired 0x: "Turn these end-of-quarter KR actuals into a review the team can learn from, with no sugarcoating of misses"
- measure-okr-grader [validation] expected trigger, fired 0x: "Evaluate the completed OKR set and flag any KRs whose measurement window has not closed yet"
