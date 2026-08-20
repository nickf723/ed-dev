export type CollectionSource = {
  label: string;
  url?: string;
  kind?: "primary" | "reference" | "provider" | "curated";
  scope?: string;
};

export type CollectionResultState =
  | "live"
  | "cached"
  | "curated"
  | "fallback"
  | "partial"
  | "stale"
  | "rate-limited"
  | "failed";

export type CollectionProvenance = {
  state: CollectionResultState;
  sources: readonly CollectionSource[];
  retrievedAt?: string;
  reviewedAt?: string;
  staleAfter?: string;
  version?: string;
  note?: string;
};

export type CollectionFacetOption = {
  id: string;
  label: string;
};

export type CollectionFacetDefinition<T> = {
  id: string;
  label: string;
  selection: "single" | "multiple";
  operator?: "any" | "all";
  options: readonly CollectionFacetOption[];
  values(record: T): readonly string[];
};

export type CollectionQueryState = {
  text: string;
  facets: Readonly<Record<string, readonly string[]>>;
};

export type CollectionPagination = {
  total: number;
  returned: number;
  pageSize?: number;
  nextCursor?: string;
};

export type CollectionResult<T> = {
  query: CollectionQueryState;
  records: readonly T[];
  provenance: CollectionProvenance;
  pagination: CollectionPagination;
  error?: string;
};

export type CollectionMediaRecord = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  year?: string;
  primaryCreator?: string;
  tags: string[];
  facts: Record<string, string | number | undefined>;
  sources: CollectionSource[];
};

export type CollectionSearchPayload<T = CollectionMediaRecord> = {
  query: string;
  records: T[];
  source: string;
  error?: string;
  provenance?: CollectionProvenance;
  pagination?: CollectionPagination;
};

export type ProviderCollectionSearchPayload<T = CollectionMediaRecord> =
  CollectionSearchPayload<T> & {
    provenance: CollectionProvenance;
    pagination: CollectionPagination;
  };

/**
 * Shared contract for API-backed collection pages. Server adapters can fetch
 * from completely different providers while the Studio/page system receives a
 * predictable set of searchable media records.
 */
export type CollectionSourceAdapter<
  T extends CollectionMediaRecord = CollectionMediaRecord,
> = {
  id: string;
  label: string;
  search(query: string): Promise<T[]>;
};
