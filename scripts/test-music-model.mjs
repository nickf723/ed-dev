import assert from "node:assert/strict";
import {
  getMeasureLedger,
  isMusicAssessmentAnswerCorrect,
  MUSIC_ASSESSMENT_CASES,
  MUSIC_BRANCH_IDS,
  transposePhrase,
  transposePitch,
} from "../app/humanities/music/musicModel.ts";

assert.deepEqual(MUSIC_BRANCH_IDS, [
  "humanities.music.theory",
  "humanities.music.acoustics",
  "humanities.music.performance",
  "humanities.music.history-culture",
  "humanities.music.recordings",
]);

assert.equal(transposePitch("C", 2), "D");
assert.equal(transposePitch("B", 1), "C");
assert.equal(transposePitch("C", -1), "B");
assert.deepEqual(transposePhrase(["C", "E", "G"], 2), ["D", "F♯", "A"]);

assert.deepEqual(getMeasureLedger(["half", "quarter", "eighth", "eighth"]), {
  usedBeats: 4,
  beatsPerMeasure: 4,
  remainingBeats: 0,
  complete: true,
  overflow: false,
});

assert.deepEqual(getMeasureLedger(["whole", "quarter"]), {
  usedBeats: 5,
  beatsPerMeasure: 4,
  remainingBeats: -1,
  complete: false,
  overflow: true,
});

assert.equal(MUSIC_ASSESSMENT_CASES.length, 4);
for (const assessmentCase of MUSIC_ASSESSMENT_CASES) {
  assert.equal(
    isMusicAssessmentAnswerCorrect(
      assessmentCase.id,
      assessmentCase.correctIndex
    ),
    true
  );
  const wrongIndex =
    (assessmentCase.correctIndex + 1) % assessmentCase.options.length;
  assert.equal(
    isMusicAssessmentAnswerCorrect(assessmentCase.id, wrongIndex),
    false
  );
}

console.log("Music model tests passed.");
