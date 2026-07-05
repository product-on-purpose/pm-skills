# Dual-shell parity fixture (WS-T9)

A committed mini-repo used by [`scripts/shell-parity-smoke.mjs`](../../shell-parity-smoke.mjs)
to prove the bash and PowerShell implementations of `check-count-consistency` compute the
**same verdict**, not just run the same inventory. Background: the two shells are one of the
frozen dual-shell pairs (see the freeze note in `scripts/validation-manifest.yaml` and
CONTRIBUTING.md). `check-validator-parity.mjs` proves inventory parity; this fixture proves
behavioral parity for the count checker until the v2.31.0 Node port (WS-Z4) retires the pair.

## Layout

```
scripts/fixtures/shell-parity/
  README.md              # this file (outside repo/, never scanned)
  expected-verdict.txt   # the golden normalized verdict (outside repo/, never scanned)
  repo/                  # the scanned mini-repo; check-count-consistency treats this as ROOT
    skills/{s-one,s-two,s-three}/SKILL.md   # 3 skill dirs  -> actual skills = 3
    commands/c-one.md                       # 1 command     -> actual commands = 1
    _workflows/{README.md,w-one.md}         # 1 workflow    -> actual workflows = 1 (README excluded)
    counts.md                               # DELIBERATELY stale counts + a count-exempt section
```

`counts.md` hardcodes `12 skills`, `20 commands`, and `15 workflows` (all wrong on purpose),
so a correct run flags exactly three stale counts and exits 1. It also carries a
`count-exempt` section around a `99 skills` line that neither shell may flag - this exercises
the exempt-marker path AND gives bash's marker scan a file to find (an empty match makes the
bash script `set -e` abort before the count scan).

## How the smoke runs it

`shell-parity-smoke.mjs` copies the real `scripts/check-count-consistency.{sh,ps1}` into
`repo/scripts/` at run time (gitignored, so it always tests the CURRENT scripts, never a stale
copy), runs each available shell so it resolves ROOT to `repo/`, normalizes the output to a
sorted finding set + exit code, and compares each shell to `expected-verdict.txt`.

## Regenerating the golden

If you intentionally change the fixture's real contents or the count-checker's output, run:

```
node scripts/shell-parity-smoke.mjs --update
```

`--update` refuses to write unless every available shell already agrees, so it cannot bake a
golden that hides a real divergence. Run it where both `bash` and `pwsh` are on PATH.
