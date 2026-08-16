export type CollectionSource = {
  label: string;
  url?: string;
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

export type CollectionSearchPayload<T extends CollectionMediaRecord = CollectionMediaRecord> = {
  query: string;
  records: T[];
  source: string;
  error?: string;
};

/**
 * Shared contract for API-backed collection pages. Server adapters can fetch
 * from completely different providers while the Studio/page system receives a
 * predictable set of searchable media records.
 */
export type CollectionSourceAdapter<T extends CollectionMediaRecord = CollectionMediaRecord> = {
  id: string;
  label: string;
  search(query: string): Promise<T[]>;
};
