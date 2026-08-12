# Guided Lesson Flow

This document defines the default attention and sequencing model for atomic lessons in Education Station 64.

The goal is not to hide information. The goal is to **control when information asks for attention**.

A strong lesson should feel intuitive before it feels comprehensive. Learners should encounter a small meaningful situation, see the idea behave, understand why it behaves that way, manipulate it, practice it, and only then absorb exceptions and extensions.

## Default flow

Use this sequence as the starting grammar for atomic lessons:

1. **Introduce** — pose one concrete question, situation, or tiny puzzle.
2. **Show** — let the primary model reveal the answer visually or behaviorally.
3. **Explain** — name the parts and relationships the learner has just observed.
4. **Try** — give the learner meaningful control over the same model.
5. **Practice** — ask the learner to predict, classify, construct, or test without merely copying the demonstration.
6. **Extend** — introduce an exception, transfer case, richer composition, or the next lesson.

This is the learner-facing version of the broader Orient → Model → Explain → Manipulate → Test → Generalize → Contrast → Connect sequence in the Learning Design Playbook.

## Game-tutorial intuition

Good game tutorials rarely open with a manual and every mechanic visible at once. They create a safe situation where one action matters, let the player see the consequence, then add vocabulary and complexity after the action already makes sense.

Educational pages should borrow that interaction logic:

- demonstrate before defining when the model permits it
- let the learner act before exposing every parameter
- introduce one new degree of freedom at a time
- put explanation next to the consequence it explains
- increase complexity only after the simpler state is legible
- reuse the same visual object across explanation, manipulation, and practice when possible

The learner should often think **“I see why”** slightly before they could give the formal explanation.

## Attention budget

An atomic lesson should normally have **one dominant learning task at a time**.

Avoid showing all of these at full visual strength simultaneously:

- introductory prose
- reference atlas
- primary model
- sandbox controls
- exception callout
- secondary representation
- assessment
- next-topic navigation

All may belong on the page, but they should arrive in sequence or sit behind lightweight progressive disclosure.

A useful heuristic:

> If the learner cannot tell what to look at or do first within a few seconds, the page has exceeded its attention budget.

## Progressive disclosure, not artificial locking

Guidance should not become bureaucracy.

- A learner may jump between lesson stages when useful.
- Do not require fake completion badges or arbitrary mastery gates to reveal ordinary content.
- Preserve browser navigation and curriculum navigation.
- Optional reference material may be collapsed until needed.
- Free-form sandboxes should come after guided cases, but experienced learners may still access them directly.
- A stage transition should reduce cognitive load, not simulate a slideshow for its own sake.

## Introduce

The opening should answer: **Why should I care about this object or relationship?**

Prefer:

- one tiny puzzle
- one surprising comparison
- one concrete prediction
- one visible mismatch between expectation and result

Avoid opening with:

- a glossary
- a four-panel dashboard
- several definitions
- a fully configurable sandbox
- every exception to the rule

The first interaction should be understandable before instructions are needed.

## Show

Use the clearest primary representation and make the important structure visible.

Examples:

- shade the solution region of `x < 3`
- move one point and show slope change
- balance both sides of an equation
- rotate a vector and show its components
- highlight overlap between two sets

Do not yet ask the learner to manage several independent controls.

## Explain

Now name what the learner saw.

For example, after showing `x < 3` on a number line:

- **boundary** = where equality would hold
- **direction** = which side is allowed
- **inclusion** = whether the boundary belongs

This ordering makes terminology a label for an existing mental model instead of a memorization burden.

## Try

Give the learner control over the same causal system.

Start with curated contrasts. Only then expose a fuller sandbox.

The learner should be able to predict a change and immediately see whether the prediction was right.

## Practice

Practice must require knowledge, not familiarity with the controls.

Good prompts include:

- Which representation matches this statement?
- What changes if this parameter becomes negative?
- Does this candidate satisfy the rule?
- Which example violates the definition?
- Build an example that satisfies these constraints.

Give explanatory feedback. A green check or red X alone is not instruction.

## Extend

Only after the core idea works should the lesson widen the lens.

Good extensions include:

- an exception or boundary condition
- a compound version of the idea
- transfer to a different representation
- a nearby misconception
- a child lesson that combines the current idea with another constraint

The extension should feel like **“now you are ready for this”**, not like another unrelated widget.

## Visual hierarchy

The active learning stage should be visually dominant. Other stages may remain visible as quiet navigation, but they should not compete with the active task.

Prefer:

- narrower reading/model widths on atomic lessons
- one strong container instead of several equal dashboards
- strong darkening or translucency behind instructional surfaces when the page background is visually active
- calm secondary labels
- natural vertical growth
- optional reference details below the main task

Avoid:

- six equally bright cards
- unrelated animations running simultaneously
- microtext status chrome
- decorative module numbers that masquerade as pedagogy
- important information available only on hover

## Definition of done

A guided atomic lesson is ready for visual review when:

- the first action or question is obvious
- the learner sees the concept before receiving a definition dump
- the explanation names visible relationships
- the primary interaction changes one coherent model
- a real practice task provides explanatory feedback
- exceptions and extensions arrive after the core model
- optional complexity is available without dominating the initial state
- navigation remains accessible
- the page can grow naturally without clipping
- the learner is never presented with several equally urgent tasks at once

This flow is a default educational grammar, not a universal visual template. Biology, algebra, history, programming, music, and other subjects should still develop their own local visual and interaction dialects.