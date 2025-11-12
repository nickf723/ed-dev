// components/GlossaryTerm.tsx
"use client";
import React from "react";
import { glossaryTerms, GlossaryTermKey } from "@/lib/glossary-db";

type GlossaryTermProps = {
  term: GlossaryTermKey;
  children: React.ReactNode;
};

/**
 * Renders an inline term with a hover-to-show definition tooltip.
 * The term prop must be a valid key from lib/glossary-db.ts
 */
export default function GlossaryTerm({ term, children }: GlossaryTermProps) {
  // REWORKED: Pull the item object, not just the definition string
  const item = glossaryTerms[term];

  if (!item) {
    console.warn(`Glossary term "${term}" not found.`);
    return <>{children}</>;
  }

  return (
    <span
      className="term-highlight"
      // REWORKED: Read from item.definition
      data-tooltip={item.definition}
      aria-label={`Definition: ${item.definition}`} // for accessibility
    >
      {children}
    </span>
  );
}