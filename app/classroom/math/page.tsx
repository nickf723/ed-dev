import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import ClassroomBreadcrumbs from "@/app/classroom/_components/ClassroomBreadcrumbs";
import { getCourseSubject } from "@/lib/courses/catalog";

function requireMathSubject() {
  const subject = getCourseSubject("math");
  if (!subject) throw new Error("The classroom Math subject is missing.");
  return subject;
}

const subject = requireMathSubject();

export default function MathClassroomPage() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <ClassroomBreadcrumbs
          crumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: subject.title },
          ]}
        />

        <header className="mt-8 border-b border-white/[0.07] pb-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.08] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Calculator size={22} />
          </div>
          <h1 className="mt-5 text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
            Math
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-7 text-slate-400">
            {subject.description}
          </p>
        </header>

        <section className="py-9">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/70">
            Courses
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {subject.courses.map((course) => {
              const lessonCount = course.units.reduce(
                (total, unit) => total + unit.lessons.length,
                0,
              );

              return (
                <Link
                  key={course.id}
                  href={course.href}
                  className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[28px] border border-cyan-200/[0.13] bg-[linear-gradient(145deg,rgba(34,211,238,0.10),rgba(52,211,153,0.04)_52%,rgba(8,18,31,0.76))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-colors hover:border-cyan-200/25"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-300/[0.06] blur-3xl"
                  />
                  <div className="relative flex items-center justify-between gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/75">
                      {course.gradeBand}
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-cyan-100 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                  <div className="relative mt-14 text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">
                    {course.shortTitle}
                  </div>
                  <p className="relative mt-4 max-w-xl text-[14px] leading-6 text-slate-400">
                    {course.description}
                  </p>
                  <div className="relative mt-auto flex flex-wrap gap-2 pt-8 text-[11px] font-medium text-slate-500">
                    <span>{course.units.length} unit</span>
                    <span aria-hidden="true">·</span>
                    <span>{lessonCount} lessons</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
