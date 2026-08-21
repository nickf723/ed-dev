export const INFORMATION_SCIENCE_DIRECT_BRANCH_IDS = [
  "formal.information-science.information-theory",
  "formal.information-science.encoding-representation",
  "formal.information-science.information-retrieval",
  "formal.information-science.taxonomy-ontology",
  "formal.information-science.archives-preservation",
  "formal.information-science.information-behavior",
  "formal.information-science.bibliometrics",
] as const;

export const INFORMATION_SCIENCE_NESTED_BRANCH_IDS = [
  "formal.information-science.metadata-semantics",
  "formal.information-science.knowledge-graphs",
] as const;

export type RetrievalPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  rgb: string;
};

export const RETRIEVAL_RECORDS: readonly RetrievalPoint[] = [
  { id: "archive-metadata", label: "archival metadata standard", x: 23, y: 27, rgb: "251,191,36" },
  { id: "preservation", label: "digital preservation workflow", x: 30, y: 22, rgb: "251,191,36" },
  { id: "city-heat", label: "urban heat mapping", x: 31, y: 69, rgb: "94,234,212" },
  { id: "city-adaptation", label: "city climate adaptation", x: 38, y: 64, rgb: "94,234,212" },
  { id: "river-monitor", label: "river nutrient monitoring", x: 61, y: 76, rgb: "125,211,252" },
  { id: "freshwater", label: "freshwater ecology survey", x: 68, y: 70, rgb: "125,211,252" },
  { id: "compiler", label: "compiler optimization", x: 77, y: 25, rgb: "192,132,252" },
  { id: "language-design", label: "programming language design", x: 70, y: 18, rgb: "192,132,252" },
] as const;

export const RETRIEVAL_QUERIES = {
  archives: { label: "digital archives", x: 27, y: 25, rgb: "251,191,36" },
  cities: { label: "climate + cities", x: 34, y: 66, rgb: "94,234,212" },
  software: { label: "software systems", x: 73, y: 22, rgb: "192,132,252" },
  water: { label: "water ecology", x: 65, y: 73, rgb: "125,211,252" },
} as const;

export type RetrievalQueryKey = keyof typeof RETRIEVAL_QUERIES;

export function rankRetrievalRecords(
  query: Pick<RetrievalPoint, "x" | "y">,
  records: readonly RetrievalPoint[] = RETRIEVAL_RECORDS,
) {
  return records
    .map((record) => ({
      ...record,
      distance: Math.hypot(record.x - query.x, record.y - query.y),
    }))
    .sort((left, right) => left.distance - right.distance || left.id.localeCompare(right.id));
}

export function measureSymbolStream(text: string) {
  const symbols = Array.from(text);
  const counts = new Map<string, number>();
  symbols.forEach((symbol) => counts.set(symbol, (counts.get(symbol) ?? 0) + 1));
  const count = symbols.length;
  const frequencies = Array.from(counts.entries())
    .map(([symbol, symbolCount]) => ({
      symbol,
      count: symbolCount,
      probability: count > 0 ? symbolCount / count : 0,
    }))
    .sort((left, right) => right.count - left.count || left.symbol.localeCompare(right.symbol));
  const entropy = frequencies.reduce(
    (sum, item) =>
      item.probability > 0
        ? sum - item.probability * Math.log2(item.probability)
        : sum,
    0,
  );
  const unique = frequencies.length;
  const maxEntropy = unique > 1 ? Math.log2(unique) : 0;
  const utf8Bits = new TextEncoder().encode(text).length * 8;

  return {
    count,
    unique,
    entropy,
    maxEntropy,
    utf8Bits,
    empiricalBits: entropy * count,
    frequencies,
  };
}

export const INFORMATION_SCIENCE_EVIDENCE_CASES = [
  {
    id: "entropy",
    label: "Separate uncertainty from meaning",
    eyebrow: "Review file 01 · measurement",
    observation:
      "Two eight-symbol samples use the same two symbols equally often, but one spells a meaningful code word to its intended readers and the other does not.",
    prompt: "What does the single-symbol entropy model establish?",
    options: [
      {
        id: "same-frequency-entropy",
        label:
          "They have the same empirical single-symbol entropy; that does not establish equal meaning, usefulness, or sequence structure.",
      },
      {
        id: "same-meaning",
        label: "Equal symbol frequencies prove that the samples mean the same thing.",
      },
      {
        id: "actual-file-size",
        label: "The entropy value is automatically the exact stored file size.",
      },
    ],
    correctOptionId: "same-frequency-entropy",
    success:
      "Correct. The model measures uncertainty in the observed frequency distribution. Meaning and realized compression require additional context and models.",
    correction:
      "Keep the claim inside the model boundary: equal frequency distributions imply equal single-symbol empirical entropy, not equal semantics or exact file size.",
  },
  {
    id: "hierarchy",
    label: "File the field honestly",
    eyebrow: "Review file 02 · ontology",
    observation:
      "A lesson specifies creator, date, format, rights, provenance, and relationships that travel with a digital object.",
    prompt: "Where does this lesson belong in the current curriculum tree?",
    options: [
      {
        id: "metadata-under-representation",
        label:
          "Metadata & Semantics, nested under Encoding & Representation because the record carries contextual descriptions of a representation.",
      },
      {
        id: "bibliometrics",
        label: "Bibliometrics, because every field in a record is a citation count.",
      },
      {
        id: "information-theory",
        label: "Information Theory, because authorship and rights are measured in bits.",
      },
    ],
    correctOptionId: "metadata-under-representation",
    success:
      "Yes. Metadata has its own specialized questions, but its containing branch here is the representation of information objects and their context.",
    correction:
      "The evidence concerns descriptive and administrative context attached to a representation. That points to Metadata & Semantics inside Encoding & Representation.",
  },
  {
    id: "retrieval",
    label: "Audit the ranking claim",
    eyebrow: "Review file 03 · retrieval",
    observation:
      "A toy search map places a query near three records in a two-dimensional coordinate system invented for a lesson.",
    prompt: "Which conclusion is supported?",
    options: [
      {
        id: "bounded-neighbors",
        label:
          "Those records are nearest under the stated coordinates and Euclidean distance; usefulness still depends on representation and user intent.",
      },
      {
        id: "universal-relevance",
        label: "The neighbors are universally the most relevant records for every user and task.",
      },
      {
        id: "truth-order",
        label: "The distance order proves which records are most true.",
      },
    ],
    correctOptionId: "bounded-neighbors",
    success:
      "Right. Ranking is reproducible inside the toy geometry, while relevance and value remain claims that need a task, collection, and evaluation rule.",
    correction:
      "Distance ranks points only after a representation and metric have been chosen. It does not independently prove relevance, truth, or fairness.",
  },
  {
    id: "api-provenance",
    label: "Read the collection boundary",
    eyebrow: "Review file 04 · repository",
    observation:
      "A loc.gov API query returns digitized photographs matching a keyword and facet. The response includes item summaries, identifiers, metadata, and pagination.",
    prompt: "What is the strongest description of the result set?",
    options: [
      {
        id: "query-slice",
        label:
          "It is a reproducible slice of the API's covered records under stated parameters, not every relevant object held by the Library or in existence.",
      },
      {
        id: "complete-universe",
        label: "It is a complete census of every photograph relevant to the topic everywhere.",
      },
      {
        id: "rights-guarantee",
        label: "Presence in the API guarantees identical reuse rights for every returned resource.",
      },
    ],
    correctOptionId: "query-slice",
    success:
      "Correct. Endpoint coverage, query terms, facets, cataloging practice, digitization, pagination, and rights statements all shape what the response can support.",
    correction:
      "Treat an API response as a bounded query result. Preserve the endpoint, parameters, retrieval context, identifiers, and item-level rights evidence.",
  },
] as const;

export function isInformationScienceEvidenceAnswerCorrect(
  caseId: string,
  optionId: string,
): boolean {
  const evidenceCase = INFORMATION_SCIENCE_EVIDENCE_CASES.find(
    (item) => item.id === caseId,
  );
  return evidenceCase?.correctOptionId === optionId;
}
