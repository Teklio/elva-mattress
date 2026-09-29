"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  subtitle?: string;
}

const TARGET_WHATSAPP_NUMBER = "919947419910"; // +91 99474 19910

export default function EnquiryModal({
  isOpen,
  onClose,
  productName,
  subtitle,
}: EnquiryModalProps) {
  const isProductEnquiry = Boolean(productName);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    location: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const buildWhatsAppMessage = () => {
    if (isProductEnquiry) {
      return (
        `*Product Enquiry - ELVA Mattress*\n\n` +
        `🛏️ *Product:* ${productName}\n` +
        (subtitle ? `ℹ️ *Details:* ${subtitle}\n` : "") +
        `\n` +
        `👤 *Name:* ${formData.fullname}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `📍 *Location / City:* ${formData.location}\n\n` +
        `_Sent via elvamattress.com_`
      );
    }

    return (
      `*General Enquiry - ELVA Mattress*\n\n` +
      `👤 *Name:* ${formData.fullname}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📍 *Location / City:* ${formData.location}\n\n` +
      `_Sent via elvamattress.com_`
    );
  };

  const getWhatsAppUrl = () => {
    const message = buildWhatsAppMessage();
    return `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const whatsappUrl = getWhatsAppUrl();

    // Trigger WhatsApp redirect immediately via user gesture
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }

    setLoading(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullname: "", phone: "", location: "" });
      onClose();
    }, 3500);
  };

  const handleModalClose = () => {
    setSubmitted(false);
    onClose();
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
            onClick={handleModalClose}
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
              onClick={handleModalClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors cursor-pointer text-sm"
              aria-label="Close enquiry modal"
            >
              ✕
            </button>

            {/* Top Logo & Header */}
            <div className="flex flex-col items-center text-center mb-5 pt-2">
              <Image
                src="/logo.png"
                alt="ELVA – Sleep Defined"
                width={130}
                height={44}
                priority
                className="object-contain h-16 w-auto mb-2.5"
              />

              <span className="text-secondary text-[11px] font-bold uppercase tracking-[0.22em] block">
                {isProductEnquiry ? "Product Enquiry" : "General Enquiry"}
              </span>

              {/* Product Badge if opened from product */}
              {isProductEnquiry && productName && (
                <div className="mt-2.5 px-4 py-2 rounded-2xl bg-[#E8F0FE] border border-blue-100/80 text-center w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                    Selected Model
                  </span>
                  <p className="text-sm text-primary font-bold">
                    {productName}
                  </p>
                  {subtitle && (
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto mb-3 text-2xl font-bold shadow-lg shadow-green-500/20">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-primary mb-1">
                  Opening WhatsApp...
                </h4>
                <p className="text-slate-600 text-xs font-light max-w-xs mx-auto mb-4">
                  Connecting your enquiry to our customer service desk at{" "}
                  <strong className="text-primary font-semibold">
                    +91 99474 19910
                  </strong>
                  .
                </p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-md hover:bg-[#20ba59] transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.18c-.24.68-1.2 1.25-1.68 1.33-.45.08-1.04.14-3.03-.68-2.54-1.05-4.18-3.64-4.31-3.81-.13-.17-1.03-1.37-1.03-2.61 0-1.25.65-1.86.88-2.11.23-.26.5-.32.67-.32.17 0 .34 0 .49.01.15.01.36-.06.57.43.21.5.73 1.78.79 1.91.07.14.11.3.02.48-.09.17-.14.28-.27.44-.14.15-.29.34-.41.46-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.14.44.12.61-.07.17-.19.73-.85.92-1.14.2-.29.39-.24.66-.14.27.1.1.72 1.72.85 2.01.13.29.22.48.25.57.04.09.04.53-.2 1.21z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Click here if WhatsApp didn&apos;t open</span>
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary/80 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullname}
                    onChange={(e) =>
                      setFormData({ ...formData, fullname: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-primary/5 border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary/80 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 Phone number"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-primary/5 border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>


                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary/80 mb-1">
                    Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Kochi, Kerala"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-primary/5 border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-3.5 rounded-full bg-[#1C3144] hover:bg-[#253f58] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 mt-3 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-[#25D366]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.18c-.24.68-1.2 1.25-1.68 1.33-.45.08-1.04.14-3.03-.68-2.54-1.05-4.18-3.64-4.31-3.81-.13-.17-1.03-1.37-1.03-2.61 0-1.25.65-1.86.88-2.11.23-.26.5-.32.67-.32.17 0 .34 0 .49.01.15.01.36-.06.57.43.21.5.73 1.78.79 1.91.07.14.11.3.02.48-.09.17-.14.28-.27.44-.14.15-.29.34-.41.46-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.14.44.12.61-.07.17-.19.73-.85.92-1.14.2-.29.39-.24.66-.14.27.1.1.72 1.72.85 2.01.13.29.22.48.25.57.04.09.04.53-.2 1.21z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {loading
                      ? "Connecting..."
                      : isProductEnquiry
                      ? "Submit Product Enquiry"
                      : "Submit Enquiry"}
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
