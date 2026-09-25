import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products – Luxury Mattresses, Pillows & Bedding",
  description:
    "Explore ELVA's full sleep collection: Super Soft Bouncy, Twin Latex, Floty Spring Pillow Top, and Cooling Euro Top mattresses with standardized cot dimensions.",
  openGraph: {
    title: "ELVA® Mattress & Pillow Collection | Sleep Defined",
    description:
      "Discover luxury mattresses, orthopedic cervical pillows, and waterproof bedding protectors engineered for restorative living.",
    url: "https://elvamattress.com/products",
    images: [
      {
        url: "/sleep-ensemble.png",
        width: 1200,
        height: 630,
        alt: "ELVA Sleep Products Collection",
      },
    ],
  },
  alternates: {
    canonical: "https://elvamattress.com/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
