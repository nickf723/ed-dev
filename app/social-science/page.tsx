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
  const [activeId, setActiveId] = useState("economics");
  const active =
    DISCIPLINES.find((discipline) => discipline.id === activeId) ??
    DISCIPLINES[0];
  const activeScope =
    SCOPES.find((scope) => scope.id === active.scope) ?? SCOPES[0];
  const activeScopeIndex = Math.max(
    0,
    SCOPES.findIndex((scope) => scope.id === active.scope),
  );
  const ActiveIcon = active.icon;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050509] text-slate-100 selection:bg-blue-400/25 lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <SocialDynamicsBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/45" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(96,165,250,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.028)_1px,transparent_1px)] bg-[size:40px_40px]" />
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

        <section className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-[26px] border border-blue-300/25 bg-[#05070c]/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1.4px)] [background-size:24px_24px]" />
          <div
            className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full blur-3xl transition-colors duration-300"
            style={{ background: `rgba(${active.rgb},0.10)` }}
          />

          <div className="relative grid h-full min-h-0 xl:grid-cols-[205px_minmax(0,1fr)_290px]">
            <aside className="flex min-h-0 flex-col border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
              <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-blue-300/70">
                Scale of society
              </div>
              <p className="mt-2 text-[10px] leading-4 text-slate-600">
                Social questions change as the number of people grows.
              </p>

              <div className="relative mt-4 grid min-h-0 flex-1 grid-rows-4 gap-1">
                <div className="pointer-events-none absolute bottom-[18px] left-[17px] top-[18px] w-px bg-gradient-to-b from-pink-400/25 via-blue-400/40 to-indigo-400/25" />
                {SCOPES.map((scope, index) => {
                  const enabled = scope.id === active.scope;
                  return (
                    <div
                      key={scope.id}
                      className={`relative grid grid-cols-[36px_minmax(0,1fr)] items-center gap-3 rounded-xl px-0.5 py-2 transition-all ${
                        enabled ? "bg-white/[0.055]" : "opacity-52"
                      }`}
                    >
                      <span
                        className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-[#080a10] font-mono text-[8px]"
                        style={
                          enabled
                            ? {
                                color: `rgb(${active.rgb})`,
                                borderColor: `rgba(${active.rgb},0.62)`,
                                boxShadow: `0 0 20px rgba(${active.rgb},0.20)`,
                              }
                            : undefined
                        }
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 pr-1">
                        <strong
                          className={`block text-xs font-semibold ${
                            enabled ? "text-white" : "text-slate-400"
                          }`}
                        >
                          {scope.label}
                        </strong>
                        <span className="mt-0.5 block font-mono text-[7px] uppercase tracking-[0.10em] text-slate-600">
                          {scope.range}
                        </span>
                        <span className="mt-1 block text-[8px] leading-3 text-slate-700">
                          {scope.detail}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </aside>

            <div className="flex min-h-0 flex-col border-b border-white/[0.07] p-3 sm:p-4 xl:border-b-0">
              <div className="flex items-end justify-between gap-4 px-1">
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-blue-300/70">
                    Fields
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">
                    Nine lenses on human systems.
                  </p>
                </div>
                <div className="hidden font-mono text-[8px] uppercase tracking-[0.15em] text-slate-700 sm:block">
                  hover to inspect
                </div>
              </div>

              <nav
                aria-label="Social science fields"
                className="relative mt-3 grid min-h-0 flex-1 auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
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
            </div>

            <aside className="min-h-0 p-4 sm:p-5 xl:border-l xl:border-white/[0.07]">
              <div className="grid h-full min-h-0 grid-rows-[78px_112px_74px_112px_62px_minmax(12px,1fr)_42px]">
                <div className="min-h-0">
                  <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-blue-300/70">
                    Field lens
                  </div>
                  <div className="mt-3 grid h-[50px] grid-cols-[44px_minmax(0,1fr)] items-center gap-3">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl border"
                      style={{
                        color: `rgb(${active.rgb})`,
                        borderColor: `rgba(${active.rgb},0.34)`,
                        background: `rgba(${active.rgb},0.08)`,
                      }}
                    >
                      <ActiveIcon size={20} strokeWidth={1.55} />
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-semibold tracking-[-0.03em] text-white">
                        {active.name}
                      </h2>
                      <div
                        className="mt-1 truncate font-mono text-[8px] uppercase tracking-[0.14em]"
                        style={{ color: `rgb(${active.rgb})` }}
                      >
                        {active.shortLabel}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                  <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
                    Core question
                  </div>
                  <p className="mt-2 line-clamp-3 h-[60px] text-[13px] leading-5 text-slate-300">
                    {active.question}
                  </p>
                </div>

                <div className="min-h-0 pt-4">
                  <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
                    Common lenses
                  </div>
                  <div className="mt-2 flex h-[30px] flex-wrap content-start gap-1.5 overflow-hidden">
                    {active.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.10em]"
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

                <div className="border-t border-white/[0.07] pt-4">
                  <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
                    Primary scale
                  </div>
                  <div className="relative mt-4 px-1">
                    <div className="absolute left-3 right-3 top-[5px] h-px bg-white/[0.13]" />
                    <div className="relative grid grid-cols-4">
                      {SCOPES.map((scope, index) => {
                        const enabled = index === activeScopeIndex;
                        return (
                          <div
                            key={scope.id}
                            className="flex flex-col items-center"
                          >
                            <span
                              className="h-[11px] w-[11px] rounded-full border bg-[#080a10] transition-all"
                              style={
                                enabled
                                  ? {
                                      borderColor: `rgba(${active.rgb},0.72)`,
                                      background: `rgb(${active.rgb})`,
                                      boxShadow: `0 0 14px rgba(${active.rgb},0.55)`,
                                    }
                                  : {
                                      borderColor:
                                        "rgba(148,163,184,0.22)",
                                    }
                              }
                            />
                            <span
                              className={`mt-2 text-[7px] ${
                                enabled
                                  ? "text-slate-300"
                                  : "text-slate-700"
                              }`}
                            >
                              {scope.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-4">
                  <div>
                    <div className="font-mono text-[7px] uppercase tracking-[0.15em] text-slate-600">
                      Scale
                    </div>
                    <div className="mt-1 truncate text-xs font-semibold text-slate-300">
                      {activeScope.label}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[7px] uppercase tracking-[0.15em] text-slate-600">
                      Scope
                    </div>
                    <div className="mt-1 truncate text-xs font-semibold text-slate-300">
                      {activeScope.range}
                    </div>
                  </div>
                </div>

                <div aria-hidden="true" />

                <Link
                  href={active.href}
                  className="group flex h-[42px] items-center justify-between rounded-xl border px-3 text-xs font-semibold transition-all hover:bg-white/[0.05]"
                  style={{
                    color: `rgb(${active.rgb})`,
                    borderColor: `rgba(${active.rgb},0.22)`,
                    background: `rgba(${active.rgb},0.035)`,
                  }}
                >
                  <span className="truncate">Open {active.name}</span>
                  <ArrowRight
                    size={14}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </aside>
          </div>
        </section>
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
      className="group relative flex min-h-[108px] overflow-hidden rounded-[16px] border p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: selected
          ? `rgba(${discipline.rgb},0.52)`
          : `rgba(${discipline.rgb},0.18)`,
        background: selected
          ? `linear-gradient(145deg, rgba(${discipline.rgb},0.12), rgba(7,8,12,0.80) 55%, rgba(7,8,12,0.68))`
          : `linear-gradient(145deg, rgba(${discipline.rgb},0.03), rgba(7,8,12,0.66))`,
        boxShadow: selected
          ? `0 0 30px rgba(${discipline.rgb},0.07), inset 0 1px 0 rgba(255,255,255,0.04)`
          : "inset 0 1px 0 rgba(255,255,255,0.025)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(145deg, rgba(${discipline.rgb},0.11), transparent 58%)`,
        }}
      />
      <div className="relative flex h-full w-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg border"
            style={{
              color: `rgb(${discipline.rgb})`,
              borderColor: `rgba(${discipline.rgb},0.30)`,
              background: `rgba(${discipline.rgb},0.07)`,
            }}
          >
            <Icon size={15} strokeWidth={1.55} />
          </span>
          <span className="font-mono text-[7px] text-slate-700">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-2.5">
          <h3 className="truncate text-[13px] font-semibold tracking-[-0.02em] text-white">
            {discipline.name}
          </h3>
          <div
            className="mt-1 truncate font-mono text-[7px] uppercase tracking-[0.12em]"
            style={{ color: `rgba(${discipline.rgb},0.82)` }}
          >
            {discipline.shortLabel}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-[7px] uppercase tracking-[0.11em] text-slate-600">
            {discipline.scope}
          </span>
          <ArrowRight
            size={11}
            style={{ color: `rgb(${discipline.rgb})` }}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
