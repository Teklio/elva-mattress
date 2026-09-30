"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Heder";
import Footer from "@/components/footer";
import ProductCard from "@/components/ProductCard";
import SizeChartModal from "@/components/SizeChartModal";
import EnquiryModal from "@/components/EnquiryModal";
import CategoriesSection from "@/components/CategoriesSection";
import {
  PRODUCTS,
  MATTRESS_SIZES,
  ProductCategory,
  Product,
} from "@/data/products";
import { FiBox, FiShield, FiZap, FiChevronRight, FiSearch, FiArrowRight } from "react-icons/fi";
import { IoBedOutline, IoCloudOutline, IoSparklesOutline } from "react-icons/io5";
import { LuRuler } from "react-icons/lu";

export default function ProductsPage() {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [initialSizeForChart, setInitialSizeForChart] = useState<string | undefined>(undefined);

  // Fetch Storyblok products dynamically
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.products && Array.isArray(data.products) && data.products.length > 0) {
          setProductList(data.products);
        }
      })
      .catch((err) => console.error("Error loading Storyblok products:", err));
  }, []);

  // Enquiry modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState<{
    name: string;
    subtitle?: string;
  }>({ name: "" });

  const categoriesList: { label: string; value: ProductCategory | "All" }[] = [
    { label: "All", value: "All" },
    { label: "Mattress", value: "Mattress" },
    { label: "Pillows", value: "Pillows" },
    { label: "Bed Cover", value: "Bed Cover" },
  ];

  const filteredProducts = useMemo(() => {
    return productList.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some((f) =>
          f.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [productList, selectedCategory, searchQuery]);

  const handleOpenEnquiry = (name: string, subtitle?: string) => {
    setEnquiryProduct({ name, subtitle });
    setIsEnquiryOpen(true);
  };

  const handleOpenSizeChart = (sizeName?: string) => {
    setInitialSizeForChart(sizeName);
    setIsSizeChartOpen(true);
  };

  const scrollToProducts = () => {
    const el = document.getElementById("products-catalog-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1C3144]">
      {/* Top Header */}
      <div className="bg-[#1C3144] sticky top-0 z-40 border-b border-white/10 shadow-md">
        <Header logoVariant="white" />
      </div>

      <main className="flex-1">
        {/* ======================================================== */}
        {/* HERO SECTION (Styled like Screenshot 1)                  */}
        {/* ======================================================== */}
        <section className="relative bg-[#1C3144] text-white pt-12 pb-24 px-6 sm:px-12 overflow-hidden">
          {/* Background image with color grade overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero3.png"
              alt="ELVA Sleep Solutions"
              fill
              priority
              className="object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C3144]/95 via-[#1C3144]/90 to-[#1C3144]/85" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#D1B07A]">Products</span>
            </nav>

            {/* Hero Main: Left Text & CTA, Right Pure PNG Product Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center mb-16">
              {/* Left Column */}
              <div className="lg:col-span-6 xl:col-span-6">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.12] mb-6">
                  Complete Sleep &amp; <br />
                  Restorative Solutions <br />
                  Under One Roof
                </h1>

                <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
                  Premium orthopedic mattresses, ergonomic cervical contour pillows, and luxury
                  protective bedding engineered for restorative spinal support, safety, and peak everyday performance.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={scrollToProducts}
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#1C3144] font-bold text-sm px-7 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Explore Products</span>
                    <FiChevronRight className="w-4 h-4 text-[#1C3144]" />
                  </button>

                  {/* Highlighted Size Chart Button in Hero */}
                  <button
                    id="hero-size-chart-guide-btn"
                    onClick={() => handleOpenSizeChart()}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 font-bold text-sm px-7 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <LuRuler className="w-4 h-4 text-[#D1B07A]" />
                    <span>Size Chart</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Much larger PNG Product Showcase on Large Screens */}
              <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative mt-6 lg:mt-0">
                {/* Soft ambient golden backlight */}
                <div className="absolute w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] bg-[#D1B07A]/20 rounded-full blur-3xl pointer-events-none -z-10" />

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl aspect-[16/11] lg:aspect-[4/3] lg:scale-110 xl:scale-115 transform-gpu"
                >
                  <Image
                    src="/sleep-ensemble.png"
                    alt="ELVA Complete Rest Ensemble - Mattress, Pillows, and Bed Cover"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    className="object-contain filter drop-shadow-[0_30px_45px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </motion.div>
              </div>
            </div>

            {/* 3 Stat Cards Row (Exact Match to Screenshot 1 with react-icons) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6">
              {/* Stat 1 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-xl shrink-0 text-white">
                  <FiBox className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">500+</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                    HAPPY SLEEPERS
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-xl shrink-0 text-white">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">15+</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                    YEARS TRUST &amp; LEGACY
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-xl shrink-0 text-white">
                  <FiZap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">98%</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                    SATISFACTION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* "OUR CATEGORIES" SECTION (3-card design, new images, no icons) */}
        {/* ======================================================== */}
        <CategoriesSection
          initialProducts={productList}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToProducts();
          }}
        />

        {/* ======================================================== */}
        {/* "FEATURED / POPULAR PRODUCTS" (Styled like Screenshot 4) */}
        {/* ======================================================== */}
        <section id="products-catalog-section" className="py-16 px-6 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block bg-[#E8F0FE] text-[#1C3144] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4">
              Featured Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C3144] tracking-tight mb-4">
              Popular Products
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Explore our best-selling products trusted by thousands of customers.
            </p>
          </div>

          {/* Filter Tabs: Removed Size Chart, Increased button padding and text size */}
          <div className="flex items-center justify-center mb-14">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {categoriesList.map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-8 sm:px-11 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md ${
                      isActive
                        ? "bg-[#1C3144] text-white shadow-md scale-105"
                        : "bg-white text-slate-600 hover:text-[#1C3144] hover:bg-slate-50 border border-slate-200/90"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar helper */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name, type, foam layer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 text-sm text-[#1C3144] placeholder-slate-400 focus:outline-none focus:border-[#1C3144] shadow-xs"
              />
              <FiSearch className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Products Grid: 3 cards in one line on large screens (Screenshot 2 design) */}
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenEnquiry={handleOpenEnquiry}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-100 p-8 shadow-xs">
              <span className="text-4xl block mb-3">🔍</span>
              <h3 className="text-xl font-bold text-[#1C3144] mb-2">
                No matching products found
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Try searching with different keywords or reset your category selection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 rounded-full bg-[#1C3144] text-white font-bold text-xs uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Sizing Matrix Table Section on the Page */}
          <div className="mt-20 bg-white rounded-[32px] p-6 sm:p-10 border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <span className="inline-block bg-[#E8F0FE] text-[#1C3144] px-3.5 py-1 rounded-full text-xs font-bold mb-2">
                  Official Sizing Guide
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C3144] tracking-tight">
                  Available Mattress Cot Dimensions
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  All ELVA mattresses are manufactured in standardized cot specifications with custom dimensions available.
                </p>
              </div>

              <button
                onClick={() => handleOpenSizeChart()}
                className="px-5 py-2.5 rounded-2xl bg-[#1C3144] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#284661] transition-colors cursor-pointer self-start sm:self-auto shrink-0 flex items-center gap-2"
              >
                <span>Size chart</span>
                <span>↗</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-[#1C3144] font-bold text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 rounded-l-xl">Size</th>
                    <th className="py-3 px-4">Mattress Dimension</th>
                    <th className="py-3 px-4">Approx. Bed Size</th>
                    <th className="py-3 px-4 rounded-r-xl">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MATTRESS_SIZES.map((size) => (
                    <tr
                      key={size.name}
                      onClick={() => handleOpenSizeChart(size.name)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-[#1C3144]">
                        {size.name}
                      </td>
                      <td className="py-4 px-4 font-mono font-semibold text-[#1C3144]">
                        {size.dimension}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-600">
                        {size.approxBedSize}
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        {size.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        selectedSize={initialSizeForChart}
        onEnquireNow={(sizeName) => {
          handleOpenEnquiry("Mattress Custom Order", `Cot Size: ${sizeName}`);
        }}
      />

      {/* Enquiry Form Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={enquiryProduct.name}
        subtitle={enquiryProduct.subtitle}
      />
    </div>
  );
}
