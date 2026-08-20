# Academic world scene composition

Academic worlds are behavioral visual systems, not wallpapers. A page should expose enough of the world for its motion, structure, or atmosphere to explain the subject, while protecting the learner's attention when a foreground task becomes demanding.

## Shared primitives

- `SceneFrame` owns the page-level background, sticky header, width, and world director.
- `WorldWindow` reserves an intentionally open stage and gives the learner direct control over important world states.
- `Surface` provides four opacity roles: `solid`, `glass`, `ghost`, and `open`.
- `WorldDirector` coordinates section focus, hover, and pinned scene state.
- `WorldSceneFocus` lets a section retune the world without wiring every internal control to the background.

## Three attention modes

A mature academic world should support three modes, even when the first implementation only exposes two.

### Ambient

The world establishes page identity through slow, visible behavior while the learner reads or navigates.

Examples:

- packets moving through a computing stack;
- wind vectors drifting across a weather map;
- organisms moving through habitat flows;
- signals crossing astronomical scales;
- chronology bands moving through an archive.

### Showcase

The world becomes the main explanatory object. A dedicated viewport, map, laboratory, or scene selector may raise motion, contrast, and detail because the learner is studying the world itself.

### Quiet

The world reduces event density, contrast, or motion near a control-rich widget. Quiet mode does not mean invisible. It preserves subject identity while preventing ambient animation from competing with the foreground reasoning loop.

## Composition rules

1. Keep roughly one third of the first desktop viewport visually open when the subject world is a major part of the page identity.
2. Use `solid` only for sustained reading, dense controls, or results that require maximum contrast.
3. Use `glass` for primary content that can share space with the world.
4. Use `ghost` for labels, navigation, short explanations, and local instruments inside an exposed scene.
5. Use `open` for scenery corridors, transitions, and world-first moments.
6. Do not solve contrast by making every panel opaque. Use local scrims behind text.
7. Meaningful text should normally be at least 12 pixels; body copy should normally be 15 to 17 pixels.
8. Every first viewport exposes at least one unobstructed, readable behavior from the world engine. A color wash without legible motion or relationships does not count.
9. Adjacent pages in the same branch use different dominant motion grammars. Recoloring particles, orbits, lines, or nodes is not sufficient differentiation.
10. Mobile layouts include a dedicated world window or scene slice instead of depending on narrow gutters.
11. World engines should support ambient, showcase, and thumbnail presentations over time.
12. Foreground and background may share state, but synchronization must earn its attention cost.
13. Prefer section-level focus, selected concept, scroll chapter, completed state, or slow aggregate response over mirroring every internal widget update.
14. A demanding widget should not trigger high-frequency background changes while the learner is operating it.
15. Different pages may use different relationships between world and content: reactive simulation, calm ambient architecture, scroll-directed scenes, static procedural diagrams, environmental storytelling, or delayed summary feedback.

## Functional viewport budget

A signature interaction is one reasoning loop: prompt, controls, visual response, result, and interpretation. Those pieces remain together.

1. At 1440 by 900, the complete primary widget should normally fit beneath the sticky header.
2. At 1366 by 768, controls and visual response stay visible together even when supporting prose moves below.
3. Put explanation beside a control-rich widget instead of stacking a large introduction above it.
4. Use `WorldWindow density="compact"` when one laboratory contains dependent controls and readouts.
5. Use the roomy world-window composition for navigation, passive exploration, or scenes whose meaning does not depend on simultaneously visible controls.
6. Avoid nesting a 500 pixel or taller canvas beneath another large minimum-height container.
7. Prefer a 520 to 640 pixel total desktop budget for the first signature stage after the header.
8. Do not separate a selector from the object it changes, or a result from the controls that produced it.
9. When mode switches change the learner question, controls, representation, and interpretation, split the modes into separate widgets.
10. Review the longest label, open panel, selected state, and smallest supported desktop height before calling the widget complete.

## Component-role separation inside scenes

- Navigation uses directional cues, routes, status, and strong click affordance.
- Controls use instrument framing and remain adjacent to their response.
- Metrics use compact readout grammar.
- Principles and explanation use editorial or continuous-band grammar, not destination cards.
- Non-clickable content avoids lift-on-hover, arrows, and destination-style footers.
- A scene should not become a tiled wall of identical rounded glass panels.

## Pilot mappings

### Astronomy

- `local`: nearby systems, orbital motion, stellar scale
- `galaxy`: differential rotation, dust, lensing, populations
- `web`: clusters, filaments, expansion, cosmological scale
- quiet mode reduces moving signal density around reading and controls

### Zoology

- `habitat`: environmental flow, movement, resources
- `lineage`: branching inheritance and trait transmission
- `ecology`: energy flow, predation, mutualism, decomposition
- habitat controls may update the world slowly rather than forcing every organism to react instantly

### Chemistry

- `elements`: identity, periodic organization, and electronic inventory
- `structures`: bonding, geometry, and emergent material properties
- `reactions`: collisions, rearrangement, conservation, and energy flow
- `sharing`: covalent density distributed across nuclei
- `transfer`: charge separation, electric fields, and ionic lattices
- `shape`: electron-domain repulsion and molecular geometry
- `forces`: dipole alignment, intermolecular networks, and thermal disruption
- control-rich chemistry laboratories use compact composition and a quieter ambient field

### Algorithms

- `overview`: traversal, ordering, and growth coexist as a slow execution environment
- `traversal`: graph relationships and frontier movement receive emphasis
- `sorting`: ordering lanes and comparison structure receive emphasis
- `growth`: linear-scale growth curves receive emphasis
- internal queue steps, swaps, and slider movements remain inside their widgets rather than driving the full-page background

### Computer Science

- `overview`: a calm scheduler moves tasks through the computing stack
- `hardware`: processors and memory receive emphasis
- `software`: runtime layers and instruction flow receive emphasis
- `algorithms`: procedure and representation receive emphasis
- `artificial-intelligence`: model inference receives emphasis
- `theory`: state and computability structures receive emphasis
- `security`: trust boundaries and packet inspection receive emphasis

## Review loop

Run:

```bash
npm run audit:readability
npm run build
```

Then inspect:

- 1440 by 900;
- 1366 by 768;
- tablet;
- mobile;
- reduced motion;
- longest-content state;
- active widget state;
- background quiet state;
- default and focused navigation states.

The first desktop screenshot must show prominent navigation on non-lesson pages, the signature interaction when present, and at least one legible academic-world behavior without forcing the learner to fight the background for attention.
