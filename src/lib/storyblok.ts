import { Product, ProductCategory, MATTRESS_SIZES } from "@/data/products";

export interface StoryblokAsset {
  id?: number;
  filename: string;
  alt?: string;
  name?: string;
}

export interface StoryblokTestimonialItem {
  _uid: string;
  component: string;
  username: string;
  role?: string;
  place?: string;
  rating?: string | number;
  feedback: string;
  image?: StoryblokAsset | string;
}

export interface FormattedTestimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
  tag: string;
}

export interface StoryblokBlogItem {
  _uid: string;
  title: string;
  author: string;
  readtime: string;
  tags: string;
  description: string;
  image?: StoryblokAsset | string;
  component: string;
}

export interface FormattedBlog {
  id: string;
  slug: string;
  title: string;
  author: string;
  readtime: string;
  tags: string[];
  description: string;
  image: string;
  date?: string;
}

export interface StoryblokProductItem {
  _uid: string;
  name: string;
  size?: string;
  type?: string;
  category?: string;
  warranty?: string;
  features?: string;
  description?: string;
  images?: Array<StoryblokAsset | string>;
  component: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const cleanImageUrl = (rawUrl?: string): string => {
  if (!rawUrl) return "";
  const match = rawUrl.match(/https?:\/\/[^\s)\]]+/);
  return match ? match[0] : rawUrl;
};

export async function getStoryblokTestimonials(): Promise<FormattedTestimonial[]> {
  const token =
    process.env.STORYBLOK_PREVIEW_TOKEN ||
    process.env.STORYBLOK_PUBLIC_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_PUBLIC_TOKEN;

  if (!token) {
    return [];
  }

  const version = process.env.STORYBLOK_PREVIEW_TOKEN ? "draft" : "published";

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/testimonials?token=${token}&version=${version}`,
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000),
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const rawItems: StoryblokTestimonialItem[] = data?.story?.content?.testimonial || [];

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return [];
    }

    return rawItems.map((item, index) => {
      const imgUrl =
        typeof item.image === "string"
          ? item.image
          : item.image?.filename || "";

      const ratingNum = typeof item.rating === "string" ? parseInt(item.rating, 10) : Number(item.rating);

      return {
        id: item._uid || `storyblok-${index}`,
        name: item.username || "Verified Sleeper",
        location: item.place || "Kerala, India",
        image: cleanImageUrl(imgUrl),
        text: item.feedback || "",
        rating: !isNaN(ratingNum) && ratingNum > 0 ? ratingNum : 5,
        tag: item.role || "Verified Review",
      };
    });
  } catch (error) {
    console.error("Error fetching testimonials from Storyblok:", error);
    return [];
  }
}

export async function getStoryblokBlogs(): Promise<FormattedBlog[]> {
  const token =
    process.env.STORYBLOK_PREVIEW_TOKEN ||
    process.env.STORYBLOK_PUBLIC_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_PUBLIC_TOKEN;

  if (!token) {
    return [];
  }

  const version = process.env.STORYBLOK_PREVIEW_TOKEN ? "draft" : "published";

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/blog?token=${token}&version=${version}`,
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000),
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const rawItems: StoryblokBlogItem[] = data?.story?.content?.blogs || [];
    const storyPublishedAt = data?.story?.published_at || data?.story?.first_published_at || data?.story?.created_at;

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return [];
    }

    return rawItems.map((item, index) => {
      const imgUrl =
        typeof item.image === "string"
          ? item.image
          : item.image?.filename || "";

      const parsedTags = (item.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const generatedSlug = slugify(item.title || `blog-${index}`);

      return {
        id: item._uid || `blog-${index}`,
        slug: generatedSlug,
        title: item.title || "Untitled Article",
        author: item.author || "Elva Team",
        readtime: item.readtime ? `${item.readtime} min read` : "5 min read",
        tags: parsedTags.length > 0 ? parsedTags : ["Mattress Guide"],
        description: item.description || "",
        image: cleanImageUrl(imgUrl),
        date: storyPublishedAt ? new Date(storyPublishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) : "Sep 2026",
      };
    });
  } catch (error) {
    console.error("Error fetching blogs from Storyblok:", error);
    return [];
  }
}

export async function getStoryblokBlogBySlug(slug: string): Promise<FormattedBlog | null> {
  const blogs = await getStoryblokBlogs();
  const match = blogs.find(
    (b) => b.slug === slug || slugify(b.title) === slug || b.id === slug
  );
  return match || null;
}

export async function getStoryblokProducts(): Promise<Product[]> {
  const token =
    process.env.STORYBLOK_PREVIEW_TOKEN ||
    process.env.STORYBLOK_PUBLIC_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_PUBLIC_TOKEN;

  if (!token) {
    return [];
  }

  const version = process.env.STORYBLOK_PREVIEW_TOKEN ? "draft" : "published";

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/products?token=${token}&version=${version}`,
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3000),
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const rawItems: StoryblokProductItem[] = data?.story?.content?.products || [];

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return [];
    }

    return rawItems.map((item, index) => {
      const imagesList = Array.isArray(item.images) ? item.images : [];
      const primaryImg = imagesList[0]
        ? typeof imagesList[0] === "string"
          ? imagesList[0]
          : imagesList[0]?.filename || ""
        : "";

      const galleryUrls = imagesList
        .map((img) => (typeof img === "string" ? img : img?.filename || ""))
        .filter(Boolean)
        .map(cleanImageUrl);

      const parsedFeatures = (item.features || "")
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const categoryName = (item.category as ProductCategory) || "Mattress";
      const slug = slugify(item.name || `product-${index}`);

      return {
        id: item._uid || `sb-prod-${index}`,
        slug: slug,
        name: item.name || "Elva Product",
        category: categoryName,
        type: item.type || "Super Soft Foam Mattress",
        tagline: item.type || "Ultra-plush cloud responsiveness with adaptive body contouring",
        description: item.description || "",
        features: parsedFeatures.length > 0 ? parsedFeatures : ["Super Soft Foam", "8-year warranty"],
        size: item.size || "Multiple Sizes",
        availableSizes: categoryName === "Mattress" ? MATTRESS_SIZES : undefined,
        warranty: item.warranty ? (item.warranty.includes("year") ? item.warranty : `${item.warranty}-year warranty`) : "8-year warranty",
        image: cleanImageUrl(primaryImg),
        gallery: galleryUrls,
        comfortScale: "Super Soft & Plush",
      };
    });
  } catch (error) {
    console.error("Error fetching products from Storyblok:", error);
    return [];
  }
}

export async function getStoryblokProductBySlug(slug: string): Promise<Product | null> {
  const products = await getStoryblokProducts();
  const match = products.find(
    (p) => p.slug === slug || slugify(p.name) === slug || p.id === slug
  );
  return match || null;
}
