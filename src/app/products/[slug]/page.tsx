import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS, MATTRESS_SIZES } from "@/data/products";
import { getStoryblokProductBySlug, getStoryblokProducts } from "@/lib/storyblok";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getStoryblokProducts();
  return products.filter((p) => !p.isComingSoon).map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStoryblokProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const pageUrl = `https://elvamattress.com/products/${product.slug}`;
  const imageUrl = product.image.startsWith("http") ? product.image : `https://elvamattress.com${product.image}`;

  return {
    title: `${product.name} – ${product.type}`,
    description: `${product.tagline}. ${product.description.slice(0, 150)}...`,
    keywords: [
      product.name,
      product.category,
      product.type,
      "ELVA mattress",
      "elvamattress.com",
      ...(product.features || []),
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${product.name} | ELVA® Mattress`,
      description: product.tagline,
      url: pageUrl,
      siteName: "ELVA Mattress",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 900,
          alt: `${product.name} – ELVA Mattress`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ELVA® Mattress`,
      description: product.tagline,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getStoryblokProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getStoryblokProducts();
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  // Schema.org Product structured data for Google Search rich snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://elvamattress.com${product.image}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "ELVA",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `https://elvamattress.com/products/${product.slug}`,
      priceCurrency: "INR",
      price: "19999",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
        mattressSizes={MATTRESS_SIZES}
      />
    </>
  );
}
