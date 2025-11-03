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
  WhatIsVariableExplainer,
  ValidOrNotGame,
  EvaluateApplet, // 👈 Now imported from its new location
  ConstantVsVariableSorter,
  VariableQuiz,
} from "./VariableComponents";

// 2. Import icons for the new theme
import {
  Key,
  AlertTriangle,
  Search,
  Users,
  CheckCircle,
  Calculator,
  Shuffle,
  Beaker,
  Link,
  CheckSquare,
  BookOpen,
  HelpCircle,
  Binary,
} from "lucide-react";

// 3. Define the new sidebar content
const lessonAside = (
  <>
    {/* Key Concepts */}
    <div className="glass rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-violet-400">
        <Key className="h-4 w-4" />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        <li>
          A <strong>variable</strong> is a letter (like <code>x</code>) that
          holds the place for an unknown or changing number.
        </li>
        <li>
          <strong>Substitution</strong> is the act of replacing a variable
          with a specific number.
        </li>
        <li>
          A <strong>Constant</strong> is a number that does not change (like{" "}
          <code>5</code>).
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
          Forgetting Order of Operations (PEMDAS) when substituting.
        </li>
        <li>
          Thinking <code>x</code> can only stand for one number. It can change!
        </li>
        <li>
          Confusing <code>2x</code> (multiplication) with <code>2 + x</code>{" "}
          (addition).
        </li>
      </ul>
    </div>
  </>
);

// 4. The new Page Component, following your 12-point plan
export default function VariablesPage() {
  return (
    <LessonLayout
      title="Variables"
      subtitle="Uncover the 'unknowns' of algebra. Learn what variables are, why we use them, and how to find their value."
      aside={lessonAside}
      className="theme-variables-detective"
    >
      {/* 1. What Are Variables? */}
      <LessonHeader icon={Search} title="What Are Variables?" />
      <p>
        A <strong>variable</strong> is a symbol (often a letter like{" "}
        <code>x</code> or <code>y</code>) that stands for an unknown or
        changeable number.
      </p>
      <p>
        Think of it like a treasure chest Mystery Box: you don’t know
        what’s inside until you <strong>substitute</strong> a value.
      </p>
      <WhatIsVariableExplainer />

      {/* 2. Why We Use Variables */}
      <LessonHeader icon={Users} title="Why We Use Variables" />
      <p>
        Variables let us describe <strong>patterns</strong> and{" "}
        <strong>rules</strong> instead of just one-time situations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-700 bg-neutral-900/40 p-4">
          <h4 className="!my-0 font-semibold text-red-300">
            Without Variables
          </h4>
          <p className="!my-2 text-sm">"I have 3 apples, you have 5."</p>
          <em className="text-xs text-neutral-400">
            (This only works for one case)
          </em>
        </div>
        <div className="rounded-lg border border-green-700 bg-green-900/40 p-4">
          <h4 className="!my-0 font-semibold text-green-300">
            With Variables
          </h4>
          <p className="!my-2 text-sm">
            "I have <code>x</code> apples, you have <code>y</code>."
          </p>
          <em className="text-xs text-neutral-400">
            (This works for any number of apples)
          </em>
        </div>
      </div>

      {/* 3. Naming Variables */}
      <LessonHeader icon={CheckCircle} title="Naming Variables" />
      <p>
        You can use almost any letter, but <code>x</code>, <code>y</code>, and{" "}
        <code>z</code> are the most common. Sometimes, we use letters that
        stand for words, like <code>t</code> for <strong>time</strong> or{" "}
        <code>h</code> for <strong>height</strong>.
      </p>
      <ValidOrNotGame />

      {/* 4. Visualizing Variables */}
      <LessonHeader icon={Binary} title="Visualizing Variables" />
      <p>
        Variables are powerful because they let us see how one quantity{" "}
        <strong>depends</strong> on another. For example, the total cost (
        <code>y</code>) of buying movie tickets (<code>x</code>) depends on
        how many you buy.
      </p>
      <p>(Placeholder: An interactive graph widget could go here.)</p>

      {/* 5. Substituting Values */}
      <LessonHeader icon={Calculator} title="Substituting Values" />
      <p>
        To "substitute" means to replace a variable with a specific number.
        This is how we "evaluate" an expression to find its value.
      </p>
      <StepByStepSolution
        title="Example: Evaluate 4x + 1 when x = 3"
        steps={[
          "Write the original expression: 4x + 1",
          "Substitute '3' for 'x': 4(3) + 1",
          "Multiply 4 and 3: 12 + 1",
          "Add 12 and 1: 13",
          "The final value is 13.",
        ]}
      />
      {/* Re-using the EvaluateApplet */}
      <EvaluateApplet expression="4x + 1" fn={(x) => 4 * x + 1} />

      {/* 6. Constant vs. Variable */}
      <LessonHeader icon={Shuffle} title="Constant vs. Variable" />
      <p>
        It's important to know the difference between a variable and a{" "}
        <strong>constant</strong>.
      </p>
      <ConstantVsVariableSorter />

      {/* 7. Using Variables in Real Life */}
      <LessonHeader icon={Beaker} title="Using Variables in Real Life" />
      <p>
        You use the idea of variables all the time!
      </p>
      <ul className="list-disc pl-5 text-neutral-300">
        <li>
          <strong>Baking:</strong> "I need 2 cups of flour per (<code>x</code>)
          batches of cookies."
        </li>
        <li>
          <strong>Games:</strong> "You get 50 points for every (<code>n</code>)
          coins you collect."
        </li>
        <li>
          <strong>Science:</strong> "The distance (<code>d</code>) is equal to
          speed (<code>s</code>) multiplied by time (<code>t</code>)."
        </li>
      </ul>

      {/* 8. Connections */}
      <LessonHeader icon={Link} title="Connections" />
      <p>
        Variables are the glue that connects different parts of algebra.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResourceLink
          title="Next Step: Expressions"
          url="/math/algebra/expressions"
        />
        <ResourceLink
          title="Learn: Equations"
          url="/math/algebra/equations"
        />
      </div>

      {/* 9. Practice Section */}
      <LessonHeader icon={CheckSquare} title="Practice Section" />
      <PracticeProblem
        question="Highlight the variable in: 5y - 8"
        solution="The variable is y."
      />
      <PracticeProblem
        question="Evaluate 3n + 2 when n = 5."
        solution="3(5) + 2 = 15 + 2 = 17"
      />
      <PracticeProblem
        question="Write an expression for: 'A number x decreased by 10'"
        solution="x - 10"
      />

      {/* 10. Interactive Quiz */}
      <LessonHeader icon={HelpCircle} title="Interactive Quiz" />
      <p>
        Ready to solve the mystery? Test your knowledge on variables.
      </p>
      <VariableQuiz />

      {/* 11. Summary */}
      <LessonHeader icon={BookOpen} title="Summary" />
      <p>
        <strong>Variables</strong> are symbols (like <code>x</code>) for
        unknowns or changing values. They allow math to describe patterns, not
        just single numbers. We use <strong>substitution</strong> to replace
        variables with numbers to evaluate expressions.
      </p>

      {/* 12. Extension / Next Lesson */}
      <LessonHeader icon={CheckSquare} title="Next Lesson" />
      <p>
        Now that you understand variables (the "unknowns") and expressions
        (the "phrases"), you're ready to see what happens when we set two
        expressions equal to each other.
      </p>
      <ResourceLink
        title="Next Up: Equations"
        url="/math/algebra/equations"
      />
    </LessonLayout>
  );
}