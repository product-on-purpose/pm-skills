# Worktree Primer (Quick)

Worktrees let you have multiple checked-out branches from the same repo at the same time in different folders.

## Why use them
1. Keep your current local WIP untouched.
2. Start a clean branch from `origin/main` for releases.
3. Avoid stash/reset churn when switching contexts.

## Minimal flow

```bash
git fetch origin --prune
git worktree add ../pm-skills-v2.3 origin/main
cd ../pm-skills-v2.3
git switch -c release/v2.3.0
```

Now you have:
- Original repo folder: your existing WIP.
- `../pm-skills-v2.3`: clean release workspace.

## Cleanup when done

```bash
cd <original-repo-folder>
git worktree remove ../pm-skills-v2.3
git worktree list
```

## Rule of thumb
- Use a worktree whenever your current branch has local WIP and you need a clean release/hotfix branch.
