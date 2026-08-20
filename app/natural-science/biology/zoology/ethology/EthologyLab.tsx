"use client";

import { useEffect, useMemo, useState } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BehaviorSequenceTopology, {
  type BehaviorSequenceEvent,
} from "@/app/_page-system/topologies/BehaviorSequenceTopology";
import Ethogram, { type EthogramEntry } from "@/app/_page-system/widgets/Ethogram";
import FieldTraceBackground from "@/app/_page-system/backgrounds/FieldTraceBackground";
import type { DesignPaletteRoles } from "@/lib/design-system/schema";
import {
  Activity,
  Brain,
  Clock3,
  Eye,
  Footprints,
  GitBranch,
  Radio,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { AnimalRecord } from "../zoology-data";

type Scenario = {
  id: string;
  label: string;
  scientificName: string;
  accentRgb: string;
  duration: number;
  setting: string;
  question: string;
  codes: string[];
  events: (BehaviorSequenceEvent & { observation: string; expectedCode: string })[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "meerkat-sentinel",
    label: "Meerkat sentinel",
    scientificName: "Suricata suricatta",
    accentRgb: "250, 204, 21",
    duration: 46,
    setting: "Open Kalahari foraging group",
    question: "How can one individual change the risk experienced by the whole group?",
    codes: ["Vigilance", "Foraging", "Alarm signal", "Escape", "Resume"],
    events: [
      { id: "m1", start: 0, end: 9, label: "Group forages", actor: "foragers", phase: "state", accentRgb: "132,204,22", observation: "Several individuals dig and search while one animal occupies a raised perch.", expectedCode: "Foraging" },
      { id: "m2", start: 9, end: 17, label: "Sentinel scans", actor: "sentinel", phase: "action", accentRgb: "96,165,250", observation: "The perched individual repeatedly turns its head and pauses feeding.", expectedCode: "Vigilance" },
      { id: "m3", start: 17, end: 22, label: "Aerial alarm call", actor: "sentinel", phase: "stimulus", signal: "sharp alarm vocalization", accentRgb: "248,113,113", observation: "The sentinel produces a short alarm call immediately after orienting upward.", expectedCode: "Alarm signal" },
      { id: "m4", start: 22, end: 34, label: "Group dives for cover", actor: "foragers", phase: "action", accentRgb: "192,132,252", observation: "Foragers stop digging and run into burrows or beneath cover.", expectedCode: "Escape" },
      { id: "m5", start: 34, end: 46, label: "Foraging resumes", actor: "group", phase: "feedback", accentRgb: "52,211,153", observation: "Individuals re-emerge gradually and begin digging again after the alarm ends.", expectedCode: "Resume" },
    ],
  },
  {
    id: "bee-recruitment",
    label: "Honey bee recruitment",
    scientificName: "Apis mellifera",
    accentRgb: "251, 191, 36",
    duration: 52,
    setting: "Inside a dark honey bee colony",
    question: "How can movement encode information about a place outside the nest?",
    codes: ["Search", "Signal", "Recruitment", "Navigation", "Feedback"],
    events: [
      { id: "b1", start: 0, end: 10, label: "Scout returns", actor: "scout", phase: "state", accentRgb: "250,204,21", observation: "A forager returns carrying nectar after discovering a profitable flower patch.", expectedCode: "Search" },
      { id: "b2", start: 10, end: 23, label: "Waggle run", actor: "scout", phase: "action", signal: "angle + duration of body vibration", accentRgb: "251,146,60", observation: "The scout repeats a straight vibrating run at a consistent angle relative to gravity.", expectedCode: "Signal" },
      { id: "b3", start: 23, end: 31, label: "Followers sample dance", actor: "followers", phase: "consequence", accentRgb: "167,139,250", observation: "Nearby workers contact the dancer and follow several circuits before leaving the dance floor.", expectedCode: "Recruitment" },
      { id: "b4", start: 31, end: 44, label: "Recruits depart", actor: "recruits", phase: "action", accentRgb: "56,189,248", observation: "Followers leave the hive and travel toward the communicated direction and distance.", expectedCode: "Navigation" },
      { id: "b5", start: 44, end: 52, label: "Patch feedback", actor: "foragers", phase: "feedback", accentRgb: "52,211,153", observation: "Successful recruits return with nectar and may begin additional dances.", expectedCode: "Feedback" },
    ],
  },
  {
    id: "orca-hunt",
    label: "Orca cooperative hunt",
    scientificName: "Orcinus orca",
    accentRgb: "96, 165, 250",
    duration: 58,
    setting: "Cold coastal hunting group",
    question: "How can coordinated behavior create an outcome no single hunter could produce as efficiently?",
    codes: ["Search", "Coordination", "Herding", "Attack", "Sharing"],
    events: [
      { id: "o1", start: 0, end: 12, label: "Group searches", actor: "pod", phase: "state", accentRgb: "56,189,248", observation: "Several whales travel in a loose formation while repeatedly surfacing and changing heading.", expectedCode: "Search" },
      { id: "o2", start: 12, end: 22, label: "Calls intensify", actor: "pod", phase: "stimulus", signal: "repeated social calls", accentRgb: "167,139,250", observation: "Vocal activity increases as whales converge toward a prey patch.", expectedCode: "Coordination" },
      { id: "o3", start: 22, end: 35, label: "Prey compressed", actor: "drivers", phase: "action", accentRgb: "45,212,191", observation: "Several whales circle and redirect prey into a tighter group.", expectedCode: "Herding" },
      { id: "o4", start: 35, end: 47, label: "Strike sequence", actor: "attackers", phase: "consequence", accentRgb: "248,113,113", observation: "Individuals accelerate through the compressed prey group in alternating passes.", expectedCode: "Attack" },
      { id: "o5", start: 47, end: 58, label: "Food distributed", actor: "pod", phase: "feedback", accentRgb: "52,211,153", observation: "Group members remain close as captured prey is consumed and portions are shared.", expectedCode: "Sharing" },
    ],
  },
];

const TINBERGEN = [
  { icon: Brain, title: "Mechanism", question: "What immediate neural, hormonal, sensory, or muscular processes produce it?", rgb: "96,165,250" },
  { icon: Clock3, title: "Development", question: "How does the behavior change with age, experience, and learning?", rgb: "167,139,250" },
  { icon: Target, title: "Function", question: "How can the behavior change survival or reproductive success?", rgb: "52,211,153" },
  { icon: GitBranch, title: "Phylogeny", question: "How does the behavior compare with related lineages and ancestral patterns?", rgb: "250,204,21" },
] as const;

export default function EthologyLab({ palette }: { palette: DesignPaletteRoles }) {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [time, setTime] = useState(12);
  const [selectedEventId, setSelectedEventId] = useState(SCENARIOS[0].events[1].id);
  const [assignments, setAssignments] = useState<Record<string, string | undefined>>({});
  const [record, setRecord] = useState<AnimalRecord | null>(null);
  const scenario = SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0];
  const selectedEvent = scenario.events.find((event) => event.id === selectedEventId) ?? scenario.events[0];

  const ethogramEntries = useMemo<EthogramEntry[]>(() => scenario.events.map((event) => ({
    id: event.id,
    start: event.start,
    end: event.end,
    actor: event.actor,
    behavior: event.observation,
    expectedCode: event.expectedCode,
  })), [scenario]);

  useEffect(() => {
    setAssignments({});
    setTime(Math.min(10, scenario.duration));
    setSelectedEventId(scenario.events[0].id);
  }, [scenario]);

  useEffect(() => {
    const controller = new AbortController();
    setRecord(null);
    fetch(`/api/zoology/taxa?q=${encodeURIComponent(scenario.scientificName)}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((payload: { animals?: AnimalRecord[] }) => setRecord(payload.animals?.[0] ?? null))
      .catch(() => setRecord(null));
    return () => controller.abort();
  }, [scenario.scientificName]);

  function chooseScenario(id: string) {
    setScenarioId(id);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: `rgb(${palette.background})`, color: `rgb(${palette.text})` }}>
      <FieldTraceBackground accentRgb={scenario.accentRgb} />
      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-16 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-40 -mx-4 border-b border-white/[0.07] bg-[#020611]/82 px-4 pb-3 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Biology", href: "/natural-science/biology" },
              { label: "Zoology", href: "/natural-science/biology/zoology" },
              { label: "Ethology" },
            ]}
            eyebrow="Observation · signal · decision · feedback"
            eyebrowStyle="rule"
            icon={Footprints}
            title={<span>Ethology</span>}
            subtitle="Behavior is evidence unfolding through time. Observe a sequence, code what the animal actually does, and then ask why that behavior exists at several different explanatory levels."
            accentRgb={scenario.accentRgb}
            titleClassName="text-[clamp(3rem,5.5vw,6.4rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-[#f6f8ff]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 xl:grid-cols-[1fr_330px]">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.18] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap gap-2">
              {SCENARIOS.map((item) => {
                const active = item.id === scenario.id;
                return <button key={item.id} type="button" onClick={() => chooseScenario(item.id)} className="rounded-[12px] border px-3 py-2.5 text-left transition" style={{ borderColor: `rgba(${item.accentRgb},${active ? 0.30 : 0.10})`, background: active ? `rgba(${item.accentRgb},0.075)` : "rgba(255,255,255,0.012)" }}><strong className="block text-[9px] text-white">{item.label}</strong><span className="mt-1 block font-serif text-[8px] italic text-slate-600">{item.scientificName}</span></button>;
              })}
            </div>
            <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">{scenario.question}</h2>
            <p className="mt-2 text-[10px] leading-5 text-slate-500">Setting: {scenario.setting}. Scrub the observation, select events, and code them below before comparing your categories with the expected ethogram.</p>
          </div>
          <LiveRecord scenario={scenario} record={record} />
        </section>

        <section className="mt-4">
          <BehaviorSequenceTopology
            events={scenario.events}
            duration={scenario.duration}
            currentTime={time}
            selectedId={selectedEventId}
            onSelect={(event) => { setSelectedEventId(event.id); setTime(event.start + (event.end - event.start) / 2); }}
          />
          <div className="mt-3 flex items-center gap-4 rounded-[16px] border border-white/[0.07] bg-black/[0.18] px-4 py-3 backdrop-blur-xl">
            <Eye size={13} style={{ color: `rgb(${scenario.accentRgb})` }} />
            <input type="range" min={0} max={scenario.duration} step={0.5} value={time} onChange={(event) => setTime(Number(event.target.value))} className="flex-1 accent-blue-300" aria-label="Observation time" />
            <span className="w-14 text-right font-mono text-[9px] text-slate-500">{time.toFixed(1)}s</span>
          </div>
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-[1fr_330px]">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-100/60"><Activity size={11} /> Code only what you can observe</div>
            <Ethogram entries={ethogramEntries} codes={scenario.codes} assignments={assignments} onAssign={(entryId, code) => setAssignments((current) => ({ ...current, [entryId]: code || undefined }))} />
          </div>
          <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.18] p-5 backdrop-blur-xl">
            <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">selected evidence</div>
            <h3 className="mt-2 text-[17px] font-semibold text-white">{selectedEvent.label}</h3>
            <p className="mt-3 text-[10px] leading-5 text-slate-400">{selectedEvent.observation}</p>
            <div className="mt-4 rounded-[14px] border border-white/[0.06] bg-white/[0.018] p-3">
              <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700"><Radio size={10} /> signal</div>
              <p className="mt-2 text-[9px] leading-4 text-slate-500">{selectedEvent.signal ?? "No explicit communicative signal is required to code this observation."}</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4"><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-100/60">Four different questions can all be correct</div><h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-white">Why does the animal do that?</h2></div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {TINBERGEN.map((item) => <QuestionCard key={item.title} {...item} />)}
          </div>
        </section>

        <section className="mt-8 rounded-[30px] border border-white/[0.08] bg-black/[0.16] p-6 backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[290px_1fr]">
            <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-100/60">Evidence first</div><h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-white">An ethogram separates observation from interpretation.</h2></div>
            <div className="grid gap-3 md:grid-cols-3"><Idea title="Describe" text="Record what changed in posture, movement, orientation, vocalization, contact, or location." /><Idea title="Code" text="Use categories that are mutually understandable and repeatable enough for another observer to score." /><Idea title="Explain" text="Only after the behavioral pattern is established do mechanism, learning, function, and ancestry enter the explanation." /></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function LiveRecord({ scenario, record }: { scenario: Scenario; record: AnimalRecord | null }) {
  return <div className="rounded-[28px] border bg-black/[0.18] p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${scenario.accentRgb},0.16)` }}><div className="flex items-center justify-between"><div><div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${scenario.accentRgb},0.68)` }}>live species context</div><strong className="mt-1 block text-[15px] text-white">{record?.commonName ?? scenario.label}</strong><span className="mt-1 block font-serif text-[9px] italic text-slate-500">{scenario.scientificName}</span></div><Users size={17} style={{ color: `rgb(${scenario.accentRgb})` }} /></div><div className="mt-4 grid grid-cols-2 gap-2"><Mini label="observations" value={record?.observationsCount ? new Intl.NumberFormat("en", { notation: "compact" }).format(record.observationsCount) : "loading"} /><Mini label="class" value={record?.taxonomy.className ?? "Animalia"} /></div></div>;
}
function Mini({ label, value }: { label: string; value: string }) { return <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.018] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</div><div className="mt-1 truncate text-[9px] text-slate-400">{value}</div></div>; }
function QuestionCard({ icon: Icon, title, question, rgb }: { icon: typeof Brain; title: string; question: string; rgb: string }) { return <article className="rounded-[20px] border bg-black/[0.17] p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${rgb},0.14)` }}><div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.70)` }}><Icon size={12} />{title}</div><p className="mt-3 text-[10px] leading-5 text-slate-500">{question}</p></article>; }
function Idea({ title, text }: { title: string; text: string }) { return <div className="rounded-[16px] border border-white/[0.07] bg-white/[0.018] p-4"><div className="flex items-center gap-2"><Sparkles size={10} className="text-blue-200/50" /><strong className="text-[10px] text-slate-200">{title}</strong></div><p className="mt-2 text-[9px] leading-4 text-slate-600">{text}</p></div>; }
