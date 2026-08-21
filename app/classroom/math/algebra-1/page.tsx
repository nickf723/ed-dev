import Link from "next/link";
import { ArrowRight, BookOpenCheck, ExternalLink, GraduationCap } from "lucide-react";
import ClassroomBreadcrumbs from "@/app/classroom/_components/ClassroomBreadcrumbs";
import StandardBadges from "@/app/classroom/_components/StandardBadges";
import { getCourse } from "@/lib/courses/catalog";

function requireAlgebraOneCourse() {
  const course = getCourse("math", "algebra-1");
  if (!course) throw new Error("The classroom Algebra I course is missing.");
  return course;
}

const course = requireAlgebraOneCourse();

export default function AlgebraOneCoursePage() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-[radial-gradient(circle_at_84%_2%,rgba(16,185,129,0.14),transparent_28%),#f6f3eb]">
      <div className="mx-auto w-full max-w-[1360px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <ClassroomBreadcrumbs
          crumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: "Math", href: "/classroom/math" },
            { label: course.shortTitle },
          ]}
        />

        <header className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-700/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800">
              <GraduationCap size={14} />
              {course.gradeBand}
            </div>
            <h1 className="mt-5 max-w-4xl text-[clamp(3.3rem,7vw,7rem)] font-semibold leading-[0.85] tracking-[-0.075em]">
              {course.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-7 text-slate-600">
              {course.description}
            </p>
          </div>

          <aside className="rounded-[26px] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.15)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
              Standards framework
            </div>
            <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.025em]">
              {course.framework.label}
            </h2>
            <p className="mt-3 text-[12px] leading-5 text-slate-400">
              {course.framework.assessmentNote}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-[11px] font-semibold">
              <a
                href={course.framework.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200"
              >
                Standards PDF <ExternalLink size={12} />
              </a>
              <a
                href={course.framework.courseSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white"
              >
                NYSED Algebra I <ExternalLink size={12} />
              </a>
            </div>
          </aside>
        </header>

        <section className="mt-10 border-t border-slate-900/10 py-9">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Course sequence
              </div>
              <h2 className="mt-2 text-[32px] font-semibold tracking-[-0.04em]">
                Begin with Unit 1.
              </h2>
            </div>
            <p className="max-w-lg text-[13px] leading-6 text-slate-500">
              Additional units will be published as the school year advances. Only finished units become active.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {course.units.map((unit) => {
              const codes = Array.from(
                new Set(unit.lessons.flatMap((lesson) => lesson.alignment.map((item) => item.code))),
              );
              return (
                <Link
                  key={unit.id}
                  href={unit.href}
                  className="group grid gap-6 rounded-[28px] border border-slate-900/10 bg-white/65 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)] transition-transform hover:-translate-y-0.5 lg:grid-cols-[120px_minmax(0,1fr)_auto] lg:items-center"
                >
                  <div>
                    <div className="font-mono text-[11px] font-semibold text-emerald-700">
                      UNIT {String(unit.number).padStart(2, "0")}
                    </div>
                    <div className="mt-2 text-[12px] text-slate-500">
                      {unit.lessons.length} lessons
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[25px] font-semibold tracking-[-0.035em] text-slate-950">
                      {unit.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-600">
                      {unit.summary}
                    </p>
                    <div className="mt-4">
                      <StandardBadges codes={codes} tone="light" />
                    </div>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition-transform group-hover:translate-x-1">
                    <ArrowRight size={17} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 border-t border-slate-900/10 py-9 md:grid-cols-2">
          <div className="rounded-[24px] border border-slate-900/10 bg-white/55 p-5">
            <BookOpenCheck size={20} className="text-emerald-700" />
            <h2 className="mt-4 text-[20px] font-semibold">For students</h2>
            <p className="mt-2 text-[13px] leading-6 text-slate-600">
              Direct lesson order, worked models, guided interaction, fresh checks, and no requirement to navigate the full knowledge graph.
            </p>
          </div>
          <div className="rounded-[24px] border border-slate-900/10 bg-white/55 p-5">
            <GraduationCap size={20} className="text-emerald-700" />
            <h2 className="mt-4 text-[20px] font-semibold">For teachers</h2>
            <p className="mt-2 text-[13px] leading-6 text-slate-600">
              Each unit exposes standards alignment, pacing, prerequisites, warm-ups, misconceptions, evidence plans, and exit tickets—the foundation for a teacher edition.
            </p>
          </div>
        </section>

        <p className="border-t border-slate-900/10 py-6 text-[11px] leading-5 text-slate-500">
          {course.framework.independenceNote}
        </p>
      </div>
    </main>
  );
}
