"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import SystemsBackground from "./SystemsBackground";

export type SystemsLessonNavItem = {
  label: string;
  href: string;
};

type SystemsLessonShellProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: SystemsLessonNavItem;
  next?: SystemsLessonNavItem;
  unitHref: string;
  step: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  accentRgb: string;
  base: string;
  icon: LucideIcon;
  practiceId: string;
  questions?: AssessmentQuestion[];
  assessmentColor?: "cyan" | "emerald" | "indigo" | "amber";
  background?: ReactNode;
  children: ReactNode;
};

export default function SystemsLessonShell({
  breadcrumbs,
  previous,
  next,
  unitHref,
  step,
  title,
  subtitle,
  eyebrow,
  accentRgb,
  base,
  icon,
  practiceId,
  questions,
  assessmentColor = "cyan",
  background,
  children,
}: SystemsLessonShellProps) {
  const Icon = icon;
  const hasAssessment = Boolean(questions?.length);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-slate-100" style={{ backgroundColor: base }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-52">
        {background ?? <SystemsBackground />}
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 78% 12%, rgba(${accentRgb},0.085), transparent 30%), linear-gradient(to bottom, rgba(3,6,14,0.10), rgba(2,4,10,0.82))`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow={`Lesson ${step} · ${eyebrow}`}
          icon={Icon}
          title={<span>{title}</span>}
          subtitle={subtitle}
          accentRgb={accentRgb}
          titleClassName="font-mono text-[clamp(2.2rem,4.35vw,4.55rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f4fdff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar practiceTargetId={practiceId} vocabulary accentRgb={accentRgb} />

        {children}

        {hasAssessment ? (
          <section id={practiceId} className="scroll-mt-24 mt-8">
            <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${accentRgb},0.72)` }}>
                    Transfer check
                  </span>
                  <strong className="mt-1 block text-[15px] text-slate-200">Fresh cases, same shared-solution idea</strong>
                </span>
                <Sparkles size={16} style={{ color: `rgb(${accentRgb})` }} />
              </summary>
              <div className="systems-assessment border-t border-white/[0.06] p-3 sm:p-4">
                <Assessment title={`${title} check`} questions={questions ?? []} accentColor={assessmentColor} />
              </div>
            </details>
          </section>
        ) : null}

        <nav className="mt-10 pb-12" aria-label="Systems of Equations lesson navigation">
          <div className="mb-2 flex justify-end">
            <span className="font-mono text-[10px] text-slate-700">{step} / 04</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {previous ? <NavCard item={previous} direction="previous" accent={accentRgb} /> : <div className="hidden sm:block" aria-hidden="true" />}
            {next ? (
              <NavCard item={next} direction="next" accent={accentRgb} />
            ) : (
              <Link href={unitHref} className="group flex min-h-[76px] items-center rounded-[18px] border px-4" style={{ borderColor: `rgba(${accentRgb},0.16)`, background: `rgba(${accentRgb},0.035)` }}>
                <span className="min-w-0 flex-1 text-right">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Unit complete</span>
                  <strong className="mt-1 block text-[14px] text-slate-200">Return to Systems of Equations</strong>
                </span>
                <Check size={15} className="ml-3" style={{ color: `rgb(${accentRgb})` }} />
              </Link>
            )}
          </div>
        </nav>
      </div>

      <style>{`
        .systems-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .systems-assessment > div > div { min-height: 300px !important; }
        .systems-assessment h3 { margin-bottom: 16px !important; font-size: 1.05rem !important; line-height: 1.45 !important; }
        .systems-assessment button { padding-top: 10px !important; padding-bottom: 10px !important; }
      `}</style>
    </main>
  );
}

function NavCard({ item, direction, accent }: { item: SystemsLessonNavItem; direction: "previous" | "next"; accent: string }) {
  const previous = direction === "previous";
  return (
    <Link href={item.href} className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border px-4 py-3" style={{ borderColor: `rgba(${accent},0.14)`, background: `rgba(${accent},0.025)` }}>
      {previous ? <ArrowLeft size={15} style={{ color: `rgb(${accent})` }} /> : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{previous ? "Previous lesson" : "Next lesson"}</span>
        <strong className="mt-1 block text-[14px] text-slate-200">{item.label}</strong>
      </span>
      {!previous ? <ArrowRight size={15} style={{ color: `rgb(${accent})` }} /> : null}
    </Link>
  );
}
