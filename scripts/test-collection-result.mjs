import assert from "node:assert/strict";
import { createCollectionSearchPayload } from "../lib/collections/result.mjs";

const record = {
  id: "object-1",
  title: "Object",
  tags: [],
  facts: {},
  sources: [{ label: "Object source" }],
};

const payload = createCollectionSearchPayload({
  query: "object",
  records: [record],
  source: "Test provider",
  state: "cached",
  sources: [{ label: "Provider API", url: "https://example.com" }],
  total: 42,
  pageSize: 16,
  retrievedAt: "2026-08-20T12:00:00.000Z",
  staleAfter: "2026-08-21T12:00:00.000Z",
  note: "Provider-backed result.",
});

assert.equal(payload.pagination.total, 42);
assert.equal(payload.pagination.returned, 1);
assert.equal(payload.pagination.pageSize, 16);
assert.equal(payload.provenance.state, "cached");
assert.equal(payload.provenance.sources[0].label, "Provider API");
assert.equal(payload.error, undefined);
assert.doesNotThrow(() => JSON.stringify(payload), "the route envelope must remain JSON-serializable");

const failure = createCollectionSearchPayload({
  query: "object",
  records: [],
  source: "Test provider",
  state: "rate-limited",
  sources: [{ label: "Provider API" }],
  total: 0,
  error: "Try again later.",
});
assert.equal(failure.provenance.state, "rate-limited");
assert.equal(failure.error, "Try again later.");

assert.throws(
  () => createCollectionSearchPayload({ query: "", records: [record], source: "Test", state: "cached", sources: [], total: 1 }),
  /at least one named source/,
);
assert.throws(
  () => createCollectionSearchPayload({ query: "", records: [record], source: "Test", state: "cached", sources: [{ label: "Test" }], total: 0 }),
  /at least as large/,
);
assert.throws(
  () => createCollectionSearchPayload({ query: "", records: [], source: "Test", state: "unknown", sources: [{ label: "Test" }] }),
  /Unknown collection result state/,
);

console.log("Collection result tests passed.");
