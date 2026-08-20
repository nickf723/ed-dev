import assert from "node:assert/strict";
import { queryCollection } from "../lib/collections/query.mjs";

const records = [
  { id: "one", title: "Café Grid", family: "alignment", weight: "intro", mechanics: ["placement"] },
  { id: "two", title: "Gravity Four", family: "connection", weight: "light", mechanics: ["gravity", "placement"] },
  { id: "three", title: "Seed Store", family: "sowing", weight: "light", mechanics: ["capture", "counting"] },
];

const facets = [
  {
    id: "family",
    label: "Family",
    selection: "single",
    options: [
      { id: "alignment", label: "Alignment" },
      { id: "connection", label: "Connection" },
      { id: "sowing", label: "Sowing" },
    ],
    values: (record) => [record.family],
  },
  {
    id: "mechanic",
    label: "Mechanic",
    selection: "multiple",
    options: [
      { id: "placement", label: "Placement" },
      { id: "capture", label: "Capture" },
    ],
    values: (record) => record.mechanics,
  },
];

const run = (text = "", selected = {}) =>
  queryCollection({
    records,
    query: { text, facets: selected },
    facets,
    getSearchText: (record) => [record.title, ...record.mechanics],
  });

assert.deepEqual(
  run("cafe").records.map((record) => record.id),
  ["one"],
  "search should be case- and diacritic-insensitive",
);
assert.deepEqual(
  run("", { family: ["connection"], mechanic: ["placement"] }).records.map(
    (record) => record.id,
  ),
  ["two"],
  "filters should combine with AND across facets",
);
assert.deepEqual(
  run("", { mechanic: ["placement", "capture"] }).records.map(
    (record) => record.id,
  ),
  ["one", "two", "three"],
  "a default multi-select facet should match any selected option",
);

const contextual = run("", { family: ["connection"] });
assert.equal(contextual.facetCounts.family.sowing, 1, "a facet count should ignore its own active selection");
assert.equal(contextual.facetCounts.mechanic.capture, 0, "a facet count should retain selections from other facets");
assert.equal(contextual.activeFilterCount, 1);
assert.equal(contextual.total, 3);
assert.equal(contextual.matched, 1);

assert.throws(() => run("", { missing: ["value"] }), /Unknown collection facet/);
assert.throws(() => run("", { family: ["connection", "sowing"] }), /only accepts one value/);
assert.throws(() => run("", { family: ["unknown"] }), /Unknown value/);
assert.deepEqual(records.map((record) => record.id), ["one", "two", "three"], "querying should not mutate source ordering");

console.log("Collection query tests passed.");
