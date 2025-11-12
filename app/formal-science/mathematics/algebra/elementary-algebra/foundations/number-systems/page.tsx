// app/formal-science/mathematics/algebra/elementary-algebra/foundations/number-systems/page.tsx
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
  InternalLink,
} from "@/components/LessonBlocks";
import {
  Waypoints, Grid3X3,
  Binary,
  Puzzle,
  Lightbulb,
  Sigma,
  BookCopy,
  ChevronRight,
  Check,
  X as XIcon,
} from "@/components/icons";
import React, { useState, useEffect } from "react";
import { MBlock, M } from "@/components/Math";

// Symbols for the background, expanded for this topic
const numberSystemSymbols = [
  "1", "0", "-5", "π", "√2", "0.5", "1/3", "i", "a+bi",
  "ℕ", "ℤ", "ℚ", "ℝ", "𝕀", "ℂ",
];

// --- Main Page Component ---
export default function NumberSystemsPage() {
  return (
    <main className="topic-page theme-elementary-algebra-foundations lg:px-16">
      <FloatingSymbols symbols={numberSystemSymbols} />
      <PageHeader
        eyebrow="Foundations of Algebra"
        title="Number Systems"
        subtitle="Explore the fundamental building blocks of all mathematics. From simple counting numbers to the complexities of the imaginary, understand how these systems define the rules of what's possible."
      />
      {/* Main content area for collapsible topics */}
      <div className="w-full max-w-6x1 text-left">
        {/* --- 1. THE HIERARCHY OF NUMBERS --- */}
        <CollapsibleTopic
          title="1. The Hierarchy of Numbers"
          icon={Waypoints}
          startOpen={true}
        >
          <ContentP>
            In algebra, we don't just work with "numbers"; we work with
            different <strong>systems</strong> of numbers. Each system is like a
            set of Russian nesting dolls—smaller, simpler systems are contained
            within larger, more complex ones.
          </ContentP>
          <ContentP>
            Knowing which system you're working in is crucial because it defines
            the "rules" and tells you what kind of answers are possible.
          </ContentP>

          
          <ContentP>
            This diagram shows how all <strong>Natural Numbers</strong> are also
            <strong>Whole Numbers</strong>, all <strong>Integers</strong> are also
            <strong>Rational Numbers</strong>, and all <strong>Rational</strong> and
            <strong>Irrational</strong> numbers together make up the
            <strong>Real Numbers</strong>.
          </ContentP>
        </CollapsibleTopic>

        {/* --- 2. THE CORE REAL NUMBER SYSTEMS --- */}
        <CollapsibleTopic title="2. The Core Systems" icon={Grid3X3}>
          <ContentP>
            The <strong>Real Numbers (ℝ)</strong> are all the numbers you can
            find on a number line. They are split into two main groups: Rational
            and Irrational. But let's start from the very beginning.
          </ContentP>
          <ContentSubhead title="The Building Blocks" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TermDefinition term="Natural Numbers (ℕ)">
              The "counting numbers." They are the most basic numbers we learn.
              <br />
              <strong>Examples:</strong> <M>1, 2, 3, 4, ...</M>
            </TermDefinition>
            <TermDefinition term="Whole Numbers (𝕎)">
              This is the set of Natural Numbers plus <strong>zero</strong>.
              <br />
              <strong>Examples:</strong> <M>0, 1, 2, 3, ...</M>
            </TermDefinition>
            <TermDefinition term="Integers (ℤ)">
              This set includes all Whole Numbers and their{" "}
              <strong>negative opposites</strong>.
              <br />
              <strong>Examples:</strong> <M>...-3, -2, -1, 0, 1, 2, 3...</M>
            </TermDefinition>
          </div>
          <ContentSubhead title="The Fractions and Gaps" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TermDefinition term="Rational Numbers (ℚ)">
              Any number that can be written as a <strong>ratio</strong> (a
              fraction) of two integers, <M>a/b</M>, where <M>b \neq 0</M>. This
              includes all integers, terminating decimals, and repeating
              decimals.
              <br />
              <strong>Examples:</strong>{" "}
              <M>{"1/2, -3/4, 7, 0.5, 0.\\overline{3}"}</M>
            </TermDefinition>
            <TermDefinition term="Irrational Numbers (𝕀)">
              The "gaps" on the number line. These are numbers that{" "}
              <strong>cannot</strong> be written as a simple fraction. Their
              decimal representations go on forever *without* repeating.
              <br />
              <strong>Examples:</strong> <M>{"\\pi, \\sqrt{2}, e, \\phi"}</M>
            </TermDefinition>
          </div>
          <ContentSubhead title="The Complete Number Line" />
          <TermDefinition term="Real Numbers (ℝ)">
            The set of all <strong>Rational</strong> and
            <strong>Irrational</strong> numbers combined. They represent every
            single point on the number line.
          </TermDefinition>
        </CollapsibleTopic>

        {/* --- 3. INTERACTIVE CLASSIFIERS --- */}
        <CollapsibleTopic title="3. Interactive Classifiers" icon={Puzzle}>
          <ContentP>
            Let's put your knowledge to the test. Use these tools to see how
            different numbers fit into the systems.
          </ContentP>
          <NumberClassifierApplet />
          <NumberSorterApplet />
        </CollapsibleTopic>

        {/* --- 4. WHY CLASSIFICATION MATTERS --- */}
        <CollapsibleTopic title="4. Why Classification Matters" icon={Lightbulb}>
          <ContentP>
            Why do we need so many different sets? Because they tell us what
            kind of solutions to expect. The rules of one system don't
            always apply to another.
          </ContentP>
          <ExampleBlock>
            Consider the equation <M>2x = 5</M>.
            <ul className="mt-2 list-disc pl-5">
              <li>
                If you are asked to "find the <strong>integer</strong> solution,"
                the answer is: <strong>None</strong>. There is no integer <M>x</M>
                that makes this true.
              </li>
              <li>
                If you are asked to "find the <strong>rational</strong> solution,"
                the answer is: <M>x = 5/2</M> (or <M>2.5</M>).
              </li>
            </ul>
          </ExampleBlock>
          <SideNote>
            Historically, the discovery of new number systems solved problems
            that were once thought impossible.
            <ul className="mt-2 list-disc pl-5">
              <li>
                <M>x + 5 = 2</M> is impossible with only <strong>Whole Numbers</strong>,
                but solvable with <strong>Integers</strong> (<M>x = -3</M>).
              </li>
              <li>
                <M>x^2 = 2</M> is impossible with only <strong>Rational Numbers</strong>,
                but solvable with <strong>Irrational Numbers</strong> (
                <M>x = \\sqrt(2)</M>).
              </li>
            </ul>
          </SideNote>
        </CollapsibleTopic>

        {/* --- 5. BEYOND THE REAL: COMPLEX NUMBERS --- */}
        <CollapsibleTopic title="5. Beyond the Real Line" icon={Sigma}>
          <ContentP>
            There is one more step. What about an equation like
            <M>x^2 = -1</M>? No "real" number can be squared to get a
            negative. To solve this, mathematicians invented a new system.
          </ContentP>

          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TermDefinition term="Imaginary Unit (i)">
              The number defined as <M>i = \\sqrt(-1)</M>. It has the
              property that <M>i^2 = -1</M>.
            </TermDefinition>
            <TermDefinition term="Complex Numbers (ℂ)">
              Numbers that have both a real part and an imaginary part, written
              in the form <M>a + bi</M>.
              <br />
              <strong>Examples:</strong> <M>3 + 2i, 5 - i, 8</M> (which is <M>8 + 0i</M>)
            </TermDefinition>
          </div>
          <SideNote>
            <strong>Complex Numbers</strong> are not just a mathematical curiosity!
            They are essential in advanced engineering, quantum mechanics, and
            electrical signal processing.
          </SideNote>
        </CollapsibleTopic>

        {/* --- 6. SUMMARY & CONNECTIONS --- */}
        <CollapsibleTopic title="6. Summary & Connections" icon={BookCopy}>
          <ContentP>
            You've explored the entire hierarchy of numbers, from the simple
            counting numbers (ℕ) to the powerful complex numbers (ℂ). Each
            system builds on the last, allowing us to solve new and more
            complex problems.
          </ContentP>
          <InternalLink
            title="Next Topic: Algebraic Properties"
            href="/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops"
          />
        </CollapsibleTopic>
      </div>
    </main>
  );
}

// --- Internal Component: Number Classifier Applet ---
// This is the same applet from the num-ops page, reused here.
function NumberClassifierApplet() {
  const [inputValue, setInputValue] = useState("3.5");
  const [results, setResults] = useState<string[]>([]);

  const classify = (str: string) => {
    str = str.trim();
    if (!str) {
      setResults(["Please enter a value."]);
      return;
    }
    if (str === "π" || str.toLowerCase() === "pi" || str.toLowerCase() === "e") {
      setResults(["Real", "Irrational"]);
      return;
    }
    if (str.includes("√") || str.toLowerCase().includes("sqrt")) {
      // Basic check, doesn't handle perfect squares, but good for demo
      setResults(["Real", "Irrational (if not a perfect square)"]);
      return;
    }

    if (str.includes("/") && !str.includes(".")) {
      const parts = str.split("/");
      if (
        parts.length === 2 &&
        !isNaN(Number(parts[0])) &&
        !isNaN(Number(parts[1]))
      ) {
        if (Number(parts[1]) === 0) {
          setResults(["Undefined (cannot divide by zero)"]);
          return;
        }
        setResults(["Real", "Rational"]);
        return;
      }
    }

    const num = Number(str);
    if (isNaN(num)) {
      setResults(["Not a valid number."]);
      return;
    }

    let types: string[] = ["Real"];

    if (Number.isInteger(num)) {
      types.push("Rational");
      types.push("Integer");
      if (num >= 0) {
        types.push("Whole");
      }
      if (num > 0) {
        types.push("Natural");
      }
    } else {
      types.push("Rational");
    }

    setResults(types.reverse()); // Show most specific first
  };

  useEffect(() => {
    classify(inputValue);
  }, []); // Classify the default value on load

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    classify(inputValue);
  };

  return (
    <AppletContainer title="Quick Classifier">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          placeholder="Enter a number (e.g., -5, 0, 3.5, 1/2, pi)"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500"
        >
          <ChevronRight size={16} />
          Classify
        </button>
      </form>
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-neutral-400">Belongs to:</h4>
        <div className="flex flex-wrap gap-2 pt-2">
          {results.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cyan-400/20 px-3 py-1 text-sm font-medium text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </AppletContainer>
  );
}

// --- Internal Component: New Number Sorter Applet ---
// This applet reinforces the *hierarchy* (that one number belongs to multiple sets)
const numbersToClassify = [
  { num: "7", types: ["Natural", "Whole", "Integer", "Rational", "Real"] },
  { num: "0", types: ["Whole", "Integer", "Rational", "Real"] },
  { num: "-4", types: ["Integer", "Rational", "Real"] },
  { num: "1/2", types: ["Rational", "Real"] },
  { num: "√2", types: ["Irrational", "Real"] },
  { num: "-1.5", types: ["Rational", "Real"] },
];
const allTypes = [
  "Natural",
  "Whole",
  "Integer",
  "Rational",
  "Irrational",
  "Real",
];

function NumberSorterApplet() {
  const [index, setIndex] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>(
    {}
  );
  const [feedback, setFeedback] = useState("");

  const currentNumber = numbersToClassify[index];

  const handleToggle = (type: string) => {
    setFeedback("");
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const checkAnswer = () => {
    const correctTypes = currentNumber.types;
    const selected = Object.keys(selectedTypes).filter((k) => selectedTypes[k]);

    if (
      selected.length === correctTypes.length &&
      selected.every((t) => correctTypes.includes(t))
    ) {
      setFeedback("Correct! All categories match.");
    } else if (selected.every((t) => correctTypes.includes(t))) {
      setFeedback("Almost! You selected the right categories, but missed some.");
    } else if (selected.some((t) => !correctTypes.includes(t))) {
      setFeedback("Not quite. One or more of your selections is incorrect.");
    } else {
      setFeedback("Keep trying! Select all the categories that apply.");
    }
  };

  const nextNumber = () => {
    setIndex((prev) => (prev + 1) % numbersToClassify.length);
    setSelectedTypes({});
    setFeedback("");
  };

  return (
    <AppletContainer title="Hierarchy Sorter">
      <ContentP>
        Select <strong>all</strong> the number systems that the number belongs
        to. Remember the nesting dolls!
      </ContentP>
      <div className="my-4 flex items-center justify-center rounded-lg bg-neutral-800 p-6">
        <span className="font-mono text-4xl font-bold text-cyan-300">
          <M>{currentNumber.num}</M>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {allTypes.map((type) => (
          <label
            key={type}
            className={`flex items-center gap-2 rounded-md border p-3 transition-colors ${
              selectedTypes[type]
                ? "border-cyan-500 bg-cyan-900/40"
                : "border-neutral-700 bg-neutral-900/30 hover:bg-neutral-800"
            }`}
          >
            <input
              type="checkbox"
              checked={!!selectedTypes[type]}
              onChange={() => handleToggle(type)}
              className="h-4 w-4 rounded text-cyan-600 focus:ring-cyan-500"
            />
            <span className="font-medium text-neutral-200">{type}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={checkAnswer}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500"
        >
          <Check size={16} />
          Check Answer
        </button>
        <button
          onClick={nextNumber}
          className="flex-1 rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 font-semibold text-neutral-300 transition-colors hover:bg-neutral-700 sm:flex-none"
        >
          Next Number
        </button>
      </div>
      {feedback && (
        <p className="mt-3 rounded-md bg-neutral-800 p-3 text-center text-sm font-medium text-neutral-200">
          {feedback}
        </p>
      )}
    </AppletContainer>
  );
}