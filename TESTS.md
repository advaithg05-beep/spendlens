# Tests

## Audit Engine Tests

All tests are in the file: `__tests__/auditEngine.test.ts`

Run with:
npm test

## Test List

### Test 1 — Overpaying vs official price
File: __tests__/auditEngine.test.ts
Covers: User paying more than official plan price should be flagged as overspending
Expected: savings > 0, status = overspending

### Test 2 — Cursor Business with 2 seats
File: __tests__/auditEngine.test.ts
Covers: User on Cursor Business with 2 seats should be recommended to downgrade to Pro
Expected: action = Downgrade to Cursor Pro, savings = 40

### Test 3 — Optimal spend
File: __tests__/auditEngine.test.ts
Covers: User paying exact official price should be marked as optimal
Expected: savings = 0, status = optimal

### Test 4 — Claude Team with 2 seats
File: __tests__/auditEngine.test.ts
Covers: User on Claude Team with only 2 seats should be recommended Claude Pro
Expected: action = Switch to Claude Pro, savings > 0

### Test 5 — High spender Credex recommendation
File: __tests__/auditEngine.test.ts
Covers: User spending over $200/month with no other savings should get Credex recommendation
Expected: action = Buy through Credex credits, savings > 0