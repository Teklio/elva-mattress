"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Aiswarya Rajendran",
    location: "Kochi, Kerala",
    image: "/testimonials/aiswarya.jpg",
    text: "The ergonomic support of the Elva mattress has completely transformed my sleep. Waking up without back pain is a blessing I never expected. Highly recommended!",
    rating: 5,
    tag: "Ortho Comfort",
  },
  {
    name: "Rahul Menon",
    location: "Perinthalmanna, Malappuram",
    image: "/testimonials/rahul.jpg",
    text: "I was skeptical about the thermal regulation, but it actually works wonders. Even during humid Kerala nights, the mattress stays wonderfully cool and breathable.",
    rating: 5,
    tag: "Cooling Tech",
  },
  {
    name: "Dr. Priya Nambiar",
    location: "Kozhikode, Kerala",
    image: "/testimonials/priya.jpg",
    text: "True luxury and orthopaedic excellence. The premium textiles feel sublime, and the spinal alignment is balanced to perfection. Worth every rupee.",
    rating: 5,
    tag: "Spinal Care",
  },
  {
    name: "Sandeep Varma",
    location: "Thrissur, Kerala",
    image: "/testimonials/sandeep.jpg",
    text: "We upgraded to Elva recently and the difference is night and day. Quiet luxury at its finest. My wife and I get the deepest, most restorative sleep.",
    rating: 5,
    tag: "Luxury Rest",
  },
  {
    name: "Fathima Shameer",
    location: "Manjeri, Malappuram",
    image: "/testimonials/fathima.jpg",
    text: "Exceptional comfort and zero partner disturbance. Delivered quickly and the quality of stitching and materials is second to none in Kerala!",
    rating: 5,
    tag: "Motion Isolation",
  },
  {
    name: "Harikrishnan Nair",
    location: "Thiruvananthapuram, Kerala",
    image: "/testimonials/harikrishnan.jpg",
    text: "After trying multiple conventional mattresses, Elva is a complete game changer for posture and neck relief. Outstanding craftsmanship!",
    rating: 5,
    tag: "Ergonomic Support",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-secondary drop-shadow-[0_0_8px_rgba(202,138,4,0.3)]"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

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

  const maxIndex = testimonials.length - visibleCount;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay Timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-primary text-white overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            Client Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Words From Rested Sleepers
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto" />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Slider Viewport */}
          <div className="overflow-hidden py-4 -my-4">
            <motion.div
              className="flex transition-transform duration-700 ease-out"
              animate={{
                x: `-${currentIndex * (100 / visibleCount)}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: `0 0 ${100 / visibleCount}%`,
                  }}
                  className="px-3 sm:px-4 flex"
                >
                  <div className="w-full bg-white/[0.06] border border-white/10 rounded-3xl p-7 sm:p-8 backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.1] hover:border-secondary/40 transition-all duration-300 shadow-xl group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <StarRating count={testimonial.rating} />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary bg-secondary/15 border border-secondary/20 px-2.5 py-1 rounded-full">
                          {testimonial.tag}
                        </span>
                      </div>

                      <p className="text-white/85 font-light leading-relaxed text-sm sm:text-base italic mb-6">
                        "{testimonial.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-auto">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-secondary/60 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-white font-semibold text-base truncate">
                            {testimonial.name}
                          </h4>
                          <svg
                            className="w-4 h-4 text-secondary flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-white/60 text-xs font-light truncate">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between pointer-events-none absolute top-1/2 -translate-y-1/2 -left-3 -right-3 sm:-left-6 sm:-right-6">
            <button
              onClick={prevSlide}
              aria-label="Previous review"
              className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/80 border border-white/20 text-white hover:text-primary hover:bg-secondary hover:border-secondary transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-md hover:scale-110 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next review"
              className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/80 border border-white/20 text-white hover:text-primary hover:bg-secondary hover:border-secondary transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-md hover:scale-110 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots & Autoplay Indicator */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-8 bg-secondary"
                    : "w-2.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
