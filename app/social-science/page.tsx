"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Brain,
  Coins,
  Gavel,
  Landmark,
  Map,
  MessageSquare,
  Scale,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import SocialDynamicsBackground from "./SocialDynamicsBackground";

type ScopeId = "individual" | "interaction" | "institution" | "population";

type Discipline = {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  rgb: string;
  scope: ScopeId;
  shortLabel: string;
  question: string;
  keywords: readonly string[];
};

const SCOPES: readonly {
  id: ScopeId;
  label: string;
  range: string;
  detail: string;
}[] = [
  {
    id: "individual",
    label: "Individual",
    range: "1 person",
    detail: "mind, behavior, choice",
  },
  {
    id: "interaction",
    label: "Interaction",
    range: "2 → 100",
    detail: "language, media, relationships",
  },
  {
    id: "institution",
    label: "Institution",
    range: "100 → millions",
    detail: "rules, markets, organizations",
  },
  {
    id: "population",
    label: "Population",
    range: "millions → global",
    detail: "culture, place, society",
  },
];

const DISCIPLINES: readonly Discipline[] = [
  {
    id: "psychology",
    name: "Psychology",
    href: "/social-science/psychology",
    icon: Brain,
    rgb: "244, 114, 182",
    scope: "individual",
    shortLabel: "Mind & behavior",
    question: "How do perception, memory, emotion, and behavior work?",
    keywords: ["cognition", "development", "behavior"],
  },
  {
    id: "communications",
    name: "Communications",
    href: "/social-science/communications",
    icon: MessageSquare,
    rgb: "34, 211, 238",
    scope: "interaction",
    shortLabel: "Signals & media",
    question: "How does information move between people and through media?",
    keywords: ["media", "rhetoric", "networks"],
  },
  {
    id: "linguistics",
    name: "Linguistics",
    href: "/social-science/linguistics",
    icon: Landmark,
    rgb: "163, 230, 53",
    scope: "interaction",
    shortLabel: "Language systems",
    question: "How does language encode meaning, identity, and social structure?",
    keywords: ["syntax", "phonology", "meaning"],
  },
  {
    id: "sociology",
    name: "Sociology",
    href: "/social-science/sociology",
    icon: Users,
    rgb: "129, 140, 248",
    scope: "population",
    shortLabel: "Groups & structure",
    question: "How do groups, norms, identities, and institutions shape society?",
    keywords: ["groups", "inequality", "institutions"],
  },
  {
    id: "anthropology",
    name: "Anthropology",
    href: "/social-science/anthropology",
    icon: Search,
    rgb: "251, 146, 60",
    scope: "population",
    shortLabel: "Humans & culture",
    question: "How do humans vary across cultures, places, and deep time?",
    keywords: ["culture", "archaeology", "evolution"],
  },
  {
    id: "economics",
    name: "Economics",
    href: "/social-science/economics",
    icon: Coins,
    rgb: "52, 211, 153",
    scope: "institution",
    shortLabel: "Resources & choice",
    question: "How do people and institutions allocate scarce resources?",
    keywords: ["markets", "incentives", "trade"],
  },
  {
    id: "political-science",
    name: "Political Science",
    href: "/social-science/political-science",
    icon: Gavel,
    rgb: "251, 191, 36",
    scope: "institution",
    shortLabel: "Power & governance",
    question: "How is collective power organized, contested, and exercised?",
    keywords: ["states", "policy", "power"],
  },
  {
    id: "law",
    name: "Law",
    href: "/social-science/law",
    icon: Scale,
    rgb: "248, 113, 113",
    scope: "institution",
    shortLabel: "Rules & justice",
    question: "How do societies formalize rules, rights, duties, and remedies?",
    keywords: ["rights", "courts", "regulation"],
  },
  {
    id: "geography",
    name: "Human Geography",
    href: "/social-science/geography",
    icon: Map,
    rgb: "56, 189, 248",
    scope: "population",
    shortLabel: "People & place",
    question: "How do people, environments, economies, and places shape one another?",
    keywords: ["place", "migration", "cities"],
  },
];

export default function SocialStudiesHub() {
  const [activeId, setActiveId] = useState("sociology");
  const active = DISCIPLINES.find((discipline) => discipline.id === activeId) ?? DISCIPLINES[0];
  const activeScope = SCOPES.find((scope) => scope.id === active.scope) ?? SCOPES[0];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050509] text-slate-100 selection:bg-blue-400/25 lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <SocialDynamicsBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/45" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(96,165,250,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_18%_20%,rgba(96,165,250,0.12),transparent_26%),radial-gradient(circle_at_82%_76%,rgba(129,140,248,0.10),transparent_30%),linear-gradient(to_bottom,rgba(5,5,9,0.04),rgba(5,5,9,0.62))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Social Sciences" },
          ]}
          eyebrow="Behavior · Groups · Institutions"
          icon={Users}
          title={<span>Social Sciences</span>}
          subtitle="Study people at every scale, from individual behavior to language, institutions, cultures, economies, and societies."
          accentRgb="96, 165, 250"
          aside={
            <div className="flex items-center gap-2 rounded-full border border-blue-400/20 bg-black/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-blue-300/80 backdrop-blur-md">
              <span>self</span>
              <ArrowRight size={11} className="text-slate-600" />
              <span>society</span>
            </div>
          }
        />

        <div className="mt-4 grid min-h-0 flex-1 gap-4 xl:grid-cols-[210px_minmax(0,1fr)_300px]">
          <aside className="relative overflow-hidden rounded-[24px] border border-blue-400/15 bg-black/25 p-4 backdrop-blur-xl sm:p-5">
            <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-blue-300/65">Scale of society</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-600">Social questions change as the number of people grows.</p>

            <div className="relative mt-5 space-y-1">
              <div className="pointer-events-none absolute bottom-5 left-[15px] top-5 w-px bg-gradient-to-b from-pink-400/25 via-blue-400/30 to-indigo-400/20" />
              {SCOPES.map((scope, index) => {
                const enabled = scope.id === active.scope;
                return (
                  <div
                    key={scope.id}
                    className={`relative flex gap-3 rounded-xl px-2 py-3 transition-all ${enabled ? "bg-white/[0.055]" : "opacity-55"}`}
                  >
                    <span
                      className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-[#08090d] font-mono text-[8px]"
                      style={
                        enabled
                          ? {
                              color: `rgb(${active.rgb})`,
                              borderColor: `rgba(${active.rgb},0.48)`,
                              boxShadow: `0 0 18px rgba(${active.rgb},0.16)`,
                            }
                          : undefined
                      }
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <strong className={`block text-xs font-semibold ${enabled ? "text-white" : "text-slate-400"}`}>
                        {scope.label}
                      </strong>
                      <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">{scope.range}</span>
                      <span className="mt-1 block text-[9px] leading-4 text-slate-700">{scope.detail}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="relative min-h-0 overflow-hidden rounded-[24px] border border-blue-400/15 bg-black/[0.20] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_22px_70px_rgba(0,0,0,0.25)] backdrop-blur-md sm:p-4">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.045)_1px,transparent_1.5px)] [background-size:24px_24px]" />

            <div className="relative mb-3 flex items-end justify-between gap-4 px-1">
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-blue-300/65">Fields</div>
                <p className="mt-1 text-xs text-slate-600">Nine lenses on human systems.</p>
              </div>
              <div className="hidden font-mono text-[8px] uppercase tracking-[0.15em] text-slate-700 sm:block">hover to inspect</div>
            </div>

            <nav aria-label="Social science fields" className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {DISCIPLINES.map((discipline, index) => (
                <FieldCard
                  key={discipline.id}
                  discipline={discipline}
                  index={index}
                  selected={discipline.id === active.id}
                  onActivate={() => setActiveId(discipline.id)}
                />
              ))}
            </nav>
          </section>

          <aside className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl sm:p-5">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-300"
              style={{ background: `rgba(${active.rgb},0.14)` }}
            />
            <div className="relative flex h-full flex-col">
              <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-blue-300/65">Field lens</div>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    color: `rgb(${active.rgb})`,
                    borderColor: `rgba(${active.rgb},0.34)`,
                    background: `rgba(${active.rgb},0.08)`,
                  }}
                >
                  <active.icon size={20} strokeWidth={1.55} />
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">{active.name}</h2>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: `rgb(${active.rgb})` }}>
                    {active.shortLabel}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">Core question</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{active.question}</p>
              </div>

              <div className="mt-4">
                <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">Common lenses</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {active.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.11em]"
                      style={{
                        color: `rgba(${active.rgb},0.88)`,
                        borderColor: `rgba(${active.rgb},0.20)`,
                        background: `rgba(${active.rgb},0.055)`,
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-white/[0.07] pt-4">
                <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">Primary scale</div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-300">{activeScope.label}</span>
                  <span className="font-mono text-[9px] text-slate-600">{activeScope.range}</span>
                </div>
              </div>

              <Link
                href={active.href}
                className="group mt-auto flex items-center justify-between rounded-xl border px-3 py-3 text-xs font-semibold transition-all hover:bg-white/[0.05]"
                style={{
                  color: `rgb(${active.rgb})`,
                  borderColor: `rgba(${active.rgb},0.20)`,
                }}
              >
                Open {active.name}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function FieldCard({
  discipline,
  index,
  selected,
  onActivate,
}: {
  discipline: Discipline;
  index: number;
  selected: boolean;
  onActivate: () => void;
}) {
  const Icon = discipline.icon;

  return (
    <Link
      href={discipline.href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group relative min-h-[132px] overflow-hidden rounded-[18px] border p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: selected ? `rgba(${discipline.rgb},0.48)` : `rgba(${discipline.rgb},0.18)`,
        background: selected
          ? `linear-gradient(145deg, rgba(${discipline.rgb},0.11), rgba(7,8,12,0.78) 55%, rgba(7,8,12,0.65))`
          : `linear-gradient(145deg, rgba(${discipline.rgb},0.03), rgba(7,8,12,0.64))`,
        boxShadow: selected ? `0 0 30px rgba(${discipline.rgb},0.06), inset 0 1px 0 rgba(255,255,255,0.04)` : "inset 0 1px 0 rgba(255,255,255,0.025)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(145deg, rgba(${discipline.rgb},0.11), transparent 58%)` }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg border"
            style={{
              color: `rgb(${discipline.rgb})`,
              borderColor: `rgba(${discipline.rgb},0.30)`,
              background: `rgba(${discipline.rgb},0.07)`,
            }}
          >
            <Icon size={17} strokeWidth={1.55} />
          </span>
          <span className="font-mono text-[8px] text-slate-700">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="mt-3">
          <h3 className="text-sm font-semibold tracking-[-0.02em] text-white">{discipline.name}</h3>
          <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.13em]" style={{ color: `rgba(${discipline.rgb},0.82)` }}>
            {discipline.shortLabel}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">{discipline.scope}</span>
          <ArrowRight size={12} style={{ color: `rgb(${discipline.rgb})` }} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
