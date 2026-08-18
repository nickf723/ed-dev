import type { ReactNode } from "react";
import IndustrialDesignHub2026 from "./IndustrialDesignHub2026";
import IndustrialDesignRouteBoundary2026 from "./IndustrialDesignRouteBoundary2026";

export default function IndustrialDesignLayout({ children }: { children: ReactNode }) {
  return <IndustrialDesignRouteBoundary2026 hub={<IndustrialDesignHub2026 />}>{children}</IndustrialDesignRouteBoundary2026>;
}
