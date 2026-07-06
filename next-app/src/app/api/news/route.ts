import { NextResponse } from "next/server";
import { fetchAllNews } from "@/lib/aggregator";

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET() {
  try {
    const digest = await fetchAllNews();
    return NextResponse.json(digest);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
