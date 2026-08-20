import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import SystemsBackground from "./SystemsBackground";
import LogisticMapLab from "./LogisticMapLab";
import {
  ArrowRight,
  GitFork,
  Orbit,
  RefreshCw,
  Triangle,
  Waves,
} from "lucide-react";

const CONCEPTS = [
  ["Determinism", "A deterministic model assigns the next state from the current state and parameters. Deterministic does not guarantee easy long-range prediction."],
  ["Sensitive dependence", "Nearby initial states can separate rapidly in some nonlinear regimes, so small measurement uncertainty eventually grows into large trajectory uncertainty."],
  ["Attractors", "Long-run motion may remain confined to a point, cycle, curve, region, or more complicated invariant set even when exact future position is hard to predict."],
  ["Bifurcation", "Changing a parameter can change the qualitative long-run behavior of a system, such as moving from a fixed point to cycles and eventually to chaotic regimes."],
] as const;

const BOUNDARIES = [
  ["Chaos ≠ randomness", "A chaotic trajectory can come from a fully deterministic rule. Randomness and deterministic chaos are different sources of uncertainty even when their outputs can look irregular."],
  ["Sensitivity ≠ every small cause becomes enormous", "The butterfly effect is shorthand for sensitive dependence. It is not a literal rule that any tiny disturbance must produce a dramatic event such as a tornado."],
  ["Prediction horizon is system-specific", "Useful forecast horizons depend on dynamics, observations, model error, scale, and the quantity being forecast. There is no single universal 'two-week Lyapunov time' for all weather variables or chaotic systems."],
] as const;

export default function ChaosTheoryPage() {
  return (
    <SceneFrame
      background={<SystemsBackground />}
      className="bg-[#080508] text-slate-100 selection:bg-violet-300/25"
      maxWidthClassName="max-w-[1500px]"
      headerBackground="rgba(8,5,8,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Formal Science", href: "/formal-science" },
            { label: "Systems Science", href: "/formal-science/systems-science" },
            { label: "Chaos & Nonlinear Dynamics" },
          ]}
          eyebrow="Determinism · nonlinearity · sensitivity · bifurcation · attractors"
          eyebrowStyle="rule"
          icon={Orbit}
          title={<span>Chaos &amp; Nonlinear Dynamics</span>}
          subtitle="Study deterministic systems whose nonlinear evolution can amplify tiny uncertainty, change qualitative behavior across parameter regimes, and limit long-range trajectory prediction."
          accentRgb="192, 132, 252"
          titleClassName="font-sans text-[clamp(2.6rem,5vw,5.7rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#faf5ff]"
          headerClassName="border-violet-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-violet-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(16,8,20,0.34),transparent_30%,transparent_70%,rgba(10,8,5,0.26))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/68"><GitFork size={14} /> Predictability under nonlinear dynamics</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">Knowing the rule exactly does not mean knowing a distant future state exactly.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">When trajectories are sensitive to initial conditions, finite measurement precision matters. Two states that are initially indistinguishable at the scale of a measurement can eventually evolve into very different trajectories.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/formal-science/systems-science/complexity-chaos" label="Complexity & Emergence" note="collective pattern · local interaction" />
            <Neighbor href="/formal-science/systems-science/complexity-chaos/fractals" label="Fractals" note="iteration · scaling · geometry" />
          </div>
        </div>
      </section>

      <section className="mt-7">
        <LogisticMapLab />
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(390px,0.95fr)] xl:items-start">
        <Surface variant="glass" className="rounded-[24px] border-violet-100/[0.09] p-5 sm:p-6" style={{ background: "rgba(15,8,20,0.16)" }}>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/58"><Orbit size={13} /> Formal structure</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {CONCEPTS.map(([title, text], index) => (
              <div key={title} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 rounded-[16px] border border-white/[0.06] bg-black/[0.10] p-3">
                <span className="font-mono text-[9px] text-violet-200/42">0{index + 1}</span>
                <div><strong className="text-[13px] text-white">{title}</strong><p className="mt-1 text-[12px] leading-5 text-slate-400">{text}</p></div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface variant="open" className="rounded-[24px] border-cyan-100/[0.08] p-5 sm:p-6 xl:sticky xl:top-[170px]">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><RefreshCw size={13} /> Predictability is a scale question</div>
          <h3 className="mt-2 text-[21px] font-semibold text-white">Forecast failure does not mean the model has no structure.</h3>
          <p className="mt-3 text-[13px] leading-6 text-slate-400">A chaotic system can preserve statistical regularities, invariant sets, parameter regimes, or short-range predictability even while exact long-range trajectories become extremely sensitive to initial uncertainty.</p>
          <p className="mt-3 text-[12px] leading-5 text-slate-500">This is why chaos research studies more than “what happens next?” It also studies stability, attractors, rates of separation, bifurcations, recurrence, and ensemble behavior.</p>
        </Surface>
      </section>

      <section className="mt-8 border-t border-violet-100/[0.09] pt-5">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58"><Triangle size={13} /> Common overstatements</div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {BOUNDARIES.map(([title, text]) => <div key={title} className="rounded-[18px] border border-white/[0.07] bg-black/[0.10] p-4 backdrop-blur-[12px]"><strong className="text-[13px] text-white/86">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-400">{text}</p></div>)}
        </div>
      </section>

      <section className="mt-8 rounded-[22px] border border-cyan-100/[0.08] bg-cyan-300/[0.02] p-5 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><Waves size={13} /> The butterfly effect, precisely</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-300/74">The phrase refers to sensitive dependence on initial conditions: small differences in the represented state can grow substantially under the dynamics. It is a metaphor for predictability limits, not a license to trace any distant event to any arbitrarily tiny cause.</p>
          </div>
          <Link href="/formal-science/systems-science" className="group flex items-center justify-between rounded-[16px] border border-white/[0.07] bg-black/[0.10] p-4 text-[12px] font-semibold text-white/80 transition hover:bg-black/[0.18]">Systems Science map <ArrowRight size={13} className="text-violet-200/55 transition group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </SceneFrame>
  );
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[80px] flex-col justify-between rounded-[15px] border border-white/[0.07] bg-black/[0.08] p-3 backdrop-blur-[10px] transition hover:bg-black/[0.16]"><strong className="text-[12px] text-white/84">{label}</strong><span className="flex items-end justify-between gap-2"><span className="text-[10px] leading-4 text-slate-500">{note}</span><ArrowRight size={11} className="text-violet-200/55 transition group-hover:translate-x-1" /></span></Link>;
}
