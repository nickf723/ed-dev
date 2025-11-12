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
  const definition = glossaryTerms[term];

  if (!definition) {
    console.warn(`Glossary term "${term}" not found.`);
    return <>{children}</>;
  }

  return (
    <span
      className="term-highlight"
      data-tooltip={definition}
      aria-label={`Definition: ${definition}`} // for accessibility
    >
      {children}
    </span>
  );
}