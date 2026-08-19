import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Circle, Radio, Triangle } from "lucide-react";
import SineConstructionBackground from "./SineConstructionBackground";
import TrigRatioSolver from "./TrigRatioSolver";
import UnitCircleLab from "./UnitCircleLab";

const NODE_ID = "formal.mathematics.geometry.trigonometry";

const PATHWAY = [
  {
    icon: Triangle,
    label: "Right triangles",
    question: "How does an angle determine side ratios?",
    detail: "Sine, cosine, and tangent begin as stable ratios among corresponding sides of similar right triangles.",
    rgb: "34, 211, 238",
  },
  {
    icon: Circle,
    label: "Unit circle",
    question: "How do those ratios work through a full rotation?",
    detail: "The point at angle θ has coordinates (cos θ, sin θ), extending trigonometric functions beyond acute triangle angles.",
    rgb: "192, 132, 252",
  },
  {
    icon: Radio,
    label: "Periodic signals",
    question: "What happens when rotation unfolds through time?",
    detail: "Circular coordinates oscillate. That periodic structure makes sine and cosine natural models for waves, cycles, and rotation.",
    rgb: "244, 114, 182",
  },
] as const;

const IDENTITIES = [
  ["Coordinate", "(cos θ, sin θ)", "The unit-circle point at angle θ."],
  ["Pythagorean", "sin²θ + cos²θ = 1", "The unit circle is x² + y² = 1 with x = cos θ and y = sin θ."],
  ["Tangent", "tan θ = sin θ / cos θ", "Slope-like ratio; undefined where cos θ = 0."],
  ["Period", "sin(θ + 2π) = sin θ", "One full turn returns to the same coordinate."],
] as const;

export default function TrigonometryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-slate-100 selection:bg-violet-400/25">
      <SineConstructionBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_16%,rgba(139,92,246,0.12),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(34,211,238,0.07),transparent_28%),linear-gradient(to_bottom,rgba(2,6,23,0.10),rgba(2,6,23,0.73)_74%,rgba(2,6,23,0.96))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#020617]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Angle · ratio · rotation · periodicity"
            eyebrowStyle="rule"
            icon={Triangle}
            title={<span>Trigonometry</span>}
            subtitle="Trigonometry turns angles into ratios, ratios into coordinates, and coordinates into periodic functions. The same structure connects right triangles, the unit circle, rotation, oscillation, and wave-like behavior."
            accentRgb="192, 132, 252"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fbf8ff]"
            headerClassName="border-violet-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-violet-200/[0.10] bg-black/[0.18] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end sm:px-6">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/62">Concept pathway</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">One idea keeps changing representation.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Start with a triangle ratio, move it onto a circle, then let the angle advance continuously. Trigonometry becomes much less mnemonic once those three views are connected.</p>
          </div>
          <div className="grid md:grid-cols-3">
            {PATHWAY.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 md:border-b-0 md:border-r md:last:border-r-0">
                  <div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)` }}><Icon size={14} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-5 text-[15px] font-semibold text-white">{item.label}</h3>
                  <div className="mt-1 font-mono text-[9px] leading-4" style={{ color: `rgba(${item.rgb},0.62)` }}>{item.question}</div>
                  <p className="mt-3 text-[11px] leading-5 text-slate-500">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-5 2xl:grid-cols-2">
          <TrigRatioSolver />
          <UnitCircleLab />
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200/58"><Radio size={12} /> Circle → signal</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A sine wave is circular motion read one coordinate at a time.</h2>
            </div>
            <p className="text-[11px] leading-5 text-slate-500">The ambient construction behind this page continuously projects the vertical coordinate of a rotating point into a sine wave. Cosine is the horizontal projection of the same motion.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {IDENTITIES.map(([label, formula, detail], index) => (
              <div key={label} className="min-h-[150px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span><span className="font-mono text-[8px] uppercase tracking-[0.1em] text-violet-200/42">{label}</span></div>
                <strong className="mt-4 block font-mono text-[12px] text-white/82">{formula}</strong>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/geometry/euclidean" label="Euclidean Geometry" note="Triangle similarity and geometric proof." rgb="56, 189, 248" />
          <Neighbor href="/natural-science/physics/waves-optics/wave-motion" label="Wave Motion" note="Use periodic functions to describe physical waves." rgb="34, 211, 238" />
          <Neighbor href="/formal-science/mathematics/calculus" label="Calculus" note="Differentiate and integrate trigonometric functions." rgb="248, 113, 113" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return (
    <Link href={href} className="group flex min-h-[82px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} />
      <span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span>
      <ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" />
    </Link>
  );
}
