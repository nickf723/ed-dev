import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  Boxes,
  CircuitBoard,
  Cpu,
  Database,
  Gauge,
  MemoryStick,
  Network,
  Rows3,
  type LucideIcon,
} from "lucide-react";
import CpuSimulator from "./CpuSimulator";
import HardwareBackground from "./HardwareBackground";

const NODE_ID = "formal.computer-science.hardware";

type BranchMeta = {
  icon: LucideIcon;
  role: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.computer-science.hardware.circuits": {
    icon: CircuitBoard,
    role: "logic and state",
    question: "How do Boolean operations and stored bits become physical state transitions?",
    rgb: "250, 204, 21",
  },
  "formal.computer-science.hardware.architecture": {
    icon: Cpu,
    role: "instruction execution",
    question: "How are registers, arithmetic, control, and instruction semantics organized into a processor?",
    rgb: "251, 146, 60",
  },
  "formal.computer-science.hardware.memory": {
    icon: MemoryStick,
    role: "data movement",
    question: "How do locality, capacity, latency, and bandwidth shape where information is stored?",
    rgb: "56, 189, 248",
  },
};

const EXECUTION_PATH = [
  {
    number: "01",
    label: "Fetch",
    detail: "Use the program counter to identify the next instruction and move its encoded form from memory into the processor.",
    rgb: "56, 189, 248",
  },
  {
    number: "02",
    label: "Decode",
    detail: "Interpret the instruction bits as an operation, operands, addressing mode, or control action defined by the instruction set.",
    rgb: "192, 132, 252",
  },
  {
    number: "03",
    label: "Execute",
    detail: "Arithmetic logic, control circuitry, registers, and data paths perform the state changes required by the instruction.",
    rgb: "250, 204, 21",
  },
  {
    number: "04",
    label: "Store / advance",
    detail: "Write results to registers or memory and update control state so execution can continue with the next instruction.",
    rgb: "52, 211, 153",
  },
] as const;

const MEMORY_LEVELS = [
  ["Registers", "smallest · closest", "Values immediately available to the current processor core."],
  ["Cache", "small · fast", "Recently or predictably used data kept near execution to exploit locality."],
  ["Main memory", "larger · slower", "The active working set of programs and data outside the processor caches."],
  ["Persistent storage", "largest · persistent", "Long-lived data retained when power is removed, traded against much higher access cost."],
] as const;

const PRINCIPLES = [
  ["Representation", "Voltages and physical states are interpreted as bits; groups of bits encode numbers, instructions, addresses, characters, and other data."],
  ["Abstraction", "Software can use an instruction-set contract without knowing transistor layout, while hardware can implement the same contract in many microarchitectures."],
  ["Locality", "Programs tend to reuse nearby data and instructions. Memory hierarchies exploit that pattern to hide slower storage behind faster smaller levels."],
  ["Parallelism", "Hardware can overlap or duplicate work through pipelining, multiple execution units, vector operations, multiple cores, and accelerators."],
] as const;

export default function HardwarePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090806] text-zinc-200 selection:bg-amber-300/25">
      <HardwareBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_77%_14%,rgba(245,158,11,0.10),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(56,189,248,0.045),transparent_28%),linear-gradient(to_bottom,rgba(9,8,6,0.08),rgba(9,8,6,0.80)_78%,rgba(6,5,4,0.98))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#090806]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Logic · state · instruction · memory · execution"
            eyebrowStyle="rule"
            icon={CircuitBoard}
            title={<span>Hardware Architecture</span>}
            subtitle="Computer hardware implements computation as physical state change. Digital logic stores and transforms bits, processor organization gives instructions operational meaning, and memory systems move data across layers with different capacity and access costs."
            accentRgb="245, 158, 11"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.067em] text-[#fffaf0]"
            headerClassName="border-amber-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-amber-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/58"><Binary size={13} /> From bit to instruction</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">The machine is a hierarchy of contracts between physical state and symbolic operation.</h2>
            </div>
            <p className="text-[12px] leading-6 text-zinc-400">Logic gates do not “understand” instructions, and software does not need to track individual transistors. Architecture connects those scales through representations and interfaces.</p>
          </div>

          <nav aria-label="Hardware Architecture branches" className="grid lg:grid-cols-3">
            {context.children.map((branch, index) => <HardwareBranch key={branch.id} branch={branch} index={index} />)}
          </nav>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_500px] xl:items-start">
          <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/50"><Rows3 size={13} /> Instruction cycle</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">A stored program repeatedly turns encoded instructions into state changes.</h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {EXECUTION_PATH.map((step) => (
                <article key={step.label} className="min-h-[185px] border-b border-white/[0.06] px-5 py-5 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <div className="flex items-center justify-between"><span className="font-mono text-[8px] text-zinc-700">{step.number}</span><span className="h-2 w-2 rounded-full" style={{ background: `rgb(${step.rgb})`, boxShadow: `0 0 16px rgba(${step.rgb},0.22)` }} /></div>
                  <h3 className="mt-4 text-[13px] font-semibold text-white/86">{step.label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-zinc-600">{step.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-200/48">Execution instrument</div>
            <CpuSimulator />
            <p className="mt-3 text-[9px] leading-4 text-zinc-600">This simulator is a deliberately tiny accumulator machine. Real processors add wider registers, richer instruction sets, caches, pipelines, prediction, parallel execution, privilege levels, and many other structures.</p>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-200/50"><Database size={13} /> Memory hierarchy · reference</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Faster memory is scarce, so systems move data through layers.</h2>
            </div>
            <p className="text-[11px] leading-5 text-zinc-500">Exact technology and performance change across machines and generations. The durable idea is a hierarchy balancing access cost, capacity, persistence, and locality.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {MEMORY_LEVELS.map(([name, tradeoff, detail], index) => (
              <article key={name} className="min-h-[180px] border-b border-white/[0.06] px-5 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                <span className="font-mono text-[8px] text-sky-200/30">0{index + 1}</span>
                <h3 className="mt-3 text-[13px] font-semibold text-white/84">{name}</h3>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em] text-sky-200/45">{tradeoff}</div>
                <p className="mt-3 text-[10px] leading-5 text-zinc-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/46">Architectural principles</div><h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Performance emerges from organization, not transistor count alone.</h2></div>
            <div className="grid sm:grid-cols-2">
              {PRINCIPLES.map(([name, detail], index) => (
                <article key={name} className="min-h-[165px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"><span className="font-mono text-[8px] text-amber-200/30">0{index + 1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-zinc-600">{detail}</p></article>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/44"><Boxes size={13} /> Boundary with Technology</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Computer hardware studies computational organization; Technology studies devices as complete applied systems.</h2>
            <p className="mt-3 text-[11px] leading-5 text-zinc-500">Embedded controllers, sensors, fabrication, power regulation, repairability, manufacturing, and human-facing devices matter enormously, but they belong to the wider technological system around computation rather than defining formal computer architecture itself.</p>
            <Link href="/applied-science/computer-technology" className="group mt-5 flex items-center justify-between rounded-[15px] border border-emerald-200/[0.10] bg-emerald-200/[0.02] px-4 py-3"><span className="text-[10px] font-semibold text-emerald-100/70">Applied Technology</span><ArrowRight size={12} className="text-emerald-200/40 transition group-hover:translate-x-1" /></Link>
          </aside>
        </section>
      </div>
    </main>
  );
}

function HardwareBranch({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["formal.computer-science.hardware.circuits"];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = (
    <div className={`group min-h-[220px] border-b border-white/[0.06] px-5 py-5 lg:border-b-0 lg:border-r lg:last:border-r-0 ${planned ? "opacity-50" : "transition hover:bg-white/[0.025]"}`}>
      <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.22)`, background: `rgba(${meta.rgb},0.035)` }}><Icon size={16} /></span><span className="font-mono text-[8px] text-zinc-700">0{index + 1}</span></div>
      <div className="mt-5 font-mono text-[8px] uppercase tracking-[0.09em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>{meta.role}</div>
      <h3 className="mt-1 text-[15px] font-semibold text-white/86">{branch.label}</h3>
      <p className="mt-3 text-[10px] leading-5 text-zinc-600">{meta.question}</p>
      <div className="mt-4 flex items-center justify-between font-mono text-[8px] uppercase text-zinc-700"><span>{planned ? "planned" : "open"}</span>{planned ? null : <ArrowRight size={12} className="transition group-hover:translate-x-1" />}</div>
    </div>
  );
  return planned ? <div aria-label={`${branch.label}, planned`}>{body}</div> : <Link href={branch.href}>{body}</Link>;
}
