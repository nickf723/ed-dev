"use client";

import { useMemo, useState } from "react";
import {
  BookOpenText,
  Footprints,
  History,
  Landmark,
  MessageCircleQuestion,
  UsersRound,
} from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type LensKey =
  | "text"
  | "practice"
  | "material"
  | "community"
  | "history"
  | "experience";

type Lens = {
  key: LensKey;
  label: string;
  icon: typeof BookOpenText;
  rgb: string;
  question: string;
  evidence: readonly string[];
  caution: string;
};

const LENSES: readonly Lens[] = [
  {
    key: "text",
    label: "Text & Story",
    icon: BookOpenText,
    rgb: "251,191,36",
    question:
      "Which stories, teachings, genres, memories, or authoritative words are invoked, and who interprets them?",
    evidence: [
      "recited narrative",
      "written program",
      "commentary",
      "translation choices",
    ],
    caution:
      "Texts do not interpret themselves. Reception, authority, language, genre, and community context matter.",
  },
  {
    key: "practice",
    label: "Ritual & Body",
    icon: Footprints,
    rgb: "244,114,182",
    question:
      "What do participants actually do with bodies, time, food, sound, movement, objects, and repeated sequences?",
    evidence: [
      "gesture and posture",
      "timing",
      "music or silence",
      "food and abstention",
    ],
    caution:
      "Observed action does not automatically reveal inner belief. Ask participants, compare occasions, and avoid reading symbolism into every detail.",
  },
  {
    key: "material",
    label: "Material & Place",
    icon: Landmark,
    rgb: "94,234,212",
    question:
      "How do buildings, landscapes, images, clothing, objects, technologies, and sensory environments organize religious life?",
    evidence: [
      "spatial layout",
      "objects handled",
      "dress",
      "soundscape and lighting",
    ],
    caution:
      "Objects can have multiple uses and meanings. Material evidence should be contextualized rather than treated as a transparent code.",
  },
  {
    key: "community",
    label: "Community & Power",
    icon: UsersRound,
    rgb: "125,211,252",
    question:
      "Who participates, who leads, who is excluded, how are roles negotiated, and what institutions or relationships sustain the gathering?",
    evidence: [
      "roles and offices",
      "donations",
      "age or status patterns",
      "formal and informal authority",
    ],
    caution:
      "A community is rarely internally uniform. Disagreement, hierarchy, migration, gender, class, ethnicity, generation, and local history can all matter.",
  },
  {
    key: "history",
    label: "History & Change",
    icon: History,
    rgb: "192,132,252",
    question:
      "Which parts are inherited, recently introduced, revived, contested, or transformed by migration, politics, technology, or contact with others?",
    evidence: [
      "older photographs",
      "archival records",
      "oral histories",
      "changes in venue or sequence",
    ],
    caution:
      "Tradition is not the opposite of change. Practices can be old, new, revived, or continuously reinterpreted while still being experienced as traditional.",
  },
  {
    key: "experience",
    label: "Experience & Meaning",
    icon: MessageCircleQuestion,
    rgb: "251,146,60",
    question:
      "How do different participants describe what the event means, feels like, accomplishes, or connects them to?",
    evidence: ["interviews", "testimony", "emotion words", "personal memories"],
    caution:
      "First-person accounts are essential evidence, but no one participant speaks for an entire tradition or community.",
  },
] as const;

const FIELDNOTE = {
  title: "Fictional fieldnote packet",
  text: "A community holds an annual evening gathering. Families arrive with food, elders recount inherited stories, a procession moves through the neighborhood, musicians repeat a familiar refrain, donations support a local institution, and participants describe the night in different ways.",
} as const;

export default function TheologyVisualizer() {
  const [lensKey, setLensKey] = useState<LensKey>("practice");
  const active = useMemo(
    () => LENSES.find((lens) => lens.key === lensKey) ?? LENSES[0],
    [lensKey]
  );
  const ActiveIcon = active.icon;

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-amber-100/[0.12]"
      style={{ background: "rgba(22,12,9,0.24)" }}
    >
      <div className="grid border-b border-amber-100/[0.08] lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="p-5 sm:p-6">
          <div className="text-amber-200/62 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            Comparative study instrument · one case, many questions
          </div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.047em] text-white">
            Change the lens, not the people.
          </h3>
          <p className="text-amber-50/62 mt-3 max-w-3xl text-[14px] leading-6">
            The same event can produce textual, ritual, material, social,
            historical, and experiential evidence. These lenses are
            complementary research angles, not boxes for classifying entire
            religions.
          </p>
        </div>
        <div className="border-t border-amber-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <span className="text-rose-200/58 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]">
            Constructed example
          </span>
          <p className="mt-3 text-[12px] leading-5 text-amber-50/50">
            The fieldnote below is fictional. It deliberately combines generic
            features so the widget can teach method without pretending to
            summarize a real tradition.
          </p>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {LENSES.map((lens) => {
            const Icon = lens.icon;
            const selected = lens.key === lensKey;
            return (
              <button
                key={lens.key}
                type="button"
                onClick={() => setLensKey(lens.key)}
                className="flex items-center gap-3 border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
                style={{
                  borderColor: selected
                    ? `rgba(${lens.rgb},0.34)`
                    : "rgba(255,255,255,0.07)",
                  background: selected
                    ? `rgba(${lens.rgb},0.07)`
                    : "rgba(0,0,0,0.06)",
                }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center border"
                  style={{
                    color: `rgb(${lens.rgb})`,
                    borderColor: `rgba(${lens.rgb},0.25)`,
                    background: `rgba(${lens.rgb},0.04)`,
                  }}
                >
                  <Icon size={15} />
                </span>
                <span>
                  <strong className="text-white/88 block text-[13px]">
                    {lens.label}
                  </strong>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.07em] text-stone-500">
                    research lens
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
          <div className="border border-white/[0.07] bg-black/[0.075] p-4 backdrop-blur-[10px] sm:p-5">
            <span className="text-amber-200/46 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]">
              {FIELDNOTE.title}
            </span>
            <p className="text-stone-300/72 mt-3 text-[14px] leading-7">
              {FIELDNOTE.text}
            </p>
            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <div
                className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
                style={{ color: `rgba(${active.rgb},0.72)` }}
              >
                <ActiveIcon size={14} /> {active.label}
              </div>
              <p className="text-white/88 mt-2 text-[15px] font-semibold leading-6">
                {active.question}
              </p>
            </div>
          </div>

          <div className="border border-white/[0.07] bg-black/[0.055] p-4 backdrop-blur-[10px] sm:p-5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500">
              Evidence to seek
            </div>
            <div className="mt-3 space-y-2">
              {active.evidence.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[26px_minmax(0,1fr)] gap-2 border-b border-white/[0.055] pb-2 last:border-b-0"
                >
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: `rgba(${active.rgb},0.52)` }}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-stone-400/72 text-[12px] leading-5">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="mt-5 border-l-2 pl-3"
              style={{ borderColor: `rgba(${active.rgb},0.32)` }}
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">
                Method caution
              </span>
              <p className="text-stone-400/72 mt-2 text-[12px] leading-5">
                {active.caution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}
