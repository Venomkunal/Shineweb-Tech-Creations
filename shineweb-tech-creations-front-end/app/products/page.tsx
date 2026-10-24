
import type { Metadata } from "next";
import ProductsPage from "@/components/pages/products/ProductsPage";

export const metadata: Metadata = {
  title: "Products | Shineweb Tech Creations",
  description:
    "Explore hardware, software, networking equipment, servers, security solutions, and business IT products from Shineweb Tech Creations.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products | Shineweb Tech Creations",
    description:
      "Discover technology products and IT solutions for businesses from Shineweb Tech Creations.",
    url: "/products",
    siteName: "Shineweb Tech Creations",
    type: "website",
  },
};

export default function ProductsRoute() {
  return <ProductsPage />;
}
