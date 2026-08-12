"use client";

import { Check, RefreshCcw, Sparkles, X } from "lucide-react";
import { useState } from "react";

export type GeneratedPracticeQuestion = {
  id: string;
  eyebrow?: string;
  prompt: string;
  choices: readonly string[];
  correctAnswer: string;
  explanation: string;
};

type GeneratedPracticeProps = {
  title: string;
  description?: string;
  generator: () => GeneratedPracticeQuestion;
  accentRgb?: string;
};

export default function GeneratedPractice({
  title,
  description,
  generator,
  accentRgb = "34, 211, 238",
}: GeneratedPracticeProps) {
  const [question, setQuestion] = useState<GeneratedPracticeQuestion>(() => generator());
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);

  const isCorrect = selected === question.correctAnswer;

  const submit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    setAttempted((value) => value + 1);
    if (selected === question.correctAnswer) setCorrect((value) => value + 1);
  };

  const nextQuestion = () => {
    setQuestion(generator());
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <section
      className="rounded-[22px] border bg-black/[0.18] p-4 backdrop-blur-xl sm:p-5"
      style={{ borderColor: `rgba(${accentRgb},0.13)` }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em]"
            style={{ color: `rgba(${accentRgb},0.78)` }}
          >
            <Sparkles size={13} /> Generated practice
          </div>
          <h3 className="mt-1 text-[20px] font-semibold text-white">{title}</h3>
          {description ? <p className="mt-1 max-w-2xl text-[11px] leading-5 text-slate-500">{description}</p> : null}
        </div>
        <div className="rounded-lg border border-white/[0.05] bg-white/[0.012] px-3 py-2 font-mono text-[10px] text-slate-500">
          {attempted} attempted · {correct} correct
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-start">
        <div className="rounded-[18px] border border-white/[0.055] bg-[#06111e]/72 p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">
            {question.eyebrow ?? "Question"}
          </div>
          <div className="mt-3 font-mono text-[clamp(1.25rem,2.3vw,1.8rem)] font-semibold leading-relaxed text-slate-100">
            {question.prompt}
          </div>
          <p className="mt-3 text-[10px] leading-4 text-slate-600">
            The numbers are generated from a known solution structure, so each new problem has a verified answer.
          </p>
        </div>

        <div>
          <div className="grid gap-2 sm:grid-cols-2">
            {question.choices.map((choice) => {
              const active = selected === choice;
              const correctChoice = submitted && choice === question.correctAnswer;
              const incorrectChoice = submitted && active && choice !== question.correctAnswer;
              return (
                <button
                  key={choice}
                  type="button"
                  disabled={submitted}
                  onClick={() => setSelected(choice)}
                  className={`min-h-12 rounded-xl border px-3 py-3 text-left font-mono text-[12px] transition-colors ${
                    correctChoice
                      ? "border-emerald-300/[0.28] bg-emerald-400/[0.055] text-emerald-100"
                      : incorrectChoice
                        ? "border-rose-300/[0.24] bg-rose-400/[0.045] text-rose-100"
                        : active
                          ? "text-white"
                          : "border-white/[0.05] bg-white/[0.01] text-slate-400 hover:border-white/[0.10] hover:text-white"
                  }`}
                  style={
                    active && !submitted
                      ? {
                          borderColor: `rgba(${accentRgb},0.30)`,
                          background: `rgba(${accentRgb},0.055)`,
                        }
                      : undefined
                  }
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {!submitted ? (
            <button
              type="button"
              disabled={!selected}
              onClick={submit}
              className="mt-3 rounded-xl border px-4 py-2.5 text-[11px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
              style={{
                borderColor: `rgba(${accentRgb},0.24)`,
                background: `rgba(${accentRgb},0.09)`,
              }}
            >
              Check answer
            </button>
          ) : (
            <div className={`mt-3 rounded-[15px] border p-3.5 ${isCorrect ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-rose-300/[0.14] bg-rose-400/[0.025]"}`}>
              <div className="flex items-center gap-2">
                {isCorrect ? <Check size={15} className="text-emerald-300" /> : <X size={15} className="text-rose-300" />}
                <strong className={`text-[12px] ${isCorrect ? "text-emerald-200" : "text-rose-200"}`}>
                  {isCorrect ? "Correct" : `Answer: ${question.correctAnswer}`}
                </strong>
              </div>
              <p className="mt-1.5 text-[11px] leading-5 text-slate-500">{question.explanation}</p>
              <button
                type="button"
                onClick={nextQuestion}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-[10px] font-semibold text-slate-300 hover:text-white"
              >
                <RefreshCcw size={12} /> Another problem
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
