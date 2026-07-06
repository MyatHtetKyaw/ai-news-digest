import Parser from "rss-parser";
import { NewsItem } from "../types";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "AI-News-Digest/1.0",
  },
});

const FEEDS = [
  {
    name: "Latent Space",
    url: "https://www.latent.space/feed",
    source: "newsletter" as const,
  },
  {
    name: "AI Engineer",
    url: "https://aiengineer.substack.com/feed",
    source: "newsletter" as const,
  },
];

export async function fetchNewsletters(): Promise<NewsItem[]> {
  const results = await Promise.allSettled<NewsItem[]>(
    FEEDS.map(async (feed): Promise<NewsItem[]> => {
      try {
        const parsed = await parser.parseURL(feed.url);
        return (parsed.items || []).slice(0, 10).map((item) => ({
          id: `newsletter-${feed.name}-${item.guid || item.link}`,
          title: item.title || "Untitled",
          url: item.link || "",
          source: feed.source,
          author: feed.name,
          description: item.contentSnippet?.slice(0, 200) || "",
          publishedAt: item.pubDate || new Date().toISOString(),
          category: "AI Research" as const,
        }));
      } catch (err) {
        console.error(`Failed to fetch ${feed.name}:`, err);
        return [];
      }
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);
}
