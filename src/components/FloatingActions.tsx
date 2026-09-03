"use client";

import { motion } from "framer-motion";

export default function FloatingActions() {
  const phoneNumber = "+919876543210";
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hello ELVA! I would like to know more about your luxury medicated mattresses."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 select-none pointer-events-auto">
      {/* Call Button (Icon Only, Enlarged) */}
      <motion.a
        href={`tel:${phoneNumber}`}
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-secondary border-2 border-secondary/80 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300 cursor-pointer"
        aria-label="Call Elva Mattress"
        title="Call Us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
      </motion.a>

      {/* WhatsApp Button (Icon Only, Enlarged) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.55)] hover:shadow-[0_14px_40px_rgba(37,211,102,0.75)] transition-all duration-300 cursor-pointer"
        aria-label="WhatsApp Chat"
        title="WhatsApp Chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:scale-110"
        >
          <path
            fillRule="evenodd"
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.18c-.24.68-1.2 1.25-1.68 1.33-.45.08-1.04.14-3.03-.68-2.54-1.05-4.18-3.64-4.31-3.81-.13-.17-1.03-1.37-1.03-2.61 0-1.25.65-1.86.88-2.11.23-.26.5-.32.67-.32.17 0 .34 0 .49.01.15.01.36-.06.57.43.21.5.73 1.78.79 1.91.07.14.11.3.02.48-.09.17-.14.28-.27.44-.14.15-.29.34-.41.46-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.14.44.12.61-.07.17-.19.73-.85.92-1.14.2-.29.39-.24.66-.14.27.1.1.72 1.72.85 2.01.13.29.22.48.25.57.04.09.04.53-.2 1.21z"
            clipRule="evenodd"
          />
        </svg>
      </motion.a>
    </div>
  );
}

