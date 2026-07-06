import { NextResponse } from "next/server";
import { fetchAllNews } from "@/lib/aggregator";

export async function GET() {
  try {
    const digest = await fetchAllNews();
    return NextResponse.json({
      success: true,
      totalItems: digest.totalItems,
      lastUpdated: digest.lastUpdated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to refresh news" },
      { status: 500 }
    );
  }
}
