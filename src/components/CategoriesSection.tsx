"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCategory, Product } from "@/data/products";

interface CategoriesSectionProps {
  onSelectCategory?: (category: ProductCategory) => void;
  isHomePage?: boolean;
  initialProducts?: Product[];
}

export const BASE_CATEGORIES_DATA = [
  {
    name: "Mattress" as ProductCategory,
    title: "Mattresses",
    image: "/categories/mattress-white.jpg",
    actionText: "View Collection →",
  },
  {
    name: "Pillows" as ProductCategory,
    title: "Pillows",
    image: "/categories/pillows-white.jpg",
    actionText: "View Collection →",
  },
  {
    name: "Bed Cover" as ProductCategory,
    title: "Bed Cover",
    image: "/categories/bedcover-clean.jpg",
    badge: "Coming Soon",
    actionText: "Join Waitlist →",
  },
];

export default function CategoriesSection({
  onSelectCategory,
  isHomePage = false,
  initialProducts = [],
}: CategoriesSectionProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
    } else if (products.length === 0) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (data?.products && Array.isArray(data.products)) {
            setProducts(data.products);
          }
        })
        .catch((err) => console.error("Error fetching live categories count:", err));
    }
  }, [initialProducts, products.length]);

  // Compute live models count per category
  const categoriesWithLiveCount = useMemo(() => {
    return BASE_CATEGORIES_DATA.map((cat) => {
      const count = products.filter((p) => p.category === cat.name).length;
      let modelsCount = "";

      if (count > 0) {
        modelsCount = `${count} ${count === 1 ? "Model Available" : "Models Available"}`;
      } else if (cat.name === "Bed Cover") {
        modelsCount = "Arriving Soon";
      } else {
        modelsCount = "0 Models Available";
      }

      return {
        ...cat,
        modelsCount,
        count,
      };
    });
  }, [products]);

  // Auto-cycle single card carousel on mobile devices (every 3.5s)
  useEffect(() => {
    if (!categoriesWithLiveCount.length) return;
    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % categoriesWithLiveCount.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [categoriesWithLiveCount.length]);

  const handleCardClick = (catName: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
  };

  const renderCard = (cat: (typeof categoriesWithLiveCount)[0]) => {
    const isBedCover = cat.name === "Bed Cover";

    const cardContent = (
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-[32px] p-5 sm:p-6 shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
      >
        <div>
          {/* Image Showcase */}
          <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[24px] overflow-hidden bg-white border border-slate-100/80 mb-6">
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-600 ease-out"
            />

            {/* Optional coming soon badge */}
            {cat.count === 0 && cat.badge && (
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

        {/* Bottom Card Footer with Live Models Count */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs sm:text-sm font-bold">
          <span className={isBedCover && cat.count === 0 ? "text-amber-700" : "text-slate-600"}>
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
  };

  return (
    <section className="py-20 px-6 sm:px-14 w-full max-w-8xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
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

      {/* Desktop 3-Card Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-10">
        {categoriesWithLiveCount.map((cat) => renderCard(cat))}
      </div>

      {/* Mobile Single-Card Auto-Carousel */}
      <div className="block md:hidden w-full relative">
        {categoriesWithLiveCount.length > 0 && (
          <div className="w-full">
            <motion.div
              key={categoriesWithLiveCount[activeMobileIndex]?.name || activeMobileIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full"
            >
              {renderCard(categoriesWithLiveCount[activeMobileIndex])}
            </motion.div>

            {/* Carousel Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {categoriesWithLiveCount.map((cat, idx) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeMobileIndex
                      ? "w-7 h-2.5 bg-[#1C3144]"
                      : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`View ${cat.title} category`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
