import streamlit as st
from agno.agent import Agent
from agno.run.agent import RunOutput
from agno.models.anthropic import Claude

# ── App Setup ────────────────────────────────────────────────────────────────

st.set_page_config(page_title="PM Agent", page_icon="📋", layout="wide")
st.title("AI Product Management Agent 📋")
st.caption(
    "Generate professional PM deliverables — problem statements, PRDs, "
    "and competitive analyses — powered by Claude."
)

anthropic_api_key = st.sidebar.text_input("Anthropic API Key", type="password")

# ── Skill Definitions ────────────────────────────────────────────────────────

SKILLS = {
    "Problem Statement": {
        "description": (
            "Creates a clear problem framing document with user impact, "
            "business context, and success criteria."
        ),
        "placeholder": (
            "Describe the problem area, target users, and any context you have.\n\n"
            "Example: Our mobile e-commerce checkout has a 73% abandonment rate "
            "compared to 45% on desktop. We see 2.3M mobile sessions per month."
        ),
        "agent_instructions": [
            "You are an expert product manager creating a Problem Statement.",
            "Follow these steps exactly:",
            "1. Identify the specific user segment experiencing the problem.",
            "2. Understand and articulate the pain points with severity and frequency.",
            "3. Establish business context — revenue, retention, growth impact.",
            "4. Define measurable success metrics with baselines and targets.",
            "5. Surface constraints (technical, resource, regulatory, dependencies).",
            "6. Capture open questions and assumptions needing validation.",
            "",
            "Format the output with these sections:",
            "## Problem Summary",
            "2-3 sentence essence of the problem, jargon-free.",
            "## User Impact",
            "Who is affected, how, and at what scale.",
            "## Business Context",
            "Strategic alignment, quantified business impact, why now.",
            "## Success Criteria",
            "Table: Metric | Current Baseline | Target | Timeline",
            "## Constraints & Considerations",
            "Technical, resource, regulatory, and dependency constraints.",
            "## Open Questions",
            "Assumptions needing validation and follow-up items.",
        ],
    },
    "PRD": {
        "description": (
            "Creates a comprehensive Product Requirements Document that aligns "
            "stakeholders on what to build, why, and how success is measured."
        ),
        "placeholder": (
            "Describe the feature or initiative, target users, and the problem "
            "it solves.\n\n"
            "Example: We need recurring tasks in our project management tool. "
            "34% of tasks are manually duplicated each week, and power users "
            "spend 2+ hours recreating them."
        ),
        "agent_instructions": [
            "You are an expert product manager creating a Product Requirements Document.",
            "Follow these steps exactly:",
            "1. Summarize the problem and why it matters now.",
            "2. Define goals and success metrics with baselines and targets.",
            "3. Outline the proposed solution at a high level.",
            "4. Detail functional requirements as testable user stories.",
            "5. Define scope boundaries — in scope, out of scope, future.",
            "6. Address technical considerations and integration points.",
            "7. Identify dependencies and risks with mitigation strategies.",
            "8. Propose timeline and milestones.",
            "",
            "Format the output with these sections:",
            "## Overview",
            "Problem statement, solution summary, target users.",
            "## Goals & Success Metrics",
            "Goals and metrics table: Metric | Baseline | Target | Timeline",
            "## User Stories",
            "Table: ID | Story | Priority",
            "## Scope",
            "In Scope, Out of Scope, Future Considerations.",
            "## Solution Design",
            "Functional requirements, UX notes, edge cases.",
            "## Technical Considerations",
            "Constraints, integrations, data requirements.",
            "## Dependencies & Risks",
            "Dependency table and risk matrix with mitigation.",
            "## Timeline & Milestones",
            "Key phases with target dates.",
            "## Open Questions",
            "Unresolved items with owners.",
        ],
    },
    "Competitive Analysis": {
        "description": (
            "Creates a structured competitive analysis comparing features, "
            "positioning, and strategy across competitors."
        ),
        "placeholder": (
            "Describe your product, target market, and 3-5 competitors to "
            "analyze.\n\n"
            "Example: We're building a project management tool for SMB teams "
            "(5-50 people). Key competitors: Asana, Monday.com, ClickUp, Notion."
        ),
        "agent_instructions": [
            "You are an expert product strategist creating a Competitive Analysis.",
            "Follow these steps exactly:",
            "1. Define the analysis scope — feature area, positioning, or pricing.",
            "2. Research each competitor using available knowledge.",
            "3. Build a feature comparison matrix (Full / Partial / None / Unknown).",
            "4. Analyze positioning on a 2x2 matrix with market-relevant axes.",
            "5. Assess genuine strengths and weaknesses for each competitor.",
            "6. Identify strategic implications and actionable recommendations.",
            "7. Note confidence levels — verified data vs. inference.",
            "",
            "Format the output with these sections:",
            "## Market Context",
            "Market size, growth, key trends.",
            "## Competitors Analyzed",
            "Table: Competitor | Type | Target Market | Size/Funding",
            "## Feature Comparison Matrix",
            "Grid comparing key capabilities across competitors.",
            "## Pricing Comparison",
            "Entry / mid / enterprise tiers by competitor.",
            "## Positioning Map",
            "2x2 positioning with axis labels and white-space identified.",
            "## Competitor Deep Dives",
            "Per competitor: overview, differentiator, strengths, weaknesses.",
            "## Strategic Recommendations",
            "Where to compete head-on, where to differentiate, messaging.",
            "## Sources & Confidence",
            "Table: Insight | Source | Confidence Level",
        ],
    },
}

# ── Skill Selector ───────────────────────────────────────────────────────────

skill_name = st.selectbox(
    "Select a PM skill",
    list(SKILLS.keys()),
    format_func=lambda s: f"{s} — {SKILLS[s]['description'][:60]}...",
)
skill = SKILLS[skill_name]

st.markdown(f"**{skill_name}:** {skill['description']}")

user_input = st.text_area(
    "Provide context for the agent",
    placeholder=skill["placeholder"],
    height=200,
)

# ── Generate ─────────────────────────────────────────────────────────────────

if st.button("Generate", type="primary"):
    if not anthropic_api_key:
        st.warning("Please enter your Anthropic API key in the sidebar.")
    elif not user_input.strip():
        st.warning("Please provide context for the agent.")
    else:
        with st.spinner(f"Generating {skill_name}..."):
            try:
                model = Claude(
                    id="claude-sonnet-4-20250514",
                    api_key=anthropic_api_key,
                )

                agent = Agent(
                    name=f"PM Agent — {skill_name}",
                    role=f"Senior product manager creating a {skill_name}",
                    model=model,
                    instructions=skill["agent_instructions"],
                    markdown=True,
                )

                response: RunOutput = agent.run(user_input)

                st.subheader(skill_name)
                st.markdown(response.content)

            except Exception as e:
                st.error(f"An error occurred: {e}")
else:
    st.info(
        "Select a skill, enter your context, and click **Generate** to start."
    )
