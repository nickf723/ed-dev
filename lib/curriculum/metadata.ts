import type { CurriculumNode } from "@/lib/curriculum/types";

type CurriculumNodeMetadata = Pick<CurriculumNode, "description">;

/**
 * Semantic copy that belongs to the curriculum rather than a particular page.
 * Dense subtrees may define descriptions directly in their focused modules;
 * this overlay fills broad-tree nodes as they are migrated out of page-local data.
 */
export const CURRICULUM_NODE_METADATA: Record<string, CurriculumNodeMetadata> = {
  "formal.logic": {
    description: "Reasoning, inference, truth, and proof.",
  },
  "formal.mathematics": {
    description: "Structure, patterns, quantity, space, and change.",
  },
  "formal.computer-science": {
    description: "Algorithms, systems, software, and computation.",
  },
  "formal.information-science": {
    description: "Representation, meaning, organization, and retrieval.",
  },
  "formal.data-science": {
    description: "Data, models, evidence, patterns, and insight.",
  },
  "formal.systems-science": {
    description: "Complex systems, feedback, behavior, and dynamics.",
  },
};
