import * as cheerio from "cheerio";
import { NewsItem } from "../types";

export async function fetchGitHubTrending(): Promise<NewsItem[]> {
  try {
    const res = await fetch(
      "https://github.com/trending?since=daily",
      {
        headers: {
          "User-Agent": "AI-News-Digest/1.0",
          Accept: "text/html",
        },
      }
    );

    if (!res.ok) return [];

    const html = await res.text();
    const $ = cheerio.load(html);
    const items: NewsItem[] = [];

    $("article.Box-row").each((i, el) => {
      const repoPath = $(el).find("h2 a").attr("href")?.trim() || "";
      const name = repoPath.replace(/^\//, "");
      const description = $(el).find("p").text().trim();
      const starsText = $(el).find(".d-inline-block.float-sm-right").text().trim();
      const stars = parseInt(starsText.replace(/[, star]/g, "")) || 0;
      const language = $(el).find("[itemprop='programmingLanguage']").text().trim();

      if (name) {
        items.push({
          id: `github-${name}`,
          title: name,
          url: `https://github.com${repoPath}`,
          source: "github",
          author: name.split("/")[0],
          score: stars,
          description: description.slice(0, 200),
          publishedAt: new Date().toISOString(),
          category: "AI Tools & Products",
        });
      }
    });

    return items.slice(0, 15);
  } catch (err) {
    console.error("GitHub trending fetch failed:", err);
    return [];
  }
}
