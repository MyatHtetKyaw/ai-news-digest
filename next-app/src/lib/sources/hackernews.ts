import { NewsItem } from "../types";

const HN_API = "https://hacker-news.firebaseio.com/v0";

export async function fetchHackerNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${HN_API}/topstories.json`);
    if (!res.ok) return [];

    const ids: number[] = await res.json();
    const topIds = ids.slice(0, 20);

    const stories = await Promise.all(
      topIds.map(async (id) => {
        const storyRes = await fetch(`${HN_API}/item/${id}.json`);
        if (!storyRes.ok) return null;
        return storyRes.json();
      })
    );

    return stories
      .filter((s): s is any => s !== null && s.type === "story")
      .map((s) => ({
        id: `hn-${s.id}`,
        title: s.title,
        url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
        source: "hackernews" as const,
        author: s.by,
        score: s.score,
        comments: s.descendants || 0,
        publishedAt: new Date(s.time * 1000).toISOString(),
        category: "AI Research" as const,
      }));
  } catch (err) {
    console.error("HackerNews fetch failed:", err);
    return [];
  }
}
