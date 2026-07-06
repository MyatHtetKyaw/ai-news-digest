"use client";

import { CategoryGroup as CategoryGroupType } from "@/lib/types";
import NewsCard from "./NewsCard";

interface CategoryGroupProps {
  group: CategoryGroupType;
}

export default function CategoryGroup({ group }: CategoryGroupProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{group.icon}</span>
        <h2 className="text-xl font-semibold text-white">{group.name}</h2>
        <span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-400 text-xs">
          {group.items.length}
        </span>
      </div>

      <div className="space-y-3">
        {group.items.map((item, index) => (
          <NewsCard key={item.id} item={item} rank={index + 1} />
        ))}
      </div>
    </section>
  );
}
