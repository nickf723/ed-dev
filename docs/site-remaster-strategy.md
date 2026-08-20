# Education Station 64 Site Remaster Strategy

This document governs the whole-site visual and instructional remaster that begins at the homepage.

## 1. Every route owns a recognizable visual identity

Shared systems are infrastructure, not sameness.

Every substantial page must make deliberate choices for:

- **field / background:** a subject-specific environment, diagrammatic texture, motion system, or spatial metaphor;
- **palette:** a local palette that may inherit from the domain but is visibly specialized for the route;
- **geometry:** cards, rails, maps, diagrams, panels, and negative space should reflect the page's academic structure;
- **interaction language:** the primary interaction should feel native to the discipline and topic;
- **density:** compact reference pages may condense; rich lessons and hubs should breathe.

A child may reuse its family's rendering engine, glass primitives, particles, grids, typography, or animation code. It must still specialize those primitives enough that screenshots of neighboring pages are distinguishable without reading the title.

### Family resemblance, not cloning

Good reuse:

- astronomy pages share a star-field engine but vary scale, orbit geometry, spectral palette, and instrument framing;
- algebra pages share equation typography and balance primitives but differ in background motif, palette, and procedural geometry;
- ethics pages share branching-reason linework but different branches emphasize different conceptual structures;
- biology pages share organic material language while zoology, botany, cytology, and anatomy remain visually distinct.

Bad reuse:

- identical black glass cards with only the accent hue changed;
- one generic aurora/grid/noise background copied throughout a domain;
- repeated bento layouts when the academic relationships differ;
- turning a successful page into a universal page template.

## 2. Education Station 64 is the product name

Use **Education Station 64** or **ES64** for the product.

Avoid legacy product labels such as:

- Knowledge Network;
- The Knowledge Web;
- Knowledge Graph when it is being used as the product name rather than describing an actual graph structure.

Words such as knowledge, graph, network, atlas, map, or library may still be used descriptively when they accurately describe a feature or academic structure.

## 3. Remaster traversal: rotating breadth-first search

Pure DFS risks producing long runs of pages shaped by one subject's recent design habits. Pure BFS can become shallow and leave tiny dependency clusters unfinished.

The default is therefore **rotating BFS with short local DFS bursts**.

### Default cycle

1. Homepage / global shell.
2. One Formal Science page.
3. One Natural Science page.
4. One Social Science page.
5. One Humanities page.
6. One Applied Science page.
7. One Interdisciplinary page.
8. Return to the next breadth layer and repeat.

The exact order may change when a page has stronger dependency or reuse value, but consecutive work should intentionally change academic modes.

### Local DFS burst

Dive 1–3 levels when:

- a parent and child share a broken ontology that should be repaired together;
- a new reusable instrument or background family needs one child test;
- a route move would leave breadcrumbs/sidebar/navigation inconsistent;
- a tiny lesson sequence benefits from one coherent pass.

Then return to the rotating breadth sweep.

## 4. Why we rotate

Changing domains between passes prevents local design habits from becoming accidental global law.

We want cross-pollination:

- a physics sidecar can improve a history source inspector;
- an ethics inquiry map can improve a biology field atlas;
- an algebra derivation trace can inspire a code execution trace;
- a music spatial composition can later improve a wave lesson.

The constitution captures the invariant lesson. The next page should reinterpret it rather than imitate the previous page.

## 5. Remaster order of operations

For each route:

1. inspect the current curriculum role and direct relationships;
2. state the page's cognitive job in one sentence;
3. choose a domain-native navigation or lesson topology;
4. choose a distinct local palette and background field;
5. identify the primary learner object or question;
6. rebuild structure before decorative polish;
7. verify responsive behavior and route integrity;
8. commit and push the coherent change to `main`, then verify the remote ref;
9. move to a different academic mode unless a short local DFS burst is justified.

## 6. Homepage role

The homepage is not a dashboard or marketing hero. It is the first cognitive map of the curriculum.

Its job is to:

- present the five canonical knowledge branches plus the Interdisciplines relational surface as one coherent field;
- expose the first curriculum layer on hover/focus without requiring a click;
- make the hierarchy feel explorable before the sidebar is needed;
- establish the site's sleek neo-technical visual baseline without forcing child pages to copy it;
- use real curriculum data rather than decorative fake branches.

The homepage may be more spatial and wide-screen than lesson pages because navigation, not sustained reading, is its primary task.
