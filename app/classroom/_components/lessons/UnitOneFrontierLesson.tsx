"use client";

import { useState } from "react";
import { BookOpenText, Dna, Globe2 } from "lucide-react";
import ClassroomLessonShell, { type ClassroomLessonNavItem } from "./ClassroomLessonShell";

type Kind = "carbohydrates" | "outsiders-exchange" | "character-desire";
type Props = {
  kind: Kind;
  breadcrumbs: readonly { label: string; href?: string }[];
  unitHref: string;
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
};

const LESSONS = {
  carbohydrates: {
    tone: "science" as const,
    icon: Dna,
    eyebrow: "AP Biology · Unit 1 · Topic 1.4",
    title: "Carbohydrates",
    subtitle: "Read carbohydrate structure as evidence for energy, storage, and support.",
    position: "Lesson 4 of 7",
    rule: "Structure → accessible bonds and shape → biological function",
    misconception: "Carbohydrates are not simply “sugar.” Monosaccharides can fuel reactions, while linked sugars can store energy or build strong structures.",
    cases: [
      { name: "Glucose", signal: "one small ring", consequence: "moves readily and can enter energy-releasing pathways", claim: "A monosaccharide is suited to immediate transport and use." },
      { name: "Starch", signal: "branched chains of α-glucose", consequence: "many ends can be accessed by enzymes", claim: "Branching supports mobilizable glucose storage in plants." },
      { name: "Cellulose", signal: "straight β-glucose chains aligned together", consequence: "parallel chains hydrogen-bond into fibers", claim: "Chain geometry supports structural strength in plant cell walls." },
    ],
    prompt: "A plant tissue must resist stretching. Which evidence best supports cellulose rather than starch as the material?",
    choices: ["Both contain glucose.", "Its straight chains align into hydrogen-bonded fibers.", "It can be broken down for energy."],
    answer: 1,
    feedback: "The decisive evidence is arrangement, not merely composition: aligned chains form load-bearing fibers.",
  },
  "outsiders-exchange": {
    tone: "social-studies" as const,
    icon: Globe2,
    eyebrow: "Global II · Unit 1 · Key Idea 10.1b",
    title: "Outsiders & Exchange",
    subtitle: "Compare policy, actual contact, and trade geography without reducing a state to “open” or “closed.”",
    position: "Lesson 4 of 4",
    rule: "Policy rule + enforcement + permitted channel → pattern of exchange",
    misconception: "A restriction is not total isolation. States could limit ports, traders, movement, or missions while maintaining selected commercial and diplomatic channels.",
    cases: [
      { name: "Tokugawa Japan", signal: "foreign contact concentrated through licensed channels, especially Nagasaki", consequence: "officials could supervise selected trade and information", claim: "The shogunate regulated foreign exchange rather than ending it." },
      { name: "Qing China", signal: "European maritime trade concentrated at Guangzhou under the Canton system", consequence: "approved merchants mediated commerce", claim: "Trade continued inside a state-defined institutional channel." },
      { name: "Atlantic empires", signal: "fortified ports and chartered-company routes crossed the ocean", consequence: "commerce expanded alongside coercion, slavery, and imperial rivalry", claim: "Greater maritime reach did not mean equal or voluntary exchange." },
    ],
    prompt: "A source lists Dutch ships entering Nagasaki under strict supervision. Which claim stays within the evidence?",
    choices: ["Japan had no foreign exchange.", "Japan allowed unrestricted European settlement.", "Japan maintained a controlled channel for some foreign trade."],
    answer: 2,
    feedback: "The source supports controlled exchange. It disproves total isolation but does not establish unrestricted access.",
  },
  "character-desire": {
    tone: "english" as const,
    icon: BookOpenText,
    eyebrow: "Literature · Unit 1 · Character Evidence",
    title: "Character & Desire",
    subtitle: "Infer what a character wants from patterns of action, speech, thought, and contradiction.",
    position: "Lesson 3 of 6",
    rule: "Repeated detail + pressure + choice → defensible motive inference",
    misconception: "A character’s stated wish is evidence, not a guaranteed fact. Actions and contradictions may reveal a competing or deeper desire.",
    cases: [
      { name: "The audition", signal: "Mara says the role does not matter, then arrives first and rehearses behind the curtain", consequence: "her actions conflict with her dismissal", claim: "Mara wants the role but protects herself from visible disappointment." },
      { name: "The unopened letter", signal: "Jon carries the letter all day, checks its seal, and refuses to open it", consequence: "avoidance exists alongside sustained attention", claim: "Jon wants the news and fears what knowing it may require." },
      { name: "The borrowed coat", signal: "Inez returns the coat twice, then finds a new reason to visit", consequence: "the object becomes a pretext for renewed contact", claim: "Inez’s pattern suggests a desire for connection, not merely tidiness." },
    ],
    prompt: "Jon carries the sealed letter and repeatedly touches its edge but will not open it. Which inference accounts for the whole pattern?",
    choices: ["Jon has forgotten the letter.", "Jon feels both drawn to and afraid of its contents.", "Jon cannot read."],
    answer: 1,
    feedback: "The strongest inference explains both attention and avoidance without inventing an unsupported inability.",
  },
} as const;

export default function UnitOneFrontierLesson({ kind, breadcrumbs, unitHref, previous, next }: Props) {
  const lesson = LESSONS[kind];
  const [caseIndex, setCaseIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const active = lesson.cases[caseIndex];
  const correct = choice === lesson.answer;

  return (
    <ClassroomLessonShell subjectTone={lesson.tone} breadcrumbs={breadcrumbs} eyebrow={lesson.eyebrow} icon={lesson.icon} title={lesson.title} subtitle={lesson.subtitle} stages={["Notice", "Name", "Model", "Compare", "Transfer", "Practice", "Conclude"]} practiceTargetId="practice" unitHref={unitHref} previous={previous} next={next} lessonPosition={lesson.position} background={<LessonField kind={kind} />}>
      <section className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="explain-title">
        <div className="rounded-[24px] border border-white/[0.12] bg-black/35 p-5 backdrop-blur-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">Explain · reusable relationship</p>
          <h2 id="explain-title" className="mt-2 text-2xl font-semibold text-white">Do not name the category first. Follow the evidence.</h2>
          <p className="mt-4 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 font-mono text-[14px] text-stone-100">{lesson.rule}</p>
          <p className="mt-4 text-[15px] leading-7 text-stone-300">{lesson.misconception}</p>
        </div>

        <div className="rounded-[24px] border border-white/[0.12] bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">Do · coordinated case bench</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a case">
            {lesson.cases.map((item, index) => <button key={item.name} type="button" onClick={() => { setCaseIndex(index); setChoice(null); }} aria-pressed={caseIndex === index} className={`min-h-11 rounded-full border px-4 text-[13px] font-semibold ${caseIndex === index ? "border-white/40 bg-white/15 text-white" : "border-white/10 bg-black/20 text-stone-400"}`}>{item.name}</button>)}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <ModelCell label="Visible evidence" value={active.signal} />
            <ModelCell label="What it changes" value={active.consequence} />
            <ModelCell label="Bounded claim" value={active.claim} />
          </div>
        </div>
      </section>

      <section id="practice" className="mt-4 rounded-[24px] border border-white/[0.12] bg-black/40 p-5 backdrop-blur-2xl" aria-labelledby="check-title">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">Check · fresh transfer</p>
        <h2 id="check-title" className="mt-2 max-w-3xl text-xl font-semibold text-white">{lesson.prompt}</h2>
        <div className="mt-4 grid gap-2">
          {lesson.choices.map((item, index) => <button key={item} type="button" onClick={() => setChoice(index)} className={`min-h-12 rounded-[14px] border px-4 py-3 text-left text-[14px] ${choice === index ? "border-white/40 bg-white/12 text-white" : "border-white/10 bg-white/[0.025] text-stone-300"}`}>{item}</button>)}
        </div>
        {choice !== null ? <div role="status" className={`mt-4 rounded-[14px] border p-4 text-[14px] leading-6 ${correct ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-amber-300/30 bg-amber-300/10 text-amber-100"}`}><strong>{correct ? "That holds." : "Revise the evidence boundary."}</strong> {lesson.feedback}</div> : null}
      </section>
    </ClassroomLessonShell>
  );
}

function ModelCell({ label, value }: { label: string; value: string }) {
  return <article className="min-h-36 rounded-[18px] border border-white/[0.09] bg-white/[0.035] p-4"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">{label}</p><p className="mt-3 text-[14px] leading-6 text-stone-200">{value}</p></article>;
}

function LessonField({ kind }: { kind: Kind }) {
  const background = kind === "carbohydrates" ? "radial-gradient(circle at 18% 25%,rgba(34,197,94,.25),transparent 28%),linear-gradient(115deg,#03170f,#07120b 55%,#10200c)" : kind === "outsiders-exchange" ? "radial-gradient(circle at 75% 20%,rgba(59,130,246,.24),transparent 30%),repeating-linear-gradient(12deg,transparent 0 68px,rgba(147,197,253,.05) 69px 70px),#05101c" : "radial-gradient(ellipse at 25% 40%,rgba(250,204,21,.18),transparent 32%),repeating-linear-gradient(90deg,transparent 0 119px,rgba(253,224,71,.045) 120px 121px),#171205";
  return <div className="pointer-events-none fixed inset-0" style={{ background }} aria-hidden="true" />;
}
