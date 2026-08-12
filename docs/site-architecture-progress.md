# Site Architecture Progress

This file records implementation progress for the Education Station 64 product/site architecture work.

It is intentionally separate from visual page verification. Architecture changes should make semantic ownership clearer without quietly being treated as visual approval.

## Current branch

`site-architecture`

Base: `main` at the inequality separation work.

## Foundation complete on branch

- route pages own the page-level `<main>` landmark; `MainContent` is now a layout `<div>`
- optional curriculum page kinds exist: hub, unit, lesson, reference, tool
- `lib/curriculum/page-context.ts` resolves ancestry, breadcrumbs, parent, siblings, active previous/next sibling, children, and active/planned child state
- curriculum route normalization treats trailing slashes and repeated slashes as the same semantic route
- `lib/page-policy.ts` provides a stable node-ID keyed home for product behavior that should not live in academic ontology
- `npm run audit:architecture` reports migration debt without failing builds

## Algebra curriculum migration

The focused Algebra module is now self-contained for the refined subtree.

Previously, `registry.ts` had to patch in:

- four Algebra Fundamentals children
- Systems of Inequalities under Algebraic Inequalities

Those nodes now live directly in `lib/curriculum/algebra.ts`, and the Algebra-specific child patch entries have been removed from the registry.

Verified page-kind classifications currently encoded:

- Algebra → hub
- Pre-Algebra → unit
- Integrated Algebra → hub
- Algebra Fundamentals → unit
- Expressions & Variables → lesson
- Equality & Equations → lesson
- Algebraic Properties → lesson
- Number Systems → lesson
- Graphing Linear Equations → lesson
- Systems of Equations → lesson
- Systems of Inequalities → lesson

Algebraic Inequalities remains deliberately unclassified because its current parent-page-plus-child structure is still an ontology decision rather than a type-system problem.

## Page-policy pilot

The following nodes are explicitly marked as owning local vocabulary/reference behavior:

- Algebra Fundamentals
- Expressions & Variables
- Equality & Equations
- Algebraic Properties
- Number Systems

The current Formal Science pathname blacklist remains in place for now so visible behavior does not change while preview verification is unavailable.

Do not make the global Vocabulary drawer import the whole curriculum registry merely to consume this policy. The intended future flow is:

server-resolved page context/policy → small serializable contract → client utility

## Algebra hub pilot

`/formal-science/mathematics/algebra`

Before:

- whole page was a client component
- client imported the full curriculum registry
- client manually declared breadcrumbs
- one small equivalence rail required state

Now:

- page is a server component
- branches come from `requireCurriculumPageContext`
- breadcrumbs come from page context
- page asserts its classified hub role
- the equivalence rail is the only extracted client island
- visual classes/composition were intentionally preserved

## Algebra Fundamentals unit pilot

`/formal-science/mathematics/algebra/elementary-algebra/fundamentals`

Before:

- whole page was a client component
- client imported the curriculum registry to build four lesson cards
- ancestry was manually repeated in the header
- the page remained client-side partly because it passed a no-op callback to Assessment

Now:

- page is a server component
- lesson destinations come from page context
- breadcrumb ancestry comes from page context
- the short final crumb `Fundamentals` remains a local presentation alias
- page asserts its classified unit role
- Assessment remains a client island and no longer receives an unnecessary no-op callback

## Deferred until rendered verification

### Integrated Algebra

It still imports curriculum data from a client page and owns a larger synchronized line/table instrument. Migrate it by extracting the actual instrument as a client island rather than performing a blind component split.

### Fundamentals atomic dynamic route

The `[lesson]` page is intentionally interactive and currently owns all four lesson instruments in one client file. Its next architecture step should be a server route wrapper that resolves the curriculum node and passes a small semantic contract into the client lesson implementation.

Do not duplicate the curriculum into a new client-side lesson map just to eliminate the registry elsewhere.

### Formal Science vocabulary policy

The node-ID policy exists, but the visible global/local trigger behavior still uses the legacy pathname list. Replace it only when a server-resolved page policy can reach the client utility without bundling the broad curriculum registry.

### MasteryDock

Still a hard-coded Foundations special case. Keep separate from the vocabulary migration and define mastery semantics before generalizing the UI.

### Developer tools

Structure Scan / X-Ray still lives in normal sidebar chrome. Add an explicit development-tools visibility contract before removing or relocating it.

## Next recommended implementation step

Once a reliable preview/build is available:

1. verify Algebra hub and Algebra Fundamentals render identically after the server/client boundary changes
2. run `npm run audit:architecture`
3. migrate Integrated Algebra by extracting only its interactive representation studio
4. introduce the first shared semantic navigation primitive only after the three pilot pages reveal the real API
5. begin replacing Formal Science pathname utility exceptions with resolved page policy

## Success metric

The architecture is improving when a page can increasingly specify:

- curriculum node ID
- local learning model/content
- local presentation
- deliberate policy exceptions

while no longer manually specifying:

- ancestry
- sibling URLs
- child status
- duplicate curriculum descriptions
- global utility pathname exceptions
- client-side access to the full curriculum graph for static semantic facts
