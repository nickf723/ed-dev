"use client";
import React, { useState } from "react";
import Link from "next/link"; 
import { LucideIcon, Quote } from "lucide-react";
import { BookCopy, CheckCircle, CheckSquare, ChevronDown, ChevronUp, Eye, EyeOff, ExternalLink as ExternalLinkIcon, 
  Info, Lightbulb, Link as LinkIcon, ListCheck, Target, AlertTriangle } from "lucide-react";

// --- EXISTING TYPES ---
type LessonHeaderProps = { icon: LucideIcon; title: string; };
type CollapsibleTopicProps = { title: string; icon: LucideIcon; children: React.ReactNode; startOpen?: boolean; };
type LessonImageProps = { src: string; caption?: string; bgColor?: string; };
export interface TabItem { title: string; icon?: React.ElementType; content: React.ReactNode; }

// --- EXISTING COMPONENTS (Header, Subhead, P, Definition, etc.) ---
// ... (Keeping your existing components as is, just ensuring imports are correct above)

export default function LessonHeader({ icon: Icon, title }: LessonHeaderProps) {
  return (
    <h2 className="!mt-12 !mb-4 flex items-center gap-3 border-b border-neutral-800 pb-2 text-3xl font-bold" style={{ color: "var(--theme-text-header)" }}>
      <Icon className="h-7 w-7 flex-shrink-0" style={{ color: "var(--theme-text-icon)" }} />
      <span>{title}</span>
    </h2>
  );
}

export function ContentSubhead({ title }: { title: string }) {
  return <h3 className="!mt-10 !mb-3 text-2xl font-semibold text-neutral-200">{title}</h3>;
}

export function ContentP({ children }: { children: React.ReactNode }) {
  return <p className="prose-p:!my-0 text-neutral-300 leading-relaxed mb-4 last:mb-0">{children}</p>;
}

export function TermDefinition({ term, children }: { term: string; children: React.ReactNode }) {
  return (
      <div className="my-4 rounded-lg border border-indigo-800/40 bg-indigo-900/20 p-4">      
      <h4 className="!mt-0 !mb-2 flex items-center gap-2">
        <BookCopy size={16} className="text-indigo-400" />
         <span className="font-semibold text-indigo-300">{term} </span>
      </h4>
      <p className="!my-0 text-sm text-indigo-100/80 mt-1 leading-relaxed">{children}</p>
    </div>
  );
}

export function SideNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-4 rounded-lg border border-amber-700 bg-amber-900/30 p-4">
      <div className="flex gap-3">
        <Info size={18} className="mt-1 flex-shrink-0 text-amber-400" />
        <div className="text-sm text-amber-300 prose-p:!my-0 space-y-2">
          {children}
        </div>
      </div>
    </aside>
  );
}

export function LessonImage({ src, caption, bgColor }: LessonImageProps) {
  return (
    <figure className="my-6">
      <img src={src} alt={caption || "Diagram"} className="mx-auto rounded-lg border border-neutral-800 shadow-lg" style={{ backgroundColor: bgColor }} />
      {caption && <figcaption className="mt-2 text-center text-sm text-neutral-400">{caption}</figcaption>}
    </figure>
  );
}

export function LessonVideo({ url }: { url: string }) {
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 shadow-md">
      <iframe src={url} title="Embedded video" className="h-full w-full" allowFullScreen/>
    </div>
  );
}

export function QuizContainer({title,children,}: {title: string; children: React.ReactNode;}) {
  return (
    <div className="my-6 rounded-lg border border-neutral-800 bg-neutral-900/40">
      <div className="flex items-center gap-2 border-b border-neutral-800 p-4">
        <Target size={18} className="text-cyan-400" />
          <h3 className="!m-0 text-lg font-semibold text-indigo-300"> {title} </h3>
      </div>
      <div className="space-y-4 p-4">{children}</div>
    </div>
  );
}

export function PracticeProblem({ question, solution }: { question: string; solution?: string; }) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
      <p className="mb-2 flex items-center gap-2 font-medium text-neutral-200">
        <CheckSquare size={16} className="text-neutral-500" />
        <span>{question}</span>
      </p>
      {solution && (
        <>
          <button onClick={() => setIsShown(!isShown)} className="group flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-indigo-300 data-[open=true]:text-indigo-300" data-open={isShown}>
            {isShown ? <EyeOff size={14} /> : <Eye size={14} />}
            {isShown ? "Hide Solution" : "Show Solution"}
          </button>
          {isShown && (
            <p className="mt-3 rounded-md border border-neutral-700 bg-neutral-900 p-3 text-neutral-300">
              <span className="font-semibold text-indigo-300"> Solution: </span> {solution}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export function AppletContainer({ title, children }: { title: string; children: React.ReactNode; }) {
  return (
    <div className="my-6 rounded-lg border border-neutral-800">
      <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900/30 px-4 py-3">
        <Eye size={16} className="text-neutral-400" />
        <h3 className="!m-0 text-base font-semibold text-neutral-300">{title}</h3>
      </div>
      <div className="bg-neutral-900/20 p-4">{children}</div>
    </div>
  );
}

export function InternalLink({ title, href }: { title: string; href: string; }) {
  return (
    <Link href={href} className="block rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-cyan-300 transition hover:bg-neutral-800 flex items-center gap-2">
      <LinkIcon size={14} />
      <span>{title}</span>
    </Link>
  );
}

export function ExternalLink({ title, url }: { title: string; url: string; }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-cyan-300 transition hover:bg-neutral-800 flex items-center gap-2">
      <ExternalLinkIcon size={14} />
      <span>{title}</span>
    </a>
  );
}

export function StepByStepSolution({ title, steps }: { title: string; steps: string[]; }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="my-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
      <button onClick={() => setIsExpanded(!isExpanded)} className="flex w-full items-center justify-between p-4 text-left" aria-expanded={isExpanded}>
        <span className="flex items-center gap-2 font-medium text-amber-300">
          <Lightbulb size={16} />
          {title}
        </span>
        {isExpanded ? <ChevronUp size={18} className="text-neutral-500" /> : <ChevronDown size={18} className="text-neutral-500" />}
      </button>
      {isExpanded && (
        <div className="border-t border-neutral-800 p-4 pb-6">
          <ol className="list-decimal space-y-3 pl-6 font-mono text-neutral-300">
            {steps.map((step, index) => <li key={index} className="pl-2">{step}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}

export function CollapsibleTopic({ title, icon: Icon, children, startOpen = false }: CollapsibleTopicProps) {
  const [isExpanded, setIsExpanded] = useState(startOpen);
  return (
    <section className="my-8 rounded-2xl border border-neutral-800 bg-neutral-900/30">
      <button onClick={() => setIsExpanded(!isExpanded)} className="flex w-full items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-neutral-800/50" aria-expanded={isExpanded}>
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 flex-shrink-0" style={{ color: "var(--theme-text-icon)" }} />
          <h2 className="!m-0 text-2xl font-bold text-neutral-100">{title}</h2>
        </div>
        {isExpanded ? <ChevronUp size={20} className="text-neutral-500" /> : <ChevronDown size={20} className="text-neutral-500" />}
      </button>
      {isExpanded && <div className="border-t border-neutral-800 pt-4 pb-6 px-6">{children}</div>}
    </section>
  );
}

export function ExampleBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 mb-2 rounded-lg border border-green-800/40 bg-green-900/30 p-4 space-y-2">
        <span className="font-semibold uppercase tracking-wide text-green-300">Example:</span>{" "}{children}
     </div>);
}

export function ContentTabs({ items, initialIndex = 0 }: { items: TabItem[]; initialIndex?: number; }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-1 border-b-2 border-neutral-800">
        {items.map((item, index) => (
          <button key={index} onClick={() => setActiveIndex(index)} className="flex items-center gap-2 rounded-t-md px-4 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-100 data-[active=true]:text-[var(--theme-text-title)] -mb-0.5 border-b-2 border-transparent data-[active=true]:border-[var(--theme-text-icon)]" data-active={index === activeIndex}>
            {item.icon && <item.icon size={15} className="shrink-0" />}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <div className="rounded-b-md border border-t-0 border-neutral-800 bg-neutral-900/30 p-4">
        {items.map((item, index) => (
          <div key={index} hidden={index !== activeIndex}>{item.content}</div>
        ))}
      </div>
   </div>
  );
}

// --- NEW COMPONENTS ---

// 1. BlockQuote (For Literature/Philosophy)
export function BlockQuote({ children, author, source }: { children: React.ReactNode; author?: string; source?: string }) {
  return (
    <blockquote className="my-6 border-l-4 border-cyan-500 bg-neutral-900/30 pl-6 py-4 pr-4 italic text-neutral-300 rounded-r-lg">
      <div className="relative">
        {/* Optional decorative quote mark */}
        <Quote className="absolute -top-3 -right-5 text-cyan-500/20 h-8 w-8" fill="currentColor" />
        <div className="relative z-10">{children}</div>
      </div>
      {(author || source) && (
        <footer className="mt-3 text-sm not-italic text-neutral-400 flex items-center gap-2">
          <span className="h-px w-4 bg-neutral-600"></span>
          {author && <span className="font-semibold text-neutral-200">{author}</span>}
          {source && <cite className="opacity-80">{source}</cite>}
        </footer>
      )}
    </blockquote>
  );
}

// 2. Callout (Versatile Alerts)
type CalloutType = "info" | "warning" | "success" | "error";

export function Callout({ type = "info", title, children }: { type?: CalloutType; title: string; children: React.ReactNode }) {
  const styles = {
    info: { border: "border-blue-800/40", bg: "bg-blue-900/20", text: "text-blue-300", icon: Info },
    warning: { border: "border-amber-800/40", bg: "bg-amber-900/20", text: "text-amber-300", icon: AlertTriangle },
    success: { border: "border-emerald-800/40", bg: "bg-emerald-900/20", text: "text-emerald-300", icon: CheckCircle },
    error: { border: "border-red-800/40", bg: "bg-red-900/20", text: "text-red-300", icon: AlertTriangle },
  };
  
  const currentStyle = styles[type];
  const Icon = currentStyle.icon;

  return (
    <div className={`my-4 rounded-lg border ${currentStyle.border} ${currentStyle.bg} p-4`}>
      <h4 className={`flex items-center gap-2 font-semibold ${currentStyle.text} mb-2`}>
        <Icon size={18} />
        {title}
      </h4>
      <div className="text-sm text-neutral-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// 3. Procedure List (For Labs/Algorithms)
export function ProcedureList({ title, steps }: { title?: string; steps: string[] }) {
  return (
    <div className="my-6 rounded-xl border border-neutral-800 bg-neutral-950/50 overflow-hidden">
      {title && (
        <div className="bg-neutral-900/80 px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
           <ListCheck size={16} className="text-purple-400" />
           <h4 className="font-bold text-neutral-200 text-sm uppercase tracking-wider">{title}</h4>
        </div>
      )}
      <ul className="divide-y divide-neutral-800/50">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 p-4 transition-colors hover:bg-neutral-900/30">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-xs font-mono text-neutral-400">
              {i + 1}
            </span>
            <span className="text-neutral-300 text-sm leading-relaxed">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 4. Data Grid (Simple Responsive Table)
export function DataGrid({ headers, data }: { headers: string[]; data: (string | number)[][] }) {
  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/20">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider font-semibold">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-6 py-3 border-b border-neutral-800 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-6 py-4 text-neutral-300 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}