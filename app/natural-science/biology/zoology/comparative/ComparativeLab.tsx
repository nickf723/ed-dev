"use client";

import { useEffect, useMemo, useState } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import SynchronizedComparisonTopology, {
  type ComparisonSpecimen,
} from "@/app/_page-system/topologies/SynchronizedComparisonTopology";
import TraitMatrix, { type TraitMatrixRow } from "@/app/_page-system/widgets/TraitMatrix";
import AnatomicalLayerBackground from "@/app/_page-system/backgrounds/AnatomicalLayerBackground";
import type { DesignPaletteRoles } from "@/lib/design-system/schema";
import {
  Activity,
  AirVent,
  Bone,
  Brain,
  CircleDot,
  Gauge,
  HeartPulse,
  Move,
  Scan,
  Utensils,
} from "lucide-react";
import type { AnimalRecord } from "../zoology-data";

type FunctionId = "locomotion" | "respiration" | "circulation" | "feeding" | "support" | "sensing";

type SpecimenDefinition = {
  id: string;
  label: string;
  scientificName: string;
  shape: ComparisonSpecimen["shape"];
  accentRgb: string;
  className: string;
  systems: Record<FunctionId, {
    label: string;
    detail: string;
    tradeoff: string;
    values: Record<string, string>;
  }>;
};

const FUNCTIONS: { id: FunctionId; label: string; question: string; icon: typeof Move }[] = [
  { id: "locomotion", label: "Locomotion", question: "How is force turned into movement?", icon: Move },
  { id: "respiration", label: "Respiration", question: "How does oxygen reach exchange surfaces?", icon: AirVent },
  { id: "circulation", label: "Circulation", question: "How are gases and nutrients transported?", icon: HeartPulse },
  { id: "feeding", label: "Feeding", question: "How is food captured and processed?", icon: Utensils },
  { id: "support", label: "Support", question: "What resists gravity and muscle force?", icon: Bone },
  { id: "sensing", label: "Sensing", question: "How is information collected and integrated?", icon: Brain },
];

const SPECIMENS: SpecimenDefinition[] = [
  {
    id: "cheetah",
    label: "Cheetah",
    scientificName: "Acinonyx jubatus",
    shape: "quadruped",
    accentRgb: "251, 146, 60",
    className: "Mammalia",
    systems: {
      locomotion: { label: "Flexible-spine sprint", detail: "Long limbs and a highly flexing spine lengthen the stride while claws increase traction during rapid acceleration.", tradeoff: "Extreme sprint performance creates heat quickly and cannot be sustained for long pursuits.", values: { medium: "land", actuator: "paired limbs + axial spine", exchange: "ground reaction force", tempo: "explosive" } },
      respiration: { label: "Tidal lungs", detail: "A muscular diaphragm ventilates alveolar lungs while breathing rate rises steeply during a chase.", tradeoff: "Tidal flow mixes fresh and residual air, but mammalian alveoli provide enormous exchange area.", values: { medium: "air", actuator: "diaphragm + rib cage", exchange: "alveoli", tempo: "variable" } },
      circulation: { label: "Four-chamber pump", detail: "Separate pulmonary and systemic circuits support high pressure to the body while protecting delicate lung capillaries.", tradeoff: "High output supports endothermy and sprinting but carries a large resting energy cost.", values: { medium: "blood", actuator: "four-chamber heart", exchange: "capillary beds", tempo: "high pressure" } },
      feeding: { label: "Shear-and-tear jaws", detail: "Canines seize prey while carnassial teeth slice flesh with a scissor-like action.", tradeoff: "Specialized slicing teeth are less versatile for grinding tough plant material.", values: { medium: "solid prey", actuator: "jaw adductors", exchange: "carnassial teeth", tempo: "rapid ingestion" } },
      support: { label: "Internal skeleton", detail: "A lightweight endoskeleton transmits muscle force and permits large body size without molting.", tradeoff: "Bones remodel and heal, but joints and tendons remain vulnerable to high-speed loading.", values: { medium: "internal frame", actuator: "muscle on bone", exchange: "joints + tendons", tempo: "continuous growth" } },
      sensing: { label: "Forward visual tracking", detail: "Binocular vision, vestibular control, and rapid proprioceptive feedback stabilize a moving target during a sprint.", tradeoff: "Forward-facing eyes improve depth judgment while reducing panoramic coverage.", values: { medium: "light + motion", actuator: "eyes + inner ear", exchange: "brain networks", tempo: "milliseconds" } },
    },
  },
  {
    id: "eagle",
    label: "Harpy eagle",
    scientificName: "Harpia harpyja",
    shape: "bird",
    accentRgb: "250, 204, 21",
    className: "Aves",
    systems: {
      locomotion: { label: "Powered flight", detail: "Large flight muscles deform the wing through a flapping cycle while feathers continuously reshape the lifting surface.", tradeoff: "Flight opens three-dimensional space but demands low mass and high metabolic power.", values: { medium: "air", actuator: "pectoral flight muscles", exchange: "wing + feathers", tempo: "cyclic" } },
      respiration: { label: "Flow-through lung", detail: "Air sacs keep fresh air moving through rigid parabronchi during both inhalation and exhalation.", tradeoff: "The system is highly efficient but anatomically integrated with a network of delicate air sacs.", values: { medium: "air", actuator: "air sacs + sternum", exchange: "parabronchi", tempo: "continuous flow" } },
      circulation: { label: "Four-chamber pump", detail: "A large heart and complete circuit separation supply the intense aerobic demand of flight muscles.", tradeoff: "High cardiac output supports flight and endothermy at substantial energetic cost.", values: { medium: "blood", actuator: "four-chamber heart", exchange: "dense muscle capillaries", tempo: "very high output" } },
      feeding: { label: "Hooked beak + talons", detail: "Feet capture and restrain prey while the beak tears tissue, separating capture from processing.", tradeoff: "A toothless lightweight skull favors flight, while prey processing relies on beak shape and digestive specialization.", values: { medium: "solid prey", actuator: "feet + neck", exchange: "talons + beak", tempo: "capture then tear" } },
      support: { label: "Light rigid frame", detail: "Fused bones, pneumatic spaces, and a keeled sternum create a stiff but relatively light platform for flight muscles.", tradeoff: "Rigidity improves force transfer but sacrifices some spinal and limb flexibility.", values: { medium: "internal frame", actuator: "muscle on bone", exchange: "fused joints", tempo: "continuous growth" } },
      sensing: { label: "High-acuity vision", detail: "Large eyes and dense retinal sampling resolve prey through clutter at long distance.", tradeoff: "Extreme visual investment occupies substantial skull volume and neural processing.", values: { medium: "light", actuator: "eyes", exchange: "visual pathways", tempo: "rapid" } },
    },
  },
  {
    id: "tuna",
    label: "Bluefin tuna",
    scientificName: "Thunnus thynnus",
    shape: "fish",
    accentRgb: "56, 189, 248",
    className: "Actinopterygii",
    systems: {
      locomotion: { label: "Thunniform cruising", detail: "Most lateral motion is concentrated near a narrow tail base, driving a stiff crescent tail with low drag.", tradeoff: "Excellent sustained speed and efficiency come with reduced maneuverability in tight spaces.", values: { medium: "water", actuator: "axial red muscle", exchange: "caudal fin", tempo: "continuous" } },
      respiration: { label: "Ram-ventilated gills", detail: "Forward swimming moves water across thin gill lamellae where countercurrent exchange preserves a strong oxygen gradient.", tradeoff: "Efficient extraction supports high activity but makes sustained water flow across gills essential.", values: { medium: "water", actuator: "swimming + buccal flow", exchange: "gill lamellae", tempo: "continuous flow" } },
      circulation: { label: "Single circuit", detail: "A two-chambered heart sends deoxygenated blood to gills and then directly through the body.", tradeoff: "A single circuit is compact, but pressure falls after passing through gill capillaries.", values: { medium: "blood", actuator: "two-chamber heart", exchange: "gills then tissues", tempo: "single pass" } },
      feeding: { label: "Ram capture", detail: "Streamlined pursuit and jaw expansion draw prey into the mouth while teeth retain slippery targets.", tradeoff: "A fast predatory feeding system is poorly suited to grinding or prolonged manipulation.", values: { medium: "aquatic prey", actuator: "jaw + body speed", exchange: "oral cavity", tempo: "rapid strike" } },
      support: { label: "Buoyed endoskeleton", detail: "Bone supports muscle while surrounding water offsets much of body weight.", tradeoff: "Aquatic support reduces the need for massive weight-bearing limbs but provides little help on land.", values: { medium: "internal frame + water", actuator: "axial muscle", exchange: "vertebral column", tempo: "continuous" } },
      sensing: { label: "Vision + lateral line", detail: "Eyes track targets while mechanoreceptors detect local water motion and pressure changes.", tradeoff: "The lateral line is exquisitely tuned to water movement and has no direct terrestrial equivalent.", values: { medium: "light + water motion", actuator: "eyes + neuromasts", exchange: "brain networks", tempo: "rapid" } },
    },
  },
  {
    id: "octopus",
    label: "Giant Pacific octopus",
    scientificName: "Enteroctopus dofleini",
    shape: "cephalopod",
    accentRgb: "192, 132, 252",
    className: "Cephalopoda",
    systems: {
      locomotion: { label: "Arms + jet", detail: "Eight muscular hydrostats crawl, reach, and steer while mantle contractions can expel water for rapid jet escape.", tradeoff: "Arms provide extraordinary dexterity; jetting is powerful but energetically costly.", values: { medium: "water + substrate", actuator: "muscular hydrostats + mantle", exchange: "arms + siphon", tempo: "flexible" } },
      respiration: { label: "Mantle-pumped gills", detail: "Rhythmic mantle contractions pull water across paired gills before it exits through the siphon.", tradeoff: "The same mantle system participates in breathing and jet propulsion, coupling two demands.", values: { medium: "water", actuator: "mantle", exchange: "gills", tempo: "pulsed" } },
      circulation: { label: "Three-heart closed circuit", detail: "Two branchial hearts push blood through gills while a systemic heart drives oxygenated blood through the body.", tradeoff: "Closed vessels support an active large nervous system but are costly to maintain.", values: { medium: "hemolymph", actuator: "three hearts", exchange: "gills + tissues", tempo: "closed high flow" } },
      feeding: { label: "Arms, suckers, beak", detail: "Flexible arms explore and restrain prey; a hard beak cuts tissue while venomous saliva subdues some prey.", tradeoff: "Extreme manipulation ability depends on complex neural control distributed into the arms.", values: { medium: "solid prey", actuator: "arms + buccal mass", exchange: "suckers + beak", tempo: "manipulative" } },
      support: { label: "Muscular hydrostat", detail: "Dense three-dimensional muscle arrays resist deformation without bones, allowing an arm to stiffen, bend, shorten, or twist.", tradeoff: "A soft body accesses tiny spaces but offers little passive structural support.", values: { medium: "soft tissue", actuator: "cross-woven muscle", exchange: "arm tissue", tempo: "continuous deformation" } },
      sensing: { label: "Distributed sensing", detail: "Camera-like eyes integrate with highly sensory suckers and large neural centers in each arm.", tradeoff: "Distributed control enables parallel exploration but requires coordination across semi-autonomous limbs.", values: { medium: "light + touch + chemistry", actuator: "eyes + suckers", exchange: "brain + arm ganglia", tempo: "parallel" } },
    },
  },
];

const MATRIX_ROWS = [
  { id: "medium", label: "Working medium", note: "What physical environment must the system push against or move through?" },
  { id: "actuator", label: "Main actuator", note: "Where does the mechanical or physiological work originate?" },
  { id: "exchange", label: "Interface", note: "Where does the system actually contact its environment or another system?" },
  { id: "tempo", label: "Operating pattern", note: "Continuous, cyclic, pulsed, explosive, or distributed?" },
] as const;

export default function ComparativeLab({ palette }: { palette: DesignPaletteRoles }) {
  const [functionId, setFunctionId] = useState<FunctionId>("locomotion");
  const [phase, setPhase] = useState(28);
  const [selectedSpecimenId, setSelectedSpecimenId] = useState("cheetah");
  const [liveRecord, setLiveRecord] = useState<AnimalRecord | null>(null);
  const activeFunction = FUNCTIONS.find((item) => item.id === functionId) ?? FUNCTIONS[0];
  const selectedSpecimen = SPECIMENS.find((item) => item.id === selectedSpecimenId) ?? SPECIMENS[0];

  const comparisonSpecimens = useMemo<ComparisonSpecimen[]>(() => SPECIMENS.map((specimen) => ({
    id: specimen.id,
    label: specimen.label,
    scientificName: specimen.scientificName,
    shape: specimen.shape,
    accentRgb: specimen.accentRgb,
    activeLabel: specimen.systems[functionId].label,
    activeDetail: specimen.systems[functionId].detail,
    tradeoff: specimen.systems[functionId].tradeoff,
  })), [functionId]);

  const matrixRows = useMemo<TraitMatrixRow[]>(() => MATRIX_ROWS.map((row) => ({
    ...row,
    values: Object.fromEntries(SPECIMENS.map((specimen) => [specimen.id, specimen.systems[functionId].values[row.id]])),
  })), [functionId]);

  useEffect(() => {
    const controller = new AbortController();
    setLiveRecord(null);
    fetch(`/api/zoology/taxa?q=${encodeURIComponent(selectedSpecimen.scientificName)}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((payload: { animals?: AnimalRecord[] }) => setLiveRecord(payload.animals?.[0] ?? null))
      .catch(() => setLiveRecord(null));
    return () => controller.abort();
  }, [selectedSpecimen.scientificName]);

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: `rgb(${palette.background})`, color: `rgb(${palette.text})` }}>
      <AnatomicalLayerBackground accentRgb={palette.secondary} />
      <div className="relative z-10 mx-auto w-full max-w-[1640px] px-4 pb-16 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-40 -mx-4 border-b border-white/[0.07] bg-[#031018]/82 px-4 pb-3 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Biology", href: "/natural-science/biology" },
              { label: "Zoology", href: "/natural-science/biology/zoology" },
              { label: "Comparative Zoology" },
            ]}
            eyebrow="Function · structure · constraint · tradeoff"
            eyebrowStyle="rule"
            icon={Scan}
            title={<span>Comparative Zoology</span>}
            subtitle="Start with a job, not a vocabulary list. Run several animal body plans through the same functional problem and compare how ancestry, materials, and environment reshape the solution."
            accentRgb={palette.secondary}
            titleClassName="text-[clamp(2.7rem,5vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.06em] text-[#f3fbff]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.18] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-200/65">Choose the job</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {FUNCTIONS.map((item) => {
                const Icon = item.icon;
                const active = item.id === functionId;
                return <button key={item.id} type="button" onClick={() => setFunctionId(item.id)} className={`flex items-center gap-2 rounded-[12px] border px-3 py-2.5 text-[9px] transition ${active ? "border-cyan-300/[0.20] bg-cyan-400/[0.075] text-cyan-100" : "border-white/[0.06] bg-white/[0.018] text-slate-500 hover:text-slate-300"}`}><Icon size={12} />{item.label}</button>;
              })}
            </div>
            <p className="mt-4 text-[12px] leading-6 text-slate-400"><strong className="text-slate-200">{activeFunction.question}</strong> Compare four lineages on the same clock, then use the trait matrix to separate the physical problem from the particular anatomy.</p>
          </div>
          <LiveSpecimenCard specimen={selectedSpecimen} record={liveRecord} />
        </section>

        <section className="mt-4">
          <SynchronizedComparisonTopology specimens={comparisonSpecimens} phase={phase} functionLabel={activeFunction.label} selectedId={selectedSpecimenId} onSelect={setSelectedSpecimenId} />
          <div className="mt-3 flex items-center gap-4 rounded-[16px] border border-white/[0.07] bg-black/[0.16] px-4 py-3 backdrop-blur-xl">
            <Activity size={13} className="text-cyan-200/60" />
            <input type="range" min={0} max={100} value={phase} onChange={(event) => setPhase(Number(event.target.value))} className="flex-1 accent-cyan-300" aria-label="Synchronized motion phase" />
            <span className="w-12 text-right font-mono text-[9px] text-slate-500">{phase}%</span>
          </div>
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/60"><CircleDot size={11} /> Same question, aligned variables</div>
            <TraitMatrix columns={SPECIMENS.map((specimen) => ({ id: specimen.id, label: specimen.label }))} rows={matrixRows} accentByColumn={Object.fromEntries(SPECIMENS.map((specimen) => [specimen.id, specimen.accentRgb]))} />
          </div>
          <div className="space-y-3">
            <Principle icon={Gauge} title="Constraint" text="Water, air, gravity, diffusion distance, and material strength limit what a biological system can do." rgb={palette.secondary} />
            <Principle icon={Bone} title="Inheritance" text="Evolution modifies structures that already exist. A lineage rarely begins with a blank engineering drawing." rgb={palette.tertiary} />
            <Principle icon={Activity} title="Tradeoff" text="Speed, efficiency, maneuverability, robustness, and cost cannot all be maximized at once." rgb={palette.quaternary} />
          </div>
        </section>

        <section className="mt-8 rounded-[30px] border border-white/[0.08] bg-black/[0.16] p-6 backdrop-blur-xl sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
            <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/65">Comparison rule</div><h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] text-white">Similar function does not imply similar ancestry.</h2></div>
            <div className="grid gap-3 md:grid-cols-3"><Idea title="Homologous" text="Structures can share ancestry even after their functions diverge—such as a mammal forelimb becoming a paw, wing, flipper, or hand." /><Idea title="Analogous" text="Different ancestral structures can solve the same problem—such as insect wings and bird wings producing flight." /><Idea title="Exaptation" text="A structure evolved in one context can later become useful for another, such as feathers preceding powered flight." /></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function LiveSpecimenCard({ specimen, record }: { specimen: SpecimenDefinition; record: AnimalRecord | null }) {
  return <div className="rounded-[28px] border bg-black/[0.18] p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${specimen.accentRgb},0.16)` }}><div className="flex items-center justify-between gap-4"><div><div className="font-mono text-[8px] uppercase tracking-[0.13em]" style={{ color: `rgba(${specimen.accentRgb},0.68)` }}>selected specimen</div><strong className="mt-1 block text-[16px] text-white">{specimen.label}</strong><span className="mt-1 block font-serif text-[10px] italic text-slate-500">{specimen.scientificName}</span></div><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${specimen.accentRgb})`, borderColor: `rgba(${specimen.accentRgb},0.20)`, background: `rgba(${specimen.accentRgb},0.045)` }}><Scan size={15} /></span></div><div className="mt-4 grid grid-cols-2 gap-2"><Mini label="class" value={record?.taxonomy.className ?? specimen.className} /><Mini label="observations" value={record?.observationsCount ? new Intl.NumberFormat("en", { notation: "compact" }).format(record.observationsCount) : "live lookup"} /></div></div>;
}
function Mini({ label, value }: { label: string; value: string }) { return <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.018] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</div><div className="mt-1 truncate text-[9px] text-slate-400">{value}</div></div>; }
function Principle({ icon: Icon, title, text, rgb }: { icon: typeof Gauge; title: string; text: string; rgb: string }) { return <article className="rounded-[20px] border bg-black/[0.16] p-4 backdrop-blur-xl" style={{ borderColor: `rgba(${rgb},0.13)` }}><div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={11} />{title}</div><p className="mt-2 text-[9px] leading-4 text-slate-500">{text}</p></article>; }
function Idea({ title, text }: { title: string; text: string }) { return <div className="rounded-[16px] border border-white/[0.07] bg-white/[0.018] p-4"><strong className="text-[11px] text-slate-200">{title}</strong><p className="mt-2 text-[9px] leading-4 text-slate-600">{text}</p></div>; }
