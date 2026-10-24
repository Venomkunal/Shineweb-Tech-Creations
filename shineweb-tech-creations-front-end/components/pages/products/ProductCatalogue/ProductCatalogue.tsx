
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownUp,
  ArrowRight,
  Check,
  ChevronDown,
  Cpu,
  HardDrive,
  Laptop,
  Network,
  Package,
  Search,
  Server,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react";

import styles from "./ProductCatalogue.module.css";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: "laptop" | "network" | "server" | "security" | "cpu" | "storage";
  tag?: string;
};

const categories = [
  "All Products",
  "Computers",
  "Networking",
  "Servers",
  "Security",
  "Components",
  "Storage",
];

const products: Product[] = [
  {
    id: "business-computers",
    name: "Business Computers",
    category: "Computers",
    description:
      "Desktop computers and business-ready systems for offices and professional workloads.",
    icon: "laptop",
    tag: "Business IT",
  },
  {
    id: "business-laptops",
    name: "Business Laptops",
    category: "Computers",
    description:
      "Portable computing solutions for teams, professionals, and workplace mobility.",
    icon: "laptop",
  },
  {
    id: "network-switches",
    name: "Network Switches",
    category: "Networking",
    description:
      "Managed and unmanaged switching options for office networks and infrastructure.",
    icon: "network",
    tag: "Infrastructure",
  },
  {
    id: "routers-firewalls",
    name: "Routers & Firewalls",
    category: "Security",
    description:
      "Network routing and perimeter security options for business environments.",
    icon: "security",
  },
  {
    id: "business-servers",
    name: "Business Servers",
    category: "Servers",
    description:
      "Server hardware for business applications, shared resources, and local infrastructure.",
    icon: "server",
    tag: "Enterprise",
  },
  {
    id: "ram-processors",
    name: "Processors & Memory",
    category: "Components",
    description:
      "Core computing components for compatible systems, upgrades, and maintenance.",
    icon: "cpu",
  },
  {
    id: "storage-solutions",
    name: "Storage Solutions",
    category: "Storage",
    description:
      "Storage devices and capacity options for workstations, servers, and business data.",
    icon: "storage",
  },
  {
    id: "endpoint-security",
    name: "Endpoint Security",
    category: "Security",
    description:
      "Security software options to help protect business devices and user endpoints.",
    icon: "security",
  },
  {
    id: "network-accessories",
    name: "Network Accessories",
    category: "Networking",
    description:
      "Connectivity accessories and supporting equipment for network deployments.",
    icon: "network",
  },
];

const iconMap = {
  laptop: Laptop,
  network: Network,
  server: Server,
  security: ShieldCheck,
  cpu: Cpu,
  storage: HardDrive,
};

export default function ProductCatalogue() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "name-asc") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortOrder === "name-desc") {
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [activeCategory, searchQuery, sortOrder]);

  const selectedProductDetails = products.filter((product) =>
    selectedProducts.includes(product.id),
  );

  function toggleProduct(productId: string) {
    setSelectedProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  function clearFilters() {
    setActiveCategory("All Products");
    setSearchQuery("");
    setSortOrder("featured");
  }

  const enquirySubject = encodeURIComponent(
    "Product Enquiry - Shineweb Tech Creations",
  );

  const enquiryBody = encodeURIComponent(
    [
      "Hello Shineweb Tech Creations,",
      "",
      "I would like to request a quotation for the following products:",
      "",
      ...selectedProductDetails.map(
        (product, index) =>
          `${index + 1}. ${product.name} (${product.category})`,
      ),
      "",
      "Please share available options, specifications, pricing, and estimated delivery details.",
      "",
      "Name:",
      "Company:",
      "Phone:",
      "Required quantity:",
    ].join("\n"),
  );

  const enquiryHref = `mailto:kunalsarma@shinewebtechcretions.online?subject=${enquirySubject}&body=${enquiryBody}`;

  return (
    <section
      className={styles.catalogue}
      id="product-catalogue"
      aria-labelledby="catalogue-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headingContent}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              OUR PRODUCT RANGE
            </span>

            <h2 id="catalogue-title" className={styles.title}>
              Find the right
              <br />
              <span>technology for your business.</span>
            </h2>

            <p className={styles.description}>
              Explore our product categories, compare your options, and
              build an enquiry list for a tailored quotation.
            </p>
          </div>

          <div className={styles.catalogueBadge}>
            <span className={styles.badgeIcon}>
              <Package size={19} />
            </span>
            <span>
              <strong>{products.length} product categories & options</strong>
              <small>Explore the catalogue below</small>
            </span>
          </div>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={19} aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products, categories..."
              aria-label="Search products"
            />

            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <label className={styles.sortControl}>
            <ArrowDownUp size={16} aria-hidden="true" />
            <span className={styles.sortLabel}>Sort:</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
            <ChevronDown
              size={15}
              className={styles.sortChevron}
              aria-hidden="true"
            />
          </label>
        </div>

        <div className={styles.catalogueLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeading}>
              <h3>Categories</h3>
              <span>{categories.length - 1}</span>
            </div>

            <nav className={styles.categoryList} aria-label="Product categories">
              {categories.map((category) => {
                const count =
                  category === "All Products"
                    ? products.length
                    : products.filter(
                        (product) => product.category === category,
                      ).length;

                return (
                  <button
                    type="button"
                    key={category}
                    className={`${styles.categoryButton} ${
                      activeCategory === category ? styles.categoryActive : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    <span>{category}</span>
                    <span className={styles.categoryCount}>{count}</span>
                  </button>
                );
              })}
            </nav>

            <div className={styles.sidebarHelp}>
              <span className={styles.helpIcon}>
                <ShoppingBag size={19} />
              </span>
              <h4>Need something specific?</h4>
              <p>
                Tell us your requirements and we can help you explore suitable
                product options.
              </p>
              <Link href="/contact">
                Contact our team
                <ArrowRight size={15} />
              </Link>
            </div>
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <div>
                <span className={styles.resultsEyebrow}>CATALOGUE</span>
                <h3>
                  {activeCategory === "All Products"
                    ? "Explore products"
                    : activeCategory}
                </h3>
                <p>
                  Showing{" "}
                  <strong>{filteredProducts.length}</strong>{" "}
                  of {products.length} products
                </p>
              </div>

              {selectedProducts.length > 0 && (
                <button
                  type="button"
                  className={styles.viewEnquiry}
                  onClick={() => setShowEnquiry((current) => !current)}
                >
                  <ShoppingBag size={16} />
                  Enquiry list ({selectedProducts.length})
                </button>
              )}
            </div>

            {showEnquiry && selectedProductDetails.length > 0 && (
              <div className={styles.enquiryPanel}>
                <div className={styles.enquiryPanelHeader}>
                  <div>
                    <h4>Your enquiry list</h4>
                    <p>
                      {selectedProductDetails.length} product
                      {selectedProductDetails.length === 1 ? "" : "s"} selected
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowEnquiry(false)}
                    className={styles.closeEnquiry}
                    aria-label="Close enquiry list"
                  >
                    <X size={18} />
                  </button>
                </div>

                <ul className={styles.selectedList}>
                  {selectedProductDetails.map((product) => (
                    <li key={product.id}>
                      <span>{product.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleProduct(product.id)}
                        aria-label={`Remove ${product.name} from enquiry list`}
                      >
                        <X size={15} />
                      </button>
                    </li>
                  ))}
                </ul>

                <a href={enquiryHref} className={styles.sendEnquiry}>
                  Request a quotation
                  <ArrowRight size={17} />
                </a>

                <p className={styles.emailNote}>
                  This opens your default email application with the enquiry
                  details filled in.
                </p>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className={styles.productGrid}>
                {filteredProducts.map((product, index) => {
                  const Icon = iconMap[product.icon];
                  const isSelected = selectedProducts.includes(product.id);

                  return (
                    <article
                      className={styles.productCard}
                      key={product.id}
                      style={{ "--card-index": index } as React.CSSProperties}
                    >
                      <div className={styles.cardVisual}>
                        <div className={styles.cardVisualGrid} />

                        {product.tag && (
                          <span className={styles.productTag}>
                            {product.tag}
                          </span>
                        )}

                        <div className={styles.productIcon}>
                          <Icon size={43} strokeWidth={1.35} />
                        </div>

                        <span className={styles.visualRing} />
                        <span className={styles.visualDot} />
                      </div>

                      <div className={styles.productInfo}>
                        <div className={styles.productCategory}>
                          {product.category}
                        </div>

                        <h4>{product.name}</h4>

                        <p>{product.description}</p>

                        <div className={styles.productMeta}>
                          <span className={styles.quoteLabel}>
                            <ShieldCheck size={14} />
                            Quotation-based pricing
                          </span>
                        </div>

                        <button
                          type="button"
                          className={`${styles.addButton} ${
                            isSelected ? styles.addButtonSelected : ""
                          }`}
                          onClick={() => toggleProduct(product.id)}
                          aria-pressed={isSelected}
                        >
                          {isSelected ? (
                            <>
                              <Check size={16} />
                              Added to enquiry
                            </>
                          ) : (
                            <>
                              Add to enquiry
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>
                  <Search size={25} />
                </span>
                <h4>No matching products found</h4>
                <p>
                  Try another search term or choose a different category.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className={styles.resetButton}
                >
                  Clear filters
                </button>
              </div>
            )}

            <div className={styles.catalogueFooter}>
              <span>
                Looking for a product that is not listed? We may be able to
                source an option that fits your requirements.
              </span>
              <Link href="/contact">
                Ask about a product
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
