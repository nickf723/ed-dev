import Link from "next/link";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Building2,
  Cable,
  Compass,
  Construction,
  DraftingCompass,
  Layers3,
  ShieldCheck,
  SunMedium,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import BlueprintBackground from "./BlueprintBackground";

type BranchPresentation = {
  icon: LucideIcon;
  rgb: string;
  shorthand: string;
  question: string;
};

const PRESENTATION: Record<string, BranchPresentation> = {
  "applied.architecture.spatial-design": {
    icon: DraftingCompass,
    rgb: "56, 189, 248",
    shorthand: "people + space",
    question: "What spaces are needed, how large are they, and how should people move between them?",
  },
  "applied.architecture.site-context": {
    icon: Compass,
    rgb: "74, 222, 128",
    shorthand: "place + climate",
    question: "How should the building respond to sun, wind, terrain, access, and its surroundings?",
  },
  "applied.architecture.structures-construction": {
    icon: Construction,
    rgb: "251, 146, 60",
    shorthand: "loads + assembly",
    question: "What carries the loads, how do the pieces connect, and can the design actually be built?",
  },
  "applied.architecture.building-science": {
    icon: Layers3,
    rgb: "34, 211, 238",
    shorthand: "enclosure + performance",
    question: "How do walls, roofs, openings, and materials manage weather, heat, air, moisture, and daylight?",
  },
  "applied.architecture.building-systems": {
    icon: Cable,
    rgb: "192, 132, 252",
    shorthand: "services + comfort",
    question: "How do air, water, power, lighting, acoustics, and safety systems fit inside the building?",
  },
  "applied.architecture.practice-delivery": {
    icon: ShieldCheck,
    rgb: "251, 191, 36",
    shorthand: "rules + coordination",
    question: "How do codes, accessibility, documentation, consultants, cost, and construction shape what gets delivered?",
  },
};

export default function ArchitecturePage() {
  const architecture = curriculumRegistry.getNode("applied.architecture");
  if (!architecture) throw new Error("Architecture is missing from the curriculum registry.");

  const branches = (architecture.children ?? []).map((branch) => ({
    id: branch.id,
    label: branch.label,
    description: branch.description ?? "",
    status: branch.status,
    presentation: PRESENTATION[branch.id],
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06121d] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <BlueprintBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_82%_12%,rgba(56,189,248,0.11),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(251,191,36,0.07),transparent_28%),linear-gradient(to_bottom,rgba(6,18,29,0.18),rgba(3,9,16,0.90))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(125,211,252,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.025)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture" },
          ]}
          eyebrow="Program · Site · Structure · Envelope · Systems · Delivery"
          icon={Building2}
          title={<span>Architecture</span>}
          subtitle="Design habitable space by coordinating human use, place, structure, enclosure, technical systems, and the rules that turn a concept into a buildable project."
          accentRgb="251, 191, 36"
          titleClassName="font-serif text-[clamp(3rem,5.4vw,5.7rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-sky-300/[0.13]"
          aside={
            <div className="rounded-full border border-amber-300/[0.15] bg-black/25 px-4 py-2 font-mono text-[12px] text-amber-200/85 backdrop-blur-md">
              building = coordinated constraints
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-sky-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/72">Core idea</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">A building is several problems occupying the same space.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">
              A successful design cannot optimize a floor plan in isolation. Rooms need structure; structure competes with ducts and pipes; the envelope meets weather; every decision lands on a site, affects people, and must survive codes, budgets, documentation, and construction. Architecture coordinates those constraints into one inhabitable whole.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <CoreFact icon={Accessibility} label="Human use" text="Program, circulation, accessibility, comfort, and experience." rgb="56, 189, 248" />
            <CoreFact icon={SunMedium} label="Environmental performance" text="Site, climate, daylight, enclosure, energy, and material behavior." rgb="74, 222, 128" />
            <CoreFact icon={Construction} label="Realization" text="Structure, systems, codes, coordination, documentation, and construction." rgb="251, 191, 36" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-sky-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300/75">Building assembly</div>
              <p className="mt-1 text-[13px] text-slate-500">Six architectural lenses, all acting on the same building.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">plan + section + systems + constraints</div>
          </div>

          <div className="grid items-stretch gap-3 xl:grid-cols-[minmax(520px,1.02fr)_minmax(500px,0.98fr)]">
            <div className="grid gap-3 sm:grid-cols-2">
              {branches.map((branch, index) => {
                const presentation = branch.presentation ?? {
                  icon: DraftingCompass,
                  rgb: "125, 211, 252",
                  shorthand: "architecture",
                  question: branch.description,
                };
                const Icon = presentation.icon;
                const planned = branch.status === "placeholder";

                return (
                  <article
                    key={branch.id}
                    className={`relative min-h-[174px] rounded-[18px] border p-4 ${planned ? "opacity-75" : ""}`}
                    style={{
                      borderColor: `rgba(${presentation.rgb},0.17)`,
                      background: `linear-gradient(145deg, rgba(${presentation.rgb},0.045), rgba(3,10,17,0.72) 56%)`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          color: `rgb(${presentation.rgb})`,
                          borderColor: `rgba(${presentation.rgb},0.24)`,
                          background: `rgba(${presentation.rgb},0.055)`,
                        }}
                      >
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-[9px] text-slate-700">0{index + 1}</span>
                          {planned ? (
                            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-600">Planned</span>
                          ) : null}
                        </div>
                        <h3 className="mt-1 text-[16px] font-semibold tracking-[-0.02em] text-slate-100">{branch.label}</h3>
                        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.11em]" style={{ color: `rgba(${presentation.rgb},0.70)` }}>{presentation.shorthand}</div>
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] leading-5 text-slate-500">{presentation.question}</p>
                  </article>
                );
              })}
            </div>

            <BuildingSection />
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
          <div className="rounded-[22px] border border-amber-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">A design is a negotiation</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <ConstraintCard title="Change the plan" text="Structure, egress, daylight, systems, and cost may all move with it." />
              <ConstraintCard title="Change the envelope" text="Comfort, energy, moisture risk, appearance, structure, and details respond." />
              <ConstraintCard title="Change the site" text="Orientation, access, grading, drainage, views, and climate strategy shift." />
            </div>
          </div>

          <div className="rounded-[22px] border border-violet-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">Adjacent lenses</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Architecture overlaps other fields, but asks a different question of the same building.</p>
            <div className="mt-3 grid gap-2">
              <RelatedLink href="/applied-science/engineering/civil" label="Civil Engineering" detail="loads, foundations, infrastructure, structural performance" rgb="167, 139, 250" />
              <RelatedLink href="/applied-science/materials-science" label="Materials Science" detail="material structure, properties, processing, durability" rgb="34, 211, 238" />
              <RelatedLink href="/humanities/visual-arts/architecture" label="Architecture as Visual Art" detail="style, formal language, history, masterworks, aesthetic interpretation" rgb="96, 165, 250" />
            </div>
          </div>
        </section>

        <div className="mt-3 pb-8">
          <Link href="/applied-science" className="inline-flex items-center gap-2 rounded-full border border-violet-300/[0.10] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
            <ArrowLeft size={12} /> Applied Sciences map
          </Link>
        </div>
      </div>
    </main>
  );
}

function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span>
      <span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span>
    </div>
  );
}

function BuildingSection() {
  return (
    <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden rounded-[20px] border border-sky-200/[0.10] bg-[#04111c]/86 p-4">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Coordinated building section</div>
        <div className="mt-1 text-[10px] text-sky-300/65">every layer shares the same geometry</div>
      </div>

      <svg viewBox="0 0 620 500" className="w-full max-w-[650px]" role="img" aria-label="Building section showing site, program, structure, envelope, systems, and delivery annotations">
        <defs>
          <pattern id="arch-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(125,211,252,0.07)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="620" height="500" fill="url(#arch-grid)" />

        <path d="M40 410 C150 390 230 416 330 402 C430 388 505 397 585 382" fill="none" stroke="#4ade80" strokeWidth="4" opacity="0.75" />
        <text x="46" y="435" fill="#86efac" fontSize="11">SITE / GRADE</text>

        <rect x="145" y="118" width="340" height="278" rx="4" fill="rgba(56,189,248,0.025)" stroke="#22d3ee" strokeWidth="4" />
        <path d="M145 118 L315 55 L485 118" fill="rgba(34,211,238,0.025)" stroke="#22d3ee" strokeWidth="4" />
        <text x="492" y="135" fill="#67e8f9" fontSize="11">ENVELOPE</text>

        <g stroke="#fb923c" strokeWidth="5" opacity="0.86">
          <line x1="190" y1="118" x2="190" y2="396" />
          <line x1="315" y1="80" x2="315" y2="396" />
          <line x1="440" y1="118" x2="440" y2="396" />
          <line x1="145" y1="215" x2="485" y2="215" />
          <line x1="145" y1="305" x2="485" y2="305" />
        </g>
        <text x="154" y="101" fill="#fdba74" fontSize="11">STRUCTURE</text>

        <g fill="rgba(56,189,248,0.08)" stroke="rgba(125,211,252,0.36)" strokeWidth="1.5">
          <rect x="198" y="225" width="105" height="70" rx="4" />
          <rect x="326" y="225" width="104" height="70" rx="4" />
          <rect x="198" y="315" width="232" height="68" rx="4" />
        </g>
        <g fill="#bae6fd" fontSize="10">
          <text x="212" y="246">PROGRAM</text>
          <text x="212" y="263">ROOM / USE</text>
          <text x="341" y="246">CIRCULATION</text>
          <text x="341" y="263">ACCESS / FLOW</text>
          <text x="212" y="337">SHARED SPACE</text>
        </g>

        <g fill="none" stroke="#c084fc" strokeWidth="3" opacity="0.85">
          <path d="M165 180 H465" strokeDasharray="10 7" />
          <path d="M175 275 H450" strokeDasharray="4 6" />
          <path d="M215 135 V390" strokeDasharray="7 7" />
        </g>
        <g fill="#d8b4fe" fontSize="10">
          <text x="370" y="174">AIR / POWER / WATER</text>
          <text x="372" y="270">LIGHT / ACOUSTICS</text>
        </g>

        <g stroke="#fbbf24" strokeWidth="1.5" fill="none" opacity="0.75">
          <line x1="120" y1="118" x2="120" y2="396" />
          <line x1="113" y1="118" x2="127" y2="118" />
          <line x1="113" y1="396" x2="127" y2="396" />
          <line x1="145" y1="425" x2="485" y2="425" />
          <line x1="145" y1="418" x2="145" y2="432" />
          <line x1="485" y1="418" x2="485" y2="432" />
        </g>
        <g fill="#fde68a" fontSize="10">
          <text x="74" y="260" transform="rotate(-90 74 260)">CODES / DIMENSIONS</text>
          <text x="251" y="446">DOCUMENT / COORDINATE / BUILD</text>
        </g>

        <path d="M515 85 A50 50 0 0 1 565 135" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.65" />
        <circle cx="515" cy="85" r="7" fill="#fbbf24" opacity="0.7" />
        <text x="507" y="66" fill="#fde68a" fontSize="10">SUN / CLIMATE</text>
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 rounded-xl border border-white/[0.05] bg-black/58 px-3 py-2 text-[9px] text-slate-500 backdrop-blur-md">
        <span className="text-sky-300">■ program</span>
        <span className="text-green-300">■ site</span>
        <span className="text-orange-300">■ structure</span>
        <span className="text-cyan-300">■ envelope</span>
        <span className="text-violet-300">■ systems</span>
        <span className="text-amber-300">■ delivery</span>
      </div>
    </div>
  );
}

function ConstraintCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[16px] border border-white/[0.045] bg-white/[0.012] p-3">
      <h3 className="text-[12px] font-semibold text-slate-200">{title}</h3>
      <p className="mt-1.5 text-[10px] leading-4 text-slate-600">{text}</p>
    </div>
  );
}

function RelatedLink({ href, label, detail, rgb }: { href: string; label: string; detail: string; rgb: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3 rounded-[15px] border border-white/[0.05] bg-black/[0.14] p-3 transition-colors hover:border-white/[0.10]">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})` }} />
      <span className="min-w-0 flex-1">
        <strong className="block text-[11px] font-semibold text-slate-300">{label}</strong>
        <span className="mt-0.5 block text-[9px] leading-4 text-slate-600">{detail}</span>
      </span>
      <ArrowRight size={12} className="shrink-0 text-slate-700 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
