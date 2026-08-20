export type ZoologyLens = "habitat" | "lineage" | "ecology";
export type ZoologyEnvironment =
  | "canopy" | "open" | "arid" | "polar" | "marine" | "wetland"
  | "alpine" | "forest" | "reef" | "taxonomy" | "network";
export type AnimalDiet =
  | "carnivore" | "herbivore" | "omnivore" | "insectivore"
  | "filter feeder" | "detritivore";
export type AnimalActivity =
  | "diurnal" | "nocturnal" | "crepuscular" | "cathemeral" | "variable";

export type AnimalSeed = {
  id: string;
  commonName: string;
  scientificName: string;
  phylum: string;
  className: string;
  order: string;
  family: string;
  habitats: string[];
  regions: string[];
  diet: AnimalDiet;
  ecologicalRoles: string[];
  activity: AnimalActivity;
  traits: string[];
  summary: string;
};

export type ZoologyCollection = {
  id: string;
  lens: ZoologyLens;
  label: string;
  question: string;
  description: string;
  icon: string;
  accentRgb: string;
  environment: ZoologyEnvironment;
  speciesIds: string[];
};

export type TaxonomyProfile = {
  kingdom: string;
  phylum?: string;
  className?: string;
  order?: string;
  family?: string;
};

export type AnimalRecord = {
  id: number | string;
  seedId?: string;
  commonName: string;
  scientificName: string;
  rank: string;
  iconicTaxonName?: string;
  taxonomy: TaxonomyProfile;
  summary: string;
  imageUrl?: string;
  imageAttribution?: string;
  imageLicense?: string;
  observationsCount?: number;
  conservationStatus?: string;
  conservationAuthority?: string;
  wikipediaUrl?: string;
  iNaturalistUrl?: string;
  habitats: string[];
  regions: string[];
  diet?: AnimalDiet;
  ecologicalRoles: string[];
  activity?: AnimalActivity;
  traits: string[];
  collectionIds: string[];
  source: "iNaturalist" | "curated";
};

export type ZoologyLensDefinition = {
  id: ZoologyLens;
  label: string;
  question: string;
  description: string;
  icon: string;
};

export function animalSeed(input: Omit<AnimalSeed, "id"> & { id?: string }): AnimalSeed {
  return {
    ...input,
    id: input.id ?? input.scientificName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
  };
}
