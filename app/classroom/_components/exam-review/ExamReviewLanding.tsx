import Link from "next/link";
import { ArrowRight, ExternalLink, type LucideIcon } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";

export type ExamReviewLandingProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentRgb: string;
  tone: "green" | "blue";
  pilotTitle: string;
  pilotDescription: string;
  pilotHref: string;
  sourceLabel: string;
  sourceUrl: string;
  format: readonly { label: string; value: string }[];
};

export default function ExamReviewLanding(props: ExamReviewLandingProps) {
  const green = props.tone === "green";
  return <main className={`relative min-h-screen overflow-hidden ${green ? "bg-[#07110c]" : "bg-[#07101a]"} text-stone-100`}>
    <div className={`pointer-events-none fixed inset-0 ${green ? "bg-[radial-gradient(circle_at_78%_18%,rgba(74,222,128,0.15),transparent_28%),linear-gradient(to_bottom,#0a1810,#060a08)]" : "bg-[radial-gradient(circle_at_76%_16%,rgba(96,165,250,0.17),transparent_30%),linear-gradient(to_bottom,#091626,#060a10)]"}`} />
    <div className="relative mx-auto w-full max-w-[1080px] px-4 py-5 sm:px-6">
      <DomainPageHeader breadcrumbs={props.breadcrumbs} eyebrow={props.eyebrow} icon={props.icon} title={<span>{props.title}</span>} subtitle={props.subtitle} accentRgb={props.accentRgb} metadataTextClassName="text-[11px]" iconClassName="rounded-[16px]" headerClassName="border-white/[0.12]" />
      <section className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="Exam format">
        {props.format.map((item) => <div key={item.label} className="rounded-[18px] border border-white/[0.08] bg-black/20 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">{item.label}</div><div className="mt-2 text-[16px] font-semibold text-white">{item.value}</div></div>)}
      </section>
      <section className={`mt-4 rounded-[24px] border p-5 sm:p-6 ${green ? "border-green-200/16 bg-green-300/[0.045]" : "border-blue-200/16 bg-blue-300/[0.045]"}`}>
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Guided pilot</div>
        <h2 className="mt-2 text-[clamp(1.6rem,4vw,2.5rem)] font-semibold tracking-[-0.04em] text-white">{props.pilotTitle}</h2>
        <p className="mt-3 max-w-3xl text-[14px] leading-6 text-stone-300">{props.pilotDescription}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={props.pilotHref} className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold ${green ? "bg-green-300/15 text-green-100" : "bg-blue-300/15 text-blue-100"}`}>Open guided review <ArrowRight size={15} /></Link>
          <a href={props.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 px-2 text-[13px] font-semibold text-stone-300"><ExternalLink size={14} />{props.sourceLabel}</a>
        </div>
      </section>
    </div>
  </main>;
}
