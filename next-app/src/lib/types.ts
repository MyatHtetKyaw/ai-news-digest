export type Source = "newsletter" | "twitter" | "github" | "reddit" | "hackernews";

export type Category =
  | "AI Tools & Products"
  | "Vibe Coding"
  | "AI Research"
  | "AI Business & Funding"
  | "AI Ethics & Regulation";

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: Source;
  author?: string;
  score?: number;
  comments?: number;
  description?: string;
  publishedAt: string;
  category: Category;
}

export interface CategoryGroup {
  name: Category;
  icon: string;
  items: NewsItem[];
}

export interface NewsDigest {
  groups: CategoryGroup[];
  lastUpdated: string;
  totalItems: number;
  sourceCounts: Record<Source, number>;
}
