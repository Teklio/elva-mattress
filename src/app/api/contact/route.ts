import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { success: false, error: "Name, phone number, and email are required." },
        { status: 400 }
      );
    }

    const phoneClean = (phone || "").replace(/\D/g, "");
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneClean)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const emailClean = (email || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailClean)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const spaceId = process.env.STORYBLOK_SPACE_ID || "295554697509620";
    const mapiToken = process.env.STORYBLOK_MANAGEMENT_TOKEN || "sb_pat_Jd6SYpn7h09PFEUWZiyHmu9yuzVXCbsZSeno4YZQCwE";
    const rawFolderId = process.env.STORYBLOK_CONTACT_FOLDER_ID ? Number(process.env.STORYBLOK_CONTACT_FOLDER_ID) : 225297095467333;

    const targetFolderId = rawFolderId && rawFolderId !== Number(spaceId) ? rawFolderId : 225297095467333;

    const storyName = `${name} (${phone || email})`;
    const slug = `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const createPayload = (componentName: string, folderId: number) => ({
      story: {
        name: storyName,
        slug: slug,
        parent_id: folderId,
        content: {
          component: componentName,
          name: name || "",
          email: email || "",
          phone: phone || "",
          message: message || "",
        },
      },
      publish: 1,
    });

    // Storyblok uses 'Conatct-content' as the content type schema with fields: name, email, phone, message
    let res = await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceId}/stories`, {
      method: "POST",
      headers: {
        "Authorization": mapiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createPayload("Conatct-content", targetFolderId)),
    });

    let data = await res.json();

    // Fallback if component is named 'contact'
    if (!res.ok && JSON.stringify(data).includes("component")) {
      res = await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceId}/stories`, {
        method: "POST",
        headers: {
          "Authorization": mapiToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createPayload("contact", targetFolderId)),
      });
      data = await res.json();
    }

    if (!res.ok || data.errors) {
      console.error("Storyblok Management API Error:", data);
      return NextResponse.json(
        { success: false, error: data?.message || "Failed to save contact lead to Storyblok." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead successfully recorded in Storyblok!",
      storyId: data.story?.id,
    });
  } catch (error) {
    console.error("API /api/contact exception:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
