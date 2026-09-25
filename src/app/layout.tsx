import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import LoadingScreen from "@/components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elvamattress.com"),
  title: {
    default: "ELVA® Mattress – Sleep Defined | Luxury & Orthopedic Mattresses",
    template: "%s | ELVA® Mattress",
  },
  description:
    "Experience restorative sleep with ELVA's premium range of orthopedic, pocketed spring, natural latex mattresses, cervical memory pillows, and luxury bedding.",
  keywords: [
    "ELVA mattress",
    "elvamattress.com",
    "luxury mattress",
    "orthopedic mattress",
    "latex mattress",
    "pocket spring mattress",
    "pillow top mattress",
    "euro top mattress",
    "contour pillow",
    "memory foam pillow",
    "cot size mattress",
    "waterproof bed protector",
  ],
  authors: [{ name: "ELVA Mattress", url: "https://elvamattress.com" }],
  creator: "ELVA Sleep Solutions",
  publisher: "ELVA Mattress",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elvamattress.com",
    siteName: "ELVA Mattress",
    title: "ELVA® Mattress – Sleep Defined | Luxury & Orthopedic Mattresses",
    description:
      "Crafted for restorative living. Explore handcrafted mattresses, cervical support pillows, and luxury bedding accessories.",
    images: [
      {
        url: "/sleep-ensemble.png",
        width: 1200,
        height: 630,
        alt: "ELVA Mattress Sleep Ensemble",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELVA® Mattress – Sleep Defined",
    description:
      "Engineered for the ultimate restorative rest. Explore luxury mattresses, latex pillows, and protectors.",
    images: ["/sleep-ensemble.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://elvamattress.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ELVA Mattress",
  alternateName: "ELVA Sleep Solutions",
  url: "https://elvamattress.com",
  logo: "https://elvamattress.com/logo.png",
  description:
    "Premium manufacturer of orthopedic mattresses, natural latex bedding, pocket spring mattresses, and ergonomic contour pillows.",
  sameAs: [
    "https://facebook.com/elvamattress",
    "https://instagram.com/elvamattress",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "care@elvamattress.com",
    availableLanguage: ["English", "Hindi"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <LoadingScreen />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}

