const express = require("express");
const path = require("path");
const { fetchTopStories } = require("../lib/fetchStories");
const { formatDigest } = require("../lib/formatDigest");
const { generateSummary } = require("../lib/summarizer");

const app = express();

// Set EJS as the view engine — resolve views/ from project root
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// Serve static files if any
app.use(express.static(path.join(__dirname, "..", "public")));

// Main route — fetch fresh data on every request
app.get("/", async (req, res) => {
  try {
    const stories = await fetchTopStories(10);
    const digest = formatDigest(stories);

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

module.exports = app;
