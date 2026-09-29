"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { FiZap } from "react-icons/fi";

interface ProductCardProps {
  product: Product;
  onOpenEnquiry: (productName: string, subtitle?: string) => void;
}

export default function ProductCard({
  product,
  onOpenEnquiry,
}: ProductCardProps) {
  const isMattress = product.category === "Mattress";
  const isBedCover = product.category === "Bed Cover";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col justify-between w-full"
    >
      {/* Top Image Showcase - 60% of card visual weight */}
      <div>
        <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3.2] w-full overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {isBedCover && (
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="bg-amber-400 text-[#1C3144] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {/* Category Subtitle */}
          <span className="text-slate-500 text-xs sm:text-sm font-medium block mb-1">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="text-xl sm:text-2xl font-bold text-[#1C3144] tracking-tight leading-snug mb-2.5 group-hover:text-[#2a4d6c] transition-colors">
            <Link href={isBedCover ? "#" : `/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Feature Badges / Pills with reduced text size */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {product.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 bg-[#E8F0FE] text-[#1C3144] text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-100/80"
              >
                <FiZap className="w-3 h-3 text-[#1C3144] shrink-0" />
                <span className="truncate max-w-[170px]">{feature}</span>
              </span>
            ))}
          </div>

          {isBedCover && (
            <div className="mb-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 text-xs text-amber-900 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Launching soon in Elva luxury bedding line</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 grid grid-cols-2 gap-3">
        {!isBedCover ? (
          <>
            {/* View Details Button */}
            <Link
              href={`/products/${product.slug}`}
              className="w-full py-3 px-3 rounded-xl bg-[#1C3144] hover:bg-[#253f58] text-white font-bold text-xs sm:text-sm text-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center"
            >
              View Details
            </Link>

            {/* Enquire Now Button */}
            <button
              type="button"
              onClick={() =>
                onOpenEnquiry(
                  product.name,
                  isMattress ? "Mattress Collection" : "Pillows Collection"
                )
              }
              className="w-full py-3 px-3 rounded-xl bg-white border-2 border-[#1C3144] text-[#1C3144] hover:bg-[#1C3144] hover:text-white font-bold text-xs sm:text-sm text-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center"
            >
              Enquire Now
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() =>
              onOpenEnquiry(product.name, "Bed Cover (VIP Early Waitlist)")
            }
            className="col-span-2 w-full py-3 px-4 rounded-xl bg-[#1C3144] hover:bg-[#253f58] text-white font-bold text-sm text-center transition-all duration-300 shadow-sm cursor-pointer"
          >
            Enquire Early Access
          </button>
        )}
      </div>
    </motion.article>
  );
}
