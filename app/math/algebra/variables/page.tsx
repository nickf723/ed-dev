"use client";
import LessonLayout from "@/components/LessonLayout";
import LessonHeader from "@/components/LessonHeader"; // 👈 Our new icon header
import {
  LessonImage,
  LessonVideo,
  LessonApplet,
  PracticeProblem,
  ResourceLink,
} from "@/components/LessonBlocks";

// Import all the icons we'll use
import {
  Box,
  Variable,
  Puzzle,
  Scale,
  SlidersHorizontal,
  CheckSquare,
  BookOpen,
  Key,
  AlertTriangle,
} from "lucide-react";

// 1. Define the custom sidebar content for this specific lesson
const lessonAside = (
  <>
    {/* Key Concepts */}
    <div className="glass rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-cyan-300">
        <Key className="h-4 w-4" />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        <li>A <strong className="text-neutral-200">variable</strong> is a symbol (like <i>x</i>) for an unknown value.</li>
        <li>An <strong className="text-neutral-200">expression</strong> (like <i>2x + 3</i>) is a math "phrase" with no equals sign.</li>
        <li>An <strong className="text-neutral-200">equation</strong> (like <i>2x + 3 = 7</i>) is a math "sentence" that can be solved.</li>
      </ul>
    </div>

    {/* Common Mistakes */}
    <div className="glass rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-300">
        <AlertTriangle className="h-4 w-4" />
        Common Mistakes
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        <li>
          Mixing up <i>expressions</i> and <i>equations</i>. Remember: equations have an
          <code className="text-xs"> = </code> sign!
        </li>
        <li>
          Forgetting that <code>x</code> is the same as <code>1x</code>. The coefficient is
          1, not 0.
        </li>
      </ul>
    </div>
  </>
);

// 2. The Page Component
export default function VariablesPage() {
  return (
    <LessonLayout
      title="Variables"
      subtitle="The building blocks of algebra. Learn how symbols like 'x' and 'y' unlock the power to describe relationships and solve puzzles."
      aside={lessonAside} // 👈 Pass our custom aside content
    >
      {/* This is now a single, flowing article. 
        The .prose class from LessonLayout will style all the p, ul, table, etc.
      */}

      <LessonHeader icon={Box} title="What is a Variable?" />
      <p>
        In mathematics, a <strong>variable</strong> is a symbol (usually a
        letter like <code>x</code>, <code>y</code>, or <code>t</code>) that
        acts as a placeholder for a number. This number can be:
      </p>
      <ul>
        <li>
          <strong>An unknown quantity:</strong> In the equation{" "}
          <code>x + 5 = 8</code>, the variable <code>x</code> represents a
          specific, unknown number we need to find.
        </li>
        <li>
          <strong>A changing value:</strong> In the formula for the area of a
          circle, <code>A = πr²</code>, the variable <code>r</code> (radius)
          can be any positive number, and the variable <code>A</code> (area)
          will change depending on <code>r</code>.
        </li>
      </ul>
      <p>
        Think of a variable as a labeled, empty box. You can put different
        numbers into the "x" box to see what happens, or you can solve a puzzle
        to find out what number is *already* in the "x" box.
      </p>
      <LessonImage
        src="/images/variable-symbols.png" // Assumes you have this image
        caption="Common variables. The letters chosen are just placeholders."
      />

      <LessonHeader icon={Puzzle} title="The Parts of an Algebraic Term" />
      <p>
        Variables don't usually live alone. They are part of "terms" and
        "expressions." Let's break down a simple example:
      </p>
      <div className="my-6 rounded-lg border border-neutral-700 bg-neutral-900/50 p-6 text-center">
        <span className="text-4xl font-bold tracking-wider">
          <span className="text-amber-400">5</span>
          <span className="text-cyan-400">x</span>{" "}
          <span className="text-fuchsia-400">-</span>{" "}
          <span className="text-green-400">3</span>
        </span>
      </div>
      <p>
        This is an <strong>expression</strong>. Here are its parts:
      </p>
      <div className="prose-table:my-0">
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th>Example</th>
              <th>What It's Called</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>x</code>
              </td>
              <td className="text-cyan-400">x</td>
              <td>
                <strong>Variable:</strong> The symbol representing the unknown value.
              </td>
            </tr>
            <tr>
              <td>
                <code>5</code>
              </td>
              <td className="text-amber-400">5</td>
              <td>
                <strong>Coefficient:</strong> The number <i>multiplying</i> the
                variable. It tells you "how many" of the variable you have.
              </td>
            </tr>
            <tr>
              <td>
                <code>3</code>
              </td>
              <td className="text-green-400">3</td>
              <td>
                <strong>Constant:</strong> A number all by itself. Its value is
                "constant" and never changes.
              </td>
            </tr>
            <tr>
              <td>
                <code>5x</code>
              </td>
              <td>
                <span className="text-amber-400">5</span>
                <span className="text-cyan-400">x</span>
              </td>
              <td>
                <strong>Term:</strong> A single piece of an expression, usually
                separated by <code>+</code> or <code>-</code> signs.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <LessonHeader icon={Scale} title="Expressions vs. Equations" />
      <p>
        This is the most important concept to understand. People often mix them
        up, but the difference is simple:
      </p>
      <ul>
        <li>
          An <strong>Expression</strong> is a mathematical "phrase." It's a
          collection of variables, numbers, and operations.
          <br />
          <strong className="text-neutral-300">Example:</strong>{" "}
          <code>2x + 3</code>
          <br />
          You <strong>simplify</strong> an expression, but you cannot "solve" it.
        </li>
        <li>
          An <strong>Equation</strong> is a mathematical "sentence." It states
          that two expressions are equal. It always has an equals sign (
          <code>=</code>).
          <br />
          <strong className="text-neutral-300">Example:</strong>{" "}
          <code>2x + 3 = 7</code>
          <br />
          You <strong>solve</strong> an equation to find the value of the
          variable.
        </li>
      </ul>
      <LessonVideo url="https://www.youtube.com/embed/HEfHFsfGXjs" />

      <LessonHeader
        icon={SlidersHorizontal}
        title="Interactive: See Variables in Action"
      />
      <p>
        The best way to understand variables is to play with them. In the
        calculator below, the equation for a line is <code>y = mx + b</code>.
      </p>
      <p>
        <code>m</code> and <code>b</code> are variables that you can control.
        Watch what happens to the graph as you change the slider for{" "}
        <code>m</code> (the slope) or <code>b</code> (the y-intercept).
      </p>
      <LessonApplet src="https://www.desmos.com/calculator" />

      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      <PracticeProblem
        question="In the expression 7y - 12, what is the variable?"
        solution="The variable is y."
      />
      <PracticeProblem
        question="In 7y - 12, what is the coefficient?"
        solution="The coefficient is 7."
      />
      <PracticeProblem
        question="In 7y - 12, what is the constant?"
        solution="The constant is 12 (or -12, depending on how you read it)."
      />
      <PracticeProblem
        question="Is 4x + 1 an expression or an equation?"
        solution="It's an expression. It doesn't have an equals sign."
      />
      <PracticeProblem
        question="If x = 3, what is the value of the expression 2x + 5?"
        solution="2(3) + 5 = 6 + 5 = 11"
      />

      <LessonHeader icon={BookOpen} title="Further Learning" />
      <ResourceLink
        title="Khan Academy: Variables and Expressions"
        url="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:variables-expressions"
      />
      <ResourceLink
        title="Desmos Classroom Activities"
        url="https://teacher.desmos.com/"
      />
    </LessonLayout>
  );
}