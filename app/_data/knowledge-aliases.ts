export const knowledgeAliases: Record<string, readonly string[]> = {
  "difference-of-perfect-squares": ["DOPS", "difference of squares"],
  "greatest-common-factor": ["GCF", "greatest common divisor", "GCD"],
  "expressions-variables": ["algebraic expressions", "expressions and variables"],
  coefficient: ["numeric factor"],
  "set-membership": ["belongs to", "element of"],
  subset: ["contained set"],
  "epsilon-delta": ["epsilon delta definition", "formal limit definition"],
  "lhopitals-rule": ["L'Hopital", "LHopital", "L'Hôpital"],
  "free-body-diagrams": ["FBD", "force diagram"],
  "newtons-second-law": ["F=ma", "Newton 2"],
  photosynthesis: ["carbon fixation"],
  xylem: ["water transport"],
  phloem: ["sugar transport"],
  "symbolic-interactionism": ["interactionism", "interactionist"],
  "functional-systems": ["functionalism", "structural functionalism"],
  "political-theory": ["political philosophy"],
  "international-relations": ["IR"],
  "data-describe": ["EDA", "exploratory data analysis"],
  "data-predict": ["prediction", "predictive modeling"],
  "data-causal-claim": ["causal inference", "causation"],
  "narrator-perspective": ["point of view", "POV", "focalization"],
  "narrative-story": ["fabula"],
  "narrative-plot": ["syuzhet"],
  "greek-mythology": ["Hellenic mythology", "Greek pantheon"],
};

export function aliasesForKnowledgeNode(nodeId: string): readonly string[] {
  return knowledgeAliases[nodeId] ?? [];
}
