const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/execution-of-all-suffix-instructions-staying-in-a-grid/

/**
 * @param {number} n
 * @param {number[]} startPos
 * @param {string} s
 * @return {number[]}
 */
const executeInstructions = function (n, startPos, s) {
  if (n === 1) return new Array(s.length).fill(0);

  const result = [];
  for (let i = 0; i < s.length; i++) {
    let count = 0;
    let x = startPos[1];
    let y = startPos[0];

    for (let j = i; j < s.length; j++) {
      const move = s[j];

      if (move === "U") {
        y -= 1;
        if (y < 0) break;
        else count += 1;
        continue;
      }

      if (move === "R") {
        x += 1;
        if (x >= n) break;
        else count += 1;
        continue;
      }

      if (move === "D") {
        y += 1;
        if (y >= n) break;
        else count += 1;
        continue;
      }

      if (move === "L") {
        x -= 1;
        if (x < 0) break;
        else count += 1;
      }
    }

    result[i] = count;
  }

  return result;
};

describe("executeInstructions", function () {
  test("Test Case 1", function () {
    const n = 3,
      startPos = [0, 1],
      s = "RRDDLU";
    const actual = executeInstructions(n, startPos, s);
    const expected = [1, 5, 4, 3, 1, 0];
    assert.deepStrictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const n = 2,
      startPos = [1, 1],
      s = "LURD";
    const actual = executeInstructions(n, startPos, s);
    const expected = [4, 1, 0, 0];
    assert.deepStrictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const n = 1,
      startPos = [0, 0],
      s = "LRUD";
    const actual = executeInstructions(n, startPos, s);
    const expected = [0, 0, 0, 0];
    assert.deepStrictEqual(actual, expected);
  });
});
