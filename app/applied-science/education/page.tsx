import {
  BookOpenCheck,
  Brain,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  Users,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";

const AREAS = [
  {
    title: "Learning Sciences",
    detail: "How attention, memory, motivation, development, and practice shape learning.",
    icon: Brain,
    rgb: "96, 165, 250",
  },
  {
    title: "Curriculum & Instruction",
    detail: "How knowledge is sequenced, represented, taught, practiced, and revisited.",
    icon: BookOpenCheck,
    rgb: "167, 139, 250",
  },
  {
    title: "Assessment",
    detail: "How evidence of understanding is gathered, interpreted, and used to guide next steps.",
    icon: ClipboardCheck,
    rgb: "52, 211, 153",
  },
  {
    title: "Learning Systems",
    detail: "How classrooms, schools, communities, technology, and policy shape access to learning.",
    icon: Users,
    rgb: "251, 191, 36",
  },
] as const;

const CYCLE = ["Experience", "Practice", "Feedback", "Transfer"] as const;

export default function EducationPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070911] text-slate-100 selection:bg-blue-400/25">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(96,165,250,0.16),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(167,139,250,0.11),transparent_30%),linear-gradient(135deg,#070911,#08070e_55%,#090a12)]" />
      <div className="pointer-events-none fixed inset-0 opacity-45 [background-image:linear-gradient(rgba(96,165,250,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.035)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[26%] h-48 w-48 rounded-full border border-blue-300/[0.07]" />
        <div className="absolute left-[12%] top-[31%] h-32 w-32 rounded-full border border-violet-300/[0.06]" />
        <div className="absolute bottom-[8%] right-[7%] text-[190px] font-semibold leading-none text-blue-100/[0.018]">A+</div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Education" },
          ]}
          eyebrow="Learning · Instruction · Assessment"
          icon={GraduationCap}
          title={<span>Education</span>}
          subtitle="Design environments and experiences that help people build knowledge, skill, judgment, and independence."
          accentRgb="96, 165, 250"
          titleClassName="text-[clamp(3.2rem,5.8vw,5.7rem)] font-semibold leading-[0.84] tracking-[-0.06em] text-white"
          iconClassName="rounded-[18px]"
        />

        <section className="relative mt-4 grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]">
          <div className="grid min-h-0 gap-3 sm:grid-cols-2">
            {AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <article
                  key={area.title}
                  className="relative overflow-hidden rounded-[22px] border p-5 backdrop-blur-xl"
                  style={{
                    borderColor: `rgba(${area.rgb},0.22)`,
                    background: `linear-gradient(145deg, rgba(${area.rgb},0.10), rgba(7,9,17,0.76) 55%, rgba(7,9,17,0.64))`,
                  }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{
                      color: `rgb(${area.rgb})`,
                      borderColor: `rgba(${area.rgb},0.32)`,
                      background: `rgba(${area.rgb},0.07)`,
                    }}
                  >
                    <Icon size={20} strokeWidth={1.55} />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-white">{area.title}</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{area.detail}</p>
                </article>
              );
            })}
          </div>

          <aside className="relative overflow-hidden rounded-[24px] border border-blue-300/18 bg-black/25 p-5 backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-400/[0.08] blur-3xl" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-400/[0.06] text-blue-300">
                  <Layers3 size={18} />
                </span>
                <h2 className="text-lg font-semibold text-white">Learning cycle</h2>
              </div>

              <div className="relative mt-7 space-y-3">
                <div className="pointer-events-none absolute bottom-5 left-[17px] top-5 w-px bg-gradient-to-b from-blue-400/30 via-violet-400/30 to-emerald-400/25" />
                {CYCLE.map((stage, index) => (
                  <div key={stage} className="relative flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-300/20 bg-[#090b13] font-mono text-[9px] text-blue-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">{stage}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-white/[0.07] pt-5">
                <p className="text-sm leading-6 text-slate-500">
                  Education connects cognitive science, social systems, communication, design, technology, and subject knowledge around one practical question: what helps learning endure?
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
