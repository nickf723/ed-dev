// app/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import FloatingSymbols from "@/components/FloatingSymbols";
import {CollapsibleTopic, ContentP, ContentSubhead, TermDefinition, AppletContainer, SideNote, LessonImage, ExampleBlock, ContentTabs, TabItem} from "@/components/LessonBlocks";
import { Plus, SquareDivide, Binary, Percent, Calculator, ChevronRight, Pause, SquareX, Shuffle, ArrowRightLeft, Parentheses, Sigma, Spline,} from "@/components/icons";
import React, { useState, useEffect } from "react";
import { MBlock, M } from "@/components/Math";
  
// Symbols for the background
const numOpsSymbols = [
  "1", "2", "3", "π", "√2", "-5", "0.5", "1/3", "i", "+", "-", "×", "÷", "=", "%", "±",
];

// Tabs content for Algebraic Properties
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
          This property does NOT apply to subtraction or division. <M>5 - 2 \neq 2 - 5</M>.
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
          <p>
            <strong>Addition:</strong> <M>(a + b) + c = a + (b + c)</M>
          </p>
          <p>
            <M>(2 + 3) + 4 = 2 + (3 + 4)</M> (both equal 9)
          </p>
          <p className="mt-2">
            <strong>Multiplication:</strong> <M>(a \times b) \times c = a \times (b \times c)</M>
          </p>
          <p>
            <M>(4 \times 2) \times 5 = 4 \times (2 \times 5)</M> (both equal 40)
          </p>
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
          <p>
            <strong>Additive Identity:</strong> The identity is <strong>0</strong>.
          </p>
          <p>
            <M>a + 0 = a</M> (e.g., <M>9 + 0 = 9</M>)
          </p>
          <p className="mt-2">
            <strong>Multiplicative Identity:</strong> The identity is <strong>1</strong>.
          </p>
          <p>
            <M>a \times 1 = a</M> (e.g., <M>-6 \times 1 = -6</M>)
          </p>
        </ExampleBlock>
      </>
    ),
  },
  {
    title: "Inverse",
    icon: Plus,
    content: (
      <>
        <ContentP>
          The <strong>Inverse Property</strong> involves finding a number that
          "cancels out" another number, returning you to the identity (<M>0</M> for
          addition, <M>1</M> for multiplication).
        </ContentP>
        <ExampleBlock>
          <p>
            <strong>Additive Inverse (Opposite):</strong>
          </p>
          <p>
            <M>a + (-a) = 0</M> (e.g., <M>5 + (-5) = 0</M>)
          </p>
          <p className="mt-2">
            <strong>Multiplicative Inverse (Reciprocal):</strong>
          </p>
          <p>
            <M>{"a \\times \\frac{1}{a} = 1"}</M> (e.g., <M>{"7 \\times \\frac{1}{7} = 1"}</M>)
          </p>
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
        <MBlock>a \times (b + c) = (a \times b) + (a \times c)</MBlock>
        <ExampleBlock>
          <M>5 \times (2 + 3) = (5 \times 2) + (5 \times 3)</M>
          <br />
          <M>5 \times (5) = 10 + 15</M>
          <br />
          <M>25 = 25</M>
        </ExampleBlock>
        <SideNote>
          This is the key to expanding expressions like <M>3(x + 4) = 3x + 12</M>.
        </SideNote>
      </>
    ),},
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
      <div className="w-full max-w-6x1 text-left">
        {/* --- 1. NUMBER SYSTEMS --- */}
        <CollapsibleTopic title="1. Number Systems" icon={Binary} startOpen={false}>
          <ContentP>
            In algebra, we don't just work with "numbers"; we work with
            different **systems** of numbers. Each system is like a container
            that holds certain types of numbers and not others. Knowing which
            system you're working in is crucial because it defines the "rules"
            and tells you what kind of answers are possible.
          </ContentP>
              <div className="my-6 rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-center">
                <span className="text-sm italic text-neutral-400">
                  [Image: Hierarchy of Number Systems]
                </span>
                <p className="mt-2 text-neutral-200">
                  <M>{"\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}"}</M>
                </p>
              </div>
          <ContentSubhead title="The Hierarchy of Real Numbers" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <TermDefinition term="Natural Numbers (ℕ)">
                        The "counting numbers." <strong>Examples:</strong> <M>1, 2, 3...</M>
                      </TermDefinition>
                      <TermDefinition term="Whole Numbers (𝕎)">
                        Natural numbers plus **zero**. <strong>Examples:</strong>{" "}
                        <M>0, 1, 2, 3...</M>
                      </TermDefinition>
                      <TermDefinition term="Integers (ℤ)">
                        Whole numbers and their **negative opposites**.{" "}
                        <strong>Examples:</strong>
                        <M>...-2, -1, 0, 1, 2...</M>
                      </TermDefinition>
                      <TermDefinition term="Rational Numbers (ℚ)">
                        Any number that can be a **fraction** (ratio). Includes terminating
                        and repeating decimals. <strong>Examples:</strong>{" "}
                        <M>{"1/2, -3/4, 7, 0.5, 0.\\overline{3}"}</M>
                      </TermDefinition>
                      <TermDefinition term="Irrational Numbers (𝕀)">
                        Numbers that **cannot** be a simple fraction. Their decimals are
                        non-terminating and non-repeating. <strong>Examples:</strong>{" "}
                        <M>{"\\pi, \\sqrt{2}, e"}</M>
                      </TermDefinition>
                      <TermDefinition term="Real Numbers (ℝ)">
                        All rational and irrational numbers. Every point on the number
                        line.
                      </TermDefinition>
                    </div>
          <ContentSubhead title="Interactive Classifier" />
          <NumberClassifierApplet />
          <SideNote>
            <strong>Why does this matter?</strong> When solving an equation, the
            instructions might say "find the *integer* solution." This tells
            you that if your answer is <M>1.5</M>, it's not a valid solution for that
            problem.
          </SideNote>
        </CollapsibleTopic>
        {/* --- 2. ALGEBRAIC PROPERTIES --- */}
       <CollapsibleTopic title="2. Algebraic Properties" icon={Shuffle}>
          <ContentP>
            Algebraic properties are the fundamental rules that govern how we
            manipulate numbers and variables. They are the "rules of the road"
            that ensure our calculations are consistent and correct.
          </ContentP>

          <ContentTabs items={propertyTabs} />
        </CollapsibleTopic>
        {/* --- 3. ORDER OF OPERATIONS --- */}
        <CollapsibleTopic title="3. Order of Operations" icon={Calculator}>
          <ContentP>
            The <strong>Order of Operations</strong> is a rule that tells us
            the sequence in which to perform operations in a mathematical
            expression. We often use the acronym <strong>PEMDAS</strong> (or
            BODMAS) to remember it.
          </ContentP>
          <div className="my-6 rounded-lg border border-neutral-700 bg-neutral-900 p-6">
            <ol className="list-decimal space-y-2 pl-6 text-lg font-semibold text-neutral-100">
              <li>
                <strong>P</strong>arentheses (or any grouping symbols like{" "}
                <M>{"[], \\{\\}"}</M>)
              </li>
              <li>
                <strong>E</strong>xponents (and roots)
              </li>
              <li>
                <strong>M</strong>ultiplication and <strong>D</strong>ivision
                (from left to right)
              </li>
              <li>
                <strong>A</strong>ddition and <strong>S</strong>ubtraction (from
                left to right)
              </li>
            </ol>
          </div>
          <ExampleBlock>
            Solve: <M>10 + (3 - 1)^2 \times 5</M>
            <br />
            1. <strong>P</strong>arentheses: <M>3 - 1 = 2</M>
            <br />
            Expression becomes: <M>10 + 2^2 \times 5</M>
            <br />
            2. <strong>E</strong>xponents: <M>2^2 = 4</M>
            <br />
            Expression becomes: <M>10 + 4 \times 5</M>
            <br />
            3. <strong>M</strong>ultiplication: <M>4 \times 5 = 20</M>
            <br />
            Expression becomes: <M>10 + 20</M>
            <br />
            4. <strong>A</strong>ddition: <M>10 + 20 = 30</M>
            <br />
            Final Answer: <strong>30</strong>
          </ExampleBlock>
        </CollapsibleTopic>
        {/* --- 4. ABSOLUTE VALUE --- */}
        <CollapsibleTopic title="4. Absolute Value" icon={Pause}>
          <ContentP>
            The <strong>Absolute Value</strong> of a number is its distance
            from zero on the number line. Distance is always positive, so the
            absolute value is always positive (or zero). We use two vertical
            bars <M>| |</M> to denote it.
          </ContentP>
          <ExampleBlock>
            <p><M>|5| = 5</M> (5 is 5 units away from 0)</p>
            <p><M>|-5| = 5</M> (-5 is also 5 units away from 0)</p>
            <p><M>|0| = 0</M></p>
          </ExampleBlock>
        </CollapsibleTopic>
        {/* --- 5. FACTORS AND MULTIPLES --- */}
        <CollapsibleTopic title="5. Factors and Multiples" icon={SquareX}>
          <ContentP>
            These concepts are key to understanding fractions, division, and
            prime numbers.
          </ContentP>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TermDefinition term="Factor">
              Numbers that are multiplied together to get a product.{" "}
              <strong>Example:</strong> The factors of 12 are 1, 2, 3, 4, 6,
              and 12.
            </TermDefinition>
            <TermDefinition term="Multiple">
              The result of multiplying a number by an integer.{" "}
              <strong>Example:</strong> Multiples of 3 are 3, 6, 9, 12...
            </TermDefinition>
            <TermDefinition term="Greatest Common Factor (GCF)">
              The largest factor that two or more numbers share.{" "}
              <strong>Example:</strong> The GCF of 12 and 18 is 6.
            </TermDefinition>
            <TermDefinition term="Least Common Multiple (LCM)">
              The smallest multiple that two or more numbers share.{" "}
              <strong>Example:</strong> The LCM of 4 and 6 is 12.
            </TermDefinition>
          </div>
        </CollapsibleTopic>
        {/* --- 6. INTEGERS AND RATIONALS --- */}
        <CollapsibleTopic title="6. Integers and Rationals" icon={Plus}>
          <ContentP>
            This topic covers the rules for performing operations
            (add, subtract, multiply, divide) with negative numbers and
            fractions.
          </ContentP>
          <ContentSubhead title="Operations with Integers (Negatives)" />
          <ExampleBlock>
            <p><strong>Adding:</strong> <M>5 + (-2) = 5 - 2 = 3</M></p>
            <p><strong>Subtracting:</strong> <M>5 - (-2) = 5 + 2 = 7</M></p>
            <p><strong>Multiplying:</strong> <M>(-5) \times 2 = -10</M></p>
            <p><strong>Multiplying Negatives:</strong> <M>(-5) \times (-2) = 10</M></p>
            <p><strong>Dividing:</strong> <M>(-10) \div 2 = -5</M></p>
          </ExampleBlock>
          <ContentSubhead title="Operations with Rationals (Fractions)" />
          <ExampleBlock>
            <p><strong>Adding (Common Denominator):</strong> <M>{"\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}"}</M></p>
            <p><strong>Adding (Different Denominators):</strong> <M>{"\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}"}</M></p>
            <p><strong>Multiplying:</strong> <M>{"\\frac{1}{2} \\times \\frac{3}{4} = \\frac{1 \times 3}{2 \times 4} = \\frac{3}{8}"}</M></p>
            <p><strong>Dividing (Keep, Change, Flip):</strong> <M>{"\\frac{1}{2} \div \\frac{3}{4} = \\frac{1}{2} \times \\frac{4}{3} = \\frac{4}{6} = \\frac{2}{3}"}</M></p>
          </ExampleBlock>
        </CollapsibleTopic>
        {/* --- 7. PERCENTAGES, RATIOS, & RATES --- */}
        <CollapsibleTopic title="7. Percentages, Ratios, & Rates" icon={Percent}>
          <ContentP>
            These are all ways of comparing numbers.
          </ContentP>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TermDefinition term="Ratio">
              A comparison of two quantities. <strong>Example:</strong> The
              ratio of 3 apples to 4 oranges is <M>3:4</M> or <M>{"\\frac{3}{4}"}</M>.
            </TermDefinition>
            <TermDefinition term="Rate">
              A ratio that compares two quantities with different units.
              <strong>Example:</strong> 60 miles per 2 hours = 30 mph.
            </TermDefinition>
            <TermDefinition term="Percentage">
              A ratio where the second number is always 100. "Per cent" means
              "per hundred." <strong>Example:</strong> <M>{"75\\% = \\frac{75}{100} = 0.75"}</M>
            </TermDefinition>
          </div>
         </CollapsibleTopic>
        {/* --- 8. FRACTIONS AND DECIMALS --- */}
        <CollapsibleTopic title="8. Fractions and Decimals" icon={SquareDivide}>
          <ContentP>
            Fractions and decimals are two different ways to represent the same
            rational numbers (parts of a whole).
          </ContentP>
          <ExampleBlock>
            <p><strong>Fraction to Decimal:</strong> Divide the numerator by the denominator.</p>
            <p><M>{"\\frac{3}{4} = 3 \div 4 = 0.75"}</M></p>
            <p className="mt-2"><strong>Decimal to Fraction:</strong> Use the place value as the denominator.</p>
            <p><M>{"0.75 = \\frac{75}{100} = \\frac{3}{4}"}</M> (after simplifying)</p>
            <p><M>{"0.5 = \\frac{5}{10} = \\frac{1}{2}"}</M></p>
          </ExampleBlock>
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