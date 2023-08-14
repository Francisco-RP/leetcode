const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/design-circular-deque/
class MyCircularDeque {
  /**
   * Initializes the deque with a maximum size of k.
   * @param {number} k
   */
  constructor(k) {
    /**
     * @type {number[]}
     * @public
     */
    this.queue = [];

    /**
     * @type {number}
     * @public
     */
    this.size = k;
  }

  /**
   * Queue:
   *
   * rear (shift/unshift)        front (push/pop)
   * [ 0, 1, 2, 4, ...          ..., -3, -2 ,-1 ]
   */

  /**
   * Adds an item at the front of Deque. Returns true if the operation is successful, or false
   * otherwise.
   *
   * @param {number} value
   * @return {boolean}
   */
  insertFront(value) {
    if (this.isFull()) return false;
    this.queue.push(value);
    return true;
  }

  /**
   * Adds an item at the rear of Deque. Returns true if the operation is successful, or false
   * otherwise.
   * @param {number} value
   * @return {boolean}
   */
  insertLast(value) {
    if (this.isFull()) return false;
    this.queue.unshift(value);
    return true;
  }

  /**
   * Deletes an item from the front of Deque. Returns true if the operation is successful, or false
   * otherwise.
   * @return {boolean}
   */
  deleteFront() {
    return this.queue.pop() !== undefined;
  }

  /**
   * Deletes an item from the rear of Deque. Returns true if the operation is successful, or false
   * otherwise.
   * @return {boolean}
   */
  deleteLast() {
    return this.queue.shift() !== undefined;
  }

  /**
   * Returns the front item from the Deque. Returns -1 if the deque is empty.
   * @return {number}
   */
  getFront() {
    if (this.isEmpty()) return -1;
    return this.queue.at(-1);
  }

  /**
   * Returns the last item from Deque. Returns -1 if the deque is empty.
   * @return {number}
   */
  getRear() {
    if (this.isEmpty()) return -1;
    return this.queue[0];
  }

  /**
   * Returns true if the deque is empty, or false otherwise.
   * @return {boolean}
   */
  isEmpty() {
    return this.queue.length === 0;
  }

  /**
   *  Returns true if the deque is full, or false otherwise.
   * @return {boolean}
   */
  isFull() {
    return this.queue.length === this.size;
  }
}

describe("MyCircularDeque", function () {
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
      "MyCircularDeque",
      "insertLast",
      "insertLast",
      "insertFront",
      "insertFront",
      "getRear",
      "isFull",
      "deleteLast",
      "insertFront",
      "getFront",
    ];
    const queue = [[3], [1], [2], [3], [4], [], [], [], [4], []];
    const output = [null, true, true, true, false, 2, true, true, true, 4];

    /**
     * @type {MyCircularDeque | undefined}
     */
    let instance;
    for (let i = 0; i < stack.length; i++) {
      const method = stack[i];
      const input = queue[i][0];
      const expected = output[i];
      // console.log(method, input, expected);
      if (method === "MyCircularDeque") {
        instance = new MyCircularDeque(input);
      } else if (method) {
        const actual = instance?.[method]?.(input);
        isEqual(actual, expected, method, input);
      }
    }
  });

  test("Test Case 2", function () {
    const stack = [
      "MyCircularDeque",
      "insertFront",
      "insertLast",
      "getFront",
      "insertLast",
      "getFront",
      "insertFront",
      "getRear",
      "getFront",
      "getFront",
      "deleteLast",
      "getRear",
    ];
    const queue = [[5], [7], [0], [], [3], [], [9], [], [], [], [], []];
    const output = [null, true, true, 7, true, 7, true, 3, 9, 9, true, 0];

    /**
     * @type {MyCircularDeque | undefined}
     */
    let instance;
    for (let i = 0; i < stack.length; i++) {
      const method = stack[i];
      const input = queue[i][0];
      const expected = output[i];
      // console.log(method, input, expected);
      if (method === "MyCircularDeque") {
        instance = new MyCircularDeque(input);
      } else if (method) {
        const actual = instance?.[method]?.(input);
        isEqual(actual, expected, method, input);
      }
    }
  });

  test("Test Case 3", function () {
    const stack = [
      "MyCircularDeque",
      "insertFront",
      "getRear",
      "insertFront",
      "getRear",
      "insertLast",
      "getFront",
      "getRear",
      "getFront",
      "insertLast",
      "deleteLast",
      "getFront",
    ];
    const queue = [[3], [9], [], [9], [], [5], [], [], [], [8], [], []];
    const output = [null, true, 9, true, 9, true, 9, 5, 9, false, true, 9];

    /**
     * @type {MyCircularDeque | undefined}
     */
    let instance;
    for (let i = 0; i < stack.length; i++) {
      const method = stack[i];
      const input = queue[i][0];
      const expected = output[i];
      // console.log({ method, input, expected });
      if (method === "MyCircularDeque") {
        instance = new MyCircularDeque(input);
      } else if (method) {
        const actual = instance?.[method]?.(input);
        isEqual(actual, expected, method, input);
      }
    }
  });

  test("Test Case 4", function () {
    const stack = [
      "MyCircularDeque",
      "insertFront",
      "deleteLast",
      "getRear",
      "getFront",
      "getFront",
      "deleteFront",
      "insertFront",
      "insertLast",
      "insertFront",
      "getFront",
      "insertFront",
    ];
    const queue = [[4], [9], [], [], [], [], [], [6], [5], [9], [], [6]];
    const output = [null, true, true, -1, -1, -1, false, true, true, true, 9, true];

    /**
     * @type {MyCircularDeque | undefined}
     */
    let instance;
    for (let i = 0; i < stack.length; i++) {
      const method = stack[i];
      const input = queue[i][0];
      const expected = output[i];
      // console.log({ method, input, expected });
      if (method === "MyCircularDeque") {
        instance = new MyCircularDeque(input);
      } else if (method) {
        const actual = instance?.[method]?.(input);
        isEqual(actual, expected, method, input);
      }
    }
  });

  test("Test Case 5", function () {
    const stack = [
      "MyCircularDeque",
      "insertFront",
      "getRear",
      "deleteLast",
      "getRear",
      "insertFront",
      "insertFront",
      "insertFront",
      "insertFront",
      "isFull",
      "insertFront",
      "isFull",
      "getRear",
      "deleteLast",
      "getFront",
      "getFront",
      "insertLast",
      "deleteFront",
      "getFront",
      "insertLast",
      "getRear",
      "insertLast",
      "getRear",
      "getFront",
      "getFront",
      "getFront",
      "getRear",
      "getRear",
      "insertFront",
      "getFront",
      "getFront",
      "getFront",
      "getFront",
      "deleteFront",
      "insertFront",
      "getFront",
      "deleteLast",
      "insertLast",
      "insertLast",
      "getRear",
      "getRear",
      "getRear",
      "isEmpty",
      "insertFront",
      "deleteLast",
      "getFront",
      "deleteLast",
      "getRear",
      "getFront",
      "isFull",
      "isFull",
      "deleteFront",
      "getFront",
      "deleteLast",
      "getRear",
      "insertFront",
      "getFront",
      "insertFront",
      "insertFront",
      "getRear",
      "isFull",
      "getFront",
      "getFront",
      "insertFront",
      "insertLast",
      "getRear",
      "getRear",
      "deleteLast",
      "insertFront",
      "getRear",
      "insertLast",
      "getFront",
      "getFront",
      "getFront",
      "getRear",
      "insertFront",
      "isEmpty",
      "getFront",
      "getFront",
      "insertFront",
      "deleteFront",
      "insertFront",
      "deleteLast",
      "getFront",
      "getRear",
      "getFront",
      "insertFront",
      "getFront",
      "deleteFront",
      "insertFront",
      "isEmpty",
      "getRear",
      "getRear",
      "getRear",
      "getRear",
      "deleteFront",
      "getRear",
      "isEmpty",
      "deleteFront",
      "insertFront",
      "insertLast",
      "deleteLast",
    ];
    const queue = [
      [77],
      [89],
      [],
      [],
      [],
      [19],
      [23],
      [23],
      [82],
      [],
      [45],
      [],
      [],
      [],
      [],
      [],
      [74],
      [],
      [],
      [98],
      [],
      [99],
      [],
      [],
      [],
      [],
      [],
      [],
      [8],
      [],
      [],
      [],
      [],
      [],
      [75],
      [],
      [],
      [35],
      [59],
      [],
      [],
      [],
      [],
      [22],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [21],
      [],
      [26],
      [63],
      [],
      [],
      [],
      [],
      [87],
      [76],
      [],
      [],
      [],
      [26],
      [],
      [67],
      [],
      [],
      [],
      [],
      [36],
      [],
      [],
      [],
      [72],
      [],
      [87],
      [],
      [],
      [],
      [],
      [85],
      [],
      [],
      [91],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [34],
      [44],
      [],
    ];
    const output = [
      null,
      true,
      89,
      true,
      -1,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      19,
      true,
      45,
      45,
      true,
      true,
      82,
      true,
      98,
      true,
      99,
      82,
      82,
      82,
      99,
      99,
      true,
      8,
      8,
      8,
      8,
      true,
      true,
      75,
      true,
      true,
      true,
      59,
      59,
      59,
      false,
      true,
      true,
      22,
      true,
      98,
      22,
      false,
      false,
      true,
      75,
      true,
      74,
      true,
      21,
      true,
      true,
      74,
      false,
      63,
      63,
      true,
      true,
      76,
      76,
      true,
      true,
      74,
      true,
      26,
      26,
      26,
      67,
      true,
      false,
      36,
      36,
      true,
      true,
      true,
      true,
      87,
      74,
      87,
      true,
      85,
      true,
      true,
      false,
      74,
      74,
      74,
      74,
      true,
      74,
      false,
      true,
      true,
      true,
      true,
    ];

    /**
     * @type {MyCircularDeque | undefined}
     */
    let instance;
    for (let i = 0; i < stack.length; i++) {
      const method = stack[i];
      const input = queue[i][0];
      const expected = output[i];
      // console.log({ method, input, expected });
      if (method === "MyCircularDeque") {
        instance = new MyCircularDeque(input);
      } else if (method) {
        const actual = instance?.[method]?.(input);
        isEqual(actual, expected, method, input);
      }
    }
  });
});
