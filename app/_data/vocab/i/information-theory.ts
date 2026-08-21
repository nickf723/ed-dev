import type { VocabTerm } from "../types";

export const informationTheoryVocab: VocabTerm[] = [
  { id: "fs-entropy", word: "Entropy", definition: "The expected information or uncertainty of outcomes under a stated probability distribution, measured in bits when logarithms use base two.", domain: "Information Theory", tags: ["Uncertainty", "Probability"], relatedTerms: ["info-code", "info-redundancy"], isAdult: false },
  { id: "info-code", word: "Code", definition: "A rule that maps source symbols or messages to codewords for representation, storage, or transmission.", domain: "Information Theory", tags: ["Mapping", "Symbols"], relatedTerms: ["info-encoding"], isAdult: false },
  { id: "info-channel", word: "Channel", definition: "A mathematical or physical pathway through which a signal is transmitted and may be altered by noise.", domain: "Information Theory", tags: ["Communication", "Model"], relatedTerms: ["info-noise"], isAdult: false },
  { id: "info-noise", word: "Noise", definition: "Unwanted or uncertain variation that changes a signal or reduces confidence about what was transmitted.", domain: "Information Theory", tags: ["Channel", "Uncertainty"], relatedTerms: ["info-channel", "info-redundancy"], isAdult: false },
  { id: "info-redundancy", word: "Redundancy", definition: "Predictable or repeated structure that can support compression or help recover information after errors.", domain: "Information Theory", tags: ["Coding", "Error Correction"], relatedTerms: ["info-compression"], isAdult: false },
  { id: "info-compression", word: "Compression", definition: "The representation of information using fewer bits, either without loss or by accepting a defined loss of detail.", domain: "Information Theory", tags: ["Coding", "Storage"], relatedTerms: ["info-redundancy"], isAdult: false },
  { id: "info-mutual-information", word: "Mutual Information", definition: "A measure of how much observing one random variable reduces uncertainty about another.", domain: "Information Theory", tags: ["Dependence", "Uncertainty"], relatedTerms: ["fs-entropy"], isAdult: false },
];
