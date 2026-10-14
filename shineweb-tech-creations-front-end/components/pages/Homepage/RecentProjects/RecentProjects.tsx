
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./RecentProjects.module.css";

type ProjectCategory =
  | "Web Development"
  | "Business Software"
  | "IT Infrastructure";

type ProjectVisualType =
  | "hospital"
  | "bakery"
  | "commerce"
  | "network";

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  image?: string;
  tags: string[];
  visual: ProjectVisualType;
  number: string;
  href: string;
  liveUrl?: string;
  featured: boolean;
  sortOrder: number;
}

interface ProjectResponse {
  success: boolean;
  count: number;
  data: Project[];
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

const FILTERS = [
  "All Projects",
  "Web Development",
  "Business Software",
  "IT Infrastructure",
] as const;

type Filter = (typeof FILTERS)[number];

/* =========================================
   PROJECT VISUAL
   CSS-generated preview when no image exists
========================================= */

function ProjectVisual({
  type,
}: {
  type: ProjectVisualType;
}) {
  return (
    <div
      className={`${styles.visual} ${styles[`visual_${type}`]}`}
      aria-hidden="true"
    >
      <div className={styles.visualGlow} />

      {type === "hospital" && (
        <div className={styles.browser}>
          <div className={styles.browserBar}>
            <span />
            <span />
            <span />
            <div className={styles.browserAddress}>
              healthcare.example
            </div>
          </div>

          <div className={styles.hospitalPage}>
            <div className={styles.mockNav}>
              <span className={styles.medicalLogo}>+</span>
              <span />
              <span />
              <span />
            </div>

            <div className={styles.hospitalHero}>
              <div className={styles.hospitalCopy}>
                <span className={styles.mockEyebrow}>
                  YOUR HEALTH MATTERS
                </span>

                <div className={styles.mockHeading}>
                  Care that puts
                  <br />
                  you first.
                </div>

                <div className={styles.mockLine} />

                <div className={styles.mockButton}>
                  Book Appointment ↗
                </div>
              </div>

              <div className={styles.doctorShape}>
                <div className={styles.doctorHead} />
                <div className={styles.doctorBody} />
                <div className={styles.doctorCoat} />
              </div>
            </div>

            <div className={styles.hospitalStats}>
              <span>Expert Doctors</span>
              <span>Quality Care</span>
              <span>Easy Booking</span>
            </div>
          </div>
        </div>
      )}

      {type === "bakery" && (
        <div className={styles.bakeryPage}>
          <div className={styles.bakeryNav}>
            <span>the daily bake.</span>
            <span>MENU &nbsp; ☰</span>
          </div>

          <div className={styles.bakeryHero}>
            <span className={styles.bakeryEyebrow}>
              FRESH FROM OUR OVEN
            </span>

            <div className={styles.bakeryTitle}>
              Made with
              <br />
              a little love.
            </div>

            <div className={styles.bakeryBread}>
              <div className={styles.breadTop} />
              <div className={styles.breadBottom} />
              <div className={styles.breadMark}>✳</div>
            </div>

            <div className={styles.bakeryCaption}>
              BAKED FRESH. EVERY DAY.
            </div>
          </div>

          <div className={styles.bakeryProducts}>
            <span>OUR FAVOURITES</span>

            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      )}

      {type === "commerce" && (
        <div className={styles.commercePage}>
          <div className={styles.commerceNav}>
            <span>
              commerce
              <span className={styles.commerceDot}>.</span>
            </span>

            <span>Search products...　⌕</span>
            <span>♧</span>
          </div>

          <div className={styles.commerceBanner}>
            <div>
              <span className={styles.commerceEyebrow}>
                SMARTER SHOPPING
              </span>

              <div className={styles.commerceTitle}>
                Your business,
                <br />
                beautifully
                <br />
                connected.
              </div>

              <span className={styles.commerceLink}>
                EXPLORE COLLECTION ↗
              </span>
            </div>

            <div className={styles.productObject}>
              <div className={styles.productBox}>
                <span>STC</span>
              </div>

              <div className={styles.productDisc} />
            </div>
          </div>

          <div className={styles.commerceBottom}>
            <span>CURATED FOR YOU</span>
            <span>01 — 04</span>
          </div>
        </div>
      )}

      {type === "network" && (
        <div className={styles.networkPage}>
          <div className={styles.networkTop}>
            <span>
              <i /> INFRASTRUCTURE MONITOR
            </span>
            <span>LIVE PREVIEW</span>
          </div>

          <div className={styles.networkHeading}>
            Secure. Connected.
            <br />
            <span>Always ready.</span>
          </div>

          <div className={styles.networkDiagram}>
            <div className={styles.networkNode}>
              <span>◎</span>
              <small>INTERNET</small>
            </div>

            <div className={styles.networkConnector} />

            <div className={styles.firewallNode}>
              <span>⬡</span>
              <small>FIREWALL</small>
            </div>

            <div className={styles.networkConnector} />

            <div className={styles.networkSwitch}>
              <span>▦</span>
              <small>CORE SWITCH</small>
            </div>

            <div className={styles.networkBranches}>
              <i />
              <i />
              <i />
            </div>

            <div className={styles.networkDevices}>
              <span>WORKSTATIONS</span>
              <span>SERVER</span>
              <span>WIFI</span>
            </div>
          </div>

          <div className={styles.networkFooter}>
            <span>
              <i /> NETWORK TOPOLOGY PREVIEW
            </span>
            <span>ENTERPRISE / 01</span>
          </div>
        </div>
      )}

      <span className={styles.visualIndex}>
        {type.toUpperCase()}
      </span>

      <span className={styles.visualOrbit} />
    </div>
  );
}

/* =========================================
   PROJECT IMAGE
========================================= */

function ProjectImage({
  project,
}: {
  project: Project;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [project.image]);

  if (!project.image || imageFailed) {
    return (
      <ProjectVisual type={project.visual || "commerce"} />
    );
  }

  return (
    <div className={styles.projectImageWrap}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={project.title}
        className={styles.projectImage}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}

/* =========================================
   LOADING CARD
========================================= */

function ProjectSkeleton() {
  return (
    <div className={styles.projectCard} aria-hidden="true">
      <div className={styles.projectSkeleton} />

      <div className={styles.projectInfo}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
      </div>
    </div>
  );
}

/* =========================================
   MAIN RECENT PROJECTS COMPONENT
========================================= */

export default function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] =
    useState<Filter>("All Projects");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [retryCount, setRetryCount] = useState(0);

  /* Fetch projects from Express + MongoDB */

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProjects() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/api/projects`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load projects. HTTP ${response.status}`
          );
        }

        const result: ProjectResponse =
          await response.json();

        if (
          result.success !== true ||
          !Array.isArray(result.data)
        ) {
          throw new Error(
            "Invalid response received from the projects API."
          );
        }

        setProjects(result.data);
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load projects."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchProjects();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  /* Filter projects */

  const filteredProjects =
    activeFilter === "All Projects"
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter
        );

  /* Resolve project URL */

  function getProjectHref(project: Project): string {
    return project.href || `/api/projects/${project.slug}`;
  }

  return (
    <section
      className={styles.section}
      id="projects"
    >
      <div className={styles.container}>
        {/* Section heading */}

        <div className={styles.topLine}>
          <span className={styles.sectionEyebrow}>
            <span className={styles.eyebrowDot} />
            SELECTED WORK
          </span>

          <span className={styles.sectionMeta}>
            DESIGN · DEVELOPMENT · IT
          </span>
        </div>

        <div className={styles.sectionHeader}>
          <div className={styles.headingBlock}>
            <h2 className={styles.heading}>
              Recent projects.
              <br />
              <span>Real-world thinking.</span>
            </h2>

            <p className={styles.sectionDescription}>
              Discover our digital experiences, business
              software and IT infrastructure solutions,
              designed to help businesses move forward.
            </p>
          </div>

          <Link
            href="/projects"
            className={styles.allProjectsLink}
          >
            Explore all projects
            <span>↗</span>
          </Link>
        </div>

        {/* Category filters */}

        <div
          className={styles.filters}
          aria-label="Filter projects by category"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`${styles.filterButton} ${
                activeFilter === filter
                  ? styles.filterActive
                  : ""
              }`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}

              {activeFilter === filter && (
                <span className={styles.filterDot} />
              )}
            </button>
          ))}
        </div>

        {/* Loading state */}

        {loading && (
          <div
            className={styles.projectGrid}
            aria-busy="true"
            aria-label="Loading projects"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error state */}

        {!loading && error && (
          <div
            className={styles.projectMessage}
            role="alert"
          >
            <h3>Projects could not be loaded</h3>

            <p>{error}</p>

            <button
              type="button"
              className={styles.retryButton}
              onClick={() => setRetryCount((count) => count + 1)}
            >
              Try again
            </button>
          </div>
        )}

        {/* No published projects */}

        {!loading && !error && projects.length === 0 && (
          <div className={styles.projectMessage}>
            <h3>Our portfolio is coming soon.</h3>

            <p>
              Published projects will appear here when
              they are available.
            </p>
          </div>
        )}

        {/* No matching category */}

        {!loading &&
          !error &&
          projects.length > 0 &&
          filteredProjects.length === 0 && (
            <div className={styles.projectMessage}>
              <h3>No projects in this category yet.</h3>

              <p>
                Select another category to explore our work.
              </p>
            </div>
          )}

        {/* Projects from backend */}

        {!loading &&
          !error &&
          filteredProjects.length > 0 && (
            <div
              className={styles.projectGrid}
              aria-live="polite"
            >
              {filteredProjects.map((project) => (
                <article
                  className={styles.projectCard}
                  key={project._id}
                >
                  {/* Project preview */}

                  <Link
                    href={getProjectHref(project)}
                    className={styles.projectVisualLink}
                    aria-label={`View ${project.title}`}
                  >
                    <ProjectImage project={project} />

                    <span className={styles.projectOpen}>
                      <span>↗</span>
                    </span>
                  </Link>

                  {/* Project information */}

                  <div className={styles.projectInfo}>
                    <div className={styles.projectMeta}>
                      <span className={styles.projectCategory}>
                        {project.categoryLabel ||
                          project.category}
                      </span>

                      <span className={styles.projectNumber}>
                        {project.number}
                      </span>
                    </div>

                    <h3 className={styles.projectTitle}>
                      {project.title}
                    </h3>

                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>

                    {/* Technology tags */}

                    {project.tags?.length > 0 && (
                      <div className={styles.projectTags}>
                        {project.tags.map((tag) => (
                          <span
                            className={styles.projectTag}
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Project details link */}

                    <Link
                      href={getProjectHref(project)}
                      className={styles.projectLink}
                    >
                      Explore project
                      <span>↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        {/* Contact CTA */}

        <div className={styles.bottomCta}>
          <div className={styles.ctaOrb} />

          <div className={styles.ctaContent}>
            <span className={styles.ctaEyebrow}>
              HAVE A PROJECT IN MIND?
            </span>

            <h3>
              Let&apos;s build something
              <br />
              <span>that moves you forward.</span>
            </h3>

            <p>
              From websites to complete business IT
              solutions, let&apos;s create something valuable
              for your business.
            </p>
          </div>

          <Link
            href="/contact"
            className={styles.ctaButton}
          >
            Start a conversation
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
