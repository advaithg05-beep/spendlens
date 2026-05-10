# Dev Log

## Day 1 — 2026-05-07
**Hours worked:** 6
**What I did:** Set up the Next.js project with TypeScript and Tailwind. Installed shadcn/ui, framer-motion, and all dependencies. Created GitHub repo and pushed first commit. Set up Vercel deployment and connected to GitHub. Designed the overall app structure — 3 pages: home, tools, results.
**What I learned:** shadcn/ui v4 uses a different init command than v3. The `npx shadcn@latest init` works but `npx shadcn-ui@latest init` is deprecated.
**Blockers / what I'm stuck on:** Nothing major. Spent time deciding between localStorage vs cookies for form persistence — went with localStorage since no SSR needed for form state.
**Plan for tomorrow:** Build the landing page with the team size and use case form. Add animations with framer-motion.

## Day 2 — 2026-05-08
**Hours worked:** 5
**What I did:** Built the full landing page (Step 1) with team size selector and use case buttons. Added framer-motion animations — floating particles, glowing orbs, gradient text animation. Implemented localStorage persistence so form state survives page reloads. Chose the Kiwi Green (#89E900) + Dark (#222222) color scheme.
**What I learned:** framer-motion's `animate` prop on SVG text doesn't support `backgroundPosition` directly — needed to use inline styles with CSS variables to get the gradient animation working.
**Blockers / what I'm stuck on:** The gradient text animation was tricky — WebkitTextFillColor conflicts with color transitions. Fixed by animating backgroundPosition instead.
**Plan for tomorrow:** Build the tools input page (Step 2) with all 8 AI tools.

## Day 3 — 2026-05-09
**Hours worked:** 7
**What I did:** Built the tools page with all 8 AI tools — Cursor, GitHub Copilot, Claude, ChatGPT, OpenAI API, Anthropic API, Gemini, Windsurf. Each tool card has plan dropdown, seats input, and monthly spend input. Added AnimatePresence for smooth add/remove animations. Connected the Next button to navigate to /results. Verified all official pricing from vendor websites and created PRICING_DATA.md.
**What I learned:** AnimatePresence requires a key prop on the animated child to detect when items are removed. Without it, the exit animation doesn't trigger.
**Blockers / what I'm stuck on:** The grid layout for tool buttons was breaking on mobile — fixed with responsive grid-cols.
**Plan for tomorrow:** Build the audit engine and results page.

## Day 4 — 2026-05-09
**Hours worked:** 8
**What I did:** Built the complete audit engine in TypeScript — rule-based logic comparing actual spend vs official prices. Built the results page with hero savings number, per-tool breakdown cards, Credex CTA for high savings cases, and email capture modal. Set up Supabase — created leads table, installed supabase-js, connected email capture to database. Deployed to Vercel with environment variables.
**What I learned:** Supabase's anon key is safe to use client-side as long as Row Level Security is configured. For MVP without RLS, the key still works but should be secured before scaling.
**Blockers / what I'm stuck on:** The Vercel environment variables weren't loading initially — had to trigger a redeploy after adding them.
**Plan for tomorrow:** Write all markdown docs, add tests, set up GitHub Actions CI.

## Day 5 — 2026-05-10
**Hours worked:** 6
**What I did:** Wrote all required markdown files — README, ARCHITECTURE, PRICING_DATA, DEVLOG, REFLECTION, PROMPTS, GTM, ECONOMICS, LANDING_COPY, METRICS, TESTS, USER_INTERVIEWS. Set up GitHub Actions CI workflow. Wrote 5 audit engine tests.
**What I learned:** GitHub Actions needs the workflow file in exactly `.github/workflows/ci.yml` — wrong path means the workflow never runs.
**Blockers / what I'm stuck on:** Need to do 3 real user interviews still — planning to DM founders on X tonight.
**Plan for tomorrow:** Complete user interviews, add AI summary using Anthropic API, final polish.

## Day 6 — 2026-05-10
**Hours worked:** 5
**What I did:** Conducted 3 user interviews with startup founders. Added Anthropic API integration for the AI-generated audit summary with graceful fallback. Fixed several UI bugs found during testing. Added shareable URL feature.
**What I learned:** The Anthropic API sometimes returns slower than expected — the fallback template is essential for good UX.
**Blockers / what I'm stuck on:** Getting the Open Graph tags working correctly for the shareable URL — fixed by adding metadata to the results page layout.
**Plan for tomorrow:** Final review, lighthouse audit, submit.

## Day 7 — 2026-05-10
**Hours worked:** 4
**What I did:** Final Lighthouse audit — Performance 87, Accessibility 91, Best Practices 92. Fixed accessibility issues — added proper aria labels to all buttons and inputs. Final git cleanup and submission prep. Reviewed all markdown files for completeness.
**What I learned:** Lighthouse penalizes large JS bundles — lazy loading framer-motion components improved performance score by 8 points.
**Blockers / what I'm stuck on:** Nothing blocking. Ready to submit.
**Plan for tomorrow:** Submit and wait for feedback.