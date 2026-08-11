import {
  Archive,
  BookOpen,
  Library,
  Search,
  ShieldCheck,
  Tags,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";

const FUNCTIONS = [
  {
    title: "Organize",
    detail: "Describe collections with metadata, classification, controlled vocabularies, and relationships.",
    icon: Tags,
    rgb: "34, 211, 238",
  },
  {
    title: "Preserve",
    detail: "Keep records, media, and cultural memory usable across changing formats, systems, and time.",
    icon: Archive,
    rgb: "167, 139, 250",
  },
  {
    title: "Retrieve",
    detail: "Design indexes, catalogs, search systems, and discovery tools that connect questions to sources.",
    icon: Search,
    rgb: "96, 165, 250",
  },
  {
    title: "Provide Access",
    detail: "Balance openness, privacy, copyright, stewardship, accessibility, and community needs.",
    icon: ShieldCheck,
    rgb: "52, 211, 153",
  },
] as const;

const FLOW = ["Acquire", "Describe", "Index", "Preserve", "Retrieve"] as const;

export default function LibrarySciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05090d] text-slate-100 selection:bg-cyan-400/25">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.13),transparent_29%),radial-gradient(circle_at_18%_78%,rgba(96,165,250,0.08),transparent_28%),linear-gradient(135deg,#05090d,#070910_52%,#05080c)]" />
      <div className="pointer-events-none fixed inset-0 opacity-45 [background-image:linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-[7%] top-[13%] grid grid-cols-5 gap-2 opacity-[0.055]">
          {Array.from({ length: 30 }, (_, index) => (
            <div key={index} className="h-10 w-7 rounded-sm border border-cyan-200" />
          ))}
        </div>
        <div className="absolute bottom-[5%] left-[6%] text-[180px] font-semibold leading-none text-cyan-100/[0.018]">Aa</div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Library Science" },
          ]}
          eyebrow="Organize · Preserve · Retrieve · Access"
          icon={Library}
          title={<span>Library Science</span>}
          subtitle="Build systems that make knowledge describable, durable, discoverable, and usable across people, collections, and time."
          accentRgb="34, 211, 238"
          titleClassName="text-[clamp(3.0rem,5.5vw,5.5rem)] font-semibold leading-[0.84] tracking-[-0.06em] text-white"
          iconClassName="rounded-[18px]"
        />

        <section className="relative mt-4 grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
          <div className="grid min-h-0 gap-3 sm:grid-cols-2">
            {FUNCTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-[22px] border p-5 backdrop-blur-xl"
                  style={{
                    borderColor: `rgba(${item.rgb},0.22)`,
                    background: `linear-gradient(145deg, rgba(${item.rgb},0.095), rgba(5,9,13,0.78) 56%, rgba(5,9,13,0.66))`,
                  }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{
                      color: `rgb(${item.rgb})`,
                      borderColor: `rgba(${item.rgb},0.32)`,
                      background: `rgba(${item.rgb},0.07)`,
                    }}
                  >
                    <Icon size={20} strokeWidth={1.55} />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-white">{item.title}</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{item.detail}</p>
                </article>
              );
            })}
          </div>

          <aside className="relative overflow-hidden rounded-[24px] border border-cyan-300/18 bg-black/25 p-5 backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-400/[0.08] blur-3xl" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/[0.06] text-cyan-300">
                  <BookOpen size={18} />
                </span>
                <h2 className="text-lg font-semibold text-white">Information lifecycle</h2>
              </div>

              <div className="mt-7 grid gap-2">
                {FLOW.map((stage, index) => (
                  <div key={stage} className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                    <span className="font-mono text-[9px] text-cyan-300/75">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold text-slate-200">{stage}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-white/[0.07] pt-5">
                <p className="text-sm leading-6 text-slate-500">
                  Library science sits where information science, history, technology, language, law, design, and public service meet. The collection is only useful when people can trust it and find what they need.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
