/**
 * You are given an array of people, people, which are the attributes of some people in a queue (not
 * necessarily in order). Each people[i] = [hi, ki] represents the ith person of height hi with
 * exactly ki other people in front who have a height greater than or equal to hi.
 *
 * Reconstruct and return the queue that is represented by the input array people. The returned
 * queue should be formatted as an array queue, where queue[j] = [hj, kj] is the attributes of the
 * jth person in the queue (queue[0] is the person at the front of the queue).
 *
 * Constraints:
 * - 1 <= people.length <= 2000
 * - 0 <= h^i <= 106
 * - 0 <= k^i < people.length
 * - It is guaranteed that the queue can be reconstructed.
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  people.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]));
  var result = [];
  for (var i = 0, len = people.length; i < len; i++) {
    result.splice(people[i][1], 0, people[i]);
  }
  return result;
};

// ------------------------------------------------------------
// https://leetcode.com/problems/queue-reconstruction-by-height/
// can't take credit, this post gave me the solution: https://leetcode.com/problems/queue-reconstruction-by-height/discuss/2211641/Visual-Explanation-or-JAVA-Greedy

const assert = require("node:assert");
const { describe, test: it } = require("node:test");

describe("reconstructQueue", function () {
  it("Example 1", function () {
    const actual = reconstructQueue([
      [7, 0],
      [4, 4],
      [7, 1],
      [5, 0],
      [6, 1],
      [5, 2],
    ]);
    const expected = [
      [5, 0],
      [7, 0],
      [5, 2],
      [6, 1],
      [4, 4],
      [7, 1],
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("Example 2", function () {
    const actual = reconstructQueue([
      [6, 0],
      [5, 0],
      [4, 0],
      [3, 2],
      [2, 2],
      [1, 4],
    ]);
    const expected = [
      [4, 0],
      [5, 0],
      [2, 2],
      [3, 2],
      [1, 4],
      [6, 0],
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
