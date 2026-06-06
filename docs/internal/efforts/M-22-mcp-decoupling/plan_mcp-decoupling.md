# Plan: MCP Decoupling (M-22)

Status: Backlog
Milestone: v2.11.0
Created: 2026-04-11

---

## 1. Why Decouple

The pm-skills-mcp server was built for a future where multiple people
use pm-skills through different LLM tools. That future hasn't arrived.
The only active user (jprisant) uses Claude Code, which reads skills
directly via the plugin system - no MCP server needed.

Meanwhile, the MCP server creates overhead in every release:

| Overhead | Impact |
|----------|--------|
| "MCP alignment steps" in every release plan | Planning time |
| `check-mcp-impact` advisory noise on every new skill | CI noise |
| Manual `npm run embed-skills` sync step | Easy to forget, creates version drift |
| MCP gap tracking ("28 embedded vs 31 repo") | Cognitive load |
| "Should F-24 be an MCP tool?" questions | Design decisions with no user to serve |

**Total cost:** ~1-2 hours per release in planning, alignment, and
decision-making for an audience that doesn't exist.

---

## 2. What "Frozen" Means

Freezing the MCP repo is not deleting it. It means:

| Action | Frozen state |
|--------|-------------|
| Accept new PRs | No |
| Embed new skills | No |
| Publish new npm versions | No |
| Respond to security issues | Yes (patch and publish if needed) |
| Delete the repo | No - keep it for future activation |
| Reference in docs | Yes - but with "frozen" status noted |

The repo stays on GitHub, accessible, with its last working state.
Anyone who cloned it still has a functional MCP server - it just
serves an older skill set.

---

## 3. What Changes in pm-skills

### Release plans

Remove MCP alignment as a gating step. Before:

```
### Prerequisites
- [ ] MCP alignment: embed new skills, build, publish pm-skills-mcp
```

After:

```
### MCP Note
MCP server is frozen (M-22). No MCP alignment needed for this release.
```

### CI

**Keep `check-mcp-impact`** as advisory. It still has value as a
signal - when a new skill is added, the advisory reminds us that the
MCP server would need an update *if it were active*. This makes
unfreezing easier (we'll know exactly what's behind).

**Remove from hard-fail gating.** It's already `continue-on-error: true`,
so no CI change needed. Just stop treating the advisory as a release task.

### Documentation

| File | Change |
|------|--------|
| Release plan template | Remove "MCP alignment steps" section. Add "MCP Note: frozen per M-22" |
| `docs/guides/mcp-setup.md` | Add notice: "The pm-skills-mcp server is currently frozen at v{X}. For the latest skills, use the Claude Code plugin directly." |
| `docs/guides/mcp-integration.md` | Same notice |
| Future release plans | No MCP impact table. One-line note instead. |

### Backlog

Remove all MCP-specific backlog items or mark as "deferred pending MCP
revival":
- MCP embed session (recurring task → removed)
- MCP tool count updates → removed
- F-24 MCP exposure → removed (F-24 excluded from MCP per Codex review)

---

## 4. What Changes in pm-skills-mcp

### README.md update

Add a prominent notice at the top:

```markdown
> **Status: Frozen (as of v2.11.0)**
>
> This MCP server is not actively maintained. It serves pm-skills v2.8.0
> (the last embedded version). For the latest skills, install pm-skills
> as a Claude Code plugin directly.
>
> The server will be revived when team adoption creates demand for
> centralized skill distribution. See revival criteria below.
```

### pm-skills-source.json

Leave as-is. It accurately records the last embedded version. Future
unfreezing will update it.

### No code changes

The server still works. It just won't be updated with new skills.

---

## 5. Revival Criteria

The MCP server should be unfrozen when **any** of these conditions is met:

| Condition | Signal | Who decides |
|-----------|--------|------------|
| **3+ active team users** | Multiple people using pm-skills regularly, managing individual updates becomes coordination overhead | jprisant |
| **Non-Claude-Code tool adoption** | Team members using Cursor, Copilot, or custom agents that can't use the plugin but can use MCP | jprisant |
| **Enterprise demand** | A team or org wants centralized governance (approved skills, audit trail, access control) | jprisant + stakeholders |
| **MCP ecosystem maturity** | MCP becomes the standard way LLM tools discover capabilities, making a server expected rather than optional | Market signal |

When a condition is met:
1. Unfreeze the repo
2. Run `npm run embed-skills` to catch up with current pm-skills
3. Evaluate monorepo migration (Option B from earlier analysis) vs keeping separate
4. Resume MCP alignment in release plans

---

## 6. What About Hosted MCP?

The original motivation for the MCP server was:
> Hosting it across a team so individuals don't have to worry about
> skill updating.

This is a valid use case - but it requires:

```
Team scenario (future):

  ┌───────────────────────────┐
  │  Hosted MCP Server        │
  │  (Railway, Fly.io, etc.)  │
  │  pm-skills latest         │
  └──────────┬────────────────┘
             │ HTTPS/SSE
      ┌──────┼──────┬──────┐
      PM     PM     PM     PM
      (any LLM tool)
```

**Hosting options when the time comes:**

| Platform | Setup effort | Cost | Best for |
|----------|-------------|------|----------|
| Railway / Render / Fly.io | 30 min | $5-15/mo | Quick team deployment |
| Tailscale + local server | 15 min | Free | Internal team, no public internet |
| AWS/Azure container | 1-2 hrs | $10-30/mo | Existing cloud infrastructure |
| Cloudflare Workers | 30 min | Free tier | Read-heavy, serverless |

**Decision to defer:** The `/update-pm-skills` skill (F-24) solves the
"keep individuals current" problem for Claude Code plugin users without
any server infrastructure. For the current audience (single user, Claude
Code), this is sufficient.

The hosted MCP server becomes the right solution when the team grows
beyond what individual updates can handle, or when non-Claude-Code tools
enter the picture.

---

## 7. Implementation Plan

### Steps

| # | Task | Effort | Where |
|---|------|--------|-------|
| 1 | Update `pm-skills-mcp/README.md` with frozen notice | 10 min | pm-skills-mcp repo |
| 2 | Remove MCP alignment steps from v2.10.0 release plan | 5 min | pm-skills |
| 3 | Update `docs/guides/mcp-setup.md` with frozen notice | 5 min | pm-skills |
| 4 | Update `docs/guides/mcp-integration.md` with frozen notice | 5 min | pm-skills |
| 5 | Update backlog: mark MCP items as deferred | 5 min | pm-skills |
| 6 | Add M-22 to backlog-canonical.md | 5 min | pm-skills |

**Total effort:** ~35 minutes. This is a process change, not a code change.

### When to execute

Steps 2-6 can be done as part of v2.10.0 release work (since we're
already updating the release plan). Step 1 (MCP repo README) can be done
anytime.

Alternatively, all steps can be bundled into v2.11.0 if we don't want
to modify the v2.10.0 plan further.

---

## 8. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Someone discovers pm-skills via MCP and finds stale skills | Low (no known MCP users) | Low | Frozen notice in README explains the situation |
| Unfreezing later requires catching up on many releases | Medium | Low | `check-mcp-impact` advisory CI keeps a running tally of what's behind |
| Monorepo migration becomes harder the longer repos are separate | Low | Low | The MCP server is small (~10 files). Migration is simple whenever done. |
| Team adoption happens faster than expected, need to rush unfreeze | Low | Medium | Server already works - unfreeze is embed + build + deploy, not a rebuild |
