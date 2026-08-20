import assert from "node:assert/strict";
import {
  combinationCount,
  countOutcomes,
  enumerateOutcomes,
  factorial,
  generatedPracticeCase,
  permutationCount,
} from "../app/formal-science/mathematics/discrete/combinatorics/combinatoricsModel.ts";

assert.equal(factorial(0), 1, "0! must equal 1");
assert.equal(factorial(5), 120, "5! must equal 120");
assert.throws(() => factorial(-1), /nonnegative integer/);
assert.throws(() => factorial(2.5), /nonnegative integer/);

assert.equal(permutationCount(4, 2), 12);
assert.equal(combinationCount(4, 2), 6);
assert.equal(permutationCount(7, 0), 1);
assert.equal(combinationCount(7, 7), 1);

const canonicalTokens = ["A", "B", "C", "D"];
const ordered = enumerateOutcomes(canonicalTokens, 2, "permutation");
const unordered = enumerateOutcomes(canonicalTokens, 2, "combination");

assert.equal(
  ordered.length,
  12,
  "canonical ordered register must have 12 sequences"
);
assert.equal(
  unordered.length,
  6,
  "canonical unordered register must have 6 groups"
);
assert.equal(new Set(ordered.map((outcome) => outcome.join(""))).size, 12);
assert.equal(new Set(unordered.map((outcome) => outcome.join(""))).size, 6);
assert.deepEqual(unordered[0], ["A", "B"]);
assert.deepEqual(unordered.at(-1), ["C", "D"]);

for (let n = 1; n <= 8; n += 1) {
  for (let k = 0; k <= n; k += 1) {
    assert.equal(
      permutationCount(n, k),
      combinationCount(n, k) * factorial(k),
      `P(${n},${k}) must equal C(${n},${k}) × ${k}!`
    );
  }
}

for (let seed = 0; seed < 40; seed += 1) {
  const practice = generatedPracticeCase(seed);
  assert.ok(practice.n >= 5 && practice.n <= 8);
  assert.ok(practice.k >= 2 && practice.k <= 4);
  assert.ok(practice.k <= practice.n);
  assert.equal(
    practice.answer,
    countOutcomes(practice.mode, practice.n, practice.k),
    `practice seed ${seed} must use the canonical checker`
  );
}

console.log("Combinatorics counting model passed deterministic fixtures.");
