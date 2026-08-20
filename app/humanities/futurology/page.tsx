import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BarChart3, BookOpen, Compass, Eye, History, Layers3, Scale, ShieldCheck } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { FUTUROLOGY_CURRICULUM } from "@/lib/curriculum/humanities/futurology";
import FuturologyBackground from "./FuturologyBackground";
import ScenarioMatrixLab from "./ScenarioMatrixLab";
import { FORECAST_HYGIENE, FUTURES_LENSES } from "./futurology-data";

const RGB = [
  "103,232,249",
  "251,191,36",
  "192,132,252",
  "96,165,250",
  "94,234,212",
  "248,113,113",
  "244,114,182",
  "74,222,128",
  "251,146,60",
] as const;

const PRINCIPLES = [
  ["Possible is not probable", "A future can be imaginable without being likely. Scenarios, forecasts, risk cases, and preferred futures answer different questions and should not be labeled interchangeably."],
  ["Long horizons widen uncertainty", "Small differences in assumptions, feedback, institutions, behavior, shocks, and technical change can compound. Precision should generally decrease when evidence does not support it."],
  ["Trends can bend or break", "Extrapolation assumes some underlying structure continues. Saturation, policy, substitution, adaptation, feedback, conflict, innovation, or measurement changes can alter a trend."],
  ["Values are not predictions", "A desired future is a normative claim. It can guide strategy and design, but describing what ought to happen is different from forecasting what will happen."],
  ["Surprise is part of the subject", "Futures work should expose assumptions and dependencies so plans can adapt when reality departs from the scenario, rather than polishing one story until it looks inevitable."],
  ["The present has agency", "Futures are shaped by decisions, institutions, investments, habits, technologies, conflicts, accidents, and collective action. Studying futures is partly studying which choices remain open now."],
] as const;

export default function FuturologyPage() {
  const branches = FUTUROLOGY_CURRICULUM.children ?? [];

  return (
    <SceneFrame
      background={<FuturologyBackground />}
      className="bg-[#071019] text-slate-100 selection:bg-cyan-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(7,16,25,0.49)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Humanities", href: "/humanities" }, { label: "Futurology" }]}
          eyebrow="Signals · uncertainty · scenarios · forecasts · choices"
          eyebrowStyle="rule"
          icon={Compass}
          title={<span>Futurology</span>}
          subtitle="Explore possible futures systematically without confusing imagination with evidence. Futures studies combines scanning, scenarios, forecasting, systems thinking, technology assessment, risk analysis, history, and values to make uncertainty more explicit and decisions more robust."
          accentRgb="103, 232, 249"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#ecfeff]"
          headerClassName="border-cyan-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-cyan-100/[0.10] py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,25,0.46),transparent_31%,transparent_72%,rgba(18,10,25,0.34))] backdrop-blur-[2px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/62"><BookOpen size={14} /> Primary navigation · Chronosphere observatory</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">The future is plural until evidence earns something narrower.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">The observatory behind the page begins at one present and fans into several scenario corridors. They are deliberately equal in visual status. Weak signals, assumptions, uncertainties, and wild cards sit around the fan because the method should make its uncertainty visible rather than hide it behind a glowing destination.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/humanities/history" icon={History} label="History" note="change, precedent, path dependence" />
            <Neighbor href="/formal-science/data-science" icon={BarChart3} label="Data Science" note="models, inference, evaluation" />
            <Neighbor href="/formal-science/systems-science" icon={Layers3} label="Systems Science" note="feedback, emergence, resilience" />
            <Neighbor href="/humanities/philosophy" icon={Scale} label="Philosophy" note="values, ethics, knowledge claims" />
          </div>
        </div>

        <div className="relative mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => {
            const rgb = RGB[index % RGB.length];
            return <div key={branch.id} aria-disabled="true" className="min-h-[142px] border-b border-white/[0.06] px-4 py-4 backdrop-blur-[7px] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.68)` }}>FT.{String(index + 1).padStart(2, "0")}</span><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">planned</span></div><strong className="mt-2 block text-[14px] text-white/84">{branch.label}</strong><p className="mt-2 text-[11px] leading-4 text-slate-500">{branch.description}</p></div>;
          })}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/58">Signature instrument · scenario planning</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">Use uncertainty to widen the test, not to manufacture percentages.</h2></div>
          <p className="text-[12px] leading-5 text-slate-500">The fictional scenario matrix below demonstrates one common futures move: select important uncertainties, explore contrasting combinations, and ask what assumptions and strategies survive across them. It does not forecast 2045.</p>
        </div>
        <ScenarioMatrixLab />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_420px] xl:items-start">
        <Surface variant="open" className="rounded-[28px] border-cyan-100/[0.08]" style={{ background: "rgba(7,16,25,0.025)" }}>
          <div className="p-5"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-cyan-200/50"><Eye size={12} /> Evidence vocabulary · not navigation</div><h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Name what kind of future claim you are looking at.</h3></div>
          <div className="grid border-y border-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
            {FUTURES_LENSES.map((lens) => <div key={lens.label} className="border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${lens.rgb},0.62)` }}>{lens.label}</span><p className="mt-2 text-[11px] leading-5 text-slate-500">{lens.description}</p></div>)}
          </div>
        </Surface>

        <Surface variant="glass" className="overflow-hidden rounded-[28px] border-violet-100/[0.09]" style={{ background: "rgba(12,10,25,0.13)" }}>
          <div className="p-5"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-violet-200/48"><ShieldCheck size={12} /> Forecast hygiene</div><h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">A number deserves more scrutiny, not less.</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {FORECAST_HYGIENE.map((item, index) => <div key={item} className="grid grid-cols-[34px_minmax(0,1fr)] gap-2 px-4 py-3"><span className="font-mono text-[10px] text-violet-200/38">0{index + 1}</span><p className="text-[11px] leading-5 text-slate-500">{item}</p></div>)}
          </div>
          <p className="p-5 text-[10px] leading-5 text-slate-600">The old page attached exact years and probabilities to speculative events without a forecasting model or source. Those values have been removed rather than restyled.</p>
        </Surface>
      </section>

      <section className="mt-9 border-t border-cyan-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/54"><Compass size={13} /> Futures principles · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Good futures work makes uncertainty easier to see, not easier to forget.</h2></div>
          <p className="text-[13px] leading-6 text-slate-400/70">Some futures questions support quantitative forecasting. Others are better explored with scenarios, stress tests, historical analogies, participatory methods, or qualitative scanning. Method should follow the question and the evidence.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {PRINCIPLES.map(([term, detail], index) => <div key={term} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[10px] text-cyan-200/38">0{index + 1}</span><span><strong className="block text-[13px] text-slate-200/86">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{detail}</span></span></div>)}
        </div>
      </section>
    </SceneFrame>
  );
}

function Neighbor({ href, icon: Icon, label, note }: { href: string; icon: LucideIcon; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[72px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="flex items-center gap-2 text-[11px] font-semibold text-white/78"><Icon size={12} className="text-cyan-200/52" />{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-4 text-slate-600">{note}</span><ArrowRight size={10} className="text-slate-600 transition group-hover:translate-x-1" /></span></Link>;
}
