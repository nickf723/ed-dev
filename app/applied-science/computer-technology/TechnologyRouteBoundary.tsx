"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const TECHNOLOGY_ROOT = "/applied-science/computer-technology";

export default function TechnologyRouteBoundary({ hub, children }: { hub: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  return pathname === TECHNOLOGY_ROOT ? hub : children;
}
