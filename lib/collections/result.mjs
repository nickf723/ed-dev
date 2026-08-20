const RESULT_STATES = new Set([
  "live",
  "cached",
  "curated",
  "fallback",
  "partial",
  "stale",
  "rate-limited",
  "failed",
]);

/**
 * Build the serializable envelope shared by provider-backed collection route
 * handlers. Keeping counts and provenance beside the records prevents clients
 * from guessing whether an empty array is a valid result or an upstream error.
 */
export function createCollectionSearchPayload({
  query,
  records,
  source,
  state,
  sources,
  total = records.length,
  pageSize,
  retrievedAt,
  staleAfter,
  version,
  note,
  error,
}) {
  if (!RESULT_STATES.has(state)) {
    throw new Error(`Unknown collection result state: ${state}`);
  }
  if (!Number.isInteger(total) || total < records.length) {
    throw new Error("Collection total must be an integer at least as large as the returned record count");
  }
  if (pageSize !== undefined && (!Number.isInteger(pageSize) || pageSize < 1)) {
    throw new Error("Collection page size must be a positive integer");
  }
  if (!Array.isArray(sources) || sources.length === 0) {
    throw new Error("Collection provenance requires at least one named source");
  }

  return {
    query,
    records,
    source,
    ...(error ? { error } : {}),
    provenance: {
      state,
      sources,
      ...(retrievedAt ? { retrievedAt } : {}),
      ...(staleAfter ? { staleAfter } : {}),
      ...(version ? { version } : {}),
      ...(note ? { note } : {}),
    },
    pagination: {
      total,
      returned: records.length,
      ...(pageSize ? { pageSize } : {}),
    },
  };
}
