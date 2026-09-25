"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MATTRESS_SIZES, MattressSizeInfo } from "@/data/products";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (sizeName: string) => void;
  selectedSize?: string;
  onEnquireNow?: (sizeName?: string) => void;
}

export default function SizeChartModal({
  isOpen,
  onClose,
  onSelectSize,
  selectedSize,
  onEnquireNow,
}: SizeChartModalProps) {
  const [activeTab, setActiveTab] = useState<string>(
    selectedSize || MATTRESS_SIZES[2].name // Queen default
  );

  const currentSize: MattressSizeInfo =
    MATTRESS_SIZES.find((s) => s.name === activeTab) || MATTRESS_SIZES[2];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-secondary/20 z-10 text-primary overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-primary/10 pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 bg-secondary/15 text-primary text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-secondary/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                    Official Mattress Size Guide
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                  Available Mattress Sizes
                </h3>
                <p className="text-primary/70 text-xs sm:text-sm mt-1">
                  Find the exact cot fit for your bedroom frame and sleeping comfort
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-primary/5 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors cursor-pointer text-sm shrink-0 ml-4"
                aria-label="Close size chart modal"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto pr-1 space-y-6">
              {/* Highlighted Specification Table */}
              <div className="rounded-2xl border border-secondary/30 bg-primary/2 overflow-hidden shadow-sm">
                <div className="bg-primary text-white px-4 sm:px-6 py-3.5 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary">
                    ELVA Standard Sizing Dimensions
                  </span>
                  <span className="text-[11px] text-white/70">Imperial & Metric</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-primary/5 border-b border-primary/10 text-primary font-bold uppercase text-[11px] tracking-wider">
                        <th className="py-3 px-4 sm:px-6">Size Name</th>
                        <th className="py-3 px-4 sm:px-6">Mattress Dimension</th>
                        <th className="py-3 px-4 sm:px-6">Approx. Bed Size</th>
                        <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5">
                      {MATTRESS_SIZES.map((size) => {
                        const isSelected = activeTab === size.name;
                        return (
                          <tr
                            key={size.name}
                            onClick={() => {
                              setActiveTab(size.name);
                              if (onSelectSize) onSelectSize(size.name);
                            }}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-secondary/15 font-semibold text-primary"
                                : "hover:bg-primary/5 text-primary/80"
                            }`}
                          >
                            <td className="py-3.5 px-4 sm:px-6 flex items-center gap-2">
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${
                                  isSelected ? "bg-secondary" : "bg-primary/20"
                                }`}
                              />
                              <span className="font-bold text-primary">{size.name}</span>
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 font-mono text-xs sm:text-sm font-semibold text-primary">
                              {size.dimension}
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 font-mono text-xs sm:text-sm text-primary/80">
                              {size.approxBedSize}
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-right">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTab(size.name);
                                  if (onSelectSize) onSelectSize(size.name);
                                }}
                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-primary text-secondary shadow-sm"
                                    : "bg-primary/5 hover:bg-primary/10 text-primary"
                                }`}
                              >
                                {isSelected ? "Selected" : "Select"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interactive Visual Cot Preview Box */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-5 rounded-2xl border border-secondary/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-secondary block">
                      Active Selection Preview
                    </span>
                    <h4 className="text-lg font-bold text-primary">
                      {currentSize.name} — {currentSize.dimension} ({currentSize.approxBedSize})
                    </h4>
                  </div>

                  <span className="text-xs bg-white text-primary font-bold px-3 py-1 rounded-full border border-primary/10 shadow-xs self-start sm:self-auto">
                    Fits {currentSize.approxBedSize} Bed Cot
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
                  {currentSize.description}
                </p>

                {/* Cot Graphic representation */}
                <div className="mt-4 pt-4 border-t border-primary/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/80 p-3 rounded-xl border border-primary/5">
                    <span className="text-[10px] uppercase font-bold text-primary/60 block">Length</span>
                    <span className="text-sm font-bold text-primary">75 inches (6.25 ft)</span>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-primary/5">
                    <span className="text-[10px] uppercase font-bold text-primary/60 block">Width</span>
                    <span className="text-sm font-bold text-primary">
                      {currentSize.name === "Single Cot" && "36 in (3 ft)"}
                      {currentSize.name === "Double Cot" && "48 in (4 ft)"}
                      {currentSize.name === "Queen Size" && "60 in (5 ft)"}
                      {currentSize.name === "King Size" && "72 in (6 ft)"}
                    </span>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-primary/5">
                    <span className="text-[10px] uppercase font-bold text-primary/60 block">Ideal For</span>
                    <span className="text-sm font-bold text-primary">
                      {currentSize.name === "Single Cot" && "Single Sleeper"}
                      {currentSize.name === "Double Cot" && "Adult / Space-saver"}
                      {currentSize.name === "Queen Size" && "Couples (Popular)"}
                      {currentSize.name === "King Size" && "Master Bed Luxury"}
                    </span>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-primary/5">
                    <span className="text-[10px] uppercase font-bold text-primary/60 block">Customizable</span>
                    <span className="text-sm font-bold text-secondary">Yes on Request</span>
                  </div>
                </div>
              </div>

              {/* How to Measure Tips */}
              <div className="bg-white p-4 rounded-2xl border border-primary/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  📐
                </div>
                <div className="text-xs sm:text-sm text-primary/80">
                  <span className="font-bold text-primary block">How to measure your cot correctly:</span>
                  Measure the inner frame of your bed where the mattress sits (Length × Width). If your cot is slightly off-standard, ELVA crafts custom-fit sizes upon request!
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 pt-4 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-primary/60 text-center sm:text-left">
                Selected: <strong className="text-primary">{activeTab}</strong>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/5 transition-colors cursor-pointer text-center"
                >
                  Close
                </button>
                {onEnquireNow && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onEnquireNow(activeTab);
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-primary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer text-center"
                  >
                    Enquire for {activeTab}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
