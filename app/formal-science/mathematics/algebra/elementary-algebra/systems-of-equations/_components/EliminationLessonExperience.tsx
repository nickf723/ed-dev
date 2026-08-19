"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CirclePlus,
  GitMerge,
  RotateCcw,
  Scale,
  Target,
  TriangleAlert,
} from "lucide-react";
import DiscoveryLessonBlock from "@/app/_components/DiscoveryLessonBlock";
import SystemsLessonShell, { type SystemsLessonNavItem } from "./SystemsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: SystemsLessonNavItem;
  next?: SystemsLessonNavItem;
  unitHref: string;
};

const ACCENT = "129, 140, 248";
const CYAN = "34, 211, 238";
const ORANGE = "249, 115, 22";
const GREEN = "52, 211, 153";

export default function EliminationLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [exampleStage, setExampleStage] = useState(0);
  const [practiceStage, setPracticeStage] = useState(0);
  const [scaleChoice, setScaleChoice] = useState<number | null>(null);

  function resetExample() {
    setExampleStage(0);
  }

  function resetPractice() {
    setPracticeStage(0);
    setScaleChoice(null);
  }

  const scaleChoices = [
    {
      label: "Multiply Equation 1 by −2",
      correct: true,
      feedback: "Yes. −2x will cancel +2x, and the −2 must multiply every term on both sides.",
    },
    {
      label: "Multiply only x in Equation 1 by −2",
      correct: false,
      feedback: "That changes the equation. A scale operation must reach every term on both sides of the equals sign.",
    },
    {
      label: "Add the equations immediately",
      correct: false,
      feedback: "That is legal, but it gives 3x + y = 11. Neither variable disappears, so prepare opposite coefficients first.",
    },
  ] as const;

  const selectedScale = scaleChoice === null ? null : scaleChoices[scaleChoice];

  return (
    <SystemsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="04"
      title="Elimination"
      subtitle="Add or scale whole equations so one variable becomes an additive inverse pair and disappears, leaving a simpler equation with the same shared solution."
      eyebrow="Solve a system algebraically"
      accentRgb={ACCENT}
      base="#08081a"
      icon={GitMerge}
      practiceId="elimination-application"
    >
      <div className="mt-10 space-y-16">
        <DiscoveryLessonBlock kind="phenomenon" accentRgb={ACCENT}>
          <TaskPrompt
            eyebrow="Worked Example 1"
            instruction="Solve the system of equations by elimination. Show your algebraic steps. State the solution as an ordered pair, then check it in both original equations."
            equationA="x + y = 7"
            equationB="x − y = 1"
          />
          <div className="mx-auto mt-6 max-w-[700px] rounded-[20px] border border-indigo-200/[0.14] bg-indigo-300/[0.04] px-5 py-5 backdrop-blur-xl">
            <div className="text-[12px] font-semibold uppercase tracking-[0.09em] text-indigo-100">Notice before you calculate</div>
            <p className="mt-2 text-[17px] leading-8 text-slate-100">
              One equation contains <span className="font-mono text-cyan-100">+y</span>; the other contains <span className="font-mono text-orange-100">−y</span>. What happens to that pair if the two true equations are added column by column?
            </p>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="sandbox" accentRgb={ACCENT}>
          <section className="overflow-hidden rounded-[28px] border border-indigo-200/[0.16] bg-[#080817]/88 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 border-b border-white/[0.09] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-200/80">Stack the equalities</div>
                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-white">Let the opposite terms erase each other.</h2>
              </div>
              <button type="button" onClick={resetExample} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[12px] font-semibold text-slate-200 transition hover:border-white/[0.22] hover:text-white">
                <RotateCcw size={14} /> Reset example
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="mx-auto max-w-[720px]">
                <EquationStack
                  first={{ x: "x", y: "+ y", rhs: "7", rgb: CYAN }}
                  second={{ x: "x", y: "− y", rhs: "1", rgb: ORANGE }}
                  showResult={exampleStage >= 1}
                  result={{ x: "2x", y: "0", rhs: "8" }}
                  cancelY={exampleStage >= 1}
                />

                <DerivationRail>
                  <StateStep number="1" title="Two true equations are aligned" equation="x + y = 7    and    x − y = 1" />

                  <MoveStep
                    number="1.5"
                    title="Add Equation 1 and Equation 2"
                    description="Add left side to left side and right side to right side. If A = B and C = D, then A + C = B + D."
                    active={exampleStage === 0}
                    complete={exampleStage >= 1}
                    onClick={() => setExampleStage(1)}
                    icon={<CirclePlus size={17} />}
                  >
                    <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-[14px] border border-white/[0.08] bg-black/[0.18] px-4 py-3 font-mono text-[18px] font-semibold">
                      <span className="text-right text-cyan-100">+y</span>
                      <span className="text-slate-500">+</span>
                      <span className="text-orange-100">(−y) = <span className="text-emerald-200">0</span></span>
                    </div>
                  </MoveStep>

                  {exampleStage >= 1 ? <StateStep number="2" title="One variable is gone" equation="2x = 8" emphasis /> : null}

                  {exampleStage >= 1 ? (
                    <MoveStep
                      number="2.5"
                      title="Divide both sides by 2"
                      description="The coefficient says there are two equal copies of x. Split both equal sides into two equal groups."
                      active={exampleStage === 1}
                      complete={exampleStage >= 2}
                      onClick={() => setExampleStage(2)}
                    >
                      <BalancedDivision left="2x" right="8" divisor="2" />
                    </MoveStep>
                  ) : null}

                  {exampleStage >= 2 ? <StateStep number="3" title="The x-coordinate is known" equation="x = 4" emphasis /> : null}

                  {exampleStage >= 2 ? (
                    <MoveStep
                      number="3.5"
                      title="Back-substitute x = 4"
                      description="Elimination found one coordinate. Put it into either original equation to recover the other."
                      active={exampleStage === 2}
                      complete={exampleStage >= 3}
                      onClick={() => setExampleStage(3)}
                    >
                      <div className="mt-4 space-y-2 font-mono text-[18px] font-semibold text-slate-100">
                        <div>4 + y = 7</div>
                        <div className="text-indigo-100">y = 3</div>
                      </div>
                    </MoveStep>
                  ) : null}

                  {exampleStage >= 3 ? <StateStep number="4" title="Write the ordered pair in (x, y) order" equation="(4, 3)" success /> : null}

                  {exampleStage >= 3 ? (
                    <MoveStep
                      number="4.5"
                      title="Check both original equations"
                      description="A system solution must make both original equalities true, not merely the equation produced during elimination."
                      active={exampleStage === 3}
                      complete={exampleStage >= 4}
                      onClick={() => setExampleStage(4)}
                      icon={<CheckCircle2 size={17} />}
                    />
                  ) : null}

                  {exampleStage >= 4 ? (
                    <div className="ml-0 rounded-[18px] border border-emerald-300/[0.18] bg-emerald-300/[0.05] p-5 sm:ml-[82px]">
                      <CheckLine text="Equation 1: 4 + 3 = 7" />
                      <CheckLine text="Equation 2: 4 − 3 = 1" />
                      <p className="mt-3 text-[15px] font-semibold text-emerald-100">Both are true. The shared solution is (4, 3).</p>
                    </div>
                  ) : null}
                </DerivationRail>
              </div>
            </div>
          </section>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="bridge" accentRgb={ACCENT}>
          <div className="mx-auto max-w-[760px] rounded-[22px] border border-white/[0.10] bg-black/[0.28] px-6 py-7 backdrop-blur-xl">
            <p className="text-[17px] leading-8 text-slate-100">
              <strong className="text-indigo-100">Elimination</strong> works because we combine entire equalities. At the system’s shared solution, both original equations are true. Adding two true equalities creates another true equality.
            </p>
            <p className="mt-4 text-[16px] leading-7 text-slate-200">
              We arrange the equations so one variable appears as additive inverses, such as <span className="font-mono text-cyan-100">+y</span> and <span className="font-mono text-orange-100">−y</span>. Their sum is zero, so that coordinate disappears from the new equation. The cancellation is ordinary arithmetic, not a special algebra trick.
            </p>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="formal" accentRgb={ACCENT}>
          <div className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.24] backdrop-blur-xl">
            <div className="grid sm:grid-cols-2">
              <FormalStep number="01" title="Align like terms" formula="x with x · y with y · constants with constants" note="Treat each equation as one complete equality." />
              <FormalStep number="02" title="Create opposites if needed" formula="multiply every term on both sides" note="Scaling an entire equation by the same nonzero factor preserves its solutions." />
              <FormalStep number="03" title="Combine the equations" formula="left + left = right + right" note="Choose addition or subtraction so one variable has coefficient 0." />
              <FormalStep number="04" title="Recover + verify" formula="solve → back-substitute → check" note="The final ordered pair must satisfy both original equations." />
            </div>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="pitfall" accentRgb={ACCENT}>
          <div className="rounded-[22px] border border-amber-200/[0.16] bg-amber-300/[0.045] p-6 backdrop-blur-xl">
            <div className="flex gap-4">
              <TriangleAlert size={24} className="mt-0.5 shrink-0 text-amber-200" />
              <div>
                <h2 className="text-[21px] font-semibold text-white">Scale the whole equation, not the convenient term.</h2>
                <p className="mt-3 text-[16px] leading-7 text-slate-100">
                  If you multiply an equation by <span className="font-mono text-indigo-100">−2</span>, that factor must reach every term on the left <strong className="text-white">and</strong> the right. Changing only one coefficient creates a different equation and can destroy the original solution set.
                </p>
              </div>
            </div>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="application" accentRgb={ACCENT} id="elimination-application">
          <section className="overflow-hidden rounded-[28px] border border-cyan-200/[0.14] bg-[#061015]/86 backdrop-blur-xl">
            <div className="flex flex-col gap-4 border-b border-white/[0.09] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-100"><Target size={14} /> Guided transfer</div>
                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-white">This time the coefficients are not opposites yet.</h2>
              </div>
              <button type="button" onClick={resetPractice} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[12px] font-semibold text-slate-200 transition hover:border-white/[0.22] hover:text-white">
                <RotateCcw size={14} /> Reset practice
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <TaskPrompt
                compact
                eyebrow="Practice Problem"
                instruction="Solve the system by elimination. First create opposite x-coefficients, then combine the equations."
                equationA="x + 2y = 7"
                equationB="2x − y = 4"
              />

              <div className="mx-auto mt-7 max-w-[760px]">
                {practiceStage === 0 ? (
                  <div className="rounded-[20px] border border-white/[0.10] bg-black/[0.22] p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/[0.20] bg-cyan-300/[0.05] text-cyan-100"><Scale size={17} /></span>
                      <div>
                        <h3 className="text-[18px] font-semibold text-white">Choose a legal move that will eliminate x.</h3>
                        <p className="mt-2 text-[15px] leading-7 text-slate-200">Equation 2 already has <span className="font-mono text-orange-100">+2x</span>. Create <span className="font-mono text-cyan-100">−2x</span> in the other row without changing its solutions.</p>
                      </div>
                    </div>
                    <div className="mt-5 grid gap-2">
                      {scaleChoices.map((item, index) => (
                        <button key={item.label} type="button" onClick={() => setScaleChoice(index)} className="rounded-[15px] border px-4 py-3 text-left text-[15px] font-semibold transition" style={{ borderColor: scaleChoice === index ? `rgba(${ACCENT},0.38)` : "rgba(255,255,255,0.09)", background: scaleChoice === index ? `rgba(${ACCENT},0.07)` : "rgba(0,0,0,0.14)", color: scaleChoice === index ? "rgb(224 231 255)" : "rgb(203 213 225)" }}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                    {selectedScale ? (
                      <div className={`mt-4 rounded-[16px] border p-4 ${selectedScale.correct ? "border-emerald-300/[0.18] bg-emerald-300/[0.04]" : "border-amber-300/[0.18] bg-amber-300/[0.04]"}`}>
                        <p className={`text-[15px] leading-7 ${selectedScale.correct ? "text-emerald-100" : "text-amber-100"}`}>{selectedScale.feedback}</p>
                        {selectedScale.correct ? <button type="button" onClick={() => setPracticeStage(1)} className="mt-4 rounded-xl border border-emerald-300/[0.22] bg-emerald-300/[0.05] px-4 py-2.5 text-[13px] font-semibold text-emerald-100">Apply −2 to Equation 1</button> : null}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <DerivationRail>
                    <StateStep number="1" title="Original system" equation="x + 2y = 7    and    2x − y = 4" />
                    <MoveStep number="1.5" title="Multiply all of Equation 1 by −2" description="The factor reaches x, 2y, and 7 because the whole equality is being scaled." complete active={false} icon={<Scale size={17} />}>
                      <DistributionFan />
                    </MoveStep>
                    <StateStep number="2" title="Prepared system" equation="−2x − 4y = −14    and    2x − y = 4" emphasis />

                    <MoveStep
                      number="2.5"
                      title="Add the prepared rows"
                      description="Now −2x and +2x are additive inverses, so the x-column collapses to zero."
                      active={practiceStage === 1}
                      complete={practiceStage >= 2}
                      onClick={() => setPracticeStage(2)}
                      icon={<CirclePlus size={17} />}
                    />
                    {practiceStage >= 2 ? <StateStep number="3" title="x has been eliminated" equation="−5y = −10" emphasis /> : null}

                    {practiceStage >= 2 ? (
                      <MoveStep
                        number="3.5"
                        title="Divide both sides by −5"
                        description="Five negative copies of y equal −10. Divide both equal sides by the same nonzero coefficient."
                        active={practiceStage === 2}
                        complete={practiceStage >= 3}
                        onClick={() => setPracticeStage(3)}
                      >
                        <BalancedDivision left="−5y" right="−10" divisor="−5" />
                      </MoveStep>
                    ) : null}
                    {practiceStage >= 3 ? <StateStep number="4" title="The y-value is known" equation="y = 2" emphasis /> : null}

                    {practiceStage >= 3 ? (
                      <MoveStep
                        number="4.5"
                        title="Back-substitute y = 2"
                        description="Use x + 2y = 7: x + 4 = 7, so x = 3. Ordered pairs are still written (x, y), even though y was solved first."
                        active={practiceStage === 3}
                        complete={practiceStage >= 4}
                        onClick={() => setPracticeStage(4)}
                      />
                    ) : null}
                    {practiceStage >= 4 ? <StateStep number="5" title="Shared solution" equation="(3, 2)" success /> : null}

                    {practiceStage >= 4 ? (
                      <MoveStep
                        number="5.5"
                        title="Verify in both originals"
                        description="Check the pair against the equations we started with, before any scaling or row addition."
                        active={practiceStage === 4}
                        complete={practiceStage >= 5}
                        onClick={() => setPracticeStage(5)}
                        icon={<CheckCircle2 size={17} />}
                      />
                    ) : null}
                    {practiceStage >= 5 ? (
                      <div className="ml-0 rounded-[18px] border border-emerald-300/[0.18] bg-emerald-300/[0.05] p-5 sm:ml-[82px]">
                        <CheckLine text="Equation 1: 3 + 2(2) = 7" />
                        <CheckLine text="Equation 2: 2(3) − 2 = 4" />
                      </div>
                    ) : null}
                  </DerivationRail>
                )}

                <HomeworkPractice />
              </div>
            </div>
          </section>
        </DiscoveryLessonBlock>
      </div>
    </SystemsLessonShell>
  );
}

function TaskPrompt({ eyebrow, instruction, equationA, equationB, compact = false }: { eyebrow: string; instruction: string; equationA: string; equationB: string; compact?: boolean }) {
  return (
    <div className={`mx-auto overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#090b16]/82 text-slate-100 shadow-[0_22px_65px_rgba(0,0,0,0.22)] backdrop-blur-xl ${compact ? "max-w-[720px]" : "max-w-[820px]"}`}>
      <div className="border-b border-white/[0.08] bg-white/[0.025] px-5 py-4 sm:px-7">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-indigo-200/80">{eyebrow}</div>
        <p className={`mt-2 font-medium leading-7 text-slate-100 ${compact ? "text-[16px]" : "text-[17px] sm:text-[18px]"}`}>{instruction}</p>
      </div>
      <div className={`flex items-center gap-5 px-6 sm:px-8 ${compact ? "py-5" : "py-7"}`}>
        <div className="text-[46px] font-light leading-none text-indigo-200/45">&#123;</div>
        <div className={`space-y-2 font-mono font-semibold tracking-[-0.02em] text-white ${compact ? "text-[21px]" : "text-[24px] sm:text-[26px]"}`}>
          <div>{equationA}</div>
          <div>{equationB}</div>
        </div>
      </div>
    </div>
  );
}

function EquationStack({ first, second, result, showResult, cancelY }: {
  first: { x: string; y: string; rhs: string; rgb: string };
  second: { x: string; y: string; rhs: string; rgb: string };
  result: { x: string; y: string; rhs: string };
  showResult: boolean;
  cancelY: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.22] px-4 py-5 sm:px-7">
      <div className="grid grid-cols-[1fr_1fr_30px_90px] items-center gap-2 font-mono text-[22px] font-semibold sm:text-[25px]">
        <span className="text-right" style={{ color: `rgb(${first.rgb})` }}>{first.x}</span>
        <span className={`text-right transition ${cancelY ? "line-through opacity-45" : ""}`} style={{ color: `rgb(${first.rgb})` }}>{first.y}</span>
        <span className="text-center text-slate-500">=</span>
        <span className="text-right text-white">{first.rhs}</span>

        <span className="text-right" style={{ color: `rgb(${second.rgb})` }}>{second.x}</span>
        <span className={`text-right transition ${cancelY ? "line-through opacity-45" : ""}`} style={{ color: `rgb(${second.rgb})` }}>{second.y}</span>
        <span className="text-center text-slate-500">=</span>
        <span className="text-right text-white">{second.rhs}</span>
      </div>
      <div className="mt-3 border-t border-indigo-200/[0.18]" />
      <div className={`grid grid-cols-[1fr_1fr_30px_90px] items-center gap-2 pt-3 font-mono text-[22px] font-semibold transition sm:text-[25px] ${showResult ? "opacity-100" : "opacity-20"}`}>
        <span className="text-right text-indigo-100">{showResult ? result.x : "?"}</span>
        <span className="text-right text-emerald-200">{showResult ? result.y : "?"}</span>
        <span className="text-center text-slate-500">=</span>
        <span className="text-right text-white">{showResult ? result.rhs : "?"}</span>
      </div>
    </div>
  );
}

function DerivationRail({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 space-y-3">{children}</div>;
}

function StateStep({ number, title, equation, emphasis = false, success = false }: { number: string; title: string; equation: string; emphasis?: boolean; success?: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[66px_1fr] sm:items-center">
      <div className="font-mono text-[12px] font-bold text-indigo-200/70 sm:text-right">{number}</div>
      <div className={`rounded-[18px] border px-5 py-4 ${success ? "border-emerald-300/[0.20] bg-emerald-300/[0.05]" : emphasis ? "border-indigo-300/[0.20] bg-indigo-300/[0.05]" : "border-white/[0.09] bg-black/[0.17]"}`}>
        <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-300">{title}</div>
        <div className={`mt-2 font-mono text-[21px] font-semibold sm:text-[24px] ${success ? "text-emerald-100" : emphasis ? "text-indigo-100" : "text-white"}`}>{equation}</div>
      </div>
    </div>
  );
}

function MoveStep({ number, title, description, active, complete, onClick, children, icon }: {
  number: string;
  title: string;
  description: string;
  active: boolean;
  complete: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[66px_1fr]">
      <div className="pt-4 font-mono text-[11px] font-bold text-cyan-200/65 sm:text-right">{number}</div>
      <div className={`ml-0 rounded-[18px] border px-5 py-4 sm:ml-8 ${complete ? "border-cyan-300/[0.16] bg-cyan-300/[0.035]" : "border-white/[0.09] bg-black/[0.18]"}`}>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-cyan-100">{icon ?? <GitMerge size={17} />}</span>
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-semibold text-white">{title}</h3>
            <p className="mt-1.5 text-[15px] leading-7 text-slate-200">{description}</p>
          </div>
        </div>
        {children}
        {active && onClick ? (
          <button type="button" onClick={onClick} className="mt-4 w-full rounded-xl border border-cyan-300/[0.20] bg-cyan-300/[0.05] px-4 py-3 text-[14px] font-semibold text-cyan-100 transition hover:bg-cyan-300/[0.09]">Perform this move</button>
        ) : null}
      </div>
    </div>
  );
}

function BalancedDivision({ left, right, divisor }: { left: string; right: string; divisor: string }) {
  return (
    <div className="mt-4 grid grid-cols-[1fr_32px_1fr] items-center gap-3 font-mono text-[19px] font-semibold text-indigo-100">
      <div className="text-center"><span className="inline-flex flex-col"><span className="border-b border-indigo-200/50 px-2 pb-1">{left}</span><span className="px-2 pt-1">{divisor}</span></span></div>
      <span className="text-center text-slate-500">=</span>
      <div className="text-center"><span className="inline-flex flex-col"><span className="border-b border-indigo-200/50 px-2 pb-1">{right}</span><span className="px-2 pt-1">{divisor}</span></span></div>
    </div>
  );
}

function DistributionFan() {
  return (
    <div className="relative mt-4 overflow-hidden rounded-[16px] border border-white/[0.08] bg-black/[0.18] px-4 pb-4 pt-10">
      <svg viewBox="0 0 560 82" className="absolute inset-x-0 top-0 h-16 w-full" aria-hidden="true">
        <path d="M110 18 C150 28 160 42 198 56" fill="none" stroke="rgba(34,211,238,.55)" strokeWidth="2" />
        <path d="M110 18 C220 22 265 38 318 56" fill="none" stroke="rgba(34,211,238,.42)" strokeWidth="2" />
        <path d="M110 18 C330 12 405 34 480 56" fill="none" stroke="rgba(34,211,238,.30)" strokeWidth="2" />
      </svg>
      <div className="grid grid-cols-3 gap-3 text-center font-mono text-[17px] font-semibold">
        <div><span className="text-cyan-100">−2·x</span><div className="mt-1 text-[12px] text-slate-400">−2x</div></div>
        <div><span className="text-cyan-100">−2·2y</span><div className="mt-1 text-[12px] text-slate-400">−4y</div></div>
        <div><span className="text-cyan-100">−2·7</span><div className="mt-1 text-[12px] text-slate-400">−14</div></div>
      </div>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return <div className="flex items-center gap-2 py-1.5 font-mono text-[16px] font-semibold text-emerald-100"><CheckCircle2 size={17} /><span>{text}</span></div>;
}

function FormalStep({ number, title, formula, note }: { number: string; title: string; formula: string; note: string }) {
  return (
    <div className="min-h-[190px] border-b border-white/[0.08] p-6 odd:sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0">
      <span className="font-mono text-[11px] font-semibold text-indigo-200/70">{number}</span>
      <h3 className="mt-3 text-[19px] font-semibold text-white">{title}</h3>
      <div className="mt-3 font-mono text-[15px] font-semibold text-indigo-100">{formula}</div>
      <p className="mt-3 text-[15px] leading-7 text-slate-200">{note}</p>
    </div>
  );
}

function HomeworkPractice() {
  const problems = [
    ["x + y = 9", "x − y = 3"],
    ["2x + y = 8", "−2x + 3y = 8"],
    ["3x + 2y = 16", "x − 2y = 0"],
    ["x + 3y = 11", "2x − y = 1"],
  ];
  return (
    <div className="mt-10 border-t border-white/[0.09] pt-8">
      <div className="max-w-2xl">
        <div className="text-[12px] font-semibold uppercase tracking-[0.10em] text-cyan-100">Independent practice</div>
        <h3 className="mt-2 text-[23px] font-semibold text-white">Now choose the cancellation strategy yourself.</h3>
        <p className="mt-2 text-[15px] leading-7 text-slate-200">Solve each system by elimination. Show any equation scaling, combine the rows, back-substitute, and check the ordered pair.</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {problems.map((problem, index) => (
          <div key={problem[0]} className="rounded-[18px] border border-white/[0.12] bg-black/[0.20] p-5">
            <div className="text-[12px] font-semibold text-slate-300">{index + 1}.</div>
            <div className="mt-3 space-y-1.5 font-mono text-[19px] font-semibold text-white">
              <div>{problem[0]}</div>
              <div>{problem[1]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
