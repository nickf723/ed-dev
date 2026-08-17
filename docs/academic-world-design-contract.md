# Academic World Design Contract

Education Station uses neoglassmorphism as a shared interface shell, not as the identity of every page.

The shell provides cohesion: anchored context, legible surfaces, stable controls, responsive behavior, and shared interaction conventions. The subject provides the world: navigation geometry, environment, motion, data organization, typography, and the learner's central action.

> One interface language. Many academic worlds.

## 1. Navigation is the first job of a hub

Before adding explanatory widgets, a hub must reveal its direct curriculum children and the relationship among them.

The first meaningful viewport after the anchored page identity should normally contain the primary navigation structure. Cross-links, collections, tools, examples, and supporting instruments follow it.

A page brief must name:

- the primary navigation task;
- the direct children or principal destinations;
- the topology that expresses their relationship;
- the first-viewport center of gravity;
- the secondary navigation layer.

A collection browser may be central to a page without becoming a false peer of the page's direct academic branches.

## 2. Every substantial page chooses an academic world

An academic world is a constrained design family that defines:

- what place the learner feels they have entered;
- what action they perform there;
- which topologies naturally belong;
- which visual shortcuts are forbidden.

The initial registry includes:

- **Living exhibit** — conservation parks, museums, habitat collections, and organism atlases.
- **Galactic expedition** — scale-aware journeys, observatory missions, and cosmic waypoints.
- **Archive** — evidence, provenance, chronology, records, and historical reconstruction.
- **Laboratory** — controlled changes, measurable states, trials, and comparisons.
- **Observatory** — source, signal, instrument, and inference.
- **Debate chamber** — questions, claims, reasons, objections, and revisions.
- **Creative studio** — making, arranging, performing, critiquing, and revising.
- **Marketplace** — actors, incentives, resources, exchange, and feedback.
- **Field station** — situated observation, sampling, traces, uncertainty, and place.
- **Workshop** — parts, assembly, constraints, testing, and diagnosis.

The registry lives in `lib/page-system/academic-worlds.ts` and is editable through Page Foundry briefs.

## 3. Environment must carry subject meaning

A semantic environment is not a palette plus particles.

Every visible environmental layer must be explainable:

- a trail means navigation;
- a habitat stratum means environmental constraint;
- an orbit means a physical relationship;
- a waypoint means a curriculum destination;
- a river means accumulated change through time;
- a branch means divergence or dependency;
- a signal wave means information traveling from source to observer.

If removing the background loses only color, the environment is decorative and fails the contract.

## 4. Different academic worlds should not collapse into the same composition

The following substitutions are not sufficient differentiation:

- changing blue glass to green glass;
- swapping icons while preserving the same card grid;
- adding topic-themed particles behind identical panels;
- renaming a dashboard as a lab, archive, or atlas;
- placing a generic network behind every interconnected subject.

A page should remain recognizably subject-specific in grayscale through its geometry, hierarchy, and interaction.

## 5. Content follows a deliberate hierarchy

The default order for a substantial hub is:

1. anchored identity and ancestry;
2. primary direct-child navigation;
3. the page's central explanatory model or browsing surface;
4. supporting evidence and instruments;
5. secondary cross-links and deeper routes.

A page may depart from this order only when its page type requires a different learner flow.

## 6. One viewport, one center of gravity

The first viewport should not contain several equally loud systems.

A Zoology hub may center an exhibit campus. An Astronomy hub may center an expedition route. A Chemistry hub may center a transformation chamber. Supporting stats, filters, and explanations should frame that object rather than compete with it.

## 7. Keep one interaction loop together

A signature widget is not merely a large visual. It is a loop connecting a prompt, controls, a visible response, and an interpretable result.

- Do not place a large introduction between the learner and the controls it explains.
- Do not separate a selector from the object it changes or a result from the controls that produced it.
- At 1440×900, the primary control-response loop should normally fit below the sticky header without requiring a scroll.
- At 1366×768, the control and response should remain together even when supporting prose moves below.
- Use the compact scene composition for control-rich laboratories and observatories.
- Reserve roomy stages for navigation or exploration that does not depend on simultaneous readouts.
- Large titles establish hierarchy, but may not consume the space required for the page's first usable action.

## 8. Extraction grows Studio without flattening pages

Every new academic world should leave behind reusable parameters, not a mandate to reuse its entire composition.

Useful extraction includes:

- topologies;
- semantic backgrounds;
- data adapters;
- detail drawers;
- comparison widgets;
- academic-world metadata.

Reuse the grammar when the relationship matches. Do not force a Zoology exhibit campus onto History merely because the component exists.

## 9. Academic-world preflight

Before a page enters review, verify:

- **World:** The environment and interaction metaphors are explicit.
- **Navigation:** Direct children are the first prominent destinations.
- **Meaning:** Major visual elements correspond to real subject relationships.
- **Difference:** The page is not a recolored version of the previous page.
- **Focus:** The first viewport has one primary object or decision.
- **Viewport:** The primary control-response loop remains together at 1440×900 and substantially intact at 1366×768.
- **Hierarchy:** Supporting content follows the navigation rather than obscuring it.
- **Extraction:** Reusable ideas are registered without erasing page-specific character.

This contract extends the Design Constitution and is enforced by Page Foundry version 2.
