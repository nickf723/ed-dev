"use client";
import React, { useState } from "react";
import Link from "next/link"; 
import { LucideIcon } from "lucide-react";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Lightbulb,
  Plus,
  Minus,
  RefreshCcw,
  Info,
  BookCopy,
  Target,
  CheckSquare,
  ArrowRightLeft,
  Parentheses,
  Sigma,
  Spline,
  Link as LinkIcon,
  ExternalLink as ExternalLinkIcon
} from "./icons";


//Lesson Header Component
type LessonHeaderProps = {
  icon: LucideIcon;
  title: string;
};

//Collapsible Topic Component
type CollapsibleTopicProps = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  startOpen?: boolean;
};

export default function LessonHeader({
  icon: Icon,
  title,
}: LessonHeaderProps) {
  return (
    // 👇 UPDATED: Removed hard-coded text-cyan-300
    <h2
      className="!mt-12 !mb-4 flex items-center gap-3 border-b border-neutral-800 pb-2 text-3xl font-bold"
      style={{ color: "var(--color-text-header)" }} // Use CSS variable
    >
      {/* 👇 UPDATED: Removed hard-coded text-cyan-400/70 */}
      <Icon
        className="h-7 w-7 flex-shrink-0"
        style={{ color: "var(--color-text-icon)" }} // Use CSS variable
      />
      <span>{title}</span>
    </h2>
  );
}

//Subheading Component
export function ContentSubhead({ title }: { title: string }) {
  return (
    <h3 className="!mt-10 !mb-3 text-2xl font-semibold text-neutral-200">
      {title}
    </h3>
  );
}

//Text Paragraph Component
export function ContentP({ children }: { children: React.ReactNode }) {
  return (
    <p className="prose-p:!my-0 text-neutral-300 leading-relaxed">{children}</p>
  );
}

//Term Definition Component
export function TermDefinition({ term, children }: { term: string; children: React.ReactNode }) {
  return (
      <div className="my-5 rounded-lg border border-indigo-800/40 bg-indigo-900/20 p-4">      
      <h4 className="!mt-0 !mb-2 flex items-center gap-2">
        <BookCopy size={16} className="text-indigo-400" />
         <span className="font-semibold text-indigo-300">{term} </span>
      </h4>
      <p className="!my-0 text-sm text-indigo-100/80">{children}</p>
    </div>
  );
}

//Sidenote Component
export function SideNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-5 rounded-lg border border-amber-700 bg-amber-900/30 p-4">
      <div className="flex gap-3">
        <Info size={18} className="mt-1 flex-shrink-0 text-amber-400" />
        <div className="text-sm text-amber-300 prose-p:!my-0">
          <ContentP>{children}</ContentP>
        </div>
      </div>
    </aside>
  );
}

//Image Component
export function LessonImage({src, caption}: {src: string; caption?: string;}) {
  return (
    <figure className="my-6">
      <img src={src} alt={caption || "Diagram"} className="mx-auto rounded-lg border border-neutral-800 shadow-lg"/>
      {caption && (<figcaption className="mt-2 text-center text-sm text-neutral-400">{caption}</figcaption>)}
    </figure>
  );
}

//Video Component
export function LessonVideo({ url }: { url: string }) {
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 shadow-md">
      <iframe src={url} title="Embedded video" className="h-full w-full" allowFullScreen/>
    </div>
  );
}

//Quiz Container Component
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

//Practice Problem Component
export function PracticeProblem({
  question,
  solution,
}: {
  question: string;
  solution?: string;
}) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
      <p className="mb-2 flex items-center gap-2 font-medium text-neutral-200">
        <CheckSquare size={16} className="text-neutral-500" />
        <span>{question}</span>
      </p>
      {solution && (
        <>
          <button
            onClick={() => setIsShown(!isShown)}
            className="group flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium
                      text-neutral-400 transition-colors hover:text-indigo-300
                      data-[open=true]:text-indigo-300"
            data-open={isShown}
          >
            {isShown ? <EyeOff size={14} /> : <Eye size={14} />}
            {isShown ? "Hide Solution" : "Show Solution"}
          </button>
          {isShown && (
            <p className="mt-3 rounded-md border border-neutral-700 bg-neutral-900 p-3 text-neutral-300">
              <span className="font-semibold text-indigo-300"> Solution: </span>{" "}
              {solution}
            </p>
          )}
        </>
      )}
    </div>
  );
}

//Applet Container Component
export function AppletContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-lg border border-neutral-800">
      <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900/30 px-4 py-3">
        <Eye size={16} className="text-neutral-400" />
        <h3 className="!m-0 text-base font-semibold text-neutral-300">
          {title}
        </h3>
      </div>
      <div className="bg-neutral-900/20 p-4">{children}</div>
    </div>
  );
}

//Internal Link Component
export function InternalLink({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-neutral-800 bg-neutral-900/50 
                 px-4 py-3 text-cyan-300 transition hover:bg-neutral-800
                 flex items-center gap-2"
    >
      <LinkIcon size={14} />
      <span>{title}</span>
    </Link>
  );
}

//External Link Component
export function ExternalLink({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-neutral-800 bg-neutral-900/50 
                 px-4 py-3 text-cyan-300 transition hover:bg-neutral-800
                 flex items-center gap-2"
    >
      <ExternalLinkIcon size={14} />
      <span>{title}</span>
    </a>
  );
}

//Step by Step Solution Component
export function StepByStepSolution({
  title,
  steps,
}: {
  title: string;
  steps: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="my-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-2 font-medium text-amber-300">
          <Lightbulb size={16} />
          {title}
        </span>
        {isExpanded ? (
          <ChevronUp size={18} className="text-neutral-500" />
        ) : (
          <ChevronDown size={18} className="text-neutral-500" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-neutral-800 p-4 pb-6">
          <ol className="list-decimal space-y-3 pl-6 font-mono text-neutral-300">
            {steps.map((step, index) => (
              <li key={index} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

//Collapsible Topic Component
export function CollapsibleTopic({
  title,
  icon: Icon,
  children,
  startOpen = false,
}: CollapsibleTopicProps) {
  const [isExpanded, setIsExpanded] = useState(startOpen);

  return (
    <section className="my-8 rounded-2xl border border-neutral-800 bg-neutral-900/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-neutral-800/50"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <Icon
            className="h-6 w-6 flex-shrink-0"
            style={{ color: "var(--color-text-icon)" }}
          />
          <h2 className="!m-0 text-2xl font-bold text-neutral-100">
            {title}
          </h2>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className="text-neutral-500" />
        ) : (
          <ChevronDown size={20} className="text-neutral-500" />
        )}
      </button>
      {isExpanded && (
        <div className="border-t border-neutral-800 p-6 pt-6">
          {children}
        </div>
      )}
    </section>
  );
}

//Example Block Component
export function ExampleBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 mb-2 rounded-lg border border-green-800/40 bg-green-900/30 p-4">
        <span className="font-semibold uppercase tracking-wide text-green-300">Example:</span>{" "}{children}
     </div>);
}

//Tab Item Component
export interface TabItem {
  title: string;
  icon?: React.ElementType;
  content: React.ReactNode;
}

//Content Tabs Component
export function ContentTabs({
  items,
  initialIndex = 0,
}: {
  items: TabItem[];
  initialIndex?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="my-6">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-1 border-b-2 border-neutral-800">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="flex items-center gap-2 rounded-t-md px-4 py-2.5 text-sm
                       font-medium text-neutral-400 transition-colors
                       hover:text-neutral-100 data-[active=true]:text-[var(--color-text-title)]
                       -mb-0.5 border-b-2 border-transparent data-[active=true]:border-[var(--color-text-icon)]"
            data-active={index === activeIndex}
          >
            {item.icon && <item.icon size={15} className="shrink-0" />}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="rounded-b-md border border-t-0 border-neutral-800 bg-neutral-900/30 p-4">
        {items.map((item, index) => (
          <div key={index} hidden={index !== activeIndex}>
            {item.content}
          </div>
        ))}
      </div>
   </div>
  );
}
