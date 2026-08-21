import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import {
  astronomicalMethodsVocab,
  astronomyBranchVocab,
  cosmologyVocab,
  extragalacticAstronomyVocab,
  galacticAstronomyVocab,
  stellarAstronomyVocab,
} from "../app/_data/vocab/a/astronomy-branches.ts";
import { astronomyVocab } from "../app/_data/vocab/a/astronomy.ts";
import { planetaryAstronomyVocab } from "../app/_data/vocab/natural-science/astronomy/planetary-astronomy.ts";
import {
  ASTRONOMY_DIRECT_BRANCH_IDS,
  ASTRONOMY_EVIDENCE_CASES,
  ASTRONOMY_LIGHT_TRAVEL_EXAMPLES,
  calculateRedshift,
  formatRedshift,
  isAstronomyEvidenceAnswerCorrect,
} from "../app/natural-science/astronomy/astronomyModel.ts";
import { ASTRONOMY_CURRICULUM } from "../lib/curriculum/natural/astronomy/index.ts";

assert.equal(ASTRONOMY_CURRICULUM.pageKind, "hub");
assert.deepEqual(
  ASTRONOMY_CURRICULUM.children?.map((child) => child.id),
  ASTRONOMY_DIRECT_BRANCH_IDS
);
assert.equal(ASTRONOMY_DIRECT_BRANCH_IDS.length, 6);
assert.equal(new Set(ASTRONOMY_DIRECT_BRANCH_IDS).size, 6);
assert.deepEqual(
  ASTRONOMY_CURRICULUM.children?.map((child) => child.status),
  [
    "active",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
  ]
);

assert.equal(calculateRedshift(721.93, 656.3), 0.1);
assert.equal(calculateRedshift(500, 500), 0);
assert.equal(calculateRedshift(450, 500), -0.1);
assert.equal(calculateRedshift(1, 0), null);
assert.equal(calculateRedshift(-1, 500), null);
assert.equal(calculateRedshift(Number.NaN, 500), null);
assert.equal(formatRedshift(0.1), "z = 0.100");
assert.equal(formatRedshift(null), "invalid inputs");

assert.deepEqual(
  ASTRONOMY_LIGHT_TRAVEL_EXAMPLES.map((example) => example.id),
  ["moon", "sun", "proxima", "andromeda", "cmb"]
);
assert.equal(ASTRONOMY_LIGHT_TRAVEL_EXAMPLES[0].travelTime, "1.3 seconds");
assert.equal(
  ASTRONOMY_LIGHT_TRAVEL_EXAMPLES[4].travelTime,
  "about 13.8 billion years"
);

assert.equal(ASTRONOMY_EVIDENCE_CASES.length, 4);
for (const evidenceCase of ASTRONOMY_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isAstronomyEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isAstronomyEvidenceAnswerCorrect("missing", "missing"), false);

const branchGroups = [
  planetaryAstronomyVocab,
  stellarAstronomyVocab,
  galacticAstronomyVocab,
  extragalacticAstronomyVocab,
  cosmologyVocab,
  astronomicalMethodsVocab,
];
assert.equal(astronomyVocab.length, 6);
assert.deepEqual(
  branchGroups.map((group) => group.length),
  [8, 2, 2, 2, 2, 2]
);
assert.equal(astronomyBranchVocab.length, 10);
const allTerms = [
  ...astronomyVocab,
  ...planetaryAstronomyVocab,
  ...astronomyBranchVocab,
];
assert.equal(allTerms.length, 24);
assert.equal(new Set(allTerms.map((term) => term.id)).size, 24);
for (const stableId of ["astro-event-horizon", "astro-cmb", "astro-redshift"]) {
  assert.equal(allTerms.filter((term) => term.id === stableId).length, 1);
}

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [ASTRONOMY_CURRICULUM],
  registrations: [
    { nodeId: "natural.astronomy", terms: astronomyVocab },
    {
      nodeId: "natural.astronomy.planetary",
      terms: planetaryAstronomyVocab,
    },
    { nodeId: "natural.astronomy.stellar", terms: stellarAstronomyVocab },
    { nodeId: "natural.astronomy.galactic", terms: galacticAstronomyVocab },
    {
      nodeId: "natural.astronomy.extragalactic",
      terms: extragalacticAstronomyVocab,
    },
    { nodeId: "natural.astronomy.cosmology", terms: cosmologyVocab },
    { nodeId: "natural.astronomy.methods", terms: astronomicalMethodsVocab },
  ],
  accent: "cyan",
});
const rootScope = vocabularyScopes.find(
  (scope) => scope.path === ASTRONOMY_CURRICULUM.href
);
assert.ok(rootScope);
assert.deepEqual(
  rootScope.groups.map((group) => group.id),
  [ASTRONOMY_CURRICULUM.id, ...ASTRONOMY_DIRECT_BRANCH_IDS]
);
assert.equal(rootScope.groups.flatMap((group) => group.terms).length, 24);
for (const [index, child] of (ASTRONOMY_CURRICULUM.children ?? []).entries()) {
  const branchScope = vocabularyScopes.find(
    (scope) => scope.path === child.href
  );
  assert.ok(branchScope);
  assert.equal(branchScope.groups[0].terms.length, branchGroups[index].length);
}

console.log("Astronomy model tests passed.");
