import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import VocabApplet from "@/app/_components/VocabApplet";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { literatureVocab } from "@/app/_data/vocab/l/literature";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  BookMarked,
  BookOpenText,
  Drama,
  Feather,
  FileText,
  Languages,
  Library,
  MessageSquareQuote,
  PenLine,
  ScanText,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import HeroJourney from "./HeroJourney";
import TextBackground from "./TextBackground";
import { BookCard, type BookData } from "./_components/media";

const NODE_ID = "humanities.literature";

type BranchMeta = {
  icon: LucideIcon;
  folio: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "humanities.literature.narrative-fiction": {
    icon: BookOpenText,
    folio: "I",
    question: "Who tells the story, how is time arranged, and what becomes possible because events are narrated this way?",
    rgb: "251,191,36",
  },
  "humanities.literature.poetry": {
    icon: Feather,
    folio: "II",
    question: "How do line, rhythm, sound, image, silence, and form change what language can do?",
    rgb: "244,114,182",
  },
  "humanities.literature.drama": {
    icon: Drama,
    folio: "III",
    question: "What changes when language is written to become speech, action, bodies, timing, and audience experience?",
    rgb: "192,132,252",
  },
  "humanities.literature.nonfiction": {
    icon: FileText,
    folio: "IV",
    question: "How does crafted language shape factual claim, memory, reflection, argument, and the narrator's authority?",
    rgb: "125,211,252",
  },
  "humanities.literature.style": {
    icon: PenLine,
    folio: "V",
    question: "Which local choices in diction, syntax, image, sound, irony, and register produce the text's texture?",
    rgb: "251,146,60",
  },
  "humanities.literature.criticism": {
    icon: ScanText,
    folio: "VI",
    question: "What changes when the same passage is read through a different critical question or theory of meaning?",
    rgb: "94,234,212",
  },
  "humanities.literature.comparative": {
    icon: Languages,
    folio: "VII",
    question: "What becomes visible when texts cross languages, cultures, translations, adaptations, and unequal histories of circulation?",
    rgb: "96,165,250",
  },
  "humanities.literature.history": {
    icon: ScrollText,
    folio: "VIII",
    question: "How do publishing, audience, institutions, technology, movements, and historical conditions change what gets written and read?",
    rgb: "234,179,8",
  },
};

const READING_MOVES = [
  { label: "Notice", text: "Start with a precise feature of the text rather than a broad theme you expect to find." },
  { label: "Pattern", text: "Ask whether the feature repeats, changes, contrasts, clusters, or appears at a structural turning point." },
  { label: "Interpret", text: "Explain what the pattern could be doing and which textual evidence makes that reading plausible." },
  { label: "Contextualize", text: "Test how genre, history, language, audience, publication, and other contexts alter the interpretation." },
  { label: "Compare", text: "Put another passage, translation, text, adaptation, or critical lens beside the first claim." },
  { label: "Argue", text: "State a claim that can be examined, supported, complicated, or challenged rather than merely announced." },
] as const;

const ARCHIVE: BookData[] = [
  {
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publicationYear: 1925,
    genre: "Novel · Modernism",
    description: "A compact novel useful for studying narration, symbol, desire, class, performance of identity, and the construction of remembered possibility.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/960px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
    path: "/humanities/literature",
  },
  {
    id: "divine-comedy",
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    publicationYear: 1320,
    genre: "Narrative poem",
    description: "A long-form poetic journey whose architecture, allegory, theology, political context, voice, and imagined geography reward several different reading lenses.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Sandro_Botticelli_-_La_Carte_de_l%27Enfer.jpg",
    path: "/humanities/literature",
  },
  {
    id: "odyssey",
    title: "The Odyssey",
    author: "Homeric tradition",
    publicationYear: -700,
    genre: "Epic poetry",
    description: "An ancient Greek epic shaped by oral tradition, return, hospitality, identity, storytelling within storytelling, recognition, and the instability of heroic reputation.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Fragment_Odyssee_2245_2.jpg",
    path: "/humanities/literature",
  },
] as const;

export default function LiteraturePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<TextBackground />}
      className="bg-[#120907] text-stone-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(20,10,7,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Form · language · voice · history · interpretation · reader"
          eyebrowStyle="rule"
          icon={BookMarked}
          title={<span>Literature</span>}
          subtitle="Literature turns language into an object of sustained attention. Read how a text is made, how its form directs experience, how readers construct interpretations from evidence, and how meaning changes across histories, languages, performances, and critical questions."
          accentRgb="251, 191, 36"
          titleClassName="font-serif text-[clamp(3rem,5.6vw,6.3rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fff7df]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.13] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(26,13,9,0.42),transparent_30%,transparent_70%,rgba(26,13,9,0.38))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/68"><Library size={14} /> Primary navigation · table of contents</div>
            <h2 className="mt-2 max-w-5xl font-serif text-[clamp(2rem,3.8vw,3.9rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
              Enter through form, language, interpretation, comparison, or literary history.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/70">
              These planned branches divide the field for navigation, not because texts stay politely inside one box. A play uses poetic language, a novel belongs to literary history, an essay can be read stylistically, and every text can invite several critical approaches.
            </p>
          </div>
          <Link href="/humanities" className="group flex items-center justify-between gap-4 border-l border-amber-200/[0.18] bg-black/[0.08] px-4 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.16]">
            <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Humanities</strong></span>
            <ArrowRight size={15} className="text-amber-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <ContentsSpread branches={context.children} />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/60">Narrative instrument</div>
            <h2 className="mt-1 font-serif text-[25px] font-semibold tracking-[-0.025em] text-white">One pattern to test against a story, never a story detector.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">twelve-stage teaching model</span>
        </div>
        <HeroJourney />
      </section>

      <section className="mt-8 border-t border-amber-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-rose-200/58"><MessageSquareQuote size={14} /> Reading practice · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl font-serif text-[clamp(1.9rem,3.2vw,3.1rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">Interpretation gets stronger when every large claim can walk back to a small textual choice.</h2>
          </div>
          <p className="text-[14px] leading-6 text-stone-400/72">Close reading is not a hunt for the one secret meaning. It is disciplined attention: notice a feature, trace its pattern, build an interpretation, and make the evidence visible enough for another reader to test the claim.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {READING_MOVES.map((move, index) => (
            <div key={move.label} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b xl:[&:nth-last-child(-n+3)]:border-b-0 xl:border-r xl:[&:nth-child(3n)]:border-r-0">
              <span className="font-mono text-[11px] text-amber-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-stone-200/86">{move.label}</strong><span className="mt-1 block text-[12px] leading-5 text-stone-500">{move.text}</span></span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t border-amber-100/[0.10] pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58"><BookOpenText size={14} /> Small archive · reading objects</div>
            <h2 className="mt-2 font-serif text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.03em] text-white">Texts to revisit through several lenses.</h2>
          </div>
          <p className="max-w-xl text-[13px] leading-6 text-stone-500">This is a teaching shelf, not a canon ranking. Its purpose is to give form, history, narrative, translation, and interpretation somewhere concrete to meet.</p>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {ARCHIVE.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      <section className="mt-8 border-t border-amber-100/[0.10] pt-6">
        <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-500"><Sparkles size={13} /> Literary lexicon · reference tool</div>
        <VocabApplet currentDomain="Literature" localTerms={literatureVocab} />
      </section>
    </SceneFrame>
  );
}

function ContentsSpread({ branches }: { branches: readonly CurriculumNode[] }) {
  const left = branches.slice(0, 4);
  const right = branches.slice(4);
  return (
    <div className="relative mt-5 min-h-[540px] overflow-hidden border border-amber-100/[0.09] bg-[#2a1710]/[0.055] backdrop-blur-[1px]">
      <div className="pointer-events-none absolute inset-y-5 left-1/2 w-px bg-gradient-to-b from-transparent via-amber-100/[0.18] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(251,191,36,0.055),transparent_22%)]" />
      <div className="relative grid min-h-[540px] gap-5 p-4 xl:grid-cols-[minmax(0,1fr)_230px_minmax(0,1fr)] xl:items-center sm:p-5">
        <div className="space-y-2.5">{left.map((branch) => <ContentsEntry key={branch.id} branch={branch} side="left" />)}</div>
        <ReadingCore />
        <div className="space-y-2.5">{right.map((branch) => <ContentsEntry key={branch.id} branch={branch} side="right" />)}</div>
      </div>
    </div>
  );
}

function ContentsEntry({ branch, side }: { branch: CurriculumNode; side: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? { icon: BookOpenText, folio: "?", question: branch.description ?? "Explore this branch of literary study.", rgb: "251,191,36" };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div className="group relative min-h-[102px] border-y border-amber-100/[0.09] bg-[#1c0f0c]/[0.18] px-3 py-3 backdrop-blur-[10px] transition hover:bg-[#1c0f0c]/[0.26]" style={{ boxShadow: `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.38)` }}>
      <div className="grid grid-cols-[42px_minmax(0,1fr)_54px] gap-3">
        <span className="flex h-10 w-10 items-center justify-center border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)`, background: `rgba(${meta.rgb},0.045)` }}><Icon size={16} /></span>
        <span><span className="font-serif text-[12px] italic" style={{ color: `rgba(${meta.rgb},0.66)` }}>Folio {meta.folio}</span><strong className="mt-0.5 block font-serif text-[17px] text-white/90">{branch.label}</strong><span className="mt-1 block text-[11px] leading-4 text-stone-500">{meta.question}</span></span>
        <span className="pt-1 text-right font-mono text-[11px] uppercase text-stone-600">{planned ? "planned" : "open"}</span>
      </div>
    </div>
  );
  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function ReadingCore() {
  return (
    <Surface variant="ghost" className="relative min-h-[390px] overflow-hidden rounded-[46%_46%_20%_20%/9%_9%_7%_7%] border-amber-100/[0.10]" style={{ background: "rgba(31,17,13,0.08)" }}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,235,190,0.035)_48%,rgba(61,32,22,0.10)_50%,rgba(255,235,190,0.025)_53%,transparent)]" />
      <div className="relative p-5 text-center">
        <div className="font-serif text-[19px] italic text-amber-100/76">Read twice.</div>
        <p className="mx-auto mt-2 max-w-[190px] text-[12px] leading-5 text-stone-400/68">Once for what happens. Again for how the text makes it happen.</p>
      </div>
      <div className="relative mx-5 mt-2 space-y-4 border-y border-amber-100/[0.08] py-4">
        <CoreMove icon={ScanText} label="Form" text="What is the text doing structurally?" />
        <CoreMove icon={PenLine} label="Language" text="Which local choices create the effect?" />
        <CoreMove icon={MessageSquareQuote} label="Voice" text="Who can speak, know, frame, or withhold?" />
        <CoreMove icon={ScrollText} label="Context" text="Which historical conditions change the reading?" />
      </div>
      <div className="absolute bottom-4 inset-x-4 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-amber-200/34">claim ↔ evidence ↔ interpretation</div>
    </Surface>
  );
}

function CoreMove({ icon: Icon, label, text }: { icon: LucideIcon; label: string; text: string }) {
  return (
    <div className="flex items-center gap-3 text-left">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-100/[0.10] text-amber-100/52"><Icon size={13} /></span>
      <span><strong className="block font-serif text-[13px] text-white/80">{label}</strong><span className="mt-0.5 block text-[11px] leading-4 text-stone-500">{text}</span></span>
    </div>
  );
}
