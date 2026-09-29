import { NextResponse } from "next/server";
import { getStoryblokBlogs } from "@/lib/storyblok";

export async function GET() {
  try {
    const blogs = await getStoryblokBlogs();
    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("API /api/blog error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
