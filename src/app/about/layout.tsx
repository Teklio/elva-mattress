import type { Metadata } from "next";
import Header from "@/components/Heder";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us – Handcrafted Sleep Excellence",
  description:
    "Learn about ELVA's commitment to restorative living, state-of-the-art foam engineering, and sustainable mattress craftsmanship.",
  alternates: {
    canonical: "https://elvamattress.com/about",
  },
};

export default function AboutLayout({
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
