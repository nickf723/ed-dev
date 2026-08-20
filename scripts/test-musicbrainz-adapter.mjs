import assert from "node:assert/strict";
import {
  buildMusicBrainzSearchQuery,
  normalizeMusicBrainzReleaseGroup,
} from "../lib/collections/providers/musicbrainz.mjs";

assert.equal(
  buildMusicBrainzSearchQuery('AC/DC "Live"'),
  'releasegroup:"AC/DC \\"Live\\"" OR artist:"AC/DC \\"Live\\""',
  "artist-or-album searches should escape quoted phrases",
);

assert.throws(
  () => buildMusicBrainzSearchQuery("   "),
  /non-empty phrase/,
  "empty provider queries should be rejected",
);

const record = normalizeMusicBrainzReleaseGroup({
  id: "48140466-cff6-3222-bd55-63c27e43190d",
  title: "Example Album",
  "first-release-date": "1998-03-17",
  "primary-type": "Album",
  "secondary-types": ["Compilation", "Live"],
  "artist-credit": [
    { name: "Artist One", joinphrase: " feat. " },
    { artist: { name: "Artist Two" } },
  ],
});

assert.equal(record.primaryCreator, "Artist One feat. Artist Two");
assert.equal(record.year, "1998");
assert.deepEqual(record.tags, ["Album", "Compilation", "Live"]);
assert.equal(record.facts.secondaryTypes, "Compilation, Live");
assert.equal(record.sources.length, 2);
assert.equal(record.sources[0].kind, "provider");
assert.match(record.imageUrl ?? "", /coverartarchive\.org\/release-group/);

assert.equal(
  normalizeMusicBrainzReleaseGroup({ id: "missing-credit" }).primaryCreator,
  "Unknown artist",
  "missing artist credits should remain honest",
);

console.log("MusicBrainz adapter tests passed");
