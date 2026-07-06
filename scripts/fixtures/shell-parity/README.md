# Count-consistency fixture (WS-T9 -> WS-Z4)

A committed mini-repo used by [`scripts/check-count-consistency.test.mjs`](../../check-count-consistency.test.mjs)
to lock the end-to-end verdict of the single-source `check-count-consistency.mjs` checker.

## History

This tree began (v2.30.0, WS-T9) as the corpus for `shell-parity-smoke.mjs`, which
proved the bash and PowerShell implementations of `check-count-consistency` computed the
**same verdict**, not just ran the same inventory. In v2.31.0 (WS-Z4) that pair was ported
to a single-source Node checker: the port was proven byte-identical to both retired shells
against this fixture, then the shells and the smoke were retired. The fixture now lives on
as the port's integration corpus - the closest thing to a real tracked tree that the unit
test can scan through `git ls-files`.

## Layout

```
scripts/fixtures/shell-parity/
  README.md              # this file (outside repo/, never scanned)
  repo/                  # the scanned mini-repo; check-count-consistency treats this as ROOT
    skills/{s-one,s-two,s-three}/SKILL.md   # 3 skill dirs  -> actual skills = 3
    commands/c-one.md                       # 1 command     -> actual commands = 1
    _workflows/{README.md,w-one.md}         # 1 workflow    -> actual workflows = 1 (README excluded)
    counts.md                               # stale number-before totals + a count-exempt section
    hazards.md                              # stale parenthetical / singular-noun / sub-count forms
```

`counts.md` hardcodes `12 skills`, `20 commands`, and `15 workflows` (all wrong on
purpose) plus a `count-exempt` section around a `99 skills` line that must NOT be flagged.
`hazards.md` adds the parenthetical (`Skills (40)`), singular-noun (`40 skill directories`),
and sub-count (`12 phase skills`, `Foundation Skills (7)`) forms - the awk RSTART/RLENGTH
while-loop paths the port had to reproduce without the clobber. A correct run flags exactly
eleven stale counts and exits 1.

## How the test runs it

`check-count-consistency.test.mjs` calls `runCheck(root)` with `root` pointed at `repo/`,
so the checker resolves `git ls-files` against the mini-repo and asserts the exact eleven
findings. The frontmatter-less skill dirs make every sub-count (phase/foundation/utility/tool)
zero, which is what lets the `hazards.md` sub-count lines flag deterministically.
