import "server-only";

import { computerScienceVocab } from "./c/computer-science";
import { dataScienceVocab } from "./d/data-science";
import { firstOrderVocab } from "./f/first-order-logic";
import { formalScienceVocab } from "./f/formal-science";
import { formalScienceLocalVocab } from "./f/formal-science-local";
import { informationScienceVocab } from "./i/information-science";
import { logicVocab } from "./l/logic";
import { naturalScienceVocab } from "./n/natural-science";
import { biologyVocab } from "./natural-science/biology";
import { chemistryVocab } from "./c/chemistry";
import { physicsVocab } from "./p/physics";
import { propLogicVocab } from "./p/propositional-logic";
import { systemsScienceVocab } from "./s/systems-science";
import { ASTRONOMY_VOCABULARY_REGISTRATIONS } from "./astronomy-node-registry";
import { EARTH_SCIENCE_VOCABULARY_REGISTRATIONS } from "./earth-science-node-registry";
import { LITERATURE_VOCABULARY_REGISTRATIONS } from "./literature-node-registry";
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
  legacyVocabularyByDomain("Formal Logic")
);

const mathematicsNode = curriculumRegistry.getNode("formal.mathematics");
if (!mathematicsNode) {
  throw new Error(
    "Mathematics curriculum node is required for vocabulary scopes"
  );
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
  (scope) => scope.path === mathematicsNode.href
);
if (!mathematicsScope) {
  throw new Error("Mathematics vocabulary scope could not be derived");
}

const mathematicsVocabulary = composeVocabulary(
  ...mathematicsScope.groups.map((group) => group.terms)
);

const computerScienceVocabulary = composeVocabulary(
  computerScienceVocab,
  legacyVocabularyByDomain(
    "Computer Science",
    "Theory of Computation",
    "Cryptography"
  )
);

const informationScienceVocabulary = composeVocabulary(
  informationScienceVocab,
  legacyVocabularyByDomain("Information Science")
);

const dataScienceVocabulary = composeVocabulary(
  dataScienceVocab,
  legacyVocabularyByDomain("Statistics", "Data Science")
);

const systemsScienceVocabulary = composeVocabulary(
  systemsScienceVocab,
  legacyVocabularyByDomain("Systems Science")
);

const astronomyNode = curriculumRegistry.getNode("natural.astronomy");
if (!astronomyNode) {
  throw new Error(
    "Astronomy curriculum node is required for vocabulary scopes"
  );
}

const astronomyVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [astronomyNode],
  registrations: ASTRONOMY_VOCABULARY_REGISTRATIONS,
  accent: "cyan",
});

const astronomyScope = astronomyVocabularyScopes.find(
  (scope) => scope.path === astronomyNode.href
);
if (!astronomyScope) {
  throw new Error("Astronomy vocabulary scope could not be derived");
}

const astronomyVocabulary = composeVocabulary(
  ...astronomyScope.groups.map((group) => group.terms)
);

const earthScienceNode = curriculumRegistry.getNode("natural.earth-science");
if (!earthScienceNode) {
  throw new Error(
    "Earth Science curriculum node is required for vocabulary scopes"
  );
}

const earthScienceVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [earthScienceNode],
  registrations: EARTH_SCIENCE_VOCABULARY_REGISTRATIONS,
  accent: "violet",
  accentByNodeId: {
    "natural.earth-science": "cyan",
  },
});

const earthScienceScope = earthScienceVocabularyScopes.find(
  (scope) => scope.path === earthScienceNode.href
);
if (!earthScienceScope) {
  throw new Error("Earth Science vocabulary scope could not be derived");
}

const earthScienceVocabulary = composeVocabulary(
  ...earthScienceScope.groups.map((group) => group.terms)
);

const literatureNode = curriculumRegistry.getNode("humanities.literature");
if (!literatureNode) {
  throw new Error(
    "Literature curriculum node is required for vocabulary scopes"
  );
}

const literatureVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [literatureNode],
  registrations: LITERATURE_VOCABULARY_REGISTRATIONS,
  accent: "amber",
  accentByNodeId: {
    "humanities.literature.narrative-fiction": "rose",
  },
});

export const humanitiesVocabularyScopes: VocabularyScope[] = [
  ...literatureVocabularyScopes,
];

export const naturalScienceVocabularyScopes: VocabularyScope[] = [
  ...astronomyVocabularyScopes,
  ...earthScienceVocabularyScopes,
  {
    path: "/natural-science",
    title: "Natural Science",
    accent: "emerald",
    groups: [
      {
        id: "natural-science",
        label: "Natural Science",
        terms: naturalScienceVocab,
      },
      { id: "physics", label: "Physics", terms: physicsVocab },
      { id: "chemistry", label: "Chemistry", terms: chemistryVocab },
      { id: "biology", label: "Biology", terms: biologyVocab },
      {
        id: "earth-science",
        label: "Earth Science",
        terms: earthScienceVocabulary,
        sourceNodeId: earthScienceNode.id,
        sourcePath: earthScienceNode.href,
      },
      {
        id: "astronomy",
        label: "Astronomy",
        terms: astronomyVocabulary,
        sourceNodeId: astronomyNode.id,
        sourcePath: astronomyNode.href,
      },
    ],
  },
];

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
      {
        id: "data-science",
        label: "Data Science",
        terms: dataScienceVocabulary,
      },
      {
        id: "systems-science",
        label: "Systems Science",
        terms: systemsScienceVocabulary,
      },
    ],
  },
];
