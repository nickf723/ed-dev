export const INATURALIST_SOURCE = Object.freeze({
  label: "iNaturalist taxa API",
  url: "https://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa",
  kind: "provider",
  scope:
    "Taxon identity, ancestry, conservation context, observation counts, and licensed photos",
});

export const ZOOLOGY_CURATED_SOURCE = Object.freeze({
  label: "Education Station 64 zoology atlas",
  kind: "curated",
  scope:
    "Habitat, region, diet, activity, traits, ecological roles, and teaching collections",
});

export function buildINaturalistTaxaUrl(query, perPage = 18) {
  const phrase = String(query).trim();
  if (!phrase)
    throw new Error("iNaturalist taxon search requires a non-empty phrase");
  const size = Math.min(
    30,
    Math.max(1, Number.parseInt(String(perPage), 10) || 18)
  );
  const url = new URL("https://api.inaturalist.org/v1/taxa");
  url.searchParams.set("q", phrase);
  url.searchParams.set("taxon_id", "1");
  url.searchParams.set("rank", "species");
  url.searchParams.set("is_active", "true");
  url.searchParams.set("locale", "en");
  url.searchParams.set("per_page", String(size));
  return url;
}

export function normalizeINaturalistTaxon(taxon, seed, collectionIds = []) {
  if (!Number.isInteger(taxon?.id))
    throw new Error("iNaturalist taxon requires a numeric id");
  const commonName =
    clean(taxon.preferred_common_name) ??
    seed?.commonName ??
    clean(taxon.name) ??
    "Unknown animal";
  const scientificName =
    clean(taxon.name) ?? seed?.scientificName ?? commonName;
  const conservation = taxon.conservation_status;

  return {
    id: taxon.id,
    seedId: seed?.id,
    commonName,
    scientificName,
    rank: clean(taxon.rank) ?? "species",
    iconicTaxonName: clean(taxon.iconic_taxon_name) ?? seed?.className,
    taxonomy: {
      kingdom: "Animalia",
      phylum: seed?.phylum ?? ancestorAtRank(taxon, "phylum"),
      className:
        seed?.className ??
        ancestorAtRank(taxon, "class") ??
        clean(taxon.iconic_taxon_name),
      order: seed?.order ?? ancestorAtRank(taxon, "order"),
      family: seed?.family ?? ancestorAtRank(taxon, "family"),
    },
    summary:
      clean(taxon.wikipedia_summary) ??
      seed?.summary ??
      `A species in the animal kingdom: ${scientificName}.`,
    imageUrl: photoUrl(taxon.default_photo),
    imageAttribution: clean(taxon.default_photo?.attribution),
    imageLicense: clean(taxon.default_photo?.license_code),
    observationsCount: Number.isFinite(taxon.observations_count)
      ? taxon.observations_count
      : undefined,
    conservationStatus:
      clean(conservation?.status_name) ??
      clean(conservation?.status)?.toUpperCase(),
    conservationAuthority: clean(conservation?.authority),
    wikipediaUrl: clean(taxon.wikipedia_url),
    iNaturalistUrl: `https://www.inaturalist.org/taxa/${taxon.id}`,
    habitats: seed?.habitats ?? [],
    regions: seed?.regions ?? [],
    diet: seed?.diet,
    ecologicalRoles: seed?.ecologicalRoles ?? [],
    activity: seed?.activity,
    traits: seed?.traits ?? [],
    collectionIds,
    source: "iNaturalist",
  };
}

function ancestorAtRank(taxon, rank) {
  return clean(
    taxon.ancestors?.find((ancestor) => ancestor.rank === rank)?.name
  );
}

function photoUrl(photo) {
  return (
    clean(photo?.medium_url) ??
    clean(photo?.small_url) ??
    clean(photo?.square_url)
  );
}

function clean(value) {
  const result = typeof value === "string" ? value.trim() : "";
  return result || undefined;
}
