import {
  astronomicalMethodsVocab,
  cosmologyVocab,
  extragalacticAstronomyVocab,
  galacticAstronomyVocab,
  stellarAstronomyVocab,
} from "./a/astronomy-branches";
import { astronomyVocab } from "./a/astronomy";
import { planetaryAstronomyVocab } from "./natural-science/astronomy/planetary-astronomy";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

export const ASTRONOMY_VOCABULARY_REGISTRATIONS = [
  { nodeId: "natural.astronomy", terms: astronomyVocab },
  {
    nodeId: "natural.astronomy.planetary",
    terms: planetaryAstronomyVocab,
  },
  { nodeId: "natural.astronomy.stellar", terms: stellarAstronomyVocab },
  { nodeId: "natural.astronomy.galactic", terms: galacticAstronomyVocab },
  {
    nodeId: "natural.astronomy.extragalactic",
    terms: extragalacticAstronomyVocab,
  },
  { nodeId: "natural.astronomy.cosmology", terms: cosmologyVocab },
  { nodeId: "natural.astronomy.methods", terms: astronomicalMethodsVocab },
] as const satisfies readonly NodeVocabularyRegistration[];
