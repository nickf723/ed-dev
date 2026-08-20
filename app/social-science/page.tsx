import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Brain,
  Coins,
  Gavel,
  Landmark,
  Map as MapIcon,
  MessageSquare,
  Scale,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import SocialDynamicsBackground from "./SocialDynamicsBackground";

type FieldPresentation = {
  icon: LucideIcon;
  rgb: string;
  shortLabel: string;
  question: string;
  span: string;
};

type ScaleBand = {
  id: string;
  index: string;
  label: string;
  range: string;
  prompt: string;
  rgb: string;
  routes: readonly string[];
};

const PRESENTATION: Record<string, FieldPresentation> = {
  "/social-science/psychology": {
    icon: Brain,
    rgb: "244, 114, 182",
    shortLabel: "Mind & behavior",
    question: "How do perception, memory, emotion, development, and behavior work?",
    span: "individual → group",
  },
  "/social-science/communications": {
    icon: MessageSquare,
    rgb: "34, 211, 238",
    shortLabel: "Signals & media",
    question: "How does information move between people and through media systems?",
    span: "interaction → institution",
  },
  "/social-science/linguistics": {
    icon: Landmark,
    rgb: "163, 230, 53",
    shortLabel: "Language systems",
    question: "How does language encode meaning, identity, structure, and social difference?",
    span: "interaction → population",
  },
  "/social-science/economics": {
    icon: Coins,
    rgb: "52, 211, 153",
    shortLabel: "Resources & choice",
    question: "How do people and institutions allocate scarce resources and respond to incentives?",
    span: "individual ↔ institution",
  },
  "/social-science/political-science": {
    icon: Gavel,
    rgb: "251, 191, 36",
    shortLabel: "Power & governance",
    question: "How is collective power organized, contested, legitimized, and exercised?",
    span: "institution → population",
  },
  "/social-science/law": {
    icon: Scale,
    rgb: "248, 113, 113",
    shortLabel: "Rules & justice",
    question: "How do societies formalize rights, duties, procedures, remedies, and authority?",
    span: "interaction → institution",
  },
  "/social-science/sociology": {
    icon: Users,
    rgb: "129, 140, 248",
    shortLabel: "Groups & structure",
    question: "How do groups, norms, identities, inequality, and institutions shape social life?",
    span: "group → population",
  },
  "/social-science/anthropology": {
    icon: Search,
    rgb: "251, 146, 60",
    shortLabel: "Humans & culture",
    question: "How do human lifeways vary across cultures, environments, places, and deep time?",
    span: "community → species",
  },
  "/social-science/geography": {
    icon: MapIcon,
    rgb: "56, 189, 248",
    shortLabel: "People & place",
    question: "How do population, movement, environment, economy, and place shape one another?",
    span: "neighborhood → globe",
  },
};

const SCALE_BANDS: readonly ScaleBand[] = [
  {
    id: "individual",
    index: "01",
    label: "Individual",
    range: "one person",
    prompt: "What is happening within one mind, body, decision, or developmental history?",
    rgb: "244, 114, 182",
    routes: ["/social-science/psychology"],
  },
  {
    id: "interaction",
    index: "02",
    label: "Interaction",
    range: "people in contact",
    prompt: "What changes when people communicate, coordinate, interpret, persuade, or share language?",
    rgb: "34, 211, 238",
    routes: ["/social-science/communications", "/social-science/linguistics"],
  },
  {
    id: "institution",
    index: "03",
    label: "Institutions",
    range: "organized rules & systems",
    prompt: "What happens when choices become structured by markets, governments, courts, organizations, and formal rules?",
    rgb: "251, 191, 36",
    routes: ["/social-science/economics", "/social-science/political-science", "/social-science/law"],
  },
  {
    id: "population",
    index: "04",
    label: "Population & Culture",
    range: "communities → societies → globe",
    prompt: "What patterns emerge across groups, places, cultures, identities, migration, and long stretches of human time?",
    rgb: "129, 140, 248",
    routes: ["/social-science/sociology", "/social-science/anthropology", "/social-science/geography"],
  },
];

export default function SocialSciencesPage() {
  const social = curriculumRegistry
    .allDomains()
    .find((domain) => domain.domainId === "social");

  if (!social) throw new Error("Social Science is missing from the curriculum registry.");

  const byHref = new Map(social.children.map((node) => [node.href, node]));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050711] text-slate-100 selection:bg-blue-300/25">
      <div className="pointer-events-none fixed inset-0 z-0">
        <SocialDynamicsBackground />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 16% 18%, rgba(244,114,182,0.11), transparent 24%), radial-gradient(circle at 78% 28%, rgba(34,211,238,0.09), transparent 28%), radial-gradient(circle at 72% 78%, rgba(129,140,248,0.12), transparent 32%), linear-gradient(to bottom, rgba(5,7,17,0.18), rgba(5,7,17,0.80))",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-25 [background-image:linear-gradient(rgba(96,165,250,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.025)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#050711]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Social Sciences" },
            ]}
            eyebrow="People · Interaction · Institutions · Populations"
            eyebrowStyle="rule"
            icon={Users}
            title={<span>Social Sciences</span>}
            subtitle="Study human behavior and collective life by changing the scale of the question. The disciplines below are entry points, not sealed boxes: most social questions cross more than one scale."
            accentRgb="96, 165, 250"
            titleClassName="text-[clamp(2.8rem,5.4vw,5.8rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-[#f8fbff]"
            headerClassName="border-blue-100/[0.10]"
          />
        </div>

        <section className="mx-auto mt-10 max-w-[920px]">
          <div className="grid gap-4 border-l border-blue-200/[0.12] pl-5 sm:pl-8">
            <div className="relative rounded-[22px] border border-blue-200/[0.11] bg-[#08101d]/58 px-5 py-5 backdrop-blur-xl sm:px-6">
              <span className="absolute -left-[29px] top-6 flex h-9 w-9 items-center justify-center rounded-full border border-blue-300/25 bg-[#07101d] text-blue-200 sm:-left-[37px]">
                <Users size={15} />
              </span>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-blue-200/70">One human system · many useful zoom levels</div>
              <h2 className="mt-2 text-[clamp(1.45rem,2.7vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">Change the scale, and a different kind of question comes into focus.</h2>
              <p className="mt-3 max-w-3xl text-[16px] leading-7 text-slate-300">
                Psychology may begin with one person; sociology may begin with groups; economics may move between individual choices and institutions. The map below shows useful starting scales without pretending those boundaries are rigid.
              </p>
            </div>

            {SCALE_BANDS.map((band, bandIndex) => {
              const nodes = band.routes.flatMap((href) => {
                const node = byHref.get(href);
                return node ? [node] : [];
              });

              return (
                <section key={band.id} className="relative py-2">
                  <span
                    className="absolute -left-[29px] top-8 flex h-9 w-9 items-center justify-center rounded-full border bg-[#07101d] font-mono text-[10px] font-semibold sm:-left-[37px]"
                    style={{ color: `rgb(${band.rgb})`, borderColor: `rgba(${band.rgb},0.34)`, boxShadow: `0 0 22px rgba(${band.rgb},0.10)` }}
                  >
                    {band.index}
                  </span>

                  <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                    <div className="pt-2">
                      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${band.rgb},0.78)` }}>
                        {band.range}
                      </div>
                      <h2 className="mt-1 text-[25px] font-semibold tracking-[-0.035em] text-white">{band.label}</h2>
                      <p className="mt-2 text-[14px] leading-6 text-slate-400">{band.prompt}</p>
                    </div>

                    <nav aria-label={`${band.label} social science fields`} className="grid gap-3 sm:grid-cols-2">
                      {nodes.map((node) => {
                        const meta = PRESENTATION[node.href];
                        if (!meta) return null;
                        const Icon = meta.icon;
                        const planned = node.status === "placeholder";

                        const body = (
                          <article
                            className={`group relative min-h-[170px] overflow-hidden rounded-[20px] border p-5 backdrop-blur-xl ${planned ? "opacity-50" : "transition hover:-translate-y-0.5 hover:bg-white/[0.035]"}`}
                            style={{
                              borderColor: `rgba(${meta.rgb},0.18)`,
                              background: `linear-gradient(145deg, rgba(${meta.rgb},0.07), rgba(5,9,17,0.70) 52%, rgba(5,9,17,0.52))`,
                            }}
                          >
                            <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-70 blur-3xl" style={{ background: `rgba(${meta.rgb},0.10)` }} />
                            <div className="relative flex h-full flex-col">
                              <div className="flex items-start justify-between gap-3">
                                <span
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border"
                                  style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.28)`, background: `rgba(${meta.rgb},0.055)` }}
                                >
                                  <Icon size={18} strokeWidth={1.55} />
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-slate-600">{meta.span}</span>
                              </div>
                              <div className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: `rgba(${meta.rgb},0.76)` }}>
                                {meta.shortLabel}
                              </div>
                              <h3 className="mt-1 text-[19px] font-semibold tracking-[-0.025em] text-white">{node.label}</h3>
                              <p className="mt-2 text-[14px] leading-6 text-slate-300/85">{meta.question}</p>
                              <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[10px] uppercase tracking-[0.05em]">
                                <span className="text-slate-600">{planned ? "planned" : "open field"}</span>
                                {planned ? null : <ArrowRight size={14} style={{ color: `rgb(${meta.rgb})` }} className="transition group-hover:translate-x-1" />}
                              </div>
                            </div>
                          </article>
                        );

                        return planned ? (
                          <div key={node.id} aria-label={`${node.label}, planned`}>{body}</div>
                        ) : (
                          <Link key={node.id} href={node.href}>{body}</Link>
                        );
                      })}
                    </nav>
                  </div>

                  {bandIndex < SCALE_BANDS.length - 1 ? (
                    <div className="mt-5 flex items-center gap-3 pl-1 text-slate-600" aria-hidden="true">
                      <ArrowDown size={14} />
                      <span className="font-mono text-[9px] uppercase tracking-[0.08em]">zoom out</span>
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-[920px] border-t border-blue-100/[0.10] pt-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_300px] md:items-start">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue-200/65">How to use the map</div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">Start with the question, not the department name.</h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-300">
                A migration question can involve geography, economics, politics, sociology, language, and psychology at once. Pick the field whose tools best match the part of the problem you want to inspect, then cross-link when the question changes scale.
              </p>
            </div>
            <div className="rounded-[18px] border border-white/[0.08] bg-black/[0.20] p-4 backdrop-blur-xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">Scale is a lens</div>
              <p className="mt-2 text-[14px] leading-6 text-slate-300">The same event can look psychological up close, institutional from the middle distance, and cultural or geographic when you zoom out.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
