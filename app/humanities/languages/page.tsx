import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  ArrowRightLeft,
  BookOpenText,
  Clapperboard,
  GraduationCap,
  Hand,
  Languages,
  MessageCircle,
  PenLine,
  ScrollText,
  Sparkles,
  Speech,
} from "lucide-react";
import LanguagesBackground from "./_components/LanguagesBackground";
import OmniTranslator from "./_components/OmniTranslator";
import RosettaWidget from "./RosettaWidget";

const NODE_ID = "humanities.languages";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
  family: "catalog" | "practice";
};

const BRANCH_META: Record<string, BranchMeta> = {
  "humanities.languages.modern": {
    icon: Speech,
    code: "MOD",
    question: "Which living languages do you want to use for conversation, reading, travel, heritage, work, scholarship, literature, or media?",
    rgb: "125,211,252",
    family: "catalog",
  },
  "humanities.languages.signed": {
    icon: Hand,
    code: "SGN",
    question: "How do natural signed languages use visual-spatial form within distinct Deaf communities, histories, literatures, and regional traditions?",
    rgb: "94,234,212",
    family: "catalog",
  },
  "humanities.languages.classical-historical": {
    icon: ScrollText,
    code: "CLS",
    question: "How can texts, inscriptions, manuscripts, philology, pronunciation evidence, and historical grammar reopen languages from earlier periods?",
    rgb: "251,191,36",
    family: "catalog",
  },
  "humanities.languages.constructed": {
    icon: Sparkles,
    code: "CON",
    question: "What changes when a language is deliberately designed for artistic, auxiliary, experimental, or engineered purposes and then used by communities?",
    rgb: "192,132,252",
    family: "catalog",
  },
  "humanities.languages.writing-literacy": {
    icon: PenLine,
    code: "SCR",
    question: "How do scripts, spelling systems, reading direction, handwriting, keyboards, punctuation, and literacy practices turn language into durable visual form?",
    rgb: "244,114,182",
    family: "practice",
  },
  "humanities.languages.translation-interpreting": {
    icon: ArrowRightLeft,
    code: "TRN",
    question: "How do translators and interpreters preserve communicative purpose while negotiating register, ambiguity, terminology, genre, culture, and medium?",
    rgb: "251,146,60",
    family: "practice",
  },
  "humanities.languages.learning-proficiency": {
    icon: GraduationCap,
    code: "LRN",
    question: "Which mix of input, vocabulary practice, grammar, pronunciation, interaction, feedback, reading, writing, and assessment helps proficiency grow over time?",
    rgb: "163,230,53",
    family: "practice",
  },
  "humanities.languages.literature-culture": {
    icon: Clapperboard,
    code: "CUL",
    question: "How can language study open literature, film, music, humor, conversation, historical documents, everyday genres, and community contexts?",
    rgb: "216,180,254",
    family: "practice",
  },
};

const PRACTICE_SPINE = [
  { label: "Notice", detail: "sound/sign · script · form · context", rgb: "125,211,252", icon: BookOpenText },
  { label: "Understand", detail: "meaning · pattern · reference · intent", rgb: "192,132,252", icon: MessageCircle },
  { label: "Retrieve", detail: "words · chunks · structures · conventions", rgb: "251,191,36", icon: GraduationCap },
  { label: "Use", detail: "speak/sign · listen/watch · read · write", rgb: "94,234,212", icon: Languages },
  { label: "Adapt", detail: "register · audience · genre · feedback", rgb: "244,114,182", icon: ArrowRightLeft },
] as const;

const STUDY_PRINCIPLES = [
  ["Meaning before substitution", "A word or phrase belongs to a larger utterance, relationship, genre, and situation. Translation and comprehension both fail when forms are treated as isolated dictionary tokens."],
  ["Input needs attention", "Exposure helps when learners can notice form, infer meaning, connect new material to prior knowledge, and encounter it repeatedly across useful contexts."],
  ["Output reveals gaps", "Speaking, signing, and writing create pressure to retrieve forms and organize meaning. Feedback can expose what passive recognition alone does not."],
  ["Literacy is language-specific", "Learning a new script, spelling system, reading direction, keyboard, or orthographic convention can require its own practice rather than being a cosmetic layer over speech."],
  ["Culture is not trivia", "Language use is embedded in communities, institutions, media, history, humor, politeness, identity, power, and everyday expectations. A phrasebook cannot contain a culture."],
  ["Linguistics is adjacent", "Phonetics, phonology, morphology, syntax, semantics, pragmatics, historical linguistics, and language science live in the separate Linguistics domain and can support language learning without being duplicated here."],
] as const;

export default function LanguagesPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const catalog = context.children.filter((branch) => BRANCH_META[branch.id]?.family === "catalog");
  const practice = context.children.filter((branch) => BRANCH_META[branch.id]?.family === "practice");

  return (
    <SceneFrame
      background={<LanguagesBackground />}
      className="bg-[#0a0c10] text-stone-100 selection:bg-violet-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(10,12,16,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Listen · watch · speak · sign · read · write · translate"
          eyebrowStyle="rule"
          icon={Languages}
          title={<span>Languages</span>}
          subtitle="Learn languages as living systems of communication and culture: spoken, signed, written, historical, constructed, translated, read, heard, watched, practiced, inherited, and used with real people. Linguistic theory remains a neighboring science rather than a duplicate branch here."
          accentRgb="192, 132, 252"
          titleClassName="font-sans text-[clamp(2.9rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#faf5ff]"
          headerClassName="border-violet-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-violet-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,16,0.46),transparent_28%,transparent_72%,rgba(17,12,18,0.38))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-200/66"><Languages size={14} /> Primary navigation · language practice</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Choose the kinds of languages you want to enter, or the practices that let you use them.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/70">
              The translation desk behind the page holds facing source and target manuscripts, alignment threads, a translator's margin, script-direction rulers, and one slow reading light. It stays quiet while the foreground asks you to compare actual language forms.
            </p>
          </div>
          <Link href="/social-science/linguistics" className="group flex items-center justify-between gap-4 border-l border-cyan-200/[0.18] bg-black/[0.08] px-4 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.15]">
            <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">Neighboring field</span><strong className="mt-1 block text-[14px] text-white">Linguistics</strong><span className="mt-1 block text-[11px] text-stone-600">language science & structure</span></span>
            <ArrowRight size={15} className="text-cyan-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px_minmax(0,1fr)] xl:items-stretch">
          <LanguageBank label="Language catalog" branches={catalog} />
          <PracticeCore />
          <LanguageBank label="Learning & use" branches={practice} align="right" />
        </div>
      </section>

      <section className="mt-8 grid gap-6 2xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] 2xl:items-start">
        <div>
          <div className="mb-3"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/58">Instrument 01 · multilingual phrase window</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Compare conventional forms without pretending translation is one-to-one.</h2></div>
          <RosettaWidget />
        </div>
        <div>
          <div className="mb-3"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58">Instrument 02 · translation choices</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">See why a natural target sentence can reorganize the source grammar completely.</h2></div>
          <OmniTranslator />
        </div>
      </section>

      <section className="mt-8 border-t border-violet-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-pink-200/58"><BookOpenText size={14} /> Learning principles · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Knowing about a language and being able to use it are related achievements, not the same achievement.</h2></div>
          <p className="text-[14px] leading-6 text-stone-400/72">Language learning combines knowledge, perception, memory, timing, interaction, literacy, social judgment, and repeated retrieval. Different goals need different practice, and proficiency grows unevenly across skills.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {STUDY_PRINCIPLES.map(([term, text], index) => <div key={term} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[11px] text-violet-200/42">0{index + 1}</span><span><strong className="block text-[13px] text-stone-200/86">{term}</strong><span className="mt-1 block text-[12px] leading-5 text-stone-500">{text}</span></span></div>)}
        </div>
      </section>
    </SceneFrame>
  );
}

function LanguageBank({ label, branches, align = "left" }: { label: string; branches: CurriculumNode[]; align?: "left" | "right" }) {
  return <div><div className={`mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500 ${align === "right" ? "xl:text-right" : ""}`}>{label}</div><div className="border-y border-white/[0.06]">{branches.map((branch) => <LanguageRoute key={branch.id} branch={branch} align={align} />)}</div></div>;
}

function LanguageRoute({ branch, align }: { branch: CurriculumNode; align: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Languages, code: "LNG", question: branch.description ?? "Explore this language branch.", rgb: "192,132,252", family: "practice" as const };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  return <div aria-disabled={planned ? "true" : undefined} className="group grid min-h-[94px] grid-cols-[52px_minmax(0,1fr)_52px] gap-3 border-b border-white/[0.06] bg-black/[0.045] px-3 py-3 backdrop-blur-[8px] last:border-b-0 transition hover:bg-black/[0.09]"><span className={`flex h-9 w-9 items-center justify-center border ${align === "right" ? "xl:order-3" : ""}`} style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.26)`, background: `rgba(${meta.rgb},0.04)` }}><Icon size={14} /></span><span className={align === "right" ? "xl:text-right" : ""}><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.code}</span><strong className="mt-0.5 block text-[14px] text-white/88">{branch.label}</strong><span className="mt-1 block text-[11px] leading-4 text-stone-500">{meta.question}</span></span><span className={`pt-1 font-mono text-[11px] uppercase text-stone-600 ${align === "right" ? "text-right xl:order-first xl:text-left" : "text-right"}`}>{planned ? "planned" : "open"}</span></div>;
}

function PracticeCore() {
  return <Surface variant="open" className="relative min-h-[480px] overflow-hidden rounded-[30px] border-violet-100/[0.08]" style={{ background: "rgba(15,11,22,0.025)" }}><div className="p-4"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-violet-200/54"><GraduationCap size={13} /> Practice loop</div><p className="mt-2 text-[12px] leading-5 text-stone-400/64">Language ability grows through repeated cycles of noticing, understanding, retrieval, use, and adaptation.</p></div><div className="mx-4 mt-1 space-y-1">{PRACTICE_SPINE.map((step, index) => { const Icon = step.icon; return <div key={step.label} className="border-b border-white/[0.06] py-3 last:border-b-0"><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.24)`, background: `rgba(${step.rgb},0.04)` }}><Icon size={13} /></span><span><strong className="block text-[13px]" style={{ color: `rgba(${step.rgb},0.84)` }}>{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-stone-500">{step.detail}</span></span></div>{index < PRACTICE_SPINE.length - 1 ? <ArrowDown size={13} className="ml-[10px] mt-2 text-stone-600" /> : null}</div>; })}</div><div className="absolute bottom-4 inset-x-4 border-t border-violet-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-violet-200/34">feedback changes what you notice next</div></Surface>;
}
