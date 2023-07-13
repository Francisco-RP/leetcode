const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/baseball-game/

/**
 * @param {string[]} operations
 * @return {number}
 */
const calPoints = function (operations) {
  let record = [];
  let sum = 0;
  let num;

  operations.forEach((op) => {
    if (op === "+") {
      num = record.at(-1) + record.at(-2);
      record.push(num);
      sum += num;
    } else if (op === "D") {
      num = record.at(-1) * 2;
      record.push(num);
      sum += num;
    } else if (op === "C") {
      sum -= record.pop();
    } else {
      num = parseInt(op, 10);
      record.push(num);
      sum += num;
    }
  });

  return sum;
};

describe("calPoints", function () {
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
    const actual = calPoints(["5", "2", "C", "D", "+"]);
    const expected = 30;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"]);
    const expected = 27;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = calPoints(["1", "C"]);
    const expected = 0;
    isEqual(actual, expected);
  });
});
