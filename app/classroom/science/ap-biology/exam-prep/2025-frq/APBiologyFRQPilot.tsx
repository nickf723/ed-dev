"use client";

import { useState } from "react";
import { Check, Dna, ExternalLink, FlaskConical } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";

const FRQ_URL = "https://apcentral.collegeboard.org/media/pdf/ap25-frq-biology.pdf";
const SCORING_URL = "https://apcentral.collegeboard.org/media/pdf/ap25-sg-biology.pdf";

export default function APBiologyFRQPilot() {
  const [keystone, setKeystone] = useState("");
  const [control, setControl] = useState("");
  const [nullChoice, setNullChoice] = useState("");
  const [chain, setChain] = useState(0);
  const controlChecked = Boolean(control);
  const nullChecked = Boolean(nullChoice);

  return <main className="relative min-h-screen overflow-x-hidden bg-[#07110c] text-stone-100">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(74,222,128,0.16),transparent_28%),linear-gradient(to_bottom,#0b1a11,#060a08)]" />
    <div className="relative mx-auto w-full max-w-[1050px] px-4 py-5 sm:px-6">
      <DomainPageHeader breadcrumbs={[{ label: "Classroom", href: "/classroom" }, { label: "AP Biology", href: "/classroom/science/ap-biology" }, { label: "Exam Review", href: "/classroom/science/ap-biology/exam-prep" }, { label: "2025 FRQ" }]} eyebrow="2025 AP Biology · Question 3" icon={Dna} title={<span>Design the comparison</span>} subtitle="Build each point from the experimental logic before turning it into a paragraph response." accentRgb="74, 222, 128" metadataTextClassName="text-[11px]" iconClassName="rounded-[16px]" headerClassName="border-green-200/[0.14]" />
      <div className="mt-4 flex flex-wrap gap-3 text-[12px]"><a href={FRQ_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-green-200"><ExternalLink size={13} />Released FRQs</a><a href={SCORING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-green-200"><ExternalLink size={13} />Scoring guidelines</a></div>

      <section className="mt-5 rounded-[22px] border border-green-200/14 bg-black/20 p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-green-300/75"><FlaskConical size={14} />Released Question 3 · complete prompt</div>
        <div className="mt-3 space-y-4 text-[15px] leading-7 text-stone-200">
          <p>Buffelgrass, an invasive grass species in southwestern desert ecosystems, is threatening the saguaro cactus, a keystone species in these ecosystems. Buffelgrass is drought-tolerant and can survive wildfires. However, the dry buffelgrass also acts as fuel for wildfires, causing the fires to be more severe. Older saguaro cacti can survive wildfires; however, many of the young cacti cannot.</p>
          <p>Scientists conducted an experiment to determine whether they could control the abundance of the buffelgrass population. The scientists identified several native grass species that, when grown with buffelgrass, might reduce the abundance of buffelgrass. They grew buffelgrass in the presence of several different native grass species in greenhouses, in either nondrought (watered every 3 days) or drought (watered every 9 days) conditions. After twelve weeks, they measured the height and dry weight of the buffelgrass in each treatment group.</p>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{[{ label: "Changed", value: "Native grass + watering schedule" }, { label: "Measured", value: "Buffelgrass height + dry mass" }, { label: "Goal", value: "Test whether natives reduce buffelgrass" }].map((item) => <div key={item.label} className="rounded-xl border border-white/[0.07] bg-black/20 p-3"><div className="text-[10px] uppercase tracking-[0.12em] text-stone-500">{item.label}</div><div className="mt-2 text-[13px] leading-5 text-stone-200">{item.value}</div></div>)}</div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <ReasoningCard number="A" title="Removal changes the system" prompt="Describe the effect that removing a keystone species will have on an ecosystem.">
          <Choice label="The ecosystem’s community structure and stability can change substantially." selected={keystone === "disrupt"} onClick={() => setKeystone("disrupt")} />
          <Choice label="No meaningful change occurs because another species immediately takes the same role." selected={keystone === "no-change"} onClick={() => setKeystone("no-change")} />
          <Feedback visible={Boolean(keystone)} correct={keystone === "disrupt"}>A keystone species has a disproportionately large effect, so removing it can alter populations, interactions, and ecosystem stability.</Feedback>
        </ReasoningCard>
        <ReasoningCard number="B" title="Choose the control" prompt="Identify a control group the scientists should include in their experiment.">
          <Choice label="Buffelgrass grown alone under both watering schedules" selected={control === "alone"} onClick={() => setControl("alone")} />
          <Choice label="Native grasses grown without buffelgrass" selected={control === "native"} onClick={() => setControl("native")} />
          <Feedback visible={controlChecked} correct={control === "alone"}>The control removes the proposed cause—native-grass competition—while retaining the drought comparison.</Feedback>
        </ReasoningCard>
        <ReasoningCard number="C" title="Construct the null" prompt="State the null hypothesis of the experiment in which buffelgrass is grown in the presence of native grass species.">
          <Choice label="Native grass will not change buffelgrass height or dry mass" selected={nullChoice === "no-change"} onClick={() => setNullChoice("no-change")} />
          <Choice label="Native grass will always eliminate buffelgrass" selected={nullChoice === "eliminate"} onClick={() => setNullChoice("eliminate")} />
          <Feedback visible={nullChecked} correct={nullChoice === "no-change"}>A null hypothesis names the measurable outcomes and predicts no treatment-driven difference.</Feedback>
        </ReasoningCard>
        <div className="rounded-[22px] border border-green-200/14 bg-black/20 p-5">
          <div className="font-mono text-[11px] text-green-300">PART D</div>
          <h2 className="mt-2 text-[20px] font-semibold text-white">Justify the claim</h2>
          <p className="mt-2 text-[15px] leading-7 text-stone-300">Scientists have found that the population growth rates of native grasses are much slower than the population growth rate of buffelgrass following a wildfire. The scientists claim that wildfires will therefore increase the abundance of buffelgrass plants in the ecosystem. Based on the information given, justify the scientists’ claim.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[22px] border border-green-200/14 bg-black/20 p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-green-300/75">Part D · Build the justification</div>
        <p className="mt-2 text-[14px] leading-6 text-stone-300">Reveal one causal link at a time. A justification earns its point by connecting evidence to the claim—not by repeating either one.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{["Wildfire occurs", "Native grasses recover more slowly", "Buffelgrass gains a larger share"].map((step, index) => <button key={step} type="button" disabled={index > chain} onClick={() => setChain(Math.min(3, index + 1))} className={`min-h-[76px] rounded-[14px] border p-3 text-left text-[13px] disabled:cursor-not-allowed ${index < chain ? "border-green-200/20 bg-green-300/[0.07] text-green-100" : "border-white/[0.07] bg-black/15 text-stone-500 disabled:opacity-40"}`}><span className="mr-2 font-mono text-green-300">{index + 1}</span>{index < chain ? step : "Reveal next link"}</button>)}</div>
        <div className="mt-3 min-h-[58px] rounded-xl border border-white/[0.06] bg-black/15 p-3 text-[13px] leading-5 text-stone-300">{chain === 3 ? "Complete reasoning: because buffelgrass rebounds faster after fire, it faces less competition while native populations recover, so its abundance is expected to increase." : "The claim is not complete until the mechanism connects all three links."}</div>
      </section>
      <p className="mt-5 text-[13px] leading-6 text-stone-500">Question 3 is transcribed from College Board’s publicly released 2025 free-response questions. The experiment labels, response choices, causal-chain interaction, and feedback are independently authored study supports.</p>
    </div>
  </main>;
}

function ReasoningCard({ number, title, prompt, children }: { number: string; title: string; prompt: string; children: React.ReactNode }) {
  return <div className="rounded-[22px] border border-white/[0.08] bg-black/20 p-5"><div className="font-mono text-[11px] text-green-300">PART {number}</div><h2 className="mt-2 text-[20px] font-semibold text-white">{title}</h2><p className="mt-2 min-h-[52px] text-[13px] leading-5 text-stone-400">{prompt}</p><div className="mt-3 space-y-2">{children}</div></div>;
}

function Choice({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`min-h-12 w-full rounded-xl border px-3 py-3 text-left text-[15px] leading-6 ${selected ? "border-green-200/25 bg-green-300/[0.08] text-green-100" : "border-white/[0.07] text-stone-300"}`}>{label}</button>;
}

function Feedback({ visible, correct, children }: { visible: boolean; correct: boolean; children: React.ReactNode }) {
  return <div className={`min-h-[70px] rounded-xl border p-3 text-[13px] leading-5 transition-opacity ${visible ? correct ? "border-emerald-200/16 bg-emerald-300/[0.04] text-emerald-100 opacity-100" : "border-amber-200/16 bg-amber-300/[0.04] text-amber-100 opacity-100" : "border-transparent opacity-0"}`}>{visible ? <><Check size={14} className="mr-2 inline" />{correct ? children : "That changes the comparison. Remove the treatment itself while keeping the measured conditions parallel."}</> : null}</div>;
}
