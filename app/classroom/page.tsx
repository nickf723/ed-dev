import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  CircleDashed,
  GraduationCap,
} from "lucide-react";
import { COURSE_SUBJECTS } from "@/lib/courses/catalog";

export default function ClassroomPage() {
  const activeSubject = COURSE_SUBJECTS.find((subject) => subject.status === "active");

  return (
    <main className="min-h-[calc(100vh-3.5rem)] overflow-hidden bg-[radial-gradient(circle_at_85%_4%,rgba(16,185,129,0.13),transparent_28%),linear-gradient(to_bottom,#fbfaf6,#f1ede3)]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid gap-8 border-b border-slate-900/10 pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-700/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800">
              <GraduationCap size={14} />
              Classroom courses
            </div>
            <h1 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.86] tracking-[-0.07em] text-slate-950">
              School-year learning, without the atlas detour.
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-7 text-slate-600 sm:text-[18px]">
              Choose a subject, open the course, and begin the next lesson. Education Station&apos;s deeper knowledge atlas stays available when a learner wants to explore beyond class.
            </p>
          </div>

          {activeSubject ? (
            <Link
              href={activeSubject.href}
              className="group rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  Ready for September
                </span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mt-12 text-[32px] font-semibold tracking-[-0.04em]">
                {activeSubject.title}
              </div>
              <p className="mt-2 text-[14px] leading-6 text-slate-300">
                {activeSubject.launchNote}
              </p>
            </Link>
          ) : null}
        </section>

        <section className="py-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Subjects
              </div>
              <h2 className="mt-2 text-[32px] font-semibold tracking-[-0.04em] text-slate-950">
                One strong course first.
              </h2>
            </div>
            <p className="max-w-xl text-[13px] leading-6 text-slate-500">
              Math is active now. The other subjects stay visible as the next build targets, but do not lead to empty pages.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {COURSE_SUBJECTS.map((subject) => {
              const active = subject.status === "active";
              const body = (
                <div className="flex min-h-[240px] flex-col rounded-[24px] border border-slate-900/10 bg-white/60 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.045)] backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${active ? "bg-emerald-700 text-white" : "bg-slate-900/[0.05] text-slate-400"}`}>
                      {active ? <CheckCircle2 size={18} /> : <CircleDashed size={18} />}
                    </span>
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${active ? "text-emerald-700" : "text-slate-400"}`}>
                      {active ? "Open" : "Planned"}
                    </span>
                  </div>
                  <h3 className="mt-8 text-[25px] font-semibold tracking-[-0.035em] text-slate-950">
                    {subject.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    {subject.description}
                  </p>
                  <div className="mt-auto pt-5 text-[11px] font-medium text-slate-500">
                    {subject.launchNote}
                  </div>
                </div>
              );

              return active ? (
                <Link key={subject.id} href={subject.href} className="group transition-transform hover:-translate-y-0.5">
                  {body}
                </Link>
              ) : (
                <div key={subject.id} aria-disabled="true">
                  {body}
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 border-t border-slate-900/10 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-emerald-300">
              <BookOpenCheck size={20} />
            </div>
            <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.04em]">
              A shorter path to the work.
            </h2>
            <p className="mt-2 max-w-lg text-[14px] leading-6 text-slate-600">
              Students see the course sequence. Teachers can inspect standards, pacing, misconceptions, and checks without exposing the site&apos;s full ontology.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(7,minmax(0,auto))] items-center overflow-x-auto rounded-[24px] border border-slate-900/10 bg-white/60 px-5 py-7 text-center">
            {[
              ["01", "Subject"],
              ["→", ""],
              ["02", "Course"],
              ["→", ""],
              ["03", "Unit"],
              ["→", ""],
              ["04", "Lesson"],
            ].map(([step, label], index) =>
              label ? (
                <div key={`${step}-${label}`} className="min-w-24">
                  <div className="font-mono text-[11px] font-semibold text-emerald-700">{step}</div>
                  <div className="mt-2 text-[13px] font-semibold text-slate-800">{label}</div>
                </div>
              ) : (
                <div key={`${step}-${index}`} className="px-2 text-slate-300" aria-hidden="true">
                  {step}
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
