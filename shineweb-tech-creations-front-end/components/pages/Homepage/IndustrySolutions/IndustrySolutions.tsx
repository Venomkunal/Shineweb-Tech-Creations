
import Link from "next/link";
import styles from "./IndustrySolutions.module.css";
import type { CSSProperties } from "react";

interface Industry {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  number: string;
  href: string;
  sortOrder: number;
}

interface IndustryResponse {
  success: boolean;
  count: number;
  data: Industry[];
}

async function getIndustries(): Promise<Industry[]> {
  const apiUrl =
    process.env.BACKEND_API_URL ??
    "http://localhost:5000/api";

  try {
    const response = await fetch(
      `${apiUrl}/industries`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error(
        "Industry API returned:",
        response.status
      );
      return [];
    }

    const result =
      (await response.json()) as IndustryResponse;

    if (!result.success || !Array.isArray(result.data)) {
      return [];
    }

    return result.data;
  } catch (error) {
    console.error("Unable to fetch industries:", error);
    return [];
  }
}

export default async function IndustrySolutions() {
  const allIndustries = await getIndustries();

const shuffled = [...allIndustries];

for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}

const industries = shuffled.slice(0, 5);

  return (
    <section
      className={styles.section}
      id="industry-solutions"
      aria-labelledby="industry-heading"
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>
              INDUSTRY SOLUTIONS
            </span>

            <h2
              id="industry-heading"
              className={styles.heading}
            >
              Tailored IT Solutions
              <span> for Every Industry</span>
            </h2>

            <p className={styles.description}>
              We deliver reliable IT infrastructure,
              software, security and support solutions
              tailored to your industry.
            </p>

            <Link
              href="/industries"
              className={styles.exploreButton}
            >
              Explore Industries
              <span aria-hidden="true">↗</span>
            </Link>

            <div className={styles.introFooter}>
              <span className={styles.footerLine} />
              <span>
                Technology built around your business
              </span>
            </div>
          </div>

          <div className={styles.cards}>
            {industries.map((industry) => (
              <Link
                href={
                  industry.href ||
                  `/industries/${industry.slug}`
                }
                className={styles.card}
                key={industry._id}
                aria-label={`Explore ${industry.title} solutions`}
                style={
                  {
                    "--industry-image": `url("${industry.image}")`,
                  } as CSSProperties
                }
              >
                <div className={styles.cardImage} />

                {/* <span className={styles.cardNumber}>
                  {industry.number}
                </span> */}

                <span
                  className={styles.cardArrow}
                  aria-hidden="true"
                >
                  ↗
                </span>

                <div className={styles.cardContent}>
                  <span className={styles.cardAccent} />

                  <h3 className={styles.cardTitle}>
                    {industry.title}
                  </h3>

                  <p className={styles.cardDescription}>
                    {industry.description}
                  </p>

                  <span className={styles.cardLink}>
                    Explore solutions
                    <span aria-hidden="true"> →</span>
                  </span>
                </div>
              </Link>
            ))}

            {industries.length === 0 && (
              <div className={styles.emptyState}>
                <p>
                  Industry solutions are temporarily
                  unavailable.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
