import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import EnergyField from "../_components/EnergyField";
import { Activity, ArrowRight, CircleDashed, Gauge, MoveRight, Scale, Timer, type LucideIcon } from "lucide-react";

const NODE_ID = "natural.physics.mechanics.energy.energy";

const PRESENTATION: Record<string, { step: string; icon: LucideIcon; rgb: string; specimen: string; question: string }> = {
  "natural.physics.mechanics.energy.energy.work": { step: "01", icon: MoveRight, rgb: "45, 212, 191", specimen: "W = Fd cos θ", question: "When does a force actually transfer energy to or from a system?" },
  "natural.physics.mechanics.energy.energy.kinetic": { step: "02", icon: Gauge, rgb: "34, 211, 238", specimen: "K = ½mv²", question: "How does the energy of motion depend on mass and speed?" },
  "natural.physics.mechanics.energy.energy.potential": { step: "03", icon: Activity, rgb: "250, 204, 21", specimen: "ΔU", question: "How can interactions store energy in the configuration of a system?" },
  "natural.physics.mechanics.energy.energy.conservation": { step: "04", icon: Scale, rgb: "167, 139, 250", specimen: "Ebefore = Eafter", question: "How can energy change form while the total accounting remains conserved?" },
  "natural.physics.mechanics.energy.energy.power": { step: "05", icon: Timer, rgb: "248, 113, 113", specimen: "P = ΔE/Δt", question: "How quickly is energy being transferred or transformed?" },
};

export default function EnergyUnitPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const lessons = context.children.map((child, index) => ({
    child,
    presentation: PRESENTATION[child.id] ?? { step: String(index + 1).padStart(2, "0"), icon: Activity, rgb: "45, 212, 191", specimen: child.label, question: child.description ?? "" },
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03100e] text-slate-100 selection:bg-emerald-300/25">
      <EnergyField mode="energy" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#03100e]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs.slice(2)}
            eyebrow="Transfer · stores · total"
            icon={Activity}
            title={<span>Energy</span>}
            subtitle="Treat energy as a scalar accounting quantity. Forces can transfer it across a boundary, interactions can store it, and conservation lets us compare states without reconstructing every instant in between."
            accentRgb="45, 212, 191"
            titleClassName="font-mono text-[clamp(2.55rem,4.8vw,5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f0fff9]"
            headerClassName="border-transparent"
            aside={<div className="rounded-full border border-emerald-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-emerald-100/65 backdrop-blur-md">{context.activeChildren.length} / {context.children.length} lessons live</div>}
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-emerald-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">Unit throughline</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">Energy is useful because we can account for change without following every force at every instant.</h2>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">We begin with transfer, identify important stores, then combine the stores into one conservation statement. Power comes later because it asks a different question: not how much energy changes, but how quickly.</p>
          </div>
          <EnergyPipeline />
        </section>

        <section className="mt-5 rounded-[30px] border border-white/[0.08] bg-black/[0.09] p-5 backdrop-blur-md sm:p-6">
          <div className="mb-6"><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/68">Learning path</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-white">Follow energy across a system boundary and into its stores.</h2></div>
          <div className="relative hidden min-h-[285px] md:block">
            <div className="absolute left-[6%] right-[6%] top-[76px] h-px bg-gradient-to-r from-emerald-300/28 via-yellow-300/22 to-violet-300/26" />
            {lessons.map(({ child, presentation }, index) => <LessonNode key={child.id} child={child} presentation={presentation} index={index} count={lessons.length} />)}
          </div>
          <div className="space-y-2 md:hidden">{lessons.map(({ child, presentation }) => <MobileLesson key={child.id} child={child} presentation={presentation} />)}</div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Energy is scalar" text="Energy amounts add without a direction sign convention. Directional information lives elsewhere in the model." rgb="45, 212, 191" />
          <Principle title="Choose the system first" text="Work and energy transfer depend on what crosses the boundary of the system you decided to analyze." rgb="250, 204, 21" />
          <Principle title="Conservation is accounting" text="Energy does not vanish when a familiar store decreases. Find the new store or the transfer across the boundary." rgb="167, 139, 250" />
        </section>
      </div>
    </main>
  );
}

function EnergyPipeline() {
  return <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#061513]/72 p-5">
    <div className="absolute left-[8%] right-[8%] top-1/2 h-2 -translate-y-1/2 rounded-full bg-black/40" />
    <div className="absolute left-[8%] top-1/2 h-2 w-[38%] -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-300/20 to-emerald-300/75 shadow-[0_0_25px_rgba(45,212,191,0.16)]" />
    <div className="absolute left-[46%] top-1/2 h-2 w-[44%] -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-300/55 via-cyan-300/50 to-violet-300/55" />
    <div className="relative flex min-h-[260px] flex-col justify-between">
      <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600"><span>system boundary</span><span>energy accounting</span></div>
      <div className="grid grid-cols-4 items-center gap-3 text-center">
        <PipeStop label="work" note="transfer" rgb="45, 212, 191" />
        <PipeStop label="kinetic" note="motion store" rgb="34, 211, 238" />
        <PipeStop label="potential" note="interaction store" rgb="250, 204, 21" />
        <PipeStop label="total" note="conserved" rgb="167, 139, 250" />
      </div>
      <div className="font-mono text-[10px] text-slate-600">cross boundary → occupy stores → exchange between stores → reconcile total</div>
    </div>
  </div>;
}

function PipeStop({ label, note, rgb }: { label: string; note: string; rgb: string }) {
  return <div className="relative z-10"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border bg-[#071412]/95 font-mono text-[10px] text-white" style={{ borderColor: `rgba(${rgb},0.28)`, boxShadow: `0 0 30px rgba(${rgb},0.10)` }}>{label}</div><div className="mt-2 text-[9px]" style={{ color: `rgba(${rgb},0.68)` }}>{note}</div></div>;
}

type Child = ReturnType<typeof requireCurriculumPageContext>["children"][number];
type Presentation = (typeof PRESENTATION)[string];

function LessonNode({ child, presentation, index, count }: { child: Child; presentation: Presentation; index: number; count: number }) {
  const Icon = presentation.icon;
  const live = child.status !== "placeholder";
  const left = 6 + index * (88 / Math.max(count - 1, 1));
  const body = <div className="group flex flex-col items-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border bg-[#071411]/94 transition-transform group-hover:scale-105" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},${live ? "0.30" : "0.10"})`, boxShadow: live ? `0 0 32px rgba(${presentation.rgb},0.11)` : undefined }}><Icon size={19} /></div><div className="mt-4 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step}</div><strong className={`mt-1 max-w-[155px] text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong><div className="mt-1 max-w-[150px] font-mono text-[9px] text-slate-700">{presentation.specimen}</div></div>;
  return <div className="absolute top-[44px] -translate-x-1/2" style={{ left: `${left}%` }}>{live ? <Link href={child.href}>{body}</Link> : <div aria-disabled="true">{body}</div>}</div>;
}

function MobileLesson({ child, presentation }: { child: Child; presentation: Presentation }) {
  const Icon = presentation.icon; const live = child.status !== "placeholder";
  const body = <div className="flex items-center gap-3 rounded-[16px] border px-4 py-3" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.16" : "0.07"})`, background: `rgba(${presentation.rgb},${live ? "0.035" : "0.012"})` }}><div className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.18)` }}><Icon size={15} /></div><div className="min-w-0 flex-1"><div className="font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step}</div><strong className={`block text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong></div>{live ? <ArrowRight size={14} style={{ color: `rgb(${presentation.rgb})` }} /> : <CircleDashed size={13} className="text-slate-700" />}</div>;
  return live ? <Link href={child.href}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4 backdrop-blur-xl"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
