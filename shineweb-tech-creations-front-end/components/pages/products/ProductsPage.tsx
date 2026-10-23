
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Cpu,
  Filter,
  Headphones,
  Laptop,
  Network,
  Search,
  Server,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import styles from "./ProductsPage.module.css";

type Category =
  | "All Products"
  | "Computers"
  | "Networking"
  | "Servers"
  | "Security"
  | "Software"
  | "Accessories";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: Exclude<Category, "All Products">;
  description: string;
  price: number;
  image: string;
  tag?: string;
  featured?: boolean;
  specs: string[];
};

const categories: {
  name: Category;
  icon: typeof Laptop;
}[] = [
  { name: "All Products", icon: ShoppingBag },
  { name: "Computers", icon: Laptop },
  { name: "Networking", icon: Network },
  { name: "Servers", icon: Server },
  { name: "Security", icon: ShieldCheck },
  { name: "Software", icon: Cpu },
  { name: "Accessories", icon: Headphones },
];

const products: Product[] = [
  {
    id: 1,
    name: "Business Laptop Pro",
    brand: "Dell",
    category: "Computers",
    description: "Professional computing for modern workplaces.",
    price: 64990,
    image: "laptop",
    tag: "Popular",
    featured: true,
    specs: ["Intel Core i5", "16 GB RAM", "512 GB SSD"],
  },
  {
    id: 2,
    name: "Enterprise Firewall",
    brand: "Fortinet",
    category: "Security",
    description: "Network protection for growing businesses.",
    price: 125000,
    image: "security",
    tag: "Enterprise",
    featured: true,
    specs: ["Threat protection", "VPN support", "Central management"],
  },
  {
    id: 3,
    name: "Managed Network Switch",
    brand: "TP-Link",
    category: "Networking",
    description: "Reliable connectivity for business networks.",
    price: 18990,
    image: "network",
    specs: ["24 Gigabit ports", "Managed VLANs", "Web management"],
  },
  {
    id: 4,
    name: "Tower Business Server",
    brand: "Dell",
    category: "Servers",
    description: "A dependable foundation for business workloads.",
    price: 189000,
    image: "server",
    tag: "Business",
    featured: true,
    specs: ["Xeon-class options", "ECC memory options", "RAID options"],
  },
  {
    id: 5,
    name: "Wireless Access Point",
    brand: "Ubiquiti",
    category: "Networking",
    description: "Extend wireless coverage across your workspace.",
    price: 15990,
    image: "wifi",
    specs: ["Wi-Fi options", "Central management", "PoE options"],
  },
  {
    id: 6,
    name: "Business Desktop PC",
    brand: "HP",
    category: "Computers",
    description: "Everyday productivity with business-ready hardware.",
    price: 42990,
    image: "desktop",
    specs: ["Intel Core i5", "16 GB RAM", "512 GB SSD"],
  },
  {
    id: 7,
    name: "Endpoint Security",
    brand: "Bitdefender",
    category: "Software",
    description: "Endpoint protection for business devices.",
    price: 2499,
    image: "software",
    specs: ["Endpoint protection", "Security management", "License options"],
  },
  {
    id: 8,
    name: "Professional Headset",
    brand: "Logitech",
    category: "Accessories",
    description: "Clear audio for calls, meetings and support teams.",
    price: 3499,
    image: "accessory",
    specs: ["Noise-reducing microphone", "USB connectivity", "Comfort fit"],
  },
  {
    id: 9,
    name: "Rack Server Solution",
    brand: "HPE",
    category: "Servers",
    description: "Scalable infrastructure for demanding workloads.",
    price: 245000,
    image: "server",
    specs: ["Rack-mount options", "Redundant power options", "Remote management"],
  },
  {
    id: 10,
    name: "Business Network Router",
    brand: "TP-Link",
    category: "Networking",
    description: "Manage internet connectivity for your office.",
    price: 8990,
    image: "network",
    specs: ["Gigabit WAN", "VPN options", "Multi-WAN options"],
  },
  {
    id: 11,
    name: "Wireless Keyboard & Mouse",
    brand: "Logitech",
    category: "Accessories",
    description: "A clean, comfortable workstation setup.",
    price: 2299,
    image: "accessory",
    specs: ["Wireless connection", "Ergonomic design", "Long battery life"],
  },
  {
    id: 12,
    name: "Business Productivity Suite",
    brand: "Productivity",
    category: "Software",
    description: "Productivity software with business licensing options.",
    price: 3999,
    image: "software",
    specs: ["License options", "Business deployment", "Renewal support"],
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function ProductArtwork({ product }: { product: Product }) {
  const artwork = {
    laptop: Laptop,
    security: ShieldCheck,
    network: Network,
    server: Server,
    wifi: Network,
    desktop: Cpu,
    software: Cpu,
    accessory: Headphones,
  };

  const Icon = artwork[product.image as keyof typeof artwork] ?? ShoppingBag;

  return (
    <div className={`${styles.productArtwork} ${styles[product.image]}`}>
      <span className={styles.artworkGlow} />
      <span className={styles.artworkRing} />
      <Icon
        className={styles.productIllustration}
        strokeWidth={1.15}
        aria-hidden="true"
      />
      <span className={styles.artworkBrand}>{product.brand}</span>
    </div>
  );
}

export default function ProductsPage() {
  const [category, setCategory] = useState<Category>("All Products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(300000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [enquiry, setEnquiry] = useState<Product[]>([]);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesCategory =
          category === "All Products" || product.category === category;

        const matchesSearch =
          !query ||
          [
            product.name,
            product.brand,
            product.category,
            product.description,
            ...product.specs,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query);

        return (
          matchesCategory &&
          matchesSearch &&
          product.price <= maxPrice
        );
      })
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "name") return a.name.localeCompare(b.name);
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      });
  }, [category, search, sort, maxPrice]);

  function addToEnquiry(product: Product) {
    setEnquiry((current) =>
      current.some((item) => item.id === product.id)
        ? current
        : [...current, product]
    );
    setNotice(`${product.name} added to your enquiry list.`);
  }

  function removeFromEnquiry(id: number) {
    setEnquiry((current) => current.filter((item) => item.id !== id));
  }

  const resetFilters = () => {
    setCategory("All Products");
    setSearch("");
    setSort("featured");
    setMaxPrice(300000);
  };

  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Products</span>
          </div>

          <div className={styles.eyebrow}>
            <Sparkles size={15} />
            <span>BUSINESS TECHNOLOGY, SIMPLIFIED</span>
          </div>

          <h1>
            Technology that
            <br />
            moves your business
            <span className={styles.gradientText}> forward.</span>
          </h1>

          <p className={styles.heroDescription}>
            Discover business hardware, networking infrastructure,
            cybersecurity solutions and software — backed by expert IT
            guidance from Shineweb Tech Creations.
          </p>

          <div className={styles.heroActions}>
            <a href="#catalogue" className={styles.primaryButton}>
              Explore products <ArrowRight size={17} />
            </a>
            <Link href="/contact" className={styles.secondaryButton}>
              Talk to an expert <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div>
              <strong>IT</strong>
              <span>Infrastructure</span>
            </div>
            <span className={styles.statDivider} />
            <div>
              <strong>End-to-end</strong>
              <span>Business solutions</span>
            </div>
            <span className={styles.statDivider} />
            <div>
              <strong>Expert</strong>
              <span>Technical support</span>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.visualOrb} />
          <div className={styles.visualOrbit} />
          <div className={styles.visualOrbitTwo} />
          <div className={styles.visualCore}>
            <Network size={72} strokeWidth={1} />
            <span>CONNECTED</span>
            <strong>BUSINESS IT</strong>
          </div>
          <div className={`${styles.floatingCard} ${styles.floatingOne}`}>
            <ShieldCheck size={23} />
            <span>
              <strong>Secure</strong>
              <small>Network protection</small>
            </span>
          </div>
          <div className={`${styles.floatingCard} ${styles.floatingTwo}`}>
            <Server size={23} />
            <span>
              <strong>Scalable</strong>
              <small>IT infrastructure</small>
            </span>
          </div>
          <div className={`${styles.floatingCard} ${styles.floatingThree}`}>
            <Cpu size={22} />
            <span>
              <strong>Reliable</strong>
              <small>Business technology</small>
            </span>
          </div>
        </div>
      </section>

      <section className={styles.trustStrip}>
        <span>Explore solutions for</span>
        <strong>OFFICES</strong>
        <i />
        <strong>ENTERPRISES</strong>
        <i />
        <strong>SMALL BUSINESSES</strong>
        <i />
        <strong>IT TEAMS</strong>
      </section>

      <section className={styles.catalogue} id="catalogue">
        <div className={styles.sectionHeading}>
          <div>
            <div className={styles.sectionEyebrow}>OUR CATALOGUE</div>
            <h2>
              Find your next
              <span className={styles.gradientText}> solution.</span>
            </h2>
            <p>
              Explore technology selected for business performance,
              reliability and growth.
            </p>
          </div>

          <div className={styles.resultCount}>
            <span>{filteredProducts.length.toString().padStart(2, "0")}</span>
            <small>PRODUCTS FOUND</small>
          </div>
        </div>

        <div className={styles.catalogueTools}>
          <div className={styles.searchBox}>
            <Search size={19} />
            <input
              type="search"
              aria-label="Search products"
              placeholder="Search products, brands or specifications..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            type="button"
            className={styles.filterToggle}
            onClick={() => setFiltersOpen((value) => !value)}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={17} />
            Filters
            <ChevronDown
              size={15}
              className={filtersOpen ? styles.rotateIcon : ""}
            />
          </button>

          <label className={styles.sortBox}>
            <span>Sort by</span>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <ArrowDown size={14} />
          </label>
        </div>

        {filtersOpen && (
          <div className={styles.advancedFilters}>
            <div className={styles.priceFilter}>
              <label htmlFor="max-price">
                Maximum price <strong>{money(maxPrice)}</strong>
              </label>
              <input
                id="max-price"
                type="range"
                min={5000}
                max={300000}
                step={5000}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
              <div className={styles.priceBounds}>
                <span>₹5,000</span>
                <span>₹3,00,000</span>
              </div>
            </div>
            <button
              type="button"
              className={styles.resetButton}
              onClick={resetFilters}
            >
              Reset all filters
            </button>
          </div>
        )}

        <div className={styles.catalogueLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeading}>
              <Filter size={17} />
              <strong>Categories</strong>
            </div>

            <div className={styles.categoryList}>
              {categories.map((item) => {
                const Icon = item.icon;
                const active = category === item.name;
                const count =
                  item.name === "All Products"
                    ? products.length
                    : products.filter(
                        (product) => product.category === item.name
                      ).length;

                return (
                  <button
                    key={item.name}
                    type="button"
                    className={`${styles.categoryButton} ${
                      active ? styles.categoryActive : ""
                    }`}
                    onClick={() => setCategory(item.name)}
                    aria-pressed={active}
                  >
                    <Icon size={18} strokeWidth={1.7} />
                    <span>{item.name}</span>
                    <small>{count}</small>
                  </button>
                );
              })}
            </div>

            <div className={styles.helpCard}>
              <div className={styles.helpIcon}>
                <Headphones size={22} />
              </div>
              <h3>Need expert advice?</h3>
              <p>
                Not sure what fits your setup? Let our team help you choose.
              </p>
              <Link href="/contact">
                Contact our team <ArrowUpRight size={15} />
              </Link>
            </div>
          </aside>

          <div className={styles.productArea}>
            <div className={styles.activeFilters}>
              <span>
                {category === "All Products" ? "All categories" : category}
              </span>
              {search && <span>Search: {search}</span>}
              <span>Up to {money(maxPrice)}</span>
              <button type="button" onClick={resetFilters}>
                Clear <X size={13} />
              </button>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={styles.productGrid}>
                {filteredProducts.map((product) => {
                  const added = enquiry.some(
                    (item) => item.id === product.id
                  );

                  return (
                    <article
                      className={styles.productCard}
                      key={product.id}
                    >
                      <div className={styles.productMedia}>
                        <ProductArtwork product={product} />
                        {product.tag && (
                          <span className={styles.productTag}>
                            {product.tag}
                          </span>
                        )}
                        <span className={styles.productCategory}>
                          {product.category}
                        </span>
                      </div>

                      <div className={styles.productInfo}>
                        <span className={styles.productBrand}>
                          {product.brand}
                        </span>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>

                        <ul className={styles.specList}>
                          {product.specs.map((spec) => (
                            <li key={spec}>
                              <Check size={13} /> {spec}
                            </li>
                          ))}
                        </ul>

                        <div className={styles.productFooter}>
                          <div className={styles.priceBlock}>
                            <small>Indicative price</small>
                            <strong>{money(product.price)}</strong>
                          </div>

                          <button
                            type="button"
                            className={`${styles.addButton} ${
                              added ? styles.addedButton : ""
                            }`}
                            onClick={() => addToEnquiry(product)}
                            aria-label={`${
                              added ? "Added" : "Add"
                            } ${product.name} to enquiry`}
                          >
                            {added ? (
                              <Check size={18} />
                            ) : (
                              <ArrowUpRight size={19} />
                            )}
                          </button>
                        </div>

                        <button
                          type="button"
                          className={styles.enquiryButton}
                          onClick={() => addToEnquiry(product)}
                        >
                          {added ? "Added to enquiry" : "Request a quote"}
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <Search size={30} />
                </div>
                <h3>No products found</h3>
                <p>
                  Try another search term, select a different category, or
                  increase your maximum price.
                </p>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={resetFilters}
                >
                  Clear filters <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaContent}>
          <span className={styles.ctaEyebrow}>
            <Sparkles size={14} /> CUSTOM BUSINESS SOLUTIONS
          </span>
          <h2>
            Your business needs
            <br />
            more than just a product.
          </h2>
          <p>
            Get a tailored IT solution with product recommendations,
            deployment planning and technical support from our team.
          </p>
          <Link href="/contact" className={styles.primaryButton}>
            Discuss your requirements <ArrowRight size={17} />
          </Link>
        </div>
        <div className={styles.ctaVisual} aria-hidden="true">
          <div className={styles.ctaCircle}>
            <Network size={68} strokeWidth={1.1} />
          </div>
          <span className={styles.ctaNodeOne} />
          <span className={styles.ctaNodeTwo} />
          <span className={styles.ctaNodeThree} />
        </div>
      </section>

      {enquiry.length > 0 && (
        <aside className={styles.enquiryBar} aria-live="polite">
          <div className={styles.enquirySummary}>
            <div className={styles.enquiryIcon}>
              <ShoppingBag size={19} />
              <span>{enquiry.length}</span>
            </div>
            <div>
              <strong>Enquiry list</strong>
              <small>
                {enquiry.length} product{enquiry.length !== 1 ? "s" : ""}{" "}
                selected
              </small>
            </div>
          </div>

          <div className={styles.enquiryActions}>
            <button
              type="button"
              className={styles.viewEnquiryButton}
              onClick={() => {
                const lines = enquiry
                  .map(
                    (item) =>
                      `${item.name} (${item.brand}) - ${money(item.price)}`
                  )
                  .join("\n");

                const body = encodeURIComponent(
                  `Hello Shineweb Tech Creations,\n\nI would like a quotation for:\n\n${lines}\n\nPlease share your best quotation, availability and delivery details.\n\nThank you.`
                );

                window.location.href =
                  `mailto:kunalsarma@shinewebtechcretions.online?subject=` +
                  encodeURIComponent("Product Quotation Request") +
                  `&body=${body}`;
              }}
            >
              Request quotation <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={styles.clearEnquiry}
              onClick={() => setEnquiry([])}
              aria-label="Clear enquiry list"
            >
              <X size={17} />
            </button>
          </div>
        </aside>
      )}

      {notice && (
        <div className={styles.toast} role="status">
          <Check size={16} /> {notice}
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={15} />
          </button>
        </div>
      )}
    </main>
  );
}
