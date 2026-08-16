import type { FoundryPageBrief, PageFoundryQueue } from "@/lib/page-foundry/schema";

export function uniqueId(base: string, existing: readonly string[]) {
  const root =
    base
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "item";
  if (!existing.includes(root)) return root;
  let index = 2;
  while (existing.includes(`${root}-${index}`)) index += 1;
  return `${root}-${index}`;
}

export function blankBrief(id: string): FoundryPageBrief {
  return {
    id,
    title: "New page",
    parentNodeId: "domain.parent",
    parentLabel: "Parent",
    route: `/new-page/${id}`,
    status: "queued",
    priority: "normal",
    pageType: "unit",
    organizingPrinciple: "Describe the real organizing principle.",
    learnerQuestion: "What should the learner be able to see or decide?",
    contentScope: ["First content boundary"],
    dataSource: { kind: "curated", label: "Curated content" },
    visual: {
      topology: "Choose a visual topology",
      evocation: "Describe what the page should feel like.",
      backgroundMood: "Vivid and subject-specific",
      backgroundMeaning: "Explain what the environment represents.",
      backgroundMotion: "Explain meaningful motion.",
      avoid: ["Generic cards", "Decorative particles"],
      interaction: "Describe the primary learner action.",
    },
    studioContributions: [],
    qualityGates: ["TREE", "FRAME", "FIELD", "FLOW", "EXTRACT"],
    blockers: [],
    notes: "",
    createdAt: new Date().toISOString(),
  };
}

export function buildRunCommand(
  queue: PageFoundryQueue,
  items: FoundryPageBrief[],
) {
  const titles = items
    .map((item, index) => `${index + 1}. ${item.title} — ${item.route}`)
    .join("\n");
  return `Work on the studio branch. Process these Page Foundry briefs in order:\n${titles}\n\nFor each page: read its Foundry brief, verify ontology and routes, build the page, make the background vivid and semantically meaningful, extract or register reusable Studio systems, run validation, commit the page separately, update the queue, and continue immediately. ${
    queue.settings.pauseAfterEach
      ? "Pause after each page."
      : "Do not pause between non-blocked pages."
  } Stop only for a listed stop condition or a genuine blocker.`;
}
