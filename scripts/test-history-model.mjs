import assert from "node:assert/strict";
import {
  CAESAR_AUGUSTUS_INTERVAL,
  HISTORY_DIRECT_LENS_IDS,
  HISTORY_EVIDENCE_CASES,
  historicalYearDistance,
  isHistoryEvidenceAnswerCorrect,
  toAstronomicalYear,
} from "../app/humanities/history/historyModel.ts";
import { historyVocab } from "../app/_data/vocab/h/history.ts";
import {
  historyChronologyVocab,
  historyRegionalVocab,
  historyThemeVocab,
} from "../app/_data/vocab/h/history-branches.ts";
import { HISTORY_CURRICULUM } from "../lib/curriculum/humanities/history/index.ts";

assert.deepEqual(
  HISTORY_CURRICULUM.children?.map((child) => child.id),
  HISTORY_DIRECT_LENS_IDS
);
assert.equal(new Set(HISTORY_DIRECT_LENS_IDS).size, 3);

assert.equal(toAstronomicalYear({ year: 44, era: "BCE" }), -43);
assert.equal(toAstronomicalYear({ year: 1, era: "BCE" }), 0);
assert.equal(toAstronomicalYear({ year: 1, era: "CE" }), 1);
assert.equal(toAstronomicalYear({ year: 14, era: "CE" }), 14);
assert.equal(
  historicalYearDistance(
    CAESAR_AUGUSTUS_INTERVAL.start,
    CAESAR_AUGUSTUS_INTERVAL.end
  ),
  57
);
assert.equal(
  historicalYearDistance({ year: 500, era: "BCE" }, { year: 323, era: "BCE" }),
  177
);
assert.equal(
  historicalYearDistance({ year: 1453, era: "CE" }, { year: 1789, era: "CE" }),
  336
);
assert.throws(
  () => toAstronomicalYear({ year: 0, era: "CE" }),
  /positive integers/
);

const vocabularyGroups = [
  historyVocab,
  historyChronologyVocab,
  historyRegionalVocab,
  historyThemeVocab,
];
const vocabularyTerms = vocabularyGroups.flat();
assert.deepEqual(
  vocabularyGroups.map((group) => group.length),
  [14, 9, 6, 6]
);
assert.equal(vocabularyTerms.length, 35);
assert.equal(new Set(vocabularyTerms.map((term) => term.id)).size, 35);

assert.equal(HISTORY_EVIDENCE_CASES.length, 4);
for (const evidenceCase of HISTORY_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isHistoryEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isHistoryEvidenceAnswerCorrect("missing", "missing"), false);

console.log("History model tests passed.");
