"use client";

import { useMemo, useState } from "react";
import { Activity, ClipboardList, MapPin, Network, Users } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ScenarioKey = "function" | "community" | "followup" | "continuity";

type Scenario = {
  key: ScenarioKey;
  label: string;
  rgb: string;
  need: string;
  settings: readonly string[];
  contributors: readonly { role: string; contribution: string; rgb: string }[];
  handoff: readonly string[];
  caution: string;
};

const SCENARIOS: readonly Scenario[] = [
  {
    key: "function",
    label: "Recover function",
    rgb: "251,191,36",
    need: "A fictional person is rebuilding everyday function after a mobility-limiting event. The learning question is how roles and settings coordinate, not what treatment the person should receive.",
    settings: ["care setting", "rehabilitation", "home / community", "follow-up"],
    contributors: [
      { role: "Nursing", contribution: "monitoring, education, safety, care coordination, day-to-day response", rgb: "244,114,182" },
      { role: "Physical therapy", contribution: "movement, mobility, physical function, progression, environmental demands", rgb: "251,191,36" },
      { role: "Occupational therapy", contribution: "daily activities, adaptation, routines, equipment, participation", rgb: "192,132,252" },
      { role: "Health informatics", contribution: "shared records, referral status, scheduling, continuity, data flow", rgb: "125,211,252" },
    ],
    handoff: ["current function and safety needs", "goals and barriers", "what was tried and how it went", "equipment or environmental context", "who owns the next follow-up"],
    caution: "Real rehabilitation plans are individualized and profession-specific. This map shows coordination questions only.",
  },
  {
    key: "community",
    label: "Community prevention",
    rgb: "94,234,212",
    need: "A neighborhood organization wants to reduce preventable heat-related health risk during very hot weather. The task is to map population-health work, access, communication, and evaluation.",
    settings: ["community data", "program design", "outreach / services", "evaluation"],
    contributors: [
      { role: "Public health", contribution: "population patterns, prevention strategy, surveillance, program evaluation", rgb: "94,234,212" },
      { role: "Community health", contribution: "local context, trust, outreach, access barriers, resource navigation", rgb: "134,239,172" },
      { role: "Environmental health", contribution: "exposure conditions, place-based risk, built environment, mitigation context", rgb: "125,211,252" },
      { role: "Health communication", contribution: "audience needs, message testing, channels, language, comprehension", rgb: "244,114,182" },
    ],
    handoff: ["who may be underserved", "what resource actually exists", "how information reaches people", "which barriers remain", "how outcomes will be measured"],
    caution: "This is a generic program-design example, not local emergency guidance. Real public-health actions depend on current local conditions and authorities.",
  },
  {
    key: "followup",
    label: "Diagnostic follow-up",
    rgb: "125,211,252",
    need: "A fictional diagnostic result needs to move from measurement to review and follow-up without getting lost. The focus is the information system around care, not interpretation of the result itself.",
    settings: ["collection / imaging", "quality review", "result routing", "follow-up"],
    contributors: [
      { role: "Laboratory / imaging", contribution: "measurement quality, acquisition, technical checks, reporting workflow", rgb: "125,211,252" },
      { role: "Nursing / coordination", contribution: "follow-up logistics, communication, questions, continuity, escalation pathways", rgb: "244,114,182" },
      { role: "Health informatics", contribution: "identity matching, result routing, alerts, interoperability, auditability", rgb: "192,132,252" },
      { role: "Medicine", contribution: "clinical interpretation and diagnostic or treatment decisions sit in the neighboring Medicine field", rgb: "45,212,191" },
    ],
    handoff: ["correct person and record", "test context and quality notes", "who has reviewed the result", "who communicates next steps", "closed-loop confirmation"],
    caution: "The lab deliberately does not interpret medical results. It models reliable information flow and responsibility.",
  },
  {
    key: "continuity",
    label: "Long-term continuity",
    rgb: "192,132,252",
    need: "A fictional person has a long-term health need that touches multiple services over time. The learning question is how systems preserve goals, context, access, and responsibility between encounters.",
    settings: ["daily life", "scheduled care", "support services", "longitudinal review"],
    contributors: [
      { role: "Nursing", contribution: "monitoring, education, coordination, self-management support, continuity", rgb: "244,114,182" },
      { role: "Nutrition / rehabilitation", contribution: "function- or nutrition-specific assessment, goals, practice, adaptation", rgb: "134,239,172" },
      { role: "Health systems", contribution: "access, scheduling, referrals, quality improvement, service coordination", rgb: "251,191,36" },
      { role: "Health informatics", contribution: "longitudinal records, shared plans, reminders, measures, data stewardship", rgb: "125,211,252" },
    ],
    handoff: ["person-defined goals", "current supports and barriers", "changes since last contact", "responsibility for unresolved items", "what should be revisited and when"],
    caution: "Continuity is not one standardized pathway. Needs, roles, resources, and scope of practice vary by person and setting.",
  },
] as const;

export default function CareNetworkLab() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("function");
  const [focusIndex, setFocusIndex] = useState(0);
  const scenario = useMemo(() => SCENARIOS.find((item) => item.key === scenarioKey) ?? SCENARIOS[0], [scenarioKey]);
  const focus = scenario.settings[Math.min(focusIndex, scenario.settings.length - 1)];

  function chooseScenario(key: ScenarioKey) {
    setScenarioKey(key);
    setFocusIndex(0);
  }

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-teal-100/[0.10]" style={{ background: "rgba(5,17,16,0.26)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-teal-100/56"><Network size={13} /> Care-network laboratory</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.9vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Who contributes, where does information move, and what can fall through the cracks?</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/76">Choose a fictional coordination problem. The lab maps professional contributions and handoff information. It does not prescribe care, assign scopes of practice universally, or replace local professional standards.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">Current waypoint</span>
          <strong className="mt-2 block text-[17px]" style={{ color: `rgb(${scenario.rgb})` }}>{focus}</strong>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Move through the pathway to see the same coordination problem from different settings.</p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((item) => <button key={item.key} type="button" onClick={() => chooseScenario(item.key)} className="border px-3 py-2 text-[11px] font-semibold transition" style={{ color: item.key === scenarioKey ? `rgb(${item.rgb})` : "rgba(148,163,184,0.72)", borderColor: item.key === scenarioKey ? `rgba(${item.rgb},0.30)` : "rgba(255,255,255,0.06)", background: item.key === scenarioKey ? `rgba(${item.rgb},0.055)` : "rgba(0,0,0,0.025)" }}>{item.label}</button>)}
        </div>

        <div className="mt-4 grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div className="border border-white/[0.065] bg-black/[0.045] p-4">
              <div className="flex items-start gap-3"><Activity size={15} style={{ color: `rgb(${scenario.rgb})` }} className="mt-0.5 shrink-0" /><p className="text-[12px] leading-5 text-slate-400/78">{scenario.need}</p></div>
            </div>

            <div className="relative mt-4 grid gap-2 sm:grid-cols-4">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-[25px] hidden h-px bg-white/[0.07] sm:block" />
              {scenario.settings.map((setting, index) => {
                const active = focusIndex === index;
                return <button key={setting} type="button" onClick={() => setFocusIndex(index)} className="relative z-10 min-h-[82px] border px-3 py-3 text-left transition" style={{ borderColor: active ? `rgba(${scenario.rgb},0.32)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${scenario.rgb},0.055)` : "rgba(5,17,16,0.68)" }}><span className="flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[9px]" style={{ color: `rgb(${scenario.rgb})`, borderColor: `rgba(${scenario.rgb},0.25)` }}>0{index + 1}</span><strong className="mt-2 block text-[11px] leading-4 text-white/76">{setting}</strong></button>;
              })}
            </div>

            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {scenario.contributors.map((item) => <div key={item.role} className="border-l-2 bg-black/[0.04] px-3 py-3" style={{ borderColor: `rgba(${item.rgb},0.34)` }}><div className="flex items-center gap-2"><Users size={12} style={{ color: `rgb(${item.rgb})` }} /><strong className="text-[11px] text-white/78">{item.role}</strong></div><p className="mt-1.5 text-[10px] leading-4 text-slate-600">{item.contribution}</p></div>)}
            </div>
          </div>

          <div className="border border-white/[0.065] bg-black/[0.045] p-4">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-teal-100/48"><ClipboardList size={12} /> Handoff packet</div>
            <p className="mt-2 text-[10px] leading-4 text-slate-600">Information that may need to survive the transition into or out of <strong className="text-slate-400">{focus}</strong>:</p>
            <div className="mt-3 space-y-2">
              {scenario.handoff.map((item, index) => <div key={item} className="grid grid-cols-[24px_minmax(0,1fr)] gap-2 border-b border-white/[0.05] pb-2 last:border-b-0"><span className="font-mono text-[9px]" style={{ color: `rgba(${scenario.rgb},0.55)` }}>0{index + 1}</span><span className="text-[10px] leading-4 text-slate-500">{item}</span></div>)}
            </div>
            <div className="mt-4 flex items-start gap-2 border-t border-white/[0.06] pt-3"><MapPin size={12} className="mt-0.5 shrink-0 text-slate-600" /><p className="text-[10px] leading-4 text-slate-600">{scenario.caution}</p></div>
          </div>
        </div>
      </div>
    </Surface>
  );
}
