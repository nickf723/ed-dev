# Music remaster contract

## Ontology boundary

Music keeps five direct branches, in registry order:

1. Theory & Composition
2. Acoustics
3. Performance & Instrumentation
4. Music History & Culture
5. Recorded Music & Discography

Theory, Performance, and Recorded Music are active. Acoustics and Music History & Culture remain visible and non-clickable until substantive pages exist. Rhythm, scales, chords, harmony, and notation remain children of Theory rather than becoming root peers.

The branches are different evidence systems, not a required sequence. Theory describes structural relationships; acoustics describes physical signals; performance studies situated realization; history and culture interpret practice in context; recorded music studies captured artifacts, editions, production, and catalogs.

## Root lesson flow

1. Choose a direct branch in the mixing console.
2. Distinguish composition, performance, and recording.
3. Compare sound, structure, and meaning as claim layers.
4. Complete exact duration and pitch checks.
5. Review object identity and catalog-evidence boundaries.
6. Enter the recordings repository or a more specialized active branch.

The mixer remains interactive, but every active branch must also expose a direct semantic link before interaction. Planned branches must never create false routes.

## Model contract

`musicModel.ts` owns:

- exact five-branch parity
- twelve pitch classes
- modular semitone transposition
- note values expressed in quarter-note units
- additive measure-capacity arithmetic
- four deterministic assessment cases and correctness

No interface component should maintain a second pitch or duration truth table.

## Representation boundary

A score, performance, acoustic signal, recording, and catalog record may refer to related music without being interchangeable.

- a score represents selected structural and performance instructions
- a performance is a situated sounding event
- a signal is a measurable physical representation of sound
- a recording is a captured and produced artifact
- a catalog record supplies identity, edition, and publication metadata

Claims must be matched to an adequate representation. Release metadata cannot prove syncopation; a waveform cannot establish cultural meaning; an unchanged score does not make two performances the same event.

## Recorded collection contract

The Recorded Music repository preserves its curated shelf and MusicBrainz search. It must distinguish live, cached, partial, stale, rate-limited, failed, valid-empty, and curated-fallback states; identify sampled records separately from provider totals; prevent stale requests from overwriting newer searches; and expose source provenance.

MusicBrainz release groups group related releases as one overall album or single concept. Cover Art Archive images are community curated and rights-sensitive. The repository does not claim to stream audio, clear image rights, provide a complete discography, or make musical and cultural interpretations automatically.

## Vocabulary contract

Music owns its root vocabulary at `humanities.music`. The registry-derived scope inherits upward into Humanities. Narrower terms can move to Theory, Acoustics, Performance, History & Culture, or Recorded Music when those pages receive their own substantive vocabulary.

## Visual contract

The root world is a deterministic listening room: staff notation, a fixed signal trace, recording grooves, and five mixer channels. It should feel temporal, layered, and performative rather than like Chemistry's laboratory bench, Economics' exchange ledger, or Visual Arts' pigment studio.

The root background must not depend on random values, viewport measurement, canvas drawing, animation loops, or a post-hydration first frame. Major surfaces keep enough open interval for the room to remain visible.
