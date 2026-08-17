# Academic world scene composition

Academic worlds are behavioral visual systems, not wallpapers. A page should expose enough of the world for its motion and relationships to explain the subject.

## Shared primitives

- `SceneFrame` owns the page-level background, sticky header, width, and world director.
- `WorldWindow` reserves an intentionally open stage and gives the learner direct control over the world’s important states.
- `Surface` provides four opacity roles: `solid`, `glass`, `ghost`, and `open`.
- `WorldDirector` coordinates hover, focus, and pinned scene state between navigation and a behavioral background.

## Composition rules

1. Keep roughly one third of the first desktop viewport visually open.
2. Use `solid` only for sustained reading or complex controls.
3. Use `glass` for primary content that can share space with the world.
4. Use `ghost` for labels, navigation, and short explanations inside a world window.
5. Use `open` for scenery corridors and transitions.
6. Do not solve contrast by making every panel opaque. Use local scrims behind text.
7. Meaningful text should normally be at least 12px; body copy should normally be 15–17px.
8. A world state should respond to page state whenever the relationship is academically meaningful.
9. Mobile layouts should include a dedicated world window instead of relying on narrow gutters.
10. Every new world engine should support ambient, showcase, and thumbnail presentations over time.

## Functional viewport budget

A signature interaction is one reasoning loop: prompt, controls, visual response, and result. Those pieces should remain together rather than being divided by a viewport boundary.

1. At 1440×900, a learner should normally see the complete primary widget after the sticky page header.
2. At 1366×768, the control and response portions should remain visible together even when supporting explanation moves below.
3. Put explanation beside a control-rich widget instead of stacking a large introduction above it.
4. Use `WorldWindow density="compact"` when the stage contains dependent controls, readouts, or a multi-part lab.
5. Reserve the roomy world-window composition for navigation, passive exploration, or scenes whose meaning does not depend on simultaneously visible controls.
6. Avoid nesting a 500px-or-taller canvas beneath another large minimum-height container.
7. Prefer a 520–640px total desktop budget for the first signature stage after the header.
8. A large title may establish hierarchy, but it must not push the page’s first usable interaction below the fold.
9. Do not separate a selector from the object it changes, or a result from the controls that produced it.
10. Review the longest label, open panel, selected state, and smallest supported desktop height before calling the widget complete.

## Pilot mappings

### Astronomy

- `local`: nearby systems, orbital motion, stellar scale
- `galaxy`: differential rotation, dust, lensing, populations
- `web`: clusters, filaments, expansion, cosmological scale

### Zoology

- `habitat`: environmental flow, movement, resources
- `lineage`: branching inheritance and trait transmission
- `ecology`: energy flow, predation, mutualism, decomposition

### Chemistry

- `elements`: identity, periodic organization, and electronic inventory
- `structures`: bonding, geometry, and emergent material properties
- `reactions`: collisions, rearrangement, conservation, and energy flow
- control-rich chemistry laboratories use the compact world-window composition

## Review loop

Run:

```bash
npm run audit:readability
npm run build
```

Then inspect 1440×900, 1366×768, tablet, mobile, reduced-motion, and the longest-content state before calling a page visually complete.
