import React from "react";

export default function MathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="theme-math">{children}</div>;
}