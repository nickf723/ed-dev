import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

const KNOWLEDGE_BRANCHES = ["formal", "natural", "social", "humanities", "applied"] as const;

// Curation selects entry points; curriculum owns routes, names, ancestry, and status.
const selections = [
  {
    id: "natural.physics.waves-optics.diffraction",
    question: "Why does a smaller opening make a wider pattern?",
    invitation:
      "Change the opening. Follow the wave. Discover how scale shapes diffraction.",
    action: "Explore diffraction",
    kind: "Interactive explanation",
  },
  {
    id: "formal.logic",
    question: "What makes an argument hold?",
    invitation:
      "Compare truth values and quantifiers, then follow the structure of a logical argument.",
    action: "Investigate logic",
    kind: "Reasoning & proof",
  },
  {
    id: "social.economics",
    question: "How do scarce resources become choices and prices?",
    invitation:
      "Trace tradeoffs through markets, shift supply and demand, and see what an economic model predicts when conditions change.",
    action: "Explore economics",
    kind: "Model & system",
  },
  {
    id: "humanities.visual-arts",
    question: "How do we read an image?",
    invitation:
      "Explore composition and materials, then inspect artworks in the museum collection.",
    action: "Enter visual arts",
    kind: "Collection & interpretation",
  },
  {
    id: "applied.engineering",
    question: "How do engineers know whether a design can survive its constraints?",
    invitation:
      "Follow the engineering loop from requirement to model, then stress-test a design against a visible margin.",
    action: "Enter engineering",
    kind: "Design & verification",
  },
  {
    id: "humanities.gaming.repository.board-games",
    question: "What can a rule set create?",
    invitation:
      "Inspect the rules, compare game systems, and test ideas in playable models.",
    action: "Explore board games",
    kind: "Playable collection",
  },
] as const;

export function getHomepageSelections() {
  const resolved = selections.map((selection) => {
    const context = requireCurriculumPageContext(selection.id);
    if (context.status !== "active")
      throw new Error(`Homepage selection must be active: ${selection.id}`);
    return { ...selection, context };
  });

  const representedBranches = new Set(
    resolved.map((selection) => selection.context.domain.id),
  );
  const missingBranches = KNOWLEDGE_BRANCHES.filter(
    (branchId) => !representedBranches.has(branchId),
  );

  if (missingBranches.length > 0) {
    throw new Error(
      `Homepage curation must represent every knowledge branch. Missing: ${missingBranches.join(", ")}`,
    );
  }

  return resolved;
}
