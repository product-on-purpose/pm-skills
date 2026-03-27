# AI Product Management Agent 📋

An AI-powered product management agent that generates professional PM deliverables using Claude. Select a skill, provide context about your product or initiative, and get a structured output ready for stakeholder review.

## Skills

| Skill | What it produces |
|-------|-----------------|
| **Problem Statement** | Problem framing with user impact, business context, and success criteria |
| **PRD** | Product Requirements Document with user stories, scope, risks, and timeline |
| **Competitive Analysis** | Feature matrix, positioning map, and strategic recommendations |

## How It Works

Each skill encodes a senior PM's step-by-step process into agent instructions. The agent follows the methodology, asks the right questions of the input, and produces a structured deliverable matching industry-standard templates.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
   cd awesome-llm-apps/starter_ai_agents/ai_product_management_agent
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the app:**
   ```bash
   streamlit run pm_agent.py
   ```

4. **Enter your Anthropic API key** in the sidebar, select a skill, provide context, and click **Generate**.

## Example Outputs

### Problem Statement
> **Problem:** Mobile checkout abandonment at 73% vs 45% desktop across 2.3M monthly sessions — a $14.8M/month recovery opportunity for mid-market e-commerce.

The agent produces a full document with user impact, business context, success criteria (with baselines and targets), constraints, and open questions.

### PRD
> **Feature:** Recurring tasks for a project management tool where 34% of tasks are manually duplicated weekly.

The agent delivers a complete PRD with goals, user stories, scope boundaries, technical considerations, risk matrix, and a phased timeline.

### Competitive Analysis
> **Market:** Project management tools for SMB teams (5-50 people) vs Asana, Monday.com, ClickUp, and Notion.

The agent generates a feature comparison matrix, pricing analysis, 2x2 positioning map, per-competitor deep dives, and strategic recommendations.

## Tech Stack

- **[Agno](https://github.com/agno-agi/agno)** — lightweight agent framework
- **[Claude](https://www.anthropic.com/claude)** — LLM backbone (claude-sonnet-4-20250514)
- **[Streamlit](https://streamlit.io/)** — interactive web UI
