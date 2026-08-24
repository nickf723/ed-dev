import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Equal,
  Hash,
  Variable,
  RefreshCcw,
  Scale,
  type LucideIcon,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import FundamentalsBackground from "./_components/FundamentalsBackground";
import { fundamentalsQuiz } from "./_components/assessment";

type LessonPresentation = {
  icon: LucideIcon;
  rgb: string;
  step: string;
  thesis: string;
  specimen: string;
  outcome: string;
};

type Lesson = {
  id: string;
  label: string;
  href: string;
  description: string;
} & LessonPresentation;

const FUNDAMENTALS_NODE_ID =
  "formal.mathematics.algebra.elementary-algebra.fundamentals";

const FUNDAMENTALS_CONTEXT = requireCurriculumPageContext(FUNDAMENTALS_NODE_ID);

if (FUNDAMENTALS_CONTEXT.pageKind !== "unit") {
  throw new Error("Algebra Fundamentals must be classified as a curriculum unit.");
}

const FUNDAMENTALS_BREADCRUMBS = FUNDAMENTALS_CONTEXT.breadcrumbs.map(
  (crumb, index, breadcrumbs) =>
    index === breadcrumbs.length - 1 ? { ...crumb, label: "Fundamentals" } : crumb,
);

const PRESENTATION: Record<string, LessonPresentation> = {
  "formal.mathematics.algebra.elementary-algebra.fundamentals.variables-changing-quantities": {
    icon: Variable,
    rgb: "244, 114, 182",
    step: "01",
    thesis: "A variable can move through many values while the rule stays fixed.",
    specimen: "C = 4h + 6",
    outcome: "Interpret changing inputs and the outputs produced by a contextual rule.",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.expressions-variables": {
    icon: Braces,
    rgb: "52, 211, 153",
    step: "02",
    thesis: "Read the grammar before trying to manipulate it.",
    specimen: "3x² − 2x + 5",
    outcome: "Identify signed terms, coefficients, variables, exponents, and constants.",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.one-step-equations": {
    icon: Scale,
    rgb: "34, 211, 238",
    step: "03",
    thesis: "Undo one operation while keeping both sides equal.",
    specimen: "x + 6 = 14",
    outcome: "Solve one-step equations with inverse operations and preserve equality.",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.two-step-equations": {
    icon: Equal,
    rgb: "96, 165, 250",
    step: "04",
    thesis: "Peel away operations one layer at a time.",
    specimen: "2x + 6 = 14",
    outcome: "Solve two-step equations by undoing the outer layer, then the inner layer.",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.algebraic-properties": {
    icon: RefreshCcw,
    rgb: "129, 140, 248",
    step: "05",
    thesis: "Properties are permissions for changing form without changing value.",
    specimen: "a(b + c) = ab + ac",
    outcome: "Use commutative, associative, distributive, identity, and inverse rules precisely.",
  },
  "formal.mathematics.algebra.elementary-algebra.fundamentals.number-systems": {
    icon: Hash,
    rgb: "251, 191, 36",
    step: "06",
    thesis: "Every algebra problem lives inside a universe of allowable values.",
    specimen: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ",
    outcome: "Place natural, integer, rational, irrational, and real values inside the real-number hierarchy.",
  },
};

function buildLessons(): Lesson[] {
  return FUNDAMENTALS_CONTEXT.activeChildren.map((child) => {
    const presentation = PRESENTATION[child.id];
    if (!presentation) {
      throw new Error(`Fundamentals lesson ${child.id} is missing presentation metadata.`);
    }
    return {
      id: child.id,
      label: child.label,
      href: child.href,
      description: child.description ?? "",
      ...presentation,
    };
  });
}

const LESSONS = buildLessons();
const LESSON_TOTAL = String(LESSONS.length).padStart(2, "0");

export default function FundamentalsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#031912] text-stone-100 selection:bg-emerald-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-42">
        <FundamentalsBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(52,211,153,0.10),transparent_27%),radial-gradient(circle_at_14%_82%,rgba(34,211,238,0.06),transparent_26%),linear-gradient(to_bottom,rgba(3,25,18,0.24),rgba(2,12,9,0.82))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(52,211,153,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.022)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1460px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={FUNDAMENTALS_BREADCRUMBS}
          eyebrow="Read · Isolate · Solve · Rewrite · Locate"
          icon={Hash}
          title={<span>Algebra Fundamentals</span>}
          subtitle="A six-lesson unit on algebraic meaning: how quantities vary, expressions are built, equations preserve equality, rewrites stay legal, and real numbers are organized."
          accentRgb="52, 211, 153"
          titleClassName="font-mono text-[clamp(2.8rem,5vw,5.2rem)] font-semibold uppercase leading-[0.84] tracking-[-0.06em] text-[#f4fff9]"
          iconClassName="rounded-[16px]"
          headerClassName="border-emerald-300/[0.14]"
          aside={
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[13px] text-emerald-200/85 backdrop-blur-md">
              <span>3x + 5</span>
              <Equal size={12} />
              <span>20</span>
            </div>
          }
        />

        <section className="mt-3 overflow-hidden rounded-[24px] border border-emerald-200/[0.11] bg-black/[0.22] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center">
            <div className="max-w-[560px]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/70">Unit throughline</div>
              <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.035em] text-white">Algebra changes form without losing meaning.</h2>
              <p className="mt-3 text-[14px] leading-6 text-stone-400">
                Begin with a quantity that can change. Then read its structure, isolate a variable in one move, build up to two moves, justify each rewrite, and track which numbers are allowed. These six lessons build that grammar in order.
              </p>
              <div className="mt-4 rounded-[16px] border border-white/[0.05] bg-white/[0.012] px-4 py-3">
                <div className="font-mono text-[14px] text-stone-300">
                  <span className="text-pink-300">C = 4h + 6</span>
                  <span className="mx-2 text-stone-700">→</span>
                  <span className="text-emerald-300">3x + 5</span>
                  <span className="mx-2 text-stone-700">→</span>
                  <span className="text-cyan-300">x + 6 = 14</span>
                  <span className="mx-2 text-stone-700">→</span>
                  <span className="text-blue-300">2x + 6 = 14</span>
                  <span className="mx-2 text-stone-700">→</span>
                  <span className="text-indigo-300">legal rewrites</span>
                  <span className="mx-2 text-stone-700">→</span>
                  <span className="text-amber-300">x ∈ ℝ</span>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-stone-600">Changing quantity → structure → one-step solve → two-step solve → rewrite rules → number systems.</p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {LESSONS.map((lesson) => {
                const Icon = lesson.icon;
                return (
                  <div key={lesson.id} className="relative min-h-[132px] rounded-[18px] border border-white/[0.045] bg-black/[0.16] p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${lesson.rgb})`, borderColor: `rgba(${lesson.rgb},0.20)`, background: `rgba(${lesson.rgb},0.04)` }}>
                        <Icon size={16} strokeWidth={1.5} />
                      </span>
                      <span className="font-mono text-[10px] font-semibold text-stone-700">{lesson.step}</span>
                    </div>
                    <div className="mt-3 text-[12px] font-semibold leading-4 text-stone-300">{lesson.label}</div>
                    <div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${lesson.rgb},0.70)` }}>{lesson.specimen}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-3">
          <div className="mb-3 px-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/70">Lessons</div>
            <p className="mt-1 text-[13px] text-stone-500">Take them in order the first time; return directly to any lesson when reviewing.</p>
          </div>

          <nav aria-label="Algebra Fundamentals lessons" className="grid gap-3 md:grid-cols-2">
            {LESSONS.map((lesson) => {
              const Icon = lesson.icon;
              return (
                <Link
                  key={lesson.id}
                  href={lesson.href}
                  className="group relative min-h-[205px] overflow-hidden rounded-[22px] border p-5 backdrop-blur-xl transition-transform hover:-translate-y-0.5"
                  style={{
                    borderColor: `rgba(${lesson.rgb},0.18)`,
                    background: `linear-gradient(145deg, rgba(${lesson.rgb},0.06), rgba(3,13,10,0.70) 48%, rgba(2,10,8,0.64))`,
                  }}
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: `rgba(${lesson.rgb},0.07)` }} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${lesson.rgb})`, borderColor: `rgba(${lesson.rgb},0.25)`, background: `rgba(${lesson.rgb},0.055)` }}>
                        <Icon size={21} strokeWidth={1.5} />
                      </span>
                      <span className="font-mono text-[11px] font-semibold" style={{ color: `rgba(${lesson.rgb},0.55)` }}>{lesson.step} / {LESSON_TOTAL}</span>
                    </div>

                    <div className="mt-5">
                      <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-white">{lesson.label}</h2>
                      <p className="mt-2 text-[13px] leading-6 text-stone-400">{lesson.thesis}</p>
                    </div>

                    <div className="mt-4 rounded-[14px] border border-white/[0.045] bg-black/[0.16] px-3 py-2.5 font-mono text-[13px]" style={{ color: `rgba(${lesson.rgb},0.80)` }}>
                      {lesson.specimen}
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-4 border-t border-white/[0.045] pt-3">
                      <p className="max-w-[540px] text-[11px] leading-5 text-stone-600">{lesson.outcome}</p>
                      <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: `rgb(${lesson.rgb})` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </section>

        <details className="group mt-3 overflow-hidden rounded-[22px] border border-emerald-200/[0.09] bg-black/[0.20] backdrop-blur-xl">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/65">Unit checkpoint</div>
              <p className="mt-1 text-[12px] text-stone-500">A short check spanning variables, equation solving, and real-number systems.</p>
            </div>
            <span className="rounded-lg border border-emerald-300/[0.11] bg-emerald-400/[0.03] px-3 py-2 text-[11px] font-semibold text-emerald-200/70 group-open:hidden">Open check</span>
          </summary>
          <div className="border-t border-emerald-200/[0.07] p-4">
            <Assessment
              title="Algebra Fundamentals Unit Check"
              questions={fundamentalsQuiz}
              accentColor="emerald"
            />
          </div>
        </details>

        <div className="h-8" />
      </div>
    </main>
  );
}
