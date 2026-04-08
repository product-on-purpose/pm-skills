# PM Use Cases: Task-to-Diagram Quick Reference

This guide helps you find the right diagram type by starting from what you're trying to communicate, rather than from a diagram type you already know.

## Quick-Reference Table

| # | PM Task | Primary Type | Alternative |
|---|---------|-------------|-------------|
| 1 | Showing a decision or approval process | Flowchart | State |
| 2 | Specifying multi-service interactions | Sequence | Flowchart |
| 3 | Mapping feature lifecycle or status transitions | State | Flowchart |
| 4 | Tracking work stages | Kanban | State |
| 5 | Planning a release or sprint timeline | Gantt | Timeline |
| 6 | Documenting version history or milestones | Timeline | Gantt |
| 7 | Prioritizing backlog items (2D) | Quadrant | — |
| 8 | Showing allocation or composition | Pie | Treemap |
| 9 | Decomposing a problem or brainstorming | Mindmap | — |
| 10 | Documenting domain models or data relationships | ER | Class |
| 11 | Mapping API or object contracts | Class | ER |
| 12 | Showing system topology or infrastructure | Architecture | Flowchart |
| 13 | Visualizing flow quantities or budget allocation | Sankey | Pie |
| 14 | Showing hierarchical proportional data | Treemap | Pie |
| 15 | Displaying trends or time-series metrics | XY-Chart | — |

---

### Use Case 1: Showing a Decision or Approval Process

**Best diagram type:** Flowchart | **Alternative:** State

A flowchart naturally maps to how PMs think about approval gates: requests come in, conditions are evaluated, and outcomes branch. The diamond decision nodes make branching logic visible in a way that prose obscures.

**Example:** Feature request triage — an incoming request flows through feasibility check and priority assessment, then gets approved, deferred, or rejected.

```mermaid
flowchart TD
    A[New Feature Request] --> B{Feasibility Check}
    B -->|Feasible| C{Priority Assessment}
    B -->|Not Feasible| D[Rejected — Notify Requester]
    C -->|P0/P1| E[Approved — Add to Roadmap]
    C -->|P2| F{Capacity Available?}
    C -->|P3+| G[Deferred — Add to Backlog]
    F -->|Yes| E
    F -->|No| G
    E --> H[Assign to Sprint]
    D --> I[Archive with Rationale]
    G --> I
```

**When to use the alternative instead:** Use a State diagram when the emphasis is on the request's status over time rather than the branching logic of the triage process.

> See `diagram-catalog.md#flowchart` for full syntax reference.

---

### Use Case 2: Specifying Multi-Service Interactions

**Best diagram type:** Sequence | **Alternative:** Flowchart

Sequence diagrams show the back-and-forth between systems in time order. When you need to communicate "the app calls the API, which calls the payment service, which responds with a token," sequence diagrams make the call chain and response flow unmistakable.

**Example:** Mobile app checkout flow between the app, API gateway, payment service, and notification service.

```mermaid
sequenceDiagram
    actor User
    participant App as Mobile App
    participant API as API Gateway
    participant Pay as Payment Service
    participant Notify as Notification Service

    User->>App: Tap "Place Order"
    App->>API: POST /orders
    API->>Pay: Charge $49.99
    Pay-->>API: Payment confirmed (txn-7829)
    API->>Notify: Send order confirmation
    Notify-->>User: Email receipt
    API-->>App: 201 Created (order-id: 4412)
    App-->>User: Show confirmation screen
```

**When to use the alternative instead:** Use a Flowchart when the interaction is simple (two services, no branching) and you care more about the decision logic than the call sequence.

> See `diagram-catalog.md#sequence` for full syntax reference.

---

### Use Case 3: Mapping Feature Lifecycle or Status Transitions

**Best diagram type:** State | **Alternative:** Flowchart

State diagrams focus on what states a thing can be in and what triggers transitions between them. This is ideal for lifecycle questions: "Can a feature go from QA back to Development? Under what conditions?"

**Example:** Feature status lifecycle from idea through release.

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> InReview : Author submits
    InReview --> Approved : PM approves
    InReview --> Draft : Reviewer requests changes
    Approved --> InDevelopment : Sprint planning assigns
    InDevelopment --> InQA : Dev marks complete
    InQA --> InDevelopment : QA finds blocker
    InQA --> Staged : QA passes
    Staged --> Released : Deploy to production
    Released --> [*]
```

**When to use the alternative instead:** Use a Flowchart when you need to show the decision logic that determines transitions, rather than just listing the valid transitions themselves.

> See `diagram-catalog.md#state` for full syntax reference.

---

### Use Case 4: Tracking Work Stages

**Best diagram type:** Kanban | **Alternative:** State

Kanban diagrams show work items distributed across pipeline stages. They answer the question "Where is everything right now?" rather than "How does something move through stages?"

**Example:** Content creation pipeline for a product launch blog series.

```mermaid
---
config:
  kanban:
    ticketBaseUrl: ""
---
kanban-beta
    Backlog
        id1["SEO keyword research"]
        id2["Competitive comparison post"]
        id3["Customer success story"]
    Writing
        id4["Launch announcement draft"]
        id5["Migration guide v2 to v3"]
    Review
        id6["Performance benchmarks post"]
    Design
        id7["Feature walkthrough with screenshots"]
    Published
        id8["Getting started tutorial"]
        id9["API reference update"]
```

**When to use the alternative instead:** Use a State diagram when you need to document the rules governing how items move between columns, rather than showing a snapshot of current work distribution.

> See `diagram-catalog.md#kanban` for full syntax reference.

---

### Use Case 5: Planning a Release or Sprint Timeline

**Best diagram type:** Gantt | **Alternative:** Timeline

Gantt charts show tasks with durations, dependencies, and parallel tracks. They answer scheduling questions: "Can QA start before design finishes? When is the critical path?"

**Example:** Mobile app v3.0 release plan across 6 weeks.

```mermaid
gantt
    title Mobile App v3.0 Release Plan
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Design
        UX wireframes          :des1, 2026-04-07, 5d
        Visual design           :des2, after des1, 4d
        Design review           :des3, after des2, 2d

    section Development
        Core feature build      :dev1, after des2, 8d
        API integration         :dev2, after des1, 6d
        UI polish               :dev3, after des3, 4d

    section QA
        Test plan creation      :qa1, after des3, 2d
        Regression testing      :qa2, after dev1, 4d
        UAT                     :qa3, after qa2, 3d

    section Launch
        Staged rollout (10%)    :launch1, after qa3, 2d
        Full rollout            :milestone, after launch1, 0d
```

**When to use the alternative instead:** Use a Timeline when you need a simpler, milestone-focused view without task durations or dependencies — for example, a quarterly roadmap for executives.

> See `diagram-catalog.md#gantt` for full syntax reference.

---

### Use Case 6: Documenting Version History or Milestones

**Best diagram type:** Timeline | **Alternative:** Gantt

Timelines show milestones in chronological order without the complexity of durations and dependencies. They are ideal for "here is what we shipped and when" communications.

**Example:** Product evolution over 4 quarters showing key features shipped.

```mermaid
timeline
    title Acme Platform — 2025 Product Milestones
    section Q1
        Jan : Team onboarding dashboard
            : SSO integration
        Mar : Public API beta launch
    section Q2
        Apr : Mobile app v1.0
        Jun : Webhook support
            : Custom reporting
    section Q3
        Jul : Enterprise tier launch
        Sep : SOC 2 certification
    section Q4
        Oct : AI-assisted search
        Dec : Multi-region deployment
            : 10K customer milestone
```

**When to use the alternative instead:** Use a Gantt chart when stakeholders need to see how long each effort took, not just when milestones landed.

> See `diagram-catalog.md#timeline` for full syntax reference.

---

### Use Case 7: Prioritizing Backlog Items (2D)

**Best diagram type:** Quadrant | **Alternative:** —

Quadrant charts place items on two axes, making trade-offs visible at a glance. The classic PM use is effort vs. impact, but any two-dimensional prioritization (risk vs. value, urgency vs. importance) works.

**Example:** Q4 feature prioritization on effort vs. user impact axes.

```mermaid
quadrantChart
    title Q4 Feature Prioritization
    x-axis "Low Effort" --> "High Effort"
    y-axis "Low User Impact" --> "High User Impact"

    quadrant-1 "Do First"
    quadrant-2 "Plan Carefully"
    quadrant-3 "Reconsider"
    quadrant-4 "Quick Wins"

    "SSO support": [0.75, 0.85]
    "Dark mode": [0.25, 0.55]
    "Bulk export": [0.40, 0.80]
    "Admin audit log": [0.85, 0.70]
    "Emoji reactions": [0.15, 0.20]
    "CSV import": [0.30, 0.65]
    "Onboarding wizard": [0.60, 0.90]
    "Custom themes": [0.50, 0.15]
    "Keyboard shortcuts": [0.20, 0.45]
```

> See `diagram-catalog.md#quadrant` for full syntax reference.

---

### Use Case 8: Showing Allocation or Composition

**Best diagram type:** Pie | **Alternative:** Treemap

Pie charts show how a whole breaks into parts. They work well when the total adds up to 100% and you have 3-7 slices. Beyond that, smaller slices become unreadable.

**Example:** Engineering team time allocation across work categories.

```mermaid
pie title Engineering Time Allocation — Q1 2026
    "Feature Development" : 42
    "Tech Debt Reduction" : 20
    "Bug Fixes" : 15
    "Code Reviews" : 10
    "On-call & Support" : 8
    "Meetings & Planning" : 5
```

**When to use the alternative instead:** Use a Treemap when you have hierarchical categories (e.g., Feature Development breaks into sub-projects) or more than 7 slices.

> See `diagram-catalog.md#pie` for full syntax reference.

---

### Use Case 9: Decomposing a Problem or Brainstorming

**Best diagram type:** Mindmap | **Alternative:** —

Mindmaps radiate outward from a central topic, making them natural for brainstorming and problem decomposition. They show hierarchy without implying sequence or flow.

**Example:** User onboarding improvement — branches for key improvement areas with sub-items.

```mermaid
mindmap
  root((Onboarding Improvement))
    First Run Experience
      Welcome wizard
      Role-based setup flow
      Sample data sandbox
    Documentation
      Interactive tutorials
      Video walkthroughs
      Context-sensitive help
    Guided Tours
      Feature spotlight tooltips
      Progressive disclosure
      Achievement badges
    Email Sequences
      Day 1 welcome
      Day 3 key-feature nudge
      Day 7 check-in survey
      Day 14 advanced tips
```

> See `diagram-catalog.md#mindmap` for full syntax reference.

---

### Use Case 10: Documenting Domain Models or Data Relationships

**Best diagram type:** ER | **Alternative:** Class

Entity-relationship diagrams show the objects in your domain and how they relate, including cardinality (one-to-many, many-to-many). They are the standard for communicating data models to engineers.

**Example:** E-commerce domain model with core entities and cardinality.

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string email
        string name
        string tier
    }
    ORDER ||--|{ ORDER_LINE : contains
    ORDER {
        int order_id
        date created_at
        string status
    }
    ORDER_LINE }o--|| PRODUCT : references
    PRODUCT {
        int product_id
        string name
        decimal price
    }
    ORDER ||--|| PAYMENT : "paid via"
    PAYMENT {
        string method
        decimal amount
        string transaction_id
    }
    ORDER ||--o| SHIPMENT : "fulfilled by"
    SHIPMENT {
        string carrier
        string tracking_number
        date estimated_arrival
    }
```

**When to use the alternative instead:** Use a Class diagram when you need to show methods and interfaces (behavioral contracts) in addition to data attributes.

> See `diagram-catalog.md#er-entity-relationship` for full syntax reference.

---

### Use Case 11: Mapping API or Object Contracts

**Best diagram type:** Class | **Alternative:** ER

Class diagrams show objects with their attributes, methods, and relationships (inheritance, composition). Use them when you need to communicate behavioral contracts — not just "what data exists" but "what operations are available."

**Example:** Notification service API contracts showing services, templates, channels, and delivery status.

```mermaid
classDiagram
    class NotificationService {
        +send(template, channel, recipient) DeliveryStatus
        +schedule(template, channel, recipient, sendAt) string
        +cancel(notificationId) bool
    }
    class Template {
        +string id
        +string name
        +string body
        +render(variables) string
    }
    class Channel {
        <<interface>>
        +deliver(content, recipient) DeliveryStatus
    }
    class EmailChannel {
        +deliver(content, recipient) DeliveryStatus
    }
    class PushChannel {
        +deliver(content, recipient) DeliveryStatus
    }
    class DeliveryStatus {
        +string status
        +datetime sentAt
        +string errorMessage
    }
    NotificationService --> Template : uses
    NotificationService --> Channel : sends via
    Channel <|.. EmailChannel
    Channel <|.. PushChannel
    NotificationService --> DeliveryStatus : returns
```

**When to use the alternative instead:** Use an ER diagram when the focus is on data relationships and cardinality rather than methods and interfaces.

> See `diagram-catalog.md#class` for full syntax reference.

---

### Use Case 12: Showing System Topology or Infrastructure

**Best diagram type:** Architecture | **Alternative:** Flowchart

> **Note:** Architecture diagrams are **experimental** (Mermaid v11.1.0+). Verify support in your rendering environment before using.

Architecture diagrams show services, databases, and infrastructure grouped by logical boundaries. They communicate "what talks to what" at a system level with purpose-built iconography.

**Example:** SaaS platform topology with web, API, worker, and data tiers.

```mermaid
architecture-beta
    group web(cloud)[Web Tier]
    group api(cloud)[API Tier]
    group data(cloud)[Data Tier]

    service cdn(internet)[CDN] in web
    service webapp(server)[Web App] in web
    service gateway(server)[API Gateway] in api
    service workers(server)[Worker Pool] in api
    service db(database)[PostgreSQL] in data
    service cache(database)[Redis Cache] in data

    cdn:R --> L:webapp
    webapp:R --> L:gateway
    gateway:R --> L:db
    gateway:B --> T:cache
    gateway:B --> T:workers
    workers:R --> L:db
```

**When to use the alternative instead:** Use a Flowchart when architecture diagram support is unavailable in your environment, or when you need to show decision logic within the system flow.

> See `diagram-catalog.md#architecture` for full syntax reference.

---

### Use Case 13: Visualizing Flow Quantities or Budget Allocation

**Best diagram type:** Sankey | **Alternative:** Pie

> **Note:** Sankey diagrams are **experimental** (Mermaid v10.3.0+). Verify support in your rendering environment before using.

Sankey diagrams show flows between nodes with width proportional to quantity. They excel at showing how a budget, traffic, or resource pool splits and re-splits across categories.

**Example:** Marketing budget flow from total allocation down through channels and sub-channels.

```mermaid
sankey-beta

"Marketing Budget","Digital Marketing",450000
"Marketing Budget","Events & Conferences",200000
"Marketing Budget","Content Marketing",150000
"Marketing Budget","Brand & Creative",100000
"Marketing Budget","Tools & Analytics",50000
"Digital Marketing","Paid Search",180000
"Digital Marketing","Social Ads",150000
"Digital Marketing","Display & Retargeting",80000
"Digital Marketing","SEO Program",40000
"Content Marketing","Blog Production",60000
"Content Marketing","Video Content",50000
"Content Marketing","Whitepapers & Guides",40000
```

**When to use the alternative instead:** Use a Pie chart when you only need to show the top-level split without showing how categories subdivide further.

> See `diagram-catalog.md#sankey` for full syntax reference.

---

### Use Case 14: Showing Hierarchical Proportional Data

**Best diagram type:** Treemap | **Alternative:** Pie

> **Note:** Treemap diagrams are **experimental** (Mermaid v10.3.0+). Verify support in your rendering environment before using.

Treemaps show hierarchical data as nested rectangles sized by value. They reveal both the hierarchy and the relative magnitude of each segment simultaneously.

**Example:** Support ticket volume by product area and issue type.

```mermaid
%%{init: {"treemap": {"padding": 4}} }%%
treemap-beta
    root["Support Tickets — March 2026"]
        ["Payments (312)"]
            ["Failed transactions (142)"]
            ["Refund requests (98)"]
            ["Invoice issues (72)"]
        ["User Management (245)"]
            ["Login problems (120)"]
            ["Permission errors (85)"]
            ["Account deletion (40)"]
        ["Integrations (189)"]
            ["API errors (95)"]
            ["Webhook failures (54)"]
            ["OAuth setup (40)"]
        ["Reporting (87)"]
            ["Export failures (52)"]
            ["Dashboard bugs (35)"]
```

**When to use the alternative instead:** Use a Pie chart when data is flat (single level, no hierarchy) and has fewer than 7 categories.

> See `diagram-catalog.md#treemap` for full syntax reference.

---

### Use Case 15: Displaying Trends or Time-Series Metrics

**Best diagram type:** XY-Chart | **Alternative:** —

> **Note:** XY-Chart is **experimental** (Mermaid v10.0.0+). Verify support in your rendering environment before using.

XY-Charts display data points on x and y axes, supporting bar and line charts. They are the right choice for showing metrics over time — adoption curves, revenue trends, or sprint velocity.

**Example:** Weekly active users over 8 weeks post-launch for two product cohorts.

```mermaid
xychart-beta
    title "Weekly Active Users — Post-Launch"
    x-axis ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"]
    y-axis "Active Users" 0 --> 5000
    bar [820, 1450, 2100, 2800, 3200, 3600, 3900, 4200]
    line [820, 1450, 2100, 2800, 3200, 3600, 3900, 4200]
```

> See `diagram-catalog.md#xy-chart` for full syntax reference.

---

## Choosing Between Primary and Alternative

When the quick-reference table lists an alternative, here is the deciding factor:

| Primary | Alternative | Choose the alternative when... |
|---------|-------------|-------------------------------|
| Flowchart | State | Focus is on valid states, not decision logic |
| Sequence | Flowchart | Interaction is simple with no async or parallel calls |
| State | Flowchart | You need to show the decision logic behind transitions |
| Kanban | State | You need transition rules, not a snapshot of current work |
| Gantt | Timeline | Audience needs milestones only, not task durations |
| Timeline | Gantt | Audience needs to see durations and dependencies |
| Pie | Treemap | Data has nested categories or more than 7 segments |
| ER | Class | You need to show methods and behavioral contracts |
| Class | ER | Focus is on data relationships and cardinality |
| Architecture | Flowchart | Your environment does not support architecture diagrams |
| Sankey | Pie | You only need a single-level breakdown |
| Treemap | Pie | Data is flat with fewer than 7 categories |
