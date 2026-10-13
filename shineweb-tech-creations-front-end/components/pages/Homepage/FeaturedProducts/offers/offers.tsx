"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import styles from "./Offers.module.css";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

type Offer = {
  _id: string;
  title: string;
  highlight?: string;
  description: string;
  eyebrow?: string;
  features: string[];
  buttonText?: string;
  buttonLink?: string;
  footnote?: string;
  active: boolean;
  priority: number;
  createdAt?: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  count?: number;
  data?: T;
};

type OfferForm = {
  title: string;
  highlight: string;
  description: string;
  eyebrow: string;
  features: string;
  buttonText: string;
  buttonLink: string;
  footnote: string;
  active: boolean;
  priority: number;
};

const emptyForm: OfferForm = {
  title: "",
  highlight: "",
  description: "",
  eyebrow: "BUSINESS SOLUTIONS",
  features: "",
  buttonText: "Request a quotation",
  buttonLink: "/contact",
  footnote: "Bulk orders and project requirements welcome.",
  active: true,
  priority: 0,
};

function toForm(offer: Offer): OfferForm {
  return {
    title: offer.title ?? "",
    highlight: offer.highlight ?? "",
    description: offer.description ?? "",
    eyebrow: offer.eyebrow ?? "BUSINESS SOLUTIONS",
    features: (offer.features ?? []).join("\n"),
    buttonText: offer.buttonText ?? "Learn more",
    buttonLink: offer.buttonLink ?? "/contact",
    footnote: offer.footnote ?? "",
    active: offer.active,
    priority: offer.priority ?? 0,
  };
}

async function readResponse<T>(
  response: Response
): Promise<ApiResponse<T>> {
  let result: ApiResponse<T>;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      `Server returned an invalid response (HTTP ${response.status}).`
    );
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error(
      result.message ||
        "Your session is invalid or you do not have administrator access. Sign in again."
    );
  }

  if (!response.ok || result.success !== true) {
    throw new Error(
      result.message || `Request failed (HTTP ${response.status}).`
    );
  }

  return result;
}

export default function OffersAdminPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [form, setForm] = useState<OfferForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");

  const getToken = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }, []);

  const requestHeaders = useCallback((): HeadersInit => {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, [getToken]);

  const loadOffers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error(
          "Administrator login token not found. Sign in first."
        );
      }

      const response = await fetch(`${API_URL}/api/offers/admin`, {
        method: "GET",
        headers: requestHeaders(),
        cache: "no-store",
      });

      const result = await readResponse<Offer[]>(response);

      setOffers(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load offers."
      );
    } finally {
      setLoading(false);
    }
  }, [getToken, requestHeaders]);

  useEffect(() => {
    void loadOffers();
  }, [loadOffers]);

  function updateField<K extends keyof OfferForm>(
    key: K,
    value: OfferForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setNotice("");
  }

  function startEdit(offer: Offer) {
    setForm(toForm(offer));
    setEditingId(offer._id);
    setError("");
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setNotice("");

    const features = form.features
      .split("\n")
      .map((feature) => feature.trim())
      .filter(Boolean);

    const priority = Number(form.priority);

    if (features.length > 8) {
      setError("You can add a maximum of 8 features.");
      return;
    }

    if (
      !Number.isInteger(priority) ||
      priority < 0 ||
      priority > 9999
    ) {
      setError("Priority must be an integer between 0 and 9999.");
      return;
    }

    const buttonLink = form.buttonLink.trim();

    if (
      !buttonLink.startsWith("/") ||
      buttonLink.startsWith("//")
    ) {
      try {
        const parsed = new URL(buttonLink);

        if (parsed.protocol !== "https:") {
          throw new Error("Invalid protocol");
        }
      } catch {
        setError(
          "Button destination must be a local path, such as /contact, or a valid HTTPS URL."
        );
        return;
      }
    }

    const payload = {
      title: form.title.trim(),
      highlight: form.highlight.trim(),
      description: form.description.trim(),
      eyebrow: form.eyebrow.trim(),
      features,
      buttonText: form.buttonText.trim(),
      buttonLink,
      footnote: form.footnote.trim(),
      active: form.active,
      priority,
    };

    setSaving(true);

    try {
      if (!getToken()) {
        throw new Error("Please sign in as an administrator.");
      }

      const isEditing = Boolean(editingId);

      const response = await fetch(
        isEditing
          ? `${API_URL}/api/offers/${editingId}`
          : `${API_URL}/api/offers`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: requestHeaders(),
          body: JSON.stringify(payload),
        }
      );

      await readResponse<Offer>(response);

      setNotice(
        isEditing
          ? "Offer updated successfully."
          : "Offer created successfully."
      );

      setForm(emptyForm);
      setEditingId(null);

      await loadOffers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save offer."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(offer: Offer) {
    if (actionId) return;

    setError("");
    setNotice("");
    setActionId(offer._id);

    try {
      const response = await fetch(
        `${API_URL}/api/offers/${offer._id}`,
        {
          method: "PUT",
          headers: requestHeaders(),
          body: JSON.stringify({
            active: !offer.active,
          }),
        }
      );

      await readResponse<Offer>(response);

      setNotice(
        offer.active
          ? "Offer deactivated."
          : "Offer published successfully."
      );

      await loadOffers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update offer status."
      );
    } finally {
      setActionId(null);
    }
  }

  async function deleteOffer(offer: Offer) {
    if (actionId) return;

    const confirmed = window.confirm(
      `Delete "${offer.title}" permanently? This cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");
    setActionId(offer._id);

    try {
      const response = await fetch(
        `${API_URL}/api/offers/${offer._id}`,
        {
          method: "DELETE",
          headers: requestHeaders(),
        }
      );

      await readResponse<{ id: string }>(response);

      if (editingId === offer._id) {
        setForm(emptyForm);
        setEditingId(null);
      }

      setNotice("Offer deleted successfully.");

      await loadOffers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete offer."
      );
    } finally {
      setActionId(null);
    }
  }

  const query = search.trim().toLowerCase();

  const filteredOffers = offers.filter((offer) =>
    [
      offer.title,
      offer.description,
      offer.eyebrow ?? "",
      offer.highlight ?? "",
    ].some((value) => value.toLowerCase().includes(query))
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              SHINEWEB TECH CREATIONS
            </span>

            <h1>Offer management</h1>

            <p>
              Create, edit, publish and organise homepage offers.
            </p>
          </div>

          <Link href="/" className={styles.backLink}>
            View website ↗
          </Link>
        </header>

        {error && (
          <div className={styles.error} role="alert">
            <span>{error}</span>
            <button type="button" onClick={() => setError("")}>
              Dismiss
            </button>
          </div>
        )}

        {notice && (
          <div className={styles.success} role="status">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice("")}>
              Dismiss
            </button>
          </div>
        )}

        <section className={styles.editor}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>
                {editingId ? "EDIT OFFER" : "NEW OFFER"}
              </span>

              <h2>
                {editingId ? "Update offer" : "Create an offer"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={resetForm}
              >
                Cancel editing
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>Title *</span>
                <input
                  required
                  maxLength={100}
                  value={form.title}
                  onChange={(event) =>
                    updateField("title", event.target.value)
                  }
                  placeholder="Better technology."
                />
              </label>

              <label className={styles.field}>
                <span>Highlighted text</span>
                <input
                  maxLength={100}
                  value={form.highlight}
                  onChange={(event) =>
                    updateField("highlight", event.target.value)
                  }
                  placeholder="Smarter business."
                />
              </label>

              <label className={styles.field}>
                <span>Eyebrow / label</span>
                <input
                  maxLength={80}
                  value={form.eyebrow}
                  onChange={(event) =>
                    updateField("eyebrow", event.target.value)
                  }
                  placeholder="BUSINESS SOLUTIONS"
                />
              </label>

              <label className={styles.field}>
                <span>Button text</span>
                <input
                  maxLength={60}
                  value={form.buttonText}
                  onChange={(event) =>
                    updateField("buttonText", event.target.value)
                  }
                  placeholder="Request a quotation"
                />
              </label>

              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Description *</span>
                <textarea
                  required
                  maxLength={1000}
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Describe this offer..."
                />
              </label>

              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Features (one per line, maximum 8)</span>
                <textarea
                  rows={4}
                  value={form.features}
                  onChange={(event) =>
                    updateField("features", event.target.value)
                  }
                  placeholder={
                    "Hardware procurement\nSoftware licensing\nIT infrastructure"
                  }
                />
              </label>

              <label className={styles.field}>
                <span>Button destination</span>
                <input
                  required
                  maxLength={300}
                  value={form.buttonLink}
                  onChange={(event) =>
                    updateField("buttonLink", event.target.value)
                  }
                  placeholder="/contact"
                />
                <small>
                  Use a local path or an HTTPS URL.
                </small>
              </label>

              <label className={styles.field}>
                <span>Display priority</span>
                <input
                  type="number"
                  min={0}
                  max={9999}
                  step={1}
                  value={form.priority}
                  onChange={(event) =>
                    updateField(
                      "priority",
                      event.target.value === ""
                        ? 0
                        : Number(event.target.value)
                    )
                  }
                />
                <small>Higher priority appears first.</small>
              </label>

              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Footnote</span>
                <input
                  maxLength={200}
                  value={form.footnote}
                  onChange={(event) =>
                    updateField("footnote", event.target.value)
                  }
                  placeholder="Bulk orders and project requirements welcome."
                />
              </label>
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) =>
                  updateField("active", event.target.checked)
                }
              />

              <span>
                <strong>Publish this offer</strong>
                <small>
                  Active offers can appear on the public homepage.
                </small>
              </span>
            </label>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={saving || Boolean(actionId)}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save changes"
                    : "Create offer"}
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={resetForm}
                disabled={saving}
              >
                Clear form
              </button>
            </div>
          </form>
        </section>

        <section className={styles.listSection}>
          <div className={styles.listHeading}>
            <div>
              <span className={styles.sectionLabel}>YOUR CONTENT</span>
              <h2>
                All offers <span>({offers.length})</span>
              </h2>
            </div>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => void loadOffers()}
              disabled={loading || saving || Boolean(actionId)}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search offers..."
            />
          </label>

          {loading ? (
            <div className={styles.emptyState}>
              Loading offers...
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className={styles.emptyState}>
              {offers.length === 0
                ? "No offers yet. Create your first offer above."
                : "No offers match your search."}
            </div>
          ) : (
            <div className={styles.offerList}>
              {filteredOffers.map((offer) => (
                <article key={offer._id} className={styles.offerItem}>
                  <div className={styles.offerItemMain}>
                    <div className={styles.offerItemTop}>
                      <span className={styles.offerEyebrow}>
                        {offer.eyebrow || "BUSINESS SOLUTIONS"}
                      </span>

                      <span
                        className={`${styles.status} ${
                          offer.active
                            ? styles.statusActive
                            : styles.statusInactive
                        }`}
                      >
                        {offer.active ? "Published" : "Inactive"}
                      </span>
                    </div>

                    <h3>
                      {offer.title}{" "}
                      {offer.highlight && (
                        <span>{offer.highlight}</span>
                      )}
                    </h3>

                    <p>{offer.description}</p>

                    {offer.features?.length > 0 && (
                      <div className={styles.featureList}>
                        {offer.features.map((feature, index) => (
                          <span key={`${feature}-${index}`}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <small className={styles.priority}>
                      Priority: {offer.priority}
                    </small>
                  </div>

                  <div className={styles.itemActions}>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => startEdit(offer)}
                      disabled={saving || Boolean(actionId)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => void toggleActive(offer)}
                      disabled={saving || Boolean(actionId)}
                    >
                      {actionId === offer._id
                        ? "Working..."
                        : offer.active
                          ? "Deactivate"
                          : "Publish"}
                    </button>

                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => void deleteOffer(offer)}
                      disabled={saving || Boolean(actionId)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}