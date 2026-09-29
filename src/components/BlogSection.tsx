"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaClock, FaUser, FaArrowRight } from "react-icons/fa";
import { FormattedBlog } from "@/lib/storyblok";

export default function BlogSection({
  initialBlogs = [],
}: {
  initialBlogs?: FormattedBlog[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [blogs, setBlogs] = useState<FormattedBlog[]>(initialBlogs);

  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogs(initialBlogs);
    } else if (blogs.length === 0) {
      fetch("/api/blog")
        .then((res) => res.json())
        .then((data) => {
          if (data?.blogs && Array.isArray(data.blogs)) {
            setBlogs(data.blogs);
          }
        })
        .catch((err) => console.error("Error loading blogs:", err));
    }
  }, [initialBlogs, blogs.length]);

  if (blogs.length === 0) {
    return null;
  }

  const featuredBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 3);
  const hasSideBlogs = sideBlogs.length > 0;

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-[#FAF9F5] text-primary relative overflow-hidden border-t border-secondary/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            Sleep Wellness Journal
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight mb-4">
            Latest Articles & Guides
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Expert insights, sleep posture guides, and tips for choosing your ideal mattress.
          </p>
        </motion.div>

        {/* Featured 1 Left + 2 Right Grid Layout */}
        <div className={`grid grid-cols-1 ${hasSideBlogs ? "lg:grid-cols-12" : ""} gap-8 sm:gap-10 items-stretch`}>
          {/* Left Column: Big Featured Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={hasSideBlogs ? "lg:col-span-7" : "max-w-3xl mx-auto w-full"}
          >
            <div className="bg-white border border-secondary/25 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:border-secondary/60 transition-all duration-300 h-full flex flex-col group">
              <Link href={`/blog/${featuredBlog.slug}`} className="relative h-72 sm:h-96 w-full overflow-hidden block bg-slate-100">
                {featuredBlog.image ? (
                  <Image
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary/40 font-bold">Elva Journal</span>
                  </div>
                )}
              </Link>

              <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <FaUser className="text-secondary w-3.5 h-3.5" />
                      {featuredBlog.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-secondary w-3.5 h-3.5" />
                      {featuredBlog.readtime}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredBlog.slug}`}>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">
                      {featuredBlog.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 text-base font-normal leading-relaxed line-clamp-4 mb-6">
                    {featuredBlog.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <Link
                    href={`/blog/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 text-base font-bold text-primary group-hover:text-secondary transition-colors"
                  >
                    Read Full Article
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {featuredBlog.date && (
                    <span className="text-xs text-slate-400 font-medium">
                      {featuredBlog.date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Two Stacked Row Cards */}
          {hasSideBlogs && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col justify-between gap-6"
            >
              {sideBlogs.map((blog, idx) => (
                <div
                  key={blog.id || idx}
                  className="bg-white border border-secondary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-secondary/60 transition-all duration-300 flex flex-col group h-full"
                >
                  <Link href={`/blog/${blog.slug}`} className="relative h-44 w-full overflow-hidden block bg-slate-100 flex-shrink-0">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary/40 font-bold">Elva Journal</span>
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <FaUser className="text-secondary w-3 h-3" />
                          {blog.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FaClock className="text-secondary w-3 h-3" />
                          {blog.readtime}
                        </span>
                      </div>

                      <Link href={`/blog/${blog.slug}`}>
                        <h4 className="text-lg font-bold text-primary mb-2 leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                      </Link>

                      <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2 mb-4">
                        {blog.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary transition-colors"
                      >
                        Read Article
                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      {blog.date && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {blog.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-secondary/30"
          >
            Explore All Blog Posts
            <FaArrowRight className="w-4 h-4 text-secondary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
