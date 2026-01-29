# User Stories: Loot Ledger Module

> Skill: [deliver-user-stories](/skills/deliver-user-stories/)

---

## Epic: Loot Ledger

Enable transparent, auditable treasure distribution that eliminates payment disputes between party members.

---

## User Stories

### Story 1: Record Loot Discovery

**As a** party leader
**I want to** log treasure as we find it during a quest
**So that** there's a shared record before anyone can pocket items

#### Acceptance Criteria

- [ ] Can add items via quick-entry (name + estimated value)
- [ ] Can photograph items using scrying mirror integration
- [ ] All party members receive notification of new entries
- [ ] Entries are timestamped and immutable once confirmed
- [ ] Works offline in dungeon (syncs when back in range of sending stones)

#### Technical Notes

- Offline-first architecture required; dungeons block most scrying
- Image storage: max 500kb per item (compressed via Reduce spell)

---

### Story 2: Propose Split Method

**As a** party leader
**I want to** propose how to divide the loot
**So that** everyone can review and agree before distribution

#### Acceptance Criteria

- [ ] Choose from split templates: Equal, Contribution-based, Need-before-greed
- [ ] Manually assign specific items to specific members
- [ ] Set aside guild tithe percentage (configurable 0-20%)
- [ ] Preview shows each member's share in gold pieces
- [ ] Cannot finalize until all members have viewed proposal

#### Technical Notes

- "Contribution-based" uses quest damage/healing logs if available
- Need-before-greed requires class/proficiency data from profiles

---

### Story 3: Vote on Distribution

**As a** party member
**I want to** approve or contest the proposed split
**So that** I have a voice before loot is distributed

#### Acceptance Criteria

- [ ] See detailed breakdown of my share vs. others
- [ ] One-tap approve with optional comment
- [ ] Contest button opens dispute flow (links to Story 6)
- [ ] See real-time vote status (who has approved)
- [ ] Deadline for voting (configurable, default 48 hours)
- [ ] Auto-approve if no response by deadline (with advance warning)

---

### Story 4: Execute Distribution

**As a** party leader
**I want to** finalize and execute the approved distribution
**So that** everyone receives their fair share

#### Acceptance Criteria

- [ ] Only available after all members approve (or deadline passes)
- [ ] Physical items marked with recipient; gold transferred via Ledger integration
- [ ] Each member receives detailed receipt (sending stone notification)
- [ ] Distribution recorded permanently on quest record
- [ ] Cannot be reversed (new transaction required to correct errors)

---

### Story 5: Review Loot History

**As an** adventurer
**I want to** see my loot history across all quests
**So that** I can track my earnings and spot patterns

#### Acceptance Criteria

- [ ] Filter by date range, quest type, party
- [ ] Summary stats: total gold earned, average per quest, top items
- [ ] Export to parchment format (PDF) for tax wizards
- [ ] Compare my earnings to anonymized platform averages

---

### Story 6: Dispute Resolution

**As a** party member
**I want to** formally contest a loot decision
**So that** disagreements are resolved fairly

#### Acceptance Criteria

- [ ] Submit dispute with written explanation
- [ ] Attach evidence (screenshots, chat logs, damage reports)
- [ ] All parties notified; distribution paused
- [ ] Option 1: Party mediates internally (72-hour window)
- [ ] Option 2: Escalate to T&Q arbitration (fee: 5% of disputed value)
- [ ] Arbitration decision is final and binding
- [ ] Dispute history visible on adventurer profiles (last 12 months)

#### Technical Notes

- Arbitration handled by verified Guildmaster-tier users (reputation > 95%)
- Disputes affect Trust Score (visible on profiles)

---

## Story Map

```
                    QUEST FLOW
    ─────────────────────────────────────────────────
    │ Discovery │ Proposal │ Voting │ Distribution │
    ─────────────────────────────────────────────────
         │           │         │          │
         ▼           ▼         ▼          ▼
      Story 1    Story 2   Story 3    Story 4
         │                     │
         └───────────┬─────────┘
                     ▼
                  Story 6
                 (Disputes)

              ─────────────
              │ Post-Quest │
              ─────────────
                    │
                    ▼
                Story 5
               (History)
```

---

## Priority & Sequencing

| Story | Priority | Sprint | Dependencies |
|-------|----------|--------|--------------|
| Story 1: Record Loot | P0 | 1 | None |
| Story 2: Propose Split | P0 | 1 | Story 1 |
| Story 3: Vote | P0 | 2 | Story 2 |
| Story 4: Execute | P0 | 2 | Story 3 |
| Story 5: History | P1 | 3 | Story 4 |
| Story 6: Disputes | P1 | 3 | Story 3 |

---

## Open Questions

1. Should NPCs (hirelings, retainers) be includable in splits?
2. How do we handle cursed items that seem valuable at discovery?
3. Integration with existing guild treasury systems?
