import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import MandelbrotBackground from "./MandelbrotBackground";
import FractalExplorer from "./FractalExplorer";
import {
  ArrowRight,
  Expand,
  Grid3X3,
  Ruler,
  Snowflake,
  Sparkles,
} from "lucide-react";

const STRUCTURE = [
  ["Iteration", "Apply a rule repeatedly. In zₙ₊₁ = zₙ² + c, each new complex value becomes the input to the next step."],
  ["Bounded vs. escape", "For these quadratic sets, classification depends on whether an orbit remains bounded or eventually grows beyond an escape threshold."],
  ["Boundary complexity", "The boundary separating different long-run behaviors can contain structure at many scales even when the generating rule is compact."],
  ["Parameter dependence", "Changing c changes the Julia set. The Mandelbrot plane organizes the parameter values of this quadratic family rather than being the same object as one Julia set."],
] as const;

const SCALE_NOTES = [
  {
    title: "Exact self-similarity",
    text: "Some constructed fractals contain copies of themselves related by exact geometric scaling, as in the Sierpiński triangle.",
    icon: Grid3X3,
    rgb: "96,165,250",
  },
  {
    title: "Statistical / approximate scaling",
    text: "Natural coastlines, branching systems, clouds, and rough surfaces can show scale-dependent statistical patterns without being exact copies at every magnification.",
    icon: Expand,
    rgb: "94,234,212",
  },
  {
    title: "Fractal dimension",
    text: "Several dimension concepts quantify how detail or measure changes with scale. Non-integer dimension is common in fractal geometry, but the exact definition depends on the object and method.",
    icon: Ruler,
    rgb: "192,132,252",
  },
] as const;

const PITFALLS = [
  ["Self-similar ≠ identical everywhere", "The Mandelbrot set contains recurring motifs, but not every zoom is an exact miniature copy of the whole set."],
  ["Rough ≠ automatically fractal", "Irregular appearance alone does not establish a scaling law or fractal dimension. The claim needs a measurable relation across scales."],
  ["Natural fractal ≠ mathematical ideal", "Real biological and geological systems have finite size, material constraints, noise, and characteristic scales. Mathematical fractals can continue indefinitely by definition."],
] as const;

export default function FractalsPage() {
  return (
    <SceneFrame
      background={<MandelbrotBackground />}
      className="bg-[#050712] text-slate-100 selection:bg-blue-300/25"
      maxWidthClassName="max-w-[1500px]"
      headerBackground="rgba(5,7,18,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Formal Science", href: "/formal-science" },
            { label: "Systems Science", href: "/formal-science/systems-science" },
            { label: "Complexity & Emergence", href: "/formal-science/systems-science/complexity-chaos" },
            { label: "Fractals" },
          ]}
          eyebrow="Iteration · scaling · boundary · dimension · parameter space"
          eyebrowStyle="rule"
          icon={Snowflake}
          title={<span>Fractals</span>}
          subtitle="Explore how repeated rules generate boundaries and patterns with structure across scales, then distinguish exact mathematical fractals from approximate scaling patterns in natural systems."
          accentRgb="96, 165, 250"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f3f8ff]"
          headerClassName="border-blue-100/[0.10]"
        />
      }
    >
      <section className="mt-5 rounded-[24px] border border-blue-100/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-blue-200/68">Phenomenon</div>
        <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">One quadratic iteration can draw radically different boundaries when a single complex parameter changes.</h2>
        <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">Use the explorer below before worrying about the vocabulary. Click different values of c in the Mandelbrot plane and watch the corresponding Julia set change beside it. Look for connected regions, dust-like breakup, filaments, and repeated motifs.</p>
      </section>

      <section className="mt-5">
        <FractalExplorer />
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(390px,0.95fr)] xl:items-start">
        <Surface variant="glass" className="rounded-[24px] border-blue-100/[0.09] p-5 sm:p-6" style={{ background: "rgba(7,10,23,0.16)" }}>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-blue-200/58">Conceptual bridge</div>
          <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">A fractal is not “complex because the formula is complicated.”</h2>
          <p className="mt-3 text-[13px] leading-6 text-slate-400">The quadratic rule here is short. Complexity appears in the repeated orbit classification and especially in the boundary between starting values or parameters with different long-run behavior.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {STRUCTURE.map(([title, text], index) => (
              <div key={title} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 rounded-[16px] border border-white/[0.06] bg-black/[0.10] p-3">
                <span className="font-mono text-[9px] text-blue-200/42">0{index + 1}</span>
                <div><strong className="text-[13px] text-white">{title}</strong><p className="mt-1 text-[12px] leading-5 text-slate-400">{text}</p></div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface variant="open" className="rounded-[24px] border-violet-100/[0.09] p-5 sm:p-6 xl:sticky xl:top-[170px]">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/58">Formal distinction</div>
          <h3 className="mt-2 text-[21px] font-semibold text-white">Mandelbrot and Julia sets use the same iteration in different roles.</h3>
          <div className="mt-4 space-y-3">
            <Term term="Mandelbrot set" text="Vary c, begin at z₀ = 0, and ask which parameter values keep the critical orbit bounded." />
            <Term term="Julia set" text="Fix c, vary the starting point z₀, and classify which initial points remain bounded under repeated iteration." />
          </div>
          <p className="mt-4 text-[11px] leading-5 text-slate-500">For this quadratic family, the geometry of the Julia set is strongly related to where c lies relative to the Mandelbrot set. The two pictures are connected, but they are not interchangeable.</p>
        </Surface>
      </section>

      <section className="mt-8 border-t border-blue-100/[0.09] pt-5">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><Sparkles size={13} /> Scaling language</div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {SCALE_NOTES.map((note) => <ScaleCard key={note.title} {...note} />)}
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
        <Surface variant="glass" className="rounded-[22px] border-emerald-100/[0.08] p-5" style={{ background: "rgba(5,18,14,0.12)" }}>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-200/58">Application</div>
          <h3 className="mt-2 text-[20px] font-semibold text-white">Use the explorer to find two contrasting parameters.</h3>
          <p className="mt-3 text-[13px] leading-6 text-slate-400">Choose one c from a dark interior region of the Mandelbrot view and one from clearly outside it. Compare the two Julia images. Describe the visible difference first, then connect it to whether the critical orbit remains bounded.</p>
        </Surface>
        <div className="space-y-2 xl:sticky xl:top-[170px]">
          {PITFALLS.map(([title, text]) => <Term key={title} term={title} text={text} />)}
        </div>
      </section>

      <section className="mt-8 border-t border-blue-100/[0.09] pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/formal-science/systems-science/complexity-chaos" className="text-[11px] font-semibold text-slate-400 hover:text-white">← Complexity &amp; Emergence</Link>
          <Link href="/formal-science/systems-science/chaos-theory" className="group inline-flex items-center gap-2 rounded-full border border-violet-200/[0.12] bg-violet-300/[0.03] px-4 py-2 text-[11px] font-semibold text-violet-100/80">Neighbor: Chaos Theory <ArrowRight size={12} className="transition group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </SceneFrame>
  );
}

function Term({ term, text }: { term: string; text: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.10] p-3"><strong className="text-[12px] text-white/86">{term}</strong><p className="mt-1.5 text-[11px] leading-5 text-slate-400">{text}</p></div>;
}

function ScaleCard({ title, text, icon: Icon, rgb }: (typeof SCALE_NOTES)[number]) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.10] p-4 backdrop-blur-[12px]"><Icon size={17} style={{ color: `rgb(${rgb})` }} /><strong className="mt-3 block text-[14px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-400">{text}</p></div>;
}
