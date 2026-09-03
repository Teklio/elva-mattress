"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

// Animate-on-scroll count up utility
function AnimatedCounter({ value, duration = 2.2, suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = value;
    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const easeOutQuad = progress * (2 - progress); // decelarate smoothly
      const currentVal = start + (end - start) * easeOutQuad;

      setCount(currentVal);

      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

const marqueeVariants: Variants = {
  animate: {
    x: [0, "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 18,
        ease: "linear",
      },
    },
  },
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div
      ref={containerRef}
      id="about"
      className="w-full bg-white pb-16 sm:pb-24 flex flex-col items-center justify-center overflow-hidden relative border-t border-gray-100"
    >
      {/* Infinite Scrolling Marquee Banner */}
      <div className="w-full overflow-hidden border-b border-black/[0.06] py-6 sm:py-8 bg-secondary select-none relative z-10 flex mb-16 sm:mb-24">
        <motion.div
          className="flex whitespace-nowrap gap-12 font-black uppercase text-4xl sm:text-6xl md:text-7xl select-none"
          variants={marqueeVariants}
          animate="animate"
        >
          <span
            style={{ WebkitTextStroke: "1px rgba(28, 49, 68, 0.45)", color: "#1C3144" }}
            className="tracking-widest flex-shrink-0"
          >
            ELVA MATTRESS • SLEEP DEFINED • ERGONOMIC PRECISION • QUIET LUXURY • &nbsp;
          </span>
          <span
            style={{ WebkitTextStroke: "1px rgba(28, 49, 68, 0.45)", color: "#1C3144" }}
            className="tracking-widest flex-shrink-0"
          >
            ELVA MATTRESS • SLEEP DEFINED • ERGONOMIC PRECISION • QUIET LUXURY • &nbsp;
          </span>
        </motion.div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D1B07A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D1B07A]/3 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Text Section */}
      <div className="max-w-8xl w-full px-6 sm:px-12 md:px-16 text-center z-10 mb-16 sm:mb-20">
        <div className="bg-primary border border-white/10 rounded-2xl px-8 sm:px-12 py-10 sm:py-14 backdrop-blur-sm relative overflow-hidden">
          
          {/* Decorative Vectors */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block opacity-30 pointer-events-none mix-blend-screen w-32 md:w-48 lg:w-64 h-auto">
            <Image src="/Vector.png" alt="Decorative Vector Left" width={300} height={300} className="w-full h-auto object-contain -translate-x-1/4" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block opacity-30 pointer-events-none mix-blend-screen w-32 md:w-48 lg:w-64 h-auto scale-x-[-1]">
            <Image src="/Vector.png" alt="Decorative Vector Right" width={300} height={300} className="w-full h-auto object-contain -translate-x-1/4" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-6"
          >
            <span className="text-[#D1B07A] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Our Legacy & Science
            </span>
            <h2 className="text-white text-3xl sm:text-5xl font-extrabold uppercase tracking-wide">
              About Elva
            </h2>
            <div className="w-10 h-0.5 bg-[#D1B07A] mt-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-base sm:text-lg md:text-2xl font-light leading-relaxed space-y-6 max-w-3xl mx-auto"
          >
            <p>
              Elva is a premium mattress brand dedicated to high-performing, design-conscious sleepers, delivering scientifically balanced support and thermal comfort.
            </p>
            <p>
              Backing modern sleep science with over 15 years of trusted interior and home furnishing legacy, Elva delivers high-performance mattresses engineered with ergonomic precision, breathable materials, and quiet luxury to redefine what restorative rest feels like.
            </p>
          </motion.div>

          {/* Read More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <motion.a
              href="/about"
              id="about-read-more-btn"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center bg-secondary gap-3 text-primary border-2 border-white/30 px-8 py-3.5 hover:text-primary rounded-full text-sm font-bold transition-colors duration-300 cursor-pointer"
            >
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Statistics Counter Section */}
      <div className="w-full max-w-8xl px-6 sm:px-12 md:px-16 z-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-24">
        {/* Stat 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isContainerInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-secondary border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm"
        >
          <span className="text-primary text-4xl sm:text-5xl font-black mb-3">
            <AnimatedCounter value={15} suffix="+" />
          </span>
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
            Years of furnishing legacy
          </span>
        </motion.div>

        {/* Stat 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isContainerInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-secondary border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm"
        >
          <span className="text-primary text-4xl sm:text-5xl font-black mb-3">
            <AnimatedCounter value={10} suffix="k+" />
          </span>
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
            Happy sleepers
          </span>
        </motion.div>

        {/* Stat 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isContainerInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-secondary border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm"
        >
          <span className="text-primary text-4xl sm:text-5xl font-black mb-3">
            <AnimatedCounter value={99.8} suffix="%" decimals={1} />
          </span>
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
            Sleep quality rating
          </span>
        </motion.div>
      </div>
    </div>
  );
}
