import { NewsItem, NewsDigest, CategoryGroup, Source } from "./types";
import { classifyItem, CATEGORY_META } from "./categories";
import { fetchNewsletters } from "./sources/newsletter";
import { fetchTwitter } from "./sources/twitter";
import { fetchGitHubTrending } from "./sources/github";
import { fetchReddit } from "./sources/reddit";
import { fetchHackerNews } from "./sources/hackernews";
import { getCachedDigest, setCachedDigest } from "./cache";

const CATEGORIES = [
  "AI Tools & Products",
  "Vibe Coding",
  "AI Research",
  "AI Business & Funding",
  "AI Ethics & Regulation",
] as const;

export async function fetchAllNews(): Promise<NewsDigest> {
  const cached = await getCachedDigest();
  if (cached) return cached;

  const results = await Promise.allSettled([
    fetchNewsletters(),
    fetchTwitter(),
    fetchGitHubTrending(),
    fetchReddit(),
    fetchHackerNews(),
  ]);

  const allItems: NewsItem[] = results
    .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .map((item) => ({
      ...item,
      category: classifyItem(item),
    }));

  const groups: CategoryGroup[] = CATEGORIES.map((name) => ({
    name,
    icon: CATEGORY_META[name].icon,
    items: allItems
      .filter((item) => item.category === name)
      .sort((a, b) => (b.score || 0) - (a.score || 0)),
  })).filter((g) => g.items.length > 0);

  const sourceCounts: Record<Source, number> = {
    newsletter: 0,
    twitter: 0,
    github: 0,
    reddit: 0,
    hackernews: 0,
  };

  allItems.forEach((item) => {
    sourceCounts[item.source]++;
  });

  const digest: NewsDigest = {
    groups,
    lastUpdated: new Date().toISOString(),
    totalItems: allItems.length,
    sourceCounts,
  };

  await setCachedDigest(digest);
  return digest;
}
