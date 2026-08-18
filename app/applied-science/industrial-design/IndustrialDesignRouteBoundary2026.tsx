"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const INDUSTRIAL_DESIGN_ROOT = "/applied-science/industrial-design";

export default function IndustrialDesignRouteBoundary2026({ hub, children }: { hub: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  return pathname === INDUSTRIAL_DESIGN_ROOT ? hub : children;
}
