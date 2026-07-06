import Parser from "rss-parser";
import { NewsItem } from "../types";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "AI-News-Digest/1.0",
  },
});

// Nitter instances are mostly dead. Fallback to Lobste.rs AI community.
const LOBSTE_RS_AI = "https://lobste.rs/t/ai.rss";
const LOBSTE_RS_VIBECODING = "https://lobste.rs/t/vibecoding.rss";

export async function fetchTwitter(): Promise<NewsItem[]> {
  const results = await Promise.allSettled<NewsItem[]>(
    [LOBSTE_RS_AI, LOBSTE_RS_VIBECODING].map(async (url): Promise<NewsItem[]> => {
      try {
        const feed = await parser.parseURL(url);
        return (feed.items || []).slice(0, 10).map((item) => ({
          id: `community-${item.guid || item.link}`,
          title: item.title || "Untitled",
          url: item.link || "",
          source: "twitter" as const,
          author: item.author?.split(" via ")?.pop()?.trim() || item.creator || "lobste.rs",
          description: item.contentSnippet?.slice(0, 200) || "",
          publishedAt: item.pubDate || new Date().toISOString(),
          category: "AI Tools & Products" as const,
        }));
      } catch (err) {
        console.error(`Failed to fetch ${url}:`, err);
        return [];
      }
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);
}
