import Parser from "rss-parser";
import { NewsItem } from "../types";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "AI-News-Digest/1.0",
  },
});

// Reddit blocks programmatic access. Using Lobste.rs as community alternative.
const COMMUNITY_FEEDS = [
  { url: "https://lobste.rs/t/ai.rss", name: "Lobste.rs AI" },
  { url: "https://lobste.rs/t/vibecoding.rss", name: "Lobste.rs VibeCoding" },
];

export async function fetchReddit(): Promise<NewsItem[]> {
  // Deduplicate against twitter source (also uses lobste.rs)
  // This source focuses on the vibecoding tag specifically
  try {
    const feed = await parser.parseURL("https://lobste.rs/t/vibecoding.rss");
    return (feed.items || []).slice(0, 10).map((item) => ({
      id: `community-vc-${item.guid || item.link}`,
      title: item.title || "Untitled",
      url: item.link || "",
      source: "reddit" as const,
      author: item.creator || "lobste.rs",
      description: item.contentSnippet?.slice(0, 200) || "",
      publishedAt: item.pubDate || new Date().toISOString(),
      category: "Vibe Coding" as const,
    }));
  } catch (err) {
    console.error("Community feed fetch failed:", err);
    return [];
  }
}
