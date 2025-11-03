"use client";

import LessonLayout from "@/components/LessonLayout";
import LessonHeader from "@/components/LessonHeader";
import {
  PracticeProblem,
  ResourceLink,
  StepByStepSolution,
} from "@/components/LessonBlocks";

import {
  CoordinatePlaneExplorer,
  RelationTypeChecker,
  MappingDiagram,
  GraphStoryMatch,
  PlottingChecklist,
  SlopeInterceptPlayground,
} from "./RelationsComponents";

import {
  LineChart,
  Map,
  Grid3X3,
  ChartScatter,
  Axis3D,
  Compass,
  ListChecks,
  CheckSquare,
  BookOpen,
  Link,
  HelpCircle,
  Sparkles,
} from "@/components/icons";

const lessonAside = (
  <>
    <div className="glass rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-teal-300">
        <Compass className="h-4 w-4" />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        <li>
          A <strong>relation</strong> is any set of ordered pairs — it links
          inputs to outputs.
        </li>
        <li>
          A <strong>function</strong> is a special relation where every input has
          exactly one output.
        </li>
        <li>
          Graphs help us <strong>see</strong> patterns quickly: increasing,
          decreasing, or staying level.
        </li>
      </ul>
    </div>

    <div className="glass mt-6 rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-300">
        <HelpCircle className="h-4 w-4" />
        Common Mistakes
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        <li>
          Mixing up <strong>x</strong> (horizontal) and <strong>y</strong>
          (vertical) on coordinate axes.
        </li>
        <li>
          Thinking repeated y-values break a function — they don’t if each x
          only has one partner.
        </li>
        <li>
          Forgetting to label scale and units, making graphs hard to interpret.
        </li>
      </ul>
    </div>
  </>
);

export default function RelationsPage() {
  return (
    <LessonLayout
      title="Relations &amp; Graphs"
      subtitle="Visualize how inputs connect to outputs. Discover how functions become pictures and stories on the coordinate plane."
      aside={lessonAside}
      className="theme-relations-graph"
    >
      <LessonHeader icon={LineChart} title="Why Graphs Matter" />
      <p>
        Graphs are the visual language of algebra. They take a list of ordered
        pairs and turn it into a picture so we can spot patterns at a glance.
      </p>
      <CoordinatePlaneExplorer />

      <LessonHeader icon={Map} title="Relations Map Inputs to Outputs" />
      <p>
        A relation is simply a connection between two sets of numbers. Each
        ordered pair <code>(x, y)</code> tells you how an input relates to an
        output.
      </p>
      <RelationTypeChecker />

      <LessonHeader icon={Grid3X3} title="Mapping Diagrams" />
      <p>
        Mapping diagrams show the flow from every input to exactly one output.
        If any input shoots two arrows, it’s <strong>not</strong> a function.
      </p>
      <MappingDiagram />

      <LessonHeader icon={Axis3D} title="Vertical Line Test" />
      <p>
        To decide if a graph represents a function, imagine sliding a vertical
        line across it. If the line hits more than one point at any location,
        the relation fails the test.
      </p>
      <StepByStepSolution
        title="Explain the vertical line test"
        steps={[
          "Draw or imagine a vertical line sweeping across the graph.",
          "If it ever touches the graph twice at the same x-value, the relation gives one input two outputs, so it is not a function.",
        ]}
      />

      <LessonHeader icon={ChartScatter} title="Stories Become Graphs" />
      <p>
        Real-world situations can often be described by the <strong>shape</strong>
        of a graph. Use the match game to connect stories with the line that fits.
      </p>
      <GraphStoryMatch />

      <LessonHeader icon={ListChecks} title="Practice Plotting Points" />
      <p>
        Accurate graphs start with accurate points. Check off each step as you
        mentally place the points on your coordinate plane.
      </p>
      <PlottingChecklist />

      <LessonHeader icon={Sparkles} title="Play with y = mx + b" />
      <p>
        Most Algebra I graphs are straight lines. Adjusting the slope (<code>m</code>)
        and y-intercept (<code>b</code>) changes the tilt and starting point of
        the line.
      </p>
      <SlopeInterceptPlayground />

      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      <PracticeProblem
        question="Does the set {(1, 4), (2, 5), (3, 4)} represent a function?"
        solution="Yes. Each x-value is paired with only one y-value."
      />
      <PracticeProblem
        question="A vertical line crosses the graph of y = 2x + 3 at a single point. What does this tell you?"
        solution="The relation passes the vertical line test, so it is a function."
      />
      <PracticeProblem
        question="Plot the points (−2, 1), (0, −3), and (4, 5). What do you notice about the direction of the line?"
        solution="The line slopes upward from left to right, showing a positive slope."
      />

      <LessonHeader icon={BookOpen} title="Summary" />
      <p>
        Relations pair inputs with outputs. When every input has only one output,
        you have a function. Graphs turn these connections into visuals so you
        can quickly judge behavior, test for functions, and tell data-driven
        stories.
      </p>

      <LessonHeader icon={Link} title="Next Lesson Preview" />
      <p>
        Get ready to combine multiple equations at once. Systems of equations
        let you find intersection points between lines.
      </p>
      <ResourceLink title="Coming Soon: Systems of Equations" url="#" />
    </LessonLayout>
  );
}