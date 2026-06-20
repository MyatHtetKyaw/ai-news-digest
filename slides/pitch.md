---
marp: true
paginate: true
transition: fade
# PechaKucha: 6 slides, 20s auto-advance. Do not change the count.
auto-advance: 20
---

<!-- slide 1 -->
# Who's my person?

* **Target User:** Developers and tech enthusiasts who want to stay current.
* **The Reality:** Hacker News surfaces hundreds of stories daily — great signal, but too much noise to sift through manually.
* **Their Goal:** Get a quick, curated briefing of what actually matters in tech today without doomscrolling.

---

<!-- slide 2 -->
# Their problem

* **Content Overload:** Hundreds of HN stories hit the front page every day — impossible to read them all.
* **No Synthesis:** The site ranks by votes, but doesn't group, summarize, or connect related stories.
* **The Result:** Developers either miss important news or waste 30+ minutes a day just scanning headlines.

---

<!-- slide 3 -->
# What I built

* **The Solution:** A Daily Tech News Digest — an Express web app that fetches top HN stories, categorizes them, and generates an AI summary.
* **What it does:** Pulls the top 30 stories via the HN Firebase API, groups them into topics (AI, Security, Startups…), and writes a 3-sentence daily briefing.
* **The Output:** A clean, dark-themed dashboard with glassmorphism UI, live status indicators, and one-click refresh.

---

<!-- slide 4 -->
# How I built it

* **MCP:** Used the filesystem MCP server to scaffold the project structure, manage templates, and iterate on the EJS views efficiently.
* **Skill:** Built a custom `digest-formatter` skill that categorizes raw HN stories into meaningful topic groups using keyword matching.
* **Agent:** Deployed an editor agent to handle iterative code changes — from wiring up the Express routes to polishing the UI with animations and gradients.

---

<!-- slide 5 -->
# Why it matters

* **Stay Informed, Fast:** A complete tech briefing in under 60 seconds — no tab-hopping required.
* **Smart Grouping:** Stories are clustered by topic so you can skip what doesn't matter and dive into what does.
* **Beautiful by Default:** The glassmorphism UI with animated gradient mesh makes daily reading feel like a premium experience.

---

<!-- slide 6 -->
# Done checklist

- [x] repo public
- [x] MCP + skill + agent used
- [x] report.md in team repo
