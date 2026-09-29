export type ProductCategory = "Mattress" | "Pillows" | "Bed Cover";

export interface MattressSizeInfo {
  name: string;
  dimension: string;
  approxBedSize: string;
  description: string;
}

export const MATTRESS_SIZES: MattressSizeInfo[] = [
  {
    name: "Single Cot",
    dimension: "75 × 36 inches",
    approxBedSize: "6 × 3 ft",
    description: "Ideal for solo sleepers, children, or compact bedroom configurations.",
  },
  {
    name: "Double Cot",
    dimension: "75 × 48 inches",
    approxBedSize: "6 × 4 ft",
    description: "Generous room for single adults or cozy master bedrooms.",
  },
  {
    name: "Queen Size",
    dimension: "75 × 60 inches",
    approxBedSize: "6 × 5 ft",
    description: "The gold standard for couples, balancing roomy comfort and floor space.",
  },
  {
    name: "King Size",
    dimension: "75 × 72 inches",
    approxBedSize: "6 × 6 ft",
    description: "Supreme spaciousness for master bedrooms and luxurious hotel-grade rest.",
  },
];

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  type: string;
  tagline: string;
  description: string;
  features: string[];
  size?: string; // for pillows or specific dimensions
  availableSizes?: MattressSizeInfo[];
  warranty?: string;
  badge?: string;
  image: string;
  secondaryImage?: string;
  gallery?: string[];
  comfortScale?: string;
  materials?: string[];
  isComingSoon?: boolean;
}

export const PRODUCTS: Product[] = [
  // ========================
  // 1. MATTRESS PRODUCTS
  // ========================
  {
    id: "m-1",
    slug: "bouncy-mattress",
    name: "Bouncy Mattress",
    category: "Mattress",
    type: "Super Soft Foam Mattress",
    tagline: "Ultra-plush cloud responsiveness with adaptive body contouring",
    description:
      "Crafted with proprietary Super Soft Foam, the Bouncy Mattress delivers an immediate sensation of gentle buoyant cradling while maintaining correct spinal alignment. Designed for lasting resilience, comfortable sleeping posture, and restorative pressure relief night after night.",
    features: [
      "Super Soft Foam",
      "Comfortable and supportive construction",
      "8-year warranty",
      "Available in multiple bed sizes",
      "Superior motion absorption",
      "Hypoallergenic breathable outer cover",
    ],
    availableSizes: MATTRESS_SIZES,
    warranty: "8-Year Comprehensive Warranty",
    badge: "8 Years Warranty",
    image: "/products/bouncy.jpeg",
    secondaryImage: "/products/bouncy-mattress.jpg",
    gallery: [
      "/products/bouncy.jpeg",
      "/products/bouncy-mattress.jpg",
      "/products/bouncy-mattress-detail.jpg",
    ],
    comfortScale: "Plush Soft (3/10)",
    materials: ["Super Soft Foam Core", "Breathable Quilted Knit", "High Resilient Base"],
  },
  {
    id: "m-2",
    slug: "twin-latex",
    name: "Twin Latex",
    category: "Mattress",
    type: "Latex + Rebound + HR Foam",
    tagline: "Natural resilience meets high-density ergonomic support",
    description:
      "Twin Latex Mattress combines multiple foam layers to provide a balanced sleeping experience. The mattress features a 2-inch latex layer, 2-inch rebound foam and 2-inch HR foam, providing a combination of comfort, resilience and support.",
    features: [
      "2-inch Latex layer",
      "2-inch Rebound Foam",
      "2-inch HR Foam",
      "Multi-layer construction",
      "Designed for comfort and support",
      "Optimal temperature regulation",
    ],
    availableSizes: MATTRESS_SIZES,
    warranty: "10-Year Warranty",
    badge: "Eco Latex Core",
    image: "/products/twinlatex.jpeg",
    secondaryImage: "/products/twin-latex.jpg",
    gallery: [
      "/products/twinlatex.jpeg",
      "/products/twin-latex.jpg",
      "/products/twin-latex-detail.jpg",
    ],
    comfortScale: "Medium-Responsive (5.5/10)",
    materials: ["2\" Natural Latex", "2\" Rebound Foam", "2\" HR Ortho Foam"],
  },
  {
    id: "m-3",
    slug: "floty-spring-pillow-top",
    name: "Floty Spring Pillow Top",
    category: "Mattress",
    type: "Pocketed Spring Mattress",
    tagline: "Zero partner disturbance with an opulent stitched pillow surface",
    description:
      "Floty Spring Pillow Top Mattress combines individually pocketed springs with a soft comfort layer for a comfortable and supportive sleeping experience. The 2-inch Super Soft Foam provides additional cushioning, while the Pillow Top design creates a softer surface for enhanced comfort.",
    features: [
      "Pocketed Spring",
      "2-inch Super Soft Foam",
      "Pillow Top design",
      "Comfortable sleeping surface",
      "Spring-based support system",
      "Zero motion transfer",
    ],
    availableSizes: MATTRESS_SIZES,
    warranty: "10-Year Warranty",
    badge: "Pillow Top Luxury",
    image: "/products/floty-spring.jpeg",
    secondaryImage: "/products/floty-spring-pillow-top.jpg",
    gallery: [
      "/products/floty-spring.jpeg",
      "/products/floty-spring-pillow-top.jpg",
      "/products/floty-spring-pillow-top-detail.jpg",
    ],
    comfortScale: "Medium-Plush (4/10)",
    materials: ["Pocketed Steel Coils", "2\" Super Soft Foam", "Premium Damask Pillow Top"],
  },
  {
    id: "m-4",
    slug: "floty-spring-euro-top",
    name: "Floty Spring Euro Top",
    category: "Mattress",
    type: "Pocketed Spring Mattress",
    tagline: "Seamless flush-edge tailoring with dynamic pocketed spring bounce",
    description:
      "Floty Spring Euro Top Mattress is designed with a pocketed spring system combined with a 2-inch Super Soft Foam layer. Its Euro Top design provides an additional cushioned sleeping surface while maintaining the support of the spring system.",
    features: [
      "Pocketed Spring",
      "2-inch Super Soft Foam",
      "Euro Top design",
      "Comfortable cushioning",
      "Supportive spring construction",
      "Reinforced edge perimeter",
    ],
    availableSizes: MATTRESS_SIZES,
    warranty: "10-Year Warranty",
    badge: "Euro Top Precision",
    image: "/products/floty-spring-euro-top.jpg",
    secondaryImage: "/products/floty-spring-euro-top-detail.jpg",
    comfortScale: "Medium (5/10)",
    materials: ["Pocketed Spring System", "2\" Super Soft Foam", "Flush Euro Top Quilt"],
  },
  {
    id: "m-5",
    slug: "ice-cloud-euro-top",
    name: "Ice Cloud Euro Top",
    category: "Mattress",
    type: "Multi-layer Foam Mattress",
    tagline: "Advanced thermal dissipation with contouring memory quilting",
    description:
      "Ice Cloud Euro Top Mattress features a multi-layer construction designed to combine softness, support and cooling comfort. The mattress includes a Memory Quilt, Super Soft Foam, HR Foam and Rebound Foam. The cooling-oriented fabric/material helps provide a more comfortable sleeping environment.",
    features: [
      "Memory Quilt",
      "Super Soft Foam",
      "HR Foam",
      "Rebound Foam",
      "Cooling fabric / cooling material",
      "Designed for a cooler sleeping experience",
    ],
    availableSizes: MATTRESS_SIZES,
    warranty: "10-Year Warranty",
    badge: "Cooling Ice Tech",
    image: "/products/ice-cloud-euro-top.jpg",
    secondaryImage: "/products/ice-cloud-euro-top-detail.jpg",
    comfortScale: "Cooling Medium-Soft (4.5/10)",
    materials: ["Cooling Phase Fabric", "Memory Quilt", "Super Soft Foam", "HR & Rebound Core"],
  },
  {
    id: "m-6",
    slug: "slumber-fit-euro-top",
    name: "Slumber Fit Euro Top",
    category: "Mattress",
    type: "Euro Top Foam Mattress",
    tagline: "Ergonomic posture alignment engineered with high-resilience foam",
    description:
      "Slumber Fit Euro Top Mattress combines HR Foam with Super Soft Foam to provide a balance of support and softness. Its Euro Top construction adds extra cushioning to the sleeping surface for improved comfort.",
    features: [
      "HR Foam",
      "Super Soft Foam",
      "Euro Top design",
      "Comfortable sleeping surface",
      "Supportive foam construction",
      "Long-lasting shape retention",
    ],
    availableSizes: MATTRESS_SIZES,
    warranty: "8-Year Warranty",
    badge: "High Resilience",
    image: "/products/slumber-fit-euro-top.jpg",
    secondaryImage: "/products/slumber-fit-euro-top-detail.jpg",
    comfortScale: "Medium-Firm (6.5/10)",
    materials: ["High-Resilience Ortho Core", "Super Soft Foam Layer", "Euro Top Fabric"],
  },

  // ========================
  // 2. PILLOW PRODUCTS
  // ========================
  {
    id: "p-1",
    slug: "latex-pillow",
    name: "Latex Pillow",
    category: "Pillows",
    type: "Latex Pillow",
    tagline: "Naturally hypoallergenic and buoyant head and neck support",
    description:
      "Latex Pillow is designed to provide comfortable and supportive cushioning for the head and neck. Its latex construction offers a resilient feel and is suitable for everyday sleeping.",
    features: [
      "Latex construction",
      "Supportive feel",
      "Comfortable for everyday sleeping",
      "Pin-core ventilation for air flow",
      "Resistant to dust mites and bacteria",
    ],
    warranty: "3-Year Warranty",
    badge: "100% Latex Feel",
    image: "/products/latex-pillow.jpg",
    secondaryImage: "/products/latex-pillow-detail.jpg",
    comfortScale: "Resilient & Buoyant",
    materials: ["Pure Latex Core", "Organic Cotton Breathable Cover"],
  },
  {
    id: "p-2",
    slug: "memory-gel-pillow",
    name: "Memory Gel Pillow",
    category: "Pillows",
    type: "Memory Foam / Gel Pillow",
    tagline: "Cool-touch thermal relief fused with precision memory contouring",
    description:
      "Memory Gel Pillow combines the contouring properties of memory foam with gel-based comfort. It is designed to adapt to the user's head and provide comfortable support during sleep.",
    features: [
      "Memory foam construction",
      "Gel-based comfort",
      "Contouring support",
      "Designed for comfortable sleeping",
      "Heat-dissipating cooling pad",
    ],
    warranty: "3-Year Warranty",
    badge: "Cool Gel Infused",
    image: "/products/memory-gel-pillow.jpg",
    secondaryImage: "/products/memory-gel-pillow-detail.jpg",
    comfortScale: "Adaptive Cool Plush",
    materials: ["Hydro-Gel Infused Memory Foam", "Cool-Silk Removable Cover"],
  },
  {
    id: "p-3",
    slug: "memory-foam-contour-pillow-50x30",
    name: "Memory Foam Contour Pillow 50 × 30",
    category: "Pillows",
    type: "Contour Memory Foam Pillow",
    size: "50 × 30 cm",
    tagline: "Ergonomic cervical wave design engineered for spine alignment",
    description:
      "Memory Foam Contour Pillow 50 × 30 features a contour-shaped memory foam construction designed to provide comfortable support for the head and neck. The ergonomic shape helps maintain a comfortable sleeping position.",
    features: [
      "Memory Foam",
      "Contour design",
      "Ergonomic shape",
      "Head and neck support",
      "Dual height neck contours (compact 50 × 30 cm)",
    ],
    warranty: "3-Year Warranty",
    badge: "Orthopedic Wave 50×30",
    image: "/products/memory-foam-contour-pillow-50x30.jpg",
    secondaryImage: "/products/memory-foam-contour-pillow-50x30-detail.jpg",
    comfortScale: "Cervical Orthopedic",
    materials: ["High-Density Viscoelastic Memory Foam", "Soft Bamboo Fabric"],
  },
  {
    id: "p-4",
    slug: "memory-foam-contour-pillow-60x36",
    name: "Memory Foam Contour Pillow 60 × 36",
    category: "Pillows",
    type: "Contour Memory Foam Pillow",
    size: "60 × 36 cm",
    tagline: "Broad ergonomic cervical contouring for comprehensive neck therapy",
    description:
      "Memory Foam Contour Pillow 60 × 36 is designed with a contour memory foam shape to provide comfortable support for the head and neck. Its ergonomic construction is suitable for users looking for a supportive sleeping pillow.",
    features: [
      "Memory Foam",
      "Contour design",
      "Ergonomic construction",
      "Head and neck support",
      "Generous 60 × 36 cm sleeping area",
    ],
    warranty: "3-Year Warranty",
    badge: "Orthopedic Wave 60×36",
    image: "/products/memory-foam-contour-pillow-60x36.jpg",
    secondaryImage: "/products/memory-foam-contour-pillow-60x36-detail.jpg",
    comfortScale: "Cervical Orthopedic Grand",
    materials: ["Ergonomic Memory Core", "Anti-microbial Quilted Cover"],
  },
  {
    id: "p-5",
    slug: "memory-foam-cloud-pillow",
    name: "Memory Foam Cloud Pillow 60 × 40 × 4",
    category: "Pillows",
    type: "Memory Foam Pillow",
    size: "60 × 40 × 4",
    tagline: "Weightless cloud-like cushioning with low-profile ergonomic balance",
    description:
      "Memory Foam Cloud Pillow 60 × 40 × 4 is designed to provide a soft and comfortable sleeping experience with memory foam construction. Its cloud-style design provides cushioning while maintaining supportive comfort.",
    features: [
      "Memory Foam",
      "Cloud pillow design",
      "Soft and comfortable feel",
      "Supportive construction",
      "Large pillow size (60 × 40 × 4 cm)",
    ],
    warranty: "3-Year Warranty",
    badge: "Cloud Soft 60×40×4",
    image: "/products/memory-foam-cloud-pillow.jpg",
    secondaryImage: "/products/memory-foam-cloud-pillow-detail.jpg",
    comfortScale: "Ultra-Soft Cloud Plush",
    materials: ["Micro-vented Cloud Memory Foam", "Silk-Touch Jacquard Shell"],
  },

  // ========================
  // 3. BED COVER PRODUCTS (Coming Soon)
  // ========================
  {
    id: "bc-1",
    slug: "elva-pure-shield-waterproof-cover",
    name: "Elva PureShield Mattress Protector",
    category: "Bed Cover",
    type: "Waterproof & Breathable Bed Cover",
    tagline: "Impermeable liquid barrier with whisper-quiet breathable microfiber",
    description:
      "The upcoming Elva PureShield collection provides full 360-degree protection against spills, allergens, and dust mites without altering the plush feel of your mattress. Crafted with medical-grade noiseless membranes and cooling knitted top fabric.",
    features: [
      "100% Waterproof TPU barrier",
      "Silent & crinkle-free sleep",
      "Deep pocket fitted skirt for all mattress depths",
      "Ultra-breathable micro-vented textile",
      "Machine washable and anti-shrink",
    ],
    badge: "Coming Soon",
    image: "/products/elva-pure-shield-waterproof-cover.jpg",
    secondaryImage: "/products/elva-pure-shield-waterproof-cover-detail.jpg",
    isComingSoon: true,
  },
  {
    id: "bc-2",
    slug: "elva-egyptian-cotton-duvet-cover",
    name: "Elva 500TC Sateen Bed Cover",
    category: "Bed Cover",
    type: "Luxury Egyptian Cotton Cover",
    tagline: "Silky luster, organic softness, and climate-adaptive airflow",
    description:
      "Woven from long-staple 500 thread-count combed cotton, this upcoming bedding essential delivers the tactile indulgence of a world-class luxury suite. Engineered to breathe naturally in both warm and chilly seasons.",
    features: [
      "500 Thread Count Long-Staple Cotton",
      "Lustrous Sateen finish",
      "Hypoallergenic & OEKO-TEX certified",
      "Reinforced corner ties & concealed closure",
      "Ultra-soft feel that improves with each wash",
    ],
    badge: "Coming Soon",
    image: "/products/elva-egyptian-cotton-duvet-cover.jpg",
    secondaryImage: "/products/elva-egyptian-cotton-duvet-cover-detail.jpg",
    isComingSoon: true,
  },
];

export const CATEGORIES: { label: string; value: ProductCategory | "All"; count: number }[] = [
  { label: "All Products", value: "All", count: PRODUCTS.length },
  { label: "Mattress", value: "Mattress", count: PRODUCTS.filter((p) => p.category === "Mattress").length },
  { label: "Pillows", value: "Pillows", count: PRODUCTS.filter((p) => p.category === "Pillows").length },
  { label: "Bed Cover", value: "Bed Cover", count: PRODUCTS.filter((p) => p.category === "Bed Cover").length },
];
