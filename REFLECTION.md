# Reflection

## 1. The Hardest Bug I Hit This Week

The hardest bug was the framer-motion gradient text animation not working on the SpendLens logo. I wanted the gradient to animate smoothly across the text but WebkitTextFillColor was overriding the color transitions completely.

My hypotheses were:
- First I thought it was a CSS specificity issue so I tried adding important flags — did not work
- Then I thought framer-motion could not animate CSS custom properties — partially true
- Finally I realized WebkitTextFillColor set to transparent was blocking all color-based animations

What worked was animating backgroundPosition instead of color directly. I set the background to a 200% wide gradient and animated its position from 0% to 100% and back. This gave the shimmer effect I wanted without touching the color property at all. The key learning was that CSS text gradient techniques have specific constraints that conflict with JS animation libraries.

## 2. A Decision I Reversed Mid-Week

I originally built the team size input as a dropdown select element. Halfway through Day 2 I reversed this and switched to a grid of clickable buttons instead.

What made me reverse it: I tested the form myself and the dropdown felt cold and corporate. The whole point of SpendLens is to feel fast and modern. Clicking a button that highlights with a green glow feels much more satisfying than opening a dropdown. It also makes the selection state immediately visible without having to read the dropdown label.

The trade-off is that buttons take more vertical space than a dropdown. I accepted this because the form is short enough that scrolling is not a problem on mobile.

## 3. What I Would Build in Week 2

In week 2 I would build three things in this order:

First, the AI-powered summary using the Anthropic API properly — with streaming so the text appears word by word instead of all at once. This makes the results page feel alive and impressive.

Second, the benchmark mode — showing how your AI spend per developer compares to companies of similar size. This requires collecting enough audit data to have real benchmarks but even mocked data would make the results more compelling and shareable.

Third, a proper shareable URL with Open Graph preview images generated server-side using Vercel OG. Right now the shareable URL works but the link preview when shared on Twitter or Slack is just the default SpendLens page. A custom OG image showing the savings number would dramatically increase click-through rates on shared links.

## 4. How I Used AI Tools

I used Claude as my primary coding assistant throughout this project.

For what tasks: generating boilerplate component structure, debugging CSS animation issues, writing the markdown documentation files, and helping think through the audit engine logic.

What I did not trust AI with: the actual pricing numbers in PRICING_DATA.md — I verified every single number myself from official vendor pages. I also did not trust AI with the audit engine reasoning — I wrote every rule myself and verified the math manually.

One specific time the AI was wrong: Claude suggested using framer-motion's layoutId prop to animate between the step 1 and step 2 pages as a shared element transition. I tried this and it caused a hydration error in Next.js App Router because layoutId requires components to be mounted simultaneously. I caught this because the console showed a clear hydration mismatch error and the animation was completely broken. The fix was to use simple page transition animations instead of shared element transitions.

## 5. Self Rating

**Discipline: 7/10**
I worked consistently across all 7 days but I underestimated how long the markdown documentation would take and had to rush some files on the final day.

**Code Quality: 7/10**
The component structure is clean and TypeScript types are used throughout. However I have inline styles mixed with Tailwind classes which is inconsistent and would need refactoring in a real production codebase.

**Design Sense: 8/10**
The Kiwi Green and Dark color scheme is bold and distinctive. The animations feel premium not gimmicky. The results page in particular looks good as a screenshot which was a specific requirement.

**Problem Solving: 8/10**
I debugged the gradient animation issue methodically by forming hypotheses and testing them one at a time. I also made good architectural decisions like keeping the audit engine rule-based instead of AI-powered.

**Entrepreneurial Thinking: 7/10**
I understood the business context well — SpendLens as a lead gen tool for Credex not just a coding exercise. The GTM and Economics docs show real thinking about distribution and unit economics. I could have done more user research before building.