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
      className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 flex flex-col justify-between w-full"
    >
      {/* Top Image Showcase - Clean without floating icon or size chart overlay */}
      <div>
        <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {isBedCover && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-amber-400 text-[#1C3144] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {/* Category Subtitle (like screenshot 2 "Electricals") */}
          <span className="text-slate-500 text-sm font-medium block mb-1.5">
            {product.category}
          </span>

          {/* Product Name (like screenshot 2) */}
          <h3 className="text-xl sm:text-2xl font-bold text-[#1C3144] tracking-tight leading-snug mb-3 group-hover:text-[#2a4d6c] transition-colors">
            <Link href={isBedCover ? "#" : `/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Feature Badges / Pills with lightning icon (matching screenshot 2) */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 bg-[#E8F0FE] text-[#1C3144] text-xs sm:text-[13px] font-semibold px-3 py-1.5 rounded-xl border border-blue-100"
              >
                <FiZap className="w-3.5 h-3.5 text-[#1C3144] shrink-0" />
                <span className="truncate max-w-[190px]">{feature}</span>
              </span>
            ))}
          </div>

          {isBedCover && (
            <div className="mb-2 bg-amber-50 p-3 rounded-2xl border border-amber-200/60 text-xs text-amber-900 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Launching soon in Elva luxury bedding line</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Row (matching screenshot 2 exactly) */}
      <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 grid grid-cols-2 gap-3.5">
        {!isBedCover ? (
          <>
            {/* View Details Button: Solid Dark Navy (screenshot 2) */}
            <Link
              href={`/products/${product.slug}`}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#1C3144] hover:bg-[#253f58] text-white font-bold text-sm text-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center"
            >
              View Details
            </Link>

            {/* Enquire Now Button: White with 2px Dark Navy Border (screenshot 2) */}
            <button
              type="button"
              onClick={() =>
                onOpenEnquiry(
                  product.name,
                  isMattress ? "Mattress Collection" : "Pillows Collection"
                )
              }
              className="w-full py-3.5 px-4 rounded-2xl bg-white border-2 border-[#1C3144] text-[#1C3144] hover:bg-[#1C3144] hover:text-white font-bold text-sm text-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center"
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
            className="col-span-2 w-full py-3.5 px-4 rounded-2xl bg-[#1C3144] hover:bg-[#253f58] text-white font-bold text-sm text-center transition-all duration-300 shadow-sm cursor-pointer"
          >
            Enquire Early Access
          </button>
        )}
      </div>
    </motion.article>
  );
}
