import type { VocabTerm } from "../types";

export const politicalScienceVocab: VocabTerm[] = [
  {
    id: "poli-political-science",
    word: "Political Science",
    definition:
      "The systematic study of power, authority, institutions, political behavior, collective choice, public policy, and relations among political actors using normative, historical, comparative, qualitative, quantitative, and formal methods.",
    domain: "Political Science",
    tags: ["Field", "Social Science"],
    relatedTerms: ["poli-power", "poli-collective-choice"],
    isAdult: false,
  },
  {
    id: "poli-power",
    word: "Political Power",
    definition:
      "The capacity to shape decisions, agendas, institutions, resources, information, participation, implementation, or the range of possible actions, whether through command, bargaining, dependence, persuasion, or structural position.",
    domain: "Political Science",
    tags: ["Influence", "Institutions"],
    relatedTerms: ["poli-authority", "poli-hegemony"],
    isAdult: false,
  },
  {
    id: "poli-authority",
    word: "Political Authority",
    definition:
      "A recognized claim or capacity to make, apply, or enforce binding collective decisions within a defined office, jurisdiction, institution, or political order.",
    domain: "Political Science",
    tags: ["Rule", "Institutions"],
    relatedTerms: ["poli-legitimacy", "poli-sovereignty"],
    isAdult: false,
  },
  {
    id: "poli-legitimacy",
    word: "Political Legitimacy",
    definition:
      "The contested justification or social acceptance of political authority, institutions, rules, or decisions as rightful under particular principles, procedures, beliefs, and historical conditions.",
    domain: "Political Science",
    tags: ["Authority", "Justification"],
    relatedTerms: ["poli-authority", "poli-theory-justice"],
    isAdult: false,
  },
  {
    id: "poli-collective-choice",
    word: "Collective Choice",
    definition:
      "A process through which multiple preferences, interests, claims, or votes are combined under stated rules into a decision, policy, representative body, coalition, or other group outcome.",
    domain: "Political Science",
    tags: ["Decision Rules", "Institutions"],
    relatedTerms: ["poli-representation", "poli-institutions-veto-point"],
    isAdult: false,
  },
  {
    id: "poli-representation",
    word: "Political Representation",
    definition:
      "A relationship or institutional arrangement through which actors claim or are authorized to speak, decide, advocate, symbolize, or act for others and may be held accountable for doing so.",
    domain: "Political Science",
    tags: ["Elections", "Accountability"],
    relatedTerms: ["poli-collective-choice", "poli-gerrymandering"],
    isAdult: false,
  },
];
