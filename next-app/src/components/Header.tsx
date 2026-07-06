"use client";

import { Source } from "@/lib/types";

const SOURCE_LABELS: Record<Source, string> = {
  newsletter: "Newsletters",
  twitter: "Community",
  github: "GitHub",
  reddit: "VibeCoding",
  hackernews: "HackerNews",
};

const SOURCE_COLORS: Record<Source, string> = {
  newsletter: "bg-purple-500/20 text-purple-300",
  twitter: "bg-blue-500/20 text-blue-300",
  github: "bg-green-500/20 text-green-300",
  reddit: "bg-orange-500/20 text-orange-300",
  hackernews: "bg-amber-500/20 text-amber-300",
};

interface HeaderProps {
  lastUpdated: string;
  totalItems: number;
  sourceCounts: Record<Source, number>;
}

export default function Header({ lastUpdated, totalItems, sourceCounts }: HeaderProps) {
  const timeAgo = getTimeAgo(lastUpdated);

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-4xl">🤖</span>
            AI News Digest
          </h1>
          <p className="text-gray-400 mt-1">
            {totalItems} items · Updated {timeAgo}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(Object.keys(sourceCounts) as Source[]).map((source) => (
            <span
              key={source}
              className={`px-3 py-1 rounded-full text-xs font-medium ${SOURCE_COLORS[source]}`}
            >
              {SOURCE_LABELS[source]}: {sourceCounts[source]}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

function getTimeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
