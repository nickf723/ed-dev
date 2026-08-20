function normalize(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();
}

function prepareFacets(facets, selectedFacets) {
  const facetIds = new Set();

  for (const facet of facets) {
    if (facetIds.has(facet.id)) {
      throw new Error(`Duplicate collection facet: ${facet.id}`);
    }
    facetIds.add(facet.id);

    const optionIds = new Set(facet.options.map((option) => option.id));
    if (optionIds.size !== facet.options.length) {
      throw new Error(`Duplicate option in collection facet: ${facet.id}`);
    }

    const selected = selectedFacets[facet.id] ?? [];
    if (facet.selection === "single" && selected.length > 1) {
      throw new Error(`Collection facet ${facet.id} only accepts one value`);
    }
    for (const value of selected) {
      if (!optionIds.has(value)) {
        throw new Error(`Unknown value ${value} for collection facet ${facet.id}`);
      }
    }
  }

  for (const facetId of Object.keys(selectedFacets)) {
    if (!facetIds.has(facetId) && selectedFacets[facetId].length > 0) {
      throw new Error(`Unknown collection facet: ${facetId}`);
    }
  }
}

function matchesSearch(record, needle, getSearchText) {
  if (!needle) return true;
  return normalize(getSearchText(record).join(" ")).includes(needle);
}

function matchesFacet(record, facet, selected) {
  if (selected.length === 0) return true;
  const values = new Set(facet.values(record));
  return facet.operator === "all"
    ? selected.every((value) => values.has(value))
    : selected.some((value) => values.has(value));
}

function matchesFilters(record, facets, selectedFacets, excludedFacetId) {
  return facets.every((facet) => {
    if (facet.id === excludedFacetId) return true;
    return matchesFacet(record, facet, selectedFacets[facet.id] ?? []);
  });
}

/**
 * Apply text search and faceted filtering with stable ordering. Filters combine
 * with AND across facets and use each facet's declared any/all operator within
 * a facet. Counts are contextual: they retain search and other active facets,
 * but ignore the facet whose options they describe.
 */
export function queryCollection({ records, query, facets, getSearchText }) {
  prepareFacets(facets, query.facets);
  const needle = normalize(query.text);
  const searchMatches = records.filter((record) =>
    matchesSearch(record, needle, getSearchText),
  );
  const matchedRecords = searchMatches.filter((record) =>
    matchesFilters(record, facets, query.facets),
  );

  const facetCounts = Object.fromEntries(
    facets.map((facet) => {
      const contextualRecords = searchMatches.filter((record) =>
        matchesFilters(record, facets, query.facets, facet.id),
      );
      const counts = Object.fromEntries(
        facet.options.map((option) => [
          option.id,
          contextualRecords.filter((record) =>
            facet.values(record).includes(option.id),
          ).length,
        ]),
      );
      return [facet.id, counts];
    }),
  );

  return {
    records: matchedRecords,
    total: records.length,
    matched: matchedRecords.length,
    activeFilterCount:
      (needle ? 1 : 0) +
      Object.values(query.facets).reduce(
        (count, values) => count + values.length,
        0,
      ),
    facetCounts,
  };
}
