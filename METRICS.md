# Metrics

## North Star Metric

**Audits completed per week**

Why: An audit completion means a user got real value from the tool. It's the moment value is delivered — before email capture, before Credex CTA. Everything else (leads, consultations, revenue) flows from this number. DAU would be wrong because people use this tool once per quarter. Email captures would be wrong because they're downstream of value. Audits completed is the purest signal that the product is working.

## 3 Input Metrics That Drive the North Star

**1. Landing page → audit start rate**
- Definition: % of visitors who click "Next: Add Your AI Tools"
- Why it matters: If the landing page doesn't convert, no audits get completed
- Target: 40%+
- What to do if low: Test headline copy, reduce form friction on Step 1

**2. Audit start → audit completion rate**
- Definition: % of users who start adding tools and click "Run My Audit"
- Why it matters: Drop-off here means the tools form is too complex or confusing
- Target: 60%+
- What to do if low: Reduce number of required fields, add progress indicator

**3. Audit completion → email capture rate**
- Definition: % of users who complete an audit and then save their report
- Why it matters: Email captures are our leads — this is the business metric
- Target: 25%+
- What to do if low: Improve results page design, make savings number more prominent

## What to Instrument First

1. Page views on `/`, `/tools`, `/results` — funnel drop-off analysis
2. Audit completion event — fires when user lands on /results with valid data
3. Email capture event — fires when user submits email in modal
4. Savings bucket distribution — how many audits show $0, $1-100, $100-500, $500+ savings
5. Tool popularity — which tools appear most in audits (informs pricing data updates)

## Pivot Trigger

If after 500 audit completions:
- Email capture rate is below 10% → the results page isn't delivering enough perceived value. Pivot: improve audit reasoning quality, add more specific recommendations.
- Average savings shown is below $50 → the audit engine is too conservative or users have already optimized. Pivot: add more tools, add API usage analysis.
- 0 Credex consultation bookings → the Credex CTA isn't resonating. Pivot: change positioning, offer a different CTA (e.g. "get a discount code" instead of "book a call").

A pivot decision should be made at 500 completions, not 50. Small sample sizes give noisy signals.