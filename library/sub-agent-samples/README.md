# Sub-Agent Library Samples

Real example outputs from each of the 5 pm-skills sub-agents demonstrating the canonical patterns each sub-agent produces. The four content-and-release sub-agents (`pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`) carry three samples each, one per narrative thread (Brainshelf, Storevine, Workbench). The fifth, `pm-workflow-orchestrator`, ships a single thread-aligned sample because its `utility` classification is exempt from the three-thread requirement.

## Catalog

| Sub-agent | Thread | Scenario | Sample file |
|---|---|---|---|
| `pm-critic` | brainshelf | Brainshelf Resurface PRD review (1 P0, 3 P1, 2 P2, 1 P3 demonstrating contract-completeness, falsifiability, experiment design issues) | [`pm-critic/sample_pm-critic_brainshelf_prd-review.md`](pm-critic/sample_pm-critic_brainshelf_prd-review.md) |
| `pm-critic` | storevine | Q2 campaign analytics OKR set (2 P0 refusal-protocol catches: fabricated baseline + feature-delivery KR) | [`pm-critic/sample_pm-critic_storevine_okr-review.md`](pm-critic/sample_pm-critic_storevine_okr-review.md) |
| `pm-critic` | workbench | Sprint 14 review meeting recap (1 P0 family-contract violation: decision without owner; decision-action coherence) | [`pm-critic/sample_pm-critic_workbench_meeting-recap-review.md`](pm-critic/sample_pm-critic_workbench_meeting-recap-review.md) |
| `pm-skill-auditor` | brainshelf | Mid-cycle pre-release audit (2 P1 forward-looking findings; 3 P2 in-cycle expected drift) | [`pm-skill-auditor/sample_pm-skill-auditor_brainshelf_pre-release.md`](pm-skill-auditor/sample_pm-skill-auditor_brainshelf_pre-release.md) |
| `pm-skill-auditor` | storevine | Aggregate-counter drift detection (1 P0 CONTEXT.md declared vs filesystem-derived mismatch; v2.12.0 defect class) | [`pm-skill-auditor/sample_pm-skill-auditor_storevine_drift-detection.md`](pm-skill-auditor/sample_pm-skill-auditor_storevine_drift-detection.md) |
| `pm-skill-auditor` | workbench | Cross-cutting skill-without-command + command-without-skill (1 P0 orphaned command; 1 P1 missing pairing) | [`pm-skill-auditor/sample_pm-skill-auditor_workbench_cross-cutting.md`](pm-skill-auditor/sample_pm-skill-auditor_workbench_cross-cutting.md) |
| `pm-changelog-curator` | brainshelf | v2.16.0 minor release draft (50 commits; 5 Added + 2 Changed + 1 Fixed + 2 Security + 1 Known Limitations; hidden justification comments) | [`pm-changelog-curator/sample_pm-changelog-curator_brainshelf_minor-release.md`](pm-changelog-curator/sample_pm-changelog-curator_brainshelf_minor-release.md) |
| `pm-changelog-curator` | storevine | v2.16.1 patch release draft (3 commits; 2 Fixed + 1 Security; no Added) | [`pm-changelog-curator/sample_pm-changelog-curator_storevine_patch-release.md`](pm-changelog-curator/sample_pm-changelog-curator_storevine_patch-release.md) |
| `pm-changelog-curator` | workbench | v2.17.0 feature release draft (80 commits; multi-track shape spanning sub-agents + content + hooks + parser) | [`pm-changelog-curator/sample_pm-changelog-curator_workbench_feature-release.md`](pm-changelog-curator/sample_pm-changelog-curator_workbench_feature-release.md) |
| `pm-release-conductor` | brainshelf | v2.15.2 clean run (all 6 gates PASS first try; baseline shape) | [`pm-release-conductor/sample_pm-release-conductor_brainshelf_clean-run.md`](pm-release-conductor/sample_pm-release-conductor_brainshelf_clean-run.md) |
| `pm-release-conductor` | storevine | G0 aggregate-counter-drift failure + maintainer recovery (failure-recovery loop; no bypass; G0 idempotency) | [`pm-release-conductor/sample_pm-release-conductor_storevine_gate-failure.md`](pm-release-conductor/sample_pm-release-conductor_storevine_gate-failure.md) |
| `pm-release-conductor` | workbench | Chained dry-run for v2.16.0 (auditor at G0 + G2.5; curator at G2; layered Status envelope) | [`pm-release-conductor/sample_pm-release-conductor_workbench_chained-run.md`](pm-release-conductor/sample_pm-release-conductor_workbench_chained-run.md) |
| `pm-workflow-orchestrator` | storevine | Checkpointed Mode A run over a saved Storevine prioritized-action-plan on Claude Code native dispatch (3 runnable Section 7 prompts approved at each checkpoint, 1 MANUAL Foundation Sprint surfaced not nested, ending in Plan run complete) | [`pm-workflow-orchestrator/sample_pm-workflow-orchestrator_storevine_checkpointed-run.md`](pm-workflow-orchestrator/sample_pm-workflow-orchestrator_storevine_checkpointed-run.md) |

## Sample Conventions

Each sample has:

- **Frontmatter:** `title`, `description`, `artifact` (sub-agent output type), `version`, `repo_version`, `agent_version`, `created`, `status: sample`, `thread`, `context`
- **Scenario section:** the situation that prompted the sub-agent invocation (what artifact, what audience, what trigger)
- **Output section:** the actual sub-agent output (gradings, findings, draft, gate flow)
- **Notes section:** what the sample demonstrates and how it fits into the 3-thread catalog

Samples are real adversarial reviews, real audit outputs, real CHANGELOG drafts, and realistic release flows. The thread classification (brainshelf / storevine / workbench) determines the source artifact context but the sub-agent behavior is uniform across threads.

## Thread Narrative Contexts

The three narrative threads run across pm-skills samples (skills, sub-agents, workflows):

- **Brainshelf:** consumer PKM (personal knowledge management) app. Captures the consumer-product PM context.
- **Storevine:** B2B campaign-analytics platform. Captures the analytics / data-product PM context.
- **Workbench:** internal platform tooling team. Captures the platform / DX PM context.

The same sub-agent produces structurally identical output across threads (P0/P1/P2/P3 grammar; layered Status envelope per D26); the thread shapes the artifact content under review, not the sub-agent's analysis discipline.

## Cross-References

- Sub-agent definitions: [`agents/`](../../agents/)
- Dispatch skills (cross-client): [`skills/utility-pm-{role}/`](../../skills/)
- Runtime components catalog: [`docs/reference/runtime-components.md`](../../docs/reference/runtime-components.md)
- Adversarial review user guide (pm-critic): [`docs/guides/adversarial-review.md`](../../docs/guides/adversarial-review.md)
- Release runbook (pm-release-conductor): [`docs/contributing/release-runbook.md`](../../docs/contributing/release-runbook.md)
- Spec docs: [`docs/internal/release-plans/v2.16.0/spec_pm-*.md`](../../docs/internal/release-plans/v2.16.0/)
