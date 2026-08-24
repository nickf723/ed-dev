import { abstractAlgebraVocab } from "./a/abstract-algebra";
import { algebraVocab } from "./a/algebra";
import { algebraVariablesVocab } from "./a/algebra-variables";
import { algebraFundamentalsVocab } from "./a/algebra-fundamentals";
import { propertiesVocab } from "./a/algebra-properties";
import { combinatoricsVocab } from "./c/combinatorics";
import { discreteMathVocab } from "./d/discrete-math";
import { expressionsVocab } from "./a/algebra-expressions";
import { equationsVocab } from "./e/equations";
import { exponentsVocab } from "./e/exponents";
import { formalScienceVocab } from "./f/formal-science";
import { fractionsVocab } from "./f/fractions";
import { graphTheoryVocab } from "./g/graph-theory";
import { inequalitiesVocab } from "./i/inequalities";
import { integersVocab } from "./i/integers";
import { mathVocab } from "./m/math";
import { foundationsVocab } from "./m/math-foundations";
import { mathCoreVocab } from "./m/mathematics";
import { diophantineVocab, numberTheoryVocab } from "./n/number-theory";
import { pemdasVocab } from "./p/pemdas";
import { preAlgebraVocab } from "./p/pre-algebra";
import { quadraticsVocab } from "./q/quadratics";
import { ratiosVocab } from "./r/ratios";
import { recursionVocab } from "./r/recursion";
import { setTheoryVocab } from "./s/set-theory";
import type { NodeVocabularyRegistration } from "./aggregate.mjs";

const legacyMathematicsVocab = formalScienceVocab.filter((term) =>
  new Set([
    "Mathematics",
    "Algebra",
    "Calculus",
    "Linear Algebra",
    "Geometry",
    "Game Theory",
  ]).has(term.domain)
);

/**
 * First curriculum-node migration slice. New Mathematics vocabulary belongs in
 * this manifest at the narrowest node that teaches it; ancestor scopes are
 * derived by `buildCurriculumVocabularyScopes`.
 */
export const MATHEMATICS_VOCABULARY_REGISTRATIONS = [
  {
    nodeId: "formal.mathematics",
    terms: [...mathVocab, ...mathCoreVocab, ...legacyMathematicsVocab],
  },
  {
    nodeId: "formal.mathematics.foundations",
    terms: foundationsVocab,
  },
  {
    nodeId: "formal.mathematics.algebra",
    terms: algebraVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra",
    terms: preAlgebraVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra.integers",
    terms: integersVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra.pemdas",
    terms: pemdasVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra.properties",
    terms: propertiesVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra.ratios",
    terms: ratiosVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra.fractions",
    terms: fractionsVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra.exponents",
    terms: exponentsVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra.expressions",
    terms: expressionsVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.pre-algebra.equations",
    terms: equationsVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.elementary-algebra.fundamentals",
    terms: algebraFundamentalsVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.elementary-algebra.fundamentals.variables-changing-quantities",
    terms: algebraVariablesVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.elementary-algebra.inequalities",
    terms: inequalitiesVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.elementary-algebra.quadratics",
    terms: quadraticsVocab,
  },
  {
    nodeId: "formal.mathematics.number-theory",
    terms: numberTheoryVocab,
  },
  {
    nodeId: "formal.mathematics.number-theory.diophantine",
    terms: diophantineVocab,
  },
  {
    nodeId: "formal.mathematics.discrete",
    terms: discreteMathVocab,
  },
  {
    nodeId: "formal.mathematics.discrete.set-theory",
    terms: setTheoryVocab,
  },
  {
    nodeId: "formal.mathematics.discrete.graph-theory",
    terms: graphTheoryVocab,
  },
  {
    nodeId: "formal.mathematics.discrete.combinatorics",
    terms: combinatoricsVocab,
  },
  {
    nodeId: "formal.mathematics.discrete.recursion-theory",
    terms: recursionVocab,
  },
  {
    nodeId: "formal.mathematics.algebra.abstract-algebra",
    terms: abstractAlgebraVocab,
  },
] as const satisfies readonly NodeVocabularyRegistration[];
