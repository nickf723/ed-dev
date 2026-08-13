"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, type LucideIcon } from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import InequalitiesBackground from "./InequalitiesBackgroundV2";

export type InequalitiesLessonNavItem = {
  label: string;
  href: string;
};

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: InequalitiesLessonNavItem;
  next?: InequalitiesLessonNavItem;
  unitHref: string;
  step: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  accentRgb: string;
  base: string;
  icon: LucideIcon;
  practiceId: string;
  questions: AssessmentQuestion[];
  assessmentColor: "cyan" | "indigo" | "violet";
  children: ReactNode;
};

export default function InequalitiesLessonShell({
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
  icon: Icon,
  practiceId,
  questions,
  assessmentColor,
  children,
}: Props) {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-slate-100" style={{ backgroundColor: base }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-65">
        <InequalitiesBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(2,6,16,0.72))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow={`Lesson ${step} · ${eyebrow}`}
          icon={Icon}
          title={<span>{title}</span>}
          subtitle={subtitle}
          accentRgb={accentRgb}
          titleClassName="font-mono text-[clamp(2.2rem,4.35vw,4.55rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f7fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar practiceTargetId={practiceId} vocabulary accentRgb={accentRgb} />

        {children}

        <section id={practiceId} className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${accentRgb},0.72)` }}>
                  Check transfer
                </span>
                <strong className="mt-1 block text-[15px] text-slate-200">Fresh cases, same underlying idea</strong>
              </span>
              <Sparkles size={16} style={{ color: `rgb(${accentRgb})` }} />
            </summary>
            <div className="inequality-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment title={`${title} check`} questions={questions} accentColor={assessmentColor} />
            </div>
          </details>
        </section>

        <LessonNavigation
          previous={previous}
          next={next}
          unitHref={unitHref}
          currentStep={step}
          accent={accentRgb}
        />
      </div>

      <style>{`
        .inequality-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .inequality-assessment > div > div { min-height: 300px !important; }
        .inequality-assessment h3 { margin-bottom: 16px !important; font-size: 1.05rem !important; line-height: 1.45 !important; }
        .inequality-assessment button { padding-top: 10px !important; padding-bottom: 10px !important; }
      `}</style>
    </main>
  );
}

function LessonNavigation({
  previous,
  next,
  unitHref,
  currentStep,
  accent,
}: {
  previous?: InequalitiesLessonNavItem;
  next?: InequalitiesLessonNavItem;
  unitHref: string;
  currentStep: string;
  accent: string;
}) {
  return (
    <nav className="mt-4 pb-8" aria-label="Algebraic Inequalities lesson navigation">
      <div className="mb-2 flex justify-end">
        <span className="font-mono text-[10px] text-slate-700">{currentStep} / 03</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? <NavCard item={previous} direction="previous" accent={accent} /> : <div className="hidden sm:block" aria-hidden="true" />}
        {next ? (
          <NavCard item={next} direction="next" accent={accent} />
        ) : (
          <Link
            href={unitHref}
            className="group flex min-h-[76px] items-center rounded-[18px] border px-4"
            style={{ borderColor: `rgba(${accent},0.16)`, background: `rgba(${accent},0.035)` }}
          >
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Unit complete</span>
              <strong className="mt-1 block text-[14px] text-slate-200">Return to Algebraic Inequalities</strong>
            </span>
            <Check size={15} className="ml-3" style={{ color: `rgb(${accent})` }} />
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavCard({
  item,
  direction,
  accent,
}: {
  item: InequalitiesLessonNavItem;
  direction: "previous" | "next";
  accent: string;
}) {
  const isPrevious = direction === "previous";
  return (
    <Link
      href={item.href}
      className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border px-4 py-3"
      style={{ borderColor: `rgba(${accent},0.14)`, background: `rgba(${accent},0.025)` }}
    >
      {isPrevious ? <ArrowLeft size={15} style={{ color: `rgb(${accent})` }} /> : null}
      <span className={`min-w-0 flex-1 ${isPrevious ? "" : "text-right"}`}>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">
          {isPrevious ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-slate-200">{item.label}</strong>
      </span>
      {!isPrevious ? <ArrowRight size={15} style={{ color: `rgb(${accent})` }} /> : null}
    </Link>
  );
}
