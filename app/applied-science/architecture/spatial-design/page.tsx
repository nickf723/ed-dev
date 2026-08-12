import Link from "next/link";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Boxes,
  LayoutGrid,
  MoveRight,
  Ruler,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import BlueprintBackground from "../BlueprintBackground";

type LessonPresentation = {
  icon: LucideIcon;
  rgb: string;
  question: string;
  artifact: string;
};

const PRESENTATION: Record<string, LessonPresentation> = {
  "applied.architecture.spatial-design.program-area": {
    icon: Ruler,
    rgb: "56, 189, 248",
    question: "What spaces are required, and how much room does each activity actually need?",
    artifact: "space program",
  },
  "applied.architecture.spatial-design.adjacency-zoning": {
    icon: Boxes,
    rgb: "74, 222, 128",
    question: "Which spaces should touch, cluster, separate, or transition between public and private zones?",
    artifact: "adjacency map",
  },
  "applied.architecture.spatial-design.circulation-wayfinding": {
    icon: Waypoints,
    rgb: "192, 132, 252",
    question: "How do people enter, move, choose directions, queue, and find their destination?",
    artifact: "circulation diagram",
  },
  "applied.architecture.spatial-design.human-scale-accessibility": {
    icon: Accessibility,
    rgb: "251, 191, 36",
    question: "Do dimensions, furniture, clearances, reach, and turning space work for real bodies and abilities?",
    artifact: "clearance study",
  },
};

export default function SpatialDesignPage() {
  const unit = curriculumRegistry.getNode("applied.architecture.spatial-design");
  if (!unit) throw new Error("Spatial Design & Program is missing from the curriculum registry.");

  const lessons = (unit.children ?? []).map((lesson) => ({
    id: lesson.id,
    label: lesson.label,
    href: lesson.href,
    description: lesson.description ?? "",
    status: lesson.status,
    presentation: PRESENTATION[lesson.id],
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06121d] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-58">
        <BlueprintBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_82%_14%,rgba(56,189,248,0.10),transparent_28%),radial-gradient(circle_at_16%_84%,rgba(74,222,128,0.06),transparent_27%),linear-gradient(to_bottom,rgba(6,18,29,0.16),rgba(3,9,16,0.92))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(125,211,252,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.025)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture", href: "/applied-science/architecture" },
            { label: "Spatial Design & Program" },
          ]}
          eyebrow="Activities · Areas · Adjacencies · Circulation · Human scale"
          icon={LayoutGrid}
          title={<span>Spatial Design & Program</span>}
          subtitle="Turn a human brief into an organized spatial system before committing to walls, doors, and finished form."
          accentRgb="56, 189, 248"
          titleClassName="font-serif text-[clamp(2.7rem,4.8vw,5.2rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-sky-300/[0.13]"
          aside={
            <div className="rounded-full border border-sky-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-sky-200/85 backdrop-blur-md">
              brief → relationships → plan
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-sky-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-300/72">Unit throughline</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">A floor plan is the consequence of relationships, not the starting point.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">
              Before drawing rooms, identify who will use the building, what they need to do, how much space those activities require, which spaces should be near each other, and how people will move between them. Walls come later, after the spatial logic has something worth enclosing.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <CoreFact icon={Users} label="Activities" text="Start with people, tasks, furniture, equipment, capacity, and duration." rgb="56, 189, 248" />
            <CoreFact icon={Boxes} label="Relationships" text="Group, separate, prioritize, and sequence spaces before drawing exact geometry." rgb="74, 222, 128" />
            <CoreFact icon={Waypoints} label="Movement" text="Connect the spaces with clear paths that work for different users and abilities." rgb="192, 132, 252" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-sky-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300/75">From brief to plan</div>
              <p className="mt-1 text-[13px] text-slate-500">A neighborhood library, before any walls are drawn.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">activity → room → adjacency → path</div>
          </div>

          <ProgramSequence />
        </section>

        <section className="mt-3 rounded-[24px] border border-white/[0.065] bg-black/[0.20] p-4 backdrop-blur-xl">
          <div className="px-1 pb-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-300/72">Learning path</div>
            <p className="mt-1 text-[13px] text-slate-500">Four questions turn an abstract brief into spatial logic. Each becomes its own lesson.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {lessons.map((lesson, index) => {
              const presentation = lesson.presentation ?? {
                icon: LayoutGrid,
                rgb: "125, 211, 252",
                question: lesson.description,
                artifact: "design study",
              };
              const Icon = presentation.icon;
              const planned = lesson.status === "placeholder";

              return (
                <article
                  key={lesson.id}
                  className="relative min-h-[230px] rounded-[18px] border p-4"
                  style={{
                    borderColor: `rgba(${presentation.rgb},0.16)`,
                    background: `linear-gradient(150deg, rgba(${presentation.rgb},0.045), rgba(3,10,17,0.72) 58%)`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl border"
                      style={{
                        color: `rgb(${presentation.rgb})`,
                        borderColor: `rgba(${presentation.rgb},0.24)`,
                        background: `rgba(${presentation.rgb},0.055)`,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[9px] text-slate-700">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.02em] text-slate-100">{lesson.label}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-slate-500">{presentation.question}</p>
                  <div className="mt-4 border-t border-white/[0.05] pt-3">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-700">Produces</span>
                    <div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${presentation.rgb},0.70)` }}>{presentation.artifact}</div>
                  </div>
                  {planned ? (
                    <span className="absolute bottom-4 right-4 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-600">Planned</span>
                  ) : (
                    <Link href={lesson.href} className="absolute bottom-4 right-4 text-sky-300"><ArrowRight size={14} /></Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-3">
          <PrincipleCard title="Do not optimize area alone" text="A smaller plan can be worse if circulation becomes confusing, furniture no longer fits, or clearances disappear." />
          <PrincipleCard title="Adjacency is directional" text="The public entrance may need to be near a help desk, while staff storage should be near work areas without opening directly into public space." />
          <PrincipleCard title="Movement is space too" text="Corridors, lobbies, stairs, queues, turning areas, and transitions consume area because people need room to move, pause, pass, and orient." />
        </section>

        <nav className="mt-3 pb-8" aria-label="Spatial design navigation">
          <Link href="/applied-science/architecture" className="inline-flex items-center gap-2 rounded-full border border-amber-300/[0.10] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
            <ArrowLeft size={12} /> Architecture map
          </Link>
        </nav>
      </div>
    </main>
  );
}

function ProgramSequence() {
  const stages = [
    {
      title: "Activities",
      rgb: "56, 189, 248",
      items: ["arrive + return books", "browse + read", "ask for help", "staff processing"],
    },
    {
      title: "Spaces",
      rgb: "74, 222, 128",
      items: ["entry / returns", "stacks + reading", "service desk", "staff workroom"],
    },
    {
      title: "Adjacency",
      rgb: "251, 191, 36",
      items: ["entry ↔ desk", "desk ↔ staff", "stacks ↔ reading", "quiet ↔ away from entry"],
    },
    {
      title: "Circulation",
      rgb: "192, 132, 252",
      items: ["clear arrival", "visible decision point", "short staff route", "loop through collection"],
    },
  ] as const;

  return (
    <div className="grid gap-2 md:grid-cols-4">
      {stages.map((stage, index) => (
        <div key={stage.title} className="relative rounded-[17px] border border-white/[0.05] bg-black/[0.16] p-4">
          {index < stages.length - 1 ? (
            <MoveRight size={14} className="absolute -right-2 top-8 z-10 hidden text-sky-300/30 md:block" />
          ) : null}
          <div className="flex items-center justify-between gap-3">
            <strong className="text-[12px] text-slate-200">{stage.title}</strong>
            <span className="font-mono text-[9px]" style={{ color: `rgba(${stage.rgb},0.70)` }}>0{index + 1}</span>
          </div>
          <div className="mt-3 grid gap-2">
            {stage.items.map((item) => (
              <div key={item} className="rounded-xl border px-3 py-2 text-[10px] leading-4 text-slate-500" style={{ borderColor: `rgba(${stage.rgb},0.10)`, background: `rgba(${stage.rgb},0.018)` }}>{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span>
      <span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span>
    </div>
  );
}

function PrincipleCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[18px] border border-sky-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl">
      <h3 className="text-[13px] font-semibold text-slate-200">{title}</h3>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}
