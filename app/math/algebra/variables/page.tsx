"use client";
import LessonLayout from "@/components/LessonLayout";
import {
  LessonImage,
  LessonVideo,
  LessonApplet,
  PracticeProblem,
  ResourceLink,
} from "@/components/LessonBlocks";

export default function VariablesPage() {
  return (
    <LessonLayout
      title="Variables"
      subtitle="Variables are the building blocks of algebra — symbols that allow us to generalize, reason abstractly, and express mathematical relationships."
    >
      {/* 🧠 Section 1 — What is a Variable? */}
      <section>
        <h2>Definition</h2>
        <p>
          A <strong>variable</strong> is a letter or symbol that represents a
          number or quantity that can change. Variables are essential for
          describing patterns, relationships, and equations in mathematics.
        </p>
        <LessonImage
          src="/images/variable-symbols.png"
          caption="Common variable symbols such as x, y, z, n, and t."
        />
      </section>

      {/* 🔢 Section 2 — Examples and Usage */}
      <section>
        <h2>Using Variables</h2>
        <p>
          When we write <code>x + 5 = 8</code>, the variable <code>x</code>{" "}
          represents an unknown number. Solving means finding what number makes
          the equation true.
        </p>
        <p>
          Variables also appear in formulas, such as the area of a circle:
          <code> A = πr² </code>, where <code>A</code> depends on the value of{" "}
          <code>r</code>.
        </p>
      </section>

      {/* 🎥 Section 3 — Example Video */}
      <section>
        <h2>Understanding Variables Visually</h2>
        <LessonVideo url="https://www.youtube.com/embed/HEfHFsfGXjs" />
      </section>

      {/* 🧮 Section 4 — Interactive Example */}
      <section>
        <h2>Interactive Exploration</h2>
        <p>
          Try adjusting the sliders and watch how changing one variable affects
          the output. This shows how variables control relationships
          dynamically.
        </p>
        <LessonApplet src="https://www.desmos.com/calculator" />
      </section>

      {/* 🧩 Section 5 — Practice */}
      <section>
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
      </section>

      {/* 📚 Section 6 — Further Reading */}
      <section>
        <h2>Further Reading</h2>
        <ResourceLink
          title="Khan Academy: Variables and Expressions"
          url="https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:variables-expressions"
        />
        <ResourceLink
          title="CK-12: Introduction to Variables"
          url="https://www.ck12.org/algebra/introduction-to-variables/"
        />
        <ResourceLink
          title="Desmos Classroom Activities"
          url="https://teacher.desmos.com/"
        />
      </section>
    </LessonLayout>
  );
}
