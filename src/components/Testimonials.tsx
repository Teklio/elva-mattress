"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface TestimonialItem {
  id?: string;
  name: string;
  location: string;
  image?: string;
  text: string;
  rating: number;
  tag: string;
}

function StarRating({ count }: { count: number }) {
  const safeCount = Math.max(1, Math.min(5, Math.round(count) || 5));
  return (
    <div className="flex items-center justify-center gap-1.5 my-3">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 transition-colors ${
            i < safeCount
              ? "text-secondary drop-shadow-[0_0_6px_rgba(209,176,122,0.5)]"
              : "text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials({
  initialTestimonials = [],
}: {
  initialTestimonials?: TestimonialItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Sync initialTestimonials or fetch from API
  useEffect(() => {
    if (initialTestimonials && initialTestimonials.length > 0) {
      setTestimonials(initialTestimonials);
    } else if (testimonials.length === 0) {
      fetch("/api/testimonials")
        .then((res) => res.json())
        .then((data) => {
          if (data?.testimonials && Array.isArray(data.testimonials)) {
            setTestimonials(data.testimonials);
          }
        })
        .catch((err) => console.error("Error loading testimonials:", err));
    }
  }, [initialTestimonials, testimonials.length]);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = testimonials.length;
  const effectiveVisibleCount = Math.min(visibleCount, Math.max(1, total));
  const maxIndex = Math.max(0, total - effectiveVisibleCount);

  const nextSlide = useCallback(() => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay Timer
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide, maxIndex]);

  if (total === 0) {
    return null;
  }

  const isSingle = total === 1;

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-transparent text-primary relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-slate-600 text-base sm:text-md max-w-xl mx-auto font-medium">
            Hear from those who've transformed their sleep with Elva.
          </p>
        </motion.div>

        {/* Testimonials Display */}
        <div className="relative">
          <div className={`overflow-hidden py-4 -my-4 ${isSingle ? "flex justify-center" : ""}`}>
            <motion.div
              className={`flex transition-transform duration-700 ease-out ${
                isSingle ? "w-full max-w-xl justify-center" : ""
              }`}
              animate={
                isSingle
                  ? {}
                  : {
                      x: `-${currentIndex * (100 / effectiveVisibleCount)}%`,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={testimonial.id || idx}
                  style={
                    isSingle
                      ? { width: "100%" }
                      : {
                          flex: `0 0 ${100 / effectiveVisibleCount}%`,
                        }
                  }
                  className="px-3 sm:px-4 flex justify-center"
                >
                  {/* Testimonial Card with Blue BG, 2px Gold Border & White Text */}
                  <div className="w-full max-w-xl bg-primary border-8 border-secondary rounded-[32px] p-8 sm:p-10 shadow-xl relative flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.015] group">
                    {/* Top-Left Quote Icon in Gold */}
                    <div className="absolute top-6 left-6 sm:top-8 sm:left-8 text-secondary">
                      <FaQuoteLeft className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>

                    {/* Centered Avatar with Gold Ring */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-secondary shadow-md mb-5 bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <span className="text-secondary font-bold text-2xl">
                          {testimonial.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>

                    {/* Centered Name in White */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                      {testimonial.name}.
                    </h3>

                    {/* Location in Gold */}
                    {testimonial.location && (
                      <p className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
                        {testimonial.location}
                      </p>
                    )}

                    {/* Star Rating */}
                    <StarRating count={testimonial.rating} />

                    {/* Centered Quote Text in White */}
                    <p className="text-white/90 leading-relaxed text-base sm:text-lg font-light italic mt-2">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows for multiple items */}
          {maxIndex > 0 && (
            <>
              <div className="flex items-center justify-between pointer-events-none absolute top-1/2 -translate-y-1/2 -left-3 -right-3 sm:-left-6 sm:-right-6">
                <button
                  onClick={prevSlide}
                  aria-label="Previous review"
                  className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary border-2 border-secondary text-secondary hover:text-primary hover:bg-secondary transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next review"
                  className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary border-2 border-secondary text-secondary hover:text-primary hover:bg-secondary transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? "w-8 bg-secondary shadow-[0_0_8px_rgba(209,176,122,0.5)]"
                        : "w-2.5 bg-secondary/30 hover:bg-secondary/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
