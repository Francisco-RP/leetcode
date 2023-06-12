const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/time-needed-to-inform-all-employees/

/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
const numOfMinutes = function (n, headID, manager, informTime) {
  const graph = new Map();
  for (let i = 0; i < manager.length; i++) {
    const m = manager[i];
    if (m === -1) continue;
    if (graph.has(m)) {
      graph.get(m).push(i);
    } else {
      graph.set(m, [i]);
    }
  }

  let max = 0;
  const dfs = (id, time) => {
    if (!graph.has(id)) {
      max = Math.max(max, time);
      return;
    }

    const subordinates = graph.get(id);
    for (const s of subordinates) {
      dfs(s, time + informTime[id]);
    }
  };

  dfs(headID, 0);
  return max;
};

describe("numOfMinutes", function () {
  test("Test Case 1", function () {
    const n = 1,
      headID = 0,
      manager = [-1],
      informTime = [0];
    const actual = numOfMinutes(n, headID, manager, informTime);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const n = 6,
      headID = 2,
      manager = [2, 2, -1, 2, 2, 2],
      informTime = [0, 0, 1, 0, 0, 0];
    const actual = numOfMinutes(n, headID, manager, informTime);
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const n = 15,
      headID = 0,
      manager = [-1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
      informTime = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    const actual = numOfMinutes(n, headID, manager, informTime);
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const n = 7,
      headID = 6,
      manager = [1, 2, 3, 4, 5, 6, -1],
      informTime = [0, 6, 5, 4, 3, 2, 1];
    const actual = numOfMinutes(n, headID, manager, informTime);
    const expected = 21;
    assert.strictEqual(actual, expected);
  });
});
