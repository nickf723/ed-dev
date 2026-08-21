import { composeVocabulary } from "./compose";
import type { VocabTerm } from "./types";

export type { VocabTerm } from "./types";

import { mathVocab } from "./m/math";
import { abstractAlgebraVocab } from "./a/abstract-algebra";
import { ludologyVocab } from "./l/ludology";
import { gameDesignVocab } from "./g/game-design";
import { lawVocab } from "./l/law";
import { linguisticsVocab } from "./l/linguistics";
import { economicsVocab } from "./e/economics";
import { philosophyVocab } from "./p/philosophy";
import { earthScienceVocab } from "./e/earth-science";
import { computerScienceVocab } from "./c/computer-science";
import { physicsVocab } from "./p/physics";
import { physicsBranchVocab } from "./p/physics-branches";
import { chemistryVocab } from "./c/chemistry";
import { biologyVocab } from "./natural-science/biology";
import { botanyVocab } from "./b/botany";
import { astronomyVocab } from "./a/astronomy";
import { planetaryAstronomyVocab } from "./natural-science/astronomy/planetary-astronomy";
import { psychologyVocab } from "./p/psychology";
import { sociologyVocab } from "./s/sociology";
import { sociologyBranchVocab } from "./s/sociology-branches";
import { politicalScienceVocab } from "./p/political-science";
import { medicineVocab } from "./m/medicine";
import { anatomyPhysiologyVocab } from "./a/anatomy-physiology";
import { skeletalSystemVocab } from "./s/skeletal-system";
import { geographyVocab } from "./g/geography";
import { musicVocab } from "./m/music";
import { visualArtsVocab } from "./v/visual-arts";
import { literatureVocab } from "./l/literature";
import { narrativeFictionVocab } from "./n/narrative-fiction";
import { religionVocab } from "./r/religion";
import { algebraBasicsVocab } from "./a/algebra-basics";
import { architectureVocab } from "./a/architecture";
import { quantumMechanicsVocab } from "./q/quantum-mechanics";
import { dataScienceVocab } from "./d/data-science";
import { meteorologyVocab } from "./m/meteorology";
import { metroidvaniaVocab } from "./m/metroidvania";
import { anthropologyVocab } from "./a/anthropology";
import { mythologyVocab } from "./m/mythology";
import { cognitiveScienceVocab } from "./c/cognitive-science";
import { formalScienceVocab } from "./f/formal-science";
import { formalScienceLocalVocab } from "./f/formal-science-local";
import { informationScienceVocab } from "./i/information-science";
import { informationScienceBranchVocab } from "./i/information-science-branches";
import { informationTheoryVocab } from "./i/information-theory";
import { systemsScienceVocab } from "./s/systems-science";
import { logicVocab } from "./l/logic";
import { propLogicVocab } from "./p/propositional-logic";
import { firstOrderVocab } from "./f/first-order-logic";
import { mathCoreVocab } from "./m/mathematics";
import { foundationsVocab } from "./m/math-foundations";
import { algebraVocab } from "./a/algebra";
import { preAlgebraVocab } from "./p/pre-algebra";
import { integersVocab } from "./i/integers";
import { inequalitiesVocab } from "./i/inequalities";
import { pemdasVocab } from "./p/pemdas";
import { propertiesVocab } from "./a/algebra-properties";
import { ratiosVocab } from "./r/ratios";
import { fractionsVocab } from "./f/fractions";
import { exponentsVocab } from "./e/exponents";
import { expressionsVocab } from "./a/algebra-expressions";
import { equationsVocab } from "./e/equations";
import { algebraFundamentalsVocab } from "./a/algebra-fundamentals";
import { quadraticsVocab } from "./q/quadratics";
import { diophantineVocab, numberTheoryVocab } from "./n/number-theory";
import { combinatoricsVocab } from "./c/combinatorics";
import { discreteMathVocab } from "./d/discrete-math";
import { graphTheoryVocab } from "./g/graph-theory";
import { recursionVocab } from "./r/recursion";
import { setTheoryVocab } from "./s/set-theory";
import { mineralogyVocab } from "./m/mineralogy";
import { historyVocab } from "./h/history";
import { historyBranchVocab } from "./h/history-branches";
import { agricultureVocab } from "./a/agriculture";
import { agricultureBranchVocab } from "./a/agriculture-branches";

export { mathVocab, abstractAlgebraVocab, ludologyVocab, gameDesignVocab };

export const ALL_VOCAB: VocabTerm[] = composeVocabulary(
  mathVocab,
  abstractAlgebraVocab,
  ludologyVocab,
  gameDesignVocab,
  lawVocab,
  linguisticsVocab,
  economicsVocab,
  philosophyVocab,
  earthScienceVocab,
  computerScienceVocab,
  physicsVocab,
  physicsBranchVocab,
  chemistryVocab,
  biologyVocab,
  botanyVocab,
  astronomyVocab,
  planetaryAstronomyVocab,
  psychologyVocab,
  sociologyVocab,
  sociologyBranchVocab,
  politicalScienceVocab,
  medicineVocab,
  anatomyPhysiologyVocab,
  skeletalSystemVocab,
  geographyVocab,
  musicVocab,
  visualArtsVocab,
  literatureVocab,
  narrativeFictionVocab,
  religionVocab,
  algebraBasicsVocab,
  architectureVocab,
  quantumMechanicsVocab,
  dataScienceVocab,
  meteorologyVocab,
  anthropologyVocab,
  mythologyVocab,
  cognitiveScienceVocab,
  metroidvaniaVocab,
  formalScienceLocalVocab,
  formalScienceVocab,
  informationScienceVocab,
  informationScienceBranchVocab,
  informationTheoryVocab,
  systemsScienceVocab,
  logicVocab,
  propLogicVocab,
  firstOrderVocab,
  mathCoreVocab,
  foundationsVocab,
  algebraVocab,
  preAlgebraVocab,
  integersVocab,
  inequalitiesVocab,
  pemdasVocab,
  propertiesVocab,
  ratiosVocab,
  fractionsVocab,
  exponentsVocab,
  expressionsVocab,
  equationsVocab,
  algebraFundamentalsVocab,
  quadraticsVocab,
  numberTheoryVocab,
  diophantineVocab,
  discreteMathVocab,
  setTheoryVocab,
  graphTheoryVocab,
  combinatoricsVocab,
  recursionVocab,
  mineralogyVocab,
  historyVocab,
  historyBranchVocab,
  agricultureVocab,
  agricultureBranchVocab
);
