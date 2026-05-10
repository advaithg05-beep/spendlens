# LLM Prompts

## AI Summary Prompt

Used in the results page to generate a 100-word personalized summary of the audit.

### The Prompt

You are a financial advisor specializing in SaaS cost optimization for startups.

A startup has completed an AI spend audit. Here is their data:
- Team size: {teamSize}
- Primary use case: {useCase}
- Total monthly spend on AI tools: {totalCurrentSpend}
- Total potential monthly savings: {totalMonthlySavings}
- Tools audited: {toolsSummary}

Write a 100-word personalized summary of their audit results. Be specific, direct, and actionable.
Mention their biggest savings opportunity by name.
Do not use generic filler phrases like "it's important to" or "you should consider".
End with one specific next step they can take today.
Write in second person (you/your).
Return only the summary paragraph, no headers or bullet points.

### Why Written This Way

- Specific data injection forces the model to be specific rather than generic
- Explicit length constraint prevents verbose outputs users will not read
- Anti-filler instruction improves output quality significantly
- One next step gives the user something actionable not just a summary
- No headers or bullets keeps the UI clean since summary is inline

### What Did Not Work

1. Asking for personalized advice without injecting real numbers produced generic output
2. Asking for a brief summary without a word count produced inconsistent lengths
3. Using system prompt only without a user message caused the model to ignore the data

### Fallback Template

Used when Anthropic API fails or times out:

Based on your audit, your team is spending {totalCurrentSpend} per month on AI tools
with {totalMonthlySavings} per month in potential savings identified.
Your biggest opportunity is {biggestSavingTool} where