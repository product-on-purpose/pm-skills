# Hazard fixture (deliberately stale; exercises the awk RSTART/RLENGTH while-loop paths)

Every number below is wrong on purpose. These forms drive the parenthetical,
singular-noun, and sub-count checks - the awk match()-driven loops that had to save the
outer span before the nested number match (the class that hung v2.27.1 CI). Two matches
on one line prove the loop advances instead of rescanning the same span forever.

Parenthetical totals, two on one line: Skills (40) and Commands (20).
Singular-noun skills: this repo ships 40 skill directories end to end.
Singular-noun commands: the tree documents 47 command docs in total.
Sub-count number-before phase: the suite groups 12 phase skills together.
Sub-count number-before tool: it also lists 9 tool skills as a family.
Sub-count parenthetical, two on one line: Foundation Skills (7) and Utility Skills (13).
