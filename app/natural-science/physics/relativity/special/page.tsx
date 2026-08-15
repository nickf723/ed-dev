import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import RelativityField from "../_components/RelativityField";
import { ArrowRight, CircleDashed, Gauge, Hourglass, Orbit, Timer } from "lucide-react";

const NODE_ID = "natural.physics.relativity.special";

export default function SpecialRelativityPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030308] text-slate-100 selection:bg-amber-300/25">
      <RelativityField mode="special" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#030308]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Relativity", href: "/natural-science/physics/relativity" }, { label: "Special Relativity" }]}
            eyebrow="Flat spacetime · inertial observers"
            icon={Hourglass}
            title={<span>Special Relativity</span>}
            subtitle="Keep the laws of physics and the speed of light invariant for every inertial observer. The price is giving up absolute simultaneity, universal time intervals, and universal lengths."
            accentRgb="245, 158, 11"
            titleClassName="font-mono text-[clamp(2rem,4.4vw,4.7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffaf0]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="rounded-[28px] border border-amber-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">Special-relativity throughline</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.45rem)] font-semibold tracking-[-0.04em] text-white">Make light speed invariant, then rebuild measurement around spacetime.</h2>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">Classical intuition assumes observers share one universal time coordinate. Special relativity replaces that assumption with Lorentz symmetry: observers disagree about space and time separately while preserving deeper spacetime structure.</p>
            <div className="mt-5 rounded-[18px] border border-white/[0.06] bg-black/[0.14] p-4"><div className="text-[9px] uppercase tracking-[0.12em] text-slate-600">Lorentz factor</div><div className="mt-2 text-[19px] text-white"><M>{"\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">The factor appears repeatedly once measurements are compared between inertial frames.</p></div>
          </div>

          <div className="relative min-h-[330px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.06] p-5 backdrop-blur-[2px]">
            <div className="absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 bg-amber-300/24" />
            <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-indigo-300/18" />
            <div className="absolute left-1/2 top-[18%] h-[56%] w-[34%] -translate-x-1/2 rotate-45 border-l border-t border-amber-200/[0.18]" />
            <div className="absolute left-1/2 top-[18%] h-[56%] w-[34%] -translate-x-1/2 -rotate-45 border-r border-t border-indigo-200/[0.18]" />
            <div className="relative z-10 flex min-h-[290px] flex-col justify-between"><div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600"><span>space</span><span>time</span></div><div className="mx-auto max-w-lg text-center"><Orbit size={24} className="mx-auto text-amber-200/75" /><h2 className="mt-3 text-[22px] font-semibold text-white">Light cone</h2><p className="mt-2 text-[11px] leading-5 text-slate-500">The invariant speed <M>c</M> divides event separations into causal regions. Different inertial coordinates tilt through the same spacetime structure without changing the light cone.</p></div><div className="text-center font-mono text-[9px] text-indigo-100/45">coordinates change · causal structure remains</div></div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.06] p-5 backdrop-blur-sm sm:p-6">
          <div className="flex items-end justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/68">Learning path</div><h2 className="mt-1 text-[22px] font-semibold text-white">Build from postulates to energy-momentum.</h2></div><span className="font-mono text-[9px] text-slate-700">{context.activeChildren.length} / {context.children.length} lessons live</span></div>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {context.children.map((child, index) => { const live=child.status!=="placeholder"; const icons=[Gauge,Timer,Orbit,Hourglass,ArrowRight,Orbit]; const Icon=icons[index] ?? Orbit; const inner=<div className="flex h-full min-h-[185px] flex-col rounded-[20px] border p-4" style={{borderColor:live?"rgba(245,158,11,0.16)":"rgba(255,255,255,0.05)",background:live?"rgba(245,158,11,0.025)":"rgba(0,0,0,0.08)"}}><div className="flex items-center justify-between"><span className="font-mono text-[9px] text-amber-200/55">{String(index+1).padStart(2,"0")}</span>{live?<Icon size={14} className="text-amber-200/70"/>:<CircleDashed size={13} className="text-slate-700"/>}</div><strong className={`mt-5 text-[14px] ${live?"text-white":"text-slate-600"}`}>{child.label}</strong><p className={`mt-2 text-[11px] leading-5 ${live?"text-slate-500":"text-slate-700"}`}>{child.description}</p><div className="mt-auto pt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-slate-700">{live?"open lesson":"planned"}</div></div>; return live?<Link key={child.id} href={child.href}>{inner}</Link>:<div key={child.id} aria-disabled="true">{inner}</div>; })}
          </div>
        </section>
      </div>
    </main>
  );
}
