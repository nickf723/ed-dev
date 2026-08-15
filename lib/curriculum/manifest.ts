import { REFINED_ALGEBRA_CURRICULUM } from "@/lib/curriculum/integrated-algebra-refinement";
import { COMPUTER_SCIENCE_CURRICULUM } from "@/lib/curriculum/computer-science";
import { GROUP_THEORY_CURRICULUM } from "@/lib/curriculum/group-theory";
import { LOGIC_CURRICULUM } from "@/lib/curriculum/logic";
import { BIOLOGY_CURRICULUM } from "@/lib/curriculum/natural/biology";
import { ELECTROMAGNETISM_CURRICULUM } from "@/lib/curriculum/natural/electromagnetism";
import { PHYSICS_CURRICULUM } from "@/lib/curriculum/natural/physics";
import { RELATIVITY_CURRICULUM } from "@/lib/curriculum/natural/relativity";
import { WAVES_OPTICS_CURRICULUM } from "@/lib/curriculum/natural/waves-optics";
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
  BIOLOGY_CURRICULUM,
  PHYSICS_CURRICULUM,
  ELECTROMAGNETISM_CURRICULUM,
  WAVES_OPTICS_CURRICULUM,
  RELATIVITY_CURRICULUM,
];
