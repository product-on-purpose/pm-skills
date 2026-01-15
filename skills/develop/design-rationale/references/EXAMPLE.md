---
artifact: design-rationale
version: "1.0"
created: 2026-01-14
status: complete
context: Mobile app navigation redesign for 50+ features
---

# Design Rationale: Primary Navigation Pattern for Mobile App

## Decision Summary

**Decision:** Use a bottom tab bar with 5 primary actions plus a "More" overflow menu for secondary features.
**Date:** January 2026
**Decision Makers:** Sarah (Design Lead), Marcus (PM), Chen (Engineering Lead)
**Status:** Implemented

---

## Context

### Problem Statement

Our mobile app has grown from 12 to 50+ features over three years. The current hamburger menu navigation has become a "junk drawer" where users struggle to find features. Task completion rates have dropped 15% in the past year, and support tickets about "where is X?" have increased 40%.

### User Need

Users need to quickly access core functionality without hunting through menus. Research shows our users typically need the same 5-7 features in 80% of sessions, but they can't remember where those features live in the current navigation.

### Constraints

| Constraint Type | Description |
|-----------------|-------------|
| Technical | Must work across iOS and Android without platform-specific implementations |
| Business | Cannot remove any features; deprecation requires 6-month notice to enterprise clients |
| Timeline | Must ship by end of Q1 to align with marketing campaign |
| Resources | 2 engineers, 1 designer available for implementation |
| Brand/Platform | Must follow both iOS HIG and Material Design enough to feel native on each |

### Design Principles Applied

- **Progressive disclosure:** Surface what's needed, hide what's not until relevant
- **Recognition over recall:** Users shouldn't have to remember where things are
- **Flexibility and efficiency:** Support both novice wayfinding and expert shortcuts

---

## Options Considered

### Option A: Enhanced Hamburger Menu with Categories

**Description:** Keep the hamburger menu but reorganize features into clear categories with icons. Add a "Favorites" section users can customize.

**Pros:**
- Minimal development effort—iterates on existing pattern
- Preserves screen real estate for content
- Familiar pattern for existing users
- Scales to unlimited features

**Cons:**
- Hidden navigation still requires recall ("where's Settings?")
- Extra tap to reach any feature
- User research shows low engagement with customization features
- Doesn't solve core discoverability problem

---

### Option B: Floating Action Button (FAB) with Radial Menu

**Description:** A prominent FAB in the bottom-right that expands to show 6 primary actions in a radial/fan pattern. Secondary features remain in a hamburger menu.

**Pros:**
- Highly discoverable—the FAB draws attention
- Quick access to primary actions (single tap to reveal)
- Visually distinctive and modern
- Works well for task-oriented apps

**Cons:**
- Radial menus have poor accessibility (hard to tap precisely)
- Only practical for 6-8 items; doesn't solve secondary navigation
- Covers content when expanded
- Not a standard pattern on iOS (feels Android-native)

---

### Option C: Bottom Tab Bar with More Menu (Selected)

**Description:** A persistent 5-item bottom tab bar showing the most-used features. The 5th tab is "More" which opens a organized list of all other features.

**Pros:**
- Most accessible pattern—large tap targets, always visible
- Industry standard across both iOS and Android
- Highly discoverable—users instantly see what app does
- Research shows 5 items is optimal for quick scanning
- "More" menu can be organized and searchable

**Cons:**
- Uses 50px of screen height permanently
- Only 4 primary features get direct access
- Requires difficult prioritization decisions
- "More" menu can still become cluttered

---

## Evaluation

### Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Discoverability | High | How easily can users find features? |
| Accessibility | High | Can users with motor or vision impairments use it? |
| Task efficiency | High | How quickly can users complete common tasks? |
| Scalability | Medium | Does it work as features grow? |
| Implementation effort | Medium | How much engineering work? |
| Platform consistency | Medium | Does it feel native on both iOS and Android? |

### Comparison Matrix

| Criterion | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Discoverability | Poor | Good | Excellent |
| Accessibility | Good | Poor | Excellent |
| Task efficiency | Poor | Good | Excellent |
| Scalability | Excellent | Poor | Good |
| Implementation effort | Low | Medium | Medium |
| Platform consistency | Good | Poor | Excellent |

### User Research Input

- Usability testing (n=8): 7/8 users found target feature faster with bottom nav than hamburger
- Analytics: Current top 5 features account for 78% of all feature usage
- Competitive analysis: 4/5 top-rated productivity apps use bottom tab navigation
- User quote: "I wish I didn't have to think about where things are. Just show me."

---

## Decision Rationale

### Why Option C?

The bottom tab bar provides the best balance of discoverability, accessibility, and task efficiency—our three highest-weighted criteria. While it sacrifices some screen real estate and limits direct access to 4 features, user research strongly validates that our users primarily need quick access to a small set of features.

The hamburger menu (Option A) fails to solve our core problem: users still have to remember where features are. The FAB approach (Option B) has significant accessibility concerns and would require iOS users to learn an Android-centric pattern.

### Key Differentiators

1. **Visibility:** Tab bar is always visible, creating constant awareness of primary capabilities
2. **Accessibility:** Large, persistent tap targets meet WCAG requirements without accommodation
3. **Mental model:** Users immediately understand app structure upon opening
4. **Cross-platform:** Pattern works identically on iOS and Android, reducing engineering complexity

### Dissenting Opinions

Chen (Engineering) initially preferred Option A due to lower implementation effort. After reviewing the user research showing 15% task completion decline, he agreed that Option C's benefits justified the additional work.

---

## Trade-offs Accepted

### What We Gave Up

| Trade-off | Impact | Why Acceptable |
|-----------|--------|----------------|
| Screen real estate | 50px permanently used by navigation | On modern devices, this is <5% of screen; content scrolls. User research showed no concern. |
| Secondary feature access | Requires 2 taps for "More" features | 78% of usage is top 5 features; acceptable friction for long tail |
| Feature count limitation | Can only highlight 4 features directly | Forces prioritization; actually a benefit for user clarity |

### Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Users can't find features in "More" | Medium | Add search within More menu; use clear categories |
| Wrong 4 features selected | Medium | A/B test feature selection; make configurable per user role |
| Enterprise pushback on change | Low | Provide documentation and training materials; grandfather existing muscle memory with shortcuts |

---

## Reversibility

**Is this decision reversible?** Yes, with effort

**Cost to reverse:** Significant—requires navigation rewrite and user re-education. Estimate 4-6 weeks engineering work plus user communication.

**Conditions that would warrant reverting:**
- Task completion rates don't improve after 3 months
- User complaints about tab bar exceed hamburger complaints (with statistical significance)
- A/B test shows no improvement in feature discoverability

---

## Follow-up Considerations

### Metrics to Monitor

- **Task completion rate:** Should improve from 65% to 75%+ for core flows
- **"Where is X?" support tickets:** Should decrease by 30%+
- **Feature discovery:** Track % of users who use features in "More" menu
- **Time to task completion:** Should decrease for top 5 features

### Future Decisions Required

- Which 4 features get tab bar placement (separate decision document)
- "More" menu organization and categories
- Whether to add user customization of tab bar items
- Tablet/iPad navigation pattern (larger screen may warrant different approach)

### Revisit Triggers

- If app feature count exceeds 100 and "More" becomes unwieldy
- If user research reveals significantly different feature usage patterns
- If platform conventions change substantially

---

## Supporting Materials

- [Figma designs: Bottom Navigation Exploration](https://figma.com/file/xxx)
- [User research: Navigation Usability Study](https://docs.google.com/xxx)
- [Analytics: Feature Usage Report Q4 2025](https://looker.com/xxx)
- [Related ADR: Mobile Framework Selection](../adr/adr-007.md)

---

## Decision History

| Date | Change | Author |
|------|--------|--------|
| 2026-01-14 | Initial decision documented | Sarah Chen |
| 2026-01-14 | Added user research findings | Sarah Chen |

---

*This rationale documents the reasoning at the time of decision. Context may change.*
