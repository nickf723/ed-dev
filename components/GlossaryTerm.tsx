// components/GlossaryTerm.tsx
"use client";
import React from "react";
import { glossaryTerms, GlossaryTermKey } from "@/lib/glossary-db";

type GlossaryTermProps = {
  term: GlossaryTermKey;
  children: React.ReactNode;
};

export default function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const item = glossaryTerms[term];
  if (!item) {
    console.warn(`Glossary term "${term}" not found.`);
    return <>{children}</>;
  }
  return (
    <span
      className="term-highlight"
      data-tooltip={item.definition}
      aria-label={`Definition: ${item.definition}`}
    >
      {children}
    </span>
  );
}