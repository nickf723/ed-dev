import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  ExternalLink,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import ClassroomBreadcrumbs from "@/app/classroom/_components/ClassroomBreadcrumbs";
import StandardBadges from "@/app/classroom/_components/StandardBadges";
import { getCourse, getCourseUnit } from "@/lib/courses/catalog";

function requireUnitContext() {
  const course = getCourse("math", "algebra-1");
  const unit = getCourseUnit("math", "algebra-1", "unit-1");
  if (!course || !unit) {
    throw new Error("The classroom Algebra I Unit 1 catalog is missing.");
  }
  return { course, unit };
}

const { course, unit } = requireUnitContext();

export default function AlgebraOneUnitOnePage() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-[radial-gradient(circle_at_84%_1%,rgba(16,185,129,0.14),transparent_26%),#f6f3eb]">
      <div className="mx-auto w-full max-w-[1380px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <ClassroomBreadcrumbs
          crumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: "Math", href: "/classroom/math" },
            { label: course.shortTitle, href: course.href },
            { label: `Unit ${unit.number}` },
          ]}
        />

        <header className="mt-8 grid gap-7 border-b border-slate-900/10 pb-9 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Algebra I · Unit {String(unit.number).padStart(2, "0")}
            </div>
            <h1 className="mt-4 max-w-4xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.07em]">
              {unit.title}
            </h1>
            <p className="mt-6 max-w-3xl text-[17px] leading-7 text-slate-600">
              {unit.summary}
            </p>
          </div>

          <aside className="rounded-[26px] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <Lightbulb size={19} />
            </div>
            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
              Essential question
            </div>
            <p className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.035em]">
              {unit.essentialQuestion}
            </p>
            <div className="mt-5 flex items-center gap-2 text-[12px] text-slate-400">
              <Clock3 size={14} />
              {unit.pacing}
            </div>
          </aside>
        </header>

        <section className="py-9">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Lessons
              </div>
              <h2 className="mt-2 text-[32px] font-semibold tracking-[-0.04em]">
                Start at the top. Return anywhere.
              </h2>
            </div>
            <p className="max-w-lg text-[13px] leading-6 text-slate-500">
              Each lesson includes an explanation, a guided model, a misconception boundary, and a transfer check.
            </p>
          </div>

          <nav aria-label="Unit 1 lessons" className="mt-6 space-y-2">
            {unit.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={lesson.href}
                className="group grid gap-4 rounded-[22px] border border-slate-900/10 bg-white/65 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition-transform hover:-translate-y-0.5 sm:grid-cols-[58px_minmax(0,1fr)_auto] sm:items-center sm:p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 font-mono text-[12px] font-semibold text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-[19px] font-semibold tracking-[-0.025em] text-slate-950">
                    {lesson.title}
                  </span>
                  <span className="mt-1 block text-[12px] leading-5 text-slate-600">
                    {lesson.summary}
                  </span>
                  <span className="mt-3 block">
                    <StandardBadges codes={lesson.alignment.map((item) => item.code)} tone="light" />
                  </span>
                </span>
                <span className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                  {lesson.durationMinutes} min
                  <ArrowRight size={16} className="text-slate-900 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </nav>
        </section>

        <section id="teacher-guide" className="scroll-mt-20 border-t border-slate-900/10 py-9">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                <GraduationCap size={20} />
              </div>
              <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Teacher guide
              </div>
              <h2 className="mt-2 text-[31px] font-semibold tracking-[-0.04em]">
                The teacher-ready layer begins here.
              </h2>
              <p className="mt-3 max-w-lg text-[13px] leading-6 text-slate-600">
                This first version keeps the student path free of planning chrome while giving teachers the information needed to place the unit in a real course.
              </p>
            </div>

            <div className="space-y-3">
              <details open className="rounded-[22px] border border-slate-900/10 bg-white/65 p-5">
                <summary className="cursor-pointer text-[16px] font-semibold text-slate-950">
                  Pacing and prerequisites
                </summary>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800">Pacing</div>
                    <p className="mt-2 text-[13px] leading-6 text-slate-600">{unit.pacing}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800">Students should bring</div>
                    <ul className="mt-2 space-y-1.5 text-[13px] leading-5 text-slate-600">
                      {unit.prerequisites.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                </div>
              </details>

              <details className="rounded-[22px] border border-slate-900/10 bg-white/65 p-5">
                <summary className="cursor-pointer text-[16px] font-semibold text-slate-950">
                  Unit routine and evidence plan
                </summary>
                <p className="mt-4 text-[13px] leading-6 text-slate-600">
                  {unit.teacherGuide.openingRoutine}
                </p>
                <ul className="mt-3 space-y-2 text-[13px] leading-5 text-slate-600">
                  {unit.teacherGuide.evidencePlan.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </details>

              <details className="rounded-[22px] border border-slate-900/10 bg-white/65 p-5">
                <summary className="cursor-pointer text-[16px] font-semibold text-slate-950">
                  Lesson warm-ups, misconceptions, and exit tickets
                </summary>
                <div className="mt-4 space-y-4">
                  {unit.lessons.map((lesson, index) => (
                    <article key={lesson.id} className="border-t border-slate-900/10 pt-4 first:border-t-0 first:pt-0">
                      <div className="text-[13px] font-semibold text-slate-950">
                        {index + 1}. {lesson.title}
                      </div>
                      <dl className="mt-3 grid gap-3 text-[12px] leading-5 text-slate-600 md:grid-cols-3">
                        <div><dt className="font-semibold text-emerald-800">Warm-up</dt><dd className="mt-1">{lesson.teacher.warmUp}</dd></div>
                        <div><dt className="font-semibold text-amber-800">Watch for</dt><dd className="mt-1">{lesson.teacher.misconception}</dd></div>
                        <div><dt className="font-semibold text-blue-800">Exit ticket</dt><dd className="mt-1">{lesson.teacher.exitTicket}</dd></div>
                      </dl>
                    </article>
                  ))}
                </div>
              </details>

              <details className="rounded-[22px] border border-slate-900/10 bg-white/65 p-5">
                <summary className="cursor-pointer text-[16px] font-semibold text-slate-950">
                  Standards map and official sources
                </summary>
                <div className="mt-4 space-y-4">
                  {course.framework.standards
                    .filter((standard) => unit.lessons.some((lesson) => lesson.alignment.some((item) => item.code === standard.code)))
                    .map((standard) => (
                      <div key={standard.code} className="grid gap-2 border-t border-slate-900/10 pt-4 first:border-t-0 first:pt-0 md:grid-cols-[130px_1fr]">
                        <div className="font-mono text-[11px] font-semibold text-emerald-800">{standard.code}</div>
                        <div>
                          <div className="text-[12px] font-semibold text-slate-900">{standard.label}</div>
                          <p className="mt-1 text-[12px] leading-5 text-slate-600">{standard.summary}</p>
                          <div className="mt-1 text-[11px] text-slate-400">Official document page {standard.sourcePage}</div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-900/10 pt-4 text-[11px] font-semibold">
                  <a href={course.framework.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950">
                    NYS standards PDF <ExternalLink size={12} />
                  </a>
                  <a href={course.framework.courseSourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950">
                    NYSED Algebra I resources <ExternalLink size={12} />
                  </a>
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="grid gap-5 border-t border-slate-900/10 py-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-emerald-300">
            <BookOpenCheck size={19} />
          </div>
          <div>
            <div className="text-[12px] font-semibold text-slate-900">Alignment, not endorsement</div>
            <p className="mt-1 max-w-4xl text-[11px] leading-5 text-slate-500">
              {course.framework.independenceNote} Unit numbering and pacing are Education Station&apos;s instructional choices and may differ from a district&apos;s local curriculum.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
