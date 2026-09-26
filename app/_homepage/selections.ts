import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

// Curation selects entry points; curriculum owns routes, names, and ancestry.
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
    id: "humanities.visual-arts",
    question: "How do we read an image?",
    invitation:
      "Explore composition and materials, then inspect artworks in the museum collection.",
    action: "Enter visual arts",
    kind: "Collection & interpretation",
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
  return selections.map((selection) => {
    const context = requireCurriculumPageContext(selection.id);
    if (context.status !== "active")
      throw new Error(`Homepage selection must be active: ${selection.id}`);
    return { ...selection, context };
  });
}
