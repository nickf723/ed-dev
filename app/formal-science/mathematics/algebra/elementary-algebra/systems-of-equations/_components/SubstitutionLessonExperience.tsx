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
          <div className="mx-auto mt-6 max-w-[760px] rounded-[18px] border border-cyan-200/[0.16] bg-cyan-300/[0.045] px-5 py-4 backdrop-blur-lg">
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-cyan-100">What are you trying to find?</div>
            <p className="mt-2 text-[16px] leading-7 text-slate-100">
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
              <button type="button" onClick={resetSandbox} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[11px] font-semibold text-slate-200 transition hover:border-white/[0.20] hover:text-white">
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
                        className={`rounded-lg border px-2.5 py-1.5 transition ${expressionSelected ? "border-orange-200/70 bg-orange-300/[0.14] text-orange-50 shadow-[0_0_24px_rgba(249,115,22,0.12)]" : "border-white/[0.12] text-slate-300"}`}
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
                  <div className="text-[14px] font-semibold text-white">Step 1: substitute.</div>
                  <p className="mt-2 text-[15px] leading-7 text-slate-200">
                    Equation 1 already says <span className="font-mono text-cyan-100">y = x + 1</span>. Equal quantities can replace one another, so the <span className="font-mono text-orange-100">y</span> in Equation 2 can become <span className="font-mono text-cyan-100">x + 1</span> without changing the solution.
                  </p>
                  <p className="mt-3 text-[14px] font-semibold leading-6 text-orange-100">
                    Click <span className="font-mono">x + 1</span>, then click the <span className="font-mono">y</span> in Equation 2.
                  </p>
                </div>
              ) : (
                <div className="mx-auto mt-8 max-w-[800px]">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/[0.24] bg-cyan-300/[0.06] text-cyan-100"><Equal size={16} /></span>
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-cyan-100">One variable remains</div>
                      <p className="mt-1 text-[15px] leading-6 text-slate-200">Read downward: whole-number steps are equations; half-steps explain the transformation between them.</p>
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
            <p className="text-[17px] leading-8 text-slate-100">
              The replacement works because Equation 1 tells us that <span className="font-mono text-cyan-100">y</span> and <span className="font-mono text-cyan-100">x + 1</span> have the same value for every solution of that equation.
            </p>
            <p className="mt-4 text-[16px] leading-7 text-slate-200">
              Replacing one with the other is called <strong className="text-orange-100">substitution</strong>. The substitution itself is only the first move. Its purpose is to turn a two-variable system into an ordinary one-variable equation that you can solve with equality-preserving moves.
            </p>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="formal" accentRgb={ACCENT}>
          <div className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.24] backdrop-blur-lg">
            <div className="grid sm:grid-cols-2">
              <FormalStep number="01" title="Choose the easy equation" formula="y = expression" note="Look for a variable that is already isolated, or isolate one first." />
              <FormalStep number="02" title="Substitute" formula="replace y with that expression" note="Equal quantities may replace one another. Use parentheses to keep a multi-term expression together." />
              <FormalStep number="03" title="Solve" formula="one variable remains" note="Simplify expressions, then undo operations with equal moves on both sides." />
              <FormalStep number="04" title="Back-substitute + check" formula="solution = (x, y)" note="Find the second coordinate, then verify the ordered pair in both originals." />
            </div>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="pitfall" accentRgb={ACCENT}>
          <div className="rounded-[22px] border border-amber-200/[0.16] bg-amber-300/[0.045] p-6 backdrop-blur-lg">
            <div className="flex gap-4">
              <TriangleAlert size={24} className="mt-0.5 shrink-0 text-amber-200" />
              <div>
                <h2 className="text-[20px] font-semibold text-white">Substitute the whole expression.</h2>
                <p className="mt-3 text-[16px] leading-7 text-slate-100">
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
              <button type="button" onClick={resetApplication} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[11px] font-semibold text-slate-200 transition hover:border-white/[0.20] hover:text-white">
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
                        className={`mx-1 rounded-lg border px-2 py-1.5 transition ${applicationExpressionSelected ? "border-orange-200/70 bg-orange-300/[0.14] text-orange-50" : "border-white/[0.12] text-slate-300"}`}
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
                <div className="mx-auto mt-6 max-w-[640px] rounded-[18px] border border-white/[0.10] bg-black/[0.20] p-4 text-center text-[15px] leading-6 text-slate-200">
                  Start by selecting the expression equal to <span className="font-mono text-cyan-100">x</span>, then place it on <span className="font-mono text-orange-100">x</span> in Equation 2.
                </div>
              ) : (
                <div className="mx-auto mt-8 max-w-[800px]">
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
    <div className={`mx-auto overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#080b10]/82 text-slate-100 shadow-[0_20px_65px_rgba(0,0,0,0.22)] backdrop-blur-xl ${compact ? "max-w-[720px]" : "max-w-[820px]"}`}>
      <div className="border-b border-white/[0.08] bg-white/[0.025] px-5 py-4 sm:px-7">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange-200/80">{eyebrow}</div>
        <p className={`mt-2 font-medium leading-7 text-slate-100 ${compact ? "text-[15px]" : "text-[17px] sm:text-[18px]"}`}>{instruction}</p>
      </div>
      <div className={`flex items-center gap-5 px-6 sm:px-8 ${compact ? "py-5" : "py-7"}`}>
        <div className="text-[46px] font-light leading-none text-orange-200/45">&#123;</div>
        <div className={`space-y-2 font-mono font-semibold tracking-[-0.02em] text-white ${compact ? "text-[20px]" : "text-[23px] sm:text-[25px]"}`}>
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
              <div className={`text-[11px] font-semibold ${done ? "text-emerald-200" : active ? "text-orange-100" : "text-slate-400"}`}>{index + 1}. {label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AlgebraWorkbench({ stage, onAdvance }: { stage: number; onAdvance: () => void }) {
  return (
    <DerivationFrame title="Guided derivation" note="Whole numbers are equation states. Half-steps explain the move that transforms one state into the next.">
      <EquationStep number="1" equation="2x + (x + 1) = 7" />
      <ProcessStep
        number="1.5"
        title="Combine like terms"
        detail="The parentheses are being added, so opening them does not change their signs. Now 2x and x describe the same kind of quantity: three x's altogether."
        active={stage === 1}
        complete={stage > 1}
        onClick={onAdvance}
        visual={<MiniTransform before="2x + x" after="3x" />}
      />

      {stage >= 2 ? <EquationStep number="2" equation="3x + 1 = 7" /> : null}
      {stage >= 2 ? (
        <ProcessStep
          number="2.5"
          title="Subtract 1 from both sides"
          detail="An equation is a balance statement. Doing the same thing to both sides preserves that equality while undoing the +1 beside 3x."
          active={stage === 2}
          complete={stage > 2}
          onClick={onAdvance}
          visual={<BothSidesVisual left="− 1" right="− 1" />}
        />
      ) : null}

      {stage >= 3 ? <EquationStep number="3" equation="3x = 6" /> : null}
      {stage >= 3 ? (
        <ProcessStep
          number="3.5"
          title="Divide both sides by 3"
          detail="3x means three equal copies of x. Dividing each side into three equal groups leaves one x on the left and 2 on the right."
          active={stage === 3}
          complete={stage > 3}
          onClick={onAdvance}
          visual={<DivisionVisual leftTop="3x" rightTop="6" denominator="3" />}
        />
      ) : null}

      {stage >= 4 ? <EquationStep number="4" equation="x = 2" emphasis /> : null}
      {stage >= 4 ? (
        <ProcessStep
          number="4.5"
          title="Back-substitute"
          detail="Once x is known, Equation 1 is no longer algebra with two unknowns. It becomes ordinary arithmetic."
          active={stage === 4}
          complete={stage > 4}
          onClick={onAdvance}
          visual={<MiniTransform before="y = x + 1" after="y = 2 + 1" />}
        />
      ) : null}

      {stage >= 5 ? <EquationStep number="5" equation="y = 3" emphasis /> : null}
      {stage >= 5 ? (
        <ProcessStep
          number="5.5"
          title="Write the ordered pair, then check"
          detail="A system solution is a pair. It only counts if that same pair makes both original equations true."
          active={stage === 5}
          complete={stage > 5}
          onClick={onAdvance}
          visual={<div className="font-mono text-[22px] font-bold text-emerald-100">(2, 3)</div>}
        />
      ) : null}

      {stage >= 6 ? (
        <>
          <EquationStep number="6" equation="(2, 3)" emphasis />
          <CheckBlock lines={["Equation 1: 3 = 2 + 1", "Equation 2: 2(2) + 3 = 7"]} conclusion="Both originals are true, so (2, 3) is the solution." />
        </>
      ) : null}
    </DerivationFrame>
  );
}

function ApplicationWorkbench({ stage, onAdvance }: { stage: number; onAdvance: () => void }) {
  return (
    <DerivationFrame title="Your derivation" note="Use the same rhythm, but watch how a coefficient outside parentheses creates an extra step.">
      <EquationStep number="1" equation="2(y + 4) + y = 14" />
      <ProcessStep
        number="1.5"
        title="Distribute the 2"
        detail="The 2 multiplies the entire expression in parentheses, so it must reach both terms: y and 4."
        active={stage === 1}
        complete={stage > 1}
        onClick={onAdvance}
        visual={<DistributionVisual />}
      />

      {stage >= 2 ? <EquationStep number="2" equation="2y + 8 + y = 14" /> : null}
      {stage >= 2 ? (
        <ProcessStep
          number="2.5"
          title="Combine like terms"
          detail="2y and y are both y-terms. Together they make 3y. The constant 8 cannot combine with them."
          active={stage === 2}
          complete={stage > 2}
          onClick={onAdvance}
          visual={<MiniTransform before="2y + y" after="3y" />}
        />
      ) : null}

      {stage >= 3 ? <EquationStep number="3" equation="3y + 8 = 14" /> : null}
      {stage >= 3 ? (
        <ProcessStep
          number="3.5"
          title="Subtract 8 from both sides"
          detail="Subtracting 8 undoes the +8 on the left. Matching the subtraction on the right keeps the equation balanced."
          active={stage === 3}
          complete={stage > 3}
          onClick={onAdvance}
          visual={<BothSidesVisual left="− 8" right="− 8" />}
        />
      ) : null}

      {stage >= 4 ? <EquationStep number="4" equation="3y = 6" /> : null}
      {stage >= 4 ? (
        <ProcessStep
          number="4.5"
          title="Divide both sides by 3"
          detail="The coefficient 3 means three copies of y. Divide both sides into three equal groups to isolate one y."
          active={stage === 4}
          complete={stage > 4}
          onClick={onAdvance}
          visual={<DivisionVisual leftTop="3y" rightTop="6" denominator="3" />}
        />
      ) : null}

      {stage >= 5 ? <EquationStep number="5" equation="y = 2" emphasis /> : null}
      {stage >= 5 ? (
        <ProcessStep
          number="5.5"
          title="Back-substitute"
          detail="Now use the isolated equation x = y + 4. Replacing y with 2 turns it into arithmetic."
          active={stage === 5}
          complete={stage > 5}
          onClick={onAdvance}
          visual={<MiniTransform before="x = y + 4" after="x = 2 + 4" />}
        />
      ) : null}

      {stage >= 6 ? <EquationStep number="6" equation="x = 6" emphasis /> : null}
      {stage >= 6 ? (
        <ProcessStep
          number="6.5"
          title="Write the ordered pair, then check"
          detail="Ordered pairs are always written (x, y), even though this time you solved for y first."
          active={stage === 6}
          complete={stage > 6}
          onClick={onAdvance}
          visual={<div className="font-mono text-[22px] font-bold text-emerald-100">(6, 2)</div>}
        />
      ) : null}

      {stage >= 7 ? (
        <>
          <EquationStep number="7" equation="(6, 2)" emphasis />
          <CheckBlock lines={["Equation 1: 6 = 2 + 4", "Equation 2: 2(6) + 2 = 14"]} conclusion="Both originals are true, so (6, 2) is the solution." />
        </>
      ) : null}
    </DerivationFrame>
  );
}

function DerivationFrame({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#080b10]/90 shadow-[0_22px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl">
      <div className="border-b border-white/[0.08] bg-white/[0.02] px-5 py-4 sm:px-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.10em] text-orange-200/80">{title}</div>
        <p className="mt-1 max-w-2xl text-[15px] leading-6 text-slate-200">{note}</p>
      </div>
      <div className="grid gap-y-3 px-4 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(230px,0.72fr)] sm:gap-x-5 sm:px-6 sm:py-6">
        {children}
      </div>
    </div>
  );
}

function EquationStep({ number, equation, emphasis = false }: { number: string; equation: ReactNode; emphasis?: boolean }) {
  return (
    <div className="sm:col-start-1">
      <div className={`rounded-[18px] border px-4 py-4 sm:px-5 ${emphasis ? "border-emerald-300/[0.22] bg-emerald-300/[0.055]" : "border-white/[0.10] bg-black/[0.20]"}`}>
        <div className={`text-[11px] font-bold uppercase tracking-[0.10em] ${emphasis ? "text-emerald-200" : "text-slate-400"}`}>Step {number}</div>
        <div className={`mt-2 font-mono text-[23px] font-bold tracking-[-0.025em] sm:text-[27px] ${emphasis ? "text-emerald-50" : "text-white"}`}>{equation}</div>
      </div>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  detail,
  visual,
  active,
  complete,
  onClick,
}: {
  number: string;
  title: string;
  detail: string;
  visual?: ReactNode;
  active: boolean;
  complete: boolean;
  onClick: () => void;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-bold text-orange-200/80">{number}</span>
        {complete ? <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-200"><CheckCircle2 size={12} /> done</span> : null}
      </div>
      <div className="mt-2 text-[16px] font-bold text-white">{title}</div>
      {visual ? <div className="mt-3 rounded-[14px] border border-white/[0.08] bg-black/[0.22] px-3 py-3">{visual}</div> : null}
      <p className="mt-3 text-[13px] leading-6 text-slate-200">{detail}</p>
      {active ? <div className="mt-3 text-[12px] font-bold text-orange-100">Apply this move →</div> : null}
    </>
  );

  return (
    <div className="sm:col-start-2 sm:-my-1 sm:self-center">
      {active ? (
        <button type="button" onClick={onClick} className="w-full rounded-[18px] border border-orange-300/[0.28] bg-orange-300/[0.065] p-4 text-left shadow-[0_12px_34px_rgba(0,0,0,0.16)] transition hover:border-orange-200/[0.46] hover:bg-orange-300/[0.09]">
          {content}
        </button>
      ) : (
        <div className="rounded-[18px] border border-white/[0.09] bg-white/[0.025] p-4 text-left opacity-80">
          {content}
        </div>
      )}
    </div>
  );
}

function MiniTransform({ before, after }: { before: string; after: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[16px] font-bold">
      <span className="text-slate-200">{before}</span>
      <span className="text-orange-200">→</span>
      <span className="text-orange-100">{after}</span>
    </div>
  );
}

function BothSidesVisual({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 font-mono text-[19px] font-bold text-orange-100">
      <span className="text-right">{left}</span>
      <span className="text-slate-500">=</span>
      <span className="text-left">{right}</span>
    </div>
  );
}

function DivisionVisual({ leftTop, rightTop, denominator }: { leftTop: string; rightTop: string; denominator: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 font-mono font-bold text-orange-100">
      <Fraction top={leftTop} bottom={denominator} align="right" />
      <span className="text-[19px] text-slate-500">=</span>
      <Fraction top={rightTop} bottom={denominator} align="left" />
    </div>
  );
}

function Fraction({ top, bottom, align }: { top: string; bottom: string; align: "left" | "right" }) {
  return (
    <span className={`inline-flex min-w-[58px] flex-col ${align === "right" ? "justify-self-end" : "justify-self-start"}`}>
      <span className="border-b border-orange-200/70 px-2 pb-1 text-center text-[17px]">{top}</span>
      <span className="px-2 pt-1 text-center text-[17px]">{bottom}</span>
    </span>
  );
}

function DistributionVisual() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[62px] w-[170px] font-mono text-[21px] font-bold text-white">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap">2(y + 4)</div>
        <svg className="absolute inset-x-0 top-0 h-9 w-full" viewBox="0 0 170 36" aria-hidden="true">
          <path d="M35 30 C48 8 72 8 84 28" fill="none" stroke="rgba(249,115,22,0.82)" strokeWidth="2" strokeLinecap="round" />
          <path d="M35 30 C65 0 112 2 133 28" fill="none" stroke="rgba(249,115,22,0.68)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="35" cy="30" r="2.5" fill="rgb(249,115,22)" />
        </svg>
      </div>
      <div className="mt-2 font-mono text-[16px] font-bold text-orange-100">2·y + 2·4</div>
    </div>
  );
}

function CheckBlock({ lines, conclusion }: { lines: string[]; conclusion: string }) {
  return (
    <div className="sm:col-span-2 mt-1 rounded-[18px] border border-emerald-300/[0.18] bg-emerald-300/[0.045] p-4 sm:p-5">
      <div className="space-y-2">
        {lines.map((line) => <CheckLine key={line} text={line} />)}
      </div>
      <p className="mt-3 text-[14px] font-semibold text-emerald-100">{conclusion}</p>
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
        <p className="mt-2 text-[15px] leading-7 text-slate-200">Solve each system by substitution on paper or in your notebook. Show the substitution, solve, back-substitute, and check.</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {problems.map((problem, index) => (
          <div key={problem[0]} className="rounded-[18px] border border-white/[0.12] bg-black/[0.20] p-5">
            <div className="text-[11px] font-semibold text-slate-300">{index + 1}.</div>
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
      <div className="text-[11px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgba(${accent},0.95)` }}>{label}</div>
      <div className="mt-4 font-mono text-[22px] font-semibold leading-relaxed text-white sm:text-[24px]">{children}</div>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[12px] border border-emerald-300/[0.12] bg-black/[0.16] px-3 py-2.5 font-mono text-[15px] font-semibold text-emerald-50">
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
      <p className="mt-3 text-[15px] leading-6 text-slate-200">{note}</p>
    </div>
  );
}
