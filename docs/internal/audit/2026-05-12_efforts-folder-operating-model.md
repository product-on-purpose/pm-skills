---
title: SUPERSEDED - Efforts Folder Operating Model (Monolithic First Draft)
description: This document was split into three focused docs after maintainer feedback that the monolithic format conflated facts, recommendations, and execution steps. See the three companions below.
date: 2026-05-12
status: superseded same day
supersedes: none
superseded_by:
  - audit_efforts-folder-state_2026-05-12.md
  - recommendation_efforts-operating-model_2026-05-12.md
  - playbook_efforts-migration_2026-05-12.md
---

# SUPERSEDED - Read the three companion docs instead

This monolithic first draft was split on 2026-05-12 (same day it was written) after a critique that it mixed three different consumption modes in one doc. The original content lives in git history (commit visible via `git log --follow` on this file).

## Where to go now

| If you want... | Read this |
|----------------|-----------|
| Verified facts about the current state of `docs/internal/efforts/` | `audit_efforts-folder-state_2026-05-12.md` |
| Recommendations on what to change, with explicit Value / Cost / Skip-cost per decision | `recommendation_efforts-operating-model_2026-05-12.md` |
| Step-by-step migration tasks with time estimates and rollback notes | `playbook_efforts-migration_2026-05-12.md` |

## Why the split

The monolith presented opinion, inference, and verified fact in a single voice. A maintainer trying to act on it had to construct trust calibration themselves. The three-doc split separates concerns:

- The audit doc is consumed in "what is true" mode and has no opinions
- The recommendation doc is consumed in "what should change" mode and labels every claim's confidence
- The playbook is consumed in "how do I execute" mode and assumes the decisions are made

This file is retained as a stub so any inbound link (none expected; the monolith was only authored hours before being superseded) still resolves.
