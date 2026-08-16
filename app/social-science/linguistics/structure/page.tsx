import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LanguageSignalBackground from "@/app/_page-system/backgrounds/LanguageSignalBackground";
import SyntaxTreeLab from "@/app/_page-system/instruments/SyntaxTreeLab";
import LanguageStackTopology, { type LanguageLayer } from "@/app/_page-system/topologies/LanguageStackTopology";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  Braces,
  Ear,
  Layers3,
  MessageCircle,
  Mic2,
  Network,
  Shapes,
  Type,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "social.linguistics.structure";

type Meta = { unit: string; question: string; rgb: string; icon: LucideIcon };

const META: Record<string, Meta> = {
  "social.linguistics.structure.phonetics": { unit: "physical signal", question: "What speech or sign properties are physically produced and perceived?", rgb: "248, 113, 113", icon: Mic2 },
  "social.linguistics.structure.phonology": { unit: "contrastive pattern", question: "Which sound or sign differences matter inside this language?", rgb: "244, 114, 182", icon: Ear },
  "social.linguistics.structure.morphology": { unit: "word structure", question: "How do meaningful pieces combine inside words?", rgb: "251, 146, 60", icon: Shapes },
  "social.linguistics.structure.syntax": { unit: "phrase & sentence", question: "How do words combine into hierarchical grammatical structures?", rgb: "132, 204, 22", icon: Braces },
  "social.linguistics.structure.semantics": { unit: "conventional meaning", question: "How do expressions contribute meaning and combine compositionally?", rgb: "34, 211, 238", icon: Type },
  "social.linguistics.structure.pragmatics": { unit: "utterance in context", question: "How does context change what an utterance communicates?", rgb: "167, 139, 250", icon: MessageCircle },
};

export default function LanguageStructurePage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const layers: LanguageLayer[] = context.children.map((child) => {
    const meta = META[child.id] ?? META["social.linguistics.structure.syntax"];
    return {
      id: child.id,
      label: child.label,
      unit: meta.unit,
      question: meta.question,
      summary: child.description ?? "",
      rgb: meta.rgb,
      href: child.href,
      status: child.status === "placeholder" ? "planned" : "active",
      icon: meta.icon,
    };
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030906] text-slate-100 selection:bg-lime-400/25">
      <LanguageSignalBackground />
      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030906]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Social Science", href: "/social-science" },
              { label: "Linguistics", href: "/social-science/linguistics" },
              { label: "Language Structure" },
            ]}
            eyebrow="Signal · contrast · word · syntax · meaning · context"
            eyebrowStyle="pill"
            icon={Layers3}
            title={<span>Language Structure</span>}
            subtitle="Language is compositional but not flat. Physical signals become contrastive categories, categories combine into words and hierarchical phrases, and conventional meanings are interpreted inside context."
            accentRgb="132, 204, 22"
            titleClassName="font-sans text-[clamp(2.5rem,5vw,5.7rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#f7ffe9]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5">
          <LanguageStackTopology layers={layers} />
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(330px,0.9fr)]">
          <SyntaxTreeLab />
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-lime-200/65"><Network size={12} /> Why hierarchy matters</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Linear order is visible. Constituent structure has to be inferred.</h2>
            <p className="mt-3 text-[11px] leading-6 text-slate-400">The sentence “the book on the table fell” is a row of words on the page, but its interpretation depends on grouping: “on the table” modifies “book,” and the whole noun phrase functions as the subject of “fell.” Syntax represents those nested relationships explicitly.</p>
            <div className="mt-5 space-y-2">
              <StackRule label="Combination" text="Small units combine into larger constituents with their own grammatical behavior." />
              <StackRule label="Dependency" text="Relationships can hold between words or phrases that are not adjacent in the surface string." />
              <StackRule label="Ambiguity" text="One word sequence can permit more than one structure, producing more than one interpretation." />
              <StackRule label="Cross-language variation" text="Languages differ in ordering, marking, and construction while still organizing expressions hierarchically." />
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-2">
          <Distinction icon={Mic2} title="Phonetics ≠ phonology" text="Phonetics describes physical articulation, acoustics, and perception. Phonology asks how a particular language organizes those possibilities into contrastive patterns." rgb="244, 114, 182" />
          <Distinction icon={MessageCircle} title="Semantics ≠ pragmatics" text="Semantics studies conventional meaning contributed by expressions and composition. Pragmatics studies how context and inference add what a speaker communicates in a situation." rgb="34, 211, 238" />
        </section>
      </div>
    </main>
  );
}

function StackRule({ label, text }: { label: string; text: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-white/[0.012] p-3"><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-lime-200/55">{label}</div><p className="mt-1.5 text-[8px] leading-4 text-slate-700">{text}</p></div>;
}

function Distinction({ icon: Icon, title, text, rgb }: { icon: LucideIcon; title: string; text: string; rgb: string }) {
  return <div className="rounded-[24px] border bg-black/[0.11] p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${rgb},0.11)` }}><Icon size={16} style={{ color: `rgb(${rgb})` }} /><h3 className="mt-4 text-[17px] font-semibold text-white">{title}</h3><p className="mt-2 text-[9px] leading-5 text-slate-600">{text}</p></div>;
}
