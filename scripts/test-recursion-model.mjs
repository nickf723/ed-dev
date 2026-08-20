import assert from "node:assert/strict";
import {
  CANONICAL_HANOI_MOVES,
  applyHanoiMove,
  createHanoiTowers,
  generateHanoiMoves,
  generatedRecursionPracticeCase,
  hanoiMoveCount,
  towersAfterMoves,
  tryManualHanoiMove,
} from "../app/formal-science/mathematics/discrete/recursion-theory/recursionModel.ts";

assert.deepEqual(
  CANONICAL_HANOI_MOVES.map(({ disk, from, to }) => ({ disk, from, to })),
  [
    { disk: 1, from: "A", to: "C" },
    { disk: 2, from: "A", to: "B" },
    { disk: 1, from: "C", to: "B" },
    { disk: 3, from: "A", to: "C" },
    { disk: 1, from: "B", to: "A" },
    { disk: 2, from: "B", to: "C" },
    { disk: 1, from: "A", to: "C" },
  ],
  "the canonical three-disk trace must remain the exact seven-move route"
);

for (let diskCount = 1; diskCount <= 8; diskCount += 1) {
  const moves = generateHanoiMoves(diskCount);
  assert.equal(
    moves.length,
    hanoiMoveCount(diskCount),
    `H(${diskCount}) must generate 2^n - 1 moves`
  );

  const final = towersAfterMoves(diskCount, moves, moves.length);
  assert.deepEqual(final.A, []);
  assert.deepEqual(final.B, []);
  assert.deepEqual(
    final.C,
    Array.from({ length: diskCount }, (_, index) => diskCount - index),
    `H(${diskCount}) must transfer the full ordered stack to C`
  );
}

const start = createHanoiTowers(3);
const first = tryManualHanoiMove(start, "A", "C");
assert.equal(first.ok, true);
if (first.ok) {
  assert.deepEqual(first.towers.C, [1]);
  const illegal = tryManualHanoiMove(first.towers, "A", "C");
  assert.deepEqual(illegal, {
    ok: false,
    reason: "larger-on-smaller",
  });
}

assert.deepEqual(tryManualHanoiMove(start, "B", "C"), {
  ok: false,
  reason: "empty",
});
assert.deepEqual(tryManualHanoiMove(start, "A", "A"), {
  ok: false,
  reason: "same-peg",
});

assert.throws(
  () => applyHanoiMove(start, { disk: 2, from: "A", to: "C" }),
  /expected disk 2/
);
assert.throws(() => generateHanoiMoves(0), /integer from 1 through 12/);
assert.throws(() => hanoiMoveCount(2.5), /integer from 1 through 30/);

for (let seed = -5; seed < 45; seed += 1) {
  const practice = generatedRecursionPracticeCase(seed);
  assert.ok(practice.diskCount >= 2 && practice.diskCount <= 8);
  assert.equal(practice.answer, generateHanoiMoves(practice.diskCount).length);
  assert.match(practice.explanation, new RegExp(`= ${practice.answer}\\.$`));
}

console.log(
  "Recursion model passed deterministic Hanoi and practice fixtures."
);
