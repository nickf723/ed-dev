import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground from "../_components/PhysicsBackground";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { Activity, ArrowRight, CircleDashed, Gauge, MoveRight, Orbit, type LucideIcon } from "lucide-react";

const NODE_ID = "natural.physics.mechanics";

const PRESENTATION: Record<string, { step: string; subtitle: string; question: string; icon: LucideIcon; rgb: string }> = {
  "natural.physics.mechanics.motion": { step: "01", subtitle: "Describe change before explaining its cause.", question: "Where is an object, how fast is it moving, and how is that motion changing?", icon: MoveRight, rgb: "251, 146, 60" },
  "natural.physics.mechanics.forces": { step: "02", subtitle: "Explain why motion changes.", question: "Which interactions push, pull, constrain, or redirect a physical system?", icon: Gauge, rgb: "250, 204, 21" },
  "natural.physics.mechanics.energy": { step: "03", subtitle: "Track what is transferred or conserved.", question: "What can we learn about a system without following every instant of its motion?", icon: Activity, rgb: "45, 212, 191" },
};

export default function MechanicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const threads = context.children.map((child, index) => ({
    child,
    presentation: PRESENTATION[child.id] ?? { step: String(index + 1).padStart(2, "0"), subtitle: child.description ?? "", question: child.description ?? "", icon: Orbit, rgb: "251, 146, 60" },
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050a11] text-slate-100 selection:bg-orange-400/25">
      <PhysicsBackground mode="classical" />
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 pb-10 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#050a11]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs.slice(2)}
            eyebrow="Motion · interaction · conservation"
            icon={Orbit}
            title={<span>Mechanics</span>}
            subtitle="Study how physical systems move, what interactions change that motion, and which quantities let us compare the system before and after the change."
            accentRgb="251, 146, 60"
            titleClassName="font-mono text-[clamp(2.7rem,5vw,5.3rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#fffaf5]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 rounded-[28px] border border-orange-200/[0.11] bg-black/[0.14] p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/70">Mechanics throughline</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.45rem)] font-semibold tracking-[-0.04em] text-white">Describe the change → explain the interaction → track what is conserved.</h2><p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">Motion gives the language, forces explain changes in motion, and energy and momentum let us reason across an interaction without replaying every instant.</p></div>
            <div className="relative hidden min-h-[210px] lg:block"><div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-gradient-to-r from-orange-300/18 via-yellow-300/32 to-emerald-300/24" />{threads.map(({ child, presentation }, index) => { const Icon = presentation.icon; const live = child.status !== "placeholder"; return <div key={child.id} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${8 + index * 42}%` }}><div className="flex h-24 w-24 -translate-x-1/2 flex-col items-center justify-center rounded-full border bg-[#07101a]/85 text-center backdrop-blur-xl" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.30" : "0.12"})`, boxShadow: live ? `0 0 55px rgba(${presentation.rgb},0.10)` : undefined }}><Icon size={22} style={{ color: `rgb(${presentation.rgb})` }} /><span className={`mt-2 text-[10px] font-semibold ${live ? "text-white" : "text-slate-600"}`}>{child.label.split(" ")[0]}</span></div></div>; })}</div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-3">
          {threads.map(({ child, presentation }) => {
            const Icon = presentation.icon; const live = child.status !== "placeholder";
            const card = <div className="relative flex min-h-[245px] h-full flex-col overflow-hidden rounded-[24px] border p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.18" : "0.08"})`, background: `linear-gradient(145deg, rgba(${presentation.rgb},${live ? "0.055" : "0.018"}), rgba(3,8,14,0.72))` }}><div className="flex items-start justify-between gap-4"><span className="font-mono text-[10px]" style={{ color: `rgba(${presentation.rgb},0.60)` }}>{presentation.step}</span><div className="flex h-10 w-10 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.22)`, background: `rgba(${presentation.rgb},0.055)` }}><Icon size={18} /></div></div><div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${presentation.rgb},0.68)` }}>{presentation.subtitle}</div><h2 className={`mt-1 text-[24px] font-semibold tracking-[-0.035em] ${live ? "text-white" : "text-slate-500"}`}>{child.label}</h2><p className={`mt-3 text-[12px] leading-6 ${live ? "text-slate-400" : "text-slate-600"}`}>{presentation.question}</p><div className="mt-auto flex items-center justify-between pt-5"><span className="font-mono text-[9px] uppercase tracking-[0.11em]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{live ? "enter thread" : "planned thread"}</span>{live ? <ArrowRight size={15} style={{ color: `rgb(${presentation.rgb})` }} /> : <CircleDashed size={14} className="text-slate-700" />}</div></div>;
            return live ? <Link key={child.id} href={child.href} className="group transition-transform hover:-translate-y-0.5">{card}</Link> : <div key={child.id} aria-disabled="true">{card}</div>;
          })}
        </section>
      </div>
    </main>
  );
}
