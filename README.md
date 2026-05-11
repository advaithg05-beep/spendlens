# SpendLens — AI Spend Audit Tool

SpendLens is a free web app that audits startup AI tool spending and surfaces savings opportunities. Built for startup founders and engineering managers who want to stop overpaying for AI tools like Cursor, Claude, ChatGPT, and GitHub Copilot.

🔗 **Live URL:** https://spendlens-phi.vercel.app

## Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Tools Page
![Tools Page](screenshots/tools.png)

### Results Page
![Results Page](screenshots/results.png)

## Quick Start

```bash
git clone https://github.com/advaithg05-beep/spendlens.git
cd spendlens
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000

## Decisions

1. **Next.js over plain React** — App Router gives us file-based routing for free, making /tools and /results pages trivial to add without a router library.

2. **Rule-based audit engine, not AI** — The audit math is hardcoded rules, not LLM calls. This makes it fast, predictable, and auditable by a finance person. AI is only used for the summary paragraph.

3. **localStorage for form persistence** — Simpler than a database for transient form state. Data persists across reloads without requiring auth.

4. **Supabase over Firebase** — Postgres gives us proper relational queries if we need to analyze leads later. Firebase's document model would be overkill for a simple leads table.

5. **Email gate after results, not before** — Showing value first and capturing email after dramatically increases conversion. Gating before the audit would reduce completions.