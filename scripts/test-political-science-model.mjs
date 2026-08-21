import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import {
  comparativePoliticsVocab,
  internationalRelationsVocab,
  politicalBehaviorVocab,
  politicalEconomyVocab,
  politicalInstitutionsVocab,
  politicalMethodologyVocab,
  politicalScienceBranchVocab,
  politicalTheoryVocab,
  publicPolicyVocab,
} from "../app/_data/vocab/p/political-science-branches.ts";
import { politicalScienceVocab } from "../app/_data/vocab/p/political-science.ts";
import {
  POLITICAL_EVIDENCE_CASES,
  POLITICAL_MAJORITY,
  POLITICAL_PARTIES,
  POLITICAL_SCIENCE_DIRECT_BRANCH_IDS,
  POLITICAL_TOTAL_SEATS,
  buildPoliticalHemicycle,
  calculateCoalitionSeats,
  hasPoliticalMajority,
  isPoliticalEvidenceAnswerCorrect,
} from "../app/social-science/political-science/politicalScienceModel.ts";
import { POLITICAL_SCIENCE_CURRICULUM } from "../lib/curriculum/social/political-science.ts";

assert.equal(POLITICAL_SCIENCE_CURRICULUM.pageKind, "hub");
assert.deepEqual(
  POLITICAL_SCIENCE_CURRICULUM.children?.map((child) => child.id),
  POLITICAL_SCIENCE_DIRECT_BRANCH_IDS
);
assert.equal(POLITICAL_SCIENCE_DIRECT_BRANCH_IDS.length, 8);
assert.equal(new Set(POLITICAL_SCIENCE_DIRECT_BRANCH_IDS).size, 8);
assert.ok(
  POLITICAL_SCIENCE_CURRICULUM.children?.every(
    (child) => child.status === "placeholder"
  )
);

assert.equal(POLITICAL_PARTIES.length, 5);
assert.equal(POLITICAL_TOTAL_SEATS, 125);
assert.equal(POLITICAL_MAJORITY, 63);
assert.equal(calculateCoalitionSeats([]), 0);
assert.equal(calculateCoalitionSeats(["union", "civic"]), 65);
assert.equal(calculateCoalitionSeats(["reform", "green", "regional"]), 60);
assert.equal(calculateCoalitionSeats(["union", "union", "missing"]), 40);
assert.equal(hasPoliticalMajority(["union", "civic"]), true);
assert.equal(hasPoliticalMajority(["reform", "green", "regional"]), false);

const hemicycle = buildPoliticalHemicycle();
assert.equal(hemicycle.length, POLITICAL_TOTAL_SEATS);
assert.equal(
  new Set(hemicycle.map((dot) => dot.key)).size,
  POLITICAL_TOTAL_SEATS
);
assert.ok(
  hemicycle.every(
    (dot) => Number.isFinite(dot.x) && Number.isFinite(dot.y) && dot.rgb
  )
);
for (const party of POLITICAL_PARTIES) {
  assert.equal(
    hemicycle.filter((dot) => dot.partyId === party.id).length,
    party.seats
  );
}

assert.equal(POLITICAL_EVIDENCE_CASES.length, 4);
for (const evidenceCase of POLITICAL_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isPoliticalEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isPoliticalEvidenceAnswerCorrect("missing", "missing"), false);

const branchGroups = [
  politicalTheoryVocab,
  comparativePoliticsVocab,
  politicalInstitutionsVocab,
  politicalBehaviorVocab,
  publicPolicyVocab,
  internationalRelationsVocab,
  politicalEconomyVocab,
  politicalMethodologyVocab,
];
assert.equal(politicalScienceVocab.length, 6);
assert.deepEqual(
  branchGroups.map((group) => group.length),
  [2, 2, 2, 2, 2, 2, 2, 2]
);
assert.equal(politicalScienceBranchVocab.length, 16);
const allTerms = [...politicalScienceVocab, ...politicalScienceBranchVocab];
assert.equal(allTerms.length, 22);
assert.equal(new Set(allTerms.map((term) => term.id)).size, 22);
for (const stableId of [
  "poli-sovereignty",
  "poli-hegemony",
  "poli-gerrymandering",
]) {
  assert.equal(allTerms.filter((term) => term.id === stableId).length, 1);
}

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [POLITICAL_SCIENCE_CURRICULUM],
  registrations: [
    {
      nodeId: "social.political-science",
      terms: politicalScienceVocab,
    },
    {
      nodeId: "social.political-science.theory",
      terms: politicalTheoryVocab,
    },
    {
      nodeId: "social.political-science.comparative",
      terms: comparativePoliticsVocab,
    },
    {
      nodeId: "social.political-science.institutions",
      terms: politicalInstitutionsVocab,
    },
    {
      nodeId: "social.political-science.behavior",
      terms: politicalBehaviorVocab,
    },
    {
      nodeId: "social.political-science.policy",
      terms: publicPolicyVocab,
    },
    {
      nodeId: "social.political-science.international-relations",
      terms: internationalRelationsVocab,
    },
    {
      nodeId: "social.political-science.political-economy",
      terms: politicalEconomyVocab,
    },
    {
      nodeId: "social.political-science.methods",
      terms: politicalMethodologyVocab,
    },
  ],
  accent: "amber",
});
const rootScope = vocabularyScopes.find(
  (scope) => scope.path === POLITICAL_SCIENCE_CURRICULUM.href
);
assert.ok(rootScope);
assert.deepEqual(
  rootScope.groups.map((group) => group.id),
  [POLITICAL_SCIENCE_CURRICULUM.id, ...POLITICAL_SCIENCE_DIRECT_BRANCH_IDS]
);
assert.equal(rootScope.groups.flatMap((group) => group.terms).length, 22);
for (const [index, child] of (
  POLITICAL_SCIENCE_CURRICULUM.children ?? []
).entries()) {
  const branchScope = vocabularyScopes.find(
    (scope) => scope.path === child.href
  );
  assert.ok(branchScope);
  assert.equal(branchScope.groups[0].terms.length, branchGroups[index].length);
}

console.log("Political Science model tests passed.");
