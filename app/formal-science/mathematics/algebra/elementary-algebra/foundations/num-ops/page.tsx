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
  LessonImage,
  ExampleBlock,
  ContentTabs,
  TabItem
} from "@/components/LessonBlocks";
import {
  BookCopy,
  PlusIcon,
  MinusIcon,
  Binary,
  Percent,
  Calculator,
  ChevronRight,
  Scale,
  Component,
  Shuffle,
  ArrowRightLeft,
  Parentheses,
  Sigma,
  Plus,
  Minus,
  Spline,
} from "@/components/icons";
import React, { useState, useEffect } from "react";

// Symbols for the background
const numOpsSymbols = [
  "1", "2", "3", "π", "√2", "-5", "0.5", "1/3", "i", "+", "-", "×", "÷", "=", "%", "±",
];

const propertyTabs: TabItem[] = [
  {
    title: "Commutative",
    icon: ArrowRightLeft,
    content: (
      <>
      <ContentP>
          The <strong>Commutative Property</strong> states that the order of
          numbers does not matter for addition and multiplication. Think
          "commute," as in the numbers can move or swap places.
        </ContentP>
        <ExampleBlock>
          <p><strong>Addition:</strong> $a + b = b + a$</p>
          <p>$5 + 2 = 2 + 5$  (both equal 7)</p>
          <p className="mt-2"><strong>Multiplication:</strong> $a \times b = b \times a$</p>
          <p>$3 \times 4 = 4 \times 3$  (both equal 12)</p>
        </ExampleBlock>
        <SideNote>
          <strong>Note:</strong> This property does NOT apply to subtraction or division. $5 - 2 \neq 2 - 5$.
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
          The <strong>Associative Property</strong> states that the grouping of
          numbers (using parentheses) does not matter for addition and
          multiplication. Think "associate," as in which numbers "group up"
          together first.
        </ContentP>
        <ExampleBlock>
          <p><strong>Addition:</strong> $(a + b) + c = a + (b + c)$</p>
          <p>$(2 + 3) + 4 = 2 + (3 + 4)$  (both equal 9)</p>
          <p className="mt-2"><strong>Multiplication:</strong> $(a \times b) \times c = a \times (b \times c)$</p>
          <p>$(4 \times 2) \times 5 = 4 \times (2 \times 5)$  (both equal 40)</p>
        </ExampleBlock>
      </>
    ),
  },
  {
    title: "Identity",
    icon: Sigma,
    content: (
      <>
        <ContentP>
          The <strong>Identity Property</strong> involves a number that, when
          used in an operation, leaves the other number unchanged (it keeps its
          identity).
        </ContentP>
        <ExampleBlock>
          <p><strong>Additive Identity:</strong> The identity is <strong>0</strong>.</p>
          <p>$a + 0 = a$  (e.g., $9 + 0 = 9$)</p>
          <p className="mt-2"><strong>Multiplicative Identity:</strong> The identity is <strong>1</strong>.</p>
          <p>$a \times 1 = a$  (e.g., $-6 \times 1 = -6$)</p>
        </ExampleBlock>
      </>
    ),
  },
  {
    title: "Inverse",
    icon: PlusIcon,
    content: (
      <>
        <ContentP>
          The <strong>Inverse Property</strong> involves finding a number that
          "cancels out" another number, returning you to the identity (0 for
          addition, 1 for multiplication).
        </ContentP>
        <ExampleBlock>
          <p><strong>Additive Inverse (Opposite):</strong></p>
          <p>$a + (-a) = 0$  (e.g., $5 + (-5) = 0$)</p>
          <p className="mt-2"><strong>Multiplicative Inverse (Reciprocal):</strong></p>
          <p>$a \times (1/a) = 1$  (e.g., $7 \times (1/7) = 1$)</p>
        </ExampleBlock>
      </>
    ),
  },
  {
    title: "Distributive",
    icon: Spline,
    content: (
      <>
        <ContentP>
          The <strong>Distributive Property</strong> is the one property that
          links addition and multiplication. It describes how to
          "distribute" a factor to each term inside parentheses.
        </ContentP>
        <ExampleBlock>
          <p><strong>Property:</strong> $a \times (b + c) = (a \times b) + (a \times c)$</p>
          <p>$5 \times (2 + 3) = (5 \times 2) + (5 \times 3)$</p>
          <p>$5 \times (5) = 10 + 15$</p>
          <p>$25 = 25$</p>
        </ExampleBlock>
        <SideNote>
          This is the key to expanding expressions like $3(x + 4) = 3x + 12$.
        </SideNote>
      </>
    ),
  },
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
      <div className="w-full max-w-6xl text-left">
        {/* --- 1. NUMBER SYSTEMS --- */}
        <CollapsibleTopic
          title="Number Systems"
          icon={Binary}
          startOpen={true}>
          <ContentP>
            In algebra, we don't just work with "numbers"; we work with
            different **systems** of numbers. Each system is like a container
            that holds certain types of numbers and not others. Knowing which
            system you're working in is crucial because it defines the "rules"
            and tells you what kind of answers are possible.
          </ContentP>

          {/* Diagram */}
          <LessonImage
            src="/image_7dc108.jpg"
            caption="The hierarchy of real numbers, showing how Natural numbers are a subset of Whole numbers, which are in Integers, then Rationals, all within the Real number system."/>
          <ContentSubhead title="The Hierarchy of Real Numbers" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
+            <TermDefinition term="Natural Numbers (ℕ)">
+              The "counting numbers." <strong>Examples:</strong> 1, 2, 3...
+            </TermDefinition>
+            <TermDefinition term="Whole Numbers (𝕎)">
+              Natural numbers plus **zero**. <strong>Examples:</strong> 0, 1, 2, 3...
+            </TermDefinition>
+            <TermDefinition term="Integers (ℤ)">
+              Whole numbers and their **negative opposites**.{" "}
+              <strong>Examples:</strong> 
+              ...-2, -1, 0, 1, 2...
+            </TermDefinition>
+            <TermDefinition term="Rational Numbers (ℚ)">
+              Any number that can be a **fraction** (ratio). Includes terminating
+              and repeating decimals. <strong>Examples:</strong> 1/2, -3/4, 7, 0.5
+            </TermDefinition>
+            <TermDefinition term="Irrational Numbers (𝕀)">
+              Numbers that **cannot** be a simple fraction. Their decimals are
+              non-terminating and non-repeating. <strong>Examples:</strong> π, √2
+            </TermDefinition>
+            <TermDefinition term="Real Numbers (ℝ)">
+              All rational and irrational numbers. Every point on the number
+              line.
+            </TermDefinition>
+         </div>
          <ContentSubhead title="Interactive Classifier" />
          <NumberClassifierApplet />
          <SideNote>
            <strong>Why does this matter?</strong> When solving an equation, the
            instructions might say "find the *integer* solution." This tells
            you that if your answer is 1.5, it's not a valid solution for that
            problem.
          </SideNote>
        </CollapsibleTopic>

        {/* --- 2. ALGEBRAIC PROPERTIES --- */}
        <CollapsibleTopic title="Algebraic Properties" icon={Shuffle}>
          <ContentP>
            Algebraic properties are the fundamental rules or laws that govern
            how we manipulate numbers and variables in algebra. They are the
            "rules of the road" that ensure our calculations are consistent and
            correct. Understanding these properties allows us to simplify complex
            expressions and solve equations with confidence.
          </ContentP>
          <LessonImage src="/image_7e442d.jpg" caption="A visual summary of the core algebraic properties: Commutative, Associative, Identity, Inverse, and Distributive."/>
          <ContentSubhead title="The Core Properties" />
          <ContentTabs items={propertyTabs} />
        </CollapsibleTopic>

        {/* --- 3. ORDER OF OPERATIONS --- */}
        <CollapsibleTopic title="Order of Operations" icon={Calculator}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="PEMDAS/BODMAS and why it matters."
          />
        </CollapsibleTopic>

        {/* --- 4. ABSOLUTE VALUE --- */}
        <CollapsibleTopic title="Absolute Value" icon={Scale}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="Understanding distance from zero."
          />
        </CollapsibleTopic>

        {/* --- 5. FACTORS AND MULTIPLES --- */}
        <CollapsibleTopic title="Factors and Multiples" icon={Component}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="Prime factorization, GCF, and LCM."
          />
        </CollapsibleTopic>

        {/* --- 6. INTEGERS AND RATIONALS --- */}
        <CollapsibleTopic title="Integers and Rationals" icon={PlusIcon}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="Operations with positive/negative numbers, fractions, and decimals."
          />
        </CollapsibleTopic>

        {/* --- 7. PERCENTAGES, RATIOS, & RATES --- */}
        <CollapsibleTopic title="Percentages, Ratios, & Rates" icon={Percent}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="Connecting fractions to real-world comparisons."
          />
        </CollapsibleTopic>

        {/* --- 8. FRACTIONS AND DECIMALS --- */}
        <CollapsibleTopic title="Fractions and Decimals" icon={MinusIcon}>
          <PageHeader
            eyebrow="Content Coming Soon"
            title="Under Construction"
            subtitle="Conversions and operations."
          />
        </CollapsibleTopic>
      </div>
    </main>
  );
}

// --- Internal Component: Number Classifier Applet (unchanged) ---
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