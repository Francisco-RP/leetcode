const assert = require("assert");

// https://leetcode.com/problems/maximum-product-after-k-increments/

/**
 * In one operation, you may choose any element from `nums` and increment it by 1.
 *
 * Return the maximum product of `nums` after at most `k` operations. Since the answer may be very
 * large, return it modulo `10**9 + 7`. Note that you should maximize the product before taking the modulo.
 *
 * @param {number[]} nums array of non-negative integers
 * @param {number} k total operations allowed (where in each operation you increment any element in `nums` by 1)
 * @return {number}
 */
const maximumProduct = function (nums, k) {
  const minHeap = new MinHeap();
  for (let i = 0; i < nums.length; i++) {
    minHeap.insert(nums[i]);
  }
  console.log("heap", minHeap.heap);

  nums.sort((a, b) => a - b);

  while (k > 0) {
    nums[0] += 1;
    nums.sort((a, b) => a - b);
    k -= 1;
  }

  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    max *= nums[i];
  }

  return max % (10 ** 9 + 7); // modulo by 1,000,000,007
};

class MinHeap {
  /**
   * parent i, children are at 2i + 1 and 2i + 2
   */
  constructor() {
    this.heap = [0];
  }

  product() {
    return this.heap.slice(1).reduce((p, n) => p * n, 1);
  }

  insert(node) {
    // node = 3, heap = [6]
    this.heap.push(node); // now [6, 3]

    if (this.heap.length > 1) {
      let current = this.heap.length - 1;

      const parentIndex = Math.floor(current / 2);
      /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
      while (current > 1 && this.heap[parentIndex] > this.heap[current]) {
        /* Swapping the two nodes by using the ES6 destructuring syntax*/
        [this.heap[parentIndex], this.heap[current]] = [this.heap[current], this.heap[parentIndex]];
        current = parentIndex;
      }
    }
  }
}

describe("maximumProduct", function () {
  it("Test Case 1", function () {
    const actual = maximumProduct([0, 4], 5);
    const expected = 20;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = maximumProduct([6, 3, 3, 2], 2);
    const expected = 216;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = maximumProduct([24, 5, 64, 53, 26, 38], 54);
    const expected = 180_820_950;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 4", function () {
    const actual = maximumProduct([92, 36, 15, 84, 57, 60, 72, 86, 70, 43, 16], 62);
    const expected = 800_222_867;
    assert.strictEqual(actual, expected);
  });
});
