const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/design-memory-allocator/description/

/**
 * Your Allocator object will be instantiated and called as such:
 * var obj = new Allocator(n)
 * var param_1 = obj.allocate(size,mID)
 * var param_2 = obj.free(mID)
 */

class Allocator {
  /**
   * @type {boolean[]}
   */
  mem;

  /**
   * @type {{[key: number]: Array<[number, number]>}}
   */
  ref;

  /**
   * @param {number} n
   */
  constructor(n) {
    this.mem = Array(n).fill(false);
    this.len = n;
    this.ref = {};
  }

  /**
   * @param {number} size
   * @param {number} mID
   * @return {number}
   */
  allocate(size, mID) {
    let i = 0;
    let left = 0;
    let free = 0;
    while (i < this.len) {
      const block = this.mem[i];
      if (!block) {
        free += 1;
      } else {
        free = 0;
        left = i + 1;
      }
      if (free === size) {
        break;
      }
      i += 1;
    }
    if (free < size) {
      return -1;
    }

    for (let n = left; n < left + size; n++) {
      this.mem[n] = true;
    }

    if (!this.ref[mID]) {
      this.ref[mID] = [];
    }
    this.ref[mID].push([left, size]);

    return left;
  }

  /**
   * @param {number} mID
   * @return {number}
   */
  free(mID) {
    if (!this.ref[mID]) {
      return 0;
    }
    let count = 0;
    for (const [i, size] of this.ref[mID]) {
      for (let n = i; n < i + size; n++) {
        this.mem[n] = false;
      }
      count += size;
    }
    this.ref[mID] = [];
    return count;
  }
}

describe("Allocator", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   * @param {unknown} method
   * @param {unknown} input
   */
  function isEqual(actual, expected, method, input) {
    try {
      assert.strictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("method=", method, " - with input:", input);
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const stack = [
      "Allocator",
      "allocate",
      "allocate",
      "allocate",
      "free",
      "allocate",
      "allocate",
      "allocate",
      "free",
      "allocate",
      "free",
    ];
    const queue = [
      [10],
      [1, 1],
      [1, 2],
      [1, 3],
      [2],
      [3, 4],
      [1, 1],
      [1, 1],
      [1],
      [10, 2],
      [7],
    ];
    const output = [null, 0, 1, 2, 1, 3, 1, 6, 3, -1, 0];

    let instance;
    for (let i = 0; i < stack.length; i++) {
      const method = stack[i];
      const input = queue[i];
      const expected = output[i];
      // console.log(method, input, expected);
      if (method === "Allocator") {
        instance = new Allocator(input[0]);
      } else if (method) {
        const actual = instance?.[method]?.(...input);
        isEqual(actual, expected, method, input);
      }
    }
  });

  test("Test Case 2", function () {
    const stack = [
      "Allocator",
      "allocate",
      "allocate",
      "allocate",
      "allocate",
      "free",
      "free",
      "free",
      "allocate",
      "allocate",
      "allocate",
      "allocate",
      "free",
      "free",
      "free",
      "free",
      "free",
      "free",
      "free",
      "allocate",
      "free",
      "free",
      "allocate",
      "free",
      "allocate",
      "allocate",
      "free",
      "free",
      "free",
      "allocate",
      "allocate",
      "allocate",
      "allocate",
      "free",
      "allocate",
      "free",
      "free",
      "allocate",
      "allocate",
      "allocate",
      "allocate",
      "allocate",
      "allocate",
      "allocate",
      "free",
      "free",
      "free",
      "free",
    ];
    const queue = [
      [50],
      [12, 6],
      [28, 16],
      [17, 23],
      [50, 23],
      [6],
      [10],
      [10],
      [16, 8],
      [17, 41],
      [44, 27],
      [12, 45],
      [33],
      [8],
      [16],
      [23],
      [23],
      [23],
      [29],
      [38, 32],
      [29],
      [6],
      [40, 11],
      [16],
      [22, 33],
      [27, 5],
      [3],
      [10],
      [29],
      [16, 14],
      [46, 47],
      [48, 9],
      [36, 17],
      [33],
      [14, 24],
      [16],
      [8],
      [2, 50],
      [31, 36],
      [17, 45],
      [46, 31],
      [2, 6],
      [16, 2],
      [39, 30],
      [33],
      [45],
      [30],
      [27],
    ];
    const output = [
      null,
      0,
      12,
      -1,
      -1,
      12,
      0,
      0,
      -1,
      -1,
      -1,
      0,
      0,
      0,
      28,
      0,
      0,
      0,
      0,
      12,
      0,
      0,
      -1,
      0,
      -1,
      -1,
      0,
      0,
      0,
      -1,
      -1,
      -1,
      -1,
      0,
      -1,
      0,
      0,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      12,
      0,
      0,
    ];

    let instance;
    for (let i = 0; i < stack.length; i++) {
      const method = stack[i];
      const input = queue[i];
      const expected = output[i];
      // console.log(method, input, expected);
      if (method === "Allocator") {
        instance = new Allocator(input[0]);
      } else if (method) {
        const actual = instance?.[method]?.(...input);
        isEqual(actual, expected, method, input);
      }
    }
  });
});
