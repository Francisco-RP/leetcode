const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// https://leetcode.com/problems/goal-parser-interpretation/

/**
 * @param {string} command
 * @return {string}
 */
const interpret = function (command) {
  // The command consists of an alphabet of "G", "()" and/or "(al)" in some order.
  // The Goal Parser will interpret:
  // "G" as the string "G",
  // "()" as the string "o",
  // and "(al)" as the string "al".
  // The interpreted strings are then concatenated in the original order.
  return command.replace(/\(\)/g, "o").replace(/\(al\)/g, "al");
};

describe("interpret", function () {
  it("Test Case 1", function () {
    const actual = interpret("G()(al)");
    const expected = "Goal";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = interpret("G()()()()(al)");
    const expected = "Gooooal";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = interpret("(al)G(al)()()G");
    const expected = "alGalooG";
    assert.strictEqual(actual, expected);
  });
});
