"use client";

import { useEffect, useState } from "react";
import HexGrid from "./HexGrid";

/**
 * The atlas is highly interactive but does not need to participate in the
 * server-rendered shell. Keeping the first server/client render identical avoids
 * hydration drift while preserving the existing hover experience after mount.
 */
export default function HydrationSafeHexGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full" aria-hidden="true">
        <div className="hidden h-[704px] lg:block" />
        <div className="grid gap-2.5 pb-8 sm:grid-cols-2 lg:hidden">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-[118px] border border-white/[0.04] bg-white/[0.01]"
            />
          ))}
        </div>
      </div>
    );
  }

  return <HexGrid />;
}
