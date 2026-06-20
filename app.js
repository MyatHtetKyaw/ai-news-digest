const express = require("express");
const path = require("path");
const { fetchTopStories } = require("./lib/fetchStories");
const { formatDigest } = require("./lib/formatDigest");
const { generateSummary } = require("./lib/summarizer");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files if any
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Main route — fetch fresh data on every request
app.get("/", async (req, res) => {
  try {
    const stories = await fetchTopStories(10);
    const digest = formatDigest(stories);

    // Attach category to raw stories for the summarizer
    const enriched = stories.map((s, i) => ({
      ...s,
      _category: digest.groups.find((g) =>
        g.stories.some((gs) => gs.id === s.id)
      )?.name || "General",
    }));
    const summary = generateSummary(enriched);

    res.render("index", { digest, summary });
  } catch (err) {
    console.error("Error fetching stories:", err);
    res.status(500).send(`
      <h1>Something went wrong</h1>
      <p>Could not fetch stories from Hacker News. Please try again.</p>
      <pre>${err.message}</pre>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Tech News Digest running at http://localhost:${PORT}`);
});
