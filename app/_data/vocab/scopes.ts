import "server-only";

import { computerScienceVocab } from "./c/computer-science";
import { dataScienceVocab } from "./d/data-science";
import { firstOrderVocab } from "./f/first-order-logic";
import { formalScienceVocab } from "./f/formal-science";
import { formalScienceLocalVocab } from "./f/formal-science-local";
import { informationScienceVocab } from "./i/information-science";
import { logicVocab } from "./l/logic";
import { propLogicVocab } from "./p/propositional-logic";
import { systemsScienceVocab } from "./s/systems-science";
import { buildCurriculumVocabularyScopes } from "./aggregate.mjs";
import { composeVocabulary } from "./compose";
import { MATHEMATICS_VOCABULARY_REGISTRATIONS } from "./mathematics-node-registry";
import type { VocabularyScope } from "./types";
import { curriculumRegistry } from "@/lib/curriculum/registry";

const legacyVocabularyByDomain = (...domains: string[]) => {
  const acceptedDomains = new Set(domains);
  return formalScienceVocab.filter((term) => acceptedDomains.has(term.domain));
};

const logicVocabulary = composeVocabulary(
  logicVocab,
  propLogicVocab,
  firstOrderVocab,
  legacyVocabularyByDomain("Formal Logic"),
);

const mathematicsNode = curriculumRegistry.getNode("formal.mathematics");
if (!mathematicsNode) {
  throw new Error("Mathematics curriculum node is required for vocabulary scopes");
}

const mathematicsVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [mathematicsNode],
  registrations: MATHEMATICS_VOCABULARY_REGISTRATIONS,
  accent: "cyan",
  accentByNodeId: {
    "formal.mathematics.algebra.elementary-algebra.inequalities": "sky",
  },
});

const mathematicsScope = mathematicsVocabularyScopes.find(
  (scope) => scope.path === mathematicsNode.href,
);
if (!mathematicsScope) {
  throw new Error("Mathematics vocabulary scope could not be derived");
}

const mathematicsVocabulary = composeVocabulary(
  ...mathematicsScope.groups.map((group) => group.terms),
);

const computerScienceVocabulary = composeVocabulary(
  computerScienceVocab,
  legacyVocabularyByDomain(
    "Computer Science",
    "Theory of Computation",
    "Cryptography",
  ),
);

const informationScienceVocabulary = composeVocabulary(
  informationScienceVocab,
  legacyVocabularyByDomain("Information Science"),
);

const dataScienceVocabulary = composeVocabulary(
  dataScienceVocab,
  legacyVocabularyByDomain("Statistics", "Data Science"),
);

const systemsScienceVocabulary = composeVocabulary(
  systemsScienceVocab,
  legacyVocabularyByDomain("Systems Science"),
);

export const formalScienceVocabularyScopes: VocabularyScope[] = [
  {
    path: "/formal-science/logic",
    title: "Logic",
    accent: "rose",
    groups: [
      { id: "logic", label: "Logic", terms: logicVocab },
      {
        id: "propositional-logic",
        label: "Propositional Logic",
        terms: propLogicVocab,
      },
      {
        id: "first-order-logic",
        label: "First-Order Logic",
        terms: firstOrderVocab,
      },
      {
        id: "proof-and-deduction",
        label: "Proof and Deduction",
        terms: legacyVocabularyByDomain("Formal Logic"),
      },
    ],
  },
  ...mathematicsVocabularyScopes,
  {
    path: "/formal-science/computer-science",
    title: "Computer Science",
    accent: "violet",
    groups: [
      {
        id: "computer-science",
        label: "Computer Science",
        terms: computerScienceVocabulary,
      },
    ],
  },
  {
    path: "/formal-science/information-science",
    title: "Information Science",
    accent: "sky",
    groups: [
      {
        id: "information-science",
        label: "Information Science",
        terms: informationScienceVocabulary,
      },
    ],
  },
  {
    path: "/formal-science/data-science",
    title: "Data Science",
    accent: "emerald",
    groups: [
      {
        id: "data-science",
        label: "Data Science",
        terms: dataScienceVocabulary,
      },
    ],
  },
  {
    path: "/formal-science/systems-science",
    title: "Systems Science",
    accent: "amber",
    groups: [
      {
        id: "systems-science",
        label: "Systems Science",
        terms: systemsScienceVocabulary,
      },
    ],
  },
  {
    path: "/formal-science",
    title: "Formal Science",
    accent: "rose",
    groups: [
      {
        id: "formal-science",
        label: "Formal Science",
        terms: formalScienceLocalVocab,
      },
      { id: "logic", label: "Logic", terms: logicVocabulary },
      { id: "mathematics", label: "Mathematics", terms: mathematicsVocabulary },
      {
        id: "computer-science",
        label: "Computer Science",
        terms: computerScienceVocabulary,
      },
      {
        id: "information-science",
        label: "Information Science",
        terms: informationScienceVocabulary,
      },
      { id: "data-science", label: "Data Science", terms: dataScienceVocabulary },
      {
        id: "systems-science",
        label: "Systems Science",
        terms: systemsScienceVocabulary,
      },
    ],
  },
];
