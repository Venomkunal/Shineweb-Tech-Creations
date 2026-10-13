
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  LoaderCircle,
  PackageOpen,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";
import styles from "./FeaturedProducts.module.css";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const PLACEHOLDER_IMAGE = "/images/product-placeholder.png";
const OFFER_INTERVAL = 4000;
const PAGE_SIZE = 8;

const CATEGORIES = [
  "All Products",
  "Laptops",
  "Desktops",
  "Servers",
  "Networking",
  "Software",
  "CCTV",
  "Accessories",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

interface Offer {
  id: string;
  title: string;
  highlight?: string;
  description: string;
  eyebrow: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  footnote: string;
  priority: number;
}

function getString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim()
    ? value.trim()
    : fallback;
}

function getNumber(value: unknown, fallback = 0): number {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function getResponseItems(
  result: unknown,
  kind: "products" | "offers"
): unknown[] {
  if (Array.isArray(result)) return result;

  if (!result || typeof result !== "object") return [];

  const response = result as Record<string, unknown>;
  const nested = response.data;

  if (Array.isArray(nested)) return nested;

  if (nested && typeof nested === "object") {
    const data = nested as Record<string, unknown>;

    if (Array.isArray(data[kind])) {
      return data[kind] as unknown[];
    }

    if (Array.isArray(data.items)) return data.items;
  }

  if (Array.isArray(response[kind])) {
    return response[kind] as unknown[];
  }

  if (Array.isArray(response.items)) return response.items;

  return [];
}

function getProductImage(raw: Record<string, unknown>): string {
  const images = raw.images;

  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];

    if (typeof first === "string" && first.trim()) {
      return first.trim();
    }

    if (first && typeof first === "object") {
      const imageObject = first as Record<string, unknown>;

      return getString(
        imageObject.url ?? imageObject.src ?? imageObject.image
      );
    }
  }

  return getString(
    raw.image ??
      raw.imageUrl ??
      raw.imageURL ??
      raw.thumbnail ??
      raw.photo
  );
}

function normalizeProduct(item: unknown): Product | null {
  if (!item || typeof item !== "object") return null;

  const raw = item as Record<string, unknown>;
  const id = getString(raw.id ?? raw._id);

  if (!id) return null;

  const oldPrice =
    raw.oldPrice == null
      ? undefined
      : getNumber(raw.oldPrice, 0);

  return {
    id,
    slug: getString(raw.slug, id),
    name: getString(raw.name ?? raw.title, "Unnamed Product"),
    description: getString(raw.description),
    category: getString(raw.category, "Accessories"),
    price: Math.max(0, getNumber(raw.price)),
    oldPrice,
    rating: Math.min(5, Math.max(0, getNumber(raw.rating))),
    reviews: Math.max(
      0,
      getNumber(raw.reviews ?? raw.reviewCount)
    ),
    image: getProductImage(raw),
    badge: getString(raw.badge) || undefined,
  };
}

function normalizeOffer(item: unknown): Offer | null {
  if (!item || typeof item !== "object") return null;

  const raw = item as Record<string, unknown>;
  const id = getString(raw.id ?? raw._id);

  if (!id || raw.active === false) return null;

  return {
    id,
    title: getString(raw.title, "Special Offer"),
    highlight: getString(raw.highlight) || undefined,
    description: getString(raw.description),
    eyebrow: getString(raw.eyebrow, "EXCLUSIVE OFFER"),
    features: Array.isArray(raw.features)
      ? raw.features.filter(
          (feature): feature is string =>
            typeof feature === "string" &&
            Boolean(feature.trim())
        )
      : [],
    buttonText: getString(raw.buttonText, "Know More"),
    buttonLink: getString(raw.buttonLink, "/contact"),
    footnote: getString(raw.footnote),
    priority: getNumber(raw.priority),
  };
}

function shuffleProducts(items: Product[]): Product[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[randomIndex]] = [
      result[randomIndex],
      result[index],
    ];
  }

  return result;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function safeOfferLink(value: string): string {
  const link = value.trim();

  if (link.startsWith("/") && !link.startsWith("//")) {
    return link;
  }

  try {
    const url = new URL(link);

    if (url.protocol === "https:") return url.toString();
  } catch {
    // Use the contact page for invalid links.
  }

  return "/contact";
}

function safeImageUrl(value: string): string {
  const image = value.trim();

  if (image.startsWith("/") && !image.startsWith("//")) {
    return image;
  }

  try {
    const url = new URL(image);

    if (url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    // Use the fallback image.
  }

  return PLACEHOLDER_IMAGE;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [activeCategory, setActiveCategory] =
    useState<Category>("All Products");

  const [offerIndex, setOfferIndex] = useState(0);
  const [isOfferPaused, setIsOfferPaused] = useState(false);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [offersLoading, setOffersLoading] = useState(true);
  const [error, setError] = useState("");
  const [offerError, setOfferError] = useState("");

  const [productPage, setProductPage] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/products/featured?limit=24`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error(`Unable to load products (${response.status}).`);
      }

      const result: unknown = await response.json();

      const normalized = getResponseItems(result, "products")
        .map(normalizeProduct)
        .filter((item): item is Product => item !== null);

      setProducts(shuffleProducts(normalized));
      setFailedImages([]);
      setProductPage(0);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const loadOffers = useCallback(async () => {
    setOffersLoading(true);
    setOfferError("");

    try {
      const response = await fetch(`${API_URL}/api/offers`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load offers.");
      }

      const result: unknown = await response.json();

      const normalized = getResponseItems(result, "offers")
        .map(normalizeOffer)
        .filter((item): item is Offer => item !== null)
        .sort((a, b) => b.priority - a.priority);

      setOffers(normalized);
      setOfferIndex(0);
    } catch {
      setOffers([]);
      setOfferError("Offers are temporarily unavailable.");
    } finally {
      setOffersLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
    void loadOffers();
  }, [loadProducts, loadOffers]);

  // Automatic offer sliding.
  useEffect(() => {
    if (offers.length <= 1 || isOfferPaused) return;

    const timer = window.setInterval(() => {
      setOfferIndex((current) => (current + 1) % offers.length);
    }, OFFER_INTERVAL);

    return () => window.clearInterval(timer);
  }, [offers.length, isOfferPaused]);

  // Keep the index within the available offers.
  useEffect(() => {
    setOfferIndex((current) =>
      offers.length > 0 ? current % offers.length : 0
    );
  }, [offers.length]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Products") return products;

    return products.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory, products]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const visibleProducts = filteredProducts.slice(
    productPage * PAGE_SIZE,
    productPage * PAGE_SIZE + PAGE_SIZE
  );

  const activeOffer = offers[offerIndex];

  const selectCategory = (category: Category) => {
    setActiveCategory(category);
    setProductPage(0);
  };

  const previousOffer = () => {
    if (offers.length <= 1) return;

    setOfferIndex((current) =>
      current === 0 ? offers.length - 1 : current - 1
    );
  };

  const nextOffer = () => {
    if (offers.length <= 1) return;

    setOfferIndex((current) => (current + 1) % offers.length);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleCart = (id: string) => {
    setCart((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleOfferFocus = () => setIsOfferPaused(true);

  const handleOfferBlur = (
    event: React.FocusEvent<HTMLElement>
  ) => {
    const nextTarget = event.relatedTarget;

    if (
      !(nextTarget instanceof Node) ||
      !event.currentTarget.contains(nextTarget)
    ) {
      setIsOfferPaused(false);
    }
  };

  return (
    <section
      className={styles.section}
      id="featured-products"
      aria-labelledby="featured-products-title"
    >
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <div className={styles.headingRow}>
            <div className={styles.headingContent}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />
                TECHNOLOGY STORE
              </span>

              <h2 id="featured-products-title">
                Featured <span>Products</span>
              </h2>

              <p>
                Discover reliable technology, business software, and
                IT solutions for your organization.
              </p>
            </div>

            <Link href="/products" className={styles.viewAll}>
              View All Products
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </header>

        <div className={styles.toolbar}>
          <div
            className={styles.tabs}
            aria-label="Filter products by category"
          >
            {CATEGORIES.map((category) => (
              <button
                type="button"
                key={category}
                className={`${styles.tab} ${
                  activeCategory === category
                    ? styles.activeTab
                    : ""
                }`}
                onClick={() => selectCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.resultCount} aria-live="polite">
            <span className={styles.countNumber}>
              {filteredProducts.length}
            </span>{" "}
            products
          </div>
        </div>

        <div className={styles.productLayout}>
          <div className={styles.productsArea}>
            {loading ? (
              <div className={styles.loader} role="status">
                <LoaderCircle
                  size={30}
                  className={styles.spin}
                />
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className={styles.emptyState}>
                <PackageOpen size={38} />
                <h3>Products unavailable</h3>
                <p>{error}</p>

                <button
                  type="button"
                  className={styles.resetFilter}
                  onClick={() => void loadProducts()}
                >
                  Try Again
                </button>
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <PackageOpen size={38} />
                <h3>No products found</h3>
                <p>
                  There are no products in this category right now.
                </p>

                <button
                  type="button"
                  className={styles.resetFilter}
                  onClick={() => selectCategory("All Products")}
                >
                  View All Products
                </button>
              </div>
            ) : (
              <>
                <div className={styles.productGrid}>
                  {visibleProducts.map((product, index) => {
                    const isFavorite = favorites.includes(product.id);
                    const isAdded = cart.includes(product.id);

                    const imageSrc = failedImages.includes(product.id)
                      ? PLACEHOLDER_IMAGE
                      : safeImageUrl(product.image);

                    return (
                      <article
                        className={styles.productCard}
                        key={product.id}
                        style={
                          {
                            "--card-index": index,
                          } as CSSProperties
                        }
                      >
                        <div className={styles.imageArea}>
                          {product.badge && (
                            <span className={styles.productBadge}>
                              {product.badge}
                            </span>
                          )}

                          <button
                            type="button"
                            className={`${styles.favorite} ${
                              isFavorite ? styles.isFavorite : ""
                            }`}
                            onClick={() => toggleFavorite(product.id)}
                            aria-label={
                              isFavorite
                                ? `Remove ${product.name} from favorites`
                                : `Add ${product.name} to favorites`
                            }
                            aria-pressed={isFavorite}
                          >
                            <Heart
                              size={17}
                              fill={
                                isFavorite ? "currentColor" : "none"
                              }
                            />
                          </button>

                          <Link
                            href={`/products/${encodeURIComponent(product.slug)}`}
                            className={styles.imageLink}
                            aria-label={`View ${product.name}`}
                          >
                            <Image
                              src={imageSrc}
                              alt={product.name}
                              width={360}
                              height={260}
                              className={styles.productImage}
                              unoptimized
                              onError={() => {
                                setFailedImages((current) =>
                                  current.includes(product.id)
                                    ? current
                                    : [...current, product.id]
                                );
                              }}
                            />
                          </Link>

                          <span className={styles.imageHint}>
                            <ArrowUpRight size={14} />
                            View product
                          </span>
                        </div>

                        <div className={styles.productInfo}>
                          <span className={styles.productCategory}>
                            {product.category}
                          </span>

                          <Link
                            href={`/products/${encodeURIComponent(product.slug)}`}
                            className={styles.productName}
                          >
                            {product.name}
                          </Link>

                          {product.description && (
                            <p className={styles.productDescription}>
                              {product.description}
                            </p>
                          )}

                          {product.rating > 0 && (
                            <div
                              className={styles.rating}
                              aria-label={`Rating ${product.rating} out of 5`}
                            >
                              <span className={styles.stars}>
                                {Array.from(
                                  { length: 5 },
                                  (_, starIndex) => (
                                    <Star
                                      key={starIndex}
                                      size={12}
                                      fill={
                                        starIndex <
                                        Math.round(product.rating)
                                          ? "currentColor"
                                          : "none"
                                      }
                                    />
                                  )
                                )}
                              </span>

                              <span className={styles.ratingValue}>
                                {product.rating.toFixed(1)}
                              </span>

                              <span className={styles.reviews}>
                                ({product.reviews})
                              </span>
                            </div>
                          )}

                          <div className={styles.priceRow}>
                            <div className={styles.priceGroup}>
                              <span className={styles.price}>
                                {formatPrice(product.price)}
                              </span>

                              {product.oldPrice !== undefined &&
                                product.oldPrice > product.price && (
                                  <span className={styles.oldPrice}>
                                    {formatPrice(product.oldPrice)}
                                  </span>
                                )}
                            </div>

                            <button
                              type="button"
                              className={`${styles.addToCart} ${
                                isAdded ? styles.addedToCart : ""
                              }`}
                              onClick={() => toggleCart(product.id)}
                              aria-label={
                                isAdded
                                  ? `Remove ${product.name} from selection`
                                  : `Add ${product.name} to selection`
                              }
                              aria-pressed={isAdded}
                            >
                              {isAdded ? (
                                <Check size={17} />
                              ) : (
                                <ShoppingCart size={17} />
                              )}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {filteredProducts.length > PAGE_SIZE && (
                  <nav
                    className={styles.productPagination}
                    aria-label="Product pagination"
                  >
                    <button
                      type="button"
                      className={styles.pageArrow}
                      onClick={() =>
                        setProductPage((page) => Math.max(0, page - 1))
                      }
                      disabled={productPage === 0}
                      aria-label="Previous products"
                    >
                      <ArrowLeft size={17} />
                    </button>

                    <span>
                      Page {productPage + 1} of {totalPages}
                    </span>

                    <button
                      type="button"
                      className={styles.pageArrow}
                      onClick={() =>
                        setProductPage((page) =>
                          Math.min(totalPages - 1, page + 1)
                        )
                      }
                      disabled={productPage >= totalPages - 1}
                      aria-label="Next products"
                    >
                      <ArrowRight size={17} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>

          <aside
            className={styles.offerCard}
            onMouseEnter={() => setIsOfferPaused(true)}
            onMouseLeave={() => setIsOfferPaused(false)}
            onFocusCapture={handleOfferFocus}
            onBlurCapture={handleOfferBlur}
            aria-label="Special offers"
            aria-roledescription="carousel"
          >
            <div className={styles.offerHeader}>
              <span className={styles.offerHeaderLabel}>
                <Sparkles size={15} />
                Special Offers
              </span>

              <span className={styles.statusDot} />

              <span className={styles.offerCount}>
                {offers.length
                  ? `${offerIndex + 1} / ${offers.length}`
                  : "Offers"}
              </span>
            </div>

            {offersLoading ? (
              <div className={styles.offerLoading} role="status">
                <LoaderCircle
                  size={27}
                  className={styles.spin}
                />
                <p>Loading offers...</p>
              </div>
            ) : activeOffer ? (
              <div
                className={styles.offerSlide}
                key={activeOffer.id}
                aria-live="polite"
              >
                <div className={styles.offerArtwork}>
                  <div className={styles.artworkGlow} />

                  <div className={styles.artworkCircle}>
                    <div className={styles.artworkCircleInner}>
                      <Tag size={35} strokeWidth={1.5} />
                    </div>
                  </div>

                  <span className={styles.artworkSpark}>✦</span>
                  <span className={styles.artworkOrbit}>✧</span>

                  <span className={styles.artworkDevice}>
                    SPECIAL DEAL
                  </span>
                </div>

                <span className={styles.offerCategory}>
                  {activeOffer.eyebrow}
                </span>

                <h3 className={styles.offerTitle}>
                  {activeOffer.title}
                </h3>

                {activeOffer.highlight && (
                  <p className={styles.offerHighlight}>
                    {activeOffer.highlight}
                  </p>
                )}

                {activeOffer.description && (
                  <p className={styles.offerDescription}>
                    {activeOffer.description}
                  </p>
                )}

                {activeOffer.features.length > 0 && (
                  <ul className={styles.offerFeatures}>
                    {activeOffer.features.map((feature, index) => (
                      <li key={`${activeOffer.id}-${index}`}>
                        <span className={styles.featureCheck}>
                          <Check size={13} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={safeOfferLink(activeOffer.buttonLink)}
                  className={styles.offerButton}
                >
                  {activeOffer.buttonText}
                  <ArrowUpRight size={17} />
                </Link>

                {activeOffer.footnote && (
                  <p className={styles.offerFootnote}>
                    {activeOffer.footnote}
                  </p>
                )}
              </div>
            ) : (
              <div className={styles.offerEmpty}>
                <div className={styles.offerEmptyIcon}>
                  <Tag size={28} />
                </div>

                <h3>Offers coming soon</h3>

                <p>
                  {offerError ||
                    "Keep an eye on this section for our latest offers."}
                </p>

                <button
                  type="button"
                  className={styles.resetFilter}
                  onClick={() => void loadOffers()}
                >
                  Try Again
                </button>

                <Link
                  href="/contact"
                  className={styles.offerButton}
                >
                  Contact Us
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            )}

            {offers.length > 1 && (
              <div className={styles.offerBottom}>
                <div className={styles.offerNavigation}>
                  <div className={styles.offerIndicators}>
                    {offers.map((offer, index) => (
                      <button
                        type="button"
                        key={offer.id}
                        className={`${styles.offerIndicator} ${
                          index === offerIndex
                            ? styles.offerIndicatorActive
                            : ""
                        }`}
                        onClick={() => setOfferIndex(index)}
                        aria-label={`Go to offer ${index + 1}`}
                        aria-current={
                          index === offerIndex ? "true" : undefined
                        }
                      />
                    ))}
                  </div>

                  <div className={styles.offerArrows}>
                    <button
                      type="button"
                      className={styles.offerArrow}
                      onClick={previousOffer}
                      aria-label="Previous offer"
                    >
                      <ArrowLeft size={16} />
                    </button>

                    <button
                      type="button"
                      className={styles.offerArrow}
                      onClick={nextOffer}
                      aria-label="Next offer"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className={styles.offerProgressTrack}>
                  <div
                    key={offerIndex}
                    className={`${styles.offerProgressBar} ${
                      isOfferPaused ? styles.progressPaused : ""
                    }`}
                  />
                </div>
              </div>
            )}
          </aside>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomMessage}>
            <span className={styles.bottomDot} />
            <span>
              Planning your next IT purchase? Let&apos;s find the right
              solution for your business.
            </span>
          </div>

          <div className={styles.bottomActions}>
            <Link href="/contact" className={styles.bottomLink}>
              Need a quotation?
              <ArrowUpRight size={15} />
            </Link>

            <Link href="/products" className={styles.bottomLink}>
              Browse Products
              <ArrowRight size={15} />
            </Link>

            <span className={styles.cartSummary}>
              <ShoppingCart size={16} />
              {cart.length} selected
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
