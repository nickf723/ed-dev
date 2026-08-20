import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  Binary,
  CircuitBoard,
  GitCommitHorizontal,
  MemoryStick,
  Sigma,
  Split,
  ToggleRight,
} from "lucide-react";
import FullAdder from "./FullAdder";
import LogicBackground from "./LogicBackground";

const NODE_ID = "formal.computer-science.hardware.circuits";

const LOGIC_STACK = [
  {
    icon: Sigma,
    label: "Boolean function",
    detail: "Specify a relationship between binary inputs and outputs using algebra, a truth table, or another exact logical description.",
    rgb: "125, 211, 252",
  },
  {
    icon: Split,
    label: "Gate network",
    detail: "Implement Boolean operations with composable gates such as NOT, AND, OR, XOR, NAND, and NOR.",
    rgb: "74, 222, 128",
  },
  {
    icon: GitCommitHorizontal,
    label: "Combinational circuit",
    detail: "Combine gates so outputs depend only on the inputs present now: adders, multiplexers, encoders, decoders, comparators, and more.",
    rgb: "250, 204, 21",
  },
  {
    icon: ToggleRight,
    label: "Sequential circuit",
    detail: "Add stored state and feedback so future behavior depends on both current input and remembered history.",
    rgb: "192, 132, 252",
  },
] as const;

const GATES = [
  ["NOT", "¬A", "invert one bit", ["0 → 1", "1 → 0"]],
  ["AND", "A ∧ B", "1 only when both inputs are 1", ["00 → 0", "01 → 0", "10 → 0", "11 → 1"]],
  ["OR", "A ∨ B", "1 when at least one input is 1", ["00 → 0", "01 → 1", "10 → 1", "11 → 1"]],
  ["XOR", "A ⊕ B", "1 when the inputs differ", ["00 → 0", "01 → 1", "10 → 1", "11 → 0"]],
] as const;

const STATE_IDEAS = [
  ["Latch / flip-flop", "Stores one bit of state using a circuit whose output can persist after the initiating input changes."],
  ["Register", "Groups multiple state elements so a word of binary data can be held and updated together."],
  ["Counter", "Uses stored state plus combinational next-state logic to move through a defined sequence of binary states."],
  ["Finite-state controller", "Combines a state register with next-state and output logic to coordinate multi-step hardware behavior."],
] as const;

export default function DigitalLogicPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07100a] text-zinc-200 selection:bg-emerald-300/25">
      <LogicBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_15%,rgba(34,197,94,0.10),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(56,189,248,0.045),transparent_28%),linear-gradient(to_bottom,rgba(7,16,10,0.08),rgba(7,16,10,0.80)_78%,rgba(4,10,6,0.98))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#07100a]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Boolean functions · gates · combinational logic · state"
            eyebrowStyle="rule"
            icon={CircuitBoard}
            title={<span>Digital Logic & Circuits</span>}
            subtitle="Digital logic turns binary relationships into physical circuits. Boolean functions define desired behavior, gates implement those functions, combinational networks compose them into useful operations, and sequential circuits add memory so hardware can evolve through time."
            accentRgb="34, 197, 94"
            titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f5fff8]"
            headerClassName="border-emerald-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-emerald-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/56"><Binary size={13} /> Logic composition</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Hardware complexity grows by composing small exact behaviors.</h2>
            </div>
            <p className="text-[12px] leading-6 text-zinc-400">A gate is simple enough to describe with a tiny truth table. Useful hardware emerges by wiring many such functions together and, when memory is needed, feeding state forward through time.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {LOGIC_STACK.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[210px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                  <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)`, background: `rgba(${item.rgb},0.035)` }}><Icon size={15} /></span><span className="font-mono text-[8px] text-zinc-700">0{index + 1}</span></div>
                  <h3 className="mt-5 text-[13px] font-semibold text-white/86">{item.label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-zinc-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_500px] xl:items-start">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/48">Gate truth tables · reference</div>
              <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">A truth table defines the function independently of the circuit used to implement it.</h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {GATES.map(([name, formula, meaning, rows], index) => (
                <article key={name} className="min-h-[220px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <div className="flex items-center justify-between"><span className="font-mono text-[8px] text-emerald-200/30">0{index + 1}</span><span className="font-mono text-[11px] text-cyan-100/62">{formula}</span></div>
                  <h3 className="mt-3 text-[14px] font-semibold text-white/84">{name}</h3>
                  <p className="mt-1 text-[9px] leading-4 text-zinc-600">{meaning}</p>
                  <div className="mt-4 grid grid-cols-2 gap-1 font-mono text-[8px] text-zinc-500">{rows.map((row) => <span key={row} className="rounded-[8px] border border-white/[0.05] bg-black/[0.10] px-2 py-1.5">{row}</span>)}</div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-200/50">Combinational instrument · one-bit addition</div>
            <FullAdder />
            <p className="mt-3 text-[9px] leading-4 text-zinc-600">A full adder combines XOR, AND, and OR relationships to add two bits plus an incoming carry. Chaining full adders creates wider binary addition.</p>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/48"><MemoryStick size={13} /> Sequential logic · state across time</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Memory changes the equation from output = f(input) to next state = f(input, current state).</h2>
            </div>
            <p className="text-[11px] leading-5 text-zinc-500">Combinational logic answers a question about the present inputs. Sequential logic lets the circuit's past affect what happens next.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {STATE_IDEAS.map(([name, detail], index) => (
              <article key={name} className="min-h-[170px] border-b border-white/[0.06] px-5 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0"><span className="font-mono text-[8px] text-violet-200/30">0{index + 1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-zinc-600">{detail}</p></article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/computer-science/hardware" label="Hardware Architecture" note="See how logic, registers, memory, and control become an executing processor." rgb="245, 158, 11" />
          <Neighbor href="/formal-science/logic" label="Formal Logic" note="Study symbolic validity and inference independently of the physical circuits that implement Boolean operations." rgb="248, 113, 113" />
          <Neighbor href="/formal-science/computer-science/theory/automata" label="Automata" note="Compare physical state machines with abstract finite-state computation and language recognition." rgb="34, 211, 238" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-zinc-600">{note}</span></span><ArrowRight size={12} className="text-zinc-600 transition group-hover:translate-x-1" /></Link>;
}
