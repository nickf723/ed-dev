import "server-only";

import { computerScienceVocab } from "./c/computer-science";
import { firstOrderVocab } from "./f/first-order-logic";
import { formalScienceVocab } from "./f/formal-science";
import { formalScienceLocalVocab } from "./f/formal-science-local";
import { informationScienceVocab } from "./i/information-science";
import { logicVocab } from "./l/logic";
import { naturalScienceVocab } from "./n/natural-science";
import { chemistryVocab } from "./c/chemistry";
import { physicsVocab } from "./p/physics";
import { propLogicVocab } from "./p/propositional-logic";
import { systemsScienceVocab } from "./s/systems-science";
import { ASTRONOMY_VOCABULARY_REGISTRATIONS } from "./astronomy-node-registry";
import { BIOLOGY_VOCABULARY_REGISTRATIONS } from "./biology-node-registry";
import { EARTH_SCIENCE_VOCABULARY_REGISTRATIONS } from "./earth-science-node-registry";
import { LITERATURE_VOCABULARY_REGISTRATIONS } from "./literature-node-registry";
import { VISUAL_ARTS_VOCABULARY_REGISTRATIONS } from "./visual-arts-node-registry";
import { DATA_SCIENCE_VOCABULARY_REGISTRATIONS } from "./data-science-node-registry";
import { MEDICINE_VOCABULARY_REGISTRATIONS } from "./medicine-node-registry";
import { GEOGRAPHY_VOCABULARY_REGISTRATIONS } from "./geography-node-registry";
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

const systemsScienceVocabulary = composeVocabulary(
  systemsScienceVocab,
  legacyVocabularyByDomain("Systems Science")
);

const biologyNode = curriculumRegistry.getNode("natural.biology");
if (!biologyNode) {
  throw new Error("Biology curriculum node is required for vocabulary scopes");
}

const biologyVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [biologyNode],
  registrations: BIOLOGY_VOCABULARY_REGISTRATIONS,
  accent: "emerald",
});

const biologyScope = biologyVocabularyScopes.find(
  (scope) => scope.path === biologyNode.href
);
if (!biologyScope) {
  throw new Error("Biology vocabulary scope could not be derived");
}

const biologyVocabulary = composeVocabulary(
  ...biologyScope.groups.map((group) => group.terms)
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

const literatureScope = literatureVocabularyScopes.find(
  (scope) => scope.path === literatureNode.href
);
if (!literatureScope) {
  throw new Error("Literature vocabulary scope could not be derived");
}

const literatureVocabulary = composeVocabulary(
  ...literatureScope.groups.map((group) => group.terms)
);

const visualArtsNode = curriculumRegistry.getNode("humanities.visual-arts");
if (!visualArtsNode) {
  throw new Error(
    "Visual Arts curriculum node is required for vocabulary scopes"
  );
}

const visualArtsVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [visualArtsNode],
  registrations: VISUAL_ARTS_VOCABULARY_REGISTRATIONS,
  accent: "amber",
  accentByNodeId: {
    "humanities.visual-arts": "rose",
  },
});

const visualArtsScope = visualArtsVocabularyScopes.find(
  (scope) => scope.path === visualArtsNode.href
);
if (!visualArtsScope) {
  throw new Error("Visual Arts vocabulary scope could not be derived");
}

const visualArtsVocabulary = composeVocabulary(
  ...visualArtsScope.groups.map((group) => group.terms)
);

const dataScienceNode = curriculumRegistry.getNode("formal.data-science");
if (!dataScienceNode) {
  throw new Error(
    "Data Science curriculum node is required for vocabulary scopes"
  );
}

const dataScienceVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [dataScienceNode],
  registrations: DATA_SCIENCE_VOCABULARY_REGISTRATIONS,
  accent: "cyan",
});

const dataScienceScope = dataScienceVocabularyScopes.find(
  (scope) => scope.path === dataScienceNode.href
);
if (!dataScienceScope) {
  throw new Error("Data Science vocabulary scope could not be derived");
}

const dataScienceVocabulary = composeVocabulary(
  ...dataScienceScope.groups.map((group) => group.terms)
);

const medicineNode = curriculumRegistry.getNode("applied.medicine");
if (!medicineNode) {
  throw new Error("Medicine curriculum node is required for vocabulary scopes");
}

const medicineVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [medicineNode],
  registrations: MEDICINE_VOCABULARY_REGISTRATIONS,
  accent: "violet",
  accentByNodeId: {
    "applied.medicine": "emerald",
    "applied.medicine.anatomy-physiology": "rose",
    "applied.medicine.anatomy-physiology.skeletal": "amber",
  },
});

const medicineScope = medicineVocabularyScopes.find(
  (scope) => scope.path === medicineNode.href
);
if (!medicineScope) {
  throw new Error("Medicine vocabulary scope could not be derived");
}

const medicineVocabulary = composeVocabulary(
  ...medicineScope.groups.map((group) => group.terms)
);

const geographyNode = curriculumRegistry.getNode("social.geography");
if (!geographyNode) {
  throw new Error(
    "Geography curriculum node is required for vocabulary scopes"
  );
}

const geographyVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [geographyNode],
  registrations: GEOGRAPHY_VOCABULARY_REGISTRATIONS,
  accent: "sky",
});

const geographyScope = geographyVocabularyScopes.find(
  (scope) => scope.path === geographyNode.href
);
if (!geographyScope) {
  throw new Error("Geography vocabulary scope could not be derived");
}

const geographyVocabulary = composeVocabulary(
  ...geographyScope.groups.map((group) => group.terms)
);

export const humanitiesVocabularyScopes: VocabularyScope[] = [
  ...literatureVocabularyScopes,
  ...visualArtsVocabularyScopes,
  {
    path: "/humanities",
    title: "Humanities",
    accent: "amber",
    groups: [
      {
        id: literatureNode.id,
        label: literatureNode.label,
        terms: literatureVocabulary,
        sourceNodeId: literatureNode.id,
        sourcePath: literatureNode.href,
      },
      {
        id: visualArtsNode.id,
        label: visualArtsNode.label,
        terms: visualArtsVocabulary,
        sourceNodeId: visualArtsNode.id,
        sourcePath: visualArtsNode.href,
      },
    ],
  },
];

export const appliedScienceVocabularyScopes: VocabularyScope[] = [
  ...medicineVocabularyScopes,
  {
    path: "/applied-science",
    title: "Applied Science",
    accent: "violet",
    groups: [
      {
        id: medicineNode.id,
        label: medicineNode.label,
        terms: medicineVocabulary,
        sourceNodeId: medicineNode.id,
        sourcePath: medicineNode.href,
      },
    ],
  },
];

export const socialScienceVocabularyScopes: VocabularyScope[] = [
  ...geographyVocabularyScopes,
  {
    path: "/social-science",
    title: "Social Science",
    accent: "sky",
    groups: [
      {
        id: geographyNode.id,
        label: geographyNode.label,
        terms: geographyVocabulary,
        sourceNodeId: geographyNode.id,
        sourcePath: geographyNode.href,
      },
    ],
  },
];

export const naturalScienceVocabularyScopes: VocabularyScope[] = [
  ...biologyVocabularyScopes,
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
      {
        id: biologyNode.id,
        label: biologyNode.label,
        terms: biologyVocabulary,
        sourceNodeId: biologyNode.id,
        sourcePath: biologyNode.href,
      },
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
  ...dataScienceVocabularyScopes,
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
        id: dataScienceNode.id,
        label: dataScienceNode.label,
        terms: dataScienceVocabulary,
        sourceNodeId: dataScienceNode.id,
        sourcePath: dataScienceNode.href,
      },
      {
        id: "systems-science",
        label: "Systems Science",
        terms: systemsScienceVocabulary,
      },
    ],
  },
];
