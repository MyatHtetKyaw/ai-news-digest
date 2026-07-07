# AI News Digest

Multi-source AI and vibe coding news aggregator. Collects news from 5 sources, categorizes into 5 groups, auto-refreshes daily on Vercel.

**Live:** [ttps://ai-news-digest.vercel.app](https://ai-tech-news-digest.vercel.app/)

## Sources

| Source | What | Method |
|--------|------|--------|
| Newsletters | Latent Space + AI Engineer | RSS feeds |
| Community | Lobste.rs AI + VibeCoding tags | RSS feeds |
| GitHub Trending | Daily trending repos | HTML scraping |
| HackerNews | Top 20 stories | Firebase API |

## Categories

- AI Tools & Products
- Vibe Coding
- AI Research
- AI Business & Funding
- AI Ethics & Regulation

## Tech Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS)
- ISR with 1-hour revalidation
- Vercel cron jobs for auto-refresh
- `rss-parser` for RSS feeds
- `cheerio` for HTML scraping
- Keyword-based categorization
- In-memory + file-based caching

## Getting Started

```bash
cd next-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
cd next-app
vercel deploy --prod
```

## Project Structure

```
next-app/src/
├── app/
│   ├── page.tsx              # Main dashboard (server component)
│   ├── layout.tsx            # Root layout with dark theme
│   ├── globals.css           # Dark theme, animated background
│   └── api/
│       ├── news/route.ts     # GET /api/news - cached data
│       └── cron/route.ts     # GET /api/cron - Vercel cron trigger
├── lib/
│   ├── sources/
│   │   ├── newsletter.ts     # Latent Space + AI Engineer RSS
│   │   ├── twitter.ts        # Lobste.rs AI community RSS
│   │   ├── github.ts         # GitHub trending scrape
│   │   ├── reddit.ts         # Lobste.rs vibecoding RSS
│   │   └── hackernews.ts     # HN Firebase API
│   ├── categories.ts         # Keyword-based classifier
│   ├── cache.ts              # In-memory + /tmp file cache
│   ├── aggregator.ts         # Main orchestrator
│   └── types.ts              # Shared TypeScript types
├── components/
│   ├── Header.tsx            # App header with source counts
│   ├── CategoryTabs.tsx      # Tab switching between categories
│   ├── CategoryGroup.tsx     # Category section
│   └── NewsCard.tsx          # Individual news item card
└── vercel.json               # Cron config: daily at midnight
```
