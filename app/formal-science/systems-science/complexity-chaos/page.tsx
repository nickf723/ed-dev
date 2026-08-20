import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import AttractorBackground from "./AttractorBackground";
import LocalRuleLab from "./LocalRuleLab";
import {
  ArrowRight,
  GitMerge,
  Grid3X3,
  Network,
  Orbit,
  Scale,
  Snowflake,
  Sparkles,
  Waypoints,
} from "lucide-react";

const PRINCIPLES = [
  ["Local interaction", "Components respond to nearby state, signals, rules, or incentives rather than reading a complete global plan."],
  ["Nonlinearity", "Combining two influences need not produce twice the response. Thresholds, saturation, feedback, and interaction can change the shape of the outcome."],
  ["Emergence", "A higher-level pattern can depend on organization among parts even when no individual part contains or commands that whole pattern."],
  ["Adaptation", "Some complex systems change their own behavior, structure, or strategy in response to experience or environment."],
] as const;

const EXAMPLES = [
  { title: "Flocking", cue: "alignment · separation · cohesion", text: "A group-level motion pattern can arise from agents responding to local neighbors without a leader specifying the full formation.", rgb: "34,211,238", icon: Waypoints },
  { title: "Traffic", cue: "spacing · delay · braking · flow", text: "Stop-and-go waves can emerge from many drivers reacting locally even when no obstacle blocks the road ahead.", rgb: "251,191,36", icon: GitMerge },
  { title: "Networks", cue: "links · clusters · diffusion · cascades", text: "Global access, fragility, or spread can depend strongly on connection pattern rather than only on properties of individual nodes.", rgb: "244,114,182", icon: Network },
] as const;

export default function ComplexityPage() {
  return (
    <SceneFrame
      background={<AttractorBackground />}
      className="bg-[#090705] text-slate-100 selection:bg-orange-300/25"
      maxWidthClassName="max-w-[1500px]"
      headerBackground="rgba(9,7,5,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Formal Science", href: "/formal-science" },
            { label: "Systems Science", href: "/formal-science/systems-science" },
            { label: "Complexity & Emergence" },
          ]}
          eyebrow="Local rules · interaction · emergence · adaptation · scale"
          eyebrowStyle="rule"
          icon={Sparkles}
          title={<span>Complexity &amp; Emergence</span>}
          subtitle="Study how system-level patterns can arise from repeated interactions among parts, especially when feedback, thresholds, adaptation, networks, and nonlinear responses make simple decomposition incomplete."
          accentRgb="251, 146, 60"
          titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fff8f0]"
          headerClassName="border-orange-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-orange-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,11,5,0.34),transparent_30%,transparent_70%,rgba(7,11,17,0.28))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-orange-200/68"><Grid3X3 size={14} /> From parts to pattern</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">A global pattern does not require a component that knows the global pattern.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">Complexity questions often ask what becomes possible only after parts interact repeatedly. The explanation still lives in the rules and relationships, but the useful unit of description may shift from component to collective behavior.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/formal-science/systems-science/chaos-theory" label="Chaos Theory" note="sensitivity · nonlinear dynamics" rgb="192,132,252" icon={Orbit} />
            <Neighbor href="/formal-science/systems-science/complexity-chaos/fractals" label="Fractals" note="iteration · scaling · geometry" rgb="96,165,250" icon={Snowflake} />
          </div>
        </div>
      </section>

      <section className="mt-7">
        <LocalRuleLab />
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
        <Surface variant="glass" className="rounded-[24px] border-orange-100/[0.09] p-5 sm:p-6" style={{ background: "rgba(18,10,5,0.16)" }}>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-orange-200/58"><Scale size={13} /> Scale of explanation</div>
          <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">The parts remain necessary even when the pattern needs a higher-level description.</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PRINCIPLES.map(([title, text], index) => (
              <div key={title} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 rounded-[16px] border border-white/[0.06] bg-black/[0.10] p-3">
                <span className="font-mono text-[9px] text-orange-200/42">0{index + 1}</span>
                <div><strong className="text-[13px] text-white">{title}</strong><p className="mt-1 text-[12px] leading-5 text-slate-400">{text}</p></div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface variant="open" className="rounded-[24px] border-violet-100/[0.09] p-5 sm:p-6 xl:sticky xl:top-[170px]">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/58">Important boundary</div>
          <h3 className="mt-2 text-[21px] font-semibold text-white">Emergence does not mean “unexplainable.”</h3>
          <p className="mt-3 text-[13px] leading-6 text-slate-400">An emergent property depends on organization or interaction among parts. A model may explain it mechanistically while the higher-level vocabulary remains the clearest way to describe the resulting pattern.</p>
          <p className="mt-3 text-[12px] leading-5 text-slate-500">Likewise, complex does not simply mean complicated. A device can contain thousands of parts yet remain decomposable, while a smaller adaptive or strongly interacting system may generate behaviors that depend on relationships among parts.</p>
        </Surface>
      </section>

      <section className="mt-8 border-t border-orange-100/[0.09] pt-5">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58">Concrete patterns</div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {EXAMPLES.map((example) => <ExampleCard key={example.title} {...example} />)}
        </div>
      </section>
    </SceneFrame>
  );
}

function Neighbor({ href, label, note, rgb, icon: Icon }: { href: string; label: string; note: string; rgb: string; icon: typeof Orbit }) {
  return <Link href={href} className="group flex min-h-[80px] flex-col justify-between rounded-[15px] border border-white/[0.07] bg-black/[0.08] p-3 backdrop-blur-[10px] transition hover:bg-black/[0.16]"><div className="flex items-center gap-2"><Icon size={13} style={{ color: `rgb(${rgb})` }} /><strong className="text-[12px] text-white/84">{label}</strong></div><span className="flex items-end justify-between gap-2"><span className="text-[10px] leading-4 text-slate-500">{note}</span><ArrowRight size={11} style={{ color: `rgba(${rgb},0.62)` }} className="transition group-hover:translate-x-1" /></span></Link>;
}

function ExampleCard({ title, cue, text, rgb, icon: Icon }: (typeof EXAMPLES)[number]) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.10] p-4 backdrop-blur-[12px]"><Icon size={17} style={{ color: `rgb(${rgb})` }} /><div className="mt-3 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${rgb},0.66)` }}>{cue}</div><h3 className="mt-1 text-[15px] font-semibold text-white">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-400">{text}</p></div>;
}
