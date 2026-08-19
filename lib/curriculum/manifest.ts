import { REFINED_ALGEBRA_CURRICULUM } from "@/lib/curriculum/integrated-algebra-refinement";
import { APPLIED_MATHEMATICS_CURRICULUM } from "@/lib/curriculum/applied-mathematics";
import { ARTIFICIAL_INTELLIGENCE_CURRICULUM } from "@/lib/curriculum/artificial-intelligence";
import { COMPUTER_SCIENCE_CURRICULUM } from "@/lib/curriculum/computer-science";
import { COMPUTATION_THEORY_CURRICULUM } from "@/lib/curriculum/computation-theory";
import { HARDWARE_ARCHITECTURE_CURRICULUM } from "@/lib/curriculum/hardware-architecture";
import { DATA_SCIENCE_CURRICULUM } from "@/lib/curriculum/data-science";
import { GEOMETRY_CURRICULUM } from "@/lib/curriculum/geometry";
import { GROUP_THEORY_CURRICULUM } from "@/lib/curriculum/group-theory";
import { INFORMATION_SCIENCE_CURRICULUM } from "@/lib/curriculum/information-science";
import { STATISTICS_CURRICULUM } from "@/lib/curriculum/statistics";
import { SYSTEMS_SCIENCE_CURRICULUM } from "@/lib/curriculum/systems-science";
import { AGRICULTURE_CURRICULUM } from "@/lib/curriculum/applied/agriculture";
import { ARCHITECTURE_CURRICULUM } from "@/lib/curriculum/applied/architecture";
import { BUSINESS_CURRICULUM } from "@/lib/curriculum/applied/business";
import { EDUCATION_CURRICULUM } from "@/lib/curriculum/applied/education";
import { ENGINEERING_CURRICULUM } from "@/lib/curriculum/applied/engineering";
import { MECHANICAL_ENGINEERING_CURRICULUM } from "@/lib/curriculum/applied/mechanical-engineering";
import { HEALTH_SCIENCES_CURRICULUM } from "@/lib/curriculum/applied/health";
import { INDUSTRIAL_DESIGN_CURRICULUM } from "@/lib/curriculum/applied/industrial-design";
import { LIBRARY_SCIENCE_CURRICULUM } from "@/lib/curriculum/applied/library-science";
import { MATERIALS_SCIENCE_CURRICULUM } from "@/lib/curriculum/applied/materials-science";
import { MEDICINE_CURRICULUM } from "@/lib/curriculum/applied/medicine";
import { TECHNOLOGY_CURRICULUM } from "@/lib/curriculum/applied/technology";
import { CULINARY_ARTS_CURRICULUM } from "@/lib/curriculum/humanities/culinary-arts";
import { CULTURE_CURRICULUM } from "@/lib/curriculum/humanities/culture";
import { FUTUROLOGY_CURRICULUM } from "@/lib/curriculum/humanities/futurology";
import { GAMING_CURRICULUM } from "@/lib/curriculum/humanities/gaming";
import { HISTORY_CURRICULUM } from "@/lib/curriculum/humanities/history";
import { LANGUAGES_CURRICULUM } from "@/lib/curriculum/humanities/languages";
import { LITERATURE_CURRICULUM } from "@/lib/curriculum/humanities/literature";
import { MUSIC_CURRICULUM } from "@/lib/curriculum/humanities/music";
import { PERFORMING_ARTS_CURRICULUM } from "@/lib/curriculum/humanities/performing-arts";
import { PHILOSOPHY_CURRICULUM } from "@/lib/curriculum/humanities/philosophy";
import { RELIGION_CURRICULUM } from "@/lib/curriculum/humanities/religion";
import { SPORTS_CURRICULUM } from "@/lib/curriculum/humanities/sports";
import { VISUAL_ARTS_CURRICULUM } from "@/lib/curriculum/humanities/visual-arts";
import { LOGIC_CURRICULUM } from "@/lib/curriculum/logic";
import { ASTRONOMY_CURRICULUM } from "@/lib/curriculum/natural/astronomy";
import { BIOLOGY_CURRICULUM } from "@/lib/curriculum/natural/biology";
import { CYTOLOGY_CURRICULUM } from "@/lib/curriculum/natural/biology/cytology";
import { CHEMISTRY_CURRICULUM } from "@/lib/curriculum/natural/chemistry";
import { EARTH_SCIENCE_CURRICULUM } from "@/lib/curriculum/natural/earth-science";
import { ELECTROMAGNETISM_CURRICULUM } from "@/lib/curriculum/natural/electromagnetism";
import { PHYSICS_CURRICULUM } from "@/lib/curriculum/natural/physics";
import { RELATIVITY_CURRICULUM } from "@/lib/curriculum/natural/relativity";
import { WAVES_OPTICS_CURRICULUM } from "@/lib/curriculum/natural/waves-optics";
import { ANTHROPOLOGY_CURRICULUM } from "@/lib/curriculum/social/anthropology";
import { ARCHAEOLOGY_CURRICULUM } from "@/lib/curriculum/social/archaeology";
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
  GEOMETRY_CURRICULUM,
  STATISTICS_CURRICULUM,
  APPLIED_MATHEMATICS_CURRICULUM,
  LOGIC_CURRICULUM,
  COMPUTER_SCIENCE_CURRICULUM,
  HARDWARE_ARCHITECTURE_CURRICULUM,
  COMPUTATION_THEORY_CURRICULUM,
  ARTIFICIAL_INTELLIGENCE_CURRICULUM,
  DATA_SCIENCE_CURRICULUM,
  INFORMATION_SCIENCE_CURRICULUM,
  SYSTEMS_SCIENCE_CURRICULUM,
  AGRICULTURE_CURRICULUM,
  ARCHITECTURE_CURRICULUM,
  BUSINESS_CURRICULUM,
  EDUCATION_CURRICULUM,
  ENGINEERING_CURRICULUM,
  MECHANICAL_ENGINEERING_CURRICULUM,
  HEALTH_SCIENCES_CURRICULUM,
  INDUSTRIAL_DESIGN_CURRICULUM,
  LIBRARY_SCIENCE_CURRICULUM,
  MATERIALS_SCIENCE_CURRICULUM,
  MEDICINE_CURRICULUM,
  TECHNOLOGY_CURRICULUM,
  BIOLOGY_CURRICULUM,
  CYTOLOGY_CURRICULUM,
  ASTRONOMY_CURRICULUM,
  CHEMISTRY_CURRICULUM,
  EARTH_SCIENCE_CURRICULUM,
  PHYSICS_CURRICULUM,
  ELECTROMAGNETISM_CURRICULUM,
  WAVES_OPTICS_CURRICULUM,
  RELATIVITY_CURRICULUM,
  ANTHROPOLOGY_CURRICULUM,
  ARCHAEOLOGY_CURRICULUM,
  COMMUNICATIONS_CURRICULUM,
  ECONOMICS_CURRICULUM,
  GEOGRAPHY_CURRICULUM,
  LAW_CURRICULUM,
  LINGUISTICS_CURRICULUM,
  POLITICAL_SCIENCE_CURRICULUM,
  SOCIOLOGY_CURRICULUM,
  CULINARY_ARTS_CURRICULUM,
  CULTURE_CURRICULUM,
  FUTUROLOGY_CURRICULUM,
  GAMING_CURRICULUM,
  HISTORY_CURRICULUM,
  LANGUAGES_CURRICULUM,
  LITERATURE_CURRICULUM,
  MUSIC_CURRICULUM,
  PERFORMING_ARTS_CURRICULUM,
  PHILOSOPHY_CURRICULUM,
  RELIGION_CURRICULUM,
  SPORTS_CURRICULUM,
  VISUAL_ARTS_CURRICULUM,
];