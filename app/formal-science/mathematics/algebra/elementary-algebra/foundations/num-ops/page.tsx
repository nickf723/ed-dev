// app/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops/page.tsx
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
} from "@/components/LessonBlocks";
import {
  BookCopy,
  PlusIcon,
  MinusIcon,
  Binary,
  Percent,
  Calculator,
  ChevronRight,
} from "@/components/icons";
import React, { useState, useEffect } from "react";

// Symbols for the background
const numOpsSymbols = [
  "1", "2", "3", "π", "√2", "-5", "0.5", "1/3", "i", "+", "-", "×", "÷",
];

export default function NumbersAndOperationsPage() {
  return (
    <main className="topic-page theme-elementary-algebra-foundations lg:px-16">
      <FloatingSymbols symbols={numOpsSymbols} />
      <PageHeader
        eyebrow="Foundations of Algebra"
        title="Numbers and Operations"
        subtitle="Understanding the types of numbers that exist and the rules for how they interact. This is the bedrock of all mathematics."
      />

      {/* Main content area for collapsible topics */}
      <div className="w-full max-w-4xl text-left">
        {/* --- NUMBER SYSTEMS (Collapsible) --- */}
        <CollapsibleTopic
          title="Number Systems"
          icon={Binary}
          startOpen={true} // Start with the first one open
        >
          <ContentP>
            In algebra, we don't just work with "numbers"; we work with
            different **systems** of numbers. Each system is like a container
            that holds certain types of numbers and not others. Knowing which
            system you're working in is crucial because it defines the "rules"
            and tells you what kind of answers are possible.
          </ContentP>

          {/* Diagram Placeholder */}
          <div className="my-6 rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-center">
            <span className="text-sm italic text-neutral-400">
              

[Image of the hierarchy of number systems]

            </span>
            <p className="mt-2 text-neutral-200">
              A diagram showing how Natural numbers fit inside Whole, which fit
              inside Integers, which fit inside Rational, all alongside
              Irrational numbers, making up the Real number system.
            </p>
          </div>

          <ContentSubhead title="The Hierarchy of Real Numbers" />

          <TermDefinition term="Natural Numbers (ℕ)">
            The "counting numbers" you first learned. They are positive and do
            not include zero.
            <br />
            <strong>Examples:</strong> 1, 2, 3, 4, 100, 582...
          </TermDefinition>

          <TermDefinition term="Whole Numbers (𝕎)">
            Almost the same as Natural numbers, but they **include zero**.
            <br />
            <strong>Examples:</strong> 0, 1, 2, 3, 100...
          </TermDefinition>

          <TermDefinition term="Integers (ℤ)">
            All Whole numbers and their **negative opposites**. No fractions
            or decimals.
            <br />
            <strong>Examples:</strong> ...-3, -2, -1, 0, 1, 2, 3...
          </TermDefinition>

          <TermDefinition term="Rational Numbers (ℚ)">
            Any number that can be written as a **fraction** (a ratio) of two
            integers. This includes all terminating decimals (like 0.5) and
            all repeating decimals (like 0.333...).
            <br />
            <strong>Examples:</strong> 1/2, -3/4, 7 (since 7 = 7/1), 0.5,
            0.333...
          </TermDefinition>

          <TermDefinition term="Irrational Numbers (𝕀)">
            Numbers that **cannot** be written as a simple fraction. Their
            decimal representations go on forever without repeating.
            <br />
            <strong>Examples:</strong> π (pi), √2 (the square root of 2),
            e
          </TermDefinition>

          <TermDefinition term="Real Numbers (ℝ)">
            The "everything" set. This includes all Rational and all
            Irrational numbers. It's every number on the number line.
            <br />
            <strong>Examples:</strong> -10, 0, 1.5, π, 3/4, √2
          </TermDefinition>

          <ContentSubhead title="Interactive Classifier" />
          <NumberClassifierApplet />

          <SideNote>
            <strong>Why does this matter?</strong> When solving an equation, the
            instructions might say "find the *integer* solution." This tells
            you that if your answer is 1.5, it's not a valid solution for that
            problem. The number system defines the "world" you are solving in.
          </SideNote>
        </CollapsibleTopic>

        {/* --- PROPERTIES OF NUMBERS (Collapsible) --- */}
        <CollapsibleTopic title="Properties of Numbers" icon={BookCopy}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="Commutative, Associative, Distributive properties, etc."
          />
        </CollapsibleTopic>

        {/* --- ORDER OF OPERATIONS (Collapsible) --- */}
        <CollapsibleTopic title="Order of Operations" icon={Calculator}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="PEMDAS/BODMAS and why it matters."
          />
        </CollapsibleTopic>

        {/* --- INTEGERS & RATIONALS (Collapsible) --- */}
        <CollapsibleTopic title="Integers & Rationals" icon={PlusIcon}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="Operations with positive/negative numbers, fractions, and decimals."
          />
        </CollapsibleTopic>

        {/* --- PERCENTAGES, RATIOS, & RATES (Collapsible) --- */}
        <CollapsibleTopic title="Percentages, Ratios, & Rates" icon={Percent}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="Connecting fractions to real-world comparisons."
          />
        </CollapsibleTopic>
      </div>
    </main>
  );
}

// --- Internal Component: Number Classifier Applet ---
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
      setResults(["Real", "Irrational (if not a perfect square)"]);
      return;
    }

    // Handle fractions like "1/2" or "-3/4"
    if (str.includes("/") && !str.includes(".")) {
      const parts = str.split("/");
      if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
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
    
    // Check for Rational/Irrational first (simplified)
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
      // For this applet, we'll assume any valid number input that
      // isn't an integer is a rational decimal.
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
    <AppletContainer title="Number System Classifier">
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