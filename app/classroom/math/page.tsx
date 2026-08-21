import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
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
    <main className="min-h-[calc(100vh-3.5rem)] bg-[radial-gradient(circle_at_90%_0%,rgba(16,185,129,0.12),transparent_26%),#f6f3eb]">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <ClassroomBreadcrumbs
          crumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: subject.title },
          ]}
        />

        <header className="mt-8 grid gap-6 border-b border-slate-900/10 pb-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white">
              <Calculator size={22} />
            </div>
            <h1 className="mt-5 text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Math
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-7 text-slate-600">
              {subject.description}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-emerald-700/[0.06] px-4 py-3 text-[12px] font-semibold text-emerald-800">
            {subject.launchNote}
          </div>
        </header>

        <section className="py-9">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
            Courses
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {subject.courses.map((course) => (
              <Link
                key={course.id}
                href={course.href}
                className="group flex min-h-[300px] flex-col rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.13)] transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
                    <CheckCircle2 size={14} />
                    Active course
                  </span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-14 text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                  {course.shortTitle}
                </div>
                <p className="mt-4 max-w-xl text-[14px] leading-6 text-slate-300">
                  {course.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-8 text-[11px] text-slate-400">
                  <span>{course.gradeBand}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.units.length} unit available</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
