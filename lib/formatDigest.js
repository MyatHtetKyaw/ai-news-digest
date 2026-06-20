/**
 * Strip common tracking / referral parameters from a URL.
 */
function stripTracking(url) {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "ref",
      "ref_src",
      "ref_url",
      "mc_cid",
      "mc_eid",
    ];
    trackingParams.forEach((p) => parsed.searchParams.delete(p));
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Category keywords — order matters: first match wins.
 */
const CATEGORIES = [
  {
    name: "AI & Machine Learning",
    keywords: [
      "ai",
      "gpt",
      "llm",
      "model",
      "neural",
      "machine learning",
      "deep learning",
      "transformer",
      "diffusion",
      "openai",
      "anthropic",
      "claude",
      "hallucinate",
      "robot",
      "boston dynamics",
    ],
  },
  {
    name: "Web Development & Protocols",
    keywords: [
      "web",
      "javascript",
      "react",
      "css",
      "html",
      "browser",
      "http",
      "dns",
      "domain",
      "protocol",
      "atproto",
      "bluesky",
      "favicon",
      "frontend",
      "api",
    ],
  },
  {
    name: "Infrastructure & Systems",
    keywords: [
      "server",
      "database",
      "load balanc",
      "kubernetes",
      "docker",
      "linux",
      "kernel",
      "compress",
      "memory",
      "cpu",
      "network",
      "erlang",
      "distributed",
      "scaling",
    ],
  },
  {
    name: "Science & Research",
    keywords: [
      "science",
      "research",
      "physics",
      "biology",
      "neuroscience",
      "color",
      "perception",
      "discovery",
      "study",
      "paper",
      "academic",
      "ibm",
      "kavli",
    ],
  },
];

/**
 * Assign a category to a story based on title keywords.
 * Falls back to "General" if nothing matches.
 */
function categorize(title) {
  const lower = title.toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.keywords.some((kw) => lower.includes(kw))) {
      return cat.name;
    }
  }
  return "General";
}

/**
 * Format raw stories into grouped digest data.
 * Returns { groups: [{ name, stories }], total, fetchedAt }
 */
function formatDigest(stories) {
  const cleaned = stories.map((s) => ({
    id: s.id,
    title: s.title,
    url: stripTracking(s.url || `https://news.ycombinator.com/item?id=${s.id}`),
    score: s.score,
    author: s.by,
    comments: s.descendants || 0,
    category: categorize(s.title),
  }));

  // Group by category, preserving score order within each group
  const groupMap = {};
  for (const story of cleaned) {
    if (!groupMap[story.category]) groupMap[story.category] = [];
    groupMap[story.category].push(story);
  }

  // Build ordered groups (categories with most stories first)
  const groups = Object.entries(groupMap)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([name, stories]) => ({ name, stories }));

  return {
    groups,
    total: cleaned.length,
    fetchedAt: new Date().toISOString(),
  };
}

module.exports = { formatDigest, stripTracking };
