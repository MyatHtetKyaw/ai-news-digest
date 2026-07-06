import { NewsDigest } from "./types";
import { promises as fs } from "fs";
import path from "path";

const CACHE_FILE = path.join("/tmp", "news-digest-cache.json");
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

let memoryCache: { data: NewsDigest; timestamp: number } | null = null;

export async function getCachedDigest(): Promise<NewsDigest | null> {
  if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL) {
    return memoryCache.data;
  }

  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    const cached = JSON.parse(raw);
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      memoryCache = cached;
      return cached.data;
    }
  } catch {
    // Cache miss
  }

  return null;
}

export async function setCachedDigest(digest: NewsDigest): Promise<void> {
  const entry = { data: digest, timestamp: Date.now() };
  memoryCache = entry;

  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(entry, null, 2));
  } catch {
    // Vercel serverless /tmp may not persist
  }
}
