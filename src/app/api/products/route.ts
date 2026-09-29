import { NextResponse } from "next/server";
import { getStoryblokProducts } from "@/lib/storyblok";

export async function GET() {
  try {
    const products = await getStoryblokProducts();
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("API /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
