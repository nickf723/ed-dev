import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChefHat,
  Drama,
  Gamepad2,
  Hourglass,
  Languages,
  Music,
  Palette,
  Rocket,
  Scale,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";

type CurrentId = "meaning" | "expression" | "practice";

type FieldPresentation = {
  icon: LucideIcon;
  rgb: string;
  shortLabel: string;
  description: string;
  current: CurrentId;
};

type HumanitiesField = {
  id: string;
  label: string;
  href: string;
  status?: "active" | "placeholder";
  childCount: number;
} & FieldPresentation;

const PRESENTATION: Record<string, FieldPresentation> = {
  "humanities.philosophy": {
    icon: Scale,
    rgb: "251, 191, 36",
    shortLabel: "Reason & ethics",
    description: "Knowledge, reality, ethics, argument, and the questions underneath everything else.",
    current: "meaning",
  },
  "humanities.religion": {
    icon: Star,
    rgb: "250, 204, 21",
    shortLabel: "Belief & ritual",
    description: "Faith, ritual, theology, mythology, and human relationships with the sacred.",
    current: "meaning",
  },
  "humanities.history": {
    icon: Hourglass,
    rgb: "245, 158, 11",
    shortLabel: "Memory & evidence",
    description: "Human experience reconstructed through evidence, memory, interpretation, and change.",
    current: "meaning",
  },
  "humanities.futurology": {
    icon: Rocket,
    rgb: "34, 211, 238",
    shortLabel: "Possibility & foresight",
    description: "Possible futures shaped by technology, culture, risk, imagination, and long-term change.",
    current: "meaning",
  },
  "humanities.languages": {
    icon: Languages,
    rgb: "244, 114, 182",
    shortLabel: "Language & meaning",
    description: "Speech, writing, translation, vocabulary, and the systems humans use to share meaning.",
    current: "expression",
  },
  "humanities.literature": {
    icon: BookOpen,
    rgb: "192, 132, 252",
    shortLabel: "Story & text",
    description: "Fiction, poetry, criticism, and the written forms humans use to imagine and remember.",
    current: "expression",
  },
  "humanities.visual-arts": {
    icon: Palette,
    rgb: "232, 121, 249",
    shortLabel: "Image & form",
    description: "Painting, sculpture, design, and the visual record of human creativity.",
    current: "expression",
  },
  "humanities.music": {
    icon: Music,
    rgb: "129, 140, 248",
    shortLabel: "Sound & composition",
    description: "Rhythm, harmony, composition, performance, acoustics, and musical culture.",
    current: "expression",
  },
  "humanities.performing-arts": {
    icon: Drama,
    rgb: "248, 113, 113",
    shortLabel: "Stage & performance",
    description: "Theater, dance, cinema, and expression created through bodies, voices, and time.",
    current: "expression",
  },
  "humanities.gaming": {
    icon: Gamepad2,
    rgb: "74, 222, 128",
    shortLabel: "Play & systems",
    description: "Games, rules, interactive worlds, strategy, ludology, and designed play.",
    current: "practice",
  },
  "humanities.culinary-arts": {
    icon: ChefHat,
    rgb: "251, 146, 60",
    shortLabel: "Food & craft",
    description: "Cooking, technique, taste, tradition, hospitality, and food as cultural memory.",
    current: "practice",
  },
  "humanities.sports": {
    icon: Trophy,
    rgb: "45, 212, 191",
    shortLabel: "Competition & movement",
    description: "Athletic skill, competition, strategy, spectatorship, and physical culture.",
    current: "practice",
  },
  "humanities.culture": {
    icon: Users,
    rgb: "253, 186, 116",
    shortLabel: "Identity & practice",
    description: "Shared values, symbols, customs, identities, artifacts, and everyday ways of living.",
    current: "practice",
  },
};

const CURRENTS: readonly {
  id: CurrentId;
  label: string;
  index: string;
  detail: string;
  gridClass: string;
}[] = [
  {
    id: "meaning",
    label: "Meaning & Memory",
    index: "01",
    detail: "How humans understand existence, remember the past, and imagine what comes next.",
    gridClass: "sm:grid-cols-2 xl:grid-cols-4",
  },
  {
    id: "expression",
    label: "Language & Expression",
    index: "02",
    detail: "How ideas become words, stories, images, sound, and performance.",
    gridClass: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  },
  {
    id: "practice",
    label: "Culture & Practice",
    index: "03",
    detail: "How culture becomes play, food, sport, identity, custom, and shared life.",
    gridClass: "sm:grid-cols-2 xl:grid-cols-4",
  },
];

export default function HumanitiesPage() {
  const humanities = curriculumRegistry
    .allDomains()
    .find((domain) => domain.domainId === "humanities");

  if (!humanities) {
    throw new Error("Humanities is missing from the curriculum registry.");
  }

  const fields: HumanitiesField[] = humanities.children.map((node) => {
    const presentation = PRESENTATION[node.id] ?? {
      icon: BookOpen,
      rgb: "251, 191, 36",
      shortLabel: "Human experience",
      description: node.description ?? `Explore ${node.label} across the humanities.`,
      current: "practice" as const,
    };

    return {
      id: node.id,
      label: node.label,
      href: node.href,
      status: node.status,
      childCount: node.children?.length ?? 0,
      ...presentation,
    };
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090806] text-stone-100 selection:bg-amber-400/25 xl:h-screen xl:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(251,191,36,0.12),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(244,114,182,0.07),transparent_27%),radial-gradient(circle_at_58%_72%,rgba(129,140,248,0.055),transparent_30%),linear-gradient(135deg,#090806_0%,#080706_46%,#0b0907_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-55 [background-image:linear-gradient(rgba(251,191,36,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.018)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -right-28 top-[8%] h-[360px] w-[360px] rounded-full border border-amber-300/[0.055]" />
        <div className="absolute -right-10 top-[14%] h-[250px] w-[250px] rounded-full border border-amber-300/[0.045]" />
        <div className="absolute bottom-[8%] left-[5%] font-serif text-[170px] leading-none text-amber-100/[0.018]">Aa</div>
        <div className="absolute bottom-[6%] right-[8%] font-serif text-[150px] leading-none text-rose-100/[0.018]">♪</div>
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(9,8,6,0.02),rgba(9,8,6,0.50))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 xl:h-screen xl:min-h-0 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Humanities" },
          ]}
          eyebrow="Meaning · Memory · Expression · Culture"
          icon={BookOpen}
          title={<span>Humanities</span>}
          subtitle="Study how humans interpret experience, preserve memory, create meaning, and turn culture into language, art, ritual, play, and practice."
          accentRgb="251, 191, 36"
          titleClassName="font-serif text-[clamp(3.4rem,6vw,6.2rem)] font-semibold leading-[0.82] tracking-[-0.055em] text-[#fffaf0]"
          iconClassName="rounded-[20px]"
          aside={
            <div className="flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/20 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-amber-200/75 backdrop-blur-md">
              <span>{fields.length} fields</span>
              <span className="text-stone-700">·</span>
              <span>{CURRENTS.length} currents</span>
            </div>
          }
        />

        <section className="relative mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[26px] border border-amber-200/15 bg-black/[0.22] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-4">
          <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1.4px)] [background-size:26px_26px]" />
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-amber-300/[0.035] blur-3xl" />

          <div className="relative flex items-end justify-between gap-4 px-1">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-amber-300/70">Human atlas</div>
              <p className="mt-1 text-[11px] text-stone-600">Every humanities field, visible at once. No secondary navigation layer.</p>
            </div>
            <div className="hidden font-mono text-[8px] uppercase tracking-[0.14em] text-stone-700 sm:block">choose a field to enter</div>
          </div>

          <div className="relative mt-3 grid min-h-0 flex-1 gap-3 xl:grid-rows-[1fr_1.12fr_1fr]">
            {CURRENTS.map((current) => {
              const currentFields = fields.filter((field) => field.current === current.id);

              return (
                <section
                  key={current.id}
                  className="grid min-h-0 gap-3 rounded-[20px] border border-white/[0.055] bg-white/[0.012] p-2.5 xl:grid-cols-[138px_minmax(0,1fr)]"
                >
                  <div className="flex min-h-[86px] flex-col justify-between rounded-[15px] border border-amber-200/[0.07] bg-[#0b0907]/72 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-amber-300/70">Current {current.index}</span>
                      <span className="font-mono text-[8px] text-stone-700">{currentFields.length}</span>
                    </div>
                    <div>
                      <h2 className="text-[13px] font-semibold tracking-[-0.02em] text-stone-200">{current.label}</h2>
                      <p className="mt-1.5 text-[9px] leading-4 text-stone-600">{current.detail}</p>
                    </div>
                  </div>

                  <div className={`grid min-h-0 gap-2.5 ${current.gridClass}`}>
                    {currentFields.map((field) => (
                      <HumanitiesCard key={field.id} field={field} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function HumanitiesCard({ field }: { field: HumanitiesField }) {
  const Icon = field.icon;
  const planned = field.status === "placeholder";

  return (
    <Link
      href={field.href}
      className={`group relative flex min-h-[112px] flex-col overflow-hidden rounded-[16px] border p-3.5 backdrop-blur-md transition-all duration-300 ${planned ? "pointer-events-none opacity-45" : "hover:-translate-y-0.5"}`}
      style={{
        borderColor: `rgba(${field.rgb},0.18)`,
        background: `linear-gradient(145deg, rgba(${field.rgb},0.055), rgba(10,9,8,0.78) 56%, rgba(8,7,7,0.68))`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.025)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(145deg, rgba(${field.rgb},0.13), transparent 58%)` }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl border"
            style={{
              color: `rgb(${field.rgb})`,
              borderColor: `rgba(${field.rgb},0.30)`,
              background: `rgba(${field.rgb},0.07)`,
            }}
          >
            <Icon size={17} strokeWidth={1.5} />
          </span>

          {field.childCount > 0 ? (
            <span className="rounded-full border border-white/[0.07] bg-black/20 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-stone-600">
              {field.childCount} paths
            </span>
          ) : null}
        </div>

        <div className="mt-3 min-w-0">
          <h3 className="truncate text-[14px] font-semibold tracking-[-0.025em] text-white">{field.label}</h3>
          <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.13em]" style={{ color: `rgba(${field.rgb},0.82)` }}>
            {field.shortLabel}
          </div>
          <p className="mt-2 line-clamp-2 text-[9px] leading-4 text-stone-600">{field.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-[7px] uppercase tracking-[0.11em] text-stone-700">Explore</span>
          <ArrowRight size={12} style={{ color: `rgb(${field.rgb})` }} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
