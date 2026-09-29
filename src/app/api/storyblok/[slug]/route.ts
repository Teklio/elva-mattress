import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const searchParams = request.nextUrl.searchParams;
  const version =
    searchParams.get("version") ||
    (process.env.STORYBLOK_PREVIEW_TOKEN ? "draft" : "published");

  const token =
    version === "draft"
      ? process.env.STORYBLOK_PREVIEW_TOKEN || process.env.STORYBLOK_PUBLIC_TOKEN
      : process.env.STORYBLOK_PUBLIC_TOKEN || process.env.STORYBLOK_PREVIEW_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Storyblok token is not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${token}&version=${version}&cv=${Date.now()}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Storyblok API returned ${res.status}: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Storyblok dynamic route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Storyblok" },
      { status: 500 }
    );
  }
}
