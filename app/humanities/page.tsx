"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Archive,
  ArrowRight,
  BookOpen,
  ChefHat,
  Drama,
  Eye,
  Footprints,
  Gamepad2,
  Hourglass,
  Languages,
  Music,
  Palette,
  PenLine,
  Rocket,
  Scale,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import HumanitiesBackground from "./HumanitiesBackground";

type OperationId = "interpret" | "represent" | "enact" | "transmit";

type FieldPresentation = {
  icon: LucideIcon;
  rgb: string;
  shortLabel: string;
  question: string;
  operations: readonly OperationId[];
};

const PRESENTATION: Record<string, FieldPresentation> = {
  "humanities.philosophy": {
    icon: Scale,
    rgb: "251, 191, 36",
    shortLabel: "Reason & value",
    question: "What is real, knowable, good, beautiful, or worth believing?",
    operations: ["interpret"],
  },
  "humanities.religion": {
    icon: Star,
    rgb: "250, 204, 21",
    shortLabel: "Belief & ritual",
    question: "How do beliefs, sacred narratives, rituals, communities, and material practices make worlds meaningful?",
    operations: ["interpret", "represent", "enact", "transmit"],
  },
  "humanities.history": {
    icon: Hourglass,
    rgb: "245, 158, 11",
    shortLabel: "Memory & evidence",
    question: "How can incomplete evidence be interpreted to reconstruct change, continuity, and human experience?",
    operations: ["interpret", "transmit"],
  },
  "humanities.futurology": {
    icon: Rocket,
    rgb: "34, 211, 238",
    shortLabel: "Foresight & possibility",
    question: "How can present evidence, uncertainty, values, and scenarios help us reason about possible futures?",
    operations: ["interpret", "represent"],
  },
  "humanities.languages": {
    icon: Languages,
    rgb: "244, 114, 182",
    shortLabel: "Language & meaning",
    question: "How do linguistic systems encode thought, identity, nuance, relationship, and inherited ways of seeing?",
    operations: ["represent", "transmit"],
  },
  "humanities.literature": {
    icon: BookOpen,
    rgb: "192, 132, 252",
    shortLabel: "Story & text",
    question: "How do texts shape experience into language, narrative, voice, form, memory, and interpretation?",
    operations: ["interpret", "represent", "transmit"],
  },
  "humanities.visual-arts": {
    icon: Palette,
    rgb: "232, 121, 249",
    shortLabel: "Image & form",
    question: "How do images, objects, materials, and spaces make ideas and feeling perceptible?",
    operations: ["interpret", "represent", "transmit"],
  },
  "humanities.music": {
    icon: Music,
    rgb: "129, 140, 248",
    shortLabel: "Sound & composition",
    question: "How do rhythm, pitch, timbre, form, performance, and repetition turn sound into shared meaning?",
    operations: ["represent", "enact", "transmit"],
  },
  "humanities.performing-arts": {
    icon: Drama,
    rgb: "248, 113, 113",
    shortLabel: "Body & performance",
    question: "How do bodies, voices, timing, space, staging, and audiences create meaning through performance?",
    operations: ["represent", "enact"],
  },
  "humanities.gaming": {
    icon: Gamepad2,
    rgb: "74, 222, 128",
    shortLabel: "Play & systems",
    question: "How do rules, choices, challenges, worlds, and players create meaning through participation?",
    operations: ["represent", "enact"],
  },
  "humanities.culinary-arts": {
    icon: ChefHat,
    rgb: "251, 146, 60",
    shortLabel: "Food & craft",
    question: "How do technique, taste, ingredients, memory, place, and hospitality become cuisine and identity?",
    operations: ["enact", "transmit"],
  },
  "humanities.sports": {
    icon: Trophy,
    rgb: "45, 212, 191",
    shortLabel: "Competition & movement",
    question: "How do embodied skill, rules, competition, spectatorship, ritual, and institutions make sport meaningful?",
    operations: ["enact", "transmit"],
  },
  "humanities.culture": {
    icon: Users,
    rgb: "253, 186, 116",
    shortLabel: "Shared meaning",
    question: "How do symbols, values, habits, artifacts, institutions, identities, and practices become shared ways of life?",
    operations: ["interpret", "represent", "enact", "transmit"],
  },
};

const OPERATIONS: readonly {
  id: OperationId;
  label: string;
  verb: string;
  question: string;
  rgb: string;
  icon: LucideIcon;
}[] = [
  {
    id: "interpret",
    label: "Interpret",
    verb: "understand",
    question: "What does this mean, what counts as evidence, and which values or assumptions shape the reading?",
    rgb: "251, 191, 36",
    icon: Eye,
  },
  {
    id: "represent",
    label: "Represent",
    verb: "encode",
    question: "How does experience become language, image, story, sound, symbol, scenario, or designed form?",
    rgb: "232, 121, 249",
    icon: PenLine,
  },
  {
    id: "enact",
    label: "Enact",
    verb: "embody",
    question: "How does meaning become something people perform, practice, play, cook, compete in, or ritualize?",
    rgb: "74, 222, 128",
    icon: Footprints,
  },
  {
    id: "transmit",
    label: "Transmit",
    verb: "carry",
    question: "How does meaning survive, change, and travel across people, communities, generations, places, and media?",
    rgb: "34, 211, 238",
    icon: Archive,
  },
];

export default function HumanitiesPage() {
  const humanities = curriculumRegistry
    .allDomains()
    .find((domain) => domain.domainId === "humanities");

  if (!humanities) throw new Error("Humanities is missing from the curriculum registry.");

  const fields = humanities.children.filter((node) => PRESENTATION[node.id]);
  const [activeOperation, setActiveOperation] = useState<OperationId | null>(null);
  const [activeFieldId, setActiveFieldId] = useState("humanities.culture");

  const activeField = useMemo(
    () => fields.find((field) => field.id === activeFieldId) ?? fields[0],
    [activeFieldId, fields],
  );
  const activeMeta = activeField ? PRESENTATION[activeField.id] : undefined;
  const selectedOperation = activeOperation
    ? OPERATIONS.find((operation) => operation.id === activeOperation)
    : undefined;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090708] text-stone-100 selection:bg-amber-300/25">
      <HumanitiesBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#090708]/76 px-4 pb-3 pt-4 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Humanities" },
            ]}
            eyebrow="Interpret · Represent · Enact · Transmit"
            eyebrowStyle="rule"
            icon={BookOpen}
            title={<span>Humanities</span>}
            subtitle="Humanities fields differ less by the objects they own than by the questions they ask of human meaning. Read the weave to see how ideas become forms, practices, memory, and shared culture."
            accentRgb="251, 191, 36"
            titleClassName="font-serif text-[clamp(3rem,5.6vw,6rem)] font-semibold leading-[0.84] tracking-[-0.05em] text-[#fffaf2]"
            headerClassName="border-amber-100/[0.10]"
          />
        </div>

        <section className="mx-auto mt-7 max-w-[1180px]">
          <div className="grid gap-5 border-b border-amber-100/[0.10] pb-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-200/68">Meaning weave</div>
              <h2 className="mt-2 max-w-4xl font-serif text-[clamp(1.9rem,3.8vw,3.5rem)] leading-[0.96] tracking-[-0.035em] text-white">
                Human meaning is interpreted, represented, enacted, and carried forward.
              </h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-stone-300/88">
                No field owns one stage. A religion can be an interpretation of existence, a symbolic system, a lived practice, and an inherited tradition at the same time. A song can be text, sound, performance, history, and cultural memory. The overlaps are the structure.
              </p>
            </div>

            <div className="border-l border-amber-100/[0.12] pl-5">
              <div className="font-mono text-[9px] uppercase tracking-[0.07em] text-stone-500">Reading now</div>
              <div className="mt-2 flex items-start gap-3">
                {activeMeta ? (
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                    style={{ color: `rgb(${activeMeta.rgb})`, borderColor: `rgba(${activeMeta.rgb},0.28)` }}
                  >
                    {(() => {
                      const Icon = activeMeta.icon;
                      return <Icon size={16} strokeWidth={1.5} />;
                    })()}
                  </span>
                ) : null}
                <div>
                  <strong className="text-[16px] text-white">{activeField?.label ?? "Humanities"}</strong>
                  <p className="mt-1 text-[13px] leading-6 text-stone-400">{activeMeta?.question}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {OPERATIONS.map((operation) => {
              const Icon = operation.icon;
              const selected = operation.id === activeOperation;
              return (
                <button
                  key={operation.id}
                  type="button"
                  onClick={() => setActiveOperation((current) => current === operation.id ? null : operation.id)}
                  className="group border-y px-3 py-3 text-left transition hover:bg-white/[0.018]"
                  style={{
                    borderColor: selected ? `rgba(${operation.rgb},0.34)` : "rgba(255,255,255,0.07)",
                    background: selected ? `linear-gradient(90deg,rgba(${operation.rgb},0.07),transparent)` : "transparent",
                  }}
                  aria-pressed={selected}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} style={{ color: `rgb(${operation.rgb})` }} strokeWidth={1.5} />
                    <span>
                      <strong className="block font-serif text-[17px] text-white">{operation.label}</strong>
                      <span className="font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${operation.rgb},0.68)` }}>{operation.verb}</span>
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-stone-500">{operation.question}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden border-y border-white/[0.09] bg-black/[0.08] backdrop-blur-[8px]">
            <div className="hidden grid-cols-[minmax(210px,1.3fr)_repeat(4,minmax(100px,1fr))_36px] border-b border-white/[0.07] lg:grid">
              <div className="px-4 py-3 font-mono text-[9px] uppercase tracking-[0.08em] text-stone-600">Field / dominant question</div>
              {OPERATIONS.map((operation) => (
                <button
                  key={operation.id}
                  type="button"
                  onClick={() => setActiveOperation((current) => current === operation.id ? null : operation.id)}
                  className="border-l border-white/[0.055] px-3 py-3 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.06em] transition hover:bg-white/[0.02]"
                  style={{ color: activeOperation === operation.id ? `rgb(${operation.rgb})` : `rgba(${operation.rgb},0.58)` }}
                >
                  {operation.label}
                </button>
              ))}
              <div />
            </div>

            <nav aria-label="Humanities fields">
              {fields.map((field) => {
                const meta = PRESENTATION[field.id];
                const Icon = meta.icon;
                const planned = field.status === "placeholder";
                const relevant = !activeOperation || meta.operations.includes(activeOperation);

                const row = (
                  <div
                    className={`group grid min-h-[70px] items-center gap-3 border-b border-white/[0.06] px-4 py-3 transition last:border-b-0 lg:grid-cols-[minmax(210px,1.3fr)_repeat(4,minmax(100px,1fr))_36px] ${relevant ? "hover:bg-white/[0.022]" : "opacity-[0.28]"}`}
                    onMouseEnter={() => setActiveFieldId(field.id)}
                    onFocus={() => setActiveFieldId(field.id)}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                        style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)`, background: `rgba(${meta.rgb},0.035)` }}
                      >
                        <Icon size={15} strokeWidth={1.45} />
                      </span>
                      <span className="min-w-0">
                        <strong className="block truncate font-serif text-[16px] text-white">{field.label}</strong>
                        <span className="mt-0.5 block truncate font-mono text-[8px] uppercase tracking-[0.06em]" style={{ color: `rgba(${meta.rgb},0.66)` }}>{meta.shortLabel}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 lg:contents">
                      {OPERATIONS.map((operation) => {
                        const participates = meta.operations.includes(operation.id);
                        const selected = activeOperation === operation.id;
                        return (
                          <div
                            key={operation.id}
                            className="relative flex min-h-[32px] items-center justify-center lg:min-h-0 lg:border-l lg:border-white/[0.045]"
                            title={participates ? `${field.label}: ${operation.label}` : undefined}
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full border transition-all"
                              style={{
                                borderColor: participates ? `rgba(${operation.rgb},0.62)` : "rgba(255,255,255,0.08)",
                                background: participates ? `rgba(${operation.rgb},${selected ? 0.86 : 0.38})` : "transparent",
                                boxShadow: participates && selected ? `0 0 18px rgba(${operation.rgb},0.42)` : "none",
                                transform: participates && selected ? "scale(1.35)" : "scale(1)",
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="hidden justify-end lg:flex">
                      {planned ? <span className="font-mono text-[8px] uppercase text-stone-700">planned</span> : <ArrowRight size={13} className="text-stone-600 transition group-hover:translate-x-1 group-hover:text-white" />}
                    </div>
                  </div>
                );

                return planned ? (
                  <div key={field.id} aria-disabled="true">{row}</div>
                ) : (
                  <Link key={field.id} href={field.href}>{row}</Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-6 text-stone-400">
              {selectedOperation
                ? `${selectedOperation.label} highlights every field that strongly uses that operation. The dimmed fields still connect to humanities, but through a different primary route.`
                : "No operation is selected. Read across each field to see its distinctive signature in the humanities."}
            </p>
            {activeOperation ? (
              <button type="button" onClick={() => setActiveOperation(null)} className="shrink-0 font-mono text-[9px] uppercase tracking-[0.06em] text-stone-600 transition hover:text-white">show full weave</button>
            ) : null}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-[1180px] border-t border-amber-100/[0.10] pt-6">
          <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-amber-200/62">Follow one artifact</div>
              <h2 className="mt-2 font-serif text-[25px] tracking-[-0.025em] text-white">A medieval manuscript crosses the weave.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] leading-6 text-stone-400">
              <ArtifactStep label="History" detail="evidence & context" />
              <ArrowRight size={12} className="text-stone-700" />
              <ArtifactStep label="Religion" detail="belief & ritual" />
              <ArrowRight size={12} className="text-stone-700" />
              <ArtifactStep label="Languages" detail="words & transmission" />
              <ArrowRight size={12} className="text-stone-700" />
              <ArtifactStep label="Literature" detail="genre & voice" />
              <ArrowRight size={12} className="text-stone-700" />
              <ArtifactStep label="Visual Arts" detail="image & material" />
              <ArrowRight size={12} className="text-stone-700" />
              <ArtifactStep label="Culture" detail="use & shared memory" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ArtifactStep({ label, detail }: { label: string; detail: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 border-b border-amber-100/[0.12] pb-1">
      <strong className="font-serif text-[15px] text-stone-200">{label}</strong>
      <span className="font-mono text-[8px] uppercase tracking-[0.05em] text-stone-600">{detail}</span>
    </span>
  );
}