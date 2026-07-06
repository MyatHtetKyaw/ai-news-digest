"use client";

import { useState } from "react";
import { CategoryGroup as CategoryGroupType } from "@/lib/types";
import CategoryGroup from "./CategoryGroup";

interface CategoryTabsProps {
  groups: CategoryGroupType[];
}

export default function CategoryTabs({ groups }: CategoryTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (groups.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">
          No news items found. Data will populate shortly.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-xl overflow-x-auto">
        {groups.map((group, index) => (
          <button
            key={group.name}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === index
                ? "bg-white/15 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{group.icon}</span>
            <span>{group.name}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
              activeTab === index ? "bg-white/20" : "bg-white/10"
            }`}>
              {group.items.length}
            </span>
          </button>
        ))}
      </div>

      {/* Active category content */}
      <CategoryGroup group={groups[activeTab]} />
    </div>
  );
}
