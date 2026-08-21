import Link from "next/link";
import { ArrowRight, ExternalLink, GraduationCap } from "lucide-react";
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
    <main className="min-h-[calc(100vh-3.5rem)]">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/10 bg-cyan-300/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/80">
              <GraduationCap size={14} />
              {course.gradeBand}
            </div>
            <h1 className="mt-5 max-w-4xl text-[clamp(3rem,6.5vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
              {course.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-7 text-slate-400">
              {course.description}
            </p>
          </div>

          <aside className="rounded-[26px] border border-white/[0.09] bg-[#0b1725]/68 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_24px_70px_rgba(0,0,0,0.17)] backdrop-blur-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/70">
              Standards
            </div>
            <h2 className="mt-3 text-[19px] font-semibold tracking-[-0.025em] text-slate-100">
              {course.framework.label}
            </h2>
            <p className="mt-3 text-[12px] leading-5 text-slate-500">
              {course.framework.assessmentNote}
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-[11px] font-semibold">
              <a
                href={course.framework.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cyan-200/80 transition-colors hover:text-cyan-100"
              >
                Standards PDF <ExternalLink size={12} />
              </a>
              <a
                href={course.framework.courseSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
              >
                NYSED Algebra I <ExternalLink size={12} />
              </a>
            </div>
            <p className="mt-5 border-t border-white/[0.07] pt-4 text-[11px] leading-5 text-slate-600">
              {course.framework.independenceNote}
            </p>
          </aside>
        </header>

        <section className="mt-10 border-t border-white/[0.07] py-9">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/70">
            Units
          </div>

          <div className="mt-5 space-y-3">
            {course.units.map((unit) => {
              const codes = Array.from(
                new Set(
                  unit.lessons.flatMap((lesson) =>
                    lesson.alignment.map((item) => item.code),
                  ),
                ),
              );

              return (
                <Link
                  key={unit.id}
                  href={unit.href}
                  className="group grid gap-6 rounded-[28px] border border-white/[0.09] bg-[#0b1725]/62 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_55px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-colors hover:border-cyan-200/20 hover:bg-[#0d1b2b]/72 lg:grid-cols-[120px_minmax(0,1fr)_auto] lg:items-center"
                >
                  <div>
                    <div className="font-mono text-[11px] font-semibold text-cyan-200/75">
                      UNIT {String(unit.number).padStart(2, "0")}
                    </div>
                    <div className="mt-2 text-[12px] text-slate-500">
                      {unit.lessons.length} lessons
                    </div>
                  </div>
                  <div>
                    <h2 className="text-[25px] font-semibold tracking-[-0.035em] text-slate-100">
                      {unit.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-400">
                      {unit.summary}
                    </p>
                    <div className="mt-4">
                      <StandardBadges codes={codes} />
                    </div>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200/10 bg-cyan-300/[0.06] text-cyan-100 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={17} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
