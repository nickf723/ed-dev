import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import XRayBackground from "./XRayBackground";
import JointWidget from "./JointWidget";
import {
  Activity,
  ArrowLeft,
  Bone,
  CircleDot,
  Droplets,
  Hammer,
  HeartPulse,
  Move3D,
  Shield,
  Sparkles,
  Weight,
  type LucideIcon,
} from "lucide-react";

const FUNCTIONS: readonly { icon: LucideIcon; title: string; text: string; rgb: string }[] = [
  { icon: Weight, title: "Support", text: "Provide a load-bearing framework for posture and soft tissues.", rgb: "251,191,36" },
  { icon: Shield, title: "Protect", text: "Enclose vulnerable structures such as the brain, spinal cord, heart, and lungs.", rgb: "96,165,250" },
  { icon: Move3D, title: "Create leverage", text: "Give muscles rigid attachment points and joints around which force can create movement.", rgb: "34,211,238" },
  { icon: Droplets, title: "Store minerals", text: "Participate in calcium and phosphate homeostasis rather than acting as inert mineral shelves.", rgb: "167,139,250" },
  { icon: HeartPulse, title: "House marrow", text: "Provide marrow spaces where blood-cell production occurs in active hematopoietic tissue.", rgb: "244,114,182" },
] as const;

const TISSUES = [
  ["Cortical bone", "Dense outer bone that resists bending and torsion while forming strong shafts and shells."],
  ["Trabecular bone", "A porous internal lattice aligned with loading patterns and rich in surface area for remodeling."],
  ["Articular cartilage", "Low-friction connective tissue covering many synovial joint surfaces; it is not bone."],
  ["Bone marrow", "Soft tissue within internal spaces; red marrow supports hematopoiesis while yellow marrow is rich in fat."],
] as const;

const DIVISIONS = [
  {
    title: "Axial skeleton",
    cue: "skull · vertebral column · thoracic cage",
    job: "central support + protection",
    detail: "The axial skeleton forms the body's longitudinal core. It supports the head and trunk and protects the brain, spinal cord, and thoracic organs.",
    rgb: "251,191,36",
  },
  {
    title: "Appendicular skeleton",
    cue: "pectoral girdle · upper limbs · pelvic girdle · lower limbs",
    job: "movement + load transfer",
    detail: "The appendicular skeleton connects limbs to the axial framework. Its geometry balances mobility, leverage, stability, manipulation, and locomotion.",
    rgb: "34,211,238",
  },
] as const;

export default function SkeletalSystemPage() {
  return (
    <SceneFrame
      background={<XRayBackground />}
      className="bg-[#07090b] text-stone-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(7,9,11,0.56)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Applied Science", href: "/applied-science" },
            { label: "Medicine", href: "/applied-science/medicine" },
            { label: "Anatomy & Physiology", href: "/applied-science/medicine/anatomy-physiology" },
            { label: "Skeletal System" },
          ]}
          eyebrow="Support · protection · leverage · joints · remodeling"
          eyebrowStyle="rule"
          icon={Bone}
          title={<span>Skeletal System</span>}
          subtitle="The skeleton is a living load-bearing system. Bone protects organs, transmits force, stores minerals, houses marrow, remodels over time, and works with joints and muscles to turn force into controlled movement."
          accentRgb="251, 191, 36"
          titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fff9e8]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(15,13,9,0.36),transparent_28%,transparent_72%,rgba(6,13,18,0.30))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.02fr)_minmax(430px,0.98fr)] xl:items-start">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68"><Sparkles size={14} /> Functional anatomy</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.5vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">Protection clusters around the core; movement radiates through the limbs.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/72">Axial and appendicular are organizational divisions, not separate machines. Loads move between them through joints and girdles, while muscles, ligaments, cartilage, nerves, and connective tissues determine what the skeleton can actually do.</p>
            <SkeletonMap />
          </div>

          <div className="xl:sticky xl:top-[170px]">
            <JointWidget />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {FUNCTIONS.map((item) => <FunctionCard key={item.title} {...item} />)}
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
        <Surface variant="glass" className="rounded-[26px] p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-rose-200/62"><Activity size={14} /> Bone is living tissue</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.045em] text-white">A bone is an organ, not a solid mineral rod.</h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/72">Bone contains living cells, extracellular matrix, blood vessels, nerves, marrow, and multiple structural organizations. Its material properties come from both mineral and collagen-rich organic matrix.</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {TISSUES.map(([title, text]) => (
              <div key={title} className="rounded-[17px] border border-white/[0.07] bg-black/[0.14] p-4">
                <strong className="text-[14px] text-white">{title}</strong>
                <p className="mt-2 text-[12px] leading-5 text-stone-400">{text}</p>
              </div>
            ))}
          </div>
        </Surface>

        <aside className="space-y-4 xl:sticky xl:top-[170px]">
          <div className="rounded-[22px] border border-amber-200/[0.12] bg-amber-300/[0.025] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/68"><Hammer size={13} /> Remodeling under load</div>
            <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Mechanical loading is one input into a living remodeling system.</h3>
            <p className="mt-3 text-[13px] leading-6 text-stone-300/72">Bone-forming osteoblasts and bone-resorbing osteoclasts continually reshape tissue. Mechanical strain matters, but remodeling is also influenced by hormones, nutrition, age, disease, injury, activity, and local cellular signaling.</p>
          </div>
          <div className="rounded-[22px] border border-rose-200/[0.10] bg-rose-300/[0.022] p-5 backdrop-blur-xl">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-rose-200/62">Common pitfall</div>
            <p className="mt-3 text-[13px] leading-6 text-stone-300/72"><strong className="text-white">“More load makes bone stronger” is too simple.</strong> Useful loading, excessive loading, unloading, fracture, hormones, and disease can drive very different biological responses.</p>
          </div>
        </aside>
      </section>

      <section className="mt-8 border-t border-amber-100/[0.09] pt-5">
        <Link href="/applied-science/medicine/anatomy-physiology" className="group inline-flex items-center gap-2 text-[12px] font-semibold text-amber-100/70 transition hover:text-white"><ArrowLeft size={14} className="transition group-hover:-translate-x-1" /> Back to Anatomy &amp; Physiology</Link>
      </section>
    </SceneFrame>
  );
}

function SkeletonMap() {
  return (
    <div className="mt-5 overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.15] p-4 backdrop-blur-xl sm:p-5">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)] md:items-center">
        <DivisionCard {...DIVISIONS[0]} align="right" />
        <div className="relative mx-auto h-[300px] w-[120px]" aria-label="Stylized axial and appendicular skeleton map">
          <div className="absolute left-1/2 top-5 h-12 w-12 -translate-x-1/2 rounded-full border-2 border-amber-200/55" />
          <div className="absolute left-1/2 top-[68px] h-[142px] w-3 -translate-x-1/2 rounded-full bg-amber-200/38" />
          <div className="absolute left-1/2 top-[96px] h-16 w-[76px] -translate-x-1/2 rounded-[50%] border border-amber-200/28" />
          <div className="absolute left-1/2 top-[199px] h-12 w-[62px] -translate-x-1/2 rounded-[45%] border border-cyan-200/30" />
          <div className="absolute left-[6px] top-[92px] h-3 w-[108px] rounded-full bg-cyan-200/34" />
          <div className="absolute left-[10px] top-[94px] h-[118px] w-3 origin-top rotate-[8deg] rounded-full bg-cyan-200/30" />
          <div className="absolute right-[10px] top-[94px] h-[118px] w-3 origin-top -rotate-[8deg] rounded-full bg-cyan-200/30" />
          <div className="absolute left-[31px] top-[230px] h-[66px] w-4 origin-top rotate-[4deg] rounded-full bg-cyan-200/36" />
          <div className="absolute right-[31px] top-[230px] h-[66px] w-4 origin-top -rotate-[4deg] rounded-full bg-cyan-200/36" />
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.07em] text-stone-500">schematic · not to scale</span>
        </div>
        <DivisionCard {...DIVISIONS[1]} align="left" />
      </div>
    </div>
  );
}

function DivisionCard({ title, cue, job, detail, rgb, align }: (typeof DIVISIONS)[number] & { align: "left" | "right" }) {
  return <div className={`rounded-[18px] border p-4 ${align === "right" ? "md:text-right" : ""}`} style={{ borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><div className="font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${rgb},0.70)` }}>{job}</div><h3 className="mt-1 text-[18px] font-semibold text-white">{title}</h3><div className="mt-2 text-[11px] font-semibold" style={{ color: `rgba(${rgb},0.64)` }}>{cue}</div><p className="mt-3 text-[12px] leading-5 text-stone-400">{detail}</p></div>;
}

function FunctionCard({ icon: Icon, title, text, rgb }: { icon: LucideIcon; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.10] p-4 backdrop-blur-[12px]"><Icon size={17} style={{ color: `rgb(${rgb})` }} /><strong className="mt-3 block text-[14px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-stone-400">{text}</p></div>;
}
