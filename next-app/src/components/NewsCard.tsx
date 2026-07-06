"use client";

import { NewsItem, Source } from "@/lib/types";

const SOURCE_BADGES: Record<Source, { label: string; color: string }> = {
  newsletter: { label: "Newsletter", color: "bg-purple-500/30 text-purple-200" },
  twitter: { label: "X", color: "bg-blue-500/30 text-blue-200" },
  github: { label: "GitHub", color: "bg-green-500/30 text-green-200" },
  reddit: { label: "Reddit", color: "bg-orange-500/30 text-orange-200" },
  hackernews: { label: "HN", color: "bg-amber-500/30 text-amber-200" },
};

interface NewsCardProps {
  item: NewsItem;
  rank: number;
}

export default function NewsCard({ item, rank }: NewsCardProps) {
  const badge = SOURCE_BADGES[item.source];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
    >
      <div className="flex items-start gap-4">
        <span className="text-gray-500 font-mono text-lg mt-1 w-8 shrink-0">
          {rank}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <span className={`px-3 py-1 rounded text-sm font-semibold ${badge.color}`}>
              {badge.label}
            </span>
            {item.author && (
              <span className="text-gray-400 text-base">{item.author}</span>
            )}
          </div>

          <h3 className="text-white text-lg font-semibold group-hover:text-blue-300 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {item.description && (
            <p className="text-gray-100 text-sm mt-2 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="flex items-center gap-5 mt-3 text-sm text-gray-500">
            {item.score !== undefined && (
              <span className="flex items-center gap-1">▲ {item.score.toLocaleString()}</span>
            )}
            {item.comments !== undefined && (
              <span className="flex items-center gap-1">💬 {item.comments}</span>
            )}
            <span>{getTimeAgo(item.publishedAt)}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function getTimeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}
