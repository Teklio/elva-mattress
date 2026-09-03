"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white overflow-hidden select-none"
        >
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none -top-20 -left-20" />
          <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -bottom-20 -right-20" />

          {/* Main Content Container */}
          <div className="relative flex flex-col items-center z-10 px-6">
            
            {/* Primary Circle with Highlighted White Logo */}
            <div className="relative flex items-center justify-center">
              
              {/* Outer Pulsing Glow Aura */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.4 }}
                animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-primary/10 blur-xl pointer-events-none"
              />

              {/* Animated Golden Progress Ring */}
              <svg className="absolute w-48 h-48 sm:w-60 sm:h-60 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  className="stroke-primary/10"
                  strokeWidth="2.5"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  className="stroke-secondary"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="289.026"
                  initial={{ strokeDashoffset: 289.026 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2.35, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </svg>

              {/* Primary Background Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 relative overflow-hidden border-2 border-primary/20 p-6"
              >
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-secondary/20 pointer-events-none rounded-full" />
                
                {/* Highlighted White Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <Image
                    src="/logo.png"
                    alt="ELVA – Sleep Defined"
                    width={160}
                    height={55}
                    priority
                    className="object-contain h-12 sm:h-16 w-auto brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Typography & Subtitle below circle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-center mt-8"
            >
              <p className="text-primary font-bold text-xs sm:text-sm uppercase tracking-[0.35em]">
                Sleep Defined
              </p>
              <p className="text-primary/50 text-[11px] font-medium tracking-[0.2em] mt-1 uppercase">
                Medicated Luxury Sleep Systems
              </p>
            </motion.div>

            {/* Linear Progress Bar */}
            <div className="w-40 sm:w-52 h-[3px] bg-primary/10 rounded-full mt-6 overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full bg-gradient-to-r from-secondary/80 via-secondary to-primary rounded-full shadow-[0_0_8px_rgba(202,138,4,0.6)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
