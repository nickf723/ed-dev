import Link from "next/link";
import {
  ArrowDown,
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
import HumanitiesBackground from "./HumanitiesBackground";

type CurrentId = "meaning" | "expression" | "practice";

type FieldPresentation = {
  icon: LucideIcon;
  rgb: string;
  shortLabel: string;
  question: string;
  current: CurrentId;
};

const PRESENTATION: Record<string, FieldPresentation> = {
  "humanities.philosophy": {
    icon: Scale,
    rgb: "251, 191, 36",
    shortLabel: "Reason & value",
    question: "What is real, knowable, good, beautiful, or worth believing?",
    current: "meaning",
  },
  "humanities.religion": {
    icon: Star,
    rgb: "250, 204, 21",
    shortLabel: "Belief & ritual",
    question: "How do people relate to the sacred through belief, ritual, story, and community?",
    current: "meaning",
  },
  "humanities.history": {
    icon: Hourglass,
    rgb: "245, 158, 11",
    shortLabel: "Memory & evidence",
    question: "How do we reconstruct human change from incomplete evidence and competing interpretations?",
    current: "meaning",
  },
  "humanities.futurology": {
    icon: Rocket,
    rgb: "34, 211, 238",
    shortLabel: "Foresight & possibility",
    question: "How can present trends, risks, technologies, and values help us reason about possible futures?",
    current: "meaning",
  },
  "humanities.languages": {
    icon: Languages,
    rgb: "244, 114, 182",
    shortLabel: "Language & meaning",
    question: "How do humans encode thought, identity, nuance, and relationship through language?",
    current: "expression",
  },
  "humanities.literature": {
    icon: BookOpen,
    rgb: "192, 132, 252",
    shortLabel: "Story & text",
    question: "How do written forms preserve experience, invent worlds, and invite interpretation?",
    current: "expression",
  },
  "humanities.visual-arts": {
    icon: Palette,
    rgb: "232, 121, 249",
    shortLabel: "Image & form",
    question: "How do images, objects, materials, and spaces communicate ideas and feeling?",
    current: "expression",
  },
  "humanities.music": {
    icon: Music,
    rgb: "129, 140, 248",
    shortLabel: "Sound & composition",
    question: "How do rhythm, pitch, timbre, form, and performance become musical meaning?",
    current: "expression",
  },
  "humanities.performing-arts": {
    icon: Drama,
    rgb: "248, 113, 113",
    shortLabel: "Stage & performance",
    question: "How do bodies, voices, time, space, and audiences create live or recorded expression?",
    current: "expression",
  },
  "humanities.gaming": {
    icon: Gamepad2,
    rgb: "74, 222, 128",
    shortLabel: "Play & systems",
    question: "How do rules, choices, challenges, worlds, and players create meaningful play?",
    current: "practice",
  },
  "humanities.culinary-arts": {
    icon: ChefHat,
    rgb: "251, 146, 60",
    shortLabel: "Food & craft",
    question: "How do technique, taste, memory, place, and hospitality become cuisine?",
    current: "practice",
  },
  "humanities.sports": {
    icon: Trophy,
    rgb: "45, 212, 191",
    shortLabel: "Competition & movement",
    question: "How do skill, rules, bodies, teams, spectators, and institutions shape sport?",
    current: "practice",
  },
  "humanities.culture": {
    icon: Users,
    rgb: "253, 186, 116",
    shortLabel: "Identity & custom",
    question: "How do values, symbols, habits, artifacts, and shared practices become culture?",
    current: "practice",
  },
};

const CURRENTS: readonly {
  id: CurrentId;
  index: string;
  label: string;
  prompt: string;
  detail: string;
  rgb: string;
}[] = [
  {
    id: "meaning",
    index: "01",
    label: "Meaning & Memory",
    prompt: "How do humans interpret existence, remember what happened, and imagine what could happen next?",
    detail: "Questions of truth, value, evidence, belief, memory, and possibility.",
    rgb: "251, 191, 36",
  },
  {
    id: "expression",
    index: "02",
    label: "Language & Expression",
    prompt: "How does experience become words, stories, images, sound, and performance?",
    detail: "Forms that carry thought and feeling across people, places, and time.",
    rgb: "232, 121, 249",
  },
  {
    id: "practice",
    index: "03",
    label: "Culture & Practice",
    prompt: "How do ideas become lived customs, play, food, competition, identity, and shared life?",
    detail: "Meaning embodied in repeated actions, communities, institutions, and artifacts.",
    rgb: "129, 140, 248",
  },
];

export default function HumanitiesPage() {
  const humanities = curriculumRegistry
    .allDomains()
    .find((domain) => domain.domainId === "humanities");

  if (!humanities) throw new Error("Humanities is missing from the curriculum registry.");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090708] text-stone-100 selection:bg-amber-300/25">
      <HumanitiesBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#090708]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Humanities" },
            ]}
            eyebrow="Meaning · Memory · Expression · Culture"
            eyebrowStyle="rule"
            icon={BookOpen}
            title={<span>Humanities</span>}
            subtitle="Explore how humans interpret experience, preserve memory, create expression, and turn ideas into shared cultural practice. The branches overlap constantly; this map shows three useful currents through the field."
            accentRgb="251, 191, 36"
            titleClassName="font-serif text-[clamp(3rem,5.6vw,6rem)] font-semibold leading-[0.84] tracking-[-0.05em] text-[#fffaf2]"
            headerClassName="border-amber-100/[0.10]"
          />
        </div>

        <section className="mx-auto mt-10 max-w-[980px]">
          <div className="relative border-l border-amber-200/[0.12] pl-5 sm:pl-8">
            <div className="relative mb-10 rounded-[22px] border border-amber-200/[0.11] bg-[#120d0c]/58 px-5 py-5 backdrop-blur-xl sm:px-6">
              <span className="absolute -left-[29px] top-6 flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/25 bg-[#100b0a] text-amber-200 sm:-left-[37px]">
                <BookOpen size={15} />
              </span>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-200/70">One human world · many ways to read it</div>
              <h2 className="mt-2 text-[clamp(1.45rem,2.8vw,2.2rem)] font-semibold tracking-[-0.035em] text-white">The humanities do not divide neatly. They braid.</h2>
              <p className="mt-3 max-w-3xl text-[16px] leading-7 text-stone-300">
                A song can be history, religion, language, art, technology, identity, and performance at once. Use the currents below as entry points into the kind of question you want to ask, not as walls between subjects.
              </p>
            </div>

            {CURRENTS.map((current, index) => {
              const fields = humanities.children.filter((node) => PRESENTATION[node.id]?.current === current.id);

              return (
                <section key={current.id} className="relative pb-10">
                  <span
                    className="absolute -left-[29px] top-2 flex h-9 w-9 items-center justify-center rounded-full border bg-[#100b0a] font-mono text-[10px] font-semibold sm:-left-[37px]"
                    style={{ color: `rgb(${current.rgb})`, borderColor: `rgba(${current.rgb},0.34)`, boxShadow: `0 0 22px rgba(${current.rgb},0.10)` }}
                  >
                    {current.index}
                  </span>

                  <div className="grid gap-5 lg:grid-cols-[235px_minmax(0,1fr)] lg:items-start">
                    <div>
                      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgba(${current.rgb},0.76)` }}>
                        cultural current
                      </div>
                      <h2 className="mt-1 text-[27px] font-semibold tracking-[-0.04em] text-white">{current.label}</h2>
                      <p className="mt-3 text-[15px] leading-7 text-stone-300">{current.prompt}</p>
                      <p className="mt-3 text-[13px] leading-6 text-stone-500">{current.detail}</p>
                    </div>

                    <nav aria-label={`${current.label} humanities fields`} className="grid gap-3 sm:grid-cols-2">
                      {fields.map((field) => {
                        const meta = PRESENTATION[field.id];
                        if (!meta) return null;
                        const Icon = meta.icon;
                        const planned = field.status === "placeholder";

                        const body = (
                          <article
                            className={`group relative min-h-[178px] overflow-hidden rounded-[20px] border p-5 backdrop-blur-xl ${planned ? "opacity-45" : "transition hover:-translate-y-0.5 hover:bg-white/[0.03]"}`}
                            style={{
                              borderColor: `rgba(${meta.rgb},0.18)`,
                              background: `linear-gradient(145deg, rgba(${meta.rgb},0.065), rgba(13,9,10,0.70) 54%, rgba(10,8,9,0.55))`,
                            }}
                          >
                            <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-60 blur-3xl" style={{ background: `rgba(${meta.rgb},0.10)` }} />
                            <div className="relative flex h-full flex-col">
                              <span
                                className="flex h-10 w-10 items-center justify-center rounded-[13px] border"
                                style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.28)`, background: `rgba(${meta.rgb},0.055)` }}
                              >
                                <Icon size={18} strokeWidth={1.5} />
                              </span>
                              <div className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.05em]" style={{ color: `rgba(${meta.rgb},0.72)` }}>
                                {meta.shortLabel}
                              </div>
                              <h3 className="mt-1 text-[19px] font-semibold tracking-[-0.025em] text-white">{field.label}</h3>
                              <p className="mt-2 text-[14px] leading-6 text-stone-300/85">{meta.question}</p>
                              <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[10px] uppercase tracking-[0.045em]">
                                <span className="text-stone-600">{planned ? "planned" : "open field"}</span>
                                {planned ? null : <ArrowRight size={14} style={{ color: `rgb(${meta.rgb})` }} className="transition group-hover:translate-x-1" />}
                              </div>
                            </div>
                          </article>
                        );

                        return planned ? (
                          <div key={field.id} aria-label={`${field.label}, planned`}>{body}</div>
                        ) : (
                          <Link key={field.id} href={field.href}>{body}</Link>
                        );
                      })}
                    </nav>
                  </div>

                  {index < CURRENTS.length - 1 ? (
                    <div className="mt-6 flex items-center gap-3 text-stone-600" aria-hidden="true">
                      <ArrowDown size={14} />
                      <span className="font-mono text-[9px] uppercase tracking-[0.07em]">another way meaning becomes human</span>
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-4 max-w-[980px] border-t border-amber-100/[0.10] pt-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-amber-200/65">Follow the object</div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">A single artifact can open several routes.</h2>
              <p className="mt-3 text-[15px] leading-7 text-stone-300">
                A medieval manuscript can be read as literature, visual art, language, religious practice, historical evidence, and cultural memory. Move between fields when the question you are asking changes.
              </p>
            </div>
            <div className="rounded-[18px] border border-white/[0.08] bg-black/[0.18] p-4 backdrop-blur-xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.055em] text-stone-500">The map is porous</div>
              <p className="mt-2 text-[14px] leading-6 text-stone-300">Humanities branches are different toolkits for interpretation. Their borders should help orientation without pretending human culture stays inside departments.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
