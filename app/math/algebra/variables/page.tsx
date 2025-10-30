"use client";
import LessonLayout from "@/components/LessonLayout";
import LessonHeader from "@/components/LessonHeader";
import {
  LessonVideo,
  PracticeProblem,
  ResourceLink,
  EvaluateApplet, // 👈 Our new coded applet
  StepByStepSolution, // 👈 Our new step-by-step
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
  Goal,
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
    <div className="glass mt-6 rounded-lg border border-neutral-800 p-4">
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
      subtitle="The fundamental building blocks of algebra. Learn how symbols like 'x' and 'y' unlock the power to describe relationships and solve puzzles."
      aside={lessonAside} // 👈 Pass our custom aside content
    >
      <LessonHeader icon={Box} title="What is a Variable?" />
      <p>
        In mathematics, a <strong>variable</strong> is a symbol (usually a
        letter like <code>x</code>, <code>y</code>, or <code>t</code>) that
        acts as a placeholder for a number. This number can be:
      </p>
      <ul>
        <li>
          <strong>A specific unknown:</strong> In the equation{" "}
          <code>x + 5 = 8</code>, the variable <code>x</code> represents a
          specific, unknown number we need to find (in this case, 3).
        </li>
        <li>
          <strong>A changing quantity:</strong> In the formula for the area of a
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
      <LessonVideo url="https://www.youtube.com/embed/v-6MShC82ow" />

      <LessonHeader icon={Scale} title="Expressions vs. Equations" />
      <p>
        This is one of the most important concepts in algebra. The difference is
        very simple, but critical.
      </p>

      <div className="prose-table:my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-700 bg-neutral-900/40 p-4">
          <h4 className="!mt-0 !mb-2 text-xl font-semibold text-green-300">Expression</h4>
          <p className="!my-0 !text-sm">A mathematical "phrase." It's a collection of variables, numbers, and operations.</p>
          <code className="!mt-2 block text-center text-lg">2x + 3</code>
          <p className="!mt-2 !mb-0 !text-sm">You <strong>simplify</strong> or <strong>evaluate</strong> an expression. You cannot "solve" it.</p>
        </div>
        <div className="rounded-lg border border-neutral-700 bg-neutral-900/40 p-4">
          <h4 className="!mt-0 !mb-2 text-xl font-semibold text-orange-300">Equation</h4>
          <p className="!my-0 !text-sm">A mathematical "sentence." It states that two expressions are equal.</p>
          <code className="!mt-2 block text-center text-lg">2x + 3 = 7</code>
          <p className="!mt-2 !mb-0 !text-sm">You <strong>solve</strong> an equation to find the value of the variable.</p>
        </div>
      </div>
      <p>Here is a great video that explains this core idea in more detail:</p>
      <LessonVideo url="https://www.youtube.com/embed/AS-g-b-8P0M" />

      <LessonHeader icon={Puzzle} title="The Parts of an Expression" />
      <p>
        Let's look closer at that expression, <code>2x + 3</code>. It's built
        from smaller pieces called <strong>terms</strong>.
      </p>
      <div className="my-6 rounded-lg border border-neutral-700 bg-neutral-900/50 p-6 text-center">
        <span className="text-4xl font-bold tracking-wider">
          <span className="text-amber-400">2</span>
          <span className="text-cyan-400">x</span>{" "}
          <span className="text-fuchsia-400">+</span>{" "}
          <span className="text-green-400">3</span>
        </span>
      </div>
      <ul>
        <li>
          <strong>Term:</strong> The parts of an expression separated by{" "}
          <code>+</code> or <code>-</code> signs. This expression has two terms:{" "}
          <code>2x</code> and <code>3</code>.
        </li>
        <li>
          <strong>Coefficient:</strong> The number <i>in front of</i> a variable. In
          the term <code>2x</code>, the coefficient is <code>2</code>. It means "2
          times x".
        </li>
        <li>
          <strong>Constant:</strong> A number all by itself. In this
          expression, <code>3</code> is the constant. Its value never changes.
        </li>
      </ul>

      <LessonHeader
        icon={SlidersHorizontal}
        title="Interactive: Evaluating Expressions"
      />
      <p>
        To "evaluate" an expression means to find its value once you know the
        value of the variable. You simply substitute—or "plug in"—the number
        for the letter.
      </p>

      {/* 👇 Use our new StepByStep component 👇 */}
      <StepByStepSolution
        title="Example: Evaluate 2x + 5 when x = 3"
        steps={[
          "Write the original expression: 2x + 5",
          "Substitute '3' for 'x': 2(3) + 5",
          "Multiply 2 and 3: 6 + 5",
          "Add 6 and 5: 11",
          "The final value is 11.",
        ]}
      />

      <p>
        Try it yourself! Use the slider in this applet to change the value of{" "}
        <code>x</code> and see how the expression <code>3x - 5</code> is
        evaluated.
      </p>
      
      {/* 👇 Use our new coded applet 👇 */}
      <EvaluateApplet 
        expression="3x - 5" 
        fn={(x) => 3 * x - 5} 
      />

      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      {/* 👇 Use the new PracticeProblem component 👇 */}
      <PracticeProblem
        question="In the expression 8a - 1, what is the variable?"
        solution="The variable is a."
      />
      <PracticeProblem
        question="In 8a - 1, what is the coefficient?"
        solution="The coefficient is 8."
      />
      <PracticeProblem
        question="In 8a - 1, what is the constant?"
        solution="The constant is 1 (or -1)."
      />
      <PracticeProblem
        question="Is 5y - 2 = 13 an expression or an equation?"
        solution="It's an equation because it has an equals sign."
      />
      <PracticeProblem
        question="Evaluate the expression 10 - 3z when z = 2."
        solution="10 - 3(2) = 10 - 6 = 4"
      />

      <LessonHeader icon={BookOpen} title="Further Learning" />
      <ResourceLink
        title="Khan Academy: Intro to Variables"
        url="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:intro-to-variables/x2f8bb11595b61c86:why-variables/v/variables-intro"
      />
      <ResourceLink
        title="IXL: Practice Evaluating Expressions"
        url="https://www.ixl.com/math/algebra-1/evaluate-variable-expressions"
      />
    </LessonLayout>
  );
}