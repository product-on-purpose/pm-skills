# Trigger-eval report

| Skill | Train pass | Validation pass | Failing queries |
|---|---|---|---|
| define-hypothesis | 92% | 63% | 4 |
| measure-experiment-design | 100% | 100% | 0 |

## Failures

- define-hypothesis [train] expected trigger, fired 1x: "We are pivoting to SMB customers; help articulate what success looks like so we can validate the new direction"
- define-hypothesis [validation] expected trigger, fired 1x: "Write the We believe that X for Y will Z statement for the referral incentive idea"
- define-hypothesis [validation] expected trigger, fired 0x: "I need to align the team on what we expect this notification change to do before anyone designs a test"
- define-hypothesis [validation] expected trigger, fired 1x: "Turn this problem statement about cart abandonment into a testable prediction with a numeric target"
