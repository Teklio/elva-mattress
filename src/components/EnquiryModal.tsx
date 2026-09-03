"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  productName,
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    location: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ fullname: "", phone: "", location: "" });
        onClose();
      }, 2500);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-primary/10 z-10 text-primary overflow-hidden my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors cursor-pointer text-sm"
              aria-label="Close enquiry modal"
            >
              ✕
            </button>

            {/* Top Logo & Header */}
            <div className="flex flex-col items-center text-center mb-6 pt-2">
              <Image
                src="/logo.png"
                alt="ELVA – Sleep Defined"
                width={130}
                height={44}
                priority
                className="object-contain h-20 w-auto mb-3"
              />
              <span className="text-secondary text-[11px] font-bold uppercase tracking-[0.25em] block">
                Quick Enquiry
              </span>
              {productName && (
                <p className="text-xs text-primary/70 mt-1 font-medium bg-primary/5 px-3 py-1 rounded-full">
                  Product: {productName}
                </p>
              )}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-md">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-primary mb-1">Enquiry Submitted!</h4>
                <p className="text-primary/70 text-xs font-light">
                  Thank you, our team will call you shortly to assist you.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary/80 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary/80 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary/80 mb-1.5">
                    Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Kochi, Kerala"
                    className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
