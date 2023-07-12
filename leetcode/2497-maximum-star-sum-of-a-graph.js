const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/maximum-star-sum-of-a-graph/

/*
There is an undirected graph consisting of n nodes numbered from 0 to n - 1. You are given a
0-indexed integer array vals of length n where vals[i] denotes the value of the ith node.

You are also given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an
undirected edge connecting nodes ai and bi.

A star graph is a subgraph of the given graph having a center node containing 0 or more neighbors.
In other words, it is a subset of edges of the given graph such that there exists a common node for
all edges.
*/

/**
 * @param {number[]} vals vals[i] denotes the value of the ith node.
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
const maxStarSum = function (vals, edges, k) {
  if (!k || !edges.length) {
    return Math.max(...vals);
  }

  const map = Object.create(null);

  vals.forEach((n, i) => {
    map[i] = [];
  });

  edges.forEach(([a, b]) => {
    if (vals[b] > 0) {
      map[a].push(vals[b]);
    }
    if (vals[a] > 0) {
      map[b].push(vals[a]);
    }
  });

  const sums = [];
  Object.keys(map).forEach((key) => {
    const val = vals[key];
    const arr = map[key].sort((a, b) => b - a).slice(0, k);
    sums.push(val + arr.reduce((acc, n) => acc + n, 0));
  });

  // console.log(map);
  return Math.max(...sums);
};

describe("maxStarSum", function () {
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
    const vals = [1, 2, 3, 4, 10, -10, -20],
      edges = [
        [0, 1],
        [1, 2],
        [1, 3],
        [3, 4],
        [3, 5],
        [3, 6],
      ],
      k = 2;
    const actual = maxStarSum(vals, edges, k);
    const expected = 16;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const vals = [-5],
      edges = [],
      k = 0;
    const actual = maxStarSum(vals, edges, k);
    const expected = -5;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const vals = [-1, 0],
      edges = [],
      k = 1;
    const actual = maxStarSum(vals, edges, k);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const vals = [1, -8, 0],
      edges = [
        [1, 0],
        [2, 1],
      ],
      k = 2;

    const actual = maxStarSum(vals, edges, k);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const vals = [-2, -1, -2],
      edges = [[0, 2]],
      k = 1;

    const actual = maxStarSum(vals, edges, k);
    const expected = -1;
    isEqual(actual, expected);
  });

  test("Test custom 1", function () {
    const vals = [-2, -1, -2, -4, -3],
      edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [0, 3],
      ],
      k = 2;

    const actual = maxStarSum(vals, edges, k);
    const expected = -1;
    isEqual(actual, expected);
  });
});
