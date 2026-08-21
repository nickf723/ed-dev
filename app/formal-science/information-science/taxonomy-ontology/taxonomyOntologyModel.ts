export const KNOWLEDGE_GRAPH_NODE_ID =
  "formal.information-science.knowledge-graphs" as const;

export const HARBOR_ROUTES_TAXONOMY = [
  "Games",
  "Board games",
  "Strategy games",
  "Network-building games",
  "Harbor Routes",
] as const;

export const HARBOR_ROUTES_TRIPLES = [
  { subject: "Harbor Routes", predicate: "is a", object: "Board game" },
  { subject: "Harbor Routes", predicate: "has genre", object: "Network strategy" },
  { subject: "Harbor Routes", predicate: "designed by", object: "M. Rivera" },
  { subject: "Harbor Routes", predicate: "supports", object: "2–4 players" },
  { subject: "Harbor Routes", predicate: "uses mechanic", object: "Route building" },
] as const;

export const TAXONOMY_ONTOLOGY_CASES = [
  {
    id: "browse",
    label: "Build a browse path",
    prompt:
      "A game repository needs a stable broader-to-narrower path from Games to Network-building games.",
    options: [
      { id: "taxonomy", label: "Use a taxonomy to organize the category path." },
      { id: "triple-only", label: "Use one unrelated triple and omit every broader category." },
      { id: "file-format", label: "Choose a file format; formats automatically decide all categories." },
    ],
    correctOptionId: "taxonomy",
    success:
      "Correct. A taxonomy makes the broader-to-narrower browse path explicit, while local policy still determines the categories and whether multiple parents are allowed.",
    correction:
      "The task is hierarchical browsing across named categories. That is the direct job of a taxonomy, not a file format or one disconnected assertion.",
  },
  {
    id: "relationships",
    label: "Represent crossing relations",
    prompt:
      "The repository must state that Harbor Routes was designed by M. Rivera, supports 2–4 players, and uses route building.",
    options: [
      { id: "ontology", label: "Use typed entities and relationships in an ontology or knowledge graph." },
      { id: "single-branch", label: "Force designer, player count, and mechanic into one narrower-category chain." },
      { id: "alphabetize", label: "Alphabetize the title; that represents every relationship." },
    ],
    correctOptionId: "ontology",
    success:
      "Yes. A graph can connect the same game to different entity types through named properties without pretending every relation is a broader/narrower relation.",
    correction:
      "Designer, player count, and mechanic are different kinds of relationship. A typed graph expresses those crossings more honestly than a single category chain.",
  },
  {
    id: "triple",
    label: "Read a triple",
    prompt:
      "In the statement “Harbor Routes — designed by — M. Rivera,” which part names the relationship?",
    options: [
      { id: "predicate", label: "“designed by” is the predicate." },
      { id: "subject", label: "“Harbor Routes” is the predicate." },
      { id: "object", label: "“M. Rivera” is the predicate." },
    ],
    correctOptionId: "predicate",
    success:
      "Correct. The subject is Harbor Routes, the predicate is designed by, and the object is M. Rivera.",
    correction:
      "Read the assertion as subject–predicate–object. The middle term names the relationship between the two entities.",
  },
  {
    id: "authority",
    label: "Keep design authority visible",
    prompt:
      "Two communities place the same game in different genre categories because their browsing goals and conventions differ.",
    options: [
      { id: "document-policy", label: "Document the schemes, purposes, mappings, and responsible communities instead of declaring one hierarchy naturally inevitable." },
      { id: "erase-difference", label: "Erase one scheme without recording why it existed." },
      { id: "taxonomy-is-nature", label: "Assume every taxonomy is a neutral discovery of the one natural category tree." },
    ],
    correctOptionId: "document-policy",
    success:
      "Right. Knowledge organization is designed for communities and tasks. Provenance and mappings let differences remain inspectable.",
    correction:
      "Categories are useful commitments, not context-free facts. Preserve who designed the scheme, for what purpose, and how it maps to alternatives.",
  },
] as const;

export function isTaxonomyOntologyAnswerCorrect(
  caseId: string,
  optionId: string,
): boolean {
  const evidenceCase = TAXONOMY_ONTOLOGY_CASES.find(
    (item) => item.id === caseId,
  );
  return evidenceCase?.correctOptionId === optionId;
}
