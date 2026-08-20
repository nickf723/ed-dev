# Narrative & Fiction unit contract

## Identity

- **Route:** `/humanities/literature/narrative-fiction`
- **Curriculum node:** `humanities.literature.narrative-fiction`
- **Parent:** Literature
- **Page kind:** unit
- **Reason to exist:** Literature needs a bounded place where learners can separate the events of a story from the order and voice through which a narrative presents them before descending into narrower lessons.

## Learning contract

- **Learner goal:** Explain how a narrative is made by arranging events, filtering knowledge through a narrator or focalizer, and shaping change through character, setting, scene, conflict, and genre.
- **Primary mental model:** A narrative is an authored arrangement of story material. The same events can produce a different reading experience when presentation order, duration, perspective, or withheld information changes.
- **Evidence of understanding:** Given the same event set in two presentation orders, the learner can distinguish story order from plot order and explain what the reader knows at a selected reveal point.
- **Likely misconception:** Plot is not merely a synonym for “everything that happened,” and narrator is not automatically the author.

## Scope and depth ceiling

The unit owns one bounded layer of six planned lessons:

1. Narrator & Perspective
2. Story, Plot & Time
3. Character & Desire
4. Setting & World
5. Scene, Conflict & Structure
6. Genre & Convention

Free indirect discourse, unreliable narration, anachrony, characterization systems, world-building taxonomies, and genre histories remain inside these lessons or in a later visibly deferred horizon. They do not become another placeholder tree now.

## Knowledge structure and navigation

- **Organizing principle:** Six interdependent lenses around one narrative object, not six stages that every writer must follow.
- **Topology:** A stitched editorial folio. The direct lessons form the primary table of contents; the worked example appears afterward.
- **Live/planned truth:** The unit route is active. All six lesson routes are planned, visibly disabled, and omitted from live sidebar navigation.
- **Context:** Breadcrumbs, parent, sibling position, and children come from `requireCurriculumPageContext`.

## Representation contract

One original four-event station story powers:

- the deterministic story-thread background;
- the opening event register;
- the plot-order editor;
- the reader-knowledge reveal ledger;
- the transfer check.

Event IDs, labels, chronology, presentation order, colors, and shapes live in `narrativeModel.ts`. Marks keep their event identity in every representation.

## Interaction and assessment

- **Primary instrument:** Toggle between chronological story order and narrated plot order, then inspect one reveal step at a time.
- **Meaningful default:** Plot order begins with the later map delivery, creating a question before its earlier causes are disclosed.
- **Cause and effect:** Selecting a step highlights the presented event and updates the co-visible reader-knowledge ledger.
- **Transfer check:** Identify what changed when the ending is presented first while the underlying events remain the same.
- **Deterministic checker:** The answer is `plot order`; feedback explains why the story events have not changed.

## Vocabulary contract

Narrative-specific terms are registered at `humanities.literature.narrative-fiction`. The Literature scope automatically aggregates those terms as a child group. A Humanities layout supplies the shared vocabulary drawer only on routes with a derived scope, replacing the root Literature page's isolated local lexicon.

## Visual identity

- **World:** A dark editorial cutting table with four colored event strips, thread lines, crop marks, marginal notes, and a slow reading-head sweep.
- **Material:** Ink, tracing paper, thread, and editing grease pencil rather than the recent network, specimen, or brass counting worlds.
- **Dominant axis:** Horizontal presentation order with vertical evidence/reveal depth.
- **Motion:** One slow deterministic reading-head sweep; disabled under reduced motion.
- **Foreground rhythm:** lesson folio -> scenery corridor -> canonical model -> editing instrument -> boundaries/check -> continuation.

## Verification contract

- targeted lint and TypeScript;
- deterministic narrative-model fixtures;
- vocabulary aggregation;
- architecture, readability, and remaster audits;
- collection regressions;
- production build and generated-HTML checks for metadata, ancestry, active parent route, and planned lesson non-links;
- rendered desktop, narrower desktop, mobile, reduced-motion, interaction, focus, and zoom states when the trusted browser runner is available.

## Rotation

This pass rotates from a Formal Science counting unit into a Humanities editorial unit. After publication, return to **Formal Science -> Mathematics -> Discrete Mathematics -> Recursion Theory**, preserving its recursive-system and Hanoi strengths while changing the dominant material and interaction grammar again.
