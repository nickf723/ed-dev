import assert from "node:assert/strict";
import {
  buildMetObjectUrl,
  buildMetSearchUrl,
  normalizeMetObject,
} from "../lib/collections/providers/met.mjs";

const searchUrl = new URL(buildMetSearchUrl("Japanese prints & armor"));
assert.equal(searchUrl.searchParams.get("q"), "Japanese prints & armor");
assert.equal(searchUrl.searchParams.get("hasImages"), "true");
assert.throws(() => buildMetSearchUrl("   "), /non-empty query/);
assert.match(buildMetObjectUrl(437133), /\/objects\/437133$/);
assert.throws(() => buildMetObjectUrl("nope"), /positive integer id/);

const record = normalizeMetObject({
  objectID: 437133,
  isPublicDomain: true,
  primaryImageSmall: "https://images.metmuseum.org/example.jpg",
  objectName: "Painting",
  title: "A test painting",
  artistDisplayName: "Example Artist",
  objectDate: "1889",
  medium: "Oil on canvas",
  dimensions: "73 × 92 cm",
  department: "European Paintings",
  city: "Arles",
  country: "France",
  classification: "Paintings",
  tags: [{ term: "Landscape" }],
  objectURL: "https://www.metmuseum.org/art/collection/search/437133",
});

assert.equal(record.id, "437133");
assert.equal(record.primaryCreator, "Example Artist");
assert.equal(record.facts.publicDomain, "Yes · CC0 image");
assert.equal(record.facts.place, "Arles, France");
assert.deepEqual(record.tags, ["Paintings", "Painting", "Landscape"]);
assert.equal(record.sources[0].kind, "provider");

const unknown = normalizeMetObject({
  objectID: 1,
  objectBeginDate: 1200,
  objectEndDate: 1250,
  culture: "Example culture",
});
assert.equal(unknown.title, "Object 1");
assert.equal(unknown.primaryCreator, "Example culture");
assert.equal(unknown.year, "1200–1250");
assert.equal(unknown.facts.publicDomain, "Not marked public domain");
assert.throws(
  () => normalizeMetObject({ objectID: 0 }),
  /positive integer objectID/
);

console.log("The Met adapter tests passed");
