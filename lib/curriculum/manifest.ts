import { REFINED_ALGEBRA_CURRICULUM } from "@/lib/curriculum/integrated-algebra-refinement";
import { COMPUTER_SCIENCE_CURRICULUM } from "@/lib/curriculum/computer-science";
import { DATA_SCIENCE_CURRICULUM } from "@/lib/curriculum/data-science";
import { GROUP_THEORY_CURRICULUM } from "@/lib/curriculum/group-theory";
import { INFORMATION_SCIENCE_CURRICULUM } from "@/lib/curriculum/information-science";
import { SYSTEMS_SCIENCE_CURRICULUM } from "@/lib/curriculum/systems-science";
import { AGRICULTURE_CURRICULUM } from "@/lib/curriculum/applied/agriculture";
import { ARCHITECTURE_CURRICULUM } from "@/lib/curriculum/applied/architecture";
import { ENGINEERING_CURRICULUM } from "@/lib/curriculum/applied/engineering";
import { MATERIALS_SCIENCE_CURRICULUM } from "@/lib/curriculum/applied/materials-science";
import { HISTORY_CURRICULUM } from "@/lib/curriculum/humanities/history";
import { LITERATURE_CURRICULUM } from "@/lib/curriculum/humanities/literature";
import { MUSIC_CURRICULUM } from "@/lib/curriculum/humanities/music";
import { PHILOSOPHY_CURRICULUM } from "@/lib/curriculum/humanities/philosophy";
import { RELIGION_CURRICULUM } from "@/lib/curriculum/humanities/religion";
import { VISUAL_ARTS_CURRICULUM } from "@/lib/curriculum/humanities/visual-arts";
import { LOGIC_CURRICULUM } from "@/lib/curriculum/logic";
import { ASTRONOMY_CURRICULUM } from "@/lib/curriculum/natural/astronomy";
import { BIOLOGY_CURRICULUM } from "@/lib/curriculum/natural/biology";
import { CHEMISTRY_CURRICULUM } from "@/lib/curriculum/natural/chemistry";
import { ELECTROMAGNETISM_CURRICULUM } from "@/lib/curriculum/natural/electromagnetism";
import { PHYSICS_CURRICULUM } from "@/lib/curriculum/natural/physics";
import { RELATIVITY_CURRICULUM } from "@/lib/curriculum/natural/relativity";
import { WAVES_OPTICS_CURRICULUM } from "@/lib/curriculum/natural/waves-optics";
import { ANTHROPOLOGY_CURRICULUM } from "@/lib/curriculum/social/anthropology";
import { COMMUNICATIONS_CURRICULUM } from "@/lib/curriculum/social/communications";
import { ECONOMICS_CURRICULUM } from "@/lib/curriculum/social/economics";
import { GEOGRAPHY_CURRICULUM } from "@/lib/curriculum/social/geography";
import { LAW_CURRICULUM } from "@/lib/curriculum/social/law";
import { LINGUISTICS_CURRICULUM } from "@/lib/curriculum/social/linguistics";
import { POLITICAL_SCIENCE_CURRICULUM } from "@/lib/curriculum/social/political-science";
import { SOCIOLOGY_CURRICULUM } from "@/lib/curriculum/social/sociology";
import type { CurriculumNode } from "@/lib/curriculum/types";

/**
 * Complete focused subtrees that replace matching nodes from the broad
 * migration tree.
 *
 * Order matters when one focused module lives inside another. Algebra is
 * applied before Group Theory so the more specific Group Theory subtree can
 * replace the corresponding node inside the migrated Algebra branch. Physics
 * is applied before its focused child branches for the same reason.
 */
export const CURRICULUM_MODULES: readonly CurriculumNode[] = [
  REFINED_ALGEBRA_CURRICULUM,
  GROUP_THEORY_CURRICULUM,
  LOGIC_CURRICULUM,
  COMPUTER_SCIENCE_CURRICULUM,
  DATA_SCIENCE_CURRICULUM,
  INFORMATION_SCIENCE_CURRICULUM,
  SYSTEMS_SCIENCE_CURRICULUM,
  AGRICULTURE_CURRICULUM,
  ARCHITECTURE_CURRICULUM,
  ENGINEERING_CURRICULUM,
  MATERIALS_SCIENCE_CURRICULUM,
  BIOLOGY_CURRICULUM,
  ASTRONOMY_CURRICULUM,
  CHEMISTRY_CURRICULUM,
  PHYSICS_CURRICULUM,
  ELECTROMAGNETISM_CURRICULUM,
  WAVES_OPTICS_CURRICULUM,
  RELATIVITY_CURRICULUM,
  ANTHROPOLOGY_CURRICULUM,
  COMMUNICATIONS_CURRICULUM,
  ECONOMICS_CURRICULUM,
  GEOGRAPHY_CURRICULUM,
  LAW_CURRICULUM,
  LINGUISTICS_CURRICULUM,
  POLITICAL_SCIENCE_CURRICULUM,
  SOCIOLOGY_CURRICULUM,
  HISTORY_CURRICULUM,
  LITERATURE_CURRICULUM,
  MUSIC_CURRICULUM,
  PHILOSOPHY_CURRICULUM,
  RELIGION_CURRICULUM,
  VISUAL_ARTS_CURRICULUM,
];
