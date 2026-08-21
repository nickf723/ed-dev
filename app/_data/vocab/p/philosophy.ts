import type { VocabTerm } from "../types";

export const philosophyVocab: VocabTerm[] = [
  {
    id: "philosophy-question",
    word: "Philosophical Question",
    definition:
      "A question about reality, knowledge, mind, value, action, meaning, or justification whose answer requires conceptual clarification and reasons rather than a lookup alone.",
    domain: "Philosophy",
    tags: ["Inquiry", "Concepts"],
    relatedTerms: ["philosophy-position", "philosophy-argument"],
    isAdult: false,
  },
  {
    id: "philosophy-position",
    word: "Position",
    definition:
      "A proposed answer or organized set of commitments concerning a philosophical question.",
    domain: "Philosophy",
    tags: ["Claim", "Inquiry"],
    relatedTerms: ["philosophy-proposition", "philosophy-objection"],
    isAdult: false,
  },
  {
    id: "philosophy-proposition",
    word: "Proposition",
    definition:
      "The content expressed by a declarative claim that can be evaluated as true or false, independently of the particular sentence used to express it.",
    domain: "Philosophy",
    tags: ["Meaning", "Logic"],
    relatedTerms: ["philosophy-premise", "philosophy-conclusion"],
    isAdult: false,
  },
  {
    id: "philosophy-argument",
    word: "Argument",
    definition:
      "A structured set of claims in which premises are offered as reasons intended to support a conclusion.",
    domain: "Philosophy",
    tags: ["Reasoning", "Structure"],
    relatedTerms: ["philosophy-premise", "philosophy-conclusion"],
    isAdult: false,
  },
  {
    id: "philosophy-premise",
    word: "Premise",
    definition:
      "A claim offered as a reason within an argument, whose relevance, truth, and role in the inference can be evaluated separately.",
    domain: "Philosophy",
    tags: ["Argument", "Reason"],
    relatedTerms: ["philosophy-argument", "philosophy-conclusion"],
    isAdult: false,
  },
  {
    id: "philosophy-conclusion",
    word: "Conclusion",
    definition: "The claim an argument's premises are intended to support.",
    domain: "Philosophy",
    tags: ["Argument", "Inference"],
    relatedTerms: ["philosophy-premise", "philosophy-validity"],
    isAdult: false,
  },
  {
    id: "philosophy-validity",
    word: "Validity",
    definition:
      "The property of a deductive argument whereby it is impossible for all its premises to be true while its conclusion is false.",
    domain: "Philosophy",
    tags: ["Argument", "Deduction"],
    relatedTerms: ["philosophy-soundness", "philosophy-conclusion"],
    isAdult: false,
  },
  {
    id: "philosophy-soundness",
    word: "Soundness",
    definition:
      "The property of a deductive argument that is valid and has true premises.",
    domain: "Philosophy",
    tags: ["Argument", "Truth"],
    relatedTerms: ["philosophy-validity", "philosophy-premise"],
    isAdult: false,
  },
  {
    id: "philosophy-objection",
    word: "Objection",
    definition:
      "A reasoned challenge targeting a claim, premise, inference, definition, assumption, implication, or framing within a position.",
    domain: "Philosophy",
    tags: ["Dialectic", "Critique"],
    relatedTerms: ["philosophy-counterexample", "philosophy-position"],
    isAdult: false,
  },
  {
    id: "philosophy-counterexample",
    word: "Counterexample",
    definition:
      "A case that satisfies a claim's relevant conditions while failing its stated result, thereby refuting or limiting the claim.",
    domain: "Philosophy",
    tags: ["Testing", "Quantifier"],
    relatedTerms: ["philosophy-objection", "philosophy-sufficient-condition"],
    isAdult: false,
  },
  {
    id: "philosophy-necessary-condition",
    word: "Necessary Condition",
    definition:
      "A condition that must hold for another condition or claim to hold, even though it may not be enough by itself.",
    domain: "Philosophy",
    tags: ["Concepts", "Conditional"],
    relatedTerms: ["philosophy-sufficient-condition"],
    isAdult: false,
  },
  {
    id: "philosophy-sufficient-condition",
    word: "Sufficient Condition",
    definition:
      "A condition whose satisfaction guarantees another condition or result, though it may not be required for that result.",
    domain: "Philosophy",
    tags: ["Concepts", "Conditional"],
    relatedTerms: ["philosophy-necessary-condition"],
    isAdult: false,
  },
];
