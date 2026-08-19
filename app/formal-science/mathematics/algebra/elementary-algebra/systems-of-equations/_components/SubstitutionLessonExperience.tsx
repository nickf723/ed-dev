"use client";

import { useState, type ReactNode } from "react";
import {
  CheckCircle2,
  Equal,
  RefreshCw,
  RotateCcw,
  Target,
  TriangleAlert,
} from "lucide-react";
import DiscoveryLessonBlock from "@/app/_components/DiscoveryLessonBlock";
import SubstitutionBackground from "./SubstitutionBackground";
import SystemsLessonShell, { type SystemsLessonNavItem } from "./SystemsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: SystemsLessonNavItem;
  next?: SystemsLessonNavItem;
  unitHref: string;
};

const ACCENT = "249, 115, 22";
const CYAN = "34, 211, 238";
const GREEN = "52, 211, 153";

export default function SubstitutionLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [sandboxStage, setSandboxStage] = useState(0);
  const [expressionSelected, setExpressionSelected] = useState(false);
  const [applicationStage, setApplicationStage] = useState(0);
  const [applicationExpressionSelected, setApplicationExpressionSelected] = useState(false);

  function resetSandbox() {
    setSandboxStage(0);
    setExpressionSelected(false);
  }

  function resetApplication() {
    setApplicationStage(0);
    setApplicationExpressionSelected(false);
  }

  return (
    <SystemsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="03"
      title="Substitution"
      subtitle="Use one equality to rewrite another constraint, then solve the resulting equation with ordinary balance-preserving algebra."
      eyebrow="Discover equal replacements"
      accentRgb={ACCENT}
      base="#120804"
      icon={RefreshCw}
      practiceId="substitution-application"
      background={<SubstitutionBackground />}
    >
      <div className="mt-8 space-y-14">
        <DiscoveryLessonBlock kind="phenomenon" accentRgb={ACCENT}>
          <div className="max-w-3xl border-l border-orange-200/[0.18] pl-5 sm:pl-7">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-white">
              Two equations are both true at one point. One of them already tells you exactly what <span className="text-cyan-200">y</span> equals.
            </h2>
            <p className="mt-4 max-w-2xl text-[13px] leading-6 text-slate-400">
              Can you carry that information into the other equation, make one unknown disappear, and still preserve the same shared solution?
            </p>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="sandbox" accentRgb={ACCENT}>
          <section className="overflow-hidden rounded-[26px] border border-orange-200/[0.13] bg-[#090707]/72 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-orange-200/64">Constraint compressor</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Replace first. Then solve the equation you created.</h2>
              </div>
              <button type="button" onClick={resetSandbox} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.08] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.09em] text-slate-500 transition hover:bg-white/[0.03] hover:text-slate-300">
                <RotateCcw size={12} /> reset sandbox
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <EquationPanel label="Constraint A" accent={CYAN}>
                  <span className="text-slate-300">y = </span>
                  <button
                    type="button"
                    onClick={() => sandboxStage === 0 && setExpressionSelected((value) => !value)}
                    className={`rounded-lg border px-2 py-1 transition ${expressionSelected ? "border-cyan-300/45 bg-cyan-300/[0.09] text-cyan-100" : "border-cyan-300/[0.16] bg-cyan-300/[0.025] text-cyan-200 hover:bg-cyan-300/[0.06]"}`}
                  >
                    x + 1
                  </button>
                </EquationPanel>

                <EquationPanel label="Constraint B" accent={ACCENT}>
                  {sandboxStage === 0 ? (
                    <span className="text-slate-300">
                      2x +{" "}
                      <button
                        type="button"
                        disabled={!expressionSelected}
                        onClick={() => {
                          if (!expressionSelected) return;
                          setSandboxStage(1);
                          setExpressionSelected(false);
                        }}
                        className={`rounded-lg border px-2 py-1 transition ${expressionSelected ? "border-orange-300/50 bg-orange-300/[0.10] text-orange-100 shadow-[0_0_22px_rgba(249,115,22,0.10)]" : "border-white/[0.08] text-slate-500"}`}
                      >
                        y
                      </button>{" "}
                      = 7
                    </span>
                  ) : (
                    <span className="text-slate-300">2x + <span className="rounded-lg border border-orange-300/[0.22] bg-orange-300/[0.05] px-2 py-1 text-orange-100">(x + 1)</span> = 7</span>
                  )}
                </EquationPanel>
              </div>

              {sandboxStage === 0 ? (
                <div className="mx-auto mt-7 max-w-2xl rounded-[18px] border border-white/[0.07] bg-black/[0.14] p-4 text-center">
                  <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-slate-600">Try it before reading ahead</div>
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">
                    Click the expression that names <span className="text-cyan-200">y</span>. Then click the <span className="text-orange-200">y</span> in the other equation to replace it.
                  </p>
                </div>
              ) : (
                <div className="mx-auto mt-8 max-w-3xl">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.035] text-cyan-200"><Equal size={14} /></span>
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-cyan-200/55">One variable remains</div>
                      <p className="mt-1 text-[11px] leading-5 text-slate-500">Now solve it as an equation. Every move must preserve equality.</p>
                    </div>
                  </div>

                  <AlgebraWorkbench stage={sandboxStage} onAdvance={() => setSandboxStage((stage) => Math.min(stage + 1, 6))} />
                </div>
              )}
            </div>
          </section>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="bridge" accentRgb={ACCENT}>
          <div className="max-w-3xl rounded-[22px] border border-white/[0.07] bg-black/[0.18] px-5 py-6 backdrop-blur-lg sm:px-6">
            <p className="text-[14px] leading-7 text-slate-300">
              The clickable replacement in the sandbox uses a basic property of equality: if <span className="font-mono text-cyan-200">y = x + 1</span>, then <span className="font-mono text-cyan-200">y</span> and <span className="font-mono text-cyan-200">x + 1</span> can stand for the same value wherever that equation is true.
            </p>
            <p className="mt-4 text-[13px] leading-6 text-slate-500">
              That replacement is <strong className="text-orange-100">substitution</strong>. It does not solve the new equation for you. It changes a two-variable problem into a one-variable equation so the algebra you already know can finish the job.
            </p>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="formal" accentRgb={ACCENT}>
          <div className="max-w-4xl overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.16] backdrop-blur-lg">
            <div className="grid sm:grid-cols-2">
              <FormalStep number="01" title="Expose an equality" formula="y = E" note="Isolate a variable, or use one that is already isolated." />
              <FormalStep number="02" title="Replace equal with equal" formula="... y ... → ... (E) ..." note="Carry the whole expression into the other equation." />
              <FormalStep number="03" title="Solve the new equation" formula="one unknown remains" note="Combine terms and perform the same operation on both sides." />
              <FormalStep number="04" title="Recover + verify" formula="(x, y)" note="Back-substitute for the second coordinate, then check both originals." />
            </div>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="pitfall" accentRgb={ACCENT}>
          <div className="max-w-4xl rounded-[22px] border border-amber-200/[0.11] bg-amber-300/[0.025] p-5 backdrop-blur-lg sm:p-6">
            <div className="flex gap-4">
              <TriangleAlert size={21} className="mt-0.5 shrink-0 text-amber-300/72" />
              <div>
                <h2 className="text-[17px] font-semibold text-white">Substitute the whole expression, including its parentheses.</h2>
                <p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-500">
                  If <span className="font-mono text-cyan-200">x = y + 4</span>, then <span className="font-mono text-orange-200">2x + y</span> becomes <span className="font-mono text-emerald-200">2(y + 4) + y</span>. Writing <span className="font-mono text-rose-200">2y + 4 + y</span> silently changes what the coefficient 2 multiplies.
                </p>
              </div>
            </div>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="application" accentRgb={ACCENT} id="substitution-application">
          <section className="overflow-hidden rounded-[26px] border border-emerald-200/[0.12] bg-[#07100c]/76 backdrop-blur-xl">
            <div className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-200/60"><Target size={12} /> Fresh system</div>
                <h2 className="mt-2 text-[clamp(1.55rem,2.8vw,2.25rem)] font-semibold tracking-[-0.04em] text-white">Do the same thing with a different isolated variable.</h2>
              </div>
              <button type="button" onClick={resetApplication} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.08] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.09em] text-slate-500 transition hover:bg-white/[0.03] hover:text-slate-300">
                <RotateCcw size={12} /> reset task
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <EquationPanel label="Constraint A" accent={CYAN}>
                  <span className="text-slate-300">x = </span>
                  <button
                    type="button"
                    onClick={() => applicationStage === 0 && setApplicationExpressionSelected((value) => !value)}
                    className={`rounded-lg border px-2 py-1 transition ${applicationExpressionSelected ? "border-cyan-300/45 bg-cyan-300/[0.09] text-cyan-100" : "border-cyan-300/[0.16] bg-cyan-300/[0.025] text-cyan-200 hover:bg-cyan-300/[0.06]"}`}
                  >
                    y + 4
                  </button>
                </EquationPanel>

                <EquationPanel label="Constraint B" accent={ACCENT}>
                  {applicationStage === 0 ? (
                    <span className="text-slate-300">
                      2
                      <button
                        type="button"
                        disabled={!applicationExpressionSelected}
                        onClick={() => {
                          if (!applicationExpressionSelected) return;
                          setApplicationStage(1);
                          setApplicationExpressionSelected(false);
                        }}
                        className={`mx-1 rounded-lg border px-1.5 py-1 transition ${applicationExpressionSelected ? "border-orange-300/50 bg-orange-300/[0.10] text-orange-100" : "border-white/[0.08] text-slate-500"}`}
                      >
                        x
                      </button>
                      + y = 14
                    </span>
                  ) : (
                    <span className="text-slate-300">2<span className="rounded-lg border border-emerald-300/[0.18] bg-emerald-300/[0.04] px-1.5 py-1 text-emerald-100">(y + 4)</span> + y = 14</span>
                  )}
                </EquationPanel>
              </div>

              {applicationStage === 0 ? (
                <p className="mx-auto mt-6 max-w-xl text-center text-[11px] leading-5 text-slate-500">Select the expression equal to x, then place it on x in the other constraint.</p>
              ) : (
                <div className="mx-auto mt-8 max-w-3xl">
                  <ApplicationWorkbench stage={applicationStage} onAdvance={() => setApplicationStage((stage) => Math.min(stage + 1, 7))} />
                </div>
              )}
            </div>
          </section>
        </DiscoveryLessonBlock>
      </div>
    </SystemsLessonShell>
  );
}

function AlgebraWorkbench({ stage, onAdvance }: { stage: number; onAdvance: () => void }) {
  const steps = [
    {
      equation: "2x + (x + 1) = 7",
      label: "Group like terms",
      action: "Combine 2x + x",
      preview: "3x + 1 = 7",
    },
    {
      equation: "3x + 1 = 7",
      label: "Undo the +1",
      action: "Subtract 1 from both sides",
      preview: "3x = 6",
    },
    {
      equation: "3x = 6",
      label: "Undo the ×3",
      action: "Divide both sides by 3",
      preview: "x = 2",
    },
    {
      equation: "x = 2",
      label: "Recover the other coordinate",
      action: "Put x = 2 into y = x + 1",
      preview: "y = 3",
    },
    {
      equation: "x = 2,  y = 3",
      label: "Check the original constraints",
      action: "Verify (2, 3)",
      preview: "both equations are true",
    },
  ] as const;

  if (stage >= 6) {
    return (
      <div className="rounded-[20px] border border-emerald-300/[0.16] bg-emerald-300/[0.025] p-5">
        <div className="flex items-center gap-2 text-emerald-200"><CheckCircle2 size={17} /><strong className="text-[13px]">Shared solution preserved</strong></div>
        <div className="mt-4 grid gap-2 font-mono text-[12px] sm:grid-cols-2">
          <CheckLine text="3 = 2 + 1" />
          <CheckLine text="2(2) + 3 = 7" />
        </div>
        <div className="mt-5 text-[28px] font-semibold tracking-[-0.04em] text-white">(2, 3)</div>
      </div>
    );
  }

  const stepIndex = Math.max(0, Math.min(stage - 1, steps.length - 1));
  const current = steps[stepIndex];

  return (
    <div className="rounded-[20px] border border-white/[0.08] bg-black/[0.16] p-5 sm:p-6">
      <div className="font-mono text-[10px] text-orange-100">{current.equation}</div>
      <div className="mt-5 border-t border-white/[0.06] pt-5">
        <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-slate-600">{current.label}</div>
        <button type="button" onClick={onAdvance} className="mt-3 w-full rounded-[15px] border border-orange-300/[0.18] bg-orange-300/[0.035] px-4 py-3 text-left transition hover:bg-orange-300/[0.07]">
          <span className="block text-[12px] font-semibold text-orange-100">{current.action}</span>
          <span className="mt-1 block font-mono text-[10px] text-slate-500">→ {current.preview}</span>
        </button>
      </div>

      {stage > 1 ? (
        <div className="mt-5 space-y-2 border-t border-white/[0.05] pt-4">
          {steps.slice(0, stepIndex).map((step) => (
            <div key={step.preview} className="flex items-center gap-3 text-[10px] text-slate-600">
              <CheckCircle2 size={11} className="text-emerald-300/55" />
              <span className="font-mono">{step.preview}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ApplicationWorkbench({ stage, onAdvance }: { stage: number; onAdvance: () => void }) {
  const steps = [
    { equation: "2(y + 4) + y = 14", label: "Use the distributive property", action: "Distribute the 2", preview: "2y + 8 + y = 14" },
    { equation: "2y + 8 + y = 14", label: "Collect like terms", action: "Combine 2y + y", preview: "3y + 8 = 14" },
    { equation: "3y + 8 = 14", label: "Keep the equation balanced", action: "Subtract 8 from both sides", preview: "3y = 6" },
    { equation: "3y = 6", label: "Isolate y", action: "Divide both sides by 3", preview: "y = 2" },
    { equation: "y = 2", label: "Recover x", action: "Put y = 2 into x = y + 4", preview: "x = 6" },
    { equation: "x = 6,  y = 2", label: "Verify the ordered pair", action: "Check both originals", preview: "solution: (6, 2)" },
  ] as const;

  if (stage >= 7) {
    return (
      <div className="rounded-[20px] border border-emerald-300/[0.16] bg-emerald-300/[0.025] p-5">
        <div className="flex items-center gap-2 text-emerald-200"><CheckCircle2 size={17} /><strong className="text-[13px]">Transfer complete</strong></div>
        <div className="mt-4 grid gap-2 font-mono text-[12px] sm:grid-cols-2">
          <CheckLine text="6 = 2 + 4" />
          <CheckLine text="2(6) + 2 = 14" />
        </div>
        <div className="mt-5 text-[28px] font-semibold tracking-[-0.04em] text-white">(6, 2)</div>
      </div>
    );
  }

  const stepIndex = Math.max(0, Math.min(stage - 1, steps.length - 1));
  const current = steps[stepIndex];

  return (
    <div className="rounded-[20px] border border-white/[0.08] bg-black/[0.16] p-5 sm:p-6">
      <div className="font-mono text-[10px] text-emerald-100">{current.equation}</div>
      <div className="mt-5 border-t border-white/[0.06] pt-5">
        <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-slate-600">{current.label}</div>
        <button type="button" onClick={onAdvance} className="mt-3 w-full rounded-[15px] border border-emerald-300/[0.18] bg-emerald-300/[0.035] px-4 py-3 text-left transition hover:bg-emerald-300/[0.07]">
          <span className="block text-[12px] font-semibold text-emerald-100">{current.action}</span>
          <span className="mt-1 block font-mono text-[10px] text-slate-500">→ {current.preview}</span>
        </button>
      </div>
    </div>
  );
}

function EquationPanel({ label, accent, children }: { label: string; accent: string; children: ReactNode }) {
  return (
    <div className="rounded-[18px] border p-4 sm:p-5" style={{ borderColor: `rgba(${accent},0.13)`, background: `rgba(${accent},0.025)` }}>
      <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${accent},0.58)` }}>{label}</div>
      <div className="mt-3 font-mono text-[17px] text-white">{children}</div>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return <div className="flex items-center gap-2 rounded-[13px] border border-emerald-300/[0.09] bg-emerald-300/[0.02] px-3 py-2 text-emerald-100"><CheckCircle2 size={12} /><span>{text}</span></div>;
}

function FormalStep({ number, title, formula, note }: { number: string; title: string; formula: string; note: string }) {
  return (
    <div className="min-h-[172px] border-b border-white/[0.06] p-5 odd:sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0">
      <span className="font-mono text-[8px] text-orange-200/40">{number}</span>
      <h3 className="mt-3 text-[14px] font-semibold text-white">{title}</h3>
      <div className="mt-2 font-mono text-[11px] text-orange-200">{formula}</div>
      <p className="mt-3 max-w-sm text-[10px] leading-5 text-slate-600">{note}</p>
    </div>
  );
}
