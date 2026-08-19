import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Layers3,
  Network,
  Search,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContextByHref } from "@/lib/curriculum/page-context";
import CognitiveFieldBackground from "./CognitiveFieldBackground";
import CognitiveLensMap from "./CognitiveLensMap";

const ROUTE = "/interdisciplines/cognitive-science";

const CORE_IDEAS = [
  {
    title: "Multiple levels",
    detail: "A cognitive phenomenon can be described as neural activity, information processing, behavior, language, conscious experience, or culturally situated action without those descriptions being interchangeable.",
  },
  {
    title: "Representations",
    detail: "Many theories ask what information a system carries, how it is encoded, and what transformations connect input, memory, inference, and action.",
  },
  {
    title: "Converging evidence",
    detail: "Behavioral experiments, neural measurements, computational models, linguistic patterns, philosophical analysis, and cross-cultural comparison constrain different parts of the explanation.",
  },
] as const;

export default function CognitiveSciencePage() {
  const context = requireCurriculumPageContextByHref(ROUTE);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04070b] text-slate-100 selection:bg-cyan-300/25">
      <CognitiveFieldBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#04070b]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Brain · behavior · computation · language · mind · culture"
            eyebrowStyle="rule"
            icon={BrainCircuit}
            title={<span>Cognitive Science</span>}
            subtitle="Cognitive science studies minds and intelligent behavior by coordinating explanations across psychology, neuroscience, computation, linguistics, philosophy, and the social sciences. Its identity comes from the convergence, not from any one contributing discipline."
            accentRgb="34, 211, 238"
            titleClassName="text-[clamp(2.8rem,5.3vw,5.8rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-[#f4fcff]"
            headerClassName="border-cyan-100/[0.10]"
          />
        </div>

        <section className="mx-auto mt-10 max-w-[940px] rounded-[22px] border border-cyan-100/[0.10] bg-[#07101a]/52 px-5 py-5 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-200/68">
            <Layers3 size={14} /> The interdisciplinary move
          </div>
          <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.04em] text-white">Do not ask which discipline owns the mind. Ask what kind of explanation each level can supply.</h2>
          <p className="mt-3 max-w-4xl text-[16px] leading-7 text-slate-300">
            Recognizing a face, understanding a sentence, remembering a route, or choosing between two actions can all be studied at several levels at once. The useful question is how those explanations constrain and connect to one another.
          </p>
        </section>

        <div className="mt-8">
          <CognitiveLensMap />
        </div>

        <section className="mx-auto mt-10 max-w-[940px]">
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-violet-200/66">
            <Network size={14} /> Formal structure
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {CORE_IDEAS.map((idea, index) => (
              <article key={idea.title} className="rounded-[20px] border border-white/[0.08] bg-black/[0.18] p-5 backdrop-blur-xl">
                <span className="font-mono text-[10px] text-cyan-200/45">0{index + 1}</span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.025em] text-white">{idea.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-slate-300/85">{idea.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-[940px] border-t border-cyan-100/[0.10] pt-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-amber-200/60"><Search size={13} /> Common pitfall</div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">A lower-level explanation does not automatically erase a higher-level one.</h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-300">
                Discovering neural activity associated with reading does not make syntax irrelevant, and a computational model that predicts choices does not by itself settle philosophical questions about agency. Good cognitive science asks how levels relate instead of assuming one vocabulary can replace all the others.
              </p>
            </div>
            <Link href="/interdisciplines" className="group rounded-[18px] border border-violet-200/[0.13] bg-violet-200/[0.035] p-4 backdrop-blur-xl transition hover:bg-violet-200/[0.06]">
              <div className="font-mono text-[10px] uppercase tracking-[0.055em] text-violet-200/55">Parent map</div>
              <strong className="mt-2 block text-[17px] text-white">Interdisciplines</strong>
              <span className="mt-2 block text-[13px] leading-6 text-slate-400">Return to the overlap matrix and compare other fields formed between established disciplines.</span>
              <span className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.045em] text-violet-200/70">open matrix <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
