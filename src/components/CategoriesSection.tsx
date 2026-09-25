"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCategory } from "@/data/products";

interface CategoriesSectionProps {
  onSelectCategory?: (category: ProductCategory) => void;
  isHomePage?: boolean;
}

export const CATEGORIES_DATA = [
  {
    name: "Mattress" as ProductCategory,
    title: "Mattresses",
    modelsCount: "6 Models Available",
    image: "/categories/mattress-white.jpg",
    actionText: "View Collection →",
  },
  {
    name: "Pillows" as ProductCategory,
    title: "Pillows",
    modelsCount: "5 Models Available",
    image: "/categories/pillows-white.jpg",
    actionText: "View Collection →",
  },
  {
    name: "Bed Cover" as ProductCategory,
    title: "Bed Cover",
    modelsCount: "Arriving Soon",
    image: "/categories/bedcover-clean.jpg",
    badge: "Coming Soon",
    actionText: "Join Waitlist →",
  },
];

export default function CategoriesSection({
  onSelectCategory,
  isHomePage = false,
}: CategoriesSectionProps) {
  const handleCardClick = (catName: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
  };

  return (
    <section className="py-20 px-6 sm:px-14 w-full max-w-8xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block bg-[#E8F0FE] text-[#1C3144] px-5 py-4 rounded-full text-sm sm:text-lg font-bold tracking-wider mb-4">
          Our Categories
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C3144] tracking-tight mb-4">
          Explore Our Product Range
        </h2>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Discover our comprehensive range of high-quality sleep systems designed for every
          posture, mattress dimension, and orthopedic requirement.
        </p>
      </div>

      {/* 3 Category Cards in One Line on Large Screen with increased width */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {CATEGORIES_DATA.map((cat) => {
          const isBedCover = cat.name === "Bed Cover";

          const cardContent = (
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group bg-white rounded-[32px] p-5 sm:p-6 shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
            >
              <div>
                {/* Image Showcase - Pure product image on clean white background */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[24px] overflow-hidden bg-white border border-slate-100/80 mb-6">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-600 ease-out"
                  />

                  {/* Optional coming soon badge on Bed Cover */}
                  {cat.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-amber-400 text-[#1C3144] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                        {cat.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C3144] group-hover:text-[#2a4d6c] transition-colors mb-3 tracking-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs sm:text-sm font-bold">
                <span className={isBedCover ? "text-amber-700" : "text-slate-600"}>
                  {cat.modelsCount}
                </span>
                <span className="text-[#1C3144] group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                  {cat.actionText}
                </span>
              </div>
            </motion.div>
          );

          if (isHomePage) {
            return (
              <Link
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="block h-full"
              >
                {cardContent}
              </Link>
            );
          }

          return (
            <div
              key={cat.name}
              onClick={() => handleCardClick(cat.name)}
              className="h-full"
            >
              {cardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
