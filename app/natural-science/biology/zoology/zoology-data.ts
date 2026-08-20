import { SPECIES_A } from "./species-a";
import { SPECIES_B } from "./species-b";
import { SPECIES_C } from "./species-c";
import { ZOOLOGY_COLLECTIONS, ZOOLOGY_LENSES } from "./zoology-collections";
export * from "./zoology-types";
export { ZOOLOGY_COLLECTIONS, ZOOLOGY_LENSES };

export const ANIMAL_SEEDS = [...SPECIES_A, ...SPECIES_B, ...SPECIES_C];
export const ANIMAL_SEED_BY_ID = new Map(ANIMAL_SEEDS.map((item) => [item.id, item]));
export const ZOOLOGY_COLLECTION_BY_ID = new Map(ZOOLOGY_COLLECTIONS.map((item) => [item.id, item]));

export function collectionsForSpecies(speciesId: string) {
  return ZOOLOGY_COLLECTIONS.filter((collection) => collection.speciesIds.includes(speciesId));
}
