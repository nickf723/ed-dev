import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Blocks,
  Braces,
  Code2,
  Cog,
  Layers3,
  Network,
  Play,
  TestTube2,
  type LucideIcon,
} from "lucide-react";
import SoftwareBackground from "./SoftwareBackground";

const NODE_ID = "formal.computer-science.software";

type BranchMeta = { icon: LucideIcon; role: string; question: string; rgb: string };
const BRANCH_META: Record<string, BranchMeta> = {
  "formal.computer-science.software.fundamentals": { icon: Braces, role: "express computation", question: "What basic abstractions let a program store values, branch, repeat work, and organize reusable behavior?", rgb: "74, 222, 128" },
  "formal.computer-science.software.languages": { icon: Code2, role: "define meaning", question: "How do syntax, semantics, types, interpreters, and compilers turn source text into executable behavior?", rgb: "34, 211, 238" },
  "formal.computer-science.software.design": { icon: Blocks, role: "manage complexity", question: "How should responsibilities, interfaces, dependencies, and state be divided across modules?", rgb: "192, 132, 252" },
  "formal.computer-science.software.runtime": { icon: Cog, role: "coordinate execution", question: "How do runtimes and operating systems manage processes, memory, files, scheduling, and hardware resources?", rgb: "250, 204, 21" },
  "formal.computer-science.software.distributed-web": { icon: Network, role: "span machines", question: "How does software behave when components communicate over networks and can fail independently?", rgb: "96, 165, 250" },
  "formal.computer-science.software.testing-reliability": { icon: TestTube2, role: "build evidence", question: "What evidence shows that software satisfies its specification and remains understandable when it fails?", rgb: "244, 114, 182" },
};

const PROGRAM_PATH = [
  ["01", "Specify", "State what behavior, inputs, outputs, constraints, and failure conditions the software is responsible for."],
  ["02", "Express", "Encode that behavior using data, control flow, functions, modules, types, interfaces, and language constructs."],
  ["03", "Translate", "Interpret or compile source into forms the runtime and machine can execute, possibly through several intermediate representations."],
  ["04", "Execute", "Create processes, allocate memory, perform I/O, call services, update state, and interact with the operating environment."],
  ["05", "Observe", "Use tests, logs, traces, metrics, debugging, and user-visible outcomes to compare actual behavior with intended behavior."],
  ["06", "Evolve", "Change requirements, dependencies, architecture, performance, and implementation while preserving the properties that still matter."],
] as const;

const ABSTRACTIONS = [
  ["Value", "A representation interpreted according to a type or protocol: number, string, object, handle, address, token, message, or another unit of information."],
  ["State", "Information that persists across operations. Where state lives and who may change it strongly shapes program behavior and complexity."],
  ["Control flow", "Rules that determine what executes next: sequence, branching, iteration, function calls, events, exceptions, scheduling, and concurrency."],
  ["Interface", "A boundary that defines what one component promises to another while hiding implementation details that need not be shared."],
] as const;

export default function SoftwarePage() {
  const context = requireCurriculumPageContext(NODE_ID);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030a06] text-slate-100 selection:bg-green-300/25">
      <SoftwareBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(34,197,94,0.10),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(34,211,238,0.04),transparent_28%),linear-gradient(to_bottom,rgba(3,10,6,0.08),rgba(3,10,6,0.80)_78%,rgba(2,7,4,0.98))]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030a06]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader breadcrumbs={context.breadcrumbs} eyebrow="Language · abstraction · runtime · interface · reliability" eyebrowStyle="rule" icon={Code2} title={<span>Software</span>} subtitle="Software organizes computation into programs that can be understood, translated, executed, tested, and changed. The discipline spans programming abstractions, language semantics, modular design, runtime systems, distributed execution, and evidence that behavior matches intent." accentRgb="34, 197, 94" titleClassName="font-sans text-[clamp(3rem,5.7vw,6.3rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f3fff7]" headerClassName="border-green-100/[0.10]" />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-green-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:px-6"><div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-green-200/54"><Play size={13}/> Program lifecycle</div><h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Programs are long-lived translations between intent and machine behavior.</h2></div><p className="text-[12px] leading-6 text-slate-400">Writing source code is one stage. Software also has to be translated, executed in an environment, observed, repaired, and evolved as requirements and dependencies change.</p></div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3">{PROGRAM_PATH.map(([number,label,detail])=><article key={number} className="min-h-[175px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[8px] text-green-200/28">{number}</span><h3 className="mt-3 text-[13px] font-semibold text-white/86">{label}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/46">Primary branches · navigation</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Move from expressing small programs to organizing software systems.</h2></div>
          <nav aria-label="Software branches" className="grid md:grid-cols-2 xl:grid-cols-3">{context.children.map((branch,index)=><SoftwareBranch key={branch.id} branch={branch} index={index}/>)}</nav>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl"><div className="border-b border-white/[0.07] px-5 py-5 sm:px-6"><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/46"><Layers3 size={13}/> Core abstractions</div><h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Software scales by hiding detail behind useful boundaries.</h2></div><div className="grid sm:grid-cols-2">{ABSTRACTIONS.map(([name,detail],index)=><article key={name} className="min-h-[170px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"><span className="font-mono text-[8px] text-violet-200/28">0{index+1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p></article>)}</div></div>
          <aside className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-green-200/42">Software ≠ algorithms</div><h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">An algorithm describes a procedure; software embeds procedures inside a maintained system.</h2><p className="mt-3 text-[11px] leading-5 text-slate-500">Real programs also manage interfaces, errors, persistent state, dependencies, compatibility, concurrency, deployment, observability, security boundaries, and change over time. Those concerns are why Software remains a distinct branch beside Algorithms.</p></aside>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3"><Neighbor href="/formal-science/computer-science/algorithms" label="Algorithms & Data" note="Study procedures, representations, correctness, and resource growth independently of a particular software system." rgb="167, 139, 250"/><Neighbor href="/formal-science/computer-science/hardware" label="Hardware Architecture" note="See the instruction, memory, and execution machinery beneath software abstractions." rgb="245, 158, 11"/><Neighbor href="/formal-science/computer-science/security-cryptography" label="Security & Cryptography" note="Treat software as an adversarial attack surface with explicit assets, trust assumptions, and security goals." rgb="16, 185, 129"/></section>
      </div>
    </main>
  );
}

function SoftwareBranch({branch,index}:{branch:CurriculumNode;index:number}){const meta=BRANCH_META[branch.id]??BRANCH_META["formal.computer-science.software.fundamentals"];const Icon=meta.icon;const planned=branch.status==="placeholder";const body=<div className={`group min-h-[215px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 ${planned?"opacity-50":"transition hover:bg-white/[0.025]"}`}><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{color:`rgb(${meta.rgb})`,borderColor:`rgba(${meta.rgb},0.22)`,background:`rgba(${meta.rgb},0.035)`}}><Icon size={15}/></span><span className="font-mono text-[8px] text-slate-700">0{index+1}</span></div><div className="mt-4 font-mono text-[8px] uppercase tracking-[0.09em]" style={{color:`rgba(${meta.rgb},0.56)`}}>{meta.role}</div><h3 className="mt-1 text-[13px] font-semibold text-white/84">{branch.label}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{meta.question}</p><div className="mt-4 flex items-center justify-between font-mono text-[8px] uppercase text-slate-700"><span>{planned?"planned":"open"}</span>{planned?null:<ArrowRight size={12} className="transition group-hover:translate-x-1"/>}</div></div>;return planned?<div aria-label={`${branch.label}, planned`}>{body}</div>:<Link href={branch.href}>{body}</Link>}
function Neighbor({href,label,note,rgb}:{href:string;label:string;note:string;rgb:string}){return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{background:`rgb(${rgb})`,boxShadow:`0 0 18px rgba(${rgb},0.22)`}}/><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1"/></Link>}
