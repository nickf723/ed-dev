import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Combine, Fingerprint, Scissors, StretchHorizontal } from "lucide-react";
import TopologyBackground from "./TopologyBackground";
import TopologyLab from "./TopologyLab";

const NODE_ID = "formal.mathematics.geometry.topology";

const OPERATIONS = [
  { label: "Stretch", allowed: true, detail: "Continuous changes in size are allowed.", rgb: "167, 139, 250" },
  { label: "Bend", allowed: true, detail: "Angles and rigid shape do not define topological identity.", rgb: "34, 211, 238" },
  { label: "Compress", allowed: true, detail: "Distances may change dramatically while continuity survives.", rgb: "52, 211, 153" },
  { label: "Tear", allowed: false, detail: "Cutting changes connectivity or boundary structure.", rgb: "248, 113, 113" },
  { label: "Glue", allowed: false, detail: "Identifying separate points can create new topology.", rgb: "251, 146, 60" },
] as const;

const CORE_IDEAS = [
  ["Homeomorphism", "A continuous, bijective correspondence with a continuous inverse. It formalizes when two spaces have the same topology."],
  ["Connectedness", "Whether a space can be separated into disconnected pieces. Continuous deformation cannot split one connected component into two."],
  ["Boundary", "Points that locally sit at an edge of a surface. A disk has boundary; a sphere does not."],
  ["Orientability", "Whether a consistent local orientation can be carried around the entire surface. A Möbius strip is the classic non-orientable example."],
] as const;

export default function TopologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05020c] text-slate-100 selection:bg-violet-400/25">
      <TopologyBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_18%,rgba(139,92,246,0.13),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(34,211,238,0.045),transparent_26%),linear-gradient(to_bottom,rgba(5,2,12,0.12),rgba(5,2,12,0.76)_76%,rgba(5,2,12,0.96))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.09] [background-image:linear-gradient(rgba(167,139,250,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.13)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#05020c]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Continuity · connectedness · boundary · invariants"
            eyebrowStyle="rule"
            icon={Combine}
            title={<span>Topology</span>}
            subtitle="Topology studies the structure that survives continuous deformation. Lengths, angles, and rigid shape may disappear from the problem while connectedness, boundary, orientability, holes, and neighborhoods remain."
            accentRgb="167, 139, 250"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fcfaff]"
            headerClassName="border-violet-100/[0.10]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="rounded-[28px] border border-violet-100/[0.10] bg-black/[0.15] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/62"><StretchHorizontal size={13} /> What counts as the same?</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Topology changes the equivalence rule before it changes the object.</h2>
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-400">Rigid geometry distinguishes shapes by measurement. Topology asks a looser question: can one space be continuously transformed into another without cutting, gluing, or identifying points that were separate?</p>
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/56"><Fingerprint size={13} /> Invariant thinking</div>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">A topological invariant is a property that must agree whenever two spaces are homeomorphic. One mismatch is enough to prove the spaces are not the same topological type.</p>
            <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-black/[0.14] px-4 py-3 font-mono text-[10px] text-violet-100/66">continuous deformation → preserve topology</div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.12] backdrop-blur-lg">
          <div className="grid md:grid-cols-5">
            {OPERATIONS.map((item, index) => (
              <div key={item.label} className="min-h-[128px] border-b border-white/[0.06] px-4 py-4 md:border-b-0 md:border-r md:last:border-r-0">
                <div className="flex items-center justify-between gap-2"><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span><span className="font-mono text-[7px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${item.rgb},0.66)` }}>{item.allowed ? "allowed" : "changes topology"}</span></div>
                <strong className="mt-3 block text-[12px] text-white/84">{item.label}</strong>
                <p className="mt-1.5 text-[9px] leading-4 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-5"><TopologyLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-200/54"><Scissors size={12} /> Reference concepts</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">The language of topology replaces measurement with structure.</h2></div>
            <p className="text-[11px] leading-5 text-slate-500">These concepts become more formal in point-set topology and algebraic topology, but the visual intuition starts with continuity and invariants.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {CORE_IDEAS.map(([term, detail], index) => (
              <div key={term} className="min-h-[170px] border-b border-white/[0.06] px-4 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                <span className="font-mono text-[8px] text-violet-200/36">0{index + 1}</span><strong className="mt-4 block text-[12px] text-white/82">{term}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/mathematics/geometry" label="Geometry" note="Return to the invariant ladder." rgb="56, 189, 248" />
          <Neighbor href="/formal-science/mathematics/geometry/non-euclidean" label="Non-Euclidean Geometry" note="Change the metric while keeping geometric measurement." rgb="129, 140, 248" />
          <Neighbor href="/formal-science/mathematics/algebra/abstract-algebra/group-theory" label="Group Theory" note="Study transformations and symmetry algebraically." rgb="250, 204, 21" />
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
