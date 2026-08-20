import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Braces, Layers3 } from "lucide-react";
import FundamentalsBackground from "./FundamentalsBackground";
import FundamentalsWorkbench from "./FundamentalsWorkbench";

const NODE_ID = "formal.computer-science.software.fundamentals";
const IDEAS = [
  ["Values & representation", "Programs manipulate representations interpreted according to a language, type system, protocol, or data structure."],
  ["State & mutation", "Some operations create new values while others update state that later operations can observe. Tracking ownership and lifetime becomes increasingly important as programs grow."],
  ["Control & composition", "Conditionals, iteration, function calls, events, and exceptions determine how smaller operations compose into larger behavior."],
  ["Abstraction", "Names, functions, objects, modules, types, and interfaces let programmers reason about a useful contract without carrying every implementation detail at once."],
] as const;

export default function FundamentalsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030a06] text-slate-100 selection:bg-green-300/25">
      <FundamentalsBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(34,197,94,0.09),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(139,92,246,0.04),transparent_28%),linear-gradient(to_bottom,rgba(3,10,6,0.08),rgba(3,10,6,0.80)_78%,rgba(2,7,4,0.98))]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030a06]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader breadcrumbs={context.breadcrumbs} eyebrow="Values · collections · control flow · functions · abstraction" eyebrowStyle="rule" icon={Braces} title={<span>Programming Fundamentals</span>} subtitle="Programming turns computational ideas into executable descriptions. The fundamentals are not a particular syntax: they are the recurring concepts used to represent values, organize data, choose control flow, manage state, package reusable behavior, and handle exceptional conditions." accentRgb="34, 197, 94" titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f4fff7]" headerClassName="border-green-100/[0.10]" />
        </div>

        <section className="mt-5 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6"><div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/46"><Layers3 size={13}/> Durable ideas</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Syntax changes faster than the programming concepts beneath it.</h2></div><p className="text-[11px] leading-5 text-slate-500">The examples below use readable mixed pseudocode so the workbench can focus on behavior and state rather than the exact grammar of one language.</p></div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">{IDEAS.map(([name,detail],index)=><article key={name} className="min-h-[165px] border-b border-white/[0.06] px-5 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-green-200/28">0{index+1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div>
        </section>

        <FundamentalsWorkbench />

        <section className="mt-6 grid gap-3 sm:grid-cols-3"><Neighbor href="/formal-science/computer-science/software" label="Software" note="Return to languages, design, runtimes, distributed systems, and reliability." rgb="34, 197, 94"/><Neighbor href="/formal-science/computer-science/algorithms" label="Algorithms & Data" note="Move from programming constructs to procedures, correctness, data structures, and resource analysis." rgb="167, 139, 250"/><Neighbor href="/formal-science/computer-science/hardware" label="Hardware Architecture" note="See how program operations are ultimately carried out by instructions, memory, and digital circuits." rgb="245, 158, 11"/></section>
      </div>
    </main>
  );
}
function Neighbor({href,label,note,rgb}:{href:string;label:string;note:string;rgb:string}){return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{background:`rgb(${rgb})`,boxShadow:`0 0 18px rgba(${rgb},0.22)`}}/><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1"/></Link>}
