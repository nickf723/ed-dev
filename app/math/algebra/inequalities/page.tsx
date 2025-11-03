// app/math/algebra/inequalities/page.tsx
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
  InequalitySymbolExplainer,
  NumberLineTool,
  FlipSignDemo,
  InequalityArenaQuiz,
} from "./InequalityComponents";

// 2. Import icons for the "Inequalities" theme
import {
  Key,
  AlertTriangle,
  Zap,
  Swords,
  CheckSquare,
  BookOpen,
  Link,
  HelpCircle,
  Network,
  BookText,
  Goal,
  TrendingUp,
  Scale,
} from "@/components/icons";

// 3. Define the new sidebar content
const lessonAside = (
  <>
    {/* Key Concepts */}
    <div className="glass rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-400">
        <Key className="h-4 w-4" />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        <li>
          An <strong>inequality</strong> compares two expressions using{" "}
          <code>&lt;</code>, <code>&gt;</code>, <code>≤</code>, or{" "}
          <code>≥</code>.
        </li>
        <li>
          Solve like an equation, but <strong>FLIP THE SIGN</strong> if you
          multiply or divide by a <strong>negative</strong> number.
        </li>
        <li>
          <code>&lt;</code> or <code>&gt;</code> use an{" "}
          <strong>open circle</strong> (O) on a number line.
        </li>
        <li>
          <code>≤</code> or <code>≥</code> use a{" "}
          <strong>closed circle</strong> (●) on a number line.
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
          <strong>Forgetting to flip the sign.</strong> This is the most
          common error!
        </li>
        <li>
          Using a closed circle for <code>&lt;</code> or <code>&gt;</code>.
        </li>
        <li>
          Confusing "at least" (<code>≥</code>) with "less than" (
          <code>&lt;</code>).
        </li>
      </ul>
    </div>
  </>
);

// 4. The new Page Component, following your 13-point plan
export default function InequalitiesPage() {
  return (
    <LessonLayout
      title="Inequalities"
      subtitle="Master the symbols of power and comparison. Learn what to do when things aren't equal."
      aside={lessonAside}
      className="theme-inequalities-duel" // ⚔️ Applied unique theme
    >
      {/* 1. What Is an Inequality? */}
      <LessonHeader icon={Zap} title="What Is an Inequality?" />
      <p>
        An <strong>inequality</strong> compares two values or expressions that
        aren't necessarily equal. Instead of an <code>=</code> sign, we use
        symbols to show which side is greater or smaller.
      </p>

      {/* 2. Inequality Symbols Reference */}
      <LessonHeader icon={Swords} title="The Symbols of Comparison" />
      <p>
        These five symbols are the heart of inequalities.
      </p>
      <InequalitySymbolExplainer />

      {/* 3. Number Line Visualization */}
      <LessonHeader icon={TrendingUp} title="Number Line Visualization" />
      <p>
        Since inequalities have many solutions (e.g., "all numbers greater than
        5"), we show them on a number line.
      </p>
      <ul className="list-disc pl-5 text-neutral-300">
        <li>
          <strong>Open Circle (O):</strong> Use for <code>&lt;</code> (less
          than) and <code>&gt;</code> (greater than). The number itself is{" "}
          <strong>not</strong> included.
        </li>
        <li>
          <strong>Closed Circle (●):</strong> Use for <code>≤</code> (less than
          or equal to) and <code>≥</code> (greater than or equal to). The
          number <strong>is</strong> included.
        </li>
      </ul>
      <NumberLineTool />

      {/* 4. Solving One-Step Inequalities */}
      <LessonHeader icon={Scale} title="Solving One-Step Inequalities" />
      <p>
        You can solve simple inequalities just like equations, using inverse
        operations. There is <strong>one critical new rule</strong>.
      </p>
      <p className="!text-xl !font-semibold !leading-relaxed text-red-300/90">
        If you multiply or divide both sides by a NEGATIVE number, you MUST
        flip the inequality sign.
      </p>
      <FlipSignDemo />

      {/* 5. Multi-Step Inequalities */}
      <LessonHeader icon={Goal} title="Solving Multi-Step Inequalities" />
      <p>
        To solve complex inequalities, follow the same "reverse-PEMDAS" order
        as equations. Just remember the Golden Rule and the new Flip Rule!
      </p>
      <StepByStepSolution
        title="Example: Solve 2x + 3 ≤ 9"
        steps={[
          "Original: 2x + 3 ≤ 9",
          "1. Undo addition: Subtract 3 from BOTH sides.",
          "2x + 3 - 3 ≤ 9 - 3",
          "Simplify: 2x ≤ 6",
          "2. Undo multiplication: Divide BOTH sides by 2.",
          "2x / 2 ≤ 6 / 2",
          "Simplify: x ≤ 3",
          "Solution: x ≤ 3 (Sign does NOT flip; we divided by a positive 2)",
        ]}
      />

      {/* 6. Compound Inequalities */}
      <LessonHeader icon={Network} title="Compound Inequalities" />
      <p>
        Sometimes we have two inequalities at once, joined by "and" or "or".
      </p>
      <p>(Placeholder: Compound Inequality Visualizer)</p>

      {/* 7. Word Problems to Inequalities */}
      <LessonHeader icon={BookText} title="Word Problems to Inequalities" />
      <p>
        Inequalities are perfect for setting limits, budgets, or rules.
      </p>
      <ul className="list-disc pl-5 text-neutral-300">
        <li>
          "To pass, your score (<code>s</code>) must be at least 70." →{" "}
          <code>s ≥ 70</code>
        </li>
        <li>
          "You can spend (<code>m</code>) no more than $50." →{" "}
          <code>m ≤ 50</code>
        </li>
        <li>
          "Your energy (<code>E</code>) must be below 20 to lose." →{" "}
          <code>E &lt; 20</code>
        </li>
      </ul>

      {/* 8. Comparing to Previous Lessons */}
      <LessonHeader icon={Link} title="Connections" />
      <p>
        Inequalities are built from the topics you've already learned.
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

      {/* 9. Graphing (Advanced) */}
      <LessonHeader icon={TrendingUp} title="Graphing (Advanced Preview)" />
      <p>(Placeholder: Graphing inequalities with shaded regions)</p>

      {/* 10. Practice Section */}
      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      <PracticeProblem
        question="x - 5 < 2"
        solution="x < 7 (Add 5 to both sides. Sign does not flip.)"
      />
      <PracticeProblem
        question="Solve: 5x ≥ 20"
        solution="x ≥ 4 (Divide by 5. Sign does not flip.)"
      />
      <PracticeProblem
        question="Solve: -3x > 15"
        solution="x < -5 (Divide by -3. The sign FLIPS from > to <.)"
      />
      <PracticeProblem
        question="Graph x ≥ 1 on a number line."
        solution="A closed circle (●) at 1, with an arrow shading to the right."
      />

      {/* 11. Quick Quiz */}
      <LessonHeader icon={HelpCircle} title="Quick Quiz: The Inequality Arena" />
      <p>
        Ready for the duel? Solve these inequalities to win.
      </p>
      <InequalityArenaQuiz />

      {/* 12. Summary */}
      <LessonHeader icon={BookOpen} title="Summary" />
      <p>
        <strong>Inequalities</strong> describe when one side is greater,
        smaller, or not equal to another. Solving them works just like
        equations—except you must <strong>flip the symbol</strong> when
        multiplying or dividing by a negative number.
      </p>

      {/* 13. Next Lesson Preview */}
      <LessonHeader icon={CheckSquare} title="Next Lesson Preview" />
      <p>
        You've mastered variables, phrases, and (un)balanced sentences. Now
        it's time to see how variables form relationships that move and change
        together.
      </p>
      <ResourceLink
        title="Next Up: Functions"
        url="/math/algebra/functions" // Placeholder
      />
    </LessonLayout>
  );
}