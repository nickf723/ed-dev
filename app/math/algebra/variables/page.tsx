"use client";
import LessonLayout from "@/components/LessonLayout";
import {
  LessonImage,
  LessonVideo,
  LessonApplet,
  PracticeProblem,
  ResourceLink,
} from "@/components/LessonBlocks";

// 1. Create the page-specific aside content
const quickFacts = (
  <div className="glass rounded-lg border border-neutral-800 p-4">
    <h3 className="mb-2 font-semibold text-cyan-300">Quick Facts 💡</h3>
    <ul className="list-disc space-y-2 pl-4 text-sm text-neutral-400">
      <li>Variables can change value.</li>
      <li>They make equations flexible.</li>
      <li>Usually represented by letters.</li>
      <li>Examples: x, y, r, n, t</li>
    </ul>
  </div>
);

export default function VariablesPage() {
  return (
    // 2. Pass the `quickFacts` to the `aside` prop
    <LessonLayout
      title="Variables"
      subtitle="Variables are the building blocks of algebra — symbols that allow us to generalize, reason abstractly, and express mathematical relationships."
      aside={quickFacts}
    >
      {/* 3. START of the content. 
        No more <section> tags! Just write like a document.
      */}
      <h2>Definition</h2>
      <p>
        A <strong>variable</strong> is a letter or symbol that represents a
        number or quantity that can change. Variables are essential for
        describing patterns, relationships, and equations in mathematics.
      </p>

      <LessonImage
        src="/images/variable-symbols.png" // Note: This image path is assumed.
        caption="Common variable symbols such as x, y, z, n, and t."
      />

      <h2>Using Variables</h2>
      <p>
        When we write <code>x + 5 = 8</code>, the variable <code>x</code>{" "}
        represents an unknown number. Solving the equation means finding the
        specific value for <code>x</code> that makes the statement true (in this
        case, <code>x = 3</code>).
      </p>
      <p>
        Variables also appear in formulas, where they show a relationship
        between quantities. For example, in the formula for the area of a circle,{" "}
        <code>A = πr²</code>, the variables <code>A</code> (Area) and{" "}
        <code>r</code> (radius) can change. The area *depends* on the value of
        the radius.
      </p>

      <h2>Understanding Variables Visually</h2>
      <p>
        This video explains the concept of a variable and how it's used in simple
        algebraic expressions.
      </p>
      <LessonVideo url="https://www.youtube.com/embed/HEfHFsfGXjs" />

      <h2>Interactive Exploration</h2>
      <p>
        Try adjusting the sliders in this Desmos applet. Notice how changing the
        value of a variable like <code>m</code> or <code>b</code> dynamically
        changes the graph of the line <code>y = mx + b</code>.
      </p>
      <LessonApplet src="https://www.desmos.com/calculator" />

      <h2>Practice Problems</h2>
      <PracticeProblem
        question="1️⃣ Solve for x: x + 7 = 10"
        solution="x = 3"
      />
      <PracticeProblem
        question="2️⃣ If A = πr² and r = 4, find A."
        solution="A = 16π"
      />
      <PracticeProblem question="3️⃣ Simplify: 3x + 2x" solution="5x" />
      <PracticeProblem
        question="4️⃣ Write an equation: 'A number increased by 6 equals 10.'"
        solution="x + 6 = 10"
      />

      <h2>Further Reading</h2>
      <ResourceLink
        title="Khan Academy: Variables and Expressions"
        url="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:variables-expressions"
      />
      <ResourceLink
        title="CK-12: Introduction to Variables"
        url="https://www.ck12.org/algebra/introduction-to-variables/"
      />
      {/* --- END of the content --- */}
    </LessonLayout>
  );
}