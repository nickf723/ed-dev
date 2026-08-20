import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Compass, Globe2, Ruler, Sigma } from "lucide-react";
import CurvatureLab from "./CurvatureLab";
import NonEuclideanBackground from "./NonEuclideanBackground";

const NODE_ID = "formal.mathematics.geometry.non-euclidean";

const CONTRASTS = [
  {
    label: "Euclidean",
    value: "K = 0",
    detail: "Flat space. One parallel through an external point. Geodesic triangles sum to 180°.",
    rgb: "226, 232, 240",
  },
  {
    label: "Elliptic / spherical",
    value: "K > 0",
    detail: "Positive curvature. Great-circle geodesics eventually meet. Geodesic triangles have angle excess.",
    rgb: "56, 189, 248",
  },
  {
    label: "Hyperbolic",
    value: "K < 0",
    detail: "Negative curvature. Infinitely many nonintersecting geodesics can pass through the external point. Triangles have angle deficit.",
    rgb: "192, 132, 252",
  },
] as const;

export default function NonEuclideanPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080414] text-slate-100 selection:bg-indigo-400/25">
      <NonEuclideanBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(192,132,252,0.08),transparent_26%),linear-gradient(to_bottom,rgba(8,4,20,0.12),rgba(8,4,20,0.76)_76%,rgba(8,4,20,0.96))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.10] [background-image:radial-gradient(circle_at_center,rgba(199,210,254,0.20)_1px,transparent_1.2px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#080414]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Curvature · geodesics · parallelism · global structure"
            eyebrowStyle="rule"
            icon={Globe2}
            title={<span>Non-Euclidean Geometry</span>}
            subtitle="Euclidean geometry is one possible geometry, not the definition of geometry itself. Change the curvature or the parallel postulate and familiar statements about lines, triangles, distance, and global shape change with it."
            accentRgb="129, 140, 248"
            titleClassName="font-sans text-[clamp(2.7rem,5.3vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#fafaff]"
            headerClassName="border-indigo-100/[0.10]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(330px,0.8fr)]">
          <div className="rounded-[28px] border border-indigo-100/[0.10] bg-black/[0.16] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-indigo-200/64">
              <Compass size={13} /> The fifth-postulate fork
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.9rem,3.5vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">
              Geometry changes when “straight” and “parallel” are allowed to live on curved spaces.
            </h2>
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-400">
              In Euclidean geometry, through a point outside a line there is exactly one parallel line. Hyperbolic geometry allows infinitely many nonintersecting geodesics through that point, while elliptic geometry has no global parallels because its geodesics eventually meet.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.14] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-200/58"><Sigma size={13} /> Core distinction</div>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">
              A geodesic is the locally straightest path permitted by the geometry. On a sphere, great circles play that role; in hyperbolic space, geodesics follow the metric of negatively curved space rather than ordinary straight lines drawn on a flat sheet.
            </p>
            <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-black/[0.16] px-4 py-3 font-mono text-[11px] text-indigo-100/70">
              local straightness ≠ global Euclidean behavior
            </div>
          </div>
        </section>

        <div className="mt-5">
          <CurvatureLab />
        </div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end sm:px-6">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/58">Three constant-curvature models</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">The sign of curvature changes familiar geometric rules.</h2>
            </div>
            <p className="text-[11px] leading-5 text-slate-500">These are idealized model geometries. More general surfaces can have curvature that varies from point to point.</p>
          </div>
          <div className="grid md:grid-cols-3">
            {CONTRASTS.map((item, index) => (
              <article key={item.label} className="min-h-[190px] border-b border-white/[0.06] px-5 py-5 md:border-b-0 md:border-r md:last:border-r-0">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span><span className="font-mono text-[9px]" style={{ color: `rgba(${item.rgb},0.70)` }}>{item.value}</span></div>
                <h3 className="mt-5 text-[15px] font-semibold text-white">{item.label}</h3>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/geometry/euclidean" label="Euclidean Geometry" note="Return to the flat-space baseline." rgb="56, 189, 248" />
          <Neighbor href="/formal-science/mathematics/geometry/topology" label="Topology" note="Relax measurement further and keep continuity." rgb="192, 132, 252" />
          <Neighbor href="/natural-science/physics/relativity/general" label="General Relativity" note="See curved spacetime used in physical theory." rgb="248, 113, 113" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return (
    <Link href={href} className="group flex min-h-[86px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}><Ruler size={14} /></span>
      <span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span>
      <ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" />
    </Link>
  );
}
