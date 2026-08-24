import assert from "node:assert/strict";
import {
  JUNE_2025_EXAM_URL,
  JUNE_2025_GUIDED_ITEMS,
  JUNE_2025_SCORING_URL,
} from "../app/classroom/math/algebra-1/exam-prep/_data/june-2025.ts";

assert.equal(JUNE_2025_GUIDED_ITEMS.length, 8);
assert.deepEqual(
  JUNE_2025_GUIDED_ITEMS.map((item) => item.number),
  [3, 5, 6, 7, 8, 17, 20, 24],
);
assert.deepEqual(
  JUNE_2025_GUIDED_ITEMS.map((item) => item.answer),
  ["4", "4", "1", "1", "4", "1", "1", "3"],
  "Pilot answers must match NYSED's June 2025 Part I scoring key",
);
assert.ok(JUNE_2025_EXAM_URL.endsWith("algone-62025-exam.pdf"));
assert.ok(JUNE_2025_SCORING_URL.endsWith("algone-62025-sk.pdf"));

for (const item of JUNE_2025_GUIDED_ITEMS) {
  assert.ok(item.options.some((option) => option.id === item.answer));
  assert.ok(item.reasoning.length >= 3);
  assert.match(
    item.reviewHref,
    /^\/(classroom\/math\/algebra-1|formal-science\/mathematics\/algebra)\//,
  );
  const serialized = JSON.stringify(item);
  assert.equal(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(serialized), false);
}

console.log("Algebra I guided exam review model tests passed.");
