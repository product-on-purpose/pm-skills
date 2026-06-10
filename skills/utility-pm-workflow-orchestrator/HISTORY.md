# utility-pm-workflow-orchestrator - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-06-10 | v2.26.0 | F-15 | minor | Mode B chain expression contract, /chain front door, --thread flag, promotion suggestion |
| 1.0.0 | 2026-06-01 | v2.24.0 | workflow-orchestrator | initial | Dispatch skill for the pm-workflow-orchestrator sub-agent (v2.24.0) |

## 1.1.0 (2026-06-10)

- Documented the Mode B chain expression grammar (references/PARSE-CONTRACT.md) and the /chain command front door.
- Named the user-declared dependency flag --thread.
- Completion output now suggests promoting a reusable 2+ step chain to utility-pm-workflow-builder.
- Description rewritten to lead with triggers and boundaries; client-routing mechanics stay in the body.

## 1.0.0 (2026-06-01)

- Initial release with v2.24.0: cross-client dispatch for Mode A (saved prioritized action plan) and Mode B (user-named chain) runs.
