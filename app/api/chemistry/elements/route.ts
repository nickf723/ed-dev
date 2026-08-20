import { NextResponse } from "next/server";
import { ELEMENTS } from "@/app/natural-science/chemistry/_components/chemistry-data";
import { createCollectionSearchPayload } from "@/lib/collections/result.mjs";
import {
  IUPAC_PERIODIC_TABLE_SOURCE,
  normalizePubChemPeriodicTable,
  periodicPosition,
  PUBCHEM_PERIODIC_TABLE_SOURCE,
  type PubChemPeriodicTablePayload,
} from "@/lib/collections/providers/pubchem-elements.mjs";
import type { APIElement } from "@/app/natural-science/chemistry/_components/chemistry-api";

export const runtime = "nodejs";
const PUBCHEM_ENDPOINT =
  "https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON";
const REVALIDATE_SECONDS = 604_800;

class ProviderError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

function curatedFallback(): APIElement[] {
  return ELEMENTS.map((element) => {
    const position = periodicPosition(element.z);
    return {
      id: `element-${element.z}`,
      number: element.z,
      symbol: element.symbol,
      name: element.name,
      category: element.group.toLocaleLowerCase(),
      atomic_mass: element.mass,
      electron_configuration: element.config,
      xpos: position.x,
      ypos: position.y,
      period: position.period,
      group: position.group,
      block:
        element.z === 92
          ? "f"
          : position.group <= 2
            ? "s"
            : position.group >= 13
              ? "p"
              : "d",
      source: "curated",
    };
  });
}

export async function GET() {
  const retrievedAt = new Date().toISOString();
  try {
    const response = await fetch(PUBCHEM_ENDPOINT, {
      headers: {
        Accept: "application/json",
        "User-Agent": "EducationStation64-Chemistry/1.0",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    } as RequestInit & { next: { revalidate: number } });
    if (!response.ok) {
      throw new ProviderError(
        `PubChem returned ${response.status}`,
        response.status
      );
    }
    const records = normalizePubChemPeriodicTable(
      (await response.json()) as PubChemPeriodicTablePayload
    );
    const complete = records.length === 118;
    return NextResponse.json(
      createCollectionSearchPayload({
        query: "periodic table",
        records,
        source: "PubChem Periodic Table",
        state: complete ? "cached" : "partial",
        sources: [PUBCHEM_PERIODIC_TABLE_SOURCE, IUPAC_PERIODIC_TABLE_SOURCE],
        total: 118,
        retrievedAt,
        staleAfter: new Date(
          Date.now() + REVALIDATE_SECONDS * 1_000
        ).toISOString(),
        version: "PubChem PUG periodic table",
        note: complete
          ? "All 118 recognized elements, cached for one week. IUPAC remains the naming and atomic-weight reference."
          : `${records.length} of 118 recognized elements were returned by the provider.`,
      }),
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=604800, stale-while-revalidate=2592000",
        },
      }
    );
  } catch (error) {
    const records = curatedFallback();
    return NextResponse.json(
      createCollectionSearchPayload({
        query: "periodic table",
        records,
        source: "Reviewed local chemistry spine",
        state:
          error instanceof ProviderError && error.status === 429
            ? "rate-limited"
            : "fallback",
        sources: [
          {
            label: "Education Station reviewed element spine",
            kind: "curated",
            scope: "Common teaching elements and representative heavy elements",
          },
          IUPAC_PERIODIC_TABLE_SOURCE,
        ],
        total: 118,
        retrievedAt,
        note: `The complete provider table is unavailable; ${records.length} reviewed teaching records remain usable.`,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load the complete periodic table",
      }),
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
