# Site Architecture Pilot — Algebra

This document defines the first migration pilot for the new site-architecture layer.

The pilot is intentionally semantic. Its job is to prove that page context, page roles, and shared navigation contracts reduce duplication **without changing the visual design of the current Algebra pages**.

## Why Algebra

Algebra currently contains nearly every structural case the site needs to support:

- field hub
- unit / learning-path page
- atomic lessons
- deeper child lessons
- active and placeholder nodes
- previous/next sequencing
- cross-unit continuation
- local vocabulary surfaces
- global vocabulary exceptions
- legacy and recently refined pages side by side

If the architecture works here, it is likely general enough to reuse elsewhere.

## Pilot principle

**Make semantic output equivalent before making visual output shared.**

The first migration should change where ancestry/navigation facts come from, not how the pages look.

## Page roles already clear enough to classify

### Algebra

Node: `formal.mathematics.algebra`

Role: **hub**

Reason: its primary job is to orient the learner across Pre-Algebra, Integrated Algebra, Linear Algebra, and Abstract Algebra.

### Pre-Algebra

Node: `formal.mathematics.algebra.pre-algebra`

Role: **unit**

Reason: its primary job is now the learning path from arithmetic/signed-number reasoning toward symbolic algebra.

Its eight current child routes are atomic lesson candidates:

1. Integers & Negatives
2. Order of Operations
3. Number Properties
4. Ratios & Proportions
5. Advanced Fractions
6. Exponents
7. Expressions
8. Solving for X

Do not automatically classify a child as a lesson merely because it is a leaf. During migration, verify that its scope is actually atomic. Exponents is already flagged for scope review.

### Integrated Algebra

Node: `formal.mathematics.algebra.elementary-algebra`

Role: **hub**

Reason: it organizes multiple topic families and representations rather than teaching one sequential unit.

### Algebra Fundamentals

Node: `formal.mathematics.algebra.elementary-algebra.fundamentals`

Role: **unit**

Its four current child routes are well-established atomic lessons:

- Expressions & Variables
- Equality & Equations
- Algebraic Properties
- Number Systems

This is the safest first code migration target because the ontology and rendered lesson behavior have already been refined repeatedly.

### Graphing Linear Equations

Node: `formal.mathematics.algebra.elementary-algebra.linear-equations`

Role: **lesson**

The current page has one clear conceptual center: equation ↔ graph ↔ points/forms for one line.

### Systems of Equations

Node: `formal.mathematics.algebra.elementary-algebra.systems`

Role: **lesson**

The current page teaches one coherent idea: a solution satisfies every equation in the system.

## Deliberately unresolved page role

### Algebraic Inequalities

Node: `formal.mathematics.algebra.elementary-algebra.inequalities`

Current structure:

- the parent route teaches substantial one-variable inequality content
- `Systems of Inequalities` is a child route

This is a legitimate hybrid during migration but should not be hidden by a convenient `pageKind` label.

Possible future structures:

### Option A — keep the hybrid

`Algebraic Inequalities` remains a foundational instructional page that also owns a deeper Systems child.

This accepts that page kinds are useful guidance rather than a perfect type system.

### Option B — normalize into a unit

```text
Algebraic Inequalities (unit)
  → One-Variable Inequalities
  → Systems of Inequalities
```

The current parent lesson content would move to a child route or the current route could become the first-child canonical page through routing/redirect decisions.

Do not choose between these options for data tidiness alone. Decide after rendered review and curriculum planning.

## Pilot implementation sequence

### 1. Add page-kind metadata only where verified

Begin with:

- Algebra → hub
- Pre-Algebra → unit
- Integrated Algebra → hub
- Algebra Fundamentals → unit
- the four Fundamentals children → lesson
- Graphing Linear Equations → lesson
- Systems of Equations → lesson

Do not classify the rest of Algebra until its page job is audited.

### 2. Migrate Algebra Fundamentals semantic context

For the Fundamentals unit and four lessons:

- resolve title/description from curriculum where appropriate
- derive breadcrumbs from `requireCurriculumPageContext`
- derive parent/up link
- derive previous/next active sibling navigation
- preserve existing visual classes and composition
- preserve cross-unit continuation as an explicit relationship when it is not a sibling edge

A successful migration should be visually boring.

### 3. Build the smallest useful shared semantic primitives

Only after the first route migration reveals the real API.

Likely candidates:

- `CurriculumBreadcrumbs`
- `SiblingNavigation`
- `ParentLink`

Do not begin with a universal `CurriculumPage` wrapper.

### 4. Test vocabulary page policy

The Fundamentals unit and children currently suppress the global Formal Science vocabulary trigger because they own local reference/vocabulary surfaces.

Use this branch to prototype node-ID page policy:

```ts
{
  vocabulary: "local"
}
```

The visible behavior must remain identical before removing pathname entries from the Formal Science layout.

### 5. Test mastery policy separately

Do not couple mastery migration to vocabulary migration.

First define what page kinds or curriculum states should expose mastery, then replace the hard-coded Foundations-only `MasteryDock` rule in a separate pass.

## Visual invariants during pilot

The semantic migration must not intentionally change:

- page background
- panel dimensions
- font sizes
- border treatment
- learning instrument
- examples
- instructional copy beyond canonical title/description corrections
- local subject identity

If the page looks different, treat that as a regression to inspect rather than proof the architecture is working.

## Architectural metrics

Run `npm run audit:architecture` before and after migration.

The pilot should reduce or eliminate findings for the migrated files in:

- manually declared breadcrumbs
- hard-coded previous/next lesson language
- pathname policy exceptions where page policy is adopted

Do not optimize the global count by rewriting untouched legacy pages.

## Definition of success

The pilot succeeds when:

- Algebra Fundamentals and its child lessons get ancestry/order from curriculum page context
- their rendered navigation remains semantically and visually correct
- a route move or label change would require substantially fewer page-file edits
- local page presentation remains independent
- no live route disappears
- planned nodes remain non-clickable
- the abstraction feels simpler than the manual code it replaces

If the new abstraction requires more exceptions than the old code, revise the architecture before migrating another branch.
