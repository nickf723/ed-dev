# Site Architecture Progress

This file records implementation progress for the Education Station 64 product/site architecture work.

It is intentionally separate from visual page verification. Architecture changes should make semantic ownership clearer without quietly being treated as visual approval.

## Current branch

`site-architecture`

Base: `main` at the inequality separation work (`2bcd870`).

The branch contains only product/repository architecture work plus narrow Algebra migration pilots. It does not contain the separate academic Architecture-subject experiment.

## Foundation complete on branch

- route pages own the page-level `<main>` landmark; `MainContent` is a layout `<div>`
- optional curriculum page kinds exist: hub, unit, lesson, reference, tool
- `lib/curriculum/page-context.ts` resolves ancestry, breadcrumbs, parent, siblings, active previous/next sibling, children, and active/planned child state
- `lib/curriculum/route.ts` provides one canonical path-normalization rule
- registry href indexing, duplicate-route validation, and href lookup all use the same normalized path semantics
- `lib/page-policy.ts` provides stable node-ID policy plus domain-root policy for product behavior that should not live in academic ontology
- the root server layout resolves page-policy identity into a small serializable route snapshot
- `PagePolicyProvider` exposes only resolved policy/current identity to client utilities
- `npm run audit:architecture` reports migration debt without failing builds
- route/curriculum parity is included in the architecture audit as an informational source-level report
- developer tooling now has an explicit visibility gate

## Global shell boundary

### Sidebar navigation

Before:

- `Sidebar` imported `NAVIGATION_DATA`
- `NAVIGATION_DATA` imported the curriculum registry
- the persistent client sidebar therefore depended directly on curriculum composition machinery

Now:

- root layout builds the serializable navigation snapshot on the server
- `AppShell` receives that snapshot as data
- `Sidebar` receives plain labels/routes/domain IDs and owns only interaction state such as expansion and mobile behavior
- domain icons are resolved locally from the small domain-definition map rather than serialized as component functions
- the curriculum graph no longer needs to be imported by the client sidebar

### Developer tools

Structure Scan / X-Ray remains available, but it no longer needs to be ordinary learner chrome.

Current gate:

- local development enables developer tools automatically
- deployed builds hide the sidebar developer footer by default
- `?devtools=1` enables developer tools for the current browser session
- `?devtools=0` clears the session gate

The sidebar remounts when the gate changes so an active X-Ray state cannot remain mounted after developer tools are disabled.

This is currently a visibility gate rather than a code-splitting optimization. If bundle size becomes meaningful later, X-Ray can be lazy-loaded or moved behind a dedicated developer surface.

### Page policy

Page policy now distinguishes product behavior from academic ontology.

Current policy supports:

- `vocabularyTrigger: global | local | none`
- `masterySurface: global | local | none`

Curriculum-backed page policy is authored by stable node ID. Domain-root policy is authored by stable domain ID because domain landing pages are not `CurriculumNode` records.

The server resolves those IDs to canonical routes and sends the client shell only:

- optional curriculum node ID
- canonical page/domain label
- resolved policy

### Formal Science vocabulary

Before:

- `app/formal-science/layout.tsx` carried a long list of literal routes
- many entries were duplicated solely for trailing-slash variants
- every new refined Algebra route required another path exception

Now:

- the Formal Science layout has no vocabulary pathname blacklist
- Formal Science root policy is keyed by domain ID
- Mathematics / Algebra / Integrated Algebra and refined Algebra lessons use node-ID policy
- Pre-Algebra and Algebra Fundamentals families are marked `local` because they own local reference/vocabulary surfaces
- hubs/refined lessons that intentionally expose no floating global vocabulary control are marked `none`
- route normalization handles trailing slashes/query/hash variants centrally
- `FormalScienceVocabulary` consumes only resolved client policy; it does not import curriculum

### MasteryDock

Before:

- the global client dock imported the curriculum registry
- it compared the current node's parent against one hard-coded Foundations node ID
- it used that special case to decide whether mastery belonged on the page

Now:

- the seven existing Foundations child pages explicitly declare `masterySurface: "global"`
- the server-resolved policy snapshot supplies node ID and label
- `MasteryDock` consumes page-policy context only
- it no longer imports the registry, looks up ancestry, or hard-codes the Foundations parent ID
- visible eligibility is intended to remain identical to the existing implementation

## Route / graph parity audit

`npm run audit:architecture` now supplements its architecture-smell scan with a source-level route parity report.

It reports:

- concrete academic page routes that have no matching curriculum route literal
- curriculum route literals that have no concrete page and are not covered by a matching dynamic route
- dynamic academic route pages separately for human review

Dynamic routes are converted into matchers so a route such as `[lesson]` can cover real curriculum descendants without being compared as a literal string.

The parity report stays informational because source scanning cannot reliably distinguish every active node from every planned placeholder. It is a discovery tool, not an automatic deletion list.

## Curriculum composition

### Focused module manifest

Focused curriculum modules now register through:

`lib/curriculum/manifest.ts`

Current modules preserve the existing application order:

1. Algebra
2. Group Theory
3. Logic
4. Computer Science
5. Biology

Order remains explicit because a more specific module may replace a node inside a broader migrated module.

`registry.ts` now owns composition behavior rather than knowing every focused module import directly.

The broad `tree.ts`, root additions, and child additions remain migration compatibility layers for untouched branches. Do not remove them through a mass rewrite.

### Algebra module migration

The focused Algebra module is self-contained for the refined subtree.

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

## Server / client migration pilots

### Algebra hub

Route: `/formal-science/mathematics/algebra`

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

### Pre-Algebra unit

Route: `/formal-science/mathematics/algebra/pre-algebra`

Before:

- whole unit was a client component despite having no page-level state
- client imported the curriculum registry to build the eight-route learning path
- an Assessment callback existed only to `console.log` the final score
- the parent Algebra route was hard-coded in the unit component

Now:

- page is a server component
- eight child destinations come from page context
- page asserts its classified unit role
- parent/up navigation comes from curriculum containment
- VocabApplet and Assessment remain the actual client islands
- the no-op quiz callback was removed
- visible composition/copy were intentionally preserved

### Algebra Fundamentals unit

Route: `/formal-science/mathematics/algebra/elementary-algebra/fundamentals`

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
- Assessment remains a client island and no longer receives an unnecessary callback

### Mathematics hub

The Mathematics route already had a healthy partial boundary before this architecture work:

- server route resolves curriculum children
- interactive `MathematicsHub` receives a plain node snapshot

Do not rewrite it merely for symmetry. Future work may pass semantic breadcrumbs/page role through the same contract, but its existing data boundary is not a priority defect.

## Deferred until rendered verification

### Integrated Algebra

It still imports curriculum data from a client page and owns a larger synchronized line/table instrument. Migrate it by extracting the actual instrument as a client island rather than performing a blind component split.

### Fundamentals atomic dynamic route

The `[lesson]` page is intentionally interactive and currently owns all four lesson instruments in one client file. Its next architecture step should be a server route wrapper that resolves the curriculum node and passes a small semantic contract into the client lesson implementation.

Do not duplicate the curriculum into a new client-side lesson map just to eliminate the registry elsewhere.

### Shared semantic navigation primitives

Do not introduce a universal page frame yet. Once the pilot pages can be rendered, build only the smallest primitives proven by the migration, likely breadcrumbs, parent/up navigation, and sibling navigation.

## Next recommended implementation step

Once a reliable preview/build is available:

1. verify Algebra hub, Pre-Algebra, and Algebra Fundamentals render as intended after server/client boundary changes
2. run `npm run audit:architecture` and review the new route/graph parity findings
3. verify learner-mode sidebar with developer tools hidden, then verify `?devtools=1` and `?devtools=0`
4. migrate Integrated Algebra by extracting only its interactive representation studio
5. introduce the first shared semantic navigation primitive only after the pilot reveals the real API

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
