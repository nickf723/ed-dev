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
  ExampleBlock,
  ContentTabs,
  TabItem,
  InternalLink,
  LessonImage, // Added from previous step
} from "@/components/LessonBlocks";
import {
  Plus,
  SquareDivide,
  Percent,
  Calculator,
  ChevronRight,
  Pause,
  SquareX,
  Shuffle,
  ArrowRightLeft,
  Parentheses,
  Sigma,
  Spline,
  Waypoints,
  Grid3X3,
  Puzzle,
  Lightbulb,
  BookCopy,
  Check,
  X as XIcon,
  Key,
  Link as LinkIcon,
  AlertTriangle,
} from "@/components/icons";
import React, { useState, useEffect } from "react";
import { MBlock, M } from "@/components/Math";
import Link from "next/link";
import GlossaryTerm from "@/components/GlossaryTerm"

// Symbols for the background
const numOpsSymbols = [
  "1", "2", "3", "π", "√2", "-5", "0.5", "1/3", "i", "+", "-", "×", "÷", "=", "%", "±",
  "ℕ", "ℤ", "ℚ", "ℝ", "ℂ",
];

// Tabs content for Algebraic Properties
const propertyTabs: TabItem[] = [
  {
    title: "Commutative",
    icon: ArrowRightLeft,
    content: (
      <>
        <ContentP>
          The <GlossaryTerm term="Commutative Property">Commutative Property</GlossaryTerm> states that the order of
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
          <ContentP>This property does NOT apply to subtraction or division. <M>5 - 2 \neq 2 - 5</M>.</ContentP>
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
          The <GlossaryTerm term="Associative Property">Associative Property</GlossaryTerm> states that the grouping of
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
          The <GlossaryTerm term="Identity Property">Identity Property</GlossaryTerm> involves a number that, when
          used in an operation, leaves the other number unchanged (it keeps its
          identity).
        </ContentP>
        <ExampleBlock>
          <p>
            <strong><GlossaryTerm term="Additive Identity">Additive Identity</GlossaryTerm>:</strong> The identity is <strong>0</strong>.
          </p>
          <p>
            <M>a + 0 = a</M> (e.g., <M>9 + 0 = 9</M>)
          </p>
          <p className="mt-2">
            <strong><GlossaryTerm term="Multiplicative Identity">Multiplicative Identity</GlossaryTerm>:</strong> The identity is <strong>1</strong>.
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
          The <GlossaryTerm term="Inverse Property">Inverse Property</GlossaryTerm> involves finding a number that
          "cancels out" another number, returning you to the identity (<M>0</M> for
          addition, <M>1</M> for multiplication).
        </ContentP>
        <ExampleBlock>
          <p>
            <strong><GlossaryTerm term="Additive Inverse">Additive Inverse (Opposite)</GlossaryTerm>:</strong>
          </p>
          <p>
            <M>a + (-a) = 0</M> (e.g., <M>5 + (-5) = 0</M>)
          </p>
          <p className="mt-2">
            <strong><GlossaryTerm term="Multiplicative Inverse">Multiplicative Inverse (Reciprocal)</GlossaryTerm>:</strong>
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
          The <GlossaryTerm term="Distributive Property">Distributive Property</GlossaryTerm> is the one property that
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
          <ContentP>This is the key to expanding expressions like <M>3(x + 4) = 3x + 12</M>.</ContentP>
        </SideNote>
      </>
    ),
  },
];

const problemTabs: TabItem[] = [
  {
    title: "Problem 1",
    icon: XIcon,
    content: (
      <>
        <ContentP>
          <strong>Problem:</strong> <M>x + 5 = 2</M>
        </ContentP>
        <ExampleBlock>
          <p>
            <strong>System:</strong> <GlossaryTerm term="Whole Numbers">Whole Numbers (𝕎)</GlossaryTerm>
          </p>
          <p>
            <strong>Result:</strong> <span className="text-red-400">Impossible.</span> There is no
            whole number you can add to 5 to get 2.
          </p>
        </ExampleBlock>
      </>
    ),
  },
  {
    title: "Solution 1",
    icon: Check,
    content: (
      <>
        <ContentP>
          <strong>Solution:</strong> Invent <GlossaryTerm term="Integers">Integers (ℤ)</GlossaryTerm>
        </ContentP>
        <ExampleBlock>
          <p>
            By introducing negative numbers, we create a new system where this
            problem is solvable.
          </p>
          <p>
            <strong>Answer:</strong> <M>x = -3</M>
          </p>
        </ExampleBlock>
      </>
    ),
  },
  {
    title: "Problem 2",
    icon: XIcon,
    content: (
      <>
        <ContentP>
          <strong>Problem:</strong> <M>x^2 = 2</M>
        </ContentP>
        <ExampleBlock>
          <p>
            <strong>System:</strong> <GlossaryTerm term="Rational Numbers">Rational Numbers (ℚ)</GlossaryTerm>
          </p>
          <p>
            <strong>Result:</strong> <span className="text-red-400">Impossible.</span> There is no
            fraction that, when multiplied by itself, equals 2.
          </p>
        </ExampleBlock>
      </>
    ),
  },
  {
    title: "Solution 2",
    icon: Check,
    content: (
      <>
        <ContentP>
          <strong>Solution:</strong> Discover <GlossaryTerm term="Irrational Numbers">Irrational Numbers (𝕀)</GlossaryTerm>
        </ContentP>
        <ExampleBlock>
          <p>
            By acknowledging numbers with non-repeating decimals, we can solve
            this.
          </p>
          <p>
            <strong>Answer:</strong> <M>x = \sqrt2</M>
          </p>
        </ExampleBlock>
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
      
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 text-left">
          
          <CollapsibleTopic title="1. Number Systems" icon={Waypoints} startOpen={true}>
            <ContentP>
              In algebra, we don't just work with "numbers"; we work with
              different <GlossaryTerm term="Number System">systems of numbers</GlossaryTerm>. Each system is like a
              set of Russian nesting dolls—smaller, simpler systems are contained
              within larger, more complex ones.
            </ContentP>
            <ContentP>
              Knowing which system you're working in is crucial because it defines
              the "rules" and tells you what kind of answers are possible.
            </ContentP>

            <ContentSubhead title="The Hierarchy" />
            <ul className="list-disc space-y-2 pl-6 text-neutral-300">
              <li><strong><GlossaryTerm term="Natural Numbers">Natural Numbers (ℕ)</GlossaryTerm></strong> (Counting numbers: 1, 2, 3...)</li>
              <li>...are contained within <strong><GlossaryTerm term="Whole Numbers">Whole Numbers (𝕎)</GlossaryTerm></strong> (Natural numbers + 0)</li>
              <li>...which are contained within <strong><GlossaryTerm term="Integers">Integers (ℤ)</GlossaryTerm></strong> (Whole numbers + negatives)</li>
              <li>...which are contained within <strong><GlossaryTerm term="Rational Numbers">Rational Numbers (ℚ)</GlossaryTerm></strong> (Integers + fractions)</li>
            </ul>
            <LessonImage
              src="/images/number-systems-hierarchy.jpg"
              caption="A visual representation of the hierarchy of number systems."
            />
            <ContentP>
              Separately, you have <strong><GlossaryTerm term="Irrational Numbers">Irrational Numbers (𝕀)</GlossaryTerm></strong> (like <M>\pi</M>, <M>\sqrt2</M>), which cannot be written as simple fractions.
            </ContentP>
            <ContentP>
              Together, <strong>Rational</strong> and <strong>Irrational</strong> numbers make up the <strong><GlossaryTerm term="Real Numbers">Real Numbers (ℝ)</GlossaryTerm></strong>.
            </ContentP>
            <ContentP>
              Finally, all <strong>Real Numbers</strong> are part of the <strong><GlossaryTerm term="Complex Numbers">Complex Numbers (ℂ)</GlossaryTerm></strong> (which include imaginary numbers).
            </ContentP>

            <div className="ml-4 border-l border-neutral-800 pl-4">
              <CollapsibleTopic title="1.1 The Core Systems" icon={Grid3X3}>
                <ContentP>
                  The <GlossaryTerm term="Real Numbers">Real Numbers (ℝ)</GlossaryTerm> are all the numbers you can
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
                    Any number that can be written as a <GlossaryTerm term="Ratio">ratio</GlossaryTerm> (a
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
                <ContentSubhead title="Test Your Knowledge" />
                  <ContentP>
                    Use this classifier to see how the numbers you just learned about
                    fit into the hierarchy.
                  </ContentP>
                  <NumberClassifierApplet />
              </CollapsibleTopic>

              <CollapsibleTopic title="1.2 Interactive Classifiers" icon={Puzzle}>
                <ContentP>
                  Now that you've seen the categories, test your understanding of
                  the hierarchy. Remember, a number can belong to multiple sets!
                </ContentP>
                <NumberSorterApplet />
              </CollapsibleTopic>

              <CollapsibleTopic title="1.3 Why Classification Matters" icon={Lightbulb}>
                <ContentP>
                  Why do we need so many different sets? Because they tell us what
                  kind of solutions to expect. The rules of one system don't
                  always apply to another.
                </ContentP>
                <ExampleBlock>
                  <p>Consider the equation <M>2x = 5</M>.</p>
                  <ul className="mt-2 list-disc pl-5">
                    <li>
                      If you are asked to "find the <strong><GlossaryTerm term="Integers">integer</GlossaryTerm></strong> solution,"
                      the answer is: <strong>None</strong>. There is no integer <M>x</M>
                      that makes this true.
                    </li>
                    <li>
                      If you are asked to "find the <strong><GlossaryTerm term="Rational Numbers">rational</GlossaryTerm></strong> solution,"
                      the answer is: <M>x = 5/2</M> (or <M>2.5</M>).
                    </li>
                  </ul>
                </ExampleBlock>
                <SideNote>
                  <ContentP>
                    Historically, the discovery of new number systems solved problems
                    that were once thought impossible.
                  </ContentP>
                </SideNote>
                <ContentTabs items={problemTabs} />
              </CollapsibleTopic>

              <CollapsibleTopic title="1.4 Beyond the Real Line" icon={Sigma}>
                <ContentP>
                  There is one more step. What about an equation like
                  <M>x^2 = -1</M>? No "real" number can be squared to get a
                  negative. To solve this, mathematicians invented a new system.
                </ContentP>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TermDefinition term="Imaginary Unit (i)">
                    The number defined as <M>i = \sqrt-1</M>. It has the
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
                  <ContentP>
                    <strong><GlossaryTerm term="Complex Numbers">Complex Numbers</GlossaryTerm></strong> are not just a mathematical curiosity!
                    They are essential in advanced engineering, quantum mechanics, and
                    electrical signal processing.
                  </ContentP>
                </SideNote>
              </CollapsibleTopic>
            </div>
          </CollapsibleTopic>

          <CollapsibleTopic title="2. Algebraic Properties" icon={Shuffle}>
            <ContentP>
              Algebraic properties are the fundamental rules that govern how we
              manipulate numbers and variables. They are the "rules of the road"
              that ensure our calculations are consistent and correct.
            </ContentP>
            <ContentTabs items={propertyTabs} />
          </CollapsibleTopic>
          
          <CollapsibleTopic title="3. Order of Operations" icon={Calculator}>
            <ContentP>
              The <strong><GlossaryTerm term="Order of Operations">Order of Operations</GlossaryTerm></strong> is a rule that tells us
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
              <p>Solve: <M>10 + (3 - 1)^2 \times 5</M></p>
              <p>1. <strong>P</strong>arentheses: <M>3 - 1 = 2</M></p>
              <p>Expression becomes: <M>10 + 2^2 \times 5</M></p>
              <p>2. <strong>E</strong>xponents: <M>2^2 = 4</M></p>
              <p>Expression becomes: <M>10 + 4 \times 5</M></p>
              <p>3. <strong>M</strong>ultiplication: <M>4 \times 5 = 20</M></p>
              <p>Expression becomes: <M>10 + 20</M></p>
              <p>4. <strong>A</strong>ddition: <M>10 + 20 = 30</M></p>
              <p>Final Answer: <strong>30</strong></p>
            </ExampleBlock>
          </CollapsibleTopic>
          
          <CollapsibleTopic title="4. Absolute Value" icon={Pause}>
            <ContentP>
              The <strong><GlossaryTerm term="Absolute Value">Absolute Value</GlossaryTerm></strong> of a number is its distance
              from zero on the number line. Distance is always positive, so the
              absolute value is always positive (or zero). We use two vertical
              bars <M>| |</M> to denote it.
            </ContentP>
            <LessonImage
              src="/images/absolute-value.png"
              caption="Both 5 and -5 are the same distance (5 units) from 0 on the number line."
              bgColor="white"
            />
            <ExampleBlock>
              <p><M>|5| = 5</M> (5 is 5 units away from 0)</p>
              <p><M>|-5| = 5</M> (-5 is also 5 units away from 0)</p>
              <p><M>|0| = 0</M></p>
            </ExampleBlock>
          </CollapsibleTopic>
          
          <CollapsibleTopic title="5. Factors and Multiples" icon={SquareX}>
            <ContentP>
              These concepts are key to understanding fractions, division, and
              prime numbers.
            </ContentP>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TermDefinition term="Factor">
                Numbers that are multiplied together to get a product.{" "}
                <strong>Example:</strong> The <GlossaryTerm term="Factor">factors</GlossaryTerm> of 12 are 1, 2, 3, 4, 6,
                and 12.
              </TermDefinition>
              <TermDefinition term="Multiple">
                The result of multiplying a number by an integer.{" "}
                <strong>Example:</strong> <GlossaryTerm term="Multiple">Multiples</GlossaryTerm> of 3 are 3, 6, 9, 12...
              </TermDefinition>
              <TermDefinition term="Greatest Common Factor (GCF)">
                The largest <GlossaryTerm term="Factor">factor</GlossaryTerm> that two or more numbers share.{" "}
                <strong>Example:</strong> The <GlossaryTerm term="Greatest Common Factor">GCF</GlossaryTerm> of 12 and 18 is 6.
              </TermDefinition>
              <TermDefinition term="Least Common Multiple (LCM)">
                The smallest <GlossaryTerm term="Multiple">multiple</GlossaryTerm> that two or more numbers share.{" "}
                <strong>Example:</strong> The <GlossaryTerm term="Least Common Multiple">LCM</GlossaryTerm> of 4 and 6 is 12.
              </TermDefinition>
            </div>
          </CollapsibleTopic>
          
          <CollapsibleTopic title="6. Operations with Integers & Rationals" icon={Plus}>
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
          
          <CollapsibleTopic title="7. Percentages, Ratios, & Rates" icon={Percent}>
            <ContentP>
              These are all ways of comparing numbers.
            </ContentP>
            <ul className="space-y-4">
              <li>
                <TermDefinition term="Ratio">
                  A comparison of two quantities. <strong>Example:</strong> The
                  <GlossaryTerm term="Ratio">ratio</GlossaryTerm> of 3 apples to 4 oranges is <M>3:4</M> or <M>{"\\frac{3}{4}"}</M>.
                </TermDefinition>
              </li>
              <li>
                <TermDefinition term="Rate">
                  A <GlossaryTerm term="Ratio">ratio</GlossaryTerm> that compares two quantities with different units.
                  <strong>Example:</strong> 60 miles per 2 hours = 30 mph.
                </TermDefinition>
              </li>
              <li>
                <TermDefinition term="Percentage">
                  A <GlossaryTerm term="Ratio">ratio</GlossaryTerm> where the second number is always 100. "Per cent" means
                  "per hundred." <strong>Example:</strong> <M>{"75\\% = \\frac{75}{100} = 0.75"}</M>
                </TermDefinition>
              </li>
            </ul>
           </CollapsibleTopic>
          
          <CollapsibleTopic title="8. Fractions and Decimals" icon={SquareDivide}>
            <ContentP>
              Fractions and decimals are two different ways to represent the same
              <GlossaryTerm term="Rational Numbers">rational numbers</GlossaryTerm> (parts of a whole).
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

// --- NEW HELPER COMPONENT: Key Concepts Aside ---
function KeyConceptsAside() {
  return (
    <div className="glass rounded-2xl border border-cyan-800/40 bg-cyan-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-cyan-300">
        <Key size={18} />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          <strong><GlossaryTerm term="Number System">Number Systems</GlossaryTerm>:</strong> Numbers are classified in a hierarchy (e.g., Natural ⊂ Integers ⊂ Rationals ⊂ Reals).
        </li>
        <li>
          <strong>Properties:</strong> The rules that govern operations, like the <GlossaryTerm term="Commutative Property">Commutative</GlossaryTerm>, <GlossaryTerm term="Associative Property">Associative</GlossaryTerm>, and <GlossaryTerm term="Distributive Property">Distributive</GlossaryTerm> properties.
        </li>
        <li>
          <strong><GlossaryTerm term="Order of Operations">PEMDAS</GlossaryTerm>:</strong> The order of operations (Parentheses, Exponents, Multiply/Divide, Add/Subtract) is crucial for correct answers.
        </li>
        <li>
          <strong>Rationals vs. Irrationals:</strong> A <GlossaryTerm term="Rational Numbers">Rational</GlossaryTerm> number can be a fraction (like <M>1/2</M> or <M>7</M>); an <GlossaryTerm term="Irrational Numbers">Irrational</GlossaryTerm> number cannot (like <M>\pi</M>).
        </li>
      </ul>
    </div>
  );
}

// --- NEW HELPER COMPONENT: Common Pitfalls Aside ---
function CommonPitfallsAside() {
  return (
    <div className="glass rounded-2xl border border-amber-800/40 bg-amber-900/20 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
        <AlertTriangle size={18} />
        Common Pitfalls
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
        <li>
          <strong><GlossaryTerm term="Order of Operations">PEMDAS</GlossaryTerm> errors:</strong> Forgetting to do Multiplication/Division *before* Addition/Subtraction.
        </li>
        <li>
          <strong><GlossaryTerm term="Distributive Property">Distributive Property</GlossaryTerm>:</strong> Forgetting to multiply the factor by *every* term inside the parentheses. E.g., <M>3(x+2)</M> becomes <M>3x+6</M>, not <M>3x+2</M>.
        </li>
        <li>
          <strong>Dividing by Zero:</strong> This operation is undefined. Be careful with fractions where the denominator could become zero.
        </li>
        <li>
          <strong>Negative Signs:</strong> Losing track of negative signs during subtraction or multiplication (e.g., <M>5 - (-2) = 7</M>, not 3).
        </li>
      </ul>
    </div>
  );
}

// --- NEW HELPER COMPONENT: Related Topics Aside ---
function RelatedTopicsAside() {
  return (
    <div className="glass rounded-2xl border border-neutral-800/60 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-100">
        <BookCopy size={18} />
        Related Topics
      </h3>
      <ul className="space-y-3">
        <AsideLink
          href="/formal-science/mathematics/algebra/elementary-algebra/foundations/variables-expressions"
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

// --- NEW HELPER COMPONENT: Aside Link ---
function AsideLink({ href, title, description }: { href: string; title: string; description: string }) {
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
        <span className={`font-semibold ${isPlanned ? "text-neutral-400" : "text-cyan-300 group-hover:underline"}`}>
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


// --- HELPER COMPONENTS (NumberClassifierApplet, NumberSorterApplet) ---
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
    // Updated to recognize complex numbers
    if (str.includes("i")) {
       setResults(["Complex", "Imaginary"]);
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

    let types: string[] = ["Real", "Complex"]; // All Reals are also Complex

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
          placeholder="Enter a number (e.g., -5, 0, 3.5, 1/2, pi, 3+2i)"
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
const numbersToClassify = [
  { num: "7", types: ["Natural", "Whole", "Integer", "Rational", "Real", ] },
  { num: "0", types: ["Whole", "Integer", "Rational", "Real", ] },
  { num: "-4", types: ["Integer", "Rational", "Real", ] },
  { num: "1/2", types: ["Rational", "Real", ] },
  { num: "√2", types: ["Irrational", "Real", ] },
  { num: "-1.5", types: ["Rational", "Real", ] },
  { num: "3i", types: ["Imaginary", "Complex"] },
  { num: "3 + 2i", types: ["Complex"] },
  { num: "5i", types: ["Imaginary", "Complex"] },
];
const allTypes = [
  "Natural",
  "Whole",
  "Integer",
  "Rational",
  "Irrational",
  "Real",
  "Imaginary",
  "Complex",
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