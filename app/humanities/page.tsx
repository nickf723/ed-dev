"use client";

import Link from "next/link";
import { useState } from "react";
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

  const activeField = fields.find((field) => field.id === activeFieldId) ?? fields[0];
  const activeMeta = activeField ? PRESENTATION[activeField.id] : undefined;
  const selectedOperation = activeOperation
    ? OPERATIONS.find((operation) => operation.id === activeOperation)
    : undefined;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090708] text-stone-100 selection:bg-amber-300/25">
      <HumanitiesBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1420px] px-4 pb-14 sm:px-6 lg:px-8">
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
            titleClassName="font-serif text-[clamp(2.8rem,5.2vw,5.5rem)] font-semibold leading-[0.84] tracking-[-0.05em] text-[#fffaf2]"
            headerClassName="border-amber-100/[0.10]"
          />
        </div>

        <section className="mx-auto mt-5 max-w-[1260px]">
          <div className="border-b border-amber-100/[0.10] pb-4">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-amber-200/68">Meaning weave</div>
            <div className="mt-1 grid gap-3 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
              <h2 className="max-w-4xl font-serif text-[clamp(1.65rem,3vw,2.7rem)] leading-[0.97] tracking-[-0.03em] text-white">
                Different fields emphasize different moves in the same human meaning-making system.
              </h2>
              <p className="text-[13px] leading-6 text-stone-400">
                Read across a row for a field signature. Read down a column to see which disciplines strongly share an operation. The dots are concentrations, not walls.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
            <div className="min-w-0 overflow-hidden border-y border-white/[0.09] bg-black/[0.08] backdrop-blur-[8px]">
              <div className="hidden grid-cols-[minmax(190px,1.3fr)_repeat(4,minmax(82px,0.72fr))_28px] border-b border-white/[0.07] lg:grid">
                <div className="px-3 py-2 font-mono text-[8px] uppercase tracking-[0.07em] text-stone-600">Field</div>
                {OPERATIONS.map((operation) => {
                  const selected = activeOperation === operation.id;
                  const Icon = operation.icon;
                  return (
                    <button
                      key={operation.id}
                      type="button"
                      onClick={() => setActiveOperation((current) => current === operation.id ? null : operation.id)}
                      className="flex items-center justify-center gap-1.5 border-l border-white/[0.055] px-2 py-2 text-center transition hover:bg-white/[0.02]"
                      style={{
                        color: selected ? `rgb(${operation.rgb})` : `rgba(${operation.rgb},0.62)`,
                        background: selected ? `rgba(${operation.rgb},0.055)` : "transparent",
                      }}
                      aria-pressed={selected}
                      title={operation.question}
                    >
                      <Icon size={12} strokeWidth={1.5} />
                      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.045em]">{operation.label}</span>
                    </button>
                  );
                })}
                <div />
              </div>

              <div className="grid grid-cols-2 gap-2 border-b border-white/[0.07] p-2 sm:grid-cols-4 lg:hidden">
                {OPERATIONS.map((operation) => {
                  const selected = activeOperation === operation.id;
                  return (
                    <button
                      key={operation.id}
                      type="button"
                      onClick={() => setActiveOperation((current) => current === operation.id ? null : operation.id)}
                      className="border px-2 py-2 text-left font-mono text-[9px] uppercase"
                      style={{
                        color: `rgb(${operation.rgb})`,
                        borderColor: selected ? `rgba(${operation.rgb},0.36)` : "rgba(255,255,255,0.07)",
                        background: selected ? `rgba(${operation.rgb},0.055)` : "transparent",
                      }}
                      aria-pressed={selected}
                    >
                      {operation.label}
                    </button>
                  );
                })}
              </div>

              <nav aria-label="Humanities fields">
                {fields.map((field) => {
                  const meta = PRESENTATION[field.id];
                  const Icon = meta.icon;
                  const planned = field.status === "placeholder";
                  const relevant = !activeOperation || meta.operations.includes(activeOperation);

                  const row = (
                    <div
                      className={`group grid min-h-[46px] items-center gap-2 border-b border-white/[0.055] px-3 py-1.5 transition last:border-b-0 lg:grid-cols-[minmax(190px,1.3fr)_repeat(4,minmax(82px,0.72fr))_28px] ${relevant ? "hover:bg-white/[0.022]" : "opacity-[0.25]"}`}
                      onMouseEnter={() => setActiveFieldId(field.id)}
                      onFocus={() => setActiveFieldId(field.id)}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                          style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)`, background: `rgba(${meta.rgb},0.035)` }}
                        >
                          <Icon size={12} strokeWidth={1.45} />
                        </span>
                        <span className="min-w-0">
                          <strong className="block truncate font-serif text-[14px] leading-4 text-white">{field.label}</strong>
                          <span className="mt-0.5 block truncate font-mono text-[7px] uppercase tracking-[0.045em]" style={{ color: `rgba(${meta.rgb},0.64)` }}>{meta.shortLabel}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 lg:contents">
                        {OPERATIONS.map((operation) => {
                          const participates = meta.operations.includes(operation.id);
                          const selected = activeOperation === operation.id;
                          return (
                            <div
                              key={operation.id}
                              className="relative flex min-h-[24px] items-center justify-center lg:min-h-0 lg:border-l lg:border-white/[0.04]"
                              title={participates ? `${field.label}: ${operation.label}` : undefined}
                            >
                              <span
                                className="h-2 w-2 rounded-full border transition-all"
                                style={{
                                  borderColor: participates ? `rgba(${operation.rgb},0.62)` : "rgba(255,255,255,0.075)",
                                  background: participates ? `rgba(${operation.rgb},${selected ? 0.9 : 0.36})` : "transparent",
                                  boxShadow: participates && selected ? `0 0 15px rgba(${operation.rgb},0.38)` : "none",
                                  transform: participates && selected ? "scale(1.3)" : "scale(1)",
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="hidden justify-end lg:flex">
                        {planned ? <span className="font-mono text-[7px] uppercase text-stone-700">plan</span> : <ArrowRight size={11} className="text-stone-700 transition group-hover:translate-x-0.5 group-hover:text-white" />}
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

            <aside className="lg:sticky lg:top-[172px]">
              <div className="border border-amber-100/[0.11] bg-[#100c0b]/62 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.07em] text-stone-500">Reading now</span>
                  {activeOperation ? (
                    <button
                      type="button"
                      onClick={() => setActiveOperation(null)}
                      className="font-mono text-[7px] uppercase tracking-[0.05em] text-stone-600 transition hover:text-white"
                    >
                      clear lens
                    </button>
                  ) : null}
                </div>

                <div className="mt-3 flex items-start gap-3">
                  {activeMeta ? (
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                      style={{ color: `rgb(${activeMeta.rgb})`, borderColor: `rgba(${activeMeta.rgb},0.28)`, background: `rgba(${activeMeta.rgb},0.035)` }}
                    >
                      {(() => {
                        const Icon = activeMeta.icon;
                        return <Icon size={15} strokeWidth={1.45} />;
                      })()}
                    </span>
                  ) : null}
                  <div className="min-w-0">
                    <strong className="font-serif text-[18px] text-white">{activeField?.label ?? "Humanities"}</strong>
                    <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.055em]" style={{ color: activeMeta ? `rgba(${activeMeta.rgb},0.68)` : undefined }}>
                      {activeMeta?.shortLabel}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[13px] leading-6 text-stone-300">{activeMeta?.question}</p>

                <div className="mt-4 border-t border-white/[0.07] pt-3">
                  <div className="font-mono text-[8px] uppercase tracking-[0.06em] text-stone-600">Field signature</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {OPERATIONS.map((operation) => {
                      const participates = activeMeta?.operations.includes(operation.id);
                      return (
                        <span
                          key={operation.id}
                          className="border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.045em]"
                          style={{
                            color: participates ? `rgba(${operation.rgb},0.88)` : "rgba(120,113,108,0.34)",
                            borderColor: participates ? `rgba(${operation.rgb},0.18)` : "rgba(255,255,255,0.05)",
                            background: participates ? `rgba(${operation.rgb},0.035)` : "transparent",
                          }}
                        >
                          {operation.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 border-t border-white/[0.07] pt-3">
                  <div className="font-mono text-[8px] uppercase tracking-[0.06em] text-stone-600">
                    {selectedOperation ? `${selectedOperation.label} lens` : "How to read the weave"}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-5 text-stone-500">
                    {selectedOperation
                      ? selectedOperation.question
                      : "Hover a field to inspect its dominant question. Select an operation above the matrix to see which fields concentrate on that move."}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto mt-7 max-w-[1260px] border-t border-amber-100/[0.10] pt-5">
          <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start">
            <div>
              <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.07em] text-amber-200/62">Follow one artifact</div>
              <h2 className="mt-1 font-serif text-[22px] tracking-[-0.025em] text-white">A manuscript crosses the weave.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[12px] leading-5 text-stone-400">
              <ArtifactStep label="History" detail="evidence" />
              <ArrowRight size={11} className="text-stone-700" />
              <ArtifactStep label="Religion" detail="belief" />
              <ArrowRight size={11} className="text-stone-700" />
              <ArtifactStep label="Languages" detail="transmission" />
              <ArrowRight size={11} className="text-stone-700" />
              <ArtifactStep label="Literature" detail="voice" />
              <ArrowRight size={11} className="text-stone-700" />
              <ArtifactStep label="Visual Arts" detail="material" />
              <ArrowRight size={11} className="text-stone-700" />
              <ArtifactStep label="Culture" detail="memory" />
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
      <strong className="font-serif text-[14px] text-stone-200">{label}</strong>
      <span className="font-mono text-[7px] uppercase tracking-[0.05em] text-stone-600">{detail}</span>
    </span>
  );
}
