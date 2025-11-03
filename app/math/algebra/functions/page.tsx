// app/math/algebra/functions/page.tsx
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
  FunctionMachineWidget,
  MappingDiagram,
  VerticalLineTest,
  FunctionFactoryQuiz,
} from "./FunctionComponents";

// 2. Import icons for the "Functions" theme
import {
  Key,
  AlertTriangle,
  ArrowRightLeft,
  Database,
  BrainCircuit,
  Waypoints,
  ScanLine,
  Factory,
  Briefcase,
  Link,
  CheckSquare,
  BookOpen,
  HelpCircle,
} from "@/components/icons";

// 3. Define the new sidebar content
const lessonAside = (
  <>
    {/* Key Concepts */}
    <div className="glass rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-pink-400">
        <Key className="h-4 w-4" />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        <li>
          A <strong>function</strong> is a rule that gives{" "}
          <strong>exactly one output</strong> for each input.
        </li>
        <li>
          <strong>f(x)</strong> is read "f of x" and means "the output of the
          function f when the input is x."
        </li>
        <li>
          <strong>Domain:</strong> The set of all possible inputs (x-values).
        </li>
        <li>
          <strong>Range:</strong> The set of all possible outputs (y-values).
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
          Thinking <code>f(x)</code> means "f times x". It does not!
        </li>
        <li>
          Confusing Domain (x-values) and Range (y-values).
        </li>
        <li>
          Thinking a relationship isn't a function just because two inputs
          share the same output (e.g., <code>f(x) = x²</code>).
        </li>
      </ul>
    </div>
  </>
);

// 4. The new Page Component, following your 14-point plan
export default function FunctionsPage() {
  return (
    <LessonLayout
      title="Functions"
      subtitle="The machine of math. Learn how functions create reliable relationships between inputs and outputs."
      aside={lessonAside}
      className="theme-functions-machine" // 🔁 Applied unique theme
    >
      {/* 1. What Is a Function? / 2. Function as a Machine */}
      <LessonHeader icon={ArrowRightLeft} title="What Is a Function?" />
      <p>
        A <strong>function</strong> is a special rule that connects each{" "}
        <strong>input</strong> to <strong>exactly one output</strong>.
      </p>
      <p>
        Think of it like a machine: you put something in (the input), the
        machine follows a rule, and it gives you one specific thing back (the
        output).
      </p>
      <FunctionMachineWidget />

      {/* 3. Function Notation */}
      <LessonHeader icon={BrainCircuit} title="Function Notation" />
      <p>
        We have a special way to write functions. Instead of <code>y = 2x + 1</code>, we write{" "}
        <code>f(x) = 2x + 1</code>.
      </p>
      <ul className="list-disc pl-5 text-neutral-300">
        <li>
          <code>f(x)</code> is read as "f of x".
        </li>
        <li>
          It's a fancy way of writing the output (like <code>y</code>).
        </li>
        <li>
          <code>f(3)</code> means "find the output when the input is 3".
        </li>
      </ul>
      <StepByStepSolution
        title="Example: Find f(3) if f(x) = 2x + 1"
        steps={[
          "Start with the rule: f(x) = 2x + 1",
          "Substitute '3' for 'x': f(3) = 2(3) + 1",
          "Calculate: f(3) = 6 + 1",
          "Final Answer: f(3) = 7",
        ]}
      />

      {/* 4. Domain and Range */}
      <LessonHeader icon={Database} title="Domain and Range" />
      <p>
        A function's "Domain" and "Range" tell you what's allowed.
      </p>
      <ul>
        <li>
          <strong>Domain:</strong> The set of all possible{" "}
          <strong>inputs</strong> (x-values) you are *allowed* to put into the
          machine.
        </li>
        <li>
          <strong>Range:</strong> The set of all possible{" "}
          <strong>outputs</strong> (y-values) the machine can give you.
        </li>
      </ul>
      <p>(Placeholder: Interactive Domain & Range Visualizer)</p>

      {/* 5. Mapping Diagrams */}
      <LessonHeader icon={Waypoints} title="Mapping Diagrams" />
      <p>
        A mapping diagram helps visualize the "exactly one output" rule. An
        input can't go to two different outputs.
      </p>
      <MappingDiagram />

      {/* 6. Vertical Line Test */}
      <LessonHeader icon={ScanLine} title="The Vertical Line Test" />
      <p>
        On a graph, this rule is easy to check with the{" "}
        <strong>Vertical Line Test</strong>. If you can draw a vertical line
        that hits the graph more than once, it is <strong>not</strong> a
        function.
      </p>
      <VerticalLineTest />

      {/* 7. Function Rules in Action */}
      <p>(Placeholder: Side-by-side function rule demo)</p>

      {/* 8. Piecewise Functions */}
      <p>(Placeholder: Piecewise function explainer)</p>

      {/* 9. Real-World Connections */}
      <LessonHeader icon={Briefcase} title="Real-World Connections" />
      <p>
        Functions are everywhere, describing relationships between two
        quantities.
      </p>
      <ul className="list-disc pl-5 text-neutral-300">
        <li>
          <strong>Your Paycheck:</strong> Your pay (output) is a function of
          the hours you work (input).
        </li>
        <li>
          <strong>Temperature:</strong> The temperature in Celsius (output) is
          a function of the temperature in Fahrenheit (input).
        </li>
        <li>
          <strong>Driving:</strong> The distance you travel (output) is a
          function of your speed and time (inputs).
        </li>
      </ul>

      {/* 10. Connections Table */}
      <LessonHeader icon={Link} title="Connections" />
      <p>
        Functions are the master concept that combine everything we've
        learned so far.
      </p>
      {/* (Placeholder for Connections Table) */}

      {/* 11. Practice Section */}
      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      <PracticeProblem
        question="If f(x) = x - 7, what is f(10)?"
        solution="f(10) = 10 - 7 = 3"
      />
      <PracticeProblem
        question="If g(t) = 5t, what is g(4)?"
        solution="g(4) = 5(4) = 20"
      />
      <PracticeProblem
        question="Is a circle a function?"
        solution="No. It fails the Vertical Line Test."
      />

      {/* 12. Function Factory (Mini-Game) */}
      <LessonHeader icon={Factory} title="Function Factory Quiz" />
      <p>
        Your factory is receiving orders! Calculate the outputs to meet the
        demand.
      </p>
      <FunctionFactoryQuiz />

      {/* 13. Summary */}
      <LessonHeader icon={BookOpen} title="Summary" />
      <p>
        A <strong>function</strong> is a rule that connects each{" "}
        <strong>input</strong> (x-value) to <strong>exactly one output</strong>{" "}
        (y-value). We use notation like <code>f(x)</code> to describe this
        relationship.
      </p>

      {/* 14. Next Lesson Preview */}
      <LessonHeader icon={CheckSquare} title="Next Lesson Preview" />
      <p>
        Now that you know how functions work, let's explore how to visualize
        them in detail.
      </p>
      <ResourceLink
        title="Next Up: Relations & Graphs"
        url="#" // Placeholder
      />
    </LessonLayout>
  );
}