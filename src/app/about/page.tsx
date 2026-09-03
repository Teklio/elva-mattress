"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 overflow-hidden bg-white"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-8xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 sm:mb-24"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span variants={fadeUpVariants} className="text-secondary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            The Elva Philosophy
          </motion.span>
          <motion.h1 variants={fadeUpVariants} className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-primary">
            Redefining Restorative Rest
          </motion.h1>
          <motion.div variants={fadeUpVariants} className="w-16 h-1 bg-secondary mx-auto mt-8" />
        </motion.div>

        {/* Two Column Layout: Image & Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 sm:mb-28">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[400px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-overlay pointer-events-none"></div>
            <Image 
              src="/ab.png" 
              alt="Elva premium mattress" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* About Text */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col justify-center space-y-6"
          >
            <motion.p variants={fadeUpVariants} className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-primary/80">
              <strong className="font-semibold text-primary">Elva is a premium mattress brand</strong> dedicated to high-performing, design-conscious sleepers, delivering scientifically balanced support and thermal comfort.
            </motion.p>
            <motion.p variants={fadeUpVariants} className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-primary/80">
              Backing modern sleep science with over 15 years of trusted interior and home furnishing legacy, Elva delivers high-performance mattresses engineered with ergonomic precision, breathable materials, and quiet luxury to redefine what restorative rest feels like.
            </motion.p>
            
            <motion.div variants={fadeUpVariants} className="pt-6">
              <a href="/#products" className="inline-flex items-center gap-4 bg-primary text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all duration-300">
                Discover the Collection
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-primary text-white p-10 sm:p-14 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />
            <h3 className="text-secondary text-lg font-bold uppercase tracking-widest mb-6 relative z-10">Our Mission</h3>
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-white/90 relative z-10">
              To engineer sleep systems that eliminate physical compromise—combining ergonomic precision, premium textiles, and thermal regulation to provide deeper, truly restorative rest every night.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="bg-secondary p-10 sm:p-14 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-all duration-500"
          >
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mb-10 transition-transform duration-500 group-hover:scale-150" />
            <h3 className="text-primary text-lg font-bold uppercase tracking-widest mb-6 relative z-10">Our Vision</h3>
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-primary/90 relative z-10">
              To establish the global benchmark for restorative living, where high-performance sleep is recognized as the ultimate foundation of daily well-being and longevity.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
