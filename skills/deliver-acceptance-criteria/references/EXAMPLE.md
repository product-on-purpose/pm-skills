---
artifact: acceptance-criteria
version: "1.0"
created: 2026-03-22
status: complete
context: Acceptance criteria for a guest checkout flow in an e-commerce storefront
---

# Acceptance Criteria: Guest Checkout

This example describes the acceptance criteria for a guest checkout flow that lets shoppers buy items without creating an account.

## Story Context

The checkout experience must let a shopper complete an order as a guest, enter shipping and payment details, and receive a confirmation after payment succeeds. The criteria below focus on the behavior a reviewer can observe in the UI and system responses.

## Happy Path

### AC-1: Guest Checkout Form Loads

**Given** I have items in my cart and I am not signed in

**When** I open the checkout page

**Then** I can enter shipping information, delivery method, and payment details without being prompted to create an account

### AC-2: Order Completes Successfully

**Given** I have entered valid shipping and payment details

**When** I submit the order

**Then** I see an order confirmation page with an order number and estimated delivery date

## Edge Cases

### AC-3: Promo Code Can Be Applied

**Given** I am on checkout and my cart qualifies for a discount

**When** I enter a valid promo code and apply it

**Then** the order summary updates to show the discount before I submit payment

### AC-4: Shipping Address Validation Supports International Formats

**Given** I enter a shipping address for a supported non-US destination

**When** I continue to the next step

**Then** the form accepts the address if it matches the country-specific validation rules

## Error States

### AC-5: Invalid Card Is Rejected

**Given** I have entered shipping information but the payment card is invalid

**When** I attempt to place the order

**Then** I see a clear inline error message and the order is not created

### AC-6: Inventory Changes During Checkout

**Given** an item in my cart becomes out of stock before I submit payment

**When** I place the order

**Then** I am shown which item failed, my cart remains available, and I can remove the item or choose a different variant

## Non-Functional Criteria

### AC-7: Checkout Responds Within the Performance Budget

**Given** I submit a valid order during normal operating conditions

**When** the checkout request is processed

**Then** the confirmation response is returned within 3 seconds for at least 95 percent of requests

### AC-8: Checkout Errors Are Accessible

**Given** a validation or payment error occurs

**When** the error message is shown

**Then** the message is announced by screen readers and the field with the error receives focus when applicable

## Notes

- Payment processor and inventory service availability are external dependencies.
- Fraud review and manual review flows are out of scope for this example.
