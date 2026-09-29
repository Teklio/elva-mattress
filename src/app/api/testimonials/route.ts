import { NextResponse } from "next/server";
import { getStoryblokTestimonials } from "@/lib/storyblok";

export async function GET() {
  try {
    const testimonials = await getStoryblokTestimonials();
    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error("API /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
