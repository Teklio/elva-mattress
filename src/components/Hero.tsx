"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Heder";

// Carousel images list (user-configured)
const carouselImages = [
  "/hero3.png",
  "/hero4.png",
  "/hero1.png",
  "/hero5.png"
];

interface ZzzParticle {
  id: number;
  x: number;
  scale: number;
  fontSize: number;
  delay: number;
}

// Sleeping animation spawning floating/drifting Zzz particles
function SleepingAnimation() {
  const [particles, setParticles] = useState<ZzzParticle[]>([]);

  useEffect(() => {
    const spawnTimer = setInterval(() => {
      const id = Date.now() + Math.random();
      const newParticle: ZzzParticle = {
        id,
        x: Math.random() * 50 - 25, // horizontal drift offset
        scale: Math.random() * 0.4 + 0.8, // random scale
        fontSize: Math.random() * 16 + 18, // random font size
        delay: Math.random() * 0.2,
      };
      setParticles((prev) => [...prev.slice(-5), newParticle]);
    }, 1800);

    return () => clearInterval(spawnTimer);
  }, []);

  return (
    <div className="absolute right-8 bottom-8 w-40 h-56 pointer-events-none overflow-hidden select-none z-10 flex items-end justify-center">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, y: 10, x: p.x, scale: 0.6 }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              y: -180,
              x: [p.x, p.x + 25, p.x - 15, p.x + 10],
              scale: [0.6, p.scale, p.scale, 0.5],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4.5,
              ease: "easeOut",
              delay: p.delay,
            }}
            style={{ fontSize: p.fontSize }}
            className="absolute text-[#D1B07A] font-semibold font-serif select-none"
          >
            Z
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} as const;

const textVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto carousel effect: cycle every 2.5 seconds (user-configured)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col lg:flex-row w-full h-auto lg:h-screen lg:min-h-[700px] overflow-hidden bg-primary">
      {/* ── Header ── */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Header />
      </div>

      {/* ── Left — Image Panel (Auto Carousel) ── */}
      <motion.div
        className="relative w-full h-[30vh] sm:h-[38vh] md:h-[45vh] lg:h-full lg:w-[55%] overflow-hidden bg-black"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={carouselImages[currentImageIndex]}
              alt={`Luxury mattress floating on clouds - slide ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators (Dots) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20 bg-black/25 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`transition-all duration-300 focus:outline-none cursor-pointer ${index === currentImageIndex
                  ? "w-5 h-1.5 bg-white rounded-full"
                  : "w-1.5 h-1.5 bg-white/40 rounded-full hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Overlay gradient to blend the bottom transition on mobile devices */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C3144]/40 to-transparent lg:hidden z-10 pointer-events-none" />
      </motion.div>

      {/* ── Right — Content Panel ── */}
      <div className="relative w-full lg:w-[45%] bg-[#1C3144] flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 py-12 sm:px-12 sm:py-16 md:px-20 lg:px-16 lg:py-20 overflow-hidden flex-grow">

        {/* Sleeping Animation — bottom right */}
        <SleepingAnimation />

        {/* Gold accent line */}
        <motion.div
          className="w-12 h-1 bg-[#D1B07A] rounded-full mb-6 mx-auto lg:mx-0"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          style={{ originX: 0 }}
        />

        {/* Text content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center lg:items-start"
        >
          <motion.h1
            variants={textVariants}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black uppercase leading-[1.1] tracking-wide mb-6 lg:mb-8"
          >
            SLEEP LIKE<br />
            YOU&apos;RE FLOATING<br />
            ON CLOUDS
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-white/60 text-sm sm:text-base mb-8 lg:mb-10 font-light max-w-xs sm:max-w-md lg:max-w-xs leading-relaxed"
          >
            Experience next-level comfort with ELVA medicated mattresses — engineered for the perfect night&apos;s rest.
          </motion.p>

          <motion.a
            href="#products"
            id="hero-explore-btn"
            variants={textVariants}
            whileHover={{ scale: 1.04, backgroundColor: "#D1B07A", color: "#1C3144", borderColor: "#D1B07A" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-transparent text-white border border-white/40 px-8 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer self-center lg:self-start"
          >
            Explore Products
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
    </section>
  );
}
