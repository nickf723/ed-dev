import Link from "next/link";
import { ArrowRight, CircleDashed, type LucideIcon } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";

type LessonPresentation = {
  step: string;
  question: string;
  specimen: string;
  rgb: string;
};

type ElementaryAlgebraUnitPageProps = {
  nodeId: string;
  icon: LucideIcon;
  eyebrow: string;
  subtitle: string;
  accentRgb: string;
  throughline: string;
  sequence: string;
  presentations: Readonly<Record<string, LessonPresentation>>;
};

export default function ElementaryAlgebraUnitPage({
  nodeId,
  icon: Icon,
  eyebrow,
  subtitle,
  accentRgb,
  throughline,
  sequence,
  presentations,
}: ElementaryAlgebraUnitPageProps) {
  const context = requireCurriculumPageContext(nodeId);
  if (context.pageKind !== "unit") {
    throw new Error(`${context.node.label} must be classified as a curriculum unit.`);
  }

  const lessons = context.children.map((child, index) => ({
    child,
    presentation: presentations[child.id] ?? {
      step: String(index + 1).padStart(2, "0"),
      question: child.description ?? "",
      specimen: child.label,
      rgb: accentRgb,
    },
  }));

  const activeCount = context.activeChildren.length;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050a13] text-slate-100 selection:bg-cyan-400/25">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 78% 14%, rgba(${accentRgb},0.12), transparent 28%), radial-gradient(circle at 14% 82%, rgba(${accentRgb},0.055), transparent 30%), linear-gradient(to bottom, rgba(5,10,19,0.20), rgba(2,5,10,0.92))`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(rgba(${accentRgb},0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(${accentRgb},0.035) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow={eyebrow}
          icon={Icon}
          title={<span>{context.node.label}</span>}
          subtitle={subtitle}
          accentRgb={accentRgb}
          titleClassName="font-mono text-[clamp(2.65rem,4.8vw,5.1rem)] font-semibold uppercase leading-[0.85] tracking-[-0.058em] text-[#f7fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.10]"
          aside={
            <div className="rounded-full border border-white/[0.08] bg-black/25 px-4 py-2 font-mono text-[11px] text-slate-300/85 backdrop-blur-md">
              {activeCount} / {lessons.length} lessons live
            </div>
          }
        />

        <section className="mt-4 overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.20] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: `rgba(${accentRgb},0.76)` }}>
                Unit throughline
              </div>
              <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.035em] text-white">{throughline}</h2>
              <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">
                This page organizes the unit. The actual teaching lives in the lessons below, so each lesson can keep one primary question and one primary learning object.
              </p>
              <div className="mt-4 rounded-[15px] border border-white/[0.05] bg-white/[0.012] px-4 py-3 font-mono text-[12px] text-slate-400">
                {sequence}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {lessons.map(({ child, presentation }) => (
                <div
                  key={child.id}
                  className="min-h-[116px] rounded-[17px] border border-white/[0.05] bg-black/[0.15] p-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] font-semibold" style={{ color: `rgba(${presentation.rgb},0.70)` }}>
                      {presentation.step}
                    </span>
                    <span className={`text-[9px] font-semibold uppercase tracking-[0.09em] ${child.status === "placeholder" ? "text-slate-700" : "text-emerald-300/70"}`}>
                      {child.status === "placeholder" ? "planned" : "live"}
                    </span>
                  </div>
                  <strong className="mt-3 block text-[12px] text-slate-200">{child.label}</strong>
                  <div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${presentation.rgb},0.72)` }}>
                    {presentation.specimen}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="mb-3 px-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: `rgba(${accentRgb},0.74)` }}>
              Lessons
            </div>
            <p className="mt-1 text-[12px] text-slate-500">Follow the sequence on a first pass. Planned lessons stay visible so the shape of the unit remains clear.</p>
          </div>

          <nav aria-label={`${context.node.label} lessons`} className="grid gap-3 md:grid-cols-2">
            {lessons.map(({ child, presentation }) => {
              const card = (
                <div className="relative flex min-h-[182px] h-full flex-col overflow-hidden rounded-[21px] border p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${presentation.rgb},${child.status === "placeholder" ? "0.08" : "0.17"})`, background: `linear-gradient(145deg, rgba(${presentation.rgb},${child.status === "placeholder" ? "0.018" : "0.055"}), rgba(3,8,15,0.68))` }}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] font-semibold" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step} / {String(lessons.length).padStart(2, "0")}</span>
                    {child.status === "placeholder" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.05] px-2.5 py-1 text-[9px] text-slate-700"><CircleDashed size={10} /> planned</span>
                    ) : (
                      <ArrowRight size={15} style={{ color: `rgb(${presentation.rgb})` }} />
                    )}
                  </div>
                  <h2 className={`mt-5 text-[21px] font-semibold tracking-[-0.025em] ${child.status === "placeholder" ? "text-slate-500" : "text-white"}`}>{child.label}</h2>
                  <p className={`mt-2 text-[12px] leading-5 ${child.status === "placeholder" ? "text-slate-700" : "text-slate-400"}`}>{presentation.question}</p>
                  <div className="mt-auto pt-4 font-mono text-[12px]" style={{ color: `rgba(${presentation.rgb},${child.status === "placeholder" ? "0.35" : "0.78"})` }}>
                    {presentation.specimen}
                  </div>
                </div>
              );

              return child.status === "placeholder" ? (
                <div key={child.id} aria-disabled="true">{card}</div>
              ) : (
                <Link key={child.id} href={child.href} className="group transition-transform hover:-translate-y-0.5">{card}</Link>
              );
            })}
          </nav>
        </section>

        <div className="mt-4 pb-8">
          <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
            ← Integrated Algebra map
          </Link>
        </div>
      </div>
    </main>
  );
}
