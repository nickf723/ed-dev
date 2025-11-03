"use client";
import LessonLayout from "@/components/LessonLayout";
import {
  CoreDefinition,
  SliderApplet,
  ValueSwapDemo,
  NotationCard,
  ExpressionPlayground,
  GraphExplorer,
  TableMapper,
  RecapList,
  CheckYourIntuition,
  EvaluateApplet,
  ConstantVsVariableSorter,
} from "./VariableComponents";

export default function VariablesPage() {
  return (
    <LessonLayout
      title="Variables"
      subtitle="Variables represent change, relationships, and unknowns. Build intuition first, then formalize."
      className="theme-variables"
    >
      <div className="two-col">
        {/* Left column: Overview, Intuition, Formalization */}
        <div className="space-y-8">
          <section>
            <h2>What is a variable?</h2>
            <CoreDefinition
              title="Variable"
              definition="A variable is a symbol that can represent any number or value."
              example="x could be 2, 5, or 100 depending on the situation."
            />
          </section>

          <section>
            <h2>Build Intuition</h2>
            <p className="text-neutral-300">
              Use the slider to feel how a variable changes and how that change
              shows up visually and numerically.
            </p>
            <SliderApplet
              variableName="x"
              min={0}
              max={10}
              formula="bar length = x"
              liveText="As x grows, so does the bar."
            />
            <ValueSwapDemo
              variable="x"
              visual="cupFill"
              range={[0, 10]}
              caption="As x increases, the cup fills up — the number and the picture describe the same thing."
            />
          </section>

          <section>
            <h2>Naming What Changes</h2>
            <p className="text-neutral-300">
              Instead of always describing the quantity in words, we give it a
              name: x. Variables are names for change.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <NotationCard
                symbol="x"
                meaning="Represents a quantity that can vary"
                relatedSymbols={["y", "z"]}
                example="x = number of cups filled"
              />
              <NotationCard
                symbol="t"
                meaning="Often used for time"
                relatedSymbols={["h", "d"]}
                example="d = s·t relates distance, speed, and time"
              />
              <NotationCard
                symbol="n"
                meaning="A counting variable (integers)"
                relatedSymbols={["k", "i", "j"]}
                example="n = number of tickets"
              />
            </div>
          </section>
        </div>

        {/* Right column: Key notes, Exploration, Evaluate, Recap */}
        <div className="space-y-8">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="note-card">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
                Key Ideas
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-300">
                <li>Variables can represent unknowns or changing quantities.</li>
                <li>Symbols like x, y, z stand for numbers.</li>
                <li>Expressions describe relationships between variables and numbers.</li>
              </ul>
            </div>
            <div className="note-card">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                Common Pitfalls
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-300">
                <li>Forgetting order of operations when substituting.</li>
                <li>Mixing up 2x (multiply) with 2 + x (add).</li>
                <li>Thinking x can only be one fixed number.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2>Expressing Relationships</h2>
            <p className="text-neutral-300">
              Variables connect things. Build expressions and see how a choice of x
              changes the outcome.
            </p>
            <ExpressionPlayground
              blocks={["2", "x", "+", "3"]}
              computeMode={true}
              liveValue={{ x: 4 }}
              showOutput={true}
            />
            <h3 className="mt-8">Seeing Variables on a Graph</h3>
            <GraphExplorer
              equation="y = 2x + 3"
              rangeX={[-5, 5]}
              variableName="x"
              highlightMode="tracePoint"
            />
            <h3 className="mt-8">Table of Values</h3>
            <TableMapper inputs={[-3, -1, 0, 1, 2, 4]} fn={(x) => 2 * x + 3} />
          </section>

          <section>
            <h2>Substituting Values</h2>
            <p className="text-neutral-300">
              To substitute means to replace a variable with a specific number. This
              is how we evaluate an expression to find its value.
            </p>
            <EvaluateApplet expression="4x + 1" fn={(x) => 4 * x + 1} />
            <EvaluateApplet expression="2x^2 - x + 4" fn={(x) => 2 * x * x - x + 4} />
          </section>

          <section>
            <h2>Constant vs. Variable</h2>
            <p className="text-neutral-300">
              Identify which tokens are constants and which are variables.
            </p>
            <ConstantVsVariableSorter />
          </section>

          <section>
            <h2>Recap</h2>
            <RecapList
              items={[
                "Variables represent unknowns or changing quantities.",
                "They help us describe relationships using math.",
                "Symbols like x, y, and z stand for numbers.",
              ]}
            />
            <CheckYourIntuition
              questions={[
                {
                  prompt: "When x increases, what happens to 2x + 3?",
                  options: ["It increases", "It decreases"],
                  correct: 0,
                },
                {
                  prompt: "What does 'x = 4' mean?",
                  options: ["x is always 4", "x currently equals 4"],
                  correct: 1,
                },
              ]}
            />
          </section>
        </div>
      </div>
    </LessonLayout>
  );
}
