
"use client";

import type { CSSProperties } from "react";
import styles from "./FeaturedProducts.module.css";

interface ProductSkeletonProps {
  index: number;
}

export default function ProductSkeleton({
  index,
}: ProductSkeletonProps) {
  return (
    <article
      className={`${styles.productCard} ${styles.skeletonCard}`}
      style={
        { "--card-index": index } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className={styles.imageArea}>
        <div
          className={`${styles.skeleton} ${styles.skeletonImage}`}
        />
      </div>

      <div className={styles.productInfo}>
        <div
          className={`${styles.skeleton} ${styles.skeletonCategory}`}
        />

        <div
          className={`${styles.skeleton} ${styles.skeletonTitle}`}
        />

        <div
          className={`${styles.skeleton} ${styles.skeletonDescription}`}
        />

        <div
          className={`${styles.skeleton} ${styles.skeletonDescriptionShort}`}
        />

        <div className={styles.skeletonPriceRow}>
          <div className={styles.skeletonPriceGroup}>
            <div
              className={`${styles.skeleton} ${styles.skeletonPrice}`}
            />
            <div
              className={`${styles.skeleton} ${styles.skeletonOldPrice}`}
            />
          </div>

          <div
            className={`${styles.skeleton} ${styles.skeletonCart}`}
          />
        </div>
      </div>
    </article>
  );
}
