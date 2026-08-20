import type {
  CollectionResultState,
  CollectionSource,
  ProviderCollectionSearchPayload,
} from "./schema";

export function createCollectionSearchPayload<T>(options: {
  query: string;
  records: readonly T[];
  source: string;
  state: CollectionResultState;
  sources: readonly CollectionSource[];
  total?: number;
  pageSize?: number;
  retrievedAt?: string;
  staleAfter?: string;
  version?: string;
  note?: string;
  error?: string;
}): ProviderCollectionSearchPayload<T>;
