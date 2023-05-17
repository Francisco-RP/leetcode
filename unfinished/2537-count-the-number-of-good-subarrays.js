const assert = require("assert");

// https://leetcode.com/problems/count-the-number-of-good-subarrays/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countGood = function (nums, k) {
  let result = 0;

  let outerLeft = 0; // this will move to nums.length - 2
  let outerRight = 2; // this will move to nums.length, because slice end is exclusive

  // [3, 1, 4, 3, 2, 2, 4]

  // [3,   1] = 0
  // [3,   1, 4] = 0
  // [3,   1, 4, 3] = 1,   3 and 3 match
  // [3,   1, 4, 3, 2] = 0
  // [3,   1, 4, 3, 2, 2] = 0
  // [3,   1, 4, 3, 2, 2, 4] = 0
  // [1,   4] = 0
  // [1,   4, 3] = 0
  // [1,   4, 3, 2] = 0
  // [1,   4, 3, 2, 2] = 0
  // [1,   4, 3, 2, 2, 4] = 0
  // [4,   3] = 0
  // [4,   3, 2] = 0
  // [4,   3, 2, 2] = 0
  // [4,   3, 2, 2, 4] = 1,  4 and 4 match
  // [3,   2] = 0
  // [3,   2, 2] = 0
  // [3,   2, 2, 4] = 0
  // [2,   2] = 1
  // [2,   2, 4] = 0
  // [2,   4] = 0

  let sub = nums.slice(outerLeft, outerRight);
  while (sub.length) {
    let pairCount = 0;

    for (let i = 0; i < sub.length - 1; i++) {
      let canBreak = false;
      console.log(`\n`);
      for (let j = i + 1; j < sub.length; j++) {
        if (sub[i] === sub[j]) pairCount++;
        console.log(JSON.stringify(nums.slice(i, j + 1)), "pairCount=", pairCount);
        if (pairCount === k) {
          result++;
          pairCount = 0;
          canBreak = true;
          break;
        }
      }
      if (canBreak) break;
    }

    if (outerRight < nums.length) {
      outerRight++;
      sub.push(nums[outerRight - 1]);
    } else {
      outerLeft++;
      outerRight = outerLeft + 1;
      if (outerLeft > nums.length - 2) {
        break;
      }
      sub = nums.slice(outerLeft, outerRight);
    }
  }
  return result;
};

describe("countGood", function () {
  it("Test Case 1", function () {
    const actual = countGood([1, 1, 1, 1, 1], 10);
    // 0,1, 1,2, 2,3, 3,4, 0,2, 1,3, 2,4, 0,3, 1,4, 0,4
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  it.only("Test Case 2", function () {
    const actual = countGood([3, 1, 4, 3, 2, 2, 4], 2);
    const expected = 4;
    assert.strictEqual(actual, expected);
  });

  // it("Test Case 3", function () {
  //   const actual = countGood();
  //   const expected = true;
  //   assert.strictEqual(actual, expected);
  // });
});
