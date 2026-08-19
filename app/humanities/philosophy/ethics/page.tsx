"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Compass,
  ListChecks,
  RotateCcw,
  Scale,
  ShieldCheck,
  TriangleAlert,
  Users,
} from "lucide-react";
import DiscoveryLessonBlock from "@/app/_components/DiscoveryLessonBlock";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import EthicsField from "./EthicsField";

const ACCENT = "245, 158, 11";

type Lens = "outcomes" | "duties" | "character";
type Reason = { id: string; text: string; lens: Lens; why: string };

const LENSES: Record<Lens, { label: string; question: string; color: string }> = {
  outcomes: { label: "Outcomes", question: "What is likely to happen because of this choice?", color: "245, 158, 11" },
  duties: { label: "Duties & Rights", question: "What do people owe one another, and what must not be violated?", color: "167, 139, 250" },
  character: { label: "Character & Judgment", question: "What would honesty, courage, compassion, and practical wisdom require?", color: "45, 212, 191" },
};

const REASONS: Reason[] = [
  { id: "harm", text: "Which choice is most likely to prevent serious harm overall?", lens: "outcomes", why: "This reason compares expected consequences for everyone affected." },
  { id: "distribution", text: "Who receives the benefits, and who is left carrying the costs?", lens: "outcomes", why: "Consequences include their distribution, not merely a single total number." },
  { id: "promise", text: "A promise creates an obligation, even when keeping it becomes inconvenient.", lens: "duties", why: "This reason asks what obligation was created by making a promise." },
  { id: "rights", text: "Does either option unfairly use or expose another person without respecting their rights?", lens: "duties", why: "This reason focuses on constraints, respect, and what may be owed to persons." },
  { id: "virtues", text: "What would honesty, courage, compassion, and fairness require together?", lens: "character", why: "This reason asks what good practical judgment looks like when virtues pull in different directions." },
  { id: "habit", text: "What kind of habit or character would repeatedly making this choice help form?", lens: "character", why: "This reason evaluates action partly through the kind of person and habits it cultivates." },
];

const ARGUMENT_REASONS: Array<Reason & { short: string }> = [
  { id: "camera-theft", short: "Reduce theft", text: "Continuous hallway monitoring could reduce theft and make incidents easier to investigate.", lens: "outcomes", why: "This predicts beneficial consequences from the policy." },
  { id: "camera-chill", short: "Costs of surveillance", text: "Constant recording may make students feel watched and change how freely they behave at school.", lens: "outcomes", why: "This predicts a less visible consequence that should also enter the comparison." },
  { id: "camera-privacy", short: "Privacy matters", text: "Students have a legitimate privacy interest even when surveillance could produce useful results.", lens: "duties", why: "This treats privacy as a constraint or right, not merely another quantity to maximize." },
  { id: "camera-rules", short: "Use needs limits", text: "If cameras are used, access, retention, and purpose should be tightly limited rather than left open-ended.", lens: "duties", why: "This asks what rules and protections the institution owes the people it monitors." },
  { id: "camera-trust", short: "Build trustworthy institutions", text: "A good school should cultivate trust and responsibility rather than relying only on observation and punishment.", lens: "character", why: "This evaluates what kind of institutional character and habits the policy encourages." },
  { id: "camera-wisdom", short: "Use practical judgment", text: "A proportionate compromise may protect students without treating maximum surveillance as the default answer.", lens: "character", why: "This appeals to practical wisdom: fitting means to circumstances rather than applying one consideration mechanically." },
];

const CLAIMS = ["Install the cameras", "Do not install the cameras", "Install cameras only with strict limits"] as const;

export default function EthicsPage() {
  const [sorts, setSorts] = useState<Record<string, Lens>>({});
  const [claim, setClaim] = useState<(typeof CLAIMS)[number]>(CLAIMS[2]);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const sortedCount = Object.keys(sorts).length;
  const correctCount = REASONS.filter((reason) => sorts[reason.id] === reason.lens).length;
  const argumentLensCounts = useMemo(() => selectedReasons.reduce<Record<Lens, number>>((counts, id) => {
    const reason = ARGUMENT_REASONS.find((item) => item.id === id);
    if (reason) counts[reason.lens] += 1;
    return counts;
  }, { outcomes: 0, duties: 0, character: 0 }), [selectedReasons]);

  const toggleArgumentReason = (id: string) => setSelectedReasons((current) => current.includes(id) ? current.filter((reasonId) => reasonId !== id) : current.length < 3 ? [...current, id] : current);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07070b] text-slate-100 selection:bg-amber-300/25">
      <EthicsField />
      <div className="relative z-10 mx-auto w-full max-w-[1020px] px-4 pb-14 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#07070b]/80 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Humanities", href: "/humanities" }, { label: "Philosophy", href: "/humanities/philosophy" }, { label: "Ethics" }]}
            eyebrow="Philosophy · Moral reasoning"
            icon={Scale}
            title={<span>Ethics</span>}
            subtitle="Compare the kinds of reasons people give for action, then use those reasons to construct and challenge moral arguments."
            accentRgb={ACCENT}
            titleClassName="font-mono text-[clamp(2.1rem,5vw,4.4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-[#fffaf0]"
            headerClassName="border-transparent"
          />
        </div>

        <div className="mt-10 space-y-16">
          <DiscoveryLessonBlock kind="phenomenon" accentRgb={ACCENT}>
            <section className="mx-auto max-w-[820px] overflow-hidden rounded-[26px] border border-amber-200/[0.14] bg-[#0c0a0b]/84 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <div className="border-b border-white/[0.08] px-5 py-5 sm:px-7">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-amber-200/80">A conflict of reasons</div>
                <h2 className="mt-2 text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-[-0.035em] text-white">You promised to keep a friend’s private mistake secret. Now another student may take the blame.</h2>
                <p className="mt-3 text-[17px] leading-8 text-slate-100">Keeping the promise protects your friend’s trust. Speaking up could prevent an innocent person from being punished. Before deciding what to do, what kinds of reasons should count?</p>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-7">
                <QuestionCard icon={<Users size={20} />} title="What happens?" text="Compare likely benefits, harms, risks, and who bears them." rgb="245, 158, 11" />
                <QuestionCard icon={<ShieldCheck size={20} />} title="What is owed?" text="Ask about promises, rights, obligations, fairness, and constraints." rgb="167, 139, 250" />
                <QuestionCard icon={<Compass size={20} />} title="Who should I be?" text="Ask what good character and practical judgment require here." rgb="45, 212, 191" />
              </div>
            </section>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="sandbox" accentRgb={ACCENT}>
            <section className="overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#09090d]/86 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl">
              <div className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-7">
                <div>
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/80">Reason sorting lab</div>
                  <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-white">Sort the reason, not the person.</h2>
                  <p className="mt-3 max-w-3xl text-[16px] leading-7 text-slate-200">Each statement gives a different kind of moral reason. Classify what question it is asking. You are not choosing the morally correct action yet.</p>
                </div>
                <button type="button" onClick={() => setSorts({})} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[12px] font-semibold text-slate-200 transition hover:border-white/[0.22] hover:text-white"><RotateCcw size={14} /> Reset sorting</button>
              </div>

              <div className="p-5 sm:p-7">
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Object.keys(LENSES) as Lens[]).map((lens) => <div key={lens} className="rounded-[18px] border px-4 py-4" style={{ borderColor: `rgba(${LENSES[lens].color},.18)`, background: `rgba(${LENSES[lens].color},.04)` }}><div className="text-[13px] font-semibold" style={{ color: `rgb(${LENSES[lens].color})` }}>{LENSES[lens].label}</div><p className="mt-2 text-[14px] leading-6 text-slate-200">{LENSES[lens].question}</p></div>)}
                </div>

                <div className="mt-7 space-y-3">
                  {REASONS.map((reason, index) => {
                    const answer = sorts[reason.id];
                    const correct = answer === reason.lens;
                    return <article key={reason.id} className="rounded-[20px] border border-white/[0.09] bg-black/[0.20] p-5">
                      <div className="flex gap-4">
                        <span className="font-mono text-[12px] font-semibold text-slate-500">{String(index + 1).padStart(2, "0")}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[17px] leading-7 text-white">{reason.text}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {(Object.keys(LENSES) as Lens[]).map((lens) => <button key={lens} type="button" onClick={() => setSorts((current) => ({ ...current, [reason.id]: lens }))} className="rounded-xl border px-3 py-2 text-[13px] font-semibold transition" style={{ borderColor: answer === lens ? `rgba(${LENSES[lens].color},.42)` : "rgba(255,255,255,.09)", background: answer === lens ? `rgba(${LENSES[lens].color},.08)` : "rgba(0,0,0,.12)", color: answer === lens ? `rgb(${LENSES[lens].color})` : "rgb(203 213 225)" }}>{LENSES[lens].label}</button>)}
                          </div>
                          {answer ? <div className={`mt-4 rounded-[14px] border p-4 ${correct ? "border-emerald-300/[0.16] bg-emerald-300/[0.04]" : "border-amber-300/[0.16] bg-amber-300/[0.04]"}`}><div className={`flex items-center gap-2 text-[13px] font-semibold ${correct ? "text-emerald-100" : "text-amber-100"}`}>{correct ? <CheckCircle2 size={15} /> : <CircleHelp size={15} />}{correct ? LENSES[reason.lens].label : "Look again at what the reason is measuring."}</div><p className="mt-2 text-[14px] leading-6 text-slate-200">{correct ? reason.why : LENSES[reason.lens].question}</p></div> : null}
                        </div>
                      </div>
                    </article>;
                  })}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-white/[0.08] bg-white/[0.025] px-4 py-3"><span className="text-[13px] text-slate-300">Classified {sortedCount} of {REASONS.length} reasons.</span><span className="font-mono text-[13px] text-emerald-100">{correctCount} currently matched to their reasoning lens</span></div>
              </div>
            </section>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="bridge" accentRgb={ACCENT}>
            <div className="mx-auto max-w-[760px] rounded-[22px] border border-white/[0.10] bg-black/[0.28] px-6 py-7 backdrop-blur-xl">
              <p className="text-[17px] leading-8 text-slate-100">Philosophers give names to families of reasoning that emphasize these questions. <strong className="text-amber-100">Consequentialist</strong> approaches evaluate actions through their outcomes. <strong className="text-violet-100">Deontological</strong> approaches emphasize duties, rights, rules, and constraints. <strong className="text-teal-100">Virtue ethics</strong> emphasizes character, habituation, and practical wisdom.</p>
              <p className="mt-4 text-[16px] leading-7 text-slate-200">These are influential families, not three personality types and not an exhaustive map of ethics. A single action can be supported by several different reasons, and two theories can sometimes recommend the same action for very different reasons.</p>
            </div>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="formal" accentRgb={ACCENT}>
            <section className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.24] backdrop-blur-xl">
              <div className="border-b border-white/[0.08] px-5 py-5 sm:px-6"><h2 className="text-[22px] font-semibold text-white">Three influential lenses, three different centers of attention.</h2><p className="mt-2 text-[15px] leading-7 text-slate-200">Use them to inspect an argument, not to stamp a person with a label.</p></div>
              <div className="divide-y divide-white/[0.08]">
                <FrameworkRow lens="Consequentialist approaches" question="What results from the action?" focus="Benefits, harms, risks, distribution, affected parties, expected outcomes" caution="Not merely ‘save the larger number.’ Consequences can differ in kind, probability, distribution, and time horizon." rgb="245, 158, 11" />
                <FrameworkRow lens="Deontological approaches" question="What may or must I do?" focus="Duties, rights, permissions, prohibitions, promises, respect for persons" caution="Not ‘follow rules without thinking.’ Duties can conflict, and their scope and justification require argument." rgb="167, 139, 250" />
                <FrameworkRow lens="Virtue ethics" question="What would good practical judgment require?" focus="Character, motives, virtues, habits, flourishing, practical wisdom" caution="Not ‘do whatever feels virtuous.’ Virtues must be interpreted and balanced within concrete circumstances." rgb="45, 212, 191" />
              </div>
            </section>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="pitfall" accentRgb={ACCENT}>
            <div className="rounded-[22px] border border-amber-200/[0.16] bg-amber-300/[0.045] p-6 backdrop-blur-xl"><div className="flex gap-4"><TriangleAlert size={24} className="mt-0.5 shrink-0 text-amber-200" /><div><h2 className="text-[21px] font-semibold text-white">One choice does not reveal “which moral theory you are.”</h2><p className="mt-3 text-[16px] leading-7 text-slate-100">An ethical framework evaluates reasons and arguments. Two people can choose the same action for different reasons; one person can also use more than one kind of consideration. Thought experiments are useful when they expose tensions in reasoning, not when they become personality tests with a hidden correct answer.</p></div></div></div>
          </DiscoveryLessonBlock>

          <DiscoveryLessonBlock kind="application" accentRgb={ACCENT} id="ethics-application">
            <section className="overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#09090d]/88 backdrop-blur-xl">
              <div className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-7"><div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-teal-100">Argument builder</div><h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-white">Build a position, then inspect what kinds of reasons are carrying it.</h2></div><button type="button" onClick={() => { setClaim(CLAIMS[2]); setSelectedReasons([]); }} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.12] bg-black/20 px-3 py-2 text-[12px] font-semibold text-slate-200 transition hover:border-white/[0.22] hover:text-white"><RotateCcw size={14} /> Reset argument</button></div>
              <div className="p-5 sm:p-7">
                <ScenarioCard />
                <div className="mt-7 grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
                  <div className="rounded-[20px] border border-white/[0.09] bg-black/[0.20] p-5"><div className="text-[12px] font-semibold uppercase tracking-[0.09em] text-slate-300">1. Choose a claim</div><div className="mt-4 space-y-2">{CLAIMS.map((option) => <button key={option} type="button" onClick={() => setClaim(option)} className={`w-full rounded-[14px] border px-4 py-3 text-left text-[14px] font-semibold transition ${claim === option ? "border-amber-300/[0.28] bg-amber-300/[0.07] text-amber-100" : "border-white/[0.09] bg-black/[0.12] text-slate-200"}`}>{option}</button>)}</div></div>
                  <div className="rounded-[20px] border border-white/[0.09] bg-black/[0.20] p-5"><div className="flex flex-wrap items-center justify-between gap-2"><div className="text-[12px] font-semibold uppercase tracking-[0.09em] text-slate-300">2. Choose up to three reasons</div><span className="font-mono text-[12px] text-slate-500">{selectedReasons.length} / 3</span></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{ARGUMENT_REASONS.map((reason) => { const selected = selectedReasons.includes(reason.id); return <button key={reason.id} type="button" onClick={() => toggleArgumentReason(reason.id)} className="rounded-[14px] border px-4 py-3 text-left transition" style={{ borderColor: selected ? `rgba(${LENSES[reason.lens].color},.34)` : "rgba(255,255,255,.09)", background: selected ? `rgba(${LENSES[reason.lens].color},.06)` : "rgba(0,0,0,.12)" }}><div className="text-[14px] font-semibold text-white">{reason.short}</div><div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgb(${LENSES[reason.lens].color})` }}>{LENSES[reason.lens].label}</div></button>; })}</div></div>
                </div>
                <ArgumentPreview claim={claim} selectedReasons={selectedReasons} lensCounts={argumentLensCounts} />
              </div>
            </section>
          </DiscoveryLessonBlock>

          <nav className="flex flex-col gap-3 pb-10 sm:flex-row sm:justify-between" aria-label="Philosophy navigation"><Link href="/humanities/philosophy/metaphysics" className="inline-flex items-center gap-2 rounded-[18px] border border-white/[0.09] bg-black/[0.16] px-4 py-3 text-[13px] text-slate-300 transition hover:border-white/[0.16] hover:text-white"><ArrowLeft size={15} /> Metaphysics</Link><Link href="/humanities/philosophy/aesthetics" className="inline-flex items-center justify-end gap-2 rounded-[18px] border border-amber-200/[0.14] bg-amber-300/[0.04] px-4 py-3 text-[13px] font-semibold text-amber-100 transition hover:bg-amber-300/[0.08]">Next: Aesthetics <ArrowRight size={15} /></Link></nav>
        </div>
      </div>
    </main>
  );
}

function QuestionCard({ icon, title, text, rgb }: { icon: ReactNode; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border p-4" style={{ borderColor: `rgba(${rgb},.18)`, background: `rgba(${rgb},.035)` }}><div className="flex items-center gap-2 font-semibold" style={{ color: `rgb(${rgb})` }}>{icon}<span>{title}</span></div><p className="mt-2 text-[14px] leading-6 text-slate-200">{text}</p></div>;
}

function FrameworkRow({ lens, question, focus, caution, rgb }: { lens: string; question: string; focus: string; caution: string; rgb: string }) {
  return <div className="grid gap-4 p-5 sm:grid-cols-[190px_1fr] sm:p-6"><div><div className="text-[17px] font-semibold" style={{ color: `rgb(${rgb})` }}>{lens}</div><div className="mt-2 text-[14px] leading-6 text-white">{question}</div></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-[14px] border border-white/[0.07] bg-black/[0.16] p-4"><div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Highlights</div><p className="mt-2 text-[14px] leading-6 text-slate-200">{focus}</p></div><div className="rounded-[14px] border border-white/[0.07] bg-black/[0.16] p-4"><div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Do not reduce it to</div><p className="mt-2 text-[14px] leading-6 text-slate-200">{caution}</p></div></div></div>;
}

function ScenarioCard() {
  return <div className="rounded-[20px] border border-teal-200/[0.14] bg-teal-300/[0.035] p-5 sm:p-6"><div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.09em] text-teal-100"><ListChecks size={16} /> New case</div><h3 className="mt-3 text-[21px] font-semibold text-white">A school is considering hallway cameras to reduce theft.</h3><p className="mt-3 text-[16px] leading-7 text-slate-100">The cameras would record students continuously during the school day. Administrators expect fewer thefts and easier investigations, while students raise concerns about privacy, trust, and how recordings might be used later.</p></div>;
}

function ArgumentPreview({ claim, selectedReasons, lensCounts }: { claim: string; selectedReasons: string[]; lensCounts: Record<Lens, number> }) {
  const selected = selectedReasons.map((id) => ARGUMENT_REASONS.find((reason) => reason.id === id)).filter((reason): reason is (typeof ARGUMENT_REASONS)[number] => Boolean(reason));
  const lensKinds = (Object.keys(lensCounts) as Lens[]).filter((lens) => lensCounts[lens] > 0);
  return <div className="mt-7 rounded-[22px] border border-white/[0.10] bg-black/[0.24] p-5 sm:p-6">
    <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.09em] text-amber-100"><Scale size={16} /> Your argument</div>
    <div className="mt-4 rounded-[16px] border border-amber-300/[0.16] bg-amber-300/[0.035] px-4 py-4 text-[18px] font-semibold text-white">Claim: {claim}.</div>
    {selected.length ? <div className="mt-4 space-y-3">{selected.map((reason, index) => <div key={reason.id} className="grid gap-3 rounded-[16px] border border-white/[0.08] bg-black/[0.16] p-4 sm:grid-cols-[32px_1fr_auto] sm:items-start"><span className="font-mono text-[12px] text-slate-500">R{index + 1}</span><div><p className="text-[15px] leading-7 text-slate-100">{reason.text}</p><p className="mt-1.5 text-[13px] leading-6 text-slate-400">{reason.why}</p></div><span className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ borderColor: `rgba(${LENSES[reason.lens].color},.22)`, color: `rgb(${LENSES[reason.lens].color})` }}>{LENSES[reason.lens].label}</span></div>)}</div> : <p className="mt-4 text-[15px] leading-7 text-slate-300">Choose reasons above. The goal is not to earn a moral score; it is to make the structure of your argument inspectable.</p>}
    {selected.length ? <div className="mt-5 rounded-[16px] border border-white/[0.08] bg-white/[0.025] p-4"><div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-400">Stress test</div>{lensKinds.length >= 2 ? <p className="mt-2 text-[15px] leading-7 text-emerald-100">Your argument draws on {lensKinds.map((lens) => LENSES[lens].label.toLowerCase()).join(" + ")}. Different lenses can converge on one claim for different reasons.</p> : <p className="mt-2 text-[15px] leading-7 text-amber-100">Your argument currently relies on one reasoning lens. That can still be coherent, but try asking what the other lenses would challenge or add before treating the case as settled.</p>}</div> : null}
  </div>;
}
