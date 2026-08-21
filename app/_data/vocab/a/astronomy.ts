import type { VocabTerm } from "../types";

export const astronomyVocab: VocabTerm[] = [
  {
    id: "astro-astronomy",
    word: "Astronomy",
    definition:
      "The natural science that studies objects and phenomena beyond Earth by measuring arriving signals and testing physical models across cosmic scales.",
    domain: "Astronomy",
    tags: ["Natural Science", "Observation"],
    relatedTerms: ["astro-messenger", "astro-physical-model"],
    isAdult: false,
  },
  {
    id: "astro-messenger",
    word: "Astronomical Messenger",
    definition:
      "A carrier of information from an astronomical source, such as electromagnetic radiation, gravitational waves, neutrinos, or cosmic rays.",
    domain: "Astronomy",
    tags: ["Evidence", "Multi-Messenger Astronomy"],
    relatedTerms: ["astro-electromagnetic-spectrum"],
    isAdult: false,
  },
  {
    id: "astro-electromagnetic-spectrum",
    word: "Electromagnetic Spectrum",
    definition:
      "The full range of electromagnetic radiation ordered by wavelength or frequency, from radio waves through visible light to gamma rays.",
    domain: "Astronomy",
    tags: ["Radiation", "Measurement"],
    relatedTerms: ["astro-messenger", "astro-methods-observation"],
    isAdult: false,
  },
  {
    id: "astro-light-year",
    word: "Light-Year",
    definition:
      "A unit of distance equal to how far light travels in vacuum in one Julian year, not a unit of time.",
    domain: "Astronomy",
    tags: ["Distance", "Light"],
    relatedTerms: ["astro-lookback-time"],
    isAdult: false,
  },
  {
    id: "astro-lookback-time",
    word: "Lookback Time",
    definition:
      "The elapsed time between the emission of an observed signal and its reception, so greater lookback time reveals an earlier state of the source.",
    domain: "Astronomy",
    tags: ["Time", "Observation"],
    relatedTerms: ["astro-light-year"],
    isAdult: false,
  },
  {
    id: "astro-redshift",
    word: "Redshift",
    definition:
      "A shift of spectral features toward longer wavelengths, quantified by comparing an observed wavelength with its reference wavelength; its physical interpretation depends on context and model.",
    domain: "Astronomy",
    tags: ["Spectroscopy", "Measurement"],
    relatedTerms: ["astro-methods-observation", "astro-cosmology-expansion"],
    isAdult: false,
  },
];
