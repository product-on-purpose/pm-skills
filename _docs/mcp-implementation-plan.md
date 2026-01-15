# PM-Skills MCP Server: Implementation Plan

> Comprehensive summary and agentic coding plan for a best-practice Model Context Protocol (MCP) server implementation for pm-skills

**Version:** 1.0.0  
**Created:** January 2025  
**Status:** Planning

---

## Executive Summary

This document outlines the design and implementation plan for a Model Context Protocol (MCP) server that exposes the pm-skills repository as a structured, discoverable set of tools for AI assistants. The MCP server will enable AI agents to dynamically access PM skills, templates, and examples through a standardized protocol, making pm-skills universally accessible across all MCP-compatible platforms.

### Why MCP for PM-Skills?

**Current State:**
- Skills are file-based and require repository access
- Limited to platforms with file system or ZIP upload capabilities
- Manual skill discovery through AGENTS.md or documentation
- No dynamic querying or skill composition

**Future State with MCP:**
- Universal access across all MCP-compatible AI assistants
- Dynamic skill discovery and invocation
- Real-time template and example retrieval
- Composable workflows and bundles
- Version-controlled skill delivery
- Analytics on skill usage patterns

**Key Benefits:**
1. **Universal Compatibility** — Works with any MCP-compatible AI assistant
2. **Dynamic Discovery** — AI agents can search and discover skills contextually
3. **Real-time Updates** — Skills update without requiring re-upload or re-clone
4. **Better UX** — Native integration vs. file-based workarounds
5. **Analytics** — Understand which skills are most valuable
6. **Extensibility** — Foundation for advanced features (skill validation, custom outputs, etc.)

---

## Current Repository Architecture

### Repository Structure

```
pm-skills/
├── skills/                    # 24 PM skills organized by phase
│   ├── discover/              # Research phase (3 skills)
│   │   ├── competitive-analysis/
│   │   ├── interview-synthesis/
│   │   └── stakeholder-summary/
│   ├── define/                # Problem framing phase (4 skills)
│   │   ├── hypothesis/
│   │   ├── jtbd-canvas/
│   │   ├── opportunity-tree/
│   │   └── problem-statement/
│   ├── develop/               # Solution exploration phase (4 skills)
│   │   ├── adr/
│   │   ├── design-rationale/
│   │   ├── solution-brief/
│   │   └── spike-summary/
│   ├── deliver/               # Shipping phase (5 skills)
│   │   ├── edge-cases/
│   │   ├── launch-checklist/
│   │   ├── prd/
│   │   ├── release-notes/
│   │   └── user-stories/
│   ├── measure/               # Validation phase (4 skills)
│   │   ├── dashboard-requirements/
│   │   ├── experiment-design/
│   │   ├── experiment-results/
│   │   └── instrumentation-spec/
│   └── iterate/               # Learning phase (4 skills)
│       ├── lessons-log/
│       ├── pivot-decision/
│       ├── refinement-notes/
│       └── retrospective/
├── _bundles/                  # Workflow sequences (3 bundles)
│   ├── feature-kickoff.md
│   ├── lean-startup.md
│   └── triple-diamond.md
├── _docs/                     # Schema and documentation
│   ├── categories.md
│   └── frontmatter-schema.yaml
├── _templates/                # Templates for skill creation
├── commands/                  # Claude Code slash commands (24 commands)
├── AGENTS.md                  # Agent discovery manifest
├── README.md                  # Repository documentation
└── CONTRIBUTING.md            # Contribution guidelines
```

### Skill Structure

Each skill follows a consistent pattern:

```
skills/<phase>/<skill-name>/
├── SKILL.md                   # Instructions with YAML frontmatter
└── references/
    ├── TEMPLATE.md            # Output template structure
    └── EXAMPLE.md             # Completed real-world example
```

### Frontmatter Schema

All skills include structured metadata:

```yaml
---
name: skill-name               # Unique identifier
description: "..."             # What it does and when to use
license: Apache-2.0
metadata:
  category: specification      # PM activity type
  frameworks: [...]            # Applicable methodologies
  author: product-on-purpose
  version: "1.0.0"
---
```

---

## MCP Server Architecture

### Design Principles

1. **Skill-Centric Design** — Skills are first-class citizens, exposed as MCP tools
2. **Read-Only by Default** — Server provides read access to skills, templates, and examples
3. **Stateless Operation** — No session management required
4. **Version Awareness** — Support multiple skill versions
5. **Performance Optimized** — Cache skill metadata, lazy-load content
6. **Extensible** — Easy to add new capabilities without breaking changes

### MCP Server Components

```
pm-skills-mcp/
├── src/
│   ├── index.ts               # MCP server entry point
│   ├── server.ts              # Core MCP server implementation
│   ├── tools/                 # MCP tool implementations
│   │   ├── listSkills.ts      # List all available skills
│   │   ├── getSkill.ts        # Get complete skill content
│   │   ├── getTemplate.ts     # Get skill template
│   │   ├── getExample.ts      # Get skill example
│   │   ├── searchSkills.ts    # Search skills by criteria
│   │   ├── getBundle.ts       # Get workflow bundle
│   │   └── validateOutput.ts  # Validate generated output
│   ├── resources/             # MCP resource providers
│   │   ├── skillResource.ts   # Skill content as resources
│   │   └── bundleResource.ts  # Bundle content as resources
│   ├── prompts/               # MCP prompt templates
│   │   └── skillPrompts.ts    # Generate skill invocation prompts
│   ├── utils/                 # Shared utilities
│   │   ├── skillLoader.ts     # Load and parse skills
│   │   ├── frontmatterParser.ts # Parse YAML frontmatter
│   │   ├── searchEngine.ts    # Skill search implementation
│   │   └── cache.ts           # Caching layer
│   └── types/                 # TypeScript type definitions
│       ├── skill.ts
│       ├── bundle.ts
│       └── mcp.ts
├── tests/                     # Test suite
├── scripts/                   # Build and deployment scripts
├── package.json
├── tsconfig.json
└── README.md
```

---

## MCP Tools Specification

### Core Tools

#### 1. list_skills

**Description:** List all available PM skills with metadata

**Input Schema:**
```typescript
{
  phase?: "discover" | "define" | "develop" | "deliver" | "measure" | "iterate",
  category?: "research" | "problem-framing" | "ideation" | "specification" | "validation" | "reflection" | "coordination",
  framework?: "triple-diamond" | "lean-startup" | "design-thinking"
}
```

**Output:**
```typescript
{
  skills: Array<{
    name: string,
    description: string,
    phase: string,
    category: string,
    frameworks: string[],
    version: string,
    path: string
  }>,
  total: number
}
```

**Use Cases:**
- AI discovers available skills for a task
- User requests "What skills can help with problem framing?"
- Filter skills by methodology (e.g., "Show me Lean Startup skills")

---

#### 2. get_skill

**Description:** Retrieve complete skill content including instructions, template, and example

**Input Schema:**
```typescript
{
  name: string,              // Skill name (e.g., "prd")
  include?: {
    instructions?: boolean,  // Include SKILL.md (default: true)
    template?: boolean,      // Include TEMPLATE.md (default: true)
    example?: boolean        // Include EXAMPLE.md (default: true)
  }
}
```

**Output:**
```typescript
{
  skill: {
    name: string,
    metadata: SkillMetadata,
    instructions: string,
    template?: string,
    example?: string
  }
}
```

**Use Cases:**
- AI invokes a skill to generate output
- User requests "Use the PRD skill for my feature"
- Retrieve specific skill sections for reference

---

#### 3. search_skills

**Description:** Search skills by keywords, use cases, or content

**Input Schema:**
```typescript
{
  query: string,             // Free-text search query
  filters?: {
    phase?: string[],
    category?: string[],
    framework?: string[]
  },
  limit?: number             // Max results (default: 10)
}
```

**Output:**
```typescript
{
  results: Array<{
    name: string,
    description: string,
    relevanceScore: number,
    matchedTerms: string[],
    phase: string,
    category: string
  }>,
  total: number
}
```

**Use Cases:**
- "Find skills for writing requirements"
- "What skills help with experiments?"
- Semantic search based on user intent

---

#### 4. get_template

**Description:** Retrieve just the template for a specific skill

**Input Schema:**
```typescript
{
  name: string              // Skill name
}
```

**Output:**
```typescript
{
  skill: string,
  template: string,
  format: "markdown"
}
```

**Use Cases:**
- AI needs template structure without full instructions
- User wants to see output format before invoking skill
- Quick reference for experienced users

---

#### 5. get_example

**Description:** Retrieve just the example for a specific skill

**Input Schema:**
```typescript
{
  name: string              // Skill name
}
```

**Output:**
```typescript
{
  skill: string,
  example: string,
  format: "markdown"
}
```

**Use Cases:**
- AI references example for quality benchmarking
- User wants to see what good looks like
- Compare multiple skill examples

---

#### 6. get_bundle

**Description:** Retrieve a workflow bundle (sequence of skills)

**Input Schema:**
```typescript
{
  name: string              // Bundle name (e.g., "feature-kickoff")
}
```

**Output:**
```typescript
{
  bundle: {
    name: string,
    description: string,
    skills: Array<{
      name: string,
      order: number,
      required: boolean,
      description: string
    }>,
    workflow: string        // Markdown content
  }
}
```

**Use Cases:**
- "Run the feature kickoff workflow"
- Multi-step guided processes
- End-to-end PM workflows

---

#### 7. validate_output

**Description:** Validate generated output against skill quality checklist

**Input Schema:**
```typescript
{
  skill: string,            // Skill name
  output: string            // Generated content to validate
}
```

**Output:**
```typescript
{
  valid: boolean,
  checklist: Array<{
    item: string,
    passed: boolean,
    feedback?: string
  }>,
  suggestions: string[]
}
```

**Use Cases:**
- Quality assurance for generated artifacts
- AI self-validates output before presenting
- Learning feedback for improvement

---

### Advanced Tools (Future)

#### 8. compose_workflow

Create custom workflow from selected skills

#### 9. get_skill_diff

Compare skill versions to understand changes

#### 10. suggest_skills

AI-powered skill recommendations based on context

---

## MCP Resources Specification

### Resource URIs

Resources provide read-only access to skill content via standardized URIs:

```
pm-skills://skill/{skill-name}
pm-skills://skill/{skill-name}/template
pm-skills://skill/{skill-name}/example
pm-skills://bundle/{bundle-name}
pm-skills://metadata/categories
pm-skills://metadata/frameworks
```

### Resource Implementation

```typescript
interface SkillResource {
  uri: string,
  name: string,
  description: string,
  mimeType: "text/markdown",
  content: string
}
```

**Benefits:**
- Standard resource access pattern
- Cacheable by MCP clients
- Version-aware resource delivery
- Consistent with MCP best practices

---

## MCP Prompts Specification

### Prompt Templates

Pre-defined prompts help AI agents use skills effectively:

#### 1. Skill Invocation Prompt

```
Generate a {skill.name} for: {user_input}

Follow the instructions in the skill definition.
Use the template structure provided.
Reference the example for quality standards.

Quality checklist:
{skill.checklist}
```

#### 2. Bundle Workflow Prompt

```
Execute the {bundle.name} workflow:

Steps:
{bundle.steps}

For each step, use the corresponding skill and wait for user approval before proceeding.
```

#### 3. Skill Discovery Prompt

```
Help the user find the right PM skill for their task:

User request: {user_input}

Available skills:
{filtered_skills}

Ask clarifying questions if needed, then recommend the most appropriate skill(s).
```

---

## Implementation Phases

### Phase 0: Foundation (Week 1)

**Goal:** Set up project infrastructure and core architecture

**Tasks:**
- [ ] Create `pm-skills-mcp` repository
- [ ] Initialize Node.js/TypeScript project
- [ ] Set up MCP SDK dependencies
- [ ] Create project structure and directories
- [ ] Set up linting, formatting, testing framework
- [ ] Create initial README and documentation
- [ ] Define TypeScript types for skills, bundles, metadata

**Deliverables:**
- Working Node.js project with MCP SDK
- CI/CD pipeline (GitHub Actions)
- Initial documentation

**Acceptance Criteria:**
- `npm install` succeeds
- TypeScript compiles without errors
- Basic MCP server responds to introspection requests

---

### Phase 1: Core Tools (Week 2)

**Goal:** Implement essential MCP tools for skill access

**Tasks:**
- [ ] Implement skill loader utility
- [ ] Implement frontmatter parser
- [ ] Implement `list_skills` tool
- [ ] Implement `get_skill` tool
- [ ] Implement `get_template` tool
- [ ] Implement `get_example` tool
- [ ] Add caching layer for performance
- [ ] Write unit tests for all tools
- [ ] Create integration tests

**Deliverables:**
- Working MCP server with 4 core tools
- Comprehensive test suite (>80% coverage)
- Performance benchmarks

**Acceptance Criteria:**
- All tools return correct data from pm-skills repo
- Response times < 100ms for cached requests
- All tests pass
- MCP client can discover and invoke tools

---

### Phase 2: Search & Discovery (Week 3)

**Goal:** Enable intelligent skill discovery and search

**Tasks:**
- [ ] Implement search engine with keyword matching
- [ ] Implement `search_skills` tool
- [ ] Add relevance scoring algorithm
- [ ] Support filtering by phase, category, framework
- [ ] Add semantic search capabilities (optional)
- [ ] Implement skill recommendation logic
- [ ] Write search tests
- [ ] Document search syntax and capabilities

**Deliverables:**
- Working search tool
- Search relevance tuning
- Search documentation

**Acceptance Criteria:**
- Search returns relevant skills for common PM queries
- Filters work correctly
- Search performance < 200ms
- Handles typos and partial matches gracefully

---

### Phase 3: Bundles & Workflows (Week 4)

**Goal:** Support multi-skill workflows and bundles

**Tasks:**
- [ ] Implement bundle loader
- [ ] Implement `get_bundle` tool
- [ ] Create bundle execution prompts
- [ ] Support workflow state tracking
- [ ] Add bundle templates
- [ ] Write bundle tests
- [ ] Document bundle usage patterns

**Deliverables:**
- Working bundle tool
- Bundle execution framework
- Bundle documentation

**Acceptance Criteria:**
- All 3 existing bundles load correctly
- Bundle workflows execute in sequence
- State management works across skill invocations

---

### Phase 4: Quality & Validation (Week 5)

**Goal:** Add output validation and quality assurance

**Tasks:**
- [ ] Implement checklist parser from skills
- [ ] Implement `validate_output` tool
- [ ] Add quality scoring algorithm
- [ ] Create validation feedback templates
- [ ] Write validation tests
- [ ] Document validation capabilities

**Deliverables:**
- Working validation tool
- Quality scoring system
- Validation documentation

**Acceptance Criteria:**
- Validation detects missing required sections
- Quality scores correlate with manual review
- Feedback is actionable and specific

---

### Phase 5: Resources & Prompts (Week 6)

**Goal:** Implement MCP resources and prompt templates

**Tasks:**
- [ ] Implement resource providers
- [ ] Define resource URI scheme
- [ ] Create prompt templates for all skills
- [ ] Add resource caching
- [ ] Write resource tests
- [ ] Document resource usage

**Deliverables:**
- Working resource endpoints
- Prompt template library
- Resource documentation

**Acceptance Criteria:**
- All skills accessible via resources
- Prompts generate correct skill invocations
- Resources cacheable by MCP clients

---

### Phase 6: Polish & Launch (Week 7)

**Goal:** Production readiness and documentation

**Tasks:**
- [ ] Complete comprehensive documentation
- [ ] Create usage examples for popular MCP clients
- [ ] Add error handling and logging
- [ ] Performance optimization
- [ ] Security review
- [ ] Create deployment guide
- [ ] Publish to npm registry
- [ ] Announce launch

**Deliverables:**
- Production-ready MCP server
- Complete documentation
- Published npm package
- Launch announcement

**Acceptance Criteria:**
- Server runs reliably under load
- All documentation complete and tested
- Successfully tested with 3+ MCP clients
- npm package installable and runnable

---

## Technical Requirements

### Dependencies

**Core:**
- `@modelcontextprotocol/sdk` — Official MCP SDK
- Node.js >= 18.0.0
- TypeScript >= 5.0.0

**Utilities:**
- `gray-matter` — YAML frontmatter parsing
- `markdown-it` — Markdown processing (optional)
- `glob` — File system operations
- `dotenv` — Environment configuration

**Development:**
- `vitest` — Testing framework
- `eslint` — Linting
- `prettier` — Code formatting
- `tsx` — TypeScript execution

**Optional:**
- `openai` or `anthropic` — For semantic search (Phase 2+)
- `zod` — Runtime type validation

### Environment Configuration

```bash
# .env
PM_SKILLS_PATH=../pm-skills        # Path to pm-skills repository
MCP_SERVER_PORT=3000               # Server port (if applicable)
CACHE_TTL=3600                     # Cache time-to-live in seconds
LOG_LEVEL=info                     # Logging level
ENABLE_ANALYTICS=false             # Usage analytics (opt-in)
```

### Performance Targets

- **Skill List:** < 50ms (cached), < 200ms (uncached)
- **Get Skill:** < 100ms (cached), < 300ms (uncached)
- **Search:** < 200ms for typical queries
- **Memory:** < 100MB baseline, < 500MB under load
- **Concurrency:** Support 100+ concurrent requests

### Error Handling

All tools must handle:
- Missing skills gracefully
- Invalid input parameters
- File system errors
- Parse errors in skill files
- Version mismatches

Error responses follow MCP error schema:
```typescript
{
  error: {
    code: number,
    message: string,
    data?: any
  }
}
```

---

## Testing Strategy

### Unit Tests

**Coverage Target:** >80%

**Test Categories:**
- Skill loader functions
- Frontmatter parsing
- Search algorithms
- Tool implementations
- Resource providers
- Prompt generators

**Test Framework:** Vitest

```bash
npm test              # Run all tests
npm test:watch        # Watch mode
npm test:coverage     # Generate coverage report
```

### Integration Tests

**Test Scenarios:**
- MCP server starts successfully
- Client can discover tools
- Tool invocations return correct data
- Resource URIs resolve correctly
- Error handling works end-to-end

**Test Environment:** 
- Test instance of pm-skills repo
- Mock MCP client
- Isolated test environment

### End-to-End Tests

**Test with Real MCP Clients:**
- Claude Desktop
- Cline (VS Code extension)
- Continue.dev
- Custom MCP test client

**Test Workflows:**
- List and discover skills
- Invoke individual skills
- Execute complete bundles
- Search and filter skills
- Validate generated output

### Performance Tests

**Load Testing:**
- 100 concurrent skill requests
- 1000 searches per minute
- Bundle execution under load

**Tools:** `autocannon` or `k6`

### Security Testing

**Checks:**
- No arbitrary file system access
- Input validation and sanitization
- No code execution vulnerabilities
- Dependency vulnerability scanning

**Tools:** `npm audit`, `snyk`

---

## Deployment Options

### 1. npm Package (Recommended)

**Package Name:** `@product-on-purpose/pm-skills-mcp`

**Installation:**
```bash
npm install -g @product-on-purpose/pm-skills-mcp
```

**Usage:**
```bash
pm-skills-mcp --skills-path ./pm-skills
```

**Configuration:** MCP client config

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "pm-skills-mcp",
      "args": ["--skills-path", "/path/to/pm-skills"],
      "env": {}
    }
  }
}
```

### 2. Docker Container

**Image:** `ghcr.io/product-on-purpose/pm-skills-mcp:latest`

**Docker Compose:**
```yaml
services:
  pm-skills-mcp:
    image: ghcr.io/product-on-purpose/pm-skills-mcp:latest
    volumes:
      - ./pm-skills:/skills:ro
    environment:
      - PM_SKILLS_PATH=/skills
```

### 3. Standalone Binary (Future)

Using `pkg` or similar to create platform-specific binaries.

---

## Documentation Plan

### User Documentation

1. **README.md** — Quick start, installation, basic usage
2. **USAGE.md** — Detailed usage guide with examples
3. **TOOLS.md** — Complete tool reference
4. **RESOURCES.md** — Resource URI documentation
5. **PROMPTS.md** — Prompt template guide
6. **TROUBLESHOOTING.md** — Common issues and solutions

### Developer Documentation

1. **ARCHITECTURE.md** — System design and architecture
2. **CONTRIBUTING.md** — How to contribute
3. **API.md** — Internal API documentation
4. **TESTING.md** — Testing guide
5. **DEPLOYMENT.md** — Deployment instructions

### Integration Guides

1. **claude-desktop.md** — Claude Desktop setup
2. **vscode.md** — VS Code (Cline) integration
3. **continue.md** — Continue.dev integration
4. **custom-client.md** — Building custom MCP clients

---

## Success Metrics

### Launch Goals (Month 1)

- [ ] 100+ npm package downloads
- [ ] 3+ MCP clients tested and documented
- [ ] 10+ GitHub stars on MCP server repo
- [ ] Zero critical bugs reported
- [ ] <100ms average response time

### Growth Goals (Month 3)

- [ ] 500+ npm package downloads
- [ ] 5+ community contributions
- [ ] Featured in MCP registry
- [ ] Used by 50+ developers
- [ ] 10+ testimonials or case studies

### Quality Metrics (Ongoing)

- [ ] >90% test coverage
- [ ] <1% error rate
- [ ] <200ms p95 response time
- [ ] Zero security vulnerabilities
- [ ] >4.5/5 satisfaction rating

---

## Open Questions & Decisions

### Architecture Decisions

**Q1: Should the MCP server embed skills or reference external repo?**
- **Option A:** Bundle skills in npm package (simpler, versioned)
- **Option B:** Reference external pm-skills repo (live updates)
- **Recommendation:** Option A for v1.0, add Option B in v1.1

**Q2: How to handle skill versioning?**
- **Option A:** MCP server version tied to skills snapshot
- **Option B:** Support multiple skill versions simultaneously
- **Recommendation:** Option A initially, evolve to Option B

**Q3: Should we support skill customization?**
- **Option A:** Read-only access to canonical skills
- **Option B:** Allow user-specific skill overrides
- **Recommendation:** Option A for v1.0, consider Option B in v2.0

### Feature Prioritization

**Must Have (v1.0):**
- List skills, get skill, search skills
- Template and example access
- Bundle support
- Error handling

**Should Have (v1.0):**
- Output validation
- Resource URIs
- Prompt templates

**Nice to Have (v1.1+):**
- Semantic search
- Skill recommendations
- Analytics
- Custom workflows
- Multi-version support

### Integration Questions

**Q4: Which MCP clients to prioritize for testing?**
- **Primary:** Claude Desktop (highest usage)
- **Secondary:** Cline, Continue.dev
- **Tertiary:** Custom implementations

**Q5: Should we create client-specific helpers?**
- **Recommendation:** Generic MCP server, client-specific docs only

---

## Risk Mitigation

### Technical Risks

**Risk 1: MCP SDK Breaking Changes**
- **Mitigation:** Pin SDK version, test before updates, maintain changelog

**Risk 2: Performance Issues with Large Skill Set**
- **Mitigation:** Aggressive caching, lazy loading, performance testing

**Risk 3: Skill Format Changes**
- **Mitigation:** Version skill schema, maintain backward compatibility

### Adoption Risks

**Risk 4: Low MCP Client Adoption**
- **Mitigation:** Support multiple integration methods (file-based + MCP)

**Risk 5: Complex Setup Process**
- **Mitigation:** Excellent documentation, video tutorials, one-command install

### Maintenance Risks

**Risk 6: Skill Drift Between Repos**
- **Mitigation:** Automated sync, CI/CD validation, version pinning

**Risk 7: Support Burden**
- **Mitigation:** Comprehensive docs, FAQ, community support channels

---

## Next Steps

### Immediate Actions (This Week)

1. [ ] Review and approve this implementation plan
2. [ ] Create `pm-skills-mcp` repository
3. [ ] Set up project infrastructure (package.json, tsconfig, etc.)
4. [ ] Begin Phase 0 implementation

### Short-term Actions (Next 2 Weeks)

1. [ ] Complete Phase 0 (Foundation)
2. [ ] Complete Phase 1 (Core Tools)
3. [ ] Begin Phase 2 (Search)

### Medium-term Actions (Next Month)

1. [ ] Complete all implementation phases
2. [ ] Conduct user testing with beta testers
3. [ ] Finalize documentation
4. [ ] Prepare for launch

---

## References

### MCP Protocol

- [MCP Specification](https://modelcontextprotocol.io/specification)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Best Practices](https://modelcontextprotocol.io/docs/best-practices)

### PM-Skills

- [PM-Skills Repository](https://github.com/product-on-purpose/pm-skills)
- [Agent Skills Specification](https://agentskills.io/specification)
- [PM-Skills Documentation](https://github.com/product-on-purpose/pm-skills#readme)

### Related Work

- [Awesome MCP Servers](https://github.com/modelcontextprotocol/awesome-mcp)
- [MCP Server Examples](https://github.com/modelcontextprotocol/servers)

---

## Appendix A: Tool Usage Examples

### Example 1: Discovering Skills

**User:** "I need to write product requirements"

**AI MCP Request:**
```json
{
  "tool": "search_skills",
  "arguments": {
    "query": "product requirements specification",
    "limit": 5
  }
}
```

**MCP Response:**
```json
{
  "results": [
    {
      "name": "prd",
      "description": "Creates a comprehensive Product Requirements Document...",
      "relevanceScore": 0.95,
      "phase": "deliver",
      "category": "specification"
    },
    {
      "name": "user-stories",
      "description": "Generates user stories with clear acceptance criteria...",
      "relevanceScore": 0.82,
      "phase": "deliver",
      "category": "specification"
    }
  ]
}
```

### Example 2: Using a Skill

**User:** "Create a PRD for dark mode feature"

**AI MCP Request:**
```json
{
  "tool": "get_skill",
  "arguments": {
    "name": "prd",
    "include": {
      "instructions": true,
      "template": true,
      "example": true
    }
  }
}
```

**AI Then:** Generates PRD following retrieved instructions and template

### Example 3: Running a Bundle

**User:** "Run the feature kickoff workflow"

**AI MCP Request:**
```json
{
  "tool": "get_bundle",
  "arguments": {
    "name": "feature-kickoff"
  }
}
```

**AI Then:** Executes each skill in sequence, collecting user input between steps

---

## Appendix B: Directory Structure

Complete directory structure of the MCP server:

```
pm-skills-mcp/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── publish.yml
│       └── security.yml
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── config.ts
│   ├── tools/
│   │   ├── index.ts
│   │   ├── listSkills.ts
│   │   ├── getSkill.ts
│   │   ├── getTemplate.ts
│   │   ├── getExample.ts
│   │   ├── searchSkills.ts
│   │   ├── getBundle.ts
│   │   └── validateOutput.ts
│   ├── resources/
│   │   ├── index.ts
│   │   ├── skillResource.ts
│   │   └── bundleResource.ts
│   ├── prompts/
│   │   ├── index.ts
│   │   └── skillPrompts.ts
│   ├── utils/
│   │   ├── skillLoader.ts
│   │   ├── frontmatterParser.ts
│   │   ├── searchEngine.ts
│   │   ├── cache.ts
│   │   ├── logger.ts
│   │   └── validators.ts
│   └── types/
│       ├── skill.ts
│       ├── bundle.ts
│       ├── mcp.ts
│       └── index.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── README.md
│   ├── USAGE.md
│   ├── TOOLS.md
│   ├── ARCHITECTURE.md
│   └── guides/
├── examples/
│   ├── basic-usage.ts
│   └── custom-client.ts
├── scripts/
│   ├── build.sh
│   └── publish.sh
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── LICENSE
└── README.md
```

---

## Appendix C: Sample package.json

```json
{
  "name": "@product-on-purpose/pm-skills-mcp",
  "version": "1.0.0",
  "description": "MCP server for PM-Skills - Professional product management skills for AI assistants",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "bin": {
    "pm-skills-mcp": "dist/index.js"
  },
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts",
    "prepare": "npm run build"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "product-management",
    "pm",
    "skills",
    "ai",
    "claude",
    "assistant"
  ],
  "author": "Product on Purpose",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/product-on-purpose/pm-skills-mcp.git"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0",
    "gray-matter": "^4.0.3",
    "glob": "^10.3.10",
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "vitest": "^1.2.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## Conclusion

This implementation plan provides a comprehensive roadmap for building a best-practice MCP server for pm-skills. The phased approach ensures steady progress while maintaining quality and allowing for iteration based on feedback.

The MCP server will democratize access to professional PM skills, making them available to any AI assistant through a standardized protocol. This aligns with the pm-skills mission: **Ship better products, faster.**

**Next Action:** Review and approve this plan, then begin Phase 0 implementation.

---

*Document maintained by: Product on Purpose Team*  
*Last updated: January 2025*  
*Version: 1.0.0*
