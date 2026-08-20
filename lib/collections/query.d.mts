import type {
  CollectionFacetDefinition,
  CollectionQueryState,
} from "./schema";

export type CollectionQueryResult<T> = {
  records: T[];
  total: number;
  matched: number;
  activeFilterCount: number;
  facetCounts: Record<string, Record<string, number>>;
};

export function queryCollection<T>(options: {
  records: readonly T[];
  query: CollectionQueryState;
  facets: readonly CollectionFacetDefinition<T>[];
  getSearchText(record: T): readonly string[];
}): CollectionQueryResult<T>;
