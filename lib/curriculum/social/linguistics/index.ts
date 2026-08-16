import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "social",
    status,
    pageKind: children?.length ? "hub" : "unit",
    children,
  };
}

export const LINGUISTICS_CURRICULUM: CurriculumNode = {
  id: "social.linguistics",
  label: "Linguistics",
  href: "/social-science/linguistics",
  description:
    "The scientific study of language structure, processing, acquisition, variation, social use, and change.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    node(
      "social.linguistics.structure",
      "Language Structure",
      "/social-science/linguistics/structure",
      "The compositional organization of speech sounds, sound systems, words, phrases, sentences, meanings, and context-sensitive interpretation.",
      [
        node("social.linguistics.structure.phonetics", "Phonetics", "/social-science/linguistics/phonetics", "How speech sounds are produced, transmitted acoustically, and perceived."),
        node("social.linguistics.structure.phonology", "Phonology", "/social-science/linguistics/phonology", "How languages organize speech sounds and sign features into contrastive patterns and phonological systems.", undefined, "active"),
        node("social.linguistics.structure.morphology", "Morphology", "/social-science/linguistics/morphology", "How meaningful units combine inside words and how languages encode grammatical information morphologically."),
        node("social.linguistics.structure.syntax", "Syntax", "/social-science/linguistics/syntax", "How words and phrases combine into hierarchical sentence structures and how grammatical relationships are represented."),
        node("social.linguistics.structure.semantics", "Semantics", "/social-science/linguistics/semantics", "Conventional meaning in words, phrases, sentences, reference, entailment, ambiguity, and composition."),
        node("social.linguistics.structure.pragmatics", "Pragmatics", "/social-science/linguistics/pragmatics", "How context, intention, shared knowledge, discourse, and inference shape what utterances communicate."),
      ],
      "active",
    ),
    node(
      "social.linguistics.psycholinguistics",
      "Psycholinguistics",
      "/social-science/linguistics/psycholinguistics",
      "How language is represented and processed in perception, production, comprehension, memory, and cognition.",
    ),
    node(
      "social.linguistics.sociolinguistics",
      "Sociolinguistics",
      "/social-science/linguistics/sociolinguistics",
      "How language varies across communities, identities, situations, networks, institutions, power, and social change.",
    ),
    node(
      "social.linguistics.historical",
      "Historical Linguistics",
      "/social-science/linguistics/historical",
      "How languages change over time, diverge into families, borrow from one another, and can be reconstructed from systematic correspondences.",
    ),
    node(
      "social.linguistics.acquisition",
      "Language Acquisition",
      "/social-science/linguistics/acquisition",
      "How children and adults acquire sound systems, vocabulary, grammar, meaning, and communicative competence from experience and interaction.",
    ),
  ],
};
