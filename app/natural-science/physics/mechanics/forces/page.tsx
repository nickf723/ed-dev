import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground from "../../_components/PhysicsBackground";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  CircleDashed,
  Compass,
  Gauge,
  Hand,
  MoveRight,
  Orbit,
  Scale,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "natural.physics.mechanics.forces";

const PRESENTATIONS: Record<string, { step: string; question: string; specimen: string; icon: LucideIcon; rgb: string }> = {
  "natural.physics.mechanics.forces.interactions": { step: "01", question: "What does it mean for one object to exert a force on another?", specimen: "object A ↔ object B", icon: Hand, rgb: "250, 204, 21" },
  "natural.physics.mechanics.forces.common-forces": { step: "02", question: "Which interactions produce gravity, normal force, tension, friction, drag, and spring forces?", specimen: "interaction → force name", icon: Compass, rgb: "251, 146, 60" },
  "natural.physics.mechanics.forces.free-body-diagrams": { step: "03", question: "How can every external force on one system be represented without drawing the entire world?", specimen: "system + force vectors", icon: MoveRight, rgb: "34, 211, 238" },
  "natural.physics.mechanics.forces.net-force": { step: "04", question: "What changes when force vectors balance, and what changes when they do not?", specimen: "ΣF = 0 or ΣF ≠ 0", icon: Scale, rgb: "45, 212, 191" },
  "natural.physics.mechanics.forces.newtons-laws": { step: "05", question: "How does the net interaction on a system determine its acceleration?", specimen: "ΣF = ma", icon: Orbit, rgb: "167, 139, 250" },
};

export default function ForcesPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const lessons = context.children.map((child, index) => ({
    child,
    presentation: PRESENTATIONS[child.id] ?? {
      step: String(index + 1).padStart(2, "0"),
      question: child.description ?? child.label,
      specimen: child.label,
      icon: Gauge,
      rgb: "250, 204, 21",
    },
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#060a0f] text-slate-100 selection:bg-yellow-300/25">
      <PhysicsBackground mode="classical" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true">
        <div className="absolute left-[14%] top-[22%] h-px w-[34%] -rotate-6 bg-gradient-to-r from-transparent via-yellow-300/45 to-transparent" />
        <div className="absolute right-[9%] top-[42%] h-px w-[38%] rotate-3 bg-gradient-to-r from-transparent via-cyan-300/28 to-transparent" />
        <div className="absolute left-[44%] top-[14%] h-[42rem] w-px bg-gradient-to-b from-transparent via-yellow-300/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-10 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#060a0f]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Interaction · representation · net effect"
            icon={Gauge}
            title={<span>Forces & Dynamics</span>}
            subtitle="Explain changes in motion by identifying interactions, representing them as force vectors, combining those vectors, and connecting the net force to acceleration."
            accentRgb="250, 204, 21"
            titleClassName="font-mono text-[clamp(2.35rem,4.7vw,4.9rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#fffdf2]"
            headerClassName="border-transparent"
            aside={<div className="rounded-full border border-yellow-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-yellow-100/65 backdrop-blur-md">{context.activeChildren.length} / {lessons.length} lessons live</div>}
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-yellow-200/[0.11] bg-black/[0.14] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-yellow-300/72">Unit throughline</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.45rem)] font-semibold tracking-[-0.04em] text-white">A force is not something an object stores. It is an interaction happening between systems.</h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">Dynamics becomes much more intuitive when the interaction comes first. Identify what is interacting, name the force model, isolate the system, combine its vectors, and only then ask how the motion responds.</p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500"><span className="text-yellow-200/80">interaction</span><ArrowRight size={12} className="text-slate-700" /><span>force</span><ArrowRight size={12} className="text-slate-700" /><span>diagram</span><ArrowRight size={12} className="text-slate-700" /><span>net force</span><ArrowRight size={12} className="text-slate-700" /><span className="text-cyan-200/75">acceleration</span></div>
          </div>
          <ForceMap />
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.10] p-5 backdrop-blur-md sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-yellow-300/70">Learning path</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-white">Build the model from interaction to motion.</h2></div>
            <p className="max-w-xl text-[11px] leading-5 text-slate-500">Live lessons open normally. Planned stations preserve the conceptual route without pretending unfinished pages are ready.</p>
          </div>
          <div className="relative mt-7 hidden min-h-[250px] md:block">
            <div className="absolute left-[5%] right-[5%] top-[78px] h-px bg-gradient-to-r from-yellow-300/25 via-cyan-300/24 to-violet-300/22" />
            {lessons.map(({ child, presentation }, index) => <LessonStation key={child.id} href={child.href} title={child.label} live={child.status !== "placeholder"} presentation={presentation} index={index} />)}
          </div>
          <div className="mt-6 space-y-2 md:hidden">{lessons.map(({ child, presentation }) => <MobileLesson key={child.id} href={child.href} title={child.label} live={child.status !== "placeholder"} presentation={presentation} />)}</div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Forces belong to interactions" text="If you cannot name what other object or field is interacting with the system, the force description is incomplete." rgb="250, 204, 21" />
          <Principle title="Vectors belong to one chosen system" text="A free-body diagram includes forces acting on the selected system, not every force everywhere in the scene." rgb="34, 211, 238" />
          <Principle title="Net force changes velocity" text="A nonzero net force means acceleration. It does not mean the object must already be moving in the force direction." rgb="167, 139, 250" />
        </section>
      </div>
    </main>
  );
}

function ForceMap() {
  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#071019]/72 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(250,204,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.04) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
      <div className="relative z-10 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600"><span>Interaction model</span><span>system boundary</span></div>
      <div className="absolute left-1/2 top-[54%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-yellow-200/[0.24] bg-yellow-300/[0.055] shadow-[0_0_50px_rgba(250,204,21,0.09)]"><div className="flex h-full flex-col items-center justify-center text-center"><div className="text-[9px] uppercase tracking-[0.13em] text-yellow-200/55">chosen system</div><strong className="mt-1 text-[16px] text-white">Object B</strong></div></div>
      <InteractionArrow side="left" label="push from A" rgb="250, 204, 21" />
      <InteractionArrow side="right" label="pull from C" rgb="34, 211, 238" />
      <InteractionArrow side="top" label="support" rgb="45, 212, 191" />
      <InteractionArrow side="bottom" label="gravity" rgb="167, 139, 250" />
      <div className="absolute bottom-5 left-5 right-5 rounded-[15px] border border-white/[0.06] bg-black/[0.18] px-4 py-3 text-[10px] leading-5 text-slate-500 backdrop-blur-md">Each arrow represents one external interaction acting on the chosen system.</div>
    </div>
  );
}

function InteractionArrow({ side, label, rgb }: { side: "left" | "right" | "top" | "bottom"; label: string; rgb: string }) {
  const classes = { left: "left-[12%] top-[54%] w-[31%] h-px", right: "right-[12%] top-[54%] w-[31%] h-px", top: "left-1/2 top-[17%] h-[28%] w-px", bottom: "left-1/2 top-[63%] h-[18%] w-px" }[side];
  const labelClasses = { left: "left-[13%] top-[47%]", right: "right-[13%] top-[47%]", top: "left-[52%] top-[18%]", bottom: "left-[52%] top-[68%]" }[side];
  return <><div className={`absolute ${classes}`} style={{ background: `rgba(${rgb},0.58)`, boxShadow: `0 0 18px rgba(${rgb},0.16)` }} /><div className={`absolute ${labelClasses} font-mono text-[9px]`} style={{ color: `rgba(${rgb},0.68)` }}>{label}</div></>;
}

type Presentation = { step: string; question: string; specimen: string; icon: LucideIcon; rgb: string };

function LessonStation({ href, title, live, presentation, index }: { href: string; title: string; live: boolean; presentation: Presentation; index: number }) {
  const Icon = presentation.icon;
  const left = 5 + index * 22.5;
  const content = <div className="flex flex-col items-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border bg-[#081019]/92 shadow-2xl transition-transform group-hover:scale-105" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.32" : "0.12"})`, color: `rgb(${presentation.rgb})`, boxShadow: live ? `0 0 38px rgba(${presentation.rgb},0.12)` : undefined }}><Icon size={20} /></div><div className="mt-4 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step}</div><strong className={`mt-1 max-w-[150px] text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{title}</strong><div className="mt-1 max-w-[155px] font-mono text-[9px] text-slate-700">{presentation.specimen}</div></div>;
  return <div className="absolute top-[47px] -translate-x-1/2" style={{ left: `${left}%` }}>{live ? <Link href={href} className="group block">{content}</Link> : <div aria-disabled="true">{content}</div>}</div>;
}

function MobileLesson({ href, title, live, presentation }: { href: string; title: string; live: boolean; presentation: Presentation }) {
  const Icon = presentation.icon;
  const inner = <div className="flex items-center gap-3 rounded-[16px] border px-4 py-3" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.16" : "0.07"})`, background: `rgba(${presentation.rgb},${live ? "0.035" : "0.012"})` }}><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.18)` }}><Icon size={16} /></div><div className="min-w-0 flex-1"><div className="font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step}</div><strong className={`block text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{title}</strong></div>{live ? <ArrowRight size={14} style={{ color: `rgb(${presentation.rgb})` }} /> : <CircleDashed size={13} className="text-slate-700" />}</div>;
  return live ? <Link href={href}>{inner}</Link> : <div aria-disabled="true">{inner}</div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.14] p-4 backdrop-blur-xl"><div className="h-1 w-8 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><h3 className="mt-3 text-[13px] font-semibold text-white">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
