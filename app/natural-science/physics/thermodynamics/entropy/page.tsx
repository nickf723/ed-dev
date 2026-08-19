"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BarChart3,
  CheckCircle2,
  Dices,
  Layers,
  MoveRight,
  RotateCcw,
  Scale,
  TriangleAlert,
} from "lucide-react";
import DiscoveryLessonBlock from "@/app/_components/DiscoveryLessonBlock";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import ThermoField from "../_components/ThermoField";

const ACCENT = "232, 121, 249";
const TOTAL = 12;
const MACROSTATES = [12, 10, 8, 6] as const;

export default function EntropyPage() {
  const [dividerOpen, setDividerOpen] = useState(false);
  const [selectedLeft, setSelectedLeft] = useState<number>(12);
  const [microVariant, setMicroVariant] = useState(0);
  const [auxOpen, setAuxOpen] = useState(true);
  const [transferLeft, setTransferLeft] = useState(8);
  const [transferResult, setTransferResult] = useState<"success" | "retry" | null>(null);

  const selectedOmega = choose(TOTAL, selectedLeft);
  const selectedProbability = selectedOmega / Math.pow(2, TOTAL);
  const selectedArrangement = useMemo(
    () => makeMicrostate(TOTAL, selectedLeft, microVariant),
    [selectedLeft, microVariant],
  );

  function inspectMacrostate(left: number) {
    setSelectedLeft(left);
    setMicroVariant(0);
  }

  function resetPhenomenon() {
    setDividerOpen(false);
    setSelectedLeft(12);
    setMicroVariant(0);
  }

  function testTransfer() {
    setTransferResult(transferLeft === 4 ? "success" : "retry");
  }

  function resetTransfer() {
    setTransferLeft(8);
    setTransferResult(null);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0710] text-slate-100 selection:bg-fuchsia-300/25">
      <ThermoField mode="entropy" intensity={0.92} />
      <div className="relative z-10 mx-auto w-full max-w-[1020px] px-4 pb-14 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#0a0710]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Thermodynamics", href: "/natural-science/physics/thermodynamics" },
              { label: "Entropy & Second Law" },
            ]}
            eyebrow="Thermodynamics · 05 / 06"
            icon={Dices}
            title={<span>Entropy & Second Law</span>}
            subtitle="Discover why macroscopic systems overwhelmingly drift toward some visible states rather than others by counting the microscopic ways those states can occur."
            accentRgb={ACCENT}
            titleClassName="font-mono text-[clamp(1.9rem,4.5vw,4.1rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff5ff]"
            headerClassName="border-transparent"
          />
        </div>

        <div className="mt-10 space-y-16">
          <DiscoveryLessonBlock kind="phenomenon" accentRgb={ACCENT}>
            <section className="mx-auto max-w-[820px] overflow-hidden rounded-[26px] border border-fuchsia-200/[0.14] bg-[#0b0812]/82 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <div className="border-b border-white/[0.08] px-5 py-5 sm:px-7">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-fuchsia-200/80">A statistical paradox</div>
                <h2 className="mt-2 text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-[-0.035em] text-white">
                  The particles are allowed to return to one side. So why don’t they?
                </h2>
                <p className="mt-3 max-w-3xl text-[17px] leading-8 text-slate-100">
                  Imagine twelve gas particles trapped in the left half of a box. Remove the divider and they spread through the whole box. Nothing in the microscopic laws says all twelve can never wander back left again, yet a macroscopic gas effectively never does.
                </p>
              </div>
              <div className="p-5 sm:p-7">
                <ParticleChamber
                  total={TOTAL}
                  leftCount={dividerOpen ? selectedLeft : TOTAL}
                  arrangement={dividerOpen ? selectedArrangement : Array.from({ length: TOTAL }, () => true)}
                  divider={!dividerOpen}
                  label={dividerOpen ? `${selectedLeft} left · ${TOTAL - selectedLeft} right` : "all 12 begin on the left"}
                />
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="max-w-[560px] text-[15px] leading-7 text-slate-200">
                    {dividerOpen
                      ? "The box is open. Instead of pretending to simulate trillions of collisions, compare the possible visible outcomes statistically."
                      : "Start with the deliberately unusual state, then remove the divider."}
                  </p>
                  <button
                    type="button"
                    onClick={() => (dividerOpen ? resetPhenomenon() : setDividerOpen(true))}
                    className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-300/[0.20] bg-fuchsia-300/[0.06] px-4 py-3 text-[14px] font-semibold text-fuchsia-100 transition hover:bg-fuchsia-300/[0.10]"
                  >
                    {dividerOpen ? <RotateCcw size={16} /> : <MoveRight size={16} />}
                    {dividerOpen ? "Reset box" : "Remove divider"}
                  </button>
                </div>
              </div>
            </section>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="sandbox" accentRgb={ACCENT} className="lg:-mx-10 xl:-mx-32">
            <section className="overflow-visible rounded-[28px] border border-white/[0.10] bg-[#090711]/86 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl">
              <div className="border-b border-white/[0.08] px-5 py-5 sm:px-7 lg:px-8">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-fuchsia-200/80">Multiplicity explorer</div>
                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-white">Keep the state in view while you change what surrounds it.</h2>
                <p className="mt-3 max-w-3xl text-[16px] leading-7 text-slate-200">
                  The chamber is the primary instrument. Macrostate choices and statistical readouts are auxiliary controls, so on wide screens they dock beside it instead of pushing it out of view.
                </p>
              </div>

              <div className="p-5 sm:p-7 lg:p-8">
                <div className={`grid items-start gap-5 ${auxOpen ? "lg:grid-cols-[minmax(0,1fr)_286px]" : "lg:grid-cols-[minmax(0,1fr)_58px]"}`}>
                  <div className="min-w-0 space-y-5">
                    <ParticleChamber
                      total={TOTAL}
                      leftCount={selectedLeft}
                      arrangement={selectedArrangement}
                      divider={false}
                      label={`${selectedLeft} left · ${TOTAL - selectedLeft} right`}
                    />

                    <div className="rounded-[22px] border border-white/[0.09] bg-black/[0.22] p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-100">One microscopic assignment</div>
                          <div className="mt-2 font-mono text-[20px] font-semibold text-white">Same {selectedLeft}|{TOTAL - selectedLeft} macrostate, different particle identities</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setMicroVariant((value) => value + 1)}
                          disabled={selectedLeft === 0 || selectedLeft === TOTAL}
                          className="rounded-xl border border-cyan-300/[0.16] bg-cyan-300/[0.04] px-3 py-2 text-[12px] font-semibold text-cyan-100 transition disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          Show another microstate
                        </button>
                      </div>
                      <MicrostateStrip arrangement={selectedArrangement} />
                      <p className="mt-4 text-[15px] leading-7 text-slate-200">
                        Blue and red record which side each numbered particle occupies. Cycle the identities and notice that the visible left/right count does not have to change.
                      </p>
                    </div>
                  </div>

                  <aside className="self-start lg:sticky lg:top-[184px]">
                    {auxOpen ? (
                      <div className="max-h-[calc(100vh-13rem)] overflow-y-auto rounded-[22px] border border-fuchsia-200/[0.13] bg-[#0b0812]/94 p-3 shadow-[0_18px_55px_rgba(0,0,0,0.30)] backdrop-blur-2xl [scrollbar-width:thin]">
                        <div className="mb-3 flex items-center justify-between gap-2 px-1">
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.10em] text-fuchsia-200/80">Macrostate sidecar</div>
                            <div className="mt-1 text-[11px] text-slate-500">Controls stay beside the chamber.</div>
                          </div>
                          <button type="button" onClick={() => setAuxOpen(false)} className="rounded-lg border border-white/[0.08] px-2 py-1.5 text-[10px] font-semibold text-slate-400 transition hover:text-white">Hide</button>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                          {MACROSTATES.map((left) => {
                            const omega = choose(TOTAL, left);
                            const selected = selectedLeft === left;
                            return (
                              <button
                                key={left}
                                type="button"
                                onClick={() => inspectMacrostate(left)}
                                className="rounded-[16px] border p-3 text-left transition"
                                style={{
                                  borderColor: selected ? "rgba(232,121,249,.38)" : "rgba(255,255,255,.08)",
                                  background: selected ? "rgba(232,121,249,.08)" : "rgba(0,0,0,.18)",
                                }}
                              >
                                <div className="flex items-baseline justify-between gap-2">
                                  <span className="font-mono text-[18px] font-semibold text-white">{left} | {TOTAL - left}</span>
                                  <span className="font-mono text-[10px] text-slate-500">Ω {formatNumber(omega)}</span>
                                </div>
                                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                                  <div className="h-full rounded-full bg-fuchsia-300/70" style={{ width: `${Math.max(3, (omega / choose(TOTAL, 6)) * 100)}%` }} />
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-3 grid gap-2">
                          <CompactReadout label="ways" value={formatNumber(selectedOmega)} rgb="232, 121, 249" />
                          <CompactReadout label="share of all 2¹² states" value={`${(selectedProbability * 100).toFixed(selectedProbability < 0.01 ? 3 : 1)}%`} rgb="250, 204, 21" />
                          <CompactReadout label="ln Ω" value={Math.log(selectedOmega).toFixed(2)} rgb="45, 212, 191" />
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAuxOpen(true)}
                        className="flex min-h-[180px] w-full items-center justify-center rounded-[18px] border border-fuchsia-200/[0.13] bg-[#0b0812]/92 px-2 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-fuchsia-100/80 shadow-[0_18px_50px_rgba(0,0,0,.24)] backdrop-blur-2xl lg:[writing-mode:vertical-rl]"
                      >
                        Show macrostate controls
                      </button>
                    )}
                  </aside>
                </div>
              </div>
            </section>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="bridge" accentRgb={ACCENT}>
            <div className="mx-auto max-w-[760px] rounded-[22px] border border-white/[0.10] bg-black/[0.28] px-6 py-7 backdrop-blur-xl">
              <p className="text-[17px] leading-8 text-slate-100">
                The visible count, such as <span className="font-mono text-fuchsia-100">6 left / 6 right</span>, is a <strong className="text-white">macrostate</strong>. A specific assignment saying exactly which numbered particles are left and right is a <strong className="text-white">microstate</strong>.
              </p>
              <p className="mt-4 text-[16px] leading-7 text-slate-200">
                The number of microstates compatible with one macrostate is its <strong className="text-fuchsia-100">multiplicity</strong>, written <span className="font-mono text-fuchsia-100">Ω</span>. For twelve particles, the perfectly split macrostate has <strong className="text-white">924</strong> possible assignments, while “all twelve left” has only <strong className="text-white">1</strong>.
              </p>
              <div className="mt-6 rounded-[18px] border border-fuchsia-300/[0.16] bg-fuchsia-300/[0.04] px-5 py-4">
                <div className="text-[12px] font-semibold uppercase tracking-[0.09em] text-fuchsia-200/80">Boltzmann gives the count a thermodynamic name</div>
                <div className="mt-3 text-[28px] text-white"><M>{"S = k_B \\ln \\Omega"}</M></div>
                <p className="mt-3 text-[15px] leading-7 text-slate-200">Greater multiplicity means greater entropy. The logarithm turns enormous multiplicative counts into an additive thermodynamic quantity.</p>
              </div>
            </div>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="formal" accentRgb={ACCENT}>
            <section className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.24] backdrop-blur-xl">
              <div className="border-b border-white/[0.08] px-5 py-5 sm:px-6">
                <h2 className="text-[22px] font-semibold text-white">From microscopic counting to the second law.</h2>
                <p className="mt-2 text-[15px] leading-7 text-slate-200">The statistical story is a sequence of increasingly strong statements.</p>
              </div>
              <div className="grid sm:grid-cols-2">
                <FormalStep number="01" title="Describe a macrostate" formula="coarse variables" note="Record macroscopic information such as particle counts, volume, energy, pressure, or temperature rather than every microscopic coordinate." />
                <FormalStep number="02" title="Count compatible microstates" formula="multiplicity = Ω" note="Many distinct microscopic arrangements can produce the same macroscopic appearance." />
                <FormalStep number="03" title="Weight the possibilities" formula="S = kB ln Ω" note="High-multiplicity macrostates occupy vastly more of the available microscopic state space." />
                <FormalStep number="04" title="Infer macroscopic direction" formula="isolated systems → overwhelmingly higher S" note="For macroscopic particle numbers, high-entropy equilibrium states dominate so strongly that spontaneous macroscopic reversal is effectively never observed." />
              </div>
            </section>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="pitfall" accentRgb={ACCENT}>
            <div className="rounded-[22px] border border-amber-200/[0.16] bg-amber-300/[0.045] p-6 backdrop-blur-xl">
              <div className="flex gap-4">
                <TriangleAlert size={24} className="mt-0.5 shrink-0 text-amber-200" />
                <div>
                  <h2 className="text-[21px] font-semibold text-white">Entropy is not literally “messiness.”</h2>
                  <p className="mt-3 text-[16px] leading-7 text-slate-100">
                    “Disorder” can be a loose intuition, but it is not the definition. Statistical entropy tracks how many microscopic states are compatible with the macroscopic constraints. A visually tidy state can have high entropy, and a subsystem can even decrease in entropy while its surroundings increase by more.
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-amber-100/90">
                    The second law is statistical, not a microscopic ban. Entropy-decreasing fluctuations are not mathematically impossible; for macroscopic systems they are fantastically improbable.
                  </p>
                </div>
              </div>
            </div>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="application" accentRgb={ACCENT} id="entropy-application">
            <section className="overflow-hidden rounded-[28px] border border-emerald-200/[0.14] bg-[#06100d]/86 backdrop-blur-xl">
              <div className="flex flex-col gap-4 border-b border-white/[0.09] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-100">Construct the favored macrostate</div>
                  <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-white">Arrange eight particles where you think multiplicity is greatest.</h2>
                </div>
                <button type="button" onClick={resetTransfer} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[12px] font-semibold text-slate-200 transition hover:border-white/[0.22] hover:text-white">
                  <RotateCcw size={14} /> Reset task
                </button>
              </div>

              <div className="p-5 sm:p-7">
                <p className="max-w-3xl text-[16px] leading-7 text-slate-100">
                  Start with all eight particles on the left. Move particles across until you have built the macrostate you predict can be realized by the greatest number of distinct microscopic assignments. Then test it.
                </p>

                <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
                  <TransferChamber leftCount={transferLeft} />
                  <div className="rounded-[20px] border border-white/[0.10] bg-black/[0.20] p-5">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.09em] text-emerald-100">Your macrostate</div>
                    <div className="mt-3 font-mono text-[27px] font-semibold text-white">{transferLeft} left | {8 - transferLeft} right</div>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => { setTransferLeft((value) => Math.max(0, value - 1)); setTransferResult(null); }}
                        disabled={transferLeft === 0}
                        className="rounded-xl border border-cyan-300/[0.16] bg-cyan-300/[0.04] px-3 py-3 text-[13px] font-semibold text-cyan-100 disabled:opacity-30"
                      >
                        Move one →
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTransferLeft((value) => Math.min(8, value + 1)); setTransferResult(null); }}
                        disabled={transferLeft === 8}
                        className="rounded-xl border border-fuchsia-300/[0.16] bg-fuchsia-300/[0.04] px-3 py-3 text-[13px] font-semibold text-fuchsia-100 disabled:opacity-30"
                      >
                        ← Move one
                      </button>
                    </div>
                    <button type="button" onClick={testTransfer} className="mt-3 w-full rounded-xl border border-emerald-300/[0.22] bg-emerald-300/[0.06] px-4 py-3 text-[14px] font-semibold text-emerald-100">Test this macrostate</button>

                    {transferResult ? (
                      <div className={`mt-4 rounded-[16px] border p-4 ${transferResult === "success" ? "border-emerald-300/[0.18] bg-emerald-300/[0.05]" : "border-amber-300/[0.18] bg-amber-300/[0.04]"}`}>
                        <div className={`flex items-center gap-2 text-[14px] font-semibold ${transferResult === "success" ? "text-emerald-100" : "text-amber-100"}`}>
                          {transferResult === "success" ? <CheckCircle2 size={17} /> : <Atom size={17} />}
                          {transferResult === "success" ? "Maximum multiplicity" : "Not the maximum yet"}
                        </div>
                        <p className="mt-2 text-[15px] leading-7 text-slate-100">
                          This {transferLeft}|{8 - transferLeft} macrostate has <strong>{choose(8, transferLeft)}</strong> microscopic assignments. {transferResult === "success" ? "The 4|4 split has 70, more than any other left/right count for eight particles." : "Move the count closer to an even split and the number of ways to choose which particles occupy each side increases."}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  <TransferPrompt title="Local decrease" text="A refrigerator creates a lower-entropy cold interior while dumping heat and more entropy into the room. Track the larger system before invoking the second law." />
                  <TransferPrompt title="First law vs second law" text="Energy conservation tells you what energy balances are allowed. Entropy tells you which macroscopic directions are statistically favored." />
                  <TransferPrompt title="Fluctuation" text="A few particles can noticeably fluctuate between sides. As particle number grows, large relative fluctuations become overwhelmingly rarer." />
                </div>
              </div>
            </section>
          </DiscoveryLessonBlock>

          <nav className="flex flex-col gap-3 pb-10 sm:flex-row sm:justify-between" aria-label="Thermodynamics lesson navigation">
            <Link href="/natural-science/physics/thermodynamics/phase-change" className="rounded-[18px] border border-white/[0.09] bg-black/[0.16] px-4 py-3 text-[13px] text-slate-300 transition hover:border-white/[0.16] hover:text-white">← Phase Change</Link>
            <Link href="/natural-science/physics/thermodynamics/processes" className="inline-flex items-center justify-end gap-2 rounded-[18px] border border-violet-200/[0.14] bg-violet-300/[0.04] px-4 py-3 text-[13px] font-semibold text-violet-100 transition hover:bg-violet-300/[0.08]">Next: Thermodynamic Processes <ArrowRight size={15} /></Link>
          </nav>
        </div>
      </div>
    </main>
  );
}

function choose(n: number, k: number) {
  const r = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= r; i += 1) result = (result * (n - r + i)) / i;
  return Math.round(result);
}

function formatNumber(value: number) {
  return value >= 100000 ? value.toExponential(2) : value.toLocaleString();
}

function makeMicrostate(total: number, leftCount: number, variant: number) {
  if (leftCount <= 0) return Array.from({ length: total }, () => false);
  if (leftCount >= total) return Array.from({ length: total }, () => true);
  const order = Array.from({ length: total }, (_, index) => (index * 5 + variant * 3) % total);
  const left = new Set(order.slice(0, leftCount));
  return Array.from({ length: total }, (_, index) => left.has(index));
}

function ParticleChamber({ total, leftCount, arrangement, divider, label }: { total: number; leftCount: number; arrangement: boolean[]; divider: boolean; label: string }) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#100b18]/76 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[12px] font-semibold uppercase tracking-[0.09em] text-slate-300">{label}</span>
        <span className="font-mono text-[12px] text-fuchsia-100/70">N = {total}</span>
      </div>
      <div className="relative grid min-h-[230px] grid-cols-2 overflow-hidden rounded-[18px] border border-white/[0.07]">
        <div className="bg-blue-400/[0.025] p-4">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {arrangement.map((onLeft, index) => onLeft ? <Particle key={index} index={index} side="left" /> : null)}
          </div>
        </div>
        <div className="bg-rose-400/[0.025] p-4">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {arrangement.map((onLeft, index) => !onLeft ? <Particle key={index} index={index} side="right" /> : null)}
          </div>
        </div>
        {divider ? <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-white/25 shadow-[0_0_20px_rgba(255,255,255,.12)]" /> : <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.08]" />}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[12px] text-slate-400"><span>left: {leftCount}</span><span>right: {total - leftCount}</span></div>
    </div>
  );
}

function Particle({ index, side }: { index: number; side: "left" | "right" }) {
  return <span className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[11px] font-semibold ${side === "left" ? "border-blue-300/25 bg-blue-300/10 text-blue-100 shadow-[0_0_16px_rgba(96,165,250,.10)]" : "border-rose-300/25 bg-rose-300/10 text-rose-100 shadow-[0_0_16px_rgba(248,113,113,.10)]"}`}>{index + 1}</span>;
}

function MicrostateStrip({ arrangement }: { arrangement: boolean[] }) {
  return (
    <div className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-12">
      {arrangement.map((left, index) => (
        <div key={index} className={`rounded-[12px] border px-2 py-3 text-center ${left ? "border-blue-300/20 bg-blue-300/[0.06]" : "border-rose-300/20 bg-rose-300/[0.06]"}`}>
          <div className="font-mono text-[11px] text-slate-400">{index + 1}</div>
          <div className={`mt-1 text-[12px] font-bold ${left ? "text-blue-100" : "text-rose-100"}`}>{left ? "L" : "R"}</div>
        </div>
      ))}
    </div>
  );
}

function CompactReadout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[14px] border border-white/[0.07] bg-black/[0.22] px-3 py-2.5">
      <div className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-[15px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div>
    </div>
  );
}

function FormalStep({ number, title, formula, note }: { number: string; title: string; formula: string; note: string }) {
  return (
    <div className="min-h-[205px] border-b border-white/[0.08] p-6 odd:sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0">
      <span className="font-mono text-[11px] font-semibold text-fuchsia-200/70">{number}</span>
      <h3 className="mt-3 text-[19px] font-semibold text-white">{title}</h3>
      <div className="mt-3 font-mono text-[15px] font-semibold text-fuchsia-100">{formula}</div>
      <p className="mt-3 text-[15px] leading-7 text-slate-200">{note}</p>
    </div>
  );
}

function TransferChamber({ leftCount }: { leftCount: number }) {
  const arrangement = Array.from({ length: 8 }, (_, index) => index < leftCount);
  return (
    <div className="grid min-h-[300px] grid-cols-2 overflow-hidden rounded-[22px] border border-white/[0.10] bg-black/[0.18]">
      <div className="border-r border-white/[0.08] bg-blue-300/[0.025] p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.09em] text-blue-100/70">left</div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{arrangement.map((left, index) => left ? <Particle key={index} index={index} side="left" /> : null)}</div>
      </div>
      <div className="bg-rose-300/[0.025] p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.09em] text-rose-100/70">right</div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{arrangement.map((left, index) => !left ? <Particle key={index} index={index} side="right" /> : null)}</div>
      </div>
    </div>
  );
}

function TransferPrompt({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[18px] border border-white/[0.09] bg-black/[0.18] p-5">
      <h3 className="text-[16px] font-semibold text-white">{title}</h3>
      <p className="mt-2 text-[14px] leading-6 text-slate-200">{text}</p>
    </div>
  );
}
