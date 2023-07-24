const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/card-flipping-game/

/**
 * @param {number[]} fronts
 * @param {number[]} backs
 * @return {number}
 */
const flipgame = function (fronts, backs) {
  const stack = new Set();
  let min = 2001; // 1 <= fronts[i], backs[i] <= 2000

  // first we store numbers that exist in both sides, those numbers will never work
  for (let i = 0; i < fronts.length; i++) {
    if (fronts[i] === backs[i]) stack.add(fronts[i]);
  }

  for (let i = 0; i < fronts.length; i++) {
    const f = fronts[i];
    const b = backs[i];
    if (f === b) continue;

    if (!stack.has(b)) {
      min = Math.min(min, b);
      stack.add(b);
    }
    if (!stack.has(f)) {
      min = Math.min(min, f);
      stack.add(f);
    }
  }

  return min > 2000 ? 0 : min;
};

describe("flipgame", function () {
  function isEqual(actual, expected) {
    try {
      assert.strictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const fronts = [1, 2, 4, 4, 7],
      backs = [1, 3, 4, 1, 3];
    const actual = flipgame(fronts, backs);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const fronts = [1],
      backs = [1];
    const actual = flipgame(fronts, backs);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const fronts = [1, 2],
      backs = [2, 1];
    const actual = flipgame(fronts, backs);
    const expected = 1;
    isEqual(actual, expected);
  });
});
