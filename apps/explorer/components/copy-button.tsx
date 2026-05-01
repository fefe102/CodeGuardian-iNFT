"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className={`rounded-md border border-white/15 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:border-emerald-300/60 ${className}`}
      onClick={copyValue}
      aria-label={`${label} value`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
