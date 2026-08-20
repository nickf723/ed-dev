import type { Metadata } from "next";
import CurriculumSiblingNav from "@/app/_components/CurriculumSiblingNav";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Brackets,
  CircleStop,
  Clock3,
  Code2,
  CornerDownLeft,
  GitBranch,
  Layers3,
  ListTree,
  Network,
  PackageOpen,
  Repeat2,
  Route,
  Scale,
  ShieldCheck,
  Split,
  type LucideIcon,
} from "lucide-react";
import HanoiTower from "./HanoiTower";
import RecursionAssessment from "./RecursionAssessment";
import RecursionWorld from "./RecursionWorld";
import {
  CANONICAL_HANOI_MOVES,
  HANOI_DISKS,
  hanoiMoveCount,
} from "./recursionModel";

const NODE_ID = "formal.mathematics.discrete.recursion-theory";

export const metadata: Metadata = {
  title: "Recursion & Recurrence",
  description:
    "Learn how base cases, smaller recursive calls, pending returns, and recurrence relations turn one Tower of Hanoi puzzle into a reusable method.",
};

const LESSON_META: Record<
  string,
  { icon: LucideIcon; question: string; depth: string }
> = {
  "formal.mathematics.discrete.recursion-theory.definitions": {
    icon: Brackets,
    question: "How can a definition refer to a smaller version of itself?",
    depth: "define",
  },
  "formal.mathematics.discrete.recursion-theory.termination": {
    icon: CircleStop,
    question: "Why does the descent eventually stop?",
    depth: "ground",
  },
  "formal.mathematics.discrete.recursion-theory.calls-returns": {
    icon: Layers3,
    question: "What waits while a smaller call is running?",
    depth: "trace",
  },
  "formal.mathematics.discrete.recursion-theory.recurrences": {
    icon: Scale,
    question: "How does the process become an equation?",
    depth: "measure",
  },
  "formal.mathematics.discrete.recursion-theory.divide-conquer": {
    icon: Split,
    question: "When can one problem split into smaller subproblems?",
    depth: "divide",
  },
  "formal.mathematics.discrete.recursion-theory.structures-induction": {
    icon: Network,
    question: "How do recursive structures support recursive proofs?",
    depth: "generalize",
  },
};

const CALL_TRACE = [
  {
    call: "H(3, A, B, C)",
    action: "Wait: first move H(2) from A to B.",
    depth: 0,
    direction: "descend",
  },
  {
    call: "H(2, A, C, B)",
    action: "Wait: first move H(1) from A to C.",
    depth: 1,
    direction: "descend",
  },
  {
    call: "H(1, A, B, C)",
    action: "Base case: move disk 1 directly from A to C.",
    depth: 2,
    direction: "base",
  },
  {
    call: "return to H(2)",
    action: "Move disk 2 from A to B; then solve the waiting H(1).",
    depth: 1,
    direction: "return",
  },
  {
    call: "return to H(3)",
    action: "Move disk 3 from A to C; then solve the waiting H(2).",
    depth: 0,
    direction: "return",
  },
] as const;

export default function RecursionPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "unit") {
    throw new Error(
      "Recursion & Recurrence must be classified as a root unit."
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02060d] text-slate-100 selection:bg-cyan-300/25">
      <RecursionWorld />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_70%_31%,transparent_0%,rgba(2,6,13,0.08)_42%,rgba(2,6,13,0.72)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 pb-28 sm:px-6 xl:px-10">
        <div className="bg-[#02060d]/68 sticky top-0 z-30 -mx-4 border-b border-cyan-100/[0.08] px-4 pb-4 pt-6 shadow-[0_18px_58px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-10 xl:px-10">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Discrete mathematics · root unit"
            eyebrowStyle="rule"
            icon={Repeat2}
            title={<span>Recursion &amp; Recurrence</span>}
            subtitle="Recursion defines or solves a case using smaller cases of the same kind. A sound recursive system reaches a base case, leaves a finite trail of pending work, and combines the returned results into the answer we wanted."
            accentRgb="103, 232, 249"
            titleClassName="font-sans text-[clamp(2.75rem,5.3vw,5.45rem)] font-semibold leading-[0.88] tracking-[-0.062em] text-[#f5fbff]"
            headerClassName="border-cyan-100/[0.1]"
            aside={
              <div className="grid grid-cols-2 border border-violet-100/[0.12] bg-black/20 font-mono">
                <div className="border-r border-white/[0.08] px-4 py-3 text-center">
                  <strong className="block text-[18px] text-cyan-100">3</strong>
                  <span className="text-[9px] uppercase tracking-[0.13em] text-slate-600">
                    disks
                  </span>
                </div>
                <div className="px-4 py-3 text-center">
                  <strong className="block text-[18px] text-violet-100">
                    7
                  </strong>
                  <span className="text-[9px] uppercase tracking-[0.13em] text-slate-600">
                    moves
                  </span>
                </div>
              </div>
            }
          />
        </div>

        <RecursionLearningLadder lessons={context.children} />

        <section
          className="mt-28 grid gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-center"
          aria-labelledby="recursion-orient-title"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
              <Route size={14} /> Orient · one recursive system
            </div>
            <h2
              id="recursion-orient-title"
              className="mt-3 text-[clamp(2.1rem,4.2vw,3.85rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white"
            >
              Move three disks by solving the two-disk problem twice.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-slate-300">
              The largest disk cannot move until the two smaller disks are out
              of its way. That obstacle suggests the recursive shape: solve a
              smaller stack, make one decisive move, then solve the same smaller
              stack again.
            </p>
            <div className="mt-6 border-y border-white/[0.08] py-5 text-[clamp(1.3rem,3vw,2rem)] text-cyan-50">
              <M>{String.raw`H(n)=H(n-1)+1+H(n-1)`}</M>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-slate-500">
              The peg names change between calls, but the subproblem remains:
              move a stack of n − 1 legal disks between two pegs using the third
              as temporary space.
            </p>
          </div>

          <CanonicalHanoiPlate />
        </section>

        <section className="mt-32" aria-labelledby="recursion-trace-title">
          <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
            <div className="max-w-md lg:sticky lg:top-44">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-100/60">
                <ListTree size={14} /> Explain · descend, stop, return
              </div>
              <h2
                id="recursion-trace-title"
                className="mt-3 text-[clamp(2rem,3.7vw,3.45rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
              >
                A recursive call postpones work; it does not erase it.
              </h2>
              <p className="mt-5 text-[15px] leading-7 text-slate-400">
                Each unfinished call waits on a conceptual stack. The input
                shrinks until one disk can move directly. Then the waiting work
                resumes in reverse order.
              </p>

              <div className="mt-7 border-l border-cyan-200/20 pl-5">
                <strong className="text-[14px] text-cyan-100">
                  The reusable test
                </strong>
                <p className="mt-2 text-[13px] leading-6 text-slate-500">
                  Is there a directly known base case? Does every recursive call
                  make measurable progress toward it? If either answer is no,
                  self-reference alone does not produce a solution.
                </p>
              </div>
            </div>

            <RecursiveCallSpine />
          </div>
        </section>

        <section
          className="mt-32 grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch"
          aria-labelledby="recurrence-title"
        >
          <div className="bg-[#090716]/56 border-y border-violet-100/[0.12] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-100/60">
              <Clock3 size={14} /> Formalize · count the work
            </div>
            <h2
              id="recurrence-title"
              className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            >
              The procedure becomes a recurrence.
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
              Let T(n) be the minimum number of moves for n disks. One disk is
              the base case. Every larger stack requires two copies of the
              smaller task plus one move for the largest disk.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <FormulaBand label="Base case">
                <M>{String.raw`T(1)=1`}</M>
              </FormulaBand>
              <FormulaBand label="Recursive case">
                <M>{String.raw`T(n)=2T(n-1)+1`}</M>
              </FormulaBand>
            </div>
            <div className="mt-3 border border-cyan-100/[0.12] bg-cyan-300/[0.03] p-5 text-center text-[clamp(1.25rem,2.8vw,2rem)] text-cyan-50">
              <M>{String.raw`T(n)=2^n-1`}</M>
            </div>
          </div>

          <MoveCountLedger />
        </section>

        <section className="mt-32" aria-labelledby="hanoi-workbench-title">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
                <GitBranch size={14} /> Do · trace the smaller calls
              </div>
              <h2
                id="hanoi-workbench-title"
                className="mt-3 text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
              >
                Watch the promise resolve—or try to honor it yourself.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-400">
                Guided trace shows the exact recursively generated move order.
                Manual mode keeps the same legal constraints and lets you test
                whether your own sequence reaches the minimum.
              </p>
            </div>
            <aside className="border-l border-violet-200/20 pl-5 text-[13px] leading-6 text-slate-400">
              <strong className="block text-[14px] text-violet-100">
                The disks keep their identity.
              </strong>
              Color and size remain stable across the background, opening case,
              guided trace, and manual puzzle. A selected peg brightens without
              replacing the disks with generic marks.
            </aside>
          </div>

          <HanoiTower />
        </section>

        <section className="mt-28" aria-labelledby="recursion-boundaries-title">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-100/60">
              Boundary · similar words, different claims
            </div>
            <h2
              id="recursion-boundaries-title"
              className="mt-3 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            >
              Self-reference is only the beginning.
            </h2>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            <BoundaryNote
              icon={ShieldCheck}
              title="Termination needs progress"
              tone="cyan"
            >
              A base case somewhere in the definition is not enough. Every path
              of recursive calls must move toward a case that can be answered
              directly.
            </BoundaryNote>
            <BoundaryNote
              icon={Repeat2}
              title="Recursion is not just iteration"
              tone="violet"
            >
              Both can express repeated work. Recursion exposes nested
              subproblems and pending returns; iteration usually exposes one
              changing state inside a loop.
            </BoundaryNote>
            <BoundaryNote
              icon={Code2}
              title="A terminology boundary"
              tone="rose"
            >
              “Recursion theory” is an older name for computability theory in
              mathematical logic. This unit teaches recursive definitions,
              procedures, and recurrences instead.
              <a
                href="https://plato.stanford.edu/entries/recursive-functions/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-rose-100/70 transition-colors hover:text-rose-50"
              >
                Terminology source <ArrowRight size={12} />
              </a>
            </BoundaryNote>
          </div>
        </section>

        <section className="mt-32" aria-labelledby="recursion-check-title">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-100/60">
              <ShieldCheck size={14} /> Check · reason, then retrieve
            </div>
            <h2
              id="recursion-check-title"
              className="mt-3 text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
            >
              Can you recognize progress and predict the work?
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-400">
              First inspect a recursive definition on a fresh data structure.
              Then unfold the exact Hanoi recurrence for generated disk counts.
            </p>
          </div>

          <RecursionAssessment />
        </section>

        <section className="bg-[#050a14]/42 mt-28 border-y border-white/[0.08] p-5 backdrop-blur-xl sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-100/55">
                Continue the discrete sequence
              </div>
              <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] text-white">
                Four lenses, one finite world.
              </h2>
              <p className="mt-3 text-[13px] leading-6 text-slate-500">
                Set Theory studies membership, Graph Theory studies connection,
                Combinatorics studies possibility, and this unit studies
                construction from smaller cases.
              </p>
            </div>
            <CurriculumSiblingNav
              previous={context.previousActiveSibling}
              parent={context.parent}
              next={context.nextActiveSibling}
              accentRgb="103, 232, 249"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function RecursionLearningLadder({
  lessons,
}: {
  lessons: readonly CurriculumNode[];
}) {
  const firstHalf = lessons.slice(0, 3);
  const secondHalf = lessons.slice(3);

  return (
    <section className="mt-12" aria-labelledby="recursion-lessons-title">
      <div className="mx-auto max-w-4xl text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.17em] text-cyan-100/60">
          Six planned lessons · one bounded root
        </div>
        <h2
          id="recursion-lessons-title"
          className="mt-3 text-[clamp(2rem,4vw,3.7rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white"
        >
          Descend to a base. Return with a rule.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          The first branch makes recursive calls safe and traceable. The second
          turns that mechanism into equations, algorithms, structures, and
          proofs. These destinations remain planned until their lessons are
          complete.
        </p>
      </div>

      <div className="relative mt-9 grid gap-4 lg:grid-cols-[minmax(0,1fr)_84px_minmax(0,1fr)] lg:gap-0">
        <LessonBranch
          label="Descent · define and trace"
          lessons={firstHalf}
          startIndex={0}
        />

        <div className="relative hidden lg:flex lg:items-center lg:justify-center">
          <div className="via-violet-200/28 absolute inset-y-5 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-200/10 to-cyan-200/10" />
          <div className="bg-[#070b18]/92 relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-violet-200/20 font-mono text-[12px] text-violet-100 shadow-[0_0_40px_rgba(139,92,246,0.12)]">
            H(n)
          </div>
        </div>

        <LessonBranch
          label="Return · measure and generalize"
          lessons={secondHalf}
          startIndex={3}
        />
      </div>
    </section>
  );
}

function LessonBranch({
  label,
  lessons,
  startIndex,
}: {
  label: string;
  lessons: readonly CurriculumNode[];
  startIndex: number;
}) {
  return (
    <div className="bg-[#05101b]/52 border-y border-white/[0.08] p-4 backdrop-blur-xl sm:p-5">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </span>
        <span className="font-mono text-[10px] text-violet-100/50">
          planned
        </span>
      </div>
      <ol className="mt-2 divide-y divide-white/[0.07]">
        {lessons.map((lesson, index) => (
          <LessonStep
            key={lesson.id}
            lesson={lesson}
            index={startIndex + index}
          />
        ))}
      </ol>
    </div>
  );
}

function LessonStep({
  lesson,
  index,
}: {
  lesson: CurriculumNode;
  index: number;
}) {
  const meta = LESSON_META[lesson.id];
  if (!meta) {
    throw new Error(`Missing recursion lesson presentation for ${lesson.id}`);
  }

  const Icon = meta.icon;
  return (
    <li className="grid min-h-28 grid-cols-[auto_minmax(0,1fr)] gap-4 py-4">
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center border border-cyan-100/[0.13] bg-cyan-300/[0.035] text-cyan-100/65">
          <Icon size={16} />
        </span>
        <span className="font-mono text-[9px] text-slate-600">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-slate-100">
            {lesson.label}
          </h3>
          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-100/45">
            {meta.depth}
          </span>
        </div>
        <p className="mt-2 text-[12px] leading-5 text-slate-500">
          {meta.question}
        </p>
      </div>
    </li>
  );
}

function CanonicalHanoiPlate() {
  return (
    <div className="bg-[#04101c]/66 border border-cyan-100/[0.14] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-7">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100/55">
            Canonical case · H(3)
          </div>
          <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">
            One stack, seven legal transfers
          </h3>
        </div>
        <span className="font-mono text-[11px] text-violet-100/65">
          A → C · B is auxiliary
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-center">
        <div className="grid grid-cols-3 gap-3 border-b border-white/[0.1] pb-4">
          {(["A", "B", "C"] as const).map((peg) => (
            <div
              key={peg}
              className="flex min-h-44 flex-col items-center justify-end"
            >
              <div className="relative flex w-full flex-col-reverse items-center gap-1 pb-3">
                {peg === "A"
                  ? [3, 2, 1].map((size) => (
                      <StaticDisk key={size} size={size} />
                    ))
                  : null}
                <span className="absolute bottom-0 top-[-48px] w-1 bg-slate-600/70" />
              </div>
              <span className="relative z-10 mt-3 font-mono text-[11px] text-slate-500">
                {peg}
              </span>
            </div>
          ))}
        </div>

        <ol className="grid grid-cols-4 gap-2">
          {CANONICAL_HANOI_MOVES.map((move) => {
            const disk = HANOI_DISKS[move.disk - 1];
            return (
              <li
                key={move.index}
                className="border border-white/[0.08] bg-black/15 p-2 text-center"
              >
                <span className="block font-mono text-[9px] text-slate-600">
                  {String(move.index).padStart(2, "0")}
                </span>
                <span
                  className={`mx-auto mt-2 block h-2 rounded-full ${STATIC_DISK_TONE[disk.tone]}`}
                  style={{ width: `${30 + move.disk * 15}%` }}
                />
                <strong className="mt-2 block font-mono text-[10px] font-medium text-slate-300">
                  {move.from}→{move.to}
                </strong>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function RecursiveCallSpine() {
  return (
    <div className="relative">
      <div className="absolute bottom-10 left-[31px] top-10 w-px bg-gradient-to-b from-cyan-200/30 via-violet-200/25 to-cyan-200/20" />
      <ol className="space-y-3">
        {CALL_TRACE.map((entry) => (
          <li
            key={entry.call}
            className="relative grid grid-cols-[64px_minmax(0,1fr)] gap-4"
          >
            <div
              className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border bg-[#07101d] ${
                entry.direction === "base"
                  ? "border-rose-200/35 text-rose-100"
                  : entry.direction === "return"
                    ? "border-violet-200/30 text-violet-100"
                    : "border-cyan-200/28 text-cyan-100"
              }`}
            >
              {entry.direction === "descend" ? (
                <ArrowDown size={18} />
              ) : entry.direction === "return" ? (
                <ArrowUp size={18} />
              ) : (
                <CircleStop size={18} />
              )}
            </div>
            <div
              className="bg-[#050b17]/66 border border-white/[0.09] p-5 backdrop-blur-xl sm:p-6"
              style={{ marginInlineStart: `${entry.depth * 3}%` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <code className="font-mono text-[13px] text-white">
                  {entry.call}
                </code>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600">
                  depth {entry.depth}
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-slate-400">
                {entry.action}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid gap-3 border-y border-white/[0.08] bg-black/15 p-5 sm:grid-cols-3">
        <TraceKey icon={ArrowDown} label="Descend" note="reduce the input" />
        <TraceKey icon={CircleStop} label="Base" note="answer directly" />
        <TraceKey
          icon={CornerDownLeft}
          label="Return"
          note="resume waiting work"
        />
      </div>
    </div>
  );
}

function TraceKey({
  icon: Icon,
  label,
  note,
}: {
  icon: LucideIcon;
  label: string;
  note: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={15} className="text-cyan-100/60" />
      <span>
        <strong className="block text-[12px] text-slate-200">{label}</strong>
        <span className="text-[10px] text-slate-600">{note}</span>
      </span>
    </div>
  );
}

function FormulaBand({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/[0.09] bg-black/15 p-5">
      <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600">
        {label}
      </div>
      <div className="mt-3 text-[21px] text-violet-50">{children}</div>
    </div>
  );
}

function MoveCountLedger() {
  return (
    <div className="bg-[#04101a]/66 border border-cyan-100/[0.14] p-5 backdrop-blur-xl sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100/55">
            Exact move ledger
          </div>
          <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-white">
            Each added disk doubles the old work, then adds one.
          </h3>
        </div>
        <PackageOpen size={22} className="shrink-0 text-cyan-100/55" />
      </div>

      <div className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {[1, 2, 3, 4, 5, 6].map((count) => {
          const moves = hanoiMoveCount(count);
          return (
            <div
              key={count}
              className="grid grid-cols-[62px_minmax(0,1fr)_70px] items-center gap-3 py-3"
            >
              <span className="font-mono text-[11px] text-slate-500">
                T({count})
              </span>
              <span className="relative h-1 overflow-hidden rounded-full bg-white/[0.05]">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500/70 to-violet-400/80"
                  style={{ width: `${Math.max(4, (moves / 63) * 100)}%` }}
                />
              </span>
              <strong className="text-right font-mono text-[12px] font-medium text-cyan-100">
                {moves}
              </strong>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-[11px] leading-5 text-slate-600">
        Linear bar scale · exact counts shown at right. This ideal model counts
        legal disk transfers, not animation time or computer runtime.
      </p>
    </div>
  );
}

const BOUNDARY_TONE = {
  cyan: "border-cyan-100/[0.14] bg-cyan-300/[0.03] text-cyan-100",
  violet: "border-violet-100/[0.14] bg-violet-300/[0.03] text-violet-100",
  rose: "border-rose-100/[0.14] bg-rose-300/[0.03] text-rose-100",
} as const;

function BoundaryNote({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: LucideIcon;
  title: string;
  tone: keyof typeof BOUNDARY_TONE;
  children: React.ReactNode;
}) {
  return (
    <article
      className={`min-h-64 border p-6 backdrop-blur-xl ${BOUNDARY_TONE[tone]}`}
    >
      <Icon size={20} className="opacity-70" />
      <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.035em] text-white">
        {title}
      </h3>
      <div className="mt-3 text-[13px] leading-6 text-slate-400">
        {children}
      </div>
    </article>
  );
}

const STATIC_DISK_TONE = {
  cyan: "bg-gradient-to-r from-cyan-800 to-cyan-500",
  violet: "bg-gradient-to-r from-violet-800 to-violet-500",
  rose: "bg-gradient-to-r from-rose-800 to-rose-500",
  amber: "bg-gradient-to-r from-amber-800 to-amber-500",
  emerald: "bg-gradient-to-r from-emerald-800 to-emerald-500",
} as const;

function StaticDisk({ size }: { size: number }) {
  const disk = HANOI_DISKS[size - 1];
  return (
    <span
      className={`relative z-10 flex h-7 items-center justify-center rounded-full border border-white/30 font-mono text-[10px] text-white ${STATIC_DISK_TONE[disk.tone]}`}
      style={{ width: `${38 + size * 18}%` }}
    >
      {disk.label}
    </span>
  );
}
