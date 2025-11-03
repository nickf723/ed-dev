"use client";
import LessonLayout from "@/components/LessonLayout";
import LessonHeader from "@/components/LessonHeader";
import {
  PracticeProblem,
  ResourceLink,
  StepByStepSolution,
} from "@/components/LessonBlocks";

// 1. Import all our components
// Re-using the applet from the 'variables' lesson
import { EvaluateApplet } from "../variables/VariableComponents";
// 🧩 UPDATED: Imports now come from the new component file
import {
  ExpressionTermHighlighter,
  ComponentFlipCards,
  TypesFlowchart,
  ExpressionBuilderGame,
  AssessmentWidget,
  LikeTermsApplet, // 👈 Now imported from here
} from "./ExpressionComponents";

// 2. Import icons for the new theme
import {
  Component,
  Key,
  AlertTriangle,
  Network,
  Calculator,
  PencilRuler,
  Boxes,
  Puzzle,
  BookOpen,
  CheckSquare,
  Package,
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
          An <strong>expression</strong> is a math "phrase" (e.g., <code>5x - 2</code>
          ).
        </li>
        <li>
          An <strong>equation</strong> is a math "sentence" (e.g.,{" "}
          <code>5x - 2 = 8</code>).
        </li>
        <li>
          <strong>Like Terms</strong> have the exact same variable and power.
        </li>
        <li>
          <strong>Evaluate:</strong> Sub in a number to get a value.
        </li>
        <li>
          <strong>Simplify:</strong> Combine like terms to make it shorter.
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
          Trying to "solve" an expression. You can only <strong>simplify</strong>{" "}
          or <strong>evaluate</strong> one!
        </li>
        <li>
          Combining unlike terms (e.g., <code>5x + 2 = 7x</code>). This is not
          allowed!
        </li>
      </ul>
    </div>
  </>
);

// 4. The new Page Component, following your 10-point plan
export default function ExpressionsPage() {
  return (
    <LessonLayout
      title="Expressions"
      subtitle="The fundamental building blocks of algebra. Learn to build, read, and simplify mathematical phrases."
      aside={lessonAside}
    >
      {/* 1. Interactive Overview */}
      <LessonHeader icon={Package} title="What is an Expression?" />
      <p>
        Expressions are like math phrases. They represent a value but don’t make
        a full statement. They combine <strong>constants</strong> (numbers),{" "}
        <strong>variables</strong> (letters), and{" "}
        <strong>operations</strong> (+, -, ×, ÷).
      </p>
      <ExpressionTermHighlighter />

      {/* 2. Components of an Expression */}
      <LessonHeader icon={Component} title="Components of an Expression" />
      <p>
        To build expressions, you need to know the parts. Let's look at the
        expression <code>3x + 5</code>.
      </p>
      <ComponentFlipCards />

      {/* 3. Types of Expressions */}
      <LessonHeader icon={Network} title="Types of Expressions" />
      <p>
        We name expressions based on how many terms they have. A term is a
        single piece of an expression, separated by <code>+</code> or{" "}
        <code>-</code> signs.
      </p>
      <TypesFlowchart />

      {/* 4. Evaluating Expressions */}
      <LessonHeader icon={Calculator} title="Evaluating Expressions" />
      <p>
        To "evaluate" an expression, you substitute the variable with a given
        number and find the final value.
      </p>
      <StepByStepSolution
        title="Example: Evaluate 3x + 2 when x = 4"
        steps={[
          "Write the original expression: 3x + 2",
          "Substitute '4' for 'x': 3(4) + 2",
          "Multiply 3 and 4: 12 + 2",
          "Add 12 and 2: 14",
          "The final value is 14.",
        ]}
      />
      {/* Re-using the EvaluateApplet from the 'variables' lesson */}
      <EvaluateApplet expression="3x + 2" fn={(x) => 3 * x + 2} />

      {/* 5. Simplifying Expressions */}
      <LessonHeader icon={Boxes} title="Simplifying Expressions" />
      <p>
        Simplifying means combining "like terms" to make the expression shorter.
        Think of it as sorting fruit: you put all the apples (<code>x</code>{" "}
        terms) together and all the bananas (constants) together.
      </p>
      {/* Re-using the LikeTermsApplet from this lesson */}
      <LikeTermsApplet />

      {/* 6. Expression Builder Game */}
      <LessonHeader icon={Puzzle} title="Expression Builder Game" />
      <p>
        Time to build! Combine the pieces to make your own valid expressions.
        This is a great way to test your mastery.
      </p>
      <ExpressionBuilderGame />

      {/* 7. Cross-Reference Links */}
      <LessonHeader icon={BookOpen} title="Related Topics" />
      <p>
        Expressions are the foundation for many other topics in algebra. See
        where to go next:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResourceLink
          title="Next Step: Equations"
          url="/math/algebra/equations"
        />
        <ResourceLink
          title="Learn: Variables"
          url="/math/algebra/variables"
        />
        {/* Add more links as those pages are built */}
      </div>

      {/* 8. Practice Section */}
      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      <PracticeProblem
        question="In 8a - 1, what is the coefficient?"
        solution="The coefficient is 8."
      />
      <PracticeProblem
        question="Evaluate 5y - 2 when y = 3."
        solution="5(3) - 2 = 15 - 2 = 13"
      />
      <PracticeProblem
        question="Simplify: 7x + 2 + 3x - 1"
        solution="10x + 1 (Combine 7x + 3x and 2 - 1)"
      />

      {/* 9. Summary */}
      <LessonHeader icon={PencilRuler} title="Summary" />
      <p>
        An <strong>expression</strong> is a mathematical phrase combining
        numbers, variables, and operations — <strong>no equals sign</strong>!
        You can <strong>evaluate</strong> them (plug in a number) or{" "}
        <strong>simplify</strong> them (combine like terms).
      </p>

      {/* 10. Assessment Widget */}
      <LessonHeader icon={CheckSquare} title="Lesson Assessment" />
      <p>
        Ready to test your knowledge? Take this short quiz to earn your
        "Expression Builder" badge.
      </p>
      <AssessmentWidget />
    </LessonLayout>
  );
}