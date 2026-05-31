# Cynefin discrimination fixtures

Six labeled inputs with a pre-assigned expected domain, used to test whether the skill discriminates Cynefin domains rather than collapsing everything to Complicated. These fixtures are DISTINCT from the three shipped examples (`references/EXAMPLE.md`, `examples/02`, `examples/03`) so the skill is never graded on inputs it was taught on.

Run each input through the skill and score with `rubric.md`. Target: at least 5 of 6 domain-matched, with the correct posture (probes for Complex, stabilization for Chaotic, best practice for Clear) and the confidence ceiling respected (no High marker on a Complex or Chaotic output).

Distribution: Clear x1, Complicated x2, Complex x2, Chaotic x1.

---

## F1 - expected: Clear

**Input:**
> Users can't reset their own passwords. Every reset goes through support, about 20 tickets a week, all identical. We want a standard self-serve password-reset email flow.

**Why Clear:** cause and effect are obvious and undisputed, and a well-known best practice exists (self-serve reset). **Expected posture:** apply the best practice. **Ceiling:** High is allowed.

---

## F2 - expected: Complicated

**Input:**
> Checkout conversion dropped 8% the week after we shipped the new shipping-options step. Funnel data shows about 70% of the drop happens on that new step, and session recordings show users hesitating when the shipping cost is revealed.

**Why Complicated:** the cause is not obvious but is knowable with analysis, and the data already points at the mechanism. **Expected posture:** analyze, then commit. **Ceiling:** Medium-High. Not Complex, because the outcome is diagnosable, not emergent.

---

## F3 - expected: Complicated

**Input:**
> Our nightly data pipeline has started failing about three nights a week. The logs show the failures correlate with the new 2am ingestion job, and the warehouse hits a connection cap when both run together.

**Why Complicated:** a knowable engineering cause with a visible correlation; expertise resolves it. **Expected posture:** analyze, then commit. **Ceiling:** Medium-High.

---

## F4 - expected: Complex

**Input:**
> We launched in the German market six weeks ago. Signups are fine, but activation is strangely low and the behavior doesn't match any other region: users sign up, poke around, and churn before the aha moment. Sales has theories but they contradict each other.

**Why Complex:** novel context, emergent behavior that matches no prior region, and contradictory internal theories, so the outcome is genuinely unpredictable. **Expected posture:** safe-to-fail probes; instrument and sense. **Ceiling:** Medium-Low, no High marker. A correct plan contains probes.

---

## F5 - expected: Complex

**Input:**
> Engagement on our new AI summary feature is bimodal. A small group uses it constantly, most people ignore it, and we can't find what distinguishes them. Surveys contradict each other: power users love it, others say they "don't trust it" but can't say why.

**Why Complex:** the distinguishing variable is unknown and the signals conflict, so cause and effect are clear only in hindsight. **Expected posture:** probes to find the distinguishing factor. **Ceiling:** Medium-Low, no High marker.

---

## F6 - expected: Chaotic

**Input:**
> Production is down. Customers can't log in, on-call was paged 20 minutes ago, error rates are 100% on the auth service, and we don't know the cause yet. Leadership is asking for an ETA.

**Why Chaotic:** an active crisis with no discernible cause and effect yet; the immediate need is to stop the bleeding. **Expected posture:** act to stabilize first, then re-assess. **Ceiling:** Low. A correct plan leads with stabilization actions, not analysis.
