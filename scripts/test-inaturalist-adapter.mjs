import assert from "node:assert/strict";
import {
  buildINaturalistTaxaUrl,
  normalizeINaturalistTaxon,
} from "../lib/collections/providers/inaturalist.mjs";

const url = buildINaturalistTaxaUrl("red panda", 100);
assert.equal(url.searchParams.get("taxon_id"), "1");
assert.equal(url.searchParams.get("rank"), "species");
assert.equal(url.searchParams.get("per_page"), "30");
assert.throws(() => buildINaturalistTaxaUrl("  "), /non-empty phrase/);

const record = normalizeINaturalistTaxon({
  id: 41689,
  name: "Ailurus fulgens",
  preferred_common_name: "Red Panda",
  rank: "species",
  observations_count: 1200,
  ancestors: [
    { rank: "phylum", name: "Chordata" },
    { rank: "class", name: "Mammalia" },
    { rank: "order", name: "Carnivora" },
  ],
  default_photo: {
    medium_url: "https://example.test/panda.jpg",
    license_code: "cc-by",
  },
});
assert.equal(record.commonName, "Red Panda");
assert.equal(record.taxonomy.className, "Mammalia");
assert.equal(record.taxonomy.order, "Carnivora");
assert.equal(record.source, "iNaturalist");
assert.match(record.iNaturalistUrl ?? "", /41689/);

console.log("iNaturalist adapter tests passed");
