import {
  ArrowUpRight,
  Archive,
  BookOpen,
  Eye,
  Layers3,
  Link2,
} from "lucide-react";
import HistoricalIntervalLab from "./HistoricalIntervalLab";
import HistoryEvidenceReview from "./HistoryEvidenceReview";

const SOURCE_MOVES = [
  {
    icon: Eye,
    label: "Observe",
    question: "What is materially present before interpretation?",
    note: "Record words, marks, format, damage, composition, scale, omissions, and other inspectable features without quietly converting inference into observation.",
    rgb: "217,119,6",
  },
  {
    icon: Layers3,
    label: "Contextualize",
    question: "Who made this, when, where, for whom, and why?",
    note: "Creator, genre, audience, purpose, conditions of production, custody, and survival change which questions a source can answer.",
    rgb: "16,185,129",
  },
  {
    icon: Link2,
    label: "Corroborate",
    question: "Which independent evidence agrees, conflicts, or stays silent?",
    note: "Comparison can strengthen, limit, or redirect a claim. Silence may reflect loss, exclusion, preservation, cataloging, or the question itself.",
    rgb: "129,140,248",
  },
] as const;

export default function HistoryRootExtension() {
  return (
    <div className="space-y-24 pb-8">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] xl:items-start">
        <div className="bg-[#130d07]/42 rounded-[26px] border border-amber-100/[0.11] p-5 backdrop-blur-xl sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-100/55">
            <Archive size={14} aria-hidden="true" /> Source workshop · from
            trace to claim
          </div>
          <h2 className="mt-3 font-serif text-[clamp(2rem,3.7vw,3.5rem)] leading-[0.98] tracking-[-0.045em] text-[#fff8e7]">
            A source is not the past. It is a surviving trace with a production
            history.
          </h2>
          <p className="text-stone-400/82 mt-5 text-[14px] leading-7">
            Documents, objects, images, recordings, landscapes, buildings,
            datasets, and oral testimony become historical evidence when they
            are connected to a question. “Primary” names a relationship to the
            topic and period—not a guarantee of accuracy, completeness, or
            neutrality.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.055] md:grid-cols-3">
          {SOURCE_MOVES.map(
            ({ icon: Icon, label, question, note, rgb }, index) => (
              <article
                key={label}
                className="bg-[#100b07]/94 px-4 py-5 sm:px-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border"
                    style={{
                      color: `rgba(${rgb},0.72)`,
                      borderColor: `rgba(${rgb},0.20)`,
                      background: `rgba(${rgb},0.045)`,
                    }}
                  >
                    <Icon size={14} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[9px] text-stone-700">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-white/86 mt-4 font-serif text-[20px]">
                  {label}
                </h3>
                <p
                  className="mt-2 text-[12px] font-medium leading-5"
                  style={{ color: `rgba(${rgb},0.66)` }}
                >
                  {question}
                </p>
                <p className="mt-3 text-[11px] leading-5 text-stone-500">
                  {note}
                </p>
              </article>
            )
          )}
        </div>
      </section>

      <HistoricalIntervalLab />
      <HistoryEvidenceReview />

      <section className="bg-[#100b07]/34 overflow-hidden border-y border-white/[0.08] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div className="border-b border-white/[0.07] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="text-amber-100/52 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <BookOpen size={14} aria-hidden="true" /> Collection and method
              boundary
            </div>
            <h2 className="mt-3 font-serif text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.02] tracking-[-0.04em] text-[#fff8e7]">
              Repositories expand the evidence surface; they do not remove
              selection.
            </h2>
            <p className="text-stone-400/78 mt-4 text-[13px] leading-6">
              A future History source browser can combine Library of Congress
              records, Chronicling America newspapers, National Archives
              teaching documents, and Smithsonian Open Access objects. Every
              result still needs collection scope, digitization, search
              language, date/place metadata, item identity, rights, and survival
              bias.
            </p>
          </div>
          <div className="grid gap-px bg-white/[0.055] sm:grid-cols-2">
            {[
              [
                "Library of Congress · Primary sources",
                "Observe, reflect, question, contextualize, and compare incomplete traces before constructing an explanation.",
                "https://www.loc.gov/programs/teachers/getting-started-with-primary-sources",
              ],
              [
                "National Archives · Document analysis",
                "Meet the document, observe its parts, make sense of it, and then use it as evidence.",
                "https://www.archives.gov/education/lessons/worksheets",
              ],
              [
                "Chronicling America · data access",
                "Historic newspapers now flow through the loc.gov API; coverage and newspaper perspective remain part of the claim.",
                "https://www.loc.gov/apis/additional-apis/chronicling-america-api/",
              ],
              [
                "Smithsonian Open Access",
                "Millions of reusable collection images and data, with API-key and item-media boundaries documented by the provider.",
                "https://www.si.edu/openaccess/devtools",
              ],
            ].map(([label, note, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="bg-[#100b07]/94 group px-4 py-5 transition hover:bg-[#181008]"
              >
                <strong className="text-white/82 flex items-center justify-between gap-3 text-[12px] transition group-hover:text-amber-100">
                  {label}
                  <ArrowUpRight
                    size={13}
                    className="text-amber-200/38 shrink-0"
                    aria-hidden="true"
                  />
                </strong>
                <span className="mt-3 block text-[11px] leading-5 text-stone-500">
                  {note}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
