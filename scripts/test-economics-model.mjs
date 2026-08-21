import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import { economicsVocab } from "../app/_data/vocab/e/economics.ts";
import {
  BASELINE_MARKET_EQUILIBRIUM,
  ECONOMICS_BRANCH_IDS,
  ECONOMICS_EVIDENCE_CASES,
  calculateExpenditureGdp,
  calculateMarketEquilibrium,
  interpretMarketShift,
  isEconomicsEvidenceAnswerCorrect,
} from "../app/social-science/economics/economicsModel.ts";
import { ECONOMICS_CURRICULUM } from "../lib/curriculum/social/economics/index.ts";

assert.deepEqual(
  ECONOMICS_CURRICULUM.children?.map((child) => child.id),
  [...ECONOMICS_BRANCH_IDS]
);
assert.equal(ECONOMICS_BRANCH_IDS.length, 7);
assert.equal(new Set(ECONOMICS_BRANCH_IDS).size, 7);

assert.deepEqual(calculateMarketEquilibrium(0, 0), {
  quantity: 40,
  price: 50,
  demandIntercept: 90,
  supplyIntercept: 10,
});
assert.deepEqual(BASELINE_MARKET_EQUILIBRIUM, { quantity: 40, price: 50 });
assert.deepEqual(calculateMarketEquilibrium(1, 1), {
  quantity: 50,
  price: 50,
  demandIntercept: 100,
  supplyIntercept: 0,
});
assert.deepEqual(calculateMarketEquilibrium(1, -1), {
  quantity: 40,
  price: 60,
  demandIntercept: 100,
  supplyIntercept: 20,
});
assert.deepEqual(calculateMarketEquilibrium(-2, 2), {
  quantity: 40,
  price: 30,
  demandIntercept: 70,
  supplyIntercept: -10,
});

for (const demand of [-2, -1, 0, 1, 2]) {
  for (const supply of [-2, -1, 0, 1, 2]) {
    const result = calculateMarketEquilibrium(demand, supply);
    assert.equal(result.demandIntercept - result.quantity, result.price);
    assert.equal(result.supplyIntercept + result.quantity, result.price);
    assert.deepEqual(
      calculateMarketEquilibrium(demand, supply),
      calculateMarketEquilibrium(demand, supply)
    );
    assert.ok(interpretMarketShift(demand, supply).length > 30);
  }
}

assert.equal(
  calculateExpenditureGdp({
    consumption: 500,
    investment: 120,
    government: 160,
    exports: 90,
    imports: 110,
  }),
  760
);

for (const evidenceCase of ECONOMICS_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isEconomicsEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isEconomicsEvidenceAnswerCorrect("missing", "missing"), false);

assert.equal(economicsVocab.length, 20);
assert.equal(new Set(economicsVocab.map((term) => term.id)).size, 20);

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [ECONOMICS_CURRICULUM],
  registrations: [
    {
      nodeId: ECONOMICS_CURRICULUM.id,
      terms: economicsVocab,
    },
  ],
  accent: "emerald",
});
const economicsScope = vocabularyScopes.find(
  (scope) => scope.path === ECONOMICS_CURRICULUM.href
);
assert.ok(economicsScope);
assert.deepEqual(
  economicsScope.groups.map((group) => group.id),
  [ECONOMICS_CURRICULUM.id]
);
assert.equal(economicsScope.groups[0].terms.length, 20);
assert.equal(economicsScope.groups[0].sourceNodeId, ECONOMICS_CURRICULUM.id);
assert.equal(economicsScope.groups[0].sourcePath, ECONOMICS_CURRICULUM.href);

console.log("Economics model tests passed.");
