"use client";
import LessonLayout from "@/components/LessonLayout";
import LessonHeader from "@/components/LessonHeader";
import {
  LessonVideo,
  PracticeProblem,
  ResourceLink,
  BalanceApplet, // 👈 Our new scale applet
  StepByStepSolution,
} from "@/components/LessonBlocks";

// Import all the icons we'll use
import {
  Scale,
  Goal,
  Gem,
  CheckSquare,
  BookOpen,
  Key,
  AlertTriangle,
  RotateCcw,
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
        <li>
          An <strong>equation</strong> is a statement that two expressions are
          equal (e.g., <code>x + 3 = 5</code>).
        </li>
        <li>
          The <strong>Golden Rule:</strong> Whatever you do to one side of the
          equation, you MUST do to the other side.
        </li>
        <li>
          <strong>Inverse Operations</strong> are opposites that "undo" each other.
          Addition undoes subtraction; multiplication undoes division.
        </li>
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
          Forgetting to perform the same operation on <strong>both</strong> sides.
        </li>
        <li>
          Adding when you should subtract, or vice-versa. Always use the
          <strong>inverse</strong> operation!
        </li>
      </ul>
    </div>
  </>
);

// 2. The Page Component
export default function EquationsPage() {
  return (
    <LessonLayout
      title="Solving Equations"
      subtitle="Learn the 'Golden Rule' of algebra to find the unknown value of 'x' and solve the puzzle."
      aside={lessonAside} // 👈 Pass our custom aside
    >
      <LessonHeader icon={Scale} title="What is an Equation?" />
      <p>
        An <strong>equation</strong> is a mathematical "sentence" that states
        two expressions are equal. It's like a perfectly balanced scale.
      </p>
      <p>
        While an <strong>expression</strong> is just a phrase (like{" "}
        <code>x + 3</code>), an <strong>equation</strong> is a complete
        statement that can be "solved" (like <code>x + 3 = 5</code>).
      </p>

      <LessonHeader icon={Goal} title="The Goal: Isolate the Variable" />
      <p>
        When we "solve" an equation, our goal is to find the one value for the
        variable that makes the equation true. To do this, we need to get the
        variable (like <code>x</code>) all by itself on one side of the equals
        sign.
      </p>
      <p>
        This is called <strong>isolating the variable</strong>.
      </p>

      <LessonHeader icon={Gem} title="The Golden Rule of Algebra" />
      <p className="!text-xl !font-semibold !leading-relaxed text-amber-200/90">
        "Whatever you do to one side of an equation, you MUST do to the
        other side."
      </p>
      <p>
        If you add 2 to the left side, you must add 2 to the right side. If
        you divide the left side by 5, you must divide the right side by 5.
        This keeps the equation "balanced."
      </p>
      <p>
        Try it yourself. This applet shows the equation{" "}
        <code>x + 3 = 5</code>. Your goal is to get <code>x</code> by itself.
        See what happens when you add or remove blocks from both sides.
      </p>
      <BalanceApplet />

      <LessonHeader
        icon={RotateCcw}
        title="Inverse Operations: The Key to Solving"
      />
      <p>
        So how do we get <code>x</code> by itself? We use{" "}
        <strong>inverse operations</strong> to "undo" the numbers around it.
      </p>
      <ul>
        <li>
          Addition (<code>+</code>) and Subtraction (<code>-</code>) are
          inverses.
        </li>
        <li>
          Multiplication (<code>×</code>) and Division (<code>÷</code>) are
          inverses.
        </li>
      </ul>
      <p>
        To solve <code>x + 5 = 12</code>, we need to "undo" the{" "}
        <code>+ 5</code>. The inverse of adding 5 is...{" "}
        <strong>subtracting 5</strong>.
      </p>
      <StepByStepSolution
        title="Example: Solve x + 5 = 12"
        steps={[
          "Original equation: x + 5 = 12",
          "Goal: Get 'x' by itself.",
          "Undo the '+ 5' by subtracting 5.",
          "Apply the Golden Rule (subtract 5 from BOTH sides):",
          "x + 5 - 5 = 12 - 5",
          "Simplify both sides: x + 0 = 7",
          "Solution: x = 7",
        ]}
      />
      <StepByStepSolution
        title="Example: Solve y - 3 = 10"
        steps={[
          "Original equation: y - 3 = 10",
          "Goal: Get 'y' by itself.",
          "Undo the '- 3' by adding 3.",
          "Apply the Golden Rule (add 3 to BOTH sides):",
          "y - 3 + 3 = 10 + 3",
          "Simplify both sides: y + 0 = 13",
          "Solution: y = 13",
        ]}
      />
      <p>
        This video from Math Antics gives a great visual for solving one-step
        equations.
      </p>
      <LessonVideo url="https://www.youtube.com/embed/LhX5blpa_E8" />

      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      <PracticeProblem
        question="What is the inverse operation of multiplication?"
        solution="Division."
      />
      <PracticeProblem
        question="Solve for the variable: a + 4 = 14"
        solution="a = 10 (Subtract 4 from both sides: 14 - 4 = 10)"
      />
      <PracticeProblem
        question="Solve for the variable: b - 7 = 2"
        solution="b = 9 (Add 7 to both sides: 2 + 7 = 9)"
      />

      <LessonHeader icon={BookOpen} title="Further Learning" />
      <ResourceLink
        title="Khan Academy: One-Step Equations"
        url="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities/x2f8bb11595b61c86:introduction-to-equations/v/equations-intro"
      />
      <ResourceLink
        title="IXL: Practice One-Step Equations"
        url="https://www.ixl.com/math/algebra-1/solve-one-step-linear-equations"
      />
    </LessonLayout>
  );
}