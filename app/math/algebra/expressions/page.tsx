"use client";
import LessonLayout from "@/components/LessonLayout";
import LessonHeader from "@/components/LessonHeader";
import {
  LessonVideo,
  PracticeProblem,
  ResourceLink,
  LikeTermsApplet, // 👈 Our new applet
  StepByStepSolution,
} from "@/components/LessonBlocks";

// Import all the icons we'll use
import {
  Variable,
  Puzzle,
  Scale,
  CheckSquare,
  BookOpen,
  Key,
  AlertTriangle,
  PenSquare,
  Boxes,
  Replace,
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
          An <strong>expression</strong> is a math "phrase" with numbers,
          variables, and operators (like <code>+</code> or <code>-</code>).
        </li>
        <li>
          <strong>Like Terms</strong> are terms that have the *exact same
          variable* raised to the *exact same power*.
        </li>
        <li>
          <strong>Simplifying</strong> means combining all like terms to make the
          expression shorter.
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
          Incorrectly combining unlike terms (e.g., adding <code>5x</code> and{" "}
          <code>2</code> to get <code>7x</code>). This is not allowed!
        </li>
      </ul>
    </div>
  </>
);

// 2. The Page Component
export default function ExpressionsPage() {
  return (
    <LessonLayout
      title="Algebraic Expressions"
      subtitle="Learn how to write and simplify the 'phrases' of algebra, the first key to solving complex problems."
      aside={lessonAside} // 👈 Pass our custom aside
    >
      <LessonHeader icon={Puzzle} title="What is an Expression?" />
      <p>
        As we learned in the last lesson, an <strong>expression</strong> is a
        mathematical "phrase." It's a combination of variables, numbers, and
        operations (like <code>+</code>, <code>-</code>, <code>×</code>, <code>÷</code>
        ).
      </p>
      <p>
        Expressions are different from <strong>equations</strong> because they do
        <strong>not</strong> have an equals sign (<code>=</code>).
      </p>
      <ul>
        <li>
          <strong>Expression:</strong> <code>5x - 2</code>
        </li>
        <li>
          <strong>Equation:</strong> <code>5x - 2 = 8</code>
        </li>
      </ul>
      <p>
        You can't "solve" an expression, but you can do two main things with
        it: <strong>write</strong> it and <strong>simplify</strong> it.
      </p>

      <LessonHeader icon={PenSquare} title="Writing Expressions" />
      <p>
        One of the first skills in algebra is translating words into
        expressions. This is like learning to read and write in a new
        language.
      </p>
      <div className="prose-table:my-0">
        <table>
          <thead>
            <tr>
              <th>Word Phrase</th>
              <th>Algebraic Expression</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"A number <strong>increased by</strong> 5"</td>
              <td>
                <code>x + 5</code>
              </td>
            </tr>
            <tr>
              <td>"7 <strong>less than</strong> a number"</td>
              <td>
                <code>y - 7</code> (Be careful! Not <code>7 - y</code>)
              </td>
            </tr>
            <tr>
              <td>"The <strong>product of</strong> 4 and a number"</td>
              <td>
                <code>4n</code>
              </td>
            </tr>
            <tr>
              <td>"The <strong>quotient of</strong> a number and 10"</td>
              <td>
                <code>z / 10</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <LessonHeader icon={Boxes} title="Simplifying Expressions" />
      <p>
        Simplifying an expression means making it "shorter" by combining all
        the pieces that are alike. These pieces are called{" "}
        <strong>like terms</strong>.
      </p>
      <p>
        <strong>Like terms</strong> are terms that have the{" "}
        <strong>exact same variable</strong> and{" "}
        <strong>exact same exponent</strong>. Constants (plain numbers) are
        also like terms with each other.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-green-700 bg-green-900/40 p-4">
          <h4 className="!my-0 font-semibold text-green-300">
            ✓ Like Terms
          </h4>
          <ul className="!my-2 list-none !pl-0 text-sm">
            <li>
              <code>5x</code> and <code>2x</code>
            </li>
            <li>
              <code>-3y</code> and <code>y</code>
            </li>
            <li>
              <code>7</code> and <code>10</code>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-red-700 bg-red-900/40 p-4">
          <h4 className="!my-0 font-semibold text-red-300">
            ✗ NOT Like Terms
          </h4>
          <ul className="!my-2 list-none !pl-0 text-sm">
            <li>
              <code>5x</code> and <code>2y</code> (different variables)
            </li>
            <li>
              <code>-3x</code> and <code>7</code> (one has a variable, one does not)
            </li>
            <li>
              <code>x²</code> and <code>x</code> (different exponents)
            </li>
          </ul>
        </div>
      </div>
      <p>
        To simplify, you just combine the coefficients (the numbers in front)
        of the like terms. Think of it as sorting fruit: you put all the
        apples together and all the bananas together.
      </p>
      <StepByStepSolution
        title="Example: Simplify 4x + 8 + 2x - 3"
        steps={[
          "Original: 4x + 8 + 2x - 3",
          "Identify like terms (the 'x' terms): 4x, +2x",
          "Identify like terms (the constants): +8, -3",
          "Combine the 'x' terms (4 + 2): 6x",
          "Combine the constants (8 - 3): +5",
          "Final simplified expression: 6x + 5",
        ]}
      />
      <p>Here is a great video that walks through the process:</p>
      <LessonVideo url="https://www.youtube.com/embed/v-6MShC82ow" />

      <LessonHeader icon={Variable} title="Interactive: Combine Like Terms" />
      <p>
        Let's try it. In this applet, click on the terms that "match." When
        you're ready, click "Simplify" to see them combine.
      </p>
      <LikeTermsApplet />

      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      <PracticeProblem
        question="Write an expression for: '3 more than the product of 10 and a number x'."
        solution="10x + 3"
      />
      <PracticeProblem
        question="Simplify the expression: 7y + 2 + 3y + 8"
        solution="10y + 10 (You combine 7y + 3y and 2 + 8)"
      />
      <PracticeProblem
        question="Simplify the expression: 5x + 3y - 2x + 4y"
        solution="3x + 7y (You combine 5x - 2x and 3y + 4y)"
      />
      <PracticeProblem
        question="Are 4x and 4x² like terms? Why or why not?"
        solution="No, they are not. They have the same variable (x) but different exponents (1 and 2)."
      />

      <LessonHeader icon={BookOpen} title="Further Learning" />
      <ResourceLink
        title="Khan Academy: Combining Like Terms"
        url="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:inline-math/x2f8bb11595b61c86:combining-like-terms/v/combining-like-terms"
      />
      <ResourceLink
        title="IXL: Practice Simplifying Expressions"
        url="https://www.ixl.com/math/algebra-1/simplify-variable-expressions-by-combining-like-terms"
      />
    </LessonLayout>
  );
}