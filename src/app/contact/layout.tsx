import type { Metadata } from "next";
import Header from "@/components/Heder";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact Us – Showroom Inquiries & Support",
  description:
    "Get in touch with the ELVA team for mattress inquiries, custom cot dimensions, bulk orders, and doorstep delivery support.",
  alternates: {
    canonical: "https://elvamattress.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
