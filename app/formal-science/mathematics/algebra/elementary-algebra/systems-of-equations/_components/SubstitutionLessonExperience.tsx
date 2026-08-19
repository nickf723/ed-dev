"use client";

import { useState, type ReactNode } from "react";
import {
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  Sparkles,
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

const ACCENT = "249, 115, 22";
const CYAN = "34, 211, 238";

export default function SubstitutionLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [sandboxStage, setSandboxStage] = useState(0);
  const [expressionSelected, setExpressionSelected] = useState(false);
  const [xValue, setXValue] = useState(0);
  const [applicationInserted, setApplicationInserted] = useState(false);
  const [applicationY, setApplicationY] = useState(0);
  const [applicationComplete, setApplicationComplete] = useState(false);

  const sandboxLeft = 2 * xValue + (xValue + 1);
  const xBalances = xValue === 2;
  const applicationLeft = 2 * (applicationY + 4) + applicationY;
  const applicationBalances = applicationY === 2;

  function resetSandbox() {
    setSandboxStage(0);
    setExpressionSelected(false);
    setXValue(0);
  }

  return (
    <SystemsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="03"
      title="Substitution"
      subtitle="Use one equality to rewrite another constraint, reducing a two-variable system to one variable without changing its shared solution."
      eyebrow="Discover equal replacements"
      accentRgb={ACCENT}
      base="#160a03"
      icon={RefreshCw}
      practiceId="substitution-application"
    >
      <div className="mt-5 space-y-7">
        <DiscoveryLessonBlock kind="phenomenon" accentRgb={ACCENT}>
          <div className="grid gap-4 border-y border-orange-200/[0.10] bg-black/[0.12] px-4 py-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center sm:px-5">
            <h2 className="max-w-4xl text-[clamp(1.65rem,3vw,2.65rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
              Two equations are both true at the same point. One of them already tells you exactly what <span className="text-cyan-200">y</span> is.
            </h2>
            <p className="text-[12px] leading-6 text-slate-400">
              Can that information be inserted into the other equation so one unknown disappears, without changing the solution the two equations share?
            </p>
          </div>
        </DiscoveryLessonBlock>

        <DiscoveryLessonBlock kind="sandbox" accentRgb={ACCENT}>
          <section className="overflow-hidden rounded-[28px] border border-orange-200/[0.13] bg-black/[0.20] shadow-[0_26px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
            <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-orange-200/64">Constraint compressor</div>
                <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.03em] text-white">Make one variable disappear.</h2>
              </div>
              <button type="button" onClick={resetSandbox} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.08] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.09em] text-slate-500 transition hover:bg-white/[0.03] hover:text-slate-300">
                <RotateCcw size={12} /> reset
              </button>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.78fr)]">
              <div className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <EquationPanel label="Constraint A" accent={CYAN}>
                    <span className="text-slate-300">y = </span>
                    <button
                      type="button"
                      onClick={() => sandboxStage === 0 && setExpressionSelected((value) => !value)}
                      className={`rounded-lg border px-2 py-1 transition ${expressionSelected ? "border-cyan-300/40 bg-cyan-300/[0.08] text-cyan-100" : "border-cyan-300/[0.14] bg-cyan-300/[0.025] text-cyan-200"}`}
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
                          className={`rounded-lg border px-2 py-1 transition ${expressionSelected ? "border-orange-300/45 bg-orange-300/[0.09] text-orange-100 shadow-[0_0_24px_rgba(249,115,22,0.10)]" : "border-white/[0.08] text-slate-500"}`}
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
                  <div className="mt-5 rounded-[18px] border border-white/[0.07] bg-black/[0.12] p-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-slate-600">Try this</div>
                    <p className="mt-2 text-[12px] leading-5 text-slate-400">
                      Click the expression that names <span className="text-cyan-200">y</span>, then place it on the <span className="text-orange-200">y</span> in the other constraint.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 rounded-[18px] border border-cyan-200/[0.10] bg-cyan-300/[0.02] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.11em] text-cyan-200/55">Unknowns left</span>
                        <strong className="mt-1 block text-[28px] tracking-[-0.04em] text-white">1</strong>
                      </span>
                      <span className="font-mono text-[13px] text-cyan-100">2x + (x + 1) = 7</span>
                    </div>
                    <p className="mt-2 text-[11px] leading-5 text-slate-500">Nothing was discarded. Constraint A was carried into Constraint B as an equal expression.</p>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6">
                {sandboxStage === 0 ? (
                  <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                    <Sparkles size={22} className="text-orange-300/55" />
                    <p className="mt-3 max-w-xs text-[12px] leading-5 text-slate-500">The explanation comes after the move. First discover which object can replace which.</p>
                  </div>
                ) : sandboxStage === 1 ? (
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-orange-200/55">Now solve by exploration</div>
                    <h3 className="mt-1 text-[19px] font-semibold text-white">Move x until the rewritten constraint balances.</h3>
                    <div className="mt-5 rounded-[20px] border border-white/[0.07] bg-black/[0.14] p-4">
                      <div className="flex items-end justify-between gap-4">
                        <span><span className="block text-[9px] uppercase tracking-[0.1em] text-slate-600">x</span><strong className="text-[30px] text-white">{xValue}</strong></span>
                        <span className="text-right"><span className="block text-[9px] uppercase tracking-[0.1em] text-slate-600">left side</span><strong className={`text-[30px] ${xBalances ? "text-emerald-300" : "text-orange-200"}`}>{sandboxLeft}</strong><span className="ml-2 text-[18px] text-slate-600">/ 7</span></span>
                      </div>
                      <input type="range" min={-2} max={6} step={1} value={xValue} onChange={(event) => setXValue(Number(event.target.value))} className="mt-5 w-full accent-orange-500" />
                    </div>
                    {xBalances ? (
                      <button type="button" onClick={() => setSandboxStage(2)} className="mt-4 w-full rounded-[15px] border border-emerald-300/[0.22] bg-emerald-300/[0.045] px-4 py-3 text-[11px] font-semibold text-emerald-200">
                        Lock in x = 2
                      </button>
                    ) : (
                      <p className="mt-3 text-[10px] leading-5 text-slate-600">You are solving the transformed one-variable equation by finding the value that makes both sides equal.</p>
                    )}
                  </div>
                ) : sandboxStage === 2 ? (
                  <div className="flex min-h-[280px] flex-col justify-center">
                    <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-cyan-200/55">One coordinate found</div>
                    <div className="mt-3 grid gap-3">
                      <ResultLine label="x" value="2" accent={ACCENT} />
                      <ResultLine label="Use Constraint A" value="y = 2 + 1 = 3" accent={CYAN} />
                    </div>
                    <button type="button" onClick={() => setSandboxStage(3)} className="mt-4 rounded-[15px] border border-cyan-300/[0.20] bg-cyan-300/[0.035] px-4 py-3 text-[11px] font-semibold text-cyan-100">
                      Verify (2, 3) in both originals
                    </button>
                  </div>
                ) : (
                  <div className="flex min-h-[280px] flex-col justify-center">
                    <div className="flex items-center gap-2 text-emerald-200"><CheckCircle2 size={17} /><strong className="text-[13px]">Shared solution preserved</strong></div>
                    <div className="mt-4 space-y-2 font-mono text-[12px]">
                      <CheckLine text="3 = 2 + 1" />
                      <CheckLine text="2(2) + 3 = 7" />
                    </div>
                    <div className="mt-5 rounded-[17px] border border-emerald-300/[0.13] bg-emerald-300/[0.025] p-4">
                      <div className="text-[9px] uppercase tracking-[0.11em] text-emerald-200/55">Intersection</div>
                      <div className="mt-1 text-[28px] font-semibold tracking-[-0.04em] text-white">(2, 3)</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </DiscoveryLessonBlock>

        {sandboxStage >= 1 ? (
          <DiscoveryLessonBlock kind="bridge" accentRgb={ACCENT}>
            <div className="max-w-4xl rounded-[24px] border border-white/[0.07] bg-black/[0.14] px-5 py-5 backdrop-blur-xl">
              <p className="text-[14px] leading-7 text-slate-300">
                You just used an equality as a replacement license. Because <span className="font-mono text-cyan-200">y = x + 1</span>, the symbols <span className="font-mono text-cyan-200">y</span> and <span className="font-mono text-cyan-200">x + 1</span> name the same value at every solution of that equation.
              </p>
              <p className="mt-3 text-[13px] leading-6 text-slate-500">
                That move is <strong className="text-orange-100">substitution</strong>. Its power is not the symbol swap itself. It compresses two simultaneous constraints into one equation with fewer unknowns while preserving the intersection you are trying to find.
              </p>
            </div>
          </DiscoveryLessonBlock>
        ) : null}

        {sandboxStage >= 2 ? (
          <DiscoveryLessonBlock kind="formal" accentRgb={ACCENT}>
            <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
              <div className="grid sm:grid-cols-2 xl:grid-cols-4">
                <FormalStep number="01" title="Expose an equality" formula="y = E" note="Isolate a variable or use one that already is." />
                <FormalStep number="02" title="Replace equal with equal" formula="... y ... → ... (E) ..." note="Use parentheses when the expression is multiplied, divided, or negated." />
                <FormalStep number="03" title="Solve one variable" formula="one unknown remains" note="Now ordinary equation-solving tools apply." />
                <FormalStep number="04" title="Recover + verify" formula="(x, y)" note="Find the second coordinate and test the pair in both originals." />
              </div>
            </div>
          </DiscoveryLessonBlock>
        ) : null}

        {sandboxStage >= 3 ? (
          <>
            <DiscoveryLessonBlock kind="pitfall" accentRgb={ACCENT}>
              <div className="grid gap-4 rounded-[24px] border border-amber-200/[0.11] bg-amber-300/[0.025] p-5 backdrop-blur-xl lg:grid-cols-[52px_minmax(0,1fr)]">
                <TriangleAlert size={22} className="text-amber-300/70" />
                <div>
                  <h2 className="text-[17px] font-semibold text-white">Substitute the whole expression, not just part of it.</h2>
                  <p className="mt-2 text-[12px] leading-6 text-slate-500">
                    If <span className="font-mono text-cyan-200">x = y + 4</span>, then <span className="font-mono text-orange-200">2x + y</span> becomes <span className="font-mono text-emerald-200">2(y + 4) + y</span>, not <span className="font-mono text-rose-200">2y + 4 + y</span>. The coefficient multiplies the entire replacement.
                  </p>
                </div>
              </div>
            </DiscoveryLessonBlock>

            <DiscoveryLessonBlock kind="application" accentRgb={ACCENT} id="substitution-application">
              <section className="overflow-hidden rounded-[28px] border border-emerald-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
                <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-200/60"><Target size={12} /> Fresh system</div>
                    <h2 className="mt-2 text-[clamp(1.5rem,2.8vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Use the method in a new configuration.</h2>
                  </div>
                  <p className="text-[11px] leading-5 text-slate-500">No answer choices. Transform the system, find the balancing value, then recover the other coordinate.</p>
                </div>

                <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
                  <div className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r">
                    <div className="space-y-3 font-mono text-[17px]">
                      <div className="rounded-[16px] border border-cyan-200/[0.12] bg-cyan-300/[0.025] p-4 text-cyan-100">x = y + 4</div>
                      <div className="rounded-[16px] border border-orange-200/[0.12] bg-orange-300/[0.025] p-4 text-orange-100">
                        2{applicationInserted ? <span className="rounded-md border border-emerald-300/[0.20] bg-emerald-300/[0.04] px-1.5 py-0.5 text-emerald-100">(y + 4)</span> : <button type="button" onClick={() => setApplicationInserted(true)} className="rounded-md border border-orange-300/[0.25] px-1.5 py-0.5 text-orange-100 transition hover:bg-orange-300/[0.08]">x</button>} + y = 14
                      </div>
                    </div>
                    {!applicationInserted ? <p className="mt-3 text-[10px] leading-5 text-slate-600">Click the x that can be replaced using the first equality.</p> : null}
                  </div>

                  <div className="p-5 sm:p-6">
                    {!applicationInserted ? (
                      <div className="flex min-h-[190px] items-center justify-center text-center text-[11px] text-slate-600">Start by carrying the first constraint into the second.</div>
                    ) : !applicationComplete ? (
                      <div>
                        <div className="font-mono text-[12px] text-emerald-100">2(y + 4) + y = 14</div>
                        <div className="mt-5 flex items-end justify-between gap-4">
                          <span><span className="block text-[9px] uppercase tracking-[0.1em] text-slate-600">y</span><strong className="text-[29px] text-white">{applicationY}</strong></span>
                          <span className="text-right"><span className="block text-[9px] uppercase tracking-[0.1em] text-slate-600">left side</span><strong className={`text-[29px] ${applicationBalances ? "text-emerald-300" : "text-orange-200"}`}>{applicationLeft}</strong><span className="ml-2 text-slate-600">/ 14</span></span>
                        </div>
                        <input type="range" min={-2} max={6} step={1} value={applicationY} onChange={(event) => setApplicationY(Number(event.target.value))} className="mt-4 w-full accent-emerald-500" />
                        {applicationBalances ? <button type="button" onClick={() => setApplicationComplete(true)} className="mt-4 w-full rounded-[15px] border border-emerald-300/[0.22] bg-emerald-300/[0.045] px-4 py-3 text-[11px] font-semibold text-emerald-100">Recover x from x = y + 4</button> : null}
                      </div>
                    ) : (
                      <div className="flex min-h-[190px] flex-col justify-center">
                        <div className="flex items-center gap-2 text-emerald-200"><CheckCircle2 size={17} /><strong className="text-[13px]">Transfer complete</strong></div>
                        <div className="mt-4 font-mono text-[13px] text-slate-300">y = 2 → x = 6</div>
                        <div className="mt-2 font-mono text-[19px] text-white">solution: (6, 2)</div>
                        <p className="mt-3 text-[10px] leading-5 text-slate-600">The new system had the same structure but isolated a different variable. The replacement principle still worked.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </DiscoveryLessonBlock>
          </>
        ) : (
          <div id="substitution-application" className="scroll-mt-24 rounded-[18px] border border-dashed border-white/[0.07] px-4 py-3 text-center font-mono text-[9px] uppercase tracking-[0.10em] text-slate-700">
            More structure appears as you complete the sandbox.
          </div>
        )}
      </div>
    </SystemsLessonShell>
  );
}

function EquationPanel({ label, accent, children }: { label: string; accent: string; children: ReactNode }) {
  return (
    <div className="rounded-[18px] border p-4" style={{ borderColor: `rgba(${accent},0.13)`, background: `rgba(${accent},0.025)` }}>
      <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${accent},0.58)` }}>{label}</div>
      <div className="mt-3 font-mono text-[17px] text-white">{children}</div>
    </div>
  );
}

function ResultLine({ label, value, accent }: { label: string; value: string; accent: string }) {
  return <div className="rounded-[16px] border p-3" style={{ borderColor: `rgba(${accent},0.14)`, background: `rgba(${accent},0.025)` }}><div className="font-mono text-[8px] uppercase tracking-[0.10em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[14px]" style={{ color: `rgb(${accent})` }}>{value}</div></div>;
}

function CheckLine({ text }: { text: string }) {
  return <div className="flex items-center gap-2 rounded-[13px] border border-emerald-300/[0.09] bg-emerald-300/[0.02] px-3 py-2 text-emerald-100"><CheckCircle2 size={12} /><span>{text}</span></div>;
}

function FormalStep({ number, title, formula, note }: { number: string; title: string; formula: string; note: string }) {
  return (
    <div className="min-h-[160px] border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
      <span className="font-mono text-[8px] text-orange-200/40">{number}</span>
      <h3 className="mt-3 text-[13px] font-semibold text-white">{title}</h3>
      <div className="mt-2 font-mono text-[11px] text-orange-200">{formula}</div>
      <p className="mt-2 text-[10px] leading-5 text-slate-600">{note}</p>
    </div>
  );
}
