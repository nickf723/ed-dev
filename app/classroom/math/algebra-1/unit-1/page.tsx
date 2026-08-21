import Link from "next/link";
import {
  ArrowRight,
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

const detailClassName =
  "rounded-[22px] border border-white/[0.09] bg-[#0b1725]/62 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-xl";
const summaryClassName =
  "cursor-pointer text-[16px] font-semibold text-slate-100 marker:text-slate-600";

export default function AlgebraOneUnitOnePage() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1380px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <ClassroomBreadcrumbs
          crumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: "Math", href: "/classroom/math" },
            { label: course.shortTitle, href: course.href },
            { label: `Unit ${unit.number}` },
          ]}
        />

        <header className="mt-8 grid gap-7 border-b border-white/[0.07] pb-9 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/75">
              Algebra I · Unit {String(unit.number).padStart(2, "0")}
            </div>
            <h1 className="mt-4 max-w-4xl text-[clamp(3rem,6.5vw,6rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
              {unit.title}
            </h1>
            <p className="mt-6 max-w-3xl text-[16px] leading-7 text-slate-400">
              {unit.summary}
            </p>
          </div>

          <aside className="rounded-[26px] border border-emerald-200/[0.10] bg-[linear-gradient(145deg,rgba(52,211,153,0.075),rgba(8,18,31,0.72))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_24px_70px_rgba(0,0,0,0.17)] backdrop-blur-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-200/10 bg-emerald-300/[0.07] text-emerald-200">
              <Lightbulb size={19} />
            </div>
            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200/70">
              Essential question
            </div>
            <p className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.035em] text-slate-100">
              {unit.essentialQuestion}
            </p>
            <div className="mt-5 flex items-center gap-2 text-[12px] text-slate-500">
              <Clock3 size={14} />
              {unit.pacing}
            </div>
          </aside>
        </header>

        <section className="py-9">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/70">
            Lessons
          </div>

          <nav aria-label="Unit 1 lessons" className="mt-5 space-y-2">
            {unit.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={lesson.href}
                className="group grid gap-4 rounded-[22px] border border-white/[0.085] bg-[#0b1725]/58 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_12px_38px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors hover:border-cyan-200/18 hover:bg-[#0d1b2b]/70 sm:grid-cols-[58px_minmax(0,1fr)_auto] sm:items-center sm:p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/10 bg-cyan-300/[0.06] font-mono text-[12px] font-semibold text-cyan-200/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-[19px] font-semibold tracking-[-0.025em] text-slate-100">
                    {lesson.title}
                  </span>
                  <span className="mt-1 block text-[12px] leading-5 text-slate-400">
                    {lesson.summary}
                  </span>
                  <span className="mt-3 block">
                    <StandardBadges
                      codes={lesson.alignment.map((item) => item.code)}
                    />
                  </span>
                </span>
                <span className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                  {lesson.durationMinutes} min
                  <ArrowRight
                    size={16}
                    className="text-cyan-200/70 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </nav>
        </section>

        <section id="teacher-guide" className="scroll-mt-20 border-t border-white/[0.07] py-9">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-200/10 bg-violet-300/[0.07] text-violet-200">
                <GraduationCap size={20} />
              </div>
              <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-200/70">
                Teacher guide
              </div>
              <h2 className="mt-2 text-[31px] font-semibold tracking-[-0.04em] text-white">
                Teaching this unit
              </h2>
              <p className="mt-3 max-w-lg text-[13px] leading-6 text-slate-500">
                Pacing, prerequisites, daily checks, teaching moves, and standards.
              </p>
            </div>

            <div className="space-y-3">
              <details open className={detailClassName}>
                <summary className={summaryClassName}>
                  Pacing and prerequisites
                </summary>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/70">
                      Pacing
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-slate-400">
                      {unit.pacing}
                    </p>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/70">
                      Prerequisites
                    </div>
                    <ul className="mt-2 space-y-1.5 text-[13px] leading-5 text-slate-400">
                      {unit.prerequisites.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>

              <details className={detailClassName}>
                <summary className={summaryClassName}>
                  Routine, evidence, and teaching moves
                </summary>
                <div className="mt-4 space-y-5 text-[13px] leading-6 text-slate-400">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200/70">
                      Opening routine
                    </div>
                    <p className="mt-2">{unit.teacherGuide.openingRoutine}</p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/70">
                        Evidence
                      </div>
                      <ul className="mt-2 space-y-2">
                        {unit.teacherGuide.evidencePlan.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-200/70">
                        Teaching moves
                      </div>
                      <ul className="mt-2 space-y-2">
                        {unit.teacherGuide.differentiation.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </details>

              <details className={detailClassName}>
                <summary className={summaryClassName}>
                  Warm-ups, misconceptions, and exit tickets
                </summary>
                <div className="mt-4 space-y-4">
                  {unit.lessons.map((lesson, index) => (
                    <article
                      key={lesson.id}
                      className="border-t border-white/[0.07] pt-4 first:border-t-0 first:pt-0"
                    >
                      <div className="text-[13px] font-semibold text-slate-100">
                        {index + 1}. {lesson.title}
                      </div>
                      <dl className="mt-3 grid gap-3 text-[12px] leading-5 text-slate-400 md:grid-cols-3">
                        <div>
                          <dt className="font-semibold text-emerald-200/80">Warm-up</dt>
                          <dd className="mt-1">{lesson.teacher.warmUp}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-amber-200/80">Watch for</dt>
                          <dd className="mt-1">{lesson.teacher.misconception}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-blue-200/80">Exit ticket</dt>
                          <dd className="mt-1">{lesson.teacher.exitTicket}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </details>

              <details className={detailClassName}>
                <summary className={summaryClassName}>
                  Standards and official sources
                </summary>
                <div className="mt-4 space-y-4">
                  {course.framework.standards
                    .filter((standard) =>
                      unit.lessons.some((lesson) =>
                        lesson.alignment.some(
                          (item) => item.code === standard.code,
                        ),
                      ),
                    )
                    .map((standard) => (
                      <div
                        key={standard.code}
                        className="grid gap-2 border-t border-white/[0.07] pt-4 first:border-t-0 first:pt-0 md:grid-cols-[130px_1fr]"
                      >
                        <div className="font-mono text-[11px] font-semibold text-cyan-200/75">
                          {standard.code}
                        </div>
                        <div>
                          <div className="text-[12px] font-semibold text-slate-200">
                            {standard.label}
                          </div>
                          <p className="mt-1 text-[12px] leading-5 text-slate-400">
                            {standard.summary}
                          </p>
                          <div className="mt-1 text-[11px] text-slate-600">
                            Official document page {standard.sourcePage}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-4 border-t border-white/[0.07] pt-4 text-[11px] font-semibold">
                  <a
                    href={course.framework.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-200/80 transition-colors hover:text-cyan-100"
                  >
                    NYS standards PDF <ExternalLink size={12} />
                  </a>
                  <a
                    href={course.framework.courseSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
                  >
                    NYSED Algebra I resources <ExternalLink size={12} />
                  </a>
                </div>
                <p className="mt-4 text-[11px] leading-5 text-slate-600">
                  {course.framework.independenceNote} Unit numbering and pacing are Education Station&apos;s instructional choices.
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
