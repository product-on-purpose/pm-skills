<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: acceptance-criteria
version: "1.0"
repo_version: "2.10.0"
skill_version: "1.0.0"
created: 2026-04-11
status: sample
thread: storevine
context: Storevine B2B ecommerce platform — acceptance criteria for the Campaigns email template builder
---

## Scenario

Storevine's Campaigns feature includes an email template builder that lets merchants create branded marketing emails using a drag-and-drop editor. The PM wrote acceptance criteria for the builder component before sprint planning so engineering and QA have testable behavior specifications. The criteria cover the core editing flow, edge cases around content limits and image handling, error states for save failures, and non-functional requirements for performance and accessibility.

---

## Prompt

```
/acceptance-criteria

Feature: Campaigns — email template builder
The template builder lets merchants drag-and-drop content blocks (text, image, button, divider, product card) onto a canvas, customize styling, preview on desktop and mobile, and save templates for reuse across campaigns. Templates are stored per-merchant and can be duplicated.
```

---

## Output

---
artifact: acceptance-criteria
version: "1.0"
created: 2026-04-11
status: draft
---

# Acceptance Criteria: Campaigns Email Template Builder

## Story Context

Storevine merchants need to create branded marketing emails without writing HTML. The template builder provides a drag-and-drop canvas where merchants assemble content blocks, apply styling, preview results, and save reusable templates. Scope is limited to the builder UI and template persistence — campaign scheduling and send logic are covered separately.

## Happy Path

### AC-1: Merchant Can Add Content Blocks to Canvas

**Given** I am in the template builder with an empty canvas

**When** I drag a content block (text, image, button, divider, or product card) from the block palette onto the canvas

**Then** the block appears at the drop position and is immediately editable

### AC-2: Merchant Can Preview on Desktop and Mobile

**Given** I have added at least one content block to the canvas

**When** I toggle between desktop and mobile preview modes

**Then** the preview updates to show the template rendered at the selected viewport width (desktop: 600px, mobile: 320px) [fictional]

### AC-3: Merchant Can Save and Reuse a Template

**Given** I have built a template with at least one content block

**When** I click Save and provide a template name

**Then** the template is persisted to my merchant account, appears in My Templates, and can be selected when creating a new campaign

## Edge Cases

### AC-4: Block Reorder via Drag Within Canvas

**Given** I have three or more content blocks on the canvas

**When** I drag an existing block to a new position between two other blocks

**Then** the block moves to the new position and surrounding blocks reflow without content loss

### AC-5: Image Block with Oversized File

**Given** I am editing an image block

**When** I upload an image that exceeds the 5 MB file size limit [fictional]

**Then** the upload is rejected before transfer completes and I see an inline message stating the maximum allowed size

## Error States

### AC-7: Save Fails Due to Network Error

**Given** I click Save but the network request fails

**When** the server returns an error or the request times out

**Then** I see an error banner with a Retry button, and my in-progress template remains on the canvas without data loss

### AC-8: Product Card Block with Deleted Product

**Given** I have a template containing a product card block linked to a specific product

**When** the linked product is deleted from the Storevine catalog before the template is used

**Then** the product card block displays a placeholder state and the template can still be opened for editing

## Non-Functional Criteria

### AC-9: Builder Loads Within Performance Budget

**Given** I navigate to the template builder with a template containing up to 20 content blocks [fictional]

**When** the builder page loads

**Then** the canvas is interactive within 2 seconds on a median merchant connection (4G, 50 Mbps) [fictional]

## Notes

- Template rendering engine is shared with the campaign preview — changes to rendering affect both surfaces.
- Product card blocks depend on the Catalog API; availability is an external dependency.
