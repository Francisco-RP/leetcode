const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// https://leetcode.com/problems/check-distances-between-same-letters/

/**
 * @param {string} s
 * @param {number[]} distance
 * @return {boolean}
 */
const checkDistances = function (s, distance) {
  const indexes = {};
  let result = true;

  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);

    if (typeof indexes[c] === "number") {
      const dist = i - indexes[c] - 1;
      if (distance[c.charCodeAt(0) - 97] !== dist) {
        result = false;
        break;
      }
    } else {
      indexes[c] = i;
    }
  }

  return result;
};

describe("checkDistances", function () {
  it("Test Case 1", function () {
    const actual = checkDistances(
      "abaccb",
      [1, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = checkDistances(
      "aa",
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  // it("Test Case 3", function () {
  //   const actual = checkDistances();
  //   const expected = true;
  //   assert.strictEqual(actual, expected);
  // });
});
