import assert from "node:assert/strict";
import { buildCurriculumVocabularyScopes } from "../app/_data/vocab/aggregate.mjs";
import {
  classicalHistoricalLanguagesVocab,
  constructedLanguagesVocab,
  languageBranchVocab,
  languageLearningProficiencyVocab,
  languageLiteratureCultureVocab,
  modernLanguagesVocab,
  signedLanguagesVocab,
  translationInterpretingVocab,
  writingLiteracyVocab,
} from "../app/_data/vocab/l/language-branches.ts";
import { languagesVocab } from "../app/_data/vocab/l/languages.ts";
import {
  LANGUAGE_DIRECT_BRANCH_IDS,
  LANGUAGE_EVIDENCE_CASES,
  LANGUAGE_PHRASES,
  LANGUAGE_PRACTICE_STAGES,
  LANGUAGE_TRANSLATION_EXAMPLES,
  calculatePhraseDirectionShare,
  countPhraseDirections,
  formatLanguagePercent,
  isLanguageEvidenceAnswerCorrect,
} from "../app/humanities/languages/languagesModel.ts";
import { LANGUAGES_CURRICULUM } from "../lib/curriculum/humanities/languages.ts";

assert.equal(LANGUAGES_CURRICULUM.pageKind, "hub");
assert.deepEqual(
  LANGUAGES_CURRICULUM.children?.map((child) => child.id),
  LANGUAGE_DIRECT_BRANCH_IDS
);
assert.equal(LANGUAGE_DIRECT_BRANCH_IDS.length, 8);
assert.equal(new Set(LANGUAGE_DIRECT_BRANCH_IDS).size, 8);
assert.ok(
  LANGUAGES_CURRICULUM.children?.every(
    (child) => child.status === "placeholder"
  )
);

assert.deepEqual(
  LANGUAGE_PRACTICE_STAGES.map((stage) => stage.key),
  ["notice", "understand", "retrieve", "use", "adapt"]
);
assert.equal(
  new Set(LANGUAGE_PRACTICE_STAGES.map((stage) => stage.rgb)).size,
  5
);

assert.deepEqual(
  Object.values(LANGUAGE_PHRASES).map((phrase) => phrase.entries.length),
  [7, 8, 9]
);
assert.deepEqual(
  ["thanks", "morning", "water"].map((key) =>
    countPhraseDirections(key, "LTR")
  ),
  [6, 7, 8]
);
assert.deepEqual(
  ["thanks", "morning", "water"].map((key) =>
    countPhraseDirections(key, "RTL")
  ),
  [1, 1, 1]
);
assert.equal(calculatePhraseDirectionShare("thanks", "RTL"), 1 / 7);
assert.equal(calculatePhraseDirectionShare("morning", "RTL"), 1 / 8);
assert.equal(calculatePhraseDirectionShare("water", "RTL"), 1 / 9);
assert.equal(formatLanguagePercent(1 / 7), "14.3%");
assert.equal(formatLanguagePercent(1 / 8), "12.5%");
assert.equal(formatLanguagePercent(1 / 9), "11.1%");
assert.equal(formatLanguagePercent(null), "invalid inputs");
assert.equal(formatLanguagePercent(Number.NaN), "invalid inputs");

assert.deepEqual(
  LANGUAGE_TRANSLATION_EXAMPLES.map((example) => example.key),
  ["hungry", "age", "coffee", "weather"]
);
assert.equal(
  LANGUAGE_TRANSLATION_EXAMPLES.find((example) => example.key === "hungry")
    ?.target,
  "Tengo hambre."
);
assert.equal(
  LANGUAGE_TRANSLATION_EXAMPLES.find((example) => example.key === "weather")
    ?.target,
  "Hace calor."
);

assert.equal(LANGUAGE_EVIDENCE_CASES.length, 4);
for (const evidenceCase of LANGUAGE_EVIDENCE_CASES) {
  assert.equal(evidenceCase.options.length, 3);
  assert.ok(
    evidenceCase.options.some(
      (option) => option.id === evidenceCase.correctOptionId
    )
  );
  for (const option of evidenceCase.options) {
    assert.equal(
      isLanguageEvidenceAnswerCorrect(evidenceCase.id, option.id),
      option.id === evidenceCase.correctOptionId
    );
  }
}
assert.equal(isLanguageEvidenceAnswerCorrect("missing", "missing"), false);

const branchGroups = [
  modernLanguagesVocab,
  signedLanguagesVocab,
  classicalHistoricalLanguagesVocab,
  constructedLanguagesVocab,
  writingLiteracyVocab,
  translationInterpretingVocab,
  languageLearningProficiencyVocab,
  languageLiteratureCultureVocab,
];
assert.equal(languagesVocab.length, 6);
assert.deepEqual(
  branchGroups.map((group) => group.length),
  [2, 2, 2, 2, 2, 2, 2, 2]
);
assert.equal(languageBranchVocab.length, 16);
const allTerms = [...languagesVocab, ...languageBranchVocab];
assert.equal(allTerms.length, 22);
assert.equal(new Set(allTerms.map((term) => term.id)).size, 22);

const vocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [LANGUAGES_CURRICULUM],
  registrations: [
    { nodeId: LANGUAGES_CURRICULUM.id, terms: languagesVocab },
    ...LANGUAGE_DIRECT_BRANCH_IDS.map((nodeId, index) => ({
      nodeId,
      terms: branchGroups[index],
    })),
  ],
  accent: "violet",
});
const rootScope = vocabularyScopes.find(
  (scope) => scope.path === LANGUAGES_CURRICULUM.href
);
assert.ok(rootScope);
assert.deepEqual(
  rootScope.groups.map((group) => group.id),
  [LANGUAGES_CURRICULUM.id, ...LANGUAGE_DIRECT_BRANCH_IDS]
);
assert.equal(rootScope.groups.flatMap((group) => group.terms).length, 22);
for (const [index, child] of (LANGUAGES_CURRICULUM.children ?? []).entries()) {
  const branchScope = vocabularyScopes.find(
    (scope) => scope.path === child.href
  );
  assert.ok(branchScope);
  assert.equal(branchScope.groups[0].terms.length, branchGroups[index].length);
}

console.log("Languages model tests passed.");
