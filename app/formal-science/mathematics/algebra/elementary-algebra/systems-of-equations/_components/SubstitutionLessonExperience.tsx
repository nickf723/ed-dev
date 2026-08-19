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
      subtitle="Use one equation to replace a variable in the other, solve the resulting one-variable equation, then back-substitute and check the ordered pair."
      eyebrow="Solve a system algebraically"
      accentRgb={ACCENT}
      base="#120804"
      icon={RefreshCw}
      practiceId="substitution-application"
      background={<SubstitutionBackground />}
    >
      <div className="mt-10 space-y-16">
        <DiscoveryLessonBlock kind="phenomenon" accentRgb={ACCENT}>
          <ExamPrompt
            eyebrow="Worked Example 1"
            instruction="Solve the system of equations below by substitution. Show all algebraic steps. State the solution as an ordered pair, then check it in both original equations."
            equationA="y = x + 1"
            equationB="2x + y = 7"
          />
          <div className="mx-auto mt-6 max-w-[760px] rounded-[18px] border border-cyan-200/[0.14] bg-cyan-300/[0.035] px-5 py-4 backdrop-blur-lg">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-cyan-100">What are you trying to find?</div>
            <p className="mt-2 text-[16px] leading-7 text-slate-200">
              One ordered pair <span className="font-mono text-cyan-100">(x, y)</span> that makes <strong className="text-white">both equations true at the same time</strong>.
            </p>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="sandbox" accentRgb={ACCENT}>
          <section className="overflow-hidden rounded-[26px] border border-orange-200/[0.16] bg-[#090707]/88 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 border-b border-white/[0.09] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-200/80">Work the example</div>
                <h2 className="mt-2 text-[25px] font-semibold leading-tight tracking-[-0.025em] text-white">Use the equation that already tells you what a variable equals.</h2>
              </div>
              <button type="button" onClick={resetSandbox} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[11px] font-semibold text-slate-300 transition hover:border-white/[0.20] hover:text-white">
                <RotateCcw size={14} /> Reset example
              </button>
            </div>

            <StepTrack stage={sandboxStage} />

            <div className="p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <EquationPanel label="Equation 1" accent={CYAN}>
                  <span className="text-white">y = </span>
                  <button
                    type="button"
                    onClick={() => sandboxStage === 0 && setExpressionSelected((value) => !value)}
                    className={`rounded-lg border px-2.5 py-1.5 transition ${expressionSelected ? "border-cyan-200/70 bg-cyan-300/[0.14] text-cyan-50" : "border-cyan-300/[0.26] bg-cyan-300/[0.05] text-cyan-100 hover:bg-cyan-300/[0.10]"}`}
                  >
                    x + 1
                  </button>
                </EquationPanel>

                <EquationPanel label="Equation 2" accent={ACCENT}>
                  {sandboxStage === 0 ? (
                    <span className="text-white">
                      2x +{" "}
                      <button
                        type="button"
                        disabled={!expressionSelected}
                        onClick={() => {
                          if (!expressionSelected) return;
                          setSandboxStage(1);
                          setExpressionSelected(false);
                        }}
                        className={`rounded-lg border px-2.5 py-1.5 transition ${expressionSelected ? "border-orange-200/70 bg-orange-300/[0.14] text-orange-50 shadow-[0_0_24px_rgba(249,115,22,0.12)]" : "border-white/[0.12] text-slate-400"}`}
                      >
                        y
                      </button>{" "}
                      = 7
                    </span>
                  ) : (
                    <span className="text-white">2x + <span className="rounded-lg border border-orange-300/[0.30] bg-orange-300/[0.08] px-2.5 py-1.5 text-orange-100">(x + 1)</span> = 7</span>
                  )}
                </EquationPanel>
              </div>

              {sandboxStage === 0 ? (
                <div className="mx-auto mt-7 max-w-[680px] rounded-[20px] border border-white/[0.10] bg-black/[0.22] p-5">
                  <div className="text-[13px] font-semibold text-white">Step 1: substitute.</div>
                  <p className="mt-2 text-[15px] leading-7 text-slate-300">
                    Equation 1 already says <span className="font-mono text-cyan-100">y = x + 1</span>. That means every <span className="font-mono text-orange-100">y</span> in Equation 2 may be replaced by <span className="font-mono text-cyan-100">x + 1</span>.
                  </p>
                  <p className="mt-3 text-[14px] font-semibold leading-6 text-orange-100">
                    Click <span className="font-mono">x + 1</span>, then click the <span className="font-mono">y</span> in Equation 2.
                  </p>
                </div>
              ) : (
                <div className="mx-auto mt-8 max-w-[760px]">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/[0.24] bg-cyan-300/[0.06] text-cyan-100"><Equal size={16} /></span>
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-cyan-100">One variable remains</div>
                      <p className="mt-1 text-[15px] leading-6 text-slate-300">Now solve the new equation using the same balance-preserving algebra you would write on paper.</p>
                    </div>
                  </div>

                  <AlgebraWorkbench stage={sandboxStage} onAdvance={() => setSandboxStage((stage) => Math.min(stage + 1, 6))} />
                </div>
              )}
            </div>
          </section>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="bridge" accentRgb={ACCENT}>
          <div className="mx-auto max-w-[760px] rounded-[22px] border border-white/[0.10] bg-black/[0.28] px-6 py-7 backdrop-blur-lg">
            <p className="text-[17px] leading-8 text-slate-200">
              The replacement works because Equation 1 tells us that <span className="font-mono text-cyan-100">y</span> and <span className="font-mono text-cyan-100">x + 1</span> have the same value for every solution of that equation.
            </p>
            <p className="mt-4 text-[16px] leading-7 text-slate-300">
              Replacing one with the other is called <strong className="text-orange-100">substitution</strong>. The substitution itself is only the first move. Its purpose is to turn a two-variable system into an ordinary one-variable equation that you can solve step by step.
            </p>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="formal" accentRgb={ACCENT}>
          <div className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.24] backdrop-blur-lg">
            <div className="grid sm:grid-cols-2">
              <FormalStep number="01" title="Choose the easy equation" formula="y = expression" note="Look for a variable that is already isolated, or isolate one first." />
              <FormalStep number="02" title="Substitute" formula="replace y with that expression" note="Use parentheses so the entire expression stays together." />
              <FormalStep number="03" title="Solve" formula="one variable remains" note="Combine like terms and perform equal operations on both sides." />
              <FormalStep number="04" title="Back-substitute + check" formula="solution = (x, y)" note="Find the second coordinate, then verify the pair in both original equations." />
            </div>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="pitfall" accentRgb={ACCENT}>
          <div className="rounded-[22px] border border-amber-200/[0.16] bg-amber-300/[0.045] p-6 backdrop-blur-lg">
            <div className="flex gap-4">
              <TriangleAlert size={24} className="mt-0.5 shrink-0 text-amber-200" />
              <div>
                <h2 className="text-[20px] font-semibold text-white">Substitute the whole expression.</h2>
                <p className="mt-3 text-[16px] leading-7 text-slate-200">
                  If <span className="font-mono text-cyan-100">x = y + 4</span>, then <span className="font-mono text-orange-100">2x + y</span> becomes <span className="font-mono text-emerald-100">2(y + 4) + y</span>. The parentheses matter because the coefficient 2 multiplies the entire replacement.
                </p>
              </div>
            </div>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="application" accentRgb={ACCENT} id="substitution-application">
          <section className="overflow-hidden rounded-[26px] border border-emerald-200/[0.16] bg-[#07100c]/88 backdrop-blur-xl">
            <div className="flex flex-col gap-4 border-b border-white/[0.09] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-100"><Target size={14} /> Independent practice</div>
                <h2 className="mt-2 text-[25px] font-semibold leading-tight tracking-[-0.025em] text-white">Solve a new system without answer choices.</h2>
              </div>
              <button type="button" onClick={resetApplication} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[11px] font-semibold text-slate-300 transition hover:border-white/[0.20] hover:text-white">
                <RotateCcw size={14} /> Reset practice
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <ExamPrompt
                compact
                eyebrow="Practice Problem"
                instruction="Solve the system by substitution. Show each algebraic step and check your ordered pair."
                equationA="x = y + 4"
                equationB="2x + y = 14"
              />

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <EquationPanel label="Equation 1" accent={CYAN}>
                  <span className="text-white">x = </span>
                  <button
                    type="button"
                    onClick={() => applicationStage === 0 && setApplicationExpressionSelected((value) => !value)}
                    className={`rounded-lg border px-2.5 py-1.5 transition ${applicationExpressionSelected ? "border-cyan-200/70 bg-cyan-300/[0.14] text-cyan-50" : "border-cyan-300/[0.26] bg-cyan-300/[0.05] text-cyan-100 hover:bg-cyan-300/[0.10]"}`}
                  >
                    y + 4
                  </button>
                </EquationPanel>

                <EquationPanel label="Equation 2" accent={ACCENT}>
                  {applicationStage === 0 ? (
                    <span className="text-white">
                      2
                      <button
                        type="button"
                        disabled={!applicationExpressionSelected}
                        onClick={() => {
                          if (!applicationExpressionSelected) return;
                          setApplicationStage(1);
                          setApplicationExpressionSelected(false);
                        }}
                        className={`mx-1 rounded-lg border px-2 py-1.5 transition ${applicationExpressionSelected ? "border-orange-200/70 bg-orange-300/[0.14] text-orange-50" : "border-white/[0.12] text-slate-400"}`}
                      >
                        x
                      </button>
                      + y = 14
                    </span>
                  ) : (
                    <span className="text-white">2<span className="rounded-lg border border-emerald-300/[0.26] bg-emerald-300/[0.07] px-2 py-1.5 text-emerald-100">(y + 4)</span> + y = 14</span>
                  )}
                </EquationPanel>
              </div>

              {applicationStage === 0 ? (
                <div className="mx-auto mt-6 max-w-[640px] rounded-[18px] border border-white/[0.10] bg-black/[0.20] p-4 text-center text-[15px] leading-6 text-slate-300">
                  Start by selecting the expression equal to <span className="font-mono text-cyan-100">x</span>, then place it on <span className="font-mono text-orange-100">x</span> in Equation 2.
                </div>
              ) : (
                <div className="mx-auto mt-8 max-w-[760px]">
                  <ApplicationWorkbench stage={applicationStage} onAdvance={() => setApplicationStage((stage) => Math.min(stage + 1, 7))} />
                </div>
              )}

              <HomeworkPractice />
            </div>
          </section>
        </DiscoveryLessonBlock>
      </div>
    </SystemsLessonShell>
  );
}

function ExamPrompt({ eyebrow, instruction, equationA, equationB, compact = false }: { eyebrow: string; instruction: string; equationA: string; equationB: string; compact?: boolean }) {
  return (
    <div className={`mx-auto overflow-hidden rounded-[22px] border border-[#d9d2c5] bg-[#f6f2e9] text-[#161616] shadow-[0_18px_55px_rgba(0,0,0,0.20)] ${compact ? "max-w-[720px]" : "max-w-[820px]"}`}>
      <div className="border-b border-[#d7d0c4] px-5 py-4 sm:px-7">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6b6258]">{eyebrow}</div>
        <p className={`mt-2 font-medium leading-7 ${compact ? "text-[15px]" : "text-[17px] sm:text-[18px]"}`}>{instruction}</p>
      </div>
      <div className={`flex items-center gap-5 px-6 sm:px-8 ${compact ? "py-5" : "py-7"}`}>
        <div className="text-[46px] font-light leading-none text-[#6a6259]">&#123;</div>
        <div className={`space-y-2 font-mono font-semibold tracking-[-0.02em] ${compact ? "text-[20px]" : "text-[23px] sm:text-[25px]"}`}>
          <div>{equationA}</div>
          <div>{equationB}</div>
        </div>
      </div>
    </div>
  );
}

function StepTrack({ stage }: { stage: number }) {
  const current = stage === 0 ? 0 : stage < 4 ? 1 : stage < 5 ? 2 : stage < 6 ? 3 : 4;
  const steps = ["Substitute", "Solve x", "Find y", "Check"];
  return (
    <div className="border-b border-white/[0.07] bg-black/[0.18] px-5 py-4 sm:px-6">
      <div className="grid grid-cols-4 gap-2">
        {steps.map((label, index) => {
          const done = index < current;
          const active = index === current || (current === 4 && index === 3);
          return (
            <div key={label} className="min-w-0">
              <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <div className={`h-full rounded-full transition-all ${done || active ? "w-full" : "w-0"}`} style={{ background: done ? `rgb(${GREEN})` : active ? `rgb(${ACCENT})` : "transparent" }} />
              </div>
              <div className={`text-[11px] font-semibold ${done ? "text-emerald-200" : active ? "text-orange-100" : "text-slate-500"}`}>{index + 1}. {label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AlgebraWorkbench({ stage, onAdvance }: { stage: number; onAdvance: () => void }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#d9d2c5] bg-[#f7f4ec] text-[#171717] shadow-[0_18px_55px_rgba(0,0,0,0.16)]">
      <div className="border-b border-[#d8d1c6] px-5 py-4 sm:px-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.10em] text-[#746b61]">Written work</div>
        <p className="mt-1 text-[15px] leading-6 text-[#514a43]">Keep each equivalent equation on its own line, just as you would on homework or an exam.</p>
      </div>
      <div className="space-y-0 px-5 py-5 sm:px-7 sm:py-6">
        <WorkLine equation="2x + (x + 1) = 7" note="substitute x + 1 for y" />

        {stage === 1 ? <OperationButton title="Combine like terms" detail="2x + x becomes 3x" onClick={onAdvance} /> : null}

        {stage >= 2 ? <WorkLine equation="3x + 1 = 7" note="combine 2x + x" /> : null}
        {stage === 2 ? <OperationButton title="Subtract 1 from both sides" detail="Undo the +1 while keeping the equation balanced." onClick={onAdvance} /> : null}

        {stage >= 3 ? <OperationRow left="− 1" right="− 1" /> : null}
        {stage >= 3 ? <WorkLine equation="3x = 6" note="simplify both sides" /> : null}
        {stage === 3 ? <OperationButton title="Divide both sides by 3" detail="Undo the coefficient multiplying x." onClick={onAdvance} /> : null}

        {stage >= 4 ? <WorkLine equation="x = 2" note="first coordinate found" emphasis /> : null}
        {stage === 4 ? <OperationButton title="Back-substitute x = 2" detail="Use y = x + 1 to find y." onClick={onAdvance} /> : null}

        {stage >= 5 ? <WorkLine equation="y = 2 + 1 = 3" note="second coordinate found" /> : null}
        {stage >= 5 ? <SolutionLine solution="(2, 3)" /> : null}
        {stage === 5 ? <OperationButton title="Check (2, 3) in both original equations" detail="A correct system solution must satisfy both equations." onClick={onAdvance} /> : null}

        {stage >= 6 ? (
          <div className="mt-5 space-y-2 rounded-[16px] border border-emerald-700/20 bg-emerald-50 p-4">
            <CheckLine text="Equation 1: 3 = 2 + 1" dark />
            <CheckLine text="Equation 2: 2(2) + 3 = 7" dark />
            <p className="pt-1 text-[14px] font-semibold text-emerald-800">Both equations are true, so (2, 3) is the solution.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ApplicationWorkbench({ stage, onAdvance }: { stage: number; onAdvance: () => void }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#d9d2c5] bg-[#f7f4ec] text-[#171717] shadow-[0_18px_55px_rgba(0,0,0,0.16)]">
      <div className="border-b border-[#d8d1c6] px-5 py-4 sm:px-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.10em] text-[#746b61]">Your work</div>
        <p className="mt-1 text-[15px] leading-6 text-[#514a43]">Use the same sequence: substitute, solve one variable, back-substitute, check.</p>
      </div>
      <div className="px-5 py-5 sm:px-7 sm:py-6">
        <WorkLine equation="2(y + 4) + y = 14" note="substitute y + 4 for x" />
        {stage === 1 ? <OperationButton title="Distribute the 2" detail="2(y + 4) becomes 2y + 8" onClick={onAdvance} /> : null}

        {stage >= 2 ? <WorkLine equation="2y + 8 + y = 14" note="distribute" /> : null}
        {stage === 2 ? <OperationButton title="Combine like terms" detail="2y + y becomes 3y" onClick={onAdvance} /> : null}

        {stage >= 3 ? <WorkLine equation="3y + 8 = 14" note="combine like terms" /> : null}
        {stage === 3 ? <OperationButton title="Subtract 8 from both sides" detail="Undo the +8." onClick={onAdvance} /> : null}

        {stage >= 4 ? <OperationRow left="− 8" right="− 8" /> : null}
        {stage >= 4 ? <WorkLine equation="3y = 6" note="simplify" /> : null}
        {stage === 4 ? <OperationButton title="Divide both sides by 3" detail="Solve for y." onClick={onAdvance} /> : null}

        {stage >= 5 ? <WorkLine equation="y = 2" note="first coordinate value found" emphasis /> : null}
        {stage === 5 ? <OperationButton title="Back-substitute y = 2" detail="Use x = y + 4 to find x." onClick={onAdvance} /> : null}

        {stage >= 6 ? <WorkLine equation="x = 2 + 4 = 6" note="second coordinate found" /> : null}
        {stage >= 6 ? <SolutionLine solution="(6, 2)" /> : null}
        {stage === 6 ? <OperationButton title="Check (6, 2) in both originals" detail="Finish by verifying the ordered pair." onClick={onAdvance} /> : null}

        {stage >= 7 ? (
          <div className="mt-5 space-y-2 rounded-[16px] border border-emerald-700/20 bg-emerald-50 p-4">
            <CheckLine text="Equation 1: 6 = 2 + 4" dark />
            <CheckLine text="Equation 2: 2(6) + 2 = 14" dark />
            <p className="pt-1 text-[14px] font-semibold text-emerald-800">Both checks work. The solution is (6, 2).</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function HomeworkPractice() {
  const problems = [
    ["y = 2x − 3", "x + y = 9"],
    ["x = y + 5", "3x − y = 13"],
    ["y = −x + 6", "2x + y = 9"],
    ["x = 2y − 1", "x + y = 8"],
  ];
  return (
    <div className="mt-10 border-t border-white/[0.09] pt-8">
      <div className="max-w-2xl">
        <div className="text-[12px] font-semibold uppercase tracking-[0.10em] text-emerald-100">Homework-style practice</div>
        <h3 className="mt-2 text-[23px] font-semibold text-white">Now try a few without the walkthrough.</h3>
        <p className="mt-2 text-[15px] leading-7 text-slate-300">Solve each system by substitution on paper or in your notebook. Show the substitution, solve, back-substitute, and check.</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {problems.map((problem, index) => (
          <div key={problem[0]} className="rounded-[18px] border border-white/[0.12] bg-black/[0.20] p-5">
            <div className="text-[11px] font-semibold text-slate-400">{index + 1}.</div>
            <div className="mt-3 space-y-1.5 font-mono text-[18px] font-semibold text-white">
              <div>{problem[0]}</div>
              <div>{problem[1]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EquationPanel({ label, accent, children }: { label: string; accent: string; children: ReactNode }) {
  return (
    <div className="rounded-[20px] border p-5" style={{ borderColor: `rgba(${accent},0.22)`, background: `rgba(${accent},0.045)` }}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgba(${accent},0.88)` }}>{label}</div>
      <div className="mt-4 font-mono text-[22px] font-semibold leading-relaxed text-white sm:text-[24px]">{children}</div>
    </div>
  );
}

function WorkLine({ equation, note, emphasis = false }: { equation: string; note: string; emphasis?: boolean }) {
  return (
    <div className="border-b border-[#ded8ce] py-4 first:pt-0">
      <div className={`font-mono text-[22px] font-semibold tracking-[-0.025em] sm:text-[25px] ${emphasis ? "text-[#9a3412]" : "text-[#171717]"}`}>{equation}</div>
      <div className="mt-1.5 text-[13px] font-medium text-[#766d63]">{note}</div>
    </div>
  );
}

function OperationRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-2 border-b border-[#ded8ce] py-2 font-mono text-[18px] font-semibold text-[#8a3d1c]">
      <span className="pl-10">{left}</span>
      <span className="text-right pr-12">{right}</span>
    </div>
  );
}

function OperationButton({ title, detail, onClick }: { title: string; detail: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="my-4 w-full rounded-[16px] border border-[#c66a32]/35 bg-[#fff8ef] px-4 py-4 text-left transition hover:border-[#c66a32]/60 hover:bg-[#fff3e6]">
      <span className="block text-[16px] font-bold text-[#7c2d12]">{title}</span>
      <span className="mt-1 block text-[14px] leading-6 text-[#675e55]">{detail}</span>
    </button>
  );
}

function SolutionLine({ solution }: { solution: string }) {
  return (
    <div className="mt-5 rounded-[16px] border border-[#9f7f5e]/25 bg-[#efe8db] px-4 py-4">
      <div className="text-[12px] font-bold uppercase tracking-[0.09em] text-[#746657]">Ordered-pair solution</div>
      <div className="mt-1 font-mono text-[27px] font-bold text-[#171717]">{solution}</div>
    </div>
  );
}

function CheckLine({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-[12px] px-3 py-2.5 font-mono text-[15px] font-semibold ${dark ? "text-emerald-900" : "border border-emerald-300/[0.12] bg-emerald-300/[0.03] text-emerald-100"}`}>
      <CheckCircle2 size={16} />
      <span>{text}</span>
    </div>
  );
}

function FormalStep({ number, title, formula, note }: { number: string; title: string; formula: string; note: string }) {
  return (
    <div className="min-h-[190px] border-b border-white/[0.08] p-6 odd:sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0">
      <span className="font-mono text-[11px] font-semibold text-orange-200/65">{number}</span>
      <h3 className="mt-3 text-[18px] font-semibold text-white">{title}</h3>
      <div className="mt-3 font-mono text-[15px] font-semibold text-orange-100">{formula}</div>
      <p className="mt-3 text-[15px] leading-6 text-slate-300">{note}</p>
    </div>
  );
}
