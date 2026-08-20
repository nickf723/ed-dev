import { astronomyVocab } from "@/app/_data/vocab/a/astronomy";
import { planetaryAstronomyVocab } from "@/app/_data/vocab/natural-science/astronomy/planetary-astronomy";
import type { VocabTerm } from "@/app/_data/vocab/types";

export type AstronomyVocabularyRegistration = {
  nodeId: string;
  label: string;
  terms: readonly VocabTerm[];
};

export const ASTRONOMY_VOCABULARY_REGISTRATIONS: readonly AstronomyVocabularyRegistration[] =
  [
    {
      nodeId: "natural.astronomy",
      label: "Astronomy",
      terms: astronomyVocab,
    },
    {
      nodeId: "natural.astronomy.planetary",
      label: "Planetary Astronomy",
      terms: planetaryAstronomyVocab,
    },
  ];
