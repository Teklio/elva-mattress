import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us – ELVA Sleep Defined",
  description: "Get in touch with ELVA sleep specialists for custom mattress consultations, showroom visits, and ergonomic support advice.",
};

export default function ContactPage() {
  return (
    <div className="w-full pt-8 sm:pt-12">
      <Contact />
    </div>
  );
}
