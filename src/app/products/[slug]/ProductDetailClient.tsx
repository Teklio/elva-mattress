"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { LuRuler } from "react-icons/lu";
import Header from "@/components/Heder";
import Footer from "@/components/footer";
import EnquiryModal from "@/components/EnquiryModal";
import SizeChartModal from "@/components/SizeChartModal";
import ProductCard from "@/components/ProductCard";
import { Product, MattressSizeInfo } from "@/data/products";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  mattressSizes: MattressSizeInfo[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  mattressSizes,
}: ProductDetailClientProps) {
  const isMattress = product.category === "Mattress";
  const isPillow = product.category === "Pillows";

  // Active Mattress Size (if selected via Size Chart modal)
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Active showcase image
  const [activeImage, setActiveImage] = useState<string>(product.image);

  // Modals state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [enquiryOverride, setEnquiryOverride] = useState<{
    name: string;
    subtitle?: string;
  } | null>(null);

  const currentSizeObj = selectedSize
    ? mattressSizes.find((s) => s.name === selectedSize)
    : null;

  const handleEnquireWithSelection = () => {
    setEnquiryOverride(null);
    setIsEnquiryOpen(true);
  };

  // Gallery images (gallery list or fallback to main + secondary)
  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [
          product.image,
          ...(product.secondaryImage && product.secondaryImage !== product.image
            ? [product.secondaryImage]
            : []),
        ];

  // Highlights for the soft blue feature box (matching screenshot model)
  const highlightBullets = [
    ...product.features.slice(0, 4),
    ...(product.warranty ? [product.warranty] : []),
  ].slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1C3144]">
      {/* Top Header */}
      <div className="bg-[#1C3144] sticky top-0 z-40 border-b border-white/10 shadow-md">
        <Header logoVariant="white" />
      </div>

      <main className="flex-1 pb-20">
        {/* Breadcrumb Navigation */}
        <section className="bg-white py-4 px-6 sm:px-12 border-b border-slate-100">
          <div className="max-w-[1550px] 2xl:max-w-[1720px] mx-auto flex items-center justify-between">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 overflow-x-auto whitespace-nowrap py-1">
              <Link href="/" className="hover:text-[#1C3144] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-[#1C3144] transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <span className="text-[#D1B07A]">{product.category}</span>
              <span>/</span>
              <span className="text-[#1C3144] font-bold truncate max-w-[200px]">
                {product.name}
              </span>
            </nav>

            <Link
              href="/products"
              className="text-xs font-bold text-[#1C3144] hover:text-[#D1B07A] flex items-center gap-1.5 transition-colors uppercase tracking-wider shrink-0 ml-4"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Collection</span>
            </Link>
          </div>
        </section>

        {/* Main Product Showcase Card */}
        <section className="max-w-[1550px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-10">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
              {/* Left Column: Image fills this entire side with NO gray box */}
              <div className="lg:col-span-6 flex flex-col">
                {/* Main Image Showcase - shows full image uncropped */}
                <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white">
                  <Image
                    src={activeImage}
                    alt={product.name}
                    width={1400}
                    height={1100}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-auto object-contain block transition-all duration-300"
                  />
                </div>

                {/* Sub-images / Thumbnails row directly below image */}
                {galleryImages.length > 1 && (
                  <div className="flex items-center gap-3 mt-4 sm:mt-5">
                    {galleryImages.map((imgSrc, idx) => {
                      const isActive = activeImage === imgSrc;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImage(imgSrc)}
                          className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl p-0.5 overflow-hidden transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "border-2 border-[#1C3144] shadow-sm scale-105"
                              : "border-2 border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400"
                          }`}
                        >
                          <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-50">
                            <Image
                              src={imgSrc}
                              alt={`${product.name} view ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

                {/* Right Column: Title, Description, Blue Feature Box, Materials & CTAs */}
              <div className="lg:col-span-6 flex flex-col justify-start">
                {/* 1. Category Pill (matching screenshot 'Lightings') */}
                <span className="inline-block w-fit bg-[#E8F0FE] text-[#1C3144] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-3 sm:mb-4">
                  {product.category}
                </span>

                {/* 2. Product Title (bold, high contrast typography matching screenshot) */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-black text-[#1C3144] tracking-tight leading-[1.12] mb-3 sm:mb-4">
                  {product.name}
                </h1>

                {/* 3. Description text (relaxed paragraph directly below title) */}
                <p className="text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-normal">
                  {product.tagline ? `${product.tagline}. ` : ""}
                  {product.description}
                </p>

                {/* 4. Highlight Feature Box (Exact matching screenshot blue box with bullets) */}
                <div className="bg-[#E8F0FE] rounded-2xl sm:rounded-[24px] p-5 sm:p-7 mb-6 sm:mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {highlightBullets.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm sm:text-base font-semibold text-[#1C3144]"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#1C3144] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Pillow Dimensions (if Pillow) */}
                {isPillow && product.size && (
                  <div className="mb-6 p-5 rounded-2xl bg-[#E8F0FE] border border-blue-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C3144] block">
                        Form Factor &amp; Dimensions
                      </span>
                      <div className="text-xl font-bold text-[#1C3144] mt-0.5">
                        {product.size}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Engineered for ergonomic cervical neck relief
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#1C3144] shadow-xs">
                      <LuRuler className="w-5 h-5" />
                    </div>
                  </div>
                )}
                {/* 6. Bottom Action Buttons (Matching design system) */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Primary Solid Button: Enquire Now */}
                  <button
                    id="product-enquire-now-btn"
                    onClick={handleEnquireWithSelection}
                    className="w-full py-4 sm:py-4.5 px-6 sm:px-8 rounded-2xl bg-[#1C3144] hover:bg-[#253f58] text-white font-bold text-sm sm:text-base text-center transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Enquire Now</span>
                    {selectedSize && (
                      <span className="text-xs text-white/80">
                        ({selectedSize})
                      </span>
                    )}
                  </button>

                  {/* Secondary Button */}
                  {isMattress ? (
                    <button
                      onClick={() => setIsSizeChartOpen(true)}
                      className="w-full py-4 sm:py-4.5 px-6 sm:px-8 rounded-2xl bg-white border-2 border-[#1C3144] text-[#1C3144] hover:bg-[#1C3144] hover:text-white font-bold text-sm sm:text-base text-center transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <LuRuler className="w-4 h-4" />
                      <span>View Size Chart</span>
                    </button>
                  ) : (
                    <Link
                      href="/contact"
                      className="w-full py-4 sm:py-4.5 px-6 sm:px-8 rounded-2xl bg-white border-2 border-[#1C3144] text-[#1C3144] hover:bg-[#1C3144] hover:text-white font-bold text-sm sm:text-base text-center transition-all duration-300 cursor-pointer flex items-center justify-center"
                    >
                      Contact Showroom
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Grid (3 cards per line on desktop) */}
        {relatedProducts.length > 0 && (
          <section className="max-w-[1550px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-16 sm:pt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-block bg-[#E8F0FE] text-[#1C3144] px-3.5 py-1 rounded-full text-xs font-bold mb-2">
                  Similar Models
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C3144] tracking-tight">
                  Related {product.category} Products
                </h3>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-[#1C3144] hover:text-[#D1B07A] uppercase tracking-wider flex items-center gap-1"
              >
                <span>View All</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onOpenEnquiry={(name, subtitle) => {
                    setEnquiryOverride({ name, subtitle });
                    setIsEnquiryOpen(true);
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        selectedSize={selectedSize || mattressSizes[2]?.name}
        onSelectSize={(size) => setSelectedSize(size)}
        onEnquireNow={(size) => {
          setSelectedSize(size || selectedSize);
          setEnquiryOverride(null);
          setIsEnquiryOpen(true);
        }}
      />

      {/* Enquiry Form Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => {
          setIsEnquiryOpen(false);
          setEnquiryOverride(null);
        }}
        productName={
          enquiryOverride
            ? enquiryOverride.name
            : isMattress && selectedSize && currentSizeObj
            ? `${product.name} (${selectedSize} - ${currentSizeObj.dimension})`
            : product.size
            ? `${product.name} (${product.size})`
            : product.name
        }
        subtitle={
          enquiryOverride
            ? enquiryOverride.subtitle
            : isMattress && currentSizeObj
            ? `Bed frame fit: ${currentSizeObj.approxBedSize}`
            : undefined
        }
      />
    </div>
  );
}
