"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
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
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      }, 4000);
    }, 600);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-20 sm:py-28 bg-white text-primary overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3 block">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-primary mb-6">
            Get In Touch With Us
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-6 rounded-full" />
          <p className="text-primary/85 text-sm sm:text-xl font-light leading-relaxed">
            Have questions about our mattresses or need sleep guidance? Reach out to our team and we will be glad to assist you.
          </p>
        </motion.div>

        {/* 2-Column Balanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <div>
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                Reach Us
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-primary mb-4">
                We Are Here To Help
              </h3>
              <p className="text-primary/85 text-lg sm:text-xl font-light leading-relaxed">
                Connect with our customer support and showroom team for product specifications, custom dimensions, or order assistance.
              </p>
            </div>

            {/* Phone Card */}
            <a
              href="tel:+919876543210"
              className="group p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10 hover:border-secondary transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">Call Us</p>
                <p className="text-base sm:text-lg font-semibold text-primary group-hover:text-secondary transition-colors">+91 98765 43210</p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:contact@elvamattress.com"
              className="group p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10 hover:border-secondary transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">Email Us</p>
                <p className="text-base sm:text-lg font-semibold text-primary group-hover:text-secondary transition-colors break-all">contact@elvamattress.com</p>
              </div>
            </a>

            {/* Location Card */}
            <a
              href="https://maps.app.goo.gl/bRpkTwoay5GqiMtM7?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10 hover:border-secondary transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">Showroom Address</p>
                <p className="text-base font-semibold text-primary group-hover:text-secondary transition-colors mt-0.5">Mannarmala-pallippadi</p>
                <p className="text-sm text-primary/70 font-light">Perinthalmanna, Malappuram, Kerala 679325</p>
              </div>
            </a>
          </motion.div>

          {/* Right Column: Clean Basic Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 sm:p-10 rounded-3xl bg-primary/5 border border-primary/10 shadow-sm"
          >
            <div className="mb-6">
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                Send a Message
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-primary">
                Contact Form
              </h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Message Sent!</h4>
                <p className="text-primary/70 text-sm font-light">
                  Thank you for contacting us. We will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-primary/15 text-primary placeholder-primary/40 focus:outline-none focus:border-secondary transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-wider hover:bg-secondary hover:text-primary transition-all duration-300 cursor-pointer disabled:opacity-50 mt-2 shadow-sm"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
