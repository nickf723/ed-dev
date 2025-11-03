"use client";
import LessonLayout from "@/components/LessonLayout";
import LessonHeader from "@/components/LessonHeader";
import {
  PracticeProblem,
  ResourceLink,
  StepByStepSolution,
} from "@/components/LessonBlocks";

// 1. Import all our new components
import {
  BalanceApplet, // 👈 Now imported from here
  EquationComponentFlipCards,
  OneStepSolverWidget,
  CheckSolutionWidget,
  WordProblemConverter,
  BalanceQuiz,
} from "./EquationComponents";

// 2. Import icons for the "Balance & Justice" theme
import {
  Scale,
  Goal,
  Gem,
  CheckSquare,
  BookOpen,
  Key,
  AlertTriangle,
  RotateCcw,
  BookText,
  GanttChartSquare,
  Network,
  HelpCircle,
  Link,
} from "lucide-react";

// 3. Define the new sidebar content
const lessonAside = (
  <>
    {/* Key Concepts */}
    <div className="glass rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-yellow-400">
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
          <strong>Inverse Operations</strong> are opposites that "undo" each
          other.
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
          Forgetting to perform the same operation on <strong>both</strong>{" "}
          sides.
        </li>
        <li>
          Adding when you should subtract, or vice-versa. Always use the
          <strong>inverse</strong> operation!
        </li>
      </ul>
    </div>
  </>
);

// 4. The new Page Component, following your 13-point plan
export default function EquationsPage() {
  return (
    <LessonLayout
      title="Equations"
      subtitle="Learn the 'Golden Rule' of algebra to find the unknown value of 'x' and solve the puzzle."
      aside={lessonAside}
      className="theme-equations-justice" // ⚖️ Applied unique theme
    >
      {/* 1. What Is an Equation? */}
      <LessonHeader icon={Scale} title="What Is an Equation?" />
      <p>
        An <strong>equation</strong> is a mathematical "sentence" stating that
        two expressions are exactly the same in value. It's like a perfectly
        balanced scale.
      </p>
      <p>
        If an <strong>expression</strong> is a "phrase" (like <code>x + 3</code>
        ), an <strong>equation</strong> is a full "statement" (like{" "}
        <code>x + 3 = 5</code>).
      </p>
      <BalanceApplet />

      {/* 2. Components of an Equation */}
      <LessonHeader icon={GanttChartSquare} title="Components of an Equation" />
      <p>
        An equation is made of a few key parts, all centered around the equals
        sign.
      </p>
      <EquationComponentFlipCards />

      {/* 3. The Balance Rule */}
      <LessonHeader icon={Gem} title="The Golden Rule of Algebra" />
      <p className="!text-xl !font-semibold !leading-relaxed text-yellow-200/90">
        "Whatever you do to one side of an equation, you MUST do to the
        other side."
      </p>
      <p>
        This is the most important rule for solving equations. If you subtract 2
        from the left side, you must subtract 2 from the right side to keep the
        scale balanced.
      </p>

      {/* 4. Solving One-Step Equations */}
      <LessonHeader icon={RotateCcw} title="Solving One-Step Equations" />
      <p>
        To solve an equation, our goal is to get the variable (like <code>x</code>
        ) all by itself. We use <strong>inverse operations</strong> to "undo"
        the numbers around it.
      </p>
      <StepByStepSolution
        title="Example: Solve x + 4 = 9"
        steps={[
          "Original equation: x + 4 = 9",
          "We want to 'undo' the '+ 4'.",
          "The inverse of adding 4 is subtracting 4.",
          "Subtract 4 from BOTH sides: x + 4 - 4 = 9 - 4",
          "Simplify both sides: x = 5",
          "Solution: x = 5",
        ]}
      />
      <OneStepSolverWidget />

      {/* 5. Two-Step Equations */}
      <LessonHeader icon={RotateCcw} title="Solving Two-Step Equations" />
      <p>
        This is where it gets fun. To isolate the variable, just do the
        opposite of the Order of Operations (PEMDAS).
      </p>
      <p>
        You "undo" the <strong>addition/subtraction first</strong>, then
        undo the <strong>multiplication/division</strong>.
      </p>
      <StepByStepSolution
        title="Example: Solve 2x + 3 = 9"
        steps={[
          "Original equation: 2x + 3 = 9",
          "1. Undo addition: Subtract 3 from BOTH sides.",
          "2x + 3 - 3 = 9 - 3",
          "Simplify: 2x = 6",
          "2. Undo multiplication: Divide BOTH sides by 2.",
          "2x / 2 = 6 / 2",
          "Simplify: x = 3",
          "Solution: x = 3",
        ]}
      />

      {/* 6. Checking Your Solution */}
      <LessonHeader icon={CheckSquare} title="Checking Your Solution" />
      <p>
        You can check your answer by substituting it back into the original
        equation. If both sides are equal, you're correct!
      </p>
      <CheckSolutionWidget />

      {/* 7. Word Problems to Equations */}
      <LessonHeader icon={BookText} title="Word Problems to Equations" />
      <p>
        The most powerful part of algebra is translating real-world problems
        into equations we can solve.
      </p>
      <WordProblemConverter />

      {/* 8. Equation Types */}
      <LessonHeader icon={Network} title="Types of Equations" />
      <p>
        Not all equations are solved the same way. Here are some you'll
        encounter.
      </p>
      <p>(Placeholder: Expandable cards for Linear, Quadratic, etc.)</p>

      {/* 9. Connections */}
      <LessonHeader icon={Link} title="Connections" />
      <p>
        Equations are built from the topics you've already learned.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResourceLink
          title="Prerequisite: Variables"
          url="/math/algebra/variables"
        />
        <ResourceLink
          title="Prerequisite: Expressions"
          url="/math/algebra/expressions"
        />
      </div>

      {/* 10. Practice Section */}
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
        question="Solve for the variable: 3x - 1 = 11"
        solution="1. Add 1 to both sides: 3x = 12. 2. Divide by 3: x = 4."
      />

      {/* 11. Quick Quiz */}
      <LessonHeader icon={HelpCircle} title="Quick Quiz: Balance the Scales" />
      <p>
        Ready to put your new skills to the test? Try this timed challenge.
      </p>
      <BalanceQuiz />

      {/* 12. Summary */}
      <LessonHeader icon={BookOpen} title="Summary" />
      <p>
        <strong>Equations</strong> are mathematical statements that two
        expressions are equal. To solve them, you must perform the{" "}
        <strong>same operation</strong> on <strong>both sides</strong> (using
        inverse operations) until the variable is isolated.
      </p>

      {/* 13. Next Lesson Preview */}
      <LessonHeader icon={CheckSquare} title="Next Lesson Preview" />
      <p>
        But what happens when the two sides aren't equal?
      </p>
      <ResourceLink
        title="Next Up: Inequalities"
        url="/math/algebra/inequalities" // Placeholder
      />
    </LessonLayout>
  );
}