import assert from "node:assert/strict";
import {
  buildExoplanetTapUrl,
  classifyPlanetRadius,
  normalizeNASAExoplanet,
} from "../lib/collections/providers/nasa-exoplanets.mjs";

const url = buildExoplanetTapUrl({
  search: "Kepler_%' OR 1=1",
  limit: 500,
});
const query = url.searchParams.get("query") ?? "";
assert.match(query, /top 60/);
assert.match(query, /kepler'' or 1=1/);
assert.doesNotMatch(query, /kepler_%/);
assert.match(query, /from pscomppars/);
assert.equal(url.searchParams.get("format"), "json");

assert.equal(classifyPlanetRadius(1), "Earth-sized");
assert.equal(classifyPlanetRadius(1.7), "Super-Earth");
assert.equal(classifyPlanetRadius(3), "Sub-Neptune");
assert.equal(classifyPlanetRadius(undefined), "Unclassified");

const record = normalizeNASAExoplanet({
  pl_name: "Example b",
  hostname: "Example",
  discoverymethod: "Transit",
  disc_year: 2024,
  pl_orbper: 12.5,
  pl_rade: 1.1,
  sy_pnum: 2,
});
assert.equal(record.id, "example-b");
assert.equal(record.sizeClass, "Earth-sized");
assert.equal(record.source, "NASA Exoplanet Archive");
assert.equal(record.sources[0].kind, "provider");
assert.match(record.sourceUrl, /overview/);

console.log("NASA exoplanet adapter tests passed");
