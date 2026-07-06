import { Category, NewsItem } from "./types";

const CATEGORY_RULES: { category: Category; keywords: string[] }[] = [
  {
    category: "Vibe Coding",
    keywords: [
      "cursor", "copilot", "vibe cod", "ai cod", "code generation",
      "code assistant", "ide", "vscode", "codeium", "tabnine",
      "augment", " Devin", "swe-agent", "openhands", "aider",
      "continue.dev", "cline", "roo code", "pearai",
    ],
  },
  {
    category: "AI Tools & Products",
    keywords: [
      "chatgpt", "claude", "gemini", "llama", "mistral", "perplexity",
      "midjourney", "stable diffusion", "dall-e", "suno", "runway",
      "tool", "launch", "release", "product", "app", "platform",
      "open source", "api", "sdk", "plugin", "extension",
    ],
  },
  {
    category: "AI Research",
    keywords: [
      "paper", "research", "arxiv", "benchmark", "model", "training",
      "inference", "transformer", "attention", "diffusion", "rlhf",
      "alignment", "fine-tun", "pretrain", "scaling", "reasoning",
      "multimodal", "vision", "language model", "neural",
    ],
  },
  {
    category: "AI Business & Funding",
    keywords: [
      "funding", "raise", "series", "valuation", "ipo", "acquisition",
      "acquire", "startup", "billion", "million", "invest",
      "revenue", "enterprise", "b2b", "saas", "partnership",
    ],
  },
  {
    category: "AI Ethics & Regulation",
    keywords: [
      "regulation", "policy", "safety", "bias", "ethics", "governance",
      "eu ai act", "copyright", "deepfake", "misinformation",
      "alignment", "existential", "risk", "surveillance", "privacy",
      "openai governance", "board", "regulate",
    ],
  },
];

export function classifyItem(item: NewsItem): Category {
  const text = `${item.title} ${item.description || ""}`.toLowerCase();

  for (const rule of CATEGORY_RULES) {
    for (const keyword of rule.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return rule.category;
      }
    }
  }

  return "AI Tools & Products";
}

export const CATEGORY_META: Record<Category, { icon: string; description: string }> = {
  "AI Tools & Products": {
    icon: "🛠️",
    description: "New AI tools, product launches, releases",
  },
  "Vibe Coding": {
    icon: "✨",
    description: "Cursor, Copilot, AI-assisted development",
  },
  "AI Research": {
    icon: "🔬",
    description: "Papers, breakthroughs, model releases",
  },
  "AI Business & Funding": {
    icon: "💰",
    description: "Startups, funding rounds, acquisitions",
  },
  "AI Ethics & Regulation": {
    icon: "⚖️",
    description: "Policy, safety, alignment discussions",
  },
};
