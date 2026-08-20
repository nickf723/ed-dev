import type { ProviderCollectionSearchPayload } from "@/lib/collections/schema";

export type APIElement = {
  id: string;
  number: number;
  symbol: string;
  name: string;
  category: string;
  atomic_mass: number;
  electron_configuration: string;
  xpos: number;
  ypos: number;
  period: number;
  group: number;
  block: string;
  phase?: string;
  electronegativity?: number;
  atomicRadius?: number;
  ionizationEnergy?: number;
  electronAffinity?: number;
  oxidationStates?: string;
  meltingPoint?: number;
  boilingPoint?: number;
  density?: number;
  yearDiscovered?: string;
  colorHex?: string;
  sourceUrl?: string;
  source: "PubChem" | "curated";
};

export async function fetchPeriodicTable(signal?: AbortSignal) {
  const response = await fetch("/api/chemistry/elements", { signal });
  const payload =
    (await response.json()) as ProviderCollectionSearchPayload<APIElement>;
  if (!response.ok)
    throw new Error(payload.error || "Unable to load the periodic table.");
  return payload;
}
