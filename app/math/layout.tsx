// app/math/layout.tsx
import React from "react";

export default function MathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This div applies the .theme-math CSS variables
  // to all children pages (Algebra, Geometry, etc.)
  return <div className="theme-math">{children}</div>;
}