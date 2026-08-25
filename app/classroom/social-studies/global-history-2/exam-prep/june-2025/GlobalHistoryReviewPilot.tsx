"use client";

import { useState } from "react";
import { Check, ExternalLink, Landmark } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";

const EXAM_URL = "https://www.nysedregents.org/ghg2/625/glhg2-62025-exam.pdf";
const KEY_URL = "https://www.nysedregents.org/ghg2/625/glhg2-62025-sk.pdf";

const questions = [
  { number: 3, prompt: "Which group would be most likely to support the ideas presented in this document?", options: ["the nobility", "the clergy", "the Third Estate", "the royal officials"], answer: 2, insight: "The document protects ordinary citizens from arbitrary authority, aligning most directly with the Third Estate’s demands." },
  { number: 4, prompt: "Which claim is best supported by this document?", options: ["Arrest creates a presumption of guilt.", "Citizens’ rights deserve fair and just protection.", "Government should limit religious practice.", "Speech should be restricted for the public good."], answer: 1, insight: "All three details establish protected rights with legal boundaries; the broad claim must cover that shared pattern." },
] as const;

export default function GlobalHistoryReviewPilot() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<readonly number[]>([]);
  const [evidence, setEvidence] = useState<readonly number[]>([]);
  const question = questions[index];
  const selected = answers[question.number];
  const revealed = checked.includes(question.number);

  function choose(value: number) {
    setAnswers((current) => ({ ...current, [question.number]: value }));
    setChecked((current) => current.filter((number) => number !== question.number));
  }

  return <main className="relative min-h-screen overflow-x-hidden bg-[#07101a] text-stone-100">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(96,165,250,0.17),transparent_28%),linear-gradient(to_bottom,#0a192a,#060a10)]" />
    <div className="relative mx-auto w-full max-w-[1050px] px-4 py-5 sm:px-6">
      <DomainPageHeader breadcrumbs={[{ label: "Classroom", href: "/classroom" }, { label: "Global II", href: "/classroom/social-studies/global-history-2" }, { label: "Exam Review", href: "/classroom/social-studies/global-history-2/exam-prep" }, { label: "June 2025" }]} eyebrow="June 2025 Regents · Questions 3–4" icon={Landmark} title={<span>Let the document narrow the claim</span>} subtitle="Collect evidence first, then make each answer choice account for the whole source." accentRgb="96, 165, 250" metadataTextClassName="text-[11px]" iconClassName="rounded-[16px]" headerClassName="border-blue-200/[0.14]" />
      <div className="mt-4 flex gap-4 text-[12px]"><a href={EXAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-200"><ExternalLink size={13} />Official exam</a><a href={KEY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-200"><ExternalLink size={13} />Scoring key</a></div>

      <section className="mt-5 rounded-[22px] border border-blue-200/14 bg-black/20 p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-300/75">Declaration of the Rights of Man and of the Citizen · 1789</div>
        <p className="mt-2 text-[13px] leading-6 text-stone-400">Select each source detail to build an evidence pattern. These are concise restatements of Articles 9–11 in the released document.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{["People are treated as innocent until declared guilty.", "Religious opinions are protected unless their expression disrupts public order.", "Citizens may communicate ideas freely while remaining responsible for abuses."].map((detail, detailIndex) => { const active = evidence.includes(detailIndex); return <button key={detail} type="button" aria-pressed={active} onClick={() => setEvidence((current) => active ? current.filter((value) => value !== detailIndex) : [...current, detailIndex])} className={`min-h-[112px] rounded-[14px] border p-3 text-left text-[13px] leading-5 ${active ? "border-blue-200/24 bg-blue-300/[0.08] text-blue-100" : "border-white/[0.07] bg-black/15 text-stone-400"}`}><span className="mb-2 block font-mono text-[11px] text-blue-300">ARTICLE {9 + detailIndex}</span>{detail}</button>; })}</div>
        <div className="mt-3 min-h-[48px] text-[13px] leading-5 text-stone-300">{evidence.length === 3 ? "Pattern: each article limits authority and protects individual rights, though those rights still operate within law." : "Collect all three details before generalizing from the document."}</div>
      </section>

      <section className="mt-4 rounded-[22px] border border-white/[0.08] bg-black/20 p-5">
        <div className="flex items-center justify-between gap-3"><div className="font-mono text-[12px] text-blue-300">QUESTION {question.number}</div><div className="flex gap-2">{questions.map((candidate, candidateIndex) => <button key={candidate.number} type="button" onClick={() => setIndex(candidateIndex)} className={`h-9 w-9 rounded-full border font-mono text-[12px] ${candidateIndex === index ? "border-blue-200/30 bg-blue-300/[0.10] text-blue-100" : "border-white/[0.07] text-stone-500"}`}>{candidate.number}</button>)}</div></div>
        <h2 className="mt-3 text-[20px] font-semibold text-white">{question.prompt}</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={`Question ${question.number} choices`}>{question.options.map((option, optionIndex) => <button key={option} type="button" role="radio" aria-checked={selected === optionIndex} onClick={() => choose(optionIndex)} className={`min-h-[58px] rounded-[14px] border px-4 py-3 text-left text-[13px] ${selected === optionIndex ? "border-blue-200/28 bg-blue-300/[0.08] text-blue-100" : "border-white/[0.07] text-stone-300"}`}><span className="mr-2 font-mono text-blue-300">{optionIndex + 1}</span>{option}</button>)}</div>
        <button type="button" disabled={selected === undefined || evidence.length < 3} onClick={() => setChecked((current) => current.includes(question.number) ? current : [...current, question.number])} className="mt-4 min-h-11 rounded-xl bg-blue-300/15 px-4 text-[13px] font-semibold text-blue-100 disabled:cursor-not-allowed disabled:opacity-40">Check against the whole source</button>
        <div className="mt-3 min-h-[88px]" aria-live="polite">{revealed ? <div className={`rounded-[14px] border p-4 text-[13px] leading-6 ${selected === question.answer ? "border-emerald-200/16 bg-emerald-300/[0.04] text-emerald-100" : "border-amber-200/16 bg-amber-300/[0.04] text-amber-100"}`}><Check size={14} className="mr-2 inline" />{selected === question.answer ? "Correct. " : "Reconsider which choice explains all three details. "}{question.insight}</div> : null}</div>
      </section>
      <p className="mt-5 text-[11px] leading-5 text-stone-500">Question wording and answer order follow NYSED’s released June 2025 exam; source-detail restatements and guided explanations are independently authored.</p>
    </div>
  </main>;
}
