export const MUSICBRAINZ_SOURCE = Object.freeze({
  label: "MusicBrainz Web Service",
  url: "https://musicbrainz.org/doc/MusicBrainz_API",
  kind: "provider",
  scope: "Release-group search totals, artist credits, types, and first-release dates",
});

export const COVER_ART_ARCHIVE_SOURCE = Object.freeze({
  label: "Cover Art Archive",
  url: "https://musicbrainz.org/doc/Cover_Art_Archive/API",
  kind: "provider",
  scope: "Community-curated front images for MusicBrainz release groups",
});

/**
 * Search both the release-group title and credited artist fields. An unqualified
 * MusicBrainz release-group search only targets release-group names, which does
 * not match the library's artist-or-album search contract.
 */
export function buildMusicBrainzSearchQuery(value) {
  const phrase = String(value).trim();
  if (!phrase) throw new Error("MusicBrainz search requires a non-empty phrase");
  const escaped = phrase.replace(/([\\"])/g, "\\$1");
  return `releasegroup:"${escaped}" OR artist:"${escaped}"`;
}

export function normalizeMusicBrainzReleaseGroup(group) {
  if (!group?.id) throw new Error("MusicBrainz release group requires an id");

  const title = clean(group.title) ?? "Untitled release group";
  const artist = formatArtistCredit(group["artist-credit"]);
  const primaryType = clean(group["primary-type"]) ?? "Release group";
  const secondaryTypes = (group["secondary-types"] ?? []).map(clean).filter(Boolean);
  const date = clean(group["first-release-date"]);

  return {
    id: group.id,
    title,
    subtitle: primaryType,
    description: `${title} is a ${primaryType.toLocaleLowerCase()} release group credited to ${artist}. MusicBrainz uses one release group to connect editions and releases that represent the same underlying musical release.`,
    imageUrl: `https://coverartarchive.org/release-group/${group.id}/front-250`,
    year: date?.slice(0, 4),
    primaryCreator: artist,
    tags: [primaryType, ...secondaryTypes],
    facts: {
      firstRelease: date,
      primaryType,
      secondaryTypes: secondaryTypes.length ? secondaryTypes.join(", ") : undefined,
      artist,
      musicBrainzId: group.id,
    },
    sources: [
      {
        label: "MusicBrainz release-group record",
        url: `https://musicbrainz.org/release-group/${group.id}`,
        kind: "provider",
        scope: "Release-group identity, artist credit, type, and first-release date",
      },
      {
        label: "Cover Art Archive release-group record",
        url: `https://coverartarchive.org/release-group/${group.id}`,
        kind: "provider",
        scope: "Front-cover image when available",
      },
    ],
  };
}

function formatArtistCredit(credits = []) {
  if (!credits.length) return "Unknown artist";
  const result = credits.reduce((text, credit, index) => {
    const name = clean(credit.name) ?? clean(credit.artist?.name);
    if (!name) return text;
    const fallbackJoin = index < credits.length - 1 ? ", " : "";
    return `${text}${name}${credit.joinphrase ?? fallbackJoin}`;
  }, "").trim();
  return result || "Unknown artist";
}

function clean(value) {
  const result = typeof value === "string" ? value.trim() : "";
  return result || undefined;
}
