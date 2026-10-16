
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import RequestQuoteModal from "@/components/modals/RequestQuoteModal/RequestQuoteModal";
import styles from "./Header.module.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", dropdown: true },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Solutions", href: "/solutions", dropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const dropdowns: Record<
  string,
  { label: string; href: string }[]
> = {
  Products: [
    {
      label: "Laptops & Desktops",
      href: "/products?category=computers",
    },
    {
      label: "Servers & Workstations",
      href: "/products?category=servers",
    },
    {
      label: "Networking Equipment",
      href: "/products?category=networking",
    },
    {
      label: "Software Licensing",
      href: "/products?category=software",
    },
    {
      label: "CCTV & Surveillance",
      href: "/products?category=cctv",
    },
    {
      label: "Accessories & Peripherals",
      href: "/products?category=accessories",
    },
  ],

  Services: [
    {
      label: "IT Hardware Supply",
      href: "/services#hardware",
    },
    {
      label: "Software Licensing",
      href: "/services#software",
    },
    {
      label: "Networking Infrastructure",
      href: "/services#networking",
    },
    {
      label: "Cybersecurity",
      href: "/services#cybersecurity",
    },
    {
      label: "Web Development",
      href: "/services#web-development",
    },
    {
      label: "IT Support & AMC",
      href: "/services#support",
    },
  ],

  Solutions: [
    {
      label: "Healthcare",
      href: "/solutions#healthcare",
    },
    {
      label: "Education",
      href: "/solutions#education",
    },
    {
      label: "Retail & E-commerce",
      href: "/solutions#retail",
    },
    {
      label: "Corporate Offices",
      href: "/solutions#corporate",
    },
    {
      label: "Government & NGOs",
      href: "/solutions#government",
    },
  ],
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L21 8H6" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M12 3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6" />
    </svg>
  );
}

function SignupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 14 0M19 8v8M15 12h8" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${
        open ? styles.chevronOpen : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(
    null
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  // Request a Quote modal state
  const [quoteOpen, setQuoteOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
    setOpenDropdown(null);
    setAccountOpen(false);
  }

  function openQuoteModal() {
    closeMenu();
    setSearchOpen(false);
    setAccountOpen(false);
    setQuoteOpen(true);
  }

  function closeQuoteModal() {
    setQuoteOpen(false);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      setSearchOpen(true);
      return;
    }

    closeMenu();
    setSearchOpen(false);

    router.push(
      `/products?search=${encodeURIComponent(query)}`
    );
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  function toggleDropdown(label: string) {
    setOpenDropdown((current) =>
      current === label ? null : label
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* BRAND */}

        <Link
          href="/"
          className={styles.brand}
          aria-label="Shineweb Tech Creations home"
          onClick={closeMenu}
        >
          <span className={styles.logoMark}>
            <Image
              src="/shineweb_icon.png"
              alt=""
              width={54}
              height={54}
              priority
              className={styles.logoImage}
            />
          </span>

          <span className={styles.brandText}>
            <span className={styles.brandName}>
              SHINEWEB
            </span>

            <span className={styles.brandSubtitle}>
              TECH CREATIONS
            </span>
          </span>
        </Link>

        {/* MAIN NAVIGATION */}

        <nav
          id="main-navigation"
          className={`${styles.navigation} ${
            menuOpen ? styles.navigationOpen : ""
          }`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const hasDropdown = Boolean(item.dropdown);
            const expanded = openDropdown === item.label;

            return (
              <div className={styles.navItem} key={item.label}>
                <div className={styles.navLinkRow}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      isActive(item.href) ? styles.active : ""
                    }`}
                    aria-current={
                      isActive(item.href) ? "page" : undefined
                    }
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>

                  {hasDropdown && (
                    <button
                      type="button"
                      className={styles.dropdownToggle}
                      aria-label={`Toggle ${item.label} menu`}
                      aria-expanded={expanded}
                      onClick={() =>
                        toggleDropdown(item.label)
                      }
                    >
                      <ChevronIcon open={expanded} />
                    </button>
                  )}
                </div>

                {hasDropdown && (
                  <div
                    className={`${styles.dropdown} ${
                      expanded ? styles.dropdownOpen : ""
                    }`}
                  >
                    <div className={styles.dropdownHeading}>
                      Explore {item.label}
                    </div>

                    {dropdowns[item.label]?.map((entry) => (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        className={styles.dropdownLink}
                        onClick={closeMenu}
                      >
                        <span>{entry.label}</span>

                        <span className={styles.dropdownArrow}>
                          ↗
                        </span>
                      </Link>
                    ))}

                    <Link
                      href={item.href}
                      className={styles.dropdownFooter}
                      onClick={closeMenu}
                    >
                      View all {item.label.toLowerCase()}
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          {/* MOBILE ACCOUNT LINKS */}

          <div className={styles.mobileAccountLinks}>
            <div className={styles.mobileAccountHeading}>
              Your Account
            </div>

            <Link
              href="/login"
              className={styles.mobileAccountLink}
              onClick={closeMenu}
            >
              <LoginIcon />
              Login
            </Link>

            <Link
              href="/signup"
              className={styles.mobileAccountLink}
              onClick={closeMenu}
            >
              <SignupIcon />
              Create Account
            </Link>
          </div>

          {/* MOBILE QUOTE BUTTON */}

          <button
            type="button"
            className={styles.mobileQuote}
            onClick={openQuoteModal}
          >
            Get a Quote <span>↗</span>
          </button>
        </nav>

        {/* SEARCH, CART, ACCOUNT AND QUOTE */}

        <div className={styles.actions}>
          {/* SEARCH */}

          <form
            className={`${styles.searchForm} ${
              searchOpen ? styles.searchExpanded : ""
            }`}
            role="search"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              onFocus={() => setSearchOpen(true)}
              onBlur={() => {
                if (!searchQuery.trim()) {
                  setSearchOpen(false);
                }
              }}
              placeholder="Search products..."
              aria-label="Search products"
            />

            <button
              type="submit"
              aria-label="Search products"
              className={styles.searchButton}
            >
              <SearchIcon />
            </button>
          </form>

          {/* CART */}

          <Link
            href="/cart"
            className={styles.cartButton}
            aria-label="Shopping cart"
            onClick={() => setAccountOpen(false)}
          >
            <CartIcon />
          </Link>

          {/* ACCOUNT BUTTON AND DROPDOWN */}

          <div className={styles.accountWrapper}>
            <button
              type="button"
              className={`${styles.accountButton} ${
                accountOpen ? styles.accountButtonActive : ""
              }`}
              aria-label="Account menu"
              aria-expanded={accountOpen}
              aria-haspopup="true"
              aria-controls="account-menu"
              onClick={() =>
                setAccountOpen((previous) => !previous)
              }
            >
              <AccountIcon />

              <span className={styles.accountLabel}>
                Account
              </span>

              <span
                className={`${styles.accountChevron} ${
                  accountOpen
                    ? styles.accountChevronOpen
                    : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <div
              id="account-menu"
              className={`${styles.accountDropdown} ${
                accountOpen
                  ? styles.accountDropdownOpen
                  : ""
              }`}
              aria-hidden={!accountOpen}
              inert={!accountOpen}
            >
              <div className={styles.accountDropdownHeader}>
                <span className={styles.accountAvatar}>
                  <AccountIcon />
                </span>

                <div>
                  <strong>Welcome to Shineweb</strong>
                  <span>Manage your account</span>
                </div>
              </div>

              <div className={styles.accountDivider} />

              <Link
                href="/login"
                className={styles.accountMenuLink}
                onClick={() => setAccountOpen(false)}
              >
                <span className={styles.accountMenuIcon}>
                  <LoginIcon />
                </span>

                <span className={styles.accountMenuText}>
                  <strong>Login</strong>
                  <small>Access your account</small>
                </span>

                <span className={styles.accountMenuArrow}>
                  ↗
                </span>
              </Link>

              <Link
                href="/signup"
                className={`${styles.accountMenuLink} ${
                  styles.accountSignup
                }`}
                onClick={() => setAccountOpen(false)}
              >
                <span className={styles.accountMenuIcon}>
                  <SignupIcon />
                </span>

                <span className={styles.accountMenuText}>
                  <strong>Create Account</strong>
                  <small>Join Shineweb today</small>
                </span>

                <span className={styles.accountMenuArrow}>
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* DESKTOP QUOTE BUTTON */}

          <button
            type="button"
            className={styles.quoteButton}
            onClick={openQuoteModal}
          >
            Get a Quote <span>↗</span>
          </button>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => {
              setMenuOpen((previous) => !previous);
              setOpenDropdown(null);
              setAccountOpen(false);
            }}
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* MOBILE BACKDROP */}

      {menuOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}

      {/* REQUEST A QUOTE MODAL */}

      <RequestQuoteModal
        open={quoteOpen}
        onClose={closeQuoteModal}
      />
    </header>
  );
}
