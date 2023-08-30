const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/validate-stack-sequences/

/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
const validateStackSequences = function (pushed, popped) {
  // reversing because `Array.pop` is O(1) and `shift` is O(n) so I want to remove items at O(1)
  pushed.reverse();
  popped.reverse();

  // stack is empty and automatically starts with the first item in `pushed`
  const stack = [pushed.pop()];

  let nextPush = pushed.pop();
  let nextPop = popped.pop();

  while (pushed.length || popped.length) {
    if (stack.at(-1) === nextPop) {
      stack.pop();
      nextPop = popped.pop();
    } else if (typeof nextPush === "number") {
      stack.push(nextPush);
      nextPush = pushed.pop();
    } else {
      return false;
    }
  }

  return true;
};

describe("validateStackSequences", function () {
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
    /*
      push(1)    - [1]
      push(2)    - [1,2]
      push(3)    - [1,2,3]
      push(4)    - [1,2,3,4]
      pop() -> 4 - [1,2,3]
      push(5)    - [1,2,3,5]
      pop() -> 5 - [1,2,3]
      pop() -> 3 - [1,2]
      pop() -> 2 - [1]
      pop() -> 1 - []
    */
    const pushed = [1, 2, 3, 4, 5],
      popped = [4, 5, 3, 2, 1];
    const actual = validateStackSequences(pushed, popped);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    /*
      push(1)    - [1]
      push(2)    - [1,2]
      push(3)    - [1,2,3]
      push(4)    - [1,2,3,4]
      pop(4)     - [1,2,3]
      pop(3)     - [1,2]
      push(5)    - [1,2,5]
      pop(5)     - [1,2]
      pop(1)  X  - stop, nothing left to push and can't pop
    */
    const pushed = [1, 2, 3, 4, 5],
      popped = [4, 3, 5, 1, 2];
    const actual = validateStackSequences(pushed, popped);
    const expected = false;
    isEqual(actual, expected);
  });
});
