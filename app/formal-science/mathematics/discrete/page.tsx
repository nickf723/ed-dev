import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  Boxes,
  Braces,
  CircleDot,
  Network,
  Repeat2,
  Shuffle,
  type LucideIcon,
} from "lucide-react";
import DiscreteWorld from "./DiscreteWorld";
import GraphLab from "./GraphLab";

const NODE_ID = "formal.mathematics.discrete";

export const metadata: Metadata = {
  title: "Discrete Mathematics",
  description:
    "Study sets, graphs, combinatorics, and recursion by examining distinct mathematical objects through four connected lenses.",
};

type BranchMeta = {
  icon: LucideIcon;
  lens: string;
  question: string;
  example: string;
  rgb: string;
  position: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.mathematics.discrete.set-theory": {
    icon: Braces,
    lens: "membership",
    question: "Which objects belong together?",
    example: "A = {2, 4, 6}",
    rgb: "103, 232, 249",
    position: "lg:col-start-1 lg:row-start-1",
  },
  "formal.mathematics.discrete.graph-theory": {
    icon: Network,
    lens: "connection",
    question: "Which pairs are related?",
    example: "|V| = 6 · |E| = 7",
    rgb: "52, 211, 153",
    position: "lg:col-start-3 lg:row-start-1",
  },
  "formal.mathematics.discrete.combinatorics": {
    icon: Shuffle,
    lens: "arrangement",
    question: "How many possibilities exist?",
    example: "6! = 720 orders",
    rgb: "251, 191, 36",
    position: "lg:col-start-1 lg:row-start-2",
  },
  "formal.mathematics.discrete.recursion-theory": {
    icon: Repeat2,
    lens: "construction",
    question: "How does a smaller case build the next?",
    example: "aₙ = aₙ₋₁ + 2",
    rgb: "196, 181, 253",
    position: "lg:col-start-3 lg:row-start-2",
  },
};

const SPECIMEN = [1, 2, 3, 4, 5, 6] as const;

const CROSS_LINKS = [
  {
    href: "/formal-science/logic",
    label: "Logic",
    note: "Proof and formal reasoning",
  },
  {
    href: "/formal-science/computer-science",
    label: "Computer Science",
    note: "Algorithms and data structures",
  },
  {
    href: "/formal-science/mathematics/statistics/probability",
    label: "Probability Theory",
    note: "Sample spaces and uncertain outcomes",
  },
] as const;

export default function DiscreteMathematicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error(
      "Discrete Mathematics must be classified as a curriculum hub."
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03060b] text-slate-100 selection:bg-cyan-300/25">
      <DiscreteWorld />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_36%,transparent_0%,rgba(3,6,11,0.06)_44%,rgba(3,6,11,0.62)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-4 pb-28 sm:px-6 xl:px-10">
        <div className="bg-[#03060b]/66 sticky top-0 z-30 -mx-4 border-b border-cyan-100/[0.08] px-4 pb-4 pt-6 shadow-[0_18px_58px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-10 xl:px-10">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Membership · connection · counting · recursion"
            eyebrowStyle="rule"
            icon={Binary}
            title={<span>Discrete Mathematics</span>}
            subtitle="Discrete mathematics studies objects that can be distinguished and examined one at a time. Sets ask what belongs, graphs ask what connects, combinatorics asks how many arrangements exist, and recursion asks how structures grow from smaller cases."
            accentRgb="103, 232, 249"
            titleClassName="font-sans text-[clamp(2.85rem,5.6vw,5.8rem)] font-semibold leading-[0.88] tracking-[-0.062em] text-[#f7feff]"
            headerClassName="border-cyan-100/[0.1]"
          />
        </div>

        <section className="mt-12" aria-labelledby="discrete-lenses-title">
          <div className="mx-auto mb-7 max-w-4xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.17em] text-cyan-100/60">
              Four lenses on distinct structure
            </div>
            <h2
              id="discrete-lenses-title"
              className="mt-3 text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white"
            >
              Keep the objects fixed. Change the question.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
              The same finite collection can be grouped, connected, arranged, or
              defined step by step. Choose the question that matches the
              structure you need to understand.
            </p>
          </div>

          <nav
            aria-label="Discrete Mathematics branches"
            className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(270px,0.72fr)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-5"
          >
            <SpecimenTable />
            {context.children.map((branch, index) => (
              <BranchRoute key={branch.id} branch={branch} index={index} />
            ))}
          </nav>
        </section>

        <section className="mt-28" aria-labelledby="connection-workshop-title">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-4xl">
              <div className="text-emerald-200/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <CircleDot size={14} /> Connection workshop
              </div>
              <h2
                id="connection-workshop-title"
                className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
              >
                Build a graph and watch local links become global structure.
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
                A graph is a set of vertices together with edges that record
                which pairs are connected. Add vertices, link them, and compare
                degree with connectivity.
              </p>
            </div>
            <aside className="border-l border-emerald-200/20 pl-5 text-[13px] leading-6 text-slate-400">
              <strong className="block text-[14px] text-emerald-100">
                A graph is not necessarily a chart.
              </strong>
              Here, position helps us draw the structure, but the vertices and
              edges—not their screen coordinates—define the graph.
            </aside>
          </div>

          <GraphLab />
        </section>

        <section className="bg-[#061019]/42 mt-24 border-y border-white/[0.08] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-8 lg:border-r lg:border-white/[0.08]">
              <div className="text-amber-200/64 text-[11px] font-semibold uppercase tracking-[0.16em]">
                Important boundary
              </div>
              <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-white">
                Discrete does not mean small, digital, or only finite.
              </h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-400">
                The integers form an infinite discrete set: each integer is
                individually distinguishable, and no integer lies between two
                consecutive integers. Discrete mathematics also studies finite
                systems, symbolic structures, and countably infinite objects.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="text-violet-200/64 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <Boxes size={14} /> Conceptual cross-links
              </div>
              <div className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {CROSS_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-5 py-4"
                  >
                    <span>
                      <strong className="block text-[14px] text-slate-100 transition-colors group-hover:text-violet-200">
                        {link.label}
                      </strong>
                      <span className="mt-1 block text-[12px] text-slate-500">
                        {link.note}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Cross-link
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SpecimenTable() {
  return (
    <div className="bg-[#07131b]/64 relative order-first flex min-h-[390px] flex-col overflow-hidden border border-cyan-100/[0.14] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-6 lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
        Shared specimen
      </div>
      <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">
        One collection of six objects
      </h3>
      <p className="mt-2 text-[13px] leading-6 text-slate-500">
        Nothing about the pieces changes. Each branch makes a different
        relationship visible.
      </p>

      <div className="relative my-8 grid flex-1 grid-cols-3 place-items-center gap-5">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 300 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M50 52 L150 34 L250 55 L55 166 L150 188 L246 164 M50 52 L55 166 M150 34 L150 188 M250 55 L246 164"
            fill="none"
            stroke="#67e8f9"
            strokeOpacity="0.22"
            strokeWidth="2"
          />
        </svg>
        {SPECIMEN.map((value) => (
          <span
            key={value}
            className="relative z-10 flex h-14 w-14 rotate-3 items-center justify-center rounded-[13px] border border-cyan-200/30 bg-[#071b24]/90 font-mono text-[17px] font-semibold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.08)] even:-rotate-3"
          >
            {value}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/[0.08] pt-5 text-[12px]">
        <span className="text-cyan-100/72">3 even members</span>
        <span className="text-emerald-100/72">7 chosen edges</span>
        <span className="text-amber-100/72">720 orderings</span>
        <span className="text-violet-100/72">+2 recurrence</span>
      </div>
    </div>
  );
}

function BranchRoute({
  branch,
  index,
}: {
  branch: CurriculumNode;
  index: number;
}) {
  const meta = BRANCH_META[branch.id];

  if (!meta) {
    throw new Error(
      `Missing Discrete Mathematics presentation for ${branch.id}`
    );
  }

  const Icon = meta.icon;

  return (
    <Link
      href={branch.href}
      className={`bg-[#071019]/58 hover:bg-[#0a1620]/76 group relative flex min-h-[210px] flex-col justify-between overflow-hidden border border-white/[0.1] p-5 shadow-[0_28px_74px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-colors sm:p-6 ${meta.position}`}
      style={{
        borderColor: `rgba(${meta.rgb},0.18)`,
        backgroundImage: `linear-gradient(135deg, rgba(${meta.rgb},0.055), transparent 58%)`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px opacity-70"
        style={{
          background: `linear-gradient(to right, transparent, rgba(${meta.rgb},0.62), transparent)`,
        }}
      />
      <div className="flex items-start justify-between gap-4">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.3)`,
            backgroundColor: `rgba(${meta.rgb},0.06)`,
          }}
        >
          <Icon size={19} />
        </span>
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: `rgba(${meta.rgb},0.68)` }}
        >
          0{index + 1} · {meta.lens}
        </span>
      </div>

      <div className="mt-7">
        <div className="font-mono text-[12px] text-slate-500">
          {meta.example}
        </div>
        <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.035em] text-white">
          {branch.label}
        </h3>
        <p className="mt-2 text-[14px] leading-6 text-slate-400">
          {meta.question}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4">
        <span className="text-[12px] leading-5 text-slate-500">
          {branch.description}
        </span>
        <ArrowRight
          size={16}
          className="shrink-0 text-slate-500 transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
