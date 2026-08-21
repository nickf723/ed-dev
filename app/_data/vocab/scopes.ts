import "server-only";

import { computerScienceVocab } from "./c/computer-science";
import { firstOrderVocab } from "./f/first-order-logic";
import { formalScienceVocab } from "./f/formal-science";
import { formalScienceLocalVocab } from "./f/formal-science-local";
import { logicVocab } from "./l/logic";
import { naturalScienceVocab } from "./n/natural-science";
import { propLogicVocab } from "./p/propositional-logic";
import { systemsScienceVocab } from "./s/systems-science";
import { ASTRONOMY_VOCABULARY_REGISTRATIONS } from "./astronomy-node-registry";
import { BIOLOGY_VOCABULARY_REGISTRATIONS } from "./biology-node-registry";
import { EARTH_SCIENCE_VOCABULARY_REGISTRATIONS } from "./earth-science-node-registry";
import { LITERATURE_VOCABULARY_REGISTRATIONS } from "./literature-node-registry";
import { VISUAL_ARTS_VOCABULARY_REGISTRATIONS } from "./visual-arts-node-registry";
import { DATA_SCIENCE_VOCABULARY_REGISTRATIONS } from "./data-science-node-registry";
import { MATERIALS_SCIENCE_VOCABULARY_REGISTRATIONS } from "./materials-science-node-registry";
import { MEDICINE_VOCABULARY_REGISTRATIONS } from "./medicine-node-registry";
import { GEOGRAPHY_VOCABULARY_REGISTRATIONS } from "./geography-node-registry";
import { ECONOMICS_VOCABULARY_REGISTRATIONS } from "./economics-node-registry";
import { CHEMISTRY_VOCABULARY_REGISTRATIONS } from "./chemistry-node-registry";
import { MUSIC_VOCABULARY_REGISTRATIONS } from "./music-node-registry";
import { ARCHITECTURE_VOCABULARY_REGISTRATIONS } from "./architecture-node-registry";
import { PSYCHOLOGY_VOCABULARY_REGISTRATIONS } from "./psychology-node-registry";
import { INFORMATION_SCIENCE_VOCABULARY_REGISTRATIONS } from "./information-science-node-registry";
import { HISTORY_VOCABULARY_REGISTRATIONS } from "./history-node-registry";
import { AGRICULTURE_VOCABULARY_REGISTRATIONS } from "./agriculture-node-registry";
import { EDUCATION_VOCABULARY_REGISTRATIONS } from "./education-node-registry";
import { SOCIOLOGY_VOCABULARY_REGISTRATIONS } from "./sociology-node-registry";
import { PHYSICS_VOCABULARY_REGISTRATIONS } from "./physics-node-registry";
import { PHILOSOPHY_VOCABULARY_REGISTRATIONS } from "./philosophy-node-registry";
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

const informationScienceNode = curriculumRegistry.getNode(
  "formal.information-science"
);
if (!informationScienceNode) {
  throw new Error(
    "Information Science curriculum node is required for vocabulary scopes"
  );
}

const informationScienceVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [informationScienceNode],
  registrations: INFORMATION_SCIENCE_VOCABULARY_REGISTRATIONS,
  accent: "sky",
  accentByNodeId: {
    "formal.information-science.taxonomy-ontology": "violet",
  },
});

const informationScienceScope = informationScienceVocabularyScopes.find(
  (scope) => scope.path === informationScienceNode.href
);
if (!informationScienceScope) {
  throw new Error("Information Science vocabulary scope could not be derived");
}

const informationScienceVocabulary = composeVocabulary(
  ...informationScienceScope.groups.map((group) => group.terms)
);

const historyNode = curriculumRegistry.getNode("humanities.history");
if (!historyNode) {
  throw new Error("History curriculum node is required for vocabulary scopes");
}

const historyVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [historyNode],
  registrations: HISTORY_VOCABULARY_REGISTRATIONS,
  accent: "amber",
  accentByNodeId: {
    "humanities.history.regional": "emerald",
    "humanities.history.theme": "violet",
  },
});

const historyScope = historyVocabularyScopes.find(
  (scope) => scope.path === historyNode.href
);
if (!historyScope) {
  throw new Error("History vocabulary scope could not be derived");
}

const historyVocabulary = composeVocabulary(
  ...historyScope.groups.map((group) => group.terms)
);

const philosophyNode = curriculumRegistry.getNode("humanities.philosophy");
if (!philosophyNode) {
  throw new Error(
    "Philosophy curriculum node is required for vocabulary scopes"
  );
}

const philosophyVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [philosophyNode],
  registrations: PHILOSOPHY_VOCABULARY_REGISTRATIONS,
  accent: "amber",
  accentByNodeId: {
    "humanities.philosophy.epistemology": "cyan",
    "humanities.philosophy.mind": "violet",
    "humanities.philosophy.ethics": "emerald",
    "humanities.philosophy.aesthetics": "rose",
  },
});

const philosophyScope = philosophyVocabularyScopes.find(
  (scope) => scope.path === philosophyNode.href
);
if (!philosophyScope) {
  throw new Error("Philosophy vocabulary scope could not be derived");
}

const philosophyVocabulary = composeVocabulary(
  ...philosophyScope.groups.map((group) => group.terms)
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

const materialsScienceNode = curriculumRegistry.getNode(
  "applied.materials-science"
);
if (!materialsScienceNode) {
  throw new Error(
    "Materials Science curriculum node is required for vocabulary scopes"
  );
}

const materialsScienceVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [materialsScienceNode],
  registrations: MATERIALS_SCIENCE_VOCABULARY_REGISTRATIONS,
  accent: "sky",
});

const materialsScienceScope = materialsScienceVocabularyScopes.find(
  (scope) => scope.path === materialsScienceNode.href
);
if (!materialsScienceScope) {
  throw new Error("Materials Science vocabulary scope could not be derived");
}

const materialsScienceVocabulary = composeVocabulary(
  ...materialsScienceScope.groups.map((group) => group.terms)
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

const psychologyNode = curriculumRegistry.getNode("social.psychology");
if (!psychologyNode) {
  throw new Error(
    "Psychology curriculum node is required for vocabulary scopes"
  );
}

const psychologyVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [psychologyNode],
  registrations: PSYCHOLOGY_VOCABULARY_REGISTRATIONS,
  accent: "rose",
});

const psychologyScope = psychologyVocabularyScopes.find(
  (scope) => scope.path === psychologyNode.href
);
if (!psychologyScope) {
  throw new Error("Psychology vocabulary scope could not be derived");
}

const psychologyVocabulary = composeVocabulary(
  ...psychologyScope.groups.map((group) => group.terms)
);

const economicsNode = curriculumRegistry.getNode("social.economics");
if (!economicsNode) {
  throw new Error(
    "Economics curriculum node is required for vocabulary scopes"
  );
}

const economicsVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [economicsNode],
  registrations: ECONOMICS_VOCABULARY_REGISTRATIONS,
  accent: "emerald",
});

const economicsScope = economicsVocabularyScopes.find(
  (scope) => scope.path === economicsNode.href
);
if (!economicsScope) {
  throw new Error("Economics vocabulary scope could not be derived");
}

const economicsVocabulary = composeVocabulary(
  ...economicsScope.groups.map((group) => group.terms)
);

const sociologyNode = curriculumRegistry.getNode("social.sociology");
if (!sociologyNode) {
  throw new Error(
    "Sociology curriculum node is required for vocabulary scopes"
  );
}

const sociologyVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [sociologyNode],
  registrations: SOCIOLOGY_VOCABULARY_REGISTRATIONS,
  accent: "violet",
  accentByNodeId: {
    "social.sociology.interaction": "cyan",
    "social.sociology.stratification": "rose",
    "social.sociology.demography": "amber",
  },
});

const sociologyScope = sociologyVocabularyScopes.find(
  (scope) => scope.path === sociologyNode.href
);
if (!sociologyScope) {
  throw new Error("Sociology vocabulary scope could not be derived");
}

const sociologyVocabulary = composeVocabulary(
  ...sociologyScope.groups.map((group) => group.terms)
);

const chemistryNode = curriculumRegistry.getNode("natural.chemistry");
if (!chemistryNode) {
  throw new Error(
    "Chemistry curriculum node is required for vocabulary scopes"
  );
}

const chemistryVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [chemistryNode],
  registrations: CHEMISTRY_VOCABULARY_REGISTRATIONS,
  accent: "emerald",
});

const chemistryScope = chemistryVocabularyScopes.find(
  (scope) => scope.path === chemistryNode.href
);
if (!chemistryScope) {
  throw new Error("Chemistry vocabulary scope could not be derived");
}

const chemistryVocabulary = composeVocabulary(
  ...chemistryScope.groups.map((group) => group.terms)
);

const physicsNode = curriculumRegistry.getNode("natural.physics");
if (!physicsNode) {
  throw new Error("Physics curriculum node is required for vocabulary scopes");
}

const physicsVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [physicsNode],
  registrations: PHYSICS_VOCABULARY_REGISTRATIONS,
  accent: "sky",
  accentByNodeId: {
    "natural.physics.mechanics": "amber",
    "natural.physics.thermodynamics": "rose",
    "natural.physics.relativity": "violet",
    "natural.physics.quantum-mechanics": "violet",
  },
});

const physicsScope = physicsVocabularyScopes.find(
  (scope) => scope.path === physicsNode.href
);
if (!physicsScope) {
  throw new Error("Physics vocabulary scope could not be derived");
}

const physicsVocabulary = composeVocabulary(
  ...physicsScope.groups.map((group) => group.terms)
);

const musicNode = curriculumRegistry.getNode("humanities.music");
if (!musicNode) {
  throw new Error("Music curriculum node is required for vocabulary scopes");
}

const musicVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [musicNode],
  registrations: MUSIC_VOCABULARY_REGISTRATIONS,
  accent: "rose",
});

const musicScope = musicVocabularyScopes.find(
  (scope) => scope.path === musicNode.href
);
if (!musicScope) {
  throw new Error("Music vocabulary scope could not be derived");
}

const musicVocabulary = composeVocabulary(
  ...musicScope.groups.map((group) => group.terms)
);

const architectureNode = curriculumRegistry.getNode("applied.architecture");
if (!architectureNode) {
  throw new Error(
    "Architecture curriculum node is required for vocabulary scopes"
  );
}

const architectureVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [architectureNode],
  registrations: ARCHITECTURE_VOCABULARY_REGISTRATIONS,
  accent: "sky",
});

const architectureScope = architectureVocabularyScopes.find(
  (scope) => scope.path === architectureNode.href
);
if (!architectureScope) {
  throw new Error("Architecture vocabulary scope could not be derived");
}

const architectureVocabulary = composeVocabulary(
  ...architectureScope.groups.map((group) => group.terms)
);

const agricultureNode = curriculumRegistry.getNode("applied.agriculture");
if (!agricultureNode) {
  throw new Error(
    "Agriculture curriculum node is required for vocabulary scopes"
  );
}

const agricultureVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [agricultureNode],
  registrations: AGRICULTURE_VOCABULARY_REGISTRATIONS,
  accent: "emerald",
  accentByNodeId: {
    "applied.agriculture": "amber",
    "applied.agriculture.aquaculture": "sky",
    "applied.agriculture.engineering-technology": "violet",
  },
});

const agricultureScope = agricultureVocabularyScopes.find(
  (scope) => scope.path === agricultureNode.href
);
if (!agricultureScope) {
  throw new Error("Agriculture vocabulary scope could not be derived");
}

const agricultureVocabulary = composeVocabulary(
  ...agricultureScope.groups.map((group) => group.terms)
);

const educationNode = curriculumRegistry.getNode("applied.education");
if (!educationNode) {
  throw new Error(
    "Education curriculum node is required for vocabulary scopes"
  );
}

const educationVocabularyScopes = buildCurriculumVocabularyScopes({
  roots: [educationNode],
  registrations: EDUCATION_VOCABULARY_REGISTRATIONS,
  accent: "sky",
  accentByNodeId: {
    "applied.education.assessment": "emerald",
    "applied.education.accessibility-special-education": "rose",
    "applied.education.teacher-learning": "violet",
  },
});

const educationScope = educationVocabularyScopes.find(
  (scope) => scope.path === educationNode.href
);
if (!educationScope) {
  throw new Error("Education vocabulary scope could not be derived");
}

const educationVocabulary = composeVocabulary(
  ...educationScope.groups.map((group) => group.terms)
);

export const humanitiesVocabularyScopes: VocabularyScope[] = [
  ...philosophyVocabularyScopes,
  ...historyVocabularyScopes,
  ...literatureVocabularyScopes,
  ...visualArtsVocabularyScopes,
  ...musicVocabularyScopes,
  {
    path: "/humanities",
    title: "Humanities",
    accent: "amber",
    groups: [
      {
        id: philosophyNode.id,
        label: philosophyNode.label,
        terms: philosophyVocabulary,
        sourceNodeId: philosophyNode.id,
        sourcePath: philosophyNode.href,
      },
      {
        id: historyNode.id,
        label: historyNode.label,
        terms: historyVocabulary,
        sourceNodeId: historyNode.id,
        sourcePath: historyNode.href,
      },
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
      {
        id: musicNode.id,
        label: musicNode.label,
        terms: musicVocabulary,
        sourceNodeId: musicNode.id,
        sourcePath: musicNode.href,
      },
    ],
  },
];

export const appliedScienceVocabularyScopes: VocabularyScope[] = [
  ...medicineVocabularyScopes,
  ...materialsScienceVocabularyScopes,
  ...architectureVocabularyScopes,
  ...agricultureVocabularyScopes,
  ...educationVocabularyScopes,
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
      {
        id: materialsScienceNode.id,
        label: materialsScienceNode.label,
        terms: materialsScienceVocabulary,
        sourceNodeId: materialsScienceNode.id,
        sourcePath: materialsScienceNode.href,
      },
      {
        id: architectureNode.id,
        label: architectureNode.label,
        terms: architectureVocabulary,
        sourceNodeId: architectureNode.id,
        sourcePath: architectureNode.href,
      },
      {
        id: agricultureNode.id,
        label: agricultureNode.label,
        terms: agricultureVocabulary,
        sourceNodeId: agricultureNode.id,
        sourcePath: agricultureNode.href,
      },
      {
        id: educationNode.id,
        label: educationNode.label,
        terms: educationVocabulary,
        sourceNodeId: educationNode.id,
        sourcePath: educationNode.href,
      },
    ],
  },
];

export const socialScienceVocabularyScopes: VocabularyScope[] = [
  ...psychologyVocabularyScopes,
  ...geographyVocabularyScopes,
  ...economicsVocabularyScopes,
  ...sociologyVocabularyScopes,
  {
    path: "/social-science",
    title: "Social Science",
    accent: "sky",
    groups: [
      {
        id: psychologyNode.id,
        label: psychologyNode.label,
        terms: psychologyVocabulary,
        sourceNodeId: psychologyNode.id,
        sourcePath: psychologyNode.href,
      },
      {
        id: geographyNode.id,
        label: geographyNode.label,
        terms: geographyVocabulary,
        sourceNodeId: geographyNode.id,
        sourcePath: geographyNode.href,
      },
      {
        id: economicsNode.id,
        label: economicsNode.label,
        terms: economicsVocabulary,
        sourceNodeId: economicsNode.id,
        sourcePath: economicsNode.href,
      },
      {
        id: sociologyNode.id,
        label: sociologyNode.label,
        terms: sociologyVocabulary,
        sourceNodeId: sociologyNode.id,
        sourcePath: sociologyNode.href,
      },
    ],
  },
];

export const naturalScienceVocabularyScopes: VocabularyScope[] = [
  ...physicsVocabularyScopes,
  ...biologyVocabularyScopes,
  ...astronomyVocabularyScopes,
  ...earthScienceVocabularyScopes,
  ...chemistryVocabularyScopes,
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
      {
        id: physicsNode.id,
        label: physicsNode.label,
        terms: physicsVocabulary,
        sourceNodeId: physicsNode.id,
        sourcePath: physicsNode.href,
      },
      {
        id: chemistryNode.id,
        label: chemistryNode.label,
        terms: chemistryVocabulary,
        sourceNodeId: chemistryNode.id,
        sourcePath: chemistryNode.href,
      },
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
  ...informationScienceVocabularyScopes,
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
