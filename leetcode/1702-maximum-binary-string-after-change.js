const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/maximum-binary-string-after-change/

/**
 * @param {string} binary
 * @return {string}
 */
const maximumBinaryString = function (binary) {
  if (!binary.includes("0")) return binary;

  // Position of this will be indexOfFirstZero in given string + countOfZeros - 1
  let count = 0;
  let firstZero;
  for (let i = binary.length - 1; i >= 0; i--) {
    if (binary.charAt(i) === "0") {
      count += 1;
      firstZero = i;
    }
  }
  const index = firstZero + count - 1;
  return "1".repeat(index) + "0" + "1".repeat(binary.length - count - firstZero);
};

describe("maximumBinaryString", function () {
  test("Test Case 1", function () {
    const actual = maximumBinaryString("000110");
    const expected = "111011";
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = maximumBinaryString("01");
    const expected = "01";
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = maximumBinaryString("1100");
    const expected = "1110";
    assert.strictEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const actual = maximumBinaryString("01111001100000110010");
    const expected = "11111111110111111111";
    assert.strictEqual(actual, expected);
  });
});
