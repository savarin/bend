import assert from "node:assert/strict";
import test from "node:test";
import { formatBend } from "../formatter.js";

// Regression tests for the bend2 unsafe/descent-skip def marker `def name?(...)`.
// The `?` must stay glued to the def name and to the following `(` so the bend2
// parser's `parse_take(p, "?")` (which does not skip whitespace) still sees it.

test("keeps the unsafe marker glued in a basic def", () => {
  const source = "def wnf?(x: Term) -> Term:\n  x";
  assert.equal(formatBend(source), source);
});

test("keeps the unsafe marker glued in a dotted def name", () => {
  const source = "def Laws.false_law?():\n  x";
  assert.equal(formatBend(source), source);
});

test("repairs spaces inserted around the unsafe marker", () => {
  assert.equal(formatBend("def wnf ? (x: Term) -> Term:\n  x"), "def wnf?(x: Term) -> Term:\n  x");
  assert.equal(formatBend("def wnf ?(x: Term) -> Term:\n  x"), "def wnf?(x: Term) -> Term:\n  x");
  assert.equal(formatBend("def wnf? (x: Term) -> Term:\n  x"), "def wnf?(x: Term) -> Term:\n  x");
});

test("does not glue the marker to keywords", () => {
  assert.equal(formatBend("def?(x)"), "def ?(x)");
});
