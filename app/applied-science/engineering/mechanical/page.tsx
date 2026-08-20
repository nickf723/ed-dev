import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Boxes, Cog, Factory, Gauge, Layers3, Repeat2, Settings2, ThermometerSun, Waves, Wrench } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { MECHANICAL_ENGINEERING_CURRICULUM } from "@/lib/curriculum/applied/mechanical-engineering";
import MechanicalBackground from "./MechanicalBackground";
import SteamEngine from "./SteamEngine";

const RGB = [
  "251,191,36",
  "125,211,252",
  "251,146,60",
  "248,113,113",
  "56,189,248",
  "192,132,252",
  "34,211,238",
  "74,222,128",
  "148,163,184",
] as const;

const REVIEW_QUESTIONS = [
  ["Motion", "What positions, velocities, accelerations, and constraints does the mechanism permit?"],
  ["Loads", "Where do forces, moments, pressure, contact, vibration, and thermal stress travel?"],
  ["Energy", "Where does useful work enter, transform, store, dissipate, or leave the system?"],
  ["Interfaces", "Which surfaces slide, roll, seal, fasten, transmit torque, exchange heat, or guide motion?"],
  ["Manufacture", "Can the geometry be made, measured, assembled, aligned, and controlled at realistic tolerances?"],
  ["Life cycle", "What wears, fatigues, corrodes, loosens, leaks, overheats, needs lubrication, or requires access for service?"],
] as const;

export default function MechanicalPage() {
  const branches = MECHANICAL_ENGINEERING_CURRICULUM.children ?? [];

  return (
    <SceneFrame
      background={<MechanicalBackground />}
      className="bg-[#14100d] text-stone-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(20,16,13,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applied Sciences", href: "/applied-science" }, { label: "Engineering", href: "/applied-science/engineering" }, { label: "Mechanical Engineering" }]}
          eyebrow="Motion · loads · energy · machines · manufacture · service"
          eyebrowStyle="rule"
          icon={Cog}
          title={<span>Mechanical Engineering</span>}
          subtitle="Design and analyze machines and physical systems by connecting mechanics, thermal and fluid behavior, mechanisms, materials, manufacturing, controls, testing, reliability, and maintenance."
          accentRgb="245, 158, 11"
          titleClassName="font-sans text-[clamp(2.8rem,5.2vw,5.7rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#fffbeb]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.10] py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,13,0.44),transparent_31%,transparent_73%,rgba(10,13,17,0.34))] backdrop-blur-[2px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/62"><Settings2 size={14} /> Primary navigation · machine drawing index</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Mechanical systems are relationships between motion, load, energy, matter, and time.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/70">The mechanism bench behind the page inherits Engineering’s drawing-room language, then specializes it into gears, shafts, bearings, a flywheel and crank-slider, a spring-damper, and a pump loop. One slow shaft turns the system while the drawing remains readable as a still machine study.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/applied-science/engineering" icon={Wrench} label="Engineering" note="parent design discipline" />
            <Neighbor href="/applied-science/materials-science" icon={Layers3} label="Materials Science" note="sibling field, not a Mechanical child" />
            <Neighbor href="/natural-science/physics/mechanics" icon={Repeat2} label="Mechanics" note="physical laws and models" />
            <Neighbor href="/natural-science/physics/thermodynamics" icon={ThermometerSun} label="Thermodynamics" note="physical energy principles" />
          </div>
        </div>

        <div className="relative mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => {
            const rgb = RGB[index % RGB.length];
            return <div key={branch.id} aria-disabled="true" className="min-h-[142px] border-b border-white/[0.06] px-4 py-4 backdrop-blur-[7px] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.68)` }}>ME.{String(index + 1).padStart(2, "0")}</span><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-stone-600">planned</span></div><strong className="mt-2 block text-[14px] text-white/84">{branch.label}</strong><p className="mt-2 text-[11px] leading-4 text-stone-500">{branch.description}</p></div>;
          })}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/58"><Gauge size={13} /> Signature instrument · mechanism kinematics</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">A constraint turns rotation into a different kind of motion.</h2></div>
          <p className="text-[12px] leading-5 text-stone-500">The crank-slider keeps the old piston/flywheel identity but strips away the fake boiler model. The geometry is explicit, the units are visible, and the animation can be paused so the mechanism can be inspected at any angle.</p>
        </div>
        <SteamEngine />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_390px] xl:items-start">
        <Surface variant="open" className="rounded-[28px] border-amber-100/[0.08]" style={{ background: "rgba(20,16,13,0.025)" }}>
          <div className="p-5"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-amber-200/48"><Boxes size={12} /> Design review · reference, not navigation</div><h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Ask the machine six different questions before calling it finished.</h3></div>
          <div className="grid border-y border-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
            {REVIEW_QUESTIONS.map(([term, detail], index) => <div key={term} className="border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[9px] text-amber-200/38">0{index + 1}</span><strong className="mt-1 block text-[13px] text-stone-200/86">{term}</strong><p className="mt-1 text-[11px] leading-5 text-stone-500">{detail}</p></div>)}
          </div>
        </Surface>

        <Surface variant="glass" className="overflow-hidden rounded-[28px] border-cyan-100/[0.08]" style={{ background: "rgba(10,13,17,0.12)" }}>
          <div className="p-5"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-cyan-200/46"><Waves size={12} /> Child specialization</div><h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">Same engineering family, narrower physical grammar.</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            <Compare icon={Wrench} label="Engineering parent" text="Requirements, design, testing, tradeoffs, and iteration across many engineered system families." />
            <Compare icon={Cog} label="Mechanical child" text="Motion, forces, energy conversion, mechanisms, thermal-fluid behavior, machine components, manufacturing, and physical service life." />
            <Compare icon={Layers3} label="Materials sibling" text="Processing, structure, properties, and performance of the materials from which mechanical parts are made." />
            <Compare icon={Factory} label="Manufacturing branch" text="How a designed part becomes a repeatable physical product through processes, tooling, measurement, assembly, and quality control." />
          </div>
          <p className="p-5 text-[10px] leading-5 text-stone-600">The borders overlap in real engineering work. The curriculum separates them so each page can teach a coherent question rather than pretending disciplines never collaborate.</p>
        </Surface>
      </section>
    </SceneFrame>
  );
}

function Neighbor({ href, icon: Icon, label, note }: { href: string; icon: LucideIcon; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[72px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="flex items-center gap-2 text-[11px] font-semibold text-white/78"><Icon size={12} className="text-amber-200/52" />{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-4 text-stone-600">{note}</span><ArrowRight size={10} className="text-stone-600 transition group-hover:translate-x-1" /></span></Link>;
}

function Compare({ icon: Icon, label, text }: { icon: LucideIcon; label: string; text: string }) {
  return <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 px-4 py-3"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-cyan-200/52"><Icon size={12} /></span><span><strong className="block text-[12px] text-white/78">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-stone-600">{text}</span></span></div>;
}
