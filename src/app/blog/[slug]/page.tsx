import { getStoryblokBlogBySlug, getStoryblokBlogs } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import Heder from "@/components/Heder";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaClock, FaUser, FaTag, FaBookOpen, FaPhoneAlt, FaRegLightbulb, FaArrowRight } from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getStoryblokBlogBySlug(slug);
  if (!blog) {
    return { title: "Article Not Found | Elva Mattress" };
  }
  return {
    title: `${blog.title} | Elva Sleep Journal`,
    description: blog.description.substring(0, 160),
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getStoryblokBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getStoryblokBlogs();
  const otherBlogs = allBlogs.filter((b) => b.id !== blog.id);

  // Split description text into paragraphs
  const paragraphs = blog.description
    ? blog.description.split("\n\n").filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-primary flex flex-col">
      <Heder />

      {/* Main Content Area */}
      <article className="py-12 sm:py-20 flex-grow">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
          {/* Back Navigation Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-secondary mb-8 transition-colors group"
          >
            <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>

          {/* 2-Column Grid Layout utilizing full max-w-7xl width */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Main Article Column (8 Cols) */}
            <div className="lg:col-span-8">
              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-secondary/20 text-primary border border-secondary/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-5xl font-black text-primary tracking-tight leading-tight mb-6">
                {blog.title}
              </h1>

              {/* Meta Info Banner */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-secondary/20 mb-8 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2">
                    <FaUser className="text-secondary w-4 h-4" />
                    <strong className="text-primary">{blog.author}</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock className="text-secondary w-4 h-4" />
                    {blog.readtime}
                  </span>
                </div>
                {blog.date && <span className="text-xs text-slate-400">{blog.date}</span>}
              </div>

              {/* Featured Image */}
              {blog.image && (
                <div className="relative h-[320px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border border-secondary/20 mb-10 bg-slate-100">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
              )}

              {/* Article Content Paragraphs */}
              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6 text-base sm:text-lg font-normal">
                {paragraphs.length > 0 ? (
                  paragraphs.map((p, idx) => (
                    <p key={idx} className="mb-6 leading-relaxed">
                      {p}
                    </p>
                  ))
                ) : (
                  <p>{blog.description}</p>
                )}
              </div>
            </div>

            {/* Right Sidebar Column (4 Cols) */}
            <aside className="lg:col-span-4 space-y-8 sticky top-28">
              {/* Key Takeaways Box */}
              <div className="bg-gradient-to-br from-white to-[#F6F3EB] border border-secondary/35 rounded-3xl p-7 shadow-sm">
                <div className="flex items-center gap-3.5 mb-4 text-secondary">
                  <FaRegLightbulb className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-bold text-primary">Article Highlights</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Discover key insights on spine alignment, ergonomics, and choosing the perfect mattress for your sleep style.
                </p>
                <div className="text-xs font-semibold text-secondary uppercase tracking-wider">
                  Verified Elva Sleep Guide
                </div>
              </div>

              {/* Consultation / Product CTA Widget */}
              <div className="bg-primary text-white rounded-3xl p-7 shadow-xl border-2 border-secondary relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />
                
                <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 block">
                  Orthopaedic Comfort
                </span>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  Find Your Ideal Mattress
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  Need personalized advice? Talk to our sleep experts to select the right firmness and support for your back.
                </p>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-primary font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white transition-all shadow-md"
                >
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                  Get Free Consultation
                </Link>
              </div>

              {/* Recent Articles Sidebar Widget */}
              {otherBlogs.length > 0 && (
                <div className="bg-white border border-secondary/20 rounded-3xl p-7 shadow-sm">
                  <h3 className="text-lg font-bold text-primary mb-5 pb-3 border-b border-slate-100">
                    Recent Articles
                  </h3>

                  <div className="space-y-5">
                    {otherBlogs.slice(0, 3).map((other) => (
                      <Link
                        key={other.id}
                        href={`/blog/${other.slug}`}
                        className="group flex gap-4 items-center"
                      >
                        {other.image && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                            <Image
                              src={other.image}
                              alt={other.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="64px"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                            {other.title}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {other.readtime}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Cloud Widget */}
              {blog.tags.length > 0 && (
                <div className="bg-white border border-secondary/20 rounded-3xl p-7 shadow-sm">
                  <h3 className="text-lg font-bold text-primary mb-4 pb-3 border-b border-slate-100">
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-secondary/20 hover:text-primary transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
