const HN_API = "https://hacker-news.firebaseio.com/v0";

/**
 * Fetch the top N stories from the HackerNews API.
 * Returns an array of story objects sorted by score descending.
 */
async function fetchTopStories(count = 10) {
  // 1. Get the list of top story IDs
  const idsRes = await fetch(`${HN_API}/topstories.json`);
  const ids = await idsRes.json();
  const topIds = ids.slice(0, count);

  // 2. Fetch each story in parallel
  const stories = await Promise.all(
    topIds.map(async (id) => {
      const res = await fetch(`${HN_API}/item/${id}.json`);
      return res.json();
    })
  );

  // 3. Sort by score (highest first) and return
  return stories
    .filter((s) => s && s.type === "story")
    .sort((a, b) => b.score - a.score);
}

module.exports = { fetchTopStories };
