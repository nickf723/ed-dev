import { abstractAlgebraVocab } from "./a/abstract-algebra";
import { algebraVocab } from "./a/algebra";
import { algebraFundamentalsVocab } from "./a/algebra-fundamentals";
import { propertiesVocab } from "./a/algebra-properties";
import { expressionsVocab } from "./a/algebra-expressions";
import { computerScienceVocab } from "./c/computer-science";
import { dataScienceVocab } from "./d/data-science";
import { equationsVocab } from "./e/equations";
import { exponentsVocab } from "./e/exponents";
import { firstOrderVocab } from "./f/first-order-logic";
import { formalScienceVocab } from "./f/formal-science";
import { formalScienceLocalVocab } from "./f/formal-science-local";
import { fractionsVocab } from "./f/fractions";
import { informationScienceVocab } from "./i/information-science";
import { integersVocab } from "./i/integers";
import { inequalitiesVocab } from "./i/inequalities";
import { logicVocab } from "./l/logic";
import { mathVocab } from "./m/math";
import { foundationsVocab } from "./m/math-foundations";
import { mathCoreVocab } from "./m/mathematics";
import { pemdasVocab } from "./p/pemdas";
import { preAlgebraVocab } from "./p/pre-algebra";
import { propLogicVocab } from "./p/propositional-logic";
import { quadraticsVocab } from "./q/quadratics";
import { ratiosVocab } from "./r/ratios";
import { systemsScienceVocab } from "./s/systems-science";
import { composeVocabulary } from "./compose";
import type { VocabularyScope } from "./types";

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

const preAlgebraVocabulary = composeVocabulary(
  preAlgebraVocab,
  integersVocab,
  pemdasVocab,
  propertiesVocab,
  ratiosVocab,
  fractionsVocab,
  exponentsVocab,
  expressionsVocab,
  equationsVocab,
);

const algebraVocabulary = composeVocabulary(
  algebraVocab,
  preAlgebraVocabulary,
  algebraFundamentalsVocab,
  inequalitiesVocab,
  quadraticsVocab,
  abstractAlgebraVocab,
);

const mathematicsVocabulary = composeVocabulary(
  mathVocab,
  mathCoreVocab,
  foundationsVocab,
  algebraVocabulary,
  legacyVocabularyByDomain(
    "Mathematics",
    "Algebra",
    "Calculus",
    "Linear Algebra",
    "Geometry",
    "Number Theory",
    "Game Theory",
  ),
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
  {
    path: "/formal-science/mathematics/algebra/elementary-algebra/inequalities",
    title: "Inequalities",
    accent: "sky",
    groups: [
      {
        id: "inequalities",
        label: "Inequalities",
        terms: inequalitiesVocab,
      },
    ],
  },
  {
    path: "/formal-science/mathematics/algebra/pre-algebra",
    title: "Pre-Algebra",
    accent: "cyan",
    groups: [
      { id: "pre-algebra", label: "Pre-Algebra", terms: preAlgebraVocab },
      { id: "integers", label: "Integers", terms: integersVocab },
      {
        id: "operations",
        label: "Operations and Properties",
        terms: composeVocabulary(pemdasVocab, propertiesVocab),
      },
      {
        id: "ratios-and-fractions",
        label: "Ratios and Fractions",
        terms: composeVocabulary(ratiosVocab, fractionsVocab),
      },
      {
        id: "algebra-language",
        label: "Algebraic Language",
        terms: composeVocabulary(
          exponentsVocab,
          expressionsVocab,
          equationsVocab,
        ),
      },
    ],
  },
  {
    path: "/formal-science/mathematics/algebra",
    title: "Algebra",
    accent: "cyan",
    groups: [
      { id: "algebra", label: "Algebra", terms: algebraVocab },
      { id: "pre-algebra", label: "Pre-Algebra", terms: preAlgebraVocabulary },
      {
        id: "elementary-algebra",
        label: "Elementary Algebra",
        terms: composeVocabulary(
          algebraFundamentalsVocab,
          inequalitiesVocab,
          quadraticsVocab,
        ),
      },
      {
        id: "abstract-algebra",
        label: "Abstract Algebra",
        terms: abstractAlgebraVocab,
      },
    ],
  },
  {
    path: "/formal-science/mathematics/foundations",
    title: "Mathematical Foundations",
    accent: "cyan",
    groups: [
      {
        id: "mathematical-foundations",
        label: "Mathematical Foundations",
        terms: foundationsVocab,
      },
    ],
  },
  {
    path: "/formal-science/mathematics",
    title: "Mathematics",
    accent: "cyan",
    groups: [
      {
        id: "mathematics",
        label: "Mathematics",
        terms: composeVocabulary(mathVocab, mathCoreVocab),
      },
      { id: "foundations", label: "Foundations", terms: foundationsVocab },
      { id: "algebra", label: "Algebra", terms: algebraVocabulary },
      {
        id: "additional-mathematics",
        label: "Additional Mathematics",
        terms: legacyVocabularyByDomain(
          "Mathematics",
          "Algebra",
          "Calculus",
          "Linear Algebra",
          "Geometry",
          "Number Theory",
          "Game Theory",
        ),
      },
    ],
  },
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
