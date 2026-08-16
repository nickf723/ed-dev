export const ACADEMIC_WORLD_IDS = [
  "living-exhibit",
  "galactic-expedition",
  "archive",
  "laboratory",
  "observatory",
  "debate-chamber",
  "creative-studio",
  "marketplace",
  "field-station",
  "workshop",
] as const;

export type AcademicWorldId = (typeof ACADEMIC_WORLD_IDS)[number];

export type AcademicWorldDefinition = {
  id: AcademicWorldId;
  label: string;
  promise: string;
  environmentMetaphor: string;
  interactionMetaphor: string;
  preferredTopologies: string[];
  avoid: string[];
};

export const ACADEMIC_WORLDS: AcademicWorldDefinition[] = [
  {
    id: "living-exhibit",
    label: "Living exhibit",
    promise: "Knowledge is encountered as a living collection situated inside meaningful environments.",
    environmentMetaphor: "A conservation park, museum habitat, or connected exhibit campus.",
    interactionMetaphor: "Follow trails, enter pavilions, compare inhabitants, and move between overlapping exhibits.",
    preferredTopologies: ["exhibit campus", "habitat trail", "collection atlas", "nested enclosure"],
    avoid: ["generic dashboard", "flat card catalog", "decorative leaves without habitat meaning"],
  },
  {
    id: "galactic-expedition",
    label: "Galactic expedition",
    promise: "Navigation feels like a deliberate journey through scale, distance, and evidence.",
    environmentMetaphor: "An expedition route viewed from an observatory mission deck.",
    interactionMetaphor: "Choose a waypoint, inspect the signal, and continue outward through increasingly large systems.",
    preferredTopologies: ["expedition route", "scale navigator", "waypoint map", "instrument bay"],
    avoid: ["stars behind ordinary cards", "generic sci-fi HUD", "equal spacing that erases scale"],
  },
  {
    id: "archive",
    label: "Archive",
    promise: "Evidence, sequence, provenance, and interpretation remain visible together.",
    environmentMetaphor: "A navigable archive of records, maps, timelines, and material traces.",
    interactionMetaphor: "Open a record, compare sources, follow provenance, and reconstruct a sequence.",
    preferredTopologies: ["timeline", "catalog", "map", "evidence table"],
    avoid: ["nostalgia without evidence", "unexplained parchment texture", "one universal timeline"],
  },
  {
    id: "laboratory",
    label: "Laboratory",
    promise: "The learner changes a system and watches a model respond.",
    environmentMetaphor: "A working experimental chamber with instruments, samples, and measurable state.",
    interactionMetaphor: "Set conditions, run a trial, observe a consequence, and compare results.",
    preferredTopologies: ["process chamber", "instrument panel", "state machine", "comparison bench"],
    avoid: ["fake controls", "static lab decoration", "widgets unrelated to one central experiment"],
  },
  {
    id: "observatory",
    label: "Observatory",
    promise: "Distant or hidden systems become knowable through instruments and inference.",
    environmentMetaphor: "A viewing station that separates source, signal, detector, and interpretation.",
    interactionMetaphor: "Aim an instrument, isolate a signal, change a lens, and infer the source.",
    preferredTopologies: ["signal pipeline", "method lens", "field viewer", "scale map"],
    avoid: ["generic telescope imagery", "data without the measurement process", "decorative grids"],
  },
  {
    id: "debate-chamber",
    label: "Debate chamber",
    promise: "Questions, claims, reasons, objections, and revisions occupy distinct places.",
    environmentMetaphor: "A chamber of positions connected by visible lines of support and disagreement.",
    interactionMetaphor: "Inspect a claim, trace its reasons, raise an objection, and revise the position.",
    preferredTopologies: ["argument map", "question matrix", "dialectic network"],
    avoid: ["quote gallery", "unranked list of thinkers", "vague glowing nodes"],
  },
  {
    id: "creative-studio",
    label: "Creative studio",
    promise: "Principles become visible through making, arranging, performing, and revising.",
    environmentMetaphor: "A working studio, stage, editing room, or rehearsal space.",
    interactionMetaphor: "Compose a draft, manipulate formal elements, compare versions, and critique the result.",
    preferredTopologies: ["canvas", "mixing console", "gallery wall", "practice bench"],
    avoid: ["museum labels without making", "identical media cards", "aesthetic color alone"],
  },
  {
    id: "marketplace",
    label: "Marketplace",
    promise: "Actors, incentives, resources, constraints, and feedback circulate visibly.",
    environmentMetaphor: "A connected exchange floor rather than a finance-themed dashboard.",
    interactionMetaphor: "Change an incentive or constraint and follow the resulting flows and tradeoffs.",
    preferredTopologies: ["resource flow", "exchange network", "curve shift", "feedback loop"],
    avoid: ["stock-market decoration", "isolated statistics", "money icons as explanation"],
  },
  {
    id: "field-station",
    label: "Field station",
    promise: "Observation stays connected to place, time, uncertainty, and recorded evidence.",
    environmentMetaphor: "A situated research station inside the system being studied.",
    interactionMetaphor: "Observe, tag, sample, map, and compare traces without pretending the observer is outside the system.",
    preferredTopologies: ["field map", "observation timeline", "sample transect", "trace network"],
    avoid: ["abstract particles", "context-free facts", "laboratory precision where field uncertainty matters"],
  },
  {
    id: "workshop",
    label: "Workshop",
    promise: "Parts, constraints, transformations, and finished systems remain causally connected.",
    environmentMetaphor: "A bench where structures are assembled, tested, diagnosed, and improved.",
    interactionMetaphor: "Choose parts, assemble a system, test it under load, and refine the design.",
    preferredTopologies: ["assembly flow", "parts map", "diagnostic tree", "design tradeoff matrix"],
    avoid: ["tool icons without construction", "finished products without process", "generic engineering cards"],
  },
];

export const ACADEMIC_WORLD_BY_ID = new Map(
  ACADEMIC_WORLDS.map((world) => [world.id, world]),
);

export function academicWorldById(id: AcademicWorldId) {
  return ACADEMIC_WORLD_BY_ID.get(id);
}
