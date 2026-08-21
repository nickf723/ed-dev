import assert from "node:assert/strict";
import {
  INFORMATION_SCIENCE_DIRECT_BRANCH_IDS,
  INFORMATION_SCIENCE_EVIDENCE_CASES,
  INFORMATION_SCIENCE_NESTED_BRANCH_IDS,
  RETRIEVAL_QUERIES,
  measureSymbolStream,
  rankRetrievalRecords,
  isInformationScienceEvidenceAnswerCorrect,
} from "../app/formal-science/information-science/informationScienceModel.ts";
import { INFORMATION_SCIENCE_CURRICULUM } from "../lib/curriculum/information-science.ts";
import { informationScienceVocab } from "../app/_data/vocab/i/information-science.ts";
import { informationTheoryVocab } from "../app/_data/vocab/i/information-theory.ts";
import {
  archivesPreservationVocab,
  bibliometricsVocab,
  encodingRepresentationVocab,
  informationBehaviorVocab,
  informationRetrievalVocab,
  knowledgeGraphsVocab,
  metadataSemanticsVocab,
  taxonomyOntologyVocab,
} from "../app/_data/vocab/i/information-science-branches.ts";
import {
  HARBOR_ROUTES_TAXONOMY,
  HARBOR_ROUTES_TRIPLES,
  KNOWLEDGE_GRAPH_NODE_ID,
  TAXONOMY_ONTOLOGY_CASES,
  isTaxonomyOntologyAnswerCorrect,
} from "../app/formal-science/information-science/taxonomy-ontology/taxonomyOntologyModel.ts";

assert.deepEqual(
  INFORMATION_SCIENCE_CURRICULUM.children?.map((child) => child.id),
  INFORMATION_SCIENCE_DIRECT_BRANCH_IDS,
);
assert.equal(new Set(INFORMATION_SCIENCE_DIRECT_BRANCH_IDS).size, 7);

const representation = INFORMATION_SCIENCE_CURRICULUM.children?.find(
  (child) => child.id === "formal.information-science.encoding-representation",
);
const organization = INFORMATION_SCIENCE_CURRICULUM.children?.find(
  (child) => child.id === "formal.information-science.taxonomy-ontology",
);
assert.deepEqual(
  [
    ...(representation?.children ?? []),
    ...(organization?.children ?? []),
  ].map((child) => child.id),
  INFORMATION_SCIENCE_NESTED_BRANCH_IDS,
);
assert.equal(organization?.status, "active");
assert.equal(organization?.pageKind, "hub");
assert.deepEqual(organization?.children?.map((child) => child.id), [
  KNOWLEDGE_GRAPH_NODE_ID,
]);

const banana = measureSymbolStream("BANANA_BANDANA");
assert.equal(banana.count, 14);
assert.equal(banana.unique, 5);
assert.equal(banana.utf8Bits, 112);
assert.ok(Math.abs(banana.entropy - 1.9852281360342516) < 1e-12);

const fairBinary = measureSymbolStream("0101");
assert.equal(fairBinary.entropy, 1);
assert.equal(fairBinary.maxEntropy, 1);
assert.equal(measureSymbolStream("").entropy, 0);

const archiveRanking = rankRetrievalRecords(RETRIEVAL_QUERIES.archives);
assert.deepEqual(archiveRanking.slice(0, 2).map((item) => item.id), [
  "preservation",
  "archive-metadata",
]);
assert.ok(
  archiveRanking.every(
    (item, index) => index === 0 || archiveRanking[index - 1].distance <= item.distance,
  ),
);

const vocabularyGroups = [
  informationScienceVocab,
  informationTheoryVocab,
  encodingRepresentationVocab,
  metadataSemanticsVocab,
  informationRetrievalVocab,
  taxonomyOntologyVocab,
  knowledgeGraphsVocab,
  archivesPreservationVocab,
  informationBehaviorVocab,
  bibliometricsVocab,
];
const vocabularyTerms = vocabularyGroups.flat();
assert.equal(vocabularyGroups.length, 10);
assert.equal(vocabularyTerms.length, 58);
assert.equal(new Set(vocabularyTerms.map((term) => term.id)).size, 58);
for (const stableId of [
  "info-information",
  "info-metadata",
  "info-classification",
  "info-taxonomy",
  "info-retrieval",
  "info-index",
  "fs-entropy",
]) {
  assert.ok(vocabularyTerms.some((term) => term.id === stableId));
}

assert.equal(INFORMATION_SCIENCE_EVIDENCE_CASES.length, 4);
for (const evidenceCase of INFORMATION_SCIENCE_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId,
    ),
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isInformationScienceEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
    );
  }
}
assert.equal(
  isInformationScienceEvidenceAnswerCorrect("missing", "missing"),
  false,
);

assert.deepEqual(HARBOR_ROUTES_TAXONOMY, [
  "Games",
  "Board games",
  "Strategy games",
  "Network-building games",
  "Harbor Routes",
]);
assert.equal(HARBOR_ROUTES_TRIPLES.length, 5);
assert.ok(
  HARBOR_ROUTES_TRIPLES.every(
    (triple) => triple.subject && triple.predicate && triple.object,
  ),
);
assert.equal(TAXONOMY_ONTOLOGY_CASES.length, 4);
for (const evidenceCase of TAXONOMY_ONTOLOGY_CASES) {
  for (const option of evidenceCase.options) {
    assert.equal(
      isTaxonomyOntologyAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId,
    );
  }
}
assert.equal(isTaxonomyOntologyAnswerCorrect("missing", "missing"), false);

console.log("Information Science model tests passed.");
