# Recursion & Recurrence Remaster Contract

## Identity

- **Route:** `/formal-science/mathematics/discrete/recursion-theory`
- **Stable node:** `formal.mathematics.discrete.recursion-theory`
- **Parent:** Discrete Mathematics
- **Page kind:** root unit
- **Learner-facing name:** Recursion & Recurrence

The stable route remains intact for existing links. The revised name matches the
unit's actual scope: recursive definitions, recursive procedures, and recurrence
relations. “Recursion theory” is identified as an older name for computability
theory and deferred to a future logic/computation horizon rather than blended
into this introductory unit.

## Preserve

- Tower of Hanoi as the signature recursive system.
- Direct manipulation of legal and illegal disk moves.
- A visibly self-similar environmental idea.
- The relationship between recursion, recurrence, and the call stack.

The remote hero image, joke definition, implementation labels, arbitrary unit
number, isolated local glossary, and unconstrained animated canvas are not
preservation targets.

## Learning contract

- **Goal:** Learners can identify a base case and a shrinking recursive step,
  trace how calls descend and return, and connect the process to a recurrence.
- **Prior knowledge:** Whole-number arithmetic and the idea that a procedure can
  take an input.
- **Mental model:** Recursion is a nested promise: reduce the current case to a
  smaller case, reach a directly solvable base, then return through the pending
  layers.
- **Evidence:** The learner can explain why the Hanoi procedure terminates,
  predict its move count for a fresh disk count, and reject a self-reference
  that does not approach a base case.
- **Misconception:** A function calling itself is automatically a valid
  recursive solution. It is not: the base case must be reachable and each
  recursive call must make progress toward it.

## Depth ceiling

The root exposes six planned direct lessons and stops there:

1. Recursive Definitions
2. Base Cases & Termination
3. Calls, Returns & the Stack
4. Recurrence Relations
5. Divide & Conquer
6. Recursive Structures & Induction

Computability, partial recursive functions, the recursion theorem, and related
foundations remain one deferred horizon rather than a speculative child tree.

## Canonical representation contract

One three-disk Tower of Hanoi case powers every coordinated representation.

- disk identities and colors remain stable;
- the canonical source, auxiliary, and target pegs are A, B, and C;
- the generated minimal trace contains exactly seven legal moves;
- the call structure is `H(3) -> H(2) -> H(1)` on the descent;
- the recurrence is `T(1)=1`, `T(n)=2T(n-1)+1`;
- the background is generated from the same disk and move data as the
  workbench rather than decorative near-mathematics.

A learner-selected two- through five-disk workbench case is explicitly labeled
as a new case; the recursive rule remains invariant.

## Page flow

1. **Navigate:** a two-leaf recursive learning ladder presents the six direct
   planned lessons before the demonstration.
2. **Orient:** the canonical three-disk problem shows the whole task and the
   seven-move destination.
3. **Explain:** a descent/return trace distinguishes base case, recursive move,
   pending work, and combination.
4. **Formalize:** the same trace becomes the Hanoi recurrence and a small exact
   move-count ledger.
5. **Do:** the Hanoi workbench supports guided step tracing and manual legal
   play with controls and consequences co-visible.
6. **Boundary:** termination, iteration, and computability terminology are kept
   distinct.
7. **Check:** a fresh recursive-definition transfer case and deterministic
   generated Hanoi practice provide reasoning and fluency evidence.
8. **Continue:** semantic sibling navigation returns to the Discrete
   Mathematics sequence.

## Visual grammar

- **World:** an enormous cyan-violet recursive stair / call tree built from the
  exact canonical Hanoi trace.
- **Foreground:** a vertical descent-and-return spine rather than the brass
  rings, specimen cabinet, or editorial table used in recent passes.
- **Materials:** dark blueprint glass, luminous edge lines, stacked translucent
  depth plates, and colored physical disks.
- **Motion budget:** one slow pulse traveling down and back through the world;
  no random values, pointer tracking, or full-screen redraw loop; motion stops
  under reduced-motion preferences.
- **Quiet zones:** dense explanation, workbench controls, and assessment use
  local frost while scenery remains visible through margins and between groups.

## Assessment contract

- **Transfer:** choose the recursive list definition that both has a base case
  and reduces the input. Feedback names why the other definitions fail.
- **Generated fluency:** seeded disk counts from two through eight ask for the
  minimal Hanoi move count. The deterministic checker uses `2^n - 1`, which is
  independently verified against the generated recursive trace.
- **Evidence language:** completion reports attempts and explanations, not
  mastery.

## Vocabulary contribution

The unit owns recursion, base case, recursive case, recurrence relation, call
stack, and termination. These stable-ID terms aggregate through Discrete
Mathematics, Mathematics, and Formal Science.

## Verification obligations

- curriculum ancestry and six non-clickable planned children;
- exact three-disk / seven-move parity across world, trace, formula, and
  workbench;
- legal-move generation for two through eight disks;
- deterministic practice fixtures and vocabulary aggregation;
- targeted React/Next lint, TypeScript, audits, collection regressions, and
  production build;
- metadata, ancestry, planned-route, and content checks in generated HTML;
- rendered desktop, narrower desktop, mobile, reduced-motion, guided playback,
  manual invalid move, reset, and assessment states when a trusted browser is
  available.

## Postmortem target

This page is better for learning because one recursive system stays intact as
the learner moves from physical puzzle to nested calls, recurrence, legal
action, and fresh-case evidence.
