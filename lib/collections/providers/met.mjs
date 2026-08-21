export const MET_COLLECTION_SOURCE = Object.freeze({
  label: "The Metropolitan Museum of Art Collection API",
  url: "https://metmuseum.github.io/",
  kind: "provider",
  scope: "Search totals, object metadata, and Open Access images",
});

const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export function buildMetSearchUrl(value) {
  const query = String(value).trim();
  if (!query) throw new Error("The Met search requires a non-empty query");

  const url = new URL(`${MET_BASE}/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("hasImages", "true");
  return url.toString();
}

export function buildMetObjectUrl(id) {
  const objectId = Number(id);
  if (!Number.isInteger(objectId) || objectId <= 0) {
    throw new Error("The Met object request requires a positive integer id");
  }
  return `${MET_BASE}/objects/${objectId}`;
}

export function normalizeMetObject(object) {
  if (!Number.isInteger(object?.objectID) || object.objectID <= 0) {
    throw new Error(
      "The Met object record requires a positive integer objectID"
    );
  }

  const creator =
    clean(object.artistDisplayName) || clean(object.culture) || "Unknown maker";
  const title =
    clean(object.title) ||
    clean(object.objectName) ||
    `Object ${object.objectID}`;
  const place = [object.city, object.region, object.country]
    .map(clean)
    .filter(Boolean)
    .join(", ");
  const tags = [
    clean(object.classification),
    clean(object.objectName),
    ...(object.tags ?? []).map((tag) => clean(tag.term)),
  ]
    .filter(Boolean)
    .slice(0, 8);

  return {
    id: String(object.objectID),
    title,
    subtitle: clean(object.objectName) || clean(object.classification),
    primaryCreator: creator,
    year:
      clean(object.objectDate) ||
      yearRange(object.objectBeginDate, object.objectEndDate),
    description: objectDescription(object, creator, place),
    imageUrl: clean(object.primaryImageSmall) || clean(object.primaryImage),
    tags,
    facts: {
      objectName: clean(object.objectName),
      department: clean(object.department),
      culture: clean(object.culture),
      period: clean(object.period),
      dynasty: clean(object.dynasty),
      reign: clean(object.reign),
      artist: creator !== "Unknown maker" ? creator : undefined,
      artistRole: clean(object.artistRole),
      artistBio: clean(object.artistDisplayBio),
      date: clean(object.objectDate),
      medium: clean(object.medium),
      dimensions: clean(object.dimensions),
      classification: clean(object.classification),
      place: place || undefined,
      creditLine: clean(object.creditLine),
      gallery: clean(object.GalleryNumber),
      publicDomain: object.isPublicDomain
        ? "Yes · CC0 image"
        : "Not marked public domain",
      metadataUpdated: clean(object.metadataDate),
    },
    sources: [
      {
        label: "The Met object record",
        url:
          clean(object.objectURL) ||
          `https://www.metmuseum.org/art/collection/search/${object.objectID}`,
        kind: "provider",
        scope: "Object metadata and image attribution",
      },
    ],
  };
}

function objectDescription(object, creator, place) {
  const pieces = [
    clean(object.objectName),
    creator !== "Unknown maker" ? `by ${creator}` : undefined,
    clean(object.objectDate),
    clean(object.culture),
    place ? `associated with ${place}` : undefined,
    clean(object.medium) ? `made with ${clean(object.medium)}` : undefined,
  ].filter(Boolean);
  return pieces.length ? `${pieces.join(" · ")}.` : "Museum collection object.";
}

function clean(value) {
  const result = typeof value === "string" ? value.trim() : "";
  return result || undefined;
}

function yearRange(begin, end) {
  if (!begin && !end) return undefined;
  if (begin === end || !end) return String(begin);
  if (!begin) return String(end);
  return `${begin}–${end}`;
}
