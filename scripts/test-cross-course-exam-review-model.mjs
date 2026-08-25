import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { AP_BIOLOGY_COURSE } from "../lib/courses/ap-biology.ts";
import { NYS_GLOBAL_II_COURSE } from "../lib/courses/nys-global-history-2.ts";

const apReview = AP_BIOLOGY_COURSE.units.find((unit) => unit.slug === "exam-prep");
const globalReview = NYS_GLOBAL_II_COURSE.units.find((unit) => unit.slug === "exam-prep");

assert.equal(apReview?.number, 9);
assert.equal(apReview?.href, "/classroom/science/ap-biology/exam-prep");
assert.equal(globalReview?.number, 8);
assert.equal(globalReview?.href, "/classroom/social-studies/global-history-2/exam-prep");

const apPilot = await readFile(new URL("../app/classroom/science/ap-biology/exam-prep/2025-frq/APBiologyFRQPilot.tsx", import.meta.url), "utf8");
const globalPilot = await readFile(new URL("../app/classroom/social-studies/global-history-2/exam-prep/june-2025/GlobalHistoryReviewPilot.tsx", import.meta.url), "utf8");

assert.match(apPilot, /ap25-frq-biology\.pdf/);
assert.match(apPilot, /ap25-sg-biology\.pdf/);
assert.match(apPilot, /Choose the control/);
assert.match(apPilot, /Construct the null/);
assert.match(globalPilot, /glhg2-62025-exam\.pdf/);
assert.match(globalPilot, /glhg2-62025-sk\.pdf/);
assert.match(globalPilot, /number: 3[\s\S]*answer: 2/);
assert.match(globalPilot, /number: 4[\s\S]*answer: 1/);

console.log("Cross-course guided exam review model tests passed.");
