"use client";

import { useState } from "react";
import {
  CheckCircle2,
  RefreshCw,
  Sigma,
  Telescope,
  XCircle,
} from "lucide-react";

const DISTANCE_FACTORS = [2, 3, 4] as const;

export default function OrbitEvidenceCheck() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [ratioAnswer, setRatioAnswer] = useState<number | null>(null);
  const [reasonAnswer, setReasonAnswer] = useState<string | null>(null);
  const distanceFactor = DISTANCE_FACTORS[caseIndex];
  const correctRatio = Math.pow(distanceFactor, 1.5);
  const ratioOptions = [
    correctRatio,
    Math.pow(distanceFactor, 2),
    Math.sqrt(distanceFactor),
  ];

  function nextCase() {
    setCaseIndex((current) => (current + 1) % DISTANCE_FACTORS.length);
    setRatioAnswer(null);
    setReasonAnswer(null);
  }

  return (
    <section className="rounded-[28px] border border-violet-200/[0.1] bg-[#070612]/75 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-7">
      <div className="grid gap-4 border-b border-white/[0.07] pb-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-violet-200/65">
            <Sigma size={13} /> Orbit evidence check
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
            Predict first. Then explain what the archive can test.
          </h2>
        </div>
        <button
          type="button"
          onClick={nextCase}
          className="flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-[10px] font-semibold text-slate-500 transition hover:text-white"
        >
          <RefreshCw size={11} /> New case
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="rounded-[18px] border border-white/[0.07] bg-black/[0.18] p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-200/55">
            Calculated practice
          </p>
          <h3 className="mt-2 text-[15px] font-semibold leading-6 text-white">
            A planet&apos;s orbital distance grows by a factor of{" "}
            {distanceFactor}. Around the same star, by what factor should its
            period grow?
          </h3>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            Use P² ∝ a³, so the period ratio is the distance ratio raised to
            3/2.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {ratioOptions.map((option) => {
              const chosen = ratioAnswer === option;
              const correct = option === correctRatio;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={chosen}
                  onClick={() => setRatioAnswer(option)}
                  className={
                    "rounded-[12px] border px-3 py-3 font-mono text-[12px] transition " +
                    (chosen
                      ? correct
                        ? "border-emerald-300/40 bg-emerald-300/[0.08] text-emerald-100"
                        : "border-rose-300/35 bg-rose-300/[0.07] text-rose-100"
                      : "border-white/[0.08] text-slate-400 hover:border-cyan-200/[0.2]")
                  }
                >
                  {option.toFixed(2)}×
                </button>
              );
            })}
          </div>
          {ratioAnswer !== null ? (
            <Feedback correct={ratioAnswer === correctRatio}>
              {ratioAnswer === correctRatio
                ? String(distanceFactor) +
                  "^(3/2) = " +
                  correctRatio.toFixed(2) +
                  ", so your prediction matches Kepler's relation."
                : "Rearrange P² ∝ a³ as P ∝ a^(3/2), then apply the distance factor."}
            </Feedback>
          ) : null}
        </article>

        <article className="rounded-[18px] border border-white/[0.07] bg-black/[0.18] p-5">
          <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-violet-200/55">
            <Telescope size={11} /> Interpretive check
          </p>
          <h3 className="mt-2 text-[15px] font-semibold leading-6 text-white">
            Two planets have the same reported orbital period. Must their
            orbital distances also be identical?
          </h3>
          <div className="mt-4 grid gap-2">
            {[
              ["yes", "Yes—the period fixes the distance by itself."],
              ["no", "No—the host star's mass also affects the relation."],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={reasonAnswer === id}
                onClick={() => setReasonAnswer(id)}
                className={
                  "rounded-[12px] border px-4 py-3 text-left text-[12px] leading-5 transition " +
                  (reasonAnswer === id
                    ? id === "no"
                      ? "border-emerald-300/40 bg-emerald-300/[0.08] text-emerald-100"
                      : "border-rose-300/35 bg-rose-300/[0.07] text-rose-100"
                    : "border-white/[0.08] text-slate-400 hover:border-violet-200/[0.2]")
                }
              >
                {label}
              </button>
            ))}
          </div>
          {reasonAnswer ? (
            <Feedback correct={reasonAnswer === "no"}>
              {reasonAnswer === "no"
                ? "Correct. Comparing real systems requires the generalized law, which includes the host star's mass."
                : "Period and distance are linked within one stellar system; changing the star's mass changes the orbit."}
            </Feedback>
          ) : null}
        </article>
      </div>
    </section>
  );
}

function Feedback({
  correct,
  children,
}: {
  correct: boolean;
  children: string;
}) {
  const Icon = correct ? CheckCircle2 : XCircle;
  return (
    <p
      role="status"
      className={
        "mt-4 flex items-start gap-2 rounded-[12px] border px-3 py-2.5 text-[11px] leading-5 " +
        (correct
          ? "border-emerald-300/[0.13] bg-emerald-300/[0.035] text-emerald-100/75"
          : "border-rose-300/[0.13] bg-rose-300/[0.035] text-rose-100/75")
      }
    >
      <Icon size={13} className="mt-1 shrink-0" />
      {children}
    </p>
  );
}
