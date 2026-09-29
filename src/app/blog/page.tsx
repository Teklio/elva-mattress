import { getStoryblokBlogs } from "@/lib/storyblok";
import Heder from "@/components/Heder";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUser, FaArrowRight, FaBookOpen } from "react-icons/fa";

export const metadata = {
  title: "Sleep Journal & Mattress Guides | Elva Mattress",
  description: "Read expert advice on orthopaedic support, mattress care, sleeping posture, and bedroom comfort.",
};

export default async function BlogListingPage() {
  const blogs = await getStoryblokBlogs();

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-primary flex flex-col">
      <Heder />

      {/* Hero Header */}
      <section className="relative py-24 sm:py-32 bg-primary text-white overflow-hidden border-b border-secondary/20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-6">
            <FaBookOpen className="w-3.5 h-3.5" />
            <span>Elva Sleep Journal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Guides & <span className="text-secondary">Articles</span>
          </h1>

          <p className="text-white/80 font-light text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about orthopaedic support, thermal regulation, mattress longevity, and restful sleep.
          </p>
        </div>
      </section>

      {/* Main Blog List Section */}
      <section className="py-16 sm:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
          {blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-3">No articles published yet</h3>
              <p className="text-slate-600">Check back soon for new sleep guides from our experts.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white border border-secondary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-secondary/60 transition-all duration-300 flex flex-col group"
                >
                  <Link href={`/blog/${blog.slug}`} className="relative h-60 w-full overflow-hidden block bg-slate-100">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary/40 font-bold">Elva Journal</span>
                      </div>
                    )}
                  </Link>

                  <div className="p-7 sm:p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <FaUser className="text-secondary w-3 h-3" />
                          {blog.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <FaClock className="text-secondary w-3 h-3" />
                          {blog.readtime}
                        </span>
                      </div>

                      <Link href={`/blog/${blog.slug}`}>
                        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">
                          {blog.title}
                        </h2>
                      </Link>

                      <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed line-clamp-3 mb-6">
                        {blog.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors"
                      >
                        Read Full Article
                        <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      {blog.date && (
                        <span className="text-xs text-slate-400 font-medium">
                          {blog.date}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
