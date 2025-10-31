// app/math/algebra/layout.tsx
import React from "react";

export default function AlgebraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This div applies the .theme-algebra CSS variables
  // to all children pages (Variables, Expressions, etc.)
  return <div className="theme-algebra">{children}</div>;
}