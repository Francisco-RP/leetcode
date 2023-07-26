const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/reach-a-number/

/**
 * @param {number} target -1,000,000,000 <= target <= 1,000,000,000 && target != 0
 * @return {number}
 */
const reachNumber = function (target) {
  // target 10
  //   1    2    3    4
  // 0 -> 1 -> 3 -> 6 -> 10
  //
  // target 3
  //   1    2
  // 0 -> 1 -> 3
  //
  // target 2
  //   1    2     3
  // 0 -> 1 -> -1 -> 2
};

// const reachNumber = function (target) {
//   // BFS approach, but it's too slow
//   const nodes = [[0, 1]];
//   let i = 0;

//   while (i < nodes.length) {
//     const [val, steps] = nodes[i];
//     i += 1;
//     if (val === target) return steps - 1;

//     const left = val - steps;
//     nodes.push([left, steps + 1]);
//     const right = val + steps;
//     nodes.push([right, steps + 1]);
//   }
// };

describe("reachNumber", function () {
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
    const actual = reachNumber(2);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = reachNumber(3);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 0a", function () {
    const actual = reachNumber(10);
    const expected = 4;
    isEqual(actual, expected);
  });

  // test("Test Case 3", function () {
  //   const actual = reachNumber(-1000000000);
  //   const expected = 2;
  //   isEqual(actual, expected);
  // });
});
