import Link from "next/link";
import { BookOpenCheck, CalendarDays, FileText, LockKeyhole } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { getCourse, getCourseUnit } from "@/lib/courses/catalog";

function requireExamPrep() {
  const course = getCourse("math", "algebra-1");
  const unit = getCourseUnit("math", "algebra-1", "exam-prep");
  if (!course || !unit) throw new Error("The Algebra I exam-prep unit is missing.");
  return { course, unit };
}

const { course, unit } = requireExamPrep();

export default function AlgebraOneExamPrepPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090713] text-stone-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(168,85,247,0.18),transparent_31%),radial-gradient(circle_at_16%_78%,rgba(244,63,94,0.12),transparent_32%),linear-gradient(to_bottom,#10091a,#08070d)]" />
      <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:linear-gradient(rgba(216,180,254,0.03)_1px,transparent_1px)] [background-size:100%_44px]" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 py-5 sm:px-6">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: "Math", href: "/classroom/math" },
            { label: course.shortTitle, href: course.href },
            { label: "Exam Prep" },
          ]}
          eyebrow={`${course.shortTitle} · Unit ${unit.number}`}
          icon={BookOpenCheck}
          title={<span>{unit.title}</span>}
          subtitle={unit.summary}
          accentRgb="192, 132, 252"
          titleClassName="font-mono text-[clamp(2.35rem,5vw,5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-violet-50"
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-violet-200/[0.14]"
        />

        <section className="mt-6" aria-labelledby="released-exams-title">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-violet-300/45" />
            <h2 id="released-exams-title" className="text-[12px] font-semibold uppercase tracking-[0.14em] text-violet-200">Choose a released exam</h2>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Link href="/classroom/math/algebra-1/exam-prep/june-2025" className="group rounded-[22px] border border-violet-200/[0.18] bg-violet-300/[0.07] p-5 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-violet-200/30">
              <div className="flex items-start justify-between gap-4">
                <FileText className="text-violet-200" />
                <span className="rounded-full border border-emerald-200/20 bg-emerald-300/[0.07] px-2.5 py-1 text-[11px] font-semibold text-emerald-100">Pilot live</span>
              </div>
              <h3 className="mt-8 text-[25px] font-semibold tracking-[-0.035em] text-white">June 2025</h3>
              <p className="mt-2 text-[14px] leading-6 text-stone-300">Start with four guided Part I items spanning structure, rates, equation reasoning, and modeling.</p>
              <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-violet-200"><CalendarDays size={14} />June 18, 2025</div>
            </Link>
            {[
              ["January 2025", "Next review set"],
              ["August 2025", "Next review set"],
            ].map(([title, note]) => <div key={title} className="rounded-[22px] border border-white/[0.07] bg-black/20 p-5 opacity-65 backdrop-blur-2xl">
              <LockKeyhole size={22} className="text-stone-500" />
              <h3 className="mt-8 text-[22px] font-semibold text-stone-300">{title}</h3>
              <p className="mt-2 text-[14px] text-stone-500">{note}</p>
            </div>)}
          </div>
        </section>

        <section className="mt-6 rounded-[22px] border border-white/[0.08] bg-black/22 p-5 backdrop-blur-2xl">
          <h2 className="text-[20px] font-semibold text-white">Attempt → diagnose → understand → route back</h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-stone-300">The exam remains NYSED’s document. Our layer helps learners identify what an item tests, request one hint at a time, study the decisive reasoning, and return to the lesson that builds the missing skill.</p>
        </section>
      </div>
    </main>
  );
}
