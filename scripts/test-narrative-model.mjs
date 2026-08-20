import assert from "node:assert/strict";
import {
  NARRATIVE_EVENTS,
  NARRATIVE_TRANSFER_CHECK,
  eventCodes,
  orderedNarrativeEvents,
  revealedPlotEvents,
} from "../app/humanities/literature/narrative-fiction/narrativeModel.ts";

assert.equal(
  NARRATIVE_EVENTS.length,
  4,
  "the canonical story must contain four events"
);
assert.equal(new Set(NARRATIVE_EVENTS.map((event) => event.id)).size, 4);
assert.equal(new Set(NARRATIVE_EVENTS.map((event) => event.code)).size, 4);

assert.deepEqual(
  orderedNarrativeEvents("story").map((event) => event.code),
  ["A", "B", "C", "D"],
  "story order must preserve the canonical chronology"
);
assert.deepEqual(
  orderedNarrativeEvents("plot").map((event) => event.code),
  ["C", "A", "D", "B"],
  "plot order must preserve the narrated disclosure sequence"
);
assert.equal(eventCodes("story"), "A -> B -> C -> D");
assert.equal(eventCodes("plot"), "C -> A -> D -> B");

for (let step = 1; step <= NARRATIVE_EVENTS.length; step += 1) {
  const revealed = revealedPlotEvents(step);
  assert.equal(revealed.length, step);
  assert.deepEqual(
    revealed.map((event) => event.code),
    ["C", "A", "D", "B"].slice(0, step)
  );
}

assert.equal(
  revealedPlotEvents(0).length,
  1,
  "the reading head clamps to the opening event"
);
assert.equal(
  revealedPlotEvents(99).length,
  4,
  "the reading head clamps to the final event"
);
assert.ok(
  NARRATIVE_TRANSFER_CHECK.options.some(
    (option) => option.id === NARRATIVE_TRANSFER_CHECK.correctId
  ),
  "the transfer check must expose its deterministic correct option"
);

console.log("Narrative ordering model passed deterministic fixtures.");
