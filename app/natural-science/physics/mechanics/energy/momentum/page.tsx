import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import EnergyField from "../_components/EnergyField";
import { ArrowRight, CircleDashed, MoveRight, Timer, Scale, Orbit, type LucideIcon } from "lucide-react";

const NODE_ID = "natural.physics.mechanics.energy.momentum";

const PRESENTATION: Record<string, { step: string; icon: LucideIcon; rgb: string; specimen: string; question: string }> = {
  "natural.physics.mechanics.energy.momentum.fundamentals": { step: "01", icon: MoveRight, rgb: "96, 165, 250", specimen: "p = mv", question: "How do mass, velocity, and direction combine into momentum?" },
  "natural.physics.mechanics.energy.momentum.impulse": { step: "02", icon: Timer, rgb: "34, 211, 238", specimen: "J = Δp", question: "How does a force acting over time change momentum?" },
  "natural.physics.mechanics.energy.momentum.conservation": { step: "03", icon: Scale, rgb: "167, 139, 250", specimen: "Σpbefore = Σpafter", question: "Why can an isolated system exchange momentum internally while its total stays fixed?" },
  "natural.physics.mechanics.energy.momentum.collisions": { step: "04", icon: Orbit, rgb: "244, 114, 182", specimen: "before ↔ after", question: "How do elastic and inelastic collisions differ once both momentum and energy are tracked?" },
};

export default function MomentumUnitPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const lessons = context.children.map((child, index) => ({ child, presentation: PRESENTATION[child.id] ?? { step: String(index + 1).padStart(2, "0"), icon: MoveRight, rgb: "96, 165, 250", specimen: child.label, question: child.description ?? "" } }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030916] text-slate-100 selection:bg-blue-300/25">
      <EnergyField mode="momentum" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#030916]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs.slice(2)}
            eyebrow="Direction · impulse · conservation"
            icon={MoveRight}
            title={<span>Momentum</span>}
            subtitle="Momentum keeps direction in the accounting. Force acting over time changes momentum; internal interactions redistribute it while an isolated system preserves the total vector."
            accentRgb="96, 165, 250"
            titleClassName="font-mono text-[clamp(2.5rem,4.8vw,5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f2f7ff]"
            headerClassName="border-transparent"
            aside={<div className="rounded-full border border-blue-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-blue-100/65 backdrop-blur-md">{context.activeChildren.length} / {context.children.length} lessons live</div>}
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-blue-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-300/70">Unit throughline</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">Momentum is motion accounting that remembers which way the motion points.</h2>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">We start with one object, learn how impulse changes its momentum, then widen the system to several interacting objects and finally compare collision types.</p>
          </div>
          <MomentumStream />
        </section>

        <section className="mt-5 rounded-[30px] border border-white/[0.08] bg-black/[0.09] p-5 backdrop-blur-md sm:p-6">
          <div className="mb-6"><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-300/68">Learning path</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-white">Follow momentum from one object into an interacting system.</h2></div>
          <div className="relative hidden min-h-[270px] md:block"><div className="absolute left-[8%] right-[8%] top-[76px] h-px bg-gradient-to-r from-blue-300/30 via-cyan-300/24 to-pink-300/24" />{lessons.map(({ child, presentation }, index) => <LessonNode key={child.id} child={child} presentation={presentation} index={index} count={lessons.length} />)}</div>
          <div className="space-y-2 md:hidden">{lessons.map(({ child, presentation }) => <MobileLesson key={child.id} child={child} presentation={presentation} />)}</div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Momentum is a vector" text="Reversing velocity reverses momentum even when mass and speed are unchanged." rgb="96, 165, 250" />
          <Principle title="Impulse changes momentum" text="A modest force acting longer can produce the same momentum change as a large force acting briefly." rgb="34, 211, 238" />
          <Principle title="System totals matter" text="During a collision, objects exchange momentum internally. The isolated system total is the quantity that stays fixed." rgb="167, 139, 250" />
        </section>
      </div>
    </main>
  );
}

function MomentumStream() { return <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#07101d]/74 p-5"><div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-gradient-to-r from-blue-300/30 via-cyan-300/55 to-violet-300/30" /><div className="relative flex min-h-[260px] items-center justify-around"><VectorNode label="mass" note="how much matter" rgb="45, 212, 191" /><ArrowRight className="text-slate-600" size={18} /><VectorNode label="velocity" note="speed + direction" rgb="96, 165, 250" /><ArrowRight className="text-slate-600" size={18} /><VectorNode label="momentum" note="direction preserved" rgb="167, 139, 250" /></div><div className="absolute bottom-5 left-5 right-5 font-mono text-[10px] text-slate-600">mass × velocity → directional motion quantity → changed by impulse → conserved for isolated systems</div></div>; }
function VectorNode({ label, note, rgb }: { label: string; note: string; rgb: string }) { return <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border bg-[#07101d]/94 text-center" style={{ borderColor: `rgba(${rgb},0.26)`, boxShadow: `0 0 32px rgba(${rgb},0.09)` }}><strong className="text-[11px] text-white">{label}</strong><span className="mt-1 max-w-[80px] text-[8px] leading-4" style={{ color: `rgba(${rgb},0.62)` }}>{note}</span></div>; }
type Child = ReturnType<typeof requireCurriculumPageContext>["children"][number]; type Presentation = (typeof PRESENTATION)[string];
function LessonNode({ child, presentation, index, count }: { child: Child; presentation: Presentation; index: number; count: number }) { const Icon = presentation.icon; const live = child.status !== "placeholder"; const left = 8 + index * (84 / Math.max(count - 1, 1)); const body = <div className="group flex flex-col items-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border bg-[#07101d]/94 transition-transform group-hover:scale-105" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},${live ? "0.30" : "0.10"})` }}><Icon size={19} /></div><div className="mt-4 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step}</div><strong className={`mt-1 max-w-[155px] text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong><div className="mt-1 max-w-[150px] font-mono text-[9px] text-slate-700">{presentation.specimen}</div></div>; return <div className="absolute top-[44px] -translate-x-1/2" style={{ left: `${left}%` }}>{live ? <Link href={child.href}>{body}</Link> : <div aria-disabled="true">{body}</div>}</div>; }
function MobileLesson({ child, presentation }: { child: Child; presentation: Presentation }) { const Icon = presentation.icon; const live = child.status !== "placeholder"; const body = <div className="flex items-center gap-3 rounded-[16px] border px-4 py-3" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.16" : "0.07"})`, background: `rgba(${presentation.rgb},${live ? "0.035" : "0.012"})` }}><div className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.18)` }}><Icon size={15} /></div><div className="min-w-0 flex-1"><strong className={`block text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong><div className="font-mono text-[9px] text-slate-700">{presentation.specimen}</div></div>{live ? <ArrowRight size={14} style={{ color: `rgb(${presentation.rgb})` }} /> : <CircleDashed size={13} className="text-slate-700" />}</div>; return live ? <Link href={child.href}>{body}</Link> : <div aria-disabled="true">{body}</div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
