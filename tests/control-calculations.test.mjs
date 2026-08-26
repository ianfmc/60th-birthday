import assert from "node:assert/strict";
import test from "node:test";
import { calculateBudgetVariance, normalizeStatus } from "../app/control/control-calculations.mjs";

test("calculates positive and negative budget variance", () => {
  assert.equal(calculateBudgetVariance(6000, 5750), 250);
  assert.equal(calculateBudgetVariance(6000, 6250), -250);
});

test("normalizes source confidence into dashboard states", () => {
  assert.equal(normalizeStatus("confirmed/current"), "current");
  assert.equal(normalizeStatus("needs verification"), "verify");
  assert.equal(normalizeStatus("estimated"), "estimated");
  assert.equal(normalizeStatus("unavailable"), "unavailable");
});
