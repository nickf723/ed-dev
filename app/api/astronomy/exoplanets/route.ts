import { NextRequest, NextResponse } from "next/server";
import type { ExoplanetRecord } from "@/app/natural-science/astronomy/planetary-astronomy/exoplanet-types";
import { createCollectionSearchPayload } from "@/lib/collections/result.mjs";
import type { CollectionSource } from "@/lib/collections/schema";
import {
  buildExoplanetTapUrl,
  NASA_EXOPLANET_ARCHIVE_SOURCE,
  normalizeNASAExoplanet,
  type NASAExoplanetRow,
} from "@/lib/collections/providers/nasa-exoplanets.mjs";

export const runtime = "nodejs";

const DAY = 86_400;
const PAGE_SIZE = 48;

const CURATED_EXOPLANET_SOURCE: CollectionSource = {
  label: "Education Station 64 · exoplanet waypoints",
  kind: "curated",
  scope:
    "A small reviewed set of confirmed worlds used when the NASA archive cannot be reached",
};

const CURATED_WAYPOINTS: ExoplanetRecord[] = [
  curatedRecord("51 Pegasi b", "51 Pegasi", "Radial Velocity", 1995),
  curatedRecord("Kepler-186 f", "Kepler-186", "Transit", 2014),
  curatedRecord("TRAPPIST-1 e", "TRAPPIST-1", "Transit", 2017),
  curatedRecord(
    "Proxima Centauri b",
    "Proxima Centauri",
    "Radial Velocity",
    2016
  ),
  curatedRecord("K2-18 b", "K2-18", "Transit", 2015),
  curatedRecord("TOI-700 d", "TOI-700", "Transit", 2020),
];

type CountRow = { total?: number | string | null };

class ProviderError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

async function requestArchive<T>(url: URL) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "EducationStation64-ExoplanetObservatory/1.0",
    },
    next: { revalidate: DAY },
  } as RequestInit & { next: { revalidate: number } });

  if (!response.ok) {
    throw new ProviderError(
      `NASA Exoplanet Archive returned ${response.status}`,
      response.status
    );
  }

  return (await response.json()) as T;
}

function curatedRecord(
  name: string,
  hostName: string,
  discoveryMethod: string,
  discoveryYear: number
): ExoplanetRecord {
  const sourceUrl = `https://exoplanetarchive.ipac.caltech.edu/overview/${encodeURIComponent(name)}`;
  return {
    id: name
      .toLocaleLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    name,
    hostName,
    discoveryMethod,
    discoveryYear,
    sizeClass: "Unclassified",
    sourceUrl,
    source: "curated",
    sources: [
      CURATED_EXOPLANET_SOURCE,
      {
        label: `${name} · NASA Exoplanet Archive`,
        url: sourceUrl,
        kind: "provider",
        scope: "Confirmed-planet overview and current archive parameters",
      },
    ],
  };
}

function fallbackRecords(query: string) {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return CURATED_WAYPOINTS;
  return CURATED_WAYPOINTS.filter((record) =>
    [record.name, record.hostName, record.discoveryMethod, record.discoveryYear]
      .join(" ")
      .toLocaleLowerCase()
      .includes(needle)
  );
}

function envelope(
  records: ExoplanetRecord[],
  options: {
    query: string;
    state: "cached" | "partial" | "fallback" | "rate-limited";
    total?: number;
    note: string;
    error?: string;
  }
) {
  return createCollectionSearchPayload({
    query: options.query,
    records,
    source: "NASA Exoplanet Archive",
    state: options.state,
    sources: [NASA_EXOPLANET_ARCHIVE_SOURCE, CURATED_EXOPLANET_SOURCE],
    total: Math.max(options.total ?? records.length, records.length),
    pageSize: PAGE_SIZE,
    retrievedAt: new Date().toISOString(),
    staleAfter: new Date(Date.now() + DAY * 1_000).toISOString(),
    version: "NASA Exoplanet Archive DOI 10.26133/NEA1",
    note: options.note,
    error: options.error,
  });
}

export async function GET(request: NextRequest) {
  const query =
    request.nextUrl.searchParams.get("q")?.trim().slice(0, 80) ?? "";

  try {
    const [rows, countRows] = await Promise.all([
      requestArchive<NASAExoplanetRow[]>(
        buildExoplanetTapUrl({ search: query, limit: PAGE_SIZE })
      ),
      requestArchive<CountRow[]>(
        buildExoplanetTapUrl({ search: query, count: true })
      ),
    ]);

    const records: ExoplanetRecord[] = [];
    let omitted = 0;
    for (const row of rows) {
      try {
        records.push(normalizeNASAExoplanet(row));
      } catch {
        omitted += 1;
      }
    }

    const providerTotal = Number(countRows[0]?.total);
    const total = Number.isFinite(providerTotal)
      ? Math.trunc(providerTotal)
      : records.length;
    const state = omitted ? "partial" : "cached";
    const note = omitted
      ? `${omitted} incomplete archive row${omitted === 1 ? " was" : "s were"} omitted. Composite parameters may combine values from different published references.`
      : "Composite parameters provide one convenient row per confirmed planet; values in a row may come from different published references.";

    return NextResponse.json(envelope(records, { query, state, total, note }), {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (reason) {
    const records = fallbackRecords(query);
    const rateLimited =
      reason instanceof ProviderError && reason.status === 429;
    const error =
      reason instanceof Error
        ? reason.message
        : "NASA Exoplanet Archive is temporarily unavailable";

    return NextResponse.json(
      envelope(records, {
        query,
        state: rateLimited ? "rate-limited" : "fallback",
        note: "The reviewed waypoint set is active. Numerical archive parameters are intentionally omitted until the provider is reachable.",
        error,
      }),
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
