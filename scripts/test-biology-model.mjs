import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { botanyVocab } from "../app/_data/vocab/b/botany.ts";
import { biologyVocab } from "../app/_data/vocab/natural-science/biology/index.ts";
import {
  biologyAnatomyVocab,
  biologyBranchVocab,
  biologyCytologyVocab,
  biologyEcologyVocab,
  biologyEvolutionVocab,
  biologyGeneticsVocab,
  biologyMicrobiologyVocab,
  biologyMolecularVocab,
  biologyMycologyVocab,
  biologyZoologyComparativeVocab,
  biologyZoologyDiversityVocab,
  biologyZoologyEthologyVocab,
  biologyZoologyPaleoVocab,
  biologyZoologyVocab,
} from "../app/_data/vocab/natural-science/biology/branches.ts";
import {
  BIOLOGY_DIRECT_BRANCH_IDS,
  BIOLOGY_EVIDENCE_CASES,
  BIOLOGY_SCALE_BANDS,
  MAGNIFICATION_SPECIMENS,
  calculateMagnification,
  formatBiologyInteger,
  isBiologyEvidenceAnswerCorrect,
  magnificationForSpecimen,
} from "../app/natural-science/biology/biologyModel.ts";

const directStatuses = [
  "active",
  "placeholder",
  "placeholder",
  "active",
  "active",
  "active",
  "active",
  "active",
  "placeholder",
  "placeholder",
];
const directLabels = [
  "Cytology",
  "Genetics",
  "Molecular Biology",
  "Microbiology",
  "Mycology",
  "Botany",
  "Zoology",
  "Anatomy & Physiology",
  "Ecology",
  "Evolution",
];
const zoologyChildren = [
  ["natural.biology.zoology.diversity", "Animal Diversity & Taxonomy"],
  ["natural.biology.zoology.comparative", "Comparative Zoology"],
  ["natural.biology.zoology.ethology", "Ethology"],
  ["natural.biology.zoology.paleozoology", "Paleozoology"],
].map(([id, label]) => ({
  id,
  label,
  href: `/natural-science/biology/zoology/${id.split(".").at(-1)}`,
  status: "active",
  children: [],
}));
const BIOLOGY_CURRICULUM = {
  id: "natural.biology",
  label: "Biology",
  href: "/natural-science/biology",
  status: "active",
  children: BIOLOGY_DIRECT_BRANCH_IDS.map((id, index) => ({
    id,
    label: directLabels[index],
    href: `/natural-science/biology/${id.split(".").at(-1)}`,
    status: directStatuses[index],
    children: id === "natural.biology.zoology" ? zoologyChildren : [],
  })),
};

const curriculumSource = readFileSync(
  new URL("../lib/curriculum/natural/biology/index.ts", import.meta.url),
  "utf8"
);
let previousDirectBranchPosition = -1;
for (const id of BIOLOGY_DIRECT_BRANCH_IDS) {
  const sourceToken =
    id === "natural.biology.botany" ? "BOTANY_CURRICULUM," : `"${id}"`;
  const position = curriculumSource.indexOf(sourceToken);
  assert.ok(
    position > previousDirectBranchPosition,
    `${id} should retain registry order`
  );
  previousDirectBranchPosition = position;
}

assert.deepEqual(
  BIOLOGY_CURRICULUM.children?.map((child) => child.id),
  BIOLOGY_DIRECT_BRANCH_IDS
);
assert.equal(BIOLOGY_DIRECT_BRANCH_IDS.length, 10);
assert.equal(new Set(BIOLOGY_DIRECT_BRANCH_IDS).size, 10);
assert.deepEqual(
  BIOLOGY_CURRICULUM.children?.map((child) => child.status),
  directStatuses
);

const scaleBandIds = BIOLOGY_SCALE_BANDS.flatMap((band) => band.nodeIds);
assert.equal(scaleBandIds.length, 9);
assert.equal(new Set(scaleBandIds).size, 9);
assert.deepEqual(
  [...scaleBandIds].sort(),
  BIOLOGY_DIRECT_BRANCH_IDS.filter(
    (id) => id !== "natural.biology.evolution"
  ).sort()
);
assert.equal(scaleBandIds.includes("natural.biology.evolution"), false);

assert.deepEqual(
  MAGNIFICATION_SPECIMENS.map(magnificationForSpecimen),
  [400, 500, 800, 4000]
);
assert.equal(calculateMagnification(72, 180), 400);
assert.equal(calculateMagnification(0, 180), 0);
assert.equal(calculateMagnification(72, 0), 0);
assert.equal(calculateMagnification(-1, 180), 0);
assert.equal(formatBiologyInteger(72000), "72,000");
assert.equal(formatBiologyInteger(4000), "4,000");
assert.equal(formatBiologyInteger(-1250.4), "-1,250");

assert.equal(BIOLOGY_EVIDENCE_CASES.length, 4);
for (const evidenceCase of BIOLOGY_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isBiologyEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isBiologyEvidenceAnswerCorrect("missing", "missing"), false);

const branchVocabularyGroups = [
  biologyCytologyVocab,
  biologyGeneticsVocab,
  biologyMolecularVocab,
  biologyMicrobiologyVocab,
  biologyMycologyVocab,
  biologyZoologyVocab,
  biologyZoologyDiversityVocab,
  biologyZoologyComparativeVocab,
  biologyZoologyEthologyVocab,
  biologyZoologyPaleoVocab,
  biologyAnatomyVocab,
  biologyEcologyVocab,
  biologyEvolutionVocab,
];
assert.equal(biologyVocab.length, 12);
assert.deepEqual(
  branchVocabularyGroups.map((group) => group.length),
  Array(13).fill(2)
);
assert.equal(biologyBranchVocab.length, 26);
assert.equal(botanyVocab.length, 10);

const allBiologyTerms = [
  ...biologyVocab,
  ...biologyBranchVocab,
  ...botanyVocab,
];
assert.equal(allBiologyTerms.length, 48);
assert.equal(new Set(allBiologyTerms.map((term) => term.id)).size, 48);
for (const stableId of ["bio-homeostasis", "bio-phenotype", "bio-mitosis"]) {
  assert.equal(
    allBiologyTerms.filter((term) => term.id === stableId).length,
    1,
    `${stableId} should retain exactly one narrow vocabulary owner`
  );
}

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [BIOLOGY_CURRICULUM],
  registrations: [
    { nodeId: "natural.biology", terms: biologyVocab },
    { nodeId: "natural.biology.cytology", terms: biologyCytologyVocab },
    { nodeId: "natural.biology.genetics", terms: biologyGeneticsVocab },
    { nodeId: "natural.biology.molecular", terms: biologyMolecularVocab },
    {
      nodeId: "natural.biology.microbiology",
      terms: biologyMicrobiologyVocab,
    },
    { nodeId: "natural.biology.mycology", terms: biologyMycologyVocab },
    { nodeId: "natural.biology.botany", terms: botanyVocab },
    { nodeId: "natural.biology.zoology", terms: biologyZoologyVocab },
    {
      nodeId: "natural.biology.zoology.diversity",
      terms: biologyZoologyDiversityVocab,
    },
    {
      nodeId: "natural.biology.zoology.comparative",
      terms: biologyZoologyComparativeVocab,
    },
    {
      nodeId: "natural.biology.zoology.ethology",
      terms: biologyZoologyEthologyVocab,
    },
    {
      nodeId: "natural.biology.zoology.paleozoology",
      terms: biologyZoologyPaleoVocab,
    },
    { nodeId: "natural.biology.anatomy", terms: biologyAnatomyVocab },
    { nodeId: "natural.biology.ecology", terms: biologyEcologyVocab },
    { nodeId: "natural.biology.evolution", terms: biologyEvolutionVocab },
  ],
  accent: "emerald",
});
const biologyScope = vocabularyScopes.find(
  (scope) => scope.path === BIOLOGY_CURRICULUM.href
);
assert.ok(biologyScope);
assert.deepEqual(
  biologyScope.groups.map((group) => group.id),
  [BIOLOGY_CURRICULUM.id, ...BIOLOGY_DIRECT_BRANCH_IDS]
);
assert.equal(biologyScope.groups.flatMap((group) => group.terms).length, 48);
assert.equal(
  biologyScope.groups.find((group) => group.id === "natural.biology.botany")
    ?.terms.length,
  10
);
assert.equal(
  biologyScope.groups.find((group) => group.id === "natural.biology.zoology")
    ?.terms.length,
  10
);

const zoologyScope = vocabularyScopes.find(
  (scope) => scope.path === "/natural-science/biology/zoology"
);
assert.ok(zoologyScope);
assert.deepEqual(
  zoologyScope.groups.map((group) => group.id),
  [
    "natural.biology.zoology",
    "natural.biology.zoology.diversity",
    "natural.biology.zoology.comparative",
    "natural.biology.zoology.ethology",
    "natural.biology.zoology.paleozoology",
  ]
);
assert.equal(zoologyScope.groups.flatMap((group) => group.terms).length, 10);

console.log("Biology model tests passed.");
