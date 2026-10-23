import type { Metadata } from "next";
import ProductsPage from "@/components/pages/products/ProductsPage";

export const metadata: Metadata = {
  title: "IT Products & Solutions | Shineweb Tech Creations",
  description:
    "Explore computers, laptops, servers, networking equipment, cybersecurity solutions, software and business IT products from Shineweb Tech Creations.",
};

export default function Page() {
  return <ProductsPage />;
}