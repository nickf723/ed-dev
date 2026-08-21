"use client";

import { useState } from "react";
import ElementInspector from "./ElementInspector";
import PeriodicTable from "./PeriodicTable";
import type { APIElement } from "./chemistry-api";

export default function ElementExplorer() {
  const [selectedElement, setSelectedElement] = useState<APIElement | null>(
    null
  );

  return (
    <div className="grid gap-5 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_390px] xl:p-7">
      <div className="overflow-x-auto rounded-[24px] border border-white/[0.08] bg-black/[0.22] p-4 sm:p-5">
        <PeriodicTable
          onSelect={setSelectedElement}
          activeZ={selectedElement?.number ?? 0}
        />
      </div>
      <div className="xl:sticky xl:top-[196px] xl:self-start">
        <ElementInspector element={selectedElement} />
      </div>
    </div>
  );
}
