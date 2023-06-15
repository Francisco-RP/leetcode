const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/reverse-bits/

/**
 * Reverse bits of a given 32 bits unsigned integer.
 *
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  console.log("n", n);

  // convert number to binary (base 2) in string format
  n = n.toString(2);
  console.log("toString", n);

  // make sure we have 32 bits by filling in any missing bits with "0"
  // for example:
  // "10011" ->  "00000000000000000000000000010011"
  // "10100101000001111010011100" -> "00000010100101000001111010011100"
  n = n.padStart(32, "0");
  console.log("padStart", n);

  // reverse the string
  n = n.split("").reverse().join("");
  console.log("reversed", n);

  // parse string as a binary (base 2) and convert it to a "normal" (base 10) number
  n = parseInt(n, 2);

  console.log("answer", n);
  return n;

  // the answer in one line
  // return parseInt(n.toString(2).padStart(32, "0").split("").reverse().join(""), 2);
};

describe("reverseBits", function () {
  test("Test Case 1", function () {
    const actual = reverseBits(43261596);
    const expected = 964176192;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = reverseBits(4294967293);
    const expected = 3221225471;
    assert.strictEqual(actual, expected);
  });

  // test("Test Case 3", function () {
  //   const actual = reverseBits();
  //   const expected = true;
  //   assert.strictEqual(actual, expected);
  // });
});
