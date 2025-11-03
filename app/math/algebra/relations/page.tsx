"use client";

import LessonLayout from "@/components/LessonLayout";
import LessonHeader from "@/components/LessonHeader";
import {
  PracticeProblem,
  ResourceLink,
} from "@/components/LessonBlocks";

// 1. UPDATED: Imports for new components
import {
  CoordinatePlaneExplorer,
  InteractivePlotter, // 👈 NEW
  TableToGraph, // 👈 NEW
  GraphStoryMatch,
  SlopeInterceptPlayground,
} from "./RelationsComponents";

// 2. UPDATED: Icon imports
import {
  LineChart,
  ChartScatter,
  Compass,
  CheckSquare,
  BookOpen,
  Link,
  HelpCircle,
  Sparkles,
  Move, // 👈 NEW
  Table, // 👈 NEW
} from "@/components/icons";

// 3. UPDATED: lessonAside to be more visual-focused
const lessonAside = (
  <>
    <div className="glass rounded-lg border border-neutral-800 p-4">
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-teal-300">
        <Compass className="h-4 w-4" />
        Key Concepts
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        <li>
          The <strong>Coordinate Plane</strong> is a grid with an x-axis
          (horizontal) and y-axis (vertical).
        </li>
        <li>
          Points are written as <strong>ordered pairs</strong> (x, y).
        </li>
        <li>
          A <strong>Table of Values</strong> is a list of ordered pairs that
          follow a rule.
        </li>
        <li>
          A <strong>graph</strong> turns a table of values into a visual
          picture.
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
          Mixing up <strong>x</strong> (horizontal, "run") and{" "}
          <strong>y</strong> (vertical, "rise").
        </li>
        <li>
          Going to (y, x) instead of (x, y) when plotting points.
        </li>
        <li>
          Forgetting that negative x-values go left and negative y-values go
          down.
        </li>
      </ul>
    </div>
  </>
);

export default function RelationsPage() {
  return (
    <LessonLayout
      title="Relations &amp; Graphs"
      subtitle="Visualize algebra. Learn to read and build graphs on the coordinate plane, turning numbers and rules into pictures."
      aside={lessonAside}
      className="theme-relations-graph"
    >
      {/* 1. What is the Coordinate Plane? */}
      <LessonHeader icon={LineChart} title="Why Graphs Matter" />
      <p>
        Graphs are the visual language of algebra. They take a list of ordered
        pairs (which we call a <strong>relation</strong>) and turn it into a
        picture on the <strong>coordinate plane</strong>. This lets us spot
        patterns at a glance.
      </p>
      <CoordinatePlaneExplorer />

      {/* 2. How to Plot Points (NOW VISUAL) */}
      <LessonHeader icon={Move} title="How to Plot Points" />
      <p>
        Accurate graphs start with accurate points. An ordered pair like{" "}
        <code>(x, y)</code> is a set of instructions:
      </p>
      <ol className="!list-decimal !pl-5">
        <li>
          Start at the <strong>origin (0, 0)</strong>.
        </li>
        <li>
          Move left/right based on the <strong>x-value</strong> (horizontal).
        </li>
        <li>
          Move up/down based on the <strong>y-value</strong> (vertical).
        </li>
      </ol>
      <InteractivePlotter />

      {/* 3. NEW: From Table to Graph */}
      <LessonHeader icon={Table} title="From Table to Graph" />
      <p>
        Most of the time, you'll get your points from a{" "}
        <strong>table of values</strong>. This is just a list of (x, y) pairs
        that follow a specific rule (like an equation).
      </p>
      <TableToGraph />

      {/* 4. What do Graph Shapes Mean? (NOW VISUAL) */}
      <LessonHeader icon={ChartScatter} title="Stories Become Graphs" />
      <p>
        Real-world situations can often be described by the{" "}
        <strong>shape</strong>
        of a graph. Use the match game to connect stories with the line that
        fits.
      </p>
      <GraphStoryMatch />

      {/* 5. Graphing Linear Equations */}
      <LessonHeader icon={Sparkles} title="Play with y = mx + b" />
      <p>
        Most Algebra 1 graphs are straight lines. The equation for a line is
        often written as <code>y = mx + b</code>. Adjusting the slope (
        <code>m</code>) and y-intercept (<code>b</code>) changes the tilt and
        starting point of the line.
      </p>
      <SlopeInterceptPlayground />

      {/* 6. UPDATED Practice Section */}
      <LessonHeader icon={CheckSquare} title="Check Your Understanding" />
      <PracticeProblem
        question="In which quadrant would you find the point (-5, 10)?"
        solution="Quadrant II. The x-value is negative (left) and the y-value is positive (up)."
      />
      <PracticeProblem
        question="A table shows the points (1, 5), (2, 7), and (3, 9). What is the y-value when x = 4?"
        solution="The y-value is 11. The pattern is 'add 2 to the previous y-value' or 'y = 2x + 3'."
      />
      <PracticeProblem
        question="A graph of a car's speed is a horizontal line at y = 60. What does this mean?"
        solution="The car is traveling at a constant speed of 60 (e.g., 60 mph). The speed is not increasing or decreasing."
      />

      {/* 7. UPDATED Summary */}
      <LessonHeader icon={BookOpen} title="Summary" />
      <p>
        A <strong>relation</strong> is any set of ordered pairs. A{" "}
        <strong>graph</strong> turns this relation—often listed in a{" "}
        <strong>table of values</strong>—into a visual on the coordinate
        plane. By plotting points (x, y) and connecting them, we can see
        patterns, read stories, and understand linear equations.
      </p>

      {/* 8. UPDATED Next Lesson */}
      <LessonHeader icon={Link} title="Next Lesson Preview" />
      <p>
        Now that you know how to build and read graphs, let's look at a
        special *type* of relation with its own set of rules.
      </p>
      <ResourceLink
        title="Next Up: Functions"
        url="/math/algebra/functions"
      />
    </LessonLayout>
  );
}