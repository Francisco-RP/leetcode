const assert = require("assert");

// https://leetcode.com/problems/check-if-n-and-its-double-exist/description/

/**
 * @param {number[]} arr
 * @return {boolean}
 */
const checkIfExist = function (arr) {
  let i = 0;
  let j = 1;
  while (j < arr.length) {
    if (arr[i] === 2 * arr[j] || arr[j] === 2 * arr[i]) {
      return true;
    }
    j += 1;
    if (j === arr.length && i < arr.length - 1) {
      i += 1;
      j = i + 1;
    }
  }
  return false;
};

describe("checkIfExist", function () {
  it("Test Case 1", function () {
    const actual = checkIfExist([10, 2, 5, 3]);
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = checkIfExist([3, 1, 7, 11]);
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  // it("Test Case 3", function () {
  //   const actual = checkIfExist();
  //   const expected = true;
  //   assert.strictEqual(actual, expected);
  // });
});
