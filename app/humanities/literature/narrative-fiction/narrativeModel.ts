export type NarrativeOrder = "story" | "plot";
export type EventTone = "amber" | "rose" | "cyan" | "violet";
export type EventShape = "circle" | "diamond" | "square" | "triangle";

export type NarrativeEvent = {
  id: string;
  code: string;
  title: string;
  detail: string;
  worldLabel: string;
  chronology: number;
  presentation: number;
  tone: EventTone;
  shape: EventShape;
  revealEffect: string;
};

/**
 * Original teaching microfiction. Every route-local representation derives
 * event identity and order from this one immutable register.
 */
export const NARRATIVE_EVENTS = [
  {
    id: "hidden-key",
    code: "A",
    title: "The key is hidden",
    detail: "Mara hides a brass key beneath the station clock.",
    worldLabel: "KEY / CLOCK",
    chronology: 1,
    presentation: 2,
    tone: "amber",
    shape: "circle",
    revealEffect:
      "The clock mark becomes an instruction, but the key's later importance is still uncertain.",
  },
  {
    id: "sealed-tunnel",
    code: "B",
    title: "The tunnel is sealed",
    detail:
      "A flood seals the river tunnel, and Mara never returns for the key.",
    worldLabel: "FLOOD / ABSENCE",
    chronology: 2,
    presentation: 4,
    tone: "rose",
    shape: "diamond",
    revealEffect:
      "The delayed flood reframes the abandoned room and explains why the key waited for another reader.",
  },
  {
    id: "unsigned-map",
    code: "C",
    title: "The map arrives",
    detail:
      "Twenty years later, Ivo receives an unsigned map marked with a clock.",
    worldLabel: "MAP / QUESTION",
    chronology: 3,
    presentation: 1,
    tone: "cyan",
    shape: "square",
    revealEffect:
      "A question opens before the sender, purpose, key, and flooded station history are known.",
  },
  {
    id: "signal-room",
    code: "D",
    title: "The room opens",
    detail:
      "Before the last train, Ivo finds the key and opens the abandoned signal room.",
    worldLabel: "DOOR / DISCOVERY",
    chronology: 4,
    presentation: 3,
    tone: "violet",
    shape: "triangle",
    revealEffect:
      "The immediate search resolves while an earlier gap—why the room was abandoned—remains withheld.",
  },
] as const satisfies readonly NarrativeEvent[];

export function orderedNarrativeEvents(
  order: NarrativeOrder
): readonly NarrativeEvent[] {
  const key = order === "story" ? "chronology" : "presentation";
  return [...NARRATIVE_EVENTS].sort((left, right) => left[key] - right[key]);
}

export function eventCodes(order: NarrativeOrder): string {
  return orderedNarrativeEvents(order)
    .map((event) => event.code)
    .join(" -> ");
}

export function revealedPlotEvents(step: number): readonly NarrativeEvent[] {
  const boundedStep = Math.max(1, Math.min(NARRATIVE_EVENTS.length, step));
  return orderedNarrativeEvents("plot").slice(0, boundedStep);
}

export const NARRATIVE_TRANSFER_CHECK = {
  prompt:
    "A retelling opens with the signal-room door already open, then returns to the map, key, and flood. The underlying four events are unchanged. What did the retelling alter?",
  correctId: "plot-order",
  options: [
    {
      id: "plot-order",
      label: "Plot order",
      explanation:
        "Correct. The same story events are presented in a new sequence, changing suspense and what the reader can infer at each moment.",
    },
    {
      id: "story-events",
      label: "Story events",
      explanation:
        "The event set has not changed. Only the order in which the telling gives those events to the reader has changed.",
    },
    {
      id: "genre",
      label: "Genre",
      explanation:
        "A reordered opening can affect expectations, but this evidence alone does not establish a different genre.",
    },
  ],
} as const;
