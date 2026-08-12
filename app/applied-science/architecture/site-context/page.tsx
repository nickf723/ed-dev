import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Compass,
  Droplets,
  MapPinned,
  Mountain,
  Route,
  SunMedium,
  Wind,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import BlueprintBackground from "../BlueprintBackground";

type LessonPresentation = {
  icon: LucideIcon;
  rgb: string;
  question: string;
  layer: string;
};

const PRESENTATION: Record<string, LessonPresentation> = {
  "applied.architecture.site-context.analysis-constraints": {
    icon: MapPinned,
    rgb: "56, 189, 248",
    question: "What physical, legal, ecological, and infrastructural facts already shape what can happen here?",
    layer: "existing conditions",
  },
  "applied.architecture.site-context.climate-orientation": {
    icon: SunMedium,
    rgb: "251, 191, 36",
    question: "How do sun, shade, wind, exposure, and seasonal patterns change the value of different orientations?",
    layer: "environmental forces",
  },
  "applied.architecture.site-context.topography-water": {
    icon: Mountain,
    rgb: "74, 222, 128",
    question: "How do slope, contours, drainage, and water movement affect placement, grading, and ground contact?",
    layer: "terrain + water",
  },
  "applied.architecture.site-context.access-surroundings": {
    icon: Route,
    rgb: "192, 132, 252",
    question: "Where do people, vehicles, service, neighbors, streets, views, noise, and public space meet the project?",
    layer: "connections + edges",
  },
};

export default function SiteContextPage() {
  const unit = curriculumRegistry.getNode("applied.architecture.site-context");
  if (!unit) throw new Error("Site & Context is missing from the curriculum registry.");

  const lessons = (unit.children ?? []).map((lesson) => ({
    id: lesson.id,
    label: lesson.label,
    href: lesson.href,
    description: lesson.description ?? "",
    status: lesson.status,
    presentation: PRESENTATION[lesson.id],
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06141a] text-slate-100 selection:bg-emerald-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-54"><BlueprintBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_14%,rgba(74,222,128,0.09),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(56,189,248,0.06),transparent_28%),linear-gradient(to_bottom,rgba(6,20,26,0.16),rgba(3,10,15,0.92))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(134,239,172,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.022)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture", href: "/applied-science/architecture" },
            { label: "Site & Context" },
          ]}
          eyebrow="Conditions · Climate · Terrain · Water · Access · Surroundings"
          icon={Compass}
          title={<span>Site & Context</span>}
          subtitle="Read the forces already acting on a place before deciding where and how a building should meet the ground."
          accentRgb="74, 222, 128"
          titleClassName="font-serif text-[clamp(2.9rem,5.1vw,5.4rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-emerald-300/[0.13]"
          aside={<div className="rounded-full border border-emerald-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-emerald-200/85 backdrop-blur-md">observe → map → interpret → respond</div>}
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-emerald-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/72">Unit throughline</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">A site is not an empty rectangle waiting for a building.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">Every site arrives with geometry, terrain, water, vegetation, utilities, climate, access, neighbors, rules, histories, opportunities, and risks. Site design begins by separating observation from response: first map what is there, then decide what those conditions mean for the project.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <CoreFact icon={MapPinned} label="Observe" text="Record existing conditions before deciding whether they are opportunities, constraints, or simply facts." rgb="56, 189, 248" />
            <CoreFact icon={Wind} label="Interpret forces" text="Climate, terrain, water, movement, noise, views, and neighboring conditions act directionally." rgb="74, 222, 128" />
            <CoreFact icon={Building2} label="Respond" text="Placement, orientation, access, form, landscape, and ground contact become design decisions." rgb="251, 191, 36" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-emerald-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/75">Layered site reading</div>
              <p className="mt-1 text-[13px] text-slate-500">Four kinds of information, one piece of ground.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">base map + forces + movement + context</div>
          </div>

          <div className="grid items-stretch gap-3 xl:grid-cols-[minmax(500px,0.94fr)_minmax(540px,1.06fr)]">
            <div className="grid gap-3 sm:grid-cols-2">
              {lessons.map((lesson, index) => {
                const presentation = lesson.presentation ?? { icon: Compass, rgb: "134,239,172", question: lesson.description, layer: "site" };
                const Icon = presentation.icon;
                const planned = lesson.status === "placeholder";
                return <article key={lesson.id} className="relative min-h-[205px] rounded-[18px] border p-4 opacity-75" style={{ borderColor: `rgba(${presentation.rgb},0.16)`, background: `linear-gradient(150deg, rgba(${presentation.rgb},0.045), rgba(3,12,16,0.72) 58%)` }}><div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.24)`, background: `rgba(${presentation.rgb},0.055)` }}><Icon size={18} /></span><span className="font-mono text-[9px] text-slate-700">0{index + 1}</span></div><h3 className="mt-4 text-[16px] font-semibold text-slate-100">{lesson.label}</h3><div className="mt-1 font-mono text-[9px] uppercase tracking-[0.10em]" style={{ color: `rgba(${presentation.rgb},0.70)` }}>{presentation.layer}</div><p className="mt-3 text-[11px] leading-5 text-slate-500">{presentation.question}</p>{planned ? <span className="absolute bottom-4 right-4 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-600">Planned</span> : <Link href={lesson.href} className="absolute bottom-4 right-4 text-emerald-300">Open</Link>}</article>;
              })}
            </div>
            <SiteLayers />
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-3">
          <Principle title="Map fact before judgment" text="A large tree is an existing condition. Whether it becomes shade, habitat, obstruction, identity, or removal pressure is a later interpretation." />
          <Principle title="Conditions interact" text="A sunny edge may also be noisy; a low point may collect water; the easiest vehicle access may conflict with the best pedestrian arrival." />
          <Principle title="Context changes the building" text="The same program can produce very different architecture on a flat urban corner, wooded slope, exposed coast, or tight infill parcel." />
        </section>

        <nav className="mt-3 pb-8" aria-label="Site and context navigation"><Link href="/applied-science/architecture" className="inline-flex items-center gap-2 rounded-full border border-amber-300/[0.10] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300"><ArrowLeft size={12} /> Architecture map</Link></nav>
      </div>
    </main>
  );
}

function SiteLayers() {
  return <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[20px] border border-emerald-200/[0.10] bg-[#041318]/86 p-4"><div className="absolute left-4 top-4 z-10"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Composite site diagram</div><div className="mt-1 text-[9px] text-emerald-300/65">layers describe the same place</div></div><svg viewBox="0 0 620 470" className="w-full max-w-[680px]" role="img" aria-label="Layered site diagram showing boundary, contours, water, climate, access, and neighbors"><defs><pattern id="site-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(125,211,252,0.055)" strokeWidth="1" /></pattern></defs><rect width="620" height="470" fill="url(#site-grid)" /><rect x="105" y="70" width="390" height="320" rx="5" fill="rgba(74,222,128,0.025)" stroke="#86efac" strokeWidth="3" strokeDasharray="10 7" /><text x="112" y="60" fill="#86efac" fontSize="10">PROPERTY / STUDY AREA</text><g fill="none" stroke="#4ade80" strokeWidth="1.7" opacity="0.45"><path d="M80 125 C185 90 305 140 520 100"/><path d="M75 165 C190 130 330 180 530 142"/><path d="M78 210 C205 175 340 222 535 188"/><path d="M85 260 C205 220 350 280 532 235"/><path d="M90 315 C210 275 370 330 520 290"/></g><text x="120" y="300" fill="#86efac" fontSize="10">CONTOURS / SLOPE</text><path d="M165 92 C210 180 190 250 235 370" fill="none" stroke="#38bdf8" strokeWidth="5" opacity="0.7" /><path d="M230 360 L247 350 L241 372 Z" fill="#38bdf8" /><text x="245" y="360" fill="#7dd3fc" fontSize="10">DRAINAGE PATH</text><rect x="30" y="385" width="560" height="42" fill="rgba(148,163,184,0.09)" stroke="rgba(148,163,184,0.28)"/><line x1="60" y1="406" x2="560" y2="406" stroke="#94a3b8" strokeWidth="2" strokeDasharray="12 8"/><text x="42" y="447" fill="#94a3b8" fontSize="10">STREET / PUBLIC EDGE</text><path d="M295 406 L295 350" stroke="#c084fc" strokeWidth="5" /><path d="M420 406 L420 330" stroke="#f97316" strokeWidth="5" /><text x="265" y="340" fill="#d8b4fe" fontSize="9">PEDESTRIAN</text><text x="399" y="319" fill="#fdba74" fontSize="9">SERVICE</text><rect x="505" y="120" width="75" height="135" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.30)" /><text x="510" y="112" fill="#94a3b8" fontSize="9">NEIGHBOR</text><circle cx="540" cy="75" r="14" fill="#fbbf24" opacity="0.8"/><g stroke="#fbbf24" strokeWidth="2" opacity="0.65"><line x1="540" y1="48" x2="540" y2="35"/><line x1="516" y1="55" x2="505" y2="44"/><line x1="564" y1="55" x2="575" y2="44"/></g><path d="M520 85 Q425 115 350 165" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="7 6" opacity="0.55"/><text x="367" y="144" fill="#fde68a" fontSize="9">SUN / EXPOSURE</text><path d="M70 80 C120 90 145 105 185 128" fill="none" stroke="#a78bfa" strokeWidth="3" /><path d="M183 128 L168 123 L174 139 Z" fill="#a78bfa"/><text x="67" y="70" fill="#c4b5fd" fontSize="9">WIND</text><g fill="#4ade80" opacity="0.72"><circle cx="145" cy="245" r="18"/><circle cx="455" cy="285" r="24"/><circle cx="390" cy="95" r="15"/></g><text x="125" y="274" fill="#86efac" fontSize="9">EXISTING VEGETATION</text></svg><div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-x-4 gap-y-2 rounded-xl border border-white/[0.05] bg-black/60 px-3 py-2 text-[9px] text-slate-600 backdrop-blur-md"><span><Droplets size={10} className="mr-1 inline text-sky-300"/>water</span><span><Mountain size={10} className="mr-1 inline text-emerald-300"/>terrain</span><span><SunMedium size={10} className="mr-1 inline text-amber-300"/>climate</span><span><Route size={10} className="mr-1 inline text-violet-300"/>access</span></div></div>;
}

function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) { return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15}/></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>; }
function Principle({ title, text }: { title: string; text: string }) { return <div className="rounded-[18px] border border-emerald-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"><h3 className="text-[13px] font-semibold text-slate-200">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
