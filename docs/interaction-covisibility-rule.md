# Interaction co-visibility rule

When one control changes another visible object, the control and the affected object should coexist in the same usable viewport at the breakpoint where that interaction is intended.

## Required behavior

- Do not make learners remember a control state while scrolling to find the result.
- Compress, dock, collapse, or move auxiliary controls into margins before separating cause from effect vertically.
- Sticky inspectors and sidecars are preferred when a long matrix, chart, map, or specimen needs contextual readout throughout its full height.
- If a hover or selection changes an inspector, the inspector must remain visible while the entire hover/select surface is usable.
- If the central object is too large to coexist with its controls, reduce nonessential chrome first. Only split the interaction when the academic task genuinely has sequential phases.
- On smaller screens, preserve the same cause/effect relationship with compact inline controls or responsive disclosure rather than simply stacking distant sections.

## Design test

Ask: **Can the learner manipulate the control and immediately see or read what changed without scrolling?**

If not, the interaction composition is not finished.
