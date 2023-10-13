const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/check-if-it-is-a-straight-line/

/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
const checkStraightLine = function (coordinates) {
  const len = coordinates.length;
  if (len === 2) return true;

  const first = coordinates[0];
  let last = coordinates[1];

  // slope between the first item and current point needs to be exactly the same
  // as the slope between the last point and the current point
  for (let i = 2; i < len; i++) {
    const slope1 = slope(...first, ...coordinates[i]);
    const slope2 = slope(...last, ...coordinates[i]);
    if (slope1 !== slope2) return false;
    last = coordinates[i];
  }
  return true;
};

/**
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns
 */
function slope(x1, y1, x2, y2) {
  const run = x2 - x1;
  if (run === 0) return 0;
  const rise = y2 - y1;
  if (rise === 0) return 0;
  return rise / run;
}

describe("checkStraightLine", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
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
    const coordinates = [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ];
    const actual = checkStraightLine(coordinates);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const coordinates = [
      [1, 1],
      [2, 2],
      [3, 4],
      [4, 5],
      [5, 6],
      [7, 7],
    ];
    const actual = checkStraightLine(coordinates);
    const expected = false;
    isEqual(actual, expected);
  });
  test("Test Case 3", function () {
    const coordinates = [
      [0, 0],
      [0, 1],
      [0, -1],
    ];
    const actual = checkStraightLine(coordinates);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const coordinates = [
      [0, 0],
      [0, 5],
      [5, 5],
      [5, 0],
    ];
    const actual = checkStraightLine(coordinates);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const coordinates = [
      [0, 0],
      [0, 5],
      [5, 0],
      [1337, 0],
      [0, 1337],
    ];
    const actual = checkStraightLine(coordinates);
    const expected = false;
    isEqual(actual, expected);
  });
});

/*
[0, 0] to [0, 5] slope of 0
[0, 0]


*/
