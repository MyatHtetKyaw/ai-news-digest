import Header from "@/components/Header";
import CategoryTabs from "@/components/CategoryTabs";
import { fetchAllNews } from "@/lib/aggregator";

export const revalidate = 3600;

export default async function Home() {
  const digest = await fetchAllNews();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-gray-900">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Header
          lastUpdated={digest.lastUpdated}
          totalItems={digest.totalItems}
          sourceCounts={digest.sourceCounts}
        />

        <CategoryTabs groups={digest.groups} />

        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>
            AI News Digest · Aggregating from 5 sources · Updates hourly
          </p>
        </footer>
      </main>
    </div>
  );
}
