# Count fixture (deliberately stale)

This mini-repo actually contains three skill folders, one command file, and one
workflow file. The lines below hardcode WRONG totals on purpose so the dual-shell
parity smoke can prove both shells flag the same stale counts. If you change the
fixture's real contents, regenerate the golden with shell-parity-smoke.mjs --update.

This distribution claims to ship 12 skills across the suite.
The command surface is documented as 20 commands for callers.
Automation is described as 15 workflows end to end.

<!-- count-exempt:start -->
Historical note: this once claimed 99 skills, but this section is count-exempt, so
neither shell should flag the number above. It also gives the exempt-marker scan a
file to find, which both count-consistency implementations expect to exist.
<!-- count-exempt:end -->
