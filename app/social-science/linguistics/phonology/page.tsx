import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import {
  ArrowRight,
  BookOpenText,
  Ear,
  Languages,
  Mic2,
  ScanLine,
  Split,
  Waves,
  type LucideIcon,
} from "lucide-react";
import PhonologyBackground from "./_components/PhonologyBackground";
import ContrastLab from "./_components/ContrastLab";
import PhonologyPractice from "./_components/PhonologyPractice";

const TERMS: readonly { term: string; question: string; detail: string; icon: LucideIcon; rgb: string }[] = [
  {
    term: "Phonetics",
    question: "How is speech physically produced, transmitted, and perceived?",
    detail: "Phonetic analysis can describe articulation, timing, airflow, voicing, acoustics, and perception at whatever level of detail the question requires.",
    icon: Waves,
    rgb: "251,146,60",
  },
  {
    term: "Phonology",
    question: "Which sound differences matter as categories and patterns in a language variety?",
    detail: "Phonology studies contrast, inventories, syllable structure, alternations, stress, tone, phonotactics, and how sound categories behave in context.",
    icon: Split,
    rgb: "244,114,182",
  },
  {
    term: "Phoneme",
    question: "Which abstract category helps account for contrastive patterning?",
    detail: "A phoneme is an analytical category inferred from language-specific evidence. It is not one invariant acoustic object and need not have only one phonetic realization.",
    icon: Ear,
    rgb: "34,211,238",
  },
  {
    term: "Allophone",
    question: "How can one category be realized differently in predictable environments?",
    detail: "An allophone is a phonetic realization associated with a phonological category in a particular analysis. Whether two sounds are contrastive or allophonic depends on the language, variety, and evidence.",
    icon: ScanLine,
    rgb: "192,132,252",
  },
] as const;

const NOTATION = [
  ["/slashes/", "Broad phonological transcription", "Often used for contrastive categories or a relatively abstract representation."],
  ["[brackets]", "Phonetic transcription", "Often used for observed or intended phonetic detail; narrower transcription can add more detail."],
  ["IPA", "International Phonetic Alphabet", "A notation system with symbols and diacritics for transcribing speech sounds. Transcribers choose how much detail to represent; not every acoustic difference receives a separate base symbol."],
  ["ARPAbet", "ASCII phoneme code", "An ASCII-oriented transcription convention developed for speech research and used in resources such as the CMU Pronouncing Dictionary. It is useful in some English speech-technology workflows, not a universal replacement for IPA."],
  ["Orthography", "Writing system", "Spelling is a separate representational system that can encode sound, morphology, history, etymology, convention, and other structure. It is evidence to analyze, not something linguistics simply discards."],
] as const;

const PITFALLS = [
  ["One phoneme = one sound", "A broad phonological category can have several phonetic realizations. The category is inferred from contrast and patterning, not copied directly from one waveform."],
  ["Different sound = different phoneme", "Speakers can produce measurable differences that listeners treat as contextual variants of one category. Contrast has to be demonstrated in the language variety being analyzed."],
  ["Spelling tells you pronunciation", "Writing and speech are related but distinct systems. The same spelling can support different pronunciations, and similar sounds can be spelled in different ways."],
  ["Narrow transcription is accent-free truth", "A narrow transcription represents a particular analysis of particular speech. Speaker, dialect, style, rate, context, and measurement choices can all matter."],
] as const;

export default function PhonologyPage() {
  return (
    <SceneFrame
      background={<PhonologyBackground />}
      className="bg-[#090506] text-slate-100 selection:bg-orange-300/25"
      maxWidthClassName="max-w-[1280px]"
      headerBackground="rgba(9,5,6,0.62)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Social Science", href: "/social-science" },
            { label: "Linguistics", href: "/social-science/linguistics" },
            { label: "Phonology & Phonetics" },
          ]}
          eyebrow="Signal · articulation · contrast · context · transcription"
          eyebrowStyle="rule"
          icon={Mic2}
          title={<span>Phonology &amp; Phonetics</span>}
          subtitle="Speech is continuously variable, but languages organize that variation into reusable contrasts and patterns. Compare word-changing sound differences with context-conditioned realizations, then connect physical speech to phonological categories and transcription."
          accentRgb="251, 146, 60"
          titleClassName="font-sans text-[clamp(2.45rem,4.8vw,5.3rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-[#fff7ed]"
          headerClassName="border-orange-100/[0.10]"
        />
      }
    >
      <section className="mt-5 max-w-4xl">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/62">01 · Phenomenon</div>
        <h2 className="mt-2 text-[clamp(1.9rem,3.7vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">Changing the first sound of <em>pin</em> can create <em>bin</em>. Changing how /t/ is pronounced in <em>top</em> versus <em>stop</em> does not automatically create a new word category.</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300/72">Both cases contain a physical sound difference. Why does one difference behave like a lexical contrast while another can be predicted from context?</p>
      </section>

      <section className="mt-8">
        <div className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/62">02 · Contrast sandbox</div>
        <ContrastLab />
      </section>

      <section className="mt-10 border-t border-orange-100/[0.09] pt-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-fuchsia-200/56">03 · Conceptual bridge</div>
            <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Phonetics describes the realization. Phonology asks how a language organizes the realizations.</h2>
            <p className="mt-4 max-w-3xl text-[14px] leading-7 text-slate-300/72">The minimal-pair examples give evidence that English speakers can use certain segment differences contrastively. In <em>pin</em> versus <em>bin</em>, changing the initial category can distinguish lexical items. That makes contrast a phonological fact, not merely an acoustic difference.</p>
            <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-400/72">The /t/ examples show the other direction. A broad category may have several context-sensitive phonetic realizations. The exact pattern can vary across dialects and styles, so phonological analysis has to state which speech variety and evidence it is describing.</p>
          </div>
          <Surface variant="glass" className="rounded-[24px] border-fuchsia-100/[0.09] p-5" style={{ background: "rgba(15,6,10,0.20)" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-fuchsia-200/50">A useful diagnostic</div>
            <strong className="mt-3 block text-[17px] text-white/86">Does the difference create contrast, or does context predict the difference?</strong>
            <p className="mt-3 text-[12px] leading-6 text-slate-400/72">Minimal pairs are strong evidence for contrast when two words differ in one relevant segment and have different meanings. Contextual distribution and alternation can instead support an allophonic analysis. Real analyses often need more than one example.</p>
          </Surface>
        </div>
      </section>

      <section className="mt-10">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-cyan-200/54">04 · Formal structure</div>
        <h2 className="mt-2 max-w-4xl text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.044em] text-white">Keep physical speech, linguistic categories, and notation on separate layers.</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {TERMS.map((item) => <TermCard key={item.term} {...item} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_360px] xl:items-start">
        <Surface variant="glass" className="overflow-hidden rounded-[26px] border-cyan-100/[0.08]" style={{ background: "rgba(5,10,13,0.14)" }}>
          <div className="p-5 sm:p-6"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-200/52"><BookOpenText size={13} /> Transcription systems</div><h3 className="mt-2 text-[clamp(1.6rem,2.7vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">Notation records an analysis; it is not the sound itself.</h3></div>
          <div className="divide-y divide-white/[0.06] border-t border-white/[0.07]">
            {NOTATION.map(([symbol, label, detail]) => <div key={symbol} className="grid gap-2 p-4 sm:grid-cols-[105px_180px_minmax(0,1fr)] sm:items-start"><strong className="font-mono text-[14px] text-cyan-100/82">{symbol}</strong><span className="text-[12px] font-semibold text-white/78">{label}</span><span className="text-[11px] leading-5 text-slate-500">{detail}</span></div>)}
          </div>
        </Surface>

        <Surface variant="open" className="overflow-hidden rounded-[26px] border-orange-100/[0.08] xl:sticky xl:top-[172px]" style={{ background: "rgba(15,7,4,0.05)" }}>
          <div className="p-5"><div className="font-mono text-[11px] uppercase tracking-[0.08em] text-orange-200/46">05 · Common pitfalls</div><h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">Sound categories are analytical claims, not labels glued directly onto waveforms.</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {PITFALLS.map(([term, text], index) => <div key={term} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 px-4 py-3.5"><span className="font-mono text-[10px] text-orange-200/36">0{index + 1}</span><span><strong className="block text-[11px] text-white/82">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>)}
          </div>
        </Surface>
      </section>

      <section className="mt-10">
        <div className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-emerald-200/52">06 · Application</div>
        <PhonologyPractice />
      </section>

      <section className="mt-9 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
        <Neighbor href="/social-science/linguistics" label="Linguistics" note="return to the signal → pattern → meaning field map" icon={Languages} rgb="34,211,238" />
        <Neighbor href="/social-science/linguistics/structure" label="Structure" note="morphology, syntax, grammatical dependencies" icon={Split} rgb="167,139,250" />
        <Neighbor href="/humanities/languages" label="Languages" note="language learning, use, communities, and specific language systems" icon={BookOpenText} rgb="251,146,60" />
      </section>
    </SceneFrame>
  );
}

function TermCard({ term, question, detail, icon: Icon, rgb }: { term: string; question: string; detail: string; icon: LucideIcon; rgb: string }) {
  return <article className="min-h-[225px] rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4 backdrop-blur-[10px]" style={{ boxShadow: `inset 0 3px 0 rgba(${rgb},0.28)` }}><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.24)`, background: `rgba(${rgb},0.04)` }}><Icon size={16} /></span><h3 className="mt-4 text-[17px] font-semibold text-white/88">{term}</h3><strong className="mt-2 block text-[12px] leading-5" style={{ color: `rgba(${rgb},0.76)` }}>{question}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400/72">{detail}</p></article>;
}

function Neighbor({ href, label, note, icon: Icon, rgb }: { href: string; label: string; note: string; icon: LucideIcon; rgb: string }) {
  return <Link href={href} className="group flex min-h-[92px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px] transition hover:bg-black/[0.15]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}><Icon size={16} /></span><span className="min-w-0 flex-1"><strong className="text-[13px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{note}</span></span><ArrowRight size={13} className="text-white/28 transition group-hover:translate-x-1" /></Link>;
}
