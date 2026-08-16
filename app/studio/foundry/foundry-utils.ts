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
    learnerQuestion: "What should the learner be able to see, choose, or explain?",
    contentScope: ["First content boundary"],
    contentHierarchy: [
      "Orientation: establish the page question",
      "Primary navigation or central academic model",
      "Supporting explanation and evidence",
      "Secondary tools and deeper routes",
    ],
    navigation: {
      primaryTask: "Help the learner choose the next meaningful destination.",
      topology: "Choose the relationship-shaped navigation topology.",
      directChildren: [],
      firstViewport: "Anchored page identity followed immediately by primary navigation.",
      secondaryNavigation: "Cross-links, tools, and supporting collections follow the direct children.",
    },
    dataSource: { kind: "curated", label: "Curated content" },
    visual: {
      academicWorld: "workshop",
      topology: "Choose a visual topology",
      evocation: "Describe what the page should feel like.",
      environmentMetaphor: "Describe the academic place the learner enters.",
      interactionMetaphor: "Describe what the learner is doing inside that place.",
      backgroundMood: "Vivid and subject-specific",
      backgroundMeaning: "Explain what every major environmental element represents.",
      backgroundMotion: "Explain meaningful motion rather than decorative drift.",
      avoid: ["Generic cards", "Decorative particles", "A recolored version of the previous page"],
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
  const briefs = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.title} — ${item.route}\n` +
        `   Navigation: ${item.navigation.primaryTask}\n` +
        `   World: ${item.visual.academicWorld} · ${item.visual.environmentMetaphor}`,
    )
    .join("\n");

  return `Work on the studio branch. Process these Page Foundry briefs in order:\n${briefs}\n\nFor each page: read its complete Foundry brief; verify ontology, direct children, routes, and sidebar ancestry; put primary navigation before supporting content; build the declared academic world rather than another generic glass dashboard; make the environment vivid, semantic, and memorable; keep one clear first-viewport center of gravity; extract or register reusable Studio systems; run validation; commit the page separately; update the queue; and continue immediately. ${
    queue.settings.pauseAfterEach
      ? "Pause after each page."
      : "Do not pause between non-blocked pages."
  } Stop only for a listed stop condition or a genuine blocker.`;
}
