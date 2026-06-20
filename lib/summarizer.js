/**
 * Generate a simple 3-sentence summary from story data.
 * Uses keyword frequency and score weighting — no LLM calls.
 */
function generateSummary(stories) {
  if (!stories.length) return "No stories available right now.";

  // Count category occurrences weighted by score
  const catScores = {};
  for (const s of stories) {
    const cat = s._category || "General";
    catScores[cat] = (catScores[cat] || 0) + s.score;
  }
  const topCats = Object.entries(catScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name);

  // Top story by score
  const top = stories.reduce((a, b) => (a.score > b.score ? a : b));

  // Total engagement
  const totalComments = stories.reduce((sum, s) => sum + (s.descendants || 0), 0);
  const avgScore = Math.round(stories.reduce((sum, s) => sum + s.score, 0) / stories.length);

  // Build 3-sentence summary
  const sentence1 = `Today's top tech news spans ${topCats.length} major areas: ${topCats.join(", ")}.`;
  const sentence2 = `Leading the headlines is "${top.title}" with ${top.score} points, reflecting strong community interest.`;
  const sentence3 = `Across ${stories.length} stories, the average score is ${avgScore} with ${totalComments} total comments, indicating ${avgScore > 200 ? "highly engaged" : "steady"} discussion.`;

  return `${sentence1} ${sentence2} ${sentence3}`;
}

module.exports = { generateSummary };
