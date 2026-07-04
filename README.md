# 📰 Tech News Digest

A clean, dark-themed web app that fetches the top 10 trending stories from [Hacker News](https://news.ycombinator.com) and displays them grouped by topic — refreshed on every page load.

## Features

- **Live data** — pulls directly from the Hacker News API on each request
- **Topic grouping** — stories are automatically categorized into sections (e.g. AI/ML, Web Dev, Open Source)
- **Daily summary** — an at-a-glance overview of what's trending
- **Dark UI** — GitHub-inspired dark theme, easy on the eyes
- **Zero config** — no API keys or database needed
<img width="1280" height="800" alt="Tech News Digest - hero section" src="images/screenshot-viewport.png" />
<img width="1280" height="800" alt="Tech News Digest - stories list" src="images/screenshot-stories.png" />



## Tech Stack

- **Runtime:** Node.js
- **Server:** Express
- **Templating:** EJS
- **Data source:** [Hacker News Firebase API](https://github.com/HackerNews/API)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later

### Installation

```bash
git clone https://github.com/MyatHtetKyaw/tech-news-digest.git
cd tech-news-digest
npm install
```

### Run

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tech-news-digest/
├── app.js              # Express server and main route
├── lib/
│   ├── fetchStories.js # Fetches top stories from HN API
│   ├── formatDigest.js # Groups stories by topic
│   └── summarizer.js   # Generates a daily summary
├── views/
│   └── index.ejs       # HTML template (dark-themed UI)
└── package.json
```

## How It Works

1. On each page load, `fetchStories.js` hits the HN API and grabs the top 10 stories.
2. `formatDigest.js` categorizes them into topic groups.
3. `summarizer.js` produces a short summary of the day's highlights.
4. Everything is rendered server-side with EJS and served as a single page.
