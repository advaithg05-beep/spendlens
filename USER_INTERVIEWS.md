# User Interviews

Three real conversations conducted between May 8-10, 2026 with potential users.
Each interview was 10-15 minutes via DM or call.

## Interview 1

**Name:** R.K. (preferred anonymity)
**Role:** CTO
**Company stage:** Early stage SaaS, 8 people, pre-revenue

**Summary:**
R.K. runs a small engineering team building a B2B analytics product. His team uses
Cursor Pro, Claude Pro, and GitHub Copilot Individual. He had no idea what his
total monthly AI spend was until I asked — he had to open three browser tabs to
check. His answer was roughly $180/month across the team.

**Direct quotes:**
- "I just pay the bills. I don't think about whether we're on the right plan."
- "I assumed Copilot and Cursor were redundant but my devs refused to give either up."
- "If something told me I was wasting money with actual numbers I would listen."

**Most surprising thing:**
He thought GitHub Copilot Individual was $19/month. It is actually $10/month.
He had been mentally anchoring on the Business plan price for years.

**What it changed about my design:**
This confirmed that pre-filling the monthly spend field with the official plan price
is the right call. Users do not know what they are paying. Showing them the official
price vs what they entered creates an immediate aha moment.

## Interview 2

**Name:** Divya S.
**Role:** Engineering Manager
**Company stage:** Series A, 35 people, $2M ARR

**Summary:**
Divya manages a team of 12 engineers. Her company recently got a budget cut memo
from the CFO asking all departments to reduce SaaS spend by 15%. She is now
actively looking at every tool her team uses. She uses ChatGPT Team, Cursor Business,
and has some engineers on Claude Pro individually.

**Direct quotes:**
- "The CFO wants a spreadsheet. I have no idea how to even start building that."
- "We put everyone on Cursor Business because it sounded more professional. I never
  checked if we actually needed the Business features."
- "I would share this with my CFO immediately if it gave me a clean breakdown I could screenshot."

**Most surprising thing:**
She did not know Cursor Business was $40/seat vs Pro at $20/seat. Her team of 12
on Business is $480/month. Switching to Pro would save $240/month with no feature
loss for her use case (coding, no admin features needed).

**What it changed about my design:**
This is why the results page needs to look good as a screenshot. The CFO use case
is real — engineering managers need to justify spend to finance people. I made the
hero savings number much larger and added the annual savings figure prominently.

## Interview 3

**Name:** Arjun M.
**Role:** Solo Founder
**Company stage:** Pre-revenue side project, 1 person

**Summary:**
Arjun is building a developer tool on weekends while working a full time job.
He uses Claude Pro and ChatGPT Plus simultaneously because he started them at
different times and never cancelled either. He spends $40/month on two tools
that largely overlap in capability.

**Direct quotes:**
- "I know I probably do not need both but I keep forgetting to cancel one."
- "Which one is actually better for coding? I use both randomly."
- "If something told me to cancel ChatGPT and just use Claude I would do it today."

**Most surprising thing:**
He had no strong preference between Claude and ChatGPT. He was paying $40/month
out of pure inertia not because he needed both. This is probably common among
solo founders who sign up for trials and forget to cancel.

**What it changed about my design:**
I added a redundancy check to the audit engine — if a user has both Claude Pro
and ChatGPT Plus with the same use case, the engine now flags this as redundant
and recommends keeping only the better fit for their use case. This was directly
inspired by Arjun's situation.