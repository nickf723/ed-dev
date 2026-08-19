import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  CircleDot,
  Compass,
  MoveUpRight,
  RotateCw,
  ScanLine,
  Sigma,
  Waves,
} from "lucide-react";
import VectorFieldBackground from "../VectorFieldBackground";
import VectorFieldLab from "./VectorFieldLab";

const NODE_ID = "formal.mathematics.calculus.vector";

const LOCAL_OBJECTS = [
  ["Gradient", "∇f", "For a scalar field, the gradient points in the direction of steepest local increase and packages partial derivatives into a vector."],
  ["Divergence", "∇·F", "Measures infinitesimal net outflow from a vector field. Positive divergence behaves locally like a source; negative divergence like a sink."],
  ["Curl", "∇×F", "Measures local rotational tendency of a vector field. In two dimensions, the relevant curl component can be treated as a scalar."],
  ["Directional derivative", "Dᵤf", "Measures the instantaneous rate of change of a scalar field in a chosen direction u; for a unit direction, Dᵤf = ∇f·u."],
] as const;

const INTEGRALS = [
  {
    icon: MoveUpRight,
    label: "Line integral",
    notation: "∫C F·dr",
    detail: "Accumulate a field along a curve. Depending on the integrand, line integrals can represent work, circulation, mass along a wire, or other path-dependent quantities.",
    rgb: "34, 211, 238",
  },
  {
    icon: Waves,
    label: "Flux integral",
    notation: "∬S F·n dS",
    detail: "Accumulate the component of a vector field crossing a surface, measuring net flow through an oriented boundary.",
    rgb: "52, 211, 153",
  },
  {
    icon: Sigma,
    label: "Volume integral",
    notation: "∭V g dV",
    detail: "Accumulate a scalar density throughout a three-dimensional region, providing the interior quantity used in many conservation and divergence statements.",
    rgb: "192, 132, 252",
  },
] as const;

const THEOREMS = [
  ["Gradient theorem", "Line integral of a gradient field depends only on endpoint potential difference, under the relevant smoothness assumptions."],
  ["Green’s theorem", "Relates circulation or flux around a simple closed plane curve to a double integral of curl or divergence over the enclosed region."],
  ["Stokes’ theorem", "Relates circulation around a surface boundary to the surface integral of curl across the surface."],
  ["Divergence theorem", "Relates outward flux through a closed surface to the volume integral of divergence inside that surface."],
] as const;

export default function VectorCalculusPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050712] text-slate-100 selection:bg-cyan-300/25">
      <VectorFieldBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(34,211,238,0.10),transparent_29%),radial-gradient(circle_at_18%_84%,rgba(192,132,252,0.045),transparent_28%),linear-gradient(to_bottom,rgba(5,7,18,0.08),rgba(5,7,18,0.80)_78%,rgba(3,4,12,0.98))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#050712]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Vector fields · divergence · curl · circulation · flux"
            eyebrowStyle="rule"
            icon={Compass}
            title={<span>Vector Calculus</span>}
            subtitle="Vector calculus studies scalar and vector fields by combining multivariable derivatives with integrals over curves, surfaces, and volumes. Its central theorems connect local field behavior inside a region to accumulated behavior on that region’s boundary."
            accentRgb="34, 211, 238"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.067em] text-[#f4fcff]"
            headerClassName="border-cyan-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-cyan-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/52"><CircleDot size={13} /> Local field behavior</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Derivatives turn a field into local geometric information.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Gradient, divergence, curl, and directional derivatives answer different questions. No single one describes the entire field.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {LOCAL_OBJECTS.map(([name, notation, detail], index) => (
              <article key={name} className="min-h-[185px] border-b border-white/[0.06] px-5 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                <div className="flex items-center justify-between"><span className="font-mono text-[8px] text-cyan-200/28">0{index + 1}</span><span className="font-mono text-[12px] text-white/62">{notation}</span></div>
                <h3 className="mt-3 text-[13px] font-semibold text-white/84">{name}</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-6"><VectorFieldLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/46"><ScanLine size={13} /> Accumulation over geometry</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Integrals ask how a field accumulates along, through, or throughout a region.</h2></div>
            <p className="text-[11px] leading-5 text-slate-500">Orientation matters for circulation and flux because reversing a path or normal direction can reverse the sign of the integral.</p>
          </div>
          <div className="grid lg:grid-cols-3">
            {INTEGRALS.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[210px] border-b border-white/[0.06] px-5 py-5 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <div className="flex items-center justify-between"><Icon size={14} style={{ color: `rgb(${item.rgb})` }} /><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-4 text-[13px] font-semibold text-white/84">{item.label}</h3>
                  <div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.notation}</div>
                  <p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/44">Local-to-boundary theorems</div><h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Different theorems share one architecture.</h2></div>
            {THEOREMS.map(([name, detail], index) => <div key={name} className="grid gap-3 border-b border-white/[0.06] px-5 py-4 last:border-b-0 sm:grid-cols-[34px_150px_minmax(0,1fr)] sm:items-start"><span className="font-mono text-[8px] text-violet-200/28">0{index + 1}</span><strong className="text-[11px] text-white/82">{name}</strong><span className="text-[10px] leading-5 text-slate-600">{detail}</span></div>)}
          </div>
          <aside className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/42"><RotateCw size={13} /> A unifying picture</div>
            <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">Interior derivative ↔ boundary integral.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">The Fundamental Theorem of Calculus is the one-dimensional ancestor of this pattern. Green, Stokes, and divergence theorems generalize the same local-to-boundary relationship to richer geometry.</p>
          </aside>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/calculus/multivariate" label="Multivariable Calculus" note="Partial derivatives, gradients, and multiple integrals provide the immediate foundation." rgb="192, 132, 252" />
          <Neighbor href="/natural-science/physics/electromagnetism" label="Electromagnetism" note="Electric and magnetic fields make divergence, curl, flux, and circulation physically concrete." rgb="239, 68, 68" />
          <Neighbor href="/formal-science/mathematics/calculus" label="Calculus" note="Return to the broader local-change and accumulation spine." rgb="34, 211, 238" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
