// components/GlossaryTerm.tsx
import React from "react";

type GlossaryTermProps = {
  children: React.ReactNode;
  definition: string;
};

/**
 * Renders an inline term with a hover-to-show definition tooltip.
 */
export default function GlossaryTerm({ children, definition }: GlossaryTermProps) {
  return (
    <span
      className="term-highlight"
      data-tooltip={definition}
    >
      {children}
    </span>
  );
}