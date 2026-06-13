# Trigger-eval report

| Skill | Train pass | Validation pass | Failing queries |
|---|---|---|---|
| deliver-prd | 83% | 88% | 3 |

## Failures

- deliver-prd [train] expected trigger, fired 1x: "Help me spec out the requirements for our Q3 epic so design, backend, and mobile are all working from the same source"
- deliver-prd [train] expected trigger, fired 1x: "Stakeholders want to approve scope before we invest two quarters in this initiative; draft the spec doc they can sign off on"
- deliver-prd [validation] expected trigger, fired 0x: "We're kicking off the offline mode initiative; create the spec that covers requirements, out-of-scope items, dependencies, and risks"
