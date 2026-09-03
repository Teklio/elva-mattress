"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryModal from "./EnquiryModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Brochure", href: "#brochure" },
  { label: "Contact Us", href: "/contact" },
];

function EnquiryIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.502 49.177 49.177 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full px-6 py-4 md:px-12 md:py-6 flex items-center justify-between z-40 bg-transparent relative"
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="ELVA – Sleep Defined"
              width={130}
              height={44}
              priority
              className="object-contain h-10 md:h-20 w-auto"
            />
          </Link>
        </div>

        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center bg-white/80 backdrop-blur-md rounded-md p-3 gap-1 border-2 border-secondary shadow-sm">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                pathname === href
                  ? "bg-primary text-white shadow-sm"
                  : "text-primary/70 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Enquiry Button (Desktop) */}
        <div className="hidden lg:flex items-center">
          <button
            id="header-enquiry-btn-desktop"
            onClick={() => setIsEnquiryOpen(true)}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 border-2 border-secondary text-primary font-bold text-xs uppercase tracking-wider hover:bg-secondary hover:text-primary transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer"
          >
            <EnquiryIcon className="w-4 h-4 text-secondary" />
            <span>Enquiry</span>
          </button>
        </div>

        {/* Action Button + Hamburger Menu (Mobile/Tablet) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="header-enquiry-btn-mobile"
            onClick={() => setIsEnquiryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-secondary text-primary text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-secondary transition-all cursor-pointer"
            aria-label="Enquiry"
          >
            <EnquiryIcon className="w-3.5 h-3.5 text-secondary" />
            <span>Enquiry</span>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-white/80 backdrop-blur-md border border-white/40 hover:bg-primary/5 transition-all duration-300 text-primary flex items-center justify-center cursor-pointer shadow-sm"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              />

              {/* Drawer panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
                className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-primary/95 backdrop-blur-xl z-50 shadow-2xl flex flex-col p-8 lg:hidden"
              >
                {/* Header inside drawer */}
                <div className="flex items-center justify-between mb-10">
                  <Image
                    src="/logo.png"
                    alt="ELVA"
                    width={100}
                    height={34}
                    priority
                    className="object-contain h-8 w-auto brightness-0 invert"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
                    aria-label="Close menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map(({ label, href }, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.35 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-2 text-lg font-medium transition-colors ${
                          pathname === href
                            ? "text-secondary font-bold"
                            : "text-white/80 hover:text-secondary"
                        }`}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Drawer footer */}
                <div className="mt-auto border-t border-white/10 pt-6 flex flex-col gap-4">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsEnquiryOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-secondary text-primary py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    <EnquiryIcon className="w-4 h-4" />
                    <span>Quick Enquiry</span>
                  </button>

                  <p className="text-white/40 text-xs tracking-wider uppercase font-light text-center">
                    © {new Date().getFullYear()} ELVA. Sleep Defined.
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Reusable Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
}

