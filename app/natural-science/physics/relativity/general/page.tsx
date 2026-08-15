import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import RelativityField from "../_components/RelativityField";
import { ArrowRight, CircleDashed, Clock3, Globe2, Orbit, ScanLine } from "lucide-react";

const NODE_ID = "natural.physics.relativity.general";

export default function GeneralRelativityPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-slate-100 selection:bg-indigo-300/25">
      <RelativityField mode="general" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-black/54 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Relativity", href: "/natural-science/physics/relativity" }, { label: "General Relativity" }]}
            eyebrow="Curved spacetime · gravity"
            icon={Globe2}
            title={<span>General Relativity</span>}
            subtitle="Replace gravity as an ordinary force with geometry. Matter and energy shape spacetime, while freely falling objects follow the geodesics available in that curved geometry."
            accentRgb="129, 140, 248"
            titleClassName="font-mono text-[clamp(2rem,4.4vw,4.7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#f5f6ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="rounded-[28px] border border-indigo-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-300/70">General-relativity throughline</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.45rem)] font-semibold tracking-[-0.04em] text-white">Acceleration points toward geometry.</h2>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">The equivalence principle suggests that local gravitational effects can be transformed away in free fall. General relativity turns that clue into a geometric theory: curvature remains when no single global inertial frame can remove gravity everywhere.</p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500"><span className="text-amber-200/70">equivalence</span><ArrowRight size={12} className="text-slate-700"/><span>geodesics</span><ArrowRight size={12} className="text-slate-700"/><span>clock rates</span><ArrowRight size={12} className="text-slate-700"/><span className="text-indigo-200/70">strong gravity</span></div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.04] p-5 backdrop-blur-[1px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08),transparent_36%)]" />
            <div className="relative z-10 flex min-h-[300px] flex-col justify-between"><div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600"><span>strong-field geometry</span><span>move the lensing mass</span></div><div className="mx-auto max-w-lg text-center"><Orbit size={26} className="mx-auto text-indigo-200/75"/><h2 className="mt-3 text-[23px] font-semibold text-white">Light follows spacetime too.</h2><p className="mt-2 text-[11px] leading-5 text-slate-500">Gravitational lensing is not light being electrically or mechanically pulled sideways. Light follows null geodesics of the curved spacetime geometry.</p></div><div className="text-center font-mono text-[9px] text-amber-100/45">the background is the model — move your pointer</div></div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.055] p-5 backdrop-blur-[2px] sm:p-6">
          <div className="flex items-end justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-300/68">Learning path</div><h2 className="mt-1 text-[22px] font-semibold text-white">Move from equivalence to strong-field spacetime.</h2></div><span className="font-mono text-[9px] text-slate-700">{context.activeChildren.length} / {context.children.length} lessons live</span></div>
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {context.children.map((child,index)=>{const live=child.status!=="placeholder";const icons=[Globe2,Orbit,Clock3,ScanLine];const Icon=icons[index]??Orbit;const inner=<div className="flex h-full min-h-[200px] flex-col rounded-[20px] border p-4" style={{borderColor:live?"rgba(129,140,248,0.16)":"rgba(255,255,255,0.05)",background:live?"rgba(129,140,248,0.025)":"rgba(0,0,0,0.08)"}}><div className="flex items-center justify-between"><span className="font-mono text-[9px] text-indigo-200/55">{String(index+1).padStart(2,"0")}</span>{live?<Icon size={14} className="text-indigo-200/70"/>:<CircleDashed size={13} className="text-slate-700"/>}</div><strong className={`mt-5 text-[14px] ${live?"text-white":"text-slate-600"}`}>{child.label}</strong><p className={`mt-2 text-[11px] leading-5 ${live?"text-slate-500":"text-slate-700"}`}>{child.description}</p><div className="mt-auto pt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-slate-700">{live?"open lesson":"planned"}</div></div>;return live?<Link key={child.id} href={child.href}>{inner}</Link>:<div key={child.id} aria-disabled="true">{inner}</div>;})}
          </div>
        </section>
      </div>
    </main>
  );
}
