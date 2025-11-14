// app/formal-science/mathematics/algebra/pre-algebra/algebraic-properties/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  CollapsibleTopic,
  ContentP,
  ContentSubhead,
  TermDefinition,
  AppletContainer,
  SideNote,
  ExampleBlock,
  ContentTabs,
  TabItem,
  InternalLink,
  StepByStepSolution,
} from "@/components/LessonBlocks";
import {
  Shuffle,
  ArrowRightLeft,
  Parentheses,
  Sigma,
  Spline,
  Plus,
  BookCopy,
  Key,
  AlertTriangle,
  Link as LinkIcon,
  ChevronRight,
  Puzzle,
  Check,
  Lightbulb
} from "@/components/icons";
import React, { useState, useMemo } from "react";
import { MBlock, M } from "@/components/Math";
import Link from "next/link";
import GlossaryTerm from "@/components/GlossaryTerm";

// Symbols for the background
const propertiesSymbols = [
  "a+b=b+a",
  "a(b+c)",
  "ab+ac",
  "(x+y)z",
  "a(1)=a",
  "a+(-a)=0",
  "x(y+z)",
  "a(bc)=(ab)c",
];

// --- CONTENT DEFINITIONS ---

// Tabs for Core Properties
const corePropertyTabs: TabItem[] = [
  {
    title: "Commutative",
    icon: ArrowRightLeft,
    content: (
      <>
        <ContentP>
          The{" "}
          <GlossaryTerm term="Commutative Property">
            Commutative Property
          </GlossaryTerm>{" "}
          states that the <strong>order</strong> of numbers does not matter for
          addition and multiplication. Think "commute," as in the numbers can
          move or swap places.
        </ContentP>
        <ExampleBlock>
          <p>
            <strong>Addition:</strong> <M>a + b = b + a</M>
          </p>
          <p>
            <M>5 + 2 = 2 + 5</M> (both equal 7)
          </p>
          <p className="mt-2">
            <strong>Multiplication:</strong> <M>a \times b = b \times a</M>
          </p>
          <p>
            <M>3 \times 4 = 4 \times 3</M> (both equal 12)
          </p>
        </ExampleBlock>
        <SideNote>
          <ContentP>
            This property does <strong>NOT</strong> apply to subtraction or
            division.
          </ContentP>
          <p>
            <M>5 - 2 \neq 2 - 5</M>
          </p>
        </SideNote>
      </>
    ),
  },
  {
    title: "Associative",
    icon: Parentheses,
    content: (
      <>
        <ContentP>
          The{" "}
          <GlossaryTerm term="Associative Property">
            Associative Property
          </GlossaryTerm>{" "}
          states that the <strong>grouping</strong> of numbers (using
          parentheses) does not matter for addition and multiplication. Think
          "associate," as in which numbers "group up" together first.
        </ContentP>
        <ExampleBlock>
          <p>
            <strong>Addition:</strong> <M>(a + b) + c = a + (b + c)</M>
          </p>
          <p>
            <M>(2 + 3) + 4 = 2 + (3 + 4)</M> (both equal 9)
          </p>
          <p className="mt-2">
            <strong>Multiplication:</strong>{" "}
            <M>(a \times b) \times c = a \times (b \times c)</M>
          </p>
          <p>
            <M>(4 \times 2) \times 5 = 4 \times (2 \times 5)</M> (both equal 40)
          </p>
        </ExampleBlock>
        <SideNote>
          <ContentP>
            This rule is what allows us to add a long list of numbers, or
            multiply <M>2 \times 3 \times 4</M>, without worrying about which
            pair we combine first.
          </ContentP>
        </SideNote>
      </>
    ),
  },
  {
    title: "Distributive",
    icon: Spline,
    content: (
      <>
        <ContentP>
          The{" "}
          <GlossaryTerm term="Distributive Property">
            Distributive Property
          </GlossaryTerm>{" "}
          is the one property that links addition and multiplication. It
          describes how to "distribute" a factor to <strong>each</strong> term
          inside parentheses.
        </ContentP>
        <MBlock>a \times (b + c) = (a \times b) + (a \times c)</MBlock>
        <ExampleBlock>
          <M>5 \times (2 + 3) = (5 \times 2) + (5 \times 3)</M>
          <br />
          <M>5 \times (5) = 10 + 15</M>
          <br />
          <M>25 = 25</M>
        </ExampleBlock>
        <SideNote>
          <ContentP>
            This is the most critical property for algebra, as it's how we
            expand expressions like <M>3(x + 4) = 3x + 12</M>.
          </ContentP>
        </SideNote>
      </>
    ),
  },
];

// --- PAGE COMPONENT ---
export default function AlgebraicPropertiesPage() {
  return (
    <main className="topic-page theme-elementary-algebra-foundations lg:px-16">
      <FloatingSymbols symbols={propertiesSymbols} />
      <PageHeader
        eyebrow="Pre-Algebra"
        title="Properties of Algebra"
        subtitle="The fundamental rules that govern how we manipulate, combine, and simplify numbers and variables. Mastering these is the key to solving equations."
      />

      {/* --- Two-column layout --- */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* --- Column 1: Main Content --- */}
        <div className="lg:col-span-2 text-left">
          <CollapsibleTopic
            title="1. The Core Properties"
            icon={Shuffle}
            startOpen={true}
          >
            <ContentP>
              Algebraic properties are the "rules of the road" for math. They
              seem simple, but they are the bedrock that guarantees our
              methods for solving complex equations will work every time.
            </ContentP>
            <ContentP>
              We can split them into three main groups: rules for{" "}
              <strong>order and grouping</strong>, rules for{" "}
              <strong>canceling out</strong>, and the one rule that{" "}
              <strong>links</strong> addition and multiplication.
            </ContentP>
            <ContentTabs items={corePropertyTabs} />
          </CollapsibleTopic>

          <CollapsibleTopic title="2. Identity & Inverse Properties" icon={Sigma}>
            <ContentP>
              These properties define what it means to "stay the same" and to
              "cancel out" — two crucial concepts for solving for 'x'.
            </ContentP>
            <ContentSubhead title="The Identity Properties (Staying the Same)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TermDefinition term="Additive Identity">
                The <GlossaryTerm term="Additive Identity">identity for addition</GlossaryTerm> is <strong>0</strong>. Adding 0 to any
                number leaves it unchanged.
                <br />
                <M>a + 0 = a</M>
              </TermDefinition>
              <TermDefinition term="Multiplicative Identity">
                The <GlossaryTerm term="Multiplicative Identity">identity for multiplication</GlossaryTerm> is <strong>1</strong>.
                Multiplying any number by 1 leaves it unchanged.
                <br />
                <M>a \times 1 = a</M>
              </TermDefinition>
            </div>

            <ContentSubhead title="The Inverse Properties (Canceling Out)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TermDefinition term="Additive Inverse">
                A number's <GlossaryTerm term="Additive Inverse">"opposite"</GlossaryTerm> that, when added, results in the
                additive identity (0).
                <br />
                <M>a + (-a) = 0</M> (e.g., <M>5 + (-5) = 0</M>)
              </TermDefinition>
              <TermDefinition term="Multiplicative Inverse">
                A number's <GlossaryTerm term="Multiplicative Inverse">"reciprocal"</GlossaryTerm> that, when multiplied,
                results in the multiplicative identity (1).
                <br />
                <M>{"a \\times \\frac{1}{a} = 1"}</M> (e.g.,{" "}
                <M>{"7 \\times \\frac{1}{7} = 1"}</M>)
              </TermDefinition>
            </div>
          </CollapsibleTopic>

          <CollapsibleTopic title="3. Interactive Practice" icon={Puzzle}>
            <ContentP>
              Let's see if you can identify the properties in action. Match the
              equation to the property it demonstrates.
            </ContentP>
            <PropertySorterApplet />
          </CollapsibleTopic>

          <CollapsibleTopic
            title="4. Why Properties Matter"
            icon={Lightbulb}
          >
            <ContentP>
              These properties aren't just for memorizing. They are the
              step-by-step logic we use to simplify complex algebraic
              expressions. When you "combine like terms," you are actually
              using several properties at once.
            </ContentP>
            <StepByStepSolution
              title="Example: Simplify 2(x + 3) + 4x"
              steps={[
                "2(x + 3) + 4x (Original Expression)",
                "2x + 6 + 4x (Used the Distributive Property)",
                "2x + 4x + 6 (Used the Commutative Property)",
                "(2x + 4x) + 6 (Used the Associative Property)",
                "6x + 6 (Combined like terms - a form of distribution!)",
              ]}
            />
          </CollapsibleTopic>
        </div>

        {/* --- Column 2: Aside/Sidebar --- */}
        <aside className="lg:col-span-1 text-left lg:sticky lg:top-24 h-min space-y-8">
          <KeyConceptsAside />
          <CommonPitfallsAside />
          <RelatedTopicsAside />
        </aside>
      </div>
    </main>
  );
}

// --- ASIDE COMPONENTS ---

function KeyConceptsAside() {
  return (
    <div className="glass rounded-2xl border border-cyan-800/40 bg-cyan-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-cyan-300">
        <Key size={18} />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          <strong><GlossaryTerm term="Commutative Property">Commutative</GlossaryTerm>:</strong> Order
          doesn't matter (<M>a+b = b+a</M>).
        </li>
        <li>
          <strong><GlossaryTerm term="Associative Property">Associative</GlossaryTerm>:</strong> Grouping
          doesn't matter (<M>a+(b+c) = (a+b)+c</M>).
        </li>
        <li>
          <strong><GlossaryTerm term="Distributive Property">Distributive</GlossaryTerm>:</strong> Multiply
          into a sum (<M>a(b+c) = ab+ac</M>).
        </li>
        <li>
          <strong><GlossaryTerm term="Identity Property">Identity</GlossaryTerm>:</strong> Stays the same (<M>a+0=a</M>,{" "}
          <M>a \times 1=a</M>).
        </li>
        <li>
          <strong><GlossaryTerm term="Inverse Property">Inverse</GlossaryTerm>:</strong> Cancels to identity (<M>a+(-a)=0</M>,{" "}
          <M>a \times 1/a=1</M>).
        </li>
      </ul>
    </div>
  );
}

function CommonPitfallsAside() {
  return (
    <div className="glass rounded-2xl border border-amber-800/40 bg-amber-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
        <AlertTriangle size={18} />
        Common Pitfalls
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          Applying Commutative property to subtraction or division (e.g.,
          <M>5 - 3 \neq 3 - 5</M>).
        </li>
        <li>
          Forgetting to distribute to <strong>all</strong> terms. (e.g., <M>3(x+2)</M>{" "}
          becomes <M>3x+6</M>, not <M>3x+2</M>).
        </li>
        <li>
          Confusing Commutative (changing order) with Associative (changing
          grouping).
        </li>
      </ul>
    </div>
  );
}

function RelatedTopicsAside() {
  return (
    <div className="glass rounded-2xl border border-neutral-800/60 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-100">
        <BookCopy size={18} />
        Related Topics
      </h3>
      <ul className="space-y-3">
        <AsideLink
          href="/formal-science/mathematics/number-theory/arithmetic/num-ops" // <-- UPDATED LINK
          title="Numbers & Operations"
          description="Review the number systems these properties apply to."
        />
        <AsideLink
          href="/formal-science/mathematics/algebra/pre-algebra/variables-expressions"
          title="Variables & Expressions"
          description="Learn how to use symbols (like 'x') to represent unknown values."
        />
        <AsideLink
          href="#"
          title="Solving Equations"
          description="Apply these rules to find the value of 'x' in an equation."
        />
      </ul>
    </div>
  );
}

function AsideLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  const isPlanned = href === "#";
  return (
    <Link
      href={href}
      className={`group block rounded-lg bg-neutral-900/50 p-4 transition-all duration-200 ${
        isPlanned
          ? "cursor-not-allowed opacity-60"
          : "hover:bg-neutral-800/70 hover:shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold ${
            isPlanned
              ? "text-neutral-400"
              : "text-cyan-300 group-hover:underline"
          }`}
        >
          {title}
        </span>
        {!isPlanned && (
          <ChevronRight className="h-5 w-5 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400" />
        )}
      </div>
      <p className="mt-1 text-sm text-neutral-400">{description}</p>
      {isPlanned && (
        <span className="mt-2 inline-block rounded-full bg-neutral-700 px-2 py-0.5 text-xs font-medium text-neutral-300">
          Planned
        </span>
      )}
    </Link>
  );
}

// --- NEW APPLET COMPONENT ---
const propertyExamples = [
  {
    equation: "5 + (3 + 7) = (5 + 3) + 7",
    correct: "Associative Property",
  },
  { equation: "4 \times 8 = 8 \times 4", correct: "Commutative Property" },
  { equation: "3(y + 2) = 3y + 6", correct: "Distributive Property" },
  { equation: "x + (-x) = 0", correct: "Inverse Property" },
  { equation: "y + 0 = y", correct: "Identity Property" },
  {
    equation: "2 \times (5 \times z) = (2 \times 5) \times z",
    correct: "Associative Property",
  },
  { equation: "1 \times 9 = 9", correct: "Identity Property" },
];

const allPropertyNames = [
  "Commutative Property",
  "Associative Property",
  "Distributive Property",
  "Identity Property",
  "Inverse Property",
];

function PropertySorterApplet() {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const currentExample = useMemo(() => propertyExamples[index], [index]);

  const handleGuess = (guess: string) => {
    if (isCorrect) return; // Don't allow guessing after a correct answer

    if (guess === currentExample.correct) {
      setFeedback("Correct!");
      setIsCorrect(true);
    } else {
      setFeedback(`Not quite. That's the ${guess}, try again!`);
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    setFeedback("");
    setIsCorrect(false);
    setIndex((prev) => (prev + 1) % propertyExamples.length);
  };

  return (
    <AppletContainer title="Property Sorter">
      <ContentP>
        Which property is being demonstrated by the following equation?
      </ContentP>
      <div className="my-4 flex items-center justify-center rounded-lg bg-neutral-800 p-6">
        <span className="font-mono text-3xl font-bold text-cyan-300">
          <M>{currentExample.equation}</M>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {allPropertyNames.map((name) => (
          <button
            key={name}
            onClick={() => handleGuess(name)}
            disabled={isCorrect}
            className={`rounded-md border p-3 text-center font-medium transition-all
              ${isCorrect
                ? name === currentExample.correct
                  ? "bg-green-600 border-green-500 text-white" // Correct guess
                  : "bg-neutral-800 border-neutral-700 text-neutral-500 opacity-50" // Disabled incorrect
                : "bg-neutral-900/50 border-neutral-700 text-neutral-200 hover:bg-neutral-800" // Default state
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      {feedback && (
        <p
          className={`mt-3 rounded-md p-3 text-center text-sm font-medium ${
            isCorrect ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
          }`}
        >
          {feedback}
        </p>
      )}
      {isCorrect && (
        <button
          onClick={nextQuestion}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500"
        >
          Next Question <ChevronRight size={16} />
        </button>
      )}
    </AppletContainer>
  );
}