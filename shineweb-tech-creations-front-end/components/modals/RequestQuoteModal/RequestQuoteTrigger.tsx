
"use client";

import { useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";

import RequestQuoteModal from "./RequestQuoteModal";
import styles from "./RequestQuoteTrigger.module.css";

export default function RequestQuoteTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.quoteButton}
        onClick={() => setOpen(true)}
      >
        <FileText size={17} />
        Request a Quote
        <ArrowUpRight size={16} />
      </button>

      <RequestQuoteModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
